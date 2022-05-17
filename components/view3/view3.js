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
    color_txt1:'#B0C4DE',
    color_tabs2:'#B0C4DE',
    color_txt2:'#FFFFFF',
    chosing:1,//默认状态选项
  },

  /**
   * 组件的方法列表
   */
  methods: {
    
choose2(){
  this.setData({
    color_tabs2:'#FFFFFF',
    color_txt2:'#B0C4DE',
    color_tabs1:'#B0C4DE',
    color_txt1:'#FFFFFF',
    chosing:0,
  })
  this.triggerEvent('getChoice',this.data.chosing)
  },
  choose1(){
    this.setData({
      color_tabs1:'#FFFFFF',
      color_txt1:'#B0C4DE',
      color_tabs2:'#B0C4DE',
      color_txt2:'#FFFFFF',
      chosing:1
    })
    this.triggerEvent('getChoice',this.data.chosing)//向外传递参数
    },
  }
})
