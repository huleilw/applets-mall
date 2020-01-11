const api = require('../../utils/api.js')
import {request} from '../../request/index'
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
    request({url: api.swiper}).then(({data})=>{
        this.setData({
          swiperList:data.message
        })
    })
  },
  getTopNavList(){
    request({url: api.categoryNav}).then(({data})=>{
      this.setData({
        topNavList:data.message
      })
    })
  },
  getFloorList(){
    request({url: api.floor}).then(({data})=>{
      this.setData({
        floorList:data.message
      })
    })
  }
})
