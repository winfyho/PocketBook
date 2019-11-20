const app = getApp();
const db = wx.cloud.database();
const todos = db.collection("todos");
const users = db.collection("users");

import http from '../../service/nerwork.js'
// console.log(http+"http");

Page({

  data: {


    nowdate: new Date().toLocaleString(),
    list: [
      "衣服",
      "裤子",
      "鞋子",
    ],
    infor: 0,

    json: [],

    activePager: "activePager",

    backdata:'back'
  },
  
  routePush(){
    wx.navigateTo({
      url: '/pages/setting/setting',
    })
    console.log("setting")
  },


  // 展示弹窗
  toast() {
    wx.showToast({
      title: '已完成',
      mask: true,
      icon: "success",
      duration: 300,
      success: function() {},
      fail: function() {},
      complete: function() {},
    });

  },
  // 展示弹窗，确定，取消按钮
  modal(){
    wx.showModal({
      title: '提示信息',
      content: '提示信息',
      showCancel:false,
      success:function(res){
        if(res.confirm){
          console.log("确定");
        }else{
          console.log("取消");

        }
      }
    })
  },
  // 加载弹窗
  loading(){
    wx.showLoading({
      title: 'loading',
      mask:true
    })
    setTimeout(()=>{
      // 关闭弹窗
      wx.hideLoading();
    },1000)
  },

  // 底部弹窗
  ActionSheet(){
    wx.showActionSheet({
      itemList: ["66","77"],
      success:function(res){
        console.log(res.tapIndex)
      }
    })
  },

  onShareAppMessage(options){

    return{
      title:"笔记本小程序",
      path:"/pages/account/account",
      imageUrl:"/assets/icon/home_active.png"
    }
  },

  onLoad() {
    db.collection('todos').field({
      _id:false,
      item:{
        category:true,
        number:true,
      }
      
    })
    .get()
    .then(res => {
      console.log("overview",res.data)
    })



    const $ = db.command.aggregate
    db.collection('todos')
      .aggregate()
      .match({
        _openid: 'orjJX42LYGJoRnrfWXfptcyND6kM'
      })
      .group({
        _id: '$item.category',
        value: $.sum('$item.number'),
        percent: $.sum(0)
      })
      .sort({
        value: -1
      })
      .end().then(res => {
        console.log(res.list)
        let list = res.list;
        let base = list[0].value;
        for(let i=0; i<list.length; i++){
          list[i].percent = parseFloat(list[i].value/base) * 100
        }
        console.log(list)

      })
    















    // http({
    //   url: "http://www.goodlyric.com/xylx/book/list"
    // }).then(res => {
    //   // 回调函数
    //   console.log(res.data.data)
    // }).catch(err => {
    //   console.log(err)
    // })

    // 网络请求
    // wx.request({
    //   url: 'http://www.goodlyric.com/xylx/book/list',
    //   method: 'get',
    //   data: {

    //   },
    //   success: (res) => {
    //     this.setData({
    //       json: res.data.data
    //     })
    //     console.log(this.data.json);

    //   },
    //   fail:(err) => {
    //     console.log(err);
    //   }
    // })
  },

  // 获取组件对象，通过调用组件的方法，改变组件内的数据
  getCom() {
    const elm = this.selectComponent('#pager')
    // console.log(elm);
    elm.incre(2);

  },



  changePager(res) {
    console.log(res.detail.name);
    this.setData({
      activePager: res.detail.name
    })
  },

 

  itemclick(e) {
    console.log(e.currentTarget);
  },
  touchstart() {
    console.log("touchstart");
  },
  touchmove() {
    console.log("touchmove");
  },
  touchend() {
    console.log("touchend");
  },
  tap(e) {
    console.log(e);
  },
  longpress() {
    console.log("longpress");
  },





  getUser(event) {
    console.log(event)
  },
  choose() {
    console.log("选择图片");
    wx.chooseImage({
      success: (res) => {
        console.log(res);

      },
    })
  },

  loadimg() {
    console.log("图片加载完成")
  }
})