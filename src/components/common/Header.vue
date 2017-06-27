<template>
    <div class="header" >
    	<!-- <div class="logobg" style="width: 183px;height: 70px;background-color: #2b3a40;float: left;">
        <div class="logo"><img src="../../../static/img/topic_03.png"  width="170"  @click='refresh'></div> 
        </div>   -->  
        
        <div class="hoverbg" style="width: 245px;height: 70px;float: left; padding-left:183px" v-if="this.code != 'hr'">
            <div class='search'>
            <el-input
              placeholder="请输入姓名,手机号"
              icon="search"
              clearable
              v-model="input2"
              :on-icon-click="handleIconClick"
              @keyup.enter.native='handleIconClick'>
            </el-input>
            </div>
        </div>    

            	<!-- <div class="hoverrt" style="float:left;margin-left:5px;width: 55px;height: 70px;">
            <img id='addUser' src="../../../static/img/add.png" height="30" width="28" @click="gotoAdd" >
            </div> -->
        <div class="user-info">
            <el-dropdown  @command="handleCommand">
                <span class="el-dropdown-link">
                    <img class="user-logo" :src="agetSrc">
                    <div >
                     {{username}}
                     <span class='duty_color'>[{{duty}}]</span>
                    </div>
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
        <el-dropdown  @command="handleCommand" style="height:48px" @visible-change="getData" >
        <div>
            <a href="javascript:;"><img src="../../../static/img/mess.png" width="30" alt="" style="padding-top:32%"></a>
        </div>
                
            <div class="counterdiv" :class="{hidden:!messageAmount}"> 
                <span class='amountColor'>
                {{messageAmount}}
                </span> 
            </div>
                <el-dropdown-menu slot="dropdown" >
                 <el-dropdown-item v-for='item in notifyMessage' style='width:300px;'  v-loading="loading">
                     <div style="text-align:left;font-size:10px;font-weight:600">{{item.title}}</div>
                     <div style="text-align:left;font-size:10px;color:#666666;line-height:20px">{{item.content}}</div>
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
var token, user
import { mapGetters,mapActions } from 'vuex';
import {searchResource } from '../../api/api';
    export default {
        data() {
            return {
                code:'',
                 loading: true,
                username: '',
                agetSrc: '',
                duty:'',
                input2:'',
                messageAmount:11,
                notifyMessage:[],
            }
        },
        methods:{
             ...mapActions([
                'searchKey'
            ]),
            getData(val){
                // this.$on('visible-change',this.goSystem)
                // if(visible ==true){
                if(val == true){
                    this.notifyMessage = [{
            title: '徐家汇校区通知',
            content: '夫君子之行，静以修身，俭以养德，非淡泊无以明志，非宁静无以致远',
            date: '2017-06-12 14:30'
        }, {
            title: '徐家汇校区通知',
            content: '欲思其利,必虑其害,欲思其成,必虑其败',
            date: '2017-06-11 14:30'
        }, {
            title: '徐家汇校区通知',
            content: '下周一开始要努力工作',
            date: '2017-06-06 14:30'
        }]
        // this.loading= false;
                }
               // console.log(val)
                // }
            },
            goSystem(){
                this.$router.push('/systemMessage')
            },
            refresh(){
                 this.$router.go();
            },
            handleCommand(command) {
                if(command == 'loginout'){
                    localStorage.removeItem('user')
                     // this.$router.go();
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
                // console.log(ev);
                let para = {
                    search : this.input2
                }
                this.searchKey(this.input2);
                    this.$router.push('/searchResult')
                // searchResource(para,token).then(res=>{
                //     this.searchContent(res)
                // }).then(()=>{

                //     // this.input2 = ''
                // })

                
            },
            gotoAdd(){
                this.$router.push('/addUser')
            }
        },
        computed:{
            // userAvatar(){
            //     return this.agetSrc
            // },
      //   ...mapGetters([
      //           'getSrc'
      // // ...
      //       ])
        },
         beforeCreate() {
            user = localStorage.getItem('user');
            token = JSON.parse(user).token;
        },
        created() {
             this.code = JSON.parse(user).job ? JSON.parse(user).job.code : ''; //获取职位code
            // var user = localStorage.getItem('user');
            if (user) {
                let user1 = JSON.parse(user);
                // console.log(user);
                this.username = user1.uname || '';
                this.agetSrc = user1.avatar || '';
                this.duty = user1.job?user1.job.full_name : ''
               
            }

        },
        beforeDestroy() {
        this.$router.go();
    },
    }
</script>
<style >
	.hoverbg{
		/*background: #95a0aa;*/
	}
	.hoverrt{
		background:#6daba8 ;
	
	}
	.hoverrt:hover{
		background-color: #1fb5ad;
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
        color: #000000 ;
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
    .search{
        float:left;
        width:240px;
        margin-left:20px;
        margin-top:-2px;
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
        /*margin-top:10px;*/
        margin-right:20px;
        position:relative;
    }
    .amountColor{
        position:absolute;
        right:0;
        bottom:0;
        top:0;
        left:0;
        line-height:17px;
        color:white;
    }
    .user-info .el-dropdown-link{
        position: relative;
        display: inline-block;
        padding-left: 50px;
        color: #959595;
        cursor: pointer;
        vertical-align: middle;
    }

    .user-info .user-logo{
        position: absolute;
        left:0;
        top:2px;
        width:40px;
        height:40px;
        border: 1px solid;
        border-radius: 20px;
    }

    .el-dropdown-menu__item{
        text-align: center;
    }
    .counterdiv{
    background-color:#d08124;
    border-radius:50%;
    position:absolute;
    top:6px;
    right:-15%;
    height:17px;
    width:17px;
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
    	/*background-color: #6daba8;*/
        /*border:1px solid #6daba8;*/
        cursor: pointer;
    }


</style>
