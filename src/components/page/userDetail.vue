<template>
    <div class="table">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-menu"></i> 资源管理</el-breadcrumb-item>
                <el-breadcrumb-item :to="{ path: resourcePath}">{{secondTitle}}</el-breadcrumb-item>
                <el-breadcrumb-item>{{student.name}}</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div style="float:left;width:30%">
            <div class='UserDetailTitle'>
                <!--  <i class=el-icon-my-tongxunlu style="font-size:31px"></i> -->
                <span style="font-weight:600;font-size:22px">用户资料</span>
                <div style='position:absolute;top:10px;right:50px'>
                    <div class='addU' @click='addU' v-if="this.getStatus == '待认领'"></div>
                    <el-button v-if='this.getResource==2' type="primary" size="mid" class='recognizeR' @click='recognizeResource'><img src="../../../static/img/recognize.png" alt="" width='20' style="margin-top:-7px;margin-left:-55px">
                        <span style="position:absolute;top:15px;right:8px;font-size:12px">认证资源</span></el-button>
                    <el-button v-if='this.getResource==3' type="primary" size="mid" class='activateR' @click='activateResource'><img src="../../../static/img/activate.png" alt="" width='20' style="margin-top:-7px;margin-left:-55px">
                        <span style="position:absolute;top:15px;right:8px;font-size:12px">激活资源</span></el-button>
                </div>
            </div>
            <el-form id='aform' label-width="102px" label-position='left' style='border-top:1px solid #e8e8e8 ;padding-left:10px'>
                <el-form-item label="姓名:" prop='name'>
                    <span>{{student.name}}</span>
                </el-form-item>
                <el-form-item label="性别:" prop='sex'>
                    <span>{{student.sex}}</span>
                </el-form-item>
                <el-form-item label="年龄:" prop='age'>
                    <span>{{student.age}}</span>
                </el-form-item>
                <el-form-item label="家长:" prop='parent'>
                    <span style='width:100px;float:left'>{{student.parent}}</span>
                    <el-col :span="11">
                        <span>{{student.parent_phone}}</span>
                    </el-col>
                </el-form-item>
                <el-form-item label="">
                    <span style='width:100px;float:left'>{{student.parent1}}</span>
                    <el-col :span="11">
                        <span>{{student.parent1_phone}}</span>
                    </el-col>
                </el-form-item>
                <el-form-item label="渠道来源:" prop='channel'>
                    <span>{{student.channel}}</span>
                </el-form-item>
                <el-form-item label="校区:" prop='school'>
                    <span>{{student.school}}</span>
                </el-form-item>
                <el-form-item label="录入时间:" prop='time'>
                    <span>{{student.time}}</span>
                </el-form-item>
                <el-form-item label="课程顾问(CC):" prop='teacher' v-if=''>
                    <!-- 判断是不是未认领 -->
                    <span>{{student.teacher}}</span>
                </el-form-item>
            </el-form>
        </div>
        <el-dialog :title="editOrAct" :visible.sync="dialogFormVisibleAdd" :close-on-click-modal="no" top='9.7%' id='userDetailDialog'>
            <el-form ref="form" :model="form" :rules='rule' label-width="80px">
                <el-form-item label="学生姓名" prop='names'>
                    <el-input v-model="form.names" placeholder='请输入学生姓名' style="width:142px"></el-input>
                </el-form-item>
                <el-form-item label="性别" prop='sex'>
                    <el-select v-model="form.sex" placeholder="请选择性别" style="width:142px">
                        <el-option label="男" value="1"></el-option>
                        <el-option label="女" value="2"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="年龄" prop='age'>
                    <el-select v-model="form.age" placeholder="选择" style="width:142px">
                        <el-option label="2" value="2"></el-option>
                        <el-option label="3" value="3"></el-option>
                        <el-option label="4" value="4"></el-option>
                        <el-option label="5" value="5"></el-option>
                        <el-option label="6" value="6"></el-option>
                        <el-option label="7" value="7"></el-option>
                        <el-option label="8" value="8"></el-option>
                        <el-option label="9" value="9"></el-option>
                        <el-option label="10" value="10"></el-option>
                        <el-option label="11" value="11"></el-option>
                        <el-option label="12" value="12"></el-option>
                        <el-option label="13" value="13"></el-option>
                        <el-option label="14" value="14"></el-option>
                        <el-option label="15" value="15"></el-option>
                        <el-option label="16" value="16"></el-option>
                        <el-option label="17" value="17"></el-option>
                        <el-option label="18" value="18"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="联系家长" required>
                    <el-form-item prop="parent" style="width:142px;margin-right:30px;float:left">
                        <el-input v-model="form.parent" placeholder='请输入家长姓名'></el-input>
                    </el-form-item>
                    <el-form-item prop="con" style="width:142px;margin-right:30px;float:left">
                        <el-select v-model="form.con" placeholder="请选择关系">
                            <el-option label="妈妈" value="妈妈"></el-option>
                            <el-option label="爸爸" value="爸爸"></el-option>
                            <el-option label="爷爷" value="爷爷"></el-option>
                            <el-option label="奶奶" value="奶奶"></el-option>
                            <!--  <el-option :label="connect" value="1"></el-option>
      <el-option :label="connect1" value="0"></el-option> -->
                        </el-select>
                    </el-form-item>
                    <el-form-item prop="phone" style="width:142px;float:left">
                        <el-input v-model="form.phone" placeholder='请输入手机号'></el-input>
                    </el-form-item>
                </el-form-item>
                <el-form-item label="">
                    <el-form-item prop="parent1" style="width:142px;margin-right:30px;float:left">
                        <el-input v-model="form.parent1" placeholder='请输入家长姓名'></el-input>
                    </el-form-item>
                    <el-form-item prop="con1" style="width:142px;margin-right:30px;float:left">
                        <el-select v-model="form.con1" placeholder="请选择关系">
                            <el-option label="妈妈" value="妈妈"></el-option>
                            <el-option label="爸爸" value="爸爸"></el-option>
                            <el-option label="爷爷" value="爷爷"></el-option>
                            <el-option label="奶奶" value="奶奶"></el-option>
                            <!--  <el-option :label="connect" value="1"></el-option>
      <el-option :label="connect1" value="0"></el-option> -->
                        </el-select>
                    </el-form-item>
                    <el-form-item prop="phone1" style="width:142px;float:left">
                        <el-input v-model="form.phone1" placeholder='请输入手机号'></el-input>
                    </el-form-item>
                    <el-col :span="2">
                        <span style="margin-left:10px;width:200px;color:grey"> (选填)</span>
                    </el-col>
                </el-form-item>
                <el-form-item label="所在地区" required>
                    <el-form-item prop="city_id" style="width:142px;margin-right:30px;float:left">
                        <el-select v-model="form.city_id" filterable placeholder="请选择城市" @change='getRegion'>
                            <el-option v-for="item in cities" :key="item.id" :label="item.city_name" :value="item.id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item prop="area_id" style="width:142px;margin-right:30px;float:left">
                        <el-select v-model="form.area_id" placeholder="请选择城区">
                            <el-option v-for="item in regions" :key="item.id" :label="item.city_name" :value="item.id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item prop="address" style="width:142px;float:left">
                        <el-input v-model="form.address" placeholder='请输入具体地址'></el-input>
                    </el-form-item>
                </el-form-item>
                <el-form-item label="就近校区" prop='school_id'>
                    <el-select v-model="form.school_id" placeholder="请选择校区" style="width:142px">
                        <el-option v-for="item in schoolsNear" :key="item.id" :label="item.title" :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="来源渠道" prop='sour_id'>
                    <el-form-item prop='sour_id' style="width:142px;margin-right:30px;float:left">
                        <el-select v-model="form.sour_id" placeholder="请选择渠道">
                            <el-option v-for="item in source" :key="item.id" :label="item.names" :value="item.id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item prop='referee' style='float:left;width:142px;margin-right:10px'>
                        <el-autocomplete v-if='this.form.sour_id == 4' v-model="form.referee" :fetch-suggestions="querySearchAsync" placeholder="请输入内容" @select="handleSelect">
                        </el-autocomplete>
                    </el-form-item>
                    <el-form-item prop='familys_name' style='float:left;width:100px;'>
                        <span v-if='this.form.sour_id == 4'>家长姓名:{{form.familys_name}}</span>
                    </el-form-item>
                    <el-form-item prop='referral_uid' style="display:none">
                        <span>{{form.referral_uid}}</span>
                    </el-form-item>
                    <el-form-item prop='familys' style="display:none">
                    </el-form-item>
                    <span v-if='nostudent' style="width:200px;color:red;float:left"> {{warning}}</span>
                </el-form-item>
                <el-form-item label="更换TMK" prop='tmk_id' v-if="code =='tmk_m'">
                    <el-select v-model="form.tmk_id" placeholder="请选择TMK" style="width:142px">
                        <el-option v-for="item in tmks" :key="item.key" :label="item.label" :value="item.key">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item style='margin-top:20px'>
                    <el-button type="primary" @click="onSubmit('form')">确定</el-button>
                    <el-button>取消</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
        <el-dialog title="认证资源" :visible.sync="dialogFormVisible2" :close-on-click-modal="no" top='33%' size='tiny' show-close style='z-index:100' class='schoolDialog'>
            <div slot="footer" class="dialog-footer" style='text-align:center'>
                <el-button @click="recoToNo">认证为无效</el-button>
                <el-button type="primary" @click="restartResource">重新激活</el-button>
                <br>
                <br>
                <br>
                <span style="color:#ec6161;">*请在了解资源实际情况后做出判断</span>
            </div>
        </el-dialog>
        <el-dialog title="修改资源所属校区" :visible.sync="dialogFormVisible3" :close-on-click-modal="no" top='33%' size='tiny' show-close style='z-index:100' class='schoolDialog'>
            <el-form :model="actSchool" id='actSchool1'>
                <el-form-item label="激活资源到:" prop='actToSchool'>
                    <!-- <el-select v-model="actSchool.actToSchool" placeholder="请选择校区" style="width:142px" >
      <el-option label="徐锦江" value="1"></el-option>
      <el-option label="刘青云" value="0"></el-option>
    </el-select> -->
                    <el-select v-model="actSchool.actToSchool" filterable remote placeholder="请输入校区关键词" :remote-method="remoteMethod" :loading="loading">
                        <el-option v-for="item in schools" :key="item.value" :label="item.label" :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer" style='text-align:center;margin-top:-24px'>
                <el-button type="primary" @click="editResourceAct">确 定</el-button>
                <el-button @click="dialogFormVisible3 = false">取 消</el-button>
                <br>
                <span style="color:#ec6161;">*请在了解资源实际情况后做出判断</span>
            </div>
        </el-dialog>
        <div style="float:left;width:34%;">
            <div class='communityTitle'>
                <!--  <i class=el-icon-my-tongxunlu style="font-size:31px"></i> -->
                <span style="font-weight:600;font-size:22px">沟通记录({{number}})</span>
                <div style='position:absolute;top:10px;right:10px'>
                    <div class='addR' @click='addComm'></div>
                </div>
            </div>
            <div style="min-height:300px">
                <el-row v-for='item in items' class='listReturn' style='position:relative;min-height:75px'>
                    <el-col :span="4" style='text-align:right'>
                        <img :src="item.tmk.avatar" width='50' alt="" style='border-radius:50%;margin-top:10px;margin-right:12%'></el-col>
                    <el-col :span="20">
                        <div style="height:30px">
                            <div style='margin-top:10px;float:left'>{{item.tmk.uname}}</div>
                            <div style="font-size:13px;color:grey;margin-top:10px;text-align:right;float:right">{{item.create_at.substring(5,16)}}</div>
                        </div>
                        <div>
                            <div style="font-size:14px;color:grey;margin-top:5px;">{{item.remark}}</div>
                        </div>
                        <div>
                            <div class='editSpan' @click='editReturn(item.index,item)' v-if="new Date().getTime()-new Date(item.create_at).getTime()<7200000 && item.tmk.uname == userName"></div>
                        </div>
                    </el-col>
                </el-row>
            </div>
            <div class="block" v-if="this.total!=''">
                <el-pagination layout="prev, pager, next" :total="total" :current-page="currentPage" :page-size="pagesize" @current-change="handleCurrentChange">
                </el-pagination>
            </div>
        </div>
        <el-dialog :title="communityTitle" :visible.sync="dialogFormVisible" :close-on-click-modal="no" size='tiny' show-close style='z-index:100' class='tagDialog'>
            <el-form :model="commuForm" id='detailForm'>
                <el-form-item label="">
                    <el-input type="textarea" :autosize="{ minRows: 3, maxRows: 4}" placeholder="请输入内容" v-model="commuForm.remark">
                    </el-input>
                </el-form-item>
                <el-form-item label="下次跟进时间:">
                    <el-date-picker v-model="commuForm.remind_time" type="datetime" placeholder="选择日期时间">
                    </el-date-picker>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="commuFormSubmit('commuForm')">确 定</el-button>
                <el-button @click="dialogFormVisible = false">取 消</el-button>
            </div>
        </el-dialog>
        <div style="float:left;width:36%" v-if="this.getStatus != '待认领'">
            <div class='addUserTitle'>
                <!--  <i class=el-icon-my-tongxunlu style="font-size:31px"></i> -->
                <span style="font-weight:600;font-size:22px;margin-left:20px">邀约记录({{number1}})</span>
            </div>
            <div style="min-height:298px">
                <el-row v-for='item in items1' class='listReturn' style='position:relative;margin-left:30px;'>
                    <div style="font-weight:600;magin-right:5px">邀约日期: {{item.alert_time.substring(0,16)}}</div>
                    <div class='inviteRecord'>邀约课程: <span style="color:grey">{{item.course_name.title}}</span> </div>
                    <div class='inviteRecord'>上课老师: <span style="color:grey">{{item.teach_name}}</span></div>
                    <div class='inviteRecord'>记录时间: <span style="color:grey">{{item.created.substring(0,16)}}</span></div>
                    <div class='inviteRecord'>到访设置: <span :style="{color:item.fla == '已到访'?'blue':'grey'}">{{item.fla}}</span></div>
                </el-row>
            </div>
            <div class="block" v-if="this.total1!=''">
                <el-pagination layout="prev, pager, next" :total="total1" :current-page="currentPage1" :page-size="pagesize1" @current-change="handleCurrentChange1">
                </el-pagination>
            </div>
        </div>
    </div>
