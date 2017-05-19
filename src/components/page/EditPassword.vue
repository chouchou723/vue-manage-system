<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-date"></i> 首页</el-breadcrumb-item>
                <el-breadcrumb-item>修改密码</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="form-box">
            <el-form :model="ruleForm2" :rules="rules2" ref="ruleForm2" label-width="100px" class="demo-ruleForm">
            <el-form-item label="邮箱地址" prop="address">
    <el-input readonly v-model='email'></el-input>
  </el-form-item>
  <el-form-item label="密码" prop="pass">
    <el-input type="password" v-model="ruleForm2.pass" auto-complete="off"></el-input>
  </el-form-item>
  <el-form-item label="确认密码" prop="checkPass">
    <el-input type="password" v-model="ruleForm2.checkPass" auto-complete="off"></el-input>
  </el-form-item>
  <el-form-item label="验证码" prop="code">
  <el-col :span="15">
                    <el-input  placeholder="请输入验证码" v-model.number="ruleForm2.code" ></el-input>
  </el-col>
   <el-col :span="9">
   <el-button type="primary" id="codeNumber" @click="getCode">获取邮箱验证码</el-button>
   </el-col>
  </el-form-item>
  <el-form-item  >
    <el-button type="primary" @click="handleSubmit2" style='width:100px'>提交</el-button>
  </el-form-item>
</el-form>
        </div>

    </div>
</template>

<script>
var user = localStorage.getItem('user');
var mail = JSON.parse(user).mail;
import { mailCode } from '../../api/api';
  export default {
    data() {
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          if (this.ruleForm2.checkPass !== '') {
            this.$refs.ruleForm2.validateField('checkPass');
          }
          callback();
        }
      };
      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.ruleForm2.pass) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
      var validCode = (rule,value,callback )=>{
                if (!value ){
                    return callback(new Error('请输入验证码'))
                }
                setTimeout(() => {
                if (!Number.isInteger(value)) {
                callback(new Error('请输入数字值'));
                 } else {
                     if (value != this.receiveCode) {
                     callback(new Error('验证码错误'));
                     } else {
                        callback();
                         }
                      }
              }, 1);
            }

      return {
        email: mail,
        receiveCode:'',
        ruleForm2: {
          pass: '',
          checkPass: '',
          code:''
        },
        rules2: {
          pass: [
            { validator: validatePass, trigger: 'blur' }
          ],
          checkPass: [
            { validator: validatePass2, trigger: 'blur' }
          ],
          code: [
            { validator: validCode, trigger: 'blur' }
          ]
        }
      };
    },
    methods: {
      handleReset2() {
        this.$router.push('/setting');
      },
      handleSubmit2(ev) {
        this.$refs.ruleForm2.validate((valid) => {
          if (valid) {
            alert('submit!');
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      getCode(){
        let self = this;
                let para = {
          mail:this.mail
        };
        //NProgress.start();
        mailCode(para).then((res) => {
          //NProgress.done();
          this.receiveCode = res.mailCode;
        });
      }
    }
  }
</script>

<style scoped>
  #codeNumber{
    float:right!important
  }
</style>