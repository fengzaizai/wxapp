const {
  request
} = require('../../request/index')

Page({

  data: {
    userInfo: {},
  },
  onShow() {
    this.setUserInfo()
  },
  setUserInfo() {
    wx.getSetting({
      success: (result) => {
        // console.log(result)
        if (result.authSetting['scope.userInfo']) {
          const userInfo = wx.getStorageSync("userInfo") || {};
          const openid = wx.getStorageSync("openid") || '';
          userInfo.openid = openid
          // console.log(userInfo)
          this.setData({
            userInfo,
          })
          request({
            url: '/login',
            data: {
              ...userInfo
            }
          }).then(v => {
            // console.log(v)
          })
        }
      },
    });

  }
})