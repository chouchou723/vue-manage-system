<template>
    <!-- <div class="menuLogo"> -->
    <!-- <div class="logobg"> -->
        <!-- <div class="logo" ><img src="../../../static/img/topic_03.png"  width="170"  ></div>  -->
        <!-- </div>     -->
        <div class="sidebar">
               <div class="logo" ><img src="../../../static/img/topic_03.png"  width="170"  ></div> 
     <!-- </div>   -->
            <el-menu :default-active="onRoutes" id="sidebar" class="el-menu-vertical-demo" :default-openeds='defaultOpeneds' router>
                <div v-for="menu in menus">
                    <div v-if="menu._child" class="menuH">
                        <!-- 假如有二级菜单 -->
                        <!-- <div v-if="menu.location == '/calendar'">
                            <el-menu-item :index='menu.location'>
                                <i :class="menu.icon" style='margin-right:0'></i><span style='padding-left:5px;'>
                                    {{menu.menu_name}}
                                </span>
                            </el-menu-item>
                        </div> -->
                        <!-- <div > -->
                            <el-submenu :index='menu.location'>
                                <template slot="title"><i :class="[menu.icon,'iconfont']" style='margin-right:10px;'></i>{{menu.menu_name}}
                                </template>
                                <div v-for='i in menu._child'>
                                    <el-menu-item :index="i.location" style='padding-left:49px'>{{i.menu_name}}</el-menu-item>
                                </div>
                            </el-submenu>
                        <!-- </div> -->
                    </div>
                    <div v-else="!menu._child" class="menuH">
                        <el-menu-item :index='menu.location'>
                            <i :class="[menu.icon,'iconfont']" style='margin-right:10px;'></i>{{menu.menu_name}}
                                <!-- {{menu.menu_name.replace(/(?=\-).+/,'')}} -->
                        </el-menu-item>
                    </div>
                </div>
            </el-menu>
        </div>
    <!-- </div> -->
</template>
<script>
var token
import {
    menuList
} from '../../api/api';
export default {
    data() {
            return {
                menus: [],
                defaultOpeneds: [],
            }
        },
        computed: {
            onRoutes() {
                return this.$route.path.replace('', '');
            },
        },
        methods: {
            getMenu() {//动态菜单获取
                menuList(token).then((res) => {
                    this.menus = res.data;
                    res.data.map(item => {
                        this.defaultOpeneds.push(item.location);
                    })
                    // sessionStorage.setItem('menuOption',JSON.stringify(this.menus))
                });
            }
        },
        beforeCreate() {
            let user = sessionStorage.getItem('user');
            token = JSON.parse(user).token;
        },
        created() {
            this.getMenu();
        },
}
</script>
<style scoped>
.el-menu-vertical-demo {
    background-color: #2b3a40
}

.sidebar {
    display: block;
    /* position: absolute;
    left: 0;
    top: 48px;
    bottom: 0; */
    height: 100%;
    background: #2E363F;
    overflow-y: scroll;
    flex:0 0 188px;
}
.sidebar::-webkit-scrollbar {
    display: none
}
/* .sidebar > ul { */
    /* height: 100%; */
    /* margin-top: 48px; */
/* } */
.sidebar li{
    width:188px;
}
/* .logobg{
    width: 188px;height: 70px;background-color: #2b3a40;float: left;
} */
.menuLogo{
flex:0 0 188px;height:100%;background-color: #2b3a40
}
.logo{
margin-top:10px;margin-left:5px
}
.menuH{
    border-top:1px solid rgba(255,255,255,.5) 
}
</style>
