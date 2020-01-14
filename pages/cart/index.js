import regeneratorRuntime from '../../lib/runtime/runtime'
import{getSetting,chooseAddress,openSetting,showModal} from '../../utils/asyncWeChat.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    address:{},
    cart:[],
    allChecked:false,
    totalPrice:0,
    totalNum:0
  },
  onShow(){
    const address = wx.getStorageSync('address');
    const cart = wx.getStorageSync('cart') || []
    this.setCart(cart)
    this.setData({
      address
    })
  },
   async handleGetAddress(){
    try {
      let res1 = await getSetting()
      const scopeAddress = res1.authSetting["scope.address"]
      if(scopeAddress === false){
        await openSetting()
      }
      let address = await chooseAddress()
      const {provinceName,cityName,countyName,detailInfo} = address
      address.all = provinceName + cityName + countyName + detailInfo
      //将获取到的地址信息存到storage
      wx.setStorageSync('address', address)
    } catch (error) {}
  },
  handleCheckedItem(e){
    const {id} = e.currentTarget.dataset
    const {cart} = this.data
    const index = cart.findIndex(v=>v.goods_id === id)
    cart[index].checked = !cart[index].checked
    this.setCart(cart)      
  },
  setCart(cart){
    let allChecked = true
    let totalPrice = 0
    let totalNum = 0
    cart.map(v=>{
      if(v.checked){
        totalPrice += v.num*v.goods_price
        totalNum += v.num
      }else{
        allChecked = false
      }
    })
    allChecked = cart.length !==0 ? allChecked : false
    this.setData({
      cart,
      totalPrice,
      totalNum,
      allChecked
    })
    wx.setStorageSync('cart',cart)
  },
  handleItemAllChecked(){
    let {cart,allChecked} = this.data
    allChecked = !allChecked
    cart.map(v=>v.checked = allChecked)
    this.setCart(cart)
  },
  async handleItemEdit(e){
    const { operation,id} = e.currentTarget.dataset
    let {cart} = this.data
    const index = cart.findIndex(v=>v.goods_id === id)
    if(cart[index].num === 1 && operation === -1){
      let res = await showModal({content:'您确定要删除该商品?'})
      if(res.confirm){
        cart.splice(index,1)
        this.setCart(cart)
      }
    }else{
      cart[index].num += operation
      this.setCart(cart)
    }
  }
})
