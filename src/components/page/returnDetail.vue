<template>
<div class="table">
<div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-menu"></i> 客户管理</el-breadcrumb-item>
                <el-breadcrumb-item :to="{ path: '/home' }">学员回访</el-breadcrumb-item>
                 <el-breadcrumb-item >用户资料</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div style="float:left;width:30%">
        <div  class='addUserTitle' >
        <i class=el-icon-my-tongxunlu style="font-size:31px"></i>
        <span style="font-weight:600;font-size:22px">用户资料</span>
         </div>


<el-form ref="form" :model="form"   label-width="102px" label-position='left' style='border-top:1px solid #e8e8e8 ;padding-left:10px' >
  <el-form-item label="姓名:" prop='name'>
    <span>{{student.name}}</span>
  </el-form-item>
  <el-form-item label="性别:" prop='sex' >
    <span>{{student.sex}}</span>
  </el-form-item>
  <el-form-item label="年龄:" prop='age' >
    <span>{{student.age}}</span>
  </el-form-item>
  <el-form-item label="家长:" prop='parent'>
    <el-col :span="7">
    <span>{{student.parent}}</span>
    </el-col>
    <el-col :span="11">
    <span>{{student.parent_phone}}</span>
    </el-col>
  </el-form-item>
  <el-form-item label="">
    <el-col :span="7">
    <span>{{student.parent1}}</span>
    </el-col>
    <el-col :span="11">
    <span>{{student.parent1_phone}}</span>
    </el-col>
  </el-form-item>
  <el-form-item label="渠道来源:" prop='channel' >
    <span>{{student.channel}}</span>
  </el-form-item>
  <el-form-item label="校区:" prop='school' >
    <span>{{student.school}}</span>
  </el-form-item>
  <el-form-item label="录入时间:" prop='time' >
    <span>{{student.time}}</span>
  </el-form-item>
  <el-form-item label="课程顾问(CC):" prop='teacher' >
    <span>{{student.teacher}}</span>
  </el-form-item>
</el-form>
    </div>

    <div style="float:left;width:40%">
        <div  class='addUserTitle' >
        <i class=el-icon-my-tongxunlu style="font-size:31px"></i>
        <span style="font-weight:600;font-size:22px">回访记录({{this.getUserId}})</span>
        <div  style='position:absolute;top:10px;right:10px'><div class='addR' @click='addReturn'></div></div>
         </div>
         <el-row v-for='item in items'class='listReturn' style='position:relative'>
  <el-col :span="4" style='text-align:right'><img src="../../../static/img/img.jpg" width='50' alt="" style='border-radius:50%;margin-top:10px;margin-left:15px;margin-right:8%'></el-col>
  <el-col :span="16">
  <div style='margin-top:10px'>{{item.name}}</div>
  <div style="font-size:14px;color:grey">{{item.content}}</div>
  <div style="height:30px"><el-tag type='success' v-for='t in item.tag' class='tagTag'>{{t}}</el-tag></div>
  </el-col>
  <el-col :span="4">
    <div style="font-size:15px;color:grey;margin-top:10px;text-align:right">{{item.time}}</div>
    <div class='editSpan' @click='editReturn(item.index,item)'></div>
  </el-col>
</el-row>
         <!-- <div style='position:relative'>
          <div v-for='item in items'class='listReturn' style='position:relative'>
          <span style='position:absolute;top:-5px;left:5px'> <img src="../../../static/img/img.jpg" width='40' alt="" style='border-radius:50%;margin-top:10px'></span>
          
           <span style='font-size:14px;position:absolute;top:10px;left:50px'>{{item.name}}</span>
           <span style='font-size:10px;color:grey;position:absolute;top:30px;left:50px'>{{item.content}}</span>
           <span style='font-size:10px;color:grey;position:absolute;top:10px;right:10px'>3-17 8:30</span>
           <div  style='position:absolute;top:40px;right:10px'><div class='editSpan' @click='editReturn(item.index,item)'></div></div>
           <el-tag type='success' v-for='t in item.tag' class='tagTag'>{{t}}</el-tag>
          </div>
           
         </div> -->
         <div class="block">
  
            <el-pagination
              layout="prev, pager, next"
              :total="total"
              :current-page="currentPage"
               :page-size="pagesize"
               @current-change="handleCurrentChange">
            </el-pagination>
          </div>
    </div>

    <el-dialog title="添加回访记录" :visible.sync="dialogFormVisible"  :close-on-click-modal="no" show-close style='z-index:100' class='tagDialog'>
<el-form :model="returnform" id='detailForm'>
  <el-form-item label="" >
      <el-input
          type="textarea"
          :autosize="{ minRows: 2, maxRows: 4}"
          placeholder="请输入内容"
          v-model="returnform.record">
        </el-input>
    </el-form-item>
  <el-form-item label="回访标签：">
  <br>
      <el-checkbox-group v-model="returnform.checkList">
    <el-checkbox v-for="box in boxes" :label="box.value" :value='box.value'><el-tag type='success'>{{box.label}}</el-tag></el-checkbox>
  </el-checkbox-group>
    </el-form-item>

    </el-form>
 
  <div slot="footer" class="dialog-footer">
    <el-button type="primary">确 定</el-button>
    <el-button @click="dialogFormVisible = false">取 消</el-button>
  </div>
