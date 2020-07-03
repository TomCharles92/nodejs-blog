const redis = require('redis')
const {
  REDIS_CONF
} = require('../conf/db')

// 创建客户端
const redisClient = redis.createClient(REDIS_CONF.port, REDIS_CONF.host)
redisClient.on('error', err => {
  console.log("redisClient: ", err);

})

function set(key, val) {
  if (typeof val === 'object') val = JSON.stringify(val)
  // 如果成功 redis.print 会打印 Reply: OK
  redisClient.set(key, val, redis.print)
}

function get(key) {
  return promise = new Promise((resolve, reject) => {
    redisClient.get(key, (err, val) => {
      if (err) return reject(err)

      // 以下是为了兼容JSON格式
      if (val === null) return resolve(null)

      try {
        resolve(JSON.parse(val))
      } catch (err) {
        resolve(val)
      }
    })
  })
}

module.exports = {
  set,
  get
}