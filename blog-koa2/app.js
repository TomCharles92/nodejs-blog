const Koa = require('koa')
const app = new Koa() // 当前请求的实例
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
const session = require('koa-generic-session')
const redisStore = require('koa-redis')
const {
  REDIS_CONF
} = require('./conf/db')
const path = require('path');
const fs = require('fs')
const morgan = require('koa-morgan')

const index = require('./routes/index')
const users = require('./routes/users')
const blog = require('./routes/blog')
const user = require('./routes/user')

// error handler
onerror(app)

// middlewares
// 处理 post 中多种数据格式
app.use(bodyparser({
  enableTypes: ['json', 'form', 'text']
}))
// 美化 json 格式
app.use(json())
// 美化 log 的，下面这种格式
// --> POST /api/blog/new 200 57ms 42b
app.use(logger())
app.use(require('koa-static')(__dirname + '/public'))

app.use(views(__dirname + '/views', {
  extension: 'pug'
}))

// 当前请求消耗的时间
app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})

// 插件 morgan，用来记录日志
// 这里会记录访问日志
if (process.env.NODE_ENV !== 'dev') {
  app.use(morgan('dev'));
} else {
  const fileName = path.resolve(__dirname, "logs/access.log")
  const writeStream = fs.createWriteStream(fileName);
  app.use(morgan('combined', {
    stream: writeStream
  }))
}

// session 配置
app.keys = ['!CK#1j51MpTzBKxa']
app.use(session({
  cookie: {
    path: '/',
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000
  },
  // 配置 redis
  store: redisStore({
    all: `${REDIS_CONF.host}:${REDIS_CONF.port}`
  })
}))

// routes
app.use(index.routes(), index.allowedMethods())
app.use(users.routes(), users.allowedMethods())
app.use(blog.routes(), blog.allowedMethods())
app.use(user.routes(), user.allowedMethods())

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});

module.exports = app