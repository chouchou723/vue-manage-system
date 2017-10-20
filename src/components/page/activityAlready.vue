<template>

    <div class="crumbsInval">
        <!-- <el-breadcrumb separator="/">
           <el-breadcrumb-item><i class="el-icon-my-tongzhi"></i> 活动管理</el-breadcrumb-item>
            <el-breadcrumb-item class='ss'>已发布活动</el-breadcrumb-item>
        </el-breadcrumb> -->
        <div class='noInvalid'>
            <h2 class="studentinvalid">
            
        已发布活动({{number}}个)
        </h2>
            <div class='studentReturnThreeNoEff'>
                <el-select v-model="value" clearable placeholder="活动类型" filterable @change="updateList">
                        <el-option label="亲子俱乐部" value="100"></el-option>
                        <el-option label="生日会" value="200"></el-option>
                </el-select>
            </div>
            <div class='studentReturnThreeNoEff'>
                <el-select v-model="value1" clearable placeholder="活动状态" filterable @change="updateList">
                    <el-option label="进行中" value="1"></el-option>
                        <el-option label="已结束" value="0"></el-option>
                </el-select>
            </div>
        </div>
        <div id="table3AA">
            <el-table :data="noEffData"  style="width: 100%;border-radius:5px" >
                <el-table-column prop="names" label="活动名称" >
                    <template scope="scope">
                        <span @click="switchDetail(scope.row)" class='nicknameSpanAA'>{{scope.row.names}}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="type_id" label="活动类型" width='90'>
                       
                </el-table-column>
                <el-table-column prop="price" label="活动价格" width='70'>
                </el-table-column>
                <el-table-column prop="schoolName" label="举办校区 " width='200'>
                </el-table-column>
                <el-table-column prop="teacherName" label="负责老师" width='70'>
                </el-table-column>
                <el-table-column prop="address" label="活动地点" >
                </el-table-column>
                <el-table-column prop="sign_time" label="报名截至时间"  width='150'>
                </el-table-column>
                <el-table-column prop="created" label="活动起止时间" width='180'>
                        <template scope="scope">
                                <div >{{scope.row.start_time}}</div>
                                <div>至</div>
                                <div>{{scope.row.end_time}}</div>
                            </template>
                </el-table-column>
                 <el-table-column prop="sales_num" label="报名人数"  width='70'>
                </el-table-column>
                  <el-table-column prop="status" label="活动状态"  width='70'>
                        <template scope="scope">
                                <span :style="scope.row.status=='进行中'?'color:#1fb5ad':'color:#99b5b3'">{{scope.row.status}}</span>
                            </template>
                </el-table-column>
            </el-table>
        </div>
        <div class="block">
            <span class="demonstration"></span>
            <el-pagination layout="prev, pager, next" :total="total" :current-page="currentPage" :page-size="pagesize" @current-change="handleCurrentChange">
            </el-pagination>
        </div>
    </div>
    
</template>
<script>
var user, token
import {
    campusList,
    sourceList,
    getMyResoure,
    getActivityAlreadyList
} from '../../api/api';
import {
    mapActions,mapGetters
} from 'vuex';
export default {
    data() {
            return {
                total: 0,
                number: 0,
                noEffData: [],
                options: [],
                value: '',
                value1: '',
                currentPage: 1, //页数
                pagesize: 15, //默认每页
            }
        },
        methods: {
            ...mapActions([
                'setmyActS'
            ]),
            formatter(row, column) {
                let reg = /(\d{4})\d{4}(\d{3})/;
                if (reg.test(row.mobile)) {
                    return row.mobile.replace(reg, '$1****$2');
                } else {
                    return row.mobile
                }
            },
            handleCurrentChange: function(val) {
                this.currentPage = val;
                this.fetchData();
            },
            switchDetail(row) {
                let d = {
                    type_id: this.value,
                    status: this.value1,
                    page: this.currentPage,
                }
                this.setmyActS(d)
                this.$router.push({ name: 'activityDetail', params: { id: row.id,type: row.type_id}});
                // this.$router.push('/activityDetail'+'/'+row.id+'/'+row.type_id);
            },
            updateList() {
                this.currentPage = 1;
                this.fetchData();

            },
            fetchData() {
                if(Object.keys(this.getmyActS).length!=0){
                    this.value =  this.getmyActS.type_id;
                    this.value1 =  this.getmyActS.status;
                    this.currentPage =  this.getmyActS.page;
                }
                let para = {
                    type_id: this.value,
                    status: this.value1,
                    page: this.currentPage,
                }

                getActivityAlreadyList(token,para).then((res) => {//替换服务
                    this.number = res.data.total;
                    let a = res.data.data;
                    let c = res.data.last_page * this.pagesize;

                    // console.log(a)
                    // console.log(a)
                    this.noEffData = a;
                    this.total = parseInt(c);
                }).then(()=>{
                    this.setmyActS({})
                })
            },
        },

        beforeCreate() {
            user = localStorage.getItem('user');
            token = JSON.parse(user).token;
        },
        created() {
            // this.code = JSON.parse(user).job?JSON.parse(user).job.code : '';
            this.fetchData();
        },
        computed: {
        ...mapGetters([
            'getmyActS'
            // ...
        ])
    },
}
</script>
<style>
#table3AA .el-table td,
#table3AA .el-table th:not(.gutter) {
    padding: 1px;
    text-align: center
}

#table3AA .el-table th>div,
#table3AA .el-table .cell {
    padding-left: 0;
    padding-right: 0;
}

.nicknameSpanAA:hover {
    cursor: pointer;
}
.nicknameSpanAA{
    font-weight: 600;
    color:#1fb5ad
}
.crumbsInval .block {
    text-align: center;
    margin-top: 10px;
}

.studentinvalid {
    float: left;
    margin-right: 5px;
    padding-left: 10px;

}

.studentReturnThreeNoEffTime {
    float: left;
    width: 220px;
    margin-right: 10px;
}

.studentReturnThreeNoEff {
    float: left;
    width: 125px;
    margin-right: 10px;
}

.noInvalid {
    width: 100%;
    position: relative;
    height: 46px;
     /* margin-top:30px; */
  padding-top:10px;
  margin-bottom: 5px;
  border-radius: 5px;
  background-color: white;
}
</style>
