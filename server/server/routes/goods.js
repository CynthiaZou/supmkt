/**
 * 
 * 商品模块路由
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

// 商品添加
router.post('/goodsadd', (req, res) => {
    // 接收参数
    let {classify,barCode,goodsName,purchasePrice,sellPrice,marketPrice,selectNum,goodsWeight,goodsUnit,VIPBelefits,isPromotion,goodsIntro} = req.body;

    // 准备sql
    const sqlStr = `insert into goods(classify,barCode,goodsName,purchasePrice,sellPrice,marketPrice,selectNum,goodsWeight,goodsUnit,VIPBelefits,isPromotion,goodsIntro) values(?,?,?,?,?,?,?,?,?,?,?,?)`;
    // 参数
    let sqlParams = [classify,barCode,goodsName,purchasePrice,sellPrice,marketPrice,selectNum,goodsWeight,goodsUnit,VIPBelefits,isPromotion,goodsIntro]
    // 执行sql
    connection.query(sqlStr, sqlParams, (err, data) => {
        if (err) throw err;
        // 判断
        if(data.affectedRows > 0) {
            res.send({code: 0, msg: '添加成功！'})
        }else {
            res.send({code: 1, msg: '添加失败！'})
        }
    })

})

// 商品管理列表
router.get('/goodslistbypage', (req, res) => {
    // 接收参数
    let {pageSize, currentPage, classify, keyWord} = req.query;

    // 构造sql
    let sqlStr = `select * from goods where 1=1`; // 为了让后面拼接起来方便 因为拼条件必须在where后面
    // console.log(sqlStr) //此时查询到全部商品
    // 定义变量保存 数据总条数
    let total;

    // 如果分类不等于空 且 不等于全部 
    if (classify !== '' && classify !== 'all kinds') {
        // 拼接第一个查询条件
        sqlStr += ` and classify='${classify}'`;
        // console.log(sqlStr)
    }

    // 如果第二个关键字不为空 那么就拼接sql
    if(keyWord !== '') {
        // 拼接第二个查询条件
        sqlStr += ` and (goodsName like '%${keyWord}%' or barCode like '%${keyWord}%')`;
        // console.log(sqlStr) // 商品名称或条形码中包含关键字的条件语句
    }

    // 拼接排序
    sqlStr += ` order by ctime desc`;


    // 执行sql
    connection.query(sqlStr, (err, data) =>{
        if (err) throw err;
        // 获取数据总条数
        total = data.length;
    })

    // 拼接sql 获取每页条数data
    let n = (currentPage-1) * pageSize;
    sqlStr += ` limit ${n}, ${pageSize}`;

    // 执行sql
    connection.query(sqlStr, (err, data) => {
        if (err) throw err;
        res.send({total, data}); //把数据总条数 和 每页数据 响应给前端    
        
    })
})

// 单条删除
router.get('/goodsdelete', (req, res) => {
    // 接收参数
    let { id } = req.query;
    // 准备sql
    const sqlStr = `delete from goods where id=${id}`;
    // 执行sql
    connection.query(sqlStr, (err, data) => {
        if (err) throw err;
        if(data.affectedRows > 0) {
            res.send({code: 0, msg: '删除成功！'})
        }else {
            res.send({code: 1, msg: '删除失败！'})

        }
    })
})

// 批量删除
router.get('/batchdelete', (req, res) => {
    // 接收参数 
    let { idArr } = req.query;

    // 准备sql
    const sqlStr = `delete from goods where id in (${idArr})`;
    // 执行sql
    connection.query(sqlStr, (err, data) => {
        if (err) throw err;
        // 判断
        if (data.affectedRows > 0) {
            res.send({code: 0, msg: '批量删除成功！'})
        }else {
            res.send({code: 1, msg: '批量删除失败！'})
        }
    })
})


// 暴露
module.exports = router;