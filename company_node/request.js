const request = require('request')
var url = 'http://ali-stock.showapi.com/timeline'
var requestData = { src: '00700', day: '1' }
request({
  url: url,
  method: 'GET',
  json: true,
  headers: {
    'content-type': 'application/json',
    Authorization: 'APPCODE 4965d137351042fdb0badcba0df62d46'
  },
  body: JSON.stringify(requestData)
}, function (error, response, body) {
  if (!error || response.statusCode == 200) {
    console.log(body) // 请求成功的处理逻辑
  }
})
