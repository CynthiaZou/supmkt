<template>
        <div class="password-modify">
            <!-- 面板组件 -->
            <el-card class="box-card">
                <!-- 头部 -->
                <div slot="header" class="clearfix">
                    <h3>密码修改</h3>
                </div>

                <!-- 身体 -->
                <div class="text item">
                    <!-- 表单 -->
                    <el-form 
                        style="width:300px"
                        :model="pwdModifyForm" 
                        status-icon 
                        :rules="rules" 
                        ref="pwdModifyForm" 
                        label-width="100px" 
                        :label-position="labelPosition"
                        size="small"
                        >

                        <el-form-item label="原密码" prop="oldPassword">
                            <el-input type="text" v-model="pwdModifyForm.oldPassword" autocomplete="off"></el-input>
                        </el-form-item>

                        <el-form-item label="新密码" prop="newPassword">
                            <el-input type="text" v-model="pwdModifyForm.newPassword" autocomplete="off"></el-input>
                        </el-form-item>

                        <el-form-item label="确认新密码" prop="confirmPassword">
                            <el-input type="text" v-model="pwdModifyForm.confirmPassword" autocomplete="off"></el-input>
                        </el-form-item>

                        <el-form-item>
                            <el-button type="primary" @click="submitForm">提交</el-button>
                        </el-form-item>

                    </el-form>
                </div>
            </el-card>
        </div>
</template>

<script>
// 引入工具函数  ==> Notice: 引入的正则函数名 要用 {} 包裹！！
import {pwdReg} from '@/utils/reg.js';

// 引入api中封装好的请求
import { editModify, confirmModify } from '@/api/account';

// 引入封装的本地存储
import local from '@/utils/local';

    export default {
        data() {
            // 自定义验证规则
            // 旧密码一致性验证
            const checkOldPwd = (rule, value, callback) => {
                // 获取输入框值的长度
                let len = value.length;
                // 判断
                if(value === '') {
                    callback(new Error('请输入原密码'));
                } else if( len < 3 || len > 8 ){
                    callback(new Error('原密码长度3-8位'))
                } else{
                    // 取出本地存储中的userId
                    let userId = window.localStorage.getItem('user_id');
                    // console.log(userId)

                    // 收集参数
                    let params = {
                        id: userId,
                        password: value
                    }
                    // 发送请求
                    editModify(params)
                        .then(res => {
                            // 接收后端响应回来的数据
                            let { code, msg } = res;
                            // 判断
                            if(code === 0) {
                                callback();
                            } else if(code === 1) {
                                callback(new Error(msg));
                            }

                        })
                        .catch(err => {
                            console.log(err);
                        })
                }
            }
            
            // 新密码验证
            const checkNewPwd = (rule, value, callback) => {
                let len = value.length;//获取长度

                // 判断
                if( value === '') {
                    callback(new Error('请在此输入新密码'));
                } else if( len < 3 || len > 8 ) {
                    callback(new Error('新密码长度保证3-8位'));
                } else if( value === this.pwdModifyForm.oldPassword) {
                    callback(new Error('新密码不能与旧密码相同'));
                } else if( !pwdReg(value) ) { //如果输入框的值不满足正则
                    callback(new Error('首字母大写且只能包含字母和数字'));
                } else {
                    // 如果确认密码框  不为空 ===> 反向验证一下
                    if(this.pwdModifyForm.confirmPassword !== '') {
                        // 再一次触发确认密码字段的验证
                        this.$refs.pwdModifyForm.validateField('confirmPassword');
                    }
                    callback();
                }

            } 
            // 确认新密码验证
            const confirmNewPwd = (rule, value, callback) => {
                if( value === '' ) {
                    callback(new Error('请再次输入新密码'));
                } else if( value !== this.pwdModifyForm.newPassword ) {
                    callback(new Error('两次输入密码不一致'));
                } else{
                    callback();
                }
            }
            return {
                // 表单域标签位置
                labelPosition: 'top',
                // 添加密码修改的数据
                pwdModifyForm: {
                    oldPassword: '',
                    newPassword: '',
                    confirmPassword: ''
                },
                // 验证规则
                rules: {
                    // 原密码验证  ====> 需要从数据库拿到该用户原密码value 再在前端做 一致性 验证
                    oldPassword: [
                        { required: true, validator: checkOldPwd, triggle: 'blur'}
                    ],
                    // 新密码验证
                    newPassword: [
                        { required: true, validator: checkNewPwd, triggle: 'blur'}
                    ],
                    // 确认新密码验证
                    confirmPassword: [
                        { required: true, validator: confirmNewPwd, triggle: 'blur'}
                    ]
                    
                },
            }
        },

        methods: {
            // 提交修改
            submitForm() {
                // 获取整个表单 调用验证方法
                    // 所有前端验证通过 valid=true 反之相反
                this.$refs.pwdModifyForm.validate( (valid) => {
                    // 判断
                    if( valid ) {
                        // 取出localStorage的userId
                        // let userId = window.localStorage.getItem('user_id');
                        let userId = local.get('user_id');
                         
                        // 收集参数  ==> 注意取值不能直接oldPassword
                        let params = {
                            userId,
                            newPassword: this.pwdModifyForm.newPassword
                        }

                        // 发请求
                        confirmModify(params)
                            .then(res => {
                                // 接收后端响应回来的数据
                                let {code, msg} = res;

                                // 判断
                                if(code === 0) {
                                    // 弹成功提示
                                    this.$message({
                                        type: 'success',
                                        message: msg
                                    })

                                    // 清除token 退出到登录页面
                                    local.remove('rb_token');
                                    setTimeout(() => {
                                        this.$router.push('/login');
                                    },1000)
                                }else if (code === 1) {
                                    // 弹失败提示
                                    this.$message.error(msg);
                                }
                            })
                            .catch(err => {
                                console.log(err);
                            })

                    }
                })

            }
        }
    }
</script>

<style lang="less">
    .password-modify {
        // 面板组件
        .el-card {
            // 面板头
            .el-card__header {
                background-color: #f1f1f1;
            }
            .el-card__body{
                .el-form{
                    .el-form-item{
                        line-height: 30px;
                    }
                }
            }
        }
    }
</style>