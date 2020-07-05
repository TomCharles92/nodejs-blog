const {
  MYSQL_CONF
} = require('../conf/db')
const mysql = require('mysql')

// 创建连接对象
const con = mysql.createConnection(MYSQL_CONF)

// 开始连接
con.connect()

// 统一执行 sql 函数
function exec(sql) {
  return new Promise((resolve, reject) => {
    con.query(sql, (err, result) => {
      if (err) reject(err)
      else resolve(result)
    })
  })
}

// 关闭连接，不在这关闭
// con.end()

module.exports = {
  exec,
  escape: mysql.escape
}