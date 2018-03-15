<template>
        <div class="invoiceManage">
            <!-- <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-my-moban"></i> 资源管理</el-breadcrumb-item>
                <el-breadcrumb-item class='ss'>我的资源</el-breadcrumb-item>
            </el-breadcrumb> -->
            <div class='invoM'>
                
                <h3 class="invoM1">
                   发票管理
                   <span v-if="number==='0'" style="font-size:14px;color: #bdb8b8;">加载中...</span>
                   <span v-else>({{number}})</span>
                   <!-- <el-button type="primary" size="mid" class='myresourceButton' @click="goToAdd" v-if="!code.includes('_c')">添加资源</el-button> -->
          </h3>
            <div class="invoM2">
                    <div class='invoM9'>
                            <el-select v-model="value1"  placeholder="抬头类型" @change="updateList" >
                                <el-option label="全部" value="0"></el-option>
                                <el-option label="个人" value="1"></el-option>
                                <el-option label="公司" value="2"></el-option>
                            </el-select>
                        </div>
                        <div class='invoM10'>
                                <el-select v-model="value2"  placeholder="选择校区" filterable @change="updateList" >
                                    <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                                    </el-option>
                                </el-select>
                            </div>
                        <div class='invoM9'>
                                <el-select v-model="value5"  placeholder="发放状态" @change="updateList" >
                                    <el-option label="全部" value="-1"></el-option>
                                    <el-option label="未发放" value="0"></el-option>
                                    <el-option label="已发放" value="1"></el-option>
                                </el-select>
                            </div>
                <div class='invoM11'>
                    <el-date-picker v-model="value3" type="daterange" placeholder="申请时间" @change="updateList" :picker-options="pickerOptions0">
                    </el-date-picker>
                </div>
                <div class='invoM11'>
                    <el-date-picker v-model="value4" type="daterange" placeholder="发放时间" @change="updateList" :picker-options="pickerOptions0">
                    </el-date-picker>
                </div>
                <div class="invoM3">
                    <el-input placeholder="输入姓名或合同编号" icon="search" v-model="input2" @keyup.enter.native="updateList" :on-icon-click="updateList"  > </el-input>
                </div>
                <div class="invoM4">
                       <el-button type="info" size="mid" class='myresourceButton' @click="goToAdd">导出申请单</el-button>
                </div>
                <div class="invoM5">
                <!-- <el-button type="primary" size="mid" class='myresourceButton' @click="goToAdd">导入资源</el-button> -->
                <el-upload
                class="invoM6"
                :action="Iaction" :headers='headers' :show-file-list='no'
                name='file' :data="upData"
                :on-success='handleSuccess' :on-error='handleError'
                :before-upload="beforeAvatarUpload1aa">
                <el-button type="primary" :loading="writeL">导入发放单</el-button>
              </el-upload>
                </div>
            </div>
            </div>
            <el-dialog title="选择时间" :visible.sync="dialogFormVisibleEdit" size="tiny" :close-on-click-modal="no" top='27%'  show-close custom-class='invoM7' @close='resetFail'>
                <div style='text-align:center'>
    
                    <el-date-picker v-model="valueT" type="daterange" placeholder="选择时间段" :clearable="no" @change="updateList" :picker-options="pickerOptions0">
                    </el-date-picker>
                </div>    
                    <div slot="footer" class="dialog-footer" style='display:flex;justify-content: center'>
                            <el-button type="primary"   :disabled="valueT[1]-0===0||valueT.length===0" @click='toBeLoading'>导出</el-button>
                        <el-button @click="dialogFormVisibleEdit = false">取 消</el-button>
                        <!-- <el-upload
                        class="invoM6"
                        :action="Iaction" :headers='headers' :show-file-list='no'
                        name='file' :data="upData"
                        :on-success='handleSuccess' :on-error='handleError'>
                        <el-button type="primary"  :loading='writeL' @click='toBeLoading'>下载</el-button>
                      </el-upload> -->
                    </div>
                </el-dialog>
            <div id="table1MR">
                <el-table :data="tableData"  style="width: 100%" @sort-change='sortChange'>
                        <!-- <el-table-column prop="sex" label="资源等级" width='80'>
                            </el-table-column> -->
                            <el-table-column prop="sku" label="合同编号">
                            </el-table-column>
                            <el-table-column prop="nickname" label="学生" >
                        <!-- <template scope="scope">
                            <span @click="switchDetail(scope.row)" class='nicknameSpanT'>{{scope.row.names}}</span>
                        </template> -->
                    </el-table-column>
                    <!-- <el-table-column prop="sex" label="性别" width='80'>
                    </el-table-column> -->
                    <el-table-column prop="school_name" label="所在校区" >
                    </el-table-column>
                    <!-- <el-table-column prop="patriarch" label="家长" width='80'>
                    </el-table-column> -->
                    <el-table-column prop="created" label="申请时间" sortable='custom'  >
                    </el-table-column>
                    <!-- <el-table-column prop="school" label="校区" width='180'>
                    </el-table-column> -->
                    <el-table-column prop="genre" label="抬头类型"  >
                    </el-table-column>
                    <el-table-column prop="company" label="公司名称"  >
                    </el-table-column>
                    <el-table-column prop="num" label="纳税号" >
                    </el-table-column>
                    <el-table-column prop="totmy" label="合同金额"  >
                        </el-table-column>
                        <el-table-column prop="ticket" label="发票编号"  >
                        </el-table-column>
                        <el-table-column prop="deliver_time" label="发放时间" sortable='custom'>
                        </el-table-column>
                </el-table>
                <div class="invoM8">
                      <!-- <span class="demonstration"></span> -->
                    <el-pagination layout="prev, pager, next" :total="total" :current-page="currentPage" :page-size="pagesize" @current-change="handleCurrentChange">
                    </el-pagination>
                </div>
            </div>
        </div>
    </template>
    <script>
    var token, user
    import {
        campusList,
        invoiceList,
        sourceList,
        getTMK,
        exportInvoice
    } from '../../api/api';
    
    export default {
        data() {
                return {
                    // Iaction:'http://pandatest.dfth.com//api/v1/invoice/importInvoice',
                    Iaction:'/api/v1/invoice/importInvoice',
                    pickerOptions0: {
                            disabledDate(time) {
                                return time.getTime() > Date.now();
                            }
                        },
                    code: '',
                    headers: {
                        Authorization: token.Authorization
                    },
                    currentPage: 1, //页数
                    pagesize: 15, //默认每页
                    total: 0, //总页数
                    tableData: [],
                    number: '0',
                    optionsTMK: [], //TMK SELECT
                    options: [{value:'0',label:'全部校区'}], //表单上方的select
                    // options2: [], //渠道来源
                    input2: '', //姓名或手机号码
                    value1: '0', //对应select的值
                    value2: '0', //对应select的值
                    value3: [], //对应select的值
                    value4: [],
                    value5: '-1',
                    value6:'',
                    valueR: '',
                    valueT: [],
                    sortName:'',
                    sortOrder:'',
                    dialogFormVisibleEdit:false,
                    no:false,
                    writeL:false,
                }
            },
            methods: {
                toBeLoading(){
                    let para = {
                        created_start:new Date(this.valueT[0]).toLocaleDateString(),
                        created_end:new Date(this.valueT[1]).toLocaleDateString(),
                    }
                                   
                    exportInvoice(para,token).then(res=>{
                        // let a = 'http://pandatest.dfth.com/';
                    let a = '';
                        window.open( a+res);
                        this.dialogFormVisibleEdit = false;
                    })
                },
                handleSuccess(response, file, fileList) {//上传图片成功
                    if(response.code==0){

                        this.$message.success('导入成功');
                        this.fetchData();
                    this.writeL = false;                         
                    }else{
                        this.$message.error(response.data);
                    this.writeL = false;                                                 
                    }
                    // this.dialogFormVisibleEdit = false; 
                    // this.writeL = false;                
                },
                handleError(err, file, fileList) {
                    this.$message.error(err.message);
                    this.writeL = false;                                             
                },
                beforeAvatarUpload1aa(file, fileList){
                    this.writeL = true;                    
                    const isJPG =  file.name.includes('.xl');
                    if (!isJPG) {
                        this.$message.error('必须上传excel文件');
                        this.writeL = false;    
                    }
                    return isJPG;
                },
                resetFail(){
                    this.valueT = [];
                },
                sortChange(column){
                    let {prop,order} = column
                    // console.log(prop)
                    this.sortName=prop;
                    this.sortOrder = order;
                    this.currentPage = 1;
                    this.fetchData()
                },
                goToAdd(){
                    this.dialogFormVisibleEdit = true;
                },
                updateList() {
                    this.currentPage = 1;
                    this.fetchData();
    
                },
                fetchData() {
                    let para = {
                        genre: this.value1, //TMK
                        school: this.value2, //资源类型
                        deliver: this.value5, //校区
                        page: this.currentPage, //页签
                        created_start: this.value3[0] != null? new Date(this.value3[0]).toLocaleDateString(): '',
                        created_end: this.value3[0] != null?new Date(this.value3[1]).toLocaleDateString(): '',
                        deliver_start:this.value4[0] != null? new Date(this.value4[0]).toLocaleDateString(): '',
                        deliver_end: this.value4[1] != null? new Date(this.value4[1]).toLocaleDateString(): '',
                        sku: this.input2,
                        sortName:this.sortName,
                        sortType:this.sortOrder
                    } 
                    invoiceList(para, token).then((res) => { //替换服务
                        this.number = res.data.total;
                        let a = res.data.list;
                        let c = res.data.lastPage * this.pagesize;
                        this.tableData = a;
                        this.total = parseInt(c);
                    })
                },
    
                handleCurrentChange: function(val) {
                    this.currentPage = val;this.backToTop();
                    this.fetchData();
                }
    
            },
            beforeCreate() {
                user = sessionStorage.getItem('user');
                token = JSON.parse(user).token;
            },
    
            created() {
                // this.code = JSON.parse(user).job ? JSON.parse(user).job.code : ''; //获取职位code
                    this.fetchData();
              
                let cam = {
                    simple: '1'
                };
                campusList(cam, token).then((res) => {//获取校区
                    let a = res.data;
                    this.options = a.map(item => {
                        return {
                            value: item.id,
                            label: item.title
                        };
                    });
                    this.options.unshift({value:'0',label:'全部校区'});
                })
                
    
            },
            computed: {
            
            upData() {
                let a = this.value6;
                return {
                    level: a
                }
            }
        },
      //       watch: {
      //   '$route' (to, from) {
      //     // 对路由变化作出响应...
      //     console.log(to)
      //     console.log(from)
      //     // if(to.params.p_id == 'fresh'){
      //     //           this.input2= ''; 
      //     //           this.value1= ''; 
      //     //           this.value2= ''; 
      //     //           this.value3= ''; 
      //     //           this.value4= '';
      //     //           this.value5= '';
      //     //           this.valueR= '';
      //     //           this.valueT= '';
      //     //           this.currentPage = 1;
      //     //           this.fetchData();
      //     // }
      //   }
      // }
    }
    </script>
    <style>
    /* .invoM11 .invoM  .el-input{
        font-size: 10px
     
    }
    .invoM11 .invoM .el-date-editor--daterange .el-input{
      width:164px;
     
    } */
    /* #table1MR .el-table td,
    #table1MR .el-table th:not(.gutter) {
        padding: 1px;
        text-align: center
    }
    
    #table1MR .el-table th>div,
    #table1MR .el-table .cell {
        padding-left: 0;
        padding-right: 0;
    } */
    
    /* .nicknameSpanT:hover {
        cursor: pointer;
    }
    .nicknameSpanT{
        font-weight: 600;
            color:#1fb5ad
    } */
    
    .invoM {
        width: 100%;
        position: relative;
        height: auto;
        display: flex;
        flex-wrap: wrap;
      justify-content: flex-start;
        background-color: white;
      margin-top:0;
      padding-top:10px;
      margin-bottom: 5px;
      border-radius: 5px;
    }
    
    .invoM1 {
       /*display: block;*/
        margin-top: 5px;
        margin-bottom: 15px;
        padding-left: 10px;
        margin-right: 30%;
        /* width:330px; */
    }
    @media screen and (min-width:1665px){
        .invoM1{
        margin-right: 0;            
        }
    }
    .invoM9 {
       display: inline-block;
        width: 105px;
        /*margin-right: 10px;*/
        margin-bottom: 10px;
        margin-left: 10px;
    }
    .invoM10 {
       display: inline-block;
        width: 165px;
        /*margin-right: 10px;*/
        margin-bottom: 10px;
        margin-left: 10px
    }
    /*.studentReturnThreeNew:first-child{
        padding-left: 5px
    }*/
    .invoM11 {
       display: inline-block;
        margin-left: 10px
    }
    
    .invoM8 {
        text-align: center;
        margin-top: 10px;
    }
    .invoM2{
    display:flex;flex-wrap:wrap;
    margin-right:5px;
    }
    .invoM3{
  display:inline-block;margin-left: 10px;margin-bottom: 10px;
    }
    .invoM5{
    position:absolute;right:10px;top:10px
    }
    .invoM4{
    position:absolute;right:136px;top:10px
    }
    .invoM7 .el-dialog__header {
                background-color: #1fb5ad;
                padding: 20px 20px 20px;
            }
        
            .invoM7 .el-dialog__title {
                color: white;
            }
            .invoiceManage .invoM6 .el-upload--text{
            height: 36px;
        width: 125px;
        margin-top:0;
        margin-left: 0;
        left:0;
        }
        .invoM6{
            height: 36px;
        }
    </style>
    