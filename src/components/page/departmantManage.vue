<template>
    <div class="tableDepartment">
        <!-- <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-my-shezhi"></i> 组织架构</el-breadcrumb-item>
                <el-breadcrumb-item class='ss'>部门管理</el-breadcrumb-item>
            </el-breadcrumb>
        </div> -->
        <div class='DMtitle'>
          <h3 class='departH2'>部门管理</h3>
            <el-button type="primary" size="mid" class='DMbutton' @click="open3">创建部门</el-button>
        </div>
        <el-table :data="tableData" border style="width: 100%;margin-bottom:10px;">
            <el-table-column prop="full_name" label="部门名称">
            <template scope="scope">
                        <span class='canC' @click='showD(scope.row.job_id)'>{{scope.row.full_name}}&nbsp&nbsp&nbsp({{scope.row.user_count}}人)</span>
                    </template>
            </el-table-column>
            <el-table-column width='140px' label="操作">
                <template scope="scope">
                    <el-button type="text" size="small" @click="open4(scope.$index, tableData)">修改</el-button>
                    <el-button type="text" size="small" class='DMred' @click="open2(scope.$index, tableData)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-dialog title="详细人员" :visible.sync="dialogFormVisible1" :close-on-click-modal="no" show-close top='7%'>
            <div id="tableDM">
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
var token
import {
    department,
    create_department,
    put_department,
    delete_department,
    account
} from '../../api/api';
export default {
    data() {
        return {
            accountData:[],
                total:0,
                currentPage:1,
                pagesize:15,
            tableData: [],
            dialogFormVisible1:false,
            searchId:'',
            no:false,
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
                    did: id,
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
                this.currentPage = val;
                this.showD(this.searchId);
            },
        open2(index, data) { //删除部门
            if (data[index].user_count != 0) {
                this.$alert('当前部门有成员,无法删除部门', '删除部门', {
                    title: '删除部门',
                    type: 'warning',
                    customClass: 'DMredwarn',
                    confirmButtonText: '确定'
                }).catch(() => {
                    // this.$message({
                    //     type: 'info',
                    //     message: '已取消删除'
                    // });
                });
            } else {
                this.$confirm('是否确定要删除部门?', '删除部门', {
                    title: '删除部门',
                    customClass: 'DMredwarn',
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {

                    // console.log(this.tableData)
                    let a = {
                        job_id: data[index].job_id
                    }
                    // console.log(a)
                    delete_department(a, token).then((res)=>{
if(res.code==0){

                    department(token).then((res) => {
            this.tableData = res.data

        })
                    this.$message({
                        type: 'success',
                        message: '删除成功!'
                    });
}else{
    this.$message.error(res.message)
}
                    });
                }).catch(() => {
                    // this.$message({
                    //     type: 'info',
                    //     message: '已取消删除'
                    // });
                });
            }
        },

        createde(branch) {
            create_department(branch, token).then(res => {
                if(res.code==0){
                department(token).then((res) => {
            this.tableData = res.data

        })
        this.$message({
                        type: 'success',
                        message: '创建成功!'
                    });

                }else{
    this.$message.error(res.data)
}
            });
        },
        open3() { //创建部门
            this.$prompt('请输入部门名称', '创建部门', {
                customClass: 'green',
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                inputPattern: /^[\u4e00-\u9fa5a-zA-Z]+$/,
                inputErrorMessage: '请输入有效的部门名称'
            }).then((value) => {
                // this.$message({
                //     type: 'success',
                //     message: '部门名称是:  '+ value.value
                // });
                let branch = {
                    full_name: value.value
                };
                this.createde(branch);
            }).catch(() => {
                    // this.$message({
                    //     type: 'info',
                    //     message: '已取消删除'
                    // });
                });
            // .catch(() => {
            //     this.$message({
            //       type: 'info',
            //       message: '操作取消'
            //     });       
            // });
        },
        open4(index, data) { //修改部门
            this.$confirm('若该部门有成员,修改后原部门所有成员将自动更新到新部门！', '修改提示', {
                customClass: 'DMredwarn',
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.$prompt('请输入部门名称', '修改部门', {
                    customClass: 'green',
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    inputPattern: /^[\u4e00-\u9fa5a-zA-Z]+$/,
                    inputErrorMessage: '请输入有效的部门名称'
                }).then((value) => {
                    // this.$message({
                    //     type: 'success',
                    //     message: '部门名称是: ' + value.value
                    // });
                    data[index].full_name = value.value;
                    put_department(data[index], token).then((res)=>{
                        if(res.code==0){
                         department(token).then((res) => {
            this.tableData = res.data

        })
        this.$message({
                        type: 'success',
                        message: '修改成功!'
                    });

                        }else{
                            this.$message.error(res.data)
                        }
                    });
                })
            }).catch(() => {
                // this.$message({
                //     type: 'info',
                //     message: '已取消修改'
                // });
            });
        }
    },

   
    beforeCreate() {
        let user = sessionStorage.getItem('user');
        token = JSON.parse(user).token;
    },
    created() {
        department(token).then((res) => {
            this.tableData = res.data

        })
    }

}
</script>
<style >
.tableDepartment .el-button--primary {
    background-color: #32a4d3;
    border-color: #32a4d3;
}

.DMredwarn .el-message-box__header {
    background-color: #e95c5c;
    padding: 20px 20px 20px;
}

.DMredwarn .el-message-box__title {
    color: white;
}

.DMredwarn .el-button--primary {
    background-color: #e95c5c;
    border-color: #e95c5c;
}

.green .el-message-box__header {
    background-color: #1fb5ad;
    padding: 20px 20px 20px;
}

.green .el-message-box__title {
    color: white;
}
.departH2{
    padding-left: 10px
}
.DMtitle{
width: 100%;position:relative;background-color:white;margin-bottom:5px;padding:15px 0 15px 0;border-radius:5px
}
.DMbutton{
position:absolute;right:10px;top:16%
}
.DMred{
    color:red
}
.tableDepartment .el-table th:first-child, .tableDepartment .el-table td:first-child{
        text-align: left;
        padding:5px 5px 5px 20px;
    }
    .canC:hover{
        cursor: pointer
    }
    #tableDM .el-table td,
#tableDM .el-table th:not(.gutter) {
    padding: 5px 5px;
    text-align: center
}

#tableDM .el-table th>div,
#tableDM .el-table .cell {
    padding-left: 0;
    padding-right: 0;
}

.tableDepartment .el-dialog .el-dialog__header {
        background-color: #1fb5ad;
        padding: 20px 20px 20px;
    }

    .tableDepartment .el-dialog .el-dialog__title {
        color: white;
    }
    .block {
    text-align: center;
    margin-top: 10px;
}
</style>
