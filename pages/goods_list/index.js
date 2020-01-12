const api = require('../../utils/api')
import {request} from '../../request/index'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabs:[
      {
        id:'01',
        value:'综合',
        isActive:true
      },
      {
        id:'02',
        value:'销量',
        isActive:false
      },
      {
        id:'03',
        value:'价格',
        isActive:false
      }
    ],
    goodsList:[],
    defaultImgUrl:'http://hbimg.b0.upaiyun.com/b7b5b489ab8adb866af91fee3019886c5389ff9d67ab-hH0Mm2_fw658',
  },
  QueryParams:{
    query:'',
    pagenum:1,
    cid:'',
    pagesize:10,
  },
  totalPages:1,
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.QueryParams.cid = options.cid
    this.getGoodsList()
  },
  handleTabItemChange(e){
    const {tabs} = this.data
    tabs.map((item,index)=>index===e.detail.index?item.isActive = true : item.isActive = false)
    this.setData({
      tabs
    })
  },
  getGoodsList(){
    request({url:api.search,data:this.QueryParams}).then(({data})=>{
      const{goods,total} = data.message
      this.totalPages = Math.ceil(total/this.QueryParams.pagesize)
      this.setData({
        goodsList:[...this.data.goodsList,...goods]
      })
      wx.stopPullDownRefresh()
    })
  },
  onPullDownRefresh(){
    this.setData({
      goodsList:[]
    })
    this.QueryParams.pagenum = 1
    this.getGoodsList()
  },
  onReachBottom(){
    if(this.QueryParams.pagenum >=this.totalPages){
      wx.showToast({
        title: '没有下一页数据信息',
      })
    }else{
      this.QueryParams.pagenum ++
      this.getGoodsList()
    }
  }
})
