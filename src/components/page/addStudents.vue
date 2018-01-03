<template>
    <div class='addStudntsH'>
        <!-- <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-my-richeng"></i> 课程表</el-breadcrumb-item>
            </el-breadcrumb>
        </div> -->
        <div class='addStuTCT'>
            <div id="CTh1">
                <h3 class='classTH2'>
                    批量排课
                </h3>
                <!-- <div class='oneSelect' v-if="code.includes('_c')">
                    <el-select v-model="valueS"  placeholder="校区选择" filterable @change="updateListTeach">
                        <el-option v-for="item in receiveSchool" :key="item.id" :label="item.title" :value="item.id">
                        </el-option>
                    </el-select>
                </div>
                <div class='oneSelect' v-if="code.includes('_m')||code.includes('_c')">
                    <el-select v-model="valueT" placeholder="老师选择" filterable @change="updateList">
                        <el-option v-for="item in teachersName" :key="item.aid" :label="item.uname" :value="item.aid">
                        </el-option>
                    </el-select>
                </div>
                <div class='oneSelect'>
                    <el-select v-model="valueC" clearable placeholder="选择教室" filterable @change="updateList">
                        <el-option v-for="item in classRoom" :key="item.id" :label="item.names" :value="item.id">
                        </el-option>
                    </el-select>
                </div>
                <div class='oneSelect'>
                    <el-select v-model="valueL" clearable placeholder="课程选择" filterable @change="updateList">
                        <el-option v-for="item in courseName1" :key="item.kcid" :label="item.title" :value="item.kcid">
                        </el-option>
                    </el-select>
                </div> -->
                <!-- <div class='oneSelect'>
                    <el-select v-model="valueK" clearable placeholder="上课类型" filterable @change="updateList">
                            <el-option label="正常" value="1"></el-option>
                            <el-option label="补课" value="2"></el-option>
                            <el-option label="代课" value="3"></el-option>
                            <el-option label="被代课" value="4"></el-option>
                    </el-select>
                </div> -->
                <!-- <el-button type="success" size="mid" style='margin:0 10px;' class='buttonAdd1' @click="createCh('classform')" v-if="!code.includes('_c')">创建补课</el-button>
                <el-button type="warning" size="mid" class='buttonAdd2' @click="openSubstitute" :disabled='isdisable2||(valueT!=aid&&code!="teach")' v-if="!code.includes('_c')">申请代课</el-button>
                <el-button type="info" size="mid" class='buttonAdd3' @click="openChange" :disabled='isdisable||(valueT!=aid&&code!="teach")' v-if="!code.includes('_c')">调课</el-button>
                <el-button type="danger" size="mid" class='buttonAdd4' @click="openStop" v-if="code.includes('teach_c')">停课</el-button> -->
            </div>
        </div>
        <div class="CTclass">
            
            <!-- <div class='classweekCT'>
                <i class="el-icon-arrow-left" @click='lastWeek'></i>
                <el-date-picker v-model="value3" type="week" class="CTclass1" :format="format" placeholder="当前周" :clearable='no' :editable='no'
                    :picker-options="dateRangeOptions1" @change='updateClass'>
                </el-date-picker>
                <i class="el-icon-arrow-right" @click='nextWeek'></i> -->
                <!-- <div v-if="code=='teach'" style="position: absolute;top: 0;right: 8px;"><el-button type="danger" size="mini" @click='openRecord'><i class="el-icon-my-baobiaoguanli" style="font-size:16px;"></i><span style="font-size:16px;">考勤记录</span></el-button></div> -->
                <!-- <div class="CTclass2" v-if='isdisable||isdisable2'>
                    <el-button :type="typeStatus" @click="nextToStep">下一步</el-button>
                    <el-button @click="cancelAll">取 消</el-button>
                </div>
            </div> -->
            <div class="CTclass3">
                <!-- <div style="text-align:center;height:40px;line-height:40px;background:white;border-left:1px solid gainsboro;border-right:1px solid gainsboro;border-bottom:1px solid gainsboro;flex:0 0 100px">老师</div> -->
                <div v-for='(item,index) in week' class="CTclass4">{{item}}
                        <!-- <span>{{index==0?w1:index==1?w2:index==2?w3:index==3?w4:index==4?w5:index==5?w6:index==6?w7:''}}</span>                         -->
                </div>
            </div>
            <div class="CTclass5" v-loading='loading'>

                <!-- <div style="text-align:center;background:white;border-left:1px solid gainsboro;border-right:1px solid gainsboro;border-bottom:1px solid gainsboro;flex:0 0 100px;display:flex;flex-direction: column;justify-content: center;">{{t.uname}}</div> -->
                <div v-for='item in teachers' class="CTclass6" v-if='Object.values(teachers).some(item=>{return item.length!=0})'>
                    <div v-for='i in item' class="addStop"
                        @click='showClass(i,$event)'>
                        <div class="CTclass8">
                            <span class="CTclass9">{{i.class_time}}</span>
                            <span class="CTclass10">{{i.class_room.names}}({{i.studentCount}}人)</span>
                        </div>
                        <div class="CTclass11">
                            <span class="CTclass12">{{i.title}}</span>
                            <p class="addS13" @click='addStudent(i,$event)'>添加学生</p>
                            <!-- <span class="CTclass14" v-if="i.type==5">已停课</span>
                           
                            <span class="CTclass14" v-if="i.check_status=='overdue'&&i.studentCount!==0">签到超时</span> -->
                        </div>
                    </div>
                    <!-- <div v-if='!Array.isArray(item)' style='padding-left:10px;border-bottom:1px solid gainsboro' class='lessonhoverCT'>
                        <div><span style="margin-right:10px">{{item.class_time}}</span><span style="margin-left:10px">{{item.course.title}}</span></div>
                        <div><span>{{item.class_room.names}}({{item.syllabus_person_num}}人)</span>
                            <img src="../../../static/img/editClass.png" width='20' alt="" class='classImg'>
                        </div>
                    </div> -->
                </div>
                <div v-if='Object.values(teachers).every(item=>{return item.length==0})' class='courseTableNo'>暂无课程</div>
            </div>
        </div>
        <!-- 签到超时班级详情 -->
        <el-dialog :title="classTitle" :visible.sync="dialogFormVisibleOverTime" :close-on-click-modal="no" top='10%' size='tiny' >
                <el-table :data="accountData"  style='width:100%'>
                        <el-table-column prop="child_name" label="学生">
                        </el-table-column>
                        <!-- <el-table-column prop="title" label="标签内容">
                        </el-table-column>
                        <el-table-column prop="created_at" label="创建时间">
                        </el-table-column> -->
                        <el-table-column label="操作" width='120'>
                            <template scope="scope">
                                <!-- <el-button type="text" size="small" @click="editCh(scope.$index, accountData)">修改</el-button> -->
                                <el-button type="text" size="small" @click="open2(scope.row.order_item_id)"  style='color:red'>删除</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
        </el-dialog>
        <el-dialog title="添加学生" :visible.sync="dialogFormVisibleremedialTitle" :close-on-click-modal="no" top='2%' show-close @close='resetDT'
            size='large'>
            <div >
                    <!-- <div class='oneSelect'>
                            <el-select v-model="valueL" clearable placeholder="课程选择" filterable @change="updateList">
                                <el-option v-for="item in courseName1" :key="item.kcid" :label="item.title" :value="item.kcid">
                                </el-option>
                            </el-select>
                        </div> -->
                        <div class='oneSelect'>
                                <el-select v-model="valueK" clearable placeholder="选择星期" filterable @change="updateList">
                                        <el-option label="周一" value="1"></el-option>
                                        <el-option label="周二" value="2"></el-option>
                                        <el-option label="周三" value="3"></el-option>
                                        <el-option label="周四" value="4"></el-option>
                                        <el-option label="周五" value="5"></el-option>
                                        <el-option label="周六" value="6"></el-option>
                                        <el-option label="周日" value="7"></el-option>
                                </el-select>
                            </div>
                            <div style="width:162px;display:inline-block;margin-left: 10px;margin-bottom: 10px;">
                                    <el-input placeholder="输入手机号或姓名" icon="search" v-model="input2" @keyup.enter.native="updateList" :on-icon-click="updateList"  > </el-input>
                                </div>
                <div >
                    <!-- <div style="padding-top:9px;padding-bottom:15px">请勾选所需调课的学生</div> -->
                    <el-table :data="resourceData" border @selection-change="handleSelectionChange">
                        <el-table-column type="selection">
                        </el-table-column>
                        <el-table-column prop="child_name" label="学生" >
                        </el-table-column>
                        <el-table-column prop="mobile" label="手机" >
                            </el-table-column>
                            <el-table-column prop="kecheng" label="课程">
                                </el-table-column>
                                <el-table-column prop="schooltime" label="上课时间" >
                                        <template scope="scope">
                                                <span >{{scope.row.week_num}} {{scope.row.schooltime}}</span>
                                            </template>
                                    </el-table-column>
                                    <el-table-column prop="course_curr_num" label="剩余课时">
                                        </el-table-column>
                                        <el-table-column prop="overData" label="合同日期" >
                                                <template scope="scope">
                                                        <span >{{scope.row.first_data}}~{{scope.row.overData}}</span>
                                                    </template>
                                            </el-table-column>
                    </el-table>
                    
                    <div class="block">
                            <el-pagination layout="prev, pager, next" :total="total" :current-page="currentPage" :page-size="pagesize" @current-change="handleCurrentChange">
                            </el-pagination>
                        </div>
                </div>
            </div>
            <div style="clear:both"></div>
            <div slot="footer" class="dialog-footer" style='margin-top:-24px'>
                <el-button type="primary" :loading='writeL' :disabled="multipleSelection.length==0" @click="goToEnd">提交</el-button>
                <el-button @click="dialogFormVisibleremedialTitle=false">取消</el-button>
                <br>
            </div>
        </el-dialog>
    </div>
