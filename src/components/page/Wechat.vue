<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item :to="{ path: '/' }"><i class="el-icon-date"></i> 首页</el-breadcrumb-item>
                <el-breadcrumb-item>微信绑定</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
<el-row >
  <el-col :span="12" :offset="6">
            <el-form label-width="100px" class="demo-ruleForm" v-if='changewechat'>
  <el-steps :space="300" :active="active">
  <el-step title="更换绑定" ></el-step>
  <el-step title="扫描二维码 关注公众号" ></el-step>
  <el-step title="微信绑定成功" ></el-step>
  </el-steps>

   <el-col  style='text-align:center'>
   <div style="position:relative;height:310px">
   <img class="pre-img" :src="settingsrc" alt="" width="256px" height="256px" style="float:left;border:2px solid grey;border-radius:50%;margin-left:-128px;margin-top:50px" v-if='active==1'>
     <span v-if='active==1' style='width:256px;margin-left:-128px;position:absolute;left:0;bottom:-30px'>{{wechatName}}(微信账号)</span>
     
    <el-button  v-if='active==1' type="primary" style='width:128px;margin-left:-64px;position:absolute;left:0;bottom:-80px' @click='changeWechat'>更换绑定</el-button>
  
   <img class="pre-img" src="../../../static/img/we_04.png" alt="" width="256px" height="270px" style="float:left;margin-left:186px;margin-top:50px" v-if='active==2'>
   <el-input v-model="code" auto-complete="off" placeholder='请输入验证码' style='width:200px;position:absolute;left:0;margin-left:216px;margin-top:330px' v-if='active==2'></el-input>
     <el-button type="primary" style="position:absolute;left:0;margin-left:278px;margin-top:380px" @click='newStep' v-if='active==2'>确 认</el-button>
   <img class="pre-img" src="../../../static/img/gongxi_03.png" alt="" style="float:left;margin-left:496px;margin-top:150px" v-if='active==3'>
   </div>
   
   
  </el-col>
            </el-form>
</el-col>
<el-col :span="12" :offset="6">
            <el-form label-width="100px" class="demo-ruleForm" v-if='!changewechat'>
  <el-steps :space="600" :active="1">
  <el-step title="扫描二维码 关注公众号" ></el-step>
  <el-step title="微信绑定成功" ></el-step>
  </el-steps>
  <el-col  style='text-align:center'>
   <div style="position:relative;height:310px">
   
  
   <img class="pre-img" src="../../../static/img/we_03.png" alt="" width="256px" height="270px" style="float:left;margin-left:-128px;margin-top:50px" v-if='active==1'>
    <el-input v-model="code" auto-complete="off" placeholder='请输入验证码' style='width:200px;float:left;margin-left:50px;margin-top:150px' v-if='active==1'></el-input>
     <el-button type="primary" style="float:left;margin-left:10px;margin-top:150px" @click='newStep' v-if='active==1'>确 认</el-button>
   <img class="pre-img" src="../../../static/img/gongxi_03.png" alt="" style="float:left;margin-left:496px;margin-top:150px" v-if='active==2'>
   </div>
   
   
  </el-col>
            </el-form>
        
  </el-col>

 
</el-row>
        

    </div>
</template>

<script>
var user = localStorage.getItem('user');
var wechat = JSON.parse(user).wechat;
  export default {
    data() {

      return {
        active:1,
        wechatsrc:'../../../static/img/we_03.png'
      };
    },
    methods: {
      newStep(){
        this.active = 2;
      },
      changeWechat(){
        this.active = 2;
      },
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
    },
    computed:{
        changewechat:function(){
          return wechat
        },
        settingsrc(){
                let user = localStorage.getItem('user');
                return JSON.parse(user).avatar;
            },
        wechatName(){
                let user = localStorage.getItem('user');
                return JSON.parse(user).wx_openid;
            }
    }
  }
</script>

<style scoped>
  #codeNumber{
    float:right!important
  }
</style>