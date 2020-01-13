const api = require('../../utils/api')
import {request} from '../../request/index'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goodsInfo:{}
  },
  //存放商品数据
  GoodsData:{},
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const {goods_id} = options
    this.getGoodsInfo(goods_id)
  },
  getGoodsInfo(id){
    request({
      url: api.goodsDetail,
      data: {goods_id:id}
    }).then(({data})=>{
      const {goods_name,goods_introduce,pics,goods_price} = data.message
      this.GoodsData = data.message
      this.setData({
        goodsInfo:{
          goods_name,
          pics,
          goods_price,
          goods_introduce:goods_introduce.replace(/\.webp/g,'.jpg')
        }
      })
    })
  },
  previewImg(e){
    const {src,urls} = e.currentTarget.dataset
    const urlArr = urls.map(it=>it.pics_mid)
    wx.previewImage({
      urls:urlArr,
      current:src
    })
  },
  handleAddCart(){
    let cart = wx.getStorageSync('cart') || []
    let index = cart.findIndex(v=>v.goods_id === this.GoodsData.goods_id)
    console.log(this.GoodsData)
    if(index=== -1){
      this.GoodsData.num = 1
      cart.push(this.GoodsData)
    }else{
      cart[index].num++
    }
    wx.setStorageSync('cart', cart)
    wx.showToast({
      title: '加入成功',
      icon: 'success',
      mask: true
    });
  }
})
