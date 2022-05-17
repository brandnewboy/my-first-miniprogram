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
        color_tabs3:'#FFFFFF',
        color_txt3:'#13A7A0',
        color_tabs2:'#13A7A0',
        color_txt2:'#FFFFFF',
        color_tabs1:'#13A7A0',
        color_txt1:'#FFFFFF',
    chosing:0,//默认状态选项
  },

  /**
   * 组件的方法列表
   */
  methods: {
    //用户点击选择按金额查看
choose2(){
  this.setData({
    color_tabs3:'#13A7A0',
    color_txt3:'#FFFFFF',
    color_tabs1:'#13A7A0',
    color_txt1:'#FFFFFF',
    color_tabs2:'#FFFFFF',
    color_txt2:'#13A7A0',
    chosing:2,
  })
  this.triggerEvent('getChoice',this.data.chosing)
  },
  //用户点击选择按下单日期查看
  choose1(){
    this.setData({
      color_tabs3:'#13A7A0',
      color_txt3:'#FFFFFF',
      color_tabs2:'#13A7A0',
      color_txt2:'#FFFFFF',
      color_tabs1:'#FFFFFF',
      color_txt1:'#13A7A0',
      chosing:1
    })
    this.triggerEvent('getChoice',this.data.chosing)//向外传递参数
    },
    //用户点击选择默认排序
    choose3(){
      this.setData({
        color_tabs3:'#FFFFFF',
        color_txt3:'#13A7A0',
        color_tabs2:'#13A7A0',
        color_txt2:'#FFFFFF',
        color_tabs1:'#13A7A0',
        color_txt1:'#FFFFFF',
        chosing:3
      })
      this.triggerEvent('getChoice',this.data.chosing)//向外传递参数
      }
  }
})
