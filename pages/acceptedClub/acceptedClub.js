var app = getApp();
Page({
  data: {
    warn: false
  },

  //查看社团详情
  goToActivityPage: function (e) {
    var uid = e.currentTarget.id;
    wx.navigateTo({
      url: '../activity/activity?id=' + uid
    })
    //console.log(e.currentTarget.name)
  },


  onLoad: function (options) {
    console.log('onLoad');
    var that = this
    var token = wx.getStorageSync('token')
    var id = wx.getStorageSync('uid')

    wx.request({
      url: 'http://localhost:8080/userinfo/' + id,
      success: function (res) {
        wx.setStorage({
          key: 'joinedClub',
          data: res.data.joined_club
        })
      }
    })

    var joinedClubs = wx.getStorageSync('joinedClub');
    
    var list = [];
    for (var i = 0; i < joinedClubs.length; ++i) {
      wx.request({
        url: 'http://localhost:8080/clubs/' + joinedClubs[i].club_id,
        success: re => {
          if (re.data.id) {
            // 这里不能直接 push，因为不会改变数组长度
            list[list.length] = re.data;
            that.setData({
              lits: list
            })
          }
        }
      })
    }
    // console.log(JSON.stringify(this.data.lits))
  }
})
