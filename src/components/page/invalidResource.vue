<template>
    <div class="crumbs">
        <el-breadcrumb separator="/">
            <el-breadcrumb-item><i class="el-icon-menu"></i> 资源管理</el-breadcrumb-item>
            <el-breadcrumb-item>无效资源</el-breadcrumb-item>
        </el-breadcrumb>
        <div class='noEff'>
            <h2 class="studentReturn">
            
        无效资源({{number}}人)
        </h2>
            <div class='studentReturnThreeNoEff'>
                <el-select v-model="value" clearable placeholder="选择校区" filterable @change="updateList">
                    <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                    </el-option>
                </el-select>
            </div>
            <div class='studentReturnThreeNoEff'>
                <el-select v-model="value2" clearable placeholder="渠道来源" @change="updateList">
                    <el-option v-for="item in options2" :key="item.id" :label="item.names" :value="item.id">
                    </el-option>
                </el-select>
            </div>
            <div class='studentReturnThreeNoEffTime'>
                <el-date-picker v-model="value3" type="daterange" placeholder="注册时间" @change="updateList">
                </el-date-picker>
            </div>
            <div class='studentReturnThreeNoEffTime'>
                <el-date-picker v-model="value4" type="daterange" placeholder="最近联系时间" @change="updateList">
                </el-date-picker>
            </div>
        </div>
        <div id="table3">
            <el-table :data="noEffData" border style="width: 100%" :default-sort="{prop: 'created', order: 'descending'}">
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
                <el-table-column prop="created" label="注册时间" sortable>
                </el-table-column>
            </el-table>
        </div>
        <div class="block">
            <span class="demonstration"></span>
            <el-pagination layout="prev, pager, next" :total="total" @current-change="handleCurrentChange">
            </el-pagination>
        </div>
    </div>
    </div>
</template>
<script>
var user, token
import {
    campusList,
    sourceList,
    getMyResoure
} from '../../api/api';
import {
    mapActions
} from 'vuex';
export default {
    data() {
            return {
                total: 0,
                number: 0,
                noEffData: [],
                options: [],
                options2: [],
                value: '',
                value2: '',
                value3: '',
                value4: '',
                currentPage: 1, //页数
                pagesize: 15, //默认每页
            }
        },
        methods: {
            ...mapActions([
                'sendResourceId'
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
                let uid = {
                    u_id: row.id,
                    u_status: '无效',
                    u_resource: 3
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
                    group_id: 1,
                    school_id: this.value,
                    sour_id: this.value2,
                    page: this.currentPage,
                    input_start_date: this.value3 ? typeof(this.value3[0]) != 'object' ? new Date(this.value3[0]).toLocaleString().substring(0, 9) : '' : '',
                    input_end_date: this.value3 ? typeof(this.value3[1]) != 'object' ? new Date(this.value3[1]).toLocaleString().substring(0, 9) : '' : '',
                    last_start_date: this.value4 ? typeof(this.value4[0]) != 'object' ? new Date(this.value4[0]).toLocaleString().substring(0, 9) : '' : '',
                    last_end_date: this.value4 ? typeof(this.value4[1]) != 'object' ? new Date(this.value4[1]).toLocaleString().substring(0, 9) : '' : '',
                }

                getMyResoure(para, token).then((res) => { //替换服务
                    this.number = res.data.total;
                    let a = res.data.data;
                    let c = res.data.last_page * this.pagesize;

                    // console.log(a)
                    // console.log(a)
                    this.noEffData = a;
                    this.total = parseInt(c);
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
            let cam = {
                simple: '1'
            };
            campusList(cam, token).then((res) => { //获取校区
                let a = res.data;
                this.options = a.map(item => {
                    return {
                        value: item.id,
                        label: item.title
                    };
                });
            })
            sourceList(token).then(res => {
                this.options2 = res.data

            })
        },
}
</script>
<style>
#table3 .el-table td,
#table3 .el-table th {
    padding: 1px;
    text-align: center
}

#table3 .el-table th>div,
#table3 .el-table .cell {
    padding-left: 0;
    padding-right: 0;
}

.nicknameSpan:hover {
    cursor: pointer;
}

.block {
    text-align: center;
    margin-top: 10px;
}

.studentReturn {
    float: left;
    margin-right: 5px;
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

.noEff {
    width: 100%;
    position: relative;
    height: 50px;
    margin-top: 15px;
}
</style>
