
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
      prop="full_name"
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
var user = localStorage.getItem('user');
var token = JSON.parse(user).token;
import { department ,create_department,put_department,delete_department} from '../../api/api';
  export default {
    methods: {
      deleteRow(index, rows) {
        rows.splice(index, 1);
      },
      open2(index,data) {     //删除部门
        if(data[index].user_count != 0){
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
          
          // console.log(this.tableData)
          let a ={
            job_id:data[index].job_id
          }
          console.log(a)
          delete_department(a,token);
          this.deleteRow(index,data);
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
        }
      },

      createde(branch){
        this.tableData.push(branch);
        let l = this.tableData.length;
        create_department(branch,token).then(res=>{
          this.tableData[l-1] = res.data
      //     this.tableData = res.data.map(item => {
      // return {  did: item.did, 
      //           full_name: item.full_name ,
      //           user_count: item.user_count,
      //           status: item.status,
      //           created_at: this.created_at,
      //           updated_at: this.updated_at,
      //           job_count:this.job_count 
      //         };
      //     })
        });
      },
      open3() {     //创建部门
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
          let branch = {full_name:value};
          this.createde(branch);
        }).catch(() => {
          // this.$message({
          //   type: 'info',
          //   message: '取消输入'
          // });       
        });
      },
      open4(index,data){   //修改部门
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
          data[index].full_name = value;
           put_department(data[index],token);
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
        department(token).then((res) => {
          this.tableData = res.data

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