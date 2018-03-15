<template>

    <div class="tobeH">
        <!-- <el-breadcrumb separator="/">
            <el-breadcrumb-item><i class="el-icon-my-moban"></i> 资源管理</el-breadcrumb-item>
            <el-breadcrumb-item class='ss'>无效资源</el-breadcrumb-item>
        </el-breadcrumb> -->
        <div class='tobeH1'>
            <h3 class="tobeH3">
                待定资源
                <span v-if="number==='0'" style="font-size:14px;color: #bdb8b8;">加载中...</span>
               <span v-else>({{number}}人)</span>
            </h3>
            <!-- <div class="tobeH2">
                <div class='tobeH15'>
                    <el-select v-model="value" clearable placeholder="选择校区" filterable @change="updateList">
                        <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                        </el-option>
                    </el-select>
                </div>
                <div class='tobeH15'>
                    <el-cascader :options="options2" :props="propsource" v-model="value2" :show-all-levels="false" @change="updateList" clearable
                        change-on-select placeholder="选择渠道">
                    </el-cascader>
                </div>
                <div class='tobeH16'>
                    <el-date-picker v-model="value3" type="daterange" placeholder="录入时间" @change="updateList" :picker-options="pickerOptions0">
                    </el-date-picker>
                </div>    
            </div>    -->
        </div>
        <div id="tobeH5">
            <el-table :data="noEffData"  style="width: 100%" @sort-change='sortChange'>
                <el-table-column prop="uname" label="姓名">
                    <template scope="scope">
                        <span @click="switchDetail(scope.row)" class='tobeH6'>{{scope.row.uname}}</span>
                    </template>
                </el-table-column>
                <!-- <el-table-column prop="sex" label="性别">
                </el-table-column> -->
                <el-table-column prop="age" label="年龄" >
                </el-table-column>
                <!-- <el-table-column prop="patriarch" label="家长" >
                </el-table-column> -->
                <el-table-column prop="source" label="渠道来源" >
                </el-table-column>
                <el-table-column prop="mobile" label="手机" :formatter="formatter">
                </el-table-column>
                <el-table-column prop="created" label="认领时间" sortable='custom'>
                </el-table-column>
                <el-table-column prop="statu_code" label="资源状态" >
                        <template scope="scope">
                        <span :style="scope.row.statu_code=='待定'? 'color:#89d06f': 'color:#bfbfbf' ">{{scope.row.statu_code}}</span>
                        </template>
                </el-table-column>
            </el-table>
        </div>
        <div class="block">
              <!-- <span class="demonstration"></span> -->
            <el-pagination layout="prev, pager, next" :total="total" :current-page="currentPage" :page-size="pagesize" @current-change="handleCurrentChange">
            </el-pagination>
        </div>
           <!-- 修改学员资料 -->
           <el-dialog title="分配到校区" :visible.sync="dialogFormVisibleSign" :close-on-click-modal="no" top='8%'  @close="resetD('signform')">
            <el-form :model="signform" :rules='Confirmrule' ref="signform" label-width="80px">
                <el-form-item label="学生姓名" prop='names'>
                    <el-input v-model="signform.names" placeholder='请输入学生姓名' class="tobeH13"></el-input>
                </el-form-item>
                <el-form-item label="性别" prop='sex'>
                    <el-select v-model="signform.sex" placeholder="请选择性别" class="tobeH13">
                        <el-option label="男" value="1"></el-option>
                        <el-option label="女" value="2"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="年龄" prop='age'>
                        <el-select v-model="signform.age" placeholder="选择" class='tobeH13'>
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
                    <el-form-item prop="parent" class="tobeH8">
                        <el-input v-model="signform.parent" placeholder='请输入家长姓名'></el-input>
                    </el-form-item>
                    <el-form-item prop="con" class="tobeH8">
                        <el-select v-model="signform.con" placeholder="请选择关系">
                            <el-option label="妈妈" value="妈妈"></el-option>
                            <el-option label="爸爸" value="爸爸"></el-option>
                            <el-option label="爷爷" value="爷爷"></el-option>
                            <el-option label="奶奶" value="奶奶"></el-option>
                            <el-option label="外公" value="外公"></el-option>
                            <el-option label="外婆" value="外婆"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item prop="phone" class='tobeH7'>
                        <el-input v-model="signform.phone" placeholder='请输入手机号' :maxlength='maxlength'></el-input>
                    </el-form-item>
                </el-form-item>
                <el-form-item label="">
                    <el-form-item prop="parent1" class="tobeH8">
                        <el-input v-model="signform.parent1" placeholder='请输入家长姓名' @blur='checkP1'></el-input>
                    </el-form-item>
                    <el-form-item prop="con1" class="tobeH8">
                        <el-select v-model="signform.con1" clearable placeholder="请选择关系" @change='checkP1'>
                            <el-option label="妈妈" value="妈妈"></el-option>
                            <el-option label="爸爸" value="爸爸"></el-option>
                            <el-option label="爷爷" value="爷爷"></el-option>
                            <el-option label="奶奶" value="奶奶"></el-option>
                            <el-option label="外公" value="外公"></el-option>
                            <el-option label="外婆" value="外婆"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item prop="phone1" class="tobeH7">
                        <el-input v-model="signform.phone1" placeholder='请输入手机号' :maxlength='maxlength' @blur='checkP1'></el-input>
                    </el-form-item>
                    <!-- <el-col > -->
                        <span class="tobeH12"> (选填)</span>
                    <!-- </el-col> -->
                </el-form-item>
                <el-form-item label="所在地区" required>
                    <el-form-item prop="city_id"  class="tobeH8">
                        <el-select v-model="signform.city_id" filterable placeholder="请选择城市" @change='getRegion'>
                            <el-option v-for="item in cities" :key="item.id" :label="item.city_name" :value="item.id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item prop="area_id"  class="tobeH8">
                        <el-select v-model="signform.area_id" placeholder="请选择城区">
                            <el-option v-for="item in regions" :key="item.id" :label="item.city_name" :value="item.id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item prop="address"  class="tobeH7">
                        <el-input v-model="signform.address" placeholder='请输入具体地址'></el-input>
                    </el-form-item>
                </el-form-item>
                <el-form-item label="就近校区" prop='school_id' class="tobeH9">
                    <el-select v-model="signform.school_id" placeholder="请选择校区" style="width:142px">
                        <el-option v-for="item in schoolsNear" :key="item.id" :label="item.title" :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" :loading='writeL' @click="nextToSign('signform')">确定</el-button>
                <el-button @click="dialogFormVisibleSign = false">取消</el-button>
            </div>
        </el-dialog> 
        <el-dialog title="资源详情" :visible.sync="dialogFormVisibleClass" :close-on-click-modal="no" custom-class='tobeH4'
        top='12%' size='tiny'>
        <el-form id='aform' label-width="102px" label-position='left' style='padding:0 10%'>
                <el-form-item label="姓名:" prop='uname'>
                    <span>{{student.uname}}</span>
                </el-form-item>
                <!-- <el-form-item label="性别:" prop='sex'>
                    <span>{{student.sex}}</span>
                </el-form-item> -->
                <el-form-item label="年龄:" prop='age'>
                    <span>{{student.age}}</span>
                </el-form-item>
                <!-- <el-form-item label="家长:" prop='parent'>
                    <span>{{student.parent}}</span>
                </el-form-item> -->
                <el-form-item label="渠道来源:" prop='source'>
                    <span>{{student.source}}</span>
                </el-form-item>
                <el-form-item label="手机:" prop='mobile'>
                    <span>{{student.mobile}}</span>
                </el-form-item>
                <el-form-item label="认领时间:" prop='created'>
                    <span>{{student.created}}</span>
                </el-form-item>
                <el-form-item label="资源状态:" prop='statu_code'>
                    <span>{{student.statu_code}}</span>
                </el-form-item>
                <!-- <el-form-item label="学生家长:" prop='parent'>
                    <span style='float:left;margin-right:10px;'>{{student.contacts_user}}</span>
                    <el-col :span="11">
                        <span>{{student.contacts_user_mobile}}</span>
                    </el-col>
                </el-form-item>
                <el-form-item label="" v-if='student.contacts_user_2||student.contacts_user_mobile_2'>
                    <span style='float:left;margin-right:10px;'>{{student.contacts_user_2}}</span>
                    <el-col :span="11">
                        <span>{{student.contacts_user_mobile_2}}</span>
                    </el-col>
                </el-form-item>
                <el-form-item label="所在校区:" prop='school'>
                    <span>{{student.title}}</span>
                </el-form-item>
                <el-form-item label="CC:" prop='teacher' >
                    <span>{{student.cname}}</span>
                </el-form-item>
                <el-form-item label="他的课程:" prop='teacher' v-if="student.course.length!=0">
                    <div v-for="item in student.course">
                        {{item.title}}({{item.tname}})
                    </div>
                    </el-form-item> -->
                    <div style='display:flex;justify-content:space-between;padding:20px 0' v-if="student.statu_code!=''">
                        <el-button type="primary" @click="open1">分配到校区</el-button>
                        <el-button type="warning" v-if="student.statu_code!=='无意向'" @click="open(1)">设为无意向</el-button>
                        <el-button type="danger" @click="open(2)">设为无效</el-button>
                    </div>
            </el-form>
    </el-dialog>
    <el-dialog title="设置资源" :visible.sync="dialogFormVisible" :close-on-click-modal="no" top='33%' size='tiny' show-close custom-class='tobeH10'>
        <!-- <el-form :model="resourceSchool" id='actSchool1'>
            <el-form-item label="分配给:" prop='valueTMK'>
                <el-select v-model="resourceSchool.valueTMK" clearable placeholder="选择TMK">
                    <el-option v-for="item in optionsTMK" :key="item.key" :label="item.label" :value="item.key">
                    </el-option>
                </el-select>
            </el-form-item>
        </el-form> -->
        <div style="text-align:center;">
           {{syncTitle}}
        </div>
        <div slot="footer" class="dialog-footer tobeH11">
            <el-button type="primary" :loading='writeL' @click="distributeResource">是</el-button>
            <el-button @click="dialogFormVisible = false">否</el-button>
        </div>
    </el-dialog>
    </div>

