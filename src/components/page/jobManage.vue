
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
<el-form :model="form">
  <el-form-item label="职位名称" :label-width="formLabelWidth" prop="kind">
      <el-input v-model="form.kind" auto-complete="off" placeholder='请输入职位名称' style='width:200px'></el-input>
    </el-form-item>
    <el-form-item label="所属部门" :label-width="formLabelWidth"  prop="depart">
            <el-select v-model="form.depart" style='width:200px'>
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
    :data="depart.ddata"
    border
    style="width: 100%;">
    <el-table-column
      prop="kind"
      :label="depart.label" >
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
import { character } from '../../api/api';
  export default {
    methods: {
      createCh(){
        var that = this;
            this.form.name = '';
            this.dialogFormVisible = true;
            
      },
      deleteRow(index, rows) {
        rows.splice(index, 1);
      },
      open2(index,data) {
        
            this.$confirm('是否确定要删除该角色?', '删除角色', {
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
          character(this.charData);
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
        this.form.name = data[index].kind;
        var that = this;
        function dia(){
          that.$refs.tree.setCheckedKeys(data[index].number);
        };
        setTimeout(dia,1);
      },
      addChar(){
        let b =this.form;
        let a = this.form.depart;
        this.departs.map(function(item,index){

          if(a ==item.id){
           let c =b.leave; //=1
            let d = item.ddata.length;
            let count = 0;
            let rcount = 0;
              if(d=0){
                item.ddata.push(b);
              }else{
                item.ddata.map(function(data,indexi){
                  if(data.level ==0){
                    rcount ++
                  }
                    if(c != data.level&& c > data.level){
                      count++
                    }

              })
                if(c ==0){

                item.ddata.splice(rcount-1,0,b)
                }
                if(c ==1){
                  item.ddata.splice(count-1,0,b)
                }
                if(c ==2){

                }
              }
              



            for(let i=0;i<d;i++){
                if(c == item.ddata[i].level){
                    count ++

                  item.ddata.splice(i+1,0,b)
                  return
                }else{ //没有对应的lead
                  item.ddata[d-1].push(b)
                }
            }
            item.ddata[count] 


            item.ddata.push(b) //没有level的情况
          }
        })
        // let a =this.$refs.tree.getCheckedKeys();
        // let b = this.form.name;
        // let c = this.in;
        // if(a&&b&&c ===''){
        // this.charData.push({ kind: b,
        //   number: a});
        // this.dialogFormVisible = false;

        // }else if(a&&b&&c !==''){
        //     this.charData[c].kind = b ;
        //     this.charData[c].number = a ;
        //      this.dialogFormVisible = false;
        //      this.in = '';
        // }
        // character(this.charData);
        // this.$refs.tree.setCheckedKeys([]);
        // this.form.name = '';
        // console.log(this.charData);
      }
    },

    data() {
      return {
        departs:[{
          id:'sale',
          label:'销售部',
          ddata:[
          {
          level:0,
          kind: '销售经理',
          number: [1,2]
        },
        {
          level:1,
          kind: 'TMK主管',
          number: [1,2]
        },{
          level:3,
          kind: 'TMK',
          number:[2,3]
        },{
          level:1,
          kind: 'CC主管',
          number:[2,4]
        },{
          level:3,
          kind: 'CC',
          number: [1,4]
        }
        ]

        },{
          id:'tech',
          label:'技术部',
          ddata:[
        ]

        },
        
],
 adeparts:[{label:'销售部',value:'sale'},{label:'技术部',value:'tech'}],
 level:[{label:'无',value:'0'},{label:'销售经理',value:'1'},{label:'TMK主管',value:'2'},{label:'CC主管',value:'22'}],
        dialogFormVisible: false,
        in: '',
        form: {
          kind: '',
          depart:'',
          leave:'',
          range:''
        },
        ranges: [{
          value: '选项1',
          label: '黄金糕'
        }, {
          value: '选项2',
          label: '双皮奶'
        }, {
          value: '选项3',
          label: '蚵仔煎'
        }, {
          value: '选项4',
          label: '龙须面'
        }, {
          value: '选项5',
          label: '北京烤鸭'
        }],
        formLabelWidth: '70px'
      }
    },
    created(){
        let self = this;
        let para = {
          charData:this.charData
        };
        character(para).then((res) => {
          //NProgress.done();
          this.charData = res;
        })
    },
    computed:{
      kinds:function(){
        return ['c','d']
      },
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
</style>