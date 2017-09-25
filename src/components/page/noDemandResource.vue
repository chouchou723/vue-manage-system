<template>
    <div class="crumbs">
        <el-breadcrumb separator="/">
            <el-breadcrumb-item><i class="el-icon-my-moban"></i> 资源管理</el-breadcrumb-item>
            <el-breadcrumb-item class='ss'>无需求资源</el-breadcrumb-item>
        </el-breadcrumb>
        <div class='noEff'>
            <h2 class="studentReturnnoEff">
                无需求资源({{number}}人)
            </h2>
            <div class='studentReturnNoneed' v-if="code =='tmk_m'">
                <el-select v-model="valueT" clearable placeholder="选择TMK" @change="updateList">
                    <el-option v-for="item in optionsTMK" :key="item.key" :label="item.label" :value="item.key">
                    </el-option>
                </el-select>
            </div>
            <div class="NDRdis">
                <el-button type="success" @click="openResource" :disabled="this.multipleSelection==''" v-if="code =='tmk_m'">资源分配</el-button>
            </div>
        </div>
        <el-dialog title="资源分配" :visible.sync="dialogFormVisible" :close-on-click-modal="no" top='33%' size='tiny' show-close custom-class='resourceSchoolDD'>
            <el-form :model="resourceSchool" id='actSchool1'>
                <el-form-item label="分配给:" prop='valueTMK'>
                    <el-select v-model="resourceSchool.valueTMK" clearable placeholder="选择TMK">
                        <el-option v-for="item in optionsTMK" :key="item.key" :label="item.label" :value="item.key">
                        </el-option>
                    </el-select>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer NDRfoot">
                <el-button type="primary" @click="distributeResource">确 定</el-button>
                <el-button @click="dialogFormVisible = false">取 消</el-button>
            </div>
        </el-dialog>
        <div id="table2">
            <el-table :data="noEffData" border style="width: 100%" :default-sort="{prop: 'created', order: 'descending'}" @selection-change="handleSelectionChange">
                <el-table-column type="selection" width="55" v-if="code =='tmk_m'">
                </el-table-column>
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
                <el-table-column prop="school" label="校区">
                </el-table-column>
                <el-table-column prop="created" label="录入时间" sortable>
                </el-table-column>
                <el-table-column prop="tmk_name" label="TMK" width='80'>
                </el-table-column>
                <el-table-column prop="created" label="最终处理时间" sortable>
                </el-table-column>
            </el-table>
        </div>
        <div class="block">
            <span class="demonstration"></span>
            <el-pagination layout="prev, pager, next" :total="total" @current-change="handleCurrentChange">
            </el-pagination>
        </div>
    </div>
</template>
<script>
    var user, token
    import {
        getMyResoure,
        getTMK,
        dispatchResource
    } from '../../api/api';
    // import {
    //     mapActions
    // } from 'vuex';
    export default {
        data() {
            return {
                multipleSelection: [],
                no: false,
                code: '',
                resourceSchool: {
                    valueTMK: ''
                },
                dialogFormVisible: false,
                total: 0,
                number: 0,
                noEffData: [],
                optionsTMK: [],
                valueT: '',
                currentPage: 1, //页数
                pagesize: 15, //默认每页
            }
        },
        methods: {
            formatter(row, column) {
                let reg = /(\d{4})\d{4}(\d{3})/;
                if (reg.test(row.mobile)) {
                    return row.mobile.replace(reg, '$1****$2');
                } else {
                    return row.mobile
                }
            },
            openResource() { //打开资源分配
                this.resourceSchool.valueTMK = ''
                getTMK(token).then((res) => {
                    this.optionsTMK = res.data
                    this.optionsTMK.unshift({
                        key: '0',
                        label: '无TMK'
                    })
                    this.optionsTMK.unshift({
                        key: '-1',
                        label: '自己'
                    })
                })
                this.dialogFormVisible = true
            },
            handleSelectionChange(val) { //选中数据
                this.multipleSelection = val
            },
            handleCurrentChange: function (val) { //换页
                this.currentPage = val;
                this.fetchData();
            },

            // ...mapActions([
            //     'sendResourceId'
            // ]),
            switchDetail(row) { //点击名字
                // let uid = {
                //     u_id: row.id,
                //     u_status: '无需求',
                //     u_resource: 2
                // }

                // this.sendResourceId(uid)
                this.$router.push('/userDetail' + '/' + row.id + '/noDemand/' + 2);
            },
            updateList() {
                this.currentPage = 1;
                this.fetchData();

            },
            fetchData() {
                let para = {
                    group_id: 0,
                    tmk_id: this.valueT, //TMK
                    page: this.currentPage
                }

                getMyResoure(para, token).then((res) => { //
                    this.number = res.data.total;
                    let a = res.data.data;
                    let c = res.data.last_page * this.pagesize;
                    this.noEffData = a;
                    this.total = parseInt(c);
                })
            },
            distributeResource() { //确定分配
                let a = this.multipleSelection.map(item => {
                    return item.id
                })
                let para = {
                    customer_ids: a.join(','),
                    tmk_id: this.resourceSchool.valueTMK
                }
                dispatchResource(para, token).then(res => {
                    if (res.code == 0) {

                        this.fetchData();
                        this.$message.success('分配成功')
                    } else {
                        this.$message.error(res.message)
                    }
                })
                this.dialogFormVisible = false
            }
        },

        beforeCreate() {
            user = localStorage.getItem('user');
            token = JSON.parse(user).token;
        },
        created() {
            this.code = JSON.parse(user).job ? JSON.parse(user).job.code : '';
            this.fetchData();
            if (this.code == 'tmk_m') {
                getTMK(token).then((res) => {
                    this.optionsTMK = res.data;
                    this.optionsTMK.unshift({
                        key: '0',
                        label: '全部TMK'
                    })
                })
            }
        },
    }

</script>
<style>
    #table2 .el-table td,
    #table2 .el-table th {
        padding: 1px;
        text-align: center
    }

    #table2 .el-table th>div,
    #table2 .el-table .cell {
        padding-left: 0;
        padding-right: 0;
    }

    .resourceSchoolDD .el-dialog__header {
        background-color: #1fb5ad;
        padding: 20px 20px 20px;
    }

    .resourceSchoolDD .el-dialog__title {
        color: white;
    }

    .nicknameSpan:hover {
        cursor: pointer;
    }

    .nicknameSpan {
        font-weight: 600;
    }

    .block {
        text-align: center;
        margin-top: 10px;
    }

    .studentReturnnoEff {
        float: left;
        margin-right: 5px;
        padding-left: 10px;
    }

    .studentReturnNoneed {
        float: left;
        width: 120px;
        margin-right: 10px;
    }

    .noEff {
        width: 100%;
        position: relative;
        height: 46px;
        background-color: white;
        margin-top: 30px;
        padding-top: 10px;
        margin-bottom: 5px;
        border-radius: 5px;
    }

    .NDRdis {
        float: right;
        margin-right: 10px
    }

    .NDRfoot {
        text-align: center;
        margin-top: -24px
    }

</style>
