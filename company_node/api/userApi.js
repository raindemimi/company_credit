const express = require('express')
const router = express.Router()

const DBHelper = require('../config/DBHelper')
const sql = require('../sql')

// 增加用户
router.post('/addUser', (req, res) => {
  const sqlStr = sql.user.add
  const params = req.body
  const conn = new DBHelper().getConn()
  conn.query(sqlStr, [params.name, params.age], (err, result) => {
    if (err) {
      res.json(err)
    } else {
      res.json(result)
    }
  })
  conn.end()
})

// 查询用户
router.get('/selectUser', (req, res) => {
  const sqlStr = sql.user.select
  const params = req.query
  const conn = new DBHelper().getConn()
  conn.query(sqlStr, [params.username, params.password], (err, result) => {
    if (err) {
      res.json(err)
    } else {
      res.json(result)
    }
  })
  conn.end()
})

router.get('/selectByToken', (req, res) => {
  const sqlStr = sql.user.selectByToken
  const params = req.query
  const conn = new DBHelper().getConn()
  conn.query(sqlStr, [params.token], (err, result) => {
    if (err) {
      res.json(err)
    } else {
      res.json(result)
    }
  })
  conn.end()
})

module.exports = router
