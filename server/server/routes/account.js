const express = require('express');
const router = express.Router();

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

//统一设置响应头 解决跨域
router.all('*', (req, res, next) => {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Headers', 'authorization'); // 允许携带这个头部信息
	next(); //放行
})

//引入mysql连接模块
const connection = require('./js/conn');

/*检测账号是否存在 */
router.get('/accountcheck', (req, res) => {
	// 接收参数
	let { account } = req.query;
	// console.log(account)

	// 准备sql
	const sqlStr = `select * from users where account='${account}'`;
	// console.log(sqlStr);
	// 执行sql
	connection.query(sqlStr, (err, data) => {
		if (err) throw err;
		// 判断
		if(!data.length) { //若没有长度 说明系统没有此账号 可以使用
			res.send({code: 0, msg: '此账号可以使用'})
		}else {
			res.send({code: 1, msg: '此账号已被使用,请更换账号名'})
		}
	})
})

/* 检测密码修改页面 原密码一致性 */
router.post('/editmodify', (req, res) => {
	// 接收参数
	let { id, password } = req.body;
	// console.log( id, password)
	// console.log(req.user)// 做了接口鉴权后, 后台内置方法 req.user 能取到用户信息对象列表 就可以获取相关用户信息啦！

	// 准备sql
	const sqlStr = `select * from users where id=${id} and password='${password}'`

	// 执行sql
	connection.query(sqlStr, (err, data) => {
		if (err) throw err;
		// 判断
		if( data.length ) {
			res.send({code: 0, msg: '验证通过,亲你可以去修改密码啦！'}) //响应数据给前端小姐姐
		} else {
			res.send({code: 1, msg: '与原密码不一致, 傻么？ 我能说什么？请重新输入！'}) //响应数据给前端小姐姐
		}
	})
})

/* 确认修改密码 */
router.post('/confirmmodify', (req, res) => {
	// 接收参数 
	let { userId, newPassword } = req.body;
	// console.log(userId, newPassword)
	// 准备sql
	const sqlStr = `update users set password='${newPassword}' where id=${userId}`;
	console.log(sqlStr)
	// 执行sql
	connection.query(sqlStr, (err, data) => {
		if (err) throw err;
		// 判断
		if(data.affectedRows > 0) {
			res.send({code: 0, msg: '恭喜！密码修改成功！'}) //响应数据给前端
		}else {
			res.send({code: 1, msg: '密码修改失败了哟！'}) //响应数据给前端
		}
	})
})

/*添加账号*/
router.post('/accountadd', (req, res) => { //接收请求
	//接收参数 
	let {account, password, userGroup } = req.body;

	// 准备sql
	const sqlStr = `insert into users(account, password, userGroup) values('${account}','${password}','${userGroup}')`

	// 执行sql
	connection.query(sqlStr, (err, data) => {
		if (err) throw err;
		// console.log(data);// 结果是一个对象  里面有几个属性
		// 判断
		if(data.affectedRows > 0) { //响应数据给前端
			res.send({code: 0, msg: '账号添加成功！'})
		} else{
			res.send({code: 1, msg: '账号添加失败！'})
		}
	})

	// res.send('888888')
})

/*处理账户列表*/
// router.get('/accountlist', (req, res) => {
// 	// 准备sql
// 	const sqlStr = `select * from users order by ctime desc`;

// 	// 执行sql
// 	connection.query(sqlStr, (err, data) => {
// 		res.send( {data} );
// 	})
// })

/*单条删除  */
router.get('/accountdel', (req, res) => { //接收请求
	// 接收参数
	let { id } = req.query;
	// 准备sql
	const sqlStr = `delete from users where id=${id}`; //去navicat新建查询 测试语句是否正确能实现删除
	// 执行sql
	connection.query(sqlStr, (err, data) => {
		if (err) throw err;
		console.log(data)
		// 判断
		if( data.affectedRows > 0 ) {
			res.send({code: 0, msg: '删除成功！'})
		} else {
			res.send({code: 1, msg: '删除失败！'})
		}
	})
})

/* 编辑数据回填 */
router.get('/accountedit', (req, res) => {  //接收请求
	// 接收参数
	let { id } = req.query;
	// 准备sql
	const sqlStr = `select * from users where id=${id}`;
	// 执行sql
	connection.query(sqlStr, (err, data) => {
		if (err) throw  err;
		// 判断
		// console.log(data) //是一个数组 
		res.send({ data }); //响应数据给前端
		
	})
})

