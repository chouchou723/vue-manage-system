<template>
    <div class="crumbs">
        <!-- <el-breadcrumb separator="/">
            <el-breadcrumb-item><i class="el-icon-my-weituoguanxiguanli"></i> 业务交接</el-breadcrumb-item>
        </el-breadcrumb> -->
        <div class='PATH'>
            <h3 class="PATH1">

                业务交接
                <span v-if="number==='0'" style="font-size:14px;color: #bdb8b8;">加载中...</span>
               <span v-else>({{number}}人)</span>
            </h3>
            <div class='PATH13'>
                <el-select v-model="valueT"  placeholder="选择TMK" @change="updateList">
                    <el-option v-for="item in optionsTMK" :key="item.key" :label="item.label" :value="item.key">
                    </el-option>
                </el-select>
            </div>
            <div class='PATH13'>
                <el-select v-model="valueK"  clearable placeholder="资源类型" @change="updateList">
                    <el-option label="我的资源" value="1"></el-option>
                    <el-option label="无需求资源" value="2"></el-option>
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
            <div style='margin-bottom:20px;font-weight:bold'>请选择要接管的tmk:</div>
            <el-form :model="resourceAssign" id='actSchool1'>
                <el-form-item prop='receiveTMK'>
                    <el-select v-model="resourceAssign.receiveTMK" placeholder="选择tmk" style="width:185px">
                        <el-option v-for="item in optionsTMK" :key="item.key" :label="item.label" :value="item.key">
                        </el-option>
                    </el-select>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer" style='text-align:center;margin-top:-24px'>
                <el-button type="primary" @click="distributeResource">确 定</el-button>
                <el-button @click="dialogFormVisible = false">取 消</el-button>
            </div>
        </el-dialog>
        <div id="table2PAT">
            <el-table :data="noEffData"  style="width: 100%"  @selection-change="handleSelectionChange">
                <el-table-column type="selection" width="55">
                </el-table-column>
                <el-table-column prop="names" label="姓名">
                    <template scope="scope">
                        <span >{{scope.row.names}}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="sex" label="性别">
                </el-table-column>
                <el-table-column prop="birthday" label="生日">
                </el-table-column>
                <el-table-column prop="cc_name" label="CC">
                </el-table-column>
                <el-table-column prop="school" label="校区">
                </el-table-column>
            </el-table>
        </div>
        <div class="block">
              <!-- <span class="demonstration"></span> -->
            <el-pagination layout="sizes,prev, pager, next" :total="total"  :page-sizes="[150,300,500]" :current-page="currentPage"
             :page-size="pagesize" @current-change="handleCurrentChange"  @size-change="handleSizeChange">
            </el-pagination>
        </div>
    </div>
</template>
<script>
    var user, token
    import {
        getTransposing,
        dispatchPerson,
        campusList,
        getTMK
    } from '../../api/api';
    export default {
        data() {
            return {
                isDisabled: [],
                multipleSelection: [],
                no: false,
                valueK:'',
                code: '',
                resourceAssign: {
                    receiveTMK: ''
                },
                dialogFormVisible: false,
                total: 0,
                number: '0',
                noEffData: [],
                optionsTMK: [],
                valueT: '',
                input2: '',
                currentPage: 1, //页数
                pagesize: 150, //默认每页
            }
        },
        methods: {
            // formatter(row, column) {
            //     let reg = /(\d{4})\d{4}(\d{3})/;
            //     if (reg.test(row.mobile)) {
            //         return row.mobile.replace(reg, '$1****$2');
            //     } else {
            //         return row.mobile
            //     }
            // },
            openResource() { //打开人员分配
                this.resourceAssign.receiveTMK = ''

                this.dialogFormVisible = true
            },
            handleSelectionChange(val) { //选中数据
                this.multipleSelection = val
            },
            handleSizeChange :function (val) { //换页
                this.pagesize = val;
                this.fetchData();
            },
            handleCurrentChange: function (val) { //换页
                this.currentPage = val;this.backToTop();
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
                    type: 'tmk',
                    teach_id: this.valueT, //TMK
                    page: this.currentPage,
                    input:this.input2,
                    pagesize:this.pagesize,
                    group:this.valueK
                }

                getTransposing(token,para).then((res) => { //替换以后的人员查询
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
                    type:'tmk',
                    uids: a,
                    new_teach_id: this.resourceAssign.receiveTMK
                }
                dispatchPerson(para, token).then(res => {
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
            user = sessionStorage.getItem('user');
            token = JSON.parse(user).token;
        },
        created() {
            this.code = JSON.parse(user).job ? JSON.parse(user).job.code : '';
            this.valueT = JSON.parse(user).aid+''
            this.fetchData();
            getTMK(token).then((res) => {
                    this.optionsTMK = res.data;
                    // this.optionsTMK.unshift({key:'0',label:'全部TMK'})
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
    #table2PAT .el-table td,
    #table2PAT .el-table th:not(.gutter) {
        padding: 1px;
        text-align: center
    }

    #table2PAT .el-table th>div,
    #table2PAT .el-table .cell {
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


    .nicknameSpanPAT {
        font-weight: 600;
    }

    .block {
        text-align: center;
        margin-top: 10px;
    }

    .PATH1 {
        float: left;
        margin-right: 5px;
        padding-left: 10px;
        margin-top:5px;
    }

    .PATH13 {
        float: left;
        width: 120px;
        margin-right: 10px;
    }

    .PATH {
        width: 100%;
        position: relative;
        height: 46px;
        background-color: white;
        margin-top: 0;
        padding-top: 10px;
        margin-bottom: 5px;
        border-radius: 5px;
    }

</style>