</template>
<script>
    var token, user
    import {
        getClassLibrary,
        autoSyllabusStudentList,
        getteachClassTable,
        getDetailClassTable,
        postSyllabusStudentList,
        removeSyllabusUser
    } from '../../api/api';
    export default {
        data() {
            return {
                writeL:false,
                loading:true,
                resourceData: [],
                dialogFormVisibleremedialTitle: false,
                valueL: '',
                valueK: '',
                isdisable: false,
                // src: '../../../static/img/editClass.png',
                dateRangeOptions1: {
                    firstDayOfWeek: 1,
                },
                value3: new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDay() == 0 ? new Date()
                    .getDate() - 5 : new Date().getDate() - new Date().getDay() + 2),
                students: [],
                teachers: [],
                noSignStill:0,
                week: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
                currentPage: 1, //页数
                pagesize: 15, //默认每页
                total: 0, //总页数
                // in: '', //修改时代表修改的index
                no: false, //取消点击关闭
                courseName1: [],
                // number: '',
                dialogFormVisibleOverTime: false,
                resultArr: [],
                selectClass: [],
                signName: {},
                code: '',
                classTitle: '',
                approvalData: {},
                thisWeekStart: '',
                thisWeekEnd: '',
                multipleSelection: [],
                input2:'',
                backI:{}
            }
        },
        methods: {
            goToEnd(){
                let para = {
                    class_id: this.backI.id,
                    order_item_id:this.multipleSelection.join(',')
                }
                this.writeL = true;
                postSyllabusStudentList(para,token).then(res=>{
                    if(res.code==0){
                        this.$message.success('添加成功');
                this.writeL = false;                        
                        this.dialogFormVisibleremedialTitle = false;
                        this.fetchData()
                    }else{
                        this.$message.error(res.data);
                this.writeL = false;   
                    }
                })
                console.log(para)
            },
            updateList() { //
                let para = {
                    page: this.currentPage,
                    class_id: this.backI.id,
                    // course_id: this.valueL, //课程
                    week: this.valueK, //具体班级
                    kwd: this.input2
                }
                autoSyllabusStudentList(token, para).then((res) => {//替换服务
                    // this.number = res.data.total;
                    let a = res.data.data;
                    let c = res.data.last_page * this.pagesize;
                    // console.log(a)
                    this.resourceData = a;
                    this.total = parseInt(c);
                })
            },
            handleCurrentChange: function (val) {
                this.currentPage = val;
                this.updateList();
            },
            addStudent(i,e){
                // console.log(i)
                this.backI = i;
                if(e.target.innerHTML == '添加学生'){
                    let para = {
                    page: this.currentPage,
                    class_id: this.backI.id,
                    course_id: this.valueL, //课程
                    week: this.valueK, //具体班级
                    kwd: this.input2
                }
                autoSyllabusStudentList(token, para).then((res) => {//替换服务
                    // this.number = res.data.total;
                    let a = res.data.data;
                    let c = res.data.last_page * this.pagesize;
                    // console.log(a)
                    this.resourceData = a;
                    this.total = parseInt(c);
                })
                this.dialogFormVisibleremedialTitle = true;
                }
            },
            open2(id) { //删除学生
                    this.$confirm('是否确定要删除该学生?', '删除学生', {

                        customClass: 'TLredwarn',
                        cancelButtonText: '取消',
                        confirmButtonText: '确定',
                        type: 'warning'
                    }).then(() => {
                        let a = {
                            order_item_id: id,
                            class_id:this.backI.id,
                        }
                        removeSyllabusUser(token,a).then((res) => {
                            if(res.code==0){

                                // this.fetchData();
                                    this.$message.success('删除成功')
                                    let para = {
                                                id:this.backI.id,
                                                schooltime:this.backI.schooltime
                                                }
                                getDetailClassTable(token, para).then(res => {
                                    let i = res.data
                                    this.accountData = i.students;
                                    this.classTitle = i.class_time + ' ' + i.title + ' ' + i.teacher.uname + ' ' + i.class_room.names +
                        '(' +  this.accountData.length + '人' + ')'
                                }).then(()=>{
                                    this.fetchData()
                                })
                            }else{
                                this.$message.error(res.data)
                            }
                        }).catch((res) => {
                            // this.$message.error('该用户未授权')
                        })
                    })
                
            },
            handleSelectionChange(val) { //筛选中勾选学生
                this.multipleSelection = val.map(item => {
                    return item.order_item_id
                });
            },
            resetDT() {
                this.multipleSelection = [];
                this.valueL = '';
                this.valueK = '';
                this.input2 = '';
                this.accountData = []
            },
            showClass(i, e) { //获取课程详细
            if(e.target.innerHTML !== '添加学生'){
                this.backI = i;
                    this.classTitle = i.class_time + ' ' + i.title + ' ' + i.teacher.uname + ' ' + i.class_room.names +
                        '(' + i.studentCount + '人' + ')'
                  
                        let para = {
                            id: i.id,
                            schooltime: i.schooltime,
                            type:2
                        }
                        getDetailClassTable(token, para).then(res => {
                            this.accountData = res.data.students;
                            return res
                        }).then((res) => {
                                    this.dialogFormVisibleOverTime = true; 
                        })    
            }
            },
            fetchData() {
                this.loading = true;                
                let a = new Date(this.value3)
                let year = a.getFullYear();
                let month = a.getMonth()
                let day = a.getDate() - 1;
                this.thisWeekStart = new Date(year, month, day).toLocaleDateString()
                // let year1 = a.getFullYear();
                // let month1 = a.getMonth()
                let day1 = a.getDate() + 5;
                this.thisWeekEnd = new Date(year, month, day1).toLocaleDateString()
                let para = {
                    start_date: this.thisWeekStart,
                    end_date: this.thisWeekEnd,
                    type:'normal',
                    // school_id: this.valueS,
                    // classroom_id: this.valueC,
                    // course_id: this.valueL,
                    // kind:this.valueK,
                    // teach_id: this.valueT //this.valueT
                }
                getteachClassTable(token, para).then((res) => {
                    this.teachers = res.data;
                }).then(() => {
                    this.loading = false;
                })

            }
        },
        beforeCreate() {
            user = sessionStorage.getItem('user');
            token = JSON.parse(user).token;
        },
        created() { //创建组件时
            this.fetchData()
            let para = {//全部课程
                    pid: 1,
                    simple: 1
                }
                getClassLibrary(token, para).then((res) => {

                    this.courseName1 = res.data;
                })
        },
        computed: {
            format: function () {
                let a = new Date(this.value3)
                let year = a.getFullYear();
                let month = a.getMonth()
                let day = a.getDate() - 1;
                let thisWeekStart = new Date(year, month, day).toLocaleDateString()
                // let year1 = a.getFullYear();
                // let month1 = a.getMonth()
                let day1 = a.getDate() + 5;
                let thisWeekEnd = new Date(year, month, day1).toLocaleDateString()
                let dis = thisWeekStart + ' ~ ' + thisWeekEnd;
                return dis
            }
        }
    }

