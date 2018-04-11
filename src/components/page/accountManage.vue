<template>
    <div>
        <!-- <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-my-shezhi"></i> 组织架构</el-breadcrumb-item>
                <el-breadcrumb-item class='ss'>账号管理</el-breadcrumb-item>
            </el-breadcrumb>
        </div> -->
        <div class='accou'>
            <div class="h1">
                <h3 class='accountH2'>
               账号管理
               <span v-if="number==='0'" style="font-size:14px;color: #bdb8b8;">加载中...</span>
               <span v-else>({{number}}人)</span>
                </h3>
                <div class='oneSelect'>
                    <el-select v-model="value" clearable placeholder="选择校区" filterable @change="updateList">
                        <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                        </el-option>
                    </el-select>
                </div>
                <div class='twoSelect'>
                    <el-select v-model="value1" clearable placeholder="选择部门" @change="updateJobList1" >
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
                <div class='threeSelect'>
                    <el-select v-model="value3"  placeholder="选择帐号类型" @change="updateList">
                        <el-option label="正常" value="0"></el-option>
                        <el-option label="停用" value="1"></el-option>
                    </el-select>
                </div>
                <div class='AMinput'>
                    <el-input placeholder="请输入手机号或姓名" icon="search" v-model="input2" :on-icon-click="handleIconClick" @keyup.enter.native="handleIconClick">
                    </el-input>
                </div>
                <el-button type="primary" size="mid" class='buttonAdd' @click="createCh('aform')" v-if="!code.includes('school')">添加账号</el-button>
            </div>
            <el-dialog :title="alter" :visible.sync="dialogFormVisible" :close-on-click-modal="no" custom-class='accountManageDialog' top='9%'  @close='resetD'>
                <el-form :model="aform" :rules="rules2" ref="aform">
                    <el-form-item label="登录账号" :label-width="formLabelWidth" prop="name">
                        <el-input v-model="aform.name" placeholder='请输入邮箱地址' :style='{width:inputLabelWidth}'></el-input>
                    </el-form-item>
                    <el-form-item label="姓名" :label-width="formLabelWidth" prop="uname">
                        <el-input v-model="aform.uname" auto-complete="off" placeholder='请输入用户姓名' :style='{width:inputLabelWidth}'></el-input>
                    </el-form-item>
                    <el-form-item label="性别" :label-width="formLabelWidth" prop="sex">
                        <el-select v-model="aform.sex" :style='{width:inputLabelWidth}'>
                            <el-option label="男" value="1"></el-option>
                            <el-option label="女" value="2"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="手机号码" :label-width="formLabelWidth" prop="tel">
                        <el-input v-model="aform.tel" auto-complete="off" placeholder='请输入手机号码' :style='{width:inputLabelWidth}'></el-input>
                    </el-form-item>
                    <el-form-item label="所属校区" :label-width="formLabelWidth" prop="region" style='display:inline-block' required>
                        <el-select v-model="aform.region"  filterable :style='{width:inputLabelWidth}' @change='campusGet' clearable>
                         <el-option v-for="item in cities" :key="item.id" :label="item.city_name" :value="item.id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item :label-width="formLabelWidth" prop="school" style='display:inline-block;margin-left:-100px'>
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
                    </el-form-item>
                    <el-form-item label="使用状态" :label-width="formLabelWidth" prop="fla">
                        <el-select v-model="aform.fla" :style='{width:inputLabelWidth}'>
                            <el-option label="正常" value="0"></el-option>
                            <el-option label="停用" value="1"></el-option>
                        </el-select>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button type="primary" @click="addAccount('aform')">确 定</el-button>
                    <el-button @click="dialogFormVisible = false">取 消</el-button>
                </div>
            </el-dialog>
            <!-- 新版 -->
            <!-- <el-dialog :title="alter" :visible.sync="dialogFormVisible" :close-on-click-modal="no" custom-class='accountManageDialog' top='9%' size='large' @close='resetD'>
                <el-form :model="aform" :rules="rules2" ref="aform">
                    <el-form-item label="登录账号" :label-width="formLabelWidth" prop="name">
                        <el-input v-model="aform.name" placeholder='请输入邮箱地址' :style='{width:inputLabelWidth}'></el-input>
                    </el-form-item>
                    <el-form-item label="姓名" :label-width="formLabelWidth" prop="uname">
                        <el-input v-model="aform.uname" auto-complete="off" placeholder='请输入用户姓名' :style='{width:inputLabelWidth}'></el-input>
                    </el-form-item>
                    <el-form-item label="性别" :label-width="formLabelWidth" prop="sex">
                        <el-select v-model="aform.sex" :style='{width:inputLabelWidth}'>
                            <el-option label="男" value="1"></el-option>
                            <el-option label="女" value="2"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="手机号码" :label-width="formLabelWidth" prop="tel">
                        <el-input v-model="aform.tel" auto-complete="off" placeholder='请输入手机号码' :style='{width:inputLabelWidth}'></el-input>
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
                    </el-form-item>
                    <el-form-item label="角色" :label-width="formLabelWidth"  prop="char" style='display:inline-block;width:80%'>
                            <div v-for="(a, index) in aform.char" :class="[index !=0?'male':'']">
                                <el-form-item style='display:inline-block;width:120px'>
                                    <el-select v-model="a.character" placeholder="请选择角色" @change='changeReset1("method")'>
                                        <el-option v-for="item in payMethods" :key="item.roleid" :label="item.name" :value="item.roleid">
                                        </el-option>
                                    </el-select>
                                </el-form-item>
                                <el-form-item label="所属校区"  prop="region" style='display:inline-block;width:290px'>
                                    <el-select v-model="a.region"  filterable :style='{width:inputLabelWidth}' @change='campusGet' clearable>
                                     <el-option v-for="item in cities" :key="item.id" :label="item.city_name" :value="item.id">
                                        </el-option>
                                    </el-select>
                                </el-form-item>
                                <el-form-item :label-width="formLabelWidth" prop="school" style='display:inline-block;'>
                                    <el-select v-model="a.school"  multiple filterable remote placeholder="请输入关键词" :remote-method="remoteMethod" :loading="loading">
                                        <el-option v-for="item in schools" :key="item.value" :label="item.label" :value="item.value">
                                        </el-option>
                                    </el-select>
                                </el-form-item>
                                <span @click='addPay' class='addPay' v-if='index==0'>添加角色</span>
                                <span @click='deletePay' class='deletePay' v-else>删除</span>
                                <div style="clear:both"></div>
                            </div>
                        </el-form-item>
                    
                    <el-form-item label="使用状态" :label-width="formLabelWidth" prop="fla">
                        <el-select v-model="aform.fla" :style='{width:inputLabelWidth}'>
                            <el-option label="正常" value="0"></el-option>
                            <el-option label="停用" value="1"></el-option>
                        </el-select>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button type="primary" @click="addAccount('aform')">确 定</el-button>
                    <el-button @click="dialogFormVisible = false">取 消</el-button>
                </div>
            </el-dialog> -->
        </div>
        <div id="tableAM">
            <el-table :data="accountData"  style='width:100%'>
                <el-table-column prop="avatar" label="头像" width='70'>
                    <template scope="scope">
                        <span><img :src="scope.row.avatar" alt="" width="47" height='47' style="border-radius:50%;margin-bottom:-7px;border: 1px solid gainsboro;"></span>
                    </template>
                </el-table-column>
                <el-table-column prop="name" label="登录名" >
                    <template scope="scope">
                        <span style='font-weight:600'>{{scope.row.name}}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="uname" label="姓名" width='90'>
                </el-table-column>
                <el-table-column prop="tel" label="手机" width='120'>
                </el-table-column>
                <el-table-column prop="school" label="校区" :formatter='formatter'>
                </el-table-column>
                <el-table-column prop="job_name" label="职位" width='100'>
                </el-table-column>
                <el-table-column prop="department_name" label="部门" width='80'>
                </el-table-column>
                <el-table-column prop="last_login_time" label="最近登录时间">
                </el-table-column>
                <el-table-column prop="login_count" label="登录次数" width='80'>
                </el-table-column>
                <el-table-column prop="status" label="使用状态" width='80' column-key='status'>
                    <template scope="scope">
                        <span :style="scope.row.status=='停用'?'color:red':'color:black'">{{scope.row.status}}</span>
                    </template>
                </el-table-column>
                <el-table-column label="操作" width='80' v-if="!code.includes('school')">
                    <template scope="scope">
                        <el-button type="text" size="small" @click="editCh(scope.$index, accountData)">修改</el-button>
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
var token,user
import {
    account,
    campusList,
    cityList,
    sdjList,
    departList,
    put_account,
    create_account,
    accountType,
    character,
    // list_account,
    // delete_account,
    department
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
            var isArray = (rule, value, callback) => {
                if (value.length==0) {
                    callback('请选择校区')
                } else if (value.length!=0) {
                    callback();
                }else{
                    callback('请选择校区')
                }
            }
            var isChar = (rule, value, callback) => {
                let a = this.aform.char.every(item => {
                    return item.character != ''
                })
                if (!a) {
                    callback('请选择角色')
                } else {
                    callback();
                }
                // if (value.length==0) {
                //     callback('请选择校区')
                // } else if (value.length!=0) {
                //     callback();
                // }else{
                //     callback('请选择校区')
                // }
            }
            var isName = (rule, value, callback) => {
                var myreg = /^[\u4e00-\u9fa5a-zA-Z]+$/;
                if (value == '') {
                    callback('请输入姓名')
                } else if (!myreg.test(value)) {
                    callback('请输入有效的姓名');
                } else {
                    callback();
                }
            }
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
            return {
                charData:[],
                code:'',
                currentPage: 1, //页数
                pagesize: 15, //默认每页
                total: 0, //总页数
                in : '', //修改时代表修改的index
                no: false, //取消点击关闭
                accountData: [],
                number: '0',
                input2: '',
                options: '', //表单上方的校区select
                options1: '', //表单上方的部门select
                options2: '', //表单上方的职位select
                options3: '', //表单上方的帐号类型select
                value: '', //对应校区select的值
                value1: '', //对应部门select的值
                value2: '', //对应职位select的值
                value3: '0',
                aform: {
                    uname: '',
                    name: '',
                    sex: '',
                    tel: '',
                    char:[{character:'',region:'',school:[]}],

                    // pwd: '',
                    region: '',
                    school: [],
                    did: '',
                    job_id: '',
                    fla: '0'
                },
                dialogFormVisible: false,
                formLabelWidth: '110px',
                inputLabelWidth: '200px',
                rules2: {
                    name: [{
                        required: true,
                        message: '请输入邮箱地址',
                        trigger: 'blur'
                    }, {
                        type: 'email',
                        message: '请输入正确的邮箱地址',
                        trigger: 'blur,change'
                    }],
                    uname:[
                    {required:true,
                        // message: '请输入姓名',
                        validator: isName,
                        trigger: 'blur'}],
                    sex:[
                    {required:true,message: '请选择性别',trigger: 'blur'}],
                    tel:[
                    { required:true,validator: isPhone1,trigger: 'blur'}],
                    // pwd:[
                    // {required:true,trigger: 'blur'}],
                    did: [{
                        required: true,
                        validator: nan,
                        trigger: 'change'
                    }],
                    char:[{
                        required: true,
                        validator: isChar,
                        trigger: 'change'
                    }],
                    region: [{
                        required: true,
                        validator: nan,
                        trigger: 'change'
                    }],
                    job_id: [{
                        required: true,
                        validator: nan,
                        trigger: 'change'
                    }],
                    school:[{
                        required: true,
                        validator: isArray,
                        trigger: 'change'
                    }]
                },
                schools: [], //选好城市之后的校区
                loading: false,
                cities: [], //form中的城市
                jobs: [] //部门 change之后更新
            }
        },
        methods: {
            changeReset1(val){
                if(val==='money'){
                    this.$refs['aform'].validate((valid) => {})
                }else{
                    this.$refs['aform'].validateField(val);
                }
            },
            addPay() {
                this.aform.char.push({character:'',region:'',school:[]})
            },
            deletePay() {
                this.aform.char.pop();
                this.changeReset1('char');
            },

            formatter(row, column) {
                if (row.school.length != 0) {

                    let a = row.school.map(item => {
                        return item.title
                    })
                    return a.join(',')
                }
            },
            handleIconClick() {
                this.currentPage = 1;
                this.fetchData();
            },
            updateList() { //表格上方3个select change之后刷新表格
                this.currentPage = 1;
                this.fetchData();
            },
            updateJobList() {//部门变更后,刷新职位
                // this.aform.job_id = ''
                let para = {
                    did: this.aform.did
                };
                departList(para, token).then((res) => {
                    if(res.data[0]._child){

                        this.jobs = res.data[0]._child.map(item => {
                            return {
                                value: item.job_id,
                                label: item.full_name
                            };
                        });
                    }
                })
            },
            updateJobList1() {//部门变更后,刷新职位
                // this.aform.job_id = ''
                this.value2=''
                if(this.value1!==''){

                    let para = {
                        did: this.value1
                    };
                    departList(para, token).then((res) => {
                        if(res.data[0]._child){
    
                            this.options2 = res.data[0]._child
                        }
                    })
                }else{
                    sdjList(token).then((res) => {//获取职位
                    this.options2 = res.data.job
                })
                }
                this.fetchData()
            },
            createCh(formName) { //点击创建按钮
                this.dialogFormVisible = true;
            },
            resetD(){
                this.in = '';
                this.aform = {
                    aid: '',
                    uname: '',
                    name: '',
                    sex: '',
                    tel: '',
                    checkPass: '',
                    region: '',
                    school: [],
                    did: '',
                    job_id: '',
                    fla: '0'
                };
                this.$refs['aform'].resetFields();
            },
            editCh(index, data) { //点击就修改
                this.in = index;
                if (data[index].did) {
                    let para = {
                        did: data[index].did
                    };
                    departList(para, token).then((res) => {
                            this.jobs = res.data[0]._child.map(item => {
                                return {
                                    value: item.job_id,
                                    label: item.full_name
                                };
                            });
                        }) //假如有部门,必须刷新职位，方能更换同部门的不同职位
                }
                let schoolData = data[index].school.length == 0 ? [] : data[index].school.map(item=>{return item.id});
                let citiId = data[index].school.length == 0 ?'':data[index].school[0].city_id.substring(0,2)
                this.aform = {
                    aid: data[index].aid,
                    uname: data[index].uname,
                    name: data[index].name,
                    sex: data[index].sex,
                    tel: data[index].tel,
                    region:  citiId-0,
                    school: schoolData,
                    did: data[index].did - 0,
                    job_id: data[index].job_id - 0,
                    fla: data[index].fla
                };
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
            campusGet() { //城市change之后获取校区
                let para = {
                    simple: '1',
                    city_id: this.aform.region
                };
                campusList(para, token).then((res) => {
                    // console.log(res)
                    let a = res.data;
                    this.schools = a.map(item => {
                        return {
                            value: item.id,
                            label: item.title
                        };
                    });
                })
            },
            remoteMethod(query) { //远程搜索，录入时进行过滤
                if (query !== '') {
                    this.loading = true;
                    setTimeout(() => {
                        this.loading = false;
                        this.schools = this.options.filter(item => {
                            return item.label.toLowerCase()
                                .indexOf(query.toLowerCase()) > -1;
                        });
                    }, 200);
                } else {
                    this.schools = [];
                }
            },
            addAccount(formName) { //点确定后添加账号
                this.$refs[formName].validate((valid) => {
                    let f = {...this.aform};
                    f.school_id = f.school.join(',');
                    let i = this.in;
                    if (valid) {
                        if (i !== '') {
                            put_account(f, token).then(res => {
                                if(res.code ==0){
                                 this.$message({
                                    message: '修改成功',
                                    type: 'success'
                                });   
                                this.fetchData();
                                this.dialogFormVisible = false;
                                }else{
                                    this.$message({
                                type: 'error',
                                message: res.message
                            });
                                }
                            })
                        }else {
                            create_account(f, token).then(res => {
                               if(res.code ==0){
                                 this.$message({
                                    message: '创建成功',
                                    type: 'success'
                                });   
                                this.fetchData();
                                this.dialogFormVisible = false;
                                }else{
                                    this.$message({
                                type: 'error',
                                message: res.message
                            });
                                }
                            })
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
                    school_id: this.value,
                    did: this.value1,
                    job_id: this.value2,
                    status: this.value3,
                    input: this.input2
                }
                account(para, token).then((res) => {
                    this.number = res.total;
                    let a = res.data;
                    let c = res.last_page * this.pagesize;
                    this.total = parseInt(c);
                    this.accountData = a;
                    let arr = [];
                })

            },
            handleCurrentChange: function(val) { //变更页数
                this.currentPage = val;this.backToTop();
                this.fetchData();
            },
        },
        beforeCreate() {
            user = sessionStorage.getItem('user');
            token = JSON.parse(user).token;
        },
        created() { //创建组件时
            this.code = JSON.parse(user).job ? JSON.parse(user).job.code : '';
            this.fetchData();
            let cam = {
                simple: '1',
                type:'am'
            };
            campusList(cam, token).then((res) => {//获取校区
                let a = res.data.map(item => {
                    return {
                        value: item.id,
                        label: item.title
                    };
                });
                this.options = a
                this.schools = a//会被动态修改
            }).then(() => {
                department(token).then(res => { //获取部门
                    this.options1 = res.data.map(item => {
                        return {
                            label: item.full_name,
                            value: item.job_id
                        }
                    })
                })
            }).then(() => {
                character(token).then((res) => {
            this.charData = res.data;
            console.log(this.charData)
        })
                sdjList(token).then((res) => {//获取职位
                    this.options2 = res.data.job
                })
            }).then(() => {
                cityList(token).then((res) => { //获取城市
                    this.cities = res.data
                })
            })
        },
        computed: {
            payMethods() {
                let m = [...this.charData]
                let l = this.aform.char.length
                this.aform.char.map((item, index) => {
                    m = m.filter(i => {
                        return i.roleid != item.character
                    })
                })
                return m
            },
            alter: function() {
                if (this.in === '') {
                    return '创建账号'
                }
                return '修改账号'
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

.block {
    text-align: center;
    margin-top: 10px;
}

.accou {
    width: 100%;
    position: relative;
    height: 45px;
    background-color: white;
  margin-top:0px;
  padding-top:10px;
  margin-bottom: 5px;
  border-radius: 5px;
}
.accountH2{
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
    width: 110px
}

.threeSelect {
    display: inline-block;
     margin-bottom: 10px;
    margin-left: 10px;
    width: 110px
}

.buttonAdd {
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
/* position:absolute;
top:10px;
right:100px;
width:200px */
display: inline-block;
     margin-bottom: 10px;
    margin-left: 10px;
    width: 200px
}
.addPay {
        /* position: absolute;
        top: 0;
        left: 400px; */
        color: #1fb5ad;
        margin-left: 20px
        
    }

    .addPay:hover {
        cursor: pointer;
    }

    .deletePay {
        /* float: left; */
        color: #f29c9c;
        margin-left: 20px
    }

    .deletePay:hover {
        cursor: pointer;
    }
    .male {
        /* margin-left: 76px; */
        margin-top: 22px;
    }
</style>
