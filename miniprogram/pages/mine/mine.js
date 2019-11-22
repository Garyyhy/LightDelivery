const db = wx.cloud.database(); //初始化数据库
const cont = db.collection('grab');
var app = getApp()//引用全局变量
Page({

  data: {
    openid: '',
    array: []
  },

  
  onGotUserInfo: function(e) {
    console.log(e)
  },

goToMyOrders:function(){
  wx.navigateTo({
    url: '../orders/checkorders',
  })
},

  goToMyAddress: function () {
    wx.navigateTo({
      url: '../address/myAddress/myAddress',
    })
  }

})