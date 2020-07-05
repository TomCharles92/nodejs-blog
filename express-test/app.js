const express = require('express')

// 本次 http 请求的实例
const app = express()

/* 中间件 */
app.use((req, res, next) => {
  console.log('请求开始...', req.method, req.url);
  next()
})

app.use((req, res, next) => {
  // 假设在处理 cookie
  req.cookie = {
    userId: 'abc123'
  }
  next()
})

app.use((req, res, next) => {
  // 假设处理 post data
  // 异步
  setTimeout(() => {
    req.body = {
      a: 100,
      b: 200
    }
    next()
  })
})

/* app.use 的另一种用法 */
app.use('/api', (req, res, next) => {
  console.log('处理 /api 路由');
  next()
})

app.get('/api', (req, res, next) => {
  console.log('get /api 路由');
  next()
})

app.post('/api', (req, res, next) => {
  console.log('post /api 路由');
  next()
})

/* 连续使用多个’中间件函数‘ */
function loginCheck(req, res, next) {
  setTimeout(() => {
    console.log('登录成功');
    next()
  })
}

app.get('/api/get-cookie', loginCheck, (req, res, use) => {
  console.log('get /api/get-cookie');
  // 直接返回了，没有执行 next
  res.json({
    errno: 0,
    data: req.cookie
  })
})

app.post('/api/get-post-data', (req, res, next) => {
  console.log('get /api/get-post-data');
  res.json({
    errno: 0,
    data: req.body
  })
})

// 处理 404
app.use((req, res, next) => {
  console.log('处理 404');
  res.json({
    errno: -1,
    msg: '404 not found'
  })
})

app.listen(3000, () => {
  console.log('server is running on port 3000');
})