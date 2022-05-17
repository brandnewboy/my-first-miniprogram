// packageC/pages/signin/signin.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    username:'test99',
    password:'123456',
    phoneNumber:'19530749519',
    email:'2475934003@qq.com',
    password_2:''
  },

  request(){
    if(this.data.username==''||this.data.password==''||this.data.phoneNumber==''||this.data.email==''||this.data.password_2==''){
      wx.showToast({
        title: '请完善信息',
        icon:"none"
      })
      return
    }
    wx.request({
      url: 'http://noaipt.com/home/login/Add_user',
      method:'POST',
      header:{
        'content-type':'application/x-www-form-urlencoded',
      },
      dataType:'json',
      data:{
        username:this.data.username,
        pwd:this.data.password,
        phonenumber:this.data.phoneNumber,
        email:this.data.email
      },
      success(res){
       console.log('注册结果',res)
       if(res.data.verifySuccess=='false'){
         wx.showToast({
           title: '注册失败!',
         })
         return
       }
        wx.showToast({
          title: '注册成功',
          icon:'loading',
          duration:800
        })
      },
      complete(res){
        
        setTimeout(()=>{
          wx.switchTab({
            url: '../../../pages/userfile/userfile',
          })
        },1000)
        
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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