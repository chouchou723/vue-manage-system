<template>
    <div class='orderTable'>
        <!-- <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-my-yoncheguanli"></i> 熊猫到家</el-breadcrumb-item>
                <el-breadcrumb-item class='ss'>订单报表</el-breadcrumb-item>
            </el-breadcrumb>
        </div> -->
        <div class='orderTableA'>
            <div class="orderTableH1">
                <h3 class='orderTableH2'>
               订单明细报表({{number}})
                </h3>
                <div class='orderTableS' v-if='!code.includes("cc")'>
                    <el-select v-model="value1"  placeholder="全部订单" @change="updateList">
                        <el-option label="全部订单" value="2"></el-option>
                        <el-option label="学员订单" value="0"></el-option>
                        <el-option label="手工订单" value="1"></el-option>
                    </el-select>
                </div>
                <div class='orderTableS'>
                    <el-select v-model="value2" clearable placeholder="产品级别" @change="updateList">
                            <el-option label="3+" value="3"></el-option>
                            <el-option label="4+" value="4"></el-option>
                            <el-option label="5+" value="5"></el-option>
                            <el-option label="6+" value="6"></el-option>
                    </el-select>
                </div>
                <div class='orderTableS' v-if='code.includes("cc")'>
                        <el-select v-model="value3" clearable placeholder="地址完整情况" @change="updateList" style='width:140px'>
                            <el-option label="完整" value="1"></el-option>
                            <el-option label="不完整" value="0"></el-option>
                        </el-select>
                    </div>
                <div style="float:right;width:200px;margin-bottom: 10px;margin-right:5px">
                    <el-input placeholder="输入学员手机号或姓名" icon="search" v-model="input2" @keyup.enter.native="updateList" :on-icon-click="updateList"
                        style='margin-right:10px'> </el-input>
                </div>
            </div>
        </div>
        <div id="table2OT">
            <el-table :data="accountData" border style='width:100%' :row-style='rowStyle'>
                <el-table-column prop="created" label="录入时间" width='125'>
                    <template scope="scope">
                        <span style='font-weight:600'>{{scope.row.created}}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="child_name" label="学员" width='80'>
                </el-table-column>
                <el-table-column prop="schoolName" label="校区" width='160'>
                </el-table-column>
                <el-table-column prop="uname" label="收件人" width='80'>
                </el-table-column>
                <el-table-column prop="phone" label="联系方式"width='100'>
                </el-table-column>
                <el-table-column prop="address" label="收货地址">
                </el-table-column>
                <el-table-column prop="art_level" label="产品级别" width='80'>
                </el-table-column>
                <el-table-column prop="buy_qty" label="订阅总期数" width='80'>
                </el-table-column>
                <el-table-column prop="curr_send_num" label="已发期数" width='80'>
                    <template scope="scope">
                        <span @click='openInfo(scope.row.gohome_id)' class='orderTableCC' v-if='scope.row.curr_send_num!=0'>{{scope.row.curr_send_num}}</span>
                        <span v-else>0</span>
                    </template>
                </el-table-column>
                <el-table-column prop="order_status" label="订单状态" width='80'>
                        <template scope="scope">
                                <span :style='scope.row.order_status=="正常"?"color:#1fb5ad":scope.row.order_status=="已结束"?"color:#dc1919":"color:#dddddd"'>{{scope.row.order_status}}</span>
                            </template>
                </el-table-column>
            </el-table>
            <div class="orderTableBLOCK">
                <el-pagination layout="prev, pager, next" :total="total" :current-page="currentPage" :page-size="pagesize" @current-change="handleCurrentChange">
                </el-pagination>
            </div>
        </div>
        <el-dialog title="已发期数" :visible.sync="dialogFormVisibleInfo" :close-on-click-modal="no" custom-class='orderTableID' top='2%'
        size='small'>
        <el-collapse  @change="handleChange" accordion>
                <el-collapse-item v-for='sdata in sLIst' :title="sdata.create_at" :name="sdata.id">
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
                </el-collapse-item>
              </el-collapse>

        
    </el-dialog>
    </div>
