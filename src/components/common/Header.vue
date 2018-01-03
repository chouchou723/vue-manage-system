<template>
    <div class="header">
        <!-- <div class="logobg" style="width: 183px;height: 70px;background-color: #2b3a40;float: left;">
        <div class="logo"><img src="../../../static/img/topic_03.png"  width="170"  @click='refresh'></div> 
        </div>   -->
        <div class="hoverbg" v-if="this.code.includes('cc')||this.code.includes('tmk')||this.code.includes('teach')">
            <div class='search'>
                <el-input placeholder="请输入完整的姓名或手机号" icon="search" clearable v-model="input2" :on-icon-click="handleIconClick" @keyup.enter.native='handleIconClick'>
                </el-input>
            </div>
        </div>
        <div class="hoverrt" v-if="code.includes('tmk')||code=='cc'||code=='cc_m'" @click="gotoAdd" >
            <img id='addUser' src="../../../static/img/add.png" height="30" width="28" >
            </div>
        <div class="user-info">
            <el-dropdown @command="handleCommand" >
                <span class="el-dropdown-link">
                    <img class="user-logo" :src="agetSrc" @click='gotoSetting'>
                    <div class="Header-logo">
                         <span class='Header-username'>
                             {{username}}
                             </span>
                     <span class='duty_color'>[{{duty}}]</span>
                    </div>
                    <img src="../../../static/img/more.png" height="20" alt="" class='header-more'>
        </span>
        <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command='setting'>头像设置</el-dropdown-item>
            <el-dropdown-item command='wechat'>微信绑定</el-dropdown-item>
            <el-dropdown-item command='editCode'>修改密码</el-dropdown-item>
            <!-- <el-dropdown-item command='message'>消息设置</el-dropdown-item> -->
            <el-dropdown-item command="loginout">退出</el-dropdown-item>
        </el-dropdown-menu>
        </el-dropdown>
    </div>
    <div class='messageAmount'>
        <el-dropdown @command="handleCommand" style="height:48px" @visible-change="getData">
            <div >
                <a href="javascript:;"><img src="../../../static/img/mess.png" width="30" alt="" style="padding-top:32%"  @click="goSystem" class='rotateInUpRight'></a>
            </div>

            <div class="counterdiv" :class="{hidden:!finalNumber}">
                <span class='amountColor'>
                {{finalNumber}}
                </span>
            </div>
            <el-dropdown-menu slot="dropdown">
                <el-dropdown-item v-for='item in notifyMessage' style='width:300px;' v-loading="loading" @click.native="goSystem" v-if='notifyMessage.length!=0'>
                    <div style="text-align:left;font-size:14px;font-weight:600">{{item.type}}通知</div>
                    <!-- <div style="text-align:left;font-size:14px;color:#666666;line-height:20px" v-if='item.type=="转校"'> 学生:{{ item.content.child}}的转校申请,请您确认</div>                   -->
                </el-dropdown-item>
                <el-dropdown-item style='width:300px' @click.native="goSystem" v-if='notifyMessage.length==0'>
                    暂无未读消息
                </el-dropdown-item>
                <el-dropdown-item style='width:300px' @click.native="goSystem">
                    +More
                </el-dropdown-item>
            </el-dropdown-menu>
        </el-dropdown>
    </div>
    </div>
</template>
<script>
    var token,user
    import {
        mapGetters,
        mapActions
    } from 'vuex';
    import {
        searchResource,
        getMessage
    } from '../../api/api';
    export default {
        data() {
            return {
                code: '',
                loading: false,
                username: '',
                agetSrc: '',
                duty: '',
                input2: '',
                messageAmount: 0,
                notifyMessage: [],
                contGet:''
                // finalNumber:0
            }
        },
        methods: {
            ...mapActions([
                'searchKey',
                'setMessNumber'
            ]),
            getData(val) {
                if (val == true) {
                    let p = {
                        length: 3
                    }
                    getMessage(p, token).then(res => {
                        this.notifyMessage = res.data.list;
                        this.messageAmount = res.data.total;
                this.setMessNumber(this.messageAmount)
                    })
                    // this.loading= false;
                }
            },
            goSystem() {
                this.$router.push('/systemMessage')
            },
            // refresh() {
            //     this.$router.go();
            // },
            gotoSetting(){
                this.$router.push('/setting');
            },
            handleCommand(command) {
                if (command == 'loginout') {
                    // this.$router.go();
                    sessionStorage.removeItem('user')
                    // sessionStorage.clear();
                    this.$router.push('/login');
                    
                }
                if (command == 'setting') {
                    this.$router.push('/setting');
                }
                if (command == 'editCode') {
                    this.$router.push('/editPassword');
                }
                if (command == 'wechat') {
                    this.$router.push('/wechat');
                }
                if (command == 'message') {
                    this.$router.push('/message');
                }
            },
            handleIconClick(ev) { //点击搜索标志的fn
                // console.log(ev);
                let para = {
                    search: this.input2
                }
                this.searchKey(this.input2);
                this.$router.push('/searchResult')
                setTimeout(() => {
                    this.input2 = '';
                }, 1);
            },
            gotoAdd() {
                if(this.code.includes('tmk')){

                    this.$router.push('/addUser')
                }else{
                    this.$router.push('/addCustomer')
                    
                }
            },
            getM(){//计时器使用
                let p ={
                    
                }
                getMessage(p,token).then(res=>{
                // console.log(res);
                this.messageAmount = res.data.total;
                this.setMessNumber(this.messageAmount)
            })
            }
        },
        computed: {
            // code(){
            //   return JSON.parse(user).job ? JSON.parse(user).job.code?JSON.parse(user).job.code : '':''; //获取职位code  
            // },
            // username(){
            //     return JSON.parse(user).uname
            // },
            // agetSrc(){
            //     return JSON.parse(user).avatar
            // },
            // duty(){
            //     return JSON.parse(user).job.full_name
            // },
            finalNumber() {
                if (this.getMessNumber !== '') {
                    return this.getMessNumber;
                } else {
                    return this.messageAmount;
                }
            },
            // userAvatar(){
            //     return this.agetSrc
            // },
            ...mapGetters([
                'getMessNumber'
                // ...
            ])
        },
        beforeCreate() {
            user = sessionStorage.getItem('user');
            token = JSON.parse(user).token;
        },
        created() {
            this.code = JSON.parse(user).job ? JSON.parse(user).job.code?JSON.parse(user).job.code : '':''; //获取职位code
            // var user = sessionStorage.getItem('user');
            // if (user) {
                let user1 = JSON.parse(user);
            //     // console.log(user);
                this.username = user1.uname || '';
                this.agetSrc = user1.avatar || '';
                this.duty = user1.department ? user1.department : ''//要改部门名称

            // }
             this.contGet = setInterval(this.getM,600000)
            let p = {
                length:3
            }
            getMessage(p, token).then(res => {
                this.messageAmount = res.data.total;
                this.setMessNumber(this.messageAmount)
            })

        },
        beforeDestroy() {
            clearInterval(this.contGet);
            // this.$router.go();
        },
    }
