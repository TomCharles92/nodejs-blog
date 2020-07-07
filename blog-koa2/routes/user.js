const router = require('koa-router')()
const {
  login
} = require('../controller/user');
const {
  SuccessModel,
  ErrorModel
} = require('../model/resModel');

router.prefix('/api/user')

router.post('/login', async (ctx, next) => {
  const {
    username,
    password
  } = ctx.request.body; // post data
  let {
    username: userN,
    realname
  } = await login(username, password)
  if (userN) {
    ctx.session.username = userN
    ctx.session.realname = realname
    return ctx.body = new SuccessModel('登录成功')
  }
  ctx.body = new ErrorModel('登录失败')
})

router.get('/session-test', async (ctx, next) => {
  if (!ctx.session.viewCount) ctx.session.viewCount = 0
  ctx.session.viewCount++
  ctx.body = {
    errno: 0,
    viewCount: ctx.session.viewCount
  }
})

module.exports = router