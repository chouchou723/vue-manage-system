
<template>
<div class="table">
<div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-menu"></i> 组织架构</el-breadcrumb-item>
                <el-breadcrumb-item>角色管理</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div  style="width: 100%;position:relative">
       <el-button type="primary" size="mid" style='position:absolute;right:0;top:10%' @click="createCh">创建角色</el-button>
         </div>
        <div>

<el-dialog :title="alter" :visible.sync="dialogFormVisible"  show-close style='z-index:100'>
<el-form :model="form">
  <el-form-item label="角色名称" :label-width="formLabelWidth">
      <el-input v-model="form.full_name" auto-complete="off" placeholder='请输入角色名称' style='width:200px'></el-input>
    </el-form-item>
    </el-form>
  <el-tree :data="data2" show-checkbox=""  v-model="form.access" node-key="id" ref="tree" highlight-current :props="defaultProps">
</el-tree>
 
  <div slot="footer" class="dialog-footer">
    <el-button type="primary" @click="addChar">确 定</el-button>
    <el-button @click="dialogFormVisible = false">取 消</el-button>
  </div>
 
</el-dialog> 
            
        </div>
  <el-table
    :data="charData"
    border
    style="width: 100%;margin-top:70px">
    <el-table-column
      prop="name"
      label="角色管理" >
    </el-table-column>
    <el-table-column width='140px'
      label="操作">
      <template scope="scope">
        <el-button  type="text" size="small" @click="open4(scope.$index, charData)">修改</el-button>
        <el-button type="text" size="small" @click="open2(scope.$index, charData)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
  </div>
</template>

<script>
var user = localStorage.getItem('user');
var token = JSON.parse(user).token;
import { character,create_character,put_character,delete_character } from '../../api/api';
  export default {
    methods: {
      createCh(){    //打开创建角色
        var that = this;
            this.form.full_name = '';
            this.dialogFormVisible = true;
            function dib(){
          that.$refs.tree.setCheckedKeys([]);
        };
            setTimeout( dib, 1)
            
      },
      deleteRow(index, rows) {
        rows.splice(index, 1);
      },
      open2(index,data) {  //删除角色
        
            this.$confirm('是否确定要删除该角色?', '删除角色', {
                  customClass:'redwarn',
                  confirmButtonText: '确定',
                  cancelButtonText: '取消',
                  type: 'warning'
        }).then(() => {
          let a ={
            roleid:data[index].roleid
          }
          delete_character(a,token);
          this.deleteRow(index,data);
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
          character(this.charData);//替换上送接口
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
        
        
      },
      open4(index,data){
        this.dialogFormVisible = true;
        this.in = index;
        this.form.full_name = data[index].name;
        var that = this;
        function dia(){
          that.$refs.tree.setCheckedKeys(data[index].number);
        };
        setTimeout(dia,1);
      },
      addChar(){
        let a =this.$refs.tree.getCheckedKeys();
        console.log(a)
        let b = this.form.name;
        let c = this.in;
        if(a&&b&&c ===''){
        this.charData.push({ kind: b,
          number: a});
        this.dialogFormVisible = false;

        }else if(a&&b&&c !==''){
            this.charData[c].kind = b ;
            this.charData[c].number = a ;
             this.dialogFormVisible = false;
             this.in = '';
        }
        character(this.charData);
        this.$refs.tree.setCheckedKeys([]);
        this.form.name = '';
        console.log(this.charData);
      }
    },

    data() {
      return {
        charData: [],
        dialogFormVisible: false,
        in: '',
        form: {
          full_name: ''
        },
        formLabelWidth: '70px',
         data2: [{
          id: 1,
          label: '任务提醒'
        }, 
        {
          id: 2,
          label: '系统通知'
        }, {
          id: 3,
          label: '资源管理',
          children: [{
            id: 7,
            label: '自己的资源'
          }, {
            id: 8,
            label: '他人的资源'
          },{
            id: 9,
            label: '自己的资源'
          }, {
            id: 10,
            label: '他人的资源'
          },{
            id: 11,
            label: '自己的资源'
          }, {
            id: 12,
            label: '他人的资源'
          },{
            id: 13,
            label: '自己的资源'
          }, {
            id: 14,
            label: '他人的资源'
          },{
            id: 15,
            label: '自己的资源'
          }, {
            id: 16,
            label: '他人的资源'
          }]
        },
        {
          id: 4,
          label: '学员回访',
          children: [{
            id: 17,
            label: '自己的学员'
          }, {
            id: 18,
            label: '他人的学员'
          }]
        },
        {
          id: 5,
          label: '报表统计',
          children: [{
            id: 19,
            label: '自己的学员'
          }, {
            id: 20,
            label: '他人的学员'
          }]
        }],
        defaultProps: {
          children: 'children',
          label: 'label'
        }
      }
    },
    created(){
        character(token).then((res) => {
          //NProgress.done();
          this.charData = res.data;
        })
    },
    computed:{
      alter:function(){
        if(this.in === ''){
          return '创建角色'
        }
        return '修改角色'
      }
    }
    
  }
</script>

<style >
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
.el-tree-node__children .el-tree-node{
    float:left;
}
.dialog-footer .el-button--primary{
    background-color: #1fb5ad;
    border-color: #1fb5ad;
}
.el-dialog .el-dialog__header{
    background-color: #1fb5ad;
    padding: 20px 20px 20px;
}
.el-dialog .el-dialog__title{
    color:white;
}
</style>