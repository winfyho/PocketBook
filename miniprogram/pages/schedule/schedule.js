// pages/schedule/schedule.js
import scheduleService from "../../service/cloud/schedule.js"

const db = wx.cloud.database();
const schedule = db.collection("schedule");
const app = getApp();
let loadCount = 0;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    editActive: false,
    scheduleList: [],
    dayList: [],
    reload:false
  },

  getMess(e) {
    console.log("mess")
    wx.requestSubscribeMessage({
      tmplIds: ['ltiAaIN49pYi3baYJ-uDVKZpvFXXqanSvVJo0evqQ4k'],
      success(res) {
        console.log(res)
      },
      fail(res) {
        console.log(res);
      }
    })
  },
  editComplete(res) {
    this.setData({
      editActive: false
    })
    wx.startPullDownRefresh();
  },
  closeEditor(res) {
    this.setData({
      editActive: false
    })
  },
  showEditor() {
    this.setData({
      editActive: true
    })
  },



  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    
    wx.cloud.callFunction({
      name: 'login',
      complete: res => {
        console.log('callFunction login result: ', res.result.openid)
        app.globalData = {
          openid: res.result.openid
        }
        wx.startPullDownRefresh()


      }
    })
    // 获取数据库数据--------------
    console.log("onLoad",this.data.dayList)

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
    if(this.data.reload === true){
      wx.startPullDownRefresh()
      this.setData({
        reload: false
      })
    }

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
    scheduleService(app.globalData.openid, this);
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