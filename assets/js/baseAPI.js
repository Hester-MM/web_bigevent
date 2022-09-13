$.ajaxPrefilter(function(options) {
    // 在发起真正的 Ajax 请求之前，统一拼接请求的根路径
    options.url = 'http://api-breakingnews-web.itheima.net' + options.url
    if (options.url.indexOf('/my/') !== -1) {
      options.headers={
        Authorization: localStorage.getItem('token') || ''
   
       }
    }
    //全局统一挂载complete函数
    options.complete = function(res) {
      // console.log(res);
      if (res.responseJSON.status ===1 && res.responseJSON.message === '身份认证失败！') {
        // 1. 强制清空 token
        localStorage.removeItem('token')
        // 2. 强制跳转到登录页面
        location.href = '/大事件案例/login.html'
      }
    }
    
  })