
<template>
<div class="table">
<div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-menu"></i> 组织架构</el-breadcrumb-item>
                <el-breadcrumb-item>职位管理</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div  class='addjob' style="width: 100%;position:relative;height:50px">
       <el-button type="primary" size="mid" style='position:absolute;right:0;top:10%' @click="createCh">添加职位</el-button>
         </div>
        <div>

<el-dialog :title="alter" :visible.sync="dialogFormVisible" :close-on-click-modal="no" show-close style='z-index:100'>
<el-form :model="form"  ref="form">
  <el-form-item label="职位名称" :label-width="formLabelWidth" prop="full_name">
      <el-input v-model="form.full_name" auto-complete="off" placeholder='请输入职位名称' style='width:200px'></el-input>
    </el-form-item>
    <el-form-item label="所属部门" :label-width="formLabelWidth"  prop="department">
            <el-select v-model.number="form.did" style='width:200px' @change='updateLevel'>
            <el-option
                v-for="item in departments"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
<el-form-item label="直属上级" :label-width="formLabelWidth"  prop="job_id">
            <el-select v-model="form.pid" style='width:200px'>
            <el-option
                v-for="item in levels"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
<el-form-item label="权限范围" :label-width="formLabelWidth"  prop="role">
            <el-select v-model="form.role" multiple clearable placeholder="选择权限" style='width:200px'>
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
    <el-button type="primary" @click="addChar(form)">确 定</el-button>
    <el-button @click="dialogFormVisible = false">取 消</el-button>
  </div>
 
</el-dialog> 
            
        </div>
  <el-table 
    v-for="depart in departs"
    :data="depart._child"
    border
    style="width: 100%;"
   
    ref='table'>
    <el-table-column
      prop="full_name"
      :label="depart.full_name" 
      id='level'>
    </el-table-column>
    <el-table-column width='140px'
      label="操作">
      <template scope="scope">
        <el-button  type="text" size="small" @click="open4(scope.$index, depart._child)">修改</el-button>
        <el-button type="text" size="small" @click="open2(scope.$index, depart._child)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
  </div>
</template>

<script>
var token
import { departList,create_departList,put_departList,delete_departList,levelList,department,character,detail_departList } from '../../api/api';
  export default {
    methods: {
      updateLevel(){
        let para = {did:this.form.did}
        departList(para,token).then(res=>{
          // console.log(res)
          this.levels = res.data[0]._child.map(item=>{
            return {value:item.job_id,label:item.full_name}
          })
          console.log(this.levels)
        })
        
      },
      createCh(){//点击创建按钮
            this.dialogFormVisible = true;
            this.in = '';
            this.levels = [];
            this.form = {
                          full_name: '',
                          did:'',
                          pid:'',
                          status:'',
                          pid:'',
                          count:0,
                          role:[],
                          status:'1'
                          }            
      },
      deleteRow(index, rows) {
        rows.splice(index, 1);
      },
      open2(index,data) {//删除职位
        // console.log(data)
        if(data[index].count != 0){
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
          let para = {
            job_id:data[index].job_id
          }
          delete_departList(para,token).then(res=>{
            departList(para,token).then((res) => {
          // this.filterData(res);
           this.departs = res.data;
        })
          });
           // this.deleteRow(index,data);
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
        }
        
      },
      open4(index,data){//点击修改
        this.$confirm('若该部门有成员,修改后原部门所有成员将自动更新到新部门！', '修改提示', {
                customClass:'redwarn',
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(()=>{

          this.in = index;
          this.form.did = data[index].did-0;
          this.updateLevel();
            this.$nextTick(function(){
              this.levels.push({label:'无',value:0})
            })
          this.form.full_name= data[index].full_name;
          this.form.pid= data[index].pid-0;
          // if(this.form.pid == 0){
          // }
          this.form.status= data[index].status;
          this.form.job_id= data[index].job_id;
          let para = {
            job_id:this.form.job_id
          }
          detail_departList(para,token).then(res=>{
            // console.log(res)
              this.form.role = res.data.role.map(item=>{
                return item-0;
              });
          })
          this.form.count= data[index].count;
          this.dialogFormVisible = true;
          this.levels = data.map(item=>{
            return {value:item.job_id,label:item.full_name}
          })
          // this.updateLevel();

        })

       
      },
      addChar(formName){
        // this.$refs[formName].validate((valid) => {

        let f = this.form;
       
        let i = this.in;
        // if(valid){
            if(i !== ''){ 
                          let para = {}
                          let a = {full_name:this.form.full_name,
                                    did:this.form.did,
                                    pid:this.form.pid,
                                    job_id:this.form.job_id,
                                    role:this.form.role.join(','),
                                    status:this.form.status}
                          put_departList(a,token).then((res) => {
                             departList(para,token).then((res) => {
          // this.filterData(res);
           this.departs = res.data;
        })
                          })
              }else{
                let para = {}
                 f.role = f.role.join(',');
                    create_departList(f,token);
                     departList(para,token).then((res) => {
          // this.filterData(res);
           this.departs = res.data;
        })
                  }

        this.in = '';
        this.dialogFormVisible = false;
        // }else{
        //       console.log('error submit!!');
        //       return false;
        //       }
        // });
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
      copyArr : function (arr){
        return arr.map((e)=>{
            if(typeof e === 'object'){
                return Object.assign({},e)
            }else{
                return e
            }
        })
      },
      // filterData(res){
      //   if(res.data ==''){//判断是否有数据
      //         return
      //     }else{
      //         this.departs = res.data;
      //         res.data.map((item,index,arr)=>{
      //           if(item._child ==''){//判断是否有经理级别
      //             return 
      //           }else{
      //               let{_child} = item;
      //             var dd =this.copyArr(_child);
      //             _child.map((a,b,c)=>{
      //               if(a._child ==''){//判断是否有主管级别
      //                 return
      //               }else{
      //                 let {_child} = a
      //                 console.log(_child)
      //                 var l = _child.length;
      //                 for(let i =0;i<l;i++){
      //                 if(_child[i]._child){
      //                       dd.push(_child[i]);
      //                       dd.push.apply(dd,_child[i]._child)
      //                     }else{
      //                       dd.push(_child[i])
      //                     }
      //                 }
      //               }
                    
      //             })
      //           }
                  
      //         item.children = dd;
      //         })
      //     }
      // }
    },

    data() {
      return {
        departs:[],
        departments:[],
        levels:[],
        dialogFormVisible: false,
        in: '',
        form: {
          full_name: '',
          did:'',
          pid:'',
          job_id:'',
          count:0,
          role:[],
          status:1,
        },
        ranges: [],
        formLabelWidth: '70px',
        no:false,  //取消点击关闭
      }
    },
    beforeCreate(){
           let user = localStorage.getItem('user');
            token =  JSON.parse(user).token;
        },
    created(){
      let para = {}
        departList(para,token).then((res) => {
          // this.filterData(res);
           this.departs = res.data;
        }).then(()=>{
            department(token).then(res=>{
              // console.log(res)
              this.departments = res.data.map(item=>{
                return { value: item.job_id, label: item.full_name };
              })
              character(token).then(res=>{
                this.ranges = res.data.map(item=>{
                return { value: item.roleid, label: item.name };
              })
              })
            })

            
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
.addjob .el-button--primary{
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
/*.el-tree-node__children .el-tree-node{
    float:left;
}*/
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