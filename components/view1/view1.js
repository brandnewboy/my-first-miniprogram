// component/view1/view1.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    color_tabs1:'#FFFFFF',
    color_txt1:'#1684FC',
    color_tabs2:'#1684FC',
    color_txt2:'#FFFFFF',
    chosing:1,//默认状态选项
  },

  /**
   * 组件的方法列表
   */
  methods: {
    //用户点击选择视频播放的广告形式
choose2(){
  this.setData({
    color_tabs2:'#FFFFFF',
    color_txt2:'#1684FC',
    color_tabs1:'#1684FC',
    color_txt1:'#FFFFFF',
    chosing:2,
  })
  this.triggerEvent('getChoice',this.data.chosing)
  },//用户点击选择图片轮播的广告形式
  choose1(){
    this.setData({
      color_tabs1:'#FFFFFF',
      color_txt1:'#1684FC',
      color_tabs2:'#1684FC',
      color_txt2:'#FFFFFF',
      chosing:1
    })
    this.triggerEvent('getChoice',this.data.chosing)//向外传递参数
    },
  }
})
