// pages/schedule/components/sche-item/sche-item.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    detail: {
      type: Object,
      value: {}
    },
    item_id: {
      type: String,
      value: ""
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    // detail: {
    //   startDate: "",
    //   startTime: "06:00",
    //   endDate: "",
    //   endTime: "23:00",
    //   name:"行程",
    //   place:"地点",
    //   infor:""
    // }
  },

  /**
   * 组件的方法列表
   */
  methods: {
    showScheduleDetail(e) {
      const itemId = this.properties.item_id;
      const detail = this.properties.detail;
      console.log("show detail", this.properties.item_id)
      wx.navigateTo({
        url: '/pages/schedule/pages/detail',
        success: function(res) {
          // 通过eventChannel向被打开页面传送数据
          res.eventChannel.emit('acceptDataFromOpenerPage', {
            data: {
              itemId,
              detail
            }
          })
        }
      })
    }
  }
})