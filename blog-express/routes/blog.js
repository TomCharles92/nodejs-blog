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
const loginCheck = require('../middleware/loginCheck')

router.get('/list', function (req, res, next) {
  let {
    author = '', keyword = ''
  } = req.query

  if (req.query.isadmin) {
    // 管理员界面
    console.log(req.session.username);

    if (!req.session.username) {
      return res.json(new ErrorModel('未登录'))
    }
    // 查询自己的博客
    author = req.session.username
  }

  const result = getList(author, keyword)
  return result.then(listData => {
    res.json(new SuccessModel(listData, '这是获取博客列表的接口'))
  })
})

router.get('/detail', (req, res, next) => {
  return getDetail(req.query.id).then(data => {
    res.json(new SuccessModel(data, "这是获取博客详情的接口"))
  })
})

router.post('/new', loginCheck, (req, res, next) => {
  req.body.author = req.session.username
  return newBlog(req.body).then(id => {
    res.json(new SuccessModel(id, "这是新增博客的接口"))
  })
})

router.post('/update', loginCheck, (req, res, next) => {
  return updateBlog(req.query.id, req.body).then(val => {
    if (val) return res.json(new SuccessModel("更新博客成功"))
    else return res.json(new ErrorModel("更新博客失败"))
  })
})

router.post('/del', loginCheck, (req, res, next) => {
  return delBlog(req.query.id, req.session.username).then(val => {
    if (val) return res.json(new SuccessModel("删除博客成功"))
    else return res.json(new ErrorModel("删除博客失败"))
  })
})

module.exports = router