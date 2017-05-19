<template>
<div>
    <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-menu"></i> 组织架构</el-breadcrumb-item>
                <el-breadcrumb-item>账号管理</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div  style="width: 100%;position:relative;height:50px">
        <div class="h1"><h2>
            
        账号管理({{number}}人)
        </h2>
        <div  style='margin-left:200px;position:absolute;top:0;width:140px' >
          
        <el-select v-model="value" placeholder="选择校区" @change="updateList">
    <el-option
      v-for="item in options"
      :key="item.value"
      :label="item.label"
      :value="item.value">
    </el-option>
  </el-select>
        </div>
        <div  style='margin-left:350px;position:absolute;top:0;width:140px' >
          
        <el-select v-model="value1" placeholder="选择部门" @change="updateList">
    <el-option
      v-for="item in options1"
      :key="item.value"
      :label="item.label"
      :value="item.value">
    </el-option>
  </el-select>
        </div>
        <div  style='margin-left:500px;position:absolute;top:0;width:140px' >
          
        <el-select v-model="value2" placeholder="选择职位" @change="updateList">
    <el-option
      v-for="item in options2"
      :key="item.value"
      :label="item.label"
      :value="item.value">
    </el-option>
  </el-select>
        </div>
        </div>
       <el-button type="primary" size="mid" style='position:absolute;right:0;top:0' @click="createCh('aform')">添加账号</el-button>
        
