// miniprogram/pages/setting/pages/advice/advice.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    title: "",
    contact: "",
    detail: ""
  },
  inputTitle(e) {
    this.setData({
      title: e.detail.value
    })
  },
  inputContact(e) {
    this.setData({
      contact: e.detail.value
    })
  },
  inputDetail(e) {
    this.setData({
      detail: e.detail.value
    })
  },
  sendMessage() {
    console.log(this.data.title, this.data.contact, this.data.detail)
    const db = wx.cloud.database();
    const advice = db.collection("advice");
    if (this.data.detail === "") {
      wx.showModal({
        showCancel: false,
        title: '内容不能为空',
        content: '',
      })
    } else {
      advice.add({
        data: {
          title: this.data.title,
          contact: this.data.contact,
          detail: this.data.detail,
        },

      }).then(res => {
        console.log("发送信息成功")
        wx.navigateBack({
          delta: 1,
          success: res => {
            wx.showToast({
              title: '发送信息成功',
              duration: 1000,

            })
          }
        })


      })
    }




  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
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

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})