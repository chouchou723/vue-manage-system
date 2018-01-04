<template>
    <div class="resouceManage">
        <!-- <el-breadcrumb separator="/">
            <el-breadcrumb-item><i class="el-icon-my-moban"></i> 资源管理</el-breadcrumb-item>
            <el-breadcrumb-item class='ss'>我的资源</el-breadcrumb-item>
        </el-breadcrumb> -->
        <div class='accouMyresourece'>
            
            <h3 class="remH">
               资源管理
               <span v-if="number==='0'" style="font-size:14px;color: #bdb8b8;">加载中...</span>
               <span v-else>({{number}}人)</span>
               <!-- <el-button type="primary" size="mid" class='myresourceButton' @click="goToAdd" v-if="!code.includes('_c')">添加资源</el-button> -->
      </h3>
        <div class="MRtitle">
                <!-- <div class='studentReturnThreeNew'>
                        <el-select v-model="value5" clearable placeholder="资源等级" @change="updateList" >
                            <el-option label="A" value="0"></el-option>
                            <el-option label="B" value="1"></el-option>
                            <el-option label="C" value="2"></el-option>
                            <el-option label="D" value="3"></el-option>
                            <el-option label="E" value="4"></el-option>
                        </el-select>
                    </div> -->
            <div class='studentReturnThreeNew'>
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
            <div class='studentReturnThreeN'>
                <el-date-picker v-model="value3" type="daterange" placeholder="录入时间" @change="updateList" :picker-options="pickerOptions0">
                </el-date-picker>
            </div>
            <div class='studentReturnThreeN'>
                <el-date-picker v-model="value4" type="daterange" placeholder="最近联系时间" @change="updateList" :picker-options="pickerOptions0">
                </el-date-picker>
            </div>
            <div class='studentReturnThreeNew'>
                <el-select v-model="value5" clearable placeholder="资源状态" @change="updateList" >
                    <el-option label="待认领" value="0"></el-option>
                    <el-option label="tmk已认领" value="1"></el-option>
                    <el-option label="CC已认领" value="2"></el-option>
                    <el-option label="已邀约" value="3"></el-option>
                    <el-option label="未到访" value="4"></el-option>
                    <el-option label="已到访" value="5"></el-option>
                    <el-option label="已签约" value="6"></el-option>
                    <el-option label="无效" value="7"></el-option>
                    <el-option label="垃圾资源" value="8"></el-option>
                    
                    
                </el-select>
            </div>
            <!-- <div class="MRinput">
                <el-input placeholder="输入手机号或姓名" icon="search" v-model="input2" @keyup.enter.native="updateList" :on-icon-click="updateList"  > </el-input>
            </div> -->
            <div class="MRadd">
            <!-- <el-button type="primary" size="mid" class='myresourceButton' @click="goToAdd">导入资源</el-button> -->
            <el-upload
            class="rmu"
            :action="Iaction" :headers='headers' :show-file-list='no'
            name='file' :data="upData"
            :on-success='handleSuccess' :on-error='handleError'
            :before-upload="beforeAvatarUpload1aa">
            <el-button type="primary" >导入资源</el-button>
          </el-upload>
            </div>
        </div>
        </div>
        <!-- <el-dialog title="导入资源" :visible.sync="dialogFormVisibleEdit" size="tiny" :close-on-click-modal="no" top='13%'  show-close custom-class='wechaManageBDD' @close='resetFail'>
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
                    class="rmu"
                    :action="Iaction" :headers='headers' :show-file-list='no'
                    name='file' :data="upData"
                    :on-success='handleSuccess' :on-error='handleError'>
                    <el-button type="primary" :disabled='value6==""' :loading='writeL' @click='toBeLoading'>下一步</el-button>
                  </el-upload>
                </div>
            </el-dialog> -->
        <div id="table1MR">
            <el-table :data="tableData"  style="width: 100%" @sort-change='sortChange'>
                    <!-- <el-table-column prop="sex" label="资源等级" width='80'>
                        </el-table-column> -->
                        <el-table-column prop="sour_name" label="所属渠道来源">
                        </el-table-column>
                        <el-table-column prop="names" label="姓名" width='80'>
                    <!-- <template scope="scope">
                        <span @click="switchDetail(scope.row)" class='nicknameSpanT'>{{scope.row.names}}</span>
                    </template> -->
                </el-table-column>
                <!-- <el-table-column prop="sex" label="性别" width='80'>
                </el-table-column> -->
                <el-table-column prop="age" label="年龄" width='80'>
                </el-table-column>
                <!-- <el-table-column prop="patriarch" label="家长" width='80'>
                </el-table-column> -->
                <el-table-column prop="mobile" label="手机" :formatter="formatter" width='100'>
                </el-table-column>
                <!-- <el-table-column prop="school" label="校区" width='180'>
                </el-table-column> -->
                <el-table-column prop="tmk_name" label="TMK" width='80' >
                </el-table-column>
                <el-table-column prop="created" label="录入时间" sortable='custom' >
                </el-table-column>
                <el-table-column prop="last_time" label="最近联系时间" sortable='custom'>
                </el-table-column>
                <el-table-column prop="status" label="资源状态" column-key='status' width='80'>
                    <template scope="scope">
                        <span :style="scope.row.status=='待认领'?'color:#1fb5ad': scope.row.status=='已认领'? 'color:#dba31c' : scope.row.status=='已邀约'? 'color:#33c616' : scope.row.status=='已到访'? 'color:#4057e0':'color:#333333' ">{{scope.row.status}}</span>
                    </template>
                </el-table-column>
            </el-table>
            <div class="block">
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
    getMyResoure,
    sourceList,
    getTMK
} from '../../api/api';
import {
    mapActions,mapGetters
} from 'vuex';

