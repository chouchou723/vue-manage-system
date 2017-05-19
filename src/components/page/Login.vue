<template>
    <div class="login-wrap">
        <!-- <div class="ms-title">Panda System</div> -->
        <div class="ms-login">
        <img class= 'ms-title'src="../../img/登录页-邮箱.png" alt="">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="0px" class="demo-ruleForm" v-bind:class='{hidden:ruleForm.hidden}'>
                <el-form-item prop="username">
                    <el-input type='email' v-model="ruleForm.username" placeholder="请输入邮箱"></el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input type="password" placeholder="请输入密码" v-model="ruleForm.password" @keyup.enter.native="submitForm('ruleForm')"></el-input>
                </el-form-item>
                <el-form-item  prop="code">
                 <el-col :span="15">
                    <el-input  placeholder="请输入验证码" v-model.number="ruleForm.code" ></el-input>
                    </el-col>
                     <el-col :span="7" id='codeNumber' @click.native='change'>
                     <!-- <div @click='change'> -->
                        <span>{{codeNumber1}}</span>
                        <span>{{codeNumber2}}</span>
                        <span> {{codeNumber3}}</span>
                        <span>{{codeNumber4}}</span>
                     <!-- </div> -->
                     </el-col>
                </el-form-item>
                <div class="login-btn">
                    <el-button type="success" @click="submitForm('ruleForm')">登录</el-button>
                </div>
                <p style="font-size:14px;line-height:30px;text-align:center"><a id='forget'href="https://www.baidu.com">忘记密码？</a></p>
                <div class="wechatlogin">
                    
                <img src="../../img/登录页_02.png" height="14" width="380" alt="">
                </div>
                <div class="wechat" @click='switchWechat'>
                    
                    <img style=''src="../../img/登录页_06.png" height="50" width="50" alt="">
                </div>
            </el-form>
            <div class="mail"  v-bind:class='{display:ruleForm.isDisplay}'>
                
            <img src="../../img/mail.png"  alt="">
            <div class="maillogin">
                    
                <img src="../../img/登录页_03.png" height="14" width="380" alt="">
                </div>
                <div class="maillog" @click='switchMail'>
                    
                    <img style=''src="../../img/登录页_07.png" height="50" width="50"  alt="">
                </div>
            </div>
        </div>
    </div>
</template>

