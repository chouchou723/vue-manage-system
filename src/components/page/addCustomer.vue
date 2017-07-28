<template>
    <div class="table">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-moban"></i> 客户管理</el-breadcrumb-item>
                <el-breadcrumb-item :to="{ path: '/myResource' }">我的客户</el-breadcrumb-item>
                <el-breadcrumb-item class='ss'>添加客户</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class='addUserTitle'>
            <div style='background:url(../../../static/img/addUser.png) left center/29px 29px no-repeat ;padding-left:30px;'>
                <span style="font-size=24px;font-weight:600">添加客户资料</span></div>
        </div>
        <div>
            <el-form ref="form" :model="form" :rules='rule' label-width="80px" style='background-color:white;padding:20px 0 10px 10px'>
                <el-form-item label="学生姓名" prop='names'>
                    <el-input v-model="form.names" placeholder='请输入学生姓名' style="width:142px"></el-input>
                </el-form-item>
                <el-form-item label="性别" prop='sex'>
                    <el-select v-model="form.sex" placeholder="请选择性别" style="width:142px">
                        <el-option label="男" value="1"></el-option>
                        <el-option label="女" value="2"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="年龄" prop='age'>
                    <el-select v-model="form.age" placeholder="选择" style="width:142px">
                        <el-option label="2" value="2"></el-option>
                        <el-option label="3" value="3"></el-option>
                        <el-option label="4" value="4"></el-option>
                        <el-option label="5" value="5"></el-option>
                        <el-option label="6" value="6"></el-option>
                        <el-option label="7" value="7"></el-option>
                        <el-option label="8" value="8"></el-option>
                        <el-option label="9" value="9"></el-option>
                        <el-option label="10" value="10"></el-option>
                        <el-option label="11" value="11"></el-option>
                        <el-option label="12" value="12"></el-option>
                        <el-option label="13" value="13"></el-option>
                        <el-option label="14" value="14"></el-option>
                        <el-option label="15" value="15"></el-option>
                        <el-option label="16" value="16"></el-option>
                        <el-option label="17" value="17"></el-option>
                        <el-option label="18" value="18"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="联系家长" required>
                    <el-form-item prop="parent" style="width:142px;margin-right:30px;float:left">
                        <el-input v-model="form.parent" placeholder='请输入家长姓名'></el-input>
                    </el-form-item>
                    <el-form-item prop="con" style="width:142px;margin-right:30px;float:left">
                        <el-select v-model="form.con" placeholder="请选择关系">
                            <el-option label="妈妈" value="妈妈"></el-option>
                            <el-option label="爸爸" value="爸爸"></el-option>
                            <el-option label="爷爷" value="爷爷"></el-option>
                            <el-option label="奶奶" value="奶奶"></el-option>
                            <!--  <el-option :label="connect" value="1"></el-option>
      <el-option :label="connect1" value="0"></el-option> -->
                        </el-select>
                    </el-form-item>
                    <el-form-item prop="phone" style="width:142px;float:left">
                        <el-input v-model="form.phone" placeholder='请输入手机号' id='parentPhone' ref="parentPhone"></el-input>
                    </el-form-item>
                </el-form-item>
                <el-form-item label="">
                    <el-form-item prop="parent1" style="width:142px;margin-right:30px;float:left">
                        <el-input v-model="form.parent1" placeholder='请输入家长姓名'></el-input>
                    </el-form-item>
                    <el-form-item prop="con1" style="width:142px;margin-right:30px;float:left">
                        <el-select v-model="form.con1" placeholder="请选择关系">
                            <el-option label="妈妈" value="妈妈"></el-option>
                            <el-option label="爸爸" value="爸爸"></el-option>
                            <el-option label="爷爷" value="爷爷"></el-option>
                            <el-option label="奶奶" value="奶奶"></el-option>
                            <!--  <el-option :label="connect" value="1"></el-option>
      <el-option :label="connect1" value="0"></el-option> -->
                        </el-select>
                    </el-form-item>
                    <el-form-item prop="phone1" style="width:142px;float:left">
                        <el-input v-model="form.phone1" placeholder='请输入手机号'></el-input>
                    </el-form-item>
                    <el-col :span="2">
                        <span style="margin-left:10px;width:200px;color:grey"> (选填)</span>
                    </el-col>
                </el-form-item>
                <el-form-item label="所在地区" required>
                    <el-form-item prop="city_id" style="width:142px;margin-right:30px;float:left">
                        <el-select v-model="form.city_id" filterable placeholder="请选择城市" @change='getRegion'>
                            <el-option v-for="item in cities" :key="item.id" :label="item.city_name" :value="item.id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item prop="area_id" style="width:142px;margin-right:30px;float:left">
                        <el-select v-model="form.area_id" placeholder="请选择城区">
                            <el-option v-for="item in regions" :key="item.id" :label="item.city_name" :value="item.id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item prop="address" style="width:142px;float:left">
                        <el-input v-model="form.address" placeholder='请输入具体地址'></el-input>
                    </el-form-item>
                </el-form-item>
                 <div  id='sourceDiv' style="height:58px" class='readd' >
                <el-form-item label="就近校区" prop='school_id'>
                <span>{{school_name}}</span>
                    <!-- <el-select v-model="form.school_id" placeholder="请选择校区" style="width:142px" readonly>
                        <el-option v-for="item in schools" :key="item.id" :label="item.title" :value="item.id">
                        </el-option>
                    </el-select> -->
                </el-form-item>
                </div>
                <el-form-item label="来源渠道" prop='sour_id'>
                    <el-form-item prop='sour_id' style="width:142px;margin-right:30px;float:left">
                        <el-cascader
    :options="source"
    :props="propsource"
    v-model="form.sour_id"
    :show-all-levels="false"
    
    placeholder="请选择渠道">
  </el-cascader>
                    </el-form-item>
                    <el-form-item prop='referee' style='float:left;width:142px;margin-right:10px'>
                        <el-autocomplete v-if='this.form.sour_id == 4' v-model="form.referee" :fetch-suggestions="querySearchAsync" placeholder="请输入内容" @select="handleSelect">
                        </el-autocomplete>
                    </el-form-item>
                    <el-form-item prop='familys_name' style='float:left;width:100px;'>
                        <span v-if='this.form.sour_id == 4'>家长姓名:{{form.familys_name}}</span>
                    </el-form-item>
                    <el-form-item prop='referral_uid' style="display:none">
                        <span>{{form.referral_uid}}</span>
                    </el-form-item>
                    <el-form-item prop='familys' style="display:none">
                    </el-form-item>
                    <span v-if='nostudent' style="width:200px;color:red;float:left"> {{warning}}</span>
                </el-form-item>
                <el-form-item style='margin-top:30px'>
                    <el-button type="primary" @click="onSubmit('form')">确定</el-button>
                    <el-button @click="back">取消</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>
