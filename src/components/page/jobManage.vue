<template>
    <div class="jobtable">
        <!-- <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-my-shezhi"></i> 组织架构</el-breadcrumb-item>
                <el-breadcrumb-item class='ss'>职位管理</el-breadcrumb-item>
            </el-breadcrumb>
        </div> -->
        <div class='addjob'>
            <h3 class='jobH2'>职位管理</h3>
            <el-button type="primary" size="mid" class="JMbutton" @click="createCh" v-if="!code.includes('school')">添加职位</el-button>
        </div>
        <div>
            <el-dialog :title="alter" :visible.sync="dialogFormVisible" :close-on-click-modal="no" show-close @close="resetD('form')">
                <el-form :model="form" ref="form" :rules="rules2">
                    <el-form-item label="职位名称" :label-width="formLabelWidth" prop="full_name">
                        <el-input v-model="form.full_name" auto-complete="off" placeholder='请输入职位名称' class="JM200"></el-input>
                    </el-form-item>
                    <el-form-item label="所属部门" :label-width="formLabelWidth" prop="did">
                        <el-select v-model.number="form.did"  @change='updateLevel'  class="JM200">
                            <el-option v-for="item in departments" :key="item.value" :label="item.label" :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="直属上级" :label-width="formLabelWidth" prop="pid">
                        <el-select v-model="form.pid"  clearable  class="JM200">
                            <el-option v-for="item in levels" :key="item.value" :label="item.label" :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="权限范围" :label-width="formLabelWidth" prop="role">
                        <el-select v-model="form.role" multiple clearable placeholder="选择权限" class="JM200">
                            <el-option v-for="item in ranges" :key="item.value" :label="item.label" :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button type="primary" @click="addChar('form')">确 定</el-button>
                    <el-button @click="dialogFormVisible = false">取 消</el-button>
                </div>
            </el-dialog>
        </div>
        <el-table v-for="depart in departs" :data="depart._child" border style="width: 100%;margin-bottom:10px;" ref='table' >
            <el-table-column  prop="full_name" :label="depart.full_name +'   (' + depart.count + '人)'" id='level'>
                <template scope="scope">
                    <span class='canC' v-if='scope.row.pid==0' style='padding-left:40px;' @click='showD(scope.row.job_id)'>{{scope.row.full_name}}&nbsp&nbsp&nbsp({{scope.row.count}}人)</span>
                    <span  class='canC' v-if='scope.row.pid!==0&&depart._child.filter(item=>{return item.pid==0}).some(i=>{return i.job_id==scope.row.pid})' style='padding-left:60px;' @click='showD(scope.row.job_id)'>{{scope.row.full_name}}&nbsp&nbsp&nbsp({{scope.row.count}}人)</span>
                    <span class='canC' v-else style='padding-left:80px;'><span v-if='scope.row.pid!==0' @click='showD(scope.row.job_id)'>{{scope.row.full_name}}&nbsp&nbsp&nbsp({{scope.row.count}}人)</span></span>
                    
                    <!-- <span  v-if='scope.row.pid!==0&&scope.row.pid==depart._child[0].job_id' style='padding-left:15px;'>{{scope.row.full_name}}&nbsp&nbsp&nbsp({{scope.row.count}}人)</span>
                    <span  v-if="scope.row.pid!==0&&scope.row.pid!=depart._child[0].job_id&&depart._child.every(item=>{return scope.row.job_id!=item.pid})" style='padding-left:30px;'>{{scope.row.full_name}}&nbsp&nbsp&nbsp({{scope.row.count}}人)</span> -->
                </template>
            </el-table-column>
            <el-table-column width='140px' label="操作" v-if="!code.includes('school')">
                <template scope="scope">
                    <el-button type="text" size="small" @click="open4(scope.$index, depart._child)">修改</el-button>
                    <el-button type="text" size="small" class="JMred" @click="open2(scope.$index, depart._child)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-dialog title="详细人员" :visible.sync="dialogFormVisible1" :close-on-click-modal="no" show-close top='7%'>
            <div id="tableJM">
                <el-table :data="accountData"  >
                    <!-- <el-table-column prop="avatar" label="头像" width='70'>
                        <template scope="scope">
                            <span><img :src="scope.row.avatar" alt="" width="47" height='47' style="border-radius:50%;margin-bottom:-7px;border: 1px solid gainsboro;"></span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="name" label="登录名" >
                        <template scope="scope">
                            <span style='font-weight:600'>{{scope.row.name}}</span>
                        </template>
                    </el-table-column> -->
                    <el-table-column prop="uname" label="姓名" width='90'>
                    </el-table-column>
                    <el-table-column prop="tel" label="手机" width='120'>
                    </el-table-column>
                    <el-table-column prop="school" label="校区" :formatter='formatter'>
                    </el-table-column>
                    <el-table-column prop="job_name" label="职位" width='100'>
                    </el-table-column>
                    <el-table-column prop="department_name" label="部门" width='80'>
                    </el-table-column>
                    <!-- <el-table-column prop="last_login_time" label="最近登录时间">
                    </el-table-column> -->
                    <!-- <el-table-column prop="login_count" label="登录次数" width='80'>
                    </el-table-column> -->
                    <!-- <el-table-column prop="status" label="使用状态" width='80' column-key='status'>
                        <template scope="scope">
                            <span :style="scope.row.status=='停用'?'color:red':'color:black'">{{scope.row.status}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="操作" width='80'>
                        <template scope="scope">
                            <el-button type="text" size="small" @click="editCh(scope.$index, accountData)">修改</el-button>
                          <el-button type="text" size="small" @click="open2(scope.$index, accountData)">删除</el-button> 
                        </template>
                    </el-table-column> -->
                </el-table>
                <div class="block">
                    <el-pagination layout="prev, pager, next" :total="total" :current-page="currentPage" :page-size="pagesize" @current-change="handleCurrentChange">
                    </el-pagination>
                </div>
            </div>
        </el-dialog>
    </div>
</template>
<script>
    var token,user;
    import {
        departList,
        create_departList,
        put_departList,
        delete_departList,
        levelList,
        department,
        getCharacter,
        detail_departList,
        account
    } from '../../api/api';
    export default {
        data() {
            var nan = (rule, value, callback) => {
                if (value === '') {
                    callback('请选择')
                } else if (typeof value == 'number') {
                    callback();
                }
            }
            var isJob = (rule, value, callback) => {
                var myreg = /^[\u4e00-\u9fa5a-zA-Z0-9]+$/;
                if (value == '') {
                    callback('请输入职位名称')
                } else if (!myreg.test(value)) {
                    callback('请输入有效的职位名称');
                } else {
                    callback();
                }
            }
            return {
                code:'',
                accountData:[],
                total:0,
                currentPage:1,
                pagesize:15,
                searchId:'',
                rules2: {
                    full_name: [{
                        required: true,
                        validator: isJob,
                        // message: '请输入职位名称',
                        trigger: 'blur'
                    }],
                    did: [{
                        required: true,
                        validator: nan,
                        trigger: 'change'
                    }],
                    pid: [{
                        required: true,
                        validator: nan,
                        trigger: 'change'
                    }],
                    // role: [{
                    //     required: true,
                    //     validator: nan,
                    //     trigger: 'change'
                    // }]
                },
                departs: [],
                departments: [],
                levels: [],
                dialogFormVisible: false,
                dialogFormVisible1: false,                
                in: '',
                form: {
                    full_name: '',
                    did: '',
                    pid: '',
                    job_id: '',
                    count: 0,
                    role: [],
                    status: 1,
                },
                ranges: [],
                formLabelWidth: '80px',
                no: false, //取消点击关闭
            }
        },
        methods: {
            formatter(row, column) {
                if (row.school.length != 0) {

                    let a = row.school.map(item => {
                        return item.title
                    })
                    return a.join(',')
                }
            },
            showD(id){
                this.searchId= id;
                let para = {
                    job_id: id,
                    page:this.currentPage
                }
                account(para, token).then((res) => {
                    let a = res.data;
                    let c = res.last_page * this.pagesize;
                    this.total = parseInt(c);
                    this.accountData = a;
                    let arr = [];
                }).then(()=>{
                    this.dialogFormVisible1 = true;
                })
            },
            handleCurrentChange(val){
                this.currentPage = val;this.backToTop();
                this.showD(this.searchId);
            },
            resetD(formName) { //重置表单
                this.in = '';
               
                this.form = {
                    full_name: '',
                    did: '',
                    pid: '',
                    status: '',
                    pid: '',
                    count: 0,
                    role: [],
                    status: '1'
                }
                this.$refs[formName].resetFields();
                this.levels = [];
            },
            updateLevel() {
                if(this.form.did!=''){

                    let para = {
                        did: this.form.did
                    }
                    departList(para, token).then(res => {
                        // console.log(res)
                        if(res.data[0]._child){
    
                        this.levels = res.data[0]._child.map(item => {
                            return {
                                value: item.job_id,
                                label: item.full_name
                            }
                        })
                       
                        }
                        // console.log(this.levels)
                    }).then(()=>{
                    this.levels.unshift({value:0,label:'无'})
                    })
                }else{
                   
                }

            },
            createCh() { //点击创建按钮
                this.dialogFormVisible = true;
                
            },
            open2(index, data) { //删除职位
                // console.log(data)
                if (data[index].count != 0) {
                    this.$alert('当前职位有成员,无法删除职位', '删除职位', {
                        type: 'warning',
                        customClass: 'JMredwarn',
                        confirmButtonText: '确定',
                    });
                } else {
                    this.$confirm('是否确定要删除职位?', '删除职位', {
                        title: '删除职位',
                        customClass: 'JMredwarn',
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        let para = {
                            job_id: data[index].job_id
                        }
                        delete_departList(para, token).then(res => {
                            if(res.code==0){
                            departList(para, token).then((res) => {
                                // this.filterData(res);
                                this.departs = res.data;
                            })
                            this.$message({
                            type: 'success',
                            message: '删除成功!'
                        });
                            }
                        });
                        // this.deleteRow(index,data);
                        
                    }).catch(() => {
                    //   this.$message({
                    //     type: 'info',
                    //     message: '已取消删除'
                    //   });          
                    });
                }

            },
            open4(index, data) { //点击修改
                this.$confirm('若该部门有成员,修改后原部门所有成员将自动更新到新部门！', '修改提示', {
                    customClass: 'JMredwarn',
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'danger'
                }).then(() => {

                    this.in = index;
                    this.form.did = data[index].did - 0;
                    // this.updateLevel();
                    let para1 = {
                        did: this.form.did
                    }
                    departList(para1, token).then(res => {
                        // console.log(res)
                        if(res.data[0]._child){
    
                        this.levels = res.data[0]._child.map(item => {
                            return {
                                value: item.job_id,
                                label: item.full_name
                            }
                        }).filter(item=>{
                            // console.log(item)
                        return item.value!=data[index].job_id
                    })
                       
                        }
                        // console.log(this.levels)
                    }).then(()=>{
                    this.levels.unshift({value:0,label:'无'});
                    this.form.pid = data[index].pid - 0;
                    })
                    // this.$nextTick(function () {
                    //     console.log(this.levels)
                    //     this.levels = this.levels.filter(item=>{
                    //     return item.job_id!=data[index].job_id
                    // })
                    //     // this.levels.push({
                    //     //     label: '无',
                    //     //     value: 0
                    //     // })
                    // })
                    this.form.full_name = data[index].full_name;
                    this.form.job_id = data[index].job_id;
                    // if(this.form.pid == 0){
                    // }
                    this.form.status = data[index].status;
                    let para = {
                        job_id: this.form.job_id
                    }
                    detail_departList(para, token).then(res => {
                        // console.log(res)
                        this.form.role = res.data.role.map(item => {
                            return item - 0;
                        });
                    })
                    this.form.count = data[index].count;
                    this.dialogFormVisible = true;
                    // this.levels = data.map(item => {
                    //     return {
                    //         value: item.job_id,
                    //         label: item.full_name
                    //     }
                    // }).filter(item=>{
                    //     console.log(data[index].job_id)
                    //     return item.job_id!=data[index].job_id
                    // })
                    // this.updateLevel();

                }).catch(()=>{})


            },
            addChar(formName) {
                this.$refs[formName].validate((valid) => {
                let i = this.in;
                if(valid){
                if (i !== '') {
                    let para = {}
                    let a = {
                        full_name: this.form.full_name,
                        did: this.form.did,
                        pid: this.form.pid,
                        job_id: this.form.job_id,
                        role: this.form.role.join(','),
                        status: this.form.status
                    }
                    put_departList(a, token).then((res) => {
                        if(res.code==0){
                        departList(para, token).then((res) => {
                            // this.filterData(res);
                            this.departs = res.data;
                        })
                        this.$message({
                            type: 'success',
                            message: '修改成功!'
                        });
                this.dialogFormVisible = false;                        
                        }else{
                            this.$message.error(res.data)
                        }
                    })
                } else {
                    let para = {}
                    let f = {...this.form};
                    f.role = f.role.join(',');
                    create_departList(f, token).then(res=>{
                        if(res.code==0){
                            departList(para, token).then((res) => {
                        // this.filterData(res);
                        this.departs = res.data;
                    })
                    this.$message({
                            type: 'success',
                            message: '添加成功!'
                        });
                this.dialogFormVisible = false;                        
                        }else{
                            this.$message.error(res.data) 
                        }
                    });
                    
                }
                }else{
                      console.log('error submit!!');
                      return false;
                      }
                });
            },
            // space(row,index){//缩进处理
            //   let r = row.level;
            //   if(r){
            //     if(r.indexOf('经理')>-1){
            //         return 'mm'
            //       }
            //       if(r.indexOf('主管')>-1){
            //         return 'cc'
            //       }
            //   }

            // },
        },

       
        beforeCreate() {
            user = sessionStorage.getItem('user');
            token = JSON.parse(user).token;
        },
        created() {
            this.code = JSON.parse(user).job ? JSON.parse(user).job.code : '';
            let para = {}
            departList(para, token).then((res) => {
                // this.filterData(res);
                this.departs = res.data;
            }).then(() => {
                department(token).then(res => {
                    // console.log(res)
                    this.departments = res.data.map(item => {
                        return {
                            value: item.job_id,
                            label: item.full_name
                        };
                    })
                    getCharacter(token).then(res => {
                        this.ranges = res.data.map(item => {
                            return {
                                value: item.roleid,
                                label: item.name
                            };
                        })
                    })
                })


            })
        },
        computed: {
            alter: function () {
                if (this.in === '') {
                    return '创建职位'
                }
                return '修改职位'
            },
        }

    }

</script>
<style>
    .addjob {
        width: 100%;
        position: relative;
        height: 40px;
        background-color: white;
        margin-bottom: 5px;
        padding-top: 10px;
        border-radius: 5px
    }
    .canC:hover{
        cursor: pointer
    }
    #tableJM .el-table td,
#tableJM .el-table th:not(.gutter) {
    padding: 5px 5px;
    text-align: center
}

