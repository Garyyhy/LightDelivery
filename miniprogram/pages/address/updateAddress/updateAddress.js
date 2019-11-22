const db = wx.cloud.database(); //初始化数据库
const cont = db.collection('address');
var app = getApp() //引用全局变量
Page({
  data: {
    name: "",
    phoneNumber: "",
    address: "",
    id: ""
  },

  onLoad: function() {
    this.setData({
      name: app.globalData.update.name,
      address: app.globalData.update.address,
      phoneNumber: app.globalData.update.phoneNumber,
      id: app.globalData.update.id
    })
  },

  formSubmit: function(e) {
    this.setData({
      name: e.detail.value.customer,
      address: e.detail.value.address,
      phoneNumber: e.detail.value.phone
    })
    db.collection('address').doc(this.data.id).update({
      data: {
        name: this.data.name,
        address: this.data.address,
        phoneNumber: this.data.phoneNumber
      },
      success: function(res) {
        console.log('更新成功')
      }
    })
    let pages = getCurrentPages();
    let prevPage = pages[pages.length - 2];
    wx.navigateBack({
      delta: 1
    })
    wx.showToast({

      title: '更新成功！',

      icon: 'success',

      duration: 2000 //持续的时间

    })

    prevPage.onLoad()

    
  }


})