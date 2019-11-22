const db = wx.cloud.database(); //初始化数据库
var app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    array: [{
        id: 0,
        name: '请选择快递点'
      },
      {
        id: 1,
        name: '韵达快递'
      },
      {
        id: 2,
        name: '中通快递'
      },
      {
        id: 3,
        name: '京东快递'
      },
      {
        id: 4,
        name: '妈妈驿站'
      }
    ],
    index: 0,
    arrayWeight: [{
        id: 0,
        name: '请选择快递的重量'
      },
      {
        id: 1,
        name: '小件'
      },
      {
        id: 2,
        name: '中小件'
      },
      {
        id: 3,
        name: '中件'
      },
      {
        id: 4,
        name: '中大件'
      },
      {
        id: 5,
        name: '大件'
      }
    ],
    indexWeight: 0,
    arrayTime: [{
        id: 0,
        time: '请选择收货时间',
      },
      {
        id: 1,
        time: '早上10:25~12:00',
      },
      {
        id: 2,
        time: '中午13:00~14:00',
      },
      {
        id: 3,
        time: '下午15:35~17:30',
      },
      {
        id: 4,
        time: '晚上19:00~21:00',
      },
    ],
    indexTime: 0,

    time: "",
    place: "",
    weight: "",
    code: "",
    note: "",
    name: "",
    address: "",

    select_address: null,
    payed_address: null,
    payed_name: null,
    payed_phoneNumber: null
  },

  onShow: function() {
    if (app.globalData.userAddress == null) {
      this.setData({
        select_address: false
      })
    } else {
      this.setData({
        select_address: true,
        payed_address: app.globalData.userAddress.address,
        payed_name: app.globalData.userAddress.name,
        payed_phoneNumber: app.globalData.userAddress.phoneNumber
      })
    }
  },
  //快递点选择
  bindPickerChange: function(e) {
    var place;
    console.log('地点选择改变，携带值为', e.detail.value)
    console.log('地点名字', this.data.array[e.detail.value].name)
    this.setData({
      index: e.detail.value,
      place: this.data.array[e.detail.value].name
    })
  },
  //重量选择
  bindPickerChangeWeight: function(e) {
    var weight;
    console.log('重量选择改变，携带值为', e.detail.value)
    this.setData({
      indexWeight: e.detail.value,
      weight: this.data.arrayWeight[e.detail.value].name
    })
  },
  //送货时间选择
  bindPickerChangeTime: function(e) {
    var time;
    console.log('时间选择改变，携带值为', e.detail.value)
    console.log('时间', this.data.arrayTime[e.detail.value].time)
    this.setData({
      indexTime: e.detail.value,
      time: this.data.arrayTime[e.detail.value].time
    })
  },
  //操作遗漏提示
  formSubmit: function(e) {
    console.log(e)
    if (this.data.select_address == false) {
      wx.showToast({

        title: '请选择收货地址！',

        icon: 'none',

        duration: 2000 //持续的时间

      })
    }
    else if (e.detail.value.place == 0) {
      wx.showToast({

        title: '请选择快递点！',

        icon: 'none',

        duration: 2000 //持续的时间

      })
    } else if (e.detail.value.weight == 0) {
      wx.showToast({

        title: '请选择快递重量！',

        icon: 'none',

        duration: 2000 //持续的时间

      })
    } else if (e.detail.value.time == 0) {
      wx.showToast({

        title: '请选择收货时间！',

        icon: 'none',

        duration: 2000 //持续的时间

      })
    } else if (!e.detail.value.code) {
      wx.showToast({

        title: '请输入取件码！',

        icon: 'none',

        duration: 2000 //持续的时间

      })
    } else {
      //无误添加订单内容到云数据库
      db.collection('grab').add({
        data: {
          type: '帮取',
          place: this.data.place,
          weight: this.data.weight,
          time: this.data.time,
          code: e.detail.value.code,
          note: e.detail.value.note,
          state: '未完成',
          address: app.globalData.userAddress,
          staff: '未指派'
        }
      })
      
      let pages = getCurrentPages();
      wx.navigateBack({
        delta: 1
      })
      //提交成功弹窗提醒
      wx.showToast({

        title: '提交成功',

        icon: 'success',

        duration: 2000 //持续的时间

      })
    }
  },
  //重置成功弹窗提醒
  showWindowsReset: function() {
    wx.showToast({

      title: '重置成功',

      icon: 'success',

      duration: 2000 //持续的时间

    })
  },

  //跳转页面到选择地址
  chooseAddress: function() {
    wx.navigateTo({
      url: '../../address/chooseAddress/chooseAddress',
    })
  },



})