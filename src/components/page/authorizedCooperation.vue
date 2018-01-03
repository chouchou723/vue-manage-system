<template>
    
        <div class="authCooA">
            <!-- <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-my-moban"></i> 资源管理</el-breadcrumb-item>
                <el-breadcrumb-item class='ss'>无效资源</el-breadcrumb-item>
            </el-breadcrumb> -->
            <div class='authCooAH'>
                <h3 class="authCooAH1">
    
                   授权合作
                </h3>
                <!-- <div class="IRtitle">
                    <div class='studentReturnThreeNoEff'>
                        <el-select v-model="value" clearable placeholder="选择校区" filterable @change="updateList">
                            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                            </el-option>
                        </el-select>
                    </div>
                    <div class='studentReturnThreeNoEff'>
                        <el-cascader :options="options2" :props="propsource" v-model="value2" :show-all-levels="false" @change="updateList" clearable
                            change-on-select placeholder="选择渠道">
                        </el-cascader>
                    </div>
                    <div class='studentReturnThreeNoEffTime'>
                        <el-date-picker v-model="value3" type="daterange" placeholder="录入时间" @change="updateList">
                        </el-date-picker>
                    </div>
                </div> -->   
            </div>
            <div>
                <el-table :data="noEffData"  style="width: 100%" >
                    <el-table-column prop="name" label="申请人">
                        <!-- <template scope="scope">
                            <span @click="switchDetail(scope.row)" class='nicknameSpanI'>{{scope.row.names}}</span>
                        </template> -->
                    </el-table-column>
                    <el-table-column prop="brithdy" label="出生年月" >
                    </el-table-column>
                    <el-table-column prop="mobile" label="手机号码" >
                    </el-table-column>
                    <el-table-column prop="store_addr" label="投资区域">
                    </el-table-column>
                    <el-table-column prop="source" label="来源">
                    </el-table-column>
                    <el-table-column prop="created" label="申请时间" >
                    </el-table-column>
                </el-table>
            </div>
            <div class="block">
                  <!-- <span class="demonstration"></span> -->
                <el-pagination layout="prev, pager, next" :total="total" :current-page="currentPage" :page-size="pagesize" @current-change="handleCurrentChange">
                </el-pagination>
            </div>
        </div>
    
    </template>
    <script>
        var user, token
        import {
            jiamengLIst
        } from '../../api/api';
        export default {
            data() {
                return {
                    total: 0,
                    // number: '0',
                    noEffData: [],
                    currentPage: 1, //页数
                    pagesize: 15, //默认每页
                    sortName:'',
                    sortOrder:'',
                }
            },
            methods: {
                sortChange(column){
                    let {prop,order} = column
                    // console.log(prop)
                    this.sortName=prop;
                    this.sortOrder = order;
                    this.currentPage = 1;
                    this.fetchData()
                },
                handleCurrentChange: function (val) {
                    this.currentPage = val;
                    this.fetchData();
                },
                // updateList() {
                //     this.currentPage = 1;
                //     this.fetchData();
    
                // },
                fetchData() {
                    let para = {
                        page: this.currentPage
                    }
                    jiamengLIst(para, token).then((res) => { //替换服务
                        // this.number = res.data.total;
                        let a = res.data.data;
                        let c = res.data.last_page * this.pagesize;
                        this.noEffData = a;
                        this.total = parseInt(c);
                    })
                },
            },
    
            beforeCreate() {
                user = sessionStorage.getItem('user');
                token = JSON.parse(user).token;
            },
            created() {
                // this.code = JSON.parse(user).job?JSON.parse(user).job.code : '';
                this.fetchData();
            },
        }
    
    </script>
    <style>
        /* #table3IR .el-table td,
        #table3IR .el-table th:not(.gutter) {
            padding: 1px;
            text-align: center
        }
    
        #table3IR .el-table th>div,
        #table3IR .el-table .cell {
            padding-left: 0;
            padding-right: 0;
        } */
    
    
        .authCooA .block {
            text-align: center;
            margin-top: 10px;
        }
    
        .authCooAH1 {
            float: left;
            margin-right: 5px;
            padding-left: 10px;
            margin-bottom: 10px;
            margin-top: 5px;
        }
    
        .authCooAH {
            width: 100%;
            position: relative;
            height: auto;
            display: flex;
            flex-wrap: wrap;
          justify-content: flex-start;
            background-color: white;
          /* margin-top:0; */
          padding-top:10px;
          margin-bottom: 5px;
          border-radius: 5px;
        }
    /* .IRtitle{
        display:flex;flex-wrap:wrap;
    margin-right:5px;
    } */
    </style>
    