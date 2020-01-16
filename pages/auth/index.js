const api = require('../../utils/api.js')
import {
  request
} from '../../request/index'
import regeneratorRuntime from '../../lib/runtime/runtime'
import {
  login
} from '../../utils/asyncWeChat.js'
Page({

  async handleGetUserInfo(e) {
    const {
      encryptedData,
      iv,
      rawData,
      signature
    } = e.detail
    const {code} = await login()
    const loginParams = {
      encryptedData,
      iv,
      rawData,
      signature,
      code
    }
    const {data} = await request({
      url: api.login,
      data: loginParams,
      methods: 'post'
    })
    const {token} = data.message
    wx.setStorageSync('token', token);
  }
})
