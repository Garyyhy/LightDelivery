const db = wx.cloud.database(); //初始化数据库
const cont = db.collection('address');
var app = getApp()//引用全局变量
Page({
  data: {
    addressArray: [],
    index: '0'
  },

  onLoad: function() {
    var that = this;
    var openid = app.globalData.openid
    db.collection('address').where({
      _openid: openid
    }).get({
      success(res) {
        // res.data 是包含以上定义的两条记录的数组
        console.log(res.data)

        that.setData({
          addressArray: res.data.reverse()
        })
      }
    })
  },

  addAddress: function() {
    wx.navigateTo({
      url: '../addAddress/addAddress',
    })
  },

  // 删除收货地址
  // deleteAddress: function(e) {
  //   var that = this
  //   var id = e.currentTarget.dataset.id
  //   console.log(e);
  //   db.collection('address').doc(id).remove({
  //     success: function(res) {
  //       wx.showModal({
  //         title: '',
  //         content: '删除成功！',
  //       })
  //       that.setData({
  //         addressArray: []
  //       })
  //       that.onLoad()
  //     }
  //   })
  // },

  //选择收货地址保存到全局变量
  select_addr: function(e) {
    console.log(e)
    app.globalData.userAddress = {
      address: e.currentTarget.dataset.address,
      name: e.currentTarget.dataset.name,
      phoneNumber: e.currentTarget.dataset.phonenumber,
    }
    console.log(app.globalData.userAddress)
  //用页面栈返回上一页（页面栈也可用于传递参数，比如收货地址的传递）
    let pages = getCurrentPages();
    wx.navigateBack({
      delta:1
    })

    // wx.navigateTo({
    //   url: '../../index/grab/grab',
    // })

  }
})