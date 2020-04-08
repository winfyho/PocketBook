
import {getMonthList} from "../../../../network/aggregate.js"
import {getDateObj} from "../../../../utils/date.js"
const app = getApp();
let today = getDateObj()

let dateObj = new Date();
Component({

  properties: {

  },

  data: {
    skip: 0,
    detailList: [],
    hasData:true,
    sortObj:{
      date: -1,
      time: 1
    },
    sortType: "time",
    typeName: "全部",
    month: new Date().getMonth() + 1,
    year: new Date().getFullYear(),
    type: "支出"

  },
  observers: {
    
  },

  methods: {
    
    reachBottom(){
      if(this.data.hasData){
        console.log("reach-bottom",this.data.skip,this.data.hasData)
        getMonthList(this,app.globalData.openid,'2020-03',this.data.sortObj,this.data.skip)
      }
      
      
    }

  
  },
  lifetimes: {
    attached: function () {
      let year_month = today.dateString.slice(0,7)
      getMonthList(this,app.globalData.openid,'2020-03',null,0)

    },

  },
})