<el-dialog title="添加账号" :visible.sync="dialogFormVisible"  :close-on-click-modal="no"  style='z-index:100' >
      
      <el-form :model="aform" :rules="rules2" ref="aform">
        <el-form-item label="登录账号" :label-width="formLabelWidth" prop="username">
            <el-input v-model="aform.username" auto-complete="off" placeholder='请输入邮箱地址' style='width:200px'></el-input>
          </el-form-item>
          <el-form-item label="姓名" :label-width="formLabelWidth"  prop="name">
            <el-input v-model="aform.name" auto-complete="off" placeholder='请输入用户姓名' style='width:200px'></el-input>
          </el-form-item>
          <el-form-item label="性别" :label-width="formLabelWidth"  prop="sexual">
            <el-select v-model="aform.sexual" style='width:200px'>
              <el-option label="男" value="man"></el-option>
              <el-option label="女" value="woman"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="手机号码" :label-width="formLabelWidth"  prop="phone">
            <el-input v-model="aform.phone" auto-complete="off" placeholder='请输入手机号码' style='width:200px'></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="pass"  :label-width="formLabelWidth">
              <el-input type="password" v-model="aform.pass" auto-complete="off" style='width:200px'></el-input>
            </el-form-item>
            <el-form-item label="确认密码" prop="checkPass"  :label-width="formLabelWidth">
              <el-input type="password" v-model="aform.checkPass" auto-complete="off" style='width:200px'></el-input>
            </el-form-item>
            <el-form-item label="所属校区" :label-width="formLabelWidth"  prop="region" style='float:left;margin-right:10px'>
                    <el-select v-model="aform.region" filterable style='width:200px' @change='campusGet'>
                              <el-option-group
                        v-for="group in cities"
                        :key="group.label"
                        :label="group.label">
                        <el-option
                          v-for="item in group.options"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value">
                        </el-option>
                      </el-option-group>
                    </el-select>
            </el-form-item>
             <el-form-item  :label-width="formLabelWidth"  prop="campus" style='height:36px;margin-left: 200px'>
            <el-select
              v-model="aform.campus"
              multiple
              filterable
              remote
              placeholder="请输入关键词"
              :remote-method="remoteMethod"
              :loading="loading">
              <el-option
                v-for="item in options4"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="部门" :label-width="formLabelWidth"  prop="depart">
            <el-select v-model="aform.depart" style='width:200px' @change="updateJobList">
            <el-option
                v-for="item in departs"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
            <el-form-item label="职位" :label-width="formLabelWidth"  prop="job">
            <el-select v-model="aform.job" style='width:200px'>
            <el-option
                v-for="item in jobs"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="使用状态" :label-width="formLabelWidth"  prop="status">
            <el-select v-model="aform.status" style='width:200px'>
            <el-option label="正常" value="正常"></el-option>
              <el-option label="停用" value="停用"></el-option>
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
    style="width: 100%">
    <el-table-column
      prop="username"
      label="登录名">
    </el-table-column>
    <el-table-column
      prop="name"
      label="姓名">
    </el-table-column>
    <el-table-column
      prop="phone"
      label="手机">
    </el-table-column>
    <el-table-column
      prop="campus"
      label="校区">
    </el-table-column>
    <el-table-column
      prop="job"
      label="职位">
    </el-table-column>
    <el-table-column
      prop="depart"
      label="部门">
    </el-table-column>
    <el-table-column
      prop="lastLoginTime"
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
import { account,campusList,jobList,cityList } from '../../api/api';
  export default {
    data() {
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
        } else if (value !== this.aform.pass) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
}
      return {
        currentPage: 1, //页数
        pagesize: 10, //默认每页
        total:0,
        in:'',
        no:false,
        accountData: [],
        number:'10',
        options: [], //表单上方的select
        options1: [],//表单上方的select
        options2: [],//表单上方的select
        value: '',
        value1: '',
        value2: '',
        aform: {
          username:'',
          name: '',
          sexual:'',
          phone:'',
          pass: '',
         checkPass: '',
         region:'',
         campus:[],
         job:'',
         depart:'',
         status:''
        },
        bform: {
          username:'',
          name: '',
          sexual:'',
          phone:'',
          pass: '',
         checkPass: '',
         region:'',
         campus:[],
         job:'',
         depart:'',
         status:''
        },
        dialogFormVisible: false,
         formLabelWidth: '110px',
         rules2: {
          username: [
                     { required: true, message: '请输入邮箱地址', trigger: 'blur' },
                     { type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur,change' }
                    ],
          pass: [
            { required: true,validator: validatePass, trigger: 'blur' }
          ],
          checkPass: [
            { required: true,validator: validatePass2, trigger: 'blur' }
          ]
        },
        options4: [], //选好城市之后的校区
        list: [],
        loading: false,
        cities:[], //form中的城市
        jobs:[], //departs change之后更新
        departs:[{label:'销售部',value:'sale'},{label:'技术部',value:'tech'}]
      }
    },
    methods: {
      updateList(){
        this.fetchData();
      },
      updateJobList(){
        let para = {
          depart:this.aform.depart
        };
        jobList(para).then((res)=>{
          this.jobs = res;
        })
      },
      createCh(formName){
            this.in = '';
            this.dialogFormVisible = true;
            this.aform = this.bform;
             
         },
      editCh(index,data){
        this.dialogFormVisible = true;
        let d = this.copyArr(data);
        this.in = index;
        d[index].campus = data[index].campus.split(',');
        this.aform = d[index];
        let r = d[index].region;
        if(r){
          campusList('{region:r}').then((res)=>{
        this.list = res.map(item => {
      return { value: item.value, label: item.label };
      });
        })
        }
            
      },
      copyArr : function (arr){
        return arr.map((e)=>{
            if(typeof e === 'object'){
                return Object.assign({},e)
            }else{
                return e
            }
        })
          },
      open2(index,data) {
        
            this.$confirm('是否确定要删除该账号?', '删除账号', {
                  customClass:'redwarn',
                  confirmButtonText: '确定',
                  cancelButtonText: '取消',
                  type: 'warning'
        }).then(() => {
        //   this.$message({
        //     type: 'success',
        //     message: '删除成功!'
        //   });
          this.deleteRow(index,data);
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
      beRed(){
        let tr = document.getElementsByTagName('tr');
        for(let i =0;i<10;i++){
          tr[i].childNodes[8].className = '';
              if(tr[i].innerText.indexOf('停用')>-1){
                 tr[i].childNodes[8].className = 'red';
              }
         
        }
      },
      campusGet(){
        let para = {
          region:this.aform.region
        };
        campusList(para).then((res)=>{
          this.list = res.map(item => {
        return { value: item.value, label: item.label };
      });
        })
      },
      remoteMethod(query) {
        if (query !== '') {
          this.loading = true;
          setTimeout(() => {
            this.loading = false;
            this.options4 = this.list.filter(item => {
              return item.label.toLowerCase()
                .indexOf(query.toLowerCase()) > -1;
            });
          }, 200);
        } else {
          this.options4 = [];
        }
      },
      addAccount(formName){
        this.$refs[formName].validate((valid) => {
          let f = this.aform;
        let c = f.campus;
        let i = this.in;
        if(c instanceof Array ){
          f.campus = f.campus.join(',');
        }

                    if (valid) {
                        
                 if(i !== ''){
            this.accountData.splice(0,1,f);
          }else{
            this.accountData.push(f);
          }
        this.in = '';

        this.dialogFormVisible = false;
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });


        
        
        // character(this.accountData);
      },
      fetchData (){
        let self = this;
        let para = { pageSize:this.pageSize,pageNum:this.currentPage}
        
        account(para).then((res) => {
          let a = res.account;
          let b = res.campus;
          let c = res.page;
          //NProgress.done();
          a.map(function(item,index,arr){
            let c = item.campus 
            if(c instanceof Array) {
              arr[index].campus = c.join(',')
              // console.log(c)
            }
          })
          // console.log(res)
          this.accountData = a;
          this.options = b;
          this.total = parseInt(c);
        }).then((res) => {
                let tr = document.getElementsByTagName('tr')
                let ac = this.accountData;
                ac.map( function(item, index){
                      if(item.status == '停用'){
                        tr[index+1].children[8].className = 'red';

                        }
                });
        })
        cityList(para).then((res)=>{
          this.cities = res
        })
      },
      handleCurrentChange: function(val) {
                    this.currentPage = val;

                    this.fetchData();
                },   
 },
    
    created(){
        this.fetchData();
    },
    mounted() {
      
    },
    watch: {
    // 如果路由有变化，会再次执行该方法
    // '$route' : 'fetchData'
  }
  }
 
</script>
<style >
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
.block{
  text-align: center;
  margin-top:10px;
}
</style>