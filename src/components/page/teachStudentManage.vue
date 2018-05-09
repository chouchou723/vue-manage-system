<template>
    <div>
        <!-- <div class='bigs' v-if='isDisplay=="1"' @click='closebig'></div> -->
        <!-- <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-my-kaoqinliuchengtongji"></i> 学员管理</el-breadcrumb-item>
            </el-breadcrumb>
        </div> -->
        <div class='teachSM'>
            <div>
                <!-- <el-checkbox v-model="checked" style='margin-left:5px' @click.native='allCheck(customerData)'></el-checkbox> -->
                <h3 class="myTeachReturn">
                    学员管理
                    <span v-if="number==='0'" style="font-size:14px;color: #bdb8b8;">加载中...</span>
               <span v-else>({{number}}人)</span>
                </h3>
               
            </div>
            <div style="display:flex;flex-wrap:wrap">
                    <div class='studentReturnThreeNewTSM' v-if="code.includes('_c')">
                            <el-select v-model="valueR"  placeholder="选择校区" @change="updateListCC">
                                <el-option v-for="item in optionR" :key="item.id" :label="item.title" :value="item.id">
                                </el-option>
                            </el-select>
                        </div>
                <div class='studentReturnThreeNewTSM' v-if="code.includes('_c_c')||code.includes('_cr_c')||code.includes('_m')">
                        <el-select v-model="value1"  placeholder="选择老师" @change="updateList">
                                <el-option v-for="item in teacherList" :key="item.aid" :label="item.uname" :value="item.aid">
                                </el-option>
                            </el-select>
                </div>

                <div class='studentReturnThreeNewTSM'>
                        <el-select v-model="value2" clearable filterable placeholder="课程名称" @change="updateList">
                                <el-option v-for="item in classkind" :key="item.kcid" :label="item.title" :value="item.kcid">
                                </el-option>
                            </el-select>
                </div>
                <div class='studentReturnThreeNewTSM'>
                    <el-select v-model="value3" clearable placeholder="剩余课时" @change="updateList">
                        <el-option label="6节以下" value="1"></el-option>
                        <el-option label="6节至12节" value="2"></el-option>
                        <el-option label="12节至24节" value="3"></el-option>
                        <el-option label="24节以上" value="4"></el-option>
                    </el-select>
                </div>
                <div class='studentReturnThreeNewTSM'>
                    <el-select v-model="value4" clearable placeholder="使用状态" @change="updateList">
                        <el-option label="正常" value="1"></el-option>
                        <el-option label="冻结" value="2"></el-option>
                        <el-option label="过期" value="3"></el-option>
                        <el-option label="已结束" value="4"></el-option>
                    </el-select>
                </div>
                <div class='studentReturnThreeNewTSM'>
                        <el-select v-model="value5" clearable placeholder="生日月份" @change="updateList">
                                <el-option label="1月" value="01"></el-option>
                                <el-option label="2月" value="02"></el-option>
                                <el-option label="3月" value="03"></el-option>
                                <el-option label="4月" value="04"></el-option>
                                <el-option label="5月" value="05"></el-option>
                                <el-option label="6月" value="06"></el-option>
                                <el-option label="7月" value="07"></el-option>
                                <el-option label="8月" value="08"></el-option>
                                <el-option label="9月" value="09"></el-option>
                                <el-option label="10月" value="10"></el-option>
                                <el-option label="11月" value="11"></el-option>
                                <el-option label="12月" value="12"></el-option>
                            </el-select>
                </div>
                <div style="width:200px;position:absolute;right:10px;bottom:10px">
                        <el-input placeholder="输入手机号或姓名" icon="search" v-model="input2" @keyup.enter.native="updateListI" :on-icon-click="updateListI"
                            style='margin-right:10px'> </el-input>
                    </div>
            </div> 
        </div>
        <div id="tableTSM" v-loading="loading2">
            <div v-for="(item,index) in customerData" class='customerDataDiv'>
                <div class='TeachcustomerDiv'>
                    <div style="display:flex">
                        <div @click='gotoDetail(item)' class='myStudentsSpan'>
                            <img :src="item.head_img" width='38' height='38' alt="" style='border-radius:50%;border: 1px solid gainsboro;'>
                            <div style="color:#1fb5ad;font-size:18px;margin-left:10px">{{item.child_name}}</div>
                        </div>
                    </div>
                    <div style="margin-right:10px;color:grey">
                        <span style="padding-right:15px;border-right:1px solid grey">

                        微信绑定: <span style="color:#18c318" v-if='item.weixin'>已绑定</span>
                        <span v-else>未绑定</span>
                        </span>
                        <span style="padding-left:15px">
                        出生日期: {{item.birthday}}
                            </span>
                    </div>
                </div>
                <div style='display:flex;justify-content:space-between;'>
                    <el-table :data="item.order_item" border style="width: 100%;">
                        <el-table-column prop="title" label="课程">
                        </el-table-column>
                        <el-table-column prop="year_num" label="课时" width='67'>
                        </el-table-column>
                        <el-table-column prop="course_curr_num" label="剩余课时" width='67'>
                        </el-table-column>
                        <el-table-column prop="attend" label="上课时间">
                        </el-table-column>
                        <el-table-column prop="status" label="使用状态" column-key='status' width='67'>
                            <template scope="scope">
                                <span :style="scope.row.status=='正常'? 'color:black' : scope.row.status=='未排班'?'color:#dba31c':scope.row.status=='冻结'?'color:#50bfff':'color:#e21a59'">{{scope.row.status}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column label="36次课耗相框发放" width='163'>
                            <template scope="scope">
                                <el-button v-if='scope.row.photo_frame =="ing"' type="text" size="small" @click="claim('frame',scope.row)" style='color:white;background:#1fb5ad;padding:8px 30px'>可发</el-button>
                                <span v-else-if='scope.row.photo_frame ==="0"' style='color:white;background:#afafaf;padding:8px 20px;border-radius:7px'>未达标</span>
                                <span v-else-if='scope.row.photo_frame =="ed"'  style="color:#a7a5a5">已发放</span>
                                <span v-else-if='scope.row.photo_frame ===""'  style="color:#a7a5a5">无</span>
                                <!--   <el-button type="text" size="small" @click="open2(scope.$index, accountData)">删除</el-button> -->
                            </template>
                        </el-table-column>
                        <el-table-column label="8次课耗奖励发放" width='163'>
                            <template scope="scope">
                                    <el-button v-if='scope.row.award>0' type="text" size="small" @click="claim('award',scope.row)" style='color:white;background:#1fb5ad;padding:8px 30px'>可发 {{scope.row.award}}</el-button>
                                    <span v-else-if='scope.row.award ==="0"' style='color:white;background:#afafaf;padding:8px 20px;border-radius:7px'>未达标</span>
                                    <span v-else-if='scope.row.award =="ed"'  style="color:#a7a5a5">已发放</span>
                                    <span v-else-if='scope.row.award ===""'  style="color:#a7a5a5">无</span>
                                <!-- <el-button type="text" size="small" @click="claim(scope.$index, customerData)" style='color:white;background:#1fb5ad;padding:8px 30px'>发放</el-button> -->
                                <!--   <el-button type="text" size="small" @click="open2(scope.$index, accountData)">删除</el-button> -->
                            </template>
                        </el-table-column>
                    </el-table>
                </div>
            </div>
            <div v-if="customerData.length==0">
                    <el-table :show-header='no'>
                    </el-table>
                </div>
        </div>
        
        <div class="block">
            <el-pagination layout="prev, pager, next" :total="total" :current-page="currentPage" :page-size="pagesize" @current-change="handleCurrentChange">
            </el-pagination>
        </div>
    </div>
</template>
<script>
    var token, user
    import {
        getClassLibrary,
        getTeachStudentList,
        getDetailClassTable,
        putStudentMakeup,
        sendPresent,
        getTeacherList,
        campusList
    } from '../../api/api';
    import {
    mapActions,mapGetters
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
                // backA:{},
                // aid:'',
                resourceData: [],
                loading2: true,
                currentPage: 1, //页数
                pagesize: 15, //默认每页
                total: 0,
                number: '0',
                no: false,
                customerData: [],
                classkind: [],
                teacherList: [], //表单上方的select
                value1: '',
                value2: '',
                value3: '',
                value4: '', //对应select的值
                value5: '', //状态
                value6: '',
                valueR:'',
                // value7: '', //
                input2: '',
                code: '',
                remedialT: '',
                // v: [],
                optionR:[],
                multipleSelection: []
            }
        },
        methods: {
            ...mapActions([
                'setmyTeachS'
            ]),
            claim(kind,data) {
                this.$confirm('是否确定发放?', '发放', {
                    title: '发放',
                    customClass: 'green',
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    // type: 'warning'
                }).then(() => {
                    let para = {
                        type:kind,
                        order_item_id:data.order_item_id
                    }
                    // console.log(para)
                    sendPresent(para,token).then(res=>{
                        if(res.code==0){
                            this.$message.success('发放成功');
                            this.fetchData();
                        }else{
                            this.$message.error(res.data)
                        }
                    })
                }).catch(() => {
                    // console.log('cancel')
                })
            },
            updateListCC() {
                this.currentPage = 1;
                // this.value1 = '';
                // this.optionR = [{aid:0,uname:'全部校区'}];
                if(this.valueR!=''){
                // console.log('aa')

                   let para = {
                    school_id: this.valueR
                }
                    getTeacherList(token,para).then((res) => {//获取老师
                    this.teacherList = res.data;
                    this.teacherList.unshift({
                            aid: 0,
                            uname: '全部老师'
                        })
                    // this.value1 = 0;
                }).then(()=>{
                    if( this.value1===0){
                    this.fetchData()
                    }else{
                        this.value1=0
                    }

                // this.fetchData();
                    
                })
                }else{
                    // console.log(1)
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
            updateListI() {//input搜索
                // this.value6 = '';
                // this.value7 = '';
                this.currentPage = 1;
                this.fetchData();
                
            },
            gotoDetail(row) {
                let d = {
                    page: this.currentPage,
                    school_id:this.valueR,
                    teach_id: this.value1, //老师
                    kcid: this.value2, //课程
                    course_curr_num: this.value3, //剩余课时
                    status: this.value4, //使用状态
                    birth_month: this.value5, //生日
                    teacherList:this.teacherList,
                    optionR:this.optionR,
                    // syllabus_id: this.value7, //具体班级
                }
                this.setmyTeachS(d)
                this.$router.push('/teachstudentDetail/' + row.uid);
            },
            fetchData() {
                if(Object.keys(this.getmyTeachS).length!=0){
                    this.valueR = this.getmyTeachS.school_id;
                    this.currentPage =  this.getmyTeachS.page;
                    this.value1 =  this.getmyTeachS.teach_id-0;
                    this.value2 =  this.getmyTeachS.kcid;
                    this.value3 =  this.getmyTeachS.course_curr_num;
                    this.value4 =  this.getmyTeachS.status;
                    this.value5 = this.getmyTeachS.birth_month;
                    this.teacherList = this.getmyTeachS.teacherList;
                    this.optionR = this.getmyTeachS.optionR;
                    // this.value7 =  this.getmyTeachS.syllabus_id;
                }
                let para = {
                    page: this.currentPage,
                    school_id:this.valueR,
                    teach_id: this.value1, //老师
                    kcid: this.value2, //课程
                    course_curr_num: this.value3, //剩余课时
                    status: this.value4, //使用状态
                    birth_month: this.value5, //生日
                    // syllabus_id: this.value7, //具体班级
                    input: this.input2
                }
                getTeachStudentList(token, para).then((res) => { //替换服务
                    this.number = res.data.total;
                    let a = res.data.data;
                    let c = res.data.last_page * this.pagesize;
                    // console.log(a)
                    this.customerData = a;
                    this.total = parseInt(c);
                }).then(() => {
                    this.loading2 = false;
                    this.setmyTeachS({})
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
            // this.aid = JSON.parse(user)? JSON.parse(user).aid : '';
            // if(this.code=='teach'){

            //     this.fetchData();
            // }
            if(Object.keys(this.getmyTeachS).length == 0){
                if(this.code=='teach'){

                this.fetchData();
            }else if(this.code=='teach_m'){
                    getTeacherList(token).then((res) => { //获取老师
                    this.teacherList = res.data;
                    this.value1 = JSON.parse(user).aid-0
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
                        this.fetchData(); 
                    })
                }else{
 this.fetchData();                    
                }
            }else{
 this.fetchData();
            }
                let si = {
                        simple: 1,
                    }
                    getClassLibrary(token, si).then((res) => { //获取课程分类
                        this.classkind = res.data
                    })

        },
        computed: {
            ...mapGetters([
            'getmyTeachS'
            // ...
        ])
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
    /* .selctionWindow {
        width: 750px;
        border: 1px solid gainsboro;
        position: fixed;
        top: 179px;
        left: 367px;
        z-index: 1000;
        background: white;
        border-radius: 5px;
        min-height: 320px;
        transition: opacity 0.5s ease-in-out;
    } */

    /* #tableTSM {
        position: relative;
    }

    #tableTSM .el-table td,
    #tableTSM .el-table th:not(.gutter) {
        padding: 5px 5px;
        text-align: center
    }

    #tableTSM .el-table th>div,
    #tableTSM .el-table .cell {
        padding-left: 0;
        padding-right: 0;
        font-weight: normal;
    } */
    #tableTSM .el-table th>div,
    #tableTSM .el-table .cell {
        font-weight: normal;
    }
    /* #tableTSMre .el-table td,
    #tableTSMre .el-table th {
        padding: 5px 5px;
        text-align: center
    }

    #tableTSMre .el-table th>div,
    #tableTSMre .el-table .cell {
        padding-left: 0;
        padding-right: 0;
    } */
/* 
    #tableTSMS .el-table td,
    #tableTSMS .el-table th {
        padding: 5px 5px;
        text-align: center
    }

    #tableTSMS .el-table th>div,
    #tableTSMS .el-table .cell {
        padding-left: 0;
        padding-right: 0;
    } */

    .block {
        text-align: center;
        margin-top: 10px;
    }

    .teachSM {
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

    .myTeachReturn {
        display: inline-block;
        margin-top: 5px;
        margin-bottom: 15px;
        padding-left: 10px;
        /*
            margin-right:70%;*/
    }

    /* .studentSeletcThreeNewFL {
        width: 163px;
        margin-bottom: 10px;
        margin-left: 15px;
        float: left;
    } */

    /* .studentSeletcThreeNewFR {
        width: 163px;
        margin-bottom: 10px;
        margin-left: 15px;
        float: right;
    } */

    /* .studentSeletcThreeNewClass {
        width: 163px;
        margin-bottom: 10px;
        margin-left: 15px;
        float: right;
        margin-right: 185px
    } */

    /* .studentSeletcThreeNewSy {
        margin-bottom: 10px;
        margin-left: 15px;
        max-height: 200px;
        height: auto;
        overflow: auto;
        float: right;
        width: 350px;
    } */

    /* .studentSeletcThreeNewSy::-webkit-scrollbar {
        display: none
    } */

    /* .studentSeletcThreeNewFL .el-date-editor.el-input {
        width: 163px;
    } */

    /* .studentSeletcThreeNewSy .el-radio+.el-radio {
        margin-left: 0
    } */
    
    .studentReturnThreeNewTSM {
        display: inline-block;
        width: 103px;
        margin-right: 5px;
        margin-bottom: 10px;
        margin-left: 10px;
    }
    /* .mystudentSelect {
        display: inline-block;
        margin-left: 10px
    } */
    /* .mystudentSelect .el-date-editor.el-input {
        width: 103px;
    } */

    /*
        .remainClass .el-input__inner:hover {
            cursor: pointer;
        }
        .displaynone{
            display: none;
        }*/

    .myStudentsSpan {
        display: flex;
        align-items: center;
        margin-left: 10px;
    }

    .myStudentsSpan:hover {
        cursor: pointer;
    }


    .customerDataDiv {
        /* background: white; */
        margin-bottom: 10px;
    }

    .TeachcustomerDiv {
        display: flex;
        justify-content: space-between;
        height: 42px;
        line-height: 42px;
        border: 1px solid rgb(223, 236, 235);
        border-bottom: none;
        background: #fafafa;
        border-top-left-radius: 5px;
        border-top-right-radius: 5px;        
    }

    /* .tableReturn {
        height: 40px;
        line-height: 40px;
        display: flex;
        justify-content: space-around;
        border: 1px solid rgb(223, 236, 235);
        border-left: none;
        font-size: 14px;
    } */

    /* .tableReturnDiv140 {
        flex: 0 0 140px;
        border-right: 1px solid rgb(223, 236, 235);
    } */

    /* .tableReturnDiv2 {
        text-align: center;
        background: rgb(238, 246, 246);
        color: rgb(31, 61, 60);
        font-weight: bold;
    } */

    /* .tableReturnDiv2Auto {
        flex: auto;
    } */

    /* .tableItem {
        display: flex;
        justify-content: space-around;
        flex: auto;
        align-items: stretch;
        border-right: 1px solid rgb(223, 236, 235);
        border-bottom: 1px solid rgb(223, 236, 235);
    } */

    /* .tableItemLast {
        border-right: 1px solid rgb(223, 236, 235);
        flex: 0 0 140px;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 14px;
    } */

    /* .tableItemTag {
        flex: auto;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-wrap: wrap;
        min-height: 56px;
        height: auto;
    } */

    .green .el-message-box__header {
        background-color: #1fb5ad;
        padding: 20px 20px 20px;
    }

    .green .el-message-box__title {
        color: white;
    }

    /* .selectClass .el-radio+.el-radio {
        margin-left: 0;
    } */

    /* .teachSelTitle {
        font-size: 14px;
        width: 60px;
        display: inline-block
    } */

    /* .selectClass::-webkit-scrollbar {
        display: none
    } */
/* .bigs{
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    opacity: .5;
    background: #000;
    z-index: 999;
} */
</style>
