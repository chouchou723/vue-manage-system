<template>
    <div class="header">
    	<div class="logobg" style="width: 185px;height: 70px;background-color: #2b3a40;float: left;">
        <div class="logo"><img src="../../../static/img/topic_03.png"  width="170"  ></div> 
        </div>    
        
        <div class="hoverbg" style="width: 245px;height: 70px;float: left; ">
            <div class='search'>
            <el-input
              placeholder="请输入姓名,手机号或合同编号"
              icon="search"
              v-model="input2"
              :on-icon-click="handleIconClick">
            </el-input>
            </div>
        </div>    

            	<div class="hoverrt" style="float:left;margin-left:5px;width: 55px;height: 70px;">
            <img id='addUser' src="../../../static/img/add.png" height="30" width="28" @click="gotoAdd" >
            </div>
        <div class="user-info">
            <el-dropdown  @command="handleCommand">
                <span class="el-dropdown-link">
                    <img class="user-logo" :src="userAvatar">
                    <div >
                     {{username}}
                     <span class='duty_color'>[{{duty}}]</span>
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
        <div class='messageAmount'>
            <a href=""><img src="../../../static/img/mess.png" height="30" width="30" alt=""></a>
            <div class="counterdiv" :class="{hidden:!messageAmount}"> 
                <span class='amountColor'>
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
            handleIconClick(ev) {//点击搜索标志的fn
                console.log(ev);
            },
            gotoAdd(){
                this.$router.push('/addUser')
            }
        },
        computed:{
            userAvatar(){
                return this.getSrc ||this.agetSrc
            },
        ...mapGetters([
                'getSrc'
      // ...
            ])
        },
        mounted() {
            var user = localStorage.getItem('user');
            if (user) {
                user = JSON.parse(user);
                // console.log(user);
                this.username = user.uname || '';
                this.agetSrc = user.avatar || '';
                this.duty = user.job.full_name || ''
               
            }

        }
    }
</script>
<style scoped>
	.hoverbg{
		background: #95a0aa;
	}
	.hoverrt{
		background:#6daba8 ;
	
	}
	.hoverrt:hover{
		background-color: #2b3a40;
	}
	.hoverbg:hover
	{background-color: #2b3a40;}
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
        width:183px;
        text-align: center;
        margin-top:20px
    }
    .search{
        float:left;
        width:240px
    }
    .user-info {
        float: right;
        padding-right: 50px;
        font-size: 16px;
        color: #fff;
    }
    .duty_color{
        color:#1fb5ad;
    }
    .messageAmount{
        float:right;
        margin-top:10px;
        margin-right:20px;
        position:relative
    }
    .amountColor{
        position:absolute;
        right:-3%;
        bottom:-3%;
        line-height:normal;
        color:white;
        width:16px;
        font-size:5px
    }
    .user-info .el-dropdown-link{
        position: relative;
        display: inline-block;
        padding-left: 50px;
        color:#000000 ;
        cursor: pointer;
        vertical-align: middle;
    }

    .user-info .user-logo{
        position: absolute;
        left:0;
        top:15px;
        width:40px;
        height:40px;
        border: none;
        border: 1px solid #000000;
        border-radius: 20px;
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
  	#addUser{
  		margin-left: 13px;
  		margin-top: 22px;
  	}
    #addUser:hover{
    	background-color: #2b3a40;
        cursor: pointer;
    }


</style>
