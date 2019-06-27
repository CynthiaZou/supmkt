<template>
    <div>
        <div class="account-add">
            <!-- 面板组件 -->
            <el-card class="box-card">
                <!-- 头部 -->
                <div slot="header" class="clearfix">
                    <el-row>
                        <el-col :span="16">
                            <!-- 左 -->
                            <div class="grid-content bg-purple">
                                <h3>添加管理员账号</h3>
                            </div>
                        </el-col>
                        <el-col :span="8">
                            <div class="grid-content bg-purple-light">
                                <!-- 右侧选项卡 -->
                                <!-- <el-tabs type="border-card">
                                    <el-tab-pane label="用户管理" name="first">用户管理</el-tab-pane>
                                    <el-tab-pane label="配置管理" name="second">配置管理</el-tab-pane>
                                    <el-tab-pane label="角色管理" name="third">角色管理</el-tab-pane>
                                </el-tabs> -->
                            </div>
                        </el-col>
                    </el-row>
                </div>
                <!-- 身体 -->
                <div class="item">
                    <!-- 账号添加表单 -->
                    <el-form 
                        style="width: 300px"
                        size="small"
                        :model="accountAddForm" 
                        status-icon 
                        :rules="rules" 
                        ref="accountAddForm" 
                        label-width="100px" 
                        >
                        <!-- 账号 -->
                        <el-form-item label="账号" prop="account">
                            <el-input type="text" v-model="accountAddForm.account" autocomplete="off"></el-input>
                        </el-form-item>
                        <!-- 密码 -->
                        <el-form-item label="密码" prop="password">
                            <el-input type="text" v-model="accountAddForm.password" autocomplete="off"></el-input>
                        </el-form-item>
                        <!-- 确认密码 -->
                        <el-form-item label="确认密码" prop="checkPass">
                            <el-input type="text" v-model="accountAddForm.checkPass" autocomplete="off"></el-input>
                        </el-form-item>
                        <!-- 选择用户组 -->
                        <el-form-item label="选择用户组" prop="userGroup">
                            <el-select v-model="accountAddForm.userGroup" placeholder="请选择用户组">
                            <el-option label="超级管理员" value="超级管理员"></el-option>
                            <el-option label="普通用户" value="普通用户"></el-option>
                            <el-option label="自己" value="自己"></el-option>
                            </el-select>
                        </el-form-item>
                        <!-- 提交啦 按钮 -->
                        <el-form-item>
                            <el-button type="primary" @click="submitForm()">添加</el-button>
                            <el-button @click="resetForm()">重置</el-button>
                        </el-form-item>
                    </el-form>
                </div>
            </el-card>
        </div>
    </div>
</template>

<script>
// 引入工具函数
import {pwdReg} from '@/utils/reg'

// 引入api中的请求文件
import { accountAdd, accountCheck } from '@/api/account';

    export default {
        data() {
            // 自定义验证函数
            // 检测输入账号是否存在    
            const checkAct = (rule, value, callback) => {
                // 获取输入账号的长度    
               let len = value.length;

                // 判断
                if (value === '') {
                    callback(new Error('请输入账号!'));
                } else if( len < 3 || len > 8 ) {
                    callback(new Error('账号长度3-8位'));
                }else {
                    // 发送请求
                    accountCheck({account:value})
                        .then(res => {
                            // console.log(response.data)
                            // 接收后端响应回来的参数
                            let {code,msg} = res;

                            // 判断
                            if( code === 0 ) {
                                callback();
                            }else if(code === 1) {
                                callback(new Error(msg))
                            }
                        })
                        .catch(err => {
                            console.log(err);
                        })
                }
            }
            // 密码
            const checkPwd = (rule, value, callback) => {
                // 获取长度
                let len = value.length;

                if(value === '') {
                    callback(new Error('密码不能为空'));
                } else if(len < 3 || len > 8) {
                    callback(new Error('密码长度为3-8位'));
                } else if (!pwdReg( value )) { //如果输入框的值 不满足正则
                    callback(new Error('首字母大写且只能包含字母和数字'));
                }else {
                    if(this.accountAddForm.checkPass !== '') { //如果确认密码框 不为空
                        // 再次触发一致性验证
                        this.$refs.accountAddForm.validateField('checkPass');
                    }
                    callback();
                }
            }
            // 确认密码
            const confirmPwd = (rule, value, callback) => {
                if( value === '' ) {
                    callback(new Error('请再次输入密码'));
                }else if(value !== this.accountAddForm.password) {
                    callback(new Error('两次密码不一致'));
                }else {
                    callback(); // 不能省略 ！！！否则一直转圈圈 无法验证结果
                }
            }

            return {
                // 添加账号表单数据 ==> 和表单双向绑定
                accountAddForm: {
                    account: '', //账号
                    password: '', //密码
                    checkPass: '', //确认密码
                    userGroup: ''// 用户组
                },
                // 验证规则
                rules: {
                    // 账号验证
                    account: [
                        { required: true, validator: checkAct, trigger: 'blur'}
                    ],
                    // 密码验证
                    password: [
                        { required: true, validator: checkPwd, triggle: 'blur'}
                    ],
                    // 确认密码验证
                    checkPass: [
                        { required: true, validator: confirmPwd, triggle: 'blur'}

                    ],
                    // 用户组验证
                    userGroup: [
                        { required: true, message: '请选择一个用户', triggle: 'change'}

                    ]
                }
            }
        },
        methods: {
            // 添加账号
            submitForm() {
                // 获取整个表单 调用验证方法
                this.$refs.accountAddForm.validate(( valid ) => { //==> 所有前端验证通过 valid=true 否则false
                    if( valid ) {
                        // 收集参数
                        let params = {
                            account: this.accountAddForm.account,
                            password: this.accountAddForm.password,
                            userGroup: this.accountAddForm.userGroup
                        }
                        
                        // 发送请求 给后端
                        // console.log(params)//测试参数是否收集成功
                            
                        accountAdd(params)
                            .then(res => {
                                // console.log( response.data );
                                // 接收前端响应回来的参数
                                let {code, msg} = res;

                                // 判断
                                if( code === 0 ){
                                    // 添加成功 弹出提示信息
                                    // alert(msg)
                                    this.$message({
                                        message: msg,
                                        type: 'success'
                                    })
                                    // 跳转到 账号管理
                                    this.$router.push('/home/accountmanage');
                                }else if( code === 1 ){
                                    // alert(msg)
                                    this.$message.error(msg);
                                }
                            })
                            .catch(err => {
                                console.log(err);
                            })
                        
                    }else {
                        // console.log('前端验证不通过, 不允许提交');
                        return false; //禁止提交
                    }
                })

            },
            // 重置
            resetForm() {

            }
        }
    }
</script>

<style lang="less">
    .account-add {
        // 面板组件
        .el-card {
            // 面板头
            .el-card__header {
                background-color: #f1f1f1;
            }
            .el-card__body{
                .el-form{
                    .el-form-item{
                        line-height: 60px;
                    }
                }
            }
        }
    }
</style>