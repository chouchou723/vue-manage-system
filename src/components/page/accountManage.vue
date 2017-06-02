<template>
<div>
    <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-menu"></i> 组织架构</el-breadcrumb-item>
                <el-breadcrumb-item>账号管理</el-breadcrumb-item>
            </el-breadcrumb>
    </div>
        <div  class= 'accou' >
              <div class="h1">
                <h2>
               账号管理({{number}}人)
                </h2>
                      <div  class='oneSelect'  >
                       <el-select v-model="value" clearable placeholder="选择校区" filterable @change="updateList">
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
                      </div>
                      <div  class='twoSelect' >
                        
                      <el-select v-model="value1" clearable placeholder="选择部门" @change="updateList">
                  <el-option
                    v-for="item in options1"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
                      </div>
                      <div  class='threeSelect'  >
                        
                      <el-select v-model="value2" clearable placeholder="选择职位" @change="updateList">
                  <el-option
                    v-for="item in options2"
                    :key="item.job_id"
                    :label="item.full_name"
                    :value="item.job_id">
                  </el-option>
                </el-select>
                      </div>
                      <div style="position:absolute;top:0;right:100px;width:200px">
                        <el-input
                            placeholder="请输入手机号或姓名"
                            icon="search"
                            v-model="input2"
                            :on-icon-click="handleIconClick">
</el-input>
                      </div>
       <el-button type="primary" size="mid" class='buttonAdd' @click="createCh('aform')">添加账号</el-button>
              </div>
        
<el-dialog :title="alter" :visible.sync="dialogFormVisible"  :close-on-click-modal="no"   >
      
      <el-form :model="aform" :rules="rules2" ref="aform">
        <el-form-item label="登录账号" :label-width="formLabelWidth" prop="uname">
            <el-input v-model="aform.uname"  placeholder='请输入邮箱地址' :style='{width:inputLabelWidth}'></el-input>
          </el-form-item>
          <el-form-item label="姓名" :label-width="formLabelWidth"  prop="name">
            <el-input v-model="aform.name" auto-complete="off" placeholder='请输入用户姓名' :style='{width:inputLabelWidth}'></el-input>
          </el-form-item>
          <el-form-item label="性别" :label-width="formLabelWidth"  prop="sexual">
            <el-select v-model="aform.sex" :style='{width:inputLabelWidth}'>
              <el-option label="男" value="1"></el-option>
              <el-option label="女" value="2"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="手机号码" :label-width="formLabelWidth"  prop="phone">
            <el-input v-model="aform.tel" auto-complete="off" placeholder='请输入手机号码' :style='{width:inputLabelWidth}'></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="pwd"  :label-width="formLabelWidth">
              <el-input type="password" v-model="aform.pwd" auto-complete="off" :style='{width:inputLabelWidth}'></el-input>
            </el-form-item>
            <el-form-item label="所属校区" :label-width="formLabelWidth"  prop="region" style='float:left;margin-right:10px'>
                    <el-select v-model="aform.region" filterable :style='{width:inputLabelWidth}' @change='campusGet'>
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
                    </el-select>
            </el-form-item>
             <el-form-item  :label-width="formLabelWidth"  prop="school" style='height:36px;margin-left: 200px'>
            <el-select
              v-model="aform.school"
              multiple
              filterable
              remote
              placeholder="请输入关键词"
              :remote-method="remoteMethod"
              :loading="loading">
              <el-option
                v-for="item in schools"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="部门" :label-width="formLabelWidth"  prop="did">
            <el-select v-model="aform.did" :style='{width:inputLabelWidth}' @change="updateJobList">
            <el-option
                v-for="item in options1"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
            <el-form-item label="职位" :label-width="formLabelWidth"  prop="job_id">
            <el-select v-model="aform.job_id" :style='{width:inputLabelWidth}'>
            <el-option
                v-for="item in jobs"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="使用状态" :label-width="formLabelWidth"  prop="fla">
            <el-select v-model="aform.fla" :style='{width:inputLabelWidth}'>
            <el-option label="正常" value="0"></el-option>
              <el-option label="停用" value="1"></el-option>
            </el-select>
          </el-form-item>

      </el-form>
 <div slot="footer" class="dialog-footer">
    <el-button type="primary" @click="addAccount('aform')">确 定</el-button>
           <el-button @click="dialogFormVisible = false">取 消</el-button>
  </div>
