/**
 * 
 * 账号管理模块的请求
 * 2019-06-19 by邹嬢嬢
 * 
 */

//  引入封装好的request请求
import req from '@/utils/request';

/* 账号添加 */
export function accountAdd(params) {
    return req.post('/account/accountadd',params);
}

/* 检测账号 */
export function accountCheck(params) {
    return req.get('/account/accountcheck', params);
}

/* 批量删除 */
export function batchDel(params) {
    return req.get('/account/batchdelete', params);
}

/* 编辑 */
export function accountEdit(params) {
    return req.get('/account/accountedit', params);
}

/* 单条删除 */
export function accountDel(params) {
    return req.get('/account/accountdel', params);
}

/* 保存修改 */
export function accountSave(params) {
    return req.post('/account/accountsave', params);
}

/* 分页请求 */
export function getAccountsByPage(params) {
    return req.get('/account/accountlistbypage', params);
}

/* 检测旧密码 */
export function editModify(params) {
    return req.post('/account/editmodify', params);
}

/* 确认密码 */
export function confirmModify(params) {
    return req.post('/account/confirmmodify', params);
}

/* 获取当前登录的用户信息 */
export function getInfo() {
    return req.get('/account/info')
}

/* 菜单权限 */
export function getRole() {
    return req.get('/account/role');
}