/*保存编辑*/
router.post('/accountsave', (req, res) => { //接收请求
	// 接收参数 
	let { account, userGroup, id} = req.body;
	
	// 准备sql
	const sqlStr = `update users set account='${account}', userGroup='${userGroup}' where id=${id}`;
	// console.log(sqlStr)
	// 执行sql
	connection.query(sqlStr, (err, data) => {
		if (err) throw err;
		console.log(data)
		// 判断
		if( data.affectedRows > 0 ) {
			res.send({code: 0, msg: '修改成功'}); //响应数据给前端
		}else {
			res.send({code: 1, msg: '修改失败'});
		}
		
	})
})

/* 批量删除 */
router.get('/batchdelete', (req, res) => {
	// 接收参数
	let { idArr } = req.query;
	// console.log( idArr )

	// 准备sql ==> 接收到的参数为一个数组 写条件时注意: eg=> id in (${idArr})
	const sqlStr = `delete from users where id in (${idArr})`;

	// 执行sql
	connection.query(sqlStr, (err, data) => {
		if (err) throw err;
		// 判断
		if( data.affectedRows > 0 ) {
			res.send({code: 0, msg: '批量删除成功！'}) // 响应数据给前端
		} else{
			res.send({code: 1, msg: '批量删除失败！'})
		}
	})
})

/* 按照分页请求数据 */
router.get('/accountlistbypage', (req, res) => {
	// 接收参数 
	let { pageSize, currentPage } = req.query;

	// 定义变量保存数据总条数
	let total;

	// 准备sql
	let sqlStr = `select * from users order by ctime desc`; //查询后台所有数据 降序排列 去navicat测试语句是否正确 龙其是做删除的时候

	// 执行sql
	connection.query(sqlStr, (err, data) => {
		if (err) throw err;
		// 获取data总条数
		total = data.length;
	})

	// 构造sql ==> 按照分页查询数据
	sqlStr = `select * from users order by ctime desc limit ${(currentPage-1)*pageSize}, ${pageSize}`;
	// console.log(sqlStr); //一定要去navicat测试数据准确性

	// 执行sql
	connection.query(sqlStr, (err, data) => {
		if (err) throw err;
		// 把 总数据 和 当前页对应的数据 响应给前短
		res.send({total, data});
	})
})

/* 用户信息 */
router.get('/info', (req, res) => {
	// 获取id
	let id = req.user.id;
	// console.log(id)
	// 构造sql
	const sqlStr = `select * from users where id=${id}`;
	// 执行sql
	connection.query(sqlStr, (err, data) => {
		if (err) throw err;
		res.send({data});
	})
})


/* -------上传开始--------- */
// 引入node上传模块
var multer = require('multer');

// 配置存储路径 和 重命名
var storage = multer.diskStorage({
	// 图片上传到服务器以后 要放置的路径 
	destination: 'public/upload',

	// 图片重命名
	filename: function (req, file, cb) {
		var fileFormat = (file.originalname).split(".");
		// 获取时间戳
		var filename = new Date().getTime();
		//  124354654 + "." + jpg
		cb(null, filename + "." + fileFormat[fileFormat.length - 1]);
	}
});

// 上传对象
var upload = multer({
	storage,
});

// 接收上传请求
router.post('/uploadavatar', upload.single('file'), (req, res) => {
	// 接收到的文件信息
	var file = req.file;
	console.log("接收到的文件信息:",file) 

	// 文件名
	let fileName = file.filename;

	// 拼接文件路径
	let avatarUrl = '/upload/' + fileName;

	// 构造sql
	const sqlStr = `update users set avatarUrl = '${avatarUrl}' where id=${req.user.id}`; 
	// console.log(sqlStr)

	// 执行sql
	connection.query(sqlStr, (err, data) => {
		if (err) throw err;
		if( data.affectedRows > 0) {
			res.send({code: 0, msg: '上传成功', avatarUrl})
		} else{
			res.send({code: 1, msg: '上传失败'})

		}
	})

})

/* -----------上传结束--------------- */


/* 获取用户角色 */
router.get('/role', (req, res) => {
	res.send({role: req.user.userGroup});
})



module.exports = router;
