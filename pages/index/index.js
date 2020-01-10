const api = require('../../utils/api.js')
Page({
  data:{
    swiperList:[],
    topNavList:[],
    floorList:[]
  },
  onLoad(){
    this.getSwiperList()
    this.getTopNavList()
    this.getFloorList()
  },
  getSwiperList(){
    var _this = this
    wx.request({
      url: api.swiper,
      success:({data})=>{
        _this.setData({
          swiperList:data.message
        })
      }
    })
  },
  getTopNavList(){
    var _this = this
    wx.request({
      url: api.categoryNav,
      success:({data})=>{
        _this.setData({
          topNavList:data.message
        })
      }
    })
  },
  getFloorList(){
    var _this = this
    wx.request({
      url: api.floor,
      success:({data})=>{
        _this.setData({
          floorList:data.message
        })
      }
    })
  }
})
