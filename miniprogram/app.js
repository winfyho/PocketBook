import dateTools from "./tools/date.js"
App({
  globalData: {

  },

  onLaunch: function() {
    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力')
    } else {
      wx.cloud.init({

        env: 'winfyho-30xyn',
        traceUser: true,

      })
    }
    try {

      var _openid = wx.getStorageSync('_openid')
      if (_openid) {
        console.log("缓存中的_openid", _openid)
        this.globalData.openid = _openid
      } else {

        wx.cloud.callFunction({
          name: 'login',
          success: res => {

            console.log("登陆", res.result.openid, res.result)
            
            this.globalData = {
              openid: res.result.openid,
            }

            try {
              wx.setStorageSync('_openid', res.result.openid)
            } catch (e) {
              console.log("set设置缓存失败")
            }


          }
        })
      }
    } catch (e) {
      console.log("get获取缓存失败")
    }


  },


  onShow: function(options) {

  },


  onHide: function() {

  },

  onError: function(msg) {

  },

})