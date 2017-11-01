<template>
    <div>
        <!-- <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item ><i class="el-icon-my-xiugai"></i> 修改密码</el-breadcrumb-item>
            </el-breadcrumb>
        </div> -->
        <div class='editPass'>
            <h3 class='editPassH3'>修改密码</h3>
        </div>
        <div class="form-box">
            <el-form :model="ruleForm2" :rules="rules2" ref="ruleForm2" class="demo-ruleForm">
                <el-form-item prop="address">
                    <el-input readonly v-model='mail'></el-input>
                </el-form-item>
                <el-form-item prop="code">
                    <el-col :span="15">
                        <el-input placeholder="请输入验证码" v-model="ruleForm2.code"></el-input>
                    </el-col>
                    <el-col :span="9">
                        <el-button type="primary" id="codeNumber" @click="getCode" :disabled='canClick'>{{canButton}}</el-button>
                    </el-col>
                </el-form-item>
                <el-form-item prop="pasword">
                    <el-input type="password" placeholder="请输入新密码" v-model="ruleForm2.pasword" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item prop="checkPass">
                    <el-input type="password" placeholder="请再次输入新密码" v-model="ruleForm2.checkPass" auto-complete="off"></el-input>
                </el-form-item>

                <el-form-item>
                    <el-button type="primary" @click="handleSubmit2('ruleForm2')" class='edit100'>提交</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>
<script>
    var token, user
    import {
        mailCode,
        editPass
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
                } else if (value !== this.ruleForm2.pasword) {
                    callback(new Error('两次输入密码不一致!'));
                } else {
                    callback();
                }
            };
            var validCode = (rule, value, callback) => {
                if (!value) {
                    return callback(new Error('请输入验证码'))
                } else {
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
                clock:'',
                a: 60,
                canClick: false,
                mail: '',
                receiveCode: '',
                ruleForm2: {
                    pasword: '',
                    checkPass: '',
                    code: ''
                },
                rules2: {
                    pasword: [{
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
            handleSubmit2(formName) {
                this.$refs.ruleForm2.validate((valid) => {
                    if (valid) {
                        editPass(token, this.ruleForm2).then(res => {
                            if (res.code == 0) {

                                this.$message({
                                    message: '修改成功',
                                    type: 'success'
                                });
                               
                            }
                            return res
                        }).then(res => {
                            if (res.code == 0) {
                                localStorage.removeItem('user');
                                this.$message.success('修改成功');
                                let _this = this;
                                setTimeout(function(){
                                    _this.$router.go();
                                    _this.$router.push('/login')
                                },2000);
                            } else {
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
                if (this.canClick == false) {
                    this.canClick = true;
                   this.clock = setInterval(this.doLoop, 1000); 
                }
                mailCode(token).then((res) => {
                   if(res.code ==0){
                    this.$message.success('验证码已发送')
                   }
                });
            },
            doLoop() {
               this.a--;
                if(this.a<=0){
                    clearInterval(this.clock); //清除js定时器
                    this.a = 60; //重置时间
                    this.canClick =false;
                }
            },
        },
        beforeCreate() {
            user = localStorage.getItem('user');
            token = JSON.parse(user).token;
        },
        created() {
            this.mail = JSON.parse(user).name ? JSON.parse(user).name : ''; //获取mail
        },
        computed: {
            canButton() {
                if (this.canClick == true) {
                    return  '重新获取:'+this.a + 's'
                } else {
                    return '获取验证码'
                }
            },
        }
    }

</script>
<style>
    .editPass {
        width: 100%;
        position: relative;
        height: 35px;
        background-color: white;
        margin-top: 0;
        padding-top: 10px;
        margin-bottom: 10px;
        border-radius: 5px;
    }

    .editPassH3 {
        margin-bottom: 15px;
        margin-left: 10px;
    }

    .form-box {
        margin: 0 auto;
        width: 100%;
        background-color: white;
        ;
        padding: 40px 0 30px 0
    }

    .demo-ruleForm {
        margin: 0 auto;
        width: 358px
    }

    #codeNumber {
        float: right;
        width: 110px;
        text-align: center
    }

    .edit100 {
        width: 100%
    }

    .el-input .el-input__inner:nth(1) {
        cursor:default;
    }

</style>
