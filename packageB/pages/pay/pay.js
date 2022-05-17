// packageB/pages/pay/pay.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    num:'',
    money:0,
    shwPop:false,
   data:{}
  },
  showPopup() {
    this.setData({ showPop: true });
  },

  onClose() {
    this.setData({ showPop: false });
  },
  overEvent(e){
    let that = this
    console.log(e)
    wx.showLoading({
      title:"免密支付中..."
    })
    wx.request({
      url: 'http://noaipt.com/home/user/pay/'+that.data.data.id,
      method:'POST',
      header:{
        'content-type':'application/x-www-form-urlencoded',
         'Cookie':getApp().PHPSESSID
      },
      data:{
        num:that.data.num,
        whose:getApp().username,
        name:that.data.data.name,
        price:that.data.data.price,
        image:that.data.data.imgArr[0]
      },
      fail(){
        wx.showToast({
          title: '支付失败',
        })
      },
      complete(res){
        console.log('支付结果',res)
      }
    })
    setTimeout(function () {
      wx.hideLoading()
      wx.navigateTo({
        url: '../payover/payover?money='+that.data.money,
      })
    }, 1500)
   
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({data:getApp().query,num:options.num,money:options.num*3})
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
    this.setData({data:getApp().query})
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