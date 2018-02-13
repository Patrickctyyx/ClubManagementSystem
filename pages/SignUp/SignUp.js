// pages/SignUp/SignUp.js
var app = getApp();
var list = [], dat, url,that, id, uid, uname,ugrade,ucollege,umajor,uclubname,udepartment,uphone,uemail,uintroduction,club_name,grade,college,introduction,name,major,department,phone,email
Page({

  /**
   * 页面的初始数据
   */
  data: {
    name:'1',
    club_name:'2',
    college:'2',
    department:'2',
    email:'2',
    phone:'2',
    major:'2',
    grade:'2'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log('onLoad')
    var that = this;
    uid = options.uid;
    url = 'http://localhost:8080/clubs?id=' + uid;
    console.log('uid:')
    console.log(uid)
    queryRequest(url)
    //console.log(club_name)
    function queryRequest(url) {
      wx.request({
        url: url,
        data: {},
        method: 'GET',
        header: {
          'content-type': 'application/json'
        },
        success: function (res) {
          //console.log('good');
          dat = res.data;
          //console.log('显示所有社团：');
          //console.log(res.data);
          // console.log(dat.length);
          //console.log(id);   
          for (var i = 0; i < dat.length; i++) {
            if (uid == res.data[i].id) {
              that.setData({
                uclubname: res.data[i].name
              });
            }
          }
          //console.log(res.data[0].id)
        }

      })
    }
 

    //调用应用实例的方法获取全局数据
    // that.setData({
    //   token: app.globalData.token
    // })
  },

  // 向某一个社团报名
  PostUserinfo: function (e) {
    var club_name, grade, college, introduction, name, major, department, phone, email,that=this;
    console.log(e.detail.value.club_name)
    wx.request({
      url: 'http://localhost:8080/new_apply',
      method: 'POST',
      data: {
        club_name: e.detail.value.club_name,
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
      // console.log(club_name)
      success:function(res){
        console.log('报名成功：', res.data)
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
            content: '信息填写不完整或已经存在相同信息',
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