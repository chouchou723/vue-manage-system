<template>
        <div class="actviMan">
            <!-- <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-my-tongzhi"></i> 活动管理</el-breadcrumb-item>
                <el-breadcrumb-item class='ss'>活动模板</el-breadcrumb-item>
            </el-breadcrumb> -->
            <div class='actviMan1'>
                <h3 class="actviMan2">
    
                    活动管理
                    <span v-if="number==='0'" style="font-size:14px;color: #bdb8b8;">加载中...</span>
                   <span v-else>({{number}})</span>
                </h3>
                <!-- <div class='studentReturnNoneed' v-if="code =='cc_m'">
                    <el-select v-model="valueT" clearable placeholder="选择CC" @change="updateList">
                        <el-option v-for="item in optionsCC" :key="item.key" :label="item.label" :value="item.key">
                        </el-option>
                    </el-select>
                </div> -->
                <div style="float:right;margin-right:10px">
                    <el-button type="success" @click="createActivity" >创建活动</el-button>
                </div>
            </div>
            <div id="table2AT">
                <el-table :data="publicData"  style="width: 100%">
                    <el-table-column prop="act_name" label="活动主题名称" width='140'>
                        <!-- <template scope="scope">
                            <span class='actManH1' @click='showAct(scope.row.id,scope.row.type_id)'>{{scope.row.names}}</span>
                        </template> -->
                    </el-table-column>
                    <el-table-column prop="names" label="所属渠道来源" width='120'>
                    </el-table-column>
                    <el-table-column prop="qr_num" label="二维码" width='120'>
                            <template scope="scope">
                                    <span class='actManH1' @click='showAct(scope.row.id)'>{{scope.row.qr_num}}</span>
                                </template>
                    </el-table-column>
                    <el-table-column prop="source_total" label="获取名单数" width='90'>
                        </el-table-column>
                    <el-table-column prop="url" label="落地页" width='150'>
                            <template scope="scope">
                                    <!-- <el-button   type="text" size="small" >预览</el-button> -->
                                    <el-button   type="text" size="small" @click="openUrl(scope.row.url)">URL</el-button>
                                </template>
                    </el-table-column>
                    <el-table-column prop="start_end" label="有效期" >
                    </el-table-column>
                    <el-table-column prop="is_active" label="活动状态" width='120'>
                        </el-table-column>
                    <el-table-column label="操作" width='140'>
                        <template scope="scope">
                              <el-button   type="text" size="small" @click="claim(scope.row)" >修改</el-button>
                              <el-button   type="text" size="small" @click="launch(scope.row)" style="color:red">删除</el-button>
                            <!--   <el-button type="text" size="small" @click="open2(scope.$index, accountData)">删除</el-button> -->
                        </template>
                    </el-table-column>
                </el-table>
            </div>
            <div class="block">
                  <!-- <span class="demonstration"></span> -->
                <el-pagination layout="prev, pager, next" :total="total" :current-page="currentPage" :page-size="pagesize" @current-change="handleCurrentChange">
                </el-pagination>
            </div>
            <el-dialog :title="cOre" :visible.sync="dialogFormVisible" :close-on-click-modal="no" top='11%' size='small' show-close 
                 id='activityD' @close='resetD'>
                <el-form :model="form" :rules='ruleA' ref="form" label-width="120px" v-loading="loading2" element-loading-text="提交中">
                    <el-form-item label="活动主题" prop='act_name'>
                        <el-input v-model="form.act_name" placeholder='请输入活动主题名称' style="width:172px"></el-input>
                    </el-form-item>
                    <el-form-item label="渠道来源" prop='source_id'>
                            <el-cascader
                            :options="options2"
                            :props="propsource"
                            v-model="form.source_id"
                             change-on-select
                            placeholder="请选择渠道来源" style="width:172px">
                          </el-cascader>
                    </el-form-item>
                    <el-form-item label="二维码数量" prop='qr_num'>
                        <el-input v-model="form.qr_num" placeholder='请输入生成的二维码数量' :disabled='inB!=""' style="width:172px"></el-input>
                    </el-form-item>
                    <el-form-item label="活动URL" prop='url'>
                            <el-input v-model="form.url" placeholder='请输入活动URL' style="width:438px"></el-input>
                        </el-form-item>
                    <el-form-item prop='time' label='有效期' >
                        <el-date-picker v-model="form.time"  :clearable="no" :editable="no" range-separator=" ~ " type="daterange" placeholder="有效期" style="width:285px" :picker-options="pickerOptions0">
                        </el-date-picker>
                        <!-- <el-date-picker v-model="form.start_time" format="yyyy-MM-dd HH:mm" :clearable="no" @change="checkForm" type="datetime" placeholder="开始时间" popper-class='top55'  :picker-options="pickerOptions0" style="width:217px">
                        </el-date-picker>  
                        <el-date-picker v-model="form.end_time" format="yyyy-MM-dd HH:mm" :clearable="no" @change="checkForm" type="datetime" placeholder="结束时间" popper-class='top55'  :picker-options="pickerOptions0" style="width:217px">
                        </el-date-picker>   -->
                    </el-form-item>
                                                    <el-form-item label="活动状态" prop='is_active'>
                                                            <el-select v-model="form.is_active" placeholder="请选择活动状态" style="width:172px">
                                                                <el-option label="正常" value="1"></el-option>
                                                                <el-option label="停用" value="0"></el-option>
                                                            </el-select>
                                                        </el-form-item>
                </el-form>
                        <div slot="footer" class="dialog-footer" style='text-align:center'>
                            <el-button type="primary" @click="onSubmit('form')" :loading="writeL">确定</el-button>
                            <el-button @click="dialogFormVisible = false">取消</el-button>
                        </div>
            </el-dialog>
            <!-- <el-dialog :title="corReB" :visible.sync="dialogFormVisibleBirthday" :close-on-click-modal="no" top='7%' size='small' show-close style='z-index:100'
            id='activityDB' @close='resetDB'>
                <el-form :model="formBirthday" :rules='ruleBirthday' ref="formBirthday" label-width="120px" v-loading="loadingB" element-loading-text="提交中">
                    <el-form-item label="" prop='names'>
                            <el-radio-group v-model="formBirthday.names" style="display: flex;margin-left:-120px">
                                    <el-radio :label="3" style="display: flex;flex-direction: column-reverse;width: 30%;align-items: center;"> <img src="../../../static/img/landing1.png" alt="" height="200"></el-radio>
                                    <el-radio :label="6"style="display: flex;flex-direction: column-reverse;width: 30%;align-items: center;"><img src="../../../static/img/landing2.png" alt="" height="200"></el-radio>
                                    <el-radio :label="9" style="display: flex;flex-direction: column-reverse;width: 30%;align-items: center;"><img src="../../../static/img/landing3.png" alt="" height="200"></el-radio>
                                  </el-radio-group>
                    </el-form-item>
                    <el-form-item label="图片编辑" prop='school_id'>
                       <el-select v-model="formBirthday.school_id"  placeholder="选择校区" filterable @change='getTeacher' style="width:172px" >
                            <el-option v-for="item in schoolList" :key="item.id" :label="item.title" :value="item.id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                     <el-form-item label="信息字段" prop='teachid'>
                        <el-select v-model="formBirthday.teachid"  placeholder="选择老师" filterable  style="width:172px">
                            <el-option v-for="item in teachersName" :key="item.aid" :label="item.uname" :value="item.aid">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <div style="position:absolute;top:72px;right:58px">
                            <div style="position:absolute;top:10px;right:-9px;width:100px"><span style="color:#ff4949">*</span> 封面图片</div>
                            <i class="el-icon-circle-close" style="position:absolute;top:43px;right:-33px;z-index:1" v-if="imageUrl1" @click="handleRemove1"></i>
                                <el-upload
                                class="avatar-uploader"
                                action="https://jsonplaceholder.typicode.com/posts/"
                                :show-file-list="false"
                                :on-change="beforeAvatarUpload1aa"
                                :auto-upload="false"
                                >
                                <img v-if="imageUrl1" :src="imageUrl1" class="avatar">
                                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                              </el-upload>
                              <div style="position:absolute;bottom:-20px;left:-53px;color:#ff4949;width:120px" v-if="!imageUrl1&&countImg!=0">请选择封面图片</div>
                              <div style="position:absolute;top: 27px;width: 203px;left: -109px;">推荐尺寸（宽）750X（高）564</div>
                        </div>
                    </el-form>
                            <div slot="footer" class="dialog-footer" style='text-align:center'>
                                <el-button type="primary" @click="onSubmit('formBirthday')">确定</el-button>
                                <el-button @click="dialogFormVisibleBirthday = false">取消</el-button>
                    </div>
            </el-dialog> -->
            <!-- <el-dialog title="活动模板详情" :visible.sync="dialogFormVisibleShow" :close-on-click-modal="no" custom-class='classDetailDialog' top='2%' size='small' @close='resetS'>
                <el-form id='actDeatilForm' label-width="102px" label-position='left' style='padding-left:10px;'>
                    <el-form-item label="活动名称:" prop='names'>
                        <span>{{activity.names}}</span>
                    </el-form-item>
                    <el-form-item label="活动类型:" prop='type_id'>
                        <span>{{activity.type_id}}</span>
                    </el-form-item>
                    <el-form-item label="活动价格:" prop='price'>
                        <span>{{activity.price}}</span>
                    </el-form-item>
                    <el-form-item label="最大报名人数:" prop='stock'>
                        <span>{{activity.stock}}</span>
                    </el-form-item>
                    <el-form-item label="适合年龄段:" prop='age'>
                        <span>{{activity.age}}</span>
                    </el-form-item>
                    <el-form-item label="活动介绍:" prop='content'>
                            <div  style='border:1px solid gainsboro' v-html="activity.content" class='actImg ql-editor'></div>
                    </el-form-item>
                    <el-form-item label="创建时间:" prop='created'>
                        <span>{{activity.created}}</span>
                    </el-form-item>
                    <div style="position: absolute;top: 72px;right: 12px;width: 300px;text-align: center;" >
                            <div style="position: absolute;top: 20px;right: 99px;width: 100px;"> 封面图片</div>
                            <img :src="activity.images" alt="" width='178' height="134"  style="margin-top:40px">
                        </div>
                </el-form>
            </el-dialog> -->
            <el-dialog title="二维码" :visible.sync="dialogFormVisibleShowB" :close-on-click-modal="no" custom-class='classDetailDialog' top='7%' size='small' @close='resetSB'>
                    <div style="float:left;margin-right:10px">
                            <el-button type="success" @click="downloadAll" >二维码全部下载</el-button>
                        </div>
                        <div style="float:right;margin-right:10px">
                            <el-button type="info" @click="addQC" >添加二维码</el-button>
                        </div>
                        <div style='clear:both'></div>
                        <el-table :data="failList"  style="margin-top:20px;"    >
                                <el-table-column prop="name" label="二维码名称" >
                                </el-table-column>
                                <el-table-column prop="stotal" label="获取名单数" >
                                    </el-table-column>
                                    <el-table-column label="二维码下载" width='140'>
                                            <template scope="scope">
                                                  <span><i class="iconfont icon-xiazaibaocun codeD" @click='downLoad(scope.row.id)'></i></span>
                                                <!--   <el-button type="text" size="small" @click="open2(scope.$index, accountData)">删除</el-button> -->
                                            </template>
                                        </el-table-column>
                            </el-table>
                </el-dialog>
            <!-- <el-dialog title="发起活动" :visible.sync="dialogFormVisibleLaunch" :close-on-click-modal="no" top='7%' size='small' show-close @close='resetDL'>
            <el-form :model="formLaunch" :rules='ruleLaunch' ref="formLaunch" label-width="120px">
                <el-form-item label="举办校区" prop='school_id'>
                   <el-select v-model="formLaunch.school_id"  placeholder="选择校区" filterable @change='getTeacherL'>
                        <el-option v-for="item in schoolList" :key="item.id" :label="item.title" :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>
                 <el-form-item label="负责老师" prop='teachid'>
                    <el-select v-model="formLaunch.teachid"  placeholder="选择老师" filterable >
                        <el-option v-for="item in teachersNameL" :key="item.aid" :label="item.uname" :value="item.aid">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="报名截至时间" prop='sign_time' >
                    <el-date-picker v-model="formLaunch.sign_time" format="yyyy-MM-dd HH:mm" :clearable="no" type="datetime" placeholder="报名截至时间" popper-class='top55'  :picker-options="pickerOptions0" style="width:217px">
                    </el-date-picker>     
                </el-form-item>
                        <el-form-item label="活动地点" prop='address'>
                            <el-input v-model="formLaunch.address" placeholder='请输入活动地点' style="width:285px"></el-input>
                        </el-form-item>
                <el-form-item prop='form_time' label='活动起止时间' >
                    <el-date-picker v-model="formLaunch.start_end_time" format="yyyy-MM-dd HH:mm" :clearable="no" @change="checkForm" type="datetime" placeholder="活动开始时间" popper-class='top55'  :picker-options="pickerOptions0" style="width:217px">
                    </el-date-picker>  
                    <el-date-picker v-model="formLaunch.time" format="yyyy-MM-dd HH:mm" :clearable="no" @change="checkForm" type="datetime" placeholder="活动结束时间" popper-class='top55'  :picker-options="pickerOptions0" style="width:217px">
                    </el-date-picker>  
                </el-form-item>
            </el-form>
                    <div slot="footer" class="dialog-footer" style='text-align:center'>
                        <el-button type="primary" @click="onSubmitLaunch('formLaunch')">确定</el-button>
                        <el-button @click="dialogFormVisibleLaunch = false">取消</el-button>
                 </div>
        </el-dialog> -->
        </div>
    </template>
    <script>
        var user, token
        
        import {
            GetactivityList,
            activityAdd,
            qrcodeList,
            qrcodeDownload,
            channelList,
            activityDel,
            qrcodeAdd
        } from '../../api/api';
        export default {
            // components: {
            //     quillEditor
            // },
            data() {
                var isNumber = (rule, value, callback) => {
                    var myreg1 = /^[0-9]*$/;
                    if(value==''){
                        callback('请输入二维码数量')
                    }else if (!myreg1.test(value)) {
                        callback('请输入有效的二维码数量')
                    }else {
                        callback();
                    }
                }
                // var contentfrom_time1 = (rule, value, callback) => {
                //     if (!this.form.start_time||!this.form.end_time) {
                //         callback('请选择活动有效期');
                //     } else if(this.form.end_time<this.form.start_time){
                //         callback('结束时间应大于开始时间');
                //     }else {
                //         callback()
                //     }
                // }
                var isArr = (rule, value, callback) => {
                if (value == '') {
                    callback('请选择渠道')
                } else if (Array.isArray(value)) {
                    callback();
                }
            }
            var isDate = (rule, value, callback) => {
                if (value.length ==0) {
                    callback('请选择有效期')
                } else{
                    callback();
                }
            }
            var isSpace = (rule, value, callback) => {
            var myreg = /^.{1,100}$/;
            var myreg1 = /^\s/;
            if(value==''){
                callback('请输入活动主题名称')
            }else if (myreg1.test(value)) {
                callback('请输入有效的活动主题名称')
            } else {
                callback();
            }
            // else if (!myreg.test(value)) {
            //     callback('内容不得超过100字');
            // } 
            
        }
                return {
                    pickerOptions0: {
                        disabledDate(time) {
                            return time.getTime() < Date.now() - 8.64e7;
                        }
                    },
                    propsource:{
                        value: 'id',
                        label:'names',
                        children: 'children'
                        },
        options2:[],
                    // loading2:false,
                    // loadingB:false,
                    // imageUrl: '',
                    // imageUrl1: '',
                    // countImg:0,
                    // editorOption: {
    
                    //     // something config
                    // },
                    // teachersName:[],
                    // teachersNameL:[],
                    // schoolList:[],
                    writeL:false,
                    in:'',
                    inB:'',
                    ruleA:{
                        act_name: [{
                            required: true,
                            validator: isSpace,
                            message: '请输入活动名称',
                            trigger: 'blur'
                        }],
                        url: [{
                            required: true,
                            message: '请输入活动URL',
                            trigger: 'blur'
                        }],
                        source_id: [{
                            required: true,
                            validator: isArr,
                            trigger: 'change'
                        }],
                        time: [{
                            required: true,
                            validator: isDate,
                            trigger: 'change'
                        }],
                        is_active: [{
                            required: true,
                            // message: '请选择活动所耗课时',
                            trigger: 'change'
                        }],
                        qr_num: [{
                            required: true,
                            // type:'number',
                            validator: isNumber,
                            // message: '请输入最大报名人数',
                            trigger: 'blur'
                        }],
                    },
                    form:{
                        act_name:'',
                        source_id:[],
                        url:'',
                        qr_num:'',
                        is_active:'1',
                        time:[],
                    },
                    failList:[],
                    dialogFormVisible: false,
                    // dialogFormVisibleShow:false,
                    dialogFormVisibleShowB:false,
                    // dialogFormVisibleLaunch:false,
                    // dialogFormVisibleBirthday:false,
                    no: false,
                    code: '',
                    total: 0,
                    number: '0',
                    maid:'',
                    publicData: [],
                    // optionsCC: [],
                    // valueT: '', //全部CC下拉
                    currentPage: 1, //页数
                    pagesize: 15, //默认每页
                }
            },
            methods: {
                // goToNext(form){
                //     // this.$refs[form].validate((valid) => {
                //     //     if(valid){

                //     //     }
                //     // })
                //     this.dialogFormVisible = false;
                //         this.dialogFormVisibleBirthday = true;
                // },
                addQC(){
                    this.$prompt('请输入添加的二维码数', '提示', {
          confirmButtonText: '确定',
          customClass: 'AMgreen',
          cancelButtonText: '取消',
          inputPattern: /^[0-9]+$/,
          inputErrorMessage: '二维码数格式不正确'
        }).then(({ value }) => {
            let para = {
                ma_id:this.maid,
                num:value
            }
            qrcodeAdd(para,token).then(res=>{
                if(res.code==0){
                    this.$message.success('添加成功');
                    let para = {
                        id:this.maid
                    }
                    qrcodeList(para,token).then(res=>{
                        this.failList = res.data
                    })
                    this.fetchData();
                }else{
                    this.$message.error(res.data)
                }
            })
        }).catch(() => { 
        });
      },
                downloadAll(){
                    let para ={
                        ma_id:this.maid
                    }
                    qrcodeDownload(para,token).then(res=>{
                            // let a = 'http://pandatest.dfth.com/';
                    let a = '';
                        window.open( a+res.data);
                    })
                },
                downLoad(id){
                    let para ={
                        id:id
                    }
                    qrcodeDownload(para,token).then(res=>{
                            // let a = 'http://pandatest.dfth.com/';
                    let a = '';
                        window.open( a+res.data);
                    })
                },
                openUrl(url){
                    window.open(url)
                },
                resetD(){
                    this.form={
                        act_name:'',
                        source_id:[],
                        url:'',
                        qr_num:'',
                        is_active:'1',
                        time:[],
                    } 
                    this.inB='';                       
                    this.$refs['form'].resetFields();
                },
                resetSB(){
                    this.failList = [];
                },
                // handleRemove1(){
                //     this.imageUrl1 = ''
                // },
                // handleRemove(){
                //     this.imageUrl = ''
                // },
                // beforeAvatarUploadaa(file, fileList){
                //     const isJPG =  file.raw.type === 'image/jpeg' || file.raw.type === 'image/png';
                //     const isLt2M = file.size / 1024 / 1024 < 5;
    
                //     if (!isJPG) {
                //         this.$message.error('上传图片格式为.jpg或.jpeg或.png!');
                //     }else if (!isLt2M) {
                //         this.$message.error('上传图片大小不能超过5MB!');
                //     }else{
    
                //     let that = this;                
                //     let a = new FileReader();
                //    a.onload = function ( event ) { 
                //         var txt = event.target.result;
                //         that.imageUrl = txt;
                //         };
                //     a.readAsDataURL(file.raw);
                //     }
                    
                //     // this.imageUrl =URL.createObjectURL(file.raw);
                //     // console.log(d)
                // },
                // beforeAvatarUpload1aa(file, fileList){//生日会
                //     const isJPG =  file.raw.type === 'image/jpeg' || file.raw.type === 'image/png';
                //     const isLt2M = file.size / 1024 / 1024 < 5;
                //     if (!isJPG) {
                //         this.$message.error('上传图片格式为.jpg或.jpeg或.png!');
                //     }else if (!isLt2M) {
                //         this.$message.error('上传图片大小不能超过5MB!');
                //     }else{
    
                //     let that = this;
                //     let a = new FileReader();
                //    a.onload = function ( event ) {
                //         var txt = event.target.result;
                //         that.imageUrl1 = txt;
                //         // console.log(txt)
                //         };
                //     a.readAsDataURL(file.raw);
                //     }
                    
                //     // this.imageUrl1 =URL.createObjectURL(file.raw);
                //     // console.log(d)
                // },
                // onSubmit(form){
                //     this.countImg = 1;
                //     this.$refs[form].validate((valid) => {
                //         if (valid&&this.imageUrl&&this.form.content) {
                //             this.loading2 = true;
                //             let para = {...this.form}
                //     para.age = para.minage+'-'+para.maxage
                //     para.images = this.imageUrl
                //     // console.log(para)     
                //     if(this.in!=''){
                //         para.id = this.in;
                //         addTpl(para,token).then(res=>{
                //         if(res.code==0){
                //             this.loading2 = false;
                //             this.$message.success('修改成功');
                //             this.dialogFormVisible = false;
                //             this.fetchData();
                //         }else{
                //             this.$message.error(res.data)
                //         }
                //         // console.log(res)
    
                //     })
                //     }else{
                //         addTpl(para,token).then(res=>{
                //         if(res.code==0){
                //             this.loading2 = false;
                //             this.$message.success('创建成功')
                //             this.dialogFormVisible = false;
                //             this.fetchData();
                //         }else{
                //             this.$message.error(res.data);
                //             this.loading2 = false;
                            
                //         }
                //         // console.log(res)
    
                //     })
                //     }       
                    
                //         }else{
                //             this.$message.info('还有项目未填写')
                //         }
                //     })
                    
                // },
                onSubmit(form){
                    this.$refs[form].validate((valid) => {
                        
                        if (valid) {
                            this.writeL = true;
                            let para = {...this.form}
                    para.start_time = new Date(para.time[0]).toLocaleDateString();
                    para.end_time = new Date(para.time[1]).toLocaleDateString();
                    para.source_id = para.source_id[para.source_id.length-1];
                    if(this.inB!==''){
                        para.id = this.inB;
                        activityAdd(para,token).then(res=>{
                        if(res.code==0){
                        this.loadingB = false;                        
                            this.$message.success('修改成功')
                            this.dialogFormVisible = false;
                            this.writeL = false;                            
                            this.fetchData();
                        }else{
                            this.$message.error(res.data);
                            this.writeL = false;                       
                        }
    
                    })
                    }else{
                        activityAdd(para,token).then(res=>{
                        // console.log(res)
                        if(res.code==0){
                            this.writeL = false;                                               
                            this.$message.success('发布成功')
                            this.dialogFormVisible = false;
                            this.fetchData();
                        }else{
                            this.$message.error(res.data);
                            this.writeL = false;                         
                        }
    
                    })
                    }           
                        }else{
                            this.$message.info('还有项目未填写')
                        }
                    })
                    
                },
                // onSubmitLaunch(form){
                //     this.$refs[form].validate((valid) => {
    
                //         if (valid) {
                //             let para = {...this.formLaunch}
                //             para.tpl_id = this.temId;
                //     para.sign_time = new Date(para.sign_time)
                //     let one = new Date(para.start_end_time);
                //     let two =new Date(para.time);
                //     let d1 = one.toLocaleDateString()+' '+one.getHours()+':'+one.getMinutes();
                //     let d2 = two.toLocaleDateString()+' '+two.getHours()+':'+two.getMinutes();
                //     para.start_end_time = d1 +','+d2;
                //     // console.log(para)                
                //     addActivity(para,token).then(res=>{
                //         // console.log(res)
                //         if(res.code==0){
                //             this.$message.success('发起成功')
                //             this.dialogFormVisibleLaunch = false;
                //             this.$router.push('/api/v1/Travel/activityList');
                //         }else{
                //             this.$message.error(res.data)
                //         }
    
                //     })
                //         }else{
                //             this.$message.info('还有项目未填写')
                //         }
                //     })
                    
                // },
                // launch(id){
                //     this.dialogFormVisibleLaunch = true;
                //     this.temId = id
                // },
                launch(data) { //删除课程
                if (data.source_total > 0) {
                    this.$alert('当前活动已产生报名名单,无法删除', '删除活动', {
                        showConfirmButton: false,
                        type: 'warning',
                        customClass: 'AMwarn',
                        confirmButtonText: '确定'
                    });
                } else {
                    this.$confirm('是否确定要删除该活动?', '删除活动', {
                        customClass: 'AMwarn',
                        cancelButtonText: '取消',
                        confirmButtonText: '确定',
                        type: 'warning'
                    }).then(() => {
                        let a = {
                            ma_id: data.id
                        }
                        activityDel(a, token).then((res) => {
                            if(res.code==0){

                                this.fetchData();
                                this.$message({
                                type: 'success',
                                message: '删除成功!'
                            })
                            }else{
                                this.$message.error(res.data)
                            }
                        }).catch((res) => {
                            // this.$message.error('该用户未授权')
                        })
                    })
                }
            },
                showAct(id){
                    this.maid = id;
                    let para = {
                        id:id
                    }
                    qrcodeList(para,token).then(res=>{
                        this.failList = res.data
                    })
                    this.dialogFormVisibleShowB = true;
                },
                claim(data){
                    this.inB = data.id;
                    this.form={
                        act_name:data.act_name,
                        source_id:data.source_id_path.split(','),
                        url:data.url,
                        qr_num:data.qr_num,
                        is_active:data.is_active =='停用'?'0':'1',
                        time:data.start_end.split('-'),
                        id:data.id
                    } 
                    this.dialogFormVisible = true;
                },
                createActivity() {
                    this.in = '';
                    this.dialogFormVisible = true;
                },
                handleCurrentChange: function (val) { //换页
                    this.currentPage = val;this.backToTop();
                    this.fetchData();
                },
                fetchData() {
                    let para = {
                        // cc_id: this.valueT, //CC
                        page: this.currentPage
                    }
                    GetactivityList(para,token).then((res) => { //
                        this.number = res.data.total;
                        let a = res.data.list;
                        let c = res.data.lastPage * this.pagesize;
                        this.publicData = a;
                        this.total = parseInt(c);
                    })
                },
            },
    
            beforeCreate() {
                user = sessionStorage.getItem('user');
                token = JSON.parse(user).token;
            },
            created() {
                this.code = JSON.parse(user).job ? JSON.parse(user).job.code : '';
                this.fetchData();
                channelList(token).then(res => {
                this.options2 = res.data.list
            })
                    // getTeacherList(token).then((res) => { //获取老师
                    //     this.teachersName = res.data;
                    // })
                // if (this.code == 'cc_m') {
                //     getAllCCList(token).then((res) => {
                //         this.optionsCC = res.data;
                //         this.optionsCC.unshift({
                //             key: '0',
                //             label: '全部CC'
                //         })
                //     })
                // }
            },
             computed: {
                cOre: function() {
                    if (this.in === '') {
                        return '创建活动'
                    }
                    return '修改活动'
                },
                // corReB: function() {
                //     if (this.in === '') {
                //         return '创建落地页'
                //     }
                //     return '修改落地页'
                // },
            }
        }
    
    </script>
    <style>
        /* #table2AT .el-table td,
        #table2AT .el-table th:not(.gutter) {
            padding: 1px;
            text-align: center
        }
    
        #table2AT .el-table th>div,
        #table2AT .el-table .cell {
            padding-left: 0;
            padding-right: 0;
        } */
    
    .codeD{
color:#1fb5ad
    }
    .codeD:hover{
        cursor: pointer
    }
        .actManH1 {
            font-weight: 600;
            color:#1fb5ad
        }
         .actManH1:hover {
            cursor: pointer;
        }
        .block {
            text-align: center;
            margin-top: 10px;
        }
    
        .actviMan2 {
            float: left;
            margin-right: 5px;
            padding-left: 10px;
            margin-top:5px;
        }
    
        .actviMan1 {
            width: 100%;
            position: relative;
            height: 46px;
            background-color: white;
            /* margin-top: 30px; */
            padding-top: 10px;
            margin-bottom: 5px;
            border-radius: 5px;
        }
    
        .actviMan .el-dialog .el-dialog__header {
            background-color: #1fb5ad;
            padding: 20px 20px 20px;
        }
    
        .actviMan .el-dialog .el-dialog__title {
            color: white;
        }
    /* .avatar-uploader .el-upload {
        border: 2px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
      }
      .avatar-uploader .el-upload:hover {
        border-color: #20a0ff;
      }
      .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 178px;
        height: 178px;
        line-height: 178px;
        text-align: center;
      }
      .avatar {
        width: 178px;
        height: 178px;
        display: block;
      }
      .avatar-uploader .el-upload--text{
          width:auto;
          height:auto;
      } */
      /* #actDeatilForm .el-form-item,#birthdayDeatilForm .el-form-item{
          margin-bottom: 5px;
      }
      .actImg img{
          width: auto;
          max-width: 100%;
      } */
      /* .top55  .el-time-panel__content::after,.top55 .el-time-panel__content::before{
            top:55%
        } */
        /* .ql-editor{
            color:black;
        } */
        .AMwarn .el-message-box__header {
    background-color: #e95c5c;
    padding: 20px 20px 20px;
}

.AMwarn .el-message-box__title {
    color: white;
}

.AMwarn .el-button--primary {
    background-color: #e95c5c;
    border-color: #e95c5c;
    text-align: center;
}

.AMwarn .el-message-box__content {
    padding: 40px 20px;
}
.AMgreen .el-message-box__header {
    background-color: #1fb5ad;
    padding: 20px 20px 20px;
}

.AMgreen .el-message-box__title {
    color: white;
}
    </style>
    