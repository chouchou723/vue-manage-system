
<template>
<div class="table">
<div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-menu"></i> 组织架构</el-breadcrumb-item>
                <el-breadcrumb-item>职位管理</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div  style="width: 100%;position:relative;height:50px">
       <el-button type="primary" size="mid" style='position:absolute;right:0;top:10%' @click="createCh">添加职位</el-button>
         </div>
        <div>

<el-dialog :title="alter" :visible.sync="dialogFormVisible"  show-close style='z-index:100'>
<el-form :model="form"  ref="form">
  <el-form-item label="职位名称" :label-width="formLabelWidth" prop="kind">
      <el-input v-model="form.kind" auto-complete="off" placeholder='请输入职位名称' style='width:200px'></el-input>
    </el-form-item>
    <el-form-item label="所属部门" :label-width="formLabelWidth"  prop="depart">
            <el-select v-model="form.depart" style='width:200px' @change='updateLevel'>
            <el-option
                v-for="item in adeparts"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
<el-form-item label="直属上级" :label-width="formLabelWidth"  prop="level">
            <el-select v-model="form.level" style='width:200px'>
            <el-option
                v-for="item in level"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
<el-form-item label="权限范围" :label-width="formLabelWidth"  prop="range">
            <el-select v-model="form.range" multiple clearable placeholder="选择权限" style='width:200px'>
    <el-option
      v-for="item in ranges"
      :key="item.value"
      :label="item.label"
      :value="item.value">
    </el-option>
  </el-select>
          </el-form-item>


    </el-form>
 
  <div slot="footer" class="dialog-footer">
    <el-button type="primary" @click="addChar">确 定</el-button>
    <el-button @click="dialogFormVisible = false">取 消</el-button>
  </div>
 
</el-dialog> 
            
        </div>
  <el-table 
    v-for="depart in departs"
    :data="depart._child"
    border
    style="width: 100%;"
    :row-class-name="space"
    ref='table'>
    <el-table-column
      prop="full_name"
      :label="depart.full_name" 
      id='level'>
    </el-table-column>
    <el-table-column width='140px'
      label="操作">
      <template scope="scope">
        <el-button  type="text" size="small" @click="open4(scope.$index, depart.ddata)">修改</el-button>
        <el-button type="text" size="small" @click="open2(scope.$index, depart.ddata)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
  </div>
</template>

<script>
var user = localStorage.getItem('user');
var token = JSON.parse(user).token;
import { departList,levelList } from '../../api/api';
  export default {
    methods: {
      updateLevel(){
        let a = this.form.depart
        let para = {
          depart:a
        };
        levelList(para).then((res)=>{
          this.level = res.level;
           this.ranges = res.ranges;
        })
      },
      createCh(){
        var that = this;
            this.dialogFormVisible = true;
        //     function dia(){
        //    that.$refs.form.resetFields()
        // };
        // setTimeout(dia,1);
            // this.$refs.form.resetFields()
            this.form = {
                          kind: '',
                          depart:'',
                          level:'',
                          range:[]
                        }
            
      },
      deleteRow(index, rows) {
        rows.splice(index, 1);
      },
      open2(index,data) {
        console.log(data)
        if(data[index].number){
            this.$alert('当前职位有成员,无法删除职位', '删除职位', {
                 title:'删除职位',
                 type: 'warning',
                 customClass:'redwarn',
                 confirmButtonText: '确定'
        });
        }
        else{
            this.$confirm('是否确定要删除职位?', '删除职位', {
                  title:'删除职位',
                  customClass:'redwarn',
                  confirmButtonText: '确定',
                  cancelButtonText: '取消',
                  type: 'warning'
        }).then(() => {
           this.deleteRow(index,data);
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
         
          // department(this.tableData);
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
        }
        
      },
      open4(index,data){
        this.$confirm('若该部门有成员,修改后原部门所有成员将自动更新到新部门！', '修改提示', {
                customClass:'redwarn',
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(()=>{
          this.form = data[index];
          this.dialogFormVisible = true;
          this.updateLevel();

        })

       
      },
      addChar(){
        let b =this.form;
        let a = this.form.depart;
        let para = {
          depart:b
        };
        departList(para).then((res) => {
          //NProgress.done();
          this.departs = res;
        }).then(()=>{
           this.dialogFormVisible = false;
        })
      },
      space(row,index){
        let r = row.level;
        if(r){
          if(r.indexOf('经理')>-1){
              return 'mm'
            }
            if(r.indexOf('主管')>-1){
              return 'cc'
            }
        }
            
      }
    },

    data() {
      return {

        departs:[],
         adeparts:[],
         level:[],
        dialogFormVisible: false,
        in: '',
        form: {
          kind: '',
          depart:'',
          level:'',
          range:[]
        },
        bform: {
          kind: '',
          depart:'',
          level:'',
          range:[]
        },
        ranges: [],
        formLabelWidth: '70px'
      }
    },
    created(){
      let para = {}
        departList(para,token).then((res) => {
          //NProgress.done();
          this.departs = res.data;
          // this.adeparts = res.bb;

        }).then(()=>{
               // var cell = document.getElementsByClassName('cell');
               // cell.map(function(item,index){
               //    if(item.innerText =='')
               // })
        })
    },
    computed:{
      alter:function(){
        if(this.in === ''){
          return '创建职位'
        }
        return '修改职位'
      },
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

.mm{
  
}
.cc{

}
.mm td:nth-child(odd){
    padding-left: 50px
}
.cc td:nth-child(odd){
    padding-left: 100px
}
</style>