<template>
<div class="table">
<div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-menu"></i> 客户管理</el-breadcrumb-item>
                <el-breadcrumb-item :to="{ path: '/home' }">学员回访</el-breadcrumb-item>
                 <el-breadcrumb-item >用户资料</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div  class='addUserTitle' >
        <h3>用户资料</h3>
         </div>


        <div>
<el-form ref="form" :model="form"   label-width="90px" style='border:1px solid grey;width:38%'>
  <el-form-item label="姓名:" prop='name'>
    <span>张超</span>
  </el-form-item>
  <el-form-item label="性别:" prop='sex' >
    <span>男</span>
  </el-form-item>
  <el-form-item label="家长:" prop='parent'>
    <el-col :span="4">
    <span>余春娇(妈妈)</span>
    </el-col>
    <el-col class="line" :span="1">&nbsp</el-col>
    <el-col :span="4">
    <span>电话：14837364657</span>
    </el-col>
  </el-form-item>
  <el-form-item label="">
    <el-col :span="4">
    <span>张志明(父亲)</span>
    </el-col>
    <el-col class="line" :span="1">&nbsp</el-col>
    <el-col :span="4">
    <span>电话：14837364657</span>
    </el-col>
  </el-form-item>
  <el-form-item label="渠道来源:" prop='sex' >
    <span>大众点评</span>
  </el-form-item>
  <el-form-item label="校区:" prop='sex' >
    <span>徐汇校区</span>
  </el-form-item>
  <el-form-item label="录入时间:" prop='sex' >
    <span>2017-05-25-12:00</span>
  </el-form-item>
  <el-form-item label="课程顾问(CC):" prop='sex' >
    <span>林俊杰</span>
  </el-form-item>
</el-form>

        </div>
  </div>
</template>
<script>
var user = localStorage.getItem('user');
var token = JSON.parse(user).token;
import { cityList} from '../../api/api';
  export default {
    data() {
      return {
        warning:'*系统中没有该成员',//以后改成调服务显示
        form: {
          name: '',
          sex: '',
          parent:'',
          parent1:'',
          con:'',
          con1:'',
          phone:'',
          phone1: '',
          city: '',
          region: '',
          add: '',
          school: '',
          channel: '',
          referee:''
        },
        cities:[],
        rule: {
          name: [
            { required: true,  message: '请输入姓名',trigger: 'blur' },
          ],
          sex: [
            { required: true, trigger: 'blur' },
          ],
          parent: [
            { required: true, trigger: 'blur' },
          ],
          city: [
            { required: true, trigger: 'blur' },
          ],
          school: [
            { required: true, trigger: 'blur' },
          ],
          channel: [
            { required: true, trigger: 'blur' },
          ],
        },
      }
    },
    methods: {
      onSubmit(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            alert('submit!');
          } else {
            console.log('error submit!!');
            return false;
          }
        });

      }
    },
    computed:{
      options(){
        if(this.form.sex == ''){
          return
        }else if(this.form.sex ==1){
            return [{label:'父子',value:'0'},{label:'母子',value:'1'},{label:'祖孙',value:'2'}]
          }else{
            return [{label:'父女',value:'0'},{label:'母女',value:'1'},{label:'祖孙',value:'2'}]
          }
      }
    },
    created(){
      cityList(token).then((res)=>{
          // console.log(res)
          this.cities = res.data
        })
    }
  }
</script>
<style scoped>
.addUserTitle{
  padding:10px 10px 30px 10px;
}
.el-form-item{
  margin-bottom: 0
}
</style>