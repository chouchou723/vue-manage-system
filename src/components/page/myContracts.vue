<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-my-gerenxinxi"></i> 学员合同</el-breadcrumb-item>
                <el-breadcrumb-item class='ss'>我的合同</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class='accouMyresourece'>
            <h2 class="mydataReturn">
               合同({{number}}份)
      </h2>
            <div style="display:flex;flex-wrap:wrap;">
                <div class='studentReturnThreeNew' v-if="code =='cc_m'">
                    <el-select v-model="valueCC" clearable placeholder="选择CC" @change="updateList">
                        <el-option v-for="item in optionsCC" :key="item.aid" :label="item.uname" :value="item.aid">
                        </el-option>
                    </el-select>
                </div>
                <div class='studentReturnThreeNew'>
                    <el-select v-model="value1" clearable placeholder="审核状态" @change="updateList">
                        <el-option label="待审核" value="0"></el-option>
                        <el-option label="审核通过" value="1"></el-option>
                        <el-option label="审核失败" value="2"></el-option>
                    </el-select>
                </div>
                <div class='studentReturnThreeNew'>
                    <el-select v-model="value2" clearable placeholder="合同类型" @change="updateList">
                        <el-option label="新合同" value="1"></el-option>
                        <el-option label="续费" value="2"></el-option>
                        <el-option label="再购买" value="3"></el-option>
                        <el-option label="转课" value="4"></el-option>
                    </el-select>
                </div>
                <div class='mycontractSelect'>
                    <el-date-picker v-model="value3" type="daterange" placeholder="签约时间" @change="updateList">
                    </el-date-picker>
                    
                </div>
                <div class='studentReturnThreeNew'>
                    <el-select v-model="value4" clearable placeholder="熊猫到家" @change="updateList">
                        <el-option label="有" value="1"></el-option>
                            <el-option label="无" value="0"></el-option>
                    </el-select>
                </div>
               <!--  <div class='studentReturnThreeNew'>
                    <el-select v-model="value5" clearable placeholder="排班状态" @change="updateList">
                        <el-option label="已排班" value="1"></el-option>
                        <el-option label="未排班" value="0"></el-option>
                    </el-select>
                </div> -->
                <div style="width:200px;display:inline-block;margin-left: 10px;margin-bottom: 10px;margin-right:10px">
                    <el-input placeholder="输入合同编号或姓名" clearable icon="search" v-model="input2" @keyup.enter.native="updateList" :on-icon-click="updateList" style='margin-right:10px'> </el-input>
                </div>
            </div>
        </div>
        <div id="myContracttable" v-loading="loading2">
            <div v-for="item in students" style="background:white;margin-bottom:20px">
                <div style='display:flex;justify-content:space-between;height:50px;line-height:50px;border:1px solid rgb(223, 236, 235);border-bottom:none'>
                    <div style="display:flex;align-items:center;margin-left:10px">
                       
                        <div style=";font-size:20px;margin-left:10px">
                        <span style='font-weight:bold;' @click='gotoDetail(item)' class='myContractsSpan'>
                          合同编号:  {{item.sku}}  
                        </span>
                        <span :style="item.order_status=='待审核'?'color:blue':item.order_status=='审核通过'?'color:#18c318':item.order_status=='被退回'?'color:#e4a821':'color:red'">
                           ({{item.order_status}}) 
                        </span>
                        </div>
                    </div>
                    <div style="margin-right:10px;color:grey;font-size:16px">
                    <span style="margin-right:5px">合同类型: {{item.new_order}}</span>
                    <span style="padding-left:10px;padding-right:10px;border-left:1px solid rgb(223, 236, 235);border-right:1px solid rgb(223, 236, 235)">试听老师: {{item.baomingTeachName}}</span>
                    <span style="margin-left:5px">签约时间: {{item.created}}</span></div>
                </div>
                <div style='display:flex;justify-content:space-between;flex-wrap: wrap;' id='myContracts'>
                    <el-table :data="item.tabledata" border style="width: 100%;">
                        <el-table-column prop="title" label="课程">
                        <template scope="scope">
                        <div style='display:flex;flex-direction:column;jestify-content:center;align-items:center;'>
                            
                                <div v-for='(item,index) in scope.row.title' :style="scope.row.title.length==1?'':index != (scope.row.title.length-1)?'border-bottom :1px solid rgb(223, 236, 235);flex:0 0 42px;line-height:42px;width:100%;overflow:hidden;text-overflow:ellipsis;white-space:nowrap': 'flex:0 0 42px;line-height:42px;width:100%;overflow:hidden;text-overflow:ellipsis;white-space:nowrap'" >{{item}}</div>
                        </div>
                            </template>
                        </el-table-column>
                        <el-table-column prop="course_curr_num" label="课时" width='40'>
                        <template scope="scope">
                                <div v-for='(item,index) in scope.row.course_curr_num' :style="scope.row.title.length==1?'':index != (scope.row.title.length-1)?'border-bottom :1px solid rgb(223, 236, 235);line-height: 42px;': 'line-height: 42px;'" >{{item}}</div>
                            </template>
                        </el-table-column>
                        <el-table-column prop="people_number" label="签单数" width='45'>
                        <template scope="scope">
                                <div v-for='(item,index) in scope.row.people_number' :style="scope.row.title.length==1?'':index != (scope.row.title.length-1)?'border-bottom :1px solid rgb(223, 236, 235);line-height: 42px;': 'line-height: 42px;'" >{{item}}</div>
                            </template>
                        </el-table-column>
                        <el-table-column prop="tuition_money" label="学费" width='65'>
                        <template scope="scope">
                                <div v-for='(item,index) in scope.row.tuition_money' :style="scope.row.title.length==1?'':index != (scope.row.title.length-1)?'border-bottom :1px solid rgb(223, 236, 235);line-height: 42px;': 'line-height: 42px;'" >{{item}}</div>
                            </template>
                        </el-table-column>
                        <el-table-column prop="unit_price" label="教材费" width='60'>
                        <template scope="scope">
                                <div v-for='(item,index) in scope.row.unit_price' :style="scope.row.title.length==1?'':index != (scope.row.title.length-1)?'border-bottom :1px solid rgb(223, 236, 235);line-height: 42px;': 'line-height: 42px;'" >{{item}}</div>
                            </template>
                        </el-table-column>
                        <el-table-column prop="book_money" label="书本费" width='60'>
                        <template scope="scope">
                                <div v-for='(item,index) in scope.row.book_money' :style="scope.row.title.length==1?'':index != (scope.row.title.length-1)?'border-bottom :1px solid rgb(223, 236, 235);line-height: 42px;': 'line-height: 42px;'" >{{item}}</div>
                            </template>
                        </el-table-column>
                        <el-table-column prop="coupons" label="优惠类型" width='135'>
                        <template scope="scope">
                                <div v-for='(item,index) in scope.row.coupons'   style='color:#18c318'>{{item}}</div>
                            </template>
                        </el-table-column>
                        <el-table-column prop="coupons_money" label="优惠金额" width='65'>
                        <template scope="scope">
                                <div v-for='(item,index) in scope.row.coupons_money' :style="scope.row.title.length==1?'':index != (scope.row.title.length-1)?'border-bottom :1px solid rgb(223, 236, 235);line-height: 42px;': 'line-height: 42px;'">{{item}}</div>
                            </template>
                        </el-table-column>
                        <el-table-column prop="sumMoney" label="转课补费额" width='80'>
                        <template scope="scope">
                                <div  >{{scope.row.sumMoney}}</div>
                                <!-- <div style="color:#18c318">详情</div> -->
                            </template>
                        </el-table-column>
                        <el-table-column prop="money" label="付款方式及金额" >
                        <template scope="scope">
                                <div v-for='(item,index) in scope.row.money' >{{item}}</div>
                            </template>
                        </el-table-column>
                        <el-table-column prop="sumMoney" label="付款总额" width='65'>
                        <template scope="scope">
                                <div >{{scope.row.sumMoney}}</div>
                            </template>
                        </el-table-column>
                        <el-table-column prop="panda_gohome" label="熊猫到家" width='65'>
                        <template scope="scope">
                                <div>{{scope.row.panda_gohome}}</div>
                            </template>
                        </el-table-column>
                        <el-table-column prop="expired" label="有效期" width='180'>
                        <template scope="scope">
                                <div v-for='(item,index) in scope.row.expired' :style="scope.row.title.length==1?'':index != (scope.row.title.length-1)?'border-bottom :1px solid rgb(223, 236, 235);line-height: 42px;': 'line-height: 42px;'" >{{item.length!=0?item:'/'}}</div>
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
    getMyContract
} from '../../api/api';
export default {
    data() {
            return {
                remainTime:'',
                isActive: false,
                students: [],
                loading2: true,
                currentPage: 1, //页数
                pagesize: 15, //默认每页
                total: 0,
                number: 0,
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
            gotoDetail(row){
                // console.log(row)
                 this.$router.push('/contractDetail/'+row.order_id+'/'+row.uid);
            },
            updateList() {
                this.currentPage = 1;
                this.fetchData();

            },
            fetchData() {
                let para = {
                    page: this.currentPage,
                    cc_uid: this.valueCC,
                    status: this.value1,
                    order_type: this.value2,//合同类型
                    start_created: this.value3[0] != null ? new Date(this.value3[0]).toLocaleDateString() : '',
                     end_created: this.value3[0] != null ? new Date(this.value3[1]).toLocaleDateString() : '',
                    panda_gohome:this.value4,
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
                    this.loading2 = false
                }).catch(() => {
                    this.$message.error('该用户未授权');
                    this.loading2 = false
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
            this.code = JSON.parse(user).job ? JSON.parse(user).job.code : '';
            this.fetchData();
            if (this.code == 'cc_m') {
                getAllCCList(token).then((res) => {
                    this.optionsCC = res.data;
                    this.optionsCC.unshift({
                        aid: '0',
                        uname: '全部CC'
                    })
                })
            }
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
#myContracttable {
    position: relative;
}

#myContracttable .el-table td,
#myContracttable .el-table th {
    padding: 5px 0;
    text-align: center
}

#myContracttable .el-table th>div,
#myContracttable .el-table .cell {
    padding-left: 0;
    padding-right: 0;
}

#myContracts .el-table::before{
    height: 0;
}

.block {
    text-align: center;
    margin-top: 10px;
}

.accouMyresourece {
    width: 100%;
    position: relative;
    height: auto;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    background-color: white;
    margin-top: 30px;
    padding-top: 10px;
    margin-bottom: 5px;
    border-radius: 5px;
}

.mydataReturn {
    /*display: block;*/
    /*margin-top: 20px;*/
    margin-bottom: 15px;
    padding-left: 10px;
    width: 350px;
    /*
    margin-right:70%;*/
}

.studentReturnThreeNew {
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

.mycontractSelect .el-date-editor.el-input {
    width: 201px;
}

.myContractsSpan:hover{
    cursor: pointer;
}
</style>
