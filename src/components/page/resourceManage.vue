<template>
    <div class="resouceManage">
        <!-- <el-breadcrumb separator="/">
            <el-breadcrumb-item><i class="el-icon-my-moban"></i> 资源管理</el-breadcrumb-item>
            <el-breadcrumb-item class='ss'>我的资源</el-breadcrumb-item>
        </el-breadcrumb> -->
        <div class='RSMH1'>
            
            <h3 class="remH">
               资源管理
               <span v-if="number==='0'" style="font-size:14px;color: #bdb8b8;">加载中...</span>
               <span v-else>({{number}}人)</span>
               <!-- <el-button type="primary" size="mid" class='myresourceButton' @click="goToAdd" v-if="!code.includes('_c')">添加资源</el-button> -->
      </h3>
        <div class="RSMH2">
                <!-- <div class='studentReturnThreeNew'>
                        <el-select v-model="value5" clearable placeholder="资源等级" @change="updateList" >
                            <el-option label="A" value="0"></el-option>
                            <el-option label="B" value="1"></el-option>
                            <el-option label="C" value="2"></el-option>
                            <el-option label="D" value="3"></el-option>
                            <el-option label="E" value="4"></el-option>
                        </el-select>
                    </div> -->
            <div class='RSMH8'>
            <el-cascader
    :options="options2"
    :props="propsource"
    v-model="value2"
    :show-all-levels="false"
     @change="updateList"
     clearable
     change-on-select
    placeholder="选择渠道" >
  </el-cascader>
            </div>
            <div class='RSMH6'>
                <el-date-picker v-model="value3" type="daterange" placeholder="录入时间" @change="updateList" :picker-options="pickerOptions0">
                </el-date-picker>
            </div>
            <div class='RSMH6'>
                <el-date-picker v-model="value4" type="daterange" placeholder="最近联系时间" @change="updateList" :picker-options="pickerOptions0">
                </el-date-picker>
            </div>
            <div class='RSMH8'>
                <el-select v-model="value5" clearable placeholder="资源状态" @change="updateList" >
                    <el-option label="待认领" value="0"></el-option>
                    <el-option label="待定" value="1"></el-option>
                    <el-option label="无意向" value="2"></el-option>
                    <el-option label="无需求客户" value="3"></el-option>
                    <el-option label="暂不联系" value="4"></el-option>
                    <el-option label="CC已认领" value="5"></el-option>
                    <el-option label="已邀约" value="6"></el-option>
                    <el-option label="已到访" value="7"></el-option>
                    <el-option label="未到访" value="8"></el-option>
                    <el-option label="已签单" value="9"></el-option>
                    <el-option label="无效资源" value="-1"></el-option>   
                </el-select>
            </div>
            <div class="RSMH3">
                <el-input placeholder="输入手机号或姓名" icon="search" v-model="input2" @keyup.enter.native="updateList" :on-icon-click="updateList"  > </el-input>
            </div>
            <div class="RSMH4">
            <!-- <el-button type="primary" size="mid" class='myresourceButton' @click="goToAdd">导入资源</el-button> -->
            <el-upload
            class="rsmh"
            :action="Iaction" :headers='headers' :show-file-list='no'
            name='file' 
            :on-success='handleSuccess' :on-error='handleError'
            :before-upload="beforeAvatarUpload1aa"
           >
            <el-button type="primary"  :loading='writeL' >导入资源</el-button>
          </el-upload>
            </div>
        </div>
        </div>
        <!-- <el-dialog title="导入资源" :visible.sync="dialogFormVisibleEdit" size="tiny" :close-on-click-modal="no" top='13%'  show-close custom-class='RSMH5' @close='resetFail'>
            <div style='text-align:center'>

                <el-select v-model="value6"  placeholder="请选择导入的资源等级"  >
                            <el-option label="A" value="0"></el-option>
                            <el-option label="B" value="1"></el-option>
                            <el-option label="C" value="2"></el-option>
                            <el-option label="D" value="3"></el-option>
                            <el-option label="E" value="4"></el-option>
                        </el-select>
            </div>    
                <div slot="footer" class="dialog-footer" style='display:flex;justify-content: center'>
                    <el-button @click="dialogFormVisibleEdit = false">取 消</el-button>
                    <el-upload
                    class="rsmh"
                    :action="Iaction" :headers='headers' :show-file-list='no'
                    name='file' :data="upData"
                    :on-success='handleSuccess' :on-error='handleError'>
                    <el-button type="primary" :disabled='value6==""' :loading='writeL' >下一步</el-button>
                  </el-upload>
                </div>
            </el-dialog> -->
        <div id="table1MR" v-loading="loading2">
            <el-table :data="tableData"  style="width: 100%" @sort-change='sortChange'>
                    <!-- <el-table-column prop="sex" label="资源等级" width='80'>
                        </el-table-column> -->
                        <el-table-column prop="channel" label="所属渠道来源">
                        </el-table-column>
                        <el-table-column prop="uname" label="姓名" >
                    <template scope="scope">
                        <span @click="switchDetail(scope.row)" class='nicknameSpanT'>{{scope.row.uname}}</span>
                    </template>
                </el-table-column>
                <!-- <el-table-column prop="sex" label="性别" width='80'>
                </el-table-column> -->
                <el-table-column prop="age" label="年龄" width='100'>
                </el-table-column>
                <!-- <el-table-column prop="patriarch" label="家长" width='80'>
                </el-table-column> -->
                <el-table-column prop="mobile" label="手机" :formatter="formatter" >
                </el-table-column>
                <!-- <el-table-column prop="school" label="校区" width='180'>
                </el-table-column> -->
                <el-table-column prop="tmk_name" label="TMK"  >
                </el-table-column>
                <el-table-column prop="created_at" label="录入时间" sortable='custom' >
                </el-table-column>
                <el-table-column prop="last_time" label="最近联系时间" sortable='custom'>
                </el-table-column>
                <el-table-column prop="statu_code" label="资源状态" column-key='status' width='90'>
                    <template scope="scope">
                        <span :style="scope.row.statu_code=='待认领'?'color:#1fb5ad': scope.row.statu_code=='待定'? 'color:#dba31c': scope.row.statu_code=='无意向'? 'color:#dba31c':  scope.row.statu_code=='无需求客户'? 'color:#dba31c': scope.row.statu_code=='暂不联系'? 'color:#dba31c':scope.row.statu_code=='CC已认领'? 'color:#dba31c' : scope.row.status=='已邀约'? 'color:#33c616' : scope.row.status=='已到访'? 'color:#4057e0': scope.row.status=='未到访'? 'color:#f79091': scope.row.status=='已签约'? 'color:#f79091':'color:#cecece' ">{{scope.row.statu_code}}</span>
                    </template>
                </el-table-column>
            </el-table>
            <div class="RSMH7">
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
    sourceList,
    mksourceList
} from '../../api/api';
import {
    mapActions,mapGetters
} from 'vuex';
export default {
    data() {
            return {
                // Iaction:'http://pandatest.dfth.com/api/v1/market/mksourceImport',
                Iaction:'/api/v1/market/mksourceImport',
                pickerOptions0: {
                        disabledDate(time) {
                            return time.getTime() > Date.now();
                        }
                    },
                code: '',
                loading2:true,
                headers: {
                    Authorization: token.Authorization
                },
                currentPage: 1, //页数
                pagesize: 15, //默认每页
                total: 0, //总页数
                tableData: [],
                number: '0',
                // options: [], //表单上方的select
                options2: [], //渠道来源
                input2: '', //姓名或手机号码
                // value1: '', //对应select的值
                value2: [], //对应select的值
                value3: '', //对应select的值
                value4: '',
                value5: '',
                // value6:'',
                // valueR: '',
                // valueT: '',
                sortName:'',
                sortType:'',
                // dialogFormVisibleEdit:false,
                no:false,
                writeL:false,
                propsource:{
                    value: 'id',
                    label:'names',
                    children: '_child'
                },
            }
        },
        methods: {
            // toBeLoading(){
            //     this.writeL = true;
            // },
            handleSuccess(response, file, fileList) {//上传图片成功
                if(response.code==0){
                    this.$message.success('上传成功')
                    // this.dialogFormVisibleEdit = false; 
                    this.writeL = false;
                    this.fetchData()          
                }else{
                    this.$message.error(response.message);
                    this.writeL = false;
                }
                if(response.data){
                    // let a = 'http://pandatest.dfth.com/';
                    let a = '';
                    setTimeout(() => {
                        window.open( a+response.data);
                    }, 500);
                }
            },
            ...mapActions([
                'setMyMarket'
            ]),
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
            // resetFail(){
            //     this.value6 = '';
            // },
            sortChange(column){
                let {prop,order} = column
                // console.log(prop)
                this.sortName=prop;
                this.sortType = order;
                this.currentPage = 1;
                this.fetchData()
            },
            // goToAdd(){
            //     this.dialogFormVisibleEdit = true;
            // },
            // formatter(row, column) {
            //   let reg = /(\d{4})\d{4}(\d{3})/;
            //   if(reg.test(row.mobile)){
            //       return row.mobile.replace(reg,'$1****$2');
            //   }else{
            //     return row.mobile
            //   }
            // },
            updateList() {
                this.currentPage = 1;
                this.fetchData();

            },
            switchDetail(row) {
                let uid = {
                    uid: row.id,
                    cid: row.customer_id
                }
 // this.$router.history.current.meta.keepAlive = false
                // this.sendResourceId(uid).then(()=>{
                    let d = {
                        channel: this.value2, //TMK
                        source_status: this.valueR, //资源类型
                    school_id: this.value5, //校区
                    page: this.currentPage, //页签
                    intime_start: this.value3, //渠道
                    talktime_start: this.value4, //资源状态
                    sortName:this.sortName,
                    sortOrder:this.sortOrder
                    
                }
                this.setMyMarket(d)
                this.$router.push({ name: 'marketRDetail', params: { cid: row.id,uid: row.customer_id}});
                // })
            },
            fetchData() {
                if(Object.keys(this.getMymarket).length!=0){
                    this.value2 =  this.getMymarket.channel;
                    this.value5 =  this.getMymarket.source_status;
                    this.currentPage = this.getMymarket.page;
                    this.value3 =  this.getMymarket.intime_start;
                    this.value4 =  this.getMymarket.talktime_start;
                    this.sortName =  this.getMymarket.sortName;
                    this.sortOrder =  this.getMymarket.sortOrder;
                }
                let para = {
                    channel: this.value2[this.value2.length-1], //渠道
                    source_status: this.value5, //资源状态
                    page: this.currentPage, //页签
                    intime_start: this.value3[0] != null? new Date(this.value3[0]).toLocaleDateString(): '',
                    intime_end: this.value3[0] != null?new Date(this.value3[1]).toLocaleDateString(): '',
                    talktime_start:this.value4[0] != null? new Date(this.value4[0]).toLocaleDateString(): '',
                    talktime_end: this.value4[1] != null? new Date(this.value4[1]).toLocaleDateString(): '',
                    sortName:this.sortName,
                    sortType:this.sortType,
                    input:this.input2
                } 

                mksourceList(para, token).then((res) => { //替换服务
                    this.number = res.data.total;
                    let a = res.data.list;
                    let c = res.data.lastPage * this.pagesize;
                    this.tableData = a;
                    this.total = parseInt(c);

                }).then(()=>{
                    this.loading2 = false;
                    this.setMyMarket({})
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
            this.code = JSON.parse(user).job ? JSON.parse(user).job.code : ''; //获取职位code
            // if(this.code=='tmk'){
                this.fetchData(); //获取表格数据
            // }
            // if(this.code == 'tmk_m'){
            //     getTMK(token).then((res) => {
            //         this.optionsTMK = res.data
            //         this.optionsTMK.unshift({key:'0',label:'全部TMK'})
            //         this.valueT=JSON.parse(user).aid+''
            //     })
            // }
            // if(this.code.includes('_c')){

            //     getTMK(token).then((res) => {
            //         this.optionsTMK = res.data
            //         this.optionsTMK.unshift({key:'0',label:'全部TMK'})
            //         this.valueT= '0'
            //     })
            //         // this.fetchData(); //获取表格数据
            // }
          
            // let cam = {
            //     simple: '1'
            // };
            // campusList(cam, token).then((res) => {//获取校区
            //     let a = res.data;
            //     this.options = a.map(item => {
            //         return {
            //             value: item.id,
            //             label: item.title
            //         };
            //     });
            // }).then(()=>{
                sourceList(token).then(res => {
                this.options2 = res.data
            })
           
            // })
            

        },
        computed: {
        ...mapGetters([
            'getMymarket'
            // ...
        ])
        // upData() {
        //     let a = this.value6;
        //     return {
        //         level: a
        //     }
        // }
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
/* .RSMH6 .RSMH1  .el-input{
    font-size: 10px
 
}
.RSMH6 .RSMH1 .el-date-editor--daterange .el-input{
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

.nicknameSpanT:hover {
    cursor: pointer;
}
.nicknameSpanT{
    font-weight: 600;
        color:#1fb5ad
}

.RSMH1 {
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

.remH {
   /*display: block;*/
    margin-top: 5px;
    /* margin-bottom: 15px; */
    padding-left: 10px;
    /* width:330px; */
}

.RSMH8 {
   display: inline-block;
    width: 105px;
    /*margin-right: 10px;*/
    margin-bottom: 10px;
    margin-left: 10px
}
/*.studentReturnThreeNew:first-child{
    padding-left: 5px
}*/
.RSMH6 {
   display: inline-block;
    margin-left: 10px
}

.RSMH7 {
    text-align: center;
    margin-top: 10px;
}
.RSMH2{
display:flex;flex-wrap:wrap;
margin-right:111px;
}
.RSMH3{
width:162px;display:inline-block;margin-left: 10px;margin-bottom: 10px;
}
.RSMH4{
position:absolute;right:10px;top:10px
}
.RSMH5 .el-dialog__header {
            background-color: #1fb5ad;
            padding: 20px 20px 20px;
        }
    
        .RSMH5 .el-dialog__title {
            color: white;
        }
        .resouceManage .rsmh .el-upload--text{
        height: 36px;
    width: 109px;
    margin-top:0;
    margin-left: 0;
    left:0;
    }
    .rsmh{
        height: 36px;
    }
</style>
