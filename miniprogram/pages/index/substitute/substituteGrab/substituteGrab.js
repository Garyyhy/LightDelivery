const db = wx.cloud.database(); //初始化数据库
var app = getApp()//引用全局变量

Page({
  data: {
    array: [
      {
        id: 0,
        name: '韵达快递'
      },
      {
        id: 1,
        name: '中通快递'
      },
      {
        id: 2,
        name: '京东快递'
      },
      {
        id: 3,
        name: '妈妈驿站'
      }
    ],
    index: 0,
    grabArray:[],
    place:'韵达快递'
  },

  onLoad:function(){
    var that = this
    db.collection('grab').where({
      place:this.data.place,
      state:'未完成'
    }).get({
      success:function(res){
        that.setData({
          grabArray: res.data.reverse()
        })
      }
    })
  },

  bindPickerChange: function(e) {
    var place
    var that = this
    console.log('地点选择改变，携带值为', e.detail.value)
    console.log('地点名字', this.data.array[e.detail.value].name)
    this.setData({
      index: e.detail.value,
      place: this.data.array[e.detail.value].name
    })
    db.collection('grab').where({
      place:this.data.place,
      state:'未完成'
    }).get({
      success:function(res){
        console.log(res)
        that.setData({
          grabArray: res.data.reverse()
        })
        console.log(that.data.grabArray)
      }
    })
  },

  //因为云数据库的限制不能使用通常办法进行数据库的写和更新，就使用下面的云函数进行写入
  // success:function(e){
  //   console.log(e)
  //   var that = this
  //   db.collection('grab').doc(e.currentTarget.dataset.id).update({
  //     data:{
  //       state:'已取件'
  //     },
  //     success:function(res){
  //       console.log('取货操作成功！')
  //     }
      
  //   }),
  //     wx.showToast({

  //       title: '操作成功！',

  //       icon: 'success',

  //       duration: 2000 //持续的时间

  //     })
  //   db.collection('grab').where({
  //     place: this.data.place,
  //     state: '未完成'
  //   }).get({
  //     success: function (res) {
  //       console.log(res)
  //       that.setData({
  //         grabArray: res.data
  //       })
  //     }
  //   })
  // }
  
  success:function(e){
    var that = this
    wx.cloud.callFunction({
      // 云函数名称
      name: 'update',
      // 传给云函数的参数
      data: {
        state: '已取件',
        _id: e.currentTarget.dataset.id,
        staff:app.globalData.staffName
      },
      success: function (res) {
        console.log(res)
        db.collection('grab').where({
      place: that.data.place,
      state: '未完成'
    }).get({
      success: function (res) {
        console.log(res)
        that.setData({
          grabArray: res.data.reverse()
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