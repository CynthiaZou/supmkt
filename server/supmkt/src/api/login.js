/**
 * 
 * 登录模块的请求
 * 2019-06-19 by邹嬢嬢
 * 
 */

//  引入封装好的请求request.js
import req from '@/utils/request';

/* 检查登录 */
export function checkLogin(params) {
    return req.post('/login/logincheck', params);
}