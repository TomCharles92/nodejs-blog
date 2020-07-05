const express = require('express')
const router = express.Router()
const {
  login
} = require('../controller/user')
const {
  SuccessModel,
  ErrorModel
} = require('../model/resModel')

router.post('/login', function (req, res, next) {
  const {
    username,
    password
  } = req.body
  return login(username, password).then(userData => {
    if (userData.username) {
      // 设置 session
      req.session.username = userData.username
      req.session.realname = userData.realname
      res.json(new SuccessModel('登录成功'))
    } else res.json(new ErrorModel('登录失败'))
  })
})

router.get('/login-test', (req, res, next) => {
  if (req.session.username) {
    res.json({
      errno: 0,
      msg: '已登录'
    })
    return
  }
  res.json({
    errno: -1,
    msg: '未登录'
  })
})

router.get('/session-test', (req, res, next) => {
  const session = req.session
  if (session.viewNum === null) {
    session.viewNum = 0
  }
  session.viewNum++

  res.json({
    viewNum: session.viewNum
  })
})

module.exports = router