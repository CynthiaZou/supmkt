/**
 * 数据库连接模块 ===> 功能 : 连接数据库 mysql
 * 
 * */

//引入mysql
var mysql = require('mysql');

//创建连接对象
var connection = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: '0216',
	database: 'mySupMkt'
})

//执行连接方法
connection.connect();
console.log("数据库连接成功")

module.exports = connection;
