<template>
        <div class='deliveryTable'>
            <!-- <div class="crumbs">
                <el-breadcrumb separator="/">
                    <el-breadcrumb-item><i class="el-icon-my-yoncheguanli"></i> 熊猫到家</el-breadcrumb-item>
                    <el-breadcrumb-item class='ss'>发货报表</el-breadcrumb-item>
                </el-breadcrumb>
            </div> -->
            <div class='deliveryTableA'>
                <div class="h1">
                    <h3 class='deliveryTableA2'>
                   发货报表
                    </h3>
                    <div class='deliveryTableS'>
                            <el-date-picker v-model="value2" type="month" placeholder="月份选择" @change="updateList" :editable="no"  :picker-options="pickerOptions0">
                                </el-date-picker>
                    </div>
                    <!-- <el-button type="primary" size="mid" class='buttonAdd' @click="createCh('aform')">导出表格</el-button> -->
                </div>
            </div>
            <div id="deliveryTableT">
                <el-table :data="accountData" border style='width:100%'>
                        <el-table-column prop="schoolName" label="校区">
                            </el-table-column>
                            <el-table-column prop="child_name" label="学员" width='80'>
                            </el-table-column>
                            <el-table-column prop="user_name" label="收件人" width='80'>
                            </el-table-column>
                            <el-table-column prop="mobile" label="联系方式" width='120'>
                            </el-table-column>
                            <el-table-column prop="address" label="收货地址" >
                            </el-table-column>
                            <el-table-column prop="goods_sku" label="产品型号">
                                    <template scope="scope">
                                        <div><span style='height:18px;line-height:18px;margin-right:8px;width:40px;display:inline-block;color:white;background:#3fcc30;border-radius:5px;'>实发</span>{{scope.row.goods_sku||'暂无'}}</div>                                   
                                           <div><span style='height:18px;line-height:18px;margin-right:8px;width:40px;display:inline-block;color:white;background:black;border-radius:5px;'>应发</span>{{scope.row.goods_sku||'暂无'}}</div>
                                        </template>
                            </el-table-column>
                            <el-table-column prop="goods_name" label="产品名称">
                                    <template scope="scope">
                                            <div><span style='height:18px;line-height:18px;margin-right:8px;width:40px;display:inline-block;color:white;background:#3fcc30;border-radius:5px;'>实发</span>{{scope.row.goods_name||'暂无'}}</div>                                   
                                            <div><span style='height:18px;line-height:18px;margin-right:8px;width:40px;display:inline-block;color:white;background:black;border-radius:5px;'>应发</span>{{scope.row.goods_name||'暂无'}}</div>
                                         </template>
                            </el-table-column>
                    <el-table-column prop="updated" label="发货时间">
                    </el-table-column>
                    <el-table-column prop="express_id" label="物流单号" width='120'>
                            <template scope="scope">
                                    <span  @click='openInfo(scope.row.id)' class='canClick'>{{scope.row.express_id}}</span>
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
            <div style="display:flex;;height:auto;border: 1px solid gainsboro;align-items:center">
                <!-- <div style="flex: 0 0 50px;text-align:center;height:100%;display: flex;align-items: center;justify-content: center;border-right:1px solid gainsboro">7月</div> -->
                <div style="display:flex;height:100%;flex:auto;flex-direction:column;justify-content:flex-start;">
                    <div style="height:50px;line-height:50px;font-size:18px;border-bottom:1px solid gainsboro;padding-left:25px">订单记录</div>
                    <div class="track-rcol">
                        <div class="track-list">
                            <ul>
                                <li v-for='(item,index) in stepData' v-if="stepData.length!=0" :class='stepData.length==1?"onlyone":index==stepData.length-1?"last":index==0?"first":""'>
                                    <i class="node-icon"></i>
                                    <span class="time">{{item.time.substring(0,16)}}</span>
                                    <span class="txt">{{item.context}}</span>
                                </li>
                                <div v-if="stepData.length==0" style="text-align:center">暂无数据</div>
                            </ul>
                            <div class='cleargrey'></div>
                        </div>
                    </div>

                    <div style='display:flex;padding:10px 25px;width:80%;justify-content: space-between;'>
                        <div >运单号:{{stepContent.express_id}}</div>
                        <div>物流公司:{{stepContent.express}}</div>
                        <div>客户电话:{{stepContent.kuaidi?stepContent.kuaidi.comcontact:''}}</div>
                    </div>
                    <div style='padding:0 25px 10px 25px;width:80%;'>

                        <div style="padding-bottom:10px">产品类型:{{stepContent.goods_sku}}</div>
                        <div style="padding-bottom:10px">产品名称:{{stepContent.goods_name}}</div>
                        <div style="padding-bottom:10px">收货地址:{{stepContent.address}}</div>
                        <div style="padding-left:62px"> {{stepContent.user_name}}  {{stepContent.mobile}}</div>
                    </div>
                </div>
            </div>
        </el-dialog>
        </div>
    </template>
    <script>
    var token
    import {
        shipmentList,
        getShipmentLogistics
    } from '../../api/api';
    export default {
        data() {
                // var nan = (rule, value, callback) => {
                //     if (typeof value == 'number') {
                //         callback();
                //     } else {
                //         callback('请选择课程类型')
                //     }
                // }
                return {
                    pickerOptions0: {
                        disabledDate(time) {
                            return time.getTime() > Date.now() ;
                        }
                    },
                    value2:'',
                    currentPage: 1, //页数
                    pagesize: 15, //默认每页
                    total: 0, //总页数
                    accountData: [],
                    dialogFormVisibleInfo:false,
                    no:false,
                    stepData: [
                ],
                stepContent:{},
                }
            },
            methods: {
                openInfo(id){
                    let para={
                        id:id
                    }
                    getShipmentLogistics(token,para).then(res=>{
                        this.stepContent = res.data
                        this.stepData = this.stepContent.kuaidi.data? this.stepContent.kuaidi.data:[];
                        // console.log( this.stepContent)
                    }).then(()=>{

                        this.dialogFormVisibleInfo = true;
                    })
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
                        month: this.value2?new Date(this.value2).toLocaleDateString():''
                    }
                    shipmentList(token, para).then((res) => {
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
    
            },
    }
    </script>
    <style>
    /* .deliveryTableA .h1 .el-button--primary {
        background-color: #32a4d3;
        border-color: #32a4d3;
    }
    
    #deliveryTableT .el-table td,
    #deliveryTableT .el-table th:not(.gutter) {
        padding: 5px 5px;
        text-align: center
    }
    
    #deliveryTableT .el-table th>div,
    #deliveryTableT .el-table .cell {
        padding-left: 0;
        padding-right: 0;
    } */
    #deliveryTableT .block {
        text-align: center;
        margin-top: 10px;
    }
    
    .deliveryTableA {
        width: 100%;
        position: relative;
        height: 45px;
        background-color: white;
        /* margin-top: 30px; */
        padding-top: 10px;
        margin-bottom: 5px;
        border-radius: 5px;
    }
    
    .deliveryTableA2 {
        display: inline-block;
        /*margin-top: 20px;*/
        margin-bottom: 15px;
        padding-left: 10px
    }
    
    .deliveryTableS {
        display: inline-block;
        margin-bottom: 10px;
        margin-left: 10px;
        width: 120px
    }
    .deliveryTableS .el-date-editor.el-input{
        width:120px;
    }
    /* .deliveryTable .buttonAdd {
        position: absolute;
        right: 10px;
        top: 10px;
    } */
    #deliveryTableT .canClick{
        color:#1fb5ad;
        cursor: pointer;
    }
 .deliveryTable   .el-dialog .el-dialog__header {
        background-color: #1fb5ad;
        padding: 20px 20px 20px;
    }

   .deliveryTable .el-dialog .el-dialog__title {
        color: white;
    }

   .deliveryTable .infoDialog .el-dialog__body {
        padding: 15px;
    }
    .deliveryTable  ul li {
        list-style: none;
    }

    .deliveryTable   .track-rcol {
        width: 100%;
        border-bottom: 1px solid gainsboro;
        height: auto;
        overflow-y: auto;
    }

    .deliveryTable  .track-list {
        margin: 10px 20px 30px;
        padding-left: 5px;
        position: relative;
    }

    .deliveryTable  .track-list li {
        position: relative;
        padding: 0 0 0 25px;
        line-height: 18px;
        border-left: 1px solid #d9d9d9;
        color: #999;
        display: flex;
        align-items: center;
        height: 40px;
        justify-content: start;
    }
    .deliveryTable .track-list .onlyone {
        color: red;
        padding-top: 0;
        border-left-color: #fff;
    }

    .deliveryTable   .node-icon {
        position: absolute;
        left: -6px;
        top: 42%;
        width: 11px;
        height: 11px;
        background: url(../../../static/img/order-icons.png) -21px -72px no-repeat;
    }

    .deliveryTable  .first .node-icon,
    .deliveryTable .onlyone .node-icon {
        background-position: 0px -72px;
    }
    .deliveryTable  .first::before {
        position: absolute;
        width:10px;
        height: 100%;
        top:-22px;
        left:-5px;
        background: white;
        content:''
    }
    .deliveryTable  .last::before {
        position: absolute;
        width:10px;
        height: 100%;
        bottom:-28px;
        left:-5px;
        background: white;
        content:''
    }

    .deliveryTable  .time {
        margin-right: 20px;
        position: relative;
        top: 2px;
        display: inline-block;
        vertical-align: middle;
        /* width: 114px;
         */
         flex:0 0 114px;
    }

    .deliveryTable   .txt {
        max-width: 600px;
        position: relative;
        top: 2px;
        display: inline-block;
        vertical-align: middle;
    }

    .deliveryTable  .first .time {
        color:red;
    }

    .deliveryTable .first .txt {
        color:red;
    }

    .deliveryTable  .cleargrey {
        position: absolute;
        bottom: -2px;
        left: -2px;
        width: 20px;
        height: 5px;
        background: #fff;
    }
    </style>
    