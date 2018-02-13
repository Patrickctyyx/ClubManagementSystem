// pages/bindinfo/bindinfo.js
var app = getApp();
var phone, email, token;
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log('onLoad');
    var that = this;
    //调用应用实例的方法获取全局数据
    app.getToken(function (token) {
      //更新数据
      that.setData({
        token: token
      })
    })
    //console.log(token)
  },

  //手机号查询函数
  Phonefind: function (e) {
    console.log('提交信息：', e.detail.value.token)
    var that = this, token;
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
      }
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