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
    scheduleList: [],
    list: [],
    schedules: [],
    dayList: [],
    reload: false,
    reachBot: false,
    reachTop: true,
    skip: 0,
    hasData: true,
    isTriggered: false,
    fresherpulling: false,
    touchStart: 0
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
    let today = getDateObj().dateString
    getSchedules(this, app.globalData.openid, "2020-01-01", 0).then(dayList => {
      console.log(this.data.list)

    })

  },

  onReady: function() {},
  onShow: function() {},
  onHide: function() {},
  onUnload: function() {},
  scroll(e) {
    if (e.detail.scrollTop < 50) {
      this.setData({
        reachTop: true,
      })
      // console.log("reach-top",e, e.detail.scrollTop)
    }
  },
  startRefresh(e) {
    this.setData({
      fresherpulling: true,
      touchStart: e.touches[0].clientY
    })
  },
  onRefresh(e) {
    if (!this.data.isTriggered) {
      // console.log("下拉刷新中", e.touches[0].clientY)
      this.setData({
        isTriggered: true
      })
    }
  },
  endRefresh(e) {
    if (e.changedTouches[0].clientY - this.data.touchStart > 180 && this.data.reachTop) {
      console.log("触发下拉刷新", e.changedTouches[0].clientY)
      wx.showToast({
        title: '加载中',
        icon:"loading"
      })
      setTimeout(() => {
        this.setData({
          isTriggered: false
        })
      }, 1000)
    } else {
      let delta = e.changedTouches[0].clientY - this.data.touchStart
      // console.log("下拉刷新被复位", delta)
      if (delta >= 0) {
        this.setData({
          isTriggered: false,
        })
      }

      if (delta < 0) {
        this.setData({
          reachTop: false
        })
      }
    }

  },

  reachBottom() {
    if (!this.data.reachBot && this.data.hasData) {
      console.log("下滑加载更多", this.data.skip)

      this.setData({
        reachBot: true
      })
      getSchedules(this, app.globalData.openid, "2020-01-01", this.data.skip)
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