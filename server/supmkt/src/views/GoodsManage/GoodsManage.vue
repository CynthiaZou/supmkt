<template>
    <div>
        <div class="goods-manage">
            <!-- 面板组件 -->
            <el-card class="box-card">
                <!-- 头  -->
            <div slot="header" class="clearfix">
                <h3>商品管理</h3>
            </div>

            <!-- 身体 -->
            <div class="item">
                <!-- 查询表单 -->
                <div class="searchForm">
                    <el-form size="small" 
                        :inline="true"
                        :model="searchForm"
                        class="demo-form-inline"
                        >
                        <!-- 选择框 -->
                        <el-form-item label="请选择分类：">
                            <el-select 
                                v-model="searchForm.classify" 
                                clearable 
                                placeholder="---请选择分类---"
                                >
                                <el-option
                                    v-for="item in options"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value"
                                    >
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <!-- 输入框 -->
                        <el-form-item label="关键字：">
                             <el-input 
                                v-model="searchForm.keyWord" 
                                placeholder="输入商品名称或条形码"
                                style="width:200px"
                                >
                            </el-input>
                        </el-form-item>
                        <!-- 按钮 -->
                        <el-form-item>
                            <el-button type="primary" @click="search">查询</el-button>
                        </el-form-item>
                    </el-form>
                </div>

                <!-- 表格 -->
                <el-table
                    ref="goodsTableForm"
                    :data="goodsTableForm"
                    tooltip-effect="dark"
                    style="width: 100%"
                    @selection-change="selectChange"
                    >
                    <!-- 选择框 -->
                    <el-table-column
                        type="selection"
                        width="40"
                        >
                    </el-table-column>
                    <!-- 条形码 -->
                    <el-table-column
                        prop="barCode"
                        label="商品条形码"
                        show-overflow-tooltip
                        width="120"
                        >
                    </el-table-column>
                    <!-- 商品名称 -->
                    <el-table-column
                        prop="goodsName"
                        label="商品名称"
                        show-overflow-tooltip
                        width="160"
                        >
                    </el-table-column>
                    <!-- 所属分类 -->
                    <el-table-column
                        prop="classify"
                        label="所属分类"
                        show-overflow-tooltip
                        width="100"
                        >
                    </el-table-column>
                    <!-- 进价 -->
                    <el-table-column
                        prop="purchasePrice"
                        label="进价(元)"
                        width="80"
                        >
                    </el-table-column>
                    <!-- 售价 -->
                    <el-table-column
                        prop="sellPrice"
                        label="售价(元)"
                        width="80"
                        >
                    </el-table-column>
                    <!-- 市场价 -->
                    <el-table-column
                        prop="marketPrice"
                        label="市场价(元)"
                        width="100"
                        >
                    </el-table-column>
                    
                    <!-- 日期 -->
                    <el-table-column
                        label="日期"
                        width="100"
                        >
                        <template 
                            slot-scope="scope"
                            >
                            {{ scope.row.ctime | filterCtime }}
                        </template>
                    </el-table-column>
                    <!-- 是否促销 -->
                    <el-table-column
                        prop="isPromotion"
                        label="是否促销"
                        width="100"
                        >
                    </el-table-column>
                    <!-- 操作 -->
                    <el-table-column 
                        label="操作"
                        width="120"
                        >
                        <template slot-scope="scope">
                            <!-- 编辑 -->
                            <el-button
                                size="mini"
                                type="primary"
                                @click="handleEdit(scope.row.id)"
                                >
                                <i class="el-icon-edit"></i>
                            </el-button>
                            <!-- 删除 -->
                            <el-button
                                size="mini"
                                type="danger"
                                @click="handleDelete(scope.row.id)"
                                >
                                <i class="el-icon-delete"></i>
                            </el-button>
                        </template>
                    </el-table-column>
                    
                    

                </el-table>

                <!-- 分页 -->
                <div style="margin:20px">
                    <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="currentPage"
                    :page-sizes="[1, 2, 3, 5]"
                    :page-size="pageSize"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="total">
                </el-pagination>

                </div>

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
    </div>
</template>

