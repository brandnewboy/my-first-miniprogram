// packageB/pages/launched/launched.js
import toArray from '../../../utils/toArray/toArray'
import formatDate from '../../../utils/formatDate/formatDate'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showDetail:false,
    show: false,
    detailIndex:null,
    waitStateList:[],
    checkDetailItem:{},
    messageList:[],
    isloading:false,
    choice:1,
    tempChosedIndex:-1,
  },
  
  imgPathErr(e){
    console.log('图片加载错误,errMsg',e.detail)
  },

  videoPathErr(e){
    console.log('视频加载错误,errMsg',e)
  },

  // 根据img字符串获取图片路径数组
  getImgArr(objArr){
    for(let i=0;i<objArr.length;i++){
      let str = objArr[i].image
      let imgArr = toArray(str)
      objArr[i].imgArr = imgArr
      if(objArr[i].image.includes('mp4')){
        objArr[i].mediaType = 'video'
      }
    }
    
  },
  // 处理时间
  toDateString(objArr){
    for(let i=0;i<objArr.length;i++){
      let str = objArr[i].sqtime
      let newTime1 = formatDate(str)
      objArr[i].sqtime = newTime1

      let str2 = objArr[i].putondate
      let newTime2 = formatDate(str2)
      objArr[i].putondate = newTime2
    }
  },

  checkDetail(e){
      console.log(e.currentTarget.dataset['index'])
      let index = e.currentTarget.dataset['index']
      this.setData({ 
        showDetail: true ,
        detailIndex:e.currentTarget.dataset['index'],
        checkDetailItem:this.data.choice==1?this.data.messageList[index]:this.data.waitStateList[index]
      });
  },


  onClose() {
    this.setData({ showDetail: false });
  },
 

  needService(){
    wx.navigateTo({
      url: '../auditing/auditing',
    })
  },

  //获取自定义组件传递过来的选择数据
  getChoice:function(e){
    console.log(e.detail)
    this.setData({
      choice:e.detail,
    })
  },

  //发起网络数据请求 
  getUserInfo_launched:function(type){
    if(!getApp().PHPSESSID||!getApp().username){
      wx.showToast({
        title: '您还未登录!',
        icon:'none',
        duration:1000
      })
      return
    }
    let that = this
    //开始读取数据，修改节流阀的值
    this.setData({
      isloading:true
    })
    //发起网络数据请求
  
    wx.request({
      url: 'http://noaipt.com/home/user/g_state',
      method:'POST',
           header:{
            'content-type':'application/x-www-form-urlencoded',
             'Cookie':getApp().PHPSESSID
          },
           data:{
            //  choice:that.data.choice,
            choice:type,
             name:getApp().username
           },
           success(res){
             console.log('产品数据',res)
            //  处理图片路径字符串
            let objArr = res.data
             that.getImgArr(objArr)
            //  处理时间戳
            that.toDateString(objArr)
            //  setData
            if(type==1)
             that.setData({messageList:objArr})
             else if(type==0)
             that.setData({waitStateList:objArr})
           },
           complete(res){
            // wx.hideLoading()
            wx.stopPullDownRefresh({
              success: (res) => {},
            })
           }
    })
    
  },

  pay:function(e){
    // console.log(e.target.dataset.query)
    getApp().query = e.target.dataset.query
    wx.showLoading({
      title:"微信支付"
    })
    setTimeout(function () {
      wx.hideLoading()
      wx.navigateTo({
        url: '../pay/pay?num='+e.target.dataset.query.num,
      })
    }, 1500)
   
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // //  处理图片路径字符串
    // this.getImgArr(this.data.messageList)
    // //  处理时间戳
    // this.toDateString(this.data.messageList)
    // this.setData({messageList:this.data.messageList})
    this.getUserInfo_launched(1)
    this.getUserInfo_launched(0)
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    let that = this
    wx.getStorage({
      key:'id',
      success(res){
        that.setData({
          id:res.data.id
        })
      }
    })
 
   
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    this.getUserInfo_launched(this.data.choice)
   
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
   
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})