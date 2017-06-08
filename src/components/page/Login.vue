<template>
    <div class="login-wrap">
        <!-- <div class="ms-title">Panda System</div> -->
        <div class="ms-login">
        <img class= 'ms-title'src="../../../static/img/logo.png" height="159" width="332" alt="">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="0px" class="demo-ruleForm" v-bind:class='{hidden:ruleForm.hidden}'>
                <el-form-item prop="username">
                    <el-input type='email' v-model="ruleForm.username" placeholder="请输入邮箱"></el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input type="password" placeholder="请输入密码" v-model="ruleForm.password" @keyup.enter.native="submitForm('ruleForm')"></el-input>
                </el-form-item>
                <el-form-item  prop="code">
                 <el-col :span="15">
                    <el-input  placeholder="请输入验证码" v-model.number="ruleForm.code" @keyup.enter.native="submitForm('ruleForm')">
                    </el-input>
                    </el-col>
                     <el-col :span="7" id='codeNumber' @click.native='change'>
                        <span>{{codeNumber1}}</span>
                        <span>{{codeNumber2}}</span>
                        <span>{{codeNumber3}}</span>
                        <span>{{codeNumber4}}</span>
                    </el-col>
                </el-form-item>
                <div class="login-btn">
                    <el-button type="success" @click="submitForm('ruleForm')">登录</el-button>
                </div>
                <p style="font-size:14px;line-height:30px;text-align:center"><a id='forget'href="https://www.baidu.com">忘记密码？</a></p>
                <div class="wechatlogin">
                    
                <img style='margin-left:10px' src="../../../static/img/login_02.png"  alt="">
                </div>
                <div class="wechat" @click='switchWechat'>
                    
                    <img style=''src="../../../static/img/login_06.png" height="50" width="50" alt="">
                </div>
            </el-form>
            <div class="mail"  v-bind:class='{display:ruleForm.isDisplay}'>
                
            <img :src="loginAdd"  width='265' alt="">
            <span style="font-size:13px;position:absolute;left:54px;bottom:7px">请使用手机微信扫一扫登录</span>
            <div class="maillogin">
                    
                <img style='margin-left:2px' src="../../../static/img/login_03.png"  alt="">
                </div>
                <div class="maillog" @click='switchMail'>
                    
                    <img style=''src="../../../static/img/login_07.png" height="50" width="50"  alt="">
                </div>
            </div>
        </div>
    </div>
</template>

<script>
        import { requestLogin ,getUserinfo,qcodeLogin,getqcodeAdd} from '../../api/api';
        var i = 1
        var color="";
        var str="0123456789abcdef";
        var length = str.length +1;
        var span=document.getElementsByTagName("span");
        window.onload=randomNumber;
        function randomNumber(){
            for(let i=0;i<4;i++){//生成四位数
                for(let j=0;j<6;j++){//随机改变每个数字的颜色
                     color+=str.substr(parseInt(Math.random()*length),1);//取颜色(循环，每次提取一位，进行拼接组成6为颜色的值)
                }
                span[i].style.color=("#"+color);//随机改变每个span的颜色
                color="";
             }
         }

    export default {
        data: function(){
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
                loginAdd:'',
                add:'',
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
                        var loginParams = {username:this.ruleForm.username,
                                            password:this.ruleForm.password,
                                            grant_type:'password',
                                            client_id:'1',
                                            client_secret:'EjKXjo27hXenF8a2MgqHvpYv7IhtJ678GfOgnHc5'};

                        requestLogin(loginParams).then(data=>{
                            this.logining = false;
                            let{access_token,status,token_type} = data;
                                var token = {
                                      'Authorization': token_type +' ' + access_token
                                  }
                                getUserinfo(token).then(u=>{
                                     let {data} = u;
                                     data.token = token;
                                     // console.log(data)
                                localStorage.setItem('user',JSON.stringify(data));
                               self.$router.push('/home');
                                })
                        }).catch((error)=>{
                            if (error.response) {
                                this.$message({
                                    type: 'error',
                                    message: error.response.data.error
                                  }); 
                              // console.log(error.response);
                            }
                            this.ruleForm.code = '';
                            this.ruleForm.password = '';
                            this.change();
                        });
                        
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            switchWechat(){
                this.loginAdd='http://crmv2.dfth.com/auth/createRqCodeImg';
                this.ruleForm.hidden = true;
                this.ruleForm.isDisplay = false;
                 let para = {token:0}
                 if(  this.ruleForm.isDisplay == false){
                    // console.log('1')
                    getqcodeAdd(para).then(res=>{
                    this.add = res.url;
                    // console.log(add)
                    // console.log(this.add)
                }).then(()=>{
                    if(i<300){
                    this.inter = setInterval(this.codeLogin,2000)
                        
                    }else{
                        getqcodeAdd(para).then(res=>{
                    this.add = res.url;
                }).then(()=>{
                    clearInterval(this.inter);
                    this.inter = setInterval(this.codeLogin,2000)
                })
                    }
                })
                 }
              },
            codeLogin(){
                let add =this.add;
                if(i>300){

                }
                if(add ==''){
                        console.log('login url is null'); return false;
                    }else{
                        let para = {test:0}
                        qcodeLogin(add,para).then(res=>{
                            // console.log(add)
                            if(res.status=='success'){
                            let{access_token,status,token_type} = res;
                                var token = {
                                      'Authorization': token_type +' ' + access_token
                                  }
                                getUserinfo(token).then(u=>{
                                     let {data} = u;
                                     data.token = token;
                                     // console.log(data)
                                localStorage.setItem('user',JSON.stringify(data));
                               self.$router.push('/home');
                                })
                        }else if(res.status == 0){
                            i++
                        }
                    })
                    }
              },
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
        },
        beforeDestroy () {
      clearInterval(this.inter)
    },
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
        margin-left: -186px;
        top:110%;
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
        margin-left: -30px;
        top:118%;
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