<script>
// 引入moment
import moment from 'moment';
// 引入api中封装的请求、
import { getDataByPage, goodsDel, batchDel } from '@/api/goods';

    export default {
        data() {
            return {
                goodsTableForm: [],
                total: 0,
                currentPage: 1,
                pageSize: 3,
                value: '',
                input: '',
                visible: false,
                options: [
                    {
                        value: 'all kinds',
                        label: 'all kinds'
                    },
                    {
                        value: 'clothes',
                        label: 'clothes'
                    },
                    {
                        value: 'drinks',
                        label: 'drinks'
                    },
                    {
                        value: 'makeup',
                        label: 'makeup'
                    },
                    {
                        value: 'skincare',
                        label: 'skincare'
                    },
                    {
                        value: 'fruits',
                        label: 'fruits'
                    }
                ],
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
                delIdArr: [], //批量删除id数组
                searchForm: { //查询表单
                    classify: '',
                    keyWord: ''
                }
                
            }
        },
        methods: {
            // 查询
            search() {
                // 直接调用分页函数 ===> 去分页函数 增加设置 关键字查询 模糊查询！
                this.getData();
            },
            //每页条数改变
            handleSizeChange(pageSize) { 
                this.pageSize = pageSize;
                // 2- 调用分页函数
                this.getData();
            },
            //当前页改变
            handleCurrentChange(currentPage) { 
                this.currentPage = currentPage;
                // 3- 调用分页函数
                this.getData();
            },
            // 分页函数
            getData() { 
                // 收集参数
                let params = {
                    pageSize: this.pageSize,
                    currentPage: this.currentPage,
                    classify: this.searchForm.classify,
                    keyWord: this.searchForm.keyWord
                }
                // 发送请求
                getDataByPage(params)
                    .then(res => {
                        // 接收后端响应回来的数据
                        let {total, data} = res;
                        
                        // 渲染页面
                        this.goodsTableForm = data;
                        this.total = total;
                    })
                    .catch(err => {
                        console.log(err)
                    })
            },
            //批量删除
            batchDel() { 
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
                                this.getData();
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
             //取消选择
            deselect() {
                this.$refs.goodsTableForm.clearSelection();
            },
            // 用户状态改变
            selectChange(selectData) {
                this.delIdArr = selectData.map(v => v.id);
            },
            // 修改
            handleEdit(id) {

            },
            // 保存修改
            saveEdit(){

            },
            // 单条删除
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
                    goodsDel({id})
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
                            this.getData();
                            
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
                
            }
        },
        created() {
            // 1- 调用分页函数
            this.getData();

        },
        filters: {
            filterCtime(ctime) {
                return moment(ctime).format('YYYY-MM-DD');
            }
        }
    }
</script>

<style lang="less">
    .goods-manage {
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
                    // 选择分类框
                    .el-input {
                        width: 140px;
                        .el-input__inner{
                            height: 34px;
                            line-height: 34px;
                            display: inline-block;
                        }
                        // 下拉图标
                        .el-input__suffix{
                            .el-input__suffix-inner{
                                .el-icon-arrow-up:before{
                                    content: "\e790";
                                }
                            }
                        }
                    }
                    .el-button{
                        margin-left: 8px;
                        text-align: center;
                        padding: 8px 16px;
                    }
                    // 表格
                    .el-table{
                        .el-table__header-wrapper{
                            border-top: 3px double #ccc;
                           .el-table__header{
                                thead{
                                    color:#2a3b4d;
                                    tr{
                                        th{
                                            font-weight: bold;
                                        }
                                    }
                                }
                           }
                        }
                        td{
                            padding: 8px 0;
                        }
                        margin-top: 14px;
                        .cell{
                            padding-right: 0;
                            padding-left: 0;
                            .el-checkbox__input {
                                margin-left: 6px;
                            }
                        }
                    }
                    // 分页
                    .el-pagination{
                        .el-pagination__sizes{
                            .el-select{
                                .el-input{
                                    .el-input__inner{
                                        height: 28px;
                                        line-height: 28px;
                                        // width: 100px;
                                    }
                                }
                            }
                        }
                        .el-pagination__jump{
                            .el-input{
                                .el-input__inner{
                                        height: 28px;
                                        line-height: 28px;
                                        width: 60px;
                                    }
                            }
                        }
                    }
                    
                }
            }
        }
</style>