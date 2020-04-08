// pages/account/acc-components/detail-item/detail-item.js
import {getDateObj} from "../../../../utils/date.js"
const app = getApp();
const db = wx.cloud.database();
const account = db.collection("account");

Component({
  /**
   * 组件的属性列表
   */
  properties: {

    detail: {
      type: Object,
      value: {}
    },
    active: {
      type: Boolean,
      value: false
    },
    showDate :{
      type: Boolean,
      value: false
    }

  },

  /**
   * 组件的初始数据
   */
  data: {
    iconUrl: "",
    timeString:"0:00",
    day:0
  },
  attached: function () {
    let timeString = getDateObj(this.data.detail.timeStamp).timeString
    let day = getDateObj(this.data.detail.timeStamp).day
    this.setData({
      timeString,
      day
    })
  },

  /**
   * 组件的方法列表
   */
  methods: {
    showRight() {
      console.log("right-bar");
      this.setData({
        active: !this.data.active
      })
    },

    // deleteItem(e) {
    //   this.setData({
    //     active: false
    //   })
    //   this.triggerEvent('child', e.currentTarget.dataset.id, {})

    // },
    deleteItem(e) {
      console.log("delete", e.currentTarget.dataset.id);
      account.doc(e.currentTarget.dataset.id).remove({
        success: res => {
          console.log("delete", res);
          this.setData({
            active: false
          })
          wx.startPullDownRefresh()
        }
      })
    },
    
  },

  
})