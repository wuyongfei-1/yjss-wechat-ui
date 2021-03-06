// pages/order_water/order_water.js
var util = require('../../utils/util.js')
time: util.formatTime(new Date)
const { $Toast } = require('../../dist/base/index');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    current: 'order_water',
    orderArray: [],
    notification: ''
  },

  handleChange({ detail }) {
    this.setData({
      current: detail.key
    });

    if (detail.key === 'buy_water') {
      wx.redirectTo({
        url: '../buy_water/buy_water',
      })
    } else if (detail.key === 'remind') {
      wx.redirectTo({
        url: '../notification/notification',
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({
      title: '加载中',
    })
    var vm = this;
    vm.setData({
      "notification": wx.getStorageSync('notification')
    })
    wx.request({
      url: 'https://p5c.top/wechat/water_order?accountId=' + wx.getStorageSync('uid'),
      success: function (obj) {
        for (var index in obj.data.data) {
          var data = obj.data.data[index];
          var createdOn = new String(data.createdOn);
          var handleCompleteDateTime = new String(data.handleCompleteDateTime);
          obj.data.data[index].createdOn = createdOn.replace('T', ' ').substring(0, createdOn.lastIndexOf('.'));
          obj.data.data[index].handleCompleteDateTime = handleCompleteDateTime.replace('T', ' ').substring(0, createdOn.lastIndexOf('.'));
        }
        vm.setData({
          orderArray: obj.data.data
        })
        wx.hideLoading();
      },
      fail: function () {
        wx.hideLoading();
        $Toast({
          content: '信息获取失败',
          type: 'error'
        });
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})