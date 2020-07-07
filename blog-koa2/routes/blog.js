const router = require('koa-router')()
const {
  SuccessModel,
  ErrorModel
} = require('../model/resModel')
const {
  getList,
  getDetail,
  newBlog,
  updateBlog,
  delBlog
} = require('../controller/blog')
const loginCheck = require('../middleware/loginCheck')


router.prefix('/api/blog')

// 查询博客列表
router.get('/list', async (ctx, next) => {
  let {
    author = '', keyword = ''
  } = ctx.query

  if (ctx.query.isadmin) {
    // 管理员界面
    if (!ctx.session.username) {
      return ctx.body = new ErrorModel('未登录')
    }
    // 查询自己的博客
    author = ctx.session.username
  }

  const listData = await getList(author, keyword)
  ctx.body = new SuccessModel(listData, "查询博客列表成功")
})

// 博客详情
router.get('/detail', async (ctx, next) => {
  const blog = await getDetail(ctx.query.id)
  ctx.body = new SuccessModel(blog, '查询博客详情成功')
})

// 新增博客
router.post('/new', loginCheck, async (ctx, next) => {
  const blog = Object.assign(ctx.request.body, {
    author: ctx.session.username
  })
  const id = await newBlog(blog)
  if (id) return ctx.body = new SuccessModel('新增博客成功')
  else return ctx.body = new ErrorModel('新增博客失败')
})

// 修改博客
router.post('/update', loginCheck, async (ctx, next) => {
  const result = await updateBlog(ctx.query.id, ctx.request.body)
  if (result) return ctx.body = new SuccessModel('更新博客成功')
  else return ctx.body = new ErrorModel('更新博客失败')
})

// 删除博客
router.post('/del', async (ctx, next) => {
  const result = delBlog(ctx.query.id, ctx.session.username)
  if (result) return ctx.body = new SuccessModel('删除博客成功')
  else return ctx.body = new ErrorModel('删除博客失败')
})

module.exports = router