<template>
    <div class="signList">
        <!-- <div class='bigs' v-if='isDisplay=="1"' @click='closebig'></div> -->
        <!-- <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-my-kaoqinliuchengtongji"></i> 学员管理</el-breadcrumb-item>
            </el-breadcrumb>
        </div> -->
        <div class='SLctcover10'>
            <div>
                <!-- <el-checkbox v-model="checked" style='margin-left:5px' @click.native='allCheck(customerData)'></el-checkbox> -->
                <h3 class="SLctcover11">
                    签到记录
                    <!-- <span v-if="number==='0'" style="font-size:14px;color: #bdb8b8;">加载中...</span>
               <span v-else>({{number}}人)</span> -->
                </h3>
            </div>
            <div style="display:flex;flex-wrap:wrap">
                    <div class='SLctcover9' v-if="code.includes('_c')">
                            <el-select v-model="valueR"  placeholder="选择校区" @change="updateListCC">
                                <el-option v-for="item in optionR" :key="item.id" :label="item.title" :value="item.id">
                                </el-option>
                            </el-select>
                        </div>
                <div class='SLctcover9' v-if="code.includes('_c')||code.includes('_m')">
                        <el-select v-model="value1"  placeholder="选择老师" @change="updateList">
                                <el-option v-for="item in teacherList" :key="item.aid" :label="item.uname" :value="item.aid">
                                </el-option>
                            </el-select>
                </div>
            </div> 
        </div>
        <div id="tableTSM" >
                    <el-table :data="signData" border  v-loading="loading2">
                            <el-table-column prop="course_time" label="上课时间">
                                    <template scope="scope">
                                            <span class='canGo' @click='openD(scope.row)'>{{scope.row.course_time}} {{scope.row.week}}</span>
                                        </template>
                                </el-table-column>
                            <el-table-column prop="courseName" label="班级课程">
                                  
                                </el-table-column>
                        <el-table-column prop="teacherName" label="老师">
                        </el-table-column>
                        <el-table-column prop="schoolName" label="校区" column-key='status'>
                        </el-table-column>
                        <!-- <el-table-column prop="courseName" label="课程" width='67'>
                        </el-table-column>
                        <el-table-column prop="week" label="星期" width='67'>
                        </el-table-column>
                        <el-table-column prop="course_time" label="上课时间">
                        </el-table-column> -->
                    </el-table>
        </div>
        <div class="block">
            <el-pagination layout="prev, pager, next" :total="total" :current-page="currentPage" :page-size="pagesize" @current-change="handleCurrentChange">
            </el-pagination>
        </div>
        <el-dialog :title="classTitle" :visible.sync="dialogFormVisibleOverTime" :close-on-click-modal="no" top='14%'  @close='clearNoSignStill'>

                <div class="SLctcover">
                    <div class="SLctcover1">
                        <div>学生姓名</div>
                        <div>消耗课时</div>
                        <div>剩余课时</div>
                        <div>签到情况</div>
                    </div>
                    <div class="SLctcover2" v-for='(s,index) in sData' v-if='sData.length!=0'>
                        <div style='flex:0 0 56px;text-align: center;'>{{s.child_name}}</div>
                        <div style='flex:0 0 56px;text-align: center;'>{{s.class_hour}}</div>
                        <div style='flex:0 0 56px;text-align: center;'>{{s.course_curr_num}}</div>
                        <div :style="s.checkin_types_name=='出勤'?'color:#13ce66;flex:0 0 56px;text-align: center;':s.checkin_types_name=='请假'?'color:#dba31c;flex:0 0 56px;text-align: center;':s.checkin_types_name=='旷课'?'color:#ff4949;flex:0 0 56px;text-align: center;':'color:#c1c2c2;flex:0 0 56px;text-align: center;'">{{s.checkin_types_name}}</div>
                    </div>
                    <div v-if='sData.length==0' class="SLctcover3">暂无学生</div>
                </div>
                <div class="SLctcover4" v-if='sData.length!=0'>
                        <div class="SLctcover5">出勤:{{counts.work||0}}人, {{counts.work_hour||0}}课时</div>
                        <div class="SLctcover7">请假:{{counts.vacation||0}}人, 0课时</div>
                        <div class="SLctcover6">旷课:{{counts.absent||0}}人, {{counts.absent||0}}课时</div>
                        <div class="SLctcover8">共计消耗:{{counts.total_class_hour||0}}课时</div>
                    </div>
            </el-dialog>
    </div>
