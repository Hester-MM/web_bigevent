$(function () {
    let layer = layui.layer;
    let form = layui.form;
    //获取文章数据信息
    getArticleList();
    function getArticleList() {
        $.ajax({
            url: '/my/article/cates',
            method: 'GET',
            success: function (res) {
                // console.log(res);
                var htmlStr = template('tpl-table', res)
                $('tbody').html(htmlStr)
            }
        })
    }
     let indexAdd = null;
    //为添加类别按钮添加点击事件弹出框
    $('#btnAdd').on('click', function () {
        indexAdd = layer.open({
            type: 1,
            area: ['500px', '300px'],
            title: '添加文章分类',
            content: $('#dialog-add').html()
        })
    })

    //用body代理的方式给弹出框的表单按钮绑定submit事件
    $('body').on('submit','#form-add',function(e) {
        e.preventDefault();
        $.ajax({
            method: 'POST',
            url: '/my/article/addcates',
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg('添加类别失败')
                }
                getArticleList();
                layer.msg('新增分类成功！')
                //根据索引自动关闭添加成功的弹出层
                layer.close(indexAdd)
            }
        })

    })
     let indexEdit = null;
    //用tbody代理的方式给弹出框的表单按钮btn-edit绑定click事件
    $('tbody').on('click','#btn-edit',function(e) {
        indexEdit = layer.open({
            type: 1,
            area: ['500px', '300px'],
            title: '修改文章分类',
            content: $('#dialog-edit').html()
        })
        let id = $(this).attr('data-id')
        // console.log(id);
        // 发起请求获取对应分类的数据
        $.ajax({
            method: 'GET',
            url: '/my/article/cates/' + id,
            success: function(res) {
                //填充id对应的信息在修改弹出层中
                form.val('form-edit', res.data);
            }
        })
    })

    //用body代理的方式给修改弹出框的表单按钮绑定submit事件
   $('body').on('submit','#form-edit',function(e) {
       e.preventDefault();
       $.ajax({
        method: 'POST',
        url: '/my/article/updatecate',
        data: $(this).serialize(),
        success: function(res) {
            if (res.status !== 0) {
                return layer.msg('修改类别失败')
            }
            getArticleList();
            layer.msg('修改文章分类成功！')
            layer.close(indexEdit);
        }
       })
   })

    //用tbody代理的方式给删除按钮btn-delete绑定click事件
    $('tbody').on('click','#btn-delete',function(e) {
        // console.log('jjj');
        let id = $(this).attr('data-id')
        //提示是否删除弹出框
        layer.confirm('确认删除?', {icon: 3, title:'提示'}, function(index){
           $.ajax({
            method:'GET',
            url: '/my/article/deletecate/' + id,
            success: function(res) {
                console.log(res);
                if (res.status !== 0) {
                    return layer.msg('删除分类失败！')
                  }
                  layer.msg('删除分类成功！')
                  layer.close(index);
                  getArticleList();
            }
           })
          });
    })
})