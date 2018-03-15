<template>
        <div class="SMSACR">
            <!-- <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-my-moban"></i> 资源管理</el-breadcrumb-item>
                <el-breadcrumb-item class='ss'>无需求资源</el-breadcrumb-item>
            </el-breadcrumb> -->
            <div class='smsManage'>
                <h3 class="smsManageH">
                    短信管理
                </h3>
                <div style='color:rgb(31, 61, 60);float:left;padding:9px 0 12px;'>(短信余额</div>
                <div style='color: #d4be15;float:left;padding:12px 0 12px;' v-if="number1==='0'">...</div>
                <div style='color: #d4be15;float:left;padding:12px 0 12px;' v-else>{{number1}}</div>
                <div style='color:rgb(31, 61, 60);float:left;padding:9px 0 12px;'>条)</div>
                    <div style='float:left;margin:8px 2px 0 10px;font-weight:bold;padding:0 10px 12px 10px;' :class="[{SMSAbottomB:activity},SMSAHover]" @click='switchA'>
                        全部消息
                    </div>
                    <div style='float:left;margin-left:2px;margin-top:8px;width:5px;border-left:1px solid gainsboro;height:25px;'></div>
                    <div  style='float:left;margin-top:8px;font-weight:bold;padding:0 5px 12px 10px' :class="[{SMSAbottomB:!activity},SMSAHover]" @click='switchB'>
                        发送失败
                        <span v-if="number===0" style="font-size:14px;color: #bdb8b8;">加载中...</span>
               <span v-else>({{number}})</span>
                    </div>
                <div style="width:200px;position:absolute;right:110px;bottom:10px">
                        <el-input placeholder="输入手机号" icon="search" v-model="input2" @keyup.enter.native="updateList" :on-icon-click="updateList"
                            style='margin-right:10px'> </el-input>
                    </div>
                <div class="smsManageop">
                    <el-button type="success" @click="openResource" >发送消息</el-button>
                </div>
            </div>
            <el-dialog title="发送消息" :visible.sync="dialogFormVisible" :close-on-click-modal="no" top='13%'  show-close custom-class='smsManageDD' @close='resetW'>
                <el-form :model="resourceSchool" id='actSchool1' :rules='ruleLaunch' ref="resourceSchool">
                        <el-form-item label="内容类型" prop='type'>
                                <el-radio-group v-model="resourceSchool.type">
                                        <el-radio :label="1" style='padding:10px 0'>仅发送给未绑定学员中心的学员</el-radio><div></div>
                                        <el-radio :label="2" style="padding-bottom:10px">全部学员</el-radio><div></div>
                                        <el-radio :label="3">手动导入手机号发送</el-radio>
                                      </el-radio-group>
                            </el-form-item>
                            <el-form-item label="" prop='mobile' v-if='resourceSchool.type==3'>
                                    <el-input type="textarea" :autosize="{ minRows: 4, maxRows: 6}" placeholder="请输入手机号,多个手机号码使用英文,号分割" v-model="resourceSchool.mobile" style='width:470px'>
                                    </el-input>
                                    <div class='smsManageDB'>
                                            
                                                                    <el-upload
                                                                    class="upload-demo"
                                                                    :action="Iaction" :headers='headers' :show-file-list='no'
                                                                    name='file'
                                                                    :before-upload="beforeAvatarUpload1aa"
                                                                    :on-success='handleSuccess' :on-error='handleError'>
                                                                    <el-button type="primary" size="mid" style='width:470px'>文件导入</el-button>
                                                                  </el-upload>
                                                                </div>
                                </el-form-item>
                            <el-form-item label="校区范围" prop='school' v-if='resourceSchool.type!=3'>
                                    <el-select v-model="resourceSchool.school" clearable multiple placeholder="选择校区" @change='getOnly'>
                                        <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                                        </el-option>
                                    </el-select>
                                </el-form-item>
                                <el-form-item label="发送内容" prop='content'>
                                        <el-input type="textarea" :autosize="{ minRows: 4, maxRows: 6}" placeholder="请输入发送内容" v-model="resourceSchool.content" style='width:400px'>
                                        </el-input>
                                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button type="primary" :loading="writeL" @click="distributeResource('resourceSchool')">确 定</el-button>
                    <el-button @click="dialogFormVisible = false">取 消</el-button>
                </div>
            </el-dialog>
            <el-dialog title="失败记录" :visible.sync="dialogFormVisibleEdit" size="tiny" :close-on-click-modal="no" top='13%'  show-close custom-class='smsManageDD' @close='resetW'>
                    <el-table :data="failList"   style="width: 100%;height:100%;max-height:500px;overflow-y:auto"   show-header='no' >
                            <el-table-column prop="name" label="接收人" >
                            </el-table-column>
                            <el-table-column label="操作" >
                                    <template scope="scope">
                                        <el-button type="text" size="small" :loading="writeL" v-if="scope.row.resend==0" @click="open(scope.row.id)" style='border:1px solid #1fb5ad;padding:5px 7px'>重新发送</el-button>
                                        <span v-else style='color:#1fb5ad'>已重发</span>
                                    </template>
                                </el-table-column>
                        </el-table>
                    <!-- <div slot="footer" class="dialog-footer ">
                        <el-button type="primary" @click="distributeResource">确 定</el-button>
                        <el-button @click="dialogFormVisibleEdit = false">取 消</el-button>
                    </div> -->
                </el-dialog>
            <div id="smsManageTB">
                <el-table :data="noEffData"  style="width: 100%"   >
                    <el-table-column prop="content" label="短信内容" >
                            <template scope="scope">
                                  <div style='text-align:left;padding:10px;'>
                                        {{scope.row.content}}
                                  </div>
                                </template>
                    </el-table-column>
                    <!-- <el-table-column prop="content" label="消息内容" width='150'>
                            <template scope="scope">
                                    <span v-html='scope.row.content'></span>
                                </template>
                    </el-table-column> -->
                    <el-table-column prop="mobile" label="接收手机号" width='150'>
                    </el-table-column>
                    <el-table-column prop="send_time" label="发送时间"  width='150'>
                    </el-table-column>
                    <el-table-column prop="status" label="发送状态" width='100'>
                        <template scope="scope">
                            <div v-if="scope.row.succ>=1">发送成功({{scope.row.succ}})</div>
                            <div v-if="scope.row.faild==1" class='SMSAHover' @click='getFailList(scope.row.id)' style='color:#e95c5c'>发送失败   <span style='color:gainsboro'>></span></div>
                            <div style='color:#e95c5c' v-if="scope.row.faild>1" class='SMSAHover' @click='getFailList(scope.row.id)'>发送失败({{scope.row.faild}})  <span style='color:gainsboro'>></span></div>
                            </template>
                    </el-table-column>
                    <el-table-column prop="message_type" label="消息类型"  width='100'>
                        </el-table-column>
                    <!-- <el-table-column label="操作" width='120'>
                        <template scope="scope">
                            <el-button type="text" size="small" @click="open2(scope.$index, accountData)" style='color:red'>中止</el-button>
                            <el-button type="text" size="small" @click="open(scope.$index, accountData)" >修改</el-button>
                        </template>
                    </el-table-column> -->
                </el-table>
            </div>
            <div class="smsManageTBL">
                  <!-- <span class="demonstration"></span> -->
                <el-pagination layout="prev, pager, next"  :total="total"  @current-change="handleCurrentChange"  :current-page="currentPage" :page-size="pagesize">
                </el-pagination>
            </div>
        </div>
    </template>
    <script>
        var user, token
        import {
            SmsMList,
            campusList,
            condMassSms,
            smsFail,
            smsResend
        } from '../../api/api';
        export default {
            data() {
                var isSpace = (rule, value, callback) => {
                var myreg1 = /^\s/;
                if(value==''){
                    callback('请输入发送内容')
                }else if (myreg1.test(value)) {
                    callback('请输入有效的发送内容')
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
            var isPhone = (rule, value, callback) => {//手机号
                // var myreg = /^(((1[0-9]{1}))+\d{9})$/;
                var myreg = /^1[34578]\d{9}$/
                if (value == '') {
                    callback()
                }else if (!value.split(',').every(item=>{return myreg.test(item)})) {
                    callback('请检查输入的手机号码');
                }else {
                  
                    callback()
                }
            }
                return {
                    // Iaction:'http://pandatest.dfth.com/api/v1/wxmanage/importSms',
                    Iaction:'/api/v1/wxmanage/importSms',
                    ruleLaunch:{
                        content: [{
                        required: true,
                        // message: '请输入活动地点',
                        validator: isSpace,
                        trigger: 'blur'
                    }],
                    mobile: [{
                        required: true,
                        // message: '请输入活动地点',
                        validator: isPhone,
                        trigger: 'change'
                    },
                    {
                        required: true,
                        // message: '请输入活动地点',
                        validator: isPhone,
                        trigger: 'blur'
                    }],
                    school: [{
                        required: true,
                        validator: nan,
                        message: '请选择校区范围',
                        trigger: 'change'
                    }],
                },
                    SMSAHover:'SMSAHover',
                    isFail:0,
                    activity:true,
                    no: false,
                    code: '',
                    input2:'',
                    resourceSchool: {
                        mobile: '',
                        type:1,
                        content:'',
                        school:[],
    
                    },
                    dialogFormVisible: false,
                    dialogFormVisibleEdit: false,
                    total: 0,
                    number: 0,
                    number1:'0',
                    noEffData: [],
                    currentPage: 1, //页数
                    pagesize: 15, //默认每页
                    backSchool:[],
                    headers: {
                    Authorization: token.Authorization
                },
                    failList:[],
                    writeL:false,
                    failId:''
                }
            },
            methods: {
                resetW(){
                    this.writeL = false;
                    this.failList = []
                    // console.log(1)
                },
                getOnly(val){
                    if(val.indexOf('all')>-1&&this.options.length!=1){
                        this.options = [{value:'all',label:'全部校区'}]
                        this.resourceSchool.school = ['all']
                    }else{
                        this.options = this.backSchool;
                    }
                },
                handleSuccess(response, file, fileList) {//上传图片成功
                    if(response.code==0){

                        this.$message.success('上传成功');
                    // this.fetchData();
                    if(this.resourceSchool.mobile){
    
                        this.resourceSchool.mobile += ','+response.data;
                    }else{
                        this.resourceSchool.mobile = response.data;                    
                    }
                    }
            },
            beforeAvatarUpload1aa(file, fileList){
                const isJPG =  file.name.includes('.xl');
                if (!isJPG) {
                    this.$message.error('必须上传excel文件');
                }
                return isJPG;
            },
            handleError(err, file, fileList) {
                this.$message.error(error.message)
            },
                getFailList(id){
                    this.failId = id;
                    let para = {
                        id:id
                    }
                    smsFail(token,para).then(res=>{
                        // console.log(res.data)
                        this.failList = res.data
                    })
                    this.dialogFormVisibleEdit=true;
                },
                switchA(){
                    if(this.activity==false){
                        this.activity=true;
                        this.isFail =0;
                        this.fetchData();
                    }
                },
                switchB(){
                    if(this.activity==true){
                        this.activity=false;
                        this.isFail =1;
                        this.fetchData(); 
                    }
                },
                // saaa(){
                //     // console.log(1)
                // },
                open(id){//重新发送
                    let para={
                        id:id
                    }
                    this.writeL = true;
                    smsResend(para,token).then(res=>{
                        if(res.code==0){
                            this.$message.success('发送成功');
                            // this.dialogFormVisibleEdit = false;
                            this.writeL = false;
                            let para = {
                        id:this.failId
                    }
                    smsFail(token,para).then(res=>{
                        // console.log(res.data)
                        this.failList = res.data
                    })
                            this.fetchData()     
                        }else{
                            this.$message.error(res.data)
                            this.writeL = false
                        }
                    })
                },
                openResource() { //打开发送消息
                    this.resourceSchool={
                        mobile: '',
                        type:1,
                        content:'',
                        school:[],
    
                    },
                    this.dialogFormVisible = true;
                    setTimeout(() => {
                    this.$refs['resourceSchool'].resetFields();
                }, 1);
                },
                handleCurrentChange: function (val) { //换页
                    this.currentPage = val;this.backToTop();
                    this.fetchData();
                },
                updateList() {
                    this.isFail=0;
                    this.currentPage = 1;
                    this.fetchData();
    
                },
                distributeResource(formName) { //发送短信
                    this.$refs[formName].validate((valid) => { //替换提交服务
                    if (valid) {
                        let para = {...this.resourceSchool}
                        para.school = para.school.join(',')
                        // console.log(para)
                        this.writeL = true;
                        condMassSms(para, token).then(res => {
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
                },
                fetchData() {
                    let para = {
                        searchVal:this.input2,
                        fail:  this.isFail,
                        page: this.currentPage,
                    }
    
                    SmsMList(token,para).then((res) => { //
                        this.number1 = res.data.number;
                        this.number = res.data.fail_total
                        let a = res.data.list;
                        let c = res.data.lastpage * this.pagesize;
                        this.noEffData = a;
                        this.total = parseInt(c);
                    })
                },
                
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
        /* #smsManageTB .el-table td,
        #smsManageTB .el-table th:not(.gutter) {
            padding: 1px;
            text-align: center
        }
    
        #smsManageTB .el-table th>div,
        #smsManageTB .el-table .cell {
            padding-left: 0;
            padding-right: 0;
        } */
    
        .smsManageDD .el-dialog__header {
            background-color: #1fb5ad;
            padding: 20px 20px 20px;
        }
    
        .smsManageDD .el-dialog__title {
            color: white;
        }
    
        /* .nicknameSpanN:hover {
            cursor: pointer;
        }
    
        .nicknameSpanN {
            font-weight: 600;
            color:#1fb5ad
        } */
    
        .smsManageTBL {
            text-align: center;
            margin-top: 10px;
        }
    
        .smsManageH {
            float: left;
            margin-right: 5px;
            padding-left: 10px;
            margin-top: 5px;
        }
    
        .smsManage {
            width: 100%;
            position: relative;
            height: 46px;
            background-color: white;
            /* margin-top: 0; */
            padding-top: 10px;
            margin-bottom: 5px;
            border-radius: 5px;
        }
    
        .smsManageop {
            float: right;
            margin-right: 10px
        }
/*     
        .top55  .el-time-panel__content::after,.top55 .el-time-panel__content::before{
            top:55%
        } */
        /* .smsredwarn .el-message-box__header {
            background-color: #e95c5c;
            padding: 20px 20px 20px;
        }
    
        .smsredwarn .el-message-box__title {
            color: white;
        }
    
        .smsredwarn .el-button--primary {
            background-color: #e95c5c;
            border-color: #e95c5c;
        }
    
        .smsredwarn .el-button--primary:hover {
            background-color: #ff6d6d;
            border-color: #ff6d6d;
        } */
        .SMSAbottomB{
            color:#1fb5ad;
            border-bottom:4px solid #1fb5ad;
        }
        .SMSAHover:hover{
            cursor: pointer
        }
       .SMSACR .upload-demo .el-upload--text{
        height: 36px;
    width: 470px;
    margin-right: 115px;
    margin-top:0;
    margin-left: 0;
    position: absolute;
    left: 0
    }
    .smsManageDB{
        width:100%;
        height: 36px;
    }
    </style>
    