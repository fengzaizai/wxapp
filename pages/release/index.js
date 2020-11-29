const {
  request
} = require('../../request/index')
var util = require('../../utils/util.js');


Page({

  /**
   * 页面的初始数据
   */
  data: {
    title: '',
    name: '',
    place: '',
    phone: '',
    describe: '',
    types: ['失物招领', '寻物启事'],
    typeIndex: 0,
    chooseImgs: []
  },

  changeTitle(e) {
    this.setData({
      title: e.detail.value
    })
  },
  changeName(e) {
    this.setData({
      name: e.detail.value
    })
  },
  changePlace(e) {
    this.setData({
      place: e.detail.value
    })
  },
  changePhone(e) {
    this.setData({
      phone: e.detail.value
    })
  },
  changeDescribe(e) {
    this.setData({
      describe: e.detail.value
    })
  },
  bindTypeChange(e) {
    this.setData({
      typeIndex: e.detail.value
    })
  },


  handleAddImg() {
    wx.chooseImage({
      count: 9,
      //图片格式 原图 压缩
      sizeType: ['original', 'compressed'],
      //图片的来源 相册 照相机
      sourceType: ['album', 'camera'],
      success: (result) => {
        console.log(result)
        this.setData({
          chooseImgs: [...this.data.chooseImgs, ...result.tempFilePaths]
        })
      },
    });
  },
  handleRemoveImg(e) {
    const index = e.currentTarget.dataset['index']
    //获取图片数组
    let {
      chooseImgs
    } = this.data;
    //删除元素
    chooseImgs.splice(index, 1)
    this.setData({
      chooseImgs
    })
  },

  handleSub() {
    const userInfo = wx.getStorageSync("userInfo");
    let openid = wx.getStorageSync('openid');

    if (!userInfo) {
      return wx.navigateTo({
        url: '/pages/login/index',
      });
    }
    const {
      avatarUrl,
      nickName
    } = userInfo
    const {
      title,
      name,
      place,
      phone,
      describe,
      types,
      typeIndex,
      chooseImgs,
    } = this.data
    const type = types[typeIndex]

    const release = {
      title,
      name,
      place,
      phone,
      describe,
      type,
      avatarUrl,
      nickName,
      openid,
    }
    const images = []

    if (chooseImgs.length != 0) {
      wx.showLoading({
        title: '发布中',
        mask: true,
      });
      chooseImgs.forEach((v, i) => {
        // console.log(v)
        wx.uploadFile({
          //图片上传位置 
          url: 'http://182.254.158.9:3033/image/up',
          filePath: v,
          name: "image",
          success: (result) => {
            images.push(result.data)
            //所有的图片都上传完毕了才触发
            if (i === chooseImgs.length - 1) {
              wx.hideLoading();
              //提交后台
              // console.log(images)
              //提交成功
              release.images = images
              //获取时间
              var time = util.formatTime(new Date());
              release.date = time
              request({
                url: '/release/add',
                data: {
                  ...release
                }
              }).then(v => {
                console.log(v)
              })

              //重置页面
              // this.setData({
              //   chooseImgs: [],
              // })
              //返回上一个页面
              // wx.navigateBack({
              //   delta: 1
              // });
            }
          },
        });
      })
    } else {
      var time = util.formatTime(new Date());
      release.date = time
      request({
        url: '/release/add',
        data: {
          ...release
        }
      }).then(v => {
        console.log(v)
      })
    }

  }

})