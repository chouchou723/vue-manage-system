<template>
    <div class="crumbs">
        <el-breadcrumb separator="/">
            <el-breadcrumb-item><i class="el-icon-menu"></i> 资源管理</el-breadcrumb-item>
            <el-breadcrumb-item>我的资源</el-breadcrumb-item>
        </el-breadcrumb>
        <div class='accou'>
            <h2 class="mydataReturn">
               我的资源({{number}}人)
      </h2>
            <div class='studentReturnThreeNew' v-if="code =='tmk_m'">
                <el-select v-model="valueT" clearable placeholder="选择TMK" @change="updateList">
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
                <el-select v-model="value1" clearable placeholder="选择校区" filterable @change="updateList">
                    <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                    </el-option>
                </el-select>
            </div>
            <div class='studentReturnThreeNew'>
                <el-select v-model="value2" clearable placeholder="渠道来源" @change="updateList">
                    <el-option v-for="item in options2" :key="item.id" :label="item.names" :value="item.id">
                    </el-option>
                </el-select>
            </div>
            <div class='studentReturnThreeN'>
                <el-date-picker v-model="value3" type="daterange" placeholder="录入时间" @change="updateList">
                </el-date-picker>
            </div>
            <div class='studentReturnThreeN'>
                <el-date-picker v-model="value4" type="daterange" placeholder="最近联系时间" @change="updateList">
                </el-date-picker>
            </div>
            <div class='studentReturnThreeNew'>
                <el-select v-model="value5" clearable placeholder="资源状态" @change="updateList">
                    <el-option label="待认领" value="0"></el-option>
                    <el-option label="已认领" value="1"></el-option>
                    <el-option label="已邀约" value="2"></el-option>
                    <el-option label="已到访" value="3"></el-option>
                    <el-option label="未到访" value="4"></el-option>
                </el-select>
            </div>
            <div class='search1'>
                <el-input placeholder="输入手机号或姓名" icon="search" v-model="input2" @keyup.enter.native="updateList" :on-icon-click="updateList">
                </el-input>
            </div>
        </div>
        <div id="table1">
            <el-table :data="tableData" border style="width: 100%" :default-sort="{prop: 'last_time', order: 'descending'}">
                <el-table-column prop="names" label="姓名">
                    <template scope="scope">
                        <span @click="switchDetail(scope.row)" class='nicknameSpan'>{{scope.row.names}}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="sex" label="性别">
                </el-table-column>
                <el-table-column prop="age" label="年龄">
                </el-table-column>
                <el-table-column prop="patriarch" label="家长">
                </el-table-column>
                <el-table-column prop="mobile" label="手机" :formatter="formatter">
                </el-table-column>
                <el-table-column prop="school" label="校区">
                </el-table-column>
                <el-table-column prop="sour_name" label="渠道来源">
                </el-table-column>
                <el-table-column prop="created" label="注册日期" sortable>
                </el-table-column>
                <el-table-column prop="last_time" label="最近访问" sortable>
                </el-table-column>
                <el-table-column prop="status" label="资源状态" column-key='status'>
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
import {
    mapActions
} from 'vuex';

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
                'sendResourceId'
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

                this.sendResourceId(uid)
                this.$router.push('/userDetail');
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
                    sour_id: this.value2, //渠道
                    status: this.value5, //资源状态
                    page: this.currentPage, //页签
                    input_start_date: this.value3? typeof (this.value3[0]) !='object'?new Date(this.value3[0]).toLocaleString().substring(0, 9):'' : '',
                    input_end_date: this.value3? typeof (this.value3[1]) !='object'?new Date(this.value3[1]).toLocaleString().substring(0, 9):'' : '',
                    last_start_date: this.value4? typeof (this.value4[0]) !='object'?new Date(this.value4[0]).toLocaleString().substring(0, 9):'' : '',
                    last_end_date: this.value4? typeof (this.value4[1]) !='object'?new Date(this.value4[1]).toLocaleString().substring(0, 9):'' : '',
                    input: this.input2,
                }

                getMyResoure(para, token).then((res) => { //替换服务
                    this.number = res.data.total;
                    let a = res.data.data;
                    let c = res.data.last_page * this.pagesize;

                    // console.log(a)
                    // console.log(a)
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
            let cam = {
                simple: '1'
            };
            sourceList(token).then(res => {
                this.options2 = res.data

            })
            campusList(cam, token).then((res) => { //获取校区
                let a = res.data;
                this.options = a.map(item => {
                    return {
                        value: item.id,
                        label: item.title
                    };
                });
            })
            if (this.code == 'tmk_m') {
                getTMK(token).then((res) => {
                    this.optionsTMK = res.data
                })
            }

        },
}
</script>
<style>
.el-date-editor--daterange.el-input{
  width:219px;
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

.accou {
    width: 100%;
    position: relative;
    height: 50px;
}

.mydataReturn {
    float: left;
    margin-top: 20px;
    margin-bottom: 15px;
}

.studentReturnThreeNew {
    float: left;
    width: 122px;
    margin-right: 10px;
    margin-top: 20px;
}

.studentReturnThreeN {
    float: left;
    margin-right: 10px;
    margin-top: 20px;
}

.search1 {
    float: right;
    width: 158px;
    margin:20px 10px 2px 0;
}

.kuangyi {
    padding: 1px;
    width: 100%;
    height: 500px;
    border-style: none;
}

.block {
    text-align: center;
    margin-top: 10px;
}
</style>
