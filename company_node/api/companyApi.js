const express = require('express')
const router = express.Router()

const DBHelper = require('../config/DBHelper')
const sql = require('../sql')

// 根据名称关键字查询企业信息
router.post('/selectCompanyByName', (req, res) => {
  const sqlStr = sql.company.selectByName
  const params = req.body
  const conn = new DBHelper().getConn()
  conn.query(sqlStr, [params.name], (err, result) => {
    if (err) {
      res.json(err)
    } else {
      res.json(result)
    }
  })
  conn.end()
})
router.post('/selectCompanyById', (req, res) => {
  const sqlStr = sql.company.selectById
  const params = req.body
  const conn = new DBHelper().getConn()
  conn.query(sqlStr, [params.id], (err, result) => {
    if (err) {
      res.json(err)
    } else {
      res.json(result)
    }
  })
  conn.end()
})

module.exports = router
