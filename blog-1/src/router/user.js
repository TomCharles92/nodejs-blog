const {
  login
} = require('../controller/user')
const {
  SuccessModel,
  ErrorModel
} = require('../model/resModel')
const {
  set
} = require('../db/redis')

const handleUserRouter = (req, res) => {
  const {
    method,
    url,
    path,
    body
  } = req

  // 登录
  if (method === 'POST' && path === '/api/user/login') {
    const {
      username,
      password
    } = req.body
    return login(username, password).then(userData => {
      if (userData.username) {
        // 设置 session
        req.session.username = userData.username
        req.session.realname = userData.realname
        console.log('req.session is: ', req.session);
        set(req.sessionId, req.session)

        return new SuccessModel('登录成功')
      } else return new ErrorModel('登录失败')
    })
  }

  // 登录验证的测试
  // if (method === 'GET' && req.path === '/api/blog/login-test') {
  //   if (req.session.username) {
  //     return Promise.resolve(new SuccessModel({
  //       session: req.session
  //     }))
  //   } else return Promise.resolve(new ErrorModel('尚未登录'))
  // }

}

module.exports = handleUserRouter