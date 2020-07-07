const {
  ErrorModel
} = require("../model/resModel");

module.exports = ((ctx, next) => {
  if (ctx.session.username) {
    return next() 
  } else {
    ctx.body = new ErrorModel('未登录')
  }
})