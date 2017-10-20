<template>
        <div class='classLibrary'>
            <div class="crumbs">
                <el-breadcrumb separator="/">
                    <el-breadcrumb-item><i class="el-icon-my-yoncheguanli"></i> 熊猫到家</el-breadcrumb-item>
                    <el-breadcrumb-item class='ss'>库存管理</el-breadcrumb-item>
                </el-breadcrumb>
            </div>
            <div class='accou'>
                <div class="h1">
                    <h3 class='accountH2'>
                   库存管理
                    </h3>
                    <div class='oneSelect'>
                            <el-date-picker v-model="value1" type="year" placeholder="年份选择" @change="updateList" >
                                </el-date-picker>
                    </div>
                    <div class='oneSelect'>
                            <el-date-picker v-model="value2" type="month" placeholder="月份选择" @change="updateList" >
                                </el-date-picker>
                    </div>
                    <el-button type="primary" size="mid" class='buttonAdd' @click="createCh('aform')">导出表格</el-button>
                </div>
            </div>
            <div id="tableIM">
                <el-table :data="accountData" border style='width:100%'>
                    <el-table-column prop="title" label="产品型号">
                        <template scope="scope">
                            <span style='font-weight:600'>{{scope.row.title}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="kecheng_type" label="产品名称">
                    </el-table-column>
                    <el-table-column prop="year_num" label="产品级别">
                    </el-table-column>
                    <el-table-column prop="head_count" label="上月剩余库存量">
                    </el-table-column>
                    <el-table-column prop="tuition_price" label="生产入库量">
                    </el-table-column>
                    <el-table-column prop="teaching_price" label="发货量">
                    </el-table-column>
                    <el-table-column prop="book_price" label="本月剩余库存量">
                    </el-table-column>
                    <el-table-column prop="book_price" label="入库记录">
                            <template scope="scope">
                                    <div class='timesInv' @click='openTimesInv'>{{scope.row.head_count}}次</div>
                                    <div>最新入库{{scope.row.book_price}}</div>
                                </template>
                        </el-table-column>
                        <el-table-column label="操作" width='100'>
                                <template scope="scope">
                                    <el-button type="text" size="small" @click="openProduct(scope.$index, accountData)">生产入库</el-button>
                                </template>
                            </el-table-column>

                </el-table>
                <div class="block">
                    <el-pagination layout="prev, pager, next" :total="total" :current-page="currentPage" :page-size="pagesize" @current-change="handleCurrentChange">
                    </el-pagination>
                </div>
            </div>
            <el-dialog title="生产入库" :visible.sync="dialogFormVisible" :close-on-click-modal="no" custom-class='classLibraryDialog' top='25%' @close='resetD' size='tiny'>
                    <el-form :model="aform" :rules="rules2" ref="aform" style='padding-right:70px'>
                            <el-form-item label="产品型号" :label-width="formLabelWidth" >
                                   <div>111</div>
                                </el-form-item>
                                <el-form-item label="产品名称" :label-width="formLabelWidth" >
                                        <div>111</div>
                                    </el-form-item>
                                    <el-form-item label="产品级别" :label-width="formLabelWidth" >
                                            <div>111</div>
                                        </el-form-item>
                        <el-form-item label="生产入库量" :label-width="formLabelWidth" prop="title">
                            <el-input v-model="aform.title" placeholder='请输入生产入库量' style='width:180px'></el-input>
                        </el-form-item>
                    </el-form>
                    <div slot="footer" class="dialog-footer" style="text-align:center;margin-top:40px">
                        <el-button type="primary" @click="addAccount('aform')">确 定</el-button>
                        <el-button @click="dialogFormVisible = false">取 消</el-button>
                    </div>
                </el-dialog>
                <el-dialog title="入库记录" :visible.sync="dialogFormVisibleTime" :close-on-click-modal="no" custom-class='timesDialog' top='25%' @close='resetD' size='tiny'>
                   <div style="margin-bottom:20px">
                       <div v-for='item in timeData' style='margin-bottom:10px'>
                        <span style='margin-left:40px;margin-right:110px'>{{item.date}}</span>
                        <span>入库{{item.amount}}盒</span>
                    </div>
                </div>
                    <el-form style='border-top:1px solid gainsboro'>
                            <el-form-item label="产品型号" :label-width="formLabelWidth" >
                                   <div>111</div>
                                </el-form-item>
                                <el-form-item label="产品名称" :label-width="formLabelWidth" >
                                        <div>111</div>
                                    </el-form-item>
                                    <el-form-item label="产品级别" :label-width="formLabelWidth" >
                                            <div>111</div>
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
                    timeData:[{date:'2017-8-1 18:00',amount:'900'},{date:'2017-8-1 18:00',amount:'900'},{date:'2017-8-1 18:00',amount:'900'}],
                    rules2: {
                    title: [{
                        required: true,
                        message: '请输入生产入库量',
                        trigger: 'blur'
                    }]
                },
                    aform: {
                    id: '',
                    title: '',
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
                    formLabelWidth:'110px'

                }
            },
            methods: {
                openTimesInv(){
                    this.dialogFormVisibleTime = true;
                },
                addAccount(formName) { },
                resetD() {
                this.$refs['aform'].resetFields();
            },
                updateList() { //表格上方select change之后刷新表格
                    this.currentPage = 1;
                    this.fetchData();
                },
                createCh(formName) { //点击创建按钮
                    
    
                },
                openProduct(){
                    this.dialogFormVisible = true;
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
                let user = localStorage.getItem('user');
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
    .classLibraryDialog .el-dialog__body {
    padding: 20px 20px 0 20px;
}

.classLibraryDialog .el-dialog__footer {
    padding: 0 20px 15px;
}
.el-dialog .el-dialog__header {
    background-color: #1fb5ad;
    padding: 20px 20px 20px;
}

.el-dialog .el-dialog__title {
    color: white;
}
.timesInv{
color:#1fb5ad
}
.timesInv:hover{
    cursor: pointer;
}
.timesDialog .el-form-item{
    margin-bottom:0;
}
    </style>
    