</template>
<script>
var token, user
import {
    cityList,
    put_community,
    create_community,
    activateResource,
    campusList,
    getUserList,
    getUserCommList,
    getTMK,
    sourceList,
    repeatStudentList,
    getUserInviteList,
    put_student
} from '../../api/api';
import {
    mapGetters
} from 'vuex';

export default {
    data() {
            var nan = (rule, value, callback) => {
                if (value === '') {
                    callback('请选择')
                } else if (typeof value == 'number') {
                    callback();
                }
            }
            return {
                nostudent: false,
                warning: '*系统中没有该成员',
                userName: '',
                loading: false,
                schools: [],
                list: [],
                student: {
                    name: '',
                    sex: '',
                    age: '',
                    parent: '',
                    parent_phone: '',
                    parent1: '',
                    parent1_phone: '',
                    channel: '',
                    school: '',
                    time: '',
                    teacher: ''
                },
                items: [],
                items1: [],
                dialogFormVisible: false,
                dialogFormVisibleAdd: false,
                dialogFormVisible2: false,
                dialogFormVisible3: false,
                no: false,
                number: 0,
                number1: 0,
                commuForm: {
                    remark: '',
                    remind_time: '',
                    customer_id: '',
                    call_id: ''
                },
                actSchool: {
                    actToSchool: ''
                },
                currentPage: 1, //页数
                currentPage1: 1, //页数
                pagesize: 4, //默认每页
                pagesize1: 2, //默认每页
                total: 0,
                total1: 0,
                regions: [],
                schoolsNear: [],
                source: [],
                tmks: [],
                backUp: '',
                form: {
                    names: '',
                    sex: '',
                    age: '',
                    parent: '',
                    parent1: '',
                    con: '',
                    con1: '',
                    phone: '',
                    phone1: '',
                    familys: '',
                    city_id: '',
                    area_id: '',
                    address: '',
                    school_id: '',
                    sour_id: '',
                    referee: '',
                    familys_name: '',
                    referral_uid: '',
                    familys: '',
                    tmk_id: '',
                    isActivate: ''
                },
                cities: [],
                in : '',
                isActivate: '',
                code: '',
                rule: {
                    names: [{
                        required: true,
                        message: '请输入姓名',
                        trigger: 'blur'
                    }, ],
                    sex: [{
                        required: true,
                        trigger: 'blur'
                    }, ],
                    age: [{
                        required: true,
                        trigger: 'blur'
                    }, ],
                    parent: [{
                        required: true,
                        trigger: 'blur'
                    }, ],
                    con: [{
                        required: true,
                        trigger: 'blur'
                    }, ],
                    phone: [{
                        required: true,
                        trigger: 'blur'
                    }, ],
                    city_id: [{
                        required: true,
                        validator: nan,
                        trigger: 'blur'
                    }, ],
                    area_id: [{
                        required: true,
                        validator: nan,
                        trigger: 'blur'
                    }, ],
                    address: [{
                        required: true,
                        trigger: 'blur'
                    }, ],
                    school_id: [{
                        required: true,
                        validator: nan,
                        trigger: 'blur'
                    }, ],
                    sour_id: [{
                        required: true,
                        validator: nan,
                        trigger: 'blur'
                    }, ]
                }

            }
        },
        methods: {
            onSubmit(formName) { //修改用户资料提交
                this.$refs[formName].validate((valid) => { //替换提交服务
                    if (valid) {
                        if (this.form.parent1 || this.form.con1 || this.form.phone1) {
                            this.form.familys = this.form.parent + '|' + this.form.con + '|' + this.form.phone + ',' + this.form.parent1 + '|' + this.form.con1 + '|' + this.form.phone1
                        } else {
                            this.form.familys = this.form.parent + '|' + this.form.con + '|' + this.form.phone
                        }
                        this.form.customer_id = this.getUId;
                        this.form.isActivate = this.isActivate;
                        let para = this.form;
                        put_student(para, token).then(res => {
                            // console.log('succ')
                            if (res.code == 0) {
                                this.$message({
                                    message: '修改成功',
                                    type: 'success'
                                });
                                this.dialogFormVisibleAdd = false;
                                this.isActivate = '';
                            } else {
                                this.$message.error(res.data);
                            }
                        })
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });

            },
            handleSelect(item) { //转介绍时 选择同名的人后
                this.nostudent = false;
                this.form.familys_name = item.familys_name;
                this.form.referral_uid = item.referral_uid
            },
            querySearchAsync(queryString, cb) { //转介绍时 输入姓名 同步搜索
                let para = {
                    input: queryString
                }
                repeatStudentList(token, para).then(res => {
                    // console.log(res.data)
                    if (res.data.length != 0) {
                        this.studentsList = res.data.map(item => {
                            return {
                                referral_uid: item.label.uid,
                                value: item.label.nickname,
                                familys_name: item.label.familys_name,
                                mobile: item.label.mobile
                            }
                        })
                        var studentsList = this.studentsList;
                        if (isNaN(queryString)) {

                            var results = studentsList.filter(item => {
                                return item.value.indexOf(queryString) > -1
                            });
                        } else {
                            var results = studentsList
                        }
                    } else {
                        var results = [];
                        this.nostudent = true;
                    }

                    clearTimeout(this.timeout);
                    this.timeout = setTimeout(() => {
                        cb(results);
                    }, 2000 * Math.random());
                })

            },
            remoteMethod(query) { //远程搜索，录入时进行过滤
                if (query !== '') {
                    this.loading = true;
                    setTimeout(() => {
                        this.loading = false;
                        this.schools = this.list.filter(item => {
                            return item.label.toLowerCase()
                                .indexOf(query.toLowerCase()) > -1;
                        });
                    }, 200);
                } else {
                    this.schools = [];
                }
            },
            activateResource() { //点击激活资源
                this.$confirm('是否确认激活该资源?', '激活资源', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    customClass: 'green',
                }).then(() => {
                    this.addU();
                    this.isActivate = '1';
                })
            },

            recognizeResource() { //点击认证资源
                this.dialogFormVisible2 = true;
            },

            restartResource() { //点击重新激活资源
                this.dialogFormVisible3 = true;
                this.dialogFormVisible2 = false;
            },
            editResourceAct() { //确认激活
                let para = {
                    option: '2',
                    customer_id: this.getUId,
                    school_id: this.actSchool.actToSchool

                }
                activateResource(para, token).then(res => {

                })
                this.dialogFormVisible2 = false;
            },
            recoToNo() { //确认无效
                let para = {
                    option: '1',
                    customer_id: this.getUId

                }
                activateResource(para, token).then(res => {

                })
                this.dialogFormVisible2 = false;
            },

            addComm() { //点击添加沟通记录
                console.log(this.getUserId)
                this.in = '';
                this.commuForm.remind_time = '';
                this.commuForm.remark = '';
                this.commuForm.customer_id = this.getUId;
                this.commuForm.call_id = '';
                this.dialogFormVisible = true
            },
            commuFormSubmit(formName) { //提交 添加沟通记录
                this.commuForm.remind_time = new Date(this.commuForm.remind_time).toLocaleString();
                create_community(this.commuForm, token).then(() => {
                    let p = {
                        page: '1',
                        customer_id: this.getUId
                    }
                    getUserCommList(token, p).then(res => {
                        this.number = res.data.total;
                        this.items = res.data.data;
                        let c = res.data.last_page * this.pagesize;
                        this.total = parseInt(c);
                    })
                    this.currentPage = 1;
                    this.dialogFormVisible = false
                })


            },

            editReturn(index, item) { //点击修改沟通记录
                this.in = '1';
                this.commuForm.remark = item.remark
                this.commuForm.remind_time = item.remind_time;
                this.commuForm.customer_id = this.getUId //this.getUserId;
                this.commuForm.call_id = item.id;
                this.dialogFormVisible = true

            },
            getRegion() { //获取城市，就近校区
                let para = {
                    pid: this.form.city_id
                }
                let para1 = {
                    city_id: this.form.city_id,
                    simple: '1'

                }
                cityList(token, para).then((res) => {
                    // console.log(res)
                    this.regions = res.data
                })
                campusList(para1, token).then(res => {
                    this.schoolsNear = res.data
                })


            },
            addU() { //点击修改用户资料
                this.nostudent = false;
                this.isActivate = '';
                let para = {
                    customer_id: this.getUId
                }
                getUserList(token, para).then(res => { //获取用户资料
                    let data = res.data;
                    this.form = {
                        names: data.info.names,
                        sex: data.info.sex === '男' ? '1' : '2',
                        age: data.info.age + '',
                        parent: data.famliy[0].uname,
                        parent1: data.famliy[1] ? data.famliy[1].uname : '',
                        con: data.famliy[0].relation,
                        con1: data.famliy[1] ? data.famliy[1].relation : '',
                        phone: data.famliy[0].mobile,
                        phone1: data.famliy[1] ? data.famliy[1].mobile : '',
                        familys: '',
                        city_id: data.info.city_id - 0,
                        area_id: data.info.area_id - 0,
                        address: data.info.address,
                        school_id: data.info.school_id - 0,
                        sour_id: data.info.sour_id - 0,
                        referee: data.info.referral ? data.info.referral.nickname : '', //推荐人名字
                        familys_name: '', //推荐人家长姓名
                        referral_uid: data.info.referral_uid, //推荐人id
                        familys: '',
                        tmk_id: '',
                        isActivate: '',
                    }
                }).then(() => {
                    this.getRegion();

                })

                getTMK(token).then((res) => {
                    this.tmks = res.data
                })
                sourceList(token).then(res => {
                    this.source = res.data
                })
                this.dialogFormVisibleAdd = true
            },
            handleCurrentChange: function(val) { //变更页数
                this.currentPage = val;
                let p = {
                    page: this.currentPage,
                    customer_id: this.getUId
                }
                getUserCommList(token, p).then(res => {
                    this.number = res.data.total;
                    this.items = res.data.data;
                    let c = res.data.last_page * this.pagesize;
                    this.total = parseInt(c);
                })
            },
            handleCurrentChange1: function(val) { //变更页数
                this.currentPage1 = val;
                let p = {
                    page: this.currentPage1,
                    customer_id: this.getUId
                }
                getUserInviteList(token, p).then(res => {
                    this.number1 = res.data.total;
                    this.items1 = res.data.data;
                    let c = res.data.last_page * this.pagesize1;
                    this.total1 = parseInt(c);
                })
            },
            searchStudent() {
                if (this.form.referee) {
                    this.nostudent = true; //调服务查询
                }
            },

        },
        computed: {
            editOrAct() {
                if (this.isActivate === '') {
                    return '修改用户'
                } else {
                    return '确认资源资料'
                }
            },
            secondTitle() {
                if (this.getResource === 1) {
                    return '我的资源'
                } else if (this.getResource === 2) {
                    return '无需求资源'
                } else if (this.getResource === 3) {
                    return '无效资源'
                }
            },
            resourcePath() {
                if (this.getResource === 1) {
                    return '/myResource'
                } else if (this.getResource === 2) {
                    return '/noDemandResource'
                } else if (this.getResource === 3) {
                    return 'invalidResource'
                }
            },
            communityTitle() {
                if (this.in === '') {
                    return '添加沟通记录'
                } else {

                    return '修改沟通记录'
                }

            },
            ...mapGetters([
                'getStatus',
                'getUId',
                'getResource'
                // ...
            ]),

        },
        beforeCreate() {
            user = localStorage.getItem('user');
            token = JSON.parse(user).token;
        },
        created() {
            this.userName = JSON.parse(user).uname;
            this.code = JSON.parse(user).job ? JSON.parse(user).job.code : '';
            let para = {
                customer_id: this.getUId
            }
            getUserList(token, para).then(res => { //获取用户资料
                let {
                    names,
                    age,
                    sex,
                    source_name,
                    school_name,
                    created,
                    cc_name
                } = res.data.info;
                this.student = {
                    name: names,
                    age: age,
                    sex: sex,
                    school: school_name,
                    channel: source_name,
                    time: created,
                    parent: res.data.famliy[0].uname + '(' + res.data.famliy[0].relation + ')',
                    parent_phone: res.data.famliy[0].mobile,
                    parent1: res.data.famliy[1] ? res.data.famliy[1].uname + '(' + res.data.famliy[1].relation + ')' : '',
                    parent1_phone: res.data.famliy[1] ? res.data.famliy[1].mobile : '',
                    teacher: cc_name

                }
            }).catch(() => {
                console.log('No Data')
            })
            let p = {
                page: this.currentPage,
                customer_id: this.getUId
            }
            getUserCommList(token, p).then(res => { //获取沟通记录
                this.number = res.data.total;
                this.items = res.data.data;
                let c = res.data.last_page * this.pagesize;
                this.total = parseInt(c);
            })
            getUserInviteList(token, p).then(res => { //获取邀约记录
                this.number1 = res.data.total;
                this.items1 = res.data.data;
                let c = res.data.last_page * this.pagesize1;
                this.total1 = parseInt(c);
            })
            cityList(token).then((res) => { //获取城市 表格中用
                // console.log(res)
                this.cities = res.data
            })
            let cam = {
                simple: '1'
            };
            campusList(cam, token).then((res) => { //获取校区 激活资源中用
                let a = res.data;
                this.schools = a.map(item => {
                    return {
                        value: item.id,
                        label: item.title
                    };
                });
                this.list = a.map(item => {
                    return {
                        value: item.id,
                        label: item.title
                    };
                });
            })
        }
}
</script>
<style>
.UserDetailTitle {
    padding: 10px;
    position: relative;
    background: url(../../../static/img/contact.png) left center/25px no-repeat;
    padding-left: 27px
}

