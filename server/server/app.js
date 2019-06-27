var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

// 引入子路由
// var indexRouter = require('./routes/index');
// var usersRouter = require('./routes/users');
var accountRouter = require('./routes/account'); //账号管理模块
var loginRouter = require('./routes/login'); //登录模块
var goodsRouter = require('./routes/goods'); //商品模块

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');



app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// 分配路由
// app.use('/', indexRouter);
// app.use('/users', usersRouter);
app.use('/account', accountRouter); //账号管理模块 ==> 这样设置 前端发送请求时地址就应该是eg: /account/accountadd
app.use('/login', loginRouter); //登录模块  
app.use('/goods', goodsRouter); //商品模块


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

// 监听端口
app.listen(9999, function() {
  // console.log('服务器启动成功！！ http://127.0.0.1:9999');
  // console.log('服务器启动成功！！ http://172.16.12.185:9999');
})

module.exports = app;
