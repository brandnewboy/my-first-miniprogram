// packageC/pages/logoin/logoin.js
import {createStoreBindings} from 'mobx-miniprogram-bindings'
import {store} from '../../../store/store'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    cookie:'',
    username:'test',
    password:'123456'
  },

  gotoSignIn(){
    wx.navigateTo({
      url: '../signin/signin',
    })
  },


  inputnickname(e){
    this.setData({
      username:e.detail.value
    })
  },

  inputpassword(e){
      this.setData({
        password:e.detail.value
      })
  },

  getIndexInfo(){
    let that = this
    wx.request({
              url: 'http://noaipt.com/home/user/paydate',
              method:'POST',
              header:{
                'content-type':'application/x-www-form-urlencoded',
                'Cookie':getApp().PHPSESSID
              },
              data:{
                name:getApp().username
              },
              success(res){
                that.updateInfoNum(res.data.length)
              }
            })
  },

  login(){
    if(this.data.username==''||this.data.password=='')
    {
      wx.showToast({
        title: '请输入账号密码',
        icon:'none'
      })
      return
    }
    let that = this;
    wx.request({
      url:'http://noaipt.com/home/login/dologin',
      method:'POST',
      header:{
        'content-type':'application/x-www-form-urlencoded',
      },
      dataType:'json',
      data:{
        name:that.data.username,
        pw:that.data.password
      },
      success(res){
        console.log('登录',res)
        let tempid = res.cookies[0].slice(0,res.cookies[0].indexOf(';'))
        getApp().username = res.data.userinfo.username
        getApp().PHPSESSID = tempid//res.header["Set-Cookie"]
        console.log('登录-全局信息：',getApp().username,getApp().PHPSESSID)
          //console.log(res)
          if(res.data&&res.data.verifySuccess!=='false'){
          wx.showToast({
            title: '登录成功！',
            icon:'success'
          })
          /*获取到用户信息进行缓存 */
          wx.setStorage({
            key:'userInfo',//用户信息
            data:res.data.userinfo
          })
          wx.setStorageSync('cookiekey',tempid)//cookie
          wx.setStorage({
            key:'beAdmitted',//登陆状态
            data:true
          })
          wx.switchTab({//返回初始页面
            url: '/pages/userfile/userfile',
          })
        }else{
          wx.showToast({
            title: '登录信息有误!',
            icon:'error'
          })
        }
      },
      fail(res){
        console.log(res)
        wx.showToast({
          title: '登录失败!',
          icon:'error'
        })
      },
      complete(){
        that.getIndexInfo()
      }
    })//request
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.storeBindings = createStoreBindings(this,{
      store,
      fields:['infoNum'],
      actions:['updateInfoNum']
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