<template>
    <div>
        <div class="goods-add">
            <!-- 面板组件 -->
            <el-card class="box-card">
                <!-- 头 -->
                <div slot="header" class="clearfix">
                    <h3>商品添加</h3>
                </div>
                <!-- 身体 -->
                <div class="text item">
                    <!-- 表单 -->
                        <el-form 
                            :model="goodsAddForm" 
                            :rules="rules" 
                            ref="goodsAddForm" 
                            label-width="100px" 
                            :label-position="labelPosition"
                            style="width:300px;"
                            >
                            <!-- 所属分类 -->
                            <el-form-item 
                                label="所属分类"
                                prop="classify"
                                >
                                <el-select 
                                    v-model="goodsAddForm.classify" 
                                    placeholder="---请选择分类---"
                                    >
                                    <el-option label="clothes" value="clothes"></el-option>
                                    <el-option label="drinks" value="drinks"></el-option>
                                    <el-option label="makeup" value="makeup"></el-option>
                                    <el-option label="skincare" value="skincare"></el-option>
                                    <el-option label="fruits" value="fruits"></el-option>
                                </el-select>
                            </el-form-item>

                            <!-- 商品条形码 -->
                            <el-form-item 
                                label="商品条形码" 
                                prop="barCode"
                                style="width:460px"
                                >
                                <el-input v-model="goodsAddForm.barCode"></el-input>
                                <el-button type="primary">生成条形码</el-button>
                            </el-form-item>

                            <!-- 商品名称 -->
                            <el-form-item 
                                label="商品名称" 
                                prop="goodsName"
                                >
                                <el-input v-model="goodsAddForm.goodsName"></el-input>
                            </el-form-item>
                            
                            <!-- 商品进价 -->
                            <el-form-item 
                                label="商品进价" 
                                prop="purchasePrice"
                                >
                                <el-input @blur="autoPrice" v-model="goodsAddForm.purchasePrice"></el-input>
                            </el-form-item>
                            
                            <!-- 商品售价 -->
                            <el-form-item 
                                label="商品售价" 
                                prop="sellPrice"
                                >
                                <el-input v-model="goodsAddForm.sellPrice"></el-input>
                            </el-form-item>
                            
                            <!-- 市场价 -->
                            <el-form-item 
                                label="市场价" 
                                prop="marketPrice"
                                >
                                <el-input v-model="goodsAddForm.marketPrice"></el-input>
                            </el-form-item>
                            
                            <!-- 入库数量 -->
                            <el-form-item 
                                label="入库数量" 
                                prop="selectNum"
                                >
                                <el-input v-model="goodsAddForm.selectNum"></el-input>
                            </el-form-item>
                            
                            <!-- 商品重量 -->
                            <el-form-item 
                                label="商品重量" 
                                prop="goodsWeight"
                                >
                                <el-input v-model="goodsAddForm.goodsWeight"></el-input>
                            </el-form-item>

                            <!-- 商品单位 -->
                            <el-form-item 
                                label="商品单位" 
                                prop="goodsUnit"
                                >
                                <el-input v-model="goodsAddForm.goodsUnit"></el-input>
                            </el-form-item>
                            
                           <!-- 会员优惠 -->
                            <el-form-item 
                                label="会员优惠" 
                                prop="VIPBelefits"
                                >
                                <el-radio-group v-model="goodsAddForm.VIPBelefits">
                                    <el-radio label="享受"></el-radio>
                                    <el-radio label="不享受"></el-radio>
                                </el-radio-group>
                            </el-form-item>

                           <!-- 是否促销 -->
                            <el-form-item 
                                label="是否促销" 
                                prop="isPromotion"
                                >
                                <el-radio-group v-model="goodsAddForm.isPromotion">
                                    <el-radio label="是"></el-radio>
                                    <el-radio label="否"></el-radio>
                                </el-radio-group>
                            </el-form-item>

                            <!-- 商品简介 -->
                            <el-form-item 
                                label="商品简介" 
                                prop="goodsIntro"
                                style="width:400px"
                                >
                                <el-input type="textarea" v-model="goodsAddForm.goodsIntro"></el-input>
                            </el-form-item>

                            <!-- 添加按钮 -->
                            <el-form-item>
                                <el-button type="primary" @click="submitForm">添加</el-button>
                            </el-form-item>
                        </el-form>

                </div>
            </el-card>
        </div>
    </div>