#tableJM .el-table th>div,
#tableJM .el-table .cell {
    padding-left: 0;
    padding-right: 0;
}
    .addjob .el-button--primary {
        background-color: #32a4d3;
        border-color: #32a4d3;
    }

    .JMredwarn .el-message-box__header {
        background-color: #e95c5c;
        padding: 20px 20px 20px;
    }

    .JMredwarn .el-message-box__title {
        color: white;
    }

    .JMredwarn .el-button--primary {
        background-color: #e95c5c;
        border-color: #e95c5c;
    }

    .JMredwarn .el-button--primary:hover {
        background-color: #ff6d6d;
        border-color: #ff6d6d;
    }

    .green .el-message-box__header {
        background-color: #1fb5ad;
        padding: 20px 20px 20px;
    }

    .green .el-message-box__title {
        color: white;
    }

    .jobH2 {
        margin-bottom: 15px;
        padding-left: 10px
    }
    /*.el-tree-node__children .el-tree-node{
    float:left;
}*/
    /*.dialog-footer .el-button--primary {
    background-color: #1fb5ad;
    border-color: #1fb5ad;
}*/

   .jobtable .el-dialog .el-dialog__header {
        background-color: #1fb5ad;
        padding: 20px 20px 20px;
    }

    .jobtable .el-dialog .el-dialog__title {
        color: white;
    }
    .block {
    text-align: center;
    margin-top: 10px;
}
    /*.mm {}

.cc {}

.mm td:nth-child(odd) {
    padding-left: 50px
}

.cc td:nth-child(odd) {
    padding-left: 100px
}*/

    .JMbutton {
        position: absolute;
        right: 10px;
        top: 12%
    }

    .JM200 {
        width: 200px
    }

    .JMred {
        color: red
    }
    .jobtable .el-table th:first-child{
        text-align: left;
        padding:5px 5px 5px 20px;
    }
    .jobtable .el-table td:first-child{
        text-align: left;
        /* padding:5px 5px 5px 25px; */
    }
</style>