</template>
<script>
var token
import {
    orderList,
    getShipmentLogistics,
    orderShipmentList
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
                value1:'2',
                value2:'',
                value3:'',
                no:false,
                currentPage: 1, //页数
                pagesize: 15, //默认每页
                total: 0, //总页数
                accountData: [],
                input2:'',
                number:0,
                code:'',
                dialogFormVisibleInfo:false,
                sLIst:[],
                stepData: [
                ],
                stepContent:{},
            }
        },
        methods: {
            handleChange(activeNames){
                // console.log(activeNames);
                if(activeNames){
                    let para = {
                        id:activeNames
                    }
                    getShipmentLogistics(token,para).then(res=>{
                        this.stepContent = res.data
                        this.stepData = this.stepContent.kuaidi.data? this.stepContent.kuaidi.data:[];
                        // console.log( this.stepContent)
                    })
                }
            },
            openInfo(data) {
                let para={
                    order_id:data
                }
                orderShipmentList(token,para).then(res=>{
                    this.sLIst = res.data
                }).then(()=>{

                    this.dialogFormVisibleInfo = true;
                })
            },
            rowStyle(row, index){
                    // console.log(row)
                    if(row.order_status=='已结束'){
                        return 'color:#dddddd'
                    }
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
                    types:this.value1,
                    level:this.value2,
                    addr:this.value3,
                    input:this.input2
                }
                orderList(token, para).then((res) => {
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
            let user = sessionStorage.getItem('user');
            this.code = JSON.parse(user).job ? JSON.parse(user).job.code : '';
            this.fetchData();

        },
}
</script>
<style>
.orderTableH1 .el-button--primary {
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
.orderTableBLOCK {
    text-align: center;
    margin-top: 10px;
}

.orderTableA {
    width: 100%;
    position: relative;
    height: 45px;
    background-color: white;
    /* margin-top: 30px; */
    padding-top: 10px;
    margin-bottom: 5px;
    border-radius: 5px;
}

.orderTableH2 {
    display: inline-block;
    /*margin-top: 20px;*/
    margin-bottom: 15px;
    padding-left: 10px
}

.orderTableS {
    display: inline-block;
    margin-bottom: 10px;
    margin-left: 10px;
    width: 120px
}
.orderTableS .el-date-editor.el-input{
    width:120px;
}
/* .buttonAdd {
    position: absolute;
    right: 10px;
    top: 10px;
} */
.orderTableCC{
    cursor: pointer;
    color:#1fb5ad;
}
.orderTable  ul li {
    list-style: none;
}

.orderTable   .track-rcol {
    width: 100%;
    border-bottom: 1px solid gainsboro;
    height: auto;
    overflow-y: auto;
}

.orderTable  .track-list {
    margin: 10px 20px 30px;
    padding-left: 5px;
    position: relative;
}

.orderTable  .track-list li {
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

.orderTable .track-list .onlyone {
    color: red;
    padding-top: 0;
    border-left-color: #fff;
}

.orderTable   .node-icon {
    position: absolute;
    left: -6px;
    top: 40.2%;
    width: 11px;
    height: 11px;
    background: url(../../../static/img/order-icons.png) -21px -72px no-repeat;
}

.orderTable  .first .node-icon,
.orderTable .onlyone .node-icon {
    background-position: 0px -72px;
}
.orderTable  .first::before {
    position: absolute;
    width:10px;
    height: 100%;
    top:-22px;
    left:-5px;
    background: white;
    content:''
}
.orderTable  .last::before {
    position: absolute;
    width:10px;
    height: 100%;
    bottom:-27px;
    left:-5px;
    background: white;
    content:''
}

.orderTable  .time {
    margin-right: 20px;
    position: relative;
    top: 2px;
    display: inline-block;
    vertical-align: middle;
    /* width: 114px;
     */
     flex:0 0 114px;
}

.orderTable   .txt {
    max-width: 600px;
    position: relative;
    top: 2px;
    display: inline-block;
    vertical-align: middle;
}

.orderTable  .first .time {
    color:red;
}

.orderTable .first .txt {
    color:red;
}

.orderTable  .cleargrey {
    position: absolute;
    bottom: -2px;
    left: -2px;
    width: 20px;
    height: 5px;
    background: #fff;
}
    .orderTable   .el-dialog .el-dialog__header {
        background-color: #1fb5ad;
        padding: 20px 20px 20px;
    }

    .orderTable  .el-dialog .el-dialog__title {
        color: white;
    }
</style>
