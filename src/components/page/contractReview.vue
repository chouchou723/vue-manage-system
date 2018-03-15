<template>
    <div class="crumbs">
        <!-- <el-breadcrumb separator="/">
            <el-breadcrumb-item><i class="el-icon-my-moban"></i> 资源管理</el-breadcrumb-item>
            <el-breadcrumb-item class='ss'>无需求资源</el-breadcrumb-item>
        </el-breadcrumb> -->
        <div class='conReviewH2'>
            <h3 class="conReviewH1">
                合同审核
                <!-- <span v-if="number==='0'" style="font-size:14px;color: #bdb8b8;">加载中...</span>
               <span v-else>({{number}}人)</span> -->
            </h3>
            <div class='conReviewHS' >
                    <el-select v-model="value2" clearable placeholder="审核状态" @change="updateList" >
                        <el-option label="待审核" value="0"></el-option>
                        <el-option label="审核通过" value="1"></el-option>
                            <el-option label="审核失败" value="2"></el-option>
                        </el-select>
                </div>
            <div class='conReviewH' >
                <el-date-picker v-model="value3" type="daterange" placeholder="合同签约时间" @change="updateList" :picker-options="pickerOptions0">
                </el-date-picker>
            </div>
            <div class='conReviewH' >
                    <el-input placeholder="输入姓名或合同号" icon="search" v-model="input2" @keyup.enter.native="updateList" :on-icon-click="updateList"  > </el-input>
                  
                </div>
            <div class="conReviewH3">
                <el-button type="danger" @click="openResource(6)" :disabled="this.multipleSelection==''" >合同退费</el-button>
            </div>
                        <div class="conReviewH3">
                                <el-button type="warning" @click="openResource(2)" :disabled="this.multipleSelection==''" >回滚审核</el-button>
                        </div>
                        <div class="conReviewH3">
                                <el-button type="primary" @click="openResource(1)" :disabled="this.multipleSelection==''" >通过审核</el-button>
                        </div>
        </div>
        <el-dialog :title="openTitle" :visible.sync="dialogFormVisible" :close-on-click-modal="no" top='33%' size='tiny' show-close :custom-class='conReviewHD'>
            <!-- <el-form :model="resourceSchool" id='actSchool1'>
                <el-form-item label="分配给:" prop='valueTMK'>
                    <el-select v-model="resourceSchool.valueTMK" clearable placeholder="选择TMK">
                        <el-option v-for="item in optionsTMK" :key="item.key" :label="item.label" :value="item.key">
                        </el-option>
                    </el-select>
                </el-form-item>
            </el-form> -->
            <div slot="footer" class="dialog-footer conReviewH4">
                <el-button :type="bType" :loading='writeL' @click="distributeResource">确 定</el-button>
                <el-button @click="dialogFormVisible = false">取 消</el-button>
            </div>
        </el-dialog>
        <div id="table2NDR">
            <el-table :data="noEffData"  style="width: 100%"   @sort-change='sortChange' @selection-change="handleSelectionChange" >
                <el-table-column type="selection" width="55" >
                </el-table-column>
                <el-table-column prop="sku" label="合同编号">
                    <template scope="scope">
                        <span @click="switchDetail(scope.row)" class='conReviewH5'>{{scope.row.sku}}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="order_type_name" label="合同类型">
                </el-table-column>
                <el-table-column prop="order_status" label="合同状态">
                </el-table-column>
                <el-table-column prop="schoolName" label="校区">
                </el-table-column>
                <el-table-column prop="child_name" label="学生" >
                </el-table-column>
                <el-table-column prop="course_num" label="总课时">
                </el-table-column>
                <el-table-column prop="course_curr_num" label="剩余课时" >
                </el-table-column>
                <el-table-column prop="totalMoney" label="合同总价">
                </el-table-column>
                <!-- <el-table-column prop="tuition_money" label="学费" >
                </el-table-column>
                <el-table-column prop="tuition_money" label="优惠金额" >
                    </el-table-column> -->
                    <el-table-column prop="payment_method_name" label="付款方式" >
                        </el-table-column>
                        <el-table-column prop="people_number" label="人头数" >
                            </el-table-column>
                            <el-table-column prop="ccName" label="CC" >
                                </el-table-column>
                                <el-table-column prop="created_at" label="签约时间" >
                                    </el-table-column>
            </el-table>
        </div>
        <div class="block">
              <!-- <span class="demonstration"></span> -->
            <el-pagination layout="prev, pager, next"  :total="total"   @size-change="handleSizeChange" @current-change="handleCurrentChange"  :current-page="currentPage" :page-size="pagesize">
            </el-pagination>
        </div>
    </div>