<script>
var token
import {
    cityList,
    campusList,
    sourceList,
    create_myCustomer,
    repeatStudentList
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
             var isArr = (rule, value, callback) => {
                if (value == '') {
                    callback('请选择')
                } else if (Array.isArray(value)) {
                    callback();
                }
            }
            var isPhone = (rule, value, callback) => {
                var myreg = /^(((1[0-9]{1}))+\d{9})$/; 
                if (value == '') {
                    callback('不能为空且必须唯一')
                } else if (!myreg.test(value)) {
                    callback('请输入有效手机号');
                }else{
                    callback();
                }
            }
            var isPhone1 = (rule, value, callback) => {
                var myreg =  /^(((1[0-9]{1}))+\d{9})$/; 
                if (value == '') {
                    callback()
                } else if (!myreg.test(value)) {
                    callback('请输入有效手机号');
                }else{
                    callback();
                }
            }
            return {
                school_name:'',
                nostudent: false,
                warning: '*系统中没有该成员', //以后改成调服务显示
                form: {
                    names: '',
                    sex: '',
                    age: '',
                    parent: '',
                    parent1: '',
                    con: '',
                    con1: '',
                    phone: '',
                    phone1: '',
                    familys: '',
                    city_id: '',
                    area_id: '',
                    address: '',
                    sour_id: [],
                    referee: '',
                    familys_name: '',
                    referral_uid: '',
                    familys: ''
                },
                cities: [],
                regions: [],
                schools: [],
                source: [],
                studentsList: [],
                propsource:{
          value: 'id',
          label:'names',
          children: '_child'
        },
                rule: {
                    names: [{
                        required: true,
                        message: '请输入姓名',
                        trigger: 'blur'
                    }, ],
                    sex: [{
                        required: true,
                        trigger: 'change'
                    }, ],
                    age: [{
                        required: true,
                        trigger: 'change'
                    }, ],
                    parent: [{
                        required: true,
                        trigger: 'blur'
                    }, ],
                    con: [{
                        required: true,
                        trigger: 'change'
                    }, ],
                    phone: [{
                        required: true,
                        validator: isPhone,
                         // message: '不能为空且必须唯一',
                        trigger: 'blur'
                    }],
                     phone1: [{
                        validator: isPhone1,
                         // message: '不能为空且必须唯一',
                        trigger: 'blur'
                    }],
                    city_id: [{
                        required: true,
                        validator: nan,
                        trigger: 'change'
                    }, ],
                    area_id: [{
                        required: true,
                        validator: nan,
                        trigger: 'change'
                    }, ],
                    address: [{
                        required: true,
                        trigger: 'blur'
                    }, ],
                    sour_id: [{
                        required: true,
                        validator: isArr,
                        trigger: 'change'
                    }, ],
                },
            }
        },
        methods: {
            querySearchAsync(queryString, cb) {
                let para = {
                    input: queryString
                }
                repeatStudentList(token, para).then(res => {
                    // console.log(res.data)
                    if (res.data.length != 0) {
                        this.studentsList = res.data.map(item => {
                            return {
                                referral_uid: item.label.uid,
                                value: item.label.nickname,
                                familys_name: item.label.familys_name,
                                mobile: item.label.mobile
                            }
                        })
                        var studentsList = this.studentsList;
                        if (isNaN(queryString)) {

                            var results = studentsList.filter(item => {
                                return item.value.indexOf(queryString) > -1
                            });
                        } else {
                            var results = studentsList
                        }
                    } else {
                        var results = [];
                        this.nostudent = true;
                    }

                    clearTimeout(this.timeout);
                    this.timeout = setTimeout(() => {
                        cb(results);
                    }, 2000 * Math.random());
                })

            },
            handleSelect(item) {
                this.nostudent = false;
                this.form.familys_name = item.familys_name;
                this.form.referral_uid = item.referral_uid
            },
            back() {
                this.$router.push('/myCustomer');
            },
            getRegion() {
                let para = {
                    pid: this.form.city_id
                }
                cityList(token, para).then((res) => {
                    // console.log(res)
                    this.regions = res.data
                })
            },
            onSubmit(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        if (this.form.parent1 || this.form.con1 || this.form.phone1) {
                            this.form.familys = this.form.parent + '|' + this.form.con + '|' + this.form.phone + ',' + this.form.parent1 + '|' + this.form.con1 + '|' + this.form.phone1
                        } else {
                            this.form.familys = this.form.parent + '|' + this.form.con + '|' + this.form.phone
                        }
                        let para = JSON.parse(JSON.stringify(this.form)) ;
                        para.sour_id =  para.sour_id.join(',');
                        create_myCustomer(para, token).then(res => {
                            // console.log('succ')
                            if (res.code == 0) {
                                this.$message({
                                    message: '创建成功',
                                    type: 'success'
                                });
                                this.$refs.form.resetFields();
                            } else {
                                this.$message.error(res.data);
                                 this.form.phone = '';
                                 this.$refs.parentPhone.$refs.input.focus();
                                 this.$refs.parentPhone.$refs.input.blur();
                                // this.form.sour_id = this.form.sour_id.split(',')
                                return false
                            }
                        })
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });

            }
        },
        computed: {
        },
        beforeCreate() {
            let user = localStorage.getItem('user');
            token = JSON.parse(user).token;
        },
        created() {
            let user = localStorage.getItem('user');
             this.school_name = JSON.parse(user).school_name;
            cityList(token).then((res) => {
                // console.log(res)
                this.cities = res.data
            })
            sourceList(token).then(res => {
                this.source = res.data.slice(1);
            })
            let para1 = {
                    simple: 1
                }
                campusList(para1, token).then(res => {
                    this.schools = res.data
                })
        }
}
</script>
<style>
.addUserTitle {
    padding: 15px 10px 15px 15px;
    background-color: white;
    border-bottom: 1px solid #f3f3f3;
}
.readd{
    pointer-events: none
}
</style>
