<template>
        <div class="addCCC">
            <!-- <div class="crumbs">
                <el-breadcrumb separator="/">
                    <el-breadcrumb-item><i class="el-icon-my-gerenxinxi"></i> 学员合同</el-breadcrumb-item>
                    <el-breadcrumb-item class='ss'>我的合同</el-breadcrumb-item>
                </el-breadcrumb>
            </div> -->
            <div class='myACH'>
                <h3 class="myACH1">
                    批量修改合同
                    <span v-if="number==='0'" style="font-size:14px;color: #bdb8b8;">加载中...</span>
                   <span v-else>({{number}}个)</span>
                </h3>
                <div class="MCtitle">
                    <!-- <div class='studentReturnThreeNewCon' v-if="code.includes('_c')">
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
                    </div> -->
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
            <!-- <el-dialog title="修改合同" :visible.sync="dialogFormVisible" :close-on-click-modal="no" custom-class='schoolMap' top='9%'  @close='resetD'>
                    <el-form :model="aform" :rules="rules2" ref="aform">
                        <el-form-item label="剩余课时" :label-width="formLabelWidth" prop="course_curr_num">
                                <el-input v-model="aform.course_curr_num" placeholder='请输入正确的剩余课时' style='width:220px;float:left;margin-right:10px;'></el-input>
                            </el-form-item>
                                    <el-form-item label="有效期" :label-width="formLabelWidth" prop="expired">
                                            <el-date-picker v-model="aform.expired" type="daterange" placeholder="签约时间" @change="updateList" :picker-options="pickerOptions0">
                                                </el-date-picker>
                                        </el-form-item>
                    </el-form>
                    <div slot="footer" class="dialog-footer">
                        <el-button type="primary" @click="addAccount('aform')">确 定</el-button>
                        <el-button @click="dialogFormVisible = false">取 消</el-button>
                    </div>
                </el-dialog> -->
            <div id="myContracttable" v-loading="loading2">
                <div v-for="item1 in students" class="MC1">
                    <div class="MC2">
                        <div class="MC3">
                            <div class="MC4">
                                <span >
                              合同编号:  {{item1.sku}}  
                            </span>
                            <span style="padding-left:5px;border-left: 1px solid gainsboro;">学员:{{item1.users}}</span>
                            </div>
                        </div>
                    </div>
                    <div id='myContracts'>
                        <el-table :data="item1.tabledata" border style="width: 100%;">
                            <el-table-column prop="title" label="课程">
                            </el-table-column>
                            <el-table-column prop="course_num" label="课时" >
                               
                            </el-table-column>
                            <el-table-column prop="course_curr_num" label="剩余课时" >
                                    <template scope="scope">
                                         <div  v-if="!scope.row.canEdit" >{{scope.row.course_curr_num}}</div>
                                         <el-input v-if="scope.row.canEdit"  v-model='scope.row.course_curr_num' class='ACinput'></el-input> 
                                    </template>
                                </el-table-column>
                            <el-table-column prop="expired" label="有效期">
                                <template scope="scope">
                                    <div  v-if="!scope.row.canEdit" >{{scope.row.expired[0]}}-{{scope.row.expired[1]}}</div>
                                    <el-date-picker v-if="scope.row.canEdit" :clearable="no" v-model="scope.row.expired"  type="daterange" >
                                    </el-date-picker>
                                    <!-- <el-input v-if="scope.row.canEdit" style="width:80%" v-model='scope.row.course_curr_num'></el-input>  -->
                               </template>
                            </el-table-column>
                            <el-table-column label="操作" width='80'>
                                    <template scope="scope">
                                            <el-button  v-if="!scope.row.canEdit" type="text" size="small" @click="editCh(scope.row,index)">编辑</el-button>   
                                            <el-button   v-if="scope.row.canEdit" type="text" size="small" @click="subEdit(scope.row,index)">提交</el-button>  
                                            <el-button   v-if="scope.row.canEdit" type="text" size="small" style='color:red' @click="editCh(scope.row,index)">取消</el-button> 
                                            
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
                        <el-table-column prop="course_curr_num" label="剩余课时">
                        </el-table-column>
                        <el-table-column prop="year_num" label="有效期">
                        </el-table-column>
                        <el-table-column prop="course_curr_num" label="操作">
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
                    aform:{
                        course_curr_num:'',
                        expired:[],
                    },
                    dialogFormVisible:false,
                    no:false,
                    formLabelWidth:'80px',
                    optionR: [],
                    remainTime: '',
                    isActive: false,
                    students: [],
                    loading2: false,
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
                    canEdit:false,
                    backI:{},
                }
            },
            methods: {
                getNowFormatDate(date) { //时间格式转换
                var day = new Date(date);
                var Year = 0;
                var Month = 0;
                var Day = 0;
                var CurrentDate = "";
                //初始化时间 
                Year = day.getFullYear();
                Month = day.getMonth() + 1;
                Day = day.getDate();
                CurrentDate += Year+'.';
                if (Month >= 10) {
                    CurrentDate += Month+'.';
                } else {
                    CurrentDate += "0" + Month+'.';
                }
                if (Day >= 10) {
                    CurrentDate += Day;
                } else {
                    CurrentDate += "0" + Day;
                }
                return CurrentDate;
            },
                subEdit(data){
                    let a = /^\d*$/
                            if(!a.test(data.course_curr_num)){
                                this.$message.error('剩余课时仅限输入数字')
                            }else if(data.course_num-data.course_curr_num<0){
                                this.$message.error('剩余课时不能大于课程课时')
                            }else if(data.expired[0]-0==0||data.expired.length==0){
                                // console.log(data.expired);                                
                                this.$message.error('请选择有效期时间')

                            }else{
                                data.expired_start = new Date(data.expired[0]).toLocaleDateString();
                                data.expired_end =  new Date(data.expired[1]).toLocaleDateString();
                                // console.log(data.expired);
                                data.expired = [this.getNowFormatDate(data.expired_start),this.getNowFormatDate(data.expired_end)]
                                data.canEdit = false;
                                this.$message.success('修改成功')
                            }
                },
                // resetD(){
                //     this.aform = {
                //         course_curr_num:'',
                //         expired:[],
                //     }
                // },
                editCh(item,index){
                    if(item.canEdit){
                        item.canEdit = false;
                        item.course_curr_num = item.backI                        
                        item.expired = [...item.back]
                    }else{
                        item.backI = item.course_curr_num
                        item.back = [...item.expired]
                        item.canEdit = true;
                    }
                },
                // ...mapActions([
                //     'setmyContractS'
                // ]),
                // gotoSDetail(row) {
                //     this.$router.push('/studentDetail/' + row.uid);
                // },
                // gotoDetail(row) {
                //     // console.log(row)
                //     let d = {
                //         school_id: this.valueR,
                //         page: this.currentPage,
                //         cc_uid: this.valueCC,
                //         status: this.value1,
                //         order_type: this.value2, //合同类型
                //         start_created: this.value3,
                //         panda_gohome: this.value4,
                //         optionR:this.optionR,
                //         optionsCC:this.optionsCC
                //     }
                //     this.setmyContractS(d)
                //     this.$router.push('/contractDetail/' + row.order_id + '/' + row.uid);
                // },
                updateList() {
                    this.currentPage = 1;
                    this.fetchData();
    
                },
                // updateListCC() {
                //     this.currentPage = 1;
                //     // this.valueCC = '';
                //     if (this.valueR != '') {
                //         let para = {
                //         school_id: this.valueR
                //     }
                //     getAllCCList(token, para).then((res) => {
                //         this.optionsCC = res.data;
                //         this.optionsCC.unshift({
                //             aid: 0,
                //             uname: '全部CC'
                //         })
                //     }).then(()=>{
                //         if( this.valueCC===0){
                //         this.updateList()
                //         }else{
                //             this.valueCC=0
                //         }
                //         })
                //     }else{
                //         if(this.valueCC=== 0){//cc选择
                //         this.updateList()
                //         }
                //         this.optionsCC=[{
                //             aid: 0,
                //             uname: '全部CC'
                //         }]
                //         this.valueCC= 0;
                //     }
                // },
                fetchData() {
                    let para = {
                        page: this.currentPage,
                        // school_id: this.valueR,
                        // cc_uid: this.valueCC,
                        // status: this.value1,
                        // order_type: this.value2, //合同类型
                        // start_created: this.value3[0] != null ? new Date(this.value3[0]).toLocaleDateString() : '',
                        // end_created: this.value3[0] != null ? new Date(this.value3[1]).toLocaleDateString() : '',
                        // panda_gohome: this.value4,
                        // scheduling_status:this.value5,
                        input: this.input2
                    }
                    this.students  = [{sku:'12321',users:'张文顺',tabledata:[{order_item_id:12,title:'art1',course_num:48,course_curr_num:16,expired:['2017.01.01','2018.01.01'],canEdit:false},
                    {order_item_id:123,title:'art2',course_num:48,course_curr_num:16,expired:[],canEdit:false}]}]
                    // getMyContract(token, para).then((res) => { //替换服务
                    //     this.number = res.data.total;
                    //     let a = res.data.data;
                    //     let c = res.data.last_page * this.pagesize;
    
                    //     // console.log(a)
                    //     this.students = a;
                    //     this.total = parseInt(c);
                    // }).then(() => {
                    //     this.loading2 = false;
                    // }).catch(() => {
                    //     // this.$message.error('该用户未授权');
                    //     this.loading2 = false
                    // })
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
                this.fetchData();
            },
        //     computed: {
        //     ...mapGetters([
        //         'getmyContractS'
        //         // ...
        //     ])
        // },
            // mounted() {
    
            // },
            // watch: {
            //     // 如果路由有变化，会再次执行该方法
            //     // '$route' : 'fetchData'
            // }
        }
    
    </script>
    <style>
        /* .w200 {
            max-width: 200px;
        } */
    
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
    
        .myACH {
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
    
        .myACH1 {
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
    
        /* .myContractsSpan {
            color:#1fb5ad
        }
    
        .myContractsSpan:hover {
            cursor: pointer;
        } */
    
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
    
        /* .MC5 {
            margin-right: 10px;
            color: grey;
            font-size: 16px
        } */
    
        /* .MC6 {
            margin-right: 5px
        } */
    
        /* .MC7 {
            padding-left: 10px;
            padding-right: 10px;
            border-left: 1px solid rgb(223, 236, 235);
            border-right: 1px solid rgb(223, 236, 235)
        } */
    
        /* .MC8 {
            margin-left: 5px
        } */
    
        /* .MC9 {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
        } */
    
        /* .MC10 {
            border-bottom: 1px solid rgb(223, 236, 235);
            flex: 0 0 42px;
            line-height: 42px;
            width: 100%;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap
        } */
    
        /* .MC11 {
            flex: 0 0 42px;
            line-height: 42px;
            width: 100%;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap
        } */
    
        /* .MC12 {
            border-bottom: 1px solid rgb(223, 236, 235);
            line-height: 42px;
        } */
    
        /* .MC13 {
            line-height: 42px;
        } */
    
        /* .MCgreen {
            color: #18c318
        } */
        /* .MCname{
            border-right: 1px solid gainsboro;
            padding-right: 2px;
        }
        .addCCC .el-dialog .el-dialog__header {
    background-color: #1fb5ad;
    padding: 20px 20px 20px;
}

.addCCC .el-dialog .el-dialog__title {
    color: white;
} */
.ACinput{
    width: 60px;
}
.ACinput input{
    text-align:center
}
    </style>
    