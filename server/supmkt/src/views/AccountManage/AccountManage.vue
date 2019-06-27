<template>
        <div class="account-manage">
            <el-card class="box-card">
            <div slot="header" class="clearfix">
                <h3>账户管理</h3>
            </div>

            <div>
                <!-- 表格 -->
                <el-table
                    ref="accountTableData"
                    :data="accountTableData"
                    tooltip-effect="dark"
                    style="width: 100%"
                    height='300px'
                    @selection-change="selectChange">

                    <!-- 选择框 -->
                    <el-table-column
                        type="selection"
                        width="55"
                        >
                    </el-table-column>

                    <!-- 账号 -->
                    <el-table-column
                        prop="account"
                        label="账号"
                        width="200"
                        >
                    </el-table-column>

                    <!-- 用户组 -->
                    <el-table-column
                        prop="userGroup"
                        label="用户组"
                        width="200"
                        show-overflow-tooltip
                        >
                    </el-table-column>

                    <!-- 日期 -->
                    <el-table-column
                        label="日期"
                        width="260"
                        >
                        <template 
                            slot-scope="scope"
                            >
                            {{ scope.row.ctime | filterCtime }}
                        </template>
                    </el-table-column>

                    <!-- 操作 -->
                    <el-table-column 
                        label="操作"
                        width="200"
                        >
                        <template slot-scope="scope">
                            <!-- 编辑 -->
                            <el-button
                                size="mini"
                                type="primary"
                                @click="handleEdit(scope.row.id)"
                                >
                                编辑
                                <i class="el-icon-edit"></i>
                            </el-button>
                            <!-- 删除 -->
                            <el-button
                                size="mini"
                                type="danger"
                                @click="handleDelete(scope.row.id)"
                                >
                                删除
                                <i class="el-icon-delete"></i>
                            </el-button>
                        </template>
                    </el-table-column>
                    
                </el-table>
            </div>

            <!-- 分页 -->
            <div style="margin-top: 20px">
                <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="currentPage"
                    :page-sizes="[3, 5, 6, 9]"
                    :page-size="pageSize"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="total"
                    >
                </el-pagination>
            </div>

            <!-- 批量删除&取消选择按钮 -->
            <div style="margin-top:20px">
                <el-button type="danger" size="small" @click="batchDel">批量删除</el-button>
                <el-button type="primary" size="small" @click="deselect">取消选择</el-button>
            </div>

            <!-- 修改表单模态框 -->
            <el-dialog 
                title="修改账户信息" 
                width="420px" 
                :visible.sync="visible"
                >
                <!-- 修改表单 -->
                <el-form 
                    ref="editForm" 
                    :model="editForm" 
                    :rules="rules"
                    style="width:316px;"
                    >

                    <el-form-item label="账号" prop="account" label-width="120px">
                        <el-input v-model="editForm.account" autocomplete="off"></el-input>
                    </el-form-item>

                    <el-form-item label="用户组" label-width="120px">
                        <el-select v-model="editForm.userGroup" placeholder="请选择用户组">
                            <el-option label="超级管理员" value="超级管理员"></el-option>
                            <el-option label="普通用户" value="普通用户"></el-option>
                        </el-select>
                    </el-form-item>
                </el-form>

                <!-- 修改表单按钮 -->
                <div slot="footer" class="dialog-footer">
                    <el-button @click="visible = false">取 消</el-button>
                    <el-button type="primary" @click="saveEdit">确 定</el-button>
                </div>
            </el-dialog>

            </el-card>
        </div>
</template>

<script>
// 引入moment
import moment from 'moment';

