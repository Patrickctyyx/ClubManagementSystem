// pages/SignUp/SignUp.js
var app = getApp()
Page({

  data: {
  },

  onLoad: function (options) {
    console.log('onLoad')
    this.setData({
      'uclubname': options.uname
    })
  },

  // 向某一个社团报名
  postUserinfo: function (e) {
    wx.request({
      url: 'http://localhost:8080/new_apply',
      method: 'POST',
      data: {
        club_name: this.data.uclubname,
        name: e.detail.value.name,
        grade: e.detail.value.grade,
        college: e.detail.value.college,
        major: e.detail.value.major,
        department: e.detail.value.department,
        phone: e.detail.value.phone,
        email: e.detail.value.email,
        introduction: e.detail.value.introduction
      },   
      header: {
        'content-type': 'application/json'
      },
      success:function(res){
        if (res.data.status == 'success') {
          wx.showToast({
            title: '报名成功',
            icon: 'success',
            duration: 2000
          })
        }
        else {
          wx.showModal({
            title: '申请失败',
            content: '信息填写不完整或已经存在相同信息'
          })
        }
      }
    })
  },

  onShareAppMessage: function () {
    return {
      title: '申请加入' + this.data.uclubname,
      desc: '加入心仪的社团',
      path: '/page/SignUp/SignUp?uname=' + this.data.uclubname
    }
  }
})