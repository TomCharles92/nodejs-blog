const mysql = require('mysql')

// 创建连接对象
const con = mysql.createConnection({
  host: 'cdb-muyad014.cd.tencentcdb.com',
  user: 'root',
  password: 'vKQFmoBTE#y92fV%',
  port: '10041',
  database: 'myblog'
})

// 开始连接
con.connect()

// 执行sql
const sql = 'select * from users;'
con.query(sql, (err, result) => {
  if (err) {
    return console.log(err);

  }
  console.log(result);

})

// 关闭连接
con.end()