// pages/account/acc-components/day-item/day-item.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    date: {
      type: String,
      value: "20",
    },
    day:{
      type: Number,
      value: 0,
    },
    income: {
      type: Number,
      value: 0,
    },
    outcome: {
      type: Number,
      value: 0,
    },
    detailList:{
      type:Array,
      value:[]
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    // day:this.properties.date.slice(6,9)
    incomeName: ["income", "salary", "bonus", "relation", "traffic"],
    outcomeName:["outcome","eat","snack","traffic","others"],
  },

  /**
   * 组件的方法列表
   */
  methods: {
    sendId(res){
      // console.log(res);
      this.triggerEvent('emit', res.detail, {})
    }
  }
})