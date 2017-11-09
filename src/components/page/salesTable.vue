<template>
        <div class='classLibrary'>
            <div class="crumbs">
                <el-breadcrumb separator="/">
                    <el-breadcrumb-item><i class="el-icon-my-yoncheguanli"></i> 熊猫到家</el-breadcrumb-item>
                    <el-breadcrumb-item class='ss'>销售报表</el-breadcrumb-item>
                </el-breadcrumb>
            </div>
            <div class='accou'>
                <div class="h1">
                    <h3 class='accountH2'>
                   销售报表
                    </h3>
                    <div class='oneSelect'>
                            <el-select v-model="value1" clearable placeholder="全部用户" @change="updateList">
                                    <el-option label="正常" value="1"></el-option>
                                    <el-option label="冻结" value="2"></el-option>
                                    <el-option label="过期" value="3"></el-option>
                                    <el-option label="已结束" value="4"></el-option>
                                </el-select>
                    </div>
                    <div class='oneSelect'>
                            <el-date-picker v-model="value2" type="year" placeholder="年份选择" @change="updateList" >
                                </el-date-picker>
                    </div>
                    <div class='oneSelect'>
                            <el-select v-model="value3" clearable placeholder="产品级别" @change="updateList">
                                <el-option label="3+" value="1"></el-option>
                                <el-option label="5+" value="2"></el-option>
                            </el-select>
                        </div>
                    <el-button type="primary" size="mid" class='buttonAdd' @click="createCh('aform')">导出表格</el-button>
                </div>
            </div>
            <div id="tableSales">
                <el-table :data="accountData" border style='width:100%' show-summary>
                    <el-table-column prop="title" label="日期"  width="180">
                        <template scope="scope">
                            <span >{{scope.row.title}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="year_num" label="订单总量">
                    </el-table-column>
                    <el-table-column prop="year_num" label="总销量">
                    </el-table-column>
                    <el-table-column prop="head_count" label="已发总量">
                    </el-table-column>
                    <el-table-column prop="tuition_price" label="待发总量">
                    </el-table-column>
                </el-table>
                <div class="block">
                    <el-pagination layout="prev, pager, next" :total="total" :current-page="currentPage" :page-size="pagesize" @current-change="handleCurrentChange">
                    </el-pagination>
                </div>
            </div>
        </div>
    </template>
    <script>
    var token
    import {
        getClassLibrary,
        getClassKind,
        create_class,
        put_class,
        delete_class
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
                    value1:'',
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
                        pid: this.value
                    }
                    getClassLibrary(token, para).then((res) => {
                        this.number = res.data.total;
                        let a = res.data;
                        let c = res.data.last_page * this.pagesize;
                        this.total = parseInt(c);
                        this.accountData = a.data;
                    })
    
                },
                handleCurrentChange: function(val) { //变更页数
                    this.currentPage = val;
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
    .h1 .el-button--primary {
        background-color: #32a4d3;
        border-color: #32a4d3;
    }
    
    #tableSales .el-table td,
    #tableSales .el-table th:not(.gutter) {
        padding: 5px 5px;
        text-align: center
    }
    
    #tableSales .el-table th>div,
    #tableSales .el-table .cell {
        padding-left: 0;
        padding-right: 0;
    }
    .block {
        text-align: center;
        margin-top: 10px;
    }
    
    .accou {
        width: 100%;
        position: relative;
        height: 45px;
        background-color: white;
        margin-top: 30px;
        padding-top: 10px;
        margin-bottom: 5px;
        border-radius: 5px;
    }
    
    .accountH2 {
        display: inline-block;
        /*margin-top: 20px;*/
        margin-bottom: 15px;
        padding-left: 10px
    }
    
    .oneSelect {
        display: inline-block;
        margin-bottom: 10px;
        margin-left: 10px;
        width: 120px
    }
    .oneSelect .el-date-editor.el-input{
        width:120px;
    }
    .buttonAdd {
        position: absolute;
        right: 10px;
        top: 10px;
    }
    /* #tableSales .el-table__footer .gutter {
        display: none
    } */
    </style>
    