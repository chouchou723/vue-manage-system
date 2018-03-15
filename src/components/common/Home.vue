<template>
    <div class="wrapper wflex1">
        <v-sidebar></v-sidebar>
        <div class="wflex">
                <v-head ></v-head>

            <div class="content">
        <router-view ></router-view>
            </div>
        </div>
    </div>
</template>
<script>
    import vHead from './Header.vue';
    import vSidebar from './Sidebar.vue';
    export default {
        data(){
            return {
            }
        },
        components:{
            vHead, vSidebar
        },
    }
</script>
<style>
.wflex{
    display: flex;
    flex-direction: column;
    width:calc(100% - 188px);
}
.wflex1{
    display: flex;
}
</style>
