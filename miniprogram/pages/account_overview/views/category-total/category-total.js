// pages/account/components/overview/category-table/category-table.js
// import accountTools from "../../../../../../service/cloud/account_tools.js"
import {getMonthCatTotal} from "../../../../network/aggregate.js"
import {getDateObj} from "../../../../utils/date.js"
const app = getApp();
let today = getDateObj()
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
    year: new Date().getFullYear(),
    month: new Date().getMonth() + 1,

    incList:[],
    outList:[],

    incTotal:0,
    outTotal:0,

    inMax: 0,
    outMax: 0,

    inAvg: 0,
    outAvg: 0,

    active: false,
    show:true,
  },

  /**
   * 组件的方法列表
   */
  methods: {

    routeToList(e) {
      // console.log(e.currentTarget.dataset.name);
      let m = this.data.month < 10 ? '0' + this.data.month : this.data.month
      wx.showToast({
        title: '',
        icon: 'loading',
        duration: 800
      })
      this.triggerEvent('change', {
        name: e.currentTarget.dataset.name,
        index: 1,
        month: this.data.month,
        year: this.data.year,

      }, {})
    },

    changeMonth(e) {
      let month = e.currentTarget.dataset.month;
      let year= today.year
      let year_month = `${year}-${month < 10 ? '0'+month:month}`
      console.log(year_month)

      this.setData({
        month,
        year_month,
        show: false,
      })
      getMonthCatTotal(this, app.globalData.openid,year_month).then(result => {
        console.log(result)
        this.setData({
          show: true
        })
      })
      
    }
  },
  lifetimes: {
    attached: function () {
      let year_month = today.dateString.slice(0,7)
      console.log()
      
      getMonthCatTotal(this, app.globalData.openid,year_month).then(result => {
        console.log(result)
        
        
      })


    },

  },

})
