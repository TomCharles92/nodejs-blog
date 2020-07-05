var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const session = require('express-session')
const RedisStore = require('connect-redis')(session)

// 引用路由
// var indexRouter = require('./routes/index');
// var usersRouter = require('./routes/users');
const blogRouter = require('./routes/blog')
const userRouter = require('./routes/user')

// 每次访问初始化一个实例？本次 http 请求的实例
var app = express();

// view engine setup
// 前端页面的初始化，后端可以不用管
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// 插件 morgan，用来记录日志
// 这里会记录访问日志？
app.use(logger('dev'));
// 处理 post 中的数据，content-type: application/json 格式的数据
app.use(express.json());
// 处理 post 中的数据，application/x-www-form-urlencoded 格式的数据
app.use(express.urlencoded({
  extended: false
}));
// 处理之后，req.cookies 可以直接访问 cookie
app.use(cookieParser());
// 前端页面相关，静态文件
// app.use(express.static(path.join(__dirname, 'public')));

const redisClient = require('./db/redis')
const sessionStore = new RedisStore({
  client: redisClient
})
app.use(session({
  // resave: true,
  // saveUninitialized: false,
  secret: '3^yrXS!R61jFsna$',
  cookie: {
    // path: '/', // 默认值
    // httpOnly: true, // 默认值
    maxAge: 24 * 60 * 60 * 10000
  },
  store: sessionStore
}))

/* 注册路由 */
// app.use('/', indexRouter);
// app.use('/users', usersRouter);
app.use('/api/blog', blogRouter)
app.use('/api/user', userRouter)

// catch 404 and forward to error handler
// 上面捕获了2个父路由，其他的为404
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler 异常处理
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  // 只在 dev 环境抛出 error
  res.locals.error = req.app.get('env') === 'dev' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;