import regeneratorRuntime from '../../lib/runtime/runtime'
import{getSetting,chooseAddress,openSetting,showModal,showToast} from '../../utils/asyncWeChat.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    address:{},
    cart:[],
    totalPrice:0,
    totalNum:0
  },
  onShow(){
    const address = wx.getStorageSync('address');
    let cart = wx.getStorageSync('cart') || []
    cart = cart.filter(v=>v.checked)
    let totalPrice = 0
    let totalNum = 0
    cart.map(v=>{
      totalPrice += v.num*v.goods_price
      totalNum += v.num
    })
    this.setData({
      cart,
      totalPrice,
      totalNum,
      address
    })
  },
  handleOrderPay(){
    const{token} = wx.getStorageSync('token');
    if(!token){
      wx.navigateTo({
        url: '/pages/auth/index',
      });
    }
  }
})
