<template>
    <div>
        <!-- <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-my-shezhi"></i> 组织架构</el-breadcrumb-item>
                <el-breadcrumb-item class='ss'>校区管理</el-breadcrumb-item>
            </el-breadcrumb>
        </div> -->
        <div class='SchoolManageH'>
            <div class="SchoolManageH1">
                <h3 class='SchoolManageH2'>
               校区管理({{number}}所)
                </h3>
                <!-- <div class='oneSelect'>
                    <el-select v-model="value" clearable placeholder="选择校区" filterable @change="updateList">
                        <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                        </el-option>
                    </el-select>
                </div>
                <div class='twoSelect'>
                    <el-select v-model="value1" clearable placeholder="选择部门" @change="updateList">
                        <el-option v-for="item in options1" :key="item.value" :label="item.label" :value="item.value">
                        </el-option>
                    </el-select>
                </div>
                <div class='threeSelect'>
                    <el-select v-model="value2" clearable placeholder="选择职位" @change="updateList">
                        <el-option v-for="item in options2" :key="item.job_id" :label="item.full_name" :value="item.job_id">
                        </el-option>
                    </el-select>
                </div>
                <div class='AMinput'>
                    <el-input placeholder="请输入手机号或姓名" icon="search" v-model="input2" :on-icon-click="handleIconClick" @keyup.enter.native="handleIconClick">
                    </el-input>
                </div> -->
                <el-button type="primary" size="mid" class='SchoolManageb1' @click="createCh('aform')">添加校区</el-button>
            </div>
            <el-dialog :title="alter" :visible.sync="dialogFormVisible" :close-on-click-modal="no" custom-class='accountManageDialog' top='9%'  @close='resetD'>
                <el-form :model="aform" :rules="rules2" ref="aform">
                    <el-form-item label="校区名" :label-width="formLabelWidth" prop="title">
                        <el-input v-model="aform.title" placeholder='请输入校区名' :style='{width:inputLabelWidth}'></el-input>
                    </el-form-item>
                    <el-form-item label="所在地区" required :label-width="formLabelWidth">
                            <el-form-item prop="city_id" class='AM142float'>
                                <el-select v-model="aform.city_id" filterable placeholder="请选择城市" @change='getRegion1'>
                                    <el-option v-for="item in cities" :key="item.id" :label="item.city_name" :value="item.id">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item prop="areaid" class='AM142float'>
                                <el-select v-model="aform.areaid" placeholder="请选择城区">
                                    <el-option v-for="item in regions" :key="item.id" :label="item.city_name" :value="item.id">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item prop="addr" class='AMfloat'>
                                <el-input v-model="aform.addr" placeholder='请输入具体地址'></el-input>
                            </el-form-item>
                        </el-form-item>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="教室数量" :label-width="formLabelWidth" prop="room_num">
                        <el-select v-model="aform.room_num" :style='{width:"142px"}'>
                            <el-option label="1" value="1"></el-option>
                            <el-option label="2" value="2"></el-option>
                            <el-option label="3" value="3"></el-option>
                            <el-option label="4" value="4"></el-option>
                            <el-option label="5" value="5"></el-option>
                            <el-option label="6" value="6"></el-option>
                        </el-select>
                    </el-form-item>
                    <!-- <el-form-item :label-width="formLabelWidth" prop="school" style='display:inline-block;margin-left: -100px'>
                        <el-select v-model="aform.school"  multiple filterable remote placeholder="请输入关键词" :remote-method="remoteMethod" :loading="loading">
                            <el-option v-for="item in schools" :key="item.value" :label="item.label" :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="部门" :label-width="formLabelWidth" prop="did">
                        <el-select v-model="aform.did" :style='{width:inputLabelWidth}' @change="updateJobList">
                            <el-option v-for="item in options1" :key="item.value" :label="item.label" :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="职位" :label-width="formLabelWidth" prop="job_id">
                        <el-select v-model="aform.job_id" :style='{width:inputLabelWidth}'>
                            <el-option v-for="item in jobs" :key="item.value" :label="item.label" :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item> -->
                    <el-form-item label="是否为直营校区" label-width="formLabelWidth" prop="fla">
                        <el-select v-model="aform.fla" :style='{width:"142px"}'>
                            <el-option label="是" value="1"></el-option>
                            <el-option label="否" value="0"></el-option>
                        </el-select>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button type="primary" @click="addAccount('aform')">确 定</el-button>
                    <el-button @click="dialogFormVisible = false">取 消</el-button>
                </div>
            </el-dialog>
        </div>
        <div id="tableSM">
            <el-table :data="accountData" border style='width:100%'>
                <el-table-column prop="title" label="校区名">
                    <template scope="scope">
                        <span style='font-weight:600'>{{scope.row.title}}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="addr" label="所在地区" >
                </el-table-column>
                <el-table-column prop="orders" label="教室数量" >
                </el-table-column>
                        <el-table-column prop="direct_store" label="是否为直营校" >
                                <template scope="scope">
                                        <!-- <span style='font-weight:600'>{{scope.row.direct_store==1?'是':"否"}}</span> -->
                                        <span>是</span>
                                    </template>
                        </el-table-column>
                <el-table-column label="操作" width='80'>
                    <template scope="scope">
                        <el-button type="text" size="small" @click="editCh(scope.row.id)">修改</el-button>
                      <!--   <el-button type="text" size="small" @click="open2(scope.$index, accountData)">删除</el-button> -->
                    </template>
                </el-table-column>
            </el-table>
            <div class="block">
                <el-pagination layout="prev, pager, next" :total="total" :current-page="currentPage" :page-size="pagesize" @current-change="handleCurrentChange">
                </el-pagination>
            </div>
        </div>
    </div>
