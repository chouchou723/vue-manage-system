<template>
    <div class='classTable'>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-my-richeng"></i> 课程管理</el-breadcrumb-item>
                <el-breadcrumb-item class='ss'>课程表</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class='classT'>
            <div class="h1">
                <h3 class='classTH2'>
               课程表
                </h3>
                <div class='oneSelect'>
                    <el-select v-model="value" clearable placeholder="选择教室" filterable @change="updateList">
                        <el-option v-for="item in classRoom" :key="item.id" :label="item.names" :value="item.id">
                        </el-option>
                    </el-select>
                </div>
                <el-button type="primary" size="mid" class='buttonAdd' @click="createCh('classform')">添加班级</el-button>
            </div>
            <el-dialog :title="alter" :visible.sync="dialogFormVisible" :close-on-click-modal="no" custom-class='classTableDialog' top='20%' @close='resetD'>
                <el-form :model="classform" :rules="rules2" ref="classform" label-position='right' label-width="80px">
                    <el-form-item label="课程" required>
                        <el-form-item prop="kc_tid" style="width:142px;margin-right:30px;display:inline-block">
                            <el-select v-model="classform.kc_tid" filterable placeholder="请选择课程类型" @change='getClassName'>
                                <el-option v-for="item in classkind" :key="item.kc_tid" :label="item.kc_tname" :value="item.kc_tid">
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item prop="course_id" style="width:142px;margin-right:30px;display:inline-block">
                            <el-select v-model="classform.course_id" placeholder="请选择课程名">
                                <el-option v-for="item in courseName" :key="item.kcid" :label="item.title" :value="item.kcid">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-form-item>
                    <el-form-item label="教室" prop="classroom_id">
                        <el-select v-model="classform.classroom_id" placeholder="请选择教室" style="width:142px;">
                            <el-option v-for="item in classRoom" :key="item.id" :label="item.names" :value="item.id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="上课老师" prop="teacher_id">
                        <el-select v-model="classform.teacher_id" placeholder="请选择老师" style="width:142px;">
                            <el-option v-for="item in teachersName" :key="item.aid" :label="item.uname" :value="item.aid">
                            </el-option>
                        </el-select>
                        <span>(选填)</span>
                    </el-form-item>
                    <el-form-item label="上课时间" required>
                        <el-form-item prop="week" style="width:142px;margin-right:30px;display:inline-block">
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
                        <el-form-item prop="class_time" style="width:142px;margin-right:30px;display:inline-block">
                            <el-time-picker v-model="classform.class_time" format="HH:mm" style="width:142px;" placeholder="请选择具体时间">
                            </el-time-picker>
                        </el-form-item>
                    </el-form-item>
                    <el-form-item label="开班日期" prop="start_time">
                        <el-date-picker v-model="classform.start_time" type="date" placeholder="选择日期" style="width:142px;">
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item label="结班日期" prop="end_time">
                        <el-date-picker v-model="classform.end_time" type="date" placeholder="选择日期" style="width:142px;">
                        </el-date-picker>
                        <span>(选填)</span>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer" style="text-align:center;margin-top:40px">
                    <el-button type="primary" @click="addAccount('classform')">确 定</el-button>
                    <el-button @click="dialogFormVisible = false">取 消</el-button>
                </div>
            </el-dialog>
        </div>
        <div>
            <div class='classWeek'>
                <el-date-picker v-model="value3" type="week" style='width:210px' :format="format" placeholder="当前周" :clearable='no' :editable='no' :picker-options="dateRangeOptions1" @change='updateClass'>
                </el-date-picker>
            </div>
            <div style="display:flex;">
                <div style="text-align:center;height:40px;line-height:40px;background:white;border-left:1px solid gainsboro;border-right:1px solid gainsboro;border-bottom:1px solid gainsboro;flex:0 0 100px">老师</div>
                <div v-for='item in week' style="text-align:center;height:40px;line-height:40px;background:white;flex:auto;border-right:1px solid gainsboro;border-bottom:1px solid gainsboro;">{{item}}</div>
            </div>
            <div v-for='(t,index) in teachers' style="width:100%;background:white;display:flex;align-items:stretch;">
                <div style="text-align:center;background:white;border-left:1px solid gainsboro;border-right:1px solid gainsboro;border-bottom:1px solid gainsboro;flex:0 0 100px;display:flex;flex-direction: column;justify-content: center;">{{t.uname}}</div>
                <div v-for='item in t.week' style="line-height:40px;background:white;flex:1 1 1px;border-right:1px solid gainsboro;border-bottom:1px solid gainsboro;font-size:12.8px">
                    <div v-for='(i,index) in item' v-if='Array.isArray(item)' style="padding-left:10px;border-bottom:1px solid gainsboro" class='lessonhover' @click='showClass(i,$event)'>
                        <div style="display:flex;align-items:center"><span style="width:26%">{{i.class_time.substring(0,5)}}</span><span style="width:73%;text-align:center;line-height:20px">{{i.course?i.course.title:i.title}}</span></div>
                        <div><span>{{i.class_room.names}}({{i.syllabus_person_num}}人)</span>
                            <img :src="src" width='20' alt="" class='classImg' @click='editClass(i,index)'>
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
        <el-dialog title="班级详情" :visible.sync="dialogFormVisibleClass" :close-on-click-modal="no" custom-class='classDetailDialog' top='10%' size='tiny'>
            <div style="height:200px;text-align:left">
                <div style="padding-left:30%;padding-bottom:10px;padding-top:10px;background:white">
                    <div style="font-weight:600;margin-bottom:10px">课程:{{classDetail.title}}</div>
                    <div style="font-weight:600;margin-bottom:10px">上课时间:{{classDetail.time}}</div>
                    <div style="font-weight:600;margin-bottom:10px">上课老师：{{classDetail.teacher}}</div>
                    <div style="font-weight:600;margin-bottom:10px">教室：{{classDetail.classroom}}</div>
                    <div style="font-weight:600;margin-bottom:10px">班级人数：{{classDetail.number}}</div>
                    <div style="font-weight:600;margin-bottom:10px">开班时间：{{classDetail.date}}</div>
                </div>
            </div>
            <div style='max-height:500px;overflow-y:auto;background:white'>
                <div style="display:flex;justify-content:space-between;padding: 10px 0;margin-left:17%;margin-right:17%;font-weight:600">
                    <div>学生姓名</div>
                    <div>剩余课时</div>
                </div>
                <div style="display:flex;justify-content:space-between;padding: 10px 0;margin-left:20%;margin-right:20%" v-for='s in students' v-if='students.length!=0'>
                    <div>{{s.nickname}}</div>
                    <div>{{s.course_curr_num}}</div>
                </div>
                <div v-if='students.length==0' style="text-align:center;padding: 10px 0;">暂无学生</div>
            </div>
        </el-dialog>
    </div>
