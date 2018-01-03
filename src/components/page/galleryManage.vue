<template>
        
            <div class="galleryManage">
                <!-- <el-breadcrumb separator="/">
                    <el-breadcrumb-item><i class="el-icon-my-moban"></i> 资源管理</el-breadcrumb-item>
                    <el-breadcrumb-item class='ss'>无效资源</el-breadcrumb-item>
                </el-breadcrumb> -->
                <div class='GMnickH'>
                    <h3 class="GMnickFloat">
        
                        画廊管理
                    </h3>
                    <div class="GMnickHt">
                        <div class='GMnickThree'>
                            <el-select v-model="value" clearable placeholder="所在校区" filterable @change="updateList">
                                <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                                </el-option>
                            </el-select>
                        </div>
                        <div class='GMnickThree'>
                            <el-select v-model="value2" clearable placeholder="作品状态" class='CDE142' @change="updateList">
                                <el-option label="官网推荐" value="1"></el-option>
                                <el-option label="首页推荐" value="2"></el-option>
                                <el-option label="屏蔽" value="-1"></el-option>
                            </el-select>
                        </div>
                   
                        
                    </div>
                    <div style="width:200px;position:absolute;right:10px;bottom:10px">
                            <el-input placeholder="输入学员或作品的名字" icon="search" v-model="input2" @keyup.enter.native="updateList" :on-icon-click="updateList"
                                style='margin-right:10px'> </el-input>
                        </div>
                </div>
                <el-dialog title="查看作品" :visible.sync="dialogFormVisibleLast" :close-on-click-modal="no" top='5%' show-close>
                    <div style="text-align:center">
                        <img :src="dImg" alt="">
                    </div>
                    </el-dialog>
                <div id="table3IR">
                    <el-table :data="noEffData"  style="width: 100%" @sort-change='sortChange'>
                            <el-table-column prop="imgUrl" label="作品" width='150'>
                                    <template scope="scope">
                                        <div style='display:flex;justify-content: center;'>

                                            <img :src="scope.row.imgUrl" height='100' width='100' alt="" @click="openImg(scope.row.imgUrl)" class='GMnickS'>
                                        </div>
                                        </template>
                                </el-table-column>
                                <el-table-column prop="title" label="作品名" width='150'>
                                    </el-table-column>
                                    <el-table-column prop="info" label="简介" >
                                        </el-table-column>
                        <el-table-column prop="child_name" label="学生" >
                            <template scope="scope">
                                <span @click="switchDetail(scope.row.uid)" class='GMnickS'>{{scope.row.child_name}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column prop="school_name" label="所在校区" >
                            </el-table-column>
                        <el-table-column prop="created" label="发布时间" sortable='custom' width='150'>
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
                                        <el-button type="text" size="small" @click="open(scope.row.id, 0)" v-if="scope.row.recommend==1||scope.row.recommend==2">取消推荐</el-button>
                                        <el-button type="text" size="small" @click="open(scope.row.id, -1)" v-if="scope.row.recommend!=-1" style='color:red'>屏蔽</el-button>
                                    <!-- <el-button type="text" size="small" @click="open2(scope.$index, accountData)" style='color:red'>官网推荐</el-button>
                                    <el-button type="text" size="small" @click="open(scope.$index, accountData)" >首页推荐</el-button> -->
                                </template>
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
                campusList,
                hualangList,
                recomHualangWork
            } from '../../api/api';
            import {
                mapActions,mapGetters
            } from 'vuex';
            export default {
                data() {
                    return {
                        input2:'',
                        total: 0,
                        // number: '0',
                        noEffData: [],
                        options: [],
                        value: '',
                        value2: [],
                        // value3: '',
                        // value4: '',
                        currentPage: 1, //页数
                        pagesize: 15, //默认每页
                        // propsource: {
                        //     value: 'id',
                        //     label: 'names',
                        //     children: '_child'
                        // },
                        sortName:'',
                        sortOrder:'',
                        dImg:'',
                        no:false,
                        dialogFormVisibleLast:false
                    }
                },
                methods: {
                    openImg(img){
                        this.dImg = img
                        this.dialogFormVisibleLast = true;

                    },
                    sortChange(column){
                        let {prop,order} = column
                        // console.log(prop)
                        this.sortName=prop;
                        this.sortOrder = order;
                        this.currentPage = 1;
                        this.fetchData()
                    },
                    ...mapActions([
                    'setmyGAL'
                ]),
                    handleCurrentChange: function (val) {
                        this.currentPage = val;
                        this.fetchData();
                    },
                    switchDetail(uid) {
                        let d = {
                            status: this.value2,
                            school: this.value,
                            page: this.currentPage, 
                            sortName:this.sortName,
                            sortOrder:this.sortOrder,
                            options:this.options
                        }
                        this.setmyGAL(d)
                        this.$router.push('/galleryDetail' + '/' + uid);
                    },
                    open(id,type){
                        // console.log(id)
                        let a = ''
                        if(type===1){
                            a = '是否将该作品推荐至官网?';
                        }else if(type===2){
                            a = '是否将该作品推荐至首页?';
                        }else if(type===0){
                            a = '是否取消官网推荐?';
                        }else{
                            a='是否屏蔽该作品?'
                        }
                             this.$confirm(a, '设置作品', {
                        // customClass: 'redwarn',
                        cancelButtonText: '否',
                        confirmButtonText: '是',
                        type: type===-1?'error':'',
                        customClass: type===-1?'GMnickRED':'GMnickGRE',
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
                    updateList() {
                        this.currentPage = 1;
                        this.fetchData();
        
                    },
                    fetchData() {
                        if(Object.keys(this.getmyGal).length!=0){
                    this.value2 =  this.getmyGal.status;
                    this.value =  this.getmyGal.school;
                    this.sortName =  this.getmyGal.sortName;
                    this.sortOrder =  this.getmyGal.sortOrder;
                    this.currentPage = this.getmyGal.page;
                    this.options = this.getmyGal.options
                }
                        let para = {
                            recommend: this.value2,
                            school: this.value,
                            sortName:this.sortName,
                            sortOrder:this.sortOrder,
                            searchVal:this.input2,
                            page: this.currentPage,
        
                        }
                        hualangList(token,para).then((res) => { //替换服务
                            // this.number = res.data.total;
                            let a = res.data.list;
                            let c = res.data.lastpage * this.pagesize;
                            this.noEffData = a;
                            this.total = parseInt(c);
                        }).then(()=>{
                            this.setmyGAL({})
                        })
                    },
                },
        
                beforeCreate() {
                    user = sessionStorage.getItem('user');
                    token = JSON.parse(user).token;
                },
                created() {
                    // if(Object.keys(this.getmyGal).length==0){
                        // this.code = JSON.parse(user).job?JSON.parse(user).job.code : '';
                        this.fetchData();
                        let cam = {
                            simple: '1',
                            type:'all'
                        };
                        campusList(cam, token).then((res) => {//获取校区
                            let a = res.data;
                            this.options = a.map(item => {
                                return {
                                    value: item.id,
                                    label: item.title
                                };
                            });
                        })
                    // }
                },
                computed: {
                ...mapGetters([
                    'getmyGal'
                    // ...
                ])
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
        
            .GMnickS:hover {
                cursor: pointer;
            }
        
            .GMnickS {
                font-weight: 600;
                color:#1fb5ad
            }
        
            .galleryManage .block {
                text-align: center;
                margin-top: 10px;
            }
        
            .GMnickFloat {
                float: left;
                /* margin-right: 5px; */
                padding-left: 10px;
                /* margin-bottom: 10px; */
                margin: 5px 5px 10px 0;
            }
        
            .GMnickThree {
                display: inline-block;
                width: 125px;
                margin-right: 10px;
                margin-bottom: 10px;
            }
        
            .GMnickH {
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
        .GMnickHt{
            display:flex;flex-wrap:wrap;
        margin-right:5px;
        }

        .galleryManage .el-dialog .el-dialog__header {
        background-color: #1fb5ad;
        padding: 20px 20px 20px;
    }

    .galleryManage .el-dialog .el-dialog__title {
        color: white;
    }
    .GMnickGRE .el-message-box__header {
    background-color: #1fb5ad;
    padding: 20px 20px 20px;
}

.GMnickGRE .el-message-box__title {
    color: white;
}
.GMnickRED .el-message-box__header {
    background-color: #e95c5c;
    padding: 20px 20px 20px;
}

.GMnickRED .el-message-box__title {
    color: white;
}

.GMnickRED .el-button--primary {
    background-color: #e95c5c;
    border-color: #e95c5c;
}
        </style>
        