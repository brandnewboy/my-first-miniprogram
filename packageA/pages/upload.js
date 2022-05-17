// packageA/pages/upload.js
// var util = require('../../utils/util')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    PHPSESSID:'',
    image:'',//图片路径字符串
    whose:'',
    name:'',//商品名称
    price:'',//商品价格
    link:'',//购买链接
    message:'',//商品描述
    areaAddress:'',//定位获取的详细地址
    areaName:'',//地区名字
    num:6,//投放天数
    sqtime:'',//申请时间
    fileNum:0,//用户选择上传的文件数目
    requestYON:false,//是否发起网络数据请求，上传文件
    choice:1,//用户选择
    fileType:'image'//数据类型(图片/视频)

  },

  onChange_a:function(e){//商品名称
    this.setData({
      name:e.detail
    })
  },
  onChange_b:function(e){//商品价格
    this.setData({
      price:e.detail
    })
  },
  onChange_c:function(e){//购买链接
    this.setData({
      link:e.detail
    })
  },
  onChange_d:function(e){//商品描述
    this.setData({
      message:e.detail
    })
  },

  /**
 * 控制是否发起POST数据请求
 */
postRequest(){
  let that = this
  wx.getStorage({
    key:'userInfo',
    success(res){
        that.setData({
          id:res.data.id
        })
    }
  })  
  //判断用户是否填写了基本信息
  if(this.data.name==''||this.data.price==''||this.data.link==''){
    wx.showToast({
      title: '请完善商品信息!',
      icon:'error'
    })
    return
  }else if(this.data.areaName==''||this.data.num==''){
    wx.showToast({
      title: '请选择区域日期!',
      icon:'error'
    })
    return
  }else if(this.data.fileNum==0){
    wx.showToast({
      title: '请选择上传文件!',
      icon:'error'
    })
    return
  }

  wx.showLoading({
    title: '上传中...',
  })

  this.setData({
    requestYON:true//控制文件上传
  })

  wx.hideLoading({
    success: (res) => {
      wx.showToast({
        title: '上传成功',
      })

    },
  })
},

  //用户点击获取定位
  onChange_1() {
    wx.chooseLocation({
      latitude: 0,
      success:(res)=>{
        console.log(res.address)
        this.setData({
          areaAddress:res.address,
          areaName:res.name
        })
      }
    })
  },
  //用户输入投放天数
  onChange_2(event) {
    // event.detail 为当前输入的值
    this.setData({
      num:event.detail.value
    })
    console.log(this.data.num)
  },
  
  //接受自定义组件1传递过来的参数
  getChosing(e){
    console.log(e.detail)
    //获取到的参数值代表用户点击选择了哪一个，将其赋值给data中的choice
    this.setData({
      choice:e.detail
    })
    //将从组件1获取到的选择数据传递给组件2，以此组件2可确定用户选择的文件类型
    if(e.detail==1){
      this.setData({
        fileType:'image'
      })
    }else if(e.detail==2){
      this.setData({
        fileType:'video'
      })
    }
  },

  //接受自定义组件2传递过来的参数(文件数目)
  getFilePath(e){
    console.log('选择文件事件对象：',e)
    this.setData({
      fileNum:e.detail.length
    })
    console.log('文件数目:',this.data.fileNum)
  },
  // 文件上传成功则会触发事件返回文件路径，此时开始表单信息上传
  getImageStr(e){
    // console.log(e.detail)
    this.setData({
      image:e.detail
    })
    // 获取图片路径成功，发起网络请求上传表单信息
    wx.request({
      url: 'http://noaipt.com/home/user/add',
      method:'POST',
        header:{
          'content-type':'application/x-www-form-urlencoded',
          'Cookie':getApp().PHPSESSID
        },
      data:{
      whose:getApp().username,//this.data.whose,//用户
      image:this.data.image,//图片路径字符串
      name:this.data.name,//商品名称
      price:this.data.price,//商品价格
      link:this.data.link,//购买链接
      message:this.data.message,//商品描述
      areaAddress:this.data.areaAddress,//定位获取的详细地址
      areaName:this.data.areaName,//地区名字
      num:this.data.num,//投放天数
      fileNum:this.data.fileNum,//用户上传的文件数目
      sqtime:0,
      },
      success:(res)=>{
        console.log('上传文件',res)
        setTimeout(()=>{
          wx.switchTab({
            url: '../../pages/home/home',
          })
        },1000)
        
      },
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