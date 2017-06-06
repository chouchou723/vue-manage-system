<template>
<div>
    <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-menu"></i> 客户管理</el-breadcrumb-item>
                <el-breadcrumb-item>学员回访</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div  class= 'accou' >
        <div class="h1">
        <h2 class="studentReturn">
            
        学员回访({{number}}人)
        </h2>
        <div  class='studentReturnThree' >
          <el-select v-model="value2" clearable placeholder="选择TMK" @change="updateList">
    <el-option
      v-for="item in options1"
      :key="item.value"
      :label="item.label"
      :value="item.value">
    </el-option>
  </el-select>
</div>
 <div  class='studentReturnThreeS' >
        <el-select v-model="value1" clearable placeholder="选择校区" @change="updateList">
    <el-option
      v-for="item in options"
      :key="item.value"
      :label="item.label"
      :value="item.value">
    </el-option>
  </el-select>
        </div>
        <div class='studentReturnThree'>
          
        <el-select v-model="status" clearable placeholder="回访状态" @change="updateList">
     <el-option label="已到访" value="1"></el-option>
      <el-option label="未到访" value="0"></el-option>
  </el-select>
        </div>
        <div class='studentReturnThree' >
          
        <el-date-picker
      v-model="value3"
      type="daterange"
      placeholder="选择日期范围"
      format="">
    </el-date-picker>
        </div>

     <div  class='fourSelect' >
        <el-input
        placeholder="输入手机号或姓名"
        icon="search"
        v-model="input2"
        :on-icon-click="handleIconClick">
      </el-input>
      </div>
    </div>
       

        </div>
        <div id="table">
          <el-table
      @header-click="getTag"
    :data="returnData"
     :default-sort = "{prop: 'last_time', order: 'descending'}"
    border
    >
    <el-table-column
      prop="nickname"
      label="学生"

      >
      <template scope="scope">
        <span  @click="switchDetail(scope.row)">{{scope.row.nickname}}</span>
      </template>
    </el-table-column>
    <el-table-column
      prop="school"
      label="校区">
    </el-table-column>
    <el-table-column
      prop="last_time"
      sortable
      label="最近回访时间">
    </el-table-column>
    <el-table-column
      prop="visit_count"
      label="回访次数">
    </el-table-column>
    <el-table-column
    class-name = 'tagClass'
      prop="tags"
      label="回访标签"
      width="130">
      <template scope="scope">
        <el-tag
          :type="scope.row.tags == '未回访' ? 'danger' : 'success'"
          close-transition 
          v-for='t in scope.row.tags' @click.native='aaa(t)'>{{t}}</el-tag>
      </template>
    </el-table-column>

  </el-table>
  <div class='settingTag'>
    <span @click='settingTag'>[设置]</span>
  </div>
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
  
  <el-dialog title="设置访问标签" :visible.sync="dialogFormVisible"  :close-on-click-modal="no" show-close style='z-index:100' class='tagDialog'>
<!-- <el-form :model="tagform">
  <el-form-item label="角色名称" :label-width="formLabelWidth">
      <el-input v-model="tagform.name" auto-complete="off" placeholder='请输入角色名称' style='width:200px'></el-input>
    </el-form-item>
    </el-form>
 
  <div slot="footer" class="dialog-footer">
    <el-button type="primary">确 定</el-button>
    <el-button @click="dialogFormVisible = false">取 消</el-button>
  </div> -->
 <el-tag
  :key="tag"
  v-for="tag in dynamicTags"
  :closable="true"
  type="success"
  :close-transition="false"
  @close="handleClose(tag)"
>
{{tag}}
</el-tag>
<el-input
  class="input-new-tag"
  v-if="inputVisible"
  v-model="inputValue"
  ref="saveTagInput"
  size="mini"
  @keyup.enter.native="handleInputConfirm"
  @blur="handleInputConfirm"
>
</el-input>
<el-button v-else class="button-new-tag" size="small" @click="showInput" sytle='margin-top:7px'>创建标签</el-button>
</el-dialog> 
</div>


</template>

<script>
var token
import { campusList,returnVisitList,tagList,create_tag,delete_tag} from '../../api/api';

