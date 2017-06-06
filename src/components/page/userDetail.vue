<template>
<div class="table">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-menu"></i> 资源管理</el-breadcrumb-item>
                <el-breadcrumb-item :to="{ path: '/home' }">{{secondTitle}}</el-breadcrumb-item>
                 <el-breadcrumb-item >{{student.name}}</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div style="float:left;width:28%">
          <div  class='UserDetailTitle' >
             <!--  <i class=el-icon-my-tongxunlu style="font-size:31px"></i> -->
              <span style="font-weight:600;font-size:22px">用户资料</span>
              <div  style='position:absolute;top:10px;right:50px'>
              <!-- <div class='addU' @click='addU'></div> -->
              <el-button v-if='this.sourceId==2' type="primary" size="mid" class='recognizeR' @click='recognizeResource' ><img src="../../../static/img/recognize.png" alt="" width='20' style="margin-top:-7px;margin-left:-55px" >
             <span style="position:absolute;top:15px;right:8px;font-size:12px">认证资源</span></el-button>
             <el-button v-if='this.sourceId==3' type="primary" size="mid" class='activateR' @click='activateResource'><img src="../../../static/img/activate.png" alt="" width='20' style="margin-top:-7px;margin-left:-55px">
             <span style="position:absolute;top:15px;right:8px;font-size:12px">激活资源</span></el-button>
             
              </div>
           </div>
          <el-form   id='aform'label-width="102px" label-position='left' style='border-top:1px solid #e8e8e8 ;padding-left:10px' >
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
             
              <span style='width:100px;float:left'>{{student.parent}}</span>
              
              <el-col :span="11">
              <span>{{student.parent_phone}}</span>
              </el-col>
            </el-form-item>
            <el-form-item label="">
              
              <span style='width:100px;float:left'>{{student.parent1}}</span>
             
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
            <el-form-item label="课程顾问(CC):" prop='teacher' v-if=''><!-- 判断是不是未认领 -->
              <span>{{student.teacher}}</span>
            </el-form-item>
          </el-form>
    </div>

<el-dialog title="修改用户" :visible.sync="dialogFormVisibleAdd"  :close-on-click-modal="no"   top='9.7%' id='userDetailDialog'>
<el-form ref="form" :model="form"  :rules='rule' label-width="80px">
  <el-form-item label="学生姓名" prop='name'>
    <el-input v-model="form.name" placeholder='请输入学生姓名'  style="width:142px" ></el-input>
  </el-form-item>
  <el-form-item label="性别" prop='sex' >
    <el-select v-model="form.sex" placeholder="请选择性别" style="width:142px">
      <el-option label="男" value="1"></el-option>
      <el-option label="女" value="0"></el-option>
    </el-select>
  </el-form-item>
    <el-form-item label="年龄"  prop='age' >
    <el-select v-model="form.age" placeholder="选择"  style="width:142px">
      <el-option label="2" value="2"></el-option>
      <el-option label="3" value="3"></el-option>
      <el-option label="4" value="4"></el-option>
      <el-option label="5" value="5"></el-option>
      <el-option label="6" value="6"></el-option>
      <el-option label="7" value="7"></el-option>
      <el-option label="8" value="8"></el-option>
      <el-option label="9" value="9"></el-option>
      <el-option label="10" value="10"></el-option>
      <el-option label="11" value="11"></el-option>
      <el-option label="12" value="12"></el-option>
      <el-option label="13" value="13"></el-option>
      <el-option label="14" value="14"></el-option>
      <el-option label="15" value="15"></el-option>
      <el-option label="16" value="16"></el-option>
      <el-option label="17" value="17"></el-option>
      <el-option label="18" value="18"></el-option>
     </el-select>
  </el-form-item>
  <el-form-item label="联系家长" prop='parent'>
    
    <el-input v-model="form.parent" placeholder='请输入家长姓名'  style="width:142px;margin-right:30px;float:left"></el-input>
    <el-select v-model="form.con" placeholder="请选择关系" prop='con' style="width:142px;margin-right:30px;float:left" >
    <el-option
      v-for="item in options"
      :key="item.value"
      :label="item.label"
      :value="item.value">
    </el-option>
    </el-select>
    <el-input v-model="form.phone"  placeholder='请输入手机号' prop='phone' style="width:142px;float:left"></el-input>
   
  </el-form-item>
  <el-form-item label="">
    <el-input v-model="form.parent1" placeholder='请输入家长姓名' prop='parent1' style="width:142px;margin-right:30px;float:left"></el-input>
    <el-select v-model="form.con1" placeholder="请选择关系" prop='con1' style="width:142px;margin-right:30px;float:left" >
      <el-option
      v-for="item in options"
      :key="item.value"
      :label="item.label"
      :value="item.value">
    </el-option>
    </el-select>
    <el-input v-model="form.phone1" placeholder='请输入手机号' prop='phone1'  style="width:142px;float:left"></el-input>
    <el-col :span="2">
   <span style="margin-left:10px;width:200px;color:grey" > (选填)</span>
    </el-col>
  </el-form-item>