// 引入api中的请求文件
import { batchDel, accountEdit, accountDel, accountSave, getAccountsByPage } from '@/api/account';

    export default {
        data() {
            return {
                accountTableData: [],
                total: 0, //数据总条数据
                currentPage: 1, //当前页
                pageSize: 3, //每页条数
                visible: false, //修改模态框的显示和隐藏状态
                editForm:{ 
                    account: '',
                    userGroup: ''
                },
                rules: { //验证规则
                    account:[
                        { required: true, message: '账号不能为空', trigger: 'change' },
                        { min: 3, max: 8, message: '长度3-8位', trigger: 'change' }
                    ]
                },
                editId: '',
                delIdArr: [] //批量删除id数组
            }
        },
        methods:{
            // 批量删除
            batchDel(){
                // 如果没有选中
                if(  !this.delIdArr.length ) {
                    this.$message.error('请选择以后再操作！ 你是不是真的傻！？');
                    return;
                }

                // 优化体验 让删除不那么仓促！ 哈哈
                 this.$confirm('请确认是否批量删除该文件?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                    })
                    .then(() => {
                         // 发送请求 把 id们 发给后端
                                    // this.req.get('http://127.0.0.1:9999/account/batchdelete', {
                                        //     params: {
                                            //         idArr: this.delIdArr
                                    //     }
                                    // }) //原请求，现更新为封装好的请求===> 以后公司都用封装版本！！！
                         batchDel({idArr: this.delIdArr})
                        .then(res => {
                            // 接收后端响应回来的数据
                            let { code, msg } = res;
                            // 判断
                            if( code === 0 ) {
                                // 弹出成功提示
                                this.$message({
                                    type: 'success',
                                    message: msg
                                })
                                // 刷新列表
                                this.getAccountsByPage();
                            } else if( code === 1 ){
                                // 弹失败提示
                                this.$message.error( msg );
                            }
                        })
                        .catch(err => {
                            console.log(err)
                        })
                    })
                    .catch(() => {
                        this.$message({
                            type: 'info',
                            message: '已取消删除'
                        });          
                    });

               

            },
            // 用户选择状态改变
            selectChange(selectData) {
                // console.log(selectData) //选中的所有项 组成的一个数组
                this.delIdArr = selectData.map( v => v.id );
                // console.log(this.delIdArr)
            },
            // 取消选择
            deselect(){
                this.$refs.accountTableData.clearSelection();
            },
            // 编辑
            handleEdit(id) {
                // 弹出模态框
                this.visible = true;
                // 保留此时的id ==> 这就是要修改的数据的 id
                this.editId = id;

                // 发送请求
                accountEdit({id})
                .then(res => {
                    // console.log(response.data);
                    // 接收后端响应回来的参数 
                    let { data } = res;

                    // 回填表单
                    this.editForm.account = data[0].account;
                    this.editForm.userGroup = data[0].userGroup;
                })
                .catch(err => {
                    console.log(err);
                })

            },
            // 删除
            handleDelete(id) {
                // 获取id
                // console.log(id);
                // 点击删除 弹出提示框 
                this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                    })
                // 点确定 就发请求 执行删除功能
                .then(() => {
                    // 发送请求
                    accountDel({id})
                    .then(res => {
                        // console.log(response.data);
                        // 接收后端响应回来的数据
                        let { code, msg } = res;
                        // 判断
                        if( code === 0 ) {
                            // 弹出成功提示
                            this.$message({
                                type: 'success',
                                message: msg
                            })
                            // 刷新列表
                            this.getAccountsByPage();
                            
                        } else if( code === 1 ) {
                            this.$message.err(msg); //失败的提示
                        }
                    })
                    .catch(err => {
                        console.log(err);
                    })
                })
                // 点取消 弹提示信息
                .catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });          
                });
                
            },
            // 保存修改
            saveEdit() {
                // console.log(22)
                //  获取整个表单 调用验证方法
                this.$refs.editForm.validate((valid) => {
                    
                    if(valid) { //如果前端所有验证通过 
                        // 隐藏模态框
                        this.visible = false;

                        // 收集参数
                        let params = {
                            account: this.editForm.account,
                            userGroup: this.editForm.userGroup,
                            id: this.editId
                        }

                        // 发送请求给后端
                        accountSave(params)
                            .then(res => {
                                // console.log(response.data);
                                // 接收前端响应回来的数据
                                let {code, msg} = res;
                                // 判断
                                if( code === 0 ) {
                                    // 弹出成功提示信息
                                    this.$message({
                                        type: 'succuess',
                                        message: msg
                                    })

                                    // 刷新列表
                                    this.getAccountsByPage();
                                } else if ( code === 1 ) {
                                    // 弹出失败的提示
                                    this.$message.err(msg);
                                }
                            })
                            .catch(err => {
                                console.log(err);
                            })
                    } else { //如果前端验证不通过
                        // 显示模态框
                        this.visible = true;
                        // 禁止修改确认
                        return false;
                    }
                })
            },
            // pageSize(每页条数)改变
            handleSizeChange(pageSize) {
                this.pageSize = pageSize; // 把用户选择的每页条数获取 赋值给data中的pageSize 
                this.getAccountsByPage(); //调用分页请求
            },
            // currentPage(当前页改变)改变
            handleCurrentChange(currentPage) {
                this.currentPage = currentPage; // 把用户选择的当前页获取  赋值给data中的currentPage
                this.getAccountsByPage(); //调用分页请求
            },
            // 分页请求函数 => 按照分页请求数据
            getAccountsByPage() {
                // 收集参数
                let params = {
                    pageSize: this.pageSize, //每页条数
                    currentPage: this.currentPage //当前页
                }
                // 发送请求
                getAccountsByPage(params)
                .then(res => {
                    // console.log(response.data);//获得了总条数 当前页对应的数据
                    // 接收前端响应回来的数据
                    let { total, data } = res;
                    // 渲染列表
                    this.total = total;
                    this.accountTableData = data;

                    // 边界判断 ===> 解决优化：
                        // 1. !data.length 若当前页数据全部删除了 页数会跳到 当前-1 页 并且还会显示无数据 
                        // 2. this.currentPage!==1 避免服务器崩掉 
                    if( !data.length && this.currentPage !== 1) {
                        this.currentPage -= 1;
                        this.getAccountsByPage();
                    }

                })
                .catch(err => {
                    console.log(err);
                })
            }

            // 刷新账号列表函数
            // getAccountlist() {
            //     // 发送请求给后端 说明我要拿数据
            //     this.req.get('http://127.0.0.1:9999/account/accountlist')
            //         .then(response => {
            //             // console.log(response.data);
            //             // 接收后端响应回来的参数 
            //             let { data } = response.data;
            //             // 渲染列表
            //             this.accountTableData = data;
            //         })
            //         .catch(err => {
            //             console.log(err);
            //         })
            // }
        },
        created() {
            // 调用刷新列表函数
            this.getAccountsByPage();
        },
        filters:{
            filterCtime(ctime) {
                return moment(ctime).format('YYYY/MM/DD HH:mm:ss'); 
            }
        }
    }
</script>

<style lang="less">
    .account-manage {
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