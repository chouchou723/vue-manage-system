<template>
    <div>
        <!-- <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-my-gerenxinxi"></i> 学员合同</el-breadcrumb-item>
                <el-breadcrumb-item class='ss'>我的合同</el-breadcrumb-item>
            </el-breadcrumb>
        </div> -->
        <div class='accouMyresoureCon'>
            <h3 class="mydataReturn">
                合同
                <span v-if="number==='0'" style="font-size:14px;color: #bdb8b8;">加载中...</span>
               <span v-else>({{number}}个)</span>
            </h3>
            <div class="MCtitle">
                <div class='studentReturnThreeNewCon' v-if="code.includes('_c')">
                    <el-select v-model="valueR"  placeholder="选择校区" @change="updateListCC">
                        <el-option v-for="item in optionR" :key="item.id" :label="item.title" :value="item.id">
                        </el-option>
                    </el-select>
                </div>

                <div class='studentReturnThreeNewCon' v-if="code =='cc_m'||code.includes('_c')">
                    <el-select v-model="valueCC"  placeholder="选择CC" @change="updateList">
                        <el-option v-for="item in optionsCC" :key="item.aid" :label="item.uname" :value="item.aid">
                        </el-option>
                    </el-select>
                </div>
                <div class='studentReturnThreeNewCon'>
                    <el-select v-model="value1" clearable placeholder="审核状态" @change="updateList">
                        <el-option label="已回滚" value="2"></el-option>
                        <el-option label="审核驳回" value="3"></el-option>
                        <el-option label="审核通过" value="1"></el-option>
                        <el-option label="待审核" value="0"></el-option>
                    </el-select>
                </div>
                <div class='studentReturnThreeNewCon'>
                    <el-select v-model="value2" clearable placeholder="合同类型" @change="updateList">
                        <el-option label="新合同" value="1"></el-option>
                        <el-option label="续费合同" value="2"></el-option>
                        <el-option label="再购买合同" value="3"></el-option>
                        <el-option label="转课合同" value="4"></el-option>
                        <el-option label="转校合同" value="5"></el-option>
                    </el-select>
                </div>
                <div class='mycontractSelect'>
                    <el-date-picker v-model="value3" type="daterange" placeholder="签约时间" @change="updateList" :picker-options="pickerOptions0">
                    </el-date-picker>

                </div>
                <div class='studentReturnThreeNewCon'>
                    <el-select v-model="value4" clearable placeholder="熊猫到家" @change="updateList">
                        <el-option label="有" value="1"></el-option>
                        <el-option label="无" value="0"></el-option>
                    </el-select>
                </div>
                <!--  <div class='studentReturnThreeNewCon'>
                    <el-select v-model="value5" clearable placeholder="排班状态" @change="updateList">
                        <el-option label="已排班" value="1"></el-option>
                        <el-option label="未排班" value="0"></el-option>
                    </el-select>
                </div> -->
                <div class="MCinput">
                    <el-input placeholder="输入合同编号或姓名" clearable icon="search" v-model="input2" @keyup.enter.native="updateList" :on-icon-click="updateList">
                    </el-input>
                </div>
            </div>
        </div>
        <div id="myContracttable" v-loading="loading2">
            <div v-for="item in students" class="MC1">
                <div class="MC2">
                    <div class="MC3">

                        <div class="MC4">
                            <span @click='gotoDetail(item)' class='myContractsSpan'>
                          合同编号:  {{item.sku}}  
                        </span>
                            <span  class="MCname" :style="item.order_status=='待审核'?'color:blue;':item.order_status=='审核通过'?'color:#18c318':item.order_status=='被退回'?'color:#e4a821':'color:red'">
                           ({{item.order_status}}) 
                        </span>
                        <span style="padding-left:5px;"  class='myContractsSpan' @click='gotoSDetail(item)'>学员:{{item.users?item.users.child_name:''}}</span>
                        </div>
                    </div>
                    <div class="MC5">
                        <span class="MC6">合同类型: {{item.new_order}}</span>
                        <span class="MC7">试听老师: {{item.baomingTeachName?item.baomingTeachName:'无'}}</span>
                        <span class="MC8">签约时间: {{item.created}}</span></div>
                </div>
                <div id='myContracts'>
                    <el-table :data="item.tabledata" border style="width: 100%;">
                            <!-- <el-table-column prop="name" label="学员" width='70'>
                                    <template scope="scope">
                                        <div @click='gotoSDetail(item)' class='myContractsSpan'>詹皓</div>
                                    </template>
                                </el-table-column> -->
                        <el-table-column prop="title" label="课程">
                            <template scope="scope">
                                <div class="MC9">
                                    <div v-for='(item,index) in scope.row.title' :class="index != (scope.row.title.length-1)?'MC10':'MC11'">{{item}}</div>
                                </div>
                            </template>
                        </el-table-column>
                        <el-table-column prop="course_num" label="课时" width='40'>
                            <template scope="scope">
                                <div v-for='(item,index) in scope.row.course_num' :class="index != (scope.row.title.length-1)?'MC12':'MC13'">{{item}}</div>
                            </template>
                        </el-table-column>
                        <el-table-column prop="people_number" label="签单数" width='45'>
                            <template scope="scope">
                                <div v-for='(item,index) in scope.row.people_number' :class="index != (scope.row.title.length-1)?'MC12':'MC13'">{{item}}</div>
                            </template>
                        </el-table-column>
                        <el-table-column prop="tuition_money" label="学费" width='65'>
                            <template scope="scope">
                                <div v-for='(item,index) in scope.row.tuition_money' :class="index != (scope.row.title.length-1)?'MC12':'MC13'">{{item}}</div>
                            </template>
                        </el-table-column>
                        <el-table-column prop="unit_price" label="教材费" width='60'>
                            <template scope="scope">
                                <div v-for='(item,index) in scope.row.unit_price' :class="index != (scope.row.title.length-1)?'MC12':'MC13'">{{item}}</div>
                            </template>
                        </el-table-column>
                        <el-table-column prop="book_money" label="书本费" width='60'>
                            <template scope="scope">
                                <div v-for='(item,index) in scope.row.book_money' :class="index != (scope.row.title.length-1)?'MC12':'MC13'">{{item}}</div>
                            </template>
                        </el-table-column>
                        <el-table-column prop="coupons" label="优惠类型" width='135'>
                            <template scope="scope">
                                <el-tooltip class="item" effect="dark" placement="top" v-for='(item,index) in scope.row.coupons' v-if="scope.row.coupons !=''"
                                    popper-class='w200'>
                                    <div slot="content">{{item.info}}</div>
                                    <div class="MCgreen">{{item.title}}</div>
                                </el-tooltip>
                                <div v-if="scope.row.coupons ==''">无</div>
                            </template>
                        </el-table-column>
                        <el-table-column prop="coupons_money" label="优惠金额" width='65'>
                            <template scope="scope">
                                <div v-for='(item,index) in scope.row.coupons_money' :class="index != (scope.row.title.length-1)?'MC12':'MC13'">{{item}}</div>
                            </template>
                        </el-table-column>
                        <el-table-column prop="bufei_money" label="转课补费额" width='80'>
                            <template scope="scope">
                                <div>{{item.bufei_money-0!=0?item.bufei_money:'无'}}</div>
                            </template>
                        </el-table-column>
                        <el-table-column prop="money" label="付款方式及金额">
                            <template scope="scope">
                                <div v-for='(item,index) in scope.row.money'>{{item}}</div>
                            </template>
                        </el-table-column>
                        <el-table-column prop="sumMoney" label="付款总额" width='65'>
                            <template scope="scope">
                                <div>{{scope.row.sumMoney}}</div>
                            </template>
                        </el-table-column>
                        <el-table-column prop="panda_gohome" label="熊猫到家" width='65'>
                            <template scope="scope">
                                <div>{{item.panda_gohome==1?'有':'无'}}</div>
                            </template>
                        </el-table-column>
                        <el-table-column prop="expired" label="有效期" width='180'>
                            <template scope="scope">
                                <div v-for='(item,index) in scope.row.expired' :class="index != (scope.row.title.length-1)?'MC12':'MC13'">{{item.length!=0?item:'/'}}</div>
                            </template>
                        </el-table-column>
                    </el-table>
                </div>
            </div>
            <div v-if="students==''">
                <el-table :data="students" border style="width: 100%;">
                    <el-table-column prop="title" label="课程">
                    </el-table-column>
                    <el-table-column prop="year_num" label="课时">
                    </el-table-column>
                    <el-table-column prop="course_curr_num" label="签单数">
                    </el-table-column>
                    <el-table-column prop="year_num" label="学费">
                    </el-table-column>
                    <el-table-column prop="course_curr_num" label="教材费">
                    </el-table-column>
                    <el-table-column prop="year_num" label="书本费">
                    </el-table-column>
                    <el-table-column prop="course_curr_num" label="优惠类型">
                    </el-table-column>
                    <el-table-column prop="year_num" label="优惠金额">
                    </el-table-column>
                    <el-table-column prop="course_curr_num" label="转课补费额">
                    </el-table-column>
                    <el-table-column prop="year_num" label="付款方式及金额" width='100'>
                    </el-table-column>
                    <el-table-column prop="course_curr_num" label="付款总额">
                    </el-table-column>
                    <el-table-column prop="year_num" label="熊猫到家">
                    </el-table-column>
                    <el-table-column prop="course_curr_num" label="有效期">
                    </el-table-column>
                </el-table>
            </div>
        </div>
        <div class="block">
            <el-pagination layout="prev, pager, next" :total="total" :current-page="currentPage" :page-size="pagesize" @current-change="handleCurrentChange">
            </el-pagination>
        </div>
    </div>
