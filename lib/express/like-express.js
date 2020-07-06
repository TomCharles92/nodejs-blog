const http = require('http')

class LikeExpress {
  constructor() {
    // 存放中间件的列表
    this.routes = {
      all: [],
      get: [],
      post: []
    }
  }

  register(path) {
    let info = {}
    // 如果第一个参数是路由
    if (typeof path === 'string') {
      const [path, ...stack] = [...arguments]
      info = {
        path,
        stack
      }
    } else {
      info = {
        path: '/', // 默认为根路由
        stack: [...arguments] // 可能会调用多个中间件
      }
    }
    return info
  }

  use() {
    const info = this.register.apply(this, arguments)
    this.routes.all.push(info)
  }

  get() {
    const info = this.register.apply(this, arguments)
    this.routes.get.push(info)
  }

  post() {
    const info = this.register.apply(this, arguments)
    this.routes.post.push(info)
  }

  // 从routes中取出匹配的中间件方法，存入数组
  match(method, url) {
    let stack = []
    if (url === '/favicon.ico') return stack

    // 当前请求匹配的中间件
    const curRoutes = [...this.routes.all, ...this.routes[method]]
    curRoutes.forEach(routeInfo => {
      // use注册的，匹配的是'/'路径
      if (url.includes(routeInfo.path)) {
        stack.push(...routeInfo.stack)
      }
    })
    
    return stack
  }

  // 去按顺序执行中间件方法
  // 核心的next机制
  handle(req, res, stack) {
    const next = () => {
      // 取第一个中间件
      const middleware = stack.shift()
      if (middleware) {
        // 执行中间件函数
        // 将next方法传入，实现递归
        middleware(req, res, next)
      }
    }
    next()
  }

  callback() {
    return (req, res) => {
      res.json = (data) => {
        res.setHeader('Content-Type', 'application/json')
        res.end(JSON.stringify(data))
      }

      const {
        url,
        method
      } = req // 考虑一下：在这直接将 method小写化
      const resultList = this.match(method.toLowerCase(), url) // 获取此次请求需要执行的中间件列表

      this.handle(req, res, resultList)
    }
  }

  listen(...args) {
    const server = http.createServer(this.callback())
    server.listen(...args)
  }
}

// 工厂函数
module.exports = () => {
  return new LikeExpress()
}