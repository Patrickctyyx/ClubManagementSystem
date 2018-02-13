// pages/meinfo/meinfo.js
var app = getApp();
var token, token2, id, name, grade, college, major, department, phone, qq, wechat, email, introduction, wxid, uname, ugrade, ucollege, udepatment, uphone, uqq, uwechat, uemail, uintroduction, umajor;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    token:{},
    token2:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log('onLoad');
    var that = this,uname,ugrade, ucollege, udepartment, uphone, uqq, uwechat, uemail, uintroduction, umajor;
    //调用应用实例的方法获取全局数据
    app.getToken(function (token) {
      //更新数据
      that.setData({
        token: token
      })
      //wxid = wx.getStorageSync('token1')
      //console.log('wxid'+wxid)
    })
  app.getToken(function (token) {
  })
    token2 = wx.getStorageSync('token1')
    id = wx.getStorageSync('id')
    console.log('my id:',id)
    console.log('token2:  '+token2)
    wx.request({
      url: 'http://localhost:8080/userinfo/'+id,
      data:{},
      method: 'GET',
      header: {
        'content-type': 'application/json'
      },
      success:function(r){
        console.log('my info:')
        console.log(r.data)
        that.setData({
          uname:r.data.name,
          ugrade:r.data.grade,
          ucollege: r.data.college,
          udepartment: r.data.department,
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
 PostUserinfo:function(e) {
   var that = this,token,grade,college,department,phone,qq,wechat,email,introduction,major
   console.log("个人信息提交" + e.detail.value.token)
   wx.request({
     url: 'http://localhost:8080/edit_userinfo',
     method: 'POST',
     data: {
       token: e.detail.value.token,
       name:e.detail.value.name,
       grade: e.detail.value.grade,
       college: e.detail.value.college,
       major: e.detail.value.major,
       department: e.detail.value.department,
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
       console.log('个人信息修改成功：', res.data)
     }
   })
   wx.switchTab({
     url: '../index/index'
   })
 },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})

// wx.request({
//   url: 'http://localhost:8080/edit_userinfo',
//   method: 'POST',
//   data: {
//     wx_id: app.globalData.wx_id,
//     token: app.globalData.token,
//     id: id,
//     name: name,
//     grade: grade,
//     college: college,
//     major: major,
//     department: department,
//     phone: phone,
//     qq: qq,
//     wechat: wechat,
//     email: email,
//     introduction: introduction
//   },
//   header: {
//     'content-type': 'application/json'
//   }
// })