</template>
<script>
    var token, user
    import {
        getAllCCList,
        getMyContract,
        campusList
    } from '../../api/api';
    import {
    mapActions,mapGetters
} from 'vuex';
    export default {
        data() {
            return {
                pickerOptions0: {
                        disabledDate(time) {
                            return time.getTime() > Date.now();
                        }
                    },
                valueR: '',
                optionR: [],
                remainTime: '',
                isActive: false,
                students: [],
                loading2: true,
                currentPage: 1, //页数
                pagesize: 15, //默认每页
                total: 0,
                number: '0',
                optionsCC: [], //表单上方的select
                valueCC: '', //对应select的值
                value1: '',
                value2: '', //对应select的值
                value3: '', //对应select的值
                value4: '', //点击tag
                // value5: '', //状态
                input2: '',
                code: '',
            }
        },
        methods: {
            ...mapActions([
                'setmyContractS'
            ]),
            gotoSDetail(row) {
                this.$router.push('/studentDetail/' + row.uid);
            },
            gotoDetail(row) {
                // console.log(row)
                let d = {
                    school_id: this.valueR,
                    page: this.currentPage,
                    cc_uid: this.valueCC,
                    status: this.value1,
                    order_type: this.value2, //合同类型
                    start_created: this.value3,
                    panda_gohome: this.value4,
                    optionR:this.optionR,
                    optionsCC:this.optionsCC
                }
                this.setmyContractS(d)
                this.$router.push('/contractDetail/' + row.order_id + '/' + row.uid);
            },
            updateList() {
                this.currentPage = 1;
                this.fetchData();

            },
            updateListCC() {
                this.currentPage = 1;
                // this.valueCC = '';
                if (this.valueR != '') {
                    let para = {
                    school_id: this.valueR
                }
                getAllCCList(token, para).then((res) => {
                    this.optionsCC = res.data;
                    this.optionsCC.unshift({
                        aid: 0,
                        uname: '全部CC'
                    })
                }).then(()=>{
                    if( this.valueCC===0){
                    this.updateList()
                    }else{
                        this.valueCC=0
                    }
                    })
                }else{
                    if(this.valueCC=== 0){//cc选择
                    this.updateList()
                    }
                    this.optionsCC=[{
                        aid: 0,
                        uname: '全部CC'
                    }]
                    this.valueCC= 0;
                }
            },
            fetchData() {
                if(Object.keys(this.getmyContractS).length!=0){
                    this.valueR =  this.getmyContractS.school_id;
                    this.currentPage =  this.getmyContractS.page;
                    this.valueCC =  this.getmyContractS.cc_uid;
                    this.value1 =  this.getmyContractS.status;
                    this.value2 =  this.getmyContractS.order_type;
                    this.value3 = this.getmyContractS.start_created;
                    this.value4 =  this.getmyContractS.panda_gohome;
                    this.optionR=this.getmyContractS.optionR;
                    this.optionsCC=this.getmyContractS.optionsCC;
                    // let para = {
                    //     school_id: this.valueR
                    // }
                    // getAllCCList(token, para).then((res) => {
                    //     this.optionsCC = res.data;
                    //     this.optionsCC.unshift({
                    //         aid: 0,
                    //         uname: '全部CC'
                    //     })
                    // })
                }
                let para = {
                    school_id: this.valueR,
                    page: this.currentPage,
                    cc_uid: this.valueCC,
                    status: this.value1,
                    order_type: this.value2, //合同类型
                    start_created: this.value3[0] != null ? new Date(this.value3[0]).toLocaleDateString() : '',
                    end_created: this.value3[0] != null ? new Date(this.value3[1]).toLocaleDateString() : '',
                    panda_gohome: this.value4,
                    // scheduling_status:this.value5,
                    input: this.input2
                }

                getMyContract(token, para).then((res) => { //替换服务
                    this.number = res.data.total;
                    let a = res.data.data;
                    let c = res.data.last_page * this.pagesize;

                    // console.log(a)
                    this.students = a;
                    this.total = parseInt(c);
                }).then(() => {
                    this.loading2 = false;
                    this.setmyContractS({})
                }).catch(() => {
                    // this.$message.error('该用户未授权');
                    this.loading2 = false
                })
            },
            handleCurrentChange: function (val) {
                this.currentPage = val;

                this.fetchData();
            }
        },
        beforeCreate() {
            user = sessionStorage.getItem('user');
            token = JSON.parse(user).token;
        },
        created() {
            this.code = JSON.parse(user).job ? JSON.parse(user).job.code : '';
            if (Object.keys(this.getmyContractS).length==0) {
                if(this.code.includes('cc_c')){//销售经理 和 教务经理 默认进来全部CC
                    let cam = {
                        simple: 1
                    }
                    campusList(cam, token).then((res) => { //获取校区
                        this.optionR = res.data
                    this.optionR.unshift({
                            id:0,
                            title:'全部校区'
                        })
                    }).then(()=>{
                        this.valueR=0;

                    })
                }else if(this.code=='cc_m'){
                    getAllCCList(token).then((res) => {
                        this.optionsCC = res.data;
                        this.optionsCC.unshift({
                            aid: 0,
                            uname: '全部CC'
                        })
                    }).then(()=>{
                        this.valueCC =JSON.parse(user).aid

                    })
                }else{
                this.fetchData();                    
                }
            }else{
                this.fetchData();
            }
            
            
        },
        computed: {
        ...mapGetters([
            'getmyContractS'
            // ...
        ])
    },
        // mounted() {

        // },
        // watch: {
        //     // 如果路由有变化，会再次执行该方法
        //     // '$route' : 'fetchData'
        // }
    }

