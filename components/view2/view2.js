// component/view2/view2.js
Component({

  
  /**
   * 组件的属性列表
   */
  properties: {
    //外界是否发起网络数据请求
    requestYON:{
      type:Boolean,
      value:false,
    },

    //外界所需文件类型
    fileType:{
      type:String,
      value:'image',
    }
  },


  /**
   * 组件的初始数据
   */
  data: {
    image:'',
    name:'',
    id:'',
    fileList:[],//文件列表
    van_icon:false,
    van_icon_uoload:false
  },
  pageLifetimes:{
    show:function(){
      this.setData({
        van_icon_uoload:true
      })
    },
    hide:function(){
      this.setData({
        van_icon_uoload:false
      })
      
    }
  },




  /**
   * 组件的方法列表
   */
  methods: {
    //上传视频或图片
btn:function(){
  var that = this
  if(that.data.fileList.length>5){
    wx.showToast({
      title: '最多选择六张图片!',
      icon:'none'
    })
    return
  }
  wx.chooseMedia({
    count: 6,
    mediaType: [that.properties.fileType],
    sourceType: ['album', 'camera'],
    maxDuration: 60,
    camera: 'back',
    success(res) {
      //console.log('选中资源成功回调函数参数对象')
     // console.log(res)
     // console.log('选择的资源类型'+res.type)
      that.setData({
        fileList:[...that.data.fileList,...res.tempFiles]
      })

    }
  })

},
//预览文件
previewimgs:function(e){
  // console.log(e.target.dataset.info)//资源地址
  // console.log(e.target.dataset.type)//资源类型
  // console.log(e.target.dataset.thumbimg)//视频略缩图地址
  wx.previewMedia({
    sources: [
     { url:this.data.fileList[e.target.dataset.info].tempFilePath,
       type:e.target.dataset.type,
       poster:e.target.dataset.thumbimg
    }
    ],
  })
},
//从数组中删除指定元素
_delete:function(array,val){
  for(var i=0;i<array.length;i++){
    if(array[i].tempFilePath==val){
      array.splice(i,1)
      return true
    }
  }
  return false
},
//删除图片或者视频
remove:function(e){
  console.log('删除第'+(e.target.dataset.index+1)+'个资源')
  console.log('资源地址'+e.target.dataset.val)
  var re =  this._delete(this.data.fileList,e.target.dataset.val)
  this.setData({
    fileList:this.data.fileList
  })
  console.log('删除结果'+re)
}

  },
//监听外界传进来的文件type,如果发生变化则将之前选择的文件全部清空
  observers:{
    'fileType':function(){
      this.setData({
        fileList:''
      })
    },


    'fileList':function(){
      
      // this.triggerEvent('getNum',this.data.fileList.length)
      if(this.data.fileList.length!=0){
        this.setData({
          van_icon:true
        })
      }else{
        this.setData({
          van_icon:false
        })
      }
      this.triggerEvent('getFile',this.data.fileList)
    },

    // 监听是否收到开始上传文件的信号
    'requestYON':function(){
      if(this.properties.requestYON==false) return
      let that = this
    wx.getStorage({
      key:'cookiekey',
      success(res){
        console.log(res.data)
         let  n = res.data.indexOf(";")
         let z = res.data.indexOf("=")
         let  PHPSESSID = res.data.slice(z+1,n)
          console.log(PHPSESSID)
        that.setData({  
          PHPSESSID:PHPSESSID,
        })
        for(let i=0;i<that.data.fileList.length;i++){
          wx.uploadFile({
            url: 'http://noaipt.com/home/user/upload_file', //仅为示例，非真实的接口地址
            filePath: that.data.fileList[i].tempFilePath,
            name: 'file',
            header:{
              'content-type':'application/x-www-form-urlencoded',
              'Cookie':getApp().PHPSESSID
            },
            
            success (res){
              console.log(res)
              console.log(JSON.parse(res.data))
              // console.log(JSON.parse(res.data).sql_filename)
              if(i!==(that.data.fileList.length-1)){
                that.setData({
                  image:that.data.image+=(JSON.parse(res.data).sql_filename+'|')
                })
              }else{
                that.setData({
                  // 存储后台返回由“|”拼接的图片路径字符串
                  image : that.data.image+=(JSON.parse(res.data).sql_filename)
                })
              }
            },
            complete(res){
              that.setData({
                requestYON:false
              })
              console.log(that.data.image)
              // 判断如果这是最后一个文件上传完成则出发事件'getImageString'
              // 将ImageString返回给页面，开始进行表单信息的上传
              if(i==that.data.fileList.length-1){
                that.triggerEvent('getImageString',that.data.image)
              }
              
            }
    
          })
        }
        
      }
    })

     
    }



  },

  // 组建生命周期
  lifetimes:{
    attached(){
      let that = this
      wx.getStorage({//获取用户的登录信息
        key:'userInfo',
        success(res){
          //console.log(res)
          that.setData({
            name:res.data.username,
            //idNumber:res.data.id,
            //avatarImage:res.data.image
          })
        }
      })
    }
  }
})
