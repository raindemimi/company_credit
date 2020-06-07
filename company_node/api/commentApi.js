const express = require('express')
const router = express.Router()

const DBHelper = require('../config/DBHelper')
const sql = require('../sql')

router.get('/selectByCom', (req, res) => {
  const sqlStr = sql.comment.select
  const params = req.query
  const conn = new DBHelper().getConn()
  conn.query(sqlStr, [params.company], (err, result) => {
    if (err) {
      res.json(err)
    } else {
      res.json(result)
    }
  })
  conn.end()
})

router.post('/addComment', (req, res) => {
  const sqlStr = sql.comment.add
  const params = req.body
  const conn = new DBHelper().getConn()
  conn.query(sqlStr, [params.conent, params.date], (err, result) => {
    if (err) {
      res.json(err)
    } else {
      res.json(result)
    }
  })
  conn.end()
})

router.post('/deleteComment', (req, res) => {
  const sqlStr = sql.comment.delete
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
