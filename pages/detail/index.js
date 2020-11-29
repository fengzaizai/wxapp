const {
  request
} = require('../../request/index')

var util = require('../../utils/util.js');

Page({

  data: {
    Info: [],
    addComment: '',
    _id: ''
  },
  onLoad(e) {
    this.setData({
      _id: e._id
    })
    this.getInfo(e._id)
    this.inputComment.articleId = e._id
  },

  inputComment: {
    articleId: '',
    openid: '',
    content: '',
    date: '',
    avatarUrl: '',
    nickName: '',
    reply: [],
  },
  handleImg() {
    wx.previewImage({
      current: this.data.Info.images[0],
      urls: [...this.data.Info.images]
    })
  },

  //获取信息
  async getInfo(_id) {
    var res = await request({
      url: '/release/id',
      data: {
        _id,
      }
    })
    res.data.images = JSON.parse(res.data.images)
    this.setData({
      Info: res.data
    })
    console.log(res.data)
  },

  handleComment(e) {
    this.inputComment.content = e.detail.value
  },
  //提交留言
  async handleSub() {
    var time = util.formatTime(new Date());
    this.inputComment.date = time
    var openid = wx.getStorageSync("openid");
    var userInfo = wx.getStorageSync('userInfo');

    if (!openid || !userInfo) {
      return wx.navigateTo({
        url: '/pages/login/index',
      });
    }
    this.inputComment.openid = openid

    this.inputComment.avatarUrl = userInfo.avatarUrl

    this.inputComment.nickName = userInfo.nickName
    //判断输入是否有内容
    if (this.inputComment.content !== '') {
      console.log(this.inputComment)
      var res = await request({
        url: '/comment/add',
        data: {
          ...this.inputComment
        }
      })
      wx.showToast({
        title: res.data,
        icon: 'success',
        duration: 1500,
        mask: true,
      });
      this.setData({
        addComment: '',
        Info: []
      })
      this.inputComment.content = ''
      this.getInfo(this.data._id)
    }
  }
})