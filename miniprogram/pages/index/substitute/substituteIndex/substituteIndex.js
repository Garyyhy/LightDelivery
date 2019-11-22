Page({
  data: {

  },

  gotoGrab: function() {
    wx.navigateTo({
      url: '../substituteGrab/substituteGrab',
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
  },

  gotoDelivery:function(){
    wx.navigateTo({
      url: '../substituteDelivery/substituteDelivery',
    })
  }
})