<el-form-item label="所在地区" prop='city'>
    
    <el-select v-model="form.city" filterable placeholder="请选择城市" style="width:142px;margin-right:30px;float:left">
    <el-option-group
                        v-for="group in cities"
                        :key="group.city_name"
                        :label="group.city_name">
                        <el-option
                          v-for="item in group._child"
                          :key="item.id"
                          :label="item.city_name"
                          :value="item.id">
                        </el-option>
                      </el-option-group>
      <!-- <el-option
      v-for="item in cities"
      :key="item.value"
      :label="item.label"
      :value="item.value">
    </el-option> -->
    </el-select>
    <el-select v-model="form.region" placeholder="请选择城区" prop='region' style="width:142px;margin-right:30px;float:left">
      <el-option label="徐汇" value="1"></el-option>
      <el-option label="静安" value="0"></el-option>
    </el-select>
    <el-select v-model="form.add" placeholder="请选择地标" prop='add' style="width:142px;float:left">
      <el-option label="徐家汇" value="1"></el-option>
      <el-option label="美罗城" value="0"></el-option>
    </el-select>
  </el-form-item>

  <el-form-item label="就近校区" prop='school'>
    <el-select v-model="form.school" placeholder="请选择校区" style="width:142px" >
      <el-option label="徐汇校区" value="1"></el-option>
      <el-option label="静安校区" value="0"></el-option>
    </el-select>
  </el-form-item>

  <el-form-item label="来源渠道" prop='channel'>
    <el-select v-model="form.channel" placeholder="请选择渠道"  style="width:142px;margin-right:30px;float:left">
      <el-option label="转介绍" value="1"></el-option>
      <el-option label="上门" value="0"></el-option>
       <el-option label="线上" value="2"></el-option>
    </el-select>
    <el-input v-if='this.form.channel == 1' v-model="form.referee" placeholder='请输入学生姓名' @blur='searchStudent' style="width:142px;float:left" prop='referee'></el-input>
   <el-select v-if='this.form.channel == 2' v-model="form.online" placeholder="请选择渠道"  style="width:142px;float:left">
      <el-option label="大众点评" value="1"></el-option>
      <el-option label="美团" value="0"></el-option>
       <el-option label="饿了么" value="2"></el-option>
    </el-select>
   <span v-if='nostudent' style="margin-left:10px;width:200px;color:red;float:left" > {{warning}}</span>
  </el-form-item>
  <el-form-item label="更换TMK" prop='tmk'>
    <el-select v-model="form.school" placeholder="请选择TMK" style="width:142px" >
      <el-option label="徐锦江" value="1"></el-option>
      <el-option label="刘青云" value="0"></el-option>
    </el-select>
  </el-form-item>
  <el-form-item style='margin-top:20px'>
    <el-button type="primary" @click="onSubmit('form')">确定</el-button>
    <el-button>取消</el-button>
  </el-form-item>