</template>

<script>
// 引入api中的goods请求
import { goodsAdd } from '@/api/goods';

    export default {
        data(){
            return {
                options: '',
                labelPosition: 'top',
                // 添加 商品添加表单数据  ===> 和表单双向绑定==> so需要与v-model中的字段一致
                goodsAddForm: {
                    classify:'',
                    barCode:'',
                    goodsName:'',
                    purchasePrice:'',
                    sellPrice:'',
                    marketPrice:'',
                    selectNum:'',
                    goodsWeight:'',
                    goodsUnit:'',
                    VIPBelefits:'',
                    isPromotion:'',
                    goodsIntro:''
                },
                rules: {
                    classify: [
                        { required: true, message: '请选择分类', trigger: 'change' }
                    ],
                    barCode:[
                        { required: true, message: '请输入条形验证码', trigger: 'blur' }
                    ],
                    goodsName: [
                        { required: true, message: '请输入商品名称', trigger: 'blur' }
                    ],
                    purchasePrice: [
                        { required: true, message: '请输入商品进价', trigger: 'blur' }
                    ],
                    sellPrice: [
                        { required: true, message: '请输入商品售价', trigger: 'blur' }
                    ],
                    marketPrice: [
                        { required: true, message: '请输入商品市场价', trigger: 'blur' }
                    ],
                    selectNum: [
                        { required: true, message: '请输入入库数量', trigger: 'blur' }
                    ],
                    goodsWeight: [
                        { required: true, message: '请输入商品重量', trigger: 'blur' }
                    ],
                    goodsUnit: [
                        { required: true, message: '请输入商品单位', trigger: 'blur' }
                    ],
                    VIPBelefits: [
                        { required: true, message: '请选择是否享受会员优惠', trigger: 'change' }
                    ],
                    isPromotion: [
                        { required: true, message: '请选择是否促销', trigger: 'change' }
                    ]
                }

            }
        },
        methods: {
            // 自动补全 市场价 和 售价
            autoPrice() {
                this.goodsAddForm.sellPrice = (parseFloat(this.goodsAddForm.purchasePrice) *1.5).toFixed(2);
                this.goodsAddForm.marketPrice = (parseFloat(this.goodsAddForm.purchasePrice) *2).toFixed(2);
            },
            // 提交表单
            submitForm() {
                // 获取整个表单 调用验证方法
                this.$refs.goodsAddForm.validate((valid) => {
                   if(valid) {
                    // 收集参数
                    let params= {
                        classify:this.goodsAddForm.classify,
                        barCode:this.goodsAddForm.barCode,
                        goodsName:this.goodsAddForm.goodsName,
                        purchasePrice:this.goodsAddForm.purchasePrice,
                        sellPrice:this.goodsAddForm.sellPrice,
                        marketPrice:this.goodsAddForm.marketPrice,
                        selectNum:this.goodsAddForm.selectNum,
                        goodsWeight:this.goodsAddForm.goodsWeight,
                        goodsUnit:this.goodsAddForm.goodsUnit,
                        VIPBelefits:this.goodsAddForm.VIPBelefits,
                        isPromotion:this.goodsAddForm.isPromotion,
                        goodsIntro:this.goodsAddForm.goodsIntro
                    }
                    // 发送请求
                    goodsAdd(params)
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
                                // 跳转到商品管理
                                this.$router.push('/home/goodsmanage');
                            } else if (code === 1) {
                                // 弹失败提示
                                this.$message.error(msg);
                            }
                        })
                        .catch(err => {
                            console.log(err);
                        })
                        
                   } else {
                       console.log('前端验证不通过,不允许添加！')
                       return false;
                   }
                })
                
            }
        }
    }
</script>

<style lang="less">
    .goods-add {
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
                        margin-bottom: 10px;
                        line-height: 20px;
                        // 表单标签
                        .el-form-item__label{
                            height: 20px;
                            line-height: 20px;
                            font-weight: bold;
                        }
                        // 表单输入框
                        .el-form-item__content{
                            .el-input{
                                width:auto;
                                .el-input__inner{
                                    width: 260px;
                                    height: 30px;
                                    line-height: 30px;
                                }
                            }
                            // 条形码按钮
                            .el-button{
                                width: 100px;
                                padding:7px 0px;
                                margin-left: 10px;
                            }
                        }
                    }
                }
            }
        }
    }
</style>