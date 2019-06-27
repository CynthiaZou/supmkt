/**
 * 
 * 工具函数: 封装get请求和post请求
 * 2019-06-19 by 邹嬢嬢
 * 
 */

//  引入模块
import axios from 'axios';
import qs from 'qs';

// 引入 本地存储 封装
import local from '@/utils/local';

// 设置请求默认服务器地址
// axios.defaults.baseURL = "http://127.0.0.1:9999";
axios.defaults.baseURL = "http://172.16.12.185:9999"; 


/* 
    axios请求拦截器：
        在axios发送请求之前 把它拦截 让它先携带一点东西 再发出请求

*/
// 设置请求拦截器
axios.interceptors.request.use(config => {
    // 获取token
    let token = local.get('rb_token');
    // 给头部携带token
    config.headers.authorization = `Bearer ${token}`;
    return config;
})

// 暴露
export default {
    get(url, params={}){
        return new Promise((resolve, reject) => {
            axios.get(url, { params })
                .then(response => {
                    resolve(response.data); //成功啦！
                })
                .catch(err => {
                    reject(err);// 失败！
                })
        })
    },
    post(url, params={}){
        return new Promise((resolve, reject) => {
            axios.post(url, qs.stringify(params))
                .then(response => {
                    resolve(response.data); //成功
                })
                .catch(err => {
                    reject(err);
                })
        })
    }
}