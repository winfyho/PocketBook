// miniprogram/pages/test/test.js
import account from "../../network/account.js"
import {
  getMonthCatTotal,
  getMonthList,
  getMonthDayTotal
} from "../../network/aggregate.js"
const app = getApp()
Page({

  onLoad: function(options) {
    // getMonthCatTotal(this,app.globalData.openid)
    // getMonthList(this, app.globalData.openid)
    getMonthDayTotal(this, app.globalData.openid)
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {
    account.getDayList({
      openid: app.globalData.openid,
      startDate: "",
      endDate: "",
    }).then(res => {
      console.log("account 请求", res)
    })
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})