</el-form>
</el-dialog>

<el-dialog title="认证资源" :visible.sync="dialogFormVisible2"  :close-on-click-modal="no"  top='33%'size='tiny' show-close style='z-index:100' class='schoolDialog'>
 
  <div slot="footer" class="dialog-footer" style='text-align:center'>
    <el-button @click="dialogFormVisible2 = false">认证为无效</el-button>
    <el-button type="primary" @click="dialogFormVisible3 = true;dialogFormVisible2 = false;">重新激活</el-button>
    <br><br><br>
    <span style="color:#ec6161;">*请在了解资源实际情况后做出判断</span>
  </div>
</el-dialog> 

 <el-dialog title="修改资源所属校区" :visible.sync="dialogFormVisible3"  :close-on-click-modal="no"  top='33%'size='tiny' show-close style='z-index:100' class='schoolDialog'>
<el-form :model="actSchool" id='actSchool1'>
  <el-form-item label="激活资源到:" prop='actToSchool'>
    <el-select v-model="actSchool.actToSchool" placeholder="请选择校区" style="width:142px" >
      <el-option label="徐锦江" value="1"></el-option>
      <el-option label="刘青云" value="0"></el-option>
    </el-select>
  </el-form-item>

    </el-form>
 
  <div slot="footer" class="dialog-footer" style='text-align:center;margin-top:-24px'>
    <el-button type="primary">确 定</el-button>
    <el-button @click="dialogFormVisible3 = false">取 消</el-button>
    <br>
  <span style="color:#ec6161;">*请在了解资源实际情况后做出判断</span>
  </div>
</el-dialog> 


    <div style="float:left;width:36%">
        <div  class='communityTitle' >
       <!--  <i class=el-icon-my-tongxunlu style="font-size:31px"></i> -->
        <span style="font-weight:600;font-size:22px">沟通记录({{this.getUserId}})</span>
        <div  style='position:absolute;top:10px;right:10px'><div class='addR' @click='addComm'></div></div>
         </div>
         <el-row v-for='item in items'class='listReturn' style='position:relative'>
  <el-col :span="4" style='text-align:right'><img :src="item.avtar" width='50' alt="" style='border-radius:50%;margin-top:10px;margin-right:8%'></el-col>
  <el-col :span="16">
  <div style='margin-top:10px'>{{item.name}}</div>
  <div style="font-size:14px;color:grey;margin-bottom:17px">{{item.content}}</div>
  </el-col>
  <el-col :span="4">
    <div style="font-size:15px;color:grey;margin-top:10px;text-align:right">{{item.time.substring(5)}}</div>
    <div class='editSpan' @click='editReturn(item.index,item)' v-if="new Date().getTime()-new Date(item.time).getTime()<7200000"></div>
  </el-col>
</el-row>
         <div class="block" >
  
            <el-pagination

              layout="prev, pager, next"
              :total="total"
              :current-page="currentPage"
               :page-size="pagesize"
               @current-change="handleCurrentChange">
            </el-pagination>
          </div>
    </div>

    <el-dialog :title="communityTitle" :visible.sync="dialogFormVisible"  :close-on-click-modal="no" size='tiny' show-close style='z-index:100' class='tagDialog'>
<el-form :model="commuForm" id='detailForm'>
  <el-form-item label="" >
      <el-input
          type="textarea"
          :autosize="{ minRows: 3, maxRows: 4}"
          placeholder="请输入内容"
          v-model="commuForm.remark">
        </el-input>
    </el-form-item>
  <el-form-item label="下次跟进时间:">
   <el-date-picker
      v-model="commuForm.remind_time"
      type="datetime"
      placeholder="选择日期时间">
    </el-date-picker>
    </el-form-item>

    </el-form>
 
  <div slot="footer" class="dialog-footer">
    <el-button type="primary" @click="commuFormSubmit('commuForm')">确 定</el-button>
    <el-button @click="dialogFormVisible = false">取 消</el-button>
  </div>
