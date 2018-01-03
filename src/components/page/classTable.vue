<template>
    <div class='classTable'>
        <!-- <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-my-richeng"></i> 课程管理</el-breadcrumb-item>
                <el-breadcrumb-item class='ss'>排课表</el-breadcrumb-item>
            </el-breadcrumb>
        </div> -->
        <div class='classT'>
            <div class="h1">
                <h3 class='classTH2'>
                    排课表
                </h3>
                <div class='oneSelectClassTable' v-if="code.includes('_c')">
                    <el-select v-model="valueR"  placeholder="选择校区" @change="updateListCC">
                        <el-option v-for="item in optionR" :key="item.id" :label="item.title" :value="item.id">
                        </el-option>
                    </el-select>
                </div>
                <div class='oneSelectClassTable2'>
                    <el-select v-model="value" clearable placeholder="选择教室" filterable @change="updateList">
                        <el-option v-for="item in classRoom" :key="item.id" :label="item.names" :value="item.id">
                        </el-option>
                    </el-select>
                </div>
                <el-button type="primary" size="mid" class='buttonAdd' @click="createCh('classform')" v-if="!code.includes('_c')">添加班级</el-button>
            </div>
            <el-dialog :title="alter" :visible.sync="dialogFormVisible" :close-on-click-modal="no" custom-class='classTableDialog' top='20%'
                @close='resetD'>
                <el-form :model="classform" :rules="rules2" ref="classform" label-position='right' label-width="80px">
                    <el-form-item label="课程" required>
                        <el-form-item prop="kc_tid" class='CT142I'>
                            <el-select v-model="classform.kc_tid" filterable placeholder="请选择课程类型" @change='getClassName' :disabled='canEdit'>
                                <el-option v-for="item in classkind" :key="item.kc_tid" :label="item.kc_tname" :value="item.kc_tid">
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item prop="course_id" class='CT142I'>
                            <el-select v-model="classform.course_id" placeholder="请选择课程名" :disabled='canEdit'>
                                <el-option v-for="item in courseName" :key="item.kcid" :label="item.title" :value="item.kcid" loading>
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-form-item>
                    <el-form-item label="教室" prop="classroom_id">
                        <el-select v-model="classform.classroom_id" placeholder="请选择教室" class='CT142'>
                            <el-option v-for="item in classRoom" :key="item.id" :label="item.names" :value="item.id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="上课老师" prop="teacher_id">
                        <el-select v-model="classform.teacher_id" placeholder="请选择老师" class='CT142'>
                            <el-option v-for="item in teachersName" :key="item.aid" :label="item.uname" :value="item.aid">
                            </el-option>
                        </el-select>
                        <span>(选填)</span>
                    </el-form-item>
                    <el-form-item label="上课时间" required>
                        <el-form-item prop="week" class='CT142I'>
                            <el-select v-model="classform.week" placeholder="请选择星期">
                                <el-option label="周一" value="1"></el-option>
                                <el-option label="周二" value="2"></el-option>
                                <el-option label="周三" value="3"></el-option>
                                <el-option label="周四" value="4"></el-option>
                                <el-option label="周五" value="5"></el-option>
                                <el-option label="周六" value="6"></el-option>
                                <el-option label="周日" value="7"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item prop="class_time" class='CT142I'>
                            <el-time-picker v-model="classform.class_time" format="HH:mm" class='CT142' placeholder="请选择具体时间" popper-class='top55'>
                            </el-time-picker>
                        </el-form-item>
                    </el-form-item>
                    <el-form-item label="开班日期" prop="start_time">
                        <el-date-picker v-model="classform.start_time" type="date" placeholder="选择日期" class='CT142' :picker-options="pickerOptions0" :disabled='canEdit'>
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item label="结班日期" prop="end_time">
                        <el-date-picker v-model="classform.end_time" type="date" placeholder="选择日期" class='CT142' >
                        </el-date-picker>
                        <span>(选填)</span>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button type="primary" :loading='writeL' @click="addAccount('classform')">确 定</el-button>
                    <el-button @click="dialogFormVisible = false">取 消</el-button>
                </div>
            </el-dialog>
        </div>
        <div>
            <div class='classweekClassT'>
                    <i class="el-icon-arrow-left" @click='lastWeek'></i>
                <el-date-picker v-model="value3" type="week" class='CT210' :format="format" placeholder="当前周" :clearable='no' :editable='no'
                    :picker-options="dateRangeOptions1" @change='updateClass'>
                </el-date-picker>
                <i class="el-icon-arrow-right" @click='nextWeek'></i>
            </div>
            <div v-loading="loading">

                <div class="CTweek">
                    <div class='CTweekT'>老师</div>
                    <div v-for='(item,index) in week' class='CTweekI'>{{item}}
                        <span>{{index==0?w1:index==1?w2:index==2?w3:index==3?w4:index==4?w5:index==5?w6:index==6?w7:''}}</span>
                    </div>
                </div>
                <div v-for='(t,index) in teachers' class='CTlesson' >
                    <div class='CTlessonN'>{{t.uname}}</div>
                    <div v-for='item in t.week' class='CTlessonI'>
                        <div v-for='(i,index) in item'  class='lessonhover' @click='showClass(i,$event)'>
                            <div class='CTlessonD'><span class='CTlesson26'>{{i.class_time}}</span>
                                <span class="CTlesson73">{{i.class_room.names}}({{i.syllabus_person_num}}人)</span></div>
                            <div class='CTlessonC'><span class='CTlesson15'>{{i.course?i.course.title:i.title}}</span>
                                <div class='CTlessonFlex'>
                                    <img :src="src" width='20' alt="" class='classImg' @click='editClass(i,index)' v-if="!code.includes('_c')">
                                </div>
                            </div>
                        </div>
                        <!-- <div v-if='!Array.isArray(item)' style='padding-left:10px;border-bottom:1px solid gainsboro' class='lessonhover'>
                            <div><span style="margin-right:10px">{{item.class_time}}</span><span style="margin-left:10px">{{item.course.title}}</span></div>
                            <div><span>{{item.class_room.names}}({{item.syllabus_person_num}}人)</span>
                                <img src="../../../static/img/editClass.png" width='20' alt="" class='classImg'>
                            </div>
                        </div> -->
                    </div>
                </div>
            </div>
        </div>
        <el-dialog title="班级详情" :visible.sync="dialogFormVisibleClass" :close-on-click-modal="no" custom-class='classDetailDialog'
            top='5%' size='tiny' @close="resetClass">
            <div class='CTTclass'>
                <div class='CTTclassTitle'>
                    <div class='CTTclass600'>课程:{{classDetail.title}}</div>
                    <div class='CTTclass600'>上课时间:{{classDetail.time}}</div>
                    <div class='CTTclass600'>上课老师：{{classDetail.teacher}}</div>
                    <div class='CTTclass600'>教室：{{classDetail.classroom}}</div>
                    <div class='CTTclass600'>班级人数：{{classDetail.number}}</div>
                    <div class='CTTclass600'>开班时间：{{classDetail.date}}</div>
                </div>
            </div>
            <div class='CTTclassList'>
                <div class='CTTclassS'>
                    <div>学生姓名</div>
                    <div>剩余课时</div>
                </div>
                <div class='CTTclassC' v-for='s in students' v-if='students.length!=0'>
                    <div>{{s.child_name}}</div>
                    <div>{{s.course_curr_num}}</div>
                </div>
                <div v-if='students.length==0' class='CTTclassN'>暂无学生</div>
            </div>
        </el-dialog>
    </div>
