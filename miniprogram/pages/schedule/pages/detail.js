// miniprogram/pages/schedule/pages/detail.js
const db = wx.cloud.database();
const schedule = db.collection("schedule");
const app = getApp();



Page({

  /**
   * 页面的初始数据
   */
  data: {
    item_id: "",
    item: {},
    editActive: false,

    scheName: "名称",
    startDate: "",
    endDate: "",
    startTime: "",
    endTime: "",
    isAllday: false,
    place: "地点",
    infor: "备注",
    dateBlock: "",
    editData: {}
  },
  completeEdit(e) {
    let pages = getCurrentPages();
    let schedulePage = pages[pages.length - 2];
    schedulePage.setData({
      reload: true
    })
    const detailPage = this;
    let editData = {
      scheName: this.data.scheName,
      startDate: this.data.startDate,
      startTime: this.data.startTime,
      endDate: this.data.endDate,
      endTime: this.data.endTime,
      place: this.data.place,
      infor: this.data.infor,
      isAllday: this.data.isAllday
    }
    console.log(editData)
    schedule.doc(this.data.item_id).update({
      data: {
        detail: editData
      }
    }).then(res => {
      wx.showToast({
        title: '修改完成',
        icon: "success",
        success: res => {
          this.setData({
          })
          schedule.where({
            _id: detailPage.data.item_id
          }).get({}).then(res => {
            console.log('editComplete',res.data[0])
            let item = res.data[0];
            detailPage.setData({
              editActive: false,
              scheName: item.detail.scheName,
              startDate: item.detail.startDate,
              startTime: item.detail.startTime,
              endDate: item.detail.endDate,
              endTime: item.detail.endTime,
              place: item.detail.place,
              infor: item.detail.infor,
              isAllday: item.detail.isAllday
            })
          })
        }
      })
    })
    
    
  },
  
  editInfor() {
    this.setData({
      editActive: true,
      btnInfor: "完成"
    })


  },
  deleteInfor() {
    let pages = getCurrentPages();
    let schedulePage = pages[pages.length - 2];
    schedulePage.setData({
      reload: true
    })
    wx.showModal({
      title: "确定删除该记录?",
      content: '',
      cancelText: "我再想想",
      confirmText: "删除",
      confirmColor: "#f00",
      success: res => {
        if (res.confirm) {
          console.log('确定删除schedule', this.data.item_id)
          schedule.doc(this.data.item_id).remove()
            .then(res => {

              wx.navigateBack({
                delta: 1,
                success: res => {
                  
                  wx.showToast({
                    title: '删除成功',
                    icon: 'none',
                    duration: 1500
                  })
                }
              })

            })
            .catch(err => {
              console.error(err)
            })


        } else if (res.cancel) {
          console.log('用户点击取消')
        }


      }
    })

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
    console.log(this.data.startDate, this.data.endDate)
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

  
  onLoad: function(option) {
    const detailPage = this;
    let itemId;
    let detail;
    const eventChannel = this.getOpenerEventChannel()
    // eventChannel.emit('acceptDataFromOpenedPage', {
    //   data: 'test'
    // });
    // eventChannel.emit('someEvent', {
    //   data: 'test'
    // });

    // 监听acceptDataFromOpenerPage事件，获取上一页面通过eventChannel传送到当前页面的数据
    eventChannel.on('acceptDataFromOpenerPage', function(res) {
      console.log("detail page",res.data)
      itemId = res.data.itemId
      detail = res.data.detail

      // 获取详情信息
      detailPage.setData({
        item:detail,
        item_id: itemId,
        scheName: detail.scheName,
        startDate: detail.startDate,
        startTime: detail.startTime,
        endDate: detail.endDate,
        endTime: detail.endTime,
        place: detail.place,
        infor: detail.infor,
        isAllday: detail.isAllday
      })
    })  
  },

  
  onReady: function() {

  },

  onShow: function() {
    
  },

  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {
    
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  
  onReachBottom: function() {

  },

  onShareAppMessage: function() {

  }
})