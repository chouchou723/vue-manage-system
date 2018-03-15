<template>
    <div class="crumbs">
        <!-- <el-breadcrumb separator="/">
            <el-breadcrumb-item><i class="el-icon-my-moban"></i> 资源管理</el-breadcrumb-item>
            <el-breadcrumb-item class='ss'>无需求资源</el-breadcrumb-item>
        </el-breadcrumb> -->
        <div class='tmkRPH'>
            <h3 class="tmkRPH1">
                资源认领
                <span v-if="number==='0'" style="font-size:14px;color: #bdb8b8;">加载中...</span>
               <span v-else>({{number}}人)</span>
            </h3>
            <div class='tmkRPH2' >
                <el-select v-model="valueT" clearable placeholder="资源类型" @change="updateList">
                    <!-- <el-option v-for="item in optionsTMK" :key="item.key" :label="item.label" :value="item.key">
                    </el-option> -->
                    <el-option label="无意向" value="0"></el-option>
                    <el-option label="正常" value="1"></el-option>
                </el-select>
            </div>
            <div class="tmkRPH3">
                <el-button type="success" @click="openResource" :disabled="this.multipleSelection==''" >认领</el-button>
            </div>
        </div>
        <el-dialog title="资源认领" :visible.sync="dialogFormVisible" :close-on-click-modal="no" top='33%' size='tiny' show-close custom-class='tmkRPH5'>
            <!-- <el-form :model="resourceSchool" id='actSchool1'>
                <el-form-item label="分配给:" prop='valueTMK'>
                    <el-select v-model="resourceSchool.valueTMK" clearable placeholder="选择TMK">
                        <el-option v-for="item in optionsTMK" :key="item.key" :label="item.label" :value="item.key">
                        </el-option>
                    </el-select>
                </el-form-item>
            </el-form> -->
            <div style="text-align:center;margin-bottom:20px;">
                是否确认要认领这批资源?
            </div>
            <div slot="footer" class="dialog-footer tmkRPH4">
                <el-button type="primary" :loading='writeL' @click="distributeResource">是</el-button>
                <el-button @click="dialogFormVisible = false">否</el-button>
            </div>
        </el-dialog>
        <div id="table2NDR">
            <el-table :data="noEffData"  style="width: 100%"   @sort-change='sortChange' @selection-change="handleSelectionChange" >
                <el-table-column type="selection" width="55" >
                </el-table-column>
                <el-table-column prop="uname" label="姓名" >
                    <template scope="scope">
                        <span >{{scope.row.uname}}</span>
                        <span v-if="scope.row.statu_code=='无意向'" style="border: 1px solid gainsboro;border-radius: 6px;color:#aba0a0;padding:3px 5px;font-size:12px;margin-left:5px;">无意向</span>
                    </template>
                </el-table-column>
                <!-- <el-table-column prop="sex" label="性别">
                </el-table-column> -->
                <el-table-column prop="age" label="年龄">
                </el-table-column>
                <!-- <el-table-column prop="patriarch" label="家长">
                </el-table-column> -->
                <el-table-column prop="source" label="渠道来源">
                </el-table-column>
                <el-table-column prop="mobile" label="手机" :formatter="formatter" >
                </el-table-column>
                <el-table-column prop="created" label="录入时间"  sortable='custom'>
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
        marketClaim,
        marketClaimPost
    } from '../../api/api';
    // import {
    //     mapActions,mapGetters
    // } from 'vuex';
    export default {
        data() {
            return {
                writeL:false,
                multipleSelection: [],
                no: false,
                code: '',
                dialogFormVisible: false,
                total: 0,
                number: '0',
                noEffData: [],
                // optionsTMK: [],
                valueT: '',
                currentPage: 1, //页数
                pagesize:50, //默认每页
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
            formatter(row, column) {
                let reg = /(\d{4})\d{4}(\d{3})/;
                if (reg.test(row.mobile)) {
                    return row.mobile.replace(reg, '$1****$2');
                } else {
                    return row.mobile
                }
            },
            openResource() { //打开资源分配
                this.writeL = false;
                this.dialogFormVisible = true
            },
            handleSelectionChange(val) { //选中数据
                this.multipleSelection = val
            },
            handleCurrentChange: function (val) { //换页
                this.currentPage = val;this.backToTop();
                this.fetchData();
            },
            // handleSizeChange :function (val) { //换页
            //     this.pagesize = val;
            //     this.fetchData();
            // },
        //     ...mapActions([
        //     'setmyNoDemandS'
        // ]),
            // switchDetail(row) {//点击名字
            //     // let uid = {
            //     //     u_id: row.id,
            //     //     u_status: '无需求',
            //     //     u_resource: 2
            //     // }
            //     let d = {
            //         tmk_id: this.valueT, //TMK
            //         page: this.currentPage,
            //         sortName:this.sortName,
            //         sortOrder:this.sortOrder,
            //         pagesize:this.pagesize,
            //         optionsTMK: this.optionsTMK
            //     }
            //     this.setmyNoDemandS(d)
            //     // this.sendResourceId(uid)
            //     this.$router.push('/userDetail' + '/' + row.id + '/noDemand/' + 2);
            // },
            updateList() {
                this.currentPage = 1;
                this.fetchData();

            },
            fetchData() {
                // if(Object.keys(this.getmyNoDemandS).length!=0){
                //     this.valueT =  this.getmyNoDemandS.tmk_id;
                //     this.currentPage = this.getmyNoDemandS.page;
                //     this.sortName =  this.getmyNoDemandS.sortName;
                //     this.sortOrder =  this.getmyNoDemandS.sortOrder;
                //     this.pagesize = this.getmyNoDemandS.pagesize;
                //     this.optionsTMK= this.getmyNoDemandS.optionsTMK;
                // }
                let para = {
                    type: this.valueT, //TMK
                    page: this.currentPage,
                    sortName:this.sortName,
                    sortOrder:this.sortOrder,
                    // pagesize:this.pagesize,
                }

                marketClaim(para, token).then((res) => { //
                    this.number = res.data.total;
                    let a = res.data.data;
                    let c = res.data.last_page * this.pagesize;
                    this.noEffData = a;
                    this.total = parseInt(c);
                })
                // .then(()=>{
                //     this.setmyNoDemandS({})
                // })
            },
            distributeResource() { //确定分配
                let a = this.multipleSelection.map(item => {
                    return item.id
                })
                let para = {
                    uid: a.join(',')
                }
                this.writeL = true;
                marketClaimPost(para, token).then(res => {
                    if (res.code == 0) {

                        this.fetchData();
                        this.$message.success(res.data);
                        this.writeL = false;
                        this.dialogFormVisible = false
                    } else {
                        this.$message.error(res.message);
                        this.writeL = false;
                    }
                }).catch(()=>{
                    this.$message.error(res.message);
                        this.writeL = false;
                })
            }
        },

        beforeCreate() {
            user = sessionStorage.getItem('user');
            token = JSON.parse(user).token;
        },
        created() {
            this.code = JSON.parse(user).job ? JSON.parse(user).job.code : '';
                // if(Object.keys(this.getmyNoDemandS).length==0){
                //     if(this.code == 'tmk_m'){
                //         getTMK(token).then((res) => {
                //     this.optionsTMK = res.data
                //     this.optionsTMK.unshift({key:'no',label:'无TMK'})                    
                //     this.optionsTMK.unshift({key:0,label:'全部TMK'})
                //     this.valueT=JSON.parse(user).aid+''
                // })
                //     }else if(this.code.includes('_c')){
                //         getTMK(token).then((res) => {
                //     this.optionsTMK = res.data
                //     this.optionsTMK.unshift({key:'no',label:'无TMK'})                    
                //     this.optionsTMK.unshift({key:0,label:'全部TMK'})
                //     this.valueT= 0
                // })
                //     }else{
                // this.fetchData(); //获取表格数据
                        
                //     }
                // }else{

                this.fetchData(); //获取表格数据
                // }
        },
        computed: {
        // ...mapGetters([
        //     'getmyNoDemandS'
        //     // ...
        // ])
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

    .tmkRPH5 .el-dialog__header {
        background-color: #1fb5ad;
        padding: 20px 20px 20px;
    }

    .tmkRPH5 .el-dialog__title {
        color: white;
    }

    /* .tmkRPH6:hover {
        cursor: pointer;
    }

    .tmkRPH6 {
        font-weight: 600;
        color:#1fb5ad
    } */

    .block {
        text-align: center;
        margin-top: 10px;
    }

    .tmkRPH1 {
        float: left;
        margin-right: 5px;
        padding-left: 10px;
        margin-top:5px;
    }

    .tmkRPH2 {
        float: left;
        width: 120px;
        margin-right: 10px;
    }

    .tmkRPH {
        width: 100%;
        position: relative;
        height: 46px;
        background-color: white;
        margin-top: 0;
        padding-top: 10px;
        margin-bottom: 5px;
        border-radius: 5px;
    }

    .tmkRPH3 {
        float: right;
        margin-right: 10px
    }

    .tmkRPH4 {
        text-align: center;
        margin-top: -24px
    }

</style>
