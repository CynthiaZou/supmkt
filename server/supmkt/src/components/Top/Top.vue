<template>
    <div class="top">
        <el-row :gutter="20">
            <!-- 左侧标题 -->
            <el-col :span="18">
                <h3 class="title">
                    <i class="el-icon-menu"></i>
                    盘道管理系统
                </h3>
            </el-col>
            <!-- 右侧 头像和当前登录的登录用户名账号 -->
            <el-col :span="6">
                <el-row>
                    <el-col :span="8">
                        <!-- 头像 -->
                        <div class="avatar">
                            <img width="100%" height="100%" :src="avatarUrl" alt="">
                        </div>
                    </el-col>
                    <el-col :span="16">
                        <!-- 登录账号名 -->
                        <el-dropdown @command="handleCommand">
                            <span class="el-dropdown-link">
                                {{ userName }}
                                <i class="el-icon-arrow-down el-icon--right"></i>
                            </span>
                            <el-dropdown-menu slot="dropdown">
                                <el-dropdown-item command="personal">个人中心</el-dropdown-item>
                                <el-dropdown-item command="logout">退出系统</el-dropdown-item>
                            </el-dropdown-menu>
                        </el-dropdown>

                    </el-col>
                </el-row>
            </el-col>
        </el-row>
    </div> 
</template>

<script>
// 引入本地存储 封装
import local from '@/utils/local';

// 引入封装好的请求
import { getInfo } from '@/api/account';

    export default {
        data() {
            return {
                userName: '', //账号名
                avatarUrl: '' //头像地址
            }
        },
        methods: {
            handleCommand(command) {
                if(command === 'logout') { //退出系统
                    // 1- 清除token 和 userId
                    window.localStorage.removeItem('rb_token');
                    window.localStorage.removeItem('user_id');
                    // 2- 弹出提示
                    this.$message({
                        type: 'success',
                        message: '退出系统成功！小哥哥！ 欢迎下次登录！'
                    })
                    // 3- 跳转到登录页面
                    setTimeout(() => {
                        this.$router.push('/login');
                    }, 1000)

                } else if (command === 'personal') { //个人中心
                    // 跳转到个人中心
                    this.$router.push('/home/personal');

                }

            },
            getUserInfo() { 
                // 发送请求 获取用户信息
                getInfo()
                    .then(res => {
                        // 接收数据
                         let { data } = res;
                        //  获取账号
                        let { account, avatarUrl } = data[0];
                        // 渲染账号和头像地址
                        this.userName = account;
                        this.avatarUrl = 'http://172.16.12.185:9999' + avatarUrl;
                    })
                    .catch(err => {
                        console.log(err);
                    })

            }
        },
        created() {
            // 请求当前登录的用户信息
            this.getUserInfo();
        }
    }
</script>

<style lang="less">
    @import './top.less';

</style>