</el-dialog> 
  </div>
</template>
<script>
var user = localStorage.getItem('user');
var token = JSON.parse(user).token;
import { cityList} from '../../api/api';
import { mapGetters } from 'vuex';

  export default {
    data() {
      return {
        student:{
  name:'张无忌',
  sex:'男',
  age:'16',
  parent:'余春娇(妈妈)',
  parent_phone:'13596879024',
  parent1:'张志明(父亲)',
  parent1_phone:'13596879024',
  channel:'大众点评',
  school:'徐汇校区',
  time:'2017-05-25-12:00',
  teacher:'林俊杰'
},
        items:[{name:'苏里',tag:['暑期班','定期班'],content:'已发短信,周五再次沟通，比较有意向',time:'3-17 8:30',index:0},
        {name:'李东',tag:['定期班'],content:'已发短信,周五再次沟通，比较有意向,多次询问已经,不知道还有没有问题',time:'3-17 8:30',index:1},
        {name:'章程',tag:['暑期班'],content:'已发短信,周一再次沟通，可能有意向',time:'3-17 8:30',index:2},
        {name:'苏里',tag:['暑期班','定期班'],content:'已发短信,周五再次沟通，比较有意向',time:'3-17 8:30',index:3}],
        dialogFormVisible:false,
        no:false,
        number:10,
        warning:'*系统中没有该成员',//以后改成调服务显示
        boxes:[{label:'暑期班',value:0},{label:'定期班',value:1},
        {label:'暑期班2',value:2},{label:'定期班2',value:3},
        {label:'暑期班3',value:4},{label:'定期班3',value:5},
        {label:'暑期班4',value:6},{label:'定期班4',value:7}],
        returnform:{
          record:'',
          checkList:[]
        },
        form: {
          name: '',
          sex: '',
          parent:'',
          parent1:'',
          con:'',
          con1:'',
          phone:'',
          phone1: '',
          city: '',
          region: '',
          add: '',
          school: '',
          channel: '',
          referee:''
        },
        currentPage: 1, //页数
        pagesize: 4, //默认每页
        total:40,      //总页数

      }
    },
    methods: {
     

      onSubmit(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            alert('submit!');
          } else {
            console.log('error submit!!');
            return false;
          }
        });

      },
      addReturn(){
        console.log(this.getUserId)
        this.returnform.record = '';
        this.returnform.checkList = [];
        this.dialogFormVisible=true
      },
      handleCurrentChange: function(val) {  //变更页数
            this.currentPage = val;
            this.fetchData();
      },
      editReturn(index,item){
        this.returnform.record = item.content
        this.dialogFormVisible=true
        let arr = [];
        this.boxes.map(v=>{
          for(let i =0;i<item.tag.length;i++){

          if(v.label == item.tag[i] ){
            arr.push(v.value)
          }
          }
        })
        console.log(arr)
        this.returnform.checkList = arr
      }
    },
    computed:{
      options(){
        if(this.form.sex == ''){
          return
        }else if(this.form.sex ==1){
            return [{label:'父子',value:'0'},{label:'母子',value:'1'},{label:'祖孙',value:'2'}]
          }else{
            return [{label:'父女',value:'0'},{label:'母女',value:'1'},{label:'祖孙',value:'2'}]
          }
      },
       ...mapGetters([
                'getUserId'
      // ...
            ]),
    },
    created(){
      console.log(this.getUserId)//通过该id调服务
      // cityList(token).then((res)=>{
      //     // console.log(res)
      //     this.cities = res.data
      //   })
    }
  }
</script>
<style scoped>
.addUserTitle{
  padding:10px;
  position: relative;

}
.el-form-item{
  margin-bottom: 0
}
.listReturn{
/*min-height: 100px;*/
/*height: auto;*/
border-top:1px solid #e8e8e8;
/*border-bottom:1px solid grey;*/
}
.listReturn:last-child{
border-bottom:1px solid #e8e8e8;
/*border-bottom:1px solid grey;*/
}
.el-tag--success{
  background-color: #1fb5ad;
  border-color: #bcf1d4;
  color:#FFFFFF;
  border-radius: 25px;
    
}
.tagTag{
  /*margin-top:48px;*/
  /*position: absolute;*/
  /*bottom:0;*/
}
.listReturn :nth-child(6){
  margin-left:48px
}
.editSpan{
  height: 30px;
  background: url(../../../static/img/edit.png) right/30px 30px no-repeat;
  cursor: pointer;
  margin-top: 15px;
}
.editSpan:hover{
   background-image: url(../../../static/img/edit_h.png);
  }

  .addR{
  width: 30px;
  height: 30px;
  background-image: url(../../../static/img/addR.png);
  background-size: 30px 30px;
  cursor: pointer;
}
.addR:hover{
   background-image: url(../../../static/img/addR_h.png);
  }
  .block{
  text-align: center;
  margin-top:10px;
}
#detailForm .el-form-item .el-form-item__content .el-checkbox{
  margin-left: 15px
}
</style>