</script>
<style>
    .hoverbg{
width: 245px;height: 48px;float: left; padding-left:183px
	} 

    .hoverrt {
        background: #6daba8;float:left;margin-left:35px;width: 55px;height: 48px;display:flex;justify-content: center;align-items: center;
    }

    .hoverrt:hover {
        background-color: #1fb5ad;
        cursor: pointer;
    }
    /*.hoverbg:hover
	{background-color: #2b3a40;}*/
    /*.hoverbg .el-input__inner{
        border:none;
        background-color: #95a0aa;
        color:white;
        border-bottom: 1px solid white;
        border-radius: 0;
    }*/
    /* .hoverbg .el-input__inner::-webkit-input-placeholder{
        color:#d1d6da;
        font-size:12px;
    }*/

    .header {
        position: relative;
        box-sizing: border-box;
        width: 100%;
        height: 48px;
        font-size: 22px;
        line-height: 48px;
        color: #000000;
    }
    /*.header .logo{
        float: left;
        width:183px;
        text-align: center;
        margin-top:20px
    }
    .header .logo:hover{
        cursor: pointer;
    }*/

    .search {
        float: left;
        width: 240px;
        margin-left: 20px;
        margin-top: -2px;
    }

    .user-info {
        float: right;
        padding-right: 37px;
        font-size: 16px;
        color: #fff;
    }

    .duty_color {
        color: #1fb5ad;
        line-height: 12px;
        font-size: 12px;
        flex: 0 0 12px;
    }

    .messageAmount {
        float: right;
        /*margin-top:10px;*/
        margin-right: 20px;
        position: relative;
    }

    .amountColor {
        position: absolute;
        right: 0;
        bottom: 0;
        top: 0;
        left: 0;
        line-height: 17px;
        color: white;
    }

    .user-info .el-dropdown-link {
        position: relative;
        display: inline-block;
        padding-left: 50px;
        color: #959595;
        cursor: pointer;
        vertical-align: middle;
    }
    .user-info .el-dropdown{
        padding-right: 13px;
    }
    .user-info .user-logo {
        position: absolute;
        left: 0;
        top: 2px;
        width: 40px;
        height: 40px;
        border: 1px solid;
        border-radius: 20px;
        animation: rotate 8s linear infinite;
    }

    @keyframes rotate {
        0% {
            transform: rotate(0deg);
        }
        100% {
            transform: rotate(360deg);
        }
    }

    .scaleMess {
        transition: all 1s ease-in-out
    }

    .scaleMess:hover {
        transform: scale(1.5) rotate(360deg)
    }

    .el-dropdown-menu__item {
        text-align: center;
    }

    .counterdiv {
        background-color: #d08124;
        border-radius: 50%;
        position: absolute;
        top: 6px;
        right: -15%;
        height: 17px;
        width: 17px;
        text-align: center;
    }

    .hidden {
        display: none
    }

    /* #addUser {
        margin-left: 13px;
        margin-top: 22px;
    } */

    /* #addUser:hover {
        cursor: pointer;
    } */
    .rotateInUpRight {
    -webkit-animation-timing-function: cubic-bezier(.05, .45, .64, .94);
    animation-timing-function: cubic-bezier(.05, .45, .64, .94);
    -webkit-animation-name: rotateInUpRight;
    animation-name: rotateInUpRight;
    animation-duration: 1s;
}
    @keyframes rotateInUpRight {
    0% {
        -webkit-transform-origin: right bottom;
        transform-origin: right bottom;
        -webkit-transform: rotate3d(0, 0, 1, -90deg);
        transform: rotate3d(0, 0, 1, -90deg);
        opacity: 0;
        filter: alpha(opacity=0)
    }
    100% {
        -webkit-transform-origin: right bottom;
        transform-origin: right bottom;
        -webkit-transform: none;
        transform: none;
        opacity: 1;
        filter: alpha(opacity=100)
    }
}
.Header-logo{
    display: flex;
    flex-direction: column;
    height: 48px;
    align-items: center;
    justify-content: center;
}
.Header-username{
flex:0 0 15px;line-height:21px;
}
.header-more{
    position: absolute;
    right:-21px;
    top:14px;
}
</style>
