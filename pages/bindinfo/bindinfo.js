// pages/bindinfo/bindinfo.js
var app = getApp();
var phone,email,token;
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  onLoad: function (options) {
    console.log('onLoad');
  },

  //绑定账户函数
  bindAccount: function (e) {
    console.log('提交信息：',e.detail.value.token)
    var that = this
    var token = wx.getStorageSync('token')
    wx.request({
      url: 'http://localhost:8080/bind_account',
      method: 'POST',
      data: {
        token: e.detail.value.token,
        phone: e.detail.value.phone,
        email: e.detail.value.email
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        console.log('绑定成功：', res.data)
        console.log(res.data)
        if (res.data.status == 'success') {
          wx.showToast({
            title: '成功',
            icon: 'success',
            duration: 2000
          })
        }
        else {
          wx.showModal({
            title: '绑定失败',
            content: '该账号已经绑定过了',
            success: function (res) {
              if (res.confirm) {
                console.log('用户点击确定')
              } else if (res.cancel) {
                console.log('用户点击取消')
              }
            }
          })
        }
      }
    }),
    wx.switchTab({
      url: '../index/index'
    })
  }
})