<template>
    <div class="PACH12">
        <!-- <el-breadcrumb separator="/">
            <el-breadcrumb-item><i class="el-icon-my-weituoguanxiguanli"></i> 业务交接</el-breadcrumb-item>
        </el-breadcrumb> -->
        <div class='PAC'>
            <h3 class="PACH">

                业务交接
                <span v-if="number==='0'" style="font-size:14px;color: #bdb8b8;">加载中...</span>
               <span v-else>({{number}}人)</span>
            </h3>
            <div class='PACH1'  v-if="code.includes('_c')">
                <el-select v-model="valueS"  placeholder="选择校区" @change="updateListCC">
                    <el-option v-for="item in optionR" :key="item.id" :label="item.title" :value="item.id">
                    </el-option>
                </el-select>
            </div>
            <div class='PACH1'>
                <el-select v-model="valueT"  placeholder="选择CC" @change="updateList">
                    <el-option v-for="item in optionsCC" :key="item.aid" :label="item.uname" :value="item.aid">
                    </el-option>
                </el-select>
            </div>
            <div class='PACH1'>
                <el-select v-model="valueR"  placeholder="调配类型" @change="updateList">
                    <el-option label="客户" value="client"></el-option>
                    <el-option label="学员" value="student"></el-option>
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
            <div style='margin-bottom:20px;font-weight:bold'>请选择要接管的课程顾问:</div>
            <el-form :model="resourceAssign" id='actSchool1'>
                <el-form-item prop='school'>
                    <el-select v-model="resourceAssign.school"  placeholder="选择校区" filterable @change='getCC' :disabled="code.includes('_c')">
                        <el-option v-for="item in receiveSchool" :key="item.value" :label="item.label" :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item prop='receiveCC'>
                    <el-select v-model="resourceAssign.receiveCC" placeholder="课程顾问选择" style="width:185px">
                        <el-option v-for="item in listCC" :key="item.aid" :label="item.uname" :value="item.aid">
                        </el-option>
                    </el-select>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer" style='text-align:center;margin-top:-24px'>
                <el-button type="primary" :loading='writeL' @click="distributeResource">确 定</el-button>
                <el-button @click="dialogFormVisible = false">取 消</el-button>
            </div>
        </el-dialog>
        <div id="table2PAC">
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
            <el-pagination layout="sizes,prev, pager, next" :total="total" :page-sizes="[150,300,500]" :current-page="currentPage" :page-size="pagesize" @current-change="handleCurrentChange"
            @size-change="handleSizeChange">
            </el-pagination>
        </div>
    </div>
</template>
<script>
    var user, token
    import {
        getTransposing,
        dispatchResource,
        dispatchPerson,
        campusList,
        getAllCCList
    } from '../../api/api';
    export default {
        data() {
            return {
                valueS:'',
                optionR:[],
                writeL:false,
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
                number: '0',
                noEffData: [],
                optionsCC: [],
                receiveSchool: [],
                valueT: '',
                valueR: 'client',
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
            updateListCC() {
                this.currentPage = 1;
                // this.valueCC = '';
                if (this.valueS != '') {
                    let para = {
                    school_id: this.valueS
                }
                getAllCCList(token, para).then((res) => {
                    this.optionsCC = res.data;
                    this.optionsCC.unshift({
                        aid: 0,
                        uname: '全部CC'
                    })
                }).then(()=>{
                    if( this.valueT===0){
                    this.updateList()
                    }else{
                        this.valueT=0
                    }
                    })
                }else{
                    if(this.valueT=== 0){//cc选择
                    this.updateList()
                    }
                    this.optionsCC=[{
                        aid: 0,
                        uname: '全部CC'
                    }]
                    this.valueT= 0;
                }
            },
            getCC(){
                this.resourceAssign.receiveCC = '';
                if( this.resourceAssign.school !=''){

                    let para = {
                        school_id:this.resourceAssign.school
                    }
                    getAllCCList(token,para).then((res) => {
                    this.listCC = res.data
                })
                }
            
            },
            openResource() { //打开人员分配
                if(this.code.includes("_c")){

                    this.resourceAssign.school = this.valueS;
                    let para = {
                        school_id:this.resourceAssign.school
                    }
                    getAllCCList(token,para).then((res) => {
                    this.listCC = res.data
                })
                }else{
                    this.resourceAssign.school = "";                    
                }
                this.resourceAssign.receiveCC = '';
                this.listCC=[]
                this.dialogFormVisible = true
            },
            handleSelectionChange(val) { //选中数据
                this.multipleSelection = val
            },
            handleCurrentChange: function (val) { //换页
                this.currentPage = val;this.backToTop();
                this.fetchData();
            },
            handleSizeChange :function (val) { //换页
                this.pagesize = val;
                this.fetchData();
            },
            updateList() {
                this.currentPage = 1;
                this.fetchData();

            },
            fetchData() {
                let para = {
                    school_id:this.valueS,
                    teach_id: this.valueT, //TMK
                    page: this.currentPage,
                    input:this.input2,
                    type:this.valueR,
                    pagesize:this.pagesize,
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
                    type:this.valueR,
                    uids: a,
                    new_teach_id: this.resourceAssign.receiveCC
                }
                this.writeL = true;
                dispatchPerson(para, token).then(res => {
                    if (res.code == 0) {

                        this.fetchData();
                        this.$message.success('分配成功')
                        this.dialogFormVisible = false;
                        this.writeL = false;
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
            // this.valueT = JSON.parse(user).aid
            if (this.code.includes('_c')) {//经理以上
                    let cam = {
                        simple: 1
                    }
                    campusList(cam, token).then((res) => {//获取校区
                        this.optionR = res.data
                    this.optionR.unshift({
                            id:0,
                            title:'全部校区'
                        })
                    }).then(()=>{
                        this.valueS=0;

                    })
                    // this.fetchData();
                }else{

                    getAllCCList(token).then((res) => {
                        this.optionsCC = res.data
                    })
            this.fetchData();
                    
                }
            let uname = JSON.parse(user).uname
            // this.fetchData();
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
    #table2PAC .el-table td,
    #table2PAC .el-table th:not(.gutter) {
        padding: 1px;
        text-align: center
    }

    #table2PAC .el-table th>div,
    #table2PAC .el-table .cell {
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

    .PACH {
        float: left;
        margin-right: 5px;
        padding-left: 10px;
        margin-top:5px;
    }

    .PACH1 {
        float: left;
        width: 120px;
        margin-right: 10px;
    }

    .PAC {
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
