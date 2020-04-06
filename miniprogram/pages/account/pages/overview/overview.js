// miniprogram/pages/account/pages/overview/overview.js
import accountService from "../../../../service/cloud/account.js"
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    pagers: [
      {name: "分析"},{name: "全部"},{name: "按天"},
    ],
    curPager: 0,
    detailList:[],
    dayList:[],
    catName:"全部"
  },
  showCatList(res){
    this.setData({
      curPager: res.detail.index,
      catName: res.detail.name 

    })
    var catDetail = this.selectComponent('.catDetail')
    console.log(res)
    
    catDetail.setData({
      typeName: res.detail.name,
      month: res.detail.month,
      year: res.detail.year
    })
    console.log("view-changePager", this.data.curPager, this.data.catName);
  },
  changePager(res) {
    this.setData({
      curPager: res.detail.index,

    })
    console.log("view-changePager", this.data.curPager, this.data.catName);

  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
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