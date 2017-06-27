<template>
    <div class="crumbs"  v-loading.body.lock="fullscreenLoading">
        <el-breadcrumb separator="/">
            <el-breadcrumb-item><i class="el-icon-my-sousuo"></i> 搜索结果</el-breadcrumb-item>
        </el-breadcrumb>
        <div class='accouSearch'>
            <h2 class="mydataReturnSearch">
               搜索到的相关的结果有{{number}}条
      </h2>
            
        </div>
        <div id="tableSR" >
            <el-table :data="searchData" border style="width: 100%" :show-header="no" :default-sort="{prop: 'last_time', order: 'descending'}">
            <el-table-column prop="symbol" label="标记" width='120'>
             <template scope="scope">
                        <span @click="switchDetail(scope.row)" :class='{myCircle:scope.row.ishas == 1}' style="margin-left:30px">{{scope.row.ishas == 1?'查看':''}}</span>
                    </template>
                </el-table-column>

                <el-table-column prop="group_name" label="所属"  width='120'>
                </el-table-column>
                <el-table-column prop="names" label="姓名"  width='150'>
                    <template scope="scope">
                        学生: <span  :style="scope.row.title == getSearchKey?'color:#1fb5ad':'color:black'">{{scope.row.title}}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="patriarch" label="家长"  width='150'>
                <template scope="scope">
                        家长: <span :style="scope.row.patriarch == getSearchKey?'color:#1fb5ad':'color:black'">{{scope.row.patriarch}}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="mobile" label="手机" :formatter='formatter' width='180'>
                <template scope="scope">
                      手机：<span :style="scope.row.mobile == getSearchKey?'color:#1fb5ad':'color:black'">{{scope.row.mobile?scope.row.mobile.substring(0,4)+'****'+scope.row.mobile.substring(8):''}}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="school" label="校区" >
                 <template scope="scope">
                        <span >校区: {{scope.row.school_name}}</span>
                    </template>
                </el-table-column>
            </el-table>
            <!-- <div class="block">
                <span class="demonstration"></span>
                <el-pagination layout="prev, pager, next" :total="total" :current-page="currentPage" :page-size="pagesize" @current-change="handleCurrentChange">
                </el-pagination>
            </div> -->
        </div>
    </div>
</template>
<script>
var token, user
import {
    searchResource
} from '../../api/api';
import {
    mapActions,mapGetters
} from 'vuex';

export default {
    data() {

            return {
                fullscreenLoading:true,
                no:false,
                code: '',
                currentPage: 1, //页数
                pagesize: 15, //默认每页
                total: 0, //总页数
                searchData: [],
                number: 0,
                optionsTMK: [], //TMK SELECT
                options: [], //表单上方的select
                options2: [], //渠道来源
                input2: '', //姓名或手机号码
                value1: '', //对应select的值
                value2: '', //对应select的值
                value3: '', //对应select的值
                value4: '',
                value5: '',
                valueR: '',
                valueT: ''
            }
        },
        methods: {
            ...mapActions([
                'sendResourceId',
                'sendUser'
            ]),
            formatter(row, column) {
                // console.log(row)
              let reg = /(\d{4})\d{4}(\d{3})/;
              if(reg.test(row.row.mobile)){
                  return row.row.mobile.replace(reg,'$1****$2');
              }else{
                return row.row.mobile
              }
            },
            switchDetail(row) {
                if(row.ishas){
                    switch(row.group_name){
                        case '无效资源': let uid = {
                                                    u_id: row.id,
                                                    u_status: '无效资源',
                                                    u_resource: 3
                                                    }
                                         this.sendResourceId(uid).then(()=>{
                                            this.$router.push('/userDetail');
                                            })
                                         break;
                        case '无需求资源':let uid1 = {
                                                    u_id: row.id,
                                                    u_status: '无需求资源',
                                                    u_resource: 2
                                                    }
                                         this.sendResourceId(uid1).then(()=>{
                                            this.$router.push('/userDetail');
                                            })
                                         break;
                        case '我的资源': let uid2 = {
                                                    u_id: row.id,
                                                    u_status: row.status,
                                                    u_resource: 1
                                                    }
                                         this.sendResourceId(uid2).then(()=>{
                                            this.$router.push('/userDetail');
                                            })
                                         break;
                        case '学员回访': 
                                            this.sendUser(row.id)
                                            this.$router.push('/returnDetail');
                                         break;

                
                }
                
            }
            },
            changeLocking(data){
                return new Promise(function(resolve,reject){
               this.number = data.data.count;
            this.searchData = data.data.data;  
        })
            }
        },
        computed:{
        ...mapGetters([
                'getSearchKey'
      // ...
            ])
        },
        beforeCreate() {
            user = localStorage.getItem('user');
            token = JSON.parse(user).token;
        },

        created() {
             this.fullscreenLoading = true;
              let para = {
                    search : this.getSearchKey
                }
             searchResource(para,token).then(res=>{
                   this.number = res.data.count|| 0
                this.searchData = res.data.data;
                }).then(()=>{
                    this.fullscreenLoading = false
                }).catch(()=>{
                     this.fullscreenLoading = false
                    this.$message.error('该用户未授权')
                })
           // if(this.getSearch){
           //  this.changeLocking(this.getSearch).then((resolve)=>{
           //      this.fullscreenLoading = false
           //  })
           
           // }else if(this.getSearch.length == 0){
           //  this.fullscreenLoading = false
           // }
        },
        watch:{
            'getSearchKey'(){
                this.fullscreenLoading = true;
                let para = {
                    search : this.getSearchKey
                }
                searchResource(para,token).then(res=>{
                   this.number = res.data.count|| 0
                this.searchData = res.data.data;
                }).then(()=>{
                    this.fullscreenLoading = false
                }).catch(()=>{
                     this.fullscreenLoading = false
                    this.$message.error('该用户未授权')
                })

            }
        }
}
</script>
<style>
#tableSR .el-table td,
#tableSR .el-table th {
    padding: 1px;
}
#tableSR .el-table--border td, .el-table--border th{
    border-right: none;
}
#tableSR .el-table th>div,
#tableSR .el-table .cell {
    padding-left: 0;
    padding-right: 0;
}


.accouSearch {
    width: 100%;
    position: relative;
    height: 42px;
    background-color: white;
     margin-top:30px;
  padding-top:10px;
  margin-bottom: 5px;
  border-radius: 5px;
}

.mydataReturnSearch {
    float: left;
    padding-left:15px;
}
.greenSpan{
    color:green;
}
.myCircle{
    color:white;
    background-color: #ffadad;
    width:40px;
    height: 20px;
    border-radius: 15px;
    padding:5px 7px;
}
.myCircle:hover{
    cursor: pointer;
}
.block {
    text-align: center;
    margin-top: 10px;
}
</style>
