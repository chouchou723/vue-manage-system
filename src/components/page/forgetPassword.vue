<template>
     <div class="login-wrap">
        <div class="pass-box" style="margin:auto;width:380px;height:50%;position:absolute;top:0;left:0;right:0;bottom:0;background-color:white;border-radius:5px">
        <div class="forgetBack" @click='goToLogin'><img src="../../../static/img/back1.png" width='30'alt=""></div>
            <el-form :model="ruleForm2" :rules="rules2" ref="ruleForm2"  class="demo-ruleForm" style='width:70%;height:270px;margin: auto;position:absolute;top:0;left:0;bottom:0;right:0'>
                <el-form-item  prop="mail">
                    <el-input  placeholder="请输入登录邮箱" v-model='ruleForm2.mail'></el-input>
                </el-form-item>
                <el-form-item  prop="code">
                    <el-col :span="15">
                        <el-input placeholder="请输入验证码" v-model="ruleForm2.code"></el-input>
                    </el-col>
                    <el-col :span="9">
                        <el-button type="primary" id="forgetCode" @click="getCode" style="float:right;text-align:center">获取验证码</el-button>
                    </el-col>
                </el-form-item>
                <el-form-item  prop="password">
                    <el-input type="password" placeholder="请输入新密码" v-model="ruleForm2.password" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item  prop="checkPass">
                    <el-input type="password"placeholder="请再次输入新密码"  v-model="ruleForm2.checkPass" auto-complete="off"></el-input>
                </el-form-item>
                
                <el-form-item>
                    <el-button type="primary" @click="handleSubmit2('ruleForm2')" style='width:100%'>提交</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>
<script>
import {
    findPassword,findToEditPwd
} from '../../api/api';
export default {
    data() {
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
            // var validatePass = (rule, value, callback) => {
            //     if (value === '') {
            //         callback(new Error('请输入密码'));
            //     } else {
            //         if (this.ruleForm2.checkPass !== '') {
            //             this.$refs.ruleForm2.validateField('checkPass');
            //         }
            //         callback();
            //     }
            // };
            var validatePass2 = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请再次输入密码'));
                } else if (value !== this.ruleForm2.password) {
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
                // setTimeout(() => {
                //     if (!Number.isInteger(value)) {
                //         callback(new Error('请输入数字值'));
                //     } else {
                //         if (value != this.receiveCode) {
                //             callback(new Error('验证码错误'));
                //         } else {
                //             callback();
                //         }
                //     }
                // }, 1);
            }

            return {
                receiveCode: '',
                ruleForm2: {
                    mail:'',
                    password: '',
                    checkPass: '',
                    code: ''
                },
                rules2: {
                    mail: [{
                    required: true,
                    message: '请输入邮箱地址',
                    trigger: 'blur'
                }, {
                    type: 'email',
                    message: '请输入正确的邮箱地址',
                    trigger: 'blur,change'
                }],
                    password: [{
                        validator: validatePass,
                        trigger: 'blur'
                    }],
                    checkPass: [{
                        validator: validatePass2,
                        trigger: 'blur'
                    }],
                    code: [{
                        validator: validCode,
                        trigger: 'blur'
                    }]
                }
            };
        },
        methods: {
            goToLogin(){
                this.$router.push('/');
            },
            handleSubmit2(formName) {
                this.$refs.ruleForm2.validate((valid) => {
                    if (valid) {
                        findToEditPwd(this.ruleForm2).then(res=>{
                            if(res.code ==0){

                            this.$message({
                                    message: '修改成功',
                                    type: 'success'
                                });
                            }
                                 return res
                        }).then(res=>{
                            if(res.code == 0){

                             this.$router.push('/login');
                            }else{
                                 this.$message.error(res.message);
                                 this.ruleForm2.code = '';
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
            }
        }
}
</script>
<style scoped>
.login-wrap {
    position: relative;
    width: 100%;
    height: 100%;
}
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
    padding:10px;
}
</style>
