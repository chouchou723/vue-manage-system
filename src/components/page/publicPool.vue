<template>
    <div class="publicPool">
        <!-- <el-breadcrumb separator="/">
            <el-breadcrumb-item><i class="el-icon-my-yonhu"></i> 客户管理</el-breadcrumb-item>
            <el-breadcrumb-item class='ss'>客户认领</el-breadcrumb-item>
        </el-breadcrumb> -->
        <div class='publicPhH'>
            <h3 class="publicPh">
                客户认领
                <span v-if="number==='0'" style="font-size:14px;color: #bdb8b8;">加载中...</span>
               <span v-else>({{number}}人)</span>
            </h3>
        </div>
        <div id="publicPhHPP">
            <el-table :data="publicData"  style="width: 100%"  @sort-change='sortChange'>
                <el-table-column prop="names" label="姓名" width='140'>
                    <template scope="scope">
                        <span class='PPnicknameSpan'>{{scope.row.names}}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="sex" label="性别" width='140'>
                </el-table-column>
                <el-table-column prop="age" label="年龄" width='140'>
                </el-table-column>
                <el-table-column prop="patriarch" label="家长" width='140'>
                </el-table-column>
                <el-table-column prop="mobile" label="手机" :formatter="formatter" width='200'>
                </el-table-column>
                <el-table-column prop="created" label="录入时间" sortable='custom'>
                </el-table-column>
                <el-table-column label="操作" width='140' v-if='!code.includes("_c")'>
                    <template scope="scope">
                        <el-button type="text" size="small" @click="claim(scope.$index, publicData)" class='PPc'>认领</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <el-dialog title="认领客户" :visible.sync="dialogFormVisible" :close-on-click-modal="no" top='33%' size='tiny' show-close style='z-index:100'
            class='publicDialog'>
            <span style="font-size:16px">是否确认要认领该客户?</span>
            <div slot="footer" class="dialog-footer" style='text-align:center'>
                <el-button type="primary" :loading="writeL" @click="claimYes" style='margin-right:20px'>是</el-button>
                <el-button @click="dialogFormVisible = false">否</el-button>
            </div>
        </el-dialog>
        <div class="block">
              <!-- <span class="demonstration"></span> -->
            <el-pagination layout="prev, pager, next" :total="total" @current-change="handleCurrentChange" :page-size='pagesize'>
            </el-pagination>
        </div>
    </div>
</template>
<script>
    var user, token
    import {
        getPublicPoolList,
        claim_customer
    } from '../../api/api';
    export default {
        data() {
            return {
                writeL:false,
                dialogFormVisible: false,
                no: false,
                code: '',
                total: 0,
                number: '0',
                publicData: [],
                currentPage: 1, //页数
                pagesize: 15, //默认每页
                claimConfirm: {
                    customer_id: ''
                },
                sortName:'',
                sortOrder:'',
            }
        },
        methods: {
            sortChange(column){
                let {prop,order} = column
                // console.log(prop)
                this.sortName=prop;
                this.sortOrder = order;
                this.currentPage = 1;
                this.fetchData()
            },
            claim(index, data) {
                this.claimConfirm.customer_id = data[index].id;
                this.dialogFormVisible = true;
            },
            claimYes() {
                this.writeL = true;
                claim_customer(this.claimConfirm, token).then(res => {
                    if (res.code == 0) {
                        this.$message({
                            type: 'success',
                            message: '认领成功!'
                        });
                        this.fetchData();
                        this.dialogFormVisible = false;
                        this.writeL = false;
                    } else {
                        this.$message.error(res.data);
                        this.writeL = false;                        
                    }
                })
            },
            formatter(row, column) {
                let reg = /(\d{4})\d{4}(\d{3})/;
                if (reg.test(row.mobile)) {
                    return row.mobile.replace(reg, '$1****$2');
                } else {
                    return row.mobile
                }
            },
            handleCurrentChange: function (val) { //换页
                this.currentPage = val;
                this.fetchData();
            },
            fetchData() {
                let para = {
                    page: this.currentPage,
                    sortName:this.sortName,
                    sortOrder:this.sortOrder
                }
                getPublicPoolList(token, para).then((res) => { //
                    this.number = res.data.total;
                    let a = res.data.data;
                    let c = res.data.last_page * this.pagesize;
                    this.publicData = a;
                    this.total = parseInt(c);
                })
            },
        },
        beforeCreate() {
            user = sessionStorage.getItem('user');
            token = JSON.parse(user).token;
        },
        created() {
            this.code = JSON.parse(user).job ? JSON.parse(user).job.code : '';
            this.fetchData();
        },
    }

</script>
<style>
    /* #publicPhHPP .el-table td,
    #publicPhHPP .el-table th:not(.gutter) {
        padding: 1px;
        text-align: center
    }

    #publicPhHPP .el-table th>div,
    #publicPhHPP .el-table .cell {
        padding-left: 0;
        padding-right: 0;
    } */

    .PPnicknameSpan {
        font-weight: 600;
    }

    .block {
        text-align: center;
        margin-top: 10px;
    }

    .publicPh {
        float: left;
        margin-right: 5px;
        padding-left: 10px;
        margin-top:5px;
    }

    .publicPhH {
        width: 100%;
        position: relative;
        height: 46px;
        background-color: white;
        margin-top: 0;
        padding-top: 10px;
        margin-bottom: 5px;
        border-radius: 5px;
    }

    .publicDialog .el-dialog__body {
        text-align: center;
        /*color:#ec6161;*/
    }

    .publicPool .el-dialog .el-dialog__header {
        background-color: #1fb5ad;
        padding: 20px 20px 20px;
    }

    .publicPool .el-dialog .el-dialog__title {
        color: white;
    }
.PPc{
color:white;background:#1fb5ad;padding:5px 20px 5px
}
</style>
