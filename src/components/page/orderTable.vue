<template>
    <div class='classLibrary'>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-my-yoncheguanli"></i> 熊猫到家</el-breadcrumb-item>
                <el-breadcrumb-item class='ss'>订单报表</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class='accou'>
            <div class="h1">
                <h3 class='accountH2'>
               订单报表({{number}})
                </h3>
                <div class='oneSelect'>
                    <el-select v-model="value1" clearable placeholder="全部订单" @change="updateList">
                        <el-option label="全部订单" value="1"></el-option>
                        <el-option label="学员订单" value="2"></el-option>
                        <el-option label="手工订单" value="3"></el-option>
                    </el-select>
                </div>
                <div class='oneSelect'>
                    <el-select v-model="value2" clearable placeholder="产品级别" @change="updateList">
                        <el-option label="3+" value="1"></el-option>
                        <el-option label="5+" value="2"></el-option>
                    </el-select>
                </div>
                <div style="float:right;width:200px;margin-bottom: 10px;margin-right:5px">
                    <el-input placeholder="输入手机号或姓名" icon="search" v-model="input2" @keyup.enter.native="updateList" :on-icon-click="updateList"
                        style='margin-right:10px'> </el-input>
                </div>
            </div>
        </div>
        <div id="table2OT">
            <el-table :data="accountData" border style='width:100%'>
                <el-table-column prop="title" label="录入时间">
                    <template scope="scope">
                        <span style='font-weight:600'>{{scope.row.title}}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="kecheng_type" label="学员">
                </el-table-column>
                <el-table-column prop="year_num" label="校区">
                </el-table-column>
                <el-table-column prop="head_count" label="收件人">
                </el-table-column>
                <el-table-column prop="tuition_price" label="联系方式">
                </el-table-column>
                <el-table-column prop="teaching_price" label="收获地址">
                </el-table-column>
                <el-table-column prop="book_price" label="产品级别">
                </el-table-column>
                <el-table-column prop="book_price" label="订阅总期数">
                </el-table-column>
                <el-table-column prop="book_price" label="已发期数">
                        <template scope="scope">
                                <span style='color:#1fb5ad'>{{scope.row.book_price}}</span>
                            </template>
                </el-table-column>
                <el-table-column prop="book_price" label="订单状态">
                        <template scope="scope">
                                <span style='color:#1fb5ad'>{{scope.row.book_price}}</span>
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
                currentPage: 1, //页数
                pagesize: 15, //默认每页
                total: 0, //总页数
                accountData: [],
                input2:'',
                number:0
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

#table2OT .el-table td,
#table2OT .el-table th:not(.gutter) {
    padding: 5px 5px;
    text-align: center
}

#table2OT .el-table th>div,
#table2OT .el-table .cell {
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
</style>