</script>
<style>
    .addStudntsH .el-dialog .el-dialog__header {
        background-color: #1fb5ad;
        padding: 20px 20px 20px;
    }

    .addStudntsH .el-dialog .el-dialog__title {
        color: white;
    }

    .addStuTCT {
        width: 100%;
        position: relative;
        height: 38px;
        background-color: white;
        /* margin-top: 30px; */
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

    .addStop{
        padding-left: 20px;
        border-bottom: 1px solid gainsboro;
        position: relative
    }

    .addStop:hover {
        color: #1fb5ad;
        cursor: pointer;
    }


    .CTclass {
        border-left: 1px solid gainsboro;
    }

    .CTclass3 {
        display: flex;
        color: darkslategrey;
    }

    .CTclass4 {
        text-align: center;
        height: 40px;
        line-height: 40px;
        background: white;
        flex: 1 1 1px;
        border-right: 1px solid gainsboro;
        border-bottom: 1px solid gainsboro;
        z-index: 1000;
    }

    .CTclass5 {
        width: 100%;
        background: white;
        display: flex;
        align-items: stretch;
        position: relative;
        color: darkslategrey;
        z-index: 1000;
    }

    .CTclass6 {
        line-height: 40px;
        background: white;
        flex: 1 1 1px;
        border-right: 1px solid gainsboro;
        border-bottom: 1px solid gainsboro;
        font-size: 12.8px;
        position: relative
    }

    .CTclass8 {
        display: flex;
        align-items: center;
        justify-content: space-between;
    }

    .CTclass9 {
        font-weight: bold;
        width: 24%;
        padding-left: 1px
    }

    .CTclass10 {
        width: 76%;
        text-align: center;
    }

    .CTclass11 {
        display: flex;
        height: 40px;
        align-items: center
    }

    .CTclass12 {
        line-height: 20px;
        flex: auto;
        padding-left: 1px;
        font-size: 15px;
        font-style: oblique;
        font-weight: bold;
    }

    .addS13 {
        position: absolute;
        right:45%;
        bottom: 31px;
        color: #1fb5ad;
        width: 60px;
        transform: translate(25px, 0);
        border: 1px solid #1fb5ad;
        border-radius: 5px;
        line-height: 17px;
        text-align: center
    }
.addS13:hover{
    background: #1fb5ad;
    color:white;
}

.courseTableNo{
width:100%;text-align:center;line-height:82px;height:82px;border-right:1px solid gainsboro;border-bottom:1px solid gainsboro
}
    .TLredwarn .el-message-box__header {
    background-color: #e95c5c;
    padding: 20px 20px 20px;
}

.TLredwarn .el-message-box__title {
    color: white;
}

.TLredwarn .el-button--primary {
    background-color: #e95c5c;
    border-color: #e95c5c;
    text-align: center;
}

.TLredwarn .el-message-box__content {
    padding: 40px 20px;
}
.block {
        text-align: center;
        margin-top: 10px;
    }
</style>