</template>
<script>
var token
import {
    campusList,
    cityList,
    add_school,
    schoolDetail
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
            // var validatePass = (rule, value, callback) => {
            //     if (value == '') {
            //         callback(new Error('请输入密码'));
            //     } else{
            //         callback()
            //     }
            // };
            var isPhone1 = (rule, value, callback) => {
                var myreg =  /^(((1[0-9]{1}))+\d{9})$/; 
                if (value == '') {
                    callback('请输入手机号')
                } else if (!myreg.test(value)) {
                    callback('请输入有效手机号');
                }else{
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
                currentPage: 1, //页数
                pagesize: 15, //默认每页
                total: 0, //总页数
                in : '', //修改时代表修改的index
                no: false, //取消点击关闭
                accountData: [],
                number: '',
                input2: '',
                options: '', //表单上方的校区select
                options1: '', //表单上方的部门select
                options2: '', //表单上方的职位select
                value: '', //对应校区select的值
                value1: '', //对应部门select的值
                value2: '', //对应职位select的值
                aform: {
                    title: '',
                    city_id: '',
                    areaid: '',
                    addr:'',
                    room_num:'1',
                    fla: '1',
                },
                dialogFormVisible: false,
                formLabelWidth: '110px',
                inputLabelWidth: '200px',
                rules2: {
                    // name: [{
                    //     required: true,
                    //     message: '请输入邮箱地址',
                    //     trigger: 'blur'
                    // }, {
                    //     type: 'email',
                    //     message: '请输入正确的邮箱地址',
                    //     trigger: 'blur,change'
                    // }],
                    title:[
                    {required:true,message: '请输入校区名',trigger: 'blur'}],
                    // sex:[
                    // {required:true,message: '请选择性别',trigger: 'blur'}],
                    // tel:[
                    // { required:true,validator: isPhone1,trigger: 'blur'}],
                    // // pwd:[
                    // // {required:true,trigger: 'blur'}],
                    // did: [{
                    //     required: true,
                    //     validator: nan,
                    //     trigger: 'change'
                    // }],
                    // job_id: [{
                    //     required: true,
                    //     validator: nan,
                    //     trigger: 'change'
                    // }]
                },
                schools: [], //选好城市之后的校区
                loading: false,
                cities: [], //form中的城市
                regions: [] //部门 change之后更新
            }
        },
        methods: {
            // formatter(row, column) {
            //     if (row.school.length != 0) {

            //         let a = row.school.map(item => {
            //             return item.title
            //         })
            //         return a.join(',')
            //     }
            // },
            // handleIconClick() {
            //     this.currentPage = 1;
            //     this.fetchData();
            // },
            // updateList() { //表格上方3个select change之后刷新表格
            //     this.currentPage = 1;
            //     this.fetchData();
            // },
            createCh(formName) { //点击创建按钮
                this.dialogFormVisible = true;
            },
            resetD(){
                this.in = '';
                this.aform = {
                    id: '',
                    title: '',
                    city_id: '',
                    areaid: '',
                    addr: '',
                    room_num:'1',
                    fla: '1'
                };
                this.$refs['aform'].resetFields();
            },
            editCh(id) { //点击就修改
                this.in = id;
                let para = {
                    school_id:id
                }
                schoolDetail(para,token).then(res=>{
                    let data = res.data
                    this.aform = {
                        id: data.id,
                        title: data.title,
                        city_id :data.province-0,
                        areaid: data.areaid-0,
                        addr: data.addr,
                        tel: data.tel,
                        room_num:data.room_num,
                        fla: data.direct_store
                    };
                    setTimeout(() => {
                        this.aform.areaid = data.areaid-0
                    }, 1);
                })
                 this.dialogFormVisible = true;

            },
            // open2(index, data) { //删除账号
            //     this.$confirm('是否确定要删除该账号?', '删除账号', {
            //             customClass: 'redwarn',
            //             confirmButtonText: '确定',
            //             cancelButtonText: '取消',
            //             type: 'warning'
            //         }).then(() => {
            //             let para = {
            //                 aid: data[index].aid
            //             }
            //             delete_account(para, token).then(() => {

            //                 this.fetchData();
            //             })
            //             this.$message({
            //                 type: 'success',
            //                 message: '删除成功!'
            //             });
            //         }).then(() => {
            //             this.beRed();
            //         })
            //         // .catch(() => {
            //         //   this.$message({
            //         //     type: 'info',
            //         //     message: '已取消删除'
            //         //   });          
            //         // });
            // },
            getRegion1(val) {
                this.aform.areaid = '';
                let para = {
                    pid: val
                }
                cityList(token,para).then((res) => { //获取城市
                    this.regions = res.data;
                    // console.log(this.regions)
                })
            },
            addAccount(formName) { //点确定后添加账号
                this.$refs[formName].validate((valid) => {
                    let f = {...this.aform};
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
                    // school_id: this.value,
                    // did: this.value1,
                    // job_id: this.value2,
                    // input: this.input2
                }
                campusList(para, token).then((res) => {
                    this.number = res.data.total;
                    let a = res.data.data;
                    let c = res.data.last_page * this.pagesize;
                    this.total = parseInt(c);
                    this.accountData = a;
                })

            },
            handleCurrentChange: function(val) { //变更页数
                this.currentPage = val;this.backToTop();
                this.fetchData();
            },
        },
        beforeCreate() {
            let user = sessionStorage.getItem('user');
            token = JSON.parse(user).token;
        },
        created() { //创建组件时
            this.fetchData();
            cityList(token).then((res) => { //获取城市
                    this.cities = res.data
                })
            // let cam = {
            //     simple: '1'
            // };
            // campusList(cam, token).then((res) => {//获取校区
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
                    return '创建校区'
                }
                return '修改校区'
            }
        }
}
</script>
<style>
.SchoolManageH1 .el-button--primary {
    background-color: #32a4d3;
    border-color: #32a4d3;
}

#tableSM .el-table td,
#tableSM .el-table th:not(.gutter) {
    padding: 5px 5px;
    text-align: center
}

#tableSM .el-table th>div,
#tableSM .el-table .cell {
    padding-left: 0;
    padding-right: 0;
}

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

.el-dialog .el-dialog__header {
    background-color: #1fb5ad;
    padding: 20px 20px 20px;
}

.el-dialog .el-dialog__title {
    color: white;
}

.block {
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
.oneSelect {
    display: inline-block;
     margin-bottom: 10px;
    margin-left: 10px;
    width: 140px
}

.twoSelect {
   display: inline-block;
     margin-bottom: 10px;
    margin-left: 10px;
    width: 140px
}

.threeSelect {
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

.accountManageDialog .el-dialog__body {
    padding: 20px 20px 0 20px;
}

.accountManageDialog .el-dialog__footer {
    padding: 0 20px 15px;
}
.AMinput{
position:absolute;
top:10px;
right:100px;
width:200px
}
.AM142float {
        width: 142px;
        margin-right: 30px;
        float: left
    }

    .AMfloat {
        width: 142px;
        float: left
    }
</style>
