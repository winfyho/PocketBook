// pages/schedule/components/sche-editor/sche-editor.js
import dateTools from "../../../../tools/date.js"
const db = wx.cloud.database();
const schedule = db.collection("schedule");
const app = getApp();
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    showEditor:{
      type:Boolean,
      value:false
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    scheName: "日历",
    startDate: "",
    endDate: "",
    startTime: "06:00",
    endTime: "06:00",
    isAllday: false,
    place: "定位",
    infor: "备注",
    dateBlock: "",
    editData: {}
  },

  /**
   * 组件的方法列表
   */
  methods: {

    // 向数据库添加数据---------------------
    completeEdit(e) {
      let editData = {
        scheName: this.data.scheName,
        startDate: this.data.startDate,
        startTime: this.data.startTime,
        endDate: this.data.endDate,
        endTime: this.data.endTime,
        place: this.data.place,
        infor: this.data.infor,
        isAllday:this.data.isAllday
      }
      schedule.add({
        data: {
          detail: editData
        }
      }).then(res => {
        console.log("schedule add success", editData);
      }).catch(err => {
        console.log("add fail", err);
      })
      wx.showToast({
        title: '添加成功',
        icon: 'success',
        duration: 2000
      })
      this.triggerEvent('edit', e, {})
    },

    // 编辑区------------------------------
    closeEditor(e) {
      this.triggerEvent('emit', e, {})
    },
    changeInfor(e) {

      this.setData({
        infor: e.detail.value
      })
    },
    changePlace(e) {

      this.setData({
        place: e.detail.value
      })
    },
    changeName(e) {
      this.setData({
        scheName: e.detail.value
      })
    },
    changeDate(e) {
      console.log("date", e.detail.value, e.currentTarget.dataset);
      if (e.currentTarget.dataset.type === "startDate") {
        this.setData({
          startDate: e.detail.value,
          endDate: e.detail.value > this.data.endDate ? e.detail.value : this.data.endDate
        })
      } else {
        this.setData({
          endDate: e.detail.value
        })
      }
    },
    changeTime(e) {
      console.log("time", e.detail, "type", e.currentTarget.dataset.type);
      if (e.currentTarget.dataset.type === "startTime") {
        
        this.setData({
          startTime: e.detail.value,
          endTime: e.detail.value > this.data.endTime ? e.detail.value : this.data.endTime

        })
      } else {
        this.setData({
          endTime: e.detail.value
        })
      }
    },
    isAllday(e) {
      this.setData({
        isAllday: e.detail.value,
        startTime: "00:00",
        endTime: "24:00"
      })

    },


  },
  lifetimes: {
    ready:function(){
      let scheDate = dateTools.getNowDate().date;
      let nowDatePObj = dateTools.getNowDate();
      let dateBlock = nowDatePObj.month + ' ' + nowDatePObj.day
      console.log("sche-editor created", scheDate, dateBlock);
      this.setData({
        startDate: scheDate,
        endDate: scheDate,
        dateBlock
      })
    },
    attached: function() {
      // 在组件实例进入页面节点树时执行
      

    },
    detached: function() {
      // 在组件实例被从页面节点树移除时执行
    },
  },
  pageLifetimes: {
    show: function() {
      
    },
    hide: function() {
      // 页面被隐藏
    },
    resize: function(size) {
      // 页面尺寸变化
    }
  }
})