<template>
<div class="table">
<div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-menu"></i> 客户管理</el-breadcrumb-item>
                <el-breadcrumb-item :to="{ path: '/home' }">我的资源</el-breadcrumb-item>
                 <el-breadcrumb-item >添加客户</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div  class='addUserTitle' >
        <h2>添加用户资料</h2>
         </div>


        <div>
<el-form ref="form" :model="form"  :rules='rule' label-width="80px">
  <el-form-item label="学生姓名" prop='name'>
    <el-input v-model="form.name" placeholder='请输入学生姓名'  style="width:142px" ></el-input>
  </el-form-item>
  <el-form-item label="性别" prop='sex' >
    <el-select v-model="form.sex" placeholder="请选择性别" style="width:142px">
      <el-option label="男" value="1"></el-option>
      <el-option label="女" value="0"></el-option>
    </el-select>
  </el-form-item>

  
    <el-form-item label="年龄"  prop='age' >
    <el-select v-model="form.age" placeholder="选择"  style="width:142px">
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
  
  
  
  <el-form-item label="联系家长" prop='parent'>
    
    <el-input v-model="form.parent" placeholder='请输入家长姓名'  style="width:142px;margin-right:30px;float:left"></el-input>
   
  
    <el-select v-model="form.con" placeholder="请选择关系" prop='con' style="width:142px;margin-right:30px;float:left" >
    <el-option
      v-for="item in options"
      :key="item.value"
      :label="item.label"
      :value="item.value">
    </el-option>
     <!--  <el-option :label="connect" value="1"></el-option>
      <el-option :label="connect1" value="0"></el-option> -->
    </el-select>
   
   
    <el-input v-model="form.phone"  placeholder='请输入手机号' prop='phone' style="width:142px;float:left"></el-input>
   
  </el-form-item>
  <el-form-item label="">
    <el-input v-model="form.parent1" placeholder='请输入家长姓名' prop='parent1' style="width:142px;margin-right:30px;float:left"></el-input>
    <el-select v-model="form.con1" placeholder="请选择关系" prop='con1' style="width:142px;margin-right:30px;float:left" >
      <el-option
      v-for="item in options"
      :key="item.value"
      :label="item.label"
      :value="item.value">
    </el-option>
    </el-select>
    <el-input v-model="form.phone1" placeholder='请输入手机号' prop='phone1'  style="width:142px;float:left"></el-input>
    <el-col :span="2">
   <span style="margin-left:10px;width:200px;color:grey" > (选填)</span>
    </el-col>
  </el-form-item>

<el-form-item label="所在地区" prop='city'>
    
    <el-select v-model="form.city" filterable placeholder="请选择城市" style="width:142px;margin-right:30px;float:left">
    <el-option-group
                        v-for="group in cities"
                        :key="group.city_name"
                        :label="group.city_name">
                        <el-option
                          v-for="item in group._child"
                          :key="item.id"
                          :label="item.city_name"
                          :value="item.id">
                        </el-option>
                      </el-option-group>
      <!-- <el-option
      v-for="item in cities"
      :key="item.value"
      :label="item.label"
      :value="item.value">
    </el-option> -->
    </el-select>
    <el-select v-model="form.region" placeholder="请选择城区" prop='region' style="width:142px;margin-right:30px;float:left">
      <el-option label="徐汇" value="1"></el-option>
      <el-option label="静安" value="0"></el-option>
    </el-select>
    <el-select v-model="form.add" placeholder="请选择地标" prop='add' style="width:142px;float:left">
      <el-option label="徐家汇" value="1"></el-option>
      <el-option label="美罗城" value="0"></el-option>
    </el-select>
  </el-form-item>

  <el-form-item label="就近校区" prop='school'>
    <el-select v-model="form.school" placeholder="请选择校区" style="width:142px" >
      <el-option label="徐汇校区" value="1"></el-option>
      <el-option label="静安校区" value="0"></el-option>
    </el-select>
  </el-form-item>

  <el-form-item label="来源渠道" prop='channel'>
    <el-select v-model="form.channel" placeholder="请选择渠道"  style="width:142px;margin-right:30px;float:left">
      <el-option label="转介绍" value="1"></el-option>
      <el-option label="上门" value="0"></el-option>
       <el-option label="线上" value="2"></el-option>
    </el-select>
    <el-input v-if='this.form.channel == 1' v-model="form.referee" placeholder='请输入学生姓名' @blur='searchStudent' style="width:142px;float:left" prop='referee'></el-input>
   
   <span v-if='nostudent' style="margin-left:10px;width:200px;color:red;float:left" > {{warning}}</span>
  </el-form-item>
  <el-form-item style='margin-top:60px'>
    <el-button type="primary" @click="onSubmit('form')">确定</el-button>
    <el-button>取消</el-button>
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
        nostudent:false,
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

      },
      searchStudent(){
        if(this.form.referee){
          this.nostudent = true; //调服务查询
        }
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
<style>
.addUserTitle{
  padding:10px 10px 30px 10px;
}
</style>