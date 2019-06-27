/**
 * 
 * 商品模块的请求
 * 2019-06-19 by 邹嬢嬢
 * 
 */

//  引入request
import req from '@/utils/request';



/* 商品添加 */
export function goodsAdd(params) {
    return req.post('/goods/goodsadd', params)
}

/* 分页获取表格数据 */
export function getDataByPage(params) {
    return req.get('/goods/goodslistbypage', params)
}

/* 单条删除 */
export function goodsDel(params) {
    return req.get('/goods/goodsdelete', params)
}
/* 批量删除 */
export function batchDel(params) {
    return req.get('/goods/batchdelete', params)
}

