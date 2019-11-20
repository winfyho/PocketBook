// pages/account/components/edit-keyboard/edit-keyboard.js
import dateTools from "../../../../tools/date.js"
import accountService from "../../../../service/cloud/account.js"
let loadCount = 0;
const app = getApp();
const db = wx.cloud.database();
const account = db.collection("todos");
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    addActive: {
      type: Boolean,
      value: false
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    categorys: {
      income: [{
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

    addNum: 0,
    addNumStr: "0",
    addDate: "",
    year: new Date().getFullYear(),
    month: new Date().getMonth() + 1,
    day: new Date().getDate(),
    type: "outcome",
    category: "支出",
    comment: "",
    icon: "outcome",
    addCatIndex: 0,
    addActive: true,
    addCommentActive: false,

    editData: {

    }
  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 日期选择器----------------------
    bindDateChange(e) {
      var y = e.detail.value.slice(0, 4);
      var m = e.detail.value.slice(5, 7);
      var day = e.detail.value.slice(8, 10);
      this.setData({
        addDate: e.detail.value,
        month: parseInt(m),
        day: parseInt(day)
      })
      console.log("date", this.data.addDate, this.data.month, this.data.day, );
    },


    // 输入金额------------------------
    inputNum(e) {

      if (this.data.addNumStr === "0" || this.data.addNumStr === "00") {
        this.data.addNumStr = "";
      }
      if (this.data.addNumStr.length > 8) {
        return
      }
      this.setData({
        addNumStr: this.data.addNumStr + '' + e.currentTarget.dataset.num
      })

    },

    // 备注信息------------------------------
    changeComment(e) {
      this.setData({
        addComment: e.detail.value,
        comment: e.detail.value

      })
    },
    completeComment(e) {
      this.setData({
        addCommentActive: false,
      })
      console.log("comment", this.data.comment)
    },
    addComment(e) {
      this.setData({
        addCommentActive: true
      })
    },





    // 类别选择器-----------------------
    chooseCate(e) {
      const index = e.currentTarget.dataset.index;
      // console.log(e.currentTarget.dataset)
      this.setData({

        addCatIndex: index,
        category: e.currentTarget.dataset.name,
        type: e.currentTarget.dataset.type,
        icon: e.currentTarget.dataset.imgurl


      })
      console.log("category", this.data.type, this.data.category, this.data.icon, this.data.addCatIndex)

    },

    // 键盘删除键--------------------------
    backspace(e) {
      var backNum = this.data.addNumStr.slice(0, this.data.addNumStr.length - 1);
      if (backNum === "") {
        backNum = "0";
      }
      this.setData({
        addNumStr: backNum
      })
    },

    // 键盘清空键--------------------------
    clearInput(e) {
      this.setData({
        addNumStr: "0"
      })
    },

    // 完成编辑-----------------------------
    complete() {

      const editData = {
        date: this.data.addDate,
        number: parseInt(this.data.addNumStr),
        category: this.data.category,
        type: this.data.type,
        icon: this.data.icon,
        comment: this.data.comment,
      }

      let dt = new Date();
      let editTime = {
        h: dt.getHours(),
        m: dt.getMinutes(),
        s: dt.getSeconds(),
        time: dt.getTime(),
      }
      this.setData({
        editData,
        addActive: false,
        addNumStr: "0",
        comment:"",
        addCommentActive: false


      })

      console.log(this.data.editData)
      //向数据库添加数据
      account.add({
        data: {
          openid: app.globalData.openid,
          item: this.data.editData,
          editTime
        },
        success: res => {
          
          
          console.log("add success", editTime, app.globalData.openid, this.data.editData)
          wx.showToast({
            title: '已完成',
            mask: true,
            icon: "success",
            duration: 900,
          });
          wx.startPullDownRefresh()

        }

      })




    },



    // 关闭编辑器-------------------------
    closeAddRecord() {
      this.setData({
        addNumStr: "0",
        addActive: false
      })
      // this.triggerEvent('close', {
      //   addActive: false
      // }, {})
    },
  },





  lifetimes: {
    attached: function() {
      let dateStr = dateTools.getNowDate().date;
      // console.log("datestr", dateStr)


      this.setData({
        addDate: dateStr
      })
      console.log("nowdate", this.data.addDate)
      loadCount++;

    }
  }
})