import data from "./data.js"
import dateTools from "../../tools/date.js"
import userservice from "../../service/cloud/users.js"
import accountService from "../../service/cloud/account.js"

const app = getApp();
const db = wx.cloud.database();
const todos = db.collection("todos");
const users = db.collection("users");
let loadCount = 0;

Page({


  data: {
    openid: "",
    income: 0,
    outcome: 0,

    dayList: [],
    detailList: [],

    categorys: {
      income: [{
          name: "收入",
          imgurl: "income"
        },
        {
          name: "工资",
          imgurl: "salary"
        },
        {
          name: "兼职",
          imgurl: "parttime"
        },
        {
          name: "奖金",
          imgurl: "bonus"
        },
        {
          name: "人情",
          imgurl: "relation"
        },
        {
          name: "理财",
          imgurl: "financial"
        },
      ],
      outcome: [{
          name: "支出",
          imgurl: "outcome"
        }, {
          name: "吃饭",
          imgurl: "eat"
        }, {
          name: "零食",
          imgurl: "snack"
        }, {
          name: "购物",
          imgurl: "shop"
        }, {
          name: "娱乐",
          imgurl: "ent"
        }, {
          name: "交通",
          imgurl: "traffic"
        },
        {
          name: "住房",
          imgurl: "rent"
        }, {
          name: "居家",
          imgurl: "house"
        }, {
          name: "宠物",
          imgurl: "pet"
        }, {
          name: "医疗",
          imgurl: "hospital"
        }, {
          name: "学习",
          imgurl: "study"
        }, {
          name: "其他",
          imgurl: "others"
        },
      ],

    },




    // 编辑完成后数据---------------- 
    addData: {
      date: "yyyy-mm-dd",
      number: 0,
      categorys: "",
      type: "",
      addicon:"",
      comment:""
    }


  },




  // 打开编辑器------------------------
  openKeyBoard() {
    this.setData({
      addActive: true,
    })
  },

  // 关闭编辑器-------------------------
  closeKeyBoard(e) {
    console.log("closeKeyBoard",e.detail.addActive)
    this.setData({
      addActive: e.detail.addActive,
    })

  },

  // 从后退数据库删除数据-------------
  
  routePush() {
    wx.navigateTo({
      url: '/pages/acc_overview/test',
    })
  },
  // 刷新页面------------------------
  onLoad: function(options) {
    wx.startPullDownRefresh()
    
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
    accountService(app.globalData.openid, this,1);
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage(options) {

    return {
      title: "手账本小程序",
      path: "/pages/account/account",
      imageUrl: "/assets/icon/share.png"
    }
  },
})