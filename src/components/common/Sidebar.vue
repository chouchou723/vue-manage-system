<template>
    <div style="overflow:hidden;position:absolute;left:0;top:0;width:183px;height:100%">
    <div class="logobg" style="width: 183px;height: 70px;background-color: #2b3a40;float: left;">
        <div class="logo" style='margin-top:10px;margin-left:5px'><img src="../../../static/img/topic_03.png"  width="170"  ></div> 
        </div>    
        <div class="sidebar">
            <el-menu :default-active="onRoutes" id="sidebar" class="el-menu-vertical-demo" :default-openeds='defaultOpeneds' router>
                <div v-for="menu in menus">
                    <div v-if="menu._child" style='border-top:1px solid rgba(255,255,255,.5)'>
                        <!-- 假如有二级菜单 -->
                        <div v-if="menu.location == '/calendar'">
                            <el-menu-item :index='menu.location'>
                                <i :class="menu.icon"></i>{{menu.menu_name}}
                                <!-- <div class="counterdiv" :class="{hidden:!acounter}">
                                    <span style="position:absolute;right:15%;bottom:-7%;line-height:normal;color:white;width:16px">
                                {{acounter}}
                                </span>
                                </div> -->
                            </el-menu-item>
                        </div>
                        <div v-else="menu.location != '/calendar'">
                            <el-submenu :index='menu.location'>
                                <template slot="title"><i :class="menu.icon"></i>{{menu.menu_name}}</template>
                                <div v-for='i in menu._child'>
                                    <el-menu-item :index="i.location" style='padding-left:49px'>{{i.menu_name}}</el-menu-item>
                                </div>
                            </el-submenu>
                        </div>
                    </div>
                    <div v-else="!menu._child" style='border-top:1px solid rgba(255,255,255,.5)'>
                        <el-menu-item :index='menu.location'>
                            <i :class="menu.icon"></i>{{menu.menu_name.replace(/(?=\-).+/,'')}}
                        </el-menu-item>
                    </div>
                </div>
            </el-menu>
        </div>
    </div>
</template>
<script>
var token
// import {
//     mapGetters,
//     mapActions
// } from 'vuex';
import {
    menuList
} from '../../api/api';
export default {
    data() {
            return {
                menus: [],
                // counter: '',
                defaultOpeneds: [],
                // notiData:[]
            }
        },
        computed: {
            onRoutes() {
                return this.$route.path.replace('', '');
            },
            // acounter: { //任务提醒数字共享
            //     set: function(value) {
            //         this.acounter = value;
            //     },
            //     get: function() {
            //         return this.counter + this.getCount
            //     }
            // },
            // ...mapGetters([
            //     'getCount'
            //     // ...
            // ])
        },
        methods: {
            // abcd(a) {
            //     // this.$router.go
            //     // console.log(a)
            //     // switch (a.location) {
            //     //     case '/myResource':
            //     //         this.$router.go({path:'/myResource'});
            //     //         break;
            //     //     case '/noDemandResource':
            //     //         this.$router.go({path:'/noDemandResource'});
            //     //         break;
            //     //     case '/invalidResource':
            //     //         this.$router.go('/invalidResource');
            //     //         break;
            //     //     default:
            //     //         // statements_def
            //     //         break;
            //     // }
            //     // if(a.location == '/myResource'){
            //     //      this.$router.go();
            //     // }
            //     //              this.$router.go({path:a.location,
            //     //              query: {
            //     //     t: + new Date()
            //     // }})
            // },
            // close() {
            //     clearInterval('setopen')
            // },
            // setopen() {
            //     setInterval(this.open2, 2000)
            // },
            // open2(data) { //任务提醒以后做

            //     this.$notify.info({
            //         title: data.title,
            //         message: data.message,
            //         duration: 0,
            //         onClose: close,
            //         offset:100,
            //     });
            // },
            // open(data){
            //     return new Promise(function(resolve, reject){
            //         resolve(data)
            //     })
            // },
            // getcounter() { //调服务获取当天任务数
            //     let self = this;
            //     let para = {
            //         counter: this.counter
            //     };
            //     // counterList(para).then((res) => {
            //     //   this.counter = res.counter;
            //     // });
            // },
            // clearCounter() {
            //     this.counter = 0;
            //     this.clear();
            // },
            // ...mapActions([
            //     'clear'
            //     // ...
            // ]),
            getMenu() {//动态菜单获取
                let para = {
                    counter: this.counter
                };
                menuList(token).then((res) => {
                    res.data.map(item => {
                        this.defaultOpeneds.push(item.location);
                    })
                    this.menus = res.data;
                    // localStorage.setItem('menuOption',JSON.stringify(this.menus))
                });


            }
        },
        beforeCreate() {
            let user = localStorage.getItem('user');
            token = JSON.parse(user).token;
        },
        created() {
            // this.getcounter();
            this.getMenu();
            // var i=0;
            // let that= this;
            // function open(){
            //     this.$notify({
            //         title:'hello',
            //         message:'world',
            //         duration:0,
            //         onClose:close
            //     })
            // }
            // this.notiData =[{title:'9:30',
            //     message:'记得要吃饭'},
            //     {title:'19:30',
            //     message:'记得要吃饭'},
            //     {title:'11:30',
            //     message:'记得要吃饭'}]
            // this.setopen();
            // this.notiData.map(item=>{
            //     this.$notify({
            //         title: item.title,
            //         message: item.message,
            //         duration: 0,
            //         onClose: close
            //     });
            // })
        },
        // beforeDestroy() {
        //     localStorage.removeItem('menuOption')
        // },
        // watch:{
        //     notiData:function(val,oldVal){
        //         if(val){
        //             var l = val.length;
        //              let that = this;
        //              var i =0
        //              this.open(val).then(res=>{
        //                     res.reduce((prev,next)=>{
        //                              // this.open2(next);
        //                              // setTimeout(this.open2(next), 2000)
        //                     }, {})
                       
        //                 // return ires
        //              }).then(res=>{

        //              })
        //              // new promise(resolve, reject){

        //              // }
        //              // this.open2(val[0]).then(()=>{
        //              //    this.open2(val[1])
        //              // })
        //         //     function a (data,i){
        //         //         i++
        //         //         that.$notify({
        //         //     title: data[i].title,
        //         //     message: data[i].message,
        //         //     duration: 0,
        //         //     onClose: close
        //         // });
                       
        //         //         // if(i == l-1){
        //         //         //     clearInterval(open)
        //         //         // }
        //         //     }
        //            // var open =  setInterval(function () { a(val,i); }, 1000);
        //         }
        //     }
        // }
}
</script>
<style scoped>
.el-menu-vertical-demo {
    background-color: #2b3a40
}

.sidebar {
    display: block;
    position: absolute;
    /*width: 200px;*/
    left: 0;
    top: 48px;
    bottom: 0;
    background: #2E363F;
    overflow-y: scroll;
}

.sidebar > ul {
    height: 100%;
}
.sidebar li{
    width:183px;
}
/* .counterdiv {
    background-color: skyblue;
    border-radius: 40%;
    border: 1px solid skyblue;
    position: absolute;
    top: 32%;
    right: 10%;
    height: 15px;
    width: 24px;
    text-align: center;
} */

/* .hidden {
    display: none
} */
</style>