</el-dialog> 


<div style="float:left;width:36%">
        <div  class='addUserTitle' >
       <!--  <i class=el-icon-my-tongxunlu style="font-size:31px"></i> -->
        <span style="font-weight:600;font-size:22px;margin-left:20px">邀约记录({{this.getUserId}})</span>
         </div>
         <el-row v-for='item in items1'class='listReturn' style='position:relative;margin-left:30px'>
          <div style="font-weight:600;magin-right:5px">邀约日期:{{item.date}}</div>
          <div class='inviteRecord'>邀约课程:<span style="color:grey">{{item.name}}</span> </div>
          <div class='inviteRecord'>上课老师:<span style="color:grey">{{item.teacher}}</span></div>
          <div class='inviteRecord'>记录时间:<span style="color:grey">{{item.recordTime}}</span></div>
          <div class='inviteRecord'>到访设置:<span :style="{color:item.setting == '已到访'?'blue':'grey'}">{{item.setting}}</span></div>
</el-row>
         <div class="block" v-if="items1 != ''">
  
            <el-pagination
              layout="prev, pager, next"
              :total="total"
              :current-page="currentPage"
               :page-size="pagesize"
               @current-change="handleCurrentChange">
            </el-pagination>
          </div>
    </div>
  </div>
</template>
<script>
var token
import { cityList,create_community,activateResource,recognizeResource} from '../../api/api';
import { mapGetters } from 'vuex';

  export default {
    data() {
      return {
        sourceId:3,
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
        items:[{avtar:'../../../static/img/img.jpg',name:'苏里',tag:['暑期班','定期班'],content:'已发短信,周五再次沟通，比较有意向',time:'2017-6-6 15:09',index:0},
        {name:'李东',tag:['定期班'],content:'已发短信,周五再次沟通，比较有意向,多次询问已经,不知道还有没有问题',time:'2017-3-17 8:30',index:1},
        {name:'章程',tag:['暑期班'],content:'已发短信,周一再次沟通，可能有意向',time:'2017-3-17 8:30',index:2},
        {name:'苏里',tag:['暑期班','定期班'],content:'已发短信,周五再次沟通，比较有意向',time:'2017-3-17 8:30',index:3}],

        items1:
        [{name:'art4 大师班（6-7岁）',date:'2017-3-17 8:30',recordTime:'2017-3-17 8:30',teacher:"李东",setting:'未到访'},
        {name:'art4 大师班（6-7岁）',date:'2017-3-17 8:30',recordTime:'2017-3-17 8:30',teacher:"王鹏",setting:'已到访'}],
        dialogFormVisible:false,
        dialogFormVisibleAdd:false,
        dialogFormVisible2:false,
        dialogFormVisible3:false,
        no:false,
        number:10,
        warning:'*系统中没有该成员',//以后改成调服务显示
        boxes:[{label:'暑期班',value:0},{label:'定期班',value:1},
        {label:'暑期班2',value:2},{label:'定期班2',value:3},
        {label:'暑期班3',value:4},{label:'定期班3',value:5},
        {label:'暑期班4',value:6},{label:'定期班4',value:7}],
        commuForm:{
          remark:'',
          remind_time:''
        },
        actSchool:{
          actToSchool:''
        },
        currentPage: 1, //页数
        pagesize: 4, //默认每页
        total:40,  
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
          referee:'',
          online:''
        },
        rule: {
          name: [
            { required: true,  message: '请输入姓名',trigger: 'blur' },
          ],
          sex: [
            { required: true, trigger: 'blur' },
          ],
          parent: [
            { required: true, trigger: 'blur' },
          ],
          city: [
            { required: true, trigger: 'blur' },
          ],
          school: [
            { required: true, trigger: 'blur' },
          ],
          channel: [
            { required: true, trigger: 'blur' },
          ],
        },    
        cities:[],
        nostudent:false,
        in:''

      }
    },
    methods: {
      activateResource(){
        this.$confirm('是否确认激活该资源?', '激活资源', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
         customClass:'green',
        }).then(() => {
          let para = {option:'2',
                      customer_id:uid
        }
          activateResource(para,token).then(res=>{
            
          })
        })
       },
     recognizeResource(){
      this.dialogFormVisible2 = true;
     },

      commuFormSubmit(formName){//提交 添加沟通记录
      this.commuForm.uid = this.getUserId
      create_community(this.commuForm,token).then(()=>{
        this.dialogFormVisible=false
      })
     },
      addComm(){//点击添加沟通记录
        console.log(this.getUserId)
        this.commuForm.remind_time = '';
        this.commuForm.remark = '';
        this.dialogFormVisible=true
      },
      editReturn(index,item){//点击修改沟通记录
        this.commuForm.remark = item.content
        this.commuForm.remind_time = item.time;
        this.dialogFormVisible=true
        
      },
      addU(){
        // console.log(this.getUserId)
        // this.commuForm.record = '';
        // this.commuForm.checkList = [];
        this.dialogFormVisibleAdd=true
      },
      handleCurrentChange: function(val) {  //变更页数
            this.currentPage = val;
            this.fetchData();
      },
      
      searchStudent(){
        if(this.form.referee){
          this.nostudent = true; //调服务查询
        }
      },

    },
    computed:{
      secondTitle(){
        if(this.sourceId===1){
          return '我的资源'
        }else if(this.sourceId ===2){
          return '无需求资源'
        }else if(this.sourceId ===3){
          return '无效资源'
        }
      },
      communityTitle(){
          if(this.in === ''){
          return '添加沟通记录'
        }else{

        return '修改沟通记录'
        }
      
      },
       ...mapGetters([
                'getUserId'
      // ...
            ]),
    },
    beforeCreate(){
           let user = localStorage.getItem('user');
            token =  JSON.parse(user).token;
        },
    created(){
      // console.log(this.getUserId)//通过该id调服务
      cityList(token).then((res)=>{
          // console.log(res)
          this.cities = res.data
        })
    }
  }
