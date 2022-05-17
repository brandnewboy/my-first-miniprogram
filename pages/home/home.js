// pages/home/home.js
import formatDate from '../../utils/formatDate/formatDate'
import toArray from '../../utils/toArray/toArray'
import { get } from 'mobx-miniprogram'
import {createStoreBindings} from 'mobx-miniprogram-bindings'
import {store} from '../../store/store'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //PHPSESSID:'',
    //name:'',
    scrollTop:0,
    swiperList:[],
    messageList:[],
    isloading:false
  },

  imgPathErr(e){
    console.log('图片加载错误,errMsg',e.detail)
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
      let str = objArr[i].deadline
      let newTime1 = formatDate(str)
      objArr[i].deadline = newTime1

      let str2 = objArr[i].putondate
      let newTime2 = formatDate(str2)
      objArr[i].putondate = newTime2
    }
  },
  /**
   * 获取首页轮播图数据
   */
  getSwiperList(){
    let that = this
    
    wx.request({
      url: 'https://www.noaipt.cn/slides',
      method:'GET',
      success:(res)=>{
        console.log(res);
        this.setData({
          swiperList:res.data
        })
      }
    })
  },
// 获取提示用户的广告投放动态消息
  getMessageList(){
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
    wx.showLoading({
      title: '加载中...',
    })
    wx.request({
      url: 'http://noaipt.com/home/user/g_qi',
      method:'POST',
         header:{
           'content-type':'application/x-www-form-urlencoded',
           'Cookie':getApp().PHPSESSID
         },
         data:{
           name:getApp().username
         },
         success(res){
           console.log('首页',res)
           let objArr = res.data
           that.toDateString(objArr)
           that.getImgArr(objArr)
           that.setData({messageList:objArr})
         },
         complete(res){
           wx.hideLoading({
             success: (res) => {},
           })
         }
    })
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getMessageList()
  },

  onPageScroll:function(e){
    let that = this;
    that.setData({
      scrollTop:e.scrollTop
    })
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
    // if(!getApp().PHPSESSID||!getApp().username){
    //   wx.showToast({
    //     title: '您还未登录!',
    //     icon:'none',
    //     duration:1000
    //   })
    //   this.setData({messageList:[]})
    //   return
    // }
    
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
    this.getMessageList()
    wx.stopPullDownRefresh({
      success: (res) => {},
    })
    
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