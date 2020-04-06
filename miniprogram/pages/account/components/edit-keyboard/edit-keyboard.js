// pages/account/components/edit-keyboard/edit-keyboard.js
import {
  getDateObj,
  toTimeStamp
} from "../../../../utils/date.js"
import categorys from "../../categorys.js"

const app = getApp();
const dateObj = getDateObj();


Component({
  /**
   * 组件的属性列表
   */
  properties: {
    addActive: {
      type: Boolean,
      value: false
    },
    showEditor: {
      type: Boolean
    }

  },

  /**
   * 组件的初始数据
   */
  data: {
    categorys: categorys.list,

    detail: {
      number: 0,
      time: dateObj.timeString,
      date: dateObj.dateString,
      timeStamp: dateObj.timeStamp,
      type: "outcome",
      icon: "outcome",
      category: "支出",
      comment: ""
    },
    addActive: true,
    showComment: false,

    today: dateObj,

    add_number: '0',
    add_date: dateObj.dateString,
    add_category: "outcome",
    add_category_name: "支出",
    add_category_index: 6,
    add_type: "outcome",
    add_comment: "",

  },

  /**
   * 组件的方法列表
   */
  methods: {

    // 关闭编辑器-------------------------
    switchEditor(e) {
      this.triggerEvent('editor-switch', false)
      this.setData({
        addNumStr: "0",
        // showEditor: false
      })
    },

    // 日期选择器----------------------
    bindDateChange(e) {
      let month = parseInt(e.detail.value.slice(5, 7));
      let day = parseInt(e.detail.value.slice(8, 10));
      this.setData({
        add_date: e.detail.value,
        today: {
          month,
          day
        }
      })
      console.log("date", this.data.add_date);
    },


    // 输入金额------------------------
    inputNum(e) {

      if (this.data.add_number === "0" || this.data.add_number === "00") {
        this.data.add_number = "";
      }
      if (this.data.add_number.length < 9) {
        this.setData({
          add_number: this.data.add_number + '' + e.currentTarget.dataset.num
        })
      }


    },

    // 备注信息------------------------------
    updateComment(e) {
      this.setData({
        add_comment: e.detail.value,
      })
    },
    completeComment(e) {
      this.setData({
        showComment: false
      })
      console.log("comment", this.data.add_comment)
    },
    addComment(e) {
      this.setData({
        showComment: true,
      })
    },





    // 类别选择器-----------------------
    chooseCategory(e) {
      console.log(e.currentTarget.dataset)
      let category = e.currentTarget.dataset
      this.setData({
        add_category: category.imgurl,
        add_type: category.type,
        add_category_index: category.index,
        add_category_name: category.name,
      })
    },

    // 键盘删除键--------------------------
    backspace(e) {
      var backNum = this.data.add_number.slice(0, this.data.add_number.length - 1);
      if (backNum === "") {
        backNum = "0";
      }
      this.setData({
        add_number: backNum
      })
    },

    // 键盘清空键--------------------------
    clearInput(e) {
      this.setData({
        add_number: "0"
      })
    },

    // 完成编辑-----------------------------
    complete() {

      let number = parseInt(this.data.add_number);
      let detail = {
        date: this.data.add_date,
        time: dateObj.timeString,
        income: this.data.add_type === 'income' ? number : 0,
        outcome: this.data.add_type === 'outcome' ? number : 0,
        number: number,
        category: this.data.add_category_name,
        category_name: this.data.add_category_name,
        type: this.data.add_type,
        icon: this.data.add_category,
        comment: this.data.add_comment,
        timeStamp: toTimeStamp(this.data.add_date, dateObj.timeString),
        editTime: {
          time: toTimeStamp(this.data.add_date, dateObj.timeString)
        }
      }

      let records = {
        _id: "",
        _openid: "",
        item: detail,
        editTime: {
          time: this.data.detail.timeStamp
        }
      }
      console.log("添加数据", records)
      const account = wx.cloud.database().collection('account')
      account.add({
        data: {
          item: records.item,
          editTime: records.editTime
        }
      }).then(res => {
        console.log(`添加成功`, res)
        wx.showToast({
          title: '已完成',
          mask: false,
          icon: "success",
          duration: 900,
        });
      })
      //向数据库添加数据


    },


  },


})