.communityTitle {
    padding: 10px;
    position: relative;
    background: url(../../../static/img/comuni.png) left center/30px no-repeat;
    padding-left: 30px
}

.addUserTitle {
    padding: 10px;
    position: relative;
}

#aform .el-form-item {
    margin-bottom: 0
}

#aform .el-form-item__label {
    padding: 8px 12px 5px 0;
}

#aform .el-form-item__content {
    line-height: 30px
}

.listReturn {
    /*min-height: 100px;*/
    /*height: auto;*/
    border-top: 1px solid #e8e8e8;
    /*border-bottom:1px solid grey;*/
}

.listReturn:last-child {
    border-bottom: 1px solid #e8e8e8;
    /*border-bottom:1px solid grey;*/
}

.el-tag--success {
    background-color: #1fb5ad;
    border-color: #bcf1d4;
    color: #FFFFFF;
    border-radius: 25px;
}

.activateR {
    background-color: #dac779;
    border-color: #dac779;
    height: 30px;
    line-height: 0;
    width: 80px
}

.recognizeR {
    background-color: #f29c9c;
    border-color: #f29c9c;
    height: 30px;
    line-height: 0;
    width: 80px
}

.listReturn:nth-child(6) {
    margin-left: 48px
}

.editSpan {
    height: 30px;
    background: url(../../../static/img/edit.png) right/30px 30px no-repeat;
    cursor: pointer;
    margin-top: 15px;
}

