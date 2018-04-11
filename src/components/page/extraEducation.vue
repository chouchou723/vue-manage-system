<template>
    <div class="eeH">
            <!-- <el-card class="box-card eeH1" v-if="this.shref==''">
                    <img src="../../../static/img/zypt.png" class="eehimage">
                    <div style="padding: 14px;color:#1fb5ad">
                            <i class="iconfont icon-kechengxiaohaoxiangqing"></i>
                            <span >阿特学院1</span>
                      <div style='text-align:right;'>
                              <el-button type="text" class="button" style="color:gray" @click="gotoI">点击进入>></el-button>
                      </div>
                    </div>
                  </el-card> -->
                  <iframe :src="shref" frameborder="0" class="iframea"></iframe>
    </div>
</template>
<script>
    var user, token
    import {
        yifengke
    } from '../../api/api';
    export default {
        data() {
            return {
                shref:''
            }
        },
        methods: {
            // gotoI(){
            //     yifengke(token).then(res=>{
            //         // let a = window.open();
            //     //    a.location =`http://www.yifengke.com/user/i_courseList/0b60d0e0-fb71-11e7-9876-7dbb9503c064?${res.data}`
            //     this.shref = `http://www.yifengke.com/user/i_courseList/0b60d0e0-fb71-11e7-9876-7dbb9503c064?${res.data}`
            //     })
            // },
        },

        beforeCreate() {
            user = sessionStorage.getItem('user');
            token = JSON.parse(user).token;
        },
        created() {
            this.code = JSON.parse(user).job ? JSON.parse(user).job.code : '';
            yifengke(token).then(res=>{
                    // let a = window.open();
                //    a.location =`http://www.yifengke.com/user/i_courseList/0b60d0e0-fb71-11e7-9876-7dbb9503c064?${res.data}`
                this.shref = `http://www.yifengke.com/user/i_courseList/0b60d0e0-fb71-11e7-9876-7dbb9503c064?${res.data}`
                })
        },
    }

</script>
<style>
    .eeH{
        display: flex;
        justify-content: flex-start;
        height: 100%;
    }
    /* .eeH1{
        height: 40%;
        height: 50%;
        flex: 0 0 300px;
    }
    .eeH1 .el-card__body{
        padding-bottom: 0

    } */
   /* .eehimage{
       width:260px;
   } */
.iframea{
    width: 100%;
    height: 100%;
}
</style>
