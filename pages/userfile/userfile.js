// pages/userfile/userfile.js
import {createStoreBindings} from 'mobx-miniprogram-bindings'
import {store} from '../../store/store'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    show:false,
    beAdmitted:false,
    avatarImage:'/image/模拟头像2.jpg',
    nickname:'暂未登录',
    idNumber:'202005006666'
  },

  alert(){
    wx.navigateTo({
      url: '../../packageC/pages/findpw/findpw',
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

  quitLogoin(){
    let that = this
    wx.showModal({
      title:'确认退出登录?',
      cancelColor: 'cancelColor',
      success (res) {
        if (res.confirm) {
          wx.clearStorage({
            success: (res) => {
              that.updateInfoNum(0)
              getApp().PHPSESSID=''
              getApp().username=''
            },
          })
          that.setData({
            beAdmitted:false,
            nickname:'暂未登录'
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
    wx.request({
      url: 'http://noaipt.com/home/login/logout',
      method:'POST',
      header:{
        'content-type':'application/x-www-form-urlencoded',
        'Cookie':getApp().PHPSESSID
      },
      complete(res){
        console.log(res)
        wx.clearStorage({
          success: (res) => {},
        })
      }
    })
  },


  gotoLogin(e) {
    if(this.data.beAdmitted){
      wx.showToast({
        title: '已授权',
        icon:'error'
      })
      return
    }
    wx.navigateTo({
      url: '/packageC/pages/login/login',
    })
  },
// 将用户信息注册为全局变量，以便于其他页面使用
  initInfo(){
    let that = this
    wx.getStorage({
      key:'userInfo',
      success(res){
      //console.log(res)
       getApp().username = res.data.username
       //console.log('全局变量用户名：',getApp().username)//获取用户名
       wx.getStorage({
         key:'cookiekey',
         success(res){
            getApp().PHPSESSID = res.data
            //console.log('全局变量sessionid：',getApp().PHPSESSID)//sessionid
            that.getIndexInfo()//获取用户订单信息
         }
       })
      },
      fail(res){
        wx.showToast({
          title: '登录已过期！',
          icon:'none'
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 将用户信息注册为全局变量，以便于其他页面使用
    this.initInfo()
   /*数据共享，准备存储获取的数据条数到store中 */
   this.storeBindings = createStoreBindings(this,{
    store,
    fields:['infoNum'],
    actions:['updateInfoNum']
  })
  

  /*发起网络数据请求 */
 

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
      key:'beAdmitted',//获取登陆状态
      success(res){
        that.setData({
          beAdmitted:res.data
        })
      }
    })
    wx.getStorage({//获取用户的登录信息
      key:'userInfo',
      success(res){
        //console.log(res)
        that.setData({
          nickname:res.data.username,
          idNumber:res.data.id,
          //avatarImage:res.data.image
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