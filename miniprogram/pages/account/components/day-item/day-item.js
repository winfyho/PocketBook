// pages/account/acc-components/day-item/day-item.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {


    records: {
      type: Array,
      value: []
    },
    date: {
      type: String,
      value: ""
    },

  },
  attached: function () {
    // console.table(this.data.records)
    let income = 0
    let outcome = 0
    this.data.records.forEach(i => {
      income += i.income
      outcome += i.outcome
    })
    this.setData({
      day: this.data.date.slice(8, 10),
      income,
      outcome
    })
  },

  /**
   * 组件的初始数据
   */
  data: {
    incomeName: ["income", "salary", "bonus", "relation", "traffic"],
    outcomeName: ["outcome", "eat", "snack", "traffic", "others"],
    income: 0,
    outcome: 0,
    day: 0
  },

  /**
   * 组件的方法列表
   */
  methods: {
    sendId(res) {
      // console.log(res);
      this.triggerEvent('emit', res.detail, {})
    }
  },
})