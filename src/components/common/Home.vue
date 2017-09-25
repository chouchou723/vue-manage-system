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
        components:{
            vHead, vSidebar
        },
        computed: {
    // key() {
    //     return this.$route.name !== undefined? this.$route.name + +new Date(): this.$route + +new Date()
    // }
 }
    }
</script>
