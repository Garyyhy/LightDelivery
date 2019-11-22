// pages/index/index.js
var app = getApp() //引用全局变量
Page({
  //寄东西页面跳转
  gotoGrab: function() {
    wx.navigateTo({
      url: 'grab/grab',
    })
  },
  //取东西页面跳转
  gotoSub: function() {
    wx.navigateTo({
      url: 'substitute/substituteLogin/substituteLogin',
    })
  },

  onReady: function() {
    var openid;
    wx.cloud.callFunction({
      name: 'login',
      complete: res => {
        console.log('callFunction test result: ', res),
          app.globalData.openid = res.result.openid
        console.log(app.globalData.openid)
      }
    })
  },

})