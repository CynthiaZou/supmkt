// 引入模块
import Vue from 'vue'; // 引入Vue
import App from './App.vue'; // 引入App.vue 顶级组件
import router from './router'; // 引入路由
import './assets/css/reset.css'; //重置样式
import './assets/css/common.css'; //公用样式


// 引入element-ui组件和样式
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css'; //引入elementui样式

import axios from 'axios';//引入axios 
import qs from 'qs'; //引入qs 

// axios和Qs 挂载在Vue的原型上
Vue.prototype.req = axios;
Vue.prototype.qs = qs;

// 引入本地存储封装
import local from '@/utils/local';

// 注册elementui
Vue.use( ElementUI );

// 路由守卫 拦截所有路由
router.beforeEach((to, from, next) => {
  // 获取token
  const token = local.get('rb_token');

  // 判断
  if( token ) { //有令牌就放行
    next(); 
  } else {
    //  (1) 如果去的是登录 直接放行
    if( to.path === '/login') {
      next();
    } else{
      // alert('你可能需要一块令牌 刘先森~~');
      // (2) 如果去的是其他页面直接跳到登录
      next({path: '/login'});

    }
  }
})


Vue.config.productionTip = false //阻止生产提示

// 创建vue实例对象
new Vue({
  router, // 传入路由, 一起挂载
  render: h => h(App) //传入顶级组件App.vue 渲染
}).$mount('#app') //挂载到dom ==> index.html中的#app