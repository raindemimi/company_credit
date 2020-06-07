const express = require('express')
const router = express.Router()

const DBHelper = require('../config/DBHelper')
const sql = require('../sql')

router.get('/selectByCode', (req, res) => {
  const sqlStr = sql.company2.selectByCode
  const params = req.query
  const conn = new DBHelper().getConn()
  conn.query(sqlStr, [params.code], (err, result) => {
    if (err) {
      res.json(err)
    } else {
      res.json(result)
    }
  })
  conn.end()
})

router.get('/selectByName', (req, res) => {
  const sqlStr = sql.company2.selectByName
  const params = req.query
  const conn = new DBHelper().getConn()
  conn.query(sqlStr, [params.company_name], (err, result) => {
    if (err) {
      res.json(err)
    } else {
      res.json(result)
    }
  })
  conn.end()
})

module.exports = router
