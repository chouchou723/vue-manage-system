<template>
    <div class="tableUserDTSD">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item id="canHover" :to="{ path: '/teachStudentManage'}"><i class="el-icon-my-yonhu"></i> 学员管理</el-breadcrumb-item>
                <el-breadcrumb-item class='ss'>{{student.name}}</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <!-- 用户资料 -->
        <div style="float:left;width:30%;background-color:white;height:550px;border-radius:5px;margin-right:1%;position:relative">
            <div class='UserDetailTitle'>
                <!--  <i class=el-icon-my-tongxunlu style="font-size:31px"></i> -->
                <span style="font-weight:600;font-size:22px">学员资料</span>
            </div>
            <el-form id='customerDeatilForm' label-width="102px" label-position='left' style='border-top:1px solid #e8e8e8 ;padding-left:10px;position:relative;'>
                <el-form-item label="姓名:" prop='name'>
                    <span>{{student.name}}</span>
                </el-form-item>
                <el-form-item label="性别:" prop='sex'>
                    <span>{{student.sex}}</span>
                </el-form-item>
                <el-form-item label="年龄:" prop='age'>
                    <span>{{student.age}}</span>
                </el-form-item>
                <el-form-item label="出生日期:" prop='birthday'>
                        <span>{{student.birthday}}</span>
                    </el-form-item>
                <el-form-item label="身份证号:" prop='id_number'>
                        <span>{{student.id_number}}</span>
                    </el-form-item>
                <el-form-item label="家长:" prop='parent'>
                    <span>{{student.parent}}</span>
                </el-form-item>
                <el-form-item label="第二家长:" prop='parent1'>
                    <span>{{student.parent1}}</span>
                </el-form-item>
                <el-form-item label="手机:" prop='parent_phone'>
                    <span>{{student.parent_phone}}</span>
                </el-form-item>
                <el-form-item label="第二手机:" prop='parent1_phone'>
                    <span>{{student.parent1_phone}}</span>
                </el-form-item>
                <el-form-item label="渠道来源:" prop='channel'>
                    <span>{{student.channel}}</span>
                </el-form-item>
                <el-form-item label="录入时间:" prop='time'>
                    <span>{{student.time}}</span>
                </el-form-item>
                <el-form-item label="校区:" prop='school'>
                    <span>{{student.school}}</span>
                </el-form-item>
                <el-form-item label="CC:" prop='teacher'>
                    <span>{{student.teacher}}</span>
                </el-form-item>
            </el-form>
            <div style="position:absolute;top:60px;right:15px">
                <img :src='student.head_img' style='border-radius:50%' width="100" height="100" alt="">
            </div>
        </div>
        <!-- 考勤记录 -->
        <div style="float:left;width:69%;background-color:white;height:550px;border-radius:5px;position:relative">
            <div class='AttRecord'>
                <!--  <i class=el-icon-my-tongxunlu style="font-size:31px"></i> -->
                <i class='el-icon-my-richeng' style="font-size:24px"></i><span style="font-weight:600;font-size:22px">考勤记录</span>
                <div class='studentDetailThreeNew'>
                    <el-select v-model="valueR" clearable placeholder="全部课程" @change="updateList">
                        <el-option v-for="item in allClass" :key="item.kcid" :label="item.title" :value="item.kcid">
                        </el-option>
                    </el-select>
                </div>
                <!-- <div class='studentDetailThreeNew'>
                    <el-select v-model="value1" clearable placeholder="选择老师" filterable @change="updateList">
                        <el-option v-for="item in teachersName" :key="item.aid" :label="item.uname" :value="item.aid">
                        </el-option>
                    </el-select>
                </div> -->
            </div>
            <div id="table1TSD">
                <el-table :data="tableData" border style="width: 100%">
                    <el-table-column prop="course_id" label="课程">
                    </el-table-column>
                    <el-table-column prop="course_time" label="上课时间">
                    </el-table-column>
                    <el-table-column prop="teacher_uid" label="上课老师">
                    </el-table-column>
                    <el-table-column prop="checkin_types" label="签到情况">
                        <template scope="scope">
                            <span :style="scope.row.checkin_types=='出勤'?'color:#18c318': scope.row.checkin_types=='请假'? 'color:#e4a821' :'color:red' ">{{scope.row.checkin_types}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="course_time" label="签到时间">
                    </el-table-column>
                </el-table>
                <div class="block">
                  <!-- <span class="demonstration"></span> -->
                <el-pagination layout="prev, pager, next" :total="total" :current-page="currentPage" :page-size="pagesize" @current-change="handleCurrentChange">
                </el-pagination>
            </div>
            </div>
            <div class="block">
                <el-pagination layout="prev, pager, next" :total="total1" :current-page="currentPage1" :page-size="pagesize1" @current-change="handleCurrentChange1">
                </el-pagination>
            </div>
        </div>
        <!-- 课耗奖励 -->
        <div class="giftfirst">
            <div class='GiftDetailTitle'>
                <span style="font-weight:600;font-size:22px">课耗奖励</span>
            </div>
            <div>
                <ul class='giftul'>
                    <li class='gift1'>出勤</li>
                    <!-- <li class='gift2'>补课</li> -->
                    <li class='gift3'>请假</li>
                    <li class='gift4'>旷课</li>
                    <li class='gift5'>待上课</li>
                </ul>
            </div>
            <div style="clear:both"></div>

            <div v-for='item in classList' style="display:flex;justify-content:flex-start;align-items:center;flex-wrap:wrap;width:92%;margin:0 auto 20px">
                <div style='color:#1fb5ad;font-size:30px;width:1000px;text-align:left;'>{{item.name}}</div>
                <div style="height:54px;display:flex;align-items:center;width:1060px;">
                    <span v-for='s in item.list' :class="[s==1?'a1':s==2?'a3':s==3?'a4':'a5']"></span>
                </div>
            </div>
            <div class="TSD" v-if='gainList.length!=0' style='display:flex;justify-content:flex-start;margin-bottom:20px;color:rgb(31, 61, 60);overflow-y:auto;height:210px;flex-wrap:wrap; align-content: flex-start'>
                <div v-for='c in gainList' style="display:flex;justify-content:space-around;align-items:center;width:50%;height:40px;font-size:14px">
                    <span class='circleSpan'>{{c.created}}</span>
                    <span>{{c.courseName}}完成消耗</span>
                    <span v-if='c.give_teach!=0' style='flex:0 0 130px;text-align:center'>{{c.updates}}完成领取</span>
                    <span v-if='c.give_teach==0' style='flex:0 0 130px;text-align:center'>

                        <el-button type="text" size="small" style='color:white;background:#1fb5ad;padding:8px 30px;' @click="claim(c.id,c.order_item_id)">发放</el-button>
                        </span>
                </div>
            </div>

        </div>
        <!-- 合同课程 -->
        <div style="float:left;width:100%;background-color:white;height:auto;border-radius:5px;position:relative;margin-top:20px;margin-bottom:20px">
            <div class='contractClass'>
                <!--  <i class=el-icon-my-tongxunlu style="font-size:31px"></i> -->
                <span style="font-weight:600;font-size:22px">合同课程({{contractNumber}}个)</span>

            </div>
            <div id="table4TSD">
                <div v-for="item in students" class='table4Title'>
                    <div class='table4Div'>
                        <div style="display:flex;align-items:center;margin-left:10px">
                            <div style="font-size:16px;margin-left:10px">
                                <span style='font-weight:bold;'>
                          合同编号:  {{item.sku}}  
                        </span>
                                <!-- <span :style="item.order_status=='待审核'?'color:blue':item.order_status=='审核通过'?'color:#18c318':item.order_status=='被退回'?'color:#e4a821':'color:red'">
                           ({{item.order_status}}) 
                        </span> -->
                            </div>
                        </div>
                        <div style="margin-right:10px;color:grey;font-size:16px">
                            <!-- <span style="margin-right:5px">合同类型: {{item.order_type}}</span> -->
                            <span class='table4Teacher'>试听老师: {{item.baoming_teach}}</span>
                            <span style="margin-left:5px">签约时间: {{item.created}}</span></div>
                    </div>
                    <div style='display:flex;justify-content:space-between;'>
                        <el-table :data="item.dataTable" border>
                            <el-table-column prop="title" label="课程">
                            </el-table-column>
                            <el-table-column prop="curse_price_num" label="课时" width='80'>
                            </el-table-column>
                            <el-table-column prop="course_curr_num" label="剩余课时" width='80'>
                            </el-table-column>
                            <el-table-column prop="classTime" label="排班管理">
                                <template scope="scope">
                                    <span v-if="scope.row.classTime">{{scope.row.classTime}}</span>
                                    <!-- <img class='imgEdit' src="../../../static/img/editClass.png" width='16' alt="" @click='arrangeClass(scope.row)'> -->
                                    <!-- <span v-if="!scope.row.classTime&&scope.row.course_curr_num!=0" class='arrangeClass' @click='arrangeClass(item,scope.row)'>立即排班</span> -->
                                    <span v-else>无</span>
                                </template>
                            </el-table-column>
                            <el-table-column prop="expired" label="有效期">
                                <template scope="scope">
                                    <span>{{scope.row.expired[0].substring(0,10)}}~{{scope.row.expired[1].substring(0,10)}}</span>
                                </template>
                            </el-table-column>
                            <el-table-column prop="status" label="课程状态" column-key='status'>
                                <template scope="scope">
                                    <span :style="scope.row.status=='正常'? 'color:black' : scope.row.status=='未排班'?'color:#dba31c':scope.row.status=='冻结'?'color:#50bfff':'color:#e21a59' ">{{scope.row.status}}</span>
                                </template>
                            </el-table-column>
                        </el-table>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    var token, user
    import {
        getMyStudentLessonDetail,
        getClassLibrary,
        getTeacherList,
        returnVisitDetail,
        getMyStudentSign,
        getClassBonus,
        sendPresent
    } from '../../api/api';

    export default {
        data() {
            return {
                classList: [],
                gainList: [],
                allClass: [],
                total1: 0,
                currentPage1: 1, //页数
                pagesize1: 8, //默认每页
                teachersName: [],
                value1: '',
                valueR: '',
                tableData: [],
                userName: '',
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
                    teacher: '',
                    head_img:''
                },
                code: '',
                contractnumber: '0',
                students: [{
                    dataTable: [],
                    sku: ''
                }, {
                    dataTable: [],
                    sku: ''
                }, {
                    dataTable: [],
                    sku: ''
                }],
            }
        },
        methods: {
            claim(id, oid) {
                this.$confirm('是否确定发放?', '发放', {
                    title: '发放',
                    customClass: 'green',
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    // type: 'warning'
                }).then(() => {
                    let para = {
                        order_item_id: oid,
                        id: id
                    }
                    sendPresent(para, token).then(res => {
                        if (res.code == 0) {
                            this.$message.success('发放成功');
                            let para1 = {
                                uid: this.$route.params.uid
                            }
                            getClassBonus(token, para1).then(res => {
                                // console.log(res)
                                this.classList = res.data.course
                                this.gainList = res.data.continuity
                            })
                        } else {
                            this.$message.error(res.data)
                        }
                    })
                }).catch(() => {
                    console.log('cancel')
                })
            },
            updateList() { //考勤记录更新
                let para = {
                    page: 1,
                    course_id: this.valueR,
                    uid: this.$route.params.uid,
                    // teacher_uid: this.valueR
                }
                getMyStudentSign(token, para).then(res => {
                    this.tableData = res.data.data;
                    let c = res.data.last_page * this.pagesize1;
                    this.total1 = parseInt(c);
                })

            },

            handleCurrentChange1: function (val) { //签到变更页数
                this.currentPage1 = val;
                let p = {
                    page: this.currentPage1,
                    course_id: this.valueR,
                    uid: this.$route.params.uid
                }
                getMyStudentSign(token, p).then(res => {
                    this.tableData = res.data.data;
                    let c = res.data.last_page * this.pagesize1;
                    this.total1 = parseInt(c);
                })
            },
        },
        beforeCreate() {
            user = sessionStorage.getItem('user');
            token = JSON.parse(user).token;
        },
        created() {
            document.body.scrollTop = 0
            this.userName = JSON.parse(user).uname;
            this.code = JSON.parse(user).job ? JSON.parse(user).job.code : '';
            let para = {
                uid: this.$route.params.uid
            }
            returnVisitDetail(token, para).then(res => {//获取用户资料
                let data = res.data.info;
                this.student = {
                    name: data.child_name,
                    head_img:data.head_img,
                    age: data.age,
                    sex: data.sex,
                    birthday: data.birthday,
                    school: data.school_name,
                    channel: data.source_name,
                    time: data.regtime,
                    parent: res.data.famliys[0].uname + '(' + res.data.famliys[0].relation + ')',
                    parent_phone: res.data.famliys[0].mobile,
                    parent1: res.data.famliys[1] ? res.data.famliys[1].uname ? res.data.famliys[1].uname +
                        '(' + res.data.famliys[1].relation + ')' : '暂无' : '暂无',
                    parent1_phone: res.data.famliys[1] ? res.data.famliys[1].mobile || '暂无' : '暂无',
                    teacher: data.cc_name

                }
            }).catch(() => {
                console.log('No Data')
            })
            getMyStudentSign(token, para).then(res => {
                this.tableData = res.data.data;
                let c = res.data.last_page * this.pagesize1;
                this.total1 = parseInt(c);
            })
            getClassBonus(token, para).then(res => {
                // console.log(res)
                this.classList = res.data.course
                this.gainList = res.data.continuity
            })
            getMyStudentLessonDetail(token, para).then(res => {//合同课程
                if (res.data.length != 0) {

                    this.contractNumber = res.data.length
                    this.students = res.data
                } else {
                    this.students = [{
                        dataTable: [],
                        sku: ''
                    }]
                }
                // console.log(res)
            }).then(() => {
                let si = {
                    simple: 1,
                    uid: this.$route.params.uid
                }
                getClassLibrary(token, si).then(res => {
                    this.allClass = res.data
                })

                getTeacherList(token).then((res) => { //获取老师
                    this.teachersName = res.data;
                })
            })

        },
        // watch:{
        //     '$route' (to,form){
        //         console.log(to)
        //          console.log(from)
        //     }
        // }
    }

