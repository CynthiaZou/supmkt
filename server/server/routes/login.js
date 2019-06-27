/**
 * 
 * 登录模块路由
 * 
 */

// 引入模块 
var express = require('express');
var router = express.Router();

/* ---验证token 开始------拦截所有请求 请求中必须携带token(令牌才响应数据  否则响应错误信息)-------- */

//引入检查token的模块
const expressJwt = require('express-jwt');

// 定义秘钥
const secret = 'Cynthia';

// 验证合法性 ==> 如果不合法 就会抛出错误哟！！
router.use(expressJwt ({
  secret:  secret 
}).unless({
  path: ['/login/logincheck']  //除了登录url，其他的URL都需要验证
}));

// 拦截器
router.use(function (err, req, res, next) {
  //当token验证失败时会抛出如下错误
  if (err.name === 'UnauthorizedError') {   
      //响应错误状态码 和 错误提示令牌
      res.status(401).send('invalid token..您的请求要携带正确的token才能获取到数据哦！！');
  }
});

/*-----验证token 结束-------拦截所有请求结束---------------- */

// 统一设置响应头 解决跨域
router.all('*', (req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Headers', 'authorization'); // 允许携带这个头部信息
    next();
})

// 引入数据库连接模块
const connection = require('./js/conn');

// 1- 引入jwt
const jwt = require('jsonwebtoken');

// 2- 定义秘钥
// const secret = 'Cynthia';

// 检查登录 账号和密码
router.post('/logincheck', (req, res) => { //接收请求
    // 接收参数 
    let { account, password } = req.body;

    // 准备sql
    const sqlStr = `select * from users where account='${account}' and password='${password}'`;
    
    // 执行参数 
    connection.query(sqlStr, (err, data) => {
        if (err) throw err;

        // console.log(data); //若没有想要的数据 返回空数组
        // console.log(data[0].id);
        // 判断
        if( data.length ) { //登录成功
            // 3- 生成token  ===> 已有用户数据 就生成token  因为这个数组里面不是干净的对象 so用浅浅的拷贝变干净
            const token = jwt.sign(Object.assign({}, data[0]), secret, {
                expiresIn: 60 * 60 * 2 //到期时间=2小时
            });

            // 获取用户id
            let userId = data[0].id;

            res.send({code: 0, msg: '恭喜你登录成功啦！！',token, userId}) //响应数据给前端
        }else {
            res.send({code: 1, msg: '账号或密码错误,请重新输入！！'}) //响应数据给前端
        }
    })

})


// 暴露
module.exports = router;