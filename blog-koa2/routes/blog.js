const router = require('koa-router')()

router.prefix('/api/blog')

router.get('/list', (ctx, next) => {
  ctx.body = {
    errno: 0,
    data: ["博客列表"]
  }
})

module.exports = router