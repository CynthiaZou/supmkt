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
           <h1 class="title">盘道管理系统</h1>
            <!-- 导航内容 -->
            <el-submenu index="1">
                <template slot="title">
                    <i class="el-icon-s-tools"></i>
                    <span>系统管理</span>
                </template>
                <el-menu-item index="/home/systeminfo">系统信息</el-menu-item>
            </el-submenu>

            <el-submenu index="2">
                <template slot="title">
                    <i class="el-icon-s-custom"></i>
                    <span>账号管理</span>
                </template>
                <el-menu-item index="/home/accountadd">添加账号</el-menu-item>
                <el-menu-item index="/home/accountmanage">账号管理</el-menu-item>
                <el-menu-item index="/home/passwordmodify">密码修改</el-menu-item>
            </el-submenu>

            <el-submenu index="3">
                <template slot="title">
                    <i class="el-icon-goods"></i>
                    <span>商品管理</span>
                </template>
                <el-menu-item index="/home/goodsmanage">商品管理</el-menu-item>
                <el-menu-item index="/home/goodsadd">添加商品</el-menu-item>
            </el-submenu>
            
            <el-submenu index="4">
                <template slot="title">
                    <i class="el-icon-s-data"></i>
                    <span>统计管理</span>
                </template>
                <el-menu-item index="/home/selltotal">销售统计</el-menu-item>
                <el-menu-item index="/home/stocktotal">进货统计</el-menu-item>
            </el-submenu>

        </el-menu>
  


    </div>
</template>

<script>
    export default {
        
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
                margin-top: 20px;
                
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