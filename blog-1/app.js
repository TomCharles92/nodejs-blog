const querystring = require('querystring')
const {
  get,
  set
} = require('./src/db/redis')
const handleBlogRouter = require('./src/router/blog')
const handleUserRouter = require('./src/router/user')
const { access } = require('./src/utils/log')

// 获取 cookie 的过期时间
const getCookieExpires = () => {
  const d = new Date()
  d.setTime(d.getTime() + (24 * 60 * 60 * 1000))
  return d.toGMTString()
}

// 用于处理 post data
const getPostData = req => {
  return new Promise((resolve) => {
    if (req.method !== 'POST') return resolve({})
    if (req.headers['content-type'] !== 'application/json') return resolve({})
    let postData = ''
    req.on('data', chunk => {
      postData += chunk.toString()
    })
    req.on('end', () => {
      if (!postData) return resolve({})
      resolve(JSON.parse(postData))
    })
  })
}

const serverHandle = (req, res) => {
  // 记录 access log
  access(`${req.method} -- ${req.url} -- ${req.headers['user-agent']} -- ${Date.now()}`)

  // 设置返回格式 JSON
  res.setHeader('Content-type', 'application/json')
  // 解析 path
  req.path = req.url.split('?')[0]
  // 解析 query
  req.query = querystring.parse(req.url.split('?')[1])
  // 解析 cookie
  req.cookie = {}
  const cookieStr = req.headers.cookie || ''
  cookieStr.split(';').forEach(item => {
    if (!item) return
    const [key, value] = item.split('=')
    req.cookie[key.trim()] = value.trim()
  })

  // 解析 session
  let needSetCookie = false

  // 读取或生成 userId
  let userId = req.cookie.userid
  if (!userId) {
    needSetCookie = true
    userId = `${Date.now()}_${Math.random()}`
    set(userId, {})
  }
  req.sessionId = userId
  console.log(req.sessionId);

  get(req.sessionId).then(sessionData => {
      if (sessionData === null) {
        set(req.sessionId, {})
        req.session = {}
      } else {
        req.session = sessionData
      }
      console.log('req.session: ', req.session)

      // 处理 postData
      return getPostData(req)
    })
    .then(postData => {
      req.body = postData

      // 处理 blog 路由
      const blogResult = handleBlogRouter(req, res)
      if (blogResult) {
        return blogResult.then(blogData => {
          if (needSetCookie)
            // 设置 cookie，
            // 如果不设置 path，则默认是 /api/blog
            res.setHeader('Set-Cookie', `userid=${userId}; path=/; httpOnly; expires=${getCookieExpires()}`)
          res.end(JSON.stringify(blogData))
        })

      }

      // 处理 user 路由
      const userResult = handleUserRouter(req, res)
      if (userResult) {
        return userResult.then(userData => {
          if (needSetCookie)
            res.setHeader('Set-Cookie', `userid=${userId}; path=/; httpOnly; expires=${getCookieExpires()}`)
          res.end(JSON.stringify(userData))
        })
      }

      // 未命中路由，返回404
      res.writeHead(404, {
        'Content-type': 'text/plain'
      })
      res.write("404 Not Found\n")
      res.end()
    })
}

module.exports = serverHandle