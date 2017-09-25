<template>
    <div class="crumbs">
        <el-breadcrumb separator="/">
            <el-breadcrumb-item><i class="el-icon-my-moban"></i> 资源管理</el-breadcrumb-item>
            <el-breadcrumb-item class='ss'>我的资源</el-breadcrumb-item>
        </el-breadcrumb>
        <div class='accouMyresourece'>
            
            <h2 class="mydataReturn">
               我的资源({{number}}人)
      </h2>
        <div class="MRtitle">
            
            <div class='studentReturnThreeNew' v-if="code =='tmk_m'">
                <el-select v-model="valueT" clearable placeholder="选择TMK" @change="updateList" >
                    <el-option v-for="item in optionsTMK" :key="item.key" :label="item.label" :value="item.key">
                    </el-option>
                </el-select>
            </div>
            <div class='studentReturnThreeNew'>
                <el-select v-model="valueR" clearable placeholder="资源类型" @change="updateList">
                    <el-option label="新资源" value="3"></el-option>
                    <el-option label="回收资源" value="2"></el-option>
                </el-select>
            </div>
            <div class='studentReturnThreeNew'>
                <el-select v-model="value1" clearable placeholder="选择校区" filterable @change="updateList" >
                    <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                    </el-option>
                </el-select>
            </div>
            <div class='studentReturnThreeNew'>
            <el-cascader
    :options="options2"
    :props="propsource"
    v-model="value2"
    :show-all-levels="false"
     @change="updateList"
     clearable
     change-on-select
    placeholder="请选择渠道" >
  </el-cascader>
            </div>
            <div class='studentReturnThreeN'>
                <el-date-picker v-model="value3" type="daterange" placeholder="录入时间" @change="updateList" >
                </el-date-picker>
            </div>
            <div class='studentReturnThreeN'>
                <el-date-picker v-model="value4" type="daterange" placeholder="最近联系时间" @change="updateList" >
                </el-date-picker>
            </div>
            <div class='studentReturnThreeNew'>
                <el-select v-model="value5" clearable placeholder="资源状态" @change="updateList" >
                    <el-option label="待认领" value="0"></el-option>
                    <el-option label="已认领" value="1"></el-option>
                    <el-option label="已邀约" value="2"></el-option>
                    <el-option label="已到访" value="3"></el-option>
                    <el-option label="未到访" value="4"></el-option>
                </el-select>
            </div>
            <div class="MRinput">
                <el-input placeholder="输入手机号或姓名" icon="search" v-model="input2" @keyup.enter.native="updateList" :on-icon-click="updateList"  > </el-input>
            </div>
            <div class="MRadd">
            <el-button type="primary" size="mid" class='myresourceButton' @click="goToAdd">添加资源</el-button>
            </div>
        </div>
        </div>
        <div id="table1">
            <el-table :data="tableData" border style="width: 100%" :default-sort="{prop: 'last_time', order: 'descending'}">
                <el-table-column prop="names" label="姓名" width='80'>
                    <template scope="scope">
                        <span @click="switchDetail(scope.row)" class='nicknameSpan'>{{scope.row.names}}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="sex" label="性别" width='80'>
                </el-table-column>
                <el-table-column prop="age" label="年龄" width='80'>
                </el-table-column>
                <el-table-column prop="patriarch" label="家长" width='80'>
                </el-table-column>
                <el-table-column prop="mobile" label="手机" :formatter="formatter" width='100'>
                </el-table-column>
                <el-table-column prop="school" label="校区" width='180'>
                </el-table-column>
                <el-table-column prop="sour_name" label="渠道来源">
                </el-table-column>
                <el-table-column prop="created" label="录入时间" sortable >
                </el-table-column>
                <el-table-column prop="tmk_name" label="TMK" width='80' >
                </el-table-column>
                <el-table-column prop="last_time" label="最近联系时间" sortable>
                </el-table-column>
                <el-table-column prop="status" label="资源状态" column-key='status' width='80'>
                    <template scope="scope">
                        <span :style="scope.row.status=='待认领'?'color:#1fb5ad': scope.row.status=='已认领'? 'color:#dba31c' : scope.row.status=='已邀约'? 'color:#33c616' : scope.row.status=='已到访'? 'color:#4057e0':'color:#333333' ">{{scope.row.status}}</span>
                    </template>
                </el-table-column>
            </el-table>
            <div class="block">
                <span class="demonstration"></span>
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
// import {
//     mapActions
// } from 'vuex';

export default {
    data() {
            return {
                code: '',
                currentPage: 1, //页数
                pagesize: 15, //默认每页
                total: 0, //总页数
                tableData: [],
                number: '',
                optionsTMK: [], //TMK SELECT
                options: [], //表单上方的select
                options2: [], //渠道来源
                input2: '', //姓名或手机号码
                value1: '', //对应select的值
                value2: [], //对应select的值
                value3: '', //对应select的值
                value4: '',
                value5: '',
                valueR: '',
                valueT: '',
                 propsource:{
          value: 'id',
          label:'names',
          children: '_child'
        },
            }
        },
        methods: {
            goToAdd(){
                this.$router.push('/addUser');
            },
            // ...mapActions([
            //     'sendResourceId'
            // ]),
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
                this.$router.push('/userDetail'+'/'+row.id+'/'+row.status+'/'+1);
                // })
            },
            updateList() {
                this.currentPage = 1;
                this.fetchData();

            },
            fetchData() {
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
                }
                getMyResoure(para, token).then((res) => { //替换服务
                    this.number = res.data.total;
                    let a = res.data.data;
                    let c = res.data.last_page * this.pagesize;
                    this.tableData = a;
                    this.total = parseInt(c);
                })
            },

            handleCurrentChange: function(val) {
                this.currentPage = val;
                this.fetchData();
            }

        },
        beforeCreate() {
            user = localStorage.getItem('user');
            token = JSON.parse(user).token;
        },

        created() {
            this.code = JSON.parse(user).job ? JSON.parse(user).job.code : ''; //获取职位code
            this.fetchData(); //获取表格数据
            if (this.code == 'tmk_m') {
                getTMK(token).then((res) => {
                    this.optionsTMK = res.data
                    this.optionsTMK.unshift({key:'0',label:'全部TMK'})
                })
            }
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
.accouMyresourece .el-date-editor--daterange.el-input{
  width:184px;
}
#table1 .el-table td,
#table1 .el-table th {
    padding: 1px;
    text-align: center
}

#table1 .el-table th>div,
#table1 .el-table .cell {
    padding-left: 0;
    padding-right: 0;
}

.nicknameSpan:hover {
    cursor: pointer;
}

.accouMyresourece {
    width: 100%;
    position: relative;
    height: auto;
    display: flex;
    flex-wrap: wrap;
  justify-content: space-between;
    background-color: white;
  margin-top:30px;
  padding-top:10px;
  margin-bottom: 5px;
  border-radius: 5px;
}

.mydataReturn {
   /*display: block;*/
    /*margin-top: 20px;*/
    margin-bottom: 15px;
    padding-left: 10px;
    width:200px;/*
    margin-right:70%;*/
}

.studentReturnThreeNew {
   display: inline-block;
    width: 100px;
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
display:flex;flex-wrap:wrap
}
.MRinput{
width:200px;display:inline-block;margin-left: 10px;margin-bottom: 10px;margin-right:110px
}
.MRadd{
position:absolute;right:10px;bottom:10px
}
</style>
