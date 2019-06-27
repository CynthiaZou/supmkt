<template>
    <div class="login">
        <div class="login-wrap">
            <!-- 登录标题 -->
            <h3 class="title">
                <i class="el-icon-s-custom"></i>
                盘道管理系统
            </h3>

            <!-- 登录表单 -->
            <el-form 
                :model="loginForm" 
                status-icon 
                :rules="rules" 
                ref="loginForm" 
                label-width="100px" 
                >
            
            <el-form-item label="账号" prop="account">
                <el-input type="text" v-model="loginForm.account" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password">
                <el-input type="text" v-model="loginForm.password" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="确认密码" prop="checkPass">
                <el-input type="text" v-model="loginForm.checkPass" autocomplete="off"></el-input>
            </el-form-item>
            
            <el-form-item>
                <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
                <el-button @click="resetForm('ruleForm')">重置</el-button>
            </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
    // 引入工具函数
    import { pwdReg } from '@/utils/reg';

    // 引入登录模块的请求
    import { checkLogin } from '@/api/login';

    // 引入 本地存储 封装
    import local from '@/utils/local';

    export default {
        data() {
            // 自定义验证函数
            // 验证 密码
            const checkPwd = (rule,value,callback) => {
                // var pwdReg = /^[A-Za-z0-9]+$/; //放到工具函数里去 
                const len = value.length;
                if(value === '') {
                    callback(new Error('密码不能为空'))
                } else if(len < 3 || len > 6) {
                    callback(new Error('长度 3~6 位'))
                } else if( !pwdReg(value )) {
                    callback(new Error('首字母大写 数字 字母'))
                } else{
                    // 确认密码不为空 触发反向验证(一致性验证)
                    if( this.loginForm.checkPass !== ''){
                        this.$refs.loginForm.validateField('checkPass'); //checkPass为rule里面的字段
                    }
                    callback(); //成功
                }
            }

            // 验证 确认密码  ==> 也可以参照elementui组件 表单验证
            const confirmPwd = (rule,value,callback) => {
                if( value === ''){
                    callback(new Error('请再次输入密码')) //非空
                } else if(value !== this.loginForm.password ) {
                    callback(new Error('两次输入密码不一致')) //一致性
                } else{
                    callback(); // 成功
                }
            }
        
            return {
                // 登录表单数据
                loginForm: {
                    account: '', //账号
                    password: '', // 密码
                    checkPass: '', // 确认密码
                    
                },
                // 验证规则
                rules: {
                    /* 
                        小结：
                            1. 内置验证 ==> 复制粘贴 改一下
                                required
                                message
                                trigger
                                min
                                max 

                            2. 自定义验证
                                rules: {
                                    要验证的字段: [
                                        { validator: 自定义函数名, trigger: '触发方式 }, //自定义验证
                                    ]
                                }

                                const 自定义验证函数名 = (rule,value,callback) => {
                                    // rule是验证规则数据对象 这里用不到
                                    // value是用户输入的值 需要对这个值 作出各种判断
                                    // callback 
                                }
                    */

                    // 账号
                    account: [
                        { required: true, message: '请输入账号', trigger: 'blur' }, //非空验证
                        { min: 3, max: 8, message: '长度在 3 到 8 个字符', trigger: 'blur' } //长度验证
                    ],
                    // 密码
                    password: [
                        { required: true, validator: checkPwd, trigger: 'blur' } 
                    ],
                    // 确认密码
                    checkPass: [
                        { required: true, validator: confirmPwd, trigger: 'blur' } 
                    ]
                    
                }
            }
        },
        methods: {
            // 登录
            submitForm() {
                // 页面中使用ref属性声明的标签dom，可以使用this.$refs.ref属性的值获取
                // element内置了验证方法 validate 传入一个函数 函数中的变量如果是true 就验证通过 否则不通过
                // console.log( this.$refs.loginForm ) //取到的是 el-form组件 

                // 获取el-form组件 调用验证方法
                this.$refs.loginForm.validate((valid) => {
                    if( valid ) {
                        // console.log('前端验证通过！可以提交啦！！')
                        // 收集参数
                        let params = {
                            account: this.loginForm.account,
                            password: this.loginForm.password
                        }
                        // 发送请求 => 把参数发给后端
                        checkLogin(params)
                            .then(res => {
                                // console.log(response.data);
                                // 接收后端响应回来的数据
                                let { code, msg, token, userId } = res;

                                // 判断
                                if( code === 0 ) { //成功了
                                    // console.log('登录成功啦，看看后台有没有传token过来喃？', token)
                                    // 把token存到本地存储
                                   local.set('rb_token', token); 

                                    // 把用户id存入到本地存储
                                    local.set('user_id', userId);

                                    // 弹成功提示 并且跳转到home
                                    this.$message({
                                        type: 'success',
                                        message: msg
                                    })
                                    this.$router.push('/home') //跳转到首页
                                }else if( code === 1 ) {
                                    // 弹失败提示
                                    this.$message.error(msg);
                                }
                            })
                            .catch(err => {
                                console.log(err);
                            })
                    }else {
                        console.log('前端验证不通过！')
                        return false;
                    }
                })
            },
            // 重置 ==> 清空输入框内容 
            resetForm() {
                // 获取 el-form表单 调用内置重置方法
                this.$refs.loginForm.resetFields();

            }
        }
    }
</script>

<style lang="less">
// 引入样式
@import './login.less';

</style>

