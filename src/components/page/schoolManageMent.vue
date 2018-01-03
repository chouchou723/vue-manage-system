<template>
        <div class='schoolReal'>
                <el-dialog title="设置坐标" :visible.sync="dialogFormVisibleL" :close-on-click-modal="no" custom-class='schoolMap'  top='9%' >
                        <getmap :location="aform.addr" @closeD='closeD' v-if='dialogFormVisibleL'></getmap>
                    </el-dialog>
            <!-- <div class="crumbs">
                <el-breadcrumb separator="/">
                    <el-breadcrumb-item><i class="el-icon-my-shezhi"></i> 组织架构</el-breadcrumb-item>
                    <el-breadcrumb-item class='ss'>校区管理</el-breadcrumb-item>
                </el-breadcrumb>
            </div> -->
            <div class='SchoolManageH'>
                <div class="SchoolManageH1">
                    <h3 class='SchoolManageH2'>
                   校区管理
                   <span v-if="number==='0'" style="font-size:14px;color: #bdb8b8;">加载中...</span>
               <span v-else>({{number}}所)</span>
                    </h3>
                    <div class='schoolManageS1'>
                        <el-cascader
                        :options="cities"
                        :props="propsource"
                        v-model="value3"
                         @change="updateList"
                         clearable
                         change-on-select
                        placeholder="选择城市" >
                      </el-cascader>
                    </div>
                    <!-- <div class='schoolManageS2'>
                        <el-select v-model="value1" clearable placeholder="校区类型" @change="updateList">
                            <el-option label="直营校" value="1"></el-option>
                            <el-option label="合作校" value="0"></el-option>
                        </el-select>
                    </div> -->
                    <div class='schoolManageS3'>
                        <el-select v-model="value2" clearable placeholder="授权考点" @change="updateList">
                            <el-option label="是" value="1"></el-option>
                            <el-option label="否" value="0"></el-option>
                        </el-select>
                    </div>
                    <div class='schoolManageIN'>
                        <el-input placeholder="输入学校名" icon="search" v-model="input2" :on-icon-click="handleIconClick" @keyup.enter.native="handleIconClick">
                        </el-input>
                    </div>
                    <el-button type="primary" size="mid" class='SchoolManageb1' @click="createCh('aform')">新增校区</el-button>
                </div>
                <el-dialog :title="alter" :visible.sync="dialogFormVisible" :close-on-click-modal="no" custom-class='schoolMap' top='9%'  @close='resetD'>
                    <el-form :model="aform" :rules="rules2" ref="aform">
                        <el-form-item label="校区名" :label-width="formLabelWidth" prop="title">
                            <el-input v-model="aform.title" placeholder='请输入校区名' style='width:182px;float:left;margin-right:10px;'></el-input>
                            <el-checkbox-group v-model="aform.direct_accredit"  >
                                    <el-checkbox label="合作校" key='1'></el-checkbox>
                                    <el-checkbox label="授权考点" key='2'></el-checkbox>
                                  </el-checkbox-group>
                        </el-form-item>
                        <el-form-item label="校区编号" :label-width="formLabelWidth" prop="code">
                                <el-input v-model="aform.code" placeholder='选填,请输入校区编号' style='width:182px;float:left;margin-right:10px;'></el-input>
                            </el-form-item>
                            <el-form-item label="教室数量" :label-width="formLabelWidth" prop="rooms">
                                    <el-select v-model="aform.rooms" :style='{width:"142px"}'>
                                        <el-option label="1" value="1"></el-option>
                                        <el-option label="2" value="2"></el-option>
                                        <el-option label="3" value="3"></el-option>
                                        <el-option label="4" value="4"></el-option>
                                        <el-option label="5" value="5"></el-option>
                                        <el-option label="6" value="6"></el-option>
                                        <el-option label="7" value="7"></el-option>
                                        <el-option label="8" value="8"></el-option>
                                        <el-option label="9" value="9"></el-option>
                                        <el-option label="10" value="10"></el-option>
                                    </el-select>
                                </el-form-item>
                                <el-form-item label="所在区域" :label-width="formLabelWidth" prop="areaid">
                                        <el-cascader
                                        :options="cities"
                                        :props="propsource"
                                        v-model="aform.areaid"
                                         @change="updateList"
                                         clearable
                                         change-on-select
                                        placeholder="选择省市城区" >
                                      </el-cascader>
                                    </el-form-item>
                                    <el-form-item label="校区地址" :label-width="formLabelWidth" prop="addr">
                                            <el-input v-model="aform.addr" placeholder='输入校区详细地址' style='width:382px;'></el-input>
                                        </el-form-item>
                                        <el-form-item label="联系电话" :label-width="formLabelWidth" prop="tel">
                                                <el-input v-model="aform.tel" placeholder='输入联系电话' style='width:182px;'></el-input>
                                            </el-form-item>
                                            <el-form-item label="地图坐标" :label-width="formLabelWidth" prop="maps">
                                                    <div @click='openLoc' class='setHover'>设置坐标</div>
                                                    <div v-if="aform.maps">

                                                        <span>坐标值:</span><span>{{aform.maps}}</span>
                                                    </div>
                                                </el-form-item>
                            </el-select>
                        </el-form-item>
                    </el-form>
                    <div slot="footer" class="dialog-footer">
                        <el-button type="primary" @click="addAccount('aform')">确 定</el-button>
                        <el-button @click="dialogFormVisible = false">取 消</el-button>
                    </div>
                </el-dialog>
            </div>
           
            <div id="tableSM123">
                <el-table :data="accountData" border style='width:100%'>
                    <el-table-column prop="title" label="校区名">
                        <template scope="scope">
                            <span style='font-weight:600'>{{scope.row.title}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="code" label="校区编号" width='90'>
                    </el-table-column>
                    <el-table-column prop="rooms" label="教室数量" width='80'>
                    </el-table-column>
                    <el-table-column prop="area" label="所在地区" width='80'>
                    </el-table-column>
                    <el-table-column prop="addr" label="校区地址" >
                        </el-table-column>
                        <el-table-column prop="direct_store" label="校区类型" width='80'>
                            </el-table-column>
                            <el-table-column prop="accredit" label="授权考点" width='80'>
                            </el-table-column>
                            <el-table-column prop="tel" label="联系电话" >
                                </el-table-column>
                                <el-table-column prop="created" label="创建时间" >
                                    </el-table-column>
                    <el-table-column label="操作" width='80'>
                        <template scope="scope">
                            <el-button type="text" size="small" @click="editCh(scope.row.id,scope.row)">编辑</el-button>
                            <el-button type="text" size="small" v-if="scope.row.active==='1'" style="color: #dba31c;" @click="hideRow(scope.row.id)">隐藏</el-button>
                            <el-button type="text" size="small" v-if="scope.row.active==='0'"  style="color: #b5a273;" @click="cancelHideRow(scope.row.id)">取消隐藏</el-button>                            
                          <!--   <el-button type="text" size="small" @click="open2(scope.$index, accountData)">删除</el-button> -->
                        </template>
                    </el-table-column>
                </el-table>
                <div class="schoolManageBlock">
                    <el-pagination layout="prev, pager, next" :total="total" :current-page="currentPage" :page-size="pagesize" @current-change="handleCurrentChange">
                    </el-pagination>
                </div>
            </div>
        </div>
    </template>
    <script>
    var token
    import {
        schoolList,
        cityList,
        add_school,
        hideSchool
    } from '../../api/api';
    import getmap from './getMap.vue';
    export default {
        components: {
            getmap
        },
        data() {
                // var nan = (rule, value, callback) => {
                //     if (value === '') {
                //         callback('请选择')
                //     } else if (typeof value == 'number') {
                //         callback();
                //     }
                // }
                // var validatePass = (rule, value, callback) => {
                //     if (value == '') {
                //         callback(new Error('请输入密码'));
                //     } else{
                //         callback()
                //     }
                // };
                // var isPhone1 = (rule, value, callback) => {
                //     var myreg =  /^(((1[0-9]{1}))+\d{9})$/; 
                //     if (value == '') {
                //         callback('请输入手机号')
                //     } else if (!myreg.test(value)) {
                //         callback('请输入有效手机号');
                //     }else{
                //         callback();
                //     }
                // }
                var isareaid = (rule, value, callback) => {
                    if (value.length==0) {
                        callback('请选择省市城区')
                    } else{
                        callback();
                    }
                }
                // var validatePass = (rule, value, callback) => {
                //     if (value.length < 6) {
                //         callback(new Error('请输入至少6位'));
                //     } else {
                //         var regex = new RegExp('(?=.*[0-9])(?=.*[a-zA-Z]).{6,30}');
                //         if (!regex.test(value)) {
                //             callback(new Error('密码中必须包含字母、数字，至少6个字符，最多30个字符'));
                //         }
                //         if (this.aform.checkPass !== '') {
                //             this.$refs.aform.validateField('checkPass');
                //         }
                //         callback();
                //     }
                // };
                // var validatePass2 = (rule, value, callback) => {
                //     if (value === '') {
                //         callback(new Error('请再次输入密码'));
                //     } else if (value !== this.aform.pwd) {
                //         callback(new Error('两次输入密码不一致!'));
                //     } else {
                //         callback();
                //     }
                // }
                return {
                    map:{},
                    direct_accredit:[],
                    currentPage: 1, //页数
                    pagesize: 15, //默认每页
                    total: 0, //总页数
                    in : '', //修改时代表修改的index
                    no: false, //取消点击关闭
                    accountData: [],
                    number: '0',
                    input2: '',
                    value: '', //对应校区select的值
                    value1: '', //对应部门select的值
                    value2: '', //对应职位select的值
                    value3:[],
                    aform: {
                        title: '',
                        code: '',
                        areaid: [],
                        addr:'',
                        rooms:'1',
                        maps:'',
                        // fla: '1',
                        // address:'',
                        tel:'',
                        direct_accredit:[],
                    },
                    propsource:{
              value: 'id',
              label:'city_name',
              children: '_child'
            },
                    dialogFormVisible: false,
                    dialogFormVisibleL: false,                    
                    formLabelWidth: '110px',
                    inputLabelWidth: '200px',
                    rules2: {
                        title:[
                        {required:true,message: '请输入校区名',trigger: 'blur'}],
                        addr:[
                        {required:true,message: '请输入详细地址',trigger: 'blur'}],
                        maps:[
                        {required:true,message: '请设置校区坐标',trigger: 'blur'}],
                        areaid: [{
                            required: true,
                            validator: isareaid,
                            trigger: 'change'
                        }],
                        tel:[
                        {required:true,message: '请输入联系电话',trigger: 'blur'}],
                    },
                    schools: [], //选好城市之后的校区
                    loading: false,
                    cities: [], //form中的城市
                    regions: [] //部门 change之后更新
                }
            },
            methods: {
                hideRow(id){
                         this.$confirm('是否要隐藏该校区?', '隐藏校区', {
                            customClass: 'SMGre',
                            confirmButtonText: '确定',
                            cancelButtonText: '取消',
                            // type: 'warning'
                        }).then(() => {
                            let para={
                                school_id:id,
                                active:0
                            }
                            hideSchool(para,token).then(res=>{
                                if(res.code==0){
                                    this.fetchData()
                                    this.$message({
                                        type: 'success',
                                        message: '隐藏成功!'
                                    });
                                }else{
                                    this.$message.error(res.data)
                                }
                            })
                        }).catch(() => {
                        //   this.$message({
                        //     type: 'info',
                        //     message: '已取消删除'
                        //   });          
                        });
                    
                },
                cancelHideRow(id){
                         this.$confirm('是否取消隐藏该校区?', '取消隐藏校区', {
                            customClass: 'SMGre',
                            confirmButtonText: '确定',
                            cancelButtonText: '取消',
                            // type: 'warning'
                        }).then(() => {
                            let para={
                                school_id:id,
                                active:1
                            }
                            hideSchool(para,token).then(res=>{
                                if(res.code==0){
                                    this.fetchData()
                                    this.$message({
                                        type: 'success',
                                        message: '取消隐藏成功!'
                                    });
                                }else{
                                    this.$message.error(res.data)
                                }
                            })
                        }).catch(() => {
                        //   this.$message({
                        //     type: 'info',
                        //     message: '已取消删除'
                        //   });          
                        });
                    
                },
                closeD(data){
                    this.aform.maps = data;
                    // console.log(data)
                    this.dialogFormVisibleL = false;                    
                },
                openLoc(){
                    this.dialogFormVisibleL = true;
                },
                handleIconClick() {
                    this.currentPage = 1;
                    this.fetchData();
                },
                updateList() { //表格上方3个select change之后刷新表格
                    this.currentPage = 1;
                    this.fetchData();
                },
                createCh(formName) { //点击创建按钮
                    this.dialogFormVisible = true;
                },
                resetD(){
                    this.in = '';
                    this.aform = {
                        id: '',
                        title: '',
                        code: '',
                        areaid: [],
                        addr:'',
                        rooms:'1',
                        maps:'',
                        // fla: '1',
                        // address:'',
                        tel:'',
                        direct_accredit:[],
                    };
                    this.$refs['aform'].resetFields();
                },
                editCh(id,data) { //点击就修改
                    this.in = id;
                    let cs =data.areaid.split(',');
                        this.aform = {
                            id: data.id,
                            title: data.title,
                            code:data.code,
                            areaid: cs.map(item=>item-0),
                            addr:data.addr,
                            rooms:data.rooms==0?'1':data.rooms,
                            tel: data.tel,
                            direct_accredit:data.direct_accredit.split(','),//data.direct_accredit
                            maps:data.maps
                        };
                     this.dialogFormVisible = true;
    
                },
                addAccount(formName) { //点确定后添加学校
                    this.$refs[formName].validate((valid) => {
                        let f = {...this.aform};
                        f.areaid = f.areaid[f.areaid.length-1]
                        f.direct_accredit = f.direct_accredit.join(',')
                        // f.school_id = f.school.join(',');
                        let i = this.in;
                        if (valid) {
                            if (i !== '') {
                                f.id =this.in;
                                add_school(f, token).then(res => {
                                    if(res.code ==0){
                                     this.$message({
                                        message: '修改成功',
                                        type: 'success'
                                    });   
                                    this.fetchData();
                                    }else{
                                        this.$message({
                                    type: 'error',
                                    message: res.data
                                });
                                    }
                                }).then(()=>{
                                     this.dialogFormVisible = false;
                                });
                            }else {
                                add_school(f, token).then(res => {
                                   if(res.code ==0){
                                     this.$message({
                                        message: '创建成功',
                                        type: 'success'
                                    });   
                                    this.fetchData();
                                    }else{
                                        this.$message({
                                    type: 'error',
                                    message: res.data
                                });
                                    }
                                }).then(()=>{
                                     this.dialogFormVisible = false;
                                });
                            }
                        }else {
                            console.log('error submit!!');
                            return false;
                        }
                    });
                },
                fetchData() {
                    let para = {
                        page: this.currentPage,
                        type:'all',
                        city_id:this.value3.length!==0?this.value3[this.value3.length-1]:'',
                        direct:this.value1?this.value1:'all',
                        accredit:this.value2?this.value2:'all',
                        title: this.input2,
                        per_page:15
                        // school_id: this.value,
                        // did: this.value1,
                        // job_id: this.value2,
                        // input: this.input2
                    }
                    schoolList(para, token).then((res) => {
                        this.number = res.data.total;
                        let a = res.data.data;
                        let c = res.data.last_page * this.pagesize;
                        this.total = parseInt(c);
                        this.accountData = a;
                    })
    
                },
                handleCurrentChange: function(val) { //变更页数
                    this.currentPage = val;
                    this.fetchData();
                },
            },
            beforeCreate() {
                let user = sessionStorage.getItem('user');
                token = JSON.parse(user).token;
            },
            created() { //创建组件时
                // console.log(this.getLC)
                this.fetchData();
                cityList(token).then((res) => { //获取城市
                        this.cities = res.data
                    })
                // let cam = {
                //     simple: '1'
                // };
                // schoolList(cam, token).then((res) => {//获取校区
                //     let a = res.data.map(item => {
                //         return {
                //             value: item.id,
                //             label: item.title
                //         };
                //     });
                //     this.options = a
                //     this.schools = a//会被动态修改
                // }).then(() => {
                   
                // }).then(() => {
                   
                // }).then(() => {
                //     cityList(token).then((res) => { //获取城市
                //         this.cities = res.data
                //     })
                // })
            },
            computed: {
                alter: function() {
                    if (this.in === '') {
                        return '新增校区'
                    }
                    return '修改校区'
                },
            }
    }
    </script>
    <style>
/*     
    #tableSM .el-table td,
    #tableSM .el-table th:not(.gutter) {
        padding: 5px 5px;
        text-align: center
    }
    
    #tableSM .el-table th>div,
    #tableSM .el-table .cell {
        padding-left: 0;
        padding-right: 0;
    } */
    
    /* .redwarn .el-message-box__header {
        background-color: #e95c5c;
        padding: 20px 20px 20px;
    }
    
    .redwarn .el-message-box__title {
        color: white;
    }
    
    .redwarn .el-button--primary {
        background-color: #e95c5c;
        border-color: #e95c5c;
    } */
    
 .schoolReal .el-dialog .el-dialog__header {
        background-color: #1fb5ad;
        padding: 20px 20px 20px;
    }
    
    .schoolReal .el-dialog .el-dialog__title {
        color: white;
    }
    
    .schoolManageBlock {
        text-align: center;
        margin-top: 10px;
    }
    
    .SchoolManageH {
        width: 100%;
        position: relative;
        height: 45px;
        background-color: white;
      /* margin-top:30px; */
      padding-top:10px;
      margin-bottom: 5px;
      border-radius: 5px;
    }
    .SchoolManageH2{
        display: inline-block;
        /*margin-top: 20px;*/
        margin-bottom: 15px;
        padding-left: 10px
    }
    .schoolManageS1 {
        display: inline-block;
         margin-bottom: 10px;
        margin-left: 10px;
        width: 140px
    }
    
    .schoolManageS2 {
       display: inline-block;
         margin-bottom: 10px;
        margin-left: 10px;
        width: 140px
    }
    
    .schoolManageS3 {
        display: inline-block;
         margin-bottom: 10px;
        margin-left: 10px;
        width: 140px
    }
    
    .SchoolManageb1 {
        position: absolute;
        right: 10px;
        top: 10px;
    }
    
    .schoolMap .el-dialog__body {
        padding: 20px 20px 0 20px;
    }
    
    .schoolMap .el-dialog__footer {
        padding: 0 20px 15px;
    }
    .schoolManageIN{
    position:absolute;
    top:10px;
    right:100px;
    width:200px
    }
    /* .AM142float {
            width: 142px;
            margin-right: 30px;
            float: left
        } */
    
        /* .AMfloat {
            width: 142px;
            float: left
        } */
        .setHover{
            color:#1fb5ad;
        } 
        .setHover:hover{
            cursor: pointer
        }
        .SMGre .el-message-box__header {
    background-color: #1fb5ad;
    padding: 20px 20px 20px;
}

.SMGre .el-message-box__title {
    color: white;
}
    </style>
    