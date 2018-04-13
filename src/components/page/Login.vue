<template>
    <div class="login-wrap">
            <canvas id="canvas">Canvas is not supported in your browser.</canvas>
        <!-- <div class="ms-title">Panda System</div> -->
        <div class="ms-login" v-if='!passD&&!loading'>
            <img class='ms-title' src="../../../static/img/logo_03.png"  alt="">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="0px"  v-bind:class='{hidden:ruleForm.hidden}'>
                <el-form-item prop="username">
                    <el-input type='mail' v-model="ruleForm.username" placeholder="请输入手机号或者邮箱地址"></el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input type="password" placeholder="请输入密码" v-model="ruleForm.password" @keyup.enter.native="submitForm('ruleForm')"></el-input>
                </el-form-item>
                <el-form-item prop="code">
                    <el-col :span="15">
                        <el-input placeholder="请输入验证码" v-model.number="ruleForm.code" @keyup.enter.native="submitForm('ruleForm')">
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
                    <el-button type="success" @click="submitForm('ruleForm')" v-loading.fullscreen.lock="fullscreenLoading">登录</el-button>
                </div>
                <p style="font-size:14px;line-height:30px;text-align:center"><a id='forget' href="javascript:;" @click='goToForget' style='padding-left:9px'>忘记密码？</a></p>
                <div class="wechatlogin">
                    <img style='margin-left:10px' src="../../../static/img/login_02.png" alt="">
                </div>
                <div class="wechat" @click='switchWechat'>
                    <img  src="../../../static/img/login_06.png" height="50" width="50" alt="">
                </div>
            </el-form>
            <div class="mail" v-bind:class='{display:ruleForm.isDisplay}'>
                <img :src="loginAdd" width='265' alt="" height='265'>
                <span style="font-size:13px;position:absolute;left:52px;bottom:7px">请使用手机微信扫一扫登录</span>
                <div class="maillogin">
                    <!-- <span>手机登录</span> -->
                     <img style='margin-left:2px' src="../../../static/img/login_03.png" alt=""> 
                </div>
                <div class="maillog" @click='switchMail'>
                    <img  src="../../../static/img/login_07.png" height="50" width="50" alt="">
                </div>
            </div>
        </div>
        <div class="pass-box" v-if='passD&&!loading'>
            <div class="forgetBack" @click='goToLogin'><img :src="forgetSrc" width='30'alt=""></div>
                <el-form :model="ruleForm2" :rules="rules2" ref="ruleForm2"  class="demo-ruleForm" >
                    <el-form-item  prop="mail">
                        <el-input type='mail' placeholder="请输入邮箱地址" v-model='ruleForm2.mail'></el-input>
                    </el-form-item>
                    <el-form-item  prop="code1">
                        <el-col :span="15">
                            <el-input placeholder="请输入验证码" v-model="ruleForm2.code1"></el-input>
                        </el-col>
                        <el-col :span="9">
                            <el-button type="primary" id="forgetCode" @click="getCode" :disabled='canClick'>{{canButton}}</el-button>
                        </el-col>
                    </el-form-item>
                    <el-form-item  prop="password1">
                        <el-input type="password" placeholder="请输入新密码" v-model="ruleForm2.password1" auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item  prop="checkPass">
                        <el-input type="password"placeholder="请再次输入新密码"  v-model="ruleForm2.checkPass" auto-complete="off"></el-input>
                    </el-form-item>
                    
                    <el-form-item>
                        <el-button type="primary" @click="handleSubmit2('ruleForm2')" class='forget100'>提交</el-button>
                    </el-form-item>
                </el-form>
            </div>
            <div class='chooseC' v-if='loading'>
                <el-card class="box-card">
                    <div slot="header" class="clearfix" style='text-align:center;font-weight:600'>
                      <span style="line-height: 36px;">选择角色</span>
                    </div>
                    <div style="display:flex;width:90%;margin:0 auto;flex-wrap:wrap;">
                        <div v-for="o in 8" :key="o" style='width:25%;margin-bottom:15px;' >
                            <el-button type="text" style='border:1px solid gainsboro;border-radius:5px;width:80%;padding:10px;text-align:center;color:black'>

                                {{'列表内容 ' + o }}
                            </el-button>
                        </div>

                    </div>
                  </el-card>
            </div>
    </div>
</template>
<script>
import {
    requestLogin,
    getUserinfo,
    qcodeLogin,
    findPassword,findToEditPwd
} from '../../api/api';
// var i = 1;
// var inter;
// var color = "";
// var str = "0123456789abcdef";
// var length = str.length + 1;
// var span = document.getElementsByTagName("span");
// window.onload = randomNumber;