</el-dialog> 

        </div>
        <div id="table">
          <el-table
    :data="accountData"
    border
    >
    <el-table-column
      prop="avatar"
      label="头像">
      <template scope="scope" >
        <span><img :src="scope.row.avatar" alt="" width="47" style="border-radius:50%;margin-bottom:-7px"></span>
      </template>
    </el-table-column>
    <el-table-column
      prop="name"
      label="登录名">
    </el-table-column>
    <el-table-column
      prop="uname"
      label="姓名">
    </el-table-column>
    <el-table-column
      prop="tel"
      label="手机">
    </el-table-column>
    <el-table-column
      prop="school"
      label="校区">
    </el-table-column>
    <el-table-column
      prop="job_name"
      label="职位">
    </el-table-column>
    <el-table-column
      prop="department_name"
      label="部门">
    </el-table-column>
    <el-table-column
      prop="last_login_time"
      label="最近登录时间">
    </el-table-column>
    <el-table-column
      prop="loginTime"
      label="登录次数">
    </el-table-column>
    <el-table-column
      prop="status"
      label="使用状态"
      column-key='status'>
      <template scope="scope" >
        <span class='redBlack'>{{scope.row.status}}</span>
      </template>
    </el-table-column>

    <el-table-column
      label="操作">
      <template scope="scope">
        <el-button type="text" size="small" @click="editCh(scope.$index, accountData)">修改</el-button>
        <el-button type="text" size="small" @click="open2(scope.$index, accountData)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
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
  
</div>

</template>

