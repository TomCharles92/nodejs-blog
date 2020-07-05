const express = require('express')
const router = express.Router()
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

router.get('/list', function (req, res, next) {
  let {
    author = '', keyword = ''
  } = req.query

  // if (query.isadmin) {
  //   // 管理员界面
  //   const loginCheckResult = loginCheck(req)
  //   if (loginCheckResult) {
  //     // 未登录
  //     return loginCheckResult
  //   }
  //   // 查询自己的博客
  //   author = req.session.username
  // }

  const result = getList(author, keyword)
  return result.then(listData => {
    res.json(new SuccessModel(listData, '这是获取博客列表的接口'))
  })
})

router.get('/detail', function (req, res, next) {
  res.json({
    errno: 0,
    data: 'OK'
  })
})

module.exports = router