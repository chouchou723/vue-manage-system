<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item  :to="{ path: '/Index'}"><i class="el-icon-date"></i> 首页</el-breadcrumb-item>
                <el-breadcrumb-item class='ss'>微信绑定</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
         <div class='wechatT'>
      <h3 class='wechatH3'>{{wechatTitle}}
      <span  v-if='!this.changewechat' style="margin-left:31%;color:#f16060">**请绑定微信，用于登录及接收工作事宜**</span>
      </h3>
  </div>
  <div>
      
        <el-row style='background-color:white;padding:20px 0 150px'>
            <el-col :span="12" :offset="6">
                <el-form label-width="100px" class="demo-ruleForm" v-if='changewechat'>
                    <el-steps :space="300" :active="active">
                        <el-step title="更换绑定"></el-step>
                        <el-step title="扫描二维码 关注公众号"></el-step>
                        <el-step title="微信绑定成功" style='width:100px'></el-step>
                    </el-steps>
                    <el-col style='text-align:center'>
                        <div style="position:relative;height:310px">
                            <img class="pre-img" :src="settingsrc" alt="" width="256px" height="256px" style="float:left;border:2px solid grey;border-radius:50%;margin-left:-128px;margin-top:50px" v-if='active==1'>
                            <span v-if='active==1' style='width:256px;margin-left:-128px;position:absolute;left:0;bottom:-30px'></span>
                            <el-button v-if='active==1' type="primary" style='width:128px;margin-left:-64px;position:absolute;left:0;bottom:-80px' @click='changeWechat'>更换绑定</el-button>
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
                    <el-steps :space="600" :active="active">
                        <el-step title="扫描二维码 关注公众号"></el-step>
                        <el-step title="微信绑定成功" style='width:100px'></el-step>
                    </el-steps>
                    <el-col style='text-align:center'>
                        <div style="position:relative;height:310px">
                            <img class="pre-img" src="../../../static/img/we_03.png" alt="" width="256px" height="270px" style="float:left;margin-left:-128px;margin-top:50px" v-if='active==1'>
                            <el-input v-model="code" auto-complete="off" placeholder='请输入验证码' style='width:200px;float:left;margin-left:50px;margin-top:150px' v-if='active==1'></el-input>
                            <el-button type="primary" style="float:left;margin-left:10px;margin-top:150px" @click='newStep1' v-if='active==1'>确 认</el-button>
                            <img class="pre-img" src="../../../static/img/gongxi_03.png" alt="" style="float:left;margin-left:496px;margin-top:150px" v-if='active==2'>
                        </div>
                    </el-col>
                </el-form>
            </el-col>
        </el-row>
  </div>
    </div>
</template>
<script>
var user, token, wechat;
import {
    qCode
} from '../../api/api';
export default {
    data() {

            return {
                active: 1,
                wechatsrc: '../../../static/img/we_03.png',
                code: ''
            };
        },
        methods: {
            newStep() {
                let para = {
                    code: this.code
                }
                qCode(para, token).then(res => {
                    if (res.code == 0) {

                        this.active = 3;
                    } 
                    return res
                }).then(res=>{
                     if(res.code == 0){
                                localStorage.removeItem('user');
                                this.$router.go();
                                this.$router.push('/login');
                            // this.$router.push('/Index');
                            }else {
                        this.$message({
                            type: 'error',
                            message: res.message
                        });
                    }
                })
            },
            newStep1() {
                let para = {
                    code: this.code
                }
                qCode(para, token).then(res => {
                    if (res.code == 0) {

                        this.active = 2;
                    } else {
                        this.$message({
                            type: 'error',
                            message: res.message
                        });
                    }
                })
            },
            changeWechat() {
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
            getCode() {
                let self = this;
                let para = {
                    mail: this.mail
                };
                //NProgress.start();
                mailCode(para).then((res) => {
                    //NProgress.done();
                    this.receiveCode = res.mailCode;
                });
            }
        },
        computed: {
            wechatTitle(){
                if(wechat){
                    return '更换微信绑定'
                }else{
                    return '微信绑定'
                }
            },
            changewechat() {
                return wechat
            },
            settingsrc() {
                // let user = localStorage.getItem('user');
                return JSON.parse(user).avatar;
            },
            wechatName() {
                // let user = localStorage.getItem('user');
                return JSON.parse(user).wx_openid;
            }
        },
        beforeCreate() {
            user = localStorage.getItem('user');
            token = JSON.parse(user).token;
            wechat = JSON.parse(user).wechat;
        }
}
</script>
<style scoped>
#codeNumber {
    float: right!important
}
.wechatT{
     width: 100%;
    position: relative;
    height: 35px;
    background-color: white;
  margin-top:30px;
  padding-top:10px;
  margin-bottom: 10px;
  border-radius: 5px;
}
.wechatH3{
    margin-bottom:15px;
    margin-left:10px;
}
</style>
