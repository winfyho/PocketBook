// pages/account/components/overview/components/day-table/day-table.js
import accountService from "../../../../../../service/cloud/account.js"
import accountTools from "../../../../../../service/cloud/account_tools.js"
import dateTools from "../../../../../../tools/date.js"
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
    curPage: 0,
    dayList:[],
    maxincome:0,
    maxoutcome:0,
    showType:"outcome",
    month: "" ,
    startDate:"",
    endDate:"",

    total:0,
    max:0,
    avg:0
  },

  /**
   * 组件的方法列表
   */
  methods: {

    changeMonth(e){
      this.setData({
        startDate:e.detail.value + '-01',
        endDate: e.detail.value + '-31',
        month: e.detail.value,
        curPage:0,
        dayList:[]
      })
      console.log("month", this.data.startDate, this.data.endDate);
      accountTools.getDayList(app.globalData.openid, this, this.data.startDate, this.data.endDate, this.data.curPage)


    },

    changeType(e){

      console.log(e.currentTarget.dataset.type)
      this.setData({
        showType: e.currentTarget.dataset.type
      })

    },

    changeSkip(e){
      if (this.data.curPage != -1){

        // accountService(app.globalData.openid, this, "2019-11-01", this.data.curPage)
        accountTools.getDayList(app.globalData.openid, this, this.data.startDate, this.data.endDate, this.data.curPage)
        console.log(this.data.curPage,this.data.dayList)
        
      }
      
    }
  },
  pageLifetimes: {
    show: function () {
      let date = new Date();
      let m = date.getMonth() + 1;

      let startDate = dateTools.dateToString(date.getFullYear(), m, 1);
      let endDate = dateTools.dateToString(date.getFullYear(), m, 31);
      let month = date.getFullYear() + '-' + (m < 10 ? '0' + m : m)
      this.setData({
        startDate: startDate,
        endDate: endDate,
        month
      })
      console.log(this.data.month,this.data.startDate, this.data.endDate)
      accountTools.getDayList(app.globalData.openid, this, this.data.startDate, this.data.endDate, 0)

    },
    
  }
})
