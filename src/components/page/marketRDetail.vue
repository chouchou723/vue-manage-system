<template>
    <div class="MRdetailTitle1">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="icon-chengyuanguanli iconfont"></i> 市场管理</el-breadcrumb-item>
                <el-breadcrumb-item to="/resourceManage">资源管理</el-breadcrumb-item>
                <el-breadcrumb-item class='ss'>{{student.name}}</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="MRdetail22">
            <div  class="MRdetail2">
                <div class='MRdetailTitle2'>
                    <i class="iconfont icon-tongxunlu1 fz25"></i>
                    <!--  <i class=el-icon-my-tongxunlu style="font-size:31px"></i> -->
                    <span  class="MRdetail4">用户资料</span>
                </div>
                <el-form id='MRdetailTitle4' label-width="102px" label-position='left'  class="MRdetail7">
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
                        <span style='width:120px;float:left'>{{student.parent}}</span>
                        <el-col :span="11">
                            <span>{{student.parent_phone}}</span>
                        </el-col>
                    </el-form-item>
                    <el-form-item label="第二家长" >
                        <span style='width:120px;float:left'>{{student.parent1}}</span>
                        <el-col :span="11">
                            <span>{{student.parent1_phone}}</span>
                        </el-col>
                    </el-form-item>
                    <el-form-item label="渠道来源:" prop='channel'>
                        <span>{{student.channel}}</span>
                        <div v-if='student.channel=="Ref(转介绍)"'>介绍人:{{student.referral_name||' 无 '}} 老师:{{student.teach_name||' 无 '}}</div>
                    </el-form-item>
                    <el-form-item label="所在地区:" prop='fullAddress'>
                        <span>{{student.fullAddress}}</span>
                    </el-form-item>
                    <el-form-item label="校区:" prop='school'>
                        <span>{{student.school}}</span>
                    </el-form-item>
                    <el-form-item label="录入时间:" prop='time'>
                        <span>{{student.time}}</span>
                    </el-form-item>
                    <el-form-item label="CC:" prop='teacher' >
                        <span>{{student.teacher}}</span>
                    </el-form-item>
                    <el-form-item label="TMK:" prop='tmk' >
                        <span>{{student.tmk}}</span>
                    </el-form-item>
                </el-form>
            </div>
            <!-- 沟通记录 -->
            <div  class="MRdetail3">
                <div class='MRdetailTitle3'>
                     <i class='iconfont icon-xueyuangoutongguanli fz30' ></i>
                    <span  class="MRdetail4">沟通记录({{number}})</span>
                </div>
                <div  class="MRdetail9">
                    <el-row v-for='item in items' class='listUser' style='position:relative;min-height:75px'>
                        <el-col :span="4" style='text-align:right'>
                            <img :src="item.add_call_user.avatar" width='50' height='50' alt=""  class="MRdetail10">
                        </el-col>
                        <el-col :span="20">
                            <div style="height:30px">
                                <div style='margin-top:15px;float:left'>{{item.add_call_user.uname}}</div>
                                <div  class="MRdetail11">{{item.create_at.substring(5,16)}}</div>
                            </div>
                            <div>
                                <div  class="MRdetail12">{{item.remark}}</div>
                            </div>
                            <div>
                                <div class="MRdetailTitle7">
                                    <el-tag type='success' v-for='t in item.tags'>{{t}}</el-tag>
                                </div>
                            </div>
                            <div>
                                <div  class="MRdetail13" v-if="item.remind_time">下次跟进时间:{{item.remind_time}}</div>
                            </div>
                        </el-col>
                    </el-row>
                </div>
                <div class="block" v-if="this.total!=''">
                    <el-pagination layout="prev, pager, next" :total="total" :current-page="currentPage" :page-size="pagesize" @current-change="handleCurrentChange">
                    </el-pagination>
                </div>
            </div>
            <!-- 邀约记录 -->
            <div  class="MRdetail14">
                <div class='inviteTitle'>
                     <i class="iconfont icon-5 fz30"></i>
                    <span style="font-weight:600;font-size:22px;">邀约记录({{number1}})</span>
                </div>
                <div style="min-height:298px;padding-bottom:30px;">
                    <el-row v-for='item in items1' class='listUser' style='position:relative;margin-left:30px;'>
                        <div style="font-weight:600;margin-right:5px">邀约日期: {{item.alert_time.substring(0,16)}}</div>
                        <div class='MRdetailTitle6'>邀约课程:
                            <span style="color:grey">{{item.course_name.title}}</span>
                        </div>
                        <div class='MRdetailTitle6'>上课老师:
                            <span style="color:grey">{{item.teach_name?item.teach_name.uname:''}}</span>
                        </div>
                        <div class='MRdetailTitle6'>记录时间:
                            <span style="color:grey">{{item.created.substring(0,16)}}</span>
                        </div>
                        <div class='MRdetailTitle6'>到访设置:
                            <span :style="{color:item.fla == '已到访'?'blue':'grey'}">{{item.fla}}</span>
                        </div>
                    </el-row>
                </div>
                <div class="block" v-if="this.total1!=''">
                    <el-pagination layout="prev, pager, next" :total="total1" :current-page="currentPage1" :page-size="pagesize1" @current-change="handleCurrentChange1">
                    </el-pagination>
                </div>
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
        getCommuList,
        getTMK,
        sourceList,
        repeatStudentList,
        getUserInviteList,
        TMKput_customer,
        searchResource,
        mksourceInfoe
    } from '../../api/api';
    export default {
        data() {
            return {
                writeL:false,
                maxlength:11,
                pickerOptions0: {
                    disabledDate(time) {
                        return time.getTime() < Date.now() - 8.64e7;
                    }
                },
                // isread:false,
                nostudent: false,
                warning: '*请选择转介绍学员',
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
                    fullAddress: '',
                    school: '',
                    time: '',
                    teacher: ''
                },
                propsource: {
                    value: 'id',
                    label: 'names',
                    children: '_child'
                },
                items: [],
                items1: [],
                dialogFormVisible: false,
                dialogFormVisibleAdd: false,
                dialogFormVisible2: false,
                dialogFormVisible3: false,
                no: false,
                number: '0',
                number1: 0,
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
                cities: [],
                in: '',
                isActivate: '',
                code: '',
                options4: []
            }
        },
        methods: {
            handleCurrentChange: function (val) { //变更页数
                this.currentPage = val;this.backToTop();
                this.getCommlist()
            },
            handleCurrentChange1: function (val) { //变更页数
                this.currentPage1 = val;
                let p = {
                    page: this.currentPage1,
                    customer_id: this.$route.params.uid
                }
                getUserInviteList(token, p).then(res => {
                    this.number1 = res.data.total;
                    this.items1 = res.data.data;
                    let c = res.data.last_page * this.pagesize1;
                    this.total1 = parseInt(c);
                })
            },
            getUserData(){
                let para = {
                    id:this.$route.params.cid,
                customer_id: this.$route.params.uid
            }
            mksourceInfoe(para,token).then(res => {//获取用户资料
                // console.log(res)
                    let data = res.data;
                    this.student = {
                        name: data.name,
                        age: data.age,
                        sex: data.sex,
                        school: data.school,
                        channel: data.channel,
                        time: data.in_time,
                        fullAddress: data.add,
                        parent: data.parent1 ,
                        parent_phone: data.mobile1,
                        parent1: data.parent2,
                        parent1_phone: data.mobile2,
                        teacher: data.cc,
                        tmk:data.tmk,
                        referral_name: data.ref_uname ,
                        teach_name: data.ref_teacher 

                    }
                }).catch(() => {
                    console.log('No Data')
                })
            },
            getCommlist(){
                let p = {
                page: this.currentPage,
                customer_id: this.$route.params.uid
            }
            getCommuList(token, p).then(res => { //获取沟通记录
                    
                    this.items = res.data.data;
                    if(this.items){
                        let c = res.data.last_page * this.pagesize;
                        this.number = res.data.total;
                        this.total = parseInt(c);

                    }
                })
            },

        },
        computed: {
            

        },
        beforeCreate() {
            user = sessionStorage.getItem('user');
            token = JSON.parse(user).token;
        },
        created() {
            // this.userName = JSON.parse(user).uname;
            this.code = JSON.parse(user).job ? JSON.parse(user).job.code : '';
            this.getUserData();
            this.getCommlist();
            // .then(() => {
            //     sourceList(token).then(res => {
            //         if (this.student.channel == "Ref(转介绍)") {

            //             this.source = res.data
            //         } else {
            //             this.source = res.data.filter(item => {
            //                 return item.id != 4
            //             })
            //         }
            //     })
            // })
            let p = {
                page: 1,
                customer_id: this.$route.params.uid
            }
            getUserInviteList(token, p).then(res => { //获取邀约记录
                this.items1 = res.data.data;
                if(this.item1){
                    this.number1 = res.data.total;
                    let c = res.data.last_page * this.pagesize1;
                    this.total1 = parseInt(c);

                }
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

    .MRdetailTitle2 {
        position: relative;
        /* background: url(../../../static/img/contact.png) left center/25px no-repeat; */
        padding: 10px;
        display: flex;
        /* margin-left: 12px */
    }

    .MRdetailTitle3 {
        /* margin-left: 12px; */
        position: relative;
        /* background: url(../../../static/img/comuni.png) left center/30px no-repeat; */
        padding: 10px 10px 10px 12px;
        border-bottom: 1px solid #e8e8e8;
        display: flex;
    }
/* 
    .MRdetailTitle1 .addUserTitle {
        padding: 10px;
        position: relative;
    } */

    .MRdetailTitle1 .inviteTitle {
        /* margin-left: 5px; */
        position: relative;
        /* background: url(../../../static/img/invite.png) left center/30px no-repeat; */
        padding: 10px 10px 8px 5px;
        border-bottom: 1px solid #e8e8e8;
        display: flex;
    }

    #MRdetailTitle4 .el-form-item {
        margin-bottom: 18px
    }

    #MRdetailTitle4 .el-form-item__label {
        padding: 8px 12px 5px 0;
    }

    #MRdetailTitle4 .el-form-item__content {
        line-height: 30px
    }

    .MRdetailTitle1 .listUser {
        /*min-height: 100px;*/
        /*height: auto;*/
        border-bottom: 1px solid #e8e8e8;
        /*border-bottom:1px solid grey;*/
    }

    /* .MRdetailTitle1 .listUser:last-child {
        border-bottom: 1px solid #e8e8e8;
        border-bottom:1px solid grey;
    } */

    .MRdetailTitle1 .el-tag--success {
        background-color: #1fb5ad;
        border-color: #bcf1d4;
        color: #FFFFFF;
        border-radius: 25px;
    }

    .MRdetailTitle1 .listUser:nth-child(6) {
        margin-left: 48px
    }

    /* .MRdetailTitle1 .editSpanUD {
        height: 30px;
        cursor: pointer;
        width: 30px;
        float: right;
    } */

    /* .MRdetailTitle1 .editSpanUD:hover {
        background-image: url(../../../static/img/edit_h.png);
    } */

    /* .MRdetailTitle1 .addU {
        width: 30px;
        height: 30px;
        cursor: pointer;
    } */

    /* .MRdetailTitle1 .addU:hover {
        background-image: url(../../../static/img/editU_h.png);
    } */

    /* .MRdetailTitle1 .addR {
        width: 30px;
        height: 30px;
        cursor: pointer;
    } */

    /* .MRdetailTitle1 .addR:hover {
        background-image: url(../../../static/img/addR_h.png);
    } */

    .MRdetailTitle1 .block {
        text-align: center;
        position: absolute;
        bottom: 0;
        width: 100%;
    }

    /* #detailForm .el-form-item .el-form-item__content .el-checkbox {
        margin-left: 15px
    } */

    /* #userDetailDialog .el-dialog .el-dialog__body {
        padding: 10px 20px 0 20px;
    }

    #userDetailDialog .el-dialog--small {
        width: 56%;
    } */

    /* .MRdetailTitle1 .el-dialog .el-dialog__header {
        background-color: #1fb5ad;
        padding: 20px 20px 20px;
    }

    .MRdetailTitle1 .el-dialog .el-dialog__title {
        color: white;
    } */

    .MRdetailTitle6 {
        font-size: 14px;
        margin: 10px;
    }

    /* .schoolDialogUD .el-dialog__body {
        text-align: center;=
    } */

    /* .greenUD .el-message-box__header {
        background-color: #1fb5ad;
        padding: 20px 20px 20px;
    }

    .greenUD .el-message-box__title {
        color: white;
    } */
    /* .top55  .el-time-panel__content::after,.top55 .el-time-panel__content::before{
        top:55%
    } */
    .MRdetail1{
        position:absolute;top:15px;right:8px;font-size:12px
    }
    .MRdetail2{
        float:left;width:30%;background-color:white;border-radius:5px;margin-right:12px
    }
    .MRdetail3{
        float:left;width:34%;background-color:white;border-radius:5px;margin-right:12px;height:auto;position:relative;padding-bottom: 10px;
    }
    .MRdetail4{
        font-weight:600;font-size:22px
    }
    .MRdetail5{
        position:absolute;top:10px;right:11px
    }
    .MRdetail6{
        position:absolute;left:0px;top:5px
    }
    .MRdetail7{
        border-top:1px solid #e8e8e8 ;padding-left:10px
    }
    .MRdetail8{
        position:absolute;top:10px;right:15px
    }
    .MRdetail9{
        min-height:300px;width:90%;margin:0 auto;padding-bottom:30px;
    }
    .MRdetail10{
        border-radius:50%;margin-top:15px;margin-right:12%;border:1px solid gainsboro
    }
    .MRdetail11{
        font-size:13px;color:grey;margin-top:15px;text-align:right;float:right
    }
    .MRdetail12{
        font-size:14px;color:grey;margin-top:15px;margin-bottom:5px;
    }
    .MRdetail13{
        float:left;font-size:14px;color:#1fb5ad;margin-bottom:5px;
    }
    .MRdetail14{
        float:left;width:33.5%;background-color:white;border-radius:5px;min-height:435px;position:relative
    }
    .MRdetail15{
        width:142px;margin-right:20px;float:left
    }
    .MRdetail22{
        display:flex
    }
    .fz30{
        font-size: 30px;
        line-height: 29px;        
        /* vertical-align: sub; */
    }
    .fzh:hover{
        color: #1fb5ad
    }
    .fz25{
        font-size: 25px;
        line-height: 29px;
    }
    .fgrey{
        color: #cacaca
    }
    .MRdetailTitle7 {
        float: left;
        /* margin-bottom: 8px; */
        margin-top: 3px;
    }
</style>
