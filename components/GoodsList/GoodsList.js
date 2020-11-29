var util = require('../../utils/util.js');


Component({
  
  options: {
    addGlobalClass: true
  },
  properties: {
    item: {
      type: Object,
      default: {}
    }
  },
  //组件生命周期
  attached() {
    var date = this.properties.item.date
    var arr = this.setTime(date)
    var Newtime = util.formatTime(new Date());
    var newarr = this.setTime(Newtime)
    this.compareTime(arr, newarr)
  },

  data: {
    time: ''
  },

  /**
   * 组件的方法列表
   */
  methods: {
    //子组件触发事件
    handleMore(){
      this.triggerEvent("handleMore",{...this.properties.item})
    },
    //点击图片预览事件
    handleImg(){
      wx.previewImage({
        current: this.properties.item.images[0],
        urls:[...this.properties.item.images]
      })
    },

    setTime(date) {
      var arr = date.split('/')
      var time = arr[arr.length - 1].split(':')
      var order = time[0].split(' ')
      arr[arr.length - 1] = order[0]
      arr.push(order[1])
      arr.push(time[1])
      arr.push(time[2])
      return arr
    },
    compareTime(arr, newarr) {
      const year = newarr[0] - arr[0]
      const month = newarr[1] - arr[1]
      const day = newarr[2] - arr[2]
      const hour = newarr[3] - arr[3]
      const minute = newarr[4] - arr[4]
      const second = newarr[5] - arr[5]

      let time = ''

      if (year) {
        time = year + '年前'
      } else if (month) {
        time = month + '月前'
      } else if (day) {
        time = day + '天前'
      } else if (hour) {
        time = hour + '小时前'
      } else if (minute) {
        time = minute + '分钟前'
      } else if (second) {
        time = '刚刚'
      }

      this.setData({
        time,
      })
    }
  }
})