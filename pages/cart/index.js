import regeneratorRuntime from '../../lib/runtime/runtime'
import{getSetting,chooseAddress,openSetting} from '../../utils/asyncWeChat.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    address:{},
    cart:[]
  },
  onShow(){
    const address = wx.getStorageSync('address');
    const cart = wx.getStorageSync('cart')
    this.setData({
      address,
      cart
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
  }
})
