// pages/schedule/schedule.js
import scheduleService from "../../service/cloud/schedule.js"
import {
  getSchedules
} from "../../network/schedule.js"
import {
  getDateObj
} from "../../utils/date.js"
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
    list: [],
    dayList: [],
    reload: false,
    reachBot: false,
    reachTop: true,
    skip: 0,
    hasData: true,
    isTriggered: false,
    fresherpulling: false,
    touchStart: 0,
    triggered: false
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
      editActive: false,
      triggered: true,
    })
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
    let today = getDateObj().dateString
    getSchedules(this, app.globalData.openid, today, 0).then(dayList => {
      console.log(this.data.list)
    })
  },

  onReady: function() {},
  onShow: function() {
    if (this.data.reload) {
      this.setData({
        triggered: true,
        reload: false,
        list: [],
      })
    }
  },
  onHide: function() {},
  onUnload: function() {},


  pullRefresh(e) {
    this.setData({
      triggered: true,
      list: [],
      dayList:[],
    })
    let today = getDateObj().dateString
    console.log(today)
    getSchedules(this, app.globalData.openid, today, 0)
      .then(dayList => {
        console.log(this.data.list)
        setTimeout(() => {
          this.setData({
            triggered: false
          })
        }, 500)

      })
      .catch(err => {
        setTimeout(() => {
          this.setData({
            triggered: false
          })
          wx.showToast({
            title: '无数据',
            icon: "fail"
          })
        }, 500)

      })
  },


  reachBottom() {
    if (!this.data.reachBot && this.data.hasData) {
      console.log("下滑加载更多", this.data.skip)

      this.setData({
        reachBot: true
      })
      getSchedules(this, app.globalData.openid, getDateObj().dateString, this.data.skip)
        .then(res => {
          console.log(res)
          this.setData({
            reachBot: res.reachBot,
            // hasData:true
          })

        })
        .catch(err => {
          console.log(err)
          this.setData({
            reachBot: false,
            hasData: false
          })
        })
    }

  },


  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {}
})