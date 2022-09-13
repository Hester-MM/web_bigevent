$(function () {
    // 点击切换登录和注册界面
    $('#link-login').on('click', function () {
        $('.login-box').hide();
        $('.reg-box').show();
    })
    $('#link-reg').on('click', function () {
        $('.login-box').show();
        $('.reg-box').hide();
    })

    // 用layui实现自定义输入框内容规则
    // 1.获取layui里面的form对象
    var form = layui.form;
    form.verify({
        //2.自定义一个pwd的密码效验规则
        pwd: [
            /^[\S]{6,12}$/
            , '密码必须6到12位，且不能出现空格'
        ],
        //3.校验两次密码一致的规则
        repwd: function (value, item) {
            //value：表单的值、item：表单的DOM对象
            var pwd = $('.reg-box [name=password]').val();
            if (value != pwd) {
                return '用户输入的两次密码不一致';
            }
        }
    })

    //把用户注册的信息通过ajax请求发送到服务器
    var layer = layui.layer;
    $('#reg-form').on('submit', function (e) {
        e.preventDefault();
        var data = {
            username: $('#reg-form [name=username]').val(),
            password: $('#reg-form [name=password]').val()
        }
        $.post('/api/reguser',data,function (res) {
            if (res.status !== 0) {
                return layer.msg(res.message);
            }
            layer.msg('注册成功！');
            $('#link-reg').click();
        })
    })
    //监听用户登录事件
   $('#login-form').on('submit',function(e) {
    e.preventDefault();
    $.ajax({
        url: '/api/login',
        method: 'POST',
        data: $(this).serialize(),
        success: function(res) {
          if (res.status !== 0) {
            return layer.msg('登陆失败')
          }
          layer.msg('登陆成功')
          console.log(res.token);
          localStorage.setItem('token',res.token);
          location.href ='/大事件案例/index.html'
        }

    })
   })

})