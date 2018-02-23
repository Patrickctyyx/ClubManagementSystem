var app = getApp()
Page({
  data: {
  },

  onLoad: function (options) {
    console.log('onLoad')
    var that = this

    wx.request({
      url: 'http://localhost:8080/activities/' + options.id,
      success: function (res) {
        var list = res.data;
        for (var i = 0; i < list.length; ++i) {
          list[i].creator_id = toName(list[i].creator_id)
          list[i].start_time = toDate(list[i].start_time)
          list[i].last_modified = toDate(list[i].last_modified)
        }
        that.setData({ lit: list })
      }
    })

    //日期转换函数
    function toDate(number) {
      var n = number;
      var date = new Date(n);
      var Y = date.getFullYear() + '/';
      var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '/';
      var D = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
      return (Y + M + D)
    }

    function toName(id){
      wx.request({
        url: 'http://localhost:8080/userinfo/' + id,
        success:function(res){
          wx.setStorageSync('creatname', res.data.name)
        }
      })
      return wx.getStorageSync('creatname')
    } 
  },
})
