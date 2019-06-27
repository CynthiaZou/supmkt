/**
 * 封装对本地存储的操作
 * 
 */

// 针对此项目的 简单封装
 export default {
     get(key) {
        return window.localStorage.getItem(key);
    },
    set(key, value) {
        return window.localStorage.setItem(key, value);
    },
    remove(key) {
        return window.localStorage.removeItem(key);
     }
 }
// 应用更广泛的封装
 /* export default {
     get(key) {
        return JSON.parse(window.localStorage.getItem(key));
    },
    set(key, value) {
        return JSON.stringify(window.localStorage.setItem(key, value));
    },
    remove(key) {
        return window.localStorage.removeItem(key);
     }
 } */