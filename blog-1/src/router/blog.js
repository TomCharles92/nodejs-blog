const {
  getList,
  getDetail,
  newBlog,
  updateBlog,
  delBlog
} = require('../controller/blog')
const {
  SuccessModel,
  ErrorModel
} = require('../model/resModel')

// 统一的登录校验方法
// 已登录会返回 undefined
const loginCheck = req => {
  if (!req.session.username) {
    return Promise.resolve(new ErrorModel('尚未登录'))
  }
}

const handleBlogRouter = (req, res) => {
  const {
    method,
    url,
    path,
    query,
    body
  } = req

  // 获取博客列表
  if (method === 'GET' && path === '/api/blog/list') {
    let {
      author = '', keyword = ''
    } = query

    if (query.isadmin) {
      // 管理员界面
      const loginCheckResult = loginCheck(req)
      if (loginCheckResult) {
        // 未登录
        return loginCheckResult
      }
      // 查询自己的博客
      author = req.session.username
    }

    const result = getList(author, keyword)
    return result.then(listData => {
      return new SuccessModel(listData, '这是获取博客列表的接口')
    })
  }

  // 获取博客详情
  if (method === 'GET' && path === '/api/blog/detail') {
    return getDetail(query.id).then(data => {
      return new SuccessModel(data, "这是获取博客详情的接口")
    })
  }

  // 新增一篇博客
  if (method === 'POST' && path === '/api/blog/new') {
    const loginCheckResult = loginCheck(req)
    if (loginCheckResult) {
      // 未登录
      return loginCheckResult
    }
    body.author = req.session.username
    console.log("new", req.session.username);

    return newBlog(body).then(id => {
      return new SuccessModel(id, "这是新增博客的接口")
    })
  }

  // 修改一篇博客
  if (method === 'POST' && path === '/api/blog/update') {
    return updateBlog(query.id, body).then(val => {
      if (val) return new SuccessModel("更新博客成功")
      else return new ErrorModel("更新博客失败")
    })
  }

  // 删除一篇博客
  if (method === 'POST' && path === '/api/blog/del') {
    const loginCheckResult = loginCheck(req)
    if (loginCheckResult) {
      // 未登录
      return loginCheck
    }

    const author = 'zhangsan'
    return delBlog(body.id, author).then(val => {
      if (val) return new SuccessModel("删除博客成功")
      else return new ErrorModel("删除博客失败")
    })
  }
}

module.exports = handleBlogRouter