</script>
<style >
.UserDetailTitle{
  padding:10px;
  position: relative;
  background:url(../../../static/img/contact.png) left center/25px  no-repeat ;
  padding-left:27px
}
.communityTitle{
padding:10px;
  position: relative;
  background:url(../../../static/img/comuni.png) left center/30px  no-repeat ;
  padding-left:30px
}
.addUserTitle{
  padding:10px;
  position: relative;

}
#aform .el-form-item{
  margin-bottom: 0
}
#aform .el-form-item__label{
  padding:8px 12px 5px 0;
}
#aform .el-form-item__content{
  line-height: 30px
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
.activateR{
  background-color: #dac779;
  border-color:#dac779;
  height: 30px;
  line-height: 0;
  width: 80px
}
.recognizeR{
background-color: #f29c9c;
  border-color:#f29c9c;
  height: 30px;
  line-height: 0;
  width: 80px
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
.addU{
  width: 30px;
  height: 30px;
  background-image: url(../../../static/img/editU.png);
  background-size: 30px 30px;
  cursor: pointer;
}
.addU:hover{
   background-image: url(../../../static/img/editU_h.png);
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
#userDetailDialog .el-dialog .el-dialog__body {
  padding:10px 20px 0 20px;
}
#userDetailDialog .el-dialog--small{
  width:56%;
}
.el-dialog .el-dialog__header{
    background-color: #1fb5ad;
    padding: 20px 20px 20px;
}
.el-dialog .el-dialog__title{
    color:white;
}
.inviteRecord{
  font-size:14px;
  margin:10px;
}
.schoolDialog .el-dialog__body{
  text-align: center;
  /*color:#ec6161;*/
}
.green .el-message-box__header{
    background-color: #1fb5ad;
    padding: 20px 20px 20px;
}
.green .el-message-box__title{
    color:white;
}
</style>