// pages/account/components/overview/category-table/category-table.js
import accountTools from "../../../../../../service/cloud/account_tools.js"
const app = getApp();

Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    year : new Date().getFullYear(),
    month: new Date().getMonth() + 1,
    
    inProList: [],
    outProList: [],

    inTotal:0,
    outTotal:0,

    inMax:0,
    outMax:0,

    inAvg:0,
    outAvg:0,
    
    active:false,
  },

  /**
   * 组件的方法列表
   */
  methods: {

    routeToList(e){
      // console.log(e.currentTarget.dataset.name);
      let m = this.data.month < 10 ? '0' + this.data.month : this.data.month
      wx.showToast({
        title: '',
        icon:'loading',
        duration:800
      })
      this.triggerEvent('change', {
        name: e.currentTarget.dataset.name,
        index:1,
        month: this.data.month,
        year: this.data.year,

      }, {})
    },

    changeMonth(e){
      console.log(e.currentTarget.dataset.month)
      let m = e.currentTarget.dataset.month;
      this.setData({
        month:m,
        active: true,

        show: false,
      })
      accountTools.getTypeTable(app.globalData.openid, this, this.data.month, "outcome")
      accountTools.getTypeTable(app.globalData.openid, this, this.data.month, "income")
    }
  },
  pageLifetimes: {
    show: function () {

      accountTools.getTypeTable(app.globalData.openid, this, this.data.month, "outcome")
      accountTools.getTypeTable(app.globalData.openid, this, this.data.month, "income")


    },

  },

})