<script>
        import { requestLogin } from '../../api/api';
        var color="";
        var str="0123456789abcdef";
        var span=document.getElementsByTagName("span");
        window.onload=randomNumber;
        function randomNumber(){
            for(var i=0;i<4;i++){//生成四位数
                for(var j=0;j<6;j++){//随机改变每个数字的颜色
                     color+=str.substr(parseInt(Math.random()*str.length),1);//取颜色(循环，每次提取一位，进行拼接组成6为颜色的值)
                }
                span[i].style.color=("#"+color);//随机改变每个span的颜色
                color="";
             }
         }

    export default {
        data: function(){
             // var correct = this.codeNumber1*1000+this.codeNumber2*100+this.codeNumber3*10+this.codeNumber4*1;
            var valid = (rule,value,callback )=>{
                if (!value ){
                    return callback(new Error('请输入验证码'))
                }
                setTimeout(() => {
                if (!Number.isInteger(value)) {
                callback(new Error('请输入数字值'));
                 } else {
                     if (value != this.correct) {
                     callback(new Error('验证码错误'));
                     } else {
                        callback();
                         }
                      }
              }, 1);
            }
            return {
                logining: false,
                codeNumber1:Math.floor(Math.random()*9)+1,
                codeNumber2:Math.floor(Math.random()*9)+1,
                codeNumber3:Math.floor(Math.random()*9)+1,
                codeNumber4:Math.floor(Math.random()*9)+1,
                ruleForm: {
                    username: '',
                    password: '',
                    code:'',
                    hidden:false,
                    isDisplay:true

                },
                rules: {
                    username: [
                     { required: true, message: '请输入邮箱地址', trigger: 'blur' },
                     { type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur,change' }
                    ],
                    password: [
                        { required: true, message: '请输入密码', trigger: 'blur' }
                    ],
                    code: [
                        {required: true, validator:valid,trigger:'blur'}
                    ]
                }
            }
        },
        computed:{
             _codeNumber1: {
            set: function(value) {
                this.codeNumber1 = value;
            },
            get: function() {
                return this.codeNumber1
            }
        },
             _codeNumber2: {
            set: function(value) {
                this.codeNumber2 = value;
            },
            get: function() {
                return this.codeNumber2
            }
        },
            _codeNumber3: {
            set: function(value) {
                this.codeNumber3 = value;
            },
            get: function() {
                return this.codeNumber3
            }
        },
            _codeNumber4: {
            set: function(value) {
                this.codeNumber4 = value;
            },
            get: function() {
                return this.codeNumber4
            }
        },
            correct:function(){
                return this.codeNumber1*1000+this.codeNumber2*100+this.codeNumber3*10+this.codeNumber4*1;
            }
        },

        methods: {
            submitForm(formName) {
                const self = this;
                self.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.logining = true;
                        var loginParams = {username:this.ruleForm.username,password:this.ruleForm.password};
                        requestLogin(loginParams).then(data=>{
                            this.logining = false;
                            let{msg,code,user} = data;
                            if(code !==200){
                                this.$message({
                                    message:msg,
                                    type:'error'
                                });
                            }else{
                                localStorage.setItem('user',JSON.stringify(user));
                                self.$router.push('/home');

                            }
                        });
                        
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            switchWechat(){
                this.ruleForm.hidden = true;
                this.ruleForm.isDisplay = false;
                
            } ,
            switchMail(){
                this.ruleForm.hidden = false;
                this.ruleForm.isDisplay = true;
                
            },
            change(){
                this._codeNumber1 = Math.floor(Math.random()*9)+1;
                 this._codeNumber2 = Math.floor(Math.random()*9)+1;
                  this._codeNumber3 = Math.floor(Math.random()*9)+1;
                   this._codeNumber4 = Math.floor(Math.random()*9)+1;
                randomNumber();
            }
        },
        mounted(){
            this.change()
        }
    }
</script>

<style scoped>
    .login-wrap{
        position: relative;
        width:100%;
        height:100%;
    }
    .ms-title{
        position: absolute;
        top:30%;
        left:50%;
        width:100%;
        margin-left:-190px;
        margin-top: -230px;
        border-radius: 5px;
        text-align: center;
        font-size:30px;
        color: #fff;

    }
    .ms-login{
        position: absolute;
        left:50%;
        top:50%;
        width:300px;
        height:360px;
        margin:-150px 0 0 -190px;
        padding:40px;
        border-radius: 5px;
        background: #fff;
    }
    .login-btn{
        text-align: center;
    }
    .login-btn button{
        width:100%;
        height:36px;
    }
    #codeNumber{
        float:right;
        border:1px solid #bfcbd9;
        border-radius:4px;
        text-align:center;
        font-size:19px;
        font-weight: 800;
    }
    .wechatlogin{
        position: absolute;
        left: 50%;
        margin-left: -190px;
    }
    .maillogin{
        position: absolute;
        left: 50%;
        margin-left: -190px;
        top:102%;
    }
    .wechat{
        position: absolute;
        left: 50%;
        margin-left: -25px;
        top: 87%
    }
    .hidden{
        display: none;
    }
    .display{
        display: none;
    }
    .mail{
         position: absolute;
        left: 50%;
        margin-left: -128px;
        top:15%;
    }
    .maillog{
         position: absolute;
        left: 50%;
        margin-left: -25px;
        top:110%;
    }
    form{
        margin-top:80px;
    }

    a:visited{
        color:grey;
    }
    a:hover{
        color:black;
    }
    a:link{
        color:grey;
    }
    a:active{
        color:black;
    }
</style>