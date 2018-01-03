<template>
        <div class='deliveryManage'>
            <!-- <div class="crumbs">
                <el-breadcrumb separator="/">
                    <el-breadcrumb-item><i class="el-icon-my-yoncheguanli"></i> 熊猫到家</el-breadcrumb-item>
                    <el-breadcrumb-item class='ss'>发货管理</el-breadcrumb-item>
                </el-breadcrumb>
            </div> -->
            <div class='deliveryManageA'>
                <div class="deliMH">
                    <h3 class='deliveryManageA2'>
                   发货管理
                    </h3>
                    <div class='deliveryManageS'>
                            <el-date-picker v-model="value2" type="month" placeholder="月份选择" @change="updateList" :picker-options="pickerOptions0">
                                </el-date-picker>
                    </div>
                    <div class='deliveryManageSb'>

                        <el-upload
                        class="upload-demo"
                        :action="action" :headers='headers' :show-file-list='f'
                        name='excel'
                        :on-success='handleSuccess' :on-error='handleError'>
                        <el-button type="primary" size="mid" >导入发货确认单</el-button>
                      </el-upload>
                    </div>
                   
                    <el-button type="primary" size="mid" class='deliveryManageSbb' @click="outputD">导出发货单</el-button>
                </div>
            </div>
            <div id="deliveryManageT">
                <el-table :data="accountData" border style='width:100%'>
                    <el-table-column prop="schoolName" label="校区">
                    </el-table-column>
                    <el-table-column prop="child_name" label="学员">
                    </el-table-column>
                    <el-table-column prop="user_name" label="收件人">
                    </el-table-column>
                    <el-table-column prop="mobile" label="联系方式">
                    </el-table-column>
                    <el-table-column prop="address" label="收货地址">
                    </el-table-column>
                    <el-table-column prop="goods_sku" label="产品型号">
                    </el-table-column>
                    <el-table-column prop="goods_name" label="产品名称">
                    </el-table-column>
                    <el-table-column prop="create_at" label="发货时间">
                    </el-table-column>
                    <el-table-column prop="express_id" label="物流单号">
                            <template scope="scope">
                                    <span  @click='openInfo(scope.row.id)' class='deliveryManagec'>{{scope.row.express_id}}</span>
                                </template>
                        </el-table-column>
                </el-table>
                <div class="deliveryManageBlock">
                    <el-pagination layout="prev, pager, next" :total="total" :current-page="currentPage" :page-size="pagesize" @current-change="handleCurrentChange">
                    </el-pagination>
                </div>
            </div>
            <el-dialog title="物流信息" :visible.sync="dialogFormVisibleInfo" :close-on-click-modal="no" custom-class='deliveryManageID' top='9%'
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
        exportDelivery,
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
                    // action:'http://pandatest.dfth.com/api/v1/pandagohome/importInvoice',
                    action:'/api/v1/pandagohome/importInvoice',
                    pickerOptions0: {
                        disabledDate(time) {
                            return time.getTime() > Date.now() ;
                        }
                    },
                    stepData: [
                    ],
                    stepContent:{},
                    value2:'',
                    currentPage: 1, //页数
                    pagesize: 15, //默认每页
                    total: 0, //总页数
                    accountData: [],
                    f:false,
                    dialogFormVisibleInfo:false,
                    no:false,
                    headers: {
                    Authorization: token.Authorization
                },
                }
            },
            methods: {
                handleSuccess(response, file, fileList) {//上传图片成功
                this.$message.success('上传成功');
                this.fetchData();
            },
            handleError(err, file, fileList) {
                this.$message.error(error.message)
            },
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
                    alert(1)
    
                },
                outputD(){
                    exportDelivery(token).then((res)=>{
                        // let a = 'http://pandatest.dfth.com/download/stream?name=';
                        let a = '/download/stream?name=';
                        window.open( a+res.data.name)
                    })
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
    .deliMH .el-button--primary {
        background-color: #32a4d3;
        border-color: #32a4d3;
    }
    
    #deliveryManageT .el-table td,
    #deliveryManageT .el-table th:not(.gutter) {
        padding: 5px 5px;
        text-align: center
    }
    
    #deliveryManageT .el-table th>div,
    #deliveryManageT .el-table .cell {
        padding-left: 0;
        padding-right: 0;
    }
    .deliveryManageBlock {
        text-align: center;
        margin-top: 10px;
    }
    
    .deliveryManageA {
        width: 100%;
        position: relative;
        height: 45px;
        background-color: white;
        /* margin-top: 30px; */
        padding-top: 10px;
        margin-bottom: 5px;
        border-radius: 5px;
    }
    
    .deliveryManageA2 {
        display: inline-block;
        /*margin-top: 20px;*/
        margin-bottom: 15px;
        padding-left: 10px
    }
    
    .deliveryManageS {
        display: inline-block;
        margin-bottom: 10px;
        margin-left: 10px;
        width: 120px
    }
    .deliveryManageS .el-date-editor.el-input{
        width:120px;
    }
    .deliveryManageSb {
        position: absolute;
        right: 130px;
        top: 10px;
    }
    .deliveryManageSbb {
        position: absolute;
        right: 10px;
        top: 10px;
        z-index: 10
    }
    .upload-demo .el-upload--text{
        height: 36px;
    width: 166px;
    margin-right: 115px;
    margin-top:0;
    margin-left: 0
    }
    .deliveryManagec{
        cursor: pointer;
        color:#1fb5ad;
    }
   .deliveryManage .el-dialog .el-dialog__header {
        background-color: #1fb5ad;
        padding: 20px 20px 20px;
    }

    .deliveryManage .el-dialog .el-dialog__title {
        color: white;
    }

    .deliveryManageID .el-dialog__body {
        padding: 15px;
    }
    .deliveryManage  ul li {
        list-style: none;
    }

    .deliveryManage   .track-rcol {
        width: 100%;
        border-bottom: 1px solid gainsboro;
        height: auto;
        overflow-y: auto;
    }

    .deliveryManage  .track-list {
        margin: 10px 20px 30px;
        padding-left: 5px;
        position: relative;
    }

    .deliveryManage  .track-list li {
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
    .deliveryManage  .track-list .onlyone {
        color: red;
        padding-top: 0;
        border-left-color: #fff;
    }

    .deliveryManage   .node-icon {
        position: absolute;
        left: -6px;
        top: 40.9%;
        width: 11px;
        height: 11px;
        background: url(../../../static/img/order-icons.png) -21px -72px no-repeat;
    }

    .deliveryManage  .first .node-icon,
    .deliveryManage .onlyone .node-icon {
        background-position: 0px -72px;
    }
    .deliveryManage  .first::before {
        position: absolute;
        width:10px;
        height: 100%;
        top:-22px;
        left:-5px;
        background: white;
        content:''
    }
    .deliveryManage  .last::before {
        position: absolute;
        width:10px;
        height: 100%;
        bottom:-28px;
        left:-5px;
        background: white;
        content:''
    }

    .deliveryManage  .time {
        margin-right: 20px;
        position: relative;
        top: 2px;
        display: inline-block;
        vertical-align: middle;
        /* width: 114px;
         */
         flex:0 0 114px;
    }

    .deliveryManage   .txt {
        max-width: 600px;
        position: relative;
        top: 2px;
        display: inline-block;
        vertical-align: middle;
    }

    .deliveryManage  .first .time {
        /* margin-right: 20px; */
        color:red;
    }

    .deliveryManage .first .txt {
        /* max-width: 600px; */
        color:red;
    }

    .deliveryManage  .cleargrey {
        position: absolute;
        bottom: -2px;
        left: -2px;
        width: 20px;
        height: 5px;
        background: #fff;
    }
    </style>
    