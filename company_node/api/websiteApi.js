const express = require('express')
const router = express.Router()

const DBHelper = require('../config/DBHelper')
const sql = require('../sql')

router.get('/selectWebsite', (req, res) => {
  const sqlStr = sql.website.select
  const params = req.query
  const conn = new DBHelper().getConn()
  conn.query(sqlStr, (err, result) => {
    if (err) {
      res.json(err)
    } else {
      res.json(result)
    }
  })
  conn.end()
})

module.exports = router