</template>
<script>
var token
import {
    getClassRoom,
    getTeacherList,
    getClassTable,
    create_lesson,
    put_lesson,
    getClassKind,
    getClassLibrary,
    getClassDetail
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
                classRoom: [],
                teachersName: [],
                src: '../../../static/img/editClass.png',
                dateRangeOptions1: {
                    firstDayOfWeek: 1,
                },
                value3: new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDay() == 0 ? new Date().getDate() - 5 : new Date().getDate() - new Date().getDay() + 2),
                classkind: [],
                classDetail: {
                    time: '',
                    date: '',
                    teacher: '',
                    title: '',
                    number: 0,
                    classroom: ''
                },
                students: [],
                teachers: [],
                week: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
                // currentPage: 1, //页数
                // pagesize: 15, //默认每页
                // total: 0, //总页数
                in : '', //修改时代表修改的index
                no: false, //取消点击关闭
                courseName: [],
                number: '',
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
            }
        },
        methods: {
            getClassName() {//获取课程名称
                let para = {
                    pid: this.classform.kc_tid,
                    simple: 1
                }
                getClassLibrary(token, para).then((res) => {

                    this.courseName = res.data;
                })
            },
            showClass(i, e) {//获取课程详细
                if (e.target.localName == 'span') {
                    // console.log(i.id)
                    let para = {
                        id: i.id
                    }
                    getClassDetail(token, para).then(res => {
                       this.classDetail = {
                            title: res.data.title,
                            time: res.data.week + ' ' + res.data.class_time,
                            teacher: res.data.teacher.uname,
                            classroom: res.data.class_room.names,
                            number: res.data.syllabus_person_num,
                            date: res.data.start_time.substring(0, 11),
                        }
                        this.students = [...res.data.students]

                    }).then(()=>{
                        
                    this.dialogFormVisibleClass = true;
                    })
                }
            },
            updateClass() { //获取当前第几周 调服务
                this.fetchData();
            },
            updateList() { //选教室刷新表格
                this.fetchData();
            },
            createCh(formName) { //点击创建按钮
                this.in = '';
                this.courseName = []
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
                    this.dialogFormVisible = true;
            },
            resetD() {
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

            },
            editClass(data, index) { //点击就修改
                // console.log(data)
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
                this.dialogFormVisible = true;

            },
            addAccount(formName) { //点确定后添加班级
                this.$refs[formName].validate((valid) => {
                    let f = this.classform;
                    let i = this.in;

                    if (valid) {
                        if (i !== '') {
                            let para = {...f
                            };
                            para.start_time = para.start_time.toLocaleDateString();
                            para.end_time = para.end_time ? para.end_time.toLocaleDateString() : '';
                            para.class_time = para.class_time.toTimeString().substring(0, 5)
                            put_lesson(para, token).then(res => {
                                if (res.code == 0) {
                                    this.$message({
                                        message: '修改成功',
                                        type: 'success'
                                    });
                                    this.fetchData();
                                } else {
                                    this.$message({
                                        type: 'error',
                                        message: res.data
                                    });
                                }
                            }).then(() => {
                                this.dialogFormVisible = false;
                            });
                        } else {
                            let para = {...f
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
                                } else {
                                    this.$message({
                                        type: 'error',
                                        message: res.data
                                    });
                                }
                            }).then(() => {
                                this.dialogFormVisible = false;
                            });
                        }
                        this.in = '';

                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            fetchData() {
                let a = new Date(this.value3)
                let year = a.getFullYear();
                let month = a.getMonth()
                let day = a.getDate() - 1;
                let thisWeekStart = new Date(year, month, day).toLocaleDateString()
                let year1 = a.getFullYear();
                let month1 = a.getMonth()
                let day1 = a.getDate() + 5;
                let thisWeekEnd = new Date(year1, month1, day1).toLocaleDateString()
                let para = {
                    start_date: thisWeekStart,
                    end_date: thisWeekEnd,
                    classroom_id: this.value,
                }
                getClassTable(token, para).then((res) => {
                    this.teachers = res.data;
                })

            }
        },
        beforeCreate() {
            let user = localStorage.getItem('user');
            token = JSON.parse(user).token;
        },
        created() { //创建组件时

            this.fetchData()

            getClassRoom(token).then((res) => { //获取教室
                this.classRoom = res.data;
            }).then(()=>{
                 getTeacherList(token).then((res) => { //获取老师
                this.teachersName = res.data;
            })
            }).then(()=>{
                getClassKind(token).then((res) => { //获取课程分类
                this.classkind = res.data
            })
            });
           
           
          
        },
        computed: {
            alter: function() {
                if (this.in === '') {
                    return '添加班级'
                }
                return '修改班级'
            },
            format: function() {
                let a = new Date(this.value3)
                let year = a.getFullYear();
                let month = a.getMonth()
                let day = a.getDate() - 1;
                let thisWeekStart = new Date(year, month, day).toLocaleDateString()
                let year1 = a.getFullYear();
                let month1 = a.getMonth()
                let day1 = a.getDate() + 5;
                let thisWeekEnd = new Date(year1, month1, day1).toLocaleDateString()
                let dis = thisWeekStart + ' ~ ' + thisWeekEnd;
                return dis
            }
        }
}
</script>
<style>
.h1 .el-button--primary {
    background-color: #32a4d3;
    border-color: #32a4d3;
}

.el-dialog .el-dialog__header {
    background-color: #1fb5ad;
    padding: 20px 20px 20px;
}

.el-dialog .el-dialog__title {
    color: white;
}

.classT {
    width: 100%;
    position: relative;
    height: 45px;
    background-color: white;
    margin-top: 30px;
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

.oneSelect {
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

.classWeek {
    width: 100%;
    background-color: white;
    text-align: center;
    height: 50px;
    line-height: 50px;
    border: 1px solid gainsboro;
    box-sizing: border-box;
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
</style>
