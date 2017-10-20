<template>
        <div class='classLibrary'>
            <div class="crumbs">
                <el-breadcrumb separator="/">
                    <el-breadcrumb-item><i class="el-icon-my-yoncheguanli"></i> 熊猫到家</el-breadcrumb-item>
                    <el-breadcrumb-item class='ss'>产品库</el-breadcrumb-item>
                </el-breadcrumb>
            </div>
            <div class='accou'>
                <div class="h1">
                    <h3 class='accountH2'>
                            产品库
                    </h3>
                    <el-button type="primary" size="mid" class='buttonAdd1' @click="createCh('aform')">创建产品</el-button>
                    <el-button type="primary" size="mid" class='buttonAdd' @click="createCh('aform')">导出表格</el-button>
                </div>
                <el-dialog :title="alter" :visible.sync="dialogFormVisible" :close-on-click-modal="no" custom-class='classLibraryDialog' top='25%' @close='resetD' size='tiny'>
                    <el-form :model="aform" :rules="rules2" ref="aform" style='padding-right:70px'>
                        <el-form-item label="产品型号" :label-width="formLabelWidth" prop="title">
                                <el-input v-model="aform.title" placeholder='请输入产品型号' :style='{width:inputLabelWidth}'></el-input>
                            </el-form-item>
                        <el-form-item label="产品名称" :label-width="formLabelWidth" prop="title">
                            <el-input v-model="aform.title" placeholder='请输入产品名称' :style='{width:inputLabelWidth}'></el-input>
                        </el-form-item>
                        <el-form-item label="产品级别" :label-width="formLabelWidth" prop="title">
                                <el-select v-model="aform.title" clearable placeholder="产品级别" :style='{width:inputLabelWidth}'>
                                        <el-option label="3+" value="1"></el-option>
                                        <el-option label="5+" value="2"></el-option>
                                    </el-select>
                            </el-form-item>
                        <el-form-item label="产品教程链接地址" :label-width="formLabelWidth" prop="remark">
                            <el-input type="textarea" :autosize="{ minRows: 4, maxRows: 6}" placeholder="请输入产品教程链接地址" v-model="aform.remark">
                            </el-input>
                        </el-form-item>
                    </el-form>
                    <div slot="footer" class="dialog-footer" style="text-align:center;margin-top:40px">
                        <el-button type="primary" @click="addAccount('aform')">确 定</el-button>
                        <el-button @click="dialogFormVisible = false">取 消</el-button>
                    </div>
                </el-dialog>
            </div>
            <div id="table2PL">
                <el-table :data="accountData" border style='width:100%'>
                    <el-table-column prop="name" label="产品型号" width='280'>
                        <template scope="scope">
                            <span style='font-weight:600'>{{scope.row.title}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="title" label="产品名称">
                    </el-table-column>
                    <el-table-column prop="times" label="产品级别" width='80'>
                        </el-table-column>
                        <el-table-column prop="remark" label="产品教程链接地址" >
                                <template scope="scope">
                                        <span class='linkHover'>{{scope.row.remark}}</span>
                                    </template>
                            </el-table-column>
                    <el-table-column label="操作" width='280'>
                        <template scope="scope">
                            <el-button type="text" size="small" @click="editCh(scope.$index, accountData)">修改</el-button>
                            <el-button type="text" size="small" @click="open2(scope.$index, accountData)" class='classDel'>删除</el-button>
                        </template>
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
        getPromotionList,
        create_coupons,
        put_coupons,
        delete_coupons
    } from '../../api/api';
    export default {
        data() {
                return {
                    currentPage: 1, //页数
                    pagesize: 15, //默认每页
                    total: 0, //总页数
                    in : '', //修改时代表修改的index
                    no: false, //取消点击关闭
                    accountData: [],
                    number: 0,
                    aform: {
                        id: '',
                        title: '',
                        remark: '',
                    },
                    dialogFormVisible: false,
                    formLabelWidth: '91px',
                    inputLabelWidth: '200px',
                    rules2: {
                        title: [{
                            required: true,
                            message: '请输入优惠名称',
                            trigger: 'blur'
                        }],
                        remark: [{
                            required: true,
                            message: '请输入优惠理由',
                            trigger: 'blur'
                        }]
                    }
                }
            },
            methods: {
                createCh(formName) { //点击创建按钮
                    this.in = '';
                    this.aform.id = '';
                    this.aform.title = '';
                    this.aform.remark = ''
                    this.dialogFormVisible = true;
                },
                resetD() {
                    this.$refs['aform'].resetFields();
                },
                editCh(index, data) { //点击就修改
                    this.in = index;
                    this.aform.id = data[index].id;
                    this.aform.title = data[index].title;
                    this.aform.remark = data[index].remark
                    this.dialogFormVisible = true;
                },
                open2(index, data) { //删除课程
                    //ifthis.$alert('当前课程已有学员报名,无法删除', '删除课程', {
                    //     showConfirmButton: false,
                    //     type: 'warning',
                    //     customClass: 'classredwarn',
                    //     confirmButtonText: '确定'
                    // });
                    this.$confirm('是否确定要删除该优惠?', '删除优惠', {
                            customClass: 'classredwarn',
                            cancelButtonText: '取消',
                            confirmButtonText: '确定',
                            type: 'warning'
                        }).then(() => {
                            let para = {
                                id: data[index].id
                            }
                            delete_coupons(para, token).then(() => {
    
                                this.fetchData();
                            });
                            this.$message({
                                type: 'success',
                                message: '删除成功!'
                            });
                        })
    
                },
                addAccount(formName) { //点确定后添加优惠
                    this.$refs[formName].validate((valid) => {
                        let f = this.aform;
                        let i = this.in;
    
                        if (valid) {
                            if (i !== '') {
                                let para = f;
                                put_coupons(para, token).then(res => {
                                    if (res.code == 0) {
                                        this.$message({
                                            message: '修改成功',
                                            type: 'success'
                                        });
                                        this.fetchData();
                                    } else {
                                        this.$message({
                                            type: 'error',
                                            message: res.data
                                        });
                                    }
                                }).then(() => {
                                    this.dialogFormVisible = false;
                                });
                            } else {
                                let para = f;
                                create_coupons(para, token).then(res => {
                                    if (res.code == 0) {
                                        this.$message({
                                            message: '创建成功',
                                            type: 'success'
                                        });
                                        this.fetchData();
                                    } else {
                                        this.$message({
                                            type: 'error',
                                            message: res.data
                                        });
                                    }
                                }).then(() => {
                                    this.dialogFormVisible = false;
                                });
                            }
                            this.in = '';
    
                        } else {
                            console.log('error submit!!');
                            return false;
                        }
                    });
                },
                fetchData() {
                    let para = {
                        page: this.currentPage,
                    }
                    getPromotionList(token,para).then((res) => {
                        this.number = res.data.total;
                        let a = res.data.data;
                        let c = res.data.last_page * this.pagesize;
                        this.total = parseInt(c);
                        this.accountData = a;
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
            computed: {
                alter: function() {
                    if (this.in === '') {
                        return '创建产品'
                    }
                    return '修改产品'
                }
            }
    }
    </script>
    <style>
    .h1 .el-button--primary {
        background-color: #32a4d3;
        border-color: #32a4d3;
    }
    
    #table2PL .el-table td,
    #table2PL .el-table th:not(.gutter) {
        padding: 5px 5px;
        text-align: center
    }
    
    #table2PL .el-table th>div,
    #table2PL .el-table .cell {
        padding-left: 0;
        padding-right: 0;
    }
    
    #table2PL .classDel {
        color: #e95c5c;
    }
    
    .classredwarn .el-message-box__header {
        background-color: #e95c5c;
        padding: 20px 20px 20px;
    }
    
    .classredwarn .el-message-box__title {
        color: white;
    }
    
    .classredwarn .el-button--primary {
        background-color: #e95c5c;
        border-color: #e95c5c;
        text-align: center;
    }
    
    .classredwarn .el-message-box__content {
        padding: 40px 20px;
    }
    
    .classredwarn .el-message-box__btns {}
    
    .el-dialog .el-dialog__header {
        background-color: #1fb5ad;
        padding: 20px 20px 20px;
    }
    
    .el-dialog .el-dialog__title {
        color: white;
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
    
    
    .buttonAdd {
        position: absolute;
        right: 10px;
        top: 10px;
    }
    .buttonAdd1 {
        position: absolute;
        right: 110px;
        top: 10px;
    }
    .classLibraryDialog .el-dialog__body {
        padding: 20px 20px 0 20px;
    }
    
    .classLibraryDialog .el-dialog__footer {
        padding: 0 20px 15px;
    }
    .linkHover:hover{
        text-decoration: underline;
        cursor: pointer;
        color:#1fb5ad
    }

    </style>
    