</template>
<script>
    var user, token
    import {
        getcheckorder,
        orderAudit
    } from '../../api/api';
    import {
        mapActions,mapGetters
    } from 'vuex';
    export default {
        data() {
            return {
                pickerOptions0: {
                    disabledDate(time) {
                        return time.getTime() < Date.now() - 8.64e7;
                    }
                },
                conReviewHD:'',
                bType:'',
                openTitle:'',
                writeL:false,
                multipleSelection: [],
                no: false,
                code: '',
                resourceSchool: {
                    valueTMK: ''
                },
                dialogFormVisible: false,
                total: 0,
                number: '0',
                noEffData: [],
                optionsTMK: [],
                value2: '',
                value3: [],
                input2:'',
                currentPage: 1, //页数
                pagesize: 150, //默认每页
                sortName:'',
                sortOrder:'',
            }
        },
        methods: {
            // sortChange(column){
            //     let {prop,order} = column
            //     // console.log(prop)
            //     this.sortName=prop;
            //     this.sortOrder = order;
            //     this.currentPage = 1;
            //     this.fetchData()
            // },
            // formatter(row, column) {
            //     let reg = /(\d{4})\d{4}(\d{3})/;
            //     if (reg.test(row.mobile)) {
            //         return row.mobile.replace(reg, '$1****$2');
            //     } else {
            //         return row.mobile
            //     }
            // },
            openResource(num) { //打开资源分配
                this.openType = num;
                if(num ===1){
                    this.openTitle = '通过审核';
                this.conReviewHD = 'conReviewHD';
                this.bType = 'success'
                }else if(num ===2){
                    this.openTitle = '回滚审核';
                this.conReviewHD = 'conReviewHD2';
                this.bType = 'warning'
                }else{

                    this.openTitle = '合同退费';
                    this.conReviewHD = 'conReviewHD1';
                    this.bType = 'danger'
                }
                this.dialogFormVisible = true
            },
            handleSelectionChange(val) { //选中数据
                this.multipleSelection = val;
            },
            handleCurrentChange: function (val) { //换页
                this.currentPage = val;this.backToTop();
                this.fetchData();
            },
            // handleSizeChange :function (val) { //换页
            //     this.pagesize = val;
            //     this.fetchData();
            // },
            ...mapActions([
            'setmyReview'
        ]),
            switchDetail(row) { //点击名字
                // let uid = {
                //     u_id: row.id,
                //     u_status: '无需求',
                //     u_resource: 2
                // }
                let d = {
                    status: this.value2, //TMK
                    page: this.currentPage,
                    // sortName:this.sortName,
                    // sortOrder:this.sortOrder,
                    start_date: this.value3,
                }
                this.setmyReview(d)
                // this.sendResourceId(uid)
                this.$router.push('/contractDetail/' + row.order_id + '/' + row.uid);
            },
            updateList() {
                this.currentPage = 1;
                this.fetchData();

            },
            fetchData() {
                if(Object.keys(this.getmyReview).length!=0){
                    this.value2 =  this.getmyReview.status;
                    this.currentPage = this.getmyReview.page;
                    this.value3 =  this.getmyReview.start_date;
                }
                let para = {
                    status: this.value2, //TMK
                    start_date: this.value3[0] != null? new Date(this.value3[0]).toLocaleDateString(): '',
                    end_date: this.value3[0] != null?new Date(this.value3[1]).toLocaleDateString(): '',
                    page: this.currentPage,
                    sku:this.input2
                }

                getcheckorder(para, token).then((res) => { //
                    this.number = res.data.total;
                    let a = res.data.data;
                    let c = res.data.last_page * this.pagesize;
                    this.noEffData = a;
                    this.total = parseInt(c);
                }).then(()=>{
                    this.setmyReview({})
                })
            },
            distributeResource() { //审核
                let a = this.multipleSelection.map(item => {
                    return item.order_id
                })
                let para = {
                    order_id: a.join(','),
                    status:this.openType
                }
                this.writeL = true;
                orderAudit(para, token).then(res => {
                    if (res.code == 0) {

                        this.fetchData();
                        this.$message.success('操作成功');
                        this.writeL = false;
                        this.dialogFormVisible = false
                    } else {
                        this.$message.error(res.message);
                        this.writeL = false;
                    }
                })
            }
        },

        beforeCreate() {
            user = sessionStorage.getItem('user');
            token = JSON.parse(user).token;
        },
        created() {
            this.code = JSON.parse(user).job ? JSON.parse(user).job.code : '';
                this.fetchData(); //获取表格数据
        },
        computed: {
        ...mapGetters([
            'getmyReview'
            // ...
        ])
    },
    }

</script>
<style>
    /* #table2NDR .el-table td,
    #table2NDR .el-table th:not(.gutter) {
        padding: 1px;
        text-align: center
    }

    #table2NDR .el-table th>div,
    #table2NDR .el-table .cell {
        padding-left: 0;
        padding-right: 0;
    } */

    .conReviewHD .el-dialog__header {
        background-color: #1fb5ad;
        padding: 20px 20px 20px;
    }

    .conReviewHD .el-dialog__title {
        color: white;
    }
    .conReviewHD1 .el-dialog__header {
        background-color: #ff4949;
        padding: 20px 20px 20px;
    }

    .conReviewHD1 .el-dialog__title {
        color: white;
    }
    .conReviewHD2 .el-dialog__header {
        background-color: #f7ba2a;
        padding: 20px 20px 20px;
    }

    .conReviewHD2 .el-dialog__title {
        color: white;
    }
    .conReviewH5:hover {
        cursor: pointer;
    }

    .conReviewH5 {
        font-weight: 600;
        color:#1fb5ad
    }

    .block {
        text-align: center;
        margin-top: 10px;
    }

    .conReviewH1 {
        float: left;
        margin-right: 5px;
        padding-left: 10px;
        margin-top:5px;
    }

    .conReviewH {
        float: left;
        width: 217px;
        margin-right: 10px;
    }
.conReviewHS{
    float: left;
        width: 107px;
        margin-right: 10px;
}
    .conReviewH2 {
        width: 100%;
        position: relative;
        height: 46px;
        background-color: white;
        margin-top: 0;
        padding-top: 10px;
        margin-bottom: 5px;
        border-radius: 5px;
    }

    .conReviewH3 {
        float: right;
        margin-right: 10px
    }

    .conReviewH4 {
        text-align: center;
        margin-top: -24px
    }

</style>
