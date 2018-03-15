<template>
        <div class='purchaseMange'>
            <!-- <div class="crumbs">
                <el-breadcrumb separator="/">
                    <el-breadcrumb-item><i class="el-icon-my-yoncheguanli"></i> 熊猫到家</el-breadcrumb-item>
                    <el-breadcrumb-item class='ss'>采购管理</el-breadcrumb-item>
                </el-breadcrumb>
            </div> -->
            <div style='float:left;width:34.5%'>

                <div class='purchaseMangeA'>
                    <div class="purchaseMangeH1">
                        <h3 class='purchaseMangeH2'>
                       库存量
                        </h3>
                        <div class='purchaseMangeS'>
                                <el-select v-model="value1" clearable placeholder="产品级别" @change="updateList">
                                        <el-option label="3+" value="3"></el-option>
                                        <el-option label="4+" value="4"></el-option>
                                        <el-option label="5+" value="5"></el-option>
                                        <el-option label="6+" value="6"></el-option>
                                </el-select>
                            </div>
                        <!-- <el-button type="primary" size="mid" class='buttonAdd' @click="createCh('aform')">导出表格</el-button> -->
                    </div>
                </div>
                <div id="tableSales">
                    <el-table :data="accountData" border style='width:100%' >
                        <el-table-column prop="sku" label="产品型号"  >
                            <template scope="scope">
                                <span >{{scope.row.sku}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column prop="goods_name" label="产品名称">
                        </el-table-column>
                        <el-table-column prop="stock" label="本月剩余库存(盒)">
                        </el-table-column>
                    </el-table>
                    <div class="PPMBLOCK">
                        <el-pagination layout="prev, pager, next" :total="total" :current-page="currentPage" :page-size="pagesize" @current-change="handleCurrentChange">
                        </el-pagination>
                    </div>
                </div>
            </div>
            <div style='float:right;width:65%'>
                    
                                    <div class='purchaseMangeA'>
                                        <div class="purchaseMangeH1">
                                            <h3 class='purchaseMangeH2'>
                                           订单量
                                            </h3>
                                            <div class='purchaseMangeS'>
                                                    <el-date-picker v-model="value2" type="year" :editable="no" :clearable="no" placeholder="年份选择" @change="updateList1" :picker-options="pickerOptions0">
                                                        </el-date-picker>
                                            </div>
                                            <div class='purchaseMangeS'>
                                                    <el-select v-model="value3" clearable placeholder="产品级别" @change="updateList1">
                                                            <el-option label="3+" value="3"></el-option>
                                                            <el-option label="4+" value="4"></el-option>
                                                            <el-option label="5+" value="5"></el-option>
                                                            <el-option label="6+" value="6"></el-option>
                                                    </el-select>
                                                </div>
                                            <!-- <el-button type="primary" size="mid" class='buttonAdd' @click="createCh('aform')">导出表格</el-button> -->
                                        </div>
                                    </div>
                                    <div id="tableSales">
                                        <el-table :data="accountData1" border style='width:100%' >
                                            <el-table-column prop="month" label="月份"  >
                                                <template scope="scope">
                                                    <span >{{scope.row.month}}月</span>
                                                </template>
                                            </el-table-column>
                                            <el-table-column prop="level" label="产品级别">
                                            </el-table-column>
                                            <el-table-column prop="old" label="往期订单">
                                            </el-table-column>
                                            <!-- <el-table-column prop="head_count" label="往期手工订单">
                                            </el-table-column>
                                            <el-table-column prop="tuition_price" label="往期合计">
                                            </el-table-column> -->
                                            <el-table-column prop="new" label="新订单">
                                                </el-table-column>
                                                <!-- <el-table-column prop="year_num" label="新增手工订单">
                                                </el-table-column>
                                                <el-table-column prop="head_count" label="新增合计">
                                                </el-table-column> -->
                                                <el-table-column prop="total" label="总计">
                                                </el-table-column>
                                        </el-table>
                                        <!-- <div class="PPMBLOCK">
                                            <el-pagination layout="prev, pager, next" :total="total" :current-page="currentPage" :page-size="pagesize" @current-change="handleCurrentChange">
                                            </el-pagination>
                                        </div> -->
                                    </div>
                                </div>
        </div>
    </template>
    <script>
    var token
    import {
        productList,
        orderCount
    } from '../../api/api';
    export default {
        data() {
                var nan = (rule, value, callback) => {
                    if (typeof value == 'number') {
                        callback();
                    } else {
                        callback('请选择课程类型')
                    }
                }
                return {
                    pickerOptions0: {
                        disabledDate(time) {
                            return time.getTime() > Date.now() ;
                        }
                    },
                    value1:'',
                    value2:new Date(),
                    value3:'',
                    currentPage: 1, //页数
                    
                    pagesize: 15, //默认每页
                    total: 0, //总页数
                    accountData: [],
                    accountData1: [],
                    no:false,
                }
            },
            methods: {
                updateList() { //表格上方select change之后刷新表格
                    this.currentPage = 1;
                    let para = {
                        page: this.currentPage,
                        level:this.value1
                        // pid: this.value
                    }
                    productList(token, para).then((res) => {
                        let a = res.data;
                        let c = res.data.last_page * this.pagesize;
                        this.total = parseInt(c);
                        this.accountData = a.data;
                    })
                },
                updateList1() { //表格上方select change之后刷新表格
                    let para1 = {
                        level:this.value3,
                        data:new Date(this.value2).toLocaleDateString()
                        // pid: this.value
                    }
                    orderCount(token, para1).then((res) => {
                        let a = res.data;
                        // let c = res.data.last_page * this.pagesize;
                        // this.total = parseInt(c);
                        this.accountData1 = a;
                    })
                },
                fetchData() {
                    let para = {
                        page: this.currentPage,
                        level:this.value1
                        // pid: this.value
                    }
                    productList(token, para).then((res) => {
                        let a = res.data;
                        let c = res.data.last_page * this.pagesize;
                        this.total = parseInt(c);
                        this.accountData = a.data;
                    })
                    let para1 = {
                        level:this.value3,
                        data:new Date(this.value2).toLocaleDateString()
                        // pid: this.value
                    }
                    orderCount(token, para1).then((res) => {
                        let a = res.data;
                        // let c = res.data.last_page * this.pagesize;
                        // this.total = parseInt(c);
                        this.accountData1 = a;
                    })
    
                },
                handleCurrentChange: function(val) { //变更页数
                    this.currentPage = val;this.backToTop();
                    let para = {
                        page: this.currentPage,
                        level:this.value1
                        // pid: this.value
                    }
                    productList(token, para).then((res) => {
                        let a = res.data;
                        let c = res.data.last_page * this.pagesize;
                        this.total = parseInt(c);
                        this.accountData = a.data;
                    })
                },
            },
            beforeCreate() {
                let user = sessionStorage.getItem('user');
                token = JSON.parse(user).token;
            },
            created() { //创建组件时
                this.fetchData();
    
            },
    }
    </script>
    <style>
    /* .purchaseMangeH1 .el-button--primary {
        background-color: #32a4d3;
        border-color: #32a4d3;
    } */
    
    /* #tableSales .el-table td,
    #tableSales .el-table th:not(.gutter) {
        padding: 5px 5px;
        text-align: center
    }
    
    #tableSales .el-table th>div,
    #tableSales .el-table .cell {
        padding-left: 0;
        padding-right: 0;
    } */
    .PPMBLOCK {
        text-align: center;
        margin-top: 10px;
    }
    
    .purchaseMangeA {
        width: 100%;
        position: relative;
        height: 45px;
        background-color: white;
        /* margin-top: 30px; */
        padding-top: 10px;
        margin-bottom: 5px;
        border-radius: 5px;
    }
    
    .purchaseMangeH2 {
        display: inline-block;
        /*margin-top: 20px;*/
        margin-bottom: 15px;
        padding-left: 10px
    }
    
    .purchaseMangeS {
        display: inline-block;
        margin-bottom: 10px;
        margin-left: 10px;
        width: 120px
    }
    .purchaseMangeS .el-date-editor.el-input{
        width:120px;
    }
    /* .buttonAdd {
        position: absolute;
        right: 10px;
        top: 10px;
    } */
    /* #tableSales .el-table__footer .gutter {
        display: none
    } */
    </style>
    