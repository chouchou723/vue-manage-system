<template>
    <div class='prinMailbox'>
        <!-- <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-my-richeng"></i> 课程管理</el-breadcrumb-item>
                <el-breadcrumb-item class='ss'>标签库</el-breadcrumb-item>
            </el-breadcrumb>
        </div> -->
        <div class='prinMailboxA'>
            <div class="prinMailboxH">
                <h3 class='prinMailboxH2'>
               校长信箱
                </h3>
                <!-- <div class='oneSelectTag'>
                    <el-select v-model="value" clearable placeholder="处理状态" filterable @change="updateList">
                        <el-option label="已处理" value="student"></el-option>
                        <el-option label="未处理" value="return"></el-option>
                    </el-select>
                </div> -->
                <div style="width:200px;position:absolute;right:10px;bottom:10px">
                    <el-input placeholder="输入学员的姓名" icon="search" v-model="input2" @keyup.enter.native="updateList" :on-icon-click="updateList"
                        style='margin-right:10px'> </el-input>
                </div>
                <!-- <el-button type="primary" size="mid" class='buttonAdd' @click="createCh('aform')">添加标签</el-button> -->
            </div>
            <el-dialog title="信件处理" :visible.sync="dialogFormVisible" :close-on-click-modal="no" custom-class='prinMailboXDD' top='29%' @close='resetD' size='tiny'>
                <el-form :model="aform" ref="aform" :rules="rules2">
                        <el-form-item label="" prop='contents'>
                                <el-input type="textarea" :autosize="{ minRows: 4, maxRows: 8}" placeholder="输入要回复给家长的内容" v-model="aform.contents">
                                </el-input>
                            </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer" style="text-align:center;margin-top:40px">
                    <el-button type="primary" :loading="writeL" @click="addAccount('aform')">完 成</el-button>
                    <el-button @click="dialogFormVisible = false">取 消</el-button>
                </div>
            </el-dialog>
        </div>
        <div id="tablePMX">
            <el-table :data="accountData"  style='width:100%'>
                
                <el-table-column prop="child_name" label="学生" width="80">
                        <template scope="scope">
                                <span @click="switchDetail(scope.row)" class='prinMailbospan'>{{scope.row.child_name}}</span>
                            </template>
                </el-table-column>
                <el-table-column prop="ask" label="内容">
                </el-table-column>
                <el-table-column prop="created" label="发送时间" width='150px'>
                </el-table-column>
                <el-table-column prop="answer" label="校长回复">
                </el-table-column>
                <el-table-column prop="status" label="处理状态" width='120px'>
                        <template scope="scope">
                                <span :style="scope.row.status=='未处理'? 'color:red' : 'color:#1fb5ad'">{{scope.row.status}}</span>
                            </template>
                </el-table-column>
                <el-table-column prop="answertime" label="处理时间" width='150px'>
                </el-table-column>
                <el-table-column label="操作" width='120'>
                    <template scope="scope">
                        <el-button type="text" size="small" @click="editCh(scope.row.id)" v-if="scope.row.status=='未处理'">处理</el-button>
                        <!-- <el-button type="text" size="small" @click="open2(scope.$index, accountData)" class='classDel'>删除</el-button> -->
                    </template>
                </el-table-column>
            </el-table>
            <div class="prinMailboxBLC">
                <el-pagination layout="prev, pager, next" :total="total" :current-page="currentPage" :page-size="pagesize" @current-change="handleCurrentChange">
                </el-pagination>
            </div>
        </div>
        <el-dialog title="学生资料" :visible.sync="dialogFormVisibleClass" :close-on-click-modal="no" custom-class='prinMailboxDETAIL'
        top='15%' size='tiny'>
        <el-form id='aform' label-width="102px" label-position='left' style='padding-left:10px'>
                <el-form-item label="姓名:" prop='name'>
                    <span>{{student.child_name}}</span>
                </el-form-item>
                <el-form-item label="学生家长:" prop='parent'>
                    <span style='float:left;margin-right:10px;'>{{student.contacts_user}}</span>
                    <el-col :span="11">
                        <span>{{student.contacts_user_mobile}}</span>
                    </el-col>
                </el-form-item>
                <el-form-item label="" v-if='student.contacts_user_2||student.contacts_user_mobile_2'>
                    <span style='float:left;margin-right:10px;'>{{student.contacts_user_2}}</span>
                    <el-col :span="11">
                        <span>{{student.contacts_user_mobile_2}}</span>
                    </el-col>
                </el-form-item>
                <el-form-item label="所在校区:" prop='school'>
                    <span>{{student.title}}</span>
                </el-form-item>
                <el-form-item label="CC:" prop='teacher' >
                    <span>{{student.cname}}</span>
                </el-form-item>
                <el-form-item label="他的课程:" prop='teacher' v-if="student.course.length!=0">
                    <div v-for="item in student.course">
                        {{item.title}}({{item.tname}})
                    </div>
                    </el-form-item>
            </el-form>
    </el-dialog>
    </div>
