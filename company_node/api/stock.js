const express = require('express')
const router = express.Router()
var axios = require('axios')

axios.defaults.headers.Authorization = 'APPCODE 4965d137351042fdb0badcba0df62d46'
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8'

async function getTest () {
  var result = await axios.get('http://ali-stock.showapi.com/timeline', {
    params: {
      code: '00700',
      day: '1'
    }
  })
  console.log('data', result)
  return result
}
// const url = 'http://ali-stock.showapi.com/timeline'
// const params = {
//   params: {
//     code: '00700',
//     day: '1'
//   }
// }
// 股票实时分时线数据
var data = getTest()
// var data1 = {
//   showapi_res_error: '',
//   showapi_res_id: '5ead6daa8d57baae1262ce66',
//   showapi_res_code: 0,
//   showapi_res_body:
//       {
//         ret_code: 0,
//         market: 'hk',
//         name: '腾讯控股',
//         code: '00700',
//         dataList: [Array]
//       }
// }

router.get('/stock', (req, res) => {
  // const params = req.query

  res.json(data.status)
})

module.exports = router