// function randomNumber() {
//     for (let i = 0; i < 4; i++) { //生成四位数
//         for (let j = 0; j < 6; j++) { //随机改变每个数字的颜色
//             color += str.substr(parseInt(Math.random() * length), 1); //取颜色(循环，每次提取一位，进行拼接组成6为颜色的值)
//         }
//         span[i].style.color = ("#" + color); //随机改变每个span的颜色
//         color = "";
//     }
// }
export default {
    data: function() {
        var validatePass = (rule, value, callback) => {
                if (value.length < 6) {
                    callback(new Error('请输入至少6位'));
                } else {
                    var regex = new RegExp('(?=.*[0-9])(?=.*[a-zA-Z]).{6,30}');
                    if (!regex.test(value)) {
                        callback(new Error('密码中必须包含字母、数字，至少6个字符，最多30个字符'));
                    }
                    if (this.ruleForm2.checkPass !== '') {
                        this.$refs.ruleForm2.validateField('checkPass');
                    }
                    callback();
                }
            };
            var validatePass2 = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请再次输入密码'));
                } else if (value !== this.ruleForm2.password1) {
                    callback(new Error('两次输入密码不一致!'));
                } else {
                    callback();
                }
            };
            var validCode = (rule, value, callback) => {
                if (!value) {
                    return callback(new Error('请输入验证码'))
                }else{
                    callback()
                }
            }
        var valid = (rule, value, callback) => {
            if (!value) {
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
        // var isPhone1 = (rule, value, callback) => {
        //         var myreg =  /^(((1[0-9]{1}))+\d{9})$/; 
        //         if (value == '') {
        //             callback('请输入手机号码')
        //         } else if (!myreg.test(value)) {
        //             callback('请输入有效手机号码');
        //         }else{
        //             callback();
        //         }
        //     }
            var isphone1Mail = (rule, value, callback) => {
                if(isFinite(value)){

                    let myreg =  /^(((1[0-9]{1}))+\d{9})$/; 
                    if (value == '') {
                        callback('请输入手机号或者邮箱地址')
                    } else if (!myreg.test(value)) {
                        callback('请输入有效手机号码');
                    }else{
                        callback();
                    }
                }else{
                    let myreg1 = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
                    if (value == '') {
                        callback('请输入手机号或者邮箱地址')
                    } else if (!myreg1.test(value)) {
                        callback('请输入正确的邮箱地址');
                    }else{
                        callback();
                    }
                }
            }
        return {
            i:0,
            inter:'',
            clock:'',
                a: 60,
                canClick: false,
            fullscreenLoading: false,
            loading:false,
            uuid: '',
            loginAdd: '',
            add: '',
            // logining: false,
            codeNumber1: Math.floor(Math.random() * 9) + 1,
            codeNumber2: Math.floor(Math.random() * 9) + 1,
            codeNumber3: Math.floor(Math.random() * 9) + 1,
            codeNumber4: Math.floor(Math.random() * 9) + 1,
            ruleForm: {
                username: '',
                password: '',
                code: '',
                hidden: false,
                isDisplay: true

            },
            rules: {
                username: [{
                    required: true,
                    // type:'email',
                    // message: '请输入正确的邮箱地址',
                    validator: isphone1Mail,
                    trigger: 'change blur'
                },
                
                {
                    required: true,
                    // type:'email',
                    // message: '请输入正确的邮箱地址',
                    // validator: isphone1Mail,
                    trigger: 'blur'
                }],
                password: [{
                    required: true,
                    message: '请输入密码',
                    trigger: 'blur'
                }],
                code: [{
                    required: true,
                    validator: valid,
                    trigger: 'blur'
                }]
            },
            forgetSrc:'../../../static/img/back1.png',
                receiveCode: '',
                ruleForm2: {
                    mail:'',
                    password1: '',
                    checkPass: '',
                    code1: ''
                },
                rules2: {
                    mail: [{
                    required: true,
                    type:'email',
                    message: '请输入正确的邮箱地址',
                    // validator: isPhone1,
                    trigger: 'change'
                }],
                    password1: [{
                        validator: validatePass,
                        trigger: 'blur'
                    }],
                    checkPass: [{
                        validator: validatePass2,
                        trigger: 'blur'
                    }],
                    code1: [{
                        validator: validCode,
                        trigger: 'blur'
                    }]
                },
                passD:false
        }
    },
    computed: {
       
        canButton() {
                if (this.canClick == true) {
                    return  '重新获取:'+this.a + 's'
                } else {
                    return '获取验证码'
                }
            },
        // _codeNumber1: {
        //     set: function(value) {
        //         this.codeNumber1 = value;
        //     },
        //     get: function() {
        //         return this.codeNumber1
        //     }
        // },
        // _codeNumber2: {
        //     set: function(value) {
        //         this.codeNumber2 = value;
        //     },
        //     get: function() {
        //         return this.codeNumber2
        //     }
        // },
        // _codeNumber3: {
        //     set: function(value) {
        //         this.codeNumber3 = value;
        //     },
        //     get: function() {
        //         return this.codeNumber3
        //     }
        // },
        // _codeNumber4: {
        //     set: function(value) {
        //         this.codeNumber4 = value;
        //     },
        //     get: function() {
        //         return this.codeNumber4
        //     }
        // },
        correct: function() {
            return this.codeNumber1 * 1000 + this.codeNumber2 * 100 + this.codeNumber3 * 10 + this.codeNumber4 * 1;
        }
    },

    methods: {
        goToLogin(){
                this.passD= false;
                this.$refs['ruleForm2'].resetFields();
                // this.$refs['ruleForm'].resetFields();
            },
            handleSubmit2(formName) {//忘记密码操作
                this.$refs.ruleForm2.validate((valid) => {
                    if (valid) {
                        let para = {
                            mail:this.ruleForm2.mail,
                    password: this.ruleForm2.password1,
                    checkPass: this.ruleForm2.checkPass,
                    code: this.ruleForm2.code1
                        }
                        findToEditPwd(para).then(res=>{
                            if(res.code ==0){

                            this.$message({
                                    message: '修改成功',
                                    type: 'success'
                                });
                            }
                                 return res
                        }).then(res=>{
                            if(res.code == 0){

                            //  this.$router.push('/login');
                            this.passD= false;
                this.$refs['ruleForm2'].resetFields();
                            
                            }else{
                                 this.$message.error(res.message);
                                 this.ruleForm2.code1 = '';
                            }

                        })
                        //替换提交服务
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            getCode() {
                let myreg1 = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
                let a =  myreg1.test(this.ruleForm2.mail);
                if (this.canClick == false&&a) {
                    this.canClick = true;
                   this.clock = setInterval(this.doLoop, 1000); 
                   let para = {
                    mail: this.ruleForm2.mail
                }
                findPassword(para).then((res) => {
                   if(res.code ==0){
                        this.$message.success('验证码已发送')
                   }else{
                    this.$message.error(res.message)
                   }
                });
                }else{
                    this.$message.error('请输入需要找回的邮箱地址')
                }
                
            },
            doLoop() {
               this.a--;
                if(this.a<=0){
                    clearInterval(this.clock); //清除js定时器
                    this.a = 60; //重置时间
                    this.canClick =false;
                }
            },
        goToForget(){
            // console.log(1)
            this.passD = true;
            // this.$refs['ruleForm2'].resetFields();
                this.$refs['ruleForm'].resetFields();
            // this.$router.push('/forgetPassword')
        },
        submitForm(formName) {
            // this.loading=true;
            const self = this;
            self.$refs[formName].validate((valid) => {
                if (valid) {
                    // this.logining = true;
                    var loginParams = {
                        username: this.ruleForm.username,
                        password: this.ruleForm.password,
                        grant_type: 'password',
                        client_id: '1',
                        client_secret: 'EjKXjo27hXenF8a2MgqHvpYv7IhtJ678GfOgnHc5'
                    };
                    this.fullscreenLoading = true;
                    requestLogin(loginParams).then(data => {
                        if(data.message =='登录成功'){
                        // let {
                        //     access_token,
                        //     status,
                        //     token_type
                        // } = data;
                        let token = {
                            'Authorization': data.token_type + ' ' + data.access_token
                        }
                        getUserinfo(token).then(u => {
                            let {
                                data
                            } = u;
                            data.token = token;
                            sessionStorage.setItem('user', JSON.stringify(data));
                            if(!data.wechat){
                                self.$router.push('/wechat');
                            }else if(data.job.code.includes('hr')){
                                self.$router.push('/api/v1/admin');
                            }else if(data.job.code=='cc_c'){
                            self.$router.push('/reportFormTmkTotal');
                            }else if(data.job.code.includes('purchase')||data.job.code.includes('product')){
                                self.$router.push('/wechat');
                            }else{
                                self.$router.push('/Index');
                            }
                            // if(data.job && data.job.code.includes('hr')){
                            //      self.$router.push('/api/v1/admin');
                            // }else if(!data.wechat){
                            // self.$router.push('/wechat');
                            // }else if(data.job.code=='cc_c'){
                            // self.$router.push('/reportFormTmkTotal');
                            // }else{
                            //     self.$router.push('/Index');
                            // }
                        })
                        }else{
                            this.fullscreenLoading = false;
                            this.$message.error(data.message);
                            this.ruleForm.code = '';
                        this.ruleForm.password = '';
                        this.change();
                        }
                    }).catch((error) => {
                        this.fullscreenLoading = false;
                        if (error.response) {
                            this.$message({
                                type: 'error',
                                message: error.response.data.message
                            });
                            // console.log(error.response);
                        }
                        this.ruleForm.code = '';
                        this.ruleForm.password = '';
                        this.change();
                    });
                    // var str = JSON.stringify(loginParams);
                    // sessionStorage.setItem("loginStr",str);
                    // console.log(str);

                } else {
                    this.change();
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        switchWechat() {
            // let a = 'http://pandatest.dfth.com/auth/createRqCodeImg?token=';
            let a = '/auth/createRqCodeImg?token='
            this.loginAdd =  a + this.uuid;
            this.ruleForm.hidden = true;
            this.ruleForm.isDisplay = false;
            this.inter = setInterval(this.codeLogin, 2000)
        },
        codeLogin() {//扫二维码登录
            let para = {
                token: this.uuid
            }
            qcodeLogin(para).then(res => {
                if (res.status == 'success') {
                    clearInterval(this.inter)
                    // let {
                    //     access_token,
                    //     status,
                    //     token_type
                    // } = res;
                    let token = {
                        'Authorization': res.token_type + ' ' + res.access_token
                    }
                    getUserinfo(token).then(u => {
                        let {
                            data
                        } = u;
                        data.token = token;
                        sessionStorage.setItem('user', JSON.stringify(data));
                        if(!data.wechat){
                                this.$router.push('/wechat');
                            }else if(data.job.code.includes('hr')){
                                this.$router.push('/api/v1/admin');
                            }else if(data.job.code=='cc_c'){
                            this.$router.push('/reportFormTmkTotal');
                            }else if(data.job.code.includes('purchase')||data.job.code.includes('product')){
                                this.$router.push('/wechat');
                            }else{
                                this.$router.push('/Index');
                            }
                        //  if(data.job && data.job.code.includes('hr')){
                        //          this.$router.push('/api/v1/admin');
                        //     }else if(data.job.code=='cc_c'){
                        //     self.$router.push('/reportFormTmkTotal');
                        //     }else{
                        //         this.$router.push('/Index');
                        //     }
                    })
                } else if (res.status == 0) {
                    this.i++
                    // console.log(this.i)
                    if (this.i > 300) {
                        this.winReload();
                    }
                }
            })

        },
        winReload: function() {
            window.location.reload();
        },
        switchMail() {
            this.ruleForm.hidden = false;
            this.ruleForm.isDisplay = true;
            this.loginAdd = '';
            this.add = '';
            clearInterval(this.inter);

        },
        change() {
            this.codeNumber1 = Math.floor(Math.random() * 9) + 1;
            this.codeNumber2 = Math.floor(Math.random() * 9) + 1;
            this.codeNumber3 = Math.floor(Math.random() * 9) + 1;
            this.codeNumber4 = Math.floor(Math.random() * 9) + 1;
            this.randomNumber();
        },
        // isLogin(){
        //     requestLogin().then(res => {
        //         var lstr1= sessionStorage.getItem('loginStr');
        //         var lstr2 = JSON.parse(lstr1);      
        //         if(sessionStorage.hasOwnProperty('loginStr')){
        //             const self = this;
        //             this.fullscreenLoading = true;
        //             requestLogin(lstr2).then(data => {
        //                 if(data.message =='登录成功'){
        //                 let {
        //                     access_token,
        //                     status,
        //                     token_type
        //                 } = data;
        //                 var token = {
        //                     'Authorization': token_type + ' ' + access_token
        //                 }
        //                 getUserinfo(token).then(u => {
        //                     let {
        //                         data
        //                     } = u;
        //                     data.token = token;
        //                     sessionStorage.setItem('user', JSON.stringify(data));
        //                     if(data.job && data.job.code == 'hr'){
        //                          self.$router.push('/api/v1/admin');
        //                     }else if(!data.wechat){
        //                     self.$router.push('/wechat');
        //                     }else{
        //                         self.$router.push('/Index');
        //                     }
        //                 })
        //                 }else{
        //                     this.fullscreenLoading = false;
        //                     this.ruleForm.code = '';
        //                 this.ruleForm.password = '';
        //                 this.change();
        //                 }
        //             }).catch((error) => {
        //                 this.fullscreenLoading = false;
        //                 if (error.response) {
        //                     this.$message({
        //                         type: 'error',
        //                         message: error.response.data.message
        //                     });
        //                     console.log(error.response);
        //                 }
        //                 this.ruleForm.code = '';
        //                 this.ruleForm.password = '';
        //                 this.change();
        //             });
        //         }
        //     })
        // }
        randomNumber() {
              let color = "";
let str = "0123456789abcdef";
let span = document.getElementsByTagName("span");
let length = str.length + 1;
    for (let i = 0; i < 4; i++) { //生成四位数
        for (let j = 0; j < 6; j++) { //随机改变每个数字的颜色
            color += str.substr(parseInt(Math.random() * length), 1); //取颜色(循环，每次提取一位，进行拼接组成6为颜色的值)
        }
        span[i].style.color = ("#" + color); //随机改变每个span的颜色
        color = "";
    }
}
    },
    mounted() {
        // var color = "";
// var str = "0123456789abcdef";
// var length = str.length + 1;
// window.onload = randomNumber;

        this.randomNumber();
        this.change();    
    },
    beforeDestroy() {
        clearInterval(this.inter)
    },
    created() {
        // let userc = sessionStorage.getItem('user');
        // if(userc){

        //     sessionStorage.removeItem('user')
        // }
        var d = new Date().getTime();
        this.uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            var r = (d + Math.random() * 16) % 16 | 0;
            d = Math.floor(d / 16);
            return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
        });
        // this.isLogin();

    }
}
</script>
<style scoped>
.forgetBack{
    position:absolute;
    top:10px;
    left:10px;
    color:grey
}
.forgetBack:hover{
    cursor: pointer;
}
#forgetCode{
    padding:10px 5px;float:right;text-align:center
}
.pass-box{
margin:auto;width:380px;height:50%;position:absolute;top:0;left:0;right:0;bottom:0;background-color:white;border-radius:5px;
}
.demo-ruleForm{
width:70%;height:270px;margin: auto;position:absolute;top:0;left:0;bottom:0;right:0
}
.forget100{
width:100%
}
.login-wrap {
    position: relative;
    width: 100%;
    height: 100%;
}

.ms-title {
    position: absolute;
    top: 30%;
    left: 50%;
    width: 100%;
    margin-left: -190px;
    margin-top: -230px;
    border-radius: 5px;
    text-align: center;
    font-size: 30px;
    color: #fff;
}

.ms-login {
    position: absolute;
    left: 50%;
    top: 50%;
    width: 300px;
    height: 360px;
    margin: -150px 0 0 -190px;
    padding: 40px;
    border-radius: 5px;
    background: #fff;
}
.chooseC{
    position: absolute;
    left: 50%;
    top: 50%;
    width: 600px;
    /* min-height: 360px; */
    transform: translate(-50%,-50%);
}
.login-btn {
    text-align: center;
}

.login-btn button {
    width: 100%;
    height: 36px;
}

#codeNumber {
    float: right;
    border: 1px solid #bfcbd9;
    border-radius: 4px;
    text-align: center;
    font-size: 19px;
    font-weight: 800;
}
#codeNumber:hover{
    cursor: pointer;
}
.wechatlogin {
    position: absolute;
    left: 50%;
    margin-left: -190px;
}

.maillogin {
    position: absolute;
    left: 50%;
    margin-left: -184px;
    top: 110%;
}

.wechat {
    position: absolute;
    left: 50%;
    margin-left: -25px;
    top: 87%
}

.hidden {
    display: none;
}

.display {
    display: none;
}

.mail {
    position: absolute;
    left: 50%;
    margin-left: -131px;
    top: 15%;
}

.maillog {
    position: absolute;
    left: 50%;
    margin-left: -27px;
    top: 118%;
}

form {
    margin-top: 80px;
}

a:visited {
    color: grey;
}

a:hover {
    color: black;
}

a:link {
    color: grey;
}

a:active {
    color: black;
}
</style>
