const {
  request
} = require('../../request/index')

Page({
  data: {
    typeList: ['失物招领', '寻物启事'],
    currentIndex: 0,
    goodsList: [],
    isMe: false,
    isShow: false,
    showActionsheet: false,
    item: {},
    groupst: [{
      text: '删除',
      type: 'warn',
      value: 1
    }],
    groupsf: [{
      text: '举报',
      type: 'warn',
      value: 2
    }, ],
  },

  close: function () {
    this.setData({
      showActionsheet: false
    })
  },
  btnClick(e) {
    console.log(e.detail.value)
    this.close()
    if (e.detail.value === 1 && this.data.isMe) {
      request({
        url: "/release/remove",
        data: {
          _id: this.data.item._id
        }
      }).then(v => {
        this.setData({
          goodsList: []
        })
        this.getGoodsList()
        wx.showToast({
          title: v.data,
          icon: 'none',
          duration: 1500,
          mask: true,
        });

      })
    }
  },
  onLoad() {
    this.getGoodsList()
  },

  handleMore(e) {
    //获取缓存中的openid
    const openid = wx.getStorageSync('openid');

    if (!openid) {
      return wx.navigateTo({
        url: '/pages/login/index',
      });
    }
    //判断openid是否相同
    if (openid === e.detail.openid) {
      this.setData({
        isMe: true
      })
    } else {
      this.setData({
        isMe: false
      })
    }

    this.setData({
      showActionsheet: true,
      item: e.detail
    })

  },

  handleTab(e) {
    //1.重置 数据 数组
    this.setData({
      goodsList: []
    })
    const index = e.currentTarget.dataset.index
    this.setData({
      currentIndex: index
    })
    this.getGoodsList()
  },
  onPullDownRefresh: function () {
    //1.重置 数据 数组
    this.setData({
      goodsList: []
    })
    //3.发送请求  
    this.getGoodsList();
  },

  getGoodsList() {
    request({
      url: '/release/search',
      data: {
        type: this.data.typeList[this.data.currentIndex]
      }
    }).then(v => {
      console.log(v)
      v.data.forEach(res => {
        if (res.images) {
          res.images = JSON.parse(res.images)
        }
      });
      v.data.reverse()
      this.setData({
        goodsList: v.data
      })
    })
    wx.stopPullDownRefresh();
  }

})