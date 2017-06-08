<template>
    <div class="sidebar" >
        <el-menu id="sidebar" class="el-menu-vertical-demo" :default-openeds='defaultOpeneds' router >
            
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
var token
import { mapGetters,mapActions } from 'vuex';
 import { counterList ,menuList} from '../../api/api';
    export default {
        data(){
            return {
                menus :[],
                counter:'',
                defaultOpeneds:[]
            }
        },
        computed:{
            onRoutes(){
                return this.$route.path.replace('/','');
            },
            acounter:{//任务提醒数字共享
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
            close(){
                clearInterval('setopen')
            },
            setopen(){
                setInterval(this.open2, 2000)
            },
             open2() {//任务提醒以后做
            
        this.$notify({
          title: '提示',
          message: '这是一条不会自动关闭的消息',
          duration: 0,
          onClose: close
        });
      },
            getcounter(){//调服务获取当天任务数
                 let self = this;
                let para = {
                    counter:this.counter
        };
        // counterList(para).then((res) => {
        //   this.counter = res.counter;
        // });
            },
            clearCounter(){
                this.counter = 0;
                this.clear();
            },
            ...mapActions([
                'clear'
      // ...
            ]),
            getMenu(){//动态菜单获取
                let para = {
                counter:this.counter
                };
                menuList(token).then((res) => {
                    res.data.map(item=>{
                       this.defaultOpeneds.push(item.location);
                    })
                this.menus = res.data;
                });

                
            }
        },
        beforeCreate(){
           let user = localStorage.getItem('user');
            token =  JSON.parse(user).token;
        },
        created(){
             this.getcounter();
            this.getMenu();
            // this.setopen();
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
        width: 190px;
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
