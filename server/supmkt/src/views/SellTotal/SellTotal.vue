<template>
    <div>
        <div class="sell-total">
             <!-- 面板组件 -->
            <el-card class="box-card">
                <!-- 头 -->
                <div slot="header" class="clearfix">
                    <h3>销售统计</h3>
                </div>

                <!-- 身体 -->
                <div class="item">
                    <!-- 查询表单 -->
                    <el-form 
                        :inline="true" 
                        :model="sellTotalForm" 
                        >
                        <el-form-item label="时间：">
                            <!-- <el-input v-model="stockTotalForm.date1" placeholder="2010-6-16"></el-input> -->
                            <el-date-picker
                                v-model="sellTotalForm.date1"
                                type="date"
                                placeholder="选择日期"
                                >
                            </el-date-picker>
                        </el-form-item>

                        <el-form-item label="--">
                            <!-- <el-input v-model="stockTotalForm.date2" placeholder="2019-6-16"></el-input> -->
                            <el-date-picker
                                v-model="sellTotalForm.date2"
                                type="date"
                                placeholder="选择日期"
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
// 引入echarts
import echarts from 'echarts';

    export default {
        data() {
            return {
                sellTotalForm: {
                    date1: '',
                    date2: ''
                },
                // 图表
                echart: null,
                option: {
                    // echarts配置项
                    xAxis: {
                        type: 'category',
                        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
                    },
                    yAxis: {
                        type: 'value'
                    },
                    series: [{
                        data: [1300, 1100, 401, 900, 1190, 1330, 1220],
                        type: 'line'
                    }]

                }
            }
        },
        methods: {
            onSubmit(){

            },
            // 请求初始化数据
            initData() { 
            },
            // 初始化dom
            initEcharts() {
                let dom = this.$refs.myChart;
                this.chart = echarts.init(dom);
            },
            // 绘制echarts
            drawEcharts() {
                this.chart.setOption(this.option);
            }
        },
        // 挂载后
        mounted() {
            this.initData();
            this.initEcharts();
            this.drawEcharts();
        },
        // 更新后
        updated() {
            this.drawEcharts();
        }
    }
</script>

<style lang="less">
 .sell-total {
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
                        .el-form-item__content{
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