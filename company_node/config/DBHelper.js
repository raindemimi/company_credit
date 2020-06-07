// 数据库连接助手
const mysql = require('mysql')

class DBHelper {
  // 获取数据库连接
  getConn () {
    const conn = mysql.createConnection({
      // 数据库连接配置
      host: '127.0.0.1',
      port: '3306',
      user: 'root',
      password: '123456',
      database: 'comany_credit' // 数据库名
    })
    conn.connect()
    return conn
  }
}

module.exports = DBHelper
