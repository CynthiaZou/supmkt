// 引入模块
import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router) //注册路由

// 创建路由实例对象 并且暴露出去
export default new Router({
  // 路由配置
  routes: [
    {path: '/', redirect: './login'}, //根目录重定向 到/login
    {path: '/login', component: () => import('./views/Login/Login.vue')},
    {
      path: '/home',
      component: () => import('./views/Home/Home.vue'),
      redirect: '/home/systeminfo',
      children: [
        // 系统信息
        {
          path: '/home/systeminfo',
          component: () => import('./views/SystemInfo/SystemInfo.vue'),
        },
        // 账号管理
          {
            path: '/home/accountadd',
            component: () => import('./views/AccountAdd/AccountAdd.vue'),
          },
        {
          path: '/home/accountmanage',
          component: () => import('./views/AccountManage/AccountManage.vue'),
        },
        {
          path: '/home/passwordmodify',
          component: () => import('./views/PasswordModify/PasswordModify.vue'),
        },
        // 商品管理
          {
            path: '/home/goodsmanage',
            component: () => import('./views/GoodsManage/GoodsManage.vue'),
          },
          {
            path: '/home/goodsadd',
            component: () => import('./views/GoodsAdd/GoodsAdd.vue'),
          },
          // 统计管理
            {
              path: '/home/selltotal',
              component: () => import('./views/SellTotal/SellTotal.vue'),
            },
            {
              path: '/home/stocktotal',
              component: () => import('./views/StockTotal/StockTotal.vue'),
            },
            // 个人中心
            {
              path: '/home/personal',
              component: () => import('./views/Personal/Personal.vue'),
            },
            // 进货管理
              {
                path: '/home/stockadd',
                component: () => import('./views/StockAdd/StockAdd.vue'),
              },
              {
                path: '/home/stocklist',
                component: () => import('./views/StockList/StockList.vue'),
              },
              // 出货管理
                {
                  path: '/home/selllist',
                  component: () => import('./views/SellList/SellList.vue'),
                },
                {
                  path: '/home/goodsdelivery',
                  component: () => import('./views/GoodsDelivery/GoodsDelivery.vue'),
                },
                {
                  path: '/home/goodsreturn',
                  component: () => import('./views/GoodsReturn/GoodsReturn.vue'),
                },
                // 会员管理
                  {
                    path: '/home/vipmanage',
                    component: () => import('./views/VIPManage/VIPManage.vue'),
                  },
                  {
                    path: '/home/vipaccountadd',
                    component: () => import('./views/VIPAccountAdd/VIPAccountAdd.vue'),
                  },




      ]
    }

  ]
})