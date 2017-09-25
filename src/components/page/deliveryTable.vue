<template>
        <div class='classLibrary'>
            <div class="crumbs">
                <el-breadcrumb separator="/">
                    <el-breadcrumb-item><i class="el-icon-my-yoncheguanli"></i> 熊猫到家</el-breadcrumb-item>
                    <el-breadcrumb-item class='ss'>发货报表</el-breadcrumb-item>
                </el-breadcrumb>
            </div>
            <div class='accou'>
                <div class="h1">
                    <h3 class='accountH2'>
                   发货报表
                    </h3>
                    <div class='oneSelect'>
                            <el-date-picker v-model="value2" type="month" placeholder="月份选择" @change="updateList" >
                                </el-date-picker>
                    </div>
                    <el-button type="primary" size="mid" class='buttonAdd' @click="createCh('aform')">导出表格</el-button>
                </div>
            </div>
            <div id="table">
                <el-table :data="accountData" border style='width:100%'>
                    <el-table-column prop="title" label="校区">
                        <template scope="scope">
                            <span style='font-weight:600'>{{scope.row.title}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="kecheng_type" label="学员">
                    </el-table-column>
                    <el-table-column prop="year_num" label="收件人">
                    </el-table-column>
                    <el-table-column prop="head_count" label="联系方式">
                    </el-table-column>
                    <el-table-column prop="tuition_price" label="收货地址">
                    </el-table-column>
                    <el-table-column prop="teaching_price" label="产品型号">
                    </el-table-column>
                    <el-table-column prop="book_price" label="产品名称">
                    </el-table-column>
                    <el-table-column prop="book_price" label="物流单号">
                            <template scope="scope">
                                    <span style='color:#1fb5ad' @click='openInfo' class='canClick'>{{scope.row.book_price}}</span>
                                </template>
                        </el-table-column>
                </el-table>
                <div class="block">
                    <el-pagination layout="prev, pager, next" :total="total" :current-page="currentPage" :page-size="pagesize" @current-change="handleCurrentChange">
                    </el-pagination>
                </div>
            </div>
            <el-dialog title="物流信息" :visible.sync="dialogFormVisibleInfo" :close-on-click-modal="no" custom-class='infoDialog' top='9%'
            size='small'>
            <div style="display:flex;;height:550px;border: 1px solid gainsboro;align-items:center">
                <div style="display:flex;height:100%;flex:auto;flex-direction:column;justify-content:flex-start;">
                    <div style="height:50px;line-height:50px;font-size:18px;border-bottom:1px solid gainsboro;padding-left:25px">你的订单已签收</div>
                    <div class="track-rcol">
                        <div class="track-list">
                            <ul>
                                <li v-for='(item,index) in stepData' :class='stepData.length==1?"onlyone":index==stepData.length-1?"last":index==0?"first":""'>
                                    <i class="node-icon"></i>
                                    <span class="time">{{item.title}}</span>
                                    <span class="txt">{{item.content}}</span>
                                </li>
                            </ul>
                            <div class='cleargrey'></div>
                        </div>
                    </div>

                    <div style='display:flex;padding:10px 25px;width:80%;justify-content: space-between;'>
                        <div >运单号:111</div>
                        <div>物流公司:顺风</div>
                        <div>客户电话:95533</div>
                    </div>
                    <div style='padding:0 25px 10px 25px;width:80%;'>

                        <div style="padding-bottom:10px">产品类型:DFTH-EFEF-FE-FEF</div>
                        <div style="padding-bottom:10px">产品名称:俄方金额空间</div>
                        <div style="padding-bottom:10px">收获地址:上海市黄浦区北京西路201号世纪佳缘88号楼1808室   200030  </div>
                        <div style="padding-left:62px"> 刘科长  18689786654</div>
                    </div>
                </div>
            </div>
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
                return {stepData: [{
                        title: '2017-8-31 周一',
                        content: '13:44:13 卖家发货'
                    }, {
                        content: '13:44:13 卖家发货'
                    }, {
                        title: '2017-8-31 周一',
                        content: '13:44:13 卖家发货'
                    }, {
                        content: '13:44:13 卖家发货'
                    },
                    {
                        title: '2017-8-31 周一',
                        content: '13:44:13 卖家发货'
                    }, {
                        content: '13:44:13 卖家发货'
                    }, {
                        title: '2017-8-31 周一',
                        content: '13:44:13 卖家发货'
                    }, {
                        content: '13:44:13 卖家发货'
                    },
                    {
                        title: '2017-8-31 周一',
                        content: '13:44:13 卖家发货'
                    }, {
                        content: '13:44:13 卖家发货'
                    }, {
                        title: '2017-8-31 周一',
                        content: '13:44:13 卖家发货'
                    }, {
                        content: '13:44:13 卖家发货'
                    },
                    {
                        title: '2017-8-31 周一',
                        content: '13:44:13 卖家发货'
                    }, {
                        content: '13:44:13 卖家发货'
                    }, {
                        title: '2017-8-31 周一',
                        content: '13:44:13 卖家发货'
                    }, {
                        content: '13:44:13 卖家发货'
                    }
                ],
                    value1:'',
                    value2:'',
                    currentPage: 1, //页数
                    pagesize: 15, //默认每页
                    total: 0, //总页数
                    accountData: [],
                    dialogFormVisibleInfo:false,
                    no:false
                }
            },
            methods: {
                openInfo(){
                    this.dialogFormVisibleInfo = true;
                },
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
    
    #table .el-table td,
    #table .el-table th {
        padding: 5px 5px;
        text-align: center
    }
    
    #table .el-table th>div,
    #table .el-table .cell {
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
    .canClick{
        cursor: pointer;
    }
    .el-dialog .el-dialog__header {
        background-color: #1fb5ad;
        padding: 20px 20px 20px;
    }

    .el-dialog .el-dialog__title {
        color: white;
    }

    .infoDialog .el-dialog__body {
        padding: 15px;
    }
    ul li {
        list-style: none;
    }

    .track-rcol {
        width: 100%;
        border-bottom: 1px solid gainsboro;
        height: 350px;
        overflow-y: auto;
    }

    .track-list {
        margin: 10px 20px;
        padding-left: 5px;
        position: relative;
    }

    .track-list li {
        position: relative;
        padding: 0 0 0 25px;
        line-height: 18px;
        border-left: 1px solid #d9d9d9;
        color: #999;
        display: flex;
        align-items: center;
        height: 27px;
    }

    .track-list li.first {
        padding-top: 0;
        border-left-color: #fff;
    }

    .track-list li.last {
        color: red;
        padding-top: 0;
    }

    .track-list li.onlyone {
        color: red;
        padding-top: 0;
        border-left-color: #fff;
    }

    .track-list li .node-icon {
        position: absolute;
        left: -6px;
        top: 49%;
        width: 11px;
        height: 11px;
        background: url(http://demo.daimabiji.com/3531/img/order-icons.png) -21px -72px no-repeat;
    }

    .track-list li.first .node-icon {
        background-position: -21px -72px;
    }

    .track-list li.last .node-icon,
    .track-list li.onlyone .node-icon {
        background-position: 0 -72px;
    }

    .track-list li .time {
        margin-right: 20px;
        position: relative;
        top: 4px;
        display: inline-block;
        vertical-align: middle;
        width: 110px;
    }

    .track-list li .txt {
        max-width: 600px;
        position: relative;
        top: 4px;
        display: inline-block;
        vertical-align: middle;
    }

    .track-list li.first .time {
        margin-right: 20px;
    }

    .track-list li.first .txt {
        max-width: 600px;
    }

    .cleargrey {
        position: absolute;
        bottom: -2px;
        left: -2px;
        width: 20px;
        height: 5px;
        background: #fff;
    }
    </style>
    