<template>
        <div class="crumbs">
            <!-- <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-my-moban"></i> 资源管理</el-breadcrumb-item>
                <el-breadcrumb-item class='ss'>无需求资源</el-breadcrumb-item>
            </el-breadcrumb> -->
            <div class='wechaManage'>
                <h3 class="wechaManageH">
                    微信消息
                </h3>

                    <div style='float:left;margin:8px 2px 0 10px;font-weight:bold;padding:0 10px 12px 10px;' :class="[{WMAbottomB:activity},WMAhover]" @click='switchA'>
                        全部消息
                    </div>
                    <div style='float:left;margin-left:2px;margin-top:8px;width:5px;border-left:1px solid gainsboro;height:25px;'></div>
                    <div  style='float:left;margin-top:8px;font-weight:bold;padding:0 5px 12px 10px' :class="[{WMAbottomB:!activity},WMAhover]" @click='switchB'>
                        发送失败
                        <span v-if="number==='0'" style="font-size:14px;color: #bdb8b8;">加载中...</span>
               <span v-else>({{number}})</span>
                    </div>
                <div style="width:200px;position:absolute;right:110px;bottom:10px">
                        <el-input placeholder="输入手机号或接收人姓名" icon="search" v-model="input2" @keyup.enter.native="updateList" :on-icon-click="updateList"
                            style='margin-right:10px'> </el-input>
                    </div>
                <div class="wechaManageBU">
                    <el-button type="success" @click="openResource" >发送消息</el-button>
                </div>
            </div>
            <el-dialog title="发送消息" :visible.sync="dialogFormVisible" :close-on-click-modal="no" top='13%'  show-close custom-class='wechaManageBDD' @close='resetW'>
                <el-form :model="resourceSchool" id='actSchool1' :rules='ruleLaunch' ref="resourceSchool" label-width="90px">
                        <el-form-item label="内容类型" prop='radio'>
                                <el-radio v-model="resourceSchool.radio" label="1">系统维护通知</el-radio>
                            </el-form-item>
                            <el-form-item label="校区范围" prop='school'>
                                    <el-select v-model="resourceSchool.school" clearable multiple placeholder="选择校区" @change='getOnly'>
                                            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                                                </el-option>
                                    </el-select>
                                </el-form-item>
                                <el-form-item label="通知标题" prop='first'>
                                        <el-input v-model="resourceSchool.first" placeholder='请输入通知标题' class='wechaManageAU'></el-input>
                                    </el-form-item>
                                    <el-form-item label="系统名称" prop='keyword1'>
                                            <el-input v-model="resourceSchool.keyword1" placeholder='请输入系统名称' class='wechaManageAU'></el-input>
                                        </el-form-item>
                                        <el-form-item label="维护内容" prop='keyword2'>
                                                <el-input v-model="resourceSchool.keyword2" placeholder='请输入维护内容' class='wechaManageAU'></el-input>
                                            </el-form-item>
                                        <el-form-item label="时间" prop='keyword3'>
                                                <el-date-picker
                                                v-model="resourceSchool.keyword3"
                                                type="daterange"
                                                :clearable='no'
                                                :editable="no"
                                                placeholder="选择时间"
                                                :picker-options="pickerOptions0">
                                              </el-date-picker>
                                            </el-form-item>
                                            <el-form-item label="备注" prop='remark'>
                                                    <el-input v-model="resourceSchool.remark" placeholder='请输入备注' class='wechaManageAU'></el-input>
                                                </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button type="primary" :loading="writeL" @click="distributeResource('resourceSchool')">确 定</el-button>
                    <el-button @click="dialogFormVisible = false">取 消</el-button>
                </div>
            </el-dialog>
            <el-dialog title="失败记录" :visible.sync="dialogFormVisibleEdit" size="tiny" :close-on-click-modal="no" top='13%'  show-close custom-class='wechaManageBDD' @close='resetFail'>
                    <el-table :data="failList"  style="width: 100%;height:100%;max-height:500px;overflow-y:auto"    >
                            <el-table-column prop="child_name" label="接收人" >
                            </el-table-column>
                            <el-table-column prop="school" label="接收人校区" >
                            </el-table-column>
                        </el-table>
                    <!-- <div slot="footer" class="dialog-footer ">
                        <el-button type="primary" @click="distributeResource">确 定</el-button>
                        <el-button @click="dialogFormVisibleEdit = false">取 消</el-button>
                    </div> -->
                </el-dialog>
            <div id="table2NDRWM">
                <el-table :data="noEffData"  style="width: 100%"   >
                    <el-table-column prop="title" label="消息标题"  width='120'>
                    </el-table-column>
                    <el-table-column prop="content" label="消息内容" width='280'>
                            <template scope="scope">
                                    <!-- <div  style='margin:0 auto;width:auto'> -->
                                        <div v-html='scope.row.content' style="text-align:left;"></div>
                                    <!-- </div> -->
                                </template>
                    </el-table-column>
                    <el-table-column prop="sender" label="发送方" width='90'>
                    </el-table-column>
                    <el-table-column prop="child_name" label="接收人" >
                    </el-table-column>
                    <el-table-column prop="school" label="接收人校区" >
                    </el-table-column>
                    <el-table-column prop="send_time" label="发送时间"  width='120'>
                    </el-table-column>
                    <el-table-column prop="succ" label="发送状态">
                            <template scope="scope">
                                <div v-if="scope.row.wait>=1" style="color:#ada5a5">待发送({{scope.row.wait}})</div>
                                <div v-if="scope.row.succ>=1">发送成功({{scope.row.succ}})</div>
                                <div v-if="scope.row.faild==1" style='color:#e95c5c'>发送失败(1)</div>
                                <div v-if="scope.row.faild>1" style='color:#e95c5c'  class='WMAhover' @click='getFailList(scope.row.id)'>发送失败({{scope.row.faild}})  <span style='color:gainsboro'>></span></div>
                            </template>
                    </el-table-column>
                    <el-table-column prop="message_type" label="消息类型" width='80'>
                        </el-table-column>
                    <!-- <el-table-column label="操作" width='120'>
                        <template scope="scope">
                            <el-button type="text" size="small" @click="open2(scope.$index, accountData)" style='color:red'>中止</el-button>
                            <el-button type="text" size="small" @click="open(scope.$index, accountData)" >修改</el-button>
                        </template>
                    </el-table-column> -->
                </el-table>
            </div>
            <div class="wechaManageBB">
                  <!-- <span class="demonstration"></span> -->
                <el-pagination layout="prev, pager, next"  :total="total"  @current-change="handleCurrentChange"  :current-page="currentPage" :page-size="pagesize">
                </el-pagination>
            </div>
        </div>
    </template>
    <script>
        var user, token
        import {
            wxMsgList,
            campusList,
            condMassWX,
            WxFail
        } from '../../api/api';
        export default {
            data() {
                var isSpace = (rule, value, callback) => {
                var myreg1 = /^\s/;
                if(value==''){
                    callback('请输入通知标题')
                }else if (myreg1.test(value)) {
                    callback('请输入有效的通知标题')
                }else {
                    callback();
                }
            }
            var isSpace1 = (rule, value, callback) => {
                var myreg1 = /^\s/;
                if(value==''){
                    callback('请输入系统名称')
                }else if (myreg1.test(value)) {
                    callback('请输入有效的系统名称')
                }else {
                    callback();
                }
            }
            var isSpace2 = (rule, value, callback) => {
                var myreg1 = /^\s/;
                if(value==''){
                    callback('请输入备注')
                }else if (myreg1.test(value)) {
                    callback('请输入有效的备注')
                }else {
                    callback();
                }
            }
            var isSpace3 = (rule, value, callback) => {
                var myreg1 = /^\s/;
                if(value==''){
                    callback('请输入维护内容')
                }else if (myreg1.test(value)) {
                    callback('请输入有效的维护内容')
                }else {
                    callback();
                }
            }
            var timeRange = (rule, value, callback) => {
                if(value.length==0){
                    callback('请选择时间')
                }else {
                    callback();
                }
            }
            var nan = (rule, value, callback) => {
                if (value == '') {
                    callback('请选择')
                } else if (typeof value == 'number') {
                    callback();
                }else{
                    callback();
                    
                }
            }
                return {
                    writeL:false,
                    WMAhover:'WMAhover',
                    activity:true,
                    pickerOptions0: {
                        disabledDate(time) {
                            return time.getTime() < Date.now() - 8.64e7;
                        }
                    },
                    no: false,
                    code: '',
                    isFail:0,
                    input2:'',
                    resourceSchool: {
                        school: [],
                        first:'',
                        keyword1:'',
                        keyword2:'',                        
                        keyword3:[],
                        remark:'',
                        radio:'1',
    
                    },
                    ruleLaunch:{
                        first: [{
                        required: true,
                        // message: '请输入活动地点',
                        validator: isSpace,
                        trigger: 'blur'
                    }],
                    keyword1: [{
                        required: true,
                        // message: '请输入活动地点',
                        validator: isSpace1,
                        trigger: 'blur'
                    }],
                    keyword2: [{
                        required: true,
                        // message: '请输入活动地点',
                        validator: isSpace3,
                        trigger: 'blur'
                    }],
                    keyword3: [{
                        required: true,
                        // message: '请输入活动地点',
                        validator: timeRange,
                        trigger: 'blur'
                    }],
                    school: [{
                        required: true,
                        validator: nan,
                        message: '请选择校区范围',
                        trigger: 'change'
                    }],
                    remark: [{
                        required: true,
                        // message: '请输入活动地点',
                        validator: isSpace2,
                        trigger: 'blur'
                    }],
                },
                    dialogFormVisible: false,
                    dialogFormVisibleEdit: false,
                    total: 0,
                    number: '0',
                    noEffData: [],
                    // optionsTMK: [],
                    // valueT: '',
                    currentPage: 1, //页数
                    pagesize: 15, //默认每页
                    backSchool:[],
                    failList:[]
                }
            },
            methods: {
                resetFail(){
                    this.failList = []
                },
                resetW(){
                    this.writeL = false;
                },
                getOnly(val){//选全部校区时变换options
                    if(val.indexOf('all')>-1&&this.options.length!=1){
                        this.options = [{value:'all',label:'全部校区'}]
                        this.resourceSchool.school = ['all']
                    }else{
                        this.options = this.backSchool;
                    }
                },
                getFailList(id){//获取失败列表
                    let para={
                        id:id
                    }
                    WxFail(token,para).then(res=>{
                        // console.log(res)
                        this.failList = res.data
                    })
                    this.dialogFormVisibleEdit=true;
                },
                switchA(){//成功
                    if(this.activity==false){
                        this.activity=true;
                        this.isFail =0;
                        this.fetchData();
                    }
                },
                switchB(){//失败
                    if(this.activity==true){
                        this.activity=false;
                        this.isFail =1;
                        this.fetchData();                                              
                    }
                },
                openResource() { //发送消息
                    this.resourceSchool =   {
                        school: [],
                        first:'',
                        keyword1:'',
                        keyword2:'',                        
                        keyword3:[],
                        remark:'',
                        radio:'1',
                    }
                setTimeout(() => {
                    this.$refs['resourceSchool'].resetFields();
                }, 1);
                    this.dialogFormVisible = true
                },
                handleCurrentChange: function (val) { //换页
                    this.currentPage = val;this.backToTop();
                    this.fetchData();
                },
                updateList() {
                    this.isFail = 0;
                    this.currentPage = 1;
                    this.fetchData();
                },
                fetchData() {
                    let para = {
                        searchVal: this.input2,
                        fail: this.isFail,
                        page:this.currentPage
                    }
                    wxMsgList(token,para).then((res) => {
                        // console.log(res)
                        // this.number = res.data.total;
                        let a = res.data.list;
                        let c = res.data.lastpage * this.pagesize;
                        this.noEffData = a;
                        // console.log(this.noEffData)
                        this.total = parseInt(c);
                        this.number = res.data.fail_total;
                    })
                },
                distributeResource(formName) { //发送消息
                    this.$refs[formName].validate((valid) => { //替换提交服务
                    if (valid) {
                        let para = {...this.resourceSchool}
                        para.keyword3 = new Date(para.keyword3[0]).toLocaleDateString()+'至'+new Date(para.keyword3[1]).toLocaleDateString()
                        para.school = para.school.join(',')
                        this.writeL = true;
                        condMassWX(para, token).then(res => {
                            if (res.code == 0) {
        
                                this.fetchData();
                                this.$message.success('发送成功')
                                this.dialogFormVisible = false;
                                this.writeL = false;
                            } else {
                                this.$message.error(res.message);
                                this.writeL = false;
                            }
                        })

                    }
                    })
                }
            },
    
            beforeCreate() {
                user = sessionStorage.getItem('user');
                token = JSON.parse(user).token;
            },
            created() {
                // this.code = JSON.parse(user).job ? JSON.parse(user).job.code : '';
                this.fetchData();
                 let cam = {
                simple: '1'
            };
            campusList(cam, token).then((res) => {//获取校区
                let a = res.data;
                this.options = a.map(item => {
                    return {
                        value: item.id,
                        label: item.title
                    };
                });
                this.options.unshift({value:'all',label:'全部校区'})
                this.backSchool = {...this.options}
            })
                // this.noEffData=[{title:'停课通知',content:'张三<br>停课',status:[113,10]}]
            },
        //     computed: {
        //     ...mapGetters([
        //         'getmyNoDemandS'
        //         // ...
        //     ])
        // },
        }
    
    </script>
    <style>
        /* #table2NDR .el-table td,
        #table2NDR .el-table th:not(.gutter) {
            padding: 1px;
            text-align: center
        }
    
        #table2NDR .el-table th>div,
        #table2NDR .el-table .cell {
            padding-left: 0;
            padding-right: 0;
        } */
    
        .wechaManageBDD .el-dialog__header {
            background-color: #1fb5ad;
            padding: 20px 20px 20px;
        }
    
        .wechaManageBDD .el-dialog__title {
            color: white;
        }
    
        .wechaManageBB {
            text-align: center;
            margin-top: 10px;
        }
    
        .wechaManageH {
            float: left;
            margin-right: 5px;
            padding-left: 10px;
            margin-top:5px;
        }
    
        /* .studentReturnNoneed {
            float: left;
            width: 120px;
            margin-right: 10px;
        }
     */
        .wechaManage {
            width: 100%;
            position: relative;
            height: 46px;
            background-color: white;
            /* margin-top: 0; */
            padding-top: 10px;
            margin-bottom: 5px;
            border-radius: 5px;
        }
    
        .wechaManageBU {
            float: right;
            margin-right: 10px
        }
    
        /* .NDRfoot {
            text-align: center;
            margin-top: -24px
        } */
        .wechaManageAU {
            width: 382px
        }
        .top55  .el-time-panel__content::after,.top55 .el-time-panel__content::before{
            top:55%
        }
        /* .WMredwarn .el-message-box__header {
            background-color: #e95c5c;
            padding: 20px 20px 20px;
        }
    
        .WMredwarn .el-message-box__title {
            color: white;
        }
    
        .WMredwarn .el-button--primary {
            background-color: #e95c5c;
            border-color: #e95c5c;
        }
    
        .WMredwarn .el-button--primary:hover {
            background-color: #ff6d6d;
            border-color: #ff6d6d;
        } */
        .WMAbottomB{
            color:#1fb5ad;
            border-bottom:4px solid #1fb5ad;
        }
        .WMAhover:hover{
            cursor: pointer
        }
    </style>
    