// pages/account/components/overview/components/day-table/day-table.js

// import dateTools from "../../../../../../tools/date.js"
import {getMonthDayTotal} from "../../../../network/aggregate.js"
import {getDateObj} from "../../../../utils/date.js"
let app = getApp();
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
    curPage: 0,
    dayList: [],
    result:{},
    maxincome: 0,
    maxoutcome: 0,
    showType: "outcome",
    year_month: today.dateString.slice(0,7),
    startDate: "",
    endDate: "",

    total: 0,
    max: 0,
    avg: 0
  },

  /**
   * 组件的方法列表
   */
  methods: {

    changeMonth(e) {
      let year_month = e.detail.value
      let attr = this.data.showType === 'income' ? 'incList' : 'outList'
      console.log(year_month)
      getMonthDayTotal(this,app.globalData.openid,year_month).then((result)=>{
        this.setData({
          dayList:this.data.result[attr],
          year_month
        })
        console.table(this.data.dayList)

      })
    },

    
    changeType(e) {

      console.log(e.currentTarget.dataset.type)
      let attr = e.currentTarget.dataset.type ==='income' ? 'incList' : 'outList'
      this.setData({
        showType: e.currentTarget.dataset.type,
        dayList:this.data.result[attr]
      })

    },

    changeSkip(e) {
      if (this.data.curPage != -1) {

      }

    }
  },
  lifetimes: {
    attached: function () {
      
      getMonthDayTotal(this,app.globalData.openid,today.dateString.slice(0,7)).then((result)=>{
        this.setData({
          dayList:this.data.result['outList'],
        })
        console.table(this.data.dayList)

      })

    },

  }
})
