<template>
    <div class="left-nav">
        <!-- 左边导航栏 -->
       <el-menu
            :default-active="$route.path"
            unique-opened
            router
            active-text-color="rgb(64, 158, 255)"
            background-color="rgb(48, 65, 86)"
           >
           <!-- 标题 -->
           <h1 class="title">
                <i class="el-icon-menu"></i>
               盘道管理系统</h1>
            <!-- 导航一 -->
            <el-submenu 
                :index="(i+1) + ''" 
                v-for="(nav, i) in leftNav" 
                :key="i"
                >
                <template slot="title">
                    <i :class="nav.iconCls"></i>
                    <span>{{ nav.navTitle }} </span>
                </template>
                <el-menu-item 
                    v-for="(subNav, i) in nav.children" 
                    :key="i"
                    :index="subNav.path"
                    >
                    {{ subNav.navSubTitle }}
                </el-menu-item>
            </el-submenu>
        </el-menu>
    </div>
</template>

<script>
// 引入api中封装的请求
import { getRole } from '@/api/account';

    export default {
        data() {
            return {
                leftNav: []
            }
        },
        created() {
            getRole()
                .then(res => {
                    // 获取用户角色
                    let { role } = res;

                    // 定义导航数据
                    let nav = [
                        // 导航 1
                        {
                            iconCls: 'el-icon-s-tools',
                            navTitle: '系统信息',
                            role: ['超级管理员', '普通用户'],
                            children: [
                                {path: '/home/systeminfo', 'navSubTitle': '系统信息'}
                            ]
                        },
                        // 导航 2
                        {
                            iconCls: 'el-icon-s-order',
                            navTitle: '账号管理',
                            role: ['超级管理员'],
                            children: [
                                {path: '/home/accountadd', 'navSubTitle': '账号添加'},
                                {path: '/home/accountmanage', 'navSubTitle': '账号管理'},
                                {path: '/home/passwordmodify', 'navSubTitle': '密码修改'}
                            ]

                        },
                        // 导航 3
                        {
                            iconCls: 'el-icon-s-goods',
                            navTitle: '商品管理',
                            role: ['超级管理员', '普通用户'],
                            children: [
                                {path: '/home/goodsmanage', 'navSubTitle': '商品管理'},
                                {path: '/home/goodsadd', 'navSubTitle': '商品添加'}
                            ]
                        },
                        // 导航 4
                        {
                            iconCls: 'el-icon-s-data',
                            navTitle: '统计管理',
                            role: ['超级管理员'],
                            children: [
                                {path: '/home/sellTotal', 'navSubTitle': '销售统计'},
                                {path: '/home/stockTotal', 'navSubTitle': '库存统计'}
                            ]

                        },
                        // 导航 5
                        {
                            iconCls: 'el-icon-s-custom',
                            navTitle: '个人中心',
                            role: ['超级管理员', '普通用户', '自己'],
                            children: [
                                {path: '/home/personal', 'navSubTitle': '个人中心'},
                            ]

                        },
                        // 导航 6
                        {
                            iconCls: 'el-icon-s-data',
                            navTitle: '进货管理',
                            role: ['自己'],
                            children: [
                                {path: '/home/stockadd', 'navSubTitle': '添加库存'},
                                {path: '/home/stocklist', 'navSubTitle': '库存列表'}
                            ]

                        },
                        // 导航 7
                        {
                            iconCls: 'el-icon-s-data',
                            navTitle: '出货管理',
                            role: ['自己'],
                            children: [
                                {path: '/home/selllist', 'navSubTitle': '销售列表'},
                                {path: '/home/goodsdelivery', 'navSubTitle': '商品出库'},
                                {path: '/home/goodsreturn', 'navSubTitle': '商品退货'}
                            ]
                        },
                        // 导航 8
                        {
                            iconCls: 'el-icon-s-data',
                            navTitle: '会员管理',
                            role: ['自己'],
                            children: [
                                {path: '/home/vipmanage', 'navSubTitle': '会员管理'},
                                {path: '/home/vipaccountadd', 'navSubTitle': '会员添加 '}
                            ]
                        },
                    ]

                    // 过滤导航
                    this.leftNav = nav.filter(v => v.role.includes( role ))
                })
                .catch(err => {
                    console.log(err);
                })
        }
    }
</script>

<style lang="less">
    .left-nav{
        margin-top: 40px;
        .title{
            color:#fff;
            font-size: 20px;
            text-align: center;
        }
        .el-menu{
            border-right: none;
            .el-submenu{
                margin-top: 10px;
                
                .el-submenu__title{
                    color:#fff;
                    &>i{
                        color:#fff;
                    }
                    &:hover{
                    background-color:rgb(33, 45, 59) !important;
                }
                }
            }
            .el-menu-item{
                color:#fff;
                 &:hover{
                    background-color:rgb(33, 45, 59) !important;
                }
            }
        }
    }
</style>