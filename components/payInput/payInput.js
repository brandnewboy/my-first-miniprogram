// components/payInput/payInput.js
Component({
  data: {
    showPayPwdInput: false,  //是否展示密码输入层
    pwdVal: '',  //输入的密码
    payFocus: false, //文本框焦点
  },
  lifetimes:{
    attached(){
      this.showInputLayer();
    }
  },
  /**
   * 显示支付密码输入层
   */
  methods:{
  showInputLayer: function(){
    this.setData({ showPayPwdInput: true, payFocus: true });
  },
  /**
   * 隐藏支付密码输入层
   */
  hidePayLayer: function(){
    
    var val = this.data.pwdVal;
 
    this.setData({ showPayPwdInput: false, payFocus: false, pwdVal: '' });
 
  },
  /**
   * 获取焦点
   */
  getFocus: function(){
    this.setData({ payFocus: true });
  },
  /**
   * 输入密码监听
   */
  inputPwd: function(e){
      this.setData({ pwdVal: e.detail.value });
 
      if (e.detail.value.length >= 6){
        // this.hidePayLayer();
        this.triggerEvent('payOver',true)
        this.setData({
          pwdVal:''
        })
      }
  }
}
})
