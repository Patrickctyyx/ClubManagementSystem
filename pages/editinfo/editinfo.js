// pages/meinfo/meinfo.js
var app = getApp()
Page({

  data: {
  },

  onLoad: function (options) {
    console.log('onLoad');
    var that = this
    var id = wx.getStorageSync('uid')
    wx.request({
      url: 'http://localhost:8080/userinfo/' + id,
      success: function (r) {
        // console.log(r.data)
        that.setData({
          uname: r.data.name,
          ugrade: r.data.grade,
          ucollege: r.data.college,
          uphone: r.data.phone,
          uqq: r.data.qq,
          uwechat: r.data.wechat,
          uemail: r.data.email,
          uintroduction: r.data.introduction,
          umajor: r.data.major
        })
      }
    })
  },

  // 提交表单事件
  postUserinfo: function (e) {
    var that = this
    var token = wx.getStorageSync('token')
    wx.request({
      url: 'http://localhost:8080/edit_userinfo',
      method: 'POST',
      data: {
        token: token,
        name: e.detail.value.name,
        grade: e.detail.value.grade,
        college: e.detail.value.college,
        major: e.detail.value.major,
        phone: e.detail.value.phone,
        qq: e.detail.value.qq,
        wechat: e.detail.value.wechat,
        email: e.detail.value.email,
        introduction: e.detail.value.introduction
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        // console.log('个人信息修改成功：', res.data)
        if (res.data.status == 'success') {
          wx.showToast({
            title: '个人信息修改成功',
            icon: 'success',
            duration: 2000
          })
        }
      }
    })
    wx.switchTab({
      url: '../index/index'
    })
  }
})
