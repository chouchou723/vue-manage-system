<template>
    <div class="crumbs">
        <!-- <el-breadcrumb separator="/">
            <el-breadcrumb-item><i class="el-icon-my-weituoguanxiguanli"></i> 业务交接</el-breadcrumb-item>
        </el-breadcrumb> -->
        <div class='noEff'>
            <h2 class="studentReturnnoEff">

                业务交接({{number}}人)
            </h2>
            <div class='studentReturnNoneed'>
                <el-select v-model="valueT"  placeholder="选择老师" @change="updateList">
                    <el-option v-for="item in optionsCC" :key="item.aid" :label="item.uname" :value="item.aid">
                    </el-option>
                </el-select>
            </div>
            <div style="width:200px;display:inline-block;margin-left: 10px;margin-bottom: 10px;margin-right:110px">
                <el-input placeholder="输入手机号或姓名" icon="search" v-model="input2" @keyup.enter.native="updateList" :on-icon-click="updateList"
                    style='margin-right:10px'> </el-input>
            </div>
            <div style="float:right;margin-right:10px">
                <el-button type="success" @click="openResource" :disabled="this.multipleSelection==''">接收人</el-button>
            </div>
        </div>
        <el-dialog title="接收人" :visible.sync="dialogFormVisible" :close-on-click-modal="no" top='33%' size='tiny' show-close custom-class='personAssign'>
            <div style='margin-bottom:20px;font-weight:bold'>请选择要接管的老师:</div>
            <el-form :model="resourceAssign" id='actSchool1'>
                <el-form-item prop='school'>
                    <el-select v-model="resourceAssign.school" clearable placeholder="选择校区" filterable @change='getCC'>
                        <el-option v-for="item in receiveSchool" :key="item.value" :label="item.label" :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item prop='receiveCC'>
                    <el-select v-model="resourceAssign.receiveCC" placeholder="老师选择" style="width:185px">
                        <el-option v-for="item in listCC" :key="item.aid" :label="item.uname" :value="item.aid">
                        </el-option>
                    </el-select>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer" style='text-align:center;margin-top:-24px'>
                <el-button type="primary" @click="distributeResource">确 定</el-button>
                <el-button @click="dialogFormVisible = false">取 消</el-button>
            </div>
        </el-dialog>
        <div id="table2PAE">
            <el-table :data="noEffData"  style="width: 100%" @selection-change="handleSelectionChange">
                <el-table-column type="selection" width="55">
                </el-table-column>
                <el-table-column prop="names" label="姓名">
                    <template scope="scope">
                        <span>{{scope.row.names}}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="sex" label="性别">
                </el-table-column>
                <el-table-column prop="age" label="年龄">
                </el-table-column>
                <el-table-column prop="patriarch" label="CC">
                </el-table-column>
                <el-table-column prop="school" label="校区">
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
        getMyCustomerList,
        dispatchResource,
        campusList,
        getTeacherList
    } from '../../api/api';
    export default {
        data() {
            return {
                listCC:[],
                isDisabled: [],
                multipleSelection: [],
                no: false,
                code: '',
                resourceAssign: {
                    school: '',
                    receiveCC: ''
                },
                dialogFormVisible: false,
                total: 0,
                number: 0,
                noEffData: [],
                optionsCC: [],
                receiveSchool: [],
                valueT: '',
                valueR: '1',
                input2: '',
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
            getCC(){
                let para = {
                    school_id:this.resourceAssign.school
                }
                getAllCCList(token,para).then((res) => {
                this.listCC = res.data;
            })
            },
            openResource() { //打开人员分配
                this.resourceAssign.school = ''

                this.dialogFormVisible = true
            },
            handleSelectionChange(val) { //选中数据
                this.multipleSelection = val
            },
            handleCurrentChange: function (val) { //换页
                this.currentPage = val;
                this.fetchData();
            },
            // switchDetail(row) { //点击名字
            //     let uid = {
            //         u_id: row.id,
            //         u_status: '无需求',
            //         u_resource: 2
            //     }

            //     // this.sendResourceId(uid)
            //     this.$router.push('/userDetail' + '/' + row.id + '/noDemand/' + 2);
            // },
            updateList() {
                this.currentPage = 1;
                this.fetchData();

            },
            fetchData() {
                let para = {
                    group_id: 0,
                    cc_id: this.valueT, //TMK
                    page: this.currentPage,
                    input:this.input2,
                    kind:this.valueR
                }

                getMyCustomerList(token,para).then((res) => { //替换以后的人员查询
                    this.number = res.data.total;
                    let a = res.data.data;
                    let c = res.data.last_page * this.pagesize;
                    this.noEffData = a;
                    this.total = parseInt(c);
                })
            },
            distributeResource() { //调配人员
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
            this.valueT = JSON.parse(user).aid
            this.fetchData();
            getTeacherList(token).then((res) => { //获取老师
                    this.optionsCC = res.data;
                })
            let si = {
                simple: 1
            }
            campusList(si, token).then((res) => { //获取校区
                let a = res.data;
                this.receiveSchool = a.map(item => {
                    return {
                        value: item.id,
                        label: item.title
                    };
                });
            })
        },
    }

</script>
<style>
    #table2PAE .el-table td,
    #table2PAE .el-table th:not(.gutter) {
        padding: 1px;
        text-align: center
    }

    #table2PAE .el-table th>div,
    #table2PAE .el-table .cell {
        padding-left: 0;
        padding-right: 0;
    }

    .personAssign .el-dialog__header {
        background-color: #1fb5ad;
        padding: 20px 20px 20px;
    }

    .personAssign .el-dialog__title {
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
        margin-top:0;
        padding-top: 10px;
        margin-bottom: 5px;
        border-radius: 5px;
    }

    .kuangyi {
        padding: 1px;
        width: 100%;
        height: 100%;
        border-style: none;
    }

</style>
