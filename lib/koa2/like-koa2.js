const http = require('http')

// 组合中间件
function compose(middlewareList) {
  return function (ctx) {
    function dispatch(i) {
      const fn = middlewareList[i]
      try {
        // 格式兼容：中间件注册如果没有用 async，这里确保将中间件封装成 promise
        // 去执行下一个中间件
        return Promise.resolve(fn(ctx, dispatch.bind(null, i + 1)))
      } catch (error) {
        return Promise.reject(error)
      }
    }
    return dispatch(0) // 上来就指向第一个中间件
  }
}

class LikeKoa2 {
  constructor() {
    this.middlewareList = []
  }

  use(fn) {
    this.middlewareList.push(fn)
    return this //支持链式调用
  }

  createContext(req, res) {
    const ctx = {
      req,
      res
    }
    ctx.query = req.query
    return ctx
  }

  handleRequest(ctx, fn) {
    return fn(ctx)
  }

  callback() {
    // 获取第一个中间件
    const fn = compose(this.middlewareList)
    return (req, res) => {
      const ctx = this.createContext(req, res)
      return this.handleRequest(ctx, fn)
    }
  }

  listen(...args) {
    const server = http.createServer(this.callback())
    server.listen(...args)
  }
}

module.exports = LikeKoa2

// Koa2 路由模块被拆分出去了