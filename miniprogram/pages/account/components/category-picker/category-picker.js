// pages/account/components/category-picker/category--picker.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    year: {
      type: Number,
      value: ""
    },
    month: {
      type: Number,
      value: ""
    },
    name: {
      type: String,
      value: "选择类别"
    },
    type: {
      type: String,
      value: "支出"
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    date: "",
    outcomeName: "支出",
    incomeName: "收入",
    outcomeIndex: 0,
    incomeIndex: 0,

    sortType:"time",
    categorys: {
      income: [{
          name: "全部收入",
          imgurl: "outcome"
        }, {
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
          name: "全部支出",
          imgurl: "outcome"
        }, {
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

  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 改变排序方式------------------
    changeSortMode(e){
      let sortType = this.data.sortType === "time" ? "number" : "time"

      this.setData({
        sortType,
      })
      this.triggerEvent('change', {
        sortType: this.data.sortType,
        date: this.data.date,
        year: this.data.year,
        month: this.data.month,
        type: this.data.type,
        typeName: this.data.name
      }, {})
    },
    // 改变年月-------------------------
    changeMonth(e) {
      this.setData({
        date: e.detail.value.slice(0, 7),
        year: parseInt(e.detail.value.slice(0,4)),
        month: parseInt(e.detail.value.slice(5, 7)),
      })
      this.triggerEvent('change', {
        sortType: this.data.sortType,
        date: this.data.date,
        year:this.data.year,
        month: this.data.month,
        type: this.data.type,
        typeName: this.data.name
      }, {})
    },
    // 改变支出/收入模式-------------------
    changeType(e) {
      let type = this.data.type === "支出" ? "收入" : "支出"
      this.setData({
        type,
        name: "选择类别"
      })
    },
    // 选择分类
    changeName(e) {
      // console.log(e)
      let name = ""
      if (this.data.type === "支出") {
        name = this.data.categorys.outcome[e.detail.value].name
      } else {
        name = this.data.categorys.income[e.detail.value].name
      }

      this.setData({
        name
      })
      console.log("category-picker", this.data.name)
      this.triggerEvent('change', {
        sortType: this.data.sortType,
        date: this.data.date,
        year: this.data.year,
        month: this.data.month,
        type: this.data.type,
        typeName: this.data.name
      }, {})
    }
  },

  lifetimes: {
    attached: function() {
      let m = this.data.month < 10 ? '0' + this.data.month : this.data.month
      let date = `${this.data.year}-${m}`;

      this.setData({
        date // "2019-11"
      })

    },

  },
})