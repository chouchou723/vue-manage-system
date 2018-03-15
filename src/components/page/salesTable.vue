<template>
        <div class='salesTable'>
            <!-- <div class="crumbs">
                <el-breadcrumb separator="/">
                    <el-breadcrumb-item><i class="el-icon-my-yoncheguanli"></i> 熊猫到家</el-breadcrumb-item>
                    <el-breadcrumb-item class='ss'>销售报表</el-breadcrumb-item>
                </el-breadcrumb>
            </div> -->
            <div class='salesTableA'>
                <div class="h1">
                    <h3 class='salesTableA2'>
                   销售报表
                    </h3>
                    <!-- <div class='salesTableS'>
                            <el-select v-model="value1"  placeholder="全部订单" @change="updateList">
                                    <el-option label="全部订单" value="2"></el-option>
                                    <el-option label="学员订单" value="0"></el-option>
                                    <el-option label="手工订单" value="1"></el-option>
                                </el-select>
                    </div>
                    <div class='salesTableS'>
                            <el-date-picker v-model="value2" type="year" placeholder="年份选择" @change="updateList"  :picker-options="pickerOptions0" >
                                </el-date-picker>
                    </div> -->
                    <div class='salesTableS'>
                            <el-select v-model="value3" clearable placeholder="产品级别" @change="updateList">
                                    <el-option label="3+" value="3"></el-option>
                                    <el-option label="4+" value="4"></el-option>
                                    <el-option label="5+" value="5"></el-option>
                                    <el-option label="6+" value="6"></el-option>
                            </el-select>
                        </div>
                    <!-- <el-button type="primary" size="mid" class='buttonAdd' @click="createCh('aform')">导出表格</el-button> -->
                </div>
            </div>
            <div id="salesTableTS">
                <el-table :data="accountData" border style='width:100%' show-summary>
                    <el-table-column prop="level" label="级别"  width="180">
                        <!-- <template scope="scope">
                            <span >{{scope.row.title}}</span>
                        </template> -->
                    </el-table-column>
                    <el-table-column prop="totalOrder" label="订单总量">
                    </el-table-column>
                    <el-table-column prop="totalSales" label="总销量">
                    </el-table-column>
                    <el-table-column prop="sendOut" label="已发总量">
                    </el-table-column>
                    <el-table-column prop="notSendOut" label="待发总量">
                    </el-table-column>
                </el-table>
                <!-- <div class="block">
                    <el-pagination layout="prev, pager, next" :total="total" :current-page="currentPage" :page-size="pagesize" @current-change="handleCurrentChange">
                    </el-pagination>
                </div> -->
            </div>
        </div>
    </template>
    <script>
    var token
    import {
        salesReport
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
                    value1:'2',
                    value2:'',
                    value3:'',
                    currentPage: 1, //页数
                    pagesize: 15, //默认每页
                    total: 0, //总页数
                    accountData: [],
                }
            },
            methods: {
                updateList() { //表格上方select change之后刷新表格
                    this.currentPage = 1;
                    this.fetchData();
                },
                createCh(formName) { //点击创建按钮
                    
    
                },
                fetchData() {
                    let para = {
                        page: this.currentPage,
                        // types: this.value1,
                        level:this.value3,
                        // data:this.value2
                    }
                    salesReport(token, para).then((res) => {
                        // this.number = res.data.total;
                        let a = res.data;
                        // let c = res.data.last_page * this.pagesize;
                        // this.total = parseInt(c);
                        this.accountData = a;
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
    
            },
    }
    </script>
    <style>
    .salesTableA .h1 .el-button--primary {
        background-color: #32a4d3;
        border-color: #32a4d3;
    }
    
    #salesTableTS .el-table td,
    #salesTableTS .el-table th:not(.gutter) {
        padding: 5px 5px;
        text-align: center
    }
    
    #salesTableTS .el-table th>div,
    #salesTableTS .el-table .cell {
        padding-left: 0;
        padding-right: 0;
    }
    .salesTable .block {
        text-align: center;
        margin-top: 10px;
    }
    
    .salesTableA {
        width: 100%;
        position: relative;
        height: 45px;
        background-color: white;
        /* margin-top: 30px; */
        padding-top: 10px;
        margin-bottom: 5px;
        border-radius: 5px;
    }
    
    .salesTableA2 {
        display: inline-block;
        /*margin-top: 20px;*/
        margin-bottom: 15px;
        padding-left: 10px
    }
    
    .salesTableS {
        display: inline-block;
        margin-bottom: 10px;
        margin-left: 10px;
        width: 120px
    }
    .salesTableS .el-date-editor.el-input{
        width:120px;
    }
   .salesTableA .buttonAdd {
        position: absolute;
        right: 10px;
        top: 10px;
    }
    /* #salesTableTS .el-table__footer .gutter {
        display: none
    } */
    </style>
    