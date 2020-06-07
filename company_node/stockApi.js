var axios = require('axios')
const express = require('express')
const router = express.Router()

axios.defaults.headers.Authorization = 'APPCODE 4965d137351042fdb0badcba0df62d46'
// axios.interceptors.request.use(function (config) {
//   console.log(config.url)
//   config.headers.APPCODE = '4965d137351042fdb0badcba0df62d46'
//   return config
// }, function (err) {
//   console.log(err)
// })
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8'
// async function test () {
//   await axios.post('http://stockcha.market.alicloudapi.com/stock', {
//     src: 'hk00700'
//   }).then(res => {
//     console.log('www', res)
//   })
// }

// test().catch(error => console.log('.....', error.message))

async function getTest (url, params) {
  await axios.get(url, params).then(res => {
    console.log('wwwwwww', res)
  })
}
const url = 'http://ali-stock.showapi.com/timeline'
const params = {
  params: {
    code: '00700',
    day: '1'
  }
}
// 股票实时分时线数据
getTest(url, params).catch(error => console.log('.....', error.message))
