import {createStoreBindings} from 'mobx-miniprogram-bindings'
import {store} from '../../store/store'
import toArray from '../../utils/toArray/toArray'
Page({
  data: {
   name:'',
   PHPSESSID:'',
   products:[],//消息数组
   num:0//消息条目
  },

  // 根据img字符串获取图片路径数组
  getImgArr(objArr){
    for(let i=0;i<objArr.length;i++){
      let str = objArr[i].image
      let imgArr = toArray(str)
      objArr[i].imgArr = imgArr
    }
  },

  getPageInfo(){
    if(!getApp().PHPSESSID||!getApp().username){
      wx.showToast({
        title: '您还未登录!',
        icon:'none',
        duration:1000
      })
      return
    }
    let that = this     
           wx.request({
            url: 'http://noaipt.com/home/user/paydate',
            method:'POST',
            header:{
              'content-type':'application/x-www-form-urlencoded',
              'Cookie':getApp().PHPSESSID
            },
            data:{
              name:getApp().username//that.data.name
            },
            success(res){
              console.log('订单：',res)
              let objArr = res.data
              that.getImgArr(objArr)
              that.setData({
                products:objArr,
                num:objArr.length,
              })
              /*将数据条目num传输到store的方法updateInfoNum,更新数据条数 */
              //console.log('订单页面已加载，并且获取到订单消息数目，正在传输到数据共享store...',res.data.length)
              that.updateInfoNum(res.data.length)
            }
          })
  },

  onLoad() {
    /*数据共享，准备存储获取的数据条数到store中 */
    this.storeBindings = createStoreBindings(this,{
      store,
      fields:['infoNum'],
      actions:['updateInfoNum']
    })

   

  },//onLoad
  onShow(){
    if(!getApp().PHPSESSID||!getApp().username){
      wx.showToast({
        title: '您还未登录!',
        icon:'none',
        duration:1000
      })
      this.setData({products:[]})
      return
    }
     /*发起网络数据请求 */
     this.getPageInfo()      
  }
})