import { mapActions } from 'vuex';

  export default {
    data() {
      return {
        filterT:[],
        dynamicTags: [],//动态替换
        backupTages:[],
        inputVisible: false,
        inputValue: '',
        dialogFormVisible:false,
        input2: '',
        currentPage: 1, //页数
        pagesize: 15, //默认每页
        total:0,
        no:false,
        returnData: [],
        number:'',
        options: [], //表单上方的select
        options1: [],//表单上方的select
        value1: '',   //对应select的值
        value2: '',   //对应select的值
        status: '', //对应select的值
        value3: '', //对应select的值
        value4:'',
        tagform:{
          name:''
        }
      }
    },
    methods: {
        aaa(tag){
          if(this.value4 ===''){
            this.value4 = tag;
            //调服务fetch
          }else if(this.value4 ==tag){
              this.value4 = ''
              //调服务fetch
          }else{
            this.value4 = tag;
            //调服务fetch
          }
        },
      ...mapActions([
      'sendUser'
    ]),
      getTag(column, event){
        if(column.label ==='回访标签'){
          tagList(token).then(res=>{
            this.filterT = res.data.map(item=>{
              return {text:item.label,value:item.label}
            })
          })
        }
        
      },
      switchDetail(row){
        // console.log(row)
        this.sendUser(row.id)
       this.$router.push('/returnDetail');
      },
       updateList(){
          this.fetchData();
      
      },
      fetchData (){
        let para = { page:this.currentPage,
                    school_id:this.value1,
                    status:this.status,
                    start_time:this.value3[0],
                    end_time:this.value3[1],
                    tmk_id:this.value2
                  }
        
        returnVisitList(token,para).then((res) => {//替换服务
          this.number = res.data.total;
          let a = res.data.data;
          let c = res.data.last_page *this.pagesize;
          
          // console.log(a)
          this.returnData = a;
          this.total = parseInt(c);
        })
      },
      handleCurrentChange: function(val) {
                    this.currentPage = val;

                    this.fetchData();
                },   
      filterTag(value, row) {
        // let a = row.tag.join(',')
        // console.log(value.indexOf(row.tag.join('')))
          // console.log(value)
          console.log(value)
        let a = row.tags.some(item=>{
          console.log(item)
          return item == value
        })
        return a 
        // console.log(a)
        // console.log(value.indexOf(a))
        // return value.indexOf(a) === -1;
      }, 
      handleIconClick(ev) {
      console.log(ev);//搜索姓名等
    },
    settingTag(){
      //调服务获取tag[]
        tagList(token).then(res=>{
          this.dynamicTags =   res.data.map(item=>{
            return item.label
          })
          this.backupTages = res.data
          })
        this.dialogFormVisible = true
    },
    handleClose(tag) {//移除
      //调服务删除tag,把整个tag传
      let index;
      this.backupTages.map(item=>{
        if(item.label === tag){
          index = item.key
        }
      })
      console.log(index)
      let para = {id:index}
      delete_tag(para,token).then(res=>{
        tagList(token).then(res=>{
          this.dynamicTags =   res.data.map(item=>{
            return item.label
          })
          this.backupTages = res.data
          })
      })
      // console.log(index)
        // this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1);
      },

      showInput() {
        this.inputVisible = true;
        this.$nextTick(_ => {
          this.$refs.saveTagInput.$refs.input.focus();
        });
      },

      handleInputConfirm() {
        let inputValue = this.inputValue;
        if (inputValue) {
          let para = {title:inputValue}
          create_tag(para,token).then(res=>{
            tagList(token).then(res=>{
          this.dynamicTags =   res.data.map(item=>{
            return item.label
          })
          this.backupTages = res.data
          })
          })
          // this.dynamicTags.push(inputValue);
          //调服务 上送tag
        }
        this.inputVisible = false;
        this.inputValue = '';
      }
 },
    beforeCreate(){
           let user = localStorage.getItem('user');
            token =  JSON.parse(user).token;
        },
    created(){
        this.fetchData();
        let cam = {
          simple:'1'
        };
        campusList(cam,token).then((res)=>{//获取校区
          let a = res.data;
          this.options = a.map(item => {
        return { value: item.id, label: item.title };
      });
        })
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
.accou{
  width: 100%;
  position:relative;
  height:50px
}
/*.oneSelect{
  margin-left:220px;
  position:absolute;
  top:0;
  width:140px
}
.twoSelect{
  margin-left:370px;
  position:absolute;
  top:0;
  width:140px
}
.threeSelect{
  margin-left:520px;
  position:absolute;
  top:0;
  width:140px
}*/
.fourSelect{
 right:0;
  position:absolute;
  top:0;
  width:160px
}
.studentReturn{
  float: left;
  margin-right: 5px
}
.studentReturnThree{
  float:left;
  width:105px;
  margin-right:10px;
}
.studentReturnThreeS{
  float:left;
  width:174px;
  margin-right:10px;
}
.el-tag--success{
	background-color: #1fb5ad;
	border-color: #bcf1d4;
	color:#FFFFFF;
	border-radius: 25px;
		
}
.el-tag--danger{
  border-radius: 25px;
    
}
.settingTag{
  position: absolute;
  top: 112px;
  right: 19px;
  color:#1fb5ad;
  z-index: 2000;
  font-size:14px;
  background-color: #eef6f6;
  cursor: pointer;
}
/*#table .el-table th:nth-last-child(2){
  text-align: left
}*/
.el-dialog .el-dialog__header{
    background-color: #1fb5ad;
    padding: 20px 20px 20px;
}
.el-dialog .el-dialog__title{
    color:white;
}
.tagDialog .input-new-tag{
  width: 120px
}
</style>