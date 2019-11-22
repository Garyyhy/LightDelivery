const db = wx.cloud.database(); //初始化数据库
const cont = db.collection('grab');
var app = getApp() //引用全局变量
Page({

  data: {
    array: [],
    count:""
  },
  //从数据库查询我的订单（使用openid为查询条件）
  onLoad: function(e) {
    var that = this
    var openid = app.globalData.openid
    db.collection('grab').where({
      _openid: openid
    }).get({
      success(res) {
        // res.data 是包含以上定义的两条记录的数组
        console.log(res.data)
        that.setData({
          array: res.data.reverse(),//倒叙
          count: res.data.length
        })
      }
    })
  },

  onGotUserInfo: function(e) {
    console.log(e)
  },

  allOrders: function() {
    var that = this
    var openid = app.globalData.openid
    db.collection('grab').where({
      _openid: openid
    }).get({
      success(res) {
        // res.data 是包含以上定义的两条记录的数组
        console.log(res.data)
        that.setData({
          array: res.data.reverse(),
          count: res.data.length
        })
      }
    })
  },

  unfinishedOrders:function(){
    var that = this
    var openid = app.globalData.openid
    db.collection('grab').where({
      _openid:openid,
      state:'未完成'
    }).get({
      success(res){
        console.log(res.data)
        that.setData({
          array: res.data.reverse(),
          count: res.data.length
        })
      }
    })
  },

  grabOrders: function () {
    var that = this
    var openid = app.globalData.openid
    db.collection('grab').where({
      _openid: openid,
      state: '已取件'
    }).get({
      success(res) {
        console.log(res.data)
        that.setData({
          array: res.data.reverse(),
          count: res.data.length
        })
      }
    })
  },

  finishedOrders: function () {
    var that = this
    var openid = app.globalData.openid
    db.collection('grab').where({
      _openid: openid,
      state: '已完成'
    }).get({
      success(res) {
        console.log(res.data)
        that.setData({
          array: res.data,
          count: res.data.length
        })
      }
    })
  },

})