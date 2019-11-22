const db = wx.cloud.database(); //初始化数据库
var app = getApp()//引用全局变量
Page({

  data: {
    _id:''
  },

  formSubmit: function(e) {
    if (!e.detail.value.customer) {
      wx.showToast({

        title: '收件人姓名未填！',

        icon: 'none',

        duration: 2000//持续的时间

      })
    } else if (!e.detail.value.address) {
      wx.showToast({

        title: '收件地址未填！',

        icon: 'none',

        duration: 2000//持续的时间

      })
    } else if (!e.detail.value.phone) {
      wx.showToast({

        title: '收件人电话号码未填！',

        icon: 'none',

        duration: 2000//持续的时间

      })
    } else {
      //无误添加订单内容到云数据库
      var _id;
      var that=this;
      db.collection('address').add({
        data: {
          name: e.detail.value.customer,
          address: e.detail.value.address,
          phoneNumber: e.detail.value.phone
        },
        success(res){
          console.log(res._id)
          console.log('添加成功')
          }
      })
      //返回上一页并调用上一页的onLoad()
      let pages = getCurrentPages();
      let prevPage = pages[pages.length - 2];
      wx.navigateBack({
        delta: 1
      })
      wx.showToast({

        title: '添加成功！',

        icon: 'success',

        duration: 2000//持续的时间

      })

      
      prevPage.onLoad()
      


    }

  },

  formReset:function(){
    wx.showToast({

      title: '重置成功！',

      icon: 'success',

      duration: 2000//持续的时间

    })
  }
})