</script>
<style>
    .w200 {
        max-width: 200px;
        /* text-indent: 20px; */
    }

    #myContracttable {
        position: relative;
    }

    /* #myContracttable .el-table td,
    #myContracttable .el-table th:not(.gutter) {
        padding: 5px 0;
        text-align: center
    }

    #myContracttable .el-table th>div,
    #myContracttable .el-table .cell {
        padding-left: 0;
        padding-right: 0;
        font-weight: normal;
    } */
    #myContracttable .el-table th>div,
    #myContracttable .el-table .cell {
        font-weight: normal;
    }
    #myContracts {
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
    }

    #myContracts .el-table::before {
        height: 0;
    }

    .block {
        text-align: center;
        margin-top: 10px;
    }

    .accouMyresoureCon {
        width: 100%;
        position: relative;
        height: auto;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        background-color: white;
        /* margin-top: 10px; */
        padding-top: 10px;
        margin-bottom: 5px;
        border-radius: 5px;
    }

    .mydataReturn {
        /*display: block;*/
        margin-top: 5px;
        margin-bottom: 15px;
        padding-left: 10px;
        width: 350px;
        /*
    margin-right:70%;*/
    }

    .studentReturnThreeNewCon {
        display: inline-block;
        width: 103px;
        /*margin-right: 10px;*/
        margin-bottom: 10px;
        margin-left: 10px
    }

    .mycontractSelect {
        display: inline-block;
        margin-left: 10px
    }

    /* .mycontractSelect .el-date-editor.el-input {
        width: 180px;
        font-size: 12px;
    } */

    .myContractsSpan {
        /* font-weight: bold; */
        color:#1fb5ad
    }

    .myContractsSpan:hover {
        cursor: pointer;
    }

    .MCtitle {
        display: flex;
        flex-wrap: wrap;
    }

    .MCinput {
        width: 200px;
        display: inline-block;
        margin-left: 10px;
        margin-bottom: 10px;
        margin-right: 10px
    }

    .MC1 {
        background: white;
        margin-bottom: 20px
    }

    .MC2 {
        display: flex;
        justify-content: space-between;
        height: 42px;
        line-height: 42px;
        border: 1px solid rgb(223, 236, 235);
        border-bottom: none;
        background: #fafafa;
    }

    .MC3 {
        display: flex;
        align-items: center;
        margin-left: 10px
    }

    .MC4 {
        font-size: 18px;
        margin-left: 10px;
        
    }

    .MC5 {
        margin-right: 10px;
        color: grey;
        font-size: 16px
    }

    .MC6 {
        margin-right: 5px
    }

    .MC7 {
        padding-left: 10px;
        padding-right: 10px;
        border-left: 1px solid rgb(223, 236, 235);
        border-right: 1px solid rgb(223, 236, 235)
    }

    .MC8 {
        margin-left: 5px
    }

    .MC9 {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }

    .MC10 {
        border-bottom: 1px solid rgb(223, 236, 235);
        flex: 0 0 42px;
        line-height: 42px;
        width: 100%;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap
    }

    .MC11 {
        flex: 0 0 42px;
        line-height: 42px;
        width: 100%;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap
    }

    .MC12 {
        border-bottom: 1px solid rgb(223, 236, 235);
        line-height: 42px;
    }

    .MC13 {
        line-height: 42px;
    }

    .MCgreen {
        color: #18c318
    }
    .MCname{
        border-right: 1px solid gainsboro;
        padding-right: 2px;
    }
</style>