export default {
    data() {
            return {
                Iaction:'http://pandatest.dfth.com/api/v1/wxmanage/importSms',
                // Iaction:'/api/v1/wxmanage/importSms',
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
                options: [], //表单上方的select
                options2: [], //渠道来源
                input2: '', //姓名或手机号码
                value1: '', //对应select的值
                value2: [], //对应select的值
                value3: '', //对应select的值
                value4: '',
                value5: '',
                value6:'',
                valueR: '',
                valueT: '',
                sortName:'',
                sortOrder:'',
                dialogFormVisibleEdit:false,
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
            toBeLoading(){
                this.writeL = true;
            },
            handleSuccess(response, file, fileList) {//上传图片成功
                this.$message.success('上传成功')
                this.dialogFormVisibleEdit = false; 
                this.writeL = false;                
            },
            handleError(err, file, fileList) {
                this.$message.error(error.message)
            },
            beforeAvatarUpload1aa(file, fileList){
                const isJPG =  file.name.includes('.xl');
                if (!isJPG) {
                    this.$message.error('必须上传excel文件');
                }
                return isJPG;
            },
            resetFail(){
                this.value6 = '';
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
            ...mapActions([
                'setMyResourceS'
            ]),
            formatter(row, column) {
              let reg = /(\d{4})\d{4}(\d{3})/;
              if(reg.test(row.mobile)){
                  return row.mobile.replace(reg,'$1****$2');
              }else{
                return row.mobile
              }
            },
            switchDetail(row) {
                let uid = {
                    u_id: row.id,
                    u_status: row.status,
                    u_resource: 1
                }
 // this.$router.history.current.meta.keepAlive = false
                // this.sendResourceId(uid).then(()=>{
                    let d = {
                    tmk_id: this.valueT, //TMK
                    group_id: this.valueR, //资源类型
                    school_id: this.value1, //校区
                    sour_id: this.value2, //渠道
                    status: this.value5, //资源状态
                    page: this.currentPage, //页签
                    input_start_date: this.value3,
                    last_start_date:this.value4,
                    sortName:this.sortName,
                    sortOrder:this.sortOrder,
                    optionsTMK: this.optionsTMK
                    
                }
                this.setMyResourceS(d)
                this.$router.push({ name: 'userDetailList', params: { uid: row.id,status: row.status,resource:1}});
                // })
            },
            updateList() {
                this.currentPage = 1;
                this.fetchData();

            },
            fetchData() {
                if(Object.keys(this.getMyResourceS).length!=0){
                    this.valueT =  this.getMyResourceS.tmk_id;
                    this.valueR =  this.getMyResourceS.group_id;
                    this.value1 =  this.getMyResourceS.school_id;
                    this.value2 =  this.getMyResourceS.sour_id;
                    this.value5 =  this.getMyResourceS.status;
                    this.currentPage = this.getMyResourceS.page;
                    this.value3 =  this.getMyResourceS.input_start_date;
                    this.value4 =  this.getMyResourceS.last_start_date;
                    this.sortName =  this.getMyResourceS.sortName;
                    this.sortOrder =  this.getMyResourceS.sortOrder;
                    this.optionsTMK= this.getMyResourceS.optionsTMK;
                }
                let para = {
                    tmk_id: this.valueT, //TMK
                    group_id: this.valueR, //资源类型
                    school_id: this.value1, //校区
                    sour_id: this.value2[this.value2.length-1], //渠道
                    status: this.value5, //资源状态
                    page: this.currentPage, //页签
                    input_start_date: this.value3[0] != null? new Date(this.value3[0]).toLocaleDateString(): '',
                    input_end_date: this.value3[0] != null?new Date(this.value3[1]).toLocaleDateString(): '',
                    last_start_date:this.value4[0] != null? new Date(this.value4[0]).toLocaleDateString(): '',
                    last_end_date: this.value4[1] != null? new Date(this.value4[1]).toLocaleDateString(): '',
                    input: this.input2,
                    sortName:this.sortName,
                    sortOrder:this.sortOrder
                } 

                getMyResoure(para, token).then((res) => { //替换服务
                    this.number = res.data.total;
                    let a = res.data.data;
                    let c = res.data.last_page * this.pagesize;
                    this.tableData = a;
                    this.total = parseInt(c);
                }).then(()=>{
                    this.setMyResourceS({})
                })
            },

            handleCurrentChange: function(val) {
                this.currentPage = val;
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
                if(Object.keys(this.getMyResourceS).length==0){
                    if(this.code == 'tmk_m'){
                        getTMK(token).then((res) => {
                    this.optionsTMK = res.data
                    this.optionsTMK.unshift({key:0,label:'全部TMK'})
                    this.valueT=JSON.parse(user).aid+''
                })
                    }else if(this.code.includes('_c')){
                        getTMK(token).then((res) => {
                    this.optionsTMK = res.data
                    this.optionsTMK.unshift({key:0,label:'全部TMK'})
                    this.valueT= 0
                })
                    }else{
                this.fetchData(); //获取表格数据
                        
                    }
                }else{

                this.fetchData(); //获取表格数据
                }
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
            }).then(()=>{
                sourceList(token).then(res => {
                this.options2 = res.data
            })
           
            })
            

        },
        computed: {
        ...mapGetters([
            'getMyResourceS'
            // ...
        ]),
        
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
/* .studentReturnThreeN .accouMyresourece  .el-input{
    font-size: 10px
 
}
.studentReturnThreeN .accouMyresourece .el-date-editor--daterange .el-input{
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

.accouMyresourece {
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

.studentReturnThreeNew {
   display: inline-block;
    width: 105px;
    /*margin-right: 10px;*/
    margin-bottom: 10px;
    margin-left: 10px
}
/*.studentReturnThreeNew:first-child{
    padding-left: 5px
}*/
.studentReturnThreeN {
   display: inline-block;
    margin-left: 10px
}

.block {
    text-align: center;
    margin-top: 10px;
}
.MRtitle{
display:flex;flex-wrap:wrap;
margin-right:5px;
}
.MRinput{
width:162px;display:inline-block;margin-left: 10px;margin-bottom: 10px;
}
.MRadd{
position:absolute;right:10px;top:10px
}
.wechaManageBDD .el-dialog__header {
            background-color: #1fb5ad;
            padding: 20px 20px 20px;
        }
    
        .wechaManageBDD .el-dialog__title {
            color: white;
        }
        .resouceManage .rmu .el-upload--text{
        height: 36px;
    width: 95px;
    margin-top:0;
    margin-left: 0;
    left:0;
    }
    .rmu{
        height: 36px;
    }
</style>
