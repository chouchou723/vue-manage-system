<template>
    <div class='orderManage'>
        <!-- <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-my-yoncheguanli"></i> 熊猫到家</el-breadcrumb-item>
                <el-breadcrumb-item class='ss'>订单管理</el-breadcrumb-item>
            </el-breadcrumb>
        </div> -->
        <div class='orderManageA'>
            <div class="orderManageh1">
                <h3 class='orderManageA2'>
                    订单管理
                    <span v-if="number==='0'" style="font-size:14px;color: #bdb8b8;">加载中...</span>
               <span v-else>({{number}})</span>
                </h3>
                <div class='oneSelectOM'>
                    <el-select v-model="value1"  placeholder="全部订单" @change="updateList">
                        <el-option label="全部订单" value="2"></el-option>
                        <el-option label="学员订单" value="0"></el-option>
                        <el-option label="手工订单" value="1"></el-option>
                    </el-select>
                </div>
                <div class='oneSelectOM'>
                    <el-select v-model="value2" clearable placeholder="产品级别" @change="updateList">
                            <el-option label="3+" value="3"></el-option>
                            <el-option label="4+" value="4"></el-option>
                            <el-option label="5+" value="5"></el-option>
                            <el-option label="6+" value="6"></el-option>
                    </el-select>
                </div>
                <div class='oneSelectOM'>
                    <el-select v-model="value3" clearable placeholder="地址完整情况" @change="updateList">
                        <el-option label="完整" value="1"></el-option>
                        <el-option label="不完整" value="0"></el-option>
                    </el-select>
                </div>
                <div style="float:right;width:200px;margin-bottom: 10px;margin-right:5px">
                    <el-input placeholder="输入手机号或姓名" icon="search" v-model="input2" @keyup.enter.native="updateList" :on-icon-click="updateList"
                        style='margin-right:10px'> </el-input>
                </div>
                <el-button type="primary" size="mid" class='orderManageBA' @click="createCh('aform')">添加订单</el-button>
            </div>
        </div>
        <div id="table2OM">
            <el-table :data="accountData" border style='width:100%'>
                <el-table-column prop="created" label="录入时间" width='125'>
                    <template scope="scope">
                        <span style='font-weight:600'>{{scope.row.created}}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="child_name" label="学员">
                </el-table-column>
                <el-table-column prop="mobile" label="报名电话">
                </el-table-column>
                <el-table-column prop="schoolName" label="校区">
                </el-table-column>
                <el-table-column prop="uname" label="收件人">
                </el-table-column>
                <el-table-column prop="phone" label="联系方式">
                </el-table-column>
                <el-table-column prop="address" label="收货地址">
                </el-table-column>
                <el-table-column prop="art_level" label="产品级别">
                </el-table-column>
                <el-table-column prop="buy_qty" label="订阅总期数">
                </el-table-column>
                <el-table-column prop="curr_send_num" label="已发期数">
                    <template scope="scope">
                        <span  @click='openInfo(scope.row.gohome_id)' class='orderManageCC' v-if='scope.row.curr_send_num!=0'>{{scope.row.curr_send_num}}</span>
                        <span v-else>0</span>
                    </template>
                </el-table-column>
                <el-table-column label="操作" width='120'>
                    <template scope="scope">
                        <el-button type="text" size="small" @click="editCh(scope.$index, scope.row)" v-if="!scope.row.child_name">修改</el-button>
                        <el-button type="text" size="small" @click="open2(scope.$index, scope.row)" class='classDel' v-if="!scope.row.child_name">退订</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="orderManageBlock">
                <el-pagination layout="prev, pager, next" :total="total" :current-page="currentPage" :page-size="pagesize" @current-change="handleCurrentChange">
                </el-pagination>
            </div>
        </div>
        <el-dialog :title="alter" :visible.sync="dialogFormVisible" :close-on-click-modal="no" custom-class='orderManageCLD'
            top='19%' @close='resetD' >
            <el-form :model="aform" ref="aform" :rules="rules2">
                <el-form-item label="收件人姓名" :label-width="formLabelWidth" prop="user_name">
                    <el-input v-model="aform.user_name" placeholder='请输入收件人姓名' :style='{width:inputLabelWidth}'></el-input>
                </el-form-item>
                <el-form-item label="联系方式" :label-width="formLabelWidth" prop="mobile">
                    <el-input v-model="aform.mobile" placeholder='请输入联系方式' :style='{width:inputLabelWidth}' :maxlength='mlength'></el-input>
                </el-form-item>
                <!-- <el-form-item label="收货地址" :label-width="formLabelWidth" prop="add">
                    <el-input v-model="aform.add" auto-complete="off" placeholder='请输入收货地址' :style='{width:inputLabelWidth}'></el-input>
                </el-form-item> -->
                <el-form-item label="收货地址" required  :label-width="formLabelWidth">
                    <el-form-item prop="city" class='orderManageAU142'>
                        <el-select v-model="aform.city" filterable placeholder="请选择城市" @change='getRegion' :style='{width:inputLabelWidth}'>
                            <el-option v-for="item in cities" :key="item.id" :label="item.city_name" :value="item.id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item prop="region" class='orderManageAU142'>
                        <el-select v-model="aform.region" placeholder="请选择城区" >
                            <el-option v-for="item in regions" :key="item.id" :label="item.city_name" :value="item.id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item prop="address" class='orderManageAU142'>
                        <el-input v-model="aform.address" placeholder='请输入具体地址' ></el-input>
                    </el-form-item>
                </el-form-item>
                <el-form-item label="订阅期数" :label-width="formLabelWidth" prop="qty">
                    <el-select v-model="aform.qty"  placeholder="订阅期数" :style='{width:inputLabelWidth}'>
                        <el-option label="1" value="1" v-if='this.aform.curr_send_num<1'></el-option>
                        <el-option label="3" value="3" v-if='this.aform.curr_send_num<3'></el-option>
                        <el-option label="6" value="6" v-if='this.aform.curr_send_num<6'></el-option>
                        <el-option label="12" value="12" v-if='this.aform.curr_send_num<12'></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="产品级别" :label-width="formLabelWidth" prop="level">
                    <el-select v-model="aform.level"  placeholder="产品级别" :style='{width:inputLabelWidth}' :disabled='this.in!=""&&this.aform.curr_send_num>0'>
                        <el-option label="3+" value="3"></el-option>
                        <el-option label="4+" value="4"></el-option>
                        <el-option label="5+" value="5"></el-option>
                        <el-option label="6+" value="6"></el-option>
                    </el-select>
                </el-form-item>
                <!-- <el-form-item :label-width="formLabelWidth">
                    <el-checkbox v-model="aform.checked">发货规则</el-checkbox>
                </el-form-item> -->
            </el-form>
            <div slot="footer" class="dialog-footer" style="text-align:center;margin-top:40px">
                <el-button type="primary" :loading='writeL' @click="addAccount('aform')">确 定</el-button>
                <el-button @click="dialogFormVisible = false">取 消</el-button>
            </div>
        </el-dialog>
        <el-dialog title="已发期数" :visible.sync="dialogFormVisibleInfo" :close-on-click-modal="no" custom-class='orderManageID' top='2%'
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
        cityList,
        addOrders,
        orderList,
        orderRefund,
        orderInfo,
        orderShipmentList,
        getShipmentLogistics
    } from '../../api/api';
    export default {
        data() {
            var nan = (rule, value, callback) => {
                if (typeof value == 'number') {
                    callback();
                } else {
                    callback('请选择')
                }
            }
            var isPName = (rule, value, callback) => {
                var myreg = /^[\u4e00-\u9fa5a-zA-Z]+$/;
                if (value == '') {
                    callback('请输入收件人姓名')
                } else if (!myreg.test(value)) {
                    callback('请输入有效的收件人姓名');
                } else {
                    callback();
                }
            }
            var isPhone = (rule, value, callback) => {
                var myreg = /^(((1[0-9]{1}))+\d{9})$/;
                if (value == '') {
                    callback('不能为空且必须唯一')
                } else if (!myreg.test(value)) {
                    callback('请输入有效手机号');
                } else {
                    // let para = {
                    //     search: value
                    // }
                    // searchResource(para, token).then(res => {
                    //     if (res.data.data.length != 0) {
                    //         callback('此手机号码已存在');
                    //     } else {
                            callback();

                    //     }
                    // })
                }
            }
            return {
                writeL:false,
                sLIst:[],
                stepData: [
                ],
                stepContent:{},
                in: '',
                mlength:11,
                value1: '2',
                value2: '',
                value3: '',
                cities: [],
                regions: [],
                currentPage: 1, //页数
                pagesize: 15, //默认每页
                total: 0, //总页数
                accountData: [],
                input2: '',
                number: '0',
                dialogFormVisible: false,
                dialogFormVisibleInfo: false,
                no: false,
                aform: {
                    user_name: '',
                    mobile: '',
                    city: '',
                    region: '',
                    address: '',
                    qty: '',
                    level: '',
                    curr_send_num:0                
                },
                rules2: {
                    user_name: [{
                        required: true,
                        // message: '请输入收件人姓名',
                        validator: isPName,
                        trigger: 'blur'
                    }],
                    mobile: [{
                        required: true,
                        validator: isPhone,
                        // message: '请输入联系方式',
                        trigger: 'blur'
                    }],
                    city: [{
                        required: true,
                        validator: nan,
                        trigger: 'change'
                    }, ],
                    region: [{
                        required: true,
                        validator: nan,
                        trigger: 'change'
                    }],
                    address: [{
                        required: true,
                        message: '请输入具体地址',
                        trigger: 'blur'
                    }, ],
                    qty: [{
                        required: true,
                        message: '请选择订阅期数',
                        trigger: 'change'
                    }],
                    level: [{
                        required: true,
                        message: '请输入产品级别',
                        trigger: 'change'
                    }],
                },
                formLabelWidth: '120px',
                inputLabelWidth: '140px',
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
            addAccount(formName){//提交修改订单
                this.$refs[formName].validate((valid) => {
                    if (valid ) {
                        this.writeL = true;
                        let para = {...this.aform}
                        if(this.in==''){
                            addOrders(para,token).then((res)=>{
                                if(res.code==0){
                                    this.$message.success('添加成功');
                                    this.fetchData();
                                    this.writeL = false;
                                    this.dialogFormVisible = false;
                                }else{
                                    this.$message.error(res.data);
                                    this.writeL = false;
                                }
                            })
                        }else{
                            para.id=this.in;
                            addOrders(para,token).then((res)=>{
                                if(res.code==0){
                                    this.$message.success('修改成功');
                                    this.fetchData();
                                    this.dialogFormVisible = false;
                                    this.writeL = false;
                                }else{
                                    this.$message.error(res.data);
                                    this.writeL = false;
                                }
                            })
                        }
                    }
                })
            },
            getRegion() {
                this.aform.region = '';
                let para = {
                    pid: this.aform.city
                }
                cityList(token, para).then((res) => {
                    // console.log(res)
                    this.regions = res.data
                })
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
            resetD() {
                this.in = '';
                this.aform= {
                    user_name: '',
                    mobile: '',
                    city: '',
                    region: '',
                    address: '',
                    qty: '',
                    level: ''  ,
                    curr_send_num:0                
                                      
                };
                this.$refs['aform'].resetFields();

            },
            open2(index, data) { //删除账号
                let a = '该客户还有'+(data.buy_qty-data.curr_send_num)+'期产品未发,退订后将从下一期停止发货,是否确定要退订?'
                this.$confirm(a, '退订提示', {
                    customClass: 'orderManageredwarn',
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    let para = {
                        id: data.gohome_id//不确定
                    }
                    orderRefund(token,para).then((res) => {
                        if(res.code==0){
                            this.$message({
                            type: 'success',
                            message: '退订成功!'
                        });
                            this.fetchData();
                        }else{
                            this.$message({
                            type: 'error',
                            message: res.data
                        });
                        }
                    })
                }).catch(() => {
                //   this.$message({
                //     type: 'info',
                //     message: '已取消删除'
                //   });          
                });
            },
            updateList() { //表格上方select change之后刷新表格
                this.currentPage = 1;
                this.fetchData();
            },
            createCh(formName) { //点击创建按钮
                this.dialogFormVisible = true;

            },
            editCh(index, row) {
                let data = {...row}
                this.in = data.gohome_id;//不确定
                let para={
                    id:data.gohome_id
                }
                orderInfo(token,para).then(res=>{
                    let data = res.data;

                    // console.log(data)
                    this.aform= {
                        user_name: data.uname,
                        mobile: data.phone,
                        city: data.city_id-0,
                        region: data.region_id-0,
                        address: data.address,
                        qty: data.buy_qty,
                        level: data.art_level,
                        curr_send_num:data.curr_send_num                 
                    };
                    this.getRegion();
                    setTimeout(() => {
                        this.aform.region = data.region_id-0;
                        
                    }, 1);
                }).then(()=>{

                    this.dialogFormVisible = true;
                })

            },
            fetchData() {
                let para = {
                    page: this.currentPage,
                    pid: this.value,
                    types:this.value1,
                    level:this.value2,
                    addr:this.value3,
                    input:this.input2,
                }
                orderList(token, para).then((res) => {
                    this.number = res.data.total;
                    let a = res.data;
                    let c = res.data.last_page * this.pagesize;
                    this.total = parseInt(c);
                    this.accountData = a.data;
                })

            },
            handleCurrentChange: function (val) { //变更页数
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
            cityList(token).then((res) => {
                // console.log(res)
                this.cities = res.data
            })

        },
        computed: {
            alter: function () {
                if (this.in === '') {
                    return '添加订单'
                }
                return '修改订单'
            }
        }
    }

</script>
<style>
    .orderManageh1 .el-button--primary {
        background-color: #32a4d3;
        border-color: #32a4d3;
    }

    #table2OM .el-table td,
    #table2OM .el-table th:not(.gutter) {
        padding: 5px 5px;
        text-align: center
    }

    #table2OM .el-table th>div,
    #table2OM .el-table .cell {
        padding-left: 0;
        padding-right: 0;
    }

    .orderManageBlock {
        text-align: center;
        margin-top: 10px;
    }

    .orderManageA {
        width: 100%;
        position: relative;
        height: 45px;
        background-color: white;
        /* margin-top: 30px; */
        padding-top: 10px;
        margin-bottom: 5px;
        border-radius: 5px;
    }

    .orderManageA2 {
        display: inline-block;
        /*margin-top: 20px;*/
        margin-bottom: 15px;
        padding-left: 10px
    }

    .oneSelectOM {
        display: inline-block;
        margin-bottom: 10px;
        margin-left: 10px;
        width: 130px
    }

    .oneSelectOM .el-date-editor.el-input {
        width: 120px;
    }

    .orderManage .orderManageBA {
        position: absolute;
        left: 586px;
        top: 10px;
    }

    .orderManage .classDel {
        color: #dc1919
    }
    .orderManage .classDel:hover {
        color: #f55656
    }
    .orderManageCLD .el-dialog__body {
        padding: 20px 20px 0 20px;
    }

    .orderManageCLD .el-dialog__footer {
        padding: 0 20px 15px;
    }

  .orderManage  .el-dialog .el-dialog__header {
        background-color: #1fb5ad;
        padding: 20px 20px 20px;
    }

    .orderManage .el-dialog .el-dialog__title {
        color: white;
    }

    .orderManageID .el-dialog__body {
        padding: 15px;
    }
.orderManageCC{
    cursor: pointer;
    color:#1fb5ad;
}
.orderManage  ul li {
    list-style: none;
}

.orderManage   .track-rcol {
    width: 100%;
    border-bottom: 1px solid gainsboro;
    height: auto;
    overflow-y: auto;
}

.orderManage  .track-list {
    margin: 10px 20px 30px;
    padding-left: 5px;
    position: relative;
}

.orderManage  .track-list li {
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
.orderManage  .track-list .onlyone {
    color: red;
    padding-top: 0;
    border-left-color: #fff;
}

.orderManage   .node-icon {
    position: absolute;
    left: -6px;
    top: 40.2%;
    width: 11px;
    height: 11px;
    background: url(../../../static/img/order-icons.png) -21px -72px no-repeat;
}

.orderManage  .first .node-icon {
    background-position: 0px -72px;
}
.orderManage  .first::before {
    position: absolute;
    width:10px;
    height: 100%;
    top:-22px;
    left:-5px;
    background: white;
    content:''
}
.orderManage  .last::before {
    position: absolute;
    width:10px;
    height: 100%;
    bottom:-27px;
    left:-5px;
    background: white;
    content:''
}
.orderManage .last .node-icon,
.orderManage .onlyone .node-icon {
    background-position: -21px -72px;
}

.orderManage  .time {
    margin-right: 20px;
    position: relative;
    top: 2px;
    display: inline-block;
    vertical-align: middle;
    /* width: 114px;
     */
     flex:0 0 114px;
}

.orderManage   .txt {
    max-width: 600px;
    position: relative;
    top: 2px;
    display: inline-block;
    vertical-align: middle;
}

.orderManage  .first .time {
    color:red;
}

.orderManage .first .txt {
    color:red;
}

.orderManage  .cleargrey {
    position: absolute;
    bottom: -2px;
    left: -2px;
    width: 20px;
    height: 5px;
    background: #fff;
}
    .orderManageAU142 {
        width: 142px;
        margin-right: 30px;
        float: left
    }
     .orderManageredwarn .el-message-box__header {
        background-color: #e95c5c;
        padding: 20px 20px 20px;
    }

      .orderManageredwarn .el-message-box__title {
        color: white;
    }

     .orderManageredwarn .el-button--primary {
        background-color: #e95c5c;
        border-color: #e95c5c;
    }

     .orderManageredwarn .el-button--primary:hover {
        background-color: #ff6d6d;
        border-color: #ff6d6d;
    }
</style>
