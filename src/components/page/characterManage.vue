
<template>
<div class="table">
<div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-menu"></i> 组织架构</el-breadcrumb-item>
                <el-breadcrumb-item>角色管理</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div  class='crea' style="width: 100%;position:relative">
       <el-button type="primary" size="mid" style='position:absolute;right:0;top:10%' @click="createCh">创建角色</el-button>
         </div>
        <div>

<el-dialog :title="alter" :visible.sync="dialogFormVisible"  :close-on-click-modal="no" show-close style='z-index:100' class='charDialog'>
<el-form :model="form">
  <el-form-item label="角色名称" :label-width="formLabelWidth">
      <el-input v-model="form.name" auto-complete="off" placeholder='请输入角色名称' style='width:200px'></el-input>
    </el-form-item>
    </el-form>
  <el-tree :data="data2" show-checkbox=""  v-model="form.access" node-key="module_id"  ref="tree" highlight-current :props="defaultProps">
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
import { character,create_character,put_character,delete_character,rangeList,detail_character } from '../../api/api';
  export default {
    methods: {
      createCh(){    //点击创建角色
        var that = this;
            this.form.name = '';
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
        })
        // .catch(() => {
        //   this.$message({
        //     type: 'info',
        //     message: '已取消删除'
        //   });          
        // });
        
        
      },
      open4(index,data){ //修改角色
        let para = {
          roleid:data[index].roleid
        }
        detail_character(para,token).then(res=>{
          let a  = res.data.module_ids
          this.$refs.tree.setCheckedKeys(a);
          // console.log(a)
        })
        this.dialogFormVisible = true;
        this.in = index;
        this.form.name = data[index].name;
      },
      addChar(){
        let s =this.$refs.tree.getCheckedKeys();
        let a = s.join(',');
        let b = this.form.name;
        let c = this.in;
        if(a&&b&&c ===''){
        let para = { name: b,
          module_id: a}//number要替换
            create_character(para,token);
        this.charData.push({ name: b,
          module_id: a});//number要替换
        this.dialogFormVisible = false;
        this.$refs.tree.setCheckedKeys([]);
        this.form.name = '';
        }else if(a&&b&&c !==''){
            let para = { name: b,
            module_id: a}//number要替换
            put_character(para,token);
            this.charData[c].name = b ;
            this.charData[c].module_id = a ;//number要替换
            this.dialogFormVisible = false;
            this.in = '';
            this.$refs.tree.setCheckedKeys([]);
            this.form.name = '';
        }
        
      }
    },

    data() {
      return {
        charData: [],
        dialogFormVisible: false,
        formLabelWidth: '70px',
        in: '',
        no:false,
        form: {
          name: ''
        },
         data2: [],
        defaultProps: {
          children: '_child',
          label: 'menu_name'
        }
      }
    },
    created(){
        character(token).then((res) => {
          this.charData = res.data;
        })
        rangeList(token).then(res=>{

          this.data2 = res.data
          // console.log(this.data2)
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
.crea .el-button--primary{
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
.charDialog .el-tree-node__children .el-tree-node{
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