<template>
    <div class="header">
        <div class="logo"><img src="../../img/头像设置_03.png" height="44" width="229" alt="" style="margin-top:20px"></div>
        <div style="float:left;width:240px"><el-input
  placeholder="请输入姓名,手机号或合同编号"
  icon="search"
  v-model="input2"
  :on-icon-click="handleIconClick">
</el-input></div>
<div style="float:left;margin-left:5px"><a href=""><img src="../../img/add.png" height="70" width="55" alt=""></a></div>
        <div class="user-info">
            <el-dropdown  @command="handleCommand">
                <span class="el-dropdown-link">
                    <img class="user-logo" :src="userAvatar">
                    <div >
                     {{username}}
                     <span style="color:#1fb5ad">[{{duty}}]</span>
                    </div>
                </span>
                <div>
                    
                </div>
                <el-dropdown-menu slot="dropdown">
                 <el-dropdown-item command='setting'>头像设置</el-dropdown-item>
                 <el-dropdown-item command='wechat'>微信绑定</el-dropdown-item>
                  <el-dropdown-item command='editCode'>修改密码</el-dropdown-item>
                   <el-dropdown-item command='message'>消息设置</el-dropdown-item>
                    <el-dropdown-item command="loginout">退出</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
        </div>
        <div style="float:right;margin-top:10px;margin-right:20px;position:relative"><a href=""><img src="../../img/收件箱.png" height="30" width="30" alt=""></a>
            <div class="counterdiv" :class="{hidden:!messageAmount}"> 
                                <span style="position:absolute;right:-3%;bottom:-3%;line-height:normal;color:white;width:16px;font-size:5px">
                                {{messageAmount}}
                                </span> 
                                </div>
        </div>
    </div>
</template>
<script>
import { mapGetters } from 'vuex';
    export default {
        data() {
            return {
                username: '',
                agetSrc: '',
                duty:'',
                input2:'',
                messageAmount:11
            }
        },
        methods:{
            handleCommand(command) {
                if(command == 'loginout'){
                    localStorage.removeItem('user')
                    this.$router.push('/login');
                }
                if(command == 'setting'){
                    this.$router.push('/setting');
                }
                if(command == 'editCode'){
                    this.$router.push('/editPassword');
                }
                if(command == 'wechat'){
                    this.$router.push('/wechat');
                }
                if(command == 'message'){
                    this.$router.push('/message');
                }
            },
            handleIconClick(ev) {
      console.log(ev);
    }
        },
        computed:{
            userAvatar(){
                return this.getSrc ||this.agetSrc
            },
        //         userAvatar(){
        //              let user = localStorage.getItem('user');
        //               let user1 = JSON.parse(user);
        //                return getSrc;
        // },
        ...mapGetters([
                'getSrc'
      // ...
            ])
    },
        mounted() {
            var user = localStorage.getItem('user');
            if (user) {
                user = JSON.parse(user);
                this.username = user.name || '';
                this.agetSrc = user.avatar || '';
                this.duty = user.duty || ''
               
            }

        }
    }
</script>
<style scoped>
    .header {
        position: relative;
        box-sizing: border-box;
        width: 100%;
        height: 70px;
        font-size: 22px;
        line-height: 70px;
        color: #fff;
    }
    .header .logo{
        float: left;
        width:250px;
        text-align: center;
    }
    .user-info {
        float: right;
        padding-right: 50px;
        font-size: 16px;
        color: #fff;
    }
    .user-info .el-dropdown-link{
        position: relative;
        display: inline-block;
        padding-left: 50px;
        color: #fff;
        cursor: pointer;
        vertical-align: middle;
    }
    .user-info .user-logo{
        position: absolute;
        left:0;
        top:15px;
        width:40px;
        height:40px;
        border-radius: 50%;
    }
    .el-dropdown-menu__item{
        text-align: center;
    }
    .counterdiv{
    background-color:#d08124;
    border-radius:50%;
    position:absolute;
    top:14%;
    right:-15%;
    height:15px;
    width:15px;
    text-align: center;
    }
    .hidden{
        display: none
    }
</style>
