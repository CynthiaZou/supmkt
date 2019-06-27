<template>
    <div>
        <div class="stock-total">
            <!-- 面板组件 -->
            <el-card class="box-card">
                <!-- 头 -->
                <div slot="header" class="clearfix">
                    <h3>进货统计</h3>
                </div>

                <!-- 身体 -->
                <div class="item">
                    <!-- 查询表单 -->
                    <el-form 
                        :inline="true" 
                        :model="stockTotalForm"
                        >
                        <el-form-item label="时间：">
                            <!-- <el-input v-model="stockTotalForm.date1" placeholder="2010-6-16"></el-input> -->
                            <el-date-picker
                                v-model="stockTotalForm.date1"
                                type="date"
                                placeholder="选择日期"
                                style="width: 100%"
                                >
                            </el-date-picker>
                        </el-form-item>

                        <el-form-item label="--">
                            <!-- <el-input v-model="stockTotalForm.date2" placeholder="2019-6-16"></el-input> -->
                            <el-date-picker
                                v-model="stockTotalForm.date2"
                                type="date"
                                placeholder="选择日期"
                                style="width:100%"
                                >
                            </el-date-picker>

                        </el-form-item>

                        <el-form-item>
                            <el-button type="primary" @click="onSubmit">查询</el-button>
                        </el-form-item>
                    </el-form>
                    <!-- echarts图表 -->
                    <template>
                        <div id="myChart" ref="myChart" style="width:1000px;height:500px">
                            
                        </div>
                    </template>
                </div>
            </el-card>

        </div>
    </div>
</template>

<script>
// 引入Echarts
import echarts from 'echarts';

    export default {
        data() {
            return {
                stockTotalForm: {
                    date1: '',
                    date2: ''
                },
                chart: null,
                option: {
                    //  echarts配置项
                    xAxis: {
                        type: 'category',
                        data: [
                            '2019-06-01', 
                            '2019-06-02', 
                            '2019-06-03', 
                            '2019-06-04', 
                            '2019-06-05', 
                            '2019-06-06', 
                            '2019-06-07',
                            ]
                    },
                    yAxis: {
                        type: 'value'
                    },
                    series: [{
                        data: [200, 800, 500, 900, 700, 1100, 1000],
                        type: 'line'
                    }]
                }

            }
        },
        methods: {
            onSubmit(){

            },
            // echarts图表 方法配置 ==> 以下三个方法
            initData(){//去请求初始化数据
            },
            initEcharts(){//初始化dom
                let dom = this.$refs.myChart;
                this.chart=echarts.init(dom);
            },
            drawEcharts(){//绘制echarts
                this.chart.setOption(this.option);
            },
        },
        // 挂载后
        mounted() {
            this.initData(); //执行初始化数据
            this.initEcharts(); //执行初始化dom
            this.drawEcharts(); //执行绘制echarts
        },
        // 更新后 ==> 每次更新 都执行绘制echarts
        updated(){
            this.drawEcharts(); 
        }
    }
</script>

<style lang="less">
    .stock-total {
        // 面板组件
        .el-card {
            // 面板头
            .el-card__header {
                background-color: #f1f1f1;
            }
            .el-card__body{
                // 表单
                .el-form{
                    .el-form-item{
                        height: 30px;
                        line-height: 30px;
                        margin-bottom: 0px;
                        .el-form-item__label{
                            margin-right: 0px;
                            padding-right:6px;
                        }
                        &>.el-form-item__content{
                            .el-input{
                                width:auto;
                                .el-input__inner{
                                    width: 140px;
                                    height: 30px;
                                    text-align: center;
                                }
                            }
                            .el-button{
                                height: 30px;
                                padding: 0px 10px;
                                margin-left: 0;
                            }
                        }
                    }
                }
                // 图表

            }
        }
        
    }
</style>