</template>
<script>
    var token, user
    import {
        getTeacherList,
        campusList,
        getSignList,
        checkListInfo
    } from '../../api/api';
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
                // backA:{},
                // aid:'',
                sData:[],
                classTitle:'',
                dialogFormVisibleOverTime:false,
                no:false,
                signData:[],
                loading2: true,
                currentPage: 1, //页数
                pagesize: 15, //默认每页
                total: 0,
                number: '0',
                no: false,
                teacherList: [], //表单上方的select
                value1: '',
                valueR:'',
                code: '',
                optionR:[],
                counts:{},
            }
        },
        methods: {
            clearNoSignStill(){
                this.sData = [];
                    this.counts = {};
            },
            openD(data){
                this.classTitle = data.course_time +' '+data.week +' '+data.courseName;
                let para={
                    checkin_id :data.checkin_id
                }
                checkListInfo(para,token).then(res=>{
                    this.sData = res.data.student;
                    this.counts = res.data.counts
                })
                this.dialogFormVisibleOverTime = true;
            },
            updateListCC() {
                this.currentPage = 1;
                if(this.valueR!=''){
                   let para = {
                    school_id: this.valueR
                }
                    getTeacherList(token,para).then((res) => {//获取老师
                    this.teacherList = res.data;
                    this.teacherList.unshift({
                            aid: 0,
                            uname: '全部老师'
                        })
                }).then(()=>{
                    if( this.value1===0){
                    this.fetchData()
                    }else{
                        this.value1=0
                    }
                })
                }else{
                    if( this.value1 ===0){
                        this.fetchData();
                    }
                    this.teacherList=[{
                            aid: 0,
                            uname: '全部老师'
                        }]
                        this.value1 = 0;
                    // this.value1 =0;
                }
            },
            updateList() {//select更新数据
                this.currentPage = 1;
                // this.input2 = '';
                this.fetchData();
            },
            fetchData() {
                let para = {
                    page: this.currentPage,
                    school_id:this.valueR,
                    teach_id: this.value1, //老师
                }
                this.loading2 = true;                
                getSignList(para,token).then((res) => { //替换服务
                    // this.number = res.data.total;
                    let a = res.data.data;
                    let c = res.data.last_page * this.pagesize;
                    // console.log(a)
                    this.signData = a;
                    this.total = parseInt(c);
                }).then(() => {
                    this.loading2 = false;
                }).catch(() => {
                    // this.$message.error('该用户未授权');
                    this.loading2 = false
                })
            },
            handleCurrentChange: function (val) {
                this.currentPage = val;this.backToTop();
                this.fetchData();
            }
        },
        beforeCreate() {
            user = sessionStorage.getItem('user');
            token = JSON.parse(user).token;
        },
        created() {
            this.code = JSON.parse(user).job ? JSON.parse(user).job.code : '';
          
                if(this.code=='teach'){

                this.fetchData();
            }else if(this.code=='teach_m'){
                    getTeacherList(token).then((res) => { //获取老师
                    this.teacherList = res.data;
                    this.value1 = JSON.parse(user).aid
                    this.teacherList.unshift({
                            aid:0,
                            uname: '全部老师'
                        })
                })
                }else if(this.code.includes('_c')){
                    let cam = {
                simple: 1
            }
            campusList(cam, token).then((res) => {//获取校区,筛选用,停课用
                this.optionR = [...res.data];
                this.optionR.unshift({
                            id: 0,
                            title: '全部校区'
                        })
                this.valueR = 0
            
            })
                }else{
                        this.fetchData();                        
                }
            

        },
        computed: {
        //     ...mapGetters([
        //     'getmyTeachS'
        //     // ...
        // ])
            // scrollTop(){
            //     let a = document.getElementsByClassName('content')[0].scrollTop;
            //     return a ;
            // },
            // remedialTitle() {
            //     if (this.remedialT == 1) {
            //         return '待补课班级'
            //     } else {
            //         return '待提前上课班级'
            //     }
            // },
            // remedialTitleSecond() {
            //     if (this.remedialT == 1) {
            //         return '补课班级'
            //     } else {
            //         return '提前上课班级'
            //     }
            // }
        }
        // mounted() {
        // },
        // watch: {
        //     // 如果路由有变化，会再次执行该方法
        //     // '$route' : 'fetchData'
        // }
    }

</script>
<style>

    .block {
        text-align: center;
        margin-top: 10px;
    }

    .SLctcover10 {
        width: 100%;
        position: relative;
        height: auto;
        display: flex;
        flex-wrap: wrap;
        justify-content: flex-start;
        background-color: white;
        /* margin-top: 30px; */
        padding-top: 10px;
        margin-bottom: 5px;
        border-radius: 5px;
    }

    .SLctcover11 {
        display: inline-block;
        margin-top: 5px;
        margin-bottom: 15px;
        padding-left: 10px;
        /*
            margin-right:70%;*/
    }
    .signList .el-dialog .el-dialog__header {
        background-color: #1fb5ad;
        padding: 20px 20px 20px;
    }

    .signList .el-dialog .el-dialog__title {
        color: white;
    }
    .SLctcover9 {
        display: inline-block;
        width: 103px;
        margin-right: 5px;
        margin-bottom: 10px;
        margin-left: 10px;
    }
    .canGo{
        color: #1fb5ad
    }
    .canGo:hover{
        cursor: pointer
    }
    .SLctcover {
        max-height: 500px;
        overflow-y: auto;
        background: white
    }

    .SLctcover1 {
        display: flex;
        justify-content: space-between;
        padding: 10px 0;
        margin-left: 17%;
        margin-right: 17%;
        font-weight: 600
    }

    .SLctcover2 {
        display: flex;
        justify-content: space-between;
        padding: 10px 0;
        /* margin-left: 20%;
        margin-right: 20% */
        /* width: 244px; */
    /* margin: 0 auto; */
    margin-left: 17%;
    margin-right: 17%;
    }

    .SLctcover3 {
        text-align: center;
        padding: 10px 0;
    }
    .SLctcover4 {
        display: flex;
        justify-content: space-between;
        background: white;
        margin: 0 auto;
        padding-left:17%;
        padding-right:17%;
        line-height: 50px
    }

    .SLctcover5 {
        flex:1;
        text-align: left;
        color: #13ce66
    }

    .SLctcover6 {
        flex:1;
        text-align: center;
        color: #ff4949;
        padding-left: 30px;
        
    }
    .SLctcover7 {
        color: #f7ba2a;
        flex:1;
        text-align: center;
    }
    .SLctcover8 {
        flex:1;
        text-align: right;
    }
</style>
