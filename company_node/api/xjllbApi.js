const express = require('express')
const router = express.Router()
const sql = require('../sql')
const DBHelper = require('../config/DBHelper')

router.get('/selectByCode', (req, res) => {
  const params = req.query
  const conn = new DBHelper().getConn()
  const sqlStr = sql.xjllb.selectByCode
  conn.query(sqlStr, [params.code], (err, result) => {
    if (err) {
      res.json(err)
    } else {
      res.json(result)
    }
  })
  conn.end()
})

module.exports = router
