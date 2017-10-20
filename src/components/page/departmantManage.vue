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
        <el-table :data="tableData" border style="width: 100%;">
            <el-table-column prop="full_name" label="部门名称">
            <template scope="scope">
                        <span >{{scope.row.full_name}}&nbsp&nbsp&nbsp({{scope.row.user_count}}人)</span>
                    </template>
            </el-table-column>
            <el-table-column width='140px' label="操作">
                <template scope="scope">
                    <el-button type="text" size="small" @click="open4(scope.$index, tableData)">修改</el-button>
                    <el-button type="text" size="small" class='DMred' @click="open2(scope.$index, tableData)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>
<script>
var token
import {
    department,
    create_department,
    put_department,
    delete_department
} from '../../api/api';
export default {
    methods: {
        open2(index, data) { //删除部门
            if (data[index].user_count != 0) {
                this.$alert('当前部门有成员,无法删除部门', '删除部门', {
                    title: '删除部门',
                    type: 'warning',
                    customClass: 'redwarn',
                    confirmButtonText: '确定'
                });
            } else {
                this.$confirm('是否确定要删除部门?', '删除部门', {
                    title: '删除部门',
                    customClass: 'redwarn',
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
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
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
                        message: '添加成功!'
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
                // inputPattern: /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/,
                // inputErrorMessage: '邮箱格式不正确'
            }).then((value) => {
                this.$message({
                    type: 'success',
                    message: '部门名称是:  '+ value.value
                });
                let branch = {
                    full_name: value.value
                };
                this.createde(branch);
            })
            // .catch(() => {
            //     this.$message({
            //       type: 'info',
            //       message: '操作取消'
            //     });       
            // });
        },
        open4(index, data) { //修改部门
            this.$confirm('若该部门有成员,修改后原部门所有成员将自动更新到新部门！', '修改提示', {
                customClass: 'redwarn',
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.$prompt('请输入部门名称', '修改部门', {
                    customClass: 'green',
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    // inputPattern: /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/,
                    // inputErrorMessage: '邮箱格式不正确'
                }).then((value) => {
                    this.$message({
                        type: 'success',
                        message: '部门名称是: ' + value.value
                    });
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

    data() {
        return {
            tableData: []
        }
    },
    beforeCreate() {
        let user = localStorage.getItem('user');
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

.redwarn .el-message-box__header {
    background-color: #e95c5c;
    padding: 20px 20px 20px;
}

.redwarn .el-message-box__title {
    color: white;
}

.redwarn .el-button--primary {
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
</style>
