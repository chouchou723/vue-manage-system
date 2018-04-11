<template>
    <div class="tableUserD">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="icon-tongzhi iconfont"></i> 活动管理</el-breadcrumb-item>
                <el-breadcrumb-item :to="{ path: '/api/v1/Travel/activityList'}">已发起活动</el-breadcrumb-item>
                <el-breadcrumb-item class='ss'>{{this.$route.params.type!=='生日会'?activity.names:activityB.names}}</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div style="float:left;width:49.5%;background-color:white;height:auto;border-radius:5px;margin-right:1%;position:relative"
            v-if="this.$route.params.type!=='生日会'">
            <div class='aDetailTitle'>
                <!--  <i class=el-icon-my-tongxunlu style="font-size:31px"></i> -->
                <span style="font-weight:600;font-size:22px">活动详情</span>
            </div>
            <el-form id='aform' label-width="102px" label-position='left' style='padding-left:10px;'>
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
                <el-form-item label="举办校区:" prop='age'>
                    <span>{{activity.schoolName}}</span>
                </el-form-item>
                <el-form-item label="负责老师:" prop='age'>
                    <span>{{activity.teacherName}}</span>
                </el-form-item>
                <el-form-item label="报名截至时间:" prop='sign_time'>
                    <span>{{activity.sign_time}}</span>
                </el-form-item>
                <el-form-item label="活动起止时间:" prop='start_time'>
                    <span>{{activity.start_time}} - {{activity.end_time}}</span>
                </el-form-item>
                <el-form-item label="活动地点:" prop='age'>
                    <span>{{activity.address}}</span>
                </el-form-item>
                <el-form-item label="活动介绍:" prop='content'>
                    <div v-html="activity.content" class='actImg ql-editor'></div>
                </el-form-item>
                <el-form-item label="创建时间:" prop='created'>
                    <span>{{activity.created}}</span>
                </el-form-item>
                <div style="position: absolute;top: 32px;right: 2px;width: 300px;text-align: center;">
                    <div style="position: absolute;top: 20px;width: 100%;font-size: 14px;color: rgb(72, 106, 106);"> 封面图片</div>
                    <img :src="activity.images" alt="" width='178' height="134" style="margin-top:40px">
                </div>
            </el-form>
        </div>
        <div style="float:left;width:49.5%;background-color:white;height:auto;border-radius:5px;margin-right:1%;position:relative"
            v-if="this.$route.params.type=='生日会'">
            <div class='aDetailTitle'>
                <!--  <i class=el-icon-my-tongxunlu style="font-size:31px"></i> -->
                <span style="font-weight:600;font-size:22px">活动详情</span>
            </div>
            <el-form id='bform' label-width="102px" label-position='left' style='padding-left:10px;' element-loading-text="提交中">
                <el-form-item label="生日会主题:" prop='names'>
                    <span>{{activityB.names}}</span>
                </el-form-item>
                <el-form-item label="生日月份:" prop='age'>
                    <span>{{activityB.age}}</span>
                </el-form-item>
                <el-form-item label="举办校区:" prop='school_name'>
                    <span>{{activityB.schoolName}}</span>
                </el-form-item>
                <el-form-item label="负责老师:" prop='teacherName'>
                    <span>{{activityB.teacherName}}</span>
                </el-form-item>
                <el-form-item label="报名截至时间:" prop='sign_time'>
                    <span>{{activityB.sign_time}}</span>
                </el-form-item>
                <el-form-item label="活动起止时间:" prop='start_time'>
                    <span>{{activityB.start_time}} - {{activityB.end_time}}</span>
                </el-form-item>
                <el-form-item label="活动地点:" prop='address'>
                    <span>{{activityB.address}}</span>
                </el-form-item>
                <el-form-item label="活动介绍:" prop='content'>
                    <div v-html="activityB.content" class='actImg ql-editor'></div>
                </el-form-item>
                <el-form-item label="创建时间:" prop='created'>
                    <span>{{activityB.created}}</span>
                </el-form-item>
                <div style="position: absolute;top: 32px;right: 2px;width: 300px;text-align: center;">
                    <div style="position: absolute;top: 20px;width: 100%;font-size: 14px;color: rgb(72, 106, 106);"> 封面图片</div>
                    <img :src="activityB.images" alt="" width='178' height="134" style="margin-top:40px">
                </div>
            </el-form>
        </div>

        <div style="float:left;width:49.5%;background-color:white;border-radius:5px;min-height:676px;height:auto;position:relative">
            <div class='aTitle'>
                <!--  <i class=el-icon-my-tongxunlu style="font-size:31px"></i> -->
                <span style="font-weight:600;font-size:22px">报名列表({{number}})</span>
                <el-button type="info" size="mid"  @click="createCh" v-if="number!=0" style="float:right;margin-right:5px">导出</el-button>
            </div>
            <div id="tableact">
                <el-table :data="noActData" style="width: 95%;margin:0 auto" >
                    <el-table-column prop="child_name" label="姓名">
                        <template scope="scope">
                            <span>{{scope.row.child_name}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="mobile" label="电话">
                    </el-table-column>
                    <el-table-column prop="created" label="报名时间">
                    </el-table-column>
                </el-table>
            </div>
            <div class="block" v-if="this.total!=''">
                <el-pagination layout="prev, pager, next" :total="total" :current-page="currentPage" :page-size="pagesize" @current-change="handleCurrentChange">
                </el-pagination>
            </div>
        </div>
    </div>
</template>
<script>
    var token, user
    import {
        getActivityOrderList,
        getBirthdayInfo,
        userReport
    } from '../../api/api';
    import 'quill/dist/quill.core.css'
// import 'quill/dist/quill.snow.css'
// import 'quill/dist/quill.bubble.css'
    export default {
        data() {
            return {
                noActData: [],
                loading: false,
                activity: {},
                activityB: {},
                number: '0',
                currentPage: 1, //页数
                pagesize: 15, //默认每页
                total: 0,

            }
        },
        methods: {
            createCh(){
                let para = {
                    pid:this.$route.params.id
                }
                userReport(para,token).then(res=>{
                    //   let a = 'http://pandatest.dfth.com/download/stream?name=';
                     let a = '/download/stream?name=';
                        window.open( a+res.data.name)
                })
            },
            handleCurrentChange: function (val) { //变更页数
                this.currentPage = val;this.backToTop();
                let p = {
                    page: this.currentPage,
                    pid: this.$route.params.id,
                }
                getActivityOrderList(token, p).then(res => {
                    this.noActData = res.data.data;
                    this.number = res.data.total;
                    let c = res.data.last_page * this.pagesize;
                    this.total = parseInt(c);
                })
            },

        },
        beforeCreate() {
            user = sessionStorage.getItem('user');
            token = JSON.parse(user).token;
        },
        created() {
            let para = {
                id: this.$route.params.id
            }
            let p = {
                pid: this.$route.params.id,
                page: this.currentPage
            }
            getBirthdayInfo(token, para).then(res => {
                // console.log(res)
                if (this.$route.params.type == '亲子俱乐部') {

                    this.activity = res.data
                    this.dialogFormVisibleShow = true;
                } else {
                    this.activityB = res.data
                    this.dialogFormVisibleShowB = true;
                }
            })

            getActivityOrderList(token, p).then(res => {
                this.noActData = res.data.data;
                this.number = res.data.total;
                let c = res.data.last_page * this.pagesize;
                this.total = parseInt(c);
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
    .aDetailTitle {
        position: relative;
        padding: 10px 10px 10px 10px;
    }

    .aTitle {
        position: relative;
        padding: 10px 10px 10px 10px;
        /* border-bottom: 1px solid #e8e8e8; */
    }

    #aform .el-form-item {
        margin-bottom: 18px
    }

    #aform .el-form-item__label {
        padding: 8px 12px 5px 0;
    }

    #aform .el-form-item__content {
        line-height: 30px
    }


    .tableUserD .block {
        text-align: center;
        position: absolute;
        bottom: 10px;
        width: 100%;
    }


    #tableact .el-table td,
    #tableact .el-table th:not(.gutter) {
        padding: 1px;
        text-align: center
    }

    #tableact .el-table th>div,
    #tableact .el-table .cell {
        padding-left: 0;
        padding-right: 0;
    }

    .actImg img {
        width: auto;
        max-width: 100%;
    }

</style>