</script>
<style>
    /*.readd {
    pointer-events: none
}*/

    .circleSpan {
        position: relative;
        flex: 0 0 125px;
    }

    .circleSpan::before {
        content: '';
        width: 5px;
        height: 5px;
        background: rgb(31, 61, 60);
        position: absolute;
        top: 6px;
        left: -12px;
        border-radius: 50%
    }

    .giftfirst {
        float: left;
        width: 100%;
        background-color: white;
        height: auto;
        border-radius: 5px;
        margin-top: 20px;
    }

    .a1,
    .a2,
    .a3,
    .a4,
    .a5 {
        position: relative;
        display: inline-block;
        /* width: 20px; */
        flex: 0 1 20px;
        height: 36px;
        margin-right: 2px;
    }

    .a1::before {
        content: '';
        width: 100%;
        height: 36px;
        background: #1fb5ad;
        position: absolute;
    }

    .a2::before {
        content: '';
        width: 100%;
        height: 36px;
        background: #13ce66;
        position: absolute;
    }

    .a3::before {
        content: '';
        width: 100%;
        height: 36px;
        background: #e8d822;
        position: absolute;
    }

    .a4::before {
        content: '';
        width: 100%;
        height: 36px;
        background: #f14646;
        position: absolute;
    }

    .a5::before {
        content: '';
        width: 100%;
        height: 36px;
        background: #d6dfe8;
        position: absolute;
    }

    .giftul {
        list-style: none;
        margin-left: 10%;
        margin-top: 20px;
    }

    .gift1,
    .gift2,
    .gift3,
    .gift4,
    .gift5 {
        float: left;
        position: relative;
        padding-left: 30px;
        font-size: 15px;
    }

    .gift1::before {
        content: '';
        width: 15px;
        height: 10px;
        background: #1fb5ad;
        position: absolute;
        left: 10px;
        top: 5px;
    }

    .gift2::before {
        content: '';
        width: 15px;
        height: 10px;
        background: #13ce66;
        position: absolute;
        left: 10px;
        top: 5px;
    }

    .gift3::before {
        content: '';
        width: 15px;
        height: 10px;
        background: #e8d822;
        position: absolute;
        left: 10px;
        top: 5px;
    }

    .gift4::before {
        content: '';
        width: 15px;
        height: 10px;
        background: #f14646;
        position: absolute;
        left: 10px;
        top: 5px;
    }

    .gift5::before {
        content: '';
        width: 15px;
        height: 10px;
        background: #d6dfe8;
        position: absolute;
        left: 10px;
        top: 5px;
    }

    .UserDetailTitle {
        position: relative;
        background: url(../../../static/img/contact.png) left center/25px no-repeat;
        padding: 10px 10px 10px 27px;
        margin-left: 12px
    }

    .contractClass {
        position: relative;
        background: url(../../../static/img/contract.png) left center/25px no-repeat;
        padding: 10px 10px 10px 27px;
        margin-left: 12px
    }

    .GiftDetailTitle {
        position: relative;
        background: url(../../../static/img/gift.png) left center/25px no-repeat;
        padding: 10px 10px 10px 30px;
        margin-left: 12px;
        border-bottom: 1px solid gainsboro;
    }

    .contractClass .el-button--success {
        color: #fff;
        background-color: #13ce66;
        border-color: #13ce66;
    }

    .contractClass .el-button--success:hover {
        background: #42d885;
        border-color: #42d885;
        color: #fff;
    }

    .AttRecord {
        position: relative;
        /*background: url(../../../static/img/contact.png) left center/25px no-repeat;*/
        padding: 10px 10px 10px 17px;
        /*margin-left: 12px*/
    }

    #customerDeatilForm .el-form-item {
        margin-bottom: 8px
    }

    #customerDeatilForm .el-form-item__label {
        padding: 8px 12px 5px 0;
    }

    #customerDeatilForm .el-form-item__content {
        line-height: 30px
    }


    .tableUserDTSD .block {
        text-align: center;
        position: absolute;
        bottom: 10px;
        width: 100%;
    }

    .tableUserDTSD .el-dialog .el-dialog__header {
        background-color: #1fb5ad;
        padding: 20px 20px 20px;
    }

    .tableUserDTSD .el-dialog .el-dialog__title {
        color: white;
    }


    .green .el-message-box__header {
        background-color: #1fb5ad;
        padding: 20px 20px 20px;
    }

    .green .el-message-box__title {
        color: white;
    }

    #table1TSD .el-table td,
    #table1TSD .el-table th:not(.gutter) {
        padding: 1px;
        text-align: center
    }

    #table1TSD .el-table th>div,
    #table1TSD .el-table .cell {
        padding-left: 0;
        padding-right: 0;
    }

    .studentDetailThreeNew {
        display: inline-block;
        width: 106px;
        /*margin-right: 10px;*/
        margin-bottom: 10px;
        margin-left: 10px
    }

    .TSD::-webkit-scrollbar {
        display: none
    }

    .table4Title {
        background: white;
        margin-bottom: 20px
    }

    .table4Div {
        display: flex;
        justify-content: space-between;
        height: 50px;
        line-height: 50px;
        border: 1px solid rgb(223, 236, 235);
        border-bottom: none
    }

    .table4Teacher {
        padding-left: 10px;
        padding-right: 10px;
        border-left: 1px solid rgb(223, 236, 235);
        border-right: 1px solid rgb(223, 236, 235)
    }

    #table4TSD .el-table td,
    #table4TSD .el-table th:not(.gutter) {
        padding: 1px;
        text-align: center
    }

    #table4TSD .el-table th>div,
    #table4TSD .el-table .cell {
        padding-left: 0;
        padding-right: 0;
    }

    #canHover .el-breadcrumb__item__inner:hover {
        cursor: pointer
    }

</style>
