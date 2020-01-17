
Page({

  /**
   * 页面的初始数据
   */
  data: {
      userInfo:{}
  },

  onLoad: function (options) {
      const userInfo = wx.getStorageSync('userInfo')
      this.setData({userInfo})
  },
    handleGetUserInfo(){
        wx.getUserInfo({
            success: ({userInfo})=>{
                wx.setStorageSync('userInfo', userInfo)
            }
        })
    }
  
})