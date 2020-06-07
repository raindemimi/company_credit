const express = require('express')
const router = express.Router()

const DBHelper = require('../config/DBHelper')
const sql = require('../sql')

router.get('/selectByCode', (req, res) => {
  const sqlStr = sql.cost.select
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

module.exports = router