<script>
var token 
import { account,campusList,cityList,sdjList ,departList,put_account,create_account,delete_account,department} from '../../api/api';
export default {
    data() {
      var nan = (rule,value,callback) =>{
        if(value === ''){
          callback('请选择')
        }else if(typeof value == 'number'){
           callback();
        }
      }
      var validatePass = (rule, value, callback) => {
        if (value.length <6) {
          callback(new Error('请输入至少6位'));
        } else {
          var regex = new RegExp('(?=.*[0-9])(?=.*[a-zA-Z]).{6,30}');
          if(!regex.test(value)){
            callback(new Error('密码中必须包含字母、数字，至少6个字符，最多30个字符'));
          }
          if (this.aform.checkPass !== '') {
            this.$refs.aform.validateField('checkPass');
          }
          callback();
        }
      };
      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.aform.pwd) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
}
      return {
        currentPage: 1, //页数
        pagesize: 15, //默认每页
        total:0,      //总页数
        in:'',      //修改时代表修改的index
        no:false,  //取消点击关闭
        accountData: [],
        number:'',
        input2:'',
        options: '', //表单上方的校区select
        options1: '',//表单上方的部门select
        options2: '',//表单上方的职位select
        value: '',   //对应校区select的值
        value1: '', //对应部门select的值
        value2: '', //对应职位select的值
        aform: {
          uname:'',
          name: '',
          sex:'',
          tel:'',
          pwd: '',
         checkPass: '',
         region:'',
         school:[],
         did:'',
         job_id:'',
         fla:''
        },
        dialogFormVisible: false,
        formLabelWidth: '110px',
        inputLabelWidth:'200px',
        rules2: {
          uname: [
                     { required: true, message: '请输入邮箱地址', trigger: 'blur' },
                     { type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur,change' }
                    ],
          // name:[
          // {required:true,trigger: 'blur'}],
          // sex:[
          // {required:true,trigger: 'blur'}],
          // tel:[
          // {required:true,trigger: 'blur'}],
          did:[
          {required:true,validator: nan,trigger: 'blur'}],
          job_id:[
          {required:true,validator: nan,trigger: 'blur'}]
        },
        schools: [], //选好城市之后的校区
        list: [],
        loading: false,
        cities:[], //form中的城市
        jobs:[], //部门 change之后更新
        backUp:[] //备份用的元数据
      }
    },
    methods: {
      handleIconClick(){
        // console.log('1')
         this.fetchData();
      },
      updateList(){  //表格上方3个select change之后刷新表格
        this.fetchData();
      },
      
      updateJobList(){ //部门变更后,刷新职位
        let para = {
          did:this.aform.did
        };
        departList(para,token).then((res) => {
            this.jobs = res.data[0]._child.map(item => {
        return { value: item.job_id, label: item.full_name };
      });
        })
      },
      createCh(formName){  //点击创建按钮
            this.in = '';
            this.dialogFormVisible = true;
            this.aform = {
                          aid:'',
                          uname:'',
                          name: '',
                          sex:'',
                          tel:'',
                          pwd: '',
                          checkPass: '',
                          region:'',
                          school:[],
                          did:'',
                          job_id:'',
                          fla:''
            };
            this.$refs.aform.resetFields();
      },
      editCh(index,data){  //点击就修改
        if(data[index].did){
        let para = {
          did:data[index].did
        };
        departList(para,token).then((res) => {
          // console.log(res)
            this.jobs = res.data[0]._child.map(item => {
        return { value: item.job_id, label: item.full_name };
      });
        }) //假如有部门,必须刷新职位，方能更换同部门的不同职位
       }
            
         this.dialogFormVisible = true;
        let aid = data[index].aid;
        data[index].did = data[index].did-0;
              data[index].job_id = data[index].job_id-0;
         this.in = index;
         let d = this.copyArr(data);
        this.backUp.map((item,index,arr)=>{ //利用复制来的源数据进行school赋值[123,234]
          if( aid == item.aid){
            d[index].school = item.school.map((item)=>{
              return item.id;
            })
            d[index].region = ''
          }
        })
        // console.log(d[index])
        this.aform = JSON.parse(JSON.stringify(d[index])) //待验证是否要拷贝
      },
      copyArr : function (arr){   //拷贝arr用
        return arr.map((e)=>{
            if(typeof e === 'object'){
                return Object.assign({},e)
            }else{
                return e
            }
        })
          },
      open2(index,data) {  //删除账号
        this.$confirm('是否确定要删除该账号?', '删除账号', {
                  customClass:'redwarn',
                  confirmButtonText: '确定',
                  cancelButtonText: '取消',
                  type: 'warning'
        }).then(() => {
         let para = { aid:data[index].aid}
          delete_account(para,token).then(()=>{

          this.fetchData();
          })
           // this.deleteRow(index,data);
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
        }).then(()=>{
          this.beRed();
        })
        // .catch(() => {
        //   this.$message({
        //     type: 'info',
        //     message: '已取消删除'
        //   });          
        // });
       },
      deleteRow(index, rows) {
        rows.splice(index, 1);
        this.accountData = rows;
      },
      beRed(){   //停用变红
        // let tr = document.getElementsByTagName('tr');
        // for(let i =0;i<10;i++){
        //   tr[i].childNodes[8].className = '';
        //       if(tr[i].innerText.indexOf('停用')>-1){
        //          tr[i].childNodes[8].className = 'red';
        //       }
         
        // }
        let span = document.getElementsByClassName('redBlack');
        let length = span.length;
        for(let i =0;i<length;i++){
              if(span[i].innerText.indexOf('停用')>-1){
                 span[i].style.color = 'red';
              }else{
                 span[i].style.color = 'black';
              }
         
        }

      },
      campusGet(){  //城市change之后获取校区
        let para = {
          simple:'1',
          city_id:this.aform.region
        };
        campusList(para,token).then((res)=>{
          // console.log(res)
          let a = res.data;
          this.schools = a.map(item => {
        return { value: item.id, label: item.title };
      });
        })
      },
      remoteMethod(query) {   //远程搜索，录入时进行过滤
        if (query !== '') {
          this.loading = true;
          setTimeout(() => {
            this.loading = false;
            this.schools = this.list.filter(item => {
              return item.label.toLowerCase()
                .indexOf(query.toLowerCase()) > -1;
            });
          }, 200);
        } else {
          this.schools = [];
        }
      },
      addAccount(formName){   //点确定后添加账号
        this.$refs[formName].validate((valid) => {
        let f = this.aform;
        // f.school = f.school.join(',');
        f.school_id = f.school.join(',');
        let c = f.school;
        let i = this.in;

        if(valid){
            if(i !== ''){
                          // this.accountData.splice(i,1,f);
                          let para = f;
                          put_account(para,token).then(()=>{

                          this.fetchData();
                          });
              }else{
                    this.accountData.push(f);
                    let para = f;
                    create_account(para,token).then(()=>{

                    this.fetchData();
                    });
                  }

        this.in = '';
        this.dialogFormVisible = false;
        }else{
              console.log('error submit!!');
              return false;
              }
        });
      },
      fetchData (){
        let para = { page:this.currentPage,
                    school_id:this.value,
                    did:this.value1,
                    job_id:this.value2,
                    tel:this.input2,
                    name:this.input2}
        account(para,token).then((res) => {
          this.number = res.total;
          let a = res.data;
          let c = res.last_page *this.pagesize;
          this.total = parseInt(c);
          this.backUp = this.copyArr(a);//考虑换json拷贝
          a.map(function(item,index,arr){
            let c = item.school;
                 if(c.length != 0) {
                  let arra = []
                c.map(function(campus){
                    arra.push(campus.title)
                })
                let str =  arra.join(',') //数组变字符
              arr[index].school = str;

            }
          })
          // console.log(res)
          this.accountData = a;
        }).then((res) => {
          let span = document.getElementsByClassName('redBlack');
        let length = span.length;
        for(let i =0;i<length;i++){
          // span[i].className = '';
              if(span[i].innerText.indexOf('停用')>-1){
                 span[i].style.color = 'red';
              }else{
                 span[i].style.color = 'black';
              }
         
        }
                // let tr = document.getElementsByTagName('tr')
                // let ac = this.accountData;
                // ac.map( function(item, index){
                //       if(item.status == '停用'){
                //         tr[index+1].children[8].className = 'red';

                //         }else{
                //            tr[index+1].children[8].className = 'black';
                //         }
                // });
        })
        
      },
      handleCurrentChange: function(val) {  //变更页数
            this.currentPage = val;
            this.fetchData();
      },   
    },
    beforeCreate(){
           let user = localStorage.getItem('user');
            token =  JSON.parse(user).token;
        },
    created(){//创建组件时
        this.fetchData();
        
        let cam = {
          simple:'1'
        };
        campusList(cam,token).then((res)=>{//获取校区
          let a = res.data;
          this.options = a.map(item => {
        return { value: item.id, label: item.title };
      });
          this.schools = a.map(item => {
        return { value: item.id, label: item.title };
      });
          this.list = a.map(item => {
        return { value: item.id, label: item.title };
      });
        }).then(()=>{
          department(token).then(res=>{//获取部门
          this.options1 = res.data.map(item=>{
            return { label:item.full_name,value:item.job_id}
          })
        })
        }).then(()=>{
          sdjList(token).then((res) => {  //获取校区部门职位
            // this.options = res.data.school;
            // this.schools = res.data.school;
            // this.options1 = res.data.department;
            // console.log(res)
            this.options2 = res.data.job
        })
        }).then(()=>{
          cityList(token).then((res)=>{  //获取城市
            this.cities = res.data
        })
        })
        
        
    },
    computed:{
      alter:function(){
        if(this.in === ''){
          return '创建账号'
        }
        return '修改账号'
      }
    }
  }
 
</script>
<style >
.h1  .el-button--primary{
    background-color: #32a4d3;
    border-color: #32a4d3;
}
    .red{
        color: red
    }
    .black{
        color: black!important
    }
    #table .el-table td ,#table  .el-table th{
      padding: 5px 5px;
      text-align: center
    }
    #table  .el-table th>div,  #table  .el-table .cell{
      padding-left: 0;
      padding-right: 0;
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
.el-dialog .el-dialog__header{
    background-color: #1fb5ad;
    padding: 20px 20px 20px;
}
.el-dialog .el-dialog__title{
    color:white;
}
.block{
  text-align: center;
  margin-top:10px;
}
.accou{
  width: 100%;
  position:relative;
  height:50px
}
.oneSelect{
  margin-left:200px;
  position:absolute;
  top:0;
  width:140px
}
.twoSelect{
  margin-left:350px;
  position:absolute;
  top:0;
  width:140px
}
.threeSelect{
  margin-left:500px;
  position:absolute;
  top:0;
  width:140px
}
.buttonAdd{
  position:absolute;
  right:0;
  top:0
}
</style>