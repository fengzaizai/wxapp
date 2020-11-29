//同时发送起步代码的次数
let ajaxTimes = 0;
export const request =(params)=> {
  ajaxTimes++;
  //显示加载中的效果
  wx.showLoading({
    title: '加载中',
    mask:true 
  });
  
  
  //定义公共的URL
  //url: "https://api-hmugo-web.itheima.net/api/public/v1/categories"
  const baseUrl = "http://182.254.158.9:3033"

  return new Promise((resolve,reject) => {
    var reqTask = wx.request({
      ...params,
      url:baseUrl+params.url,
      success:(result) => {
        resolve(result);
      },
      fail:(err) => {
        reject(err);
      },
      complete:() => {
        ajaxTimes--;
        //关闭加载中图标
        if(ajaxTimes === 0){
          wx.hideLoading();
        }
      }
    });
  })
}