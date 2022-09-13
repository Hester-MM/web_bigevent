$(function() {
    getUserInfo();
    // 点击退出按钮。实现退回到登录与注册页面
    $('#goOut').on('click',function() {
      layer.confirm('是否确认退出?', {icon: 3, title:'提示'}, function(index){
        //do something
        localStorage.removeItem('token');
        location.href = '/大事件案例/login.html'
        layui.layer.close(index);
      });
    })
})
//获取用户的信息的函数
function getUserInfo() {
  $.ajax({
    url: '/my/userinfo',
    method:'GET',
    // headers: {
    //     Authorization: localStorage.getItem('token') || ''
    // },
    success: function(res) {
        console.log(res);
        if (res.status !== 0) {
            return layui.layer.msg('获取用户信息失败')
        }
         renderAvatar(res.data)
    },
    //无论成功或者失败，都会调用这个函数
  //   complete: function(res) {
  //     // console.log(res);
  //     if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
  //       // 1. 强制清空 token
  //       localStorage.removeItem('token')
  //       // 2. 强制跳转到登录页面
  //       location.href = '/大事件案例/login.html'
  //     }
  //   }
  // })
}
//渲染用户头像
function renderAvatar(user) {
    let name = user.nickname || user.username;
     // 2. 设置欢迎的文本
    $('#welcome').html('欢迎&nbsp;' + name);
    //按需渲染用户头像
   if (user.user_pic !== null) {
    $('.layui-nav-img').attr('src',user.user_pic).show();
    $('.text-avator').hide();
   } else {
    $('.layui-nav-img').hide();
    $('.text-avator').html(name[0].toUpperCase()).show()
   }

}