<template>
        <div class='invManage'>
            <!-- <div class="crumbs">
                <el-breadcrumb separator="/">
                    <el-breadcrumb-item><i class="el-icon-my-yoncheguanli"></i> 熊猫到家</el-breadcrumb-item>
                    <el-breadcrumb-item class='ss'>库存管理</el-breadcrumb-item>
                </el-breadcrumb>
            </div> -->
            <div class='invManageA'>
                <div class="invManageH1">
                    <h3 class='invManageH2'>
                   库存管理
                    </h3>
                    <!-- <div class='invManageS'>
                            <el-date-picker v-model="value1" type="year" placeholder="年份选择" @change="updateList" >
                                </el-date-picker>
                    </div>
                    <div class='invManageS'> -->
                            <!-- <el-date-picker v-model="value2" type="month" placeholder="月份选择" @change="updateList" >
                                </el-date-picker> -->
                                <!-- <el-select v-model="value2" clearable placeholder="选择月份">
                                        <el-option label="1月" value="01"></el-option>
                                        <el-option label="2月" value="02"></el-option>
                                        <el-option label="3月" value="03"></el-option>
                                        <el-option label="4月" value="04"></el-option>
                                        <el-option label="5月" value="05"></el-option>
                                        <el-option label="6月" value="06"></el-option>
                                        <el-option label="7月" value="07"></el-option>
                                        <el-option label="8月" value="08"></el-option>
                                        <el-option label="9月" value="09"></el-option>
                                        <el-option label="10月" value="10"></el-option>
                                        <el-option label="11月" value="11"></el-option>
                                        <el-option label="12月" value="12"></el-option>
                                    </el-select>
                    </div> -->
                    <!-- <el-button type="primary" size="mid" class='buttonAdd' @click="createCh('aform')">导出表格</el-button> -->
                </div>
            </div>
            <div id="tableIM">
                <el-table :data="accountData" border style='width:100%'>
                    <el-table-column prop="sku" label="产品型号">
                        <template scope="scope">
                            <span style='font-weight:600'>{{scope.row.sku}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="goods_name" label="产品名称">
                    </el-table-column>
                    <el-table-column prop="level" label="产品级别">
                    </el-table-column>
                    <!-- <el-table-column prop="month_stock" label="上月剩余库存量">
                    </el-table-column> -->
                    <el-table-column prop="total_stock" label="生产入库量">
                    </el-table-column>
                    <el-table-column prop="month_sales" label="发货量">
                    </el-table-column>
                    <el-table-column prop="stock" label="剩余库存量">
                    </el-table-column>
                    <el-table-column prop="book_price" label="入库记录">
                            <template scope="scope">
                                    <div class='timesInv' @click='openTimesInv(scope.row)'>{{scope.row.lastLog.total_num}}次</div>
                                    <div>最新入库{{scope.row.lastLog.last_stock}}</div>
                                </template>
                        </el-table-column>
                        <el-table-column label="操作" width='100'>
                                <template scope="scope">
                                    <el-button type="text" size="small" @click="openProduct(scope.row)">生产入库</el-button>
                                </template>
                            </el-table-column>

                </el-table>
                <div class="invManageBlock">
                    <el-pagination layout="prev, pager, next" :total="total" :current-page="currentPage" :page-size="pagesize" @current-change="handleCurrentChange">
                    </el-pagination>
                </div>
            </div>
            <el-dialog title="生产入库" :visible.sync="dialogFormVisible" :close-on-click-modal="no" custom-class='invManageDD' top='25%' @close='resetD' size='tiny'>
                    <el-form :model="aform" :rules="rules2" ref="aform" style='padding-right:70px'>
                            <el-form-item label="产品型号" :label-width="formLabelWidth" >
                                   <div>{{inStock.sku}}</div>
                                </el-form-item>
                                <el-form-item label="产品名称" :label-width="formLabelWidth" >
                                        <div>{{inStock.goods_name}}</div>
                                    </el-form-item>
                                    <el-form-item label="产品级别" :label-width="formLabelWidth" >
                                            <div>{{inStock.level}}</div>
                                        </el-form-item>
                        <el-form-item label="生产入库量" :label-width="formLabelWidth" prop="qty">
                            <el-input v-model="aform.qty" placeholder='请输入生产入库量' style='width:180px'></el-input>
                        </el-form-item>
                    </el-form>
                    <div slot="footer" class="dialog-footer" style="text-align:center;margin-top:40px">
                        <el-button type="primary" @click="addAccount('aform')">确 定</el-button>
                        <el-button @click="dialogFormVisible = false">取 消</el-button>
                    </div>
                </el-dialog>
                <el-dialog title="入库记录" :visible.sync="dialogFormVisibleTime" :close-on-click-modal="no" custom-class='invManageTD' top='25%'  size='tiny'>
                   <div style="margin-bottom:20px">
                       <div v-for='item in timeData' v-if="timeData.length!=0" style='margin-bottom:10px'>
                        <span style='margin-left:40px;margin-right:110px'>{{item.created}}</span>
                        <span>入库 {{item.stock}} 盒</span>
                    </div>
                    <div style="text-align:center" v-if="timeData.length==0">暂无入库</div>
                </div>
                    <el-form style='border-top:1px solid gainsboro'>
                            <el-form-item label="产品型号" :label-width="formLabelWidth" >
                                   <div>{{inStock.sku}}</div>
                                </el-form-item>
                                <el-form-item label="产品名称" :label-width="formLabelWidth" >
                                        <div>{{inStock.goods_name}}</div>
                                    </el-form-item>
                                    <el-form-item label="产品级别" :label-width="formLabelWidth" >
                                            <div>{{inStock.level}}</div>
                                        </el-form-item>
                    </el-form>
                </el-dialog>
        </div>
    </template>
    <script>
    var token
    import {
        getClassLibrary,
        getClassKind,
        create_class,
        put_class,
        delete_class,
        addStock,
        stockControl,
        getProductStockLog
    } from '../../api/api';
    export default {
        data() {
                var isNumber = (rule, value, callback) => {
                var myreg1 = /^[0-9]*$/;
                if(value==''){
                    callback('请输入生产入库量')
                }else if (!myreg1.test(value)) {
                    callback('请输入有效的入库量')
                }else {
                    callback();
                }
            }
                return {
                    timeData:[],
                    rules2: {
                        qty: [{
                        required: true,
                        validator: isNumber,
                        // type:'number',
                        // message: '请输入生产入库量',
                        trigger: 'blur'
                    }]
                },
                    aform: {
                    id: '',
                    qty: '',
                },
                    value1:'',
                    value2:'',
                    currentPage: 1, //页数
                    pagesize: 15, //默认每页
                    total: 0, //总页数
                    accountData: [],
                    dialogFormVisible: false,
                    dialogFormVisibleTime:false,
                    no: false, //取消点击关闭
                    formLabelWidth:'110px',
                    inStock:{},

                }
            },
            methods: {
                openTimesInv(data){
                    this.inStock = data;
                    let para ={
                        product_id:data.id
                    }
                    getProductStockLog(token,para).then((res)=>{
                        this.timeData = res.data
                    }).then(()=>{

                        this.dialogFormVisibleTime = true;
                    })
                },
                addAccount(formName) {
                    this.$refs[formName].validate((valid) => {
                        if(valid){
                            let para = {
                            product_id:this.aform.id,
                            qty:this.aform.qty
                        }
                        addStock(para,token).then(res=>{
                            if(res.code==0){
                                this.$message.success('入库成功');
                                this.dialogFormVisible = false;
                                this.fetchData()
                            }else{
                                this.$message.error(res.data)
                            }
                        })
                        }
                    })
                 },
                resetD() {
                this.$refs['aform'].resetFields();
            },
                updateList() { //表格上方select change之后刷新表格
                    this.currentPage = 1;
                    this.fetchData();
                },
                createCh(formName) { //点击创建按钮
                    
    
                },
                openProduct(data){
                    // console.log(data)
                    this.inStock = data;
                    this.aform.id = data.id
                    this.dialogFormVisible = true;
                },
                fetchData() {
                    let para = {
                        page: this.currentPage,
                        month: this.value2
                    }
                    stockControl(token, para).then((res) => {
                        this.number = res.data.total;
                        let a = res.data;
                        let c = res.data.last_page * this.pagesize;
                        this.total = parseInt(c);
                        this.accountData = a.data;
                    })
    
                },
                handleCurrentChange: function(val) { //变更页数
                    this.currentPage = val;this.backToTop();
                    this.fetchData();
                },
            },
            beforeCreate() {
                let user = sessionStorage.getItem('user');
                token = JSON.parse(user).token;
            },
            created() { //创建组件时
                this.fetchData();
                console.log(1)
    
            },
    }
    </script>
    <style>
    .invManageH1 .el-button--primary {
        background-color: #32a4d3;
        border-color: #32a4d3;
    }
    
    #tableIM .el-table td,
    #tableIM .el-table th:not(.gutter) {
        padding: 5px 5px;
        text-align: center
    }
    
    #tableIM .el-table th>div,
    #tableIM .el-table .cell {
        padding-left: 0;
        padding-right: 0;
    }
    .invManageBlock {
        text-align: center;
        margin-top: 10px;
    }
    
    .invManageA {
        width: 100%;
        position: relative;
        height: 45px;
        background-color: white;
        /* margin-top: 30px; */
        padding-top: 10px;
        margin-bottom: 5px;
        border-radius: 5px;
    }
    
    .invManageH2 {
        display: inline-block;
        margin-top: 5px;
        margin-bottom: 15px;
        padding-left: 10px
    }
    
    .invManageS {
        display: inline-block;
        margin-bottom: 10px;
        margin-left: 10px;
        width: 120px
    }
    .invManageS .el-date-editor.el-input{
        width:120px;
    }
    .invManage .buttonAdd {
        position: absolute;
        right: 10px;
        top: 10px;
    }
    .invManageDD .el-dialog__body {
    padding: 20px 20px 0 20px;
}

.invManageDD .el-dialog__footer {
    padding: 0 20px 15px;
}
.invManage .el-dialog .el-dialog__header {
    background-color: #1fb5ad;
    padding: 20px 20px 20px;
}

.invManage .el-dialog .el-dialog__title {
    color: white;
}
.timesInv{
color:#1fb5ad
}
.timesInv:hover{
    cursor: pointer;
}
.invManageTD .el-form-item{
    margin-bottom:0;
}
    </style>
    