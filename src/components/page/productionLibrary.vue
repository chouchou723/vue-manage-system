<template>
        <div class='productLibrary'>
            <!-- <div class="crumbs">
                <el-breadcrumb separator="/">
                    <el-breadcrumb-item><i class="el-icon-my-yoncheguanli"></i> 熊猫到家</el-breadcrumb-item>
                    <el-breadcrumb-item class='ss'>产品库</el-breadcrumb-item>
                </el-breadcrumb>
            </div> -->
            <div class='productLibraryA'>
                <div class="productLibraryH1">
                    <h3 class='productLibraryH2'>
                            产品库
                    </h3>
                    <el-button type="primary" size="mid" class='buttonAdd1' @click="createCh('aform')">创建产品</el-button>
                    <!-- <el-button type="primary" size="mid" class='buttonAdd' @click="createCh('aform')">导出表格</el-button> -->
                </div>
                <el-dialog :title="alter" :visible.sync="dialogFormVisible" :close-on-click-modal="no" custom-class='productLibraryDD' top='25%' @close='resetD' size='tiny'>
                    <el-form :model="aform" :rules="rules2" ref="aform" style='padding-right:70px'>
                        <el-form-item label="产品型号" :label-width="formLabelWidth" prop="sku">
                                <el-input v-model="aform.sku" placeholder='请输入产品型号' :style='{width:inputLabelWidth}'></el-input>
                            </el-form-item>
                        <el-form-item label="产品名称" :label-width="formLabelWidth" prop="goods_name">
                            <el-input v-model="aform.goods_name" placeholder='请输入产品名称' :style='{width:inputLabelWidth}'></el-input>
                        </el-form-item>
                        <el-form-item label="产品级别" :label-width="formLabelWidth" prop="level">
                                <el-select v-model="aform.level"  placeholder="产品级别" :style='{width:inputLabelWidth}'>
                                        <el-option label="3+" value="3"></el-option>
                                        <el-option label="4+" value="4"></el-option>
                                        <el-option label="5+" value="5"></el-option>
                                        <el-option label="6+" value="6"></el-option>
                                    </el-select>
                            </el-form-item>
                        <el-form-item label="产品教程链接地址" :label-width="formLabelWidth" prop="movie_url">
                            <el-input type="textarea" :autosize="{ minRows: 4, maxRows: 6}" placeholder="请输入产品教程链接地址" v-model="aform.movie_url">
                            </el-input>
                        </el-form-item>
                    </el-form>
                    <div slot="footer" class="dialog-footer" style="text-align:center;margin-top:40px">
                        <el-button type="primary" :loading='writeL' @click="addAccount('aform')">确 定</el-button>
                        <el-button @click="dialogFormVisible = false">取 消</el-button>
                    </div>
                </el-dialog>
            </div>
            <div>
                <el-table :data="accountData" border style='width:100%'>
                    <el-table-column prop="sku" label="产品型号" width='280'>
                        <template scope="scope">
                            <span style='font-weight:600'>{{scope.row.sku}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="goods_name" label="产品名称">
                    </el-table-column>
                    <el-table-column prop="level" label="产品级别" width='80'>
                        </el-table-column>
                        <el-table-column prop="movie_url" label="产品教程链接地址" >
                                <template scope="scope">
                                        <span class='linkHover' @click='openN(scope.row.movie_url)'>{{scope.row.movie_url}}</span>
                                    </template>
                            </el-table-column>
                    <el-table-column label="操作" width='100'>
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
        productAdd,
        productList,
        productDel
    } from '../../api/api';
    export default {
        data() {
                return {
                    writeL:false,
                    currentPage: 1, //页数
                    pagesize: 15, //默认每页
                    total: 0, //总页数
                    in : '', //修改时代表修改的index
                    no: false, //取消点击关闭
                    accountData: [],
                    number: '0',
                    aform: {
                        id: '',
                        sku: '',
                        goods_name: '',
                        level: '',
                        movie_url: '',
                    },
                    dialogFormVisible: false,
                    formLabelWidth: '91px',
                    inputLabelWidth: '200px',
                    rules2: {
                        sku: [{
                            required: true,
                            message: '请输入产品型号',
                            trigger: 'blur'
                        }],
                        goods_name: [{
                            required: true,
                            message: '请输入产品名称',
                            trigger: 'blur'
                        }],
                        level: [{
                            required: true,
                            message: '请选择产品级别',
                            trigger: 'change'
                        }],
                        movie_url: [{
                            required: true,
                            message: '请输入产品教程链接地址',
                            trigger: 'blur'
                        }]
                    }
                }
            },
            methods: {
                openN(url){
                    window.open(url)
                },
                createCh(formName) { //点击创建按钮
                    
                    this.dialogFormVisible = true;
                },
                resetD() {
                    this.in = '';
                    this.aform.level = '';
                    this.aform.id = '';
                    this.aform.sku = '';
                    this.aform.goods_name = '';
                    this.aform.movie_url = '';
                    this.$refs['aform'].resetFields();
                },
                editCh(index, data) { //点击就修改
                    if(data[index].total_stock>0){
                        this.$alert('该产品有库存量记录,无法修改', '修改提示', {
                            showConfirmButton: false,
                            type: 'warning',
                            customClass: 'productLibraryWarn',
                            confirmButtonText: '确定'
                        }).catch(()=>{

                        });
                    }else{
                        this.in = index;
                        this.aform.id = data[index].id;
                        this.aform.sku = data[index].sku;
                        this.aform.goods_name = data[index].goods_name;
                        this.aform.level = data[index].level;
                        this.aform.movie_url = data[index].movie_url
                        this.dialogFormVisible = true;
                    }
                },
                open2(index, data) { //删除
                    if(data[index].stock>0){

                        this.$alert('该产品有库存量记录,无法删除', '删除提示', {
                            showConfirmButton: false,
                            type: 'warning',
                            customClass: 'productLibraryWarn',
                            confirmButtonText: '确定'
                        }).catch(()=>{

                        });
                    }else{

                        this.$confirm('是否确定要删除该产品?', '删除产品', {
                                customClass: 'productLibraryWarn',
                                cancelButtonText: '取消',
                                confirmButtonText: '确定',
                                type: 'warning'
                            }).then(() => {
                                let para = {
                                    product_id: data[index].id
                                }
                                productDel(para, token).then((res) => {
                                    if(res.code==0){

                                        this.$message({
                                            type: 'success',
                                            message: '删除成功!'
                                        });
                                        this.fetchData();
                                    }else{
                                        this.$message.error(res.data)
                                    }
                                });
                            }).catch(()=>{

                        });
                    }
    
                },
                addAccount(formName) { //点确定后
                    this.$refs[formName].validate((valid) => {
                        let f = this.aform;
                        let i = this.in;
    
                        if (valid) {
                            this.writeL = true;
                            if (i !== '') {
                                let para = f;
                                productAdd(para, token).then(res => {
                                    if (res.code == 0) {
                                        this.$message({
                                            message: '修改成功',
                                            type: 'success'
                                        });
                                        this.fetchData();
                                        this.writeL = false;
                                    } else {
                                        this.$message({
                                            type: 'error',
                                            message: res.data
                                        });
                                        this.writeL = false;
                                    }
                                }).then(() => {
                                    this.dialogFormVisible = false;
                                });
                            } else {
                                let para = f;
                                productAdd(para, token).then(res => {
                                    if (res.code == 0) {
                                        this.$message({
                                            message: '创建成功',
                                            type: 'success'
                                        });
                                        this.fetchData();
                                        this.writeL = false;
                                    } else {
                                        this.$message({
                                            type: 'error',
                                            message: res.data
                                        });
                                        this.writeL = false;
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
                    productList(token,para).then((res) => {
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
                let user = sessionStorage.getItem('user');
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
    .productLibraryH1 .el-button--primary {
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
    
    .productLibraryWarn .el-message-box__header {
        background-color: #e95c5c;
        padding: 20px 20px 20px;
    }
    
    .productLibraryWarn .el-message-box__title {
        color: white;
    }
    
    .productLibraryWarn .el-button--primary {
        background-color: #e95c5c;
        border-color: #e95c5c;
        text-align: center;
    }
    
    .productLibraryWarn .el-message-box__content {
        padding: 40px 20px;
    }
    
  .productLibrary  .el-dialog .el-dialog__header {
        background-color: #1fb5ad;
        padding: 20px 20px 20px;
    }
    
  .productLibrary  .el-dialog .el-dialog__title {
        color: white;
    }
    
  .productLibrary  .block {
        text-align: center;
        margin-top: 10px;
    }
    
    .productLibraryA {
        width: 100%;
        position: relative;
        height: 45px;
        background-color: white;
        /* margin-top: 30px; */
        padding-top: 10px;
        margin-bottom: 5px;
        border-radius: 5px;
    }
    
    .productLibraryH2 {
        display: inline-block;
        margin-top: 5px;
        margin-bottom: 15px;
        padding-left: 10px
    }
    
    
    .productLibrary .buttonAdd {
        position: absolute;
        right: 10px;
        top: 10px;
    }
   .productLibrary  .buttonAdd1 {
        /* position: absolute;
        right: 110px;
        top: 10px; */
        float:right;
        margin-right: 5px;
    }
    .productLibraryDD .el-dialog__body {
        padding: 20px 20px 0 20px;
    }
    
    .productLibraryDD .el-dialog__footer {
        padding: 0 20px 15px;
    }
   .productLibrary .linkHover{
        color:#1fb5ad
        
    }
  .productLibrary  .linkHover:hover{
        text-decoration: underline;
        cursor: pointer;
        color:#1fb5ad
    }

    </style>
    