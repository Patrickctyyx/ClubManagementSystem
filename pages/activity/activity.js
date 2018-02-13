var app = getApp();
var list = [], dat, that, id, url, name, image_url,theme,content,start_time,last_modified,creator_id,club_id;
Page({
  data: {
    list: []
  },

  //查看社团详情
  // goToDetailPage: function (e) {
  //   var uid = e.currentTarget.id;
  //   wx.navigateTo({
  //     url: '../detail/detail?id=' + uid
  //   })
  //   //console.log(e.currentTarget.name)
  // },

  //事件处理函数
  // bindViewTap: function (options) {
  //   wx.navigateTo({
  //     url: '../logs/logs'
  //   });
  // },

  onLoad: function (options) {
    console.log('onload');
    var that = this;
    id = options.id
    url = 'http://localhost:8080/activities/'+id;
    queryRequest(url)

    function queryRequest(url) {
      wx.request({
        url: url,
        data: {},
        method: 'GET',
        header: {
          'content-type': 'application/json'
        },
        success: function (res) {
          dat = res.data;
          list = res.data;
          console.log('显示所有活动：');
          console.log(res.data);

          for (var i = 0; i < dat.length; ++i) {
            //load_time = 1;
            dat = res.data;
            list = res.data;
            console.log(dat.length);
            for (var i = 0; i < dat.length; ++i) {
              list[i].id = res.data[i].id;
              list[i].theme = res.data[i].theme;
              list[i].content = res.data[i].content;
              list[i].start_time = toDate(res.data[i].start_time);
              //console.log(list[i].name);
              list[i].club_id = res.data[i].club_id;
              list[i].creator_id = toName(res.data[i].creator_id);
              list[i].last_modified = toDate(res.data[i].last_modified);
            }
            that.setData({ lit: list })
          }
        }

      })
    }

    //日期转换函数
    function toDate(number) {
      var n = number;
      var date = new Date(n);
      var Y = date.getFullYear() + '/';
      var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '/';
      var D = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
      return (Y + M + D)
    }

    function toName(number){
      var id = number;
      wx.request({
        url: 'http://localhost:8080/userinfo/'+id,
        data: {},
        method: 'GET',
        header: {
          'content-type': 'application/json'
        },
        success:function(res){
          //return res.data.name
          wx.setStorageSync('creatname', res.data.name)
        }

      })
      return wx.getStorageSync('creatname')
    } 


  },


})
