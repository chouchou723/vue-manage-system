
<template>
<div class="table">
<div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-menu"></i> 组织架构</el-breadcrumb-item>
                <el-breadcrumb-item>部门管理</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div  style="width: 100%;position:relative">
       <el-button type="primary" size="mid" style='position:absolute;right:0;top:10%' @click="open3">创建部门</el-button>
            
        </div>
  <el-table
    :data="tableData"
    border
    style="width: 100%;margin-top:70px">
    <el-table-column
      prop="kind"
      label="部门管理" >
    </el-table-column>
    <el-table-column width='140px'
      label="操作">
      <template scope="scope">
        <el-button  type="text" size="small" @click="open4(scope.$index, tableData)">修改</el-button>
        <el-button type="text" size="small" @click="open2(scope.$index, tableData)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
  </div>
</template>

<script>
import { department } from '../../api/api';
  export default {
    methods: {
      createde(branch){
        let index = this.tableData.length;
        this.tableData.push(branch)
        department(this.tableData);
      },
      deleteRow(index, rows) {
        rows.splice(index, 1);
      },
      open2(index,data) {
        if(data[index].number){
            this.$alert('当前部门有成员,无法删除部门', '删除部门', {
                 title:'删除部门',
                 type: 'warning',
                 customClass:'redwarn',
                 confirmButtonText: '确定'
        });
        }
        else{
            this.$confirm('是否确定要删除部门?', '删除部门', {
                  title:'删除部门',
                  customClass:'redwarn',
                  confirmButtonText: '确定',
                  cancelButtonText: '取消',
                  type: 'warning'
        }).then(() => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
          this.deleteRow(index,data);
          console.log(this.tableData)
          department(this.tableData);
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
        }
        
      },
      open3() {
        this.$prompt('请输入部门名称', '创建部门', {
            customClass:'green',
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          // inputPattern: /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/,
          // inputErrorMessage: '邮箱格式不正确'
        }).then(({ value }) => {
          this.$message({
            type: 'success',
            message: '部门名称是: ' + value
          });
          let branch = {kind:value};
          this.createde(branch);
          department(branch)
        }).catch(() => {
          // this.$message({
          //   type: 'info',
          //   message: '取消输入'
          // });       
        });
      },
      open4(index,data){
        this.$confirm('若该部门有成员,修改后原部门所有成员将自动更新到新部门！', '修改提示', {
                customClass:'redwarn',
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$prompt('请输入部门名称', '修改部门', {
            customClass:'green',
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          // inputPattern: /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/,
          // inputErrorMessage: '邮箱格式不正确'
        }).then(({ value }) => {
          this.$message({
            type: 'success',
            message: '部门名称是: ' + value
          });
          data[index].kind = value;
           department(this.tableData);
        })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消修改'
          });          
        });
      }
    },

    data() {
      return {
        tableData: []
      }
    },
    created(){
        let self = this;
        let para = {
          tableData:this.tableData
        };
        department(para).then((res) => {
          //NProgress.done();
          this.tableData = res;
        })
            }
    
  }
</script>

<style scroped>
.el-button--primary{
    background-color: #32a4d3;
    border-color: #32a4d3;
}
.redwarn .el-message-box__header{
    background-color: #e95c5c;
    padding: 20px 20px 20px;
}
.redwarn .el-message-box__title{
    color:white;
}
.redwarn .el-button--primary{
    background-color: #e95c5c;
    border-color: #e95c5c;
}
.green .el-message-box__header{
    background-color: #1fb5ad;
    padding: 20px 20px 20px;
}
.green .el-message-box__title{
    color:white;
}
</style>