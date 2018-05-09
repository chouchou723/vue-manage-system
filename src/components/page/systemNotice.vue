<template>
        <div class="SystemNOtice">
            <!-- <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-my-moban"></i> 资源管理</el-breadcrumb-item>
                <el-breadcrumb-item class='ss'>无需求资源</el-breadcrumb-item>
            </el-breadcrumb> -->
            <div class='SystemNOticeH'>
                <h3 class="SystemNOticeH1">
                    系统公告
                </h3>
                <div class="SystemNOticeH2">
                    <el-button type="info" @click="openResource" v-if="code.includes('sys')">发布公告</el-button>
                </div>
            </div>
            <el-dialog title="发布公告" :visible.sync="dialogFormVisible" :close-on-click-modal="no" top='13%'  show-close custom-class='SystemNOticeH3'  @close='resetW'>
                <el-form :model="resourceSchool" id='actSchool1' :rules='ruleLaunch' ref="resourceSchool">
                        <el-form-item label="版本编号 " prop='title'>
                                V  <el-input v-model="resourceSchool.a" type="number" placeholder='输入数字' style='width:120px'></el-input>
                                .   <el-input v-model="resourceSchool.n" type="number" placeholder='输入数字'  style='width:120px'></el-input>
                                .   <el-input v-model="resourceSchool.v" type="number" placeholder='输入数字' style='width:120px'></el-input>
                            </el-form-item>
                            <el-form-item label="公告内容" prop='url'>
                                    <div v-for="(a, index) in resourceSchool.url" :class="[index !=0?'SystemNOticeH5':'']">
                                            <el-form-item class='SystemNOticeH4'>
                                            <el-input v-model="a.content" placeholder='请输入公告内容' class='SystemNOticeH6' @change="checkInput"></el-input>
                                            </el-form-item>
                                            <span @click='addPay' class='SystemNOticeH7' v-if='index==0'>添加</span>
                                            <span @click='deletePay(index)' class='SystemNOticeH8' v-else>删除</span>
                                            <div style="clear:both"></div>
                                        </div>
                                </el-form-item>
                    <!-- <el-form-item label="校区范围" prop='school'>
                        <el-select v-model="resourceSchool.school"  placeholder="选择校区">
                                    <el-option label="全部校区" value="0"></el-option>
                                    <el-option label="直营校" value="1"></el-option>
                                    <el-option label="合作校" value="2"></el-option>
                        </el-select>
                    </el-form-item> -->
                    <!-- <el-form-item prop='form_time' label='置顶时间' >
                            <el-date-picker  v-model="resourceSchool.top_start" format="yyyy-MM-dd HH:mm" :clearable='no' :editable='no' type="datetime" placeholder="请选择开始时间" popper-class='top55'  :picker-options="pickerOptions0" style="width:170px;float:left;margin-right:10px;">
                                </el-date-picker>  
                                <el-date-picker v-model="resourceSchool.top_end" format="yyyy-MM-dd HH:mm" :clearable='no' :editable='no' type="datetime" placeholder="请选择结束时间" popper-class='top55'  :picker-options="pickerOptions0" style="width:170px">
                                    </el-date-picker>   
                        </el-form-item> -->
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button type="primary" :loading="writeL"  @click="distributeResource('resourceSchool')">确 定</el-button>
                    <el-button @click="dialogFormVisible = false">取 消</el-button>
                </div>
            </el-dialog>
            <!-- <el-dialog title="编辑公告" :visible.sync="dialogFormVisibleEdit" size="small" :close-on-click-modal="no" top='13%'  show-close custom-class='SystemNOticeH3' @close='resetW'>
                    <el-form :model="editTime" :rules='editTimeRule' ref="editTime">
                        <el-form-item prop='form_time' label='置顶时间' >
                                <el-date-picker  v-model="editTime.top_start" format="yyyy-MM-dd HH:mm" :clearable='no' :editable='no' type="datetime" placeholder="请选择开始时间" popper-class='top55'  :picker-options="pickerOptions0" style="width:170px;float:left;margin-right:10px;">
                                    </el-date-picker>  
                                    <el-date-picker v-model="editTime.top_end" format="yyyy-MM-dd HH:mm" :clearable='no' :editable='no' type="datetime" placeholder="请选择结束时间" popper-class='top55'  :picker-options="pickerOptions0" style="width:170px">
                                        </el-date-picker>   
                            </el-form-item>
                    </el-form>
                    <div slot="footer" class="dialog-footer ">
                        <el-button type="primary" :loading="writeL" @click="distributeResource1('editTime')">确 定</el-button>
                        <el-button @click="dialogFormVisibleEdit = false">取 消</el-button>
                    </div>
                </el-dialog> -->
            <div id="table2NDR123">
                <el-table :data="noEffData"  style="width: 100%" :show-header="no">
                    <el-table-column prop="title" label="公告主题">
                            <template scope="scope">
                                    <div style="font-size:18px;font-weight: 600;text-align: left;padding-left:10px;padding-top: 1%">{{scope.row.created}}
                                        <span style="padding-left:5px"> v{{scope.row.version}}</span>  </div>
                                    <div style="padding-bottom: 0.5%">
                                        <div style="color:#acacac;text-align: left;padding-left: 18px;position: relative;" class='SystemNOticeH9' v-for="item in scope.row.content">
                                           {{item}}
                                        </div>
                                    </div>
                                </template>
                    </el-table-column>
                    <!-- <el-table-column prop="url" label="内容链接" >
                            <template scope="scope">
                                    <div @click="switchDetail(scope.row.url)" class='noticeMangeHover'>{{scope.row.url}}</div>
                                </template>
                    </el-table-column>
                    <el-table-column prop="age" label="置顶时间" >
                            <template scope="scope">
                                    <span >{{scope.row.top_start}}~{{scope.row.top_end}}</span>
                                </template>
                    </el-table-column>
                    <el-table-column prop="school" label="校区范围" width='100'>
                    </el-table-column>
                    <el-table-column prop="status" label="公告状态"  width='100'>
                            <template scope="scope">
                                    <span :style="scope.row.status=='待展示'? 'color:#50cf38' : scope.row.status=='展示中'? 'color:#dba31d':'color:#999999' ">{{scope.row.status}}</span>
                                </template>
                    </el-table-column>
                    <el-table-column prop="updated" label="操作时间" width='80'>
                    </el-table-column> -->
                    <el-table-column label="操作" width='120'  v-if="code.includes('sys')">
                        <template scope="scope">
                            <!-- <el-button type="text" size="small" v-if="scope.row.status=='展示中'||scope.row.status=='待展示'" @click="open2(scope.row.id)" style='color:red'>中止</el-button> -->
                            <el-button type="text" size="small"  @click="open2(scope.row.id)" style='color:red'>删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
            <div class="SystemNOticeH10">
                <!-- <span class="demonstration"></span> -->
                <el-pagination layout="prev, pager, next"  :total="total"  @current-change="handleCurrentChange"  :current-page="currentPage" :page-size="pagesize">
                </el-pagination>
            </div>
        </div>
    </template>
    <script>
        var user, token
        import {
            getAfficheList,
            addAffiche,
            delAffiche
        } from '../../api/api';
        export default {
            data() {
                // var nan = (rule, value, callback) => {
                //     if (value == '') {
                //         callback('请选择')
                //     } else if (typeof value == 'number') {
                //         callback();
                //     }else{
                //         callback();
                        
                //     }
                // }
                var isThree = (rule, value, callback) => {
                    if (this.resourceSchool.a == ''||this.resourceSchool.n == ''||this.resourceSchool.v == '') {
                        callback('请输入版本号')
                    }else{
                        callback();
                        
                    }
                }
                var isTwo  = (rule, value, callback) => {
                    let a = this.resourceSchool.url.every(item=>{
                        return item.content
                    })
                    if (!a) {
                        callback('请输入版本更新内容')
                    }else{
                        callback();
                        
                    }
                }
                // var contentfrom_time1 = (rule, value, callback) => {
                //     if (!this.resourceSchool.top_start||!this.resourceSchool.top_end) {
                //         callback('请选择置顶起止时间');
                //     } else if(this.resourceSchool.top_end<this.resourceSchool.top_start){
                //         callback('结束时间应大于开始时间');
                //     }else {
                //         callback()
                //     }
                // }
                // var contentfrom_time2 = (rule, value, callback) => {
                //     if (!this.editTime.top_start||!this.editTime.top_end) {
                //         callback('请选择置顶起止时间');
                //     } else if(this.editTime.top_end<this.editTime.top_start){
                //         callback('结束时间应大于开始时间');
                //     }else {
                //         callback()
                //     }
                // }
                // var isSpace = (rule, value, callback) => {
                //     // var myreg = /^[\u4e00-\u9fa5a-zA-Z0-9,.;:"'!?~#$%^&*()]+$/;
                //     var myreg1 = /^\s/;
                //     if (value == '') {
                //         callback('请输入公告主题')
                //     } else if (myreg1.test(value)) {
                //         callback('请输入有效的主题');
                //     } else {
                //         callback();
                //     }
                // }
                // var isSpace1 = (rule, value, callback) => {
                //     // var myreg = /^[\u4e00-\u9fa5a-zA-Z0-9,.;:"'!?~#$%^&*()]+$/;
                //     var myreg1 = /^\s/;
                //     if (value == '') {
                //         callback('请输入内容链接')
                //     } else if (myreg1.test(value)) {
                //         callback('请输入有效的内容链接');
                //     } else {
                //         callback();
                //     }
                // }
                return {
                    writeL:false,
                    ruleLaunch:{
                        title: [{
                            required: true,
                            // message: '请输入活动地点',
                            validator: isThree,
                            trigger: 'blur'
                        }],
                        url: [{
                            required: true,
                            validator: isTwo,                        
                            // message: '请输入内容链接',
                            trigger: 'blur'
                        }],
                        // school: [{
                        //     required: true,
                        //     // validator: nan,
                        //     message: '请选择校区范围',
                        //     trigger: 'change'
                        // }],
                        // form_time: [{
                        //     required: true,
                        //     validator: contentfrom_time1,
                        //     trigger: 'change'
                        // }],
                    },
                    // editTimeRule:{
                    //     form_time: [{
                    //         required: true,
                    //         validator: contentfrom_time2,
                    //         trigger: 'change'
                    //     }],
                    // },
                    // l16:16,
                    // pickerOptions0: {
                    //     disabledDate(time) {
                    //         return time.getTime() < Date.now() - 8.64e7;
                    //     }
                    // },
                    no: false,
                    code: '',
                    resourceSchool: {
                        title: '',
                        url:[{content:''}],
                        school:'',
                        top_start:'',
                        top_end:'',
                    },
                    // editTime:{
                    //     top_start:'',
                    //     top_end:'',
                    //     id:'',
                    // },
                    dialogFormVisible: false,
                    dialogFormVisibleEdit: false,
                    total: 0,
                    number: '0',
                    noEffData: [],
                    currentPage: 1, //页数
                    pagesize: 15, //默认每页
                    // sortName:'',
                    // sortOrder:'',
                }
            },
            methods: {
                checkInput(){
                    this.$refs['resourceSchool'].validateField('url');
                },
                resetW(){
                    this.writeL = false;
                    this.resourceSchool =  {
                        a: '',
                        n: '',
                        v: '',
                        url:[{content:''}],
                        school:'',
                        top_start:'',
                        top_end:'',
                    }
                    this.$refs['resourceSchool'].resetField();
                    // this.resourceSchool.url=[{content:''}]
                },
                open2(id) { //中止公告
                    // console.log(data)
                        this.$confirm('是否确定要删除该条公告?', '删除公告', {
                            customClass: 'SystemNOticeH11',
                            confirmButtonText: '确定',
                            cancelButtonText: '取消',
                            type: 'warning'
                        }).then(() => {
                            let para = {
                                id: id
                            }
                            delAffiche(para,token).then(res=>{
                                // console.log(res);
                                if(res.code==0){
                                    this.$message.success('删除成功');
                                    // this.dialogFormVisible= false;
                                    this.fetchData()
                                }else{
                                    this.$message.error(res.data)
                                }
                            })
                            // delete_departList(para, token).then(res => {
                            //     if(res.code==0){
                            //     departList(para, token).then((res) => {
                            //         // this.filterData(res);
                            //         this.departs = res.data;
                            //     })
                            //     this.$message({
                            //     type: 'success',
                            //     message: '删除成功!'
                            // });
                            //     }
                            // });
                            // this.deleteRow(index,data);
                            
                        }).catch(() => {
                        //   this.$message({
                        //     type: 'info',
                        //     message: '已取消删除'
                        //   });          
                        });
                    
    
                },
                openResource() { //发布公告
                    this.dialogFormVisible = true
                },
                handleCurrentChange: function (val) { //换页
                    this.currentPage = val;this.backToTop();
                    this.fetchData();
                },
                // switchDetail(url) { //点url
                //     window.open(url)
                // },
                // updateList() {
                //     this.currentPage = 1;
                //     this.fetchData();
    
                // },
                distributeResource(formName) {//发布公告
                    this.$refs[formName].validate((valid) => { //替换提交服务
                        if (valid) {
                            this.writeL =true;
                            let arrlist = this.resourceSchool.url.map(item=>{
                                return item.content
                            })
                            let para = {
                                version:`${this.resourceSchool.a}.${this.resourceSchool.n}.${this.resourceSchool.v}`,
                                content:arrlist.join('<br>')
                            }
                            addAffiche(para,token).then(res=>{
                                // console.log(res);
                                if(res.code==0){
                                    this.$message.success('发布成功');
                                    this.dialogFormVisible= false;
                                    this.writeL =false;                                
                                    this.fetchData()
                                }else{
                                    this.$message.error(res.data);
                                    this.writeL =false;                                
                                    
                                }
                            })
                        }
                    })
                },
                addPay() {
                this.resourceSchool.url.push({
                    content: ''
                })
            },
            deletePay(index) {
                this.resourceSchool.url.splice(index,1);
            },
                // distributeResource1(formName) {//提交修改公告时间公告
                //     this.$refs[formName].validate((valid) => { //替换提交服务
                //         if (valid) {
                //             let para = {...this.editTime}
                //             this.writeL =true;
                            
                //             schoolBulletinAdd(para,token).then(res=>{
                //                 console.log(res);
                //                 if(res.code==0){
                //                     this.$message.success('修改成功');
                //                     this.dialogFormVisibleEdit= false;
                //                     this.writeL =false; 
                //                     this.fetchData()
                //                 }else{
                //                     this.$message.error(res.data);
                //                     this.writeL =false;                                
                                    
                //                 }
                //             })
                //         }
                //     })
                // },
                fetchData() {
                    let para ={
                        page:this.currentPage
                    }
                    getAfficheList(para,token).then((res) => {
                        let a = res.data.data;
                        let c = res.data.last_page * this.pagesize;
                        this.noEffData = a;
                        this.total = parseInt(c);
                    })
                },
            },
            beforeCreate() {
                user = sessionStorage.getItem('user');
                token = JSON.parse(user).token;
            },
            created() {
                this.code = JSON.parse(user).job ? JSON.parse(user).job.code : '';
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
            },
        }
    
    </script>
    <style>
        /* #table2NDR .el-table td,
        #table2NDR .el-table th:not(.gutter) {
            padding: 1px;
            text-align: center
        }
    
        #table2NDR .el-table th>div,
        #table2NDR .el-table .cell {
            padding-left: 0;
            padding-right: 0;
        } */
        .SystemNOticeH3 .el-dialog__header {
            background-color: #1fb5ad;
            padding: 20px 20px 20px;
        }
    
        .SystemNOticeH3 .el-dialog__title {
            color: white;
        }
        .SystemNOticeH10 {
            text-align: center;
            margin-top: 10px;
        }
    
        .SystemNOticeH1 {
            float: left;
            margin-right: 5px;
            padding-left: 10px;
            margin-top:5px;
        }
    
        /* .studentReturnNoneed {
            float: left;
            width: 120px;
            margin-right: 10px;
        } */
    
        .SystemNOticeH {
            width: 100%;
            position: relative;
            height: 46px;
            background-color: white;
            /* margin-top: 0; */
            padding-top: 10px;
            margin-bottom: 5px;
            border-radius: 5px;
        }
    
        .SystemNOticeH2 {
            float: right;
            margin-right: 10px
        }
    
        /* .NDRfoot {
            text-align: center;
            margin-top: -24px
        } */
        .SystemNOticeH6 {
            width: 397px
        }
        .SystemNOticeH11 .el-message-box__header {
            background-color: #e95c5c;
            padding: 20px 20px 20px;
        }
    
        .SystemNOticeH11 .el-message-box__title {
            color: white;
        }
    
        .SystemNOticeH11 .el-button--primary {
            background-color: #e95c5c;
            border-color: #e95c5c;
        }
    
        .SystemNOticeH11 .el-button--primary:hover {
            background-color: #ff6d6d;
            border-color: #ff6d6d;
        }
        
    .SystemNOticeH4 {
        /* width: 142px; */
        margin-right: 12px;
        float: left
    }
    .SystemNOticeH5 {
        margin-left: 76px;
        margin-top: 22px;
    }

    .SystemNOticeH7 {
        position: absolute;
        top: 0;
        left: 485px;
        color: #1fb5ad
    }

    .SystemNOticeH7:hover {
        cursor: pointer;
    }

    .SystemNOticeH8 {
        float: left;
        color: red;
    }

    .SystemNOticeH8:hover {
        cursor: pointer;
    }
    .SystemNOticeH9::before{
        content: '';
        position: absolute;
        top:0;
        bottom: 0;
        margin: auto;
        left:10px;
        width: 5px;
        height: 5px;
        border-radius: 50%;
        background-color: #acacac
    }
    </style>
    