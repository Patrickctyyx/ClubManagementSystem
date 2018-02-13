var app = getApp();
Page({
  data: {
  },

  //查看社团详情
  goToDetailPage: function (e){
    var uid = e.currentTarget.id;
    wx.navigateTo({
      url: '../detail/detail?id=' + uid
    })
    //console.log(e.currentTarget.name)
  },

  //主页设置可以转发分享
  onShareAppMessage: function () {
    return {
      title: '社团管理系统',
      desc: '随时随地参加自己的社团',
      path: '/page/user?id=123'
    }
  },

  onLoad: function () {
    console.log('onLoad');
    var that = this;

    // todo: 消息分页
    wx.request({
      url: 'http://localhost:8080/clubs',
      success: function (res) {
        var list = res.data
        that.setData({ lit: list })
      }
    })
  },
})
