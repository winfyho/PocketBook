import data from "./data.js"
import {getDateObj} from "../../utils/date.js"
import accountService from "../../service/cloud/account.js"
import accountTools from "../../service/cloud/account_tools.js"
import {_getAccounts,_getTotal} from "../../network/account.js"

const app = getApp();
let loadCount = 0;


Page({


  data: {
    curPage:0,
    month : new Date().getMonth()+1,
    openid: "",
    income: 0,
    outcome: 0,
    list:[],

    dayList: [],
    detailList: [],


    showEditor:false,
    reachBot:false,
    hasData:true


  },




  // 打开编辑器------------------------
  openEditor() {
    this.setData({
      showEditor: true,
    })
  },

  // 关闭编辑器-------------------------
  switchEditor(e) {
    console.log("switch-editor",e.detail)
    this.setData({
      showEditor: e.detail,
    })

  },

  // 从后退数据库删除数据-------------
  
  routePush() {
    wx.navigateTo({
      url: '/pages/account/pages/overview/overview',
    })
  },
  // 刷新页面------------------------
  onLoad: function(options) {
    // wx.cloud.callFunction({
    //   name: 'login',
    //   complete: res => {
    //     console.log('account login: ', res.result.openid)
    //     app.globalData = {
    //       openid: res.result.openid
    //     }
    //   }
    // })
    let dateObj = getDateObj(new Date().getTime())
    let today = dateObj.dateString.slice(0,7)
    console.log(app.globalData,today)

    _getAccounts(this,app.globalData.openid,today,0).then(dayList => {
      console.log(dayList)
    })

    _getTotal(app.globalData.openid,today).then(total => {
      console.log("总计",total)
      this.setData({
        income:total.income,
        outcome:total.outcome,
      })
    })


    
  },

  reachBottom() {
    if (!this.data.reachBot && this.data.hasData) {
      console.log("下滑加载更多", this.data.skip)

      this.setData({
        reachBot: true
      })
      _getAccounts(this, app.globalData.openid, "2020-01-01", this.data.skip)
        .then(res => {
          this.setData({
            reachBot: res.reachBot,
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




 
  onReady: function() {


  },

  
  onShow: function() {

   

  },

 
  onPullDownRefresh: function() {

    accountTools.getTotal(app.globalData.openid, this, startDate);
    this.setData({
      curPage: 0,
      dayList:[],
      detailList:[]
    })
    accountService(app.globalData.openid, this, startDate,this.data.curPage);
    
  },




  onHide: function () {

  },


  onUnload: function () {

  },

  onShareAppMessage(options) {

    return {
      title: "手账本小程序",
      path: "/pages/account/account",
      imageUrl: "/assets/icon/share.png"
    }
  },
})