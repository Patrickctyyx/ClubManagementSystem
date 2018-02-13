//app.js
App({
  globalData: {
  },

  onLaunch: function () {
    //调用API从本地缓存中获取数据
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    this.getToken()

    // 获取用户信息
    wx.getSetting({
      success: res => {      
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo
              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },

  onShareAppMessage: function () {
    return {
      title: '社团管理系统',
      desc: '随时随地参加自己的社团',
      path: '/page/user?id=123'
    }
  },

  getToken: function(){
    var that = this
    var flag = false
    wx.login({
      success: res => {
        if (res.code) {
          wx.request({
            url: 'http://localhost:8080/wxlogin',
            data: {
              'js_code': res.code
              // 'js_code': 'code'
            },
            header: {
              "content-type": "application/json"
            },
            method: 'POST',
            success: r => {
              if (r.data.status === 'error') {
                wx.showModal({
                  title: '登录失败',
                  content: '是否重新登录？',
                  success: function (res) {
                    if (res.confirm) {
                      that.getToken()
                    } else if (res.cancel) {
                      wx.showToast({
                        title: '登录失败',
                        icon: 'none'
                      })
                      flag = true
                    }
                  }
                })
              }
              if (flag) {
                return
              }
              wx.setStorage({
                key: "token",
                data: r.data.token
              })
              wx.setStorage({
                key: "uid",
                data: r.data.id
              })
            }
          })
        }
        else {
          wx.showModal({
            title: '登录失败',
            content: '是否重新登录？',
            success: function (res) {
              if (res.confirm) {
                that.getToken()
              } else if (res.cancel) {
                wx.showToast({
                  title: '登录失败',
                  icon: 'none'
                })
                console.log('获取用户登录态失败！' + res.errMsg)
              }
            }
          })
        }
      }
    })
  }
})
// todo: 先把所有的代码整理一下，然后就是各种小问题例如 token 过期重新获取，post 内容检查等等
// todo: 还有很多 api 没写成页面