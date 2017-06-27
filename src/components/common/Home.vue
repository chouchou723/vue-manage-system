<template>
    <div class="wrapper"  >
        <v-head ></v-head>
        <v-sidebar></v-sidebar>
        <div class="content">

            <transition name="move" mode="out-in">
   <!-- <keep-alive> -->
    <router-view ></router-view>
<!-- </keep-alive> -->
<!-- <router-view v-if="$route.meta.keepAlive"></router-view> -->
            </transition>
        </div>
    </div>
</template>

<script>
    import vHead from './Header.vue';
    import vSidebar from './Sidebar.vue';
    export default {
        data(){
            return {

            // a:true
            }
        },
    //     methods:{
    //         getMousePos(event) { 
    //   var e = event || window.event; 
    //   var scrollX = document.documentElement.scrollLeft || document.body.scrollLeft; 
    //   var scrollY = document.documentElement.scrollTop || document.body.scrollTop; 
    //   var x = e.pageX || e.clientX + scrollX; 
    //   var y = e.pageY || e.clientY + scrollY; 
    //   //alert('x: ' + x + '\ny: ' + y); 
    //   return { 'x': x, 'y': y }; 
    // } ,
    // test(event){
    //    let b = this.getMousePos(event);
    //   if( b.y>10){
    //     this.a = false;
    //     console.log(document.getElementsByClassName('content')[0])
    //     document.getElementsByClassName('content').top='0'
    //   }else{
    //     this.a = true;
    //   }
    // }
    //     },
        components:{
            vHead, vSidebar
        },
        computed: {
    // key() {
    //     return this.$route.name !== undefined? this.$route.name + +new Date(): this.$route + +new Date()
    // }
 }
    }

 // function getMousePos(event) { 
 //      var e = event || window.event; 
 //      var scrollX = document.documentElement.scrollLeft || document.body.scrollLeft; 
 //      var scrollY = document.documentElement.scrollTop || document.body.scrollTop; 
 //      var x = e.pageX || e.clientX + scrollX; 
 //      var y = e.pageY || e.clientY + scrollY; 
 //      //alert('x: ' + x + '\ny: ' + y); 
 //      return { 'x': x, 'y': y }; 
 //    } 
</script>
