<template>
    <div>
        <div class="system-info">
            <!-- 卡片组件 -->
            <el-card class="box-card">
                <!-- 头 -->
                <div slot="header">
                    <h3>系统信息</h3>
                </div>
                <!-- 身体-->
                <div class="item">
                    <!-- 提示信息 -->
                    <el-alert
                        title="成功提示的文案"
                        type="success"
                        show-icon>
                    </el-alert>
                    <el-alert
                        title="消息提示的文案"
                        type="info"
                        show-icon>
                    </el-alert>

                    <!-- 左右表格 -->
                    <el-row :gutter="20">
                        <!-- 左面板  -->
                        <el-col :span="12">
                            <el-card class="box-card">
                            <div slot="header" class="clearfix">
                                <h3>销售排行</h3>
                            </div>
                            <!-- 左表格 -->
                            <div class="text item">
                                <el-table
                                    :data="saleRank"
                                    style="width: 100%"
                                    >
                                    <!-- 商品名称 -->
                                    <el-table-column
                                        prop="goodsName"
                                        label="商品名称"
                                        width="200"
                                        >
                                    </el-table-column>
                                    <!-- 销量 -->
                                    <el-table-column
                                        prop="salesNum"
                                        label="销售数量"
                                        >
                                    </el-table-column>
                                </el-table>
                            </div>
                            </el-card>

                        </el-col>

                        <!-- 右面板  -->
                        <el-col :span="12">
                            <el-card class="box-card">
                            <div slot="header" class="clearfix">
                                <h3>缺货商品</h3>
                            </div>
                            <!-- 右表格 -->
                             <div class="item">
                                <el-table
                                    :data="stockOut"
                                    style="width: 100%"
                                    >
                                    <!-- 商品名称 -->
                                    <el-table-column
                                        prop="goodsName"
                                        label="商品名称"
                                        width="160"
                                        >
                                    </el-table-column>

                                    <!-- 库存 -->
                                    <el-table-column
                                        prop="goodsStock"
                                        label="库存"
                                        width="100"
                                        >
                                    </el-table-column>
                                    
                                    <!-- 操作 -->
                                    <el-table-column
                                        prop="edit"
                                        label="操作"
                                        width="100"
                                        >
                                        <a href="#" >入库</a>
                                    </el-table-column>
                                </el-table>
                            </div>
                            </el-card>
                        </el-col>
                    </el-row>
                </div>
               
            </el-card>

        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return{
                // 销售排行
                saleRank: [
                    {
                        goodsName: 'JAYUN水光针面膜1',
                        salesNum: 99
                    },
                    {
                        goodsName: 'JAYUN水光针面膜2',
                        salesNum: 98
                    },
                    {
                        goodsName: 'JAYUN水光针面膜3',
                        salesNum: 90
                    },
                    {
                        goodsName: 'JAYUN水光针面膜4',
                        salesNum: 120
                    }
                ],
                // 缺货商品
                stockOut: [
                    {
                        goodsName: 'Rio',
                        goodsStock: 0,
                        
                        
                    },
                    {
                        goodsName: '抹茶',
                        goodsStock: 1
                    }
                ]
                
            }
        }
    }
</script>

<style lang="less">
    .system-info{
        &>.el-card {
            .el-card__header{
                background-color: #e2e0e0;
                color:#2a3d4b;
                font-size:16px;
                font-weight: bold;
                padding:12px 20px;
            }
            .el-card__body {
                padding-top: 16px;
                .el-alert{
                    margin-bottom: 10px;
                }
               
            .el-table th{
                color: #606266;
                font-weight: bold;
                padding:6px 0;
                text-align: left;
            }
            .el-table td{
                text-align: left;
                padding:6px 0;
                .cell{
                    a{
                        text-decoration: none;
                        color:#409EFF;
                    }
                }
            }
        
                
                
            }
        }
    }
</style>