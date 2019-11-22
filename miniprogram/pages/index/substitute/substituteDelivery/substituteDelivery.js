const db = wx.cloud.database(); //初始化数据库
var app = getApp() //引用全局变量

Page({
  data: {
    deliveryArray: [],
    orderCount: ""
  },

  onLoad: function() {
    var that = this
    db.collection('grab').where({
      state: '已取件',
      staff: app.globalData.staffName
    }).get({
      success: function(res) {
        that.setData({
          deliveryArray: res.data.reverse(),
          orderCount: res.data.length
        })
      }
    })
  },

  success: function (e) {
    var that = this
    wx.cloud.callFunction({
      // 云函数名称
      name: 'update',
      // 传给云函数的参数
      data: {
        state: '已完成',
        _id: e.currentTarget.dataset.id,
        staff: app.globalData.staffName
      },
      success: function (res) {
        console.log(res)
        db.collection('grab').where({
          state: '已取件'
        }).get({
          success: function (res) {
            console.log(res)
            that.setData({
              deliveryArray: res.data.reverse()
            })
            wx.showToast({

              title: '操作成功！',

              icon: 'success',

              duration: 2000 //持续的时间

            })
          }
        })
      },
      fail: console.error
    })

  }

})