// node后端服务器
const http = require('http')
const badyParser = require('body-parser')
const express = require('express')

const userApi = require('./api/userApi')
const companyApi = require('./api/companyApi')
const shareholderApi = require('./api/shareholderApi')
const websiteApi = require('./api/websiteApi')
const company2Api = require('./api/company2Api')
const costApi = require('./api/costApi')
const lrbApi = require('./api/lrbApi')
const zcfzbApi = require('./api/zcfzbApi')
const xjllbApi = require('./api/xjllbApi')
const payingApi = require('./api/payingApi')
const profitApi = require('./api/profitApi')
const economiesApi = require('./api/economiesApi')

// const stockApi = require('./api/stock')

const commentApi = require('./api/commentApi')

const app = express()
const server = http.createServer(app)

app.use(badyParser.json())
app.use(badyParser.urlencoded({
  extended: false
}))

// 设置跨域和相应数据格式
app.all('/api/*', function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'X-Requested-With, APPCODE')
  res.header('Access-Control-Allow-Headers', 'X-Requested-With, Authorization')
  res.setHeader('Content-Type', 'application/json;charset=utf-8')
  res.header('Access-Control-Allow-Headers', 'Content-Type,Content-Length, Authorization, Accept,X-Requested-With')
  res.header('Access-Control-Allow-Methods', 'PUT,POST,GET,DELETE,OPTIONS')
  res.header('X-Powered-By', ' 3.2.1')
  if (req.method == 'OPTIONS') res.send(200)
  /* 让options请求快速返回 */ else next()
})

// 后端api路由
app.use('/api/user', userApi)
app.use('/api/company', companyApi)
app.use('/api/shareholder', shareholderApi)
app.use('/api/website', websiteApi)
app.use('/api/company2', company2Api)
app.use('/api/cost', costApi)
app.use('/api/lrb', lrbApi)
app.use('/api/zcfzb', zcfzbApi)
app.use('/api/xjllb', xjllbApi)
app.use('/api/paying', payingApi)
app.use('/api/profit', profitApi)
app.use('/api/economies', economiesApi)

// app.use('/api', stockApi)

app.use('/api/comment', commentApi)

// 启动监听
server.listen(8800, () => {
  console.log(' success!! port:8800')
})