</template>
<script>
    var user, token
    import {
        campusList,
        cityList,
        searchResource,
        put_student,
        tmkmyResource,
        marketUserInfo,
        setResourceType,
        create_student
    } from '../../api/api';
    // import {
    //     mapActions,mapGetters
    // } from 'vuex';
    export default {
        data() {
            var nan = (rule, value, callback) => {
                if (value === '') {
                    // console.log(1)
                    callback('请选择')
                } else if (typeof value == 'number') {
                    callback();
                }
            }
            var isName = (rule, value, callback) => {
                var myreg = /^[\u4e00-\u9fa5a-zA-Z]+$/;
                if (value == '') {
                    callback('请输入学生姓名')
                } else if (!myreg.test(value)) {
                    callback('请输入有效的学生姓名');
                } else {
                    callback();
                }
            }
            var isPName = (rule, value, callback) => {
                var myreg = /^[\u4e00-\u9fa5a-zA-Z]+$/;
                if (value == '') {
                    callback('请输入家长姓名')
                } else if (!myreg.test(value)) {
                    callback('请输入有效的家长姓名');
                } else {
                    callback();
                }
            }
            var isPName1 = (rule, value, callback) => {
                var myreg = /^[\u4e00-\u9fa5a-zA-Z]+$/;
                if (value == '') {
                    callback()
                } else if (!myreg.test(value)) {
                    callback('请输入有效的家长姓名');
                } else {
                    if(this.signform.phone1&&this.signform.con1){
                        callback();
                        }else{
                        callback('必须填写全第二家长信息');
                        }
                }
            }
            var iscon1 = (rule, value, callback) => {//修改用户
                if (value == '') {
                    callback()
                }else{
                    if(this.signform.phone1&&this.signform.parent1){
                        callback();
                        }else{
                        callback('必须填写全第二家长信息');
                        }
                }
            }
            var isPhone = (rule, value, callback) => {//修改学员
                var myreg = /^(((1[0-9]{1}))+\d{9})$/;
                if (value == '') {
                    callback('不能为空且必须唯一')
                } else if (!myreg.test(value)) {
                    callback('请输入有效手机号');
                } else {
                    let para = {
                    search: value
                    }
                    searchResource(para, token).then(res => {
                    if(res.data.data.length!=0&&res.data.data[0].id!=this.signform.id){
                    callback('此手机号码已存在');
                    }else{
                    callback();

                    }
                    })
                }
            }
            var isPhone1 = (rule, value, callback) => {
                var myreg = /^(((1[0-9]{1}))+\d{9})$/;
                if (value == '') {
                    callback()
                } else if (!myreg.test(value)) {
                    callback('请输入有效手机号');
                }else if(this.signform.phone==value){
                    callback('不要输入重复的手机号');
                    }else {
                    let para = {
                    search: value
                    }
                    searchResource(para, token).then(res => {
                    if(res.data.data.length!=0&&res.data.data[0].id!=this.signform.id){
                    callback('此手机号码已存在');
                    }else{
                        if(this.signform.parent1&&this.signform.con1){
                                callback();
                                }else{
                                callback('必须填写全第二家长信息');
                                }

                    }
                    })
                    }
            }
            return {
                maxlength:11,
                signform: {
                    names: '',
                    sex: '',
                    age:'',
                    parent: '',
                    parent1: '',
                    con: '',
                    con1: '',
                    phone: '',
                    phone1: '',
                    school_id:"",
                    city_id:'',
                    area_id:'',
                    address:''
                },
                cities:[],
                student:{
                    uname:'',
                    age:'',
                    source:'',
                    mobile:'',
                    created:'',
                    statu_code:''
                },
                regions:[],
                dialogFormVisible:false,
                schoolsNear:[],
                writeL:false,
                syncTitle:'',
                Confirmrule: {
                    names: [{
                        required: true,
                        // message: '请输入姓名',
                        validator: isName,                        
                        trigger: 'blur'
                    }, ],
                    age: [{
                        required: true,
                        message: '请选择年龄',
                        trigger: 'change'
                    }],
                    sex: [{
                        required: true,
                        message: '请选择性别',
                        trigger: 'change'
                    }],
                    parent: [{
                        required: true,
                        // message: '请输入家长姓名',
                        validator: isPName,
                        trigger: 'blur'
                    }],
                    parent1: [{
                        // message: '请输入家长姓名',
                        validator: isPName1,
                        trigger: 'blur'
                    }],
                    con: [{
                        required: true,
                        message: '请选择关系',
                        trigger: 'change'
                    }],
                    con1: [{
                        required: true,
                        validator: iscon1,
                        trigger: 'change'
                    }],
                    phone: [{
                        required: true,
                        validator: isPhone,
                        trigger: 'blur'
                    }],
                    phone1: [{
                        validator: isPhone1,
                        trigger: 'blur'
                    }],
                    school_id: [{
                        required: true,
                        validator: nan,
                        trigger: 'change'
                    }],
                    city_id: [{
                        required: true,
                        validator: nan,
                        trigger: 'change'
                    }],
                    area_id: [{
                        required: true,
                        validator: nan,
                        trigger: 'change'
                    }],
                    address: [{
                        required: true,
                        message: '请输入详细地址',
                        trigger: 'blur'
                    }],
                },
                pickerOptions0: {
                        disabledDate(time) {
                            return time.getTime() > Date.now();
                        }
                    },
                total: 0,
                dialogFormVisibleClass:false,
                dialogFormVisibleSign:false,
                no:false,
                number: '0',
                noEffData: [],
                // options: [],
                // options2: [],
                // value: '',
                // value2: [],
                // value3: '',
                // value4: '',
                currentPage: 1, //页数
                pagesize: 15, //默认每页
                // propsource: {
                //     value: 'id',
                //     label: 'names',
                //     children: '_child'
                // },
                sortName:'',
                sortOrder:'',
                ntype:'',
                nuid:''
            }
        },
        methods: {
            distributeResource() { //确定分配
                let para = {
                    uid:this.nuid,
                    type: this.ntype==1?2:-1
                }
                this.writeL = true;
                setResourceType(para, token).then(res => {
                    if (res.code == 0) {
                        this.fetchData();
                        this.$message.success('设置成功');
                        this.writeL = false;
                        this.dialogFormVisible = false
                    } else {
                        this.$message.error(res.data);
                        this.writeL = false;
                    }
                }).catch(()=>{
                    this.$message.error(res.data);
                        this.writeL = false;
                })
            
        },
        open1(){
            this.dialogFormVisibleClass = false;
                this.signform.names = this.student.uname;
                this.signform.age  = this.student.age;
                this.signform.phone = this.student.mobile;
            this.dialogFormVisibleSign = true
        },
            open(num){
                if(num ===1){
                    this.ntype = 1;
                    this.syncTitle = '是否确认设为无意向资源';
                    this.dialogFormVisible = true;
                }else{
                    this.ntype = 2;                    
                    this.syncTitle = '是否确认设为无效资源';
                    this.dialogFormVisible = true;                    
                }
                this.dialogFormVisibleClass = false;
            },
            getRegion() { //获取城市，就近校区
                this.signform.area_id = ''
                this.signform.school_id = ''
                let para = {
                    pid: this.signform.city_id
                }
                let para1 = {
                    city_id: this.signform.city_id,
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
            checkP1(){
                this.$refs['signform'].validateField('parent1');
                this.$refs['signform'].validateField('con1');
                this.$refs['signform'].validateField('phone1');                
            },
            nextToSign(formName) { //提交分配
                this.$refs[formName].validate((valid) => { //替换提交服务
                    if (valid) {
                        let para = {...this.signform};
                        if (this.para.parent1) {
                            this.para.familys = this.para.parent + '|' + this.para.con + '|' + this
                                .para.phone +
                                ',' + this.para.parent1 + '|' + this.para.con1 + '|' + this.para.phone1
                        } else {
                            this.para.familys = this.para.parent + '|' + this.para.con + '|' + this
                                .para.phone
                        }
                        this.para.demoid = this.nuid;
                        this.para.type = 'demo';
                        this.writeL = true;
                        create_student(para, token).then(res => {//接口要换
                            if (res.code == 0) {
                                this.$message({
                                    message: '添加成功',
                                    type: 'success'
                                });
                                this.dialogFormVisibleSign = false;
                                this.writeL = false;
                                this.fetchData();
                            } else {
                                this.$message.error(res.data);
                                this.writeL = false;
                                // this.form.phone = '';
                                // this.$refs.parentPhone.$refs.input.focus();
                                // this.$refs.parentPhone.$refs.input.blur();
                                // this.form.sour_id = this.form.sour_id.split(',')
                            }
                        }).then(() => {
                            // this.getStudentD();
                        }).catch(() => {
                            // this.$message.error('该用户未授权');
                            this.writeL = false;
                        })
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });

            },
            resetD(formName) {
                this.$refs[formName].resetFields();

            },
            sortChange(column){
                let {prop,order} = column
                // console.log(prop)
                this.sortName=prop;
                this.sortOrder = order;
                this.currentPage = 1;
                this.fetchData()
            },
        //     ...mapActions([
        //     'setmyInvalidS'
        // ]),
            formatter(row, column) {
                let reg = /(\d{4})\d{4}(\d{3})/;
                if (reg.test(row.mobile)) {
                    return row.mobile.replace(reg, '$1****$2');
                } else {
                    return row.mobile
                }
            },
            handleCurrentChange: function (val) {
                this.currentPage = val;this.backToTop();
                this.fetchData();
            },
            switchDetail(row) {
                // let uid = {
                //     u_id: row.id,
                //     u_status: '无效',
                //     u_resource: 3
                // }
                // this.sendResourceId(uid)
                // let d = {
                //     school_id: this.value, //校区
                //     sour_id: this.value2, //渠道
                //     page: this.currentPage, //页签
                //     input_start_date: this.value3,
                //     last_start_date:this.value4,
                //     sortName:this.sortName,
                //     sortOrder:this.sortOrder
                // }
                // this.setmyInvalidS(d)
                // this.$router.push('/userDetail' + '/' + row.id + '/invalid/' + 3);
                let para = {
                    uid:row.id
                }
                this.nuid=row.id
                marketUserInfo(para,token).then(res=>{
                    // console.log(res)
                    this.student = {...res.data}
                })
                this.dialogFormVisibleClass = true;
            },
            updateList() {
                this.currentPage = 1;
                this.fetchData();
            },
            fetchData() {
                // if(Object.keys(this.getmyInvalidS).length!=0){
                //     this.value =  this.getmyInvalidS.school_id;
                //     this.value2 =  this.getmyInvalidS.sour_id;
                //     this.currentPage = this.getmyInvalidS.page;
                //     this.value3 =  this.getmyInvalidS.input_start_date;
                //     this.value4 =  this.getmyInvalidS.last_start_date;
                //     this.sortName =  this.getmyInvalidS.sortName;
                //     this.sortOrder =  this.getmyInvalidS.sortOrder;
                // }
                let para = {
                    // group_id: 1,
                    // school_id: this.value,
                    // sour_id: this.value2[this.value2.length-1],
                    page: this.currentPage,
                    // input_start_date: this.value3[0] != null ? new Date(this.value3[0]).toLocaleDateString() : '',
                    // input_end_date: this.value3[1] != null ? new Date(this.value3[1]).toLocaleDateString() : '',
                    // last_start_date: this.value4[0] != null ? new Date(this.value4[0]).toLocaleDateString() : '',
                    // last_end_date: this.value4[1] != null ? new Date(this.value4[1]).toLocaleDateString() : '',
                    sortName:this.sortName,
                    sortOrder:this.sortOrder

                }
                tmkmyResource(para, token).then((res) => { //替换服务
                    this.number = res.data.total;
                    let a = res.data.data;
                    let c = res.data.last_page * this.pagesize;
                    this.noEffData = a;
                    this.total = parseInt(c);
                })
                // .then(()=>{
                //     this.setmyInvalidS({})
                // })
            },
        },

        beforeCreate() {
            user = sessionStorage.getItem('user');
            token = JSON.parse(user).token;
        },
        created() {
            // this.code = JSON.parse(user).job?JSON.parse(user).job.code : '';
            this.fetchData();
            // let cam = {
            //     simple: '1'
            // };
            // campusList(cam, token).then((res) => {//获取校区
            //     let a = res.data;
            //     this.options = a.map(item => {
            //         return {
            //             value: item.id,
            //             label: item.title
            //         };
            //     });
            // })
            cityList(token).then((res) => {
                // console.log(res)
                this.cities = res.data
            })
            // sourceList(token).then(res => {
            //     this.options2 = res.data

            // })
        },
    //     computed: {
    //     ...mapGetters([
    //         'getmyInvalidS'
    //         // ...
    //     ])
    // },
    }

</script>
<style>
    /* #tobeH5 .el-table td,
    #tobeH5 .el-table th:not(.gutter) {
        padding: 1px;
        text-align: center
    }

    #tobeH5 .el-table th>div,
    #tobeH5 .el-table .cell {
        padding-left: 0;
        padding-right: 0;
    } */
    .tobeH .el-dialog .el-dialog__header {
    background-color: #1fb5ad;
    padding: 20px 20px 20px;
}

.tobeH .el-dialog .el-dialog__title {
    color: white;
}
.tobeH4 .el-form-item{
    margin-bottom: 0;
}
.tobeH4{
    width:410px;
}
.tobeH4 .el-dialog__body {
        padding: 10px 10px 10px 10px;
    }

    .tobeH4 .el-dialog__footer {
        padding: 0 20px 15px;
    }
    .tobeH13 {
        width: 142px
    }
    .tobeH8 {
        width: 142px;
        margin-right: 30px;
        float: left
    }

    .tobeH7 {
        width: 142px;
        float: left
    }
    .tobeH6:hover {
        cursor: pointer;
    }

    .tobeH6 {
        font-weight: 600;
        color:#1fb5ad
    }

    .tobeH .block {
        text-align: center;
        margin-top: 10px;
    }

    .tobeH3 {
        float: left;
        margin:5px 5px 10px 0;
        /* margin-right: 5px; */
        padding-left: 10px;
        /* margin-bottom: 10px; */
    }

    .tobeH16 {
        display: inline-block;
        margin-right: 10px
    }

    .tobeH15 {
        display: inline-block;
        width: 125px;
        margin-right: 10px;
        margin-bottom: 10px;
    }

    .tobeH1 {
        width: 100%;
        position: relative;
        height: auto;
        display: flex;
        flex-wrap: wrap;
      justify-content: flex-start;
        background-color: white;
      margin-top:0;
      padding-top:10px;
      /* margin-bottom: 5px; */
      border-radius: 5px;
    }
.tobeH2{
    display:flex;flex-wrap:wrap;
margin-right:5px;
}

.tobeH12 {
        margin-left: 10px;
        width: 200px;
        color: grey
    }
    .tobeH9 {
        margin-bottom: 5px
    }
    .tobeH10 .el-dialog__header {
        background-color: #1fb5ad;
        padding: 20px 20px 20px;
    }

    .tobeH10 .el-dialog__title {
        color: white;
    }
    .tobeH11 {
        text-align: center;
    }
</style>