</template>
<script>
var token
import {
    emailboxlist,
    ProEmail,
    userinfo
} from '../../api/api';
export default {
    data() {
        var isSpace = (rule, value, callback) => {
            var myreg = /^.{1,100}$/;
            var myreg1 = /^\s/;
            if(value==''){
                callback('请输入要回复给家长的内容')
            }else if (myreg1.test(value)) {
                callback('请输入有效的内容')
            } else {
                callback();
            }
            // else if (!myreg.test(value)) {
            //     callback('内容不得超过100字');
            // } 
            
        }
            return {
                writeL:false,
                mailId:'',
                student:{course:[]},
                currentPage: 1, //页数
                pagesize: 15, //默认每页
                total: 0, //总页数
                no: false, //取消点击关闭
                accountData: [],
                // number: '0',
                // value: '', //对应课程类型select的值
                aform: {
                    contents: '',
                },
                input2:'',
                dialogFormVisible: false,
                dialogFormVisibleClass:false,
                // formLabelWidth: '31%',
                // inputLabelWidth: '200px',
                rules2: {
                    contents: [{
                        required: true,
                        // message: '请输入标签内容',
                        validator: isSpace,
                        trigger: 'blur'
                    }],
                }
            }
        },
        methods: {
            switchDetail(data){//点击查看资料
                let para = {
                    id:data.uid
                }
                userinfo(token,para).then(res=>{
                    this.student = res.data
                })
                this.dialogFormVisibleClass=true;
            },
            updateList() { //表格上方select change之后刷新表格
                this.currentPage = 1;
                this.fetchData();
            },
            resetD() {
                this.aform.contents='';
                this.mailId ='';
                this.writeL = false;
            },
            editCh(id) { //点击处理
               this.dialogFormVisible= true;
               this.mailId =  id

            },
            addAccount(formName) { //处理
                let para ={
                    id:this.mailId,
                    note:this.aform.contents
                }
                this.writeL = true;
                ProEmail(para,token).then(res=>{
                    // console.log(res)
                    if(res.code==0){
                        this.$message.success('已处理');
                        this.dialogFormVisible = false;
                        this.writeL = false;
                        this.fetchData();
                    }else{
                        this.$message.error(res.data);
                        this.writeL = false;                        
                    }
                })
                // this.$refs[formName].validate((valid) => {
                //     let f = {...this.aform};
                //     let i = this.in;
                //     // console.log(valid)
                //     if (valid) {
                //         if (i !== '') {
                //             let para = f;
                //             create_tag(para, token).then(res => {
                //                 if (res.code == 0) {
                //                     this.$message({
                //                         message: '修改成功',
                //                         type: 'success'
                //                     });
                //                     this.fetchData();
                //                 } else {
                //                     this.$message({
                //                         type: 'error',
                //                         message: res.data
                //                     });
                //                 }
                //             }).then(() => {
                //                 this.dialogFormVisible = false;
                //             });
                //         } else {
                //             let para = f;
                //             create_tag(para, token).then(res => {
                //                 if (res.code == 0) {
                //                     this.$message({
                //                         message: '创建成功',
                //                         type: 'success'
                //                     });
                //                     this.fetchData();
                //                 } else {
                //                     this.$message({
                //                         type: 'error',
                //                         message: res.data
                //                     });
                //                 }
                //             }).then(() => {
                //                 this.dialogFormVisible = false;
                //             });
                //         }
                //         this.in = '';

                //     } else {
                //         console.log('error submit!!');
                //         return false;
                //     }
                // });
            },
            fetchData() {
                let para = {
                    page: this.currentPage,
                    uname: this.input2
                }
                emailboxlist(token,para).then((res) => {
                    // this.number = res.data.total;
                    let a = res.data;
                    let c = res.data.lastpage * this.pagesize;
                    this.total = parseInt(c);
                    this.accountData = a.list;
                })

            },
            handleCurrentChange: function(val) { //变更页数
                this.currentPage = val;
                this.fetchData();
            },
        },
        beforeCreate() {
            let user = sessionStorage.getItem('user');
            token = JSON.parse(user).token;
        },
        created() { //创建组件时
            this.fetchData();

        },
        // computed: {
        //     alter: function() {
        //         if (this.in === '') {
        //             return '添加标签'
        //         }
        //         return '修改标签'
        //     }
        // }
}
</script>
<style>

/* #tablePMX .el-table td,
#tablePMX .el-table th:not(.gutter) {
    padding: 5px 5px;
    text-align: center
}

#tablePMX .el-table th>div,
#tablePMX .el-table .cell {
    padding-left: 0;
    padding-right: 0;
} */
/* 
#tablePMX .classDel {
    color: #e95c5c;
} */



.prinMailbox .el-dialog .el-dialog__header {
    background-color: #1fb5ad;
    padding: 20px 20px 20px;
}

.prinMailbox .el-dialog .el-dialog__title {
    color: white;
}

.prinMailboxBLC {
    text-align: center;
    margin-top: 10px;
}

.prinMailboxA {
    width: 100%;
    position: relative;
    height: 45px;
    background-color: white;
    /* margin-top: 30px; */
    padding-top: 10px;
    margin-bottom: 5px;
    border-radius: 5px;
}

.prinMailboxH2 {
    display: inline-block;
    margin-top: 5px;
    margin-bottom: 15px;
    padding-left: 10px
}

/* .oneSelectTag {
    display: inline-block;
    margin-bottom: 10px;
    margin-left: 10px;
    width: 110px
} */

/* .buttonAdd {
    position: absolute;
    right: 10px;
    top: 10px;
} */

.prinMailboXDD .el-dialog__body {
    padding: 20px 20px 0 20px;
}

.prinMailboXDD .el-dialog__footer {
    padding: 0 20px 15px;
}
.prinMailbospan:hover {
    cursor: pointer;
}
.prinMailbospan{
    font-weight: 600;
        color:#1fb5ad
}
/* .prinMailboxDETAIL .el-dialog__body {
        background-color: #f3f3f3
    } */

    .prinMailboxDETAIL .el-dialog__body {
        padding: 10px 10px 10px 10px;
    }

    .prinMailboxDETAIL .el-dialog__footer {
        padding: 0 20px 15px;
    }
</style>
