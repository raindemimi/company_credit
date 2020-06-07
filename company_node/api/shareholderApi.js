const express = require('express')
const router = express.Router()

const DBHelper = require('../config/DBHelper')
const sql = require('../sql')

router.post('/selectShareById', (req, res) => {
  const sqlStr = sql.share_info.selectById
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
