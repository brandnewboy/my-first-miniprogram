// custom-tab-bar/index.js
import {storeBindingsBehavior} from 'mobx-miniprogram-bindings' 
import {store} from '../store/store'
Component({

  behaviors:[storeBindingsBehavior],
  storeBindings:{
    store,
    fields:{
      infoNum:'infoNum',//获取订单消息条数，放到tabBar渲染出来
      active:'activeTabBarIndex'//获取选中的tab索引
    },
    actions:{
      updateActiveTabBarIndex:'updateActiveTabBarIndex'//更新选中的tab的索引，共享到store
    }
  },

  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    "list": [
      {
        "pagePath": "/pages/home/home",
        "text": "首页"
      },
      {
        "pagePath":"/pages/index/index",
        "text":"订单",
        info:0
      },
      {
        "pagePath": "/pages/userfile/userfile",
        "text": "我的"
      }
    ]
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onChange(event) {
      // event.detail 的值为当前选中项的索引
      //this.setData({ active: event.detail });
      this.updateActiveTabBarIndex(event.detail)
      wx.switchTab({
        url: this.data.list[event.detail].pagePath,
      })

    },
    
  },
  observers:{
    /*监听共享数据store中消息条目infoNum，实时更新到tabBar，放到list[1].info，第二个导航栏上
     */
    'infoNum':function(infoNum){
      //console.log('custom-tabBar已监听到store共享的订单消息数目infoNum，正在setData...')
      this.setData({
        'list[1].info':infoNum
      })
      //console.log('已更新infoNum,更新后为：',infoNum)
    }
  }
})
