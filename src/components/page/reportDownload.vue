<template>
    <div class="downReport"  >
            <el-card class="box-card downContent">
                    <div slot="header" class="clearfix">
                            <span style="line-height: 36px;">签到明细流表</span>
                          </div>
                          <div class="downC1">
                              <el-date-picker v-model="value3" type="daterange" placeholder="日期选择" @change="updateList" :picker-options="pickerOptions0">
                                  </el-date-picker>
                                  <el-button type="primary" @click="openResource(1)" :disabled="value3.length==0||value3[0]-0==0" >导出</el-button>
                          </div>
                  </el-card>
                  <el-card class="box-card downContent">
                        <div slot="header" class="clearfix">
                                <span style="line-height: 36px;">销售明细流表</span>
                              </div>
                              <div class="downC1">
                                    <el-date-picker v-model="value4" type="daterange" placeholder="日期选择" @change="updateList" :picker-options="pickerOptions0">
                                        </el-date-picker>
                                        <el-button type="primary" @click="openResource(2)" :disabled="value4.length==0||value4[0]-0==0" >导出</el-button>
                                </div>
                      </el-card>
                      <el-card class="box-card downContent">
                        <div slot="header" class="clearfix">
                                <span style="line-height: 36px;">负债表导出</span>
                              </div>
                              <div class="downC1">
                                        <el-button type="primary" @click="openResource(3)" :disabled='loading' :loading="loading">导出</el-button>
                                </div>
                      </el-card>
    </div>
</template>
<script>
    var user, token
    import {
        signinListExport,
        salesDetailExport,
        financeExp
    } from '../../api/api';
    export default {
        data() {
            return {
                loading:false,
                value3:[],
                value4:[],
                pickerOptions0: {
                    disabledDate(time) {
                        return time.getTime() > Date.now();
                    }
                },
            }
        },
        methods: {
            openResource(num) { //下载
                if(num ===1){
                    let para = {
                        start_date:new Date(this.value3[0]).toLocaleDateString(),
                        end_date:new Date(this.value3[1]).toLocaleDateString(),
                        
                    }
                    signinListExport(para,token).then(res=>{
                            //  let a = 'http://pandatest.dfth.com/download/stream?name=';
                    let a = '/download/stream?name=';
                        window.open( a+res.data.name)
                    })
                }else if(num ===2){
                    let para = {
                        start_date:new Date(this.value4[0]).toLocaleDateString(),
                        end_date:new Date(this.value4[1]).toLocaleDateString(),
                        
                    }
                    salesDetailExport(para,token).then(res=>{
                            //  let a = 'http://pandatest.dfth.com/download/stream?name=';
                    let a = '/download/stream?name=';
                        window.open( a+res.data.name)
                    })
                }else{
                    this.loading = true;
                    this.$message.info('导出报表时间较长,请耐心等待')
                    financeExp(token).then(res=>{
                             // console.log(res)
                    //   let a = 'http://pandatest.dfth.com';
                        let a = '';
                        window.open( a+res.data)
                    })
                }
            },
        },

        beforeCreate() {
            user = sessionStorage.getItem('user');
            token = JSON.parse(user).token;
        },
        created() {
            this.code = JSON.parse(user).job ? JSON.parse(user).job.code : '';
        },
    }

</script>
<style>
    .downReport{
        display: flex;
        /* justify-content: center; */
        height: 100%;
        flex-wrap: wrap;
        width:100%;
    }
    .downContent{
        width:49%;
        margin-top:20px;
        /* flex: auto; */
    }
    .downC1{
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: stretch;
    }
    .downC1 div{
        margin: 10px auto;
        
    }
   

</style>
