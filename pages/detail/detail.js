var app = getApp();
Page({
  data: {
  },

  gotoSignUpPage:function(){     //跳转到报名界面
    wx.navigateTo({
      url: '../SignUp/SignUp?uname=' + this.data.uname
    })
  },

  onLoad: function (options) {
    console.log('onload');
    // 页面初始化 options为页面跳转所带来的参数
    var that = this;
    var id = options.id
    // console.log(id)

    wx.request({
      url: 'http://localhost:8080/clubs/' + id,
      success: function (res) {
        // console.log(res)
        that.setData({
          uid: id,
          uname: res.data.name,
          utype: res.data.type,
          uintroduction: res.data.introduction,
          uimage_url: res.data.image_url
        });
      }
    })
  }
})