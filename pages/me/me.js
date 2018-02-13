//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    showBadge:false,
    // todo: 这个 list 应该随着权限而改变
    meList:[
      {
        text:'已加入的社团',
        icon:'../../assets/img/me1.png',
        url:'../acceptedClub/acceptedClub'
      },
            {
        text:'申请中的社团',
        icon:'../../assets/img/me2.png',
        url:'../applyClub/applyClub'
      },
            {
        text:'绑定账户',
        icon:'../../assets/img/me3.png',
        url:'../bindinfo/bindinfo'
      },
            {
        text:'社团管理',
        icon:'../../assets/img/me4.png',
        url:'../clubSet/clubSet'
      },
            {
        text:'修改个人信息',
        icon:'../../assets/img/me5.png',
        url:'../editinfo/editinfo'
      },
    ]
  },

  onLoad: function () {
    console.log('onLoad')
    var that = this

    wx.getUserInfo({
      success: res => {
        that.setData({
          userInfo: res.userInfo
        })
      }
    })
  },

  onShareAppMessage: function () {
    return {
      title: '社团管理系统',
      desc: '随时随地参加自己的社团',
      path: '/page/user?id=123'
    }
  }
})
