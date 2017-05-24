<template>
    <div class="sidebar" >
        <el-menu :default-active="onRoutes" id="sidebar" class="el-menu-vertical-demo" unique-opened router >
            <!-- <el-menu-item index="readme">
                <i class="el-icon-my-shouye"></i>首页
            </el-menu-item>
            <el-menu-item index="calendar" @click='clearCounter'>
              <i  class="el-icon-my-wodericheng"></i>任务提醒
              
              <div class="counterdiv" :class="{hidden:!acounter}"> 
              <span style="position:absolute;right:15%;bottom:-7%;line-height:normal;color:white;width:16px">
              {{acounter}}
              </span> 
              </div> -->
                <!-- <el-menu-item index="calendar">calendar</el-menu-item> -->
            <!-- </el-menu-item>
            <el-submenu index="3">
                <template slot="title"><i class="el-icon-my-chengyuanguanli"></i>{{duty=='TMK'?'资源' :'客户'}}管理</template>
                <el-menu-item index="basetable">基础表格</el-menu-item>
                <el-menu-item index="vuetable" :class="{hidden:duty=='CC'}">Vue表格组件</el-menu-item>
            </el-submenu>
            <el-submenu index="4">
                <template slot="title"><i class="el-icon-my-xuexiyuandi"></i>学员回访</template>
                <el-menu-item index="baseform">基本表单</el-menu-item>
                <el-menu-item index="vueeditor">编辑器</el-menu-item>
                <el-menu-item index="markdown">markdown</el-menu-item>
                <el-menu-item index="upload">文件上传</el-menu-item>
            </el-submenu>
            <el-submenu index="5">
                <template slot="title"><i class="el-icon-my-tongjifenxi"></i>报表统计</template>
                <el-menu-item index="basecharts">基础图表</el-menu-item>
                <el-menu-item index="mixcharts">混合图表</el-menu-item>
            </el-submenu> -->
            <div v-for="menu in menus">
                    <div v-if="menu._child" >
                         <el-submenu :index='menu.location'>
                            <template slot="title"><i :class="menu.icon"></i>{{menu.menu_name}}</template>
                            <div v-for='caidan in menu._child'>
                                
                        <el-menu-item :index="caidan.location">{{caidan.menu_name}}</el-menu-item>
                            </div>
                    </el-submenu>
                    </div>
                    <div v-else="!menu._child" >
                        <div v-if="menu.index == 'calendar'">
                            <el-menu-item  :index='menu.location' @click='clearCounter'>
                                <i :class="menu.icon"></i>{{menu.menu_name}}
                                 <div class="counterdiv" :class="{hidden:!acounter}"> 
                                <span style="position:absolute;right:15%;bottom:-7%;line-height:normal;color:white;width:16px">
                                {{acounter}}
                                </span> 
                                </div>
                             </el-menu-item>
                        </div> 
                        <div v-else="menu.location != 'calendar'">
                             <el-menu-item  :index='menu.location'>
                                <i :class="menu.icon"></i>{{menu.menu_name}}
                            </el-menu-item>
                        </div>
                    </div>
            </div>
        </el-menu>
    </div>
</template>

<script>
var user = localStorage.getItem('user');
var token = JSON.parse(user).token;
import { mapGetters } from 'vuex';
import { mapActions } from 'vuex';
 import { counterList } from '../../api/api';
  import { menuList } from '../../api/api';
    export default {
        data(){
            return {
                menus :[],
                counter:''
            }
        },
        computed:{
            onRoutes(){
                return this.$route.path.replace('/','');
            },
            acounter:{
                set: function(value) {
                this.acounter = value;
            },
            get: function() {
                 return this.counter+this.getCount
            }

               
            },
            ...mapGetters([
                'getCount'
      // ...
            ])
        },
        methods:{
            getcounter(){
                 let self = this;
                let para = {
          counter:this.counter
        };
        //NProgress.start();
        counterList(para).then((res) => {
          //NProgress.done();
          this.counter = res.counter;
        });
            },
            clearCounter(){
                this.counter = 0;
                this.clear();
            },
            ...mapActions([
                'clear'
      // ...
            ]),
            getMenu(){
                let self = this;
                let para = {
          counter:this.counter
        };
        menuList(token).then((res) => {
            // console.log(res)
          //NProgress.done();
          this.menus = res.data;
        });
            }
        },
        created(){
            this.getcounter();
            this.getMenu();
        }
    }
</script>

<style scoped>
.el-menu-vertical-demo{
    background-color: #2b3a40
}
    .sidebar{
        display: block;
        position: absolute;
        width: 250px;
        left: 0;
        top: 70px;
        bottom:0;
        background: #2E363F;
    }
    .sidebar > ul {
        height:100%;
    }
    .counterdiv{
    background-color:skyblue;
    border-radius:40%;
    border:1px solid skyblue;
    position:absolute;
    top:32%;
    right:6%;
    height:15px;
    width:24px;
    text-align: center;
    }
    .hidden{
        display: none
    }
</style>
