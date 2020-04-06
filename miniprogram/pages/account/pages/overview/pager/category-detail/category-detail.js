// pages/account/components/overview/components/category-detail/category-detail.js
import accountTools from "../../../../../../service/cloud/account_tools.js"
import accountService from "../../../../../../service/cloud/account.js"
import dateTools from "../../../../../../tools/date.js"

const app = getApp();
let dateObj = new Date();
let startDate = dateTools.dateToString(dateObj.getFullYear(), dateObj.getMonth() + 1, 1);
Component({

  properties: {

  },

  data: {
    curSkip: 0,
    detailList: [],
    btnTitle: "加载更多...",

    sortType: "time",
    typeName: "全部",
    month: new Date().getMonth() + 1,
    year: new Date().getFullYear(),
    type: "支出"

  },
  observers: {
    'typeName': function (typeName) {
      // 在 numberA 或者 numberB 被设置时，执行这个函数
      
      // accountTools.getTypeData(app.globalData.openid, this, this.data.typeName, this.data.year, this.data.month, this.data.sortType, 0)
    }
  },

  methods: {
    getNewData(res) {
      console.log("获取新数据", res.detail)
      let opt = res.detail
      accountTools.getTypeData(app.globalData.openid, this, opt.typeName, opt.year, opt.month, opt.sortType, 0)
    },
    changeSortMode(res) {
      this.setData({
        sortType: res.detail.sortType
      })
      console.log("改变排序规则", res.detail)
      accountTools.getTypeData(app.globalData.openid, this, this.data.typeName, this.data.year, this.data.month, this.data.sortType, 0)

    },

    changeSkip(e) {
      if (this.data.curSkip === -1) {
        this.setData({
          btnTitle: "已经到底了"
        })
      } else {
        accountTools.getTypeData(app.globalData.openid, this, this.data.typeName, this.data.year, this.data.month, this.data.sortType, this.data.curSkip)

      }

    }
  },
  lifetimes: {
    attached: function() {
      let date = new Date();
      let month = date.getMonth() + 1;
      let year = date.getFullYear()

      this.setData({
        year,
        month
      })
      console.log("typeName", this.data.typeName, "date", this.data.year, this.data.month, )
      accountTools.getTypeData(app.globalData.openid, this, this.data.typeName, this.data.year, this.data.month, this.data.sortType, this.data.curSkip)

    },

  },
})