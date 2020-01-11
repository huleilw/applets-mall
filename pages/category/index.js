const api = require('../../utils/api')
import {request} from '../../request/index'
Page({
  data: {
    categoryList:[],
    leftMenuList:[],
    rightContent:[],
    currentIndex:0
  },
  onLoad: function (options) {
    const categoryList = wx.getStorageSync('categoryList')
    if(!categoryList){
      this.getCateData()
    }else if(Date.now()-categoryList.time > 1000*10){
      this.getCateData()
    }else{
      this.categoryList = categoryList.data
      this.setCurrentDate(this.categoryList)
    }
    
  },
  // 获取商品分类信息
  getCateData(){
    request({
      url: api.category
    }).then(({data})=>{
      this.categoryList = data.message
        wx.setStorageSync('categoryList', {time:Date.now(),data:this.categoryList})
        this.setCurrentDate(this.categoryList)
    })
  },
  //根据请求回来的数据重新赋值
  setCurrentDate(dataList){
    const leftMenuList = dataList.map(it=>{
      return{
        id:it.cat_id,
        name:it.cat_name
      }
    })
    const rightContent = dataList[0].children
    this.setData({
      leftMenuList,
      rightContent
    })
  },
  handleCurrentMenu(e){
    const {index} = e.currentTarget.dataset
    const rightContent = this.categoryList[index].children
    this.setData({
      currentIndex:index,
      rightContent
    })
  }
})