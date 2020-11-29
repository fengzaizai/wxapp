/**
 * 1.输入框绑定 值改变事件 input事件
 *    1.获取到输入框的值
 *    2.合法性判断
 *    3.检验通过 把输入的值 发送到后台
 *    4.返回的数据打印到页面上
 */
import {
  request
} from '../../request/index'

Page({
  data: {
    goods: [],
    //取消按钮是否显示
    isFocus: false,
    //输入框的值
    inpValue: "",
    goodsList:[]
  },
  Timeid: -1,
  //输入框的改变触发事件
  handleInput(e) {
    //1.获取输入框的值
    const value = e.detail['value'];
    //2.检查合法性 trim() 去除头尾空格
    if (!value.trim(this.Timeid)) {
      this.setData({
        goods: [],
        isFocus: false
      })
      //值不合法
      return;
    }
    this.setData({
      isFocus: true
    })
    //3.准备发送请求获取数据
    clearTimeout(this.Timeid)
    this.Timeid = setTimeout(() => {
      this.qsearch(value)
    }, 1000)
  },
  //发送请求获取搜索建议数据
  qsearch(query) {
    request({
      url: "/release/search2",
      data: {
        query
      }
    }).then(v => {
      console.log(v.data)
      for(var v8 in v.data){
        v.data[v8].images = JSON.parse(v.data[v8].images)
      }
      v.data.reverse()
      this.setData({
        goodsList:v.data
      })
    })
  },
  handleCancel() {
    this.setData({
      inpValue: "",
      isFocus: false,
      goods: []
    })
  }
})