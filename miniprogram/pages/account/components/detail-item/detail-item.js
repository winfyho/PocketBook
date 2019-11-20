// pages/account/acc-components/detail-item/detail-item.js
const app = getApp();
const db = wx.cloud.database();
const account = db.collection("todos");
Component({
  /**
   * 组件的属性列表
   */
  properties: {

    detailItem: {
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
    iconUrl: ""
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

  lifetimes: {
    created: function () {
      

    }
  }

})