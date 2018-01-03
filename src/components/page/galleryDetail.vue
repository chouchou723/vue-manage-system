<template>
        
            <div class="galleryDetail">
                    <div class="crumbs">
                            <el-breadcrumb separator="/">
                                <el-breadcrumb-item>
                                    <i class="el-icon-my-tongxunlu"></i> 学员中心</el-breadcrumb-item>
                                <el-breadcrumb-item to='/galleryManage'>画廊管理</el-breadcrumb-item>
                                <el-breadcrumb-item class='ss'>{{student.child_name}}</el-breadcrumb-item>
                            </el-breadcrumb>
                        </div>
                <div class='gallDetail'>
                    <div>

                        <h2 class="galleryDetailH">
            
                           {{student.child_name}}
                        </h2>
                       <div style="line-height:35px;">作品数:{{student.total}}</div>
                    </div>
                   <div  style='display:flex;justify-content: flex-start;padding-left:10px;padding-bottom:10px;color:#a1a1a1'>
                       <div>所在校区:{{student.school}}</div>
                       <div style='padding:0 20px'>家长:{{student.contacts_user}}</div>
                       <div style='padding-right:20px;'>手机:{{student.contacts_user_mobile}}</div>
                       <div>他的课程:</div>
                       <div style="display:flex;flex-wrap:wrap;width:55%;justify-content:flex-start;">

                           <div v-for="item in student.kecheng" style='margin-bottom:10px;margin-right:10px;'>{{item}};</div>
                       </div>
                       
                   </div>
                    
                </div>
                <el-dialog title="查看作品" :visible.sync="dialogFormVisibleLast" :close-on-click-modal="no" top='7%' show-close>
                        <div style="text-align:center">
    
                            <img :src="dImg" alt="">
                        </div>
                        </el-dialog>
                <div id="galleryDetailTABLE">
                    <el-table :data="noEffData"  style="width: 100%" @sort-change='sortChange'>
                            <el-table-column prop="imgUrl" label="作品" width='150'>
                                    <template scope="scope">
                                            <div style='display:flex;justify-content: center;'>
                                                    <img :src="scope.row.imgUrl" height='100' width='100' alt="" @click="openImg(scope.row.imgUrl)" class='galleryDetailhOVER'>
                                            </div>
                                        </template>
                                </el-table-column>
                                <el-table-column prop="title" label="作品名" >
                                    </el-table-column>
                                    <el-table-column prop="info" label="简介" >
                                        </el-table-column>
                        <!-- <el-table-column prop="school_name" label="所在校区"  width='120'>
                            </el-table-column> -->
                        <el-table-column prop="created" label="发布时间" sortable='custom' width='120'>
                            </el-table-column>
                            <el-table-column prop="good_num" label="点赞数" width='80' sortable='custom'>
                                </el-table-column>
                                <el-table-column prop="click_num" label="浏览数" width='80' sortable='custom'>
                                    </el-table-column>
                        <el-table-column prop="recommend_title" label="作品状态" width='80'>
                                <template scope="scope">
                                        <span :style="scope.row.recommend==1? 'color:#4056e0' : scope.row.recommend==2?'color:#dba31d':scope.row.recommend==-1?'color:#f05a5a':''">{{scope.row.recommend_title}}</span>
                                    </template>
                        </el-table-column>
                        <el-table-column label="操作" width='120'>
                                <template scope="scope">
                                        <el-button type="text" size="small" @click="open(scope.row.id, 1)" v-if="scope.row.recommend=='0'">官网推荐</el-button>
                                        <el-button type="text" size="small" @click="open(scope.row.id, 2)" v-if="scope.row.recommend=='0'||scope.row.recommend==1">首页推荐</el-button>
                                        <el-button type="text" size="small" @click="open(scope.row.id, -1)" v-if="scope.row.recommend!=-1" style='color:red'>屏蔽</el-button>
                                    <!-- <el-button type="text" size="small" @click="open2(scope.$index, accountData)" style='color:red'>官网推荐</el-button>
                                    <el-button type="text" size="small" @click="open(scope.$index, accountData)" >首页推荐</el-button> -->
                                </template>
                            </el-table-column>
                    </el-table>
                </div>
                <div class="galleryDetailBlock">
                      <!-- <span class="demonstration"></span> -->
                    <el-pagination layout="prev, pager, next" :total="total" :current-page="currentPage" :page-size="pagesize" @current-change="handleCurrentChange">
                    </el-pagination>
                </div>
            </div>
        
        </template>
        <script>
            var user, token
            import {
                hualangList,
                recomHualangWork
            } from '../../api/api';
            export default {
                data() {
                    return {
                        student:{kecheng:[]},
                        total: 0,
                        number: '0',
                        noEffData: [],
                        currentPage: 1, //页数
                        pagesize: 15, //默认每页
                        sortName:'',
                        sortOrder:'',
                        dImg:'',
                        dialogFormVisibleLast:false,
                        no:false,
                    }
                },
                methods: {
                    openImg(img){
                        this.dImg = img
                        this.dialogFormVisibleLast = true;

                    },
                    open(id,type){
                        // console.log(id)
                        let a = ''
                        if(type===1){
                            a = '是否将该作品推荐至官网?';
                        }else if(type===2){
                            a = '是否将该作品推荐至首页?';
                        }else{
                            a='是否屏蔽该作品?'
                        }
                             this.$confirm(a, '设置作品', {
                        // customClass: 'redwarn',
                        confirmButtonText: '是',
                        cancelButtonText: '否',
                        type: type===-1?'error':'',
                        customClass: type===-1?'redwarn':'green',
                    }).then(() => {
                        let para = {
                            id:id,
                            type:type
                        }
                        recomHualangWork(para, token).then((res) => {
                            if(res.code==0){

                                this.$message.success('设置成功')
                                this.fetchData();
                            }else{
                                this.$message.error(res.data)
                            }
                        })
                        }).catch(() => {         
                        });
                    },
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
                    fetchData() {
                        let para = {
                            uid: this.$route.params.uid,
                            sortName:this.sortName,
                            sortOrder:this.sortOrder,
                            page: this.currentPage,
                        }
                        hualangList(token,para).then((res) => { //替换服务
                            this.number = res.data.total;
                            this.student = res.data.uinfo
                            let a = res.data.list;
                            let c = res.data.lastpage * this.pagesize;
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
        
            .galleryDetailhOVER:hover {
                cursor: pointer;
            }
        
            .galleryDetailhOVER {
                font-weight: 600;
                color:#1fb5ad
            }
        
            .galleryDetail .galleryDetailBlock {
                text-align: center;
                margin-top: 10px;
            }
        
            .galleryDetailH {
                float: left;
                margin-right: 15px;
                padding-left: 10px;
                margin-bottom: 10px;
            }
        
            .gallDetail {
                width: 100%;
                position: relative;
                height: auto;
                display: flex;
                flex-direction: column;
              justify-content: flex-start;
                background-color: white;
              margin-top:0;
              padding-top:10px;
              /* margin-bottom: 5px; */
              border-radius: 5px;
            }
        .galleryDetail .el-dialog .el-dialog__header {
        background-color: #1fb5ad;
        padding: 20px 20px 20px;
    }

    .galleryDetail .el-dialog .el-dialog__title {
        color: white;
    }
        </style>
        