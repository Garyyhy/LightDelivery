const db = wx.cloud.database(); //初始化数据库
var app = getApp()
const cont = db.collection('staff');
Page({
  data: {
    username: "",
    password: ""
  },

  formSubmit: function(e) {
    var that = this
    console.log(e)
    this.setData({
      username: e.detail.value.username,
      password: e.detail.value.password
    })
    db.collection('staff').where({
      username: this.data.username
    }).get({
      success: function(res) {
        console.log(res.data[0].password)
        app.globalData.staffName = that.data.username
        if (that.data.password == res.data[0].password) {
          wx.redirectTo({
            url: '../substituteIndex/substituteIndex',
          })
        } else {
          wx.showToast({
            title: '密码错误',
            icon:'none'
          })
        }
      }
    })
  }
})