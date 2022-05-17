//在这个 JS 文件中，专门来创建Store的实例对象
import {observable,action} from 'mobx-miniprogram'

export const store = observable({
  //数据字段
  infoNum:0,
  numA:1,
  numB:2,
  activeTabBarIndex:2,//tabBar中被选中页面的索引
  Cookie:'',
  //计算属性
  get sum(){//get修饰的代表外界只可读
    return this.numA + this.numB
  },
  //action方法，用来修改store中的数据
  updateNumA: action(function name(params) {
    this.numA+=params
  }),
  updateCookie: action(function name(params) {
    thisCookie+=params
  }),
  updateNumB: action(function name(params) {
    this.numB+=params
  }),
  updateInfoNum: action(function name(params) {
    this.infoNum=params
    //console.log('正在更新store中订单消息条数...','更新后为：',this.infoNum)
  }),

  updateActiveTabBarIndex:action(function name(params) {
    this.activeTabBarIndex=params
  }),
})