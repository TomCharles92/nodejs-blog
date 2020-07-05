const env = process.env.NODE_ENV // 环境变量

// 配置
let MYSQL_CONF
let REDIS_CONF

if (env === 'dev') {
  MYSQL_CONF = {
    host: 'cdb-muyad014.cd.tencentcdb.com',
    user: 'root',
    password: 'vKQFmoBTE#y92fV%',
    port: '10041',
    database: 'myblog'
  }

  REDIS_CONF = {
    port: 6379,
    host: '127.0.0.1'
  }
}

if (env === 'production') {
  MYSQL_CONF = {
    host: 'cdb-muyad014.cd.tencentcdb.com',
    user: 'root',
    password: 'vKQFmoBTE#y92fV%',
    port: '10041',
    database: 'myblog'
  }

  REDIS_CONF = {
    port: 6379,
    host: '127.0.0.1'
  }
}

module.exports = {
  MYSQL_CONF,
  REDIS_CONF
}