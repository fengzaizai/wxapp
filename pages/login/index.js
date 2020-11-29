// const { request } = require("../../request");

const {
  request
} = require('../../request/index')

Page({
  handleGetUserInfo(e) {
    const {
      userInfo
    } = e.detail;
    wx.setStorageSync("userInfo", userInfo);
    wx.login({
      timeout: 10000,
      success: (result) => {
        request({
          url: '/login/openid',
          data: {
            code: result.code
          }
        }).then(v => {
          wx.setStorageSync('openid', v.data.openid);
          wx.navigateBack({
            delta: 1
          });
        })
      },
    });
  }
})