</template>
<script>
    var token, user
    import {
        getClassRoom,
        getTeacherList,
        getClassTable,
        create_lesson,
        put_lesson,
        getClassKind,
        getClassLibrary,
        getClassDetail,
        campusList
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

            var lastDate = (rule, value, callback) => {
                if (value === '') {
                    callback()
                } else if (new Date(this.classform.start_time) - new Date(value) > 0) {
                    callback('结班日期必须晚于开班日期');
                } else {
                    callback();
                }
            }
            return {
                writeL:false,
                canEdit:false,
                pickerOptions0: {
                    disabledDate(time) {
                        return time.getTime() < Date.now() - 8.64e7;
                    }
                },
                valueR: '',
                substringc :new Date().toLocaleDateString().indexOf('年')>0?8:5,
                loading:true,
                optionR: '',
                classRoom: [],
                teachersName: [],
                src: '../../../static/img/editClass.png',
                dateRangeOptions1: {
                    firstDayOfWeek: 1,
                },
                value3: new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDay() == 0 ? new Date()
                    .getDate() - 5 : new Date().getDate() - new Date().getDay() + 2),
                classkind: [],
                classDetail: {
                    time: '',
                    date: '',
                    teacher: '',
                    title: '',
                    number: '0',
                    classroom: ''
                },
                students: [],
                teachers: [],
                week: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
                code: '',
                in: '', //修改时代表修改的index
                no: false, //取消点击关闭
                courseName: [],
                value: '', //对应校区select的值
                classform: {
                    kc_tid: '', //课程类型
                    course_id: '', //课程名
                    classroom_id: '', //教室
                    teacher_id: '', //老师
                    week: '', //星期
                    class_time: '', //具体时间
                    start_time: '', //开班时间
                    end_time: '' //结班
                },
                rules2: {
                    kc_tid: [{
                        required: true,
                        message: '请选择课程类型',
                        validator: nan,
                        trigger: 'change'
                    }],
                    course_id: [{
                        required: true,
                        message: '请选择课程',
                        validator: nan,
                        trigger: 'change'
                    }],
                    classroom_id: [{
                        required: true,
                        message: '请选择教室',
                        validator: nan,
                        trigger: 'change'
                    }],
                    week: [{
                        required: true,
                        message: '请选择星期',
                        trigger: 'change'
                    }],
                    class_time: [{
                        required: true,
                        type: 'date',
                        message: '请选择具体时间',
                        trigger: 'change'
                    }],
                    start_time: [{
                        required: true,
                        type: 'date',
                        message: '请选择开班日期',
                        trigger: 'change'
                    }],
                    end_time: [{
                        validator: lastDate,
                        trigger: 'change'
                    }]
                },
                dialogFormVisible: false,
                dialogFormVisibleClass: false,
                thisWeekStart:'',
                thisWeekEnd:'',

            }
        },
        methods: {
            lastWeek() {
                // this.loading = true;
                let date = new Date(this.thisWeekStart)
                let c = date.setDate(date.getDate() - 6);
                this.value3 = new Date(c)
            },
            nextWeek() {
                // this.loading = true;                
                let date = new Date(this.thisWeekStart)
                let c = date.setDate(date.getDate() + 8);
                this.value3 = new Date(c)
            },
            getClassName() { //获取课程名称
                this.classform.course_id=''
                if(this.classform.kc_tid){

                    let para = {
                        pid: this.classform.kc_tid,
                        simple: 1
                    }
                    getClassLibrary(token, para).then((res) => {
                        this.courseName = res.data;
                    })
                }
            },
            showClass(i, e) { //获取课程详细
                if (e.target.localName != 'img') {
                    let para = {
                        id: i.id,
                        schooltime:i.schoolDate
                    }
                        this.dialogFormVisibleClass = true;
                    getClassDetail(token, para).then(res => {
                        this.classDetail = {
                            title: res.data.title,
                            time: res.data.week + ' ' + res.data.class_time,
                            teacher: res.data.teacher.uname,
                            classroom: res.data.class_room.names,
                            number: res.data.syllabus_person_num,
                            date: res.data.start_time.substring(0, 11),
                        }
                        this.students = res.data.students
                    }).then(() => {
                    })
                }
            },
            resetClass(){
                this.classDetail = {};
                this.students = [];
            },
            updateClass() { //获取当前第几周 调服务
                this.fetchData();
            },
            updateList() { //选教室刷新表格
                this.fetchData();
            },
            updateListCC() { //选校区调服务
                this.value = '';
                let para = {
                    school_id: this.valueR
                }
                getClassRoom(token, para).then((res) => { //获取教室
                    this.classRoom = res.data;
                })
                this.fetchData();
            },
            createCh(formName) { //点击创建按钮
                this.dialogFormVisible = true;
            },
            resetD() {
                this.canEdit = false;
                this.in = '';
                this.classform = {
                    kc_tid: '',
                    course_id: '',
                    classroom_id: '',
                    teacher_id: '',
                    week: '',
                    class_time: '',
                    // pwd: '',
                    start_time: '',
                    end_time: ''
                },
                this.$refs['classform'].resetFields();
                this.courseName = []

            },
            editClass(data, index) { //点击就修改
                // console.log(data)
                if(data.syllabus_person_num!=0){
                    this.canEdit = true;
                }
                this.in = index;
                if (data.course) {
                    let para = {
                        pid: data.course.kc_tid,
                        simple: 1
                    }
                    getClassLibrary(token, para).then((res) => {
                        this.courseName = res.data;
                    })
                }
                this.classform = {
                    id: data.id,
                    kc_tid: data.course ? data.course.kc_tid - 0 : '',
                    course_id: data.course_id - 0,
                    classroom_id: data.classroom_id - 0,
                    teacher_id: data.teacher_id ? data.teacher_id - 0 : '',
                    week: data.week,
                    class_time: new Date('2017-7-23 ' + data.class_time),
                    start_time: data.start_time ? new Date(data.start_time) : '',
                    end_time: data.end_time ? new Date(data.end_time) : '',
                };
                let that = this;
                setTimeout(function() {
                    that.classform.course_id=data.course_id - 0
                }, 1);
                this.dialogFormVisible = true;

            },
            addAccount(formName) { //点确定后添加班级
                this.$refs[formName].validate((valid) => {
                    let f = this.classform;
                    let i = this.in;
                    if (valid) {
                        this.writeL = true;
                        if (i !== '') {
                            let para = { ...f
                            };
                            para.start_time = para.start_time.toLocaleDateString();
                            para.end_time = para.end_time ? para.end_time.toLocaleDateString() : '';
                            para.class_time = para.class_time.toTimeString().substring(0, 5);
                            console.log(para)
                            put_lesson(para, token).then(res => {
                                if (res.code == 0) {
                                    this.$message({
                                        message: '修改成功',
                                        type: 'success'
                                    });
                                    this.fetchData();
                                    this.dialogFormVisible = false;
                                    this.writeL = false;
                                } else {
                                    this.$message({
                                        type: 'error',
                                        message: res.data
                                    });
                                    this.writeL = false;
                                }
                            })
                        } else {
                            let para = { ...f
                            };
                            para.start_time = para.start_time.toLocaleDateString();
                            para.end_time = para.end_time ? para.end_time.toLocaleDateString() : '';
                            para.class_time = para.class_time.toTimeString().substring(0, 5)
                            create_lesson(para, token).then(res => {
                                if (res.code == 0) {
                                    this.$message({
                                        message: '创建成功',
                                        type: 'success'
                                    });
                                    this.fetchData();
                                    this.dialogFormVisible = false;
                                    this.writeL = false;
                                } else {
                                    this.$message({
                                        type: 'error',
                                        message: res.data
                                    });
                                    this.writeL = false;
                                }
                            })
                        }
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            fetchData() {
                this.loading = true;
                let a = new Date(this.value3)
                let year = a.getFullYear();
                let month = a.getMonth()
                let day = a.getDate() - 1;
                this.thisWeekStart = new Date(year, month, day)
                let day1 = a.getDate() + 5;
                this.thisWeekEnd = new Date(year, month, day1)
                let para = {
                    start_date:  this.thisWeekStart,
                    end_date: this.thisWeekEnd,
                    classroom_id: this.value,
                    school_id: this.valueR
                }
                getClassTable(token, para).then((res) => {
                    this.teachers = res.data;
                }).then(()=>{
                    this.loading=false;
                })

            }
        },
        beforeCreate() {
            user = sessionStorage.getItem('user');
            token = JSON.parse(user).token;
        },
        created() { //创建组件时
            this.code = JSON.parse(user).job ? JSON.parse(user).job.code : '';
            // this.fetchData()
            if(this.code=='cc'||this.code=='cc_m'){
            this.fetchData()
                
            }else if (this.code.includes('_c')) {
                let cam = {
                    simple: 1
                }
                campusList(cam, token).then((res) => { //获取校区
                    this.optionR = res.data;
                    this.valueR = res.data[0].id
                }).then(()=>{
            this.fetchData()
                })
            }else{
                this.fetchData()  
            }
            getClassRoom(token).then((res) => { //获取教室
                this.classRoom = res.data;
            }).then(() => {
                // if(this.code=='cc_m'){

                getTeacherList(token).then((res) => { //获取老师
                    this.teachersName = res.data;
                })
                getClassKind(token).then((res) => { //获取课程分类
                    this.classkind = res.data
                })
                // }
            });



        },
        computed: {
            w1(){
                let a = new Date(this.value3);
                let b = new Date(a.setDate(a.getDate() - 1));
               
                return b.toLocaleDateString().substring(this.substringc);
            },
            w2(){
                let a = new Date(this.value3);
                return a.toLocaleDateString().substring(this.substringc);
            },
            w3(){
                let a = new Date(this.value3);
                let b = new Date(a.setDate(a.getDate() + 1));
                return b.toLocaleDateString().substring(this.substringc);
            },
            w4(){
                let a = new Date(this.value3);
                let b = new Date(a.setDate(a.getDate() + 2));
                return b.toLocaleDateString().substring(this.substringc);
            },
            w5(){
                let a = new Date(this.value3);
                let b = new Date(a.setDate(a.getDate() + 3));
                return b.toLocaleDateString().substring(this.substringc);
            },
            w6(){
                let a = new Date(this.value3);
                let b = new Date(a.setDate(a.getDate() + 4));
                return b.toLocaleDateString().substring(this.substringc);
            },
            w7(){
                let a = new Date(this.value3);
                let b = new Date(a.setDate(a.getDate() + 5));
                return b.toLocaleDateString().substring(this.substringc);
            },
            alter: function () {
                if (this.in === '') {
                    return '添加班级'
                }
                return '修改班级'
            },
            format: function () {

                let a = new Date(this.value3)
                let year = a.getFullYear();
                let month = a.getMonth()
                let day = a.getDate() - 1;
                let thisWeekStart = new Date(year, month, day).toLocaleDateString()
                let day1 = a.getDate() + 5;
                let thisWeekEnd = new Date(year, month, day1).toLocaleDateString()
                let dis = thisWeekStart + ' ~ ' + thisWeekEnd;
                return dis
            }
        }
    }

</script>
<style>
     .classweekClassT .el-icon-arrow-left:hover,
    .classweekClassT .el-icon-arrow-right:hover {
        cursor: pointer;
        color: #1fb5ad;
    }

    .classweekClassT .el-icon-arrow-left,
    .classweekClassT .el-icon-arrow-right {
        color: rgb(191, 217, 216)
    }
    .h1 .el-button--primary {
        background-color: #32a4d3;
        border-color: #32a4d3;
    }

    .classTable .el-dialog .el-dialog__header {
        background-color: #1fb5ad;
        padding: 20px 20px 20px;
    }

    .classTable .el-dialog .el-dialog__title {
        color: white;
    }

    .classT {
        width: 100%;
        position: relative;
        height: 45px;
        background-color: white;
        /* margin-top: 10px; */
        padding-top: 10px;
        margin-bottom: 5px;
        border-radius: 5px;
    }

    .classTH2 {
        display: inline-block;
        /*margin-top: 20px;*/
        margin-bottom: 15px;
        padding-left: 10px
    }

    .oneSelectClassTable {
        display: inline-block;
        margin-bottom: 10px;
        margin-left: 10px;
        width: 160px
    }
    .oneSelectClassTable2 {
        display: inline-block;
        margin-bottom: 10px;
        margin-left: 10px;
        width: 140px
    }
    .buttonAdd {
        position: absolute;
        right: 10px;
        top: 10px;
    }

    .classTableDialog .el-dialog__body {
        padding: 20px 20px 0 20px;
    }

    .classTableDialog .el-dialog__footer {
        padding: 0 20px 15px;
    }

    .classDetailDialog .el-dialog__body {
        background-color: #f3f3f3
    }

    .classDetailDialog .el-dialog__body {
        padding: 10px 10px 10px 10px;
    }

    .classDetailDialog .el-dialog__footer {
        padding: 0 20px 15px;
    }

    .classweekClassT {
        width: 100%;
        background-color: white;
        text-align: center;
        height: 50px;
        line-height: 50px;
        border: 1px solid gainsboro;
        box-sizing: border-box;
    }

    .lessonhover {
        color: darkslategrey;
        padding-left: 10%;
        border-bottom: 1px solid gainsboro;
        background: #f0fdff;
    }

    .lessonhover:hover {
        color: #1fb5ad;
        cursor: pointer;
    }

    .classImg {
        display: none;
        float: right;
        margin-top: 10px;
        margin-right: 10px;
        cursor: pointer;
    }

    .lessonhover:hover .classImg {
        display: inline;
    }

    .classTable ::-webkit-scrollbar {
        display: none
    }

    .CT142I {
        width: 142px;
        margin-right: 30px;
        display: inline-block
    }
    .top55  .el-time-panel__content::after,.top55 .el-time-panel__content::before{
        top:55%
    }
    .classTableDialog .CT142 {
        width: 142px;
    }

   .classweekClassT .CT210 {
        width: 220px
    }

    .CTweek {
        display: flex;
        color: darkslategrey;
    }

    .CTweekT {
        text-align: center;
        height: 40px;
        line-height: 40px;
        background: white;
        border-left: 1px solid gainsboro;
        border-right: 1px solid gainsboro;
        border-bottom: 1px solid gainsboro;
        flex: 0 0 100px
    }

    .CTweekI {
        text-align: center;
        height: 40px;
        line-height: 40px;
        background: white;
        flex: 1 1 1px;
        border-right: 1px solid gainsboro;
        border-bottom: 1px solid gainsboro;
    }

    .CTlesson {
        width: 100%;
        background: white;
        display: flex;
        align-items: stretch;
    }

    .CTlessonN {
        text-align: center;
        background: white;
        border-left: 1px solid gainsboro;
        border-right: 1px solid gainsboro;
        border-bottom: 1px solid gainsboro;
        flex: 0 0 100px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        color: darkslategrey;
        min-height: 80px;
    }

    .CTlessonI {
        line-height: 40px;
        background: white;
        flex: 1 1 1px;
        border-right: 1px solid gainsboro;
        border-bottom: 1px solid gainsboro;
        font-size: 12.8px
    }

    .CTlessonD {
        display: flex;
        align-items: center
    }

    .CTlesson26 {
        width: 26%;
        font-weight: 600
    }

    .CTlesson73 {
        width: 73%;
        text-align: center;
        line-height: 20px;
        /* text-decoration: underline; */
    }

    .CTlessonC {
        display: flex;
        flex-wrap: wrap;
        justify-content: flex-start
    }

    .CTlesson15 {
        font-size: 13px;
        font-style: oblique;
        font-weight: bold;
        /* text-shadow: 18px 6px 1px gainsboro; */
    }

    .CTlessonFlex {
        flex: auto
    }

    .CTTclass {
        height: 200px;
        text-align: left
    }

    .CTTclassTitle {
        padding-left: 30%;
        padding-bottom: 10px;
        padding-top: 10px;
        background: white
    }

    .CTTclass600 {
        font-weight: 600;
        margin-bottom: 10px
    }

    .CTTclassList {
        max-height: 500px;
        overflow-y: auto;
        background: white
    }

    .CTTclassS {
        display: flex;
        justify-content: space-between;
        padding: 10px 0;
        margin-left: 17%;
        margin-right: 17%;
        font-weight: 600
    }

    .CTTclassC {
        display: flex;
        justify-content: space-between;
        padding: 10px 0;
        margin-left: 20%;
        margin-right: 20%
    }

    .CTTclassN {
        text-align: center;
        padding: 10px 0;
    }
   
</style>