.editSpan:hover {
    background-image: url(../../../static/img/edit_h.png);
}

.addU {
    width: 30px;
    height: 30px;
    background-image: url(../../../static/img/editU.png);
    background-size: 30px 30px;
    cursor: pointer;
}

.addU:hover {
    background-image: url(../../../static/img/editU_h.png);
}

.addR {
    width: 30px;
    height: 30px;
    background-image: url(../../../static/img/addR.png);
    background-size: 30px 30px;
    cursor: pointer;
}

.addR:hover {
    background-image: url(../../../static/img/addR_h.png);
}

.block {
    text-align: center;
    margin-top: 10px;
}

#detailForm .el-form-item .el-form-item__content .el-checkbox {
    margin-left: 15px
}

#userDetailDialog .el-dialog .el-dialog__body {
    padding: 10px 20px 0 20px;
}

#userDetailDialog .el-dialog--small {
    width: 56%;
}

.el-dialog .el-dialog__header {
    background-color: #1fb5ad;
    padding: 20px 20px 20px;
}

.el-dialog .el-dialog__title {
    color: white;
}

.inviteRecord {
    font-size: 14px;
    margin: 10px;
}

.schoolDialog .el-dialog__body {
    text-align: center;
    /*color:#ec6161;*/
}

.green .el-message-box__header {
    background-color: #1fb5ad;
    padding: 20px 20px 20px;
}

.green .el-message-box__title {
    color: white;
}
</style>
