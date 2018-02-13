var app = getApp();
Page({
  data: {
  },

  onLoad: function (options) {
    console.log('onLoad');
    var that = this
    var token = wx.getStorageSync('token')
    var id = wx.getStorageSync('uid')

    wx.request({
      url: 'http://localhost:8080/userinfo/' + id,
      success: function (res) {
        // console.log(res.data)
        wx.setStorage({
          key: 'userJSON',
          data: res.data
        })
      }
    })
   
    var phone = wx.getStorageSync('userJSON').phone
    wx.request({
      url: 'http://localhost:8080/user/applied/' + phone,
      success: function (res) {
        // console.log(res.data)
        wx.setStorage({
          key: 'appliedClub',
          data: res.data
        })
      }
    })

    var appliedClubs = wx.getStorageSync('appliedClub')
    var list = []
    for (var i = 0; i < appliedClubs.length; ++i) {
      wx.request({
        url: 'http://localhost:8080/clubs/' + appliedClubs[i].club_id,
        success: re => {
          if (re.data.id) {
            list[list.length] = re.data
          }
          that.setData({
            lits: list
          })
        }
      })
    }
  }
})