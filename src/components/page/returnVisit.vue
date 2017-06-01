<template>
<div>
    <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-menu"></i> 客户管理</el-breadcrumb-item>
                <el-breadcrumb-item>学员回访</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div  class= 'accou' >
        <div class="h1"><h2>
            
        学员回访({{number}}人)
        </h2>
        <div  class='oneSelect' >
          
        <el-select v-model="value" clearable placeholder="选择校区" @change="updateList">
    <el-option
      v-for="item in options"
      :key="item.value"
      :label="item.label"
      :value="item.value">
    </el-option>
  </el-select>
        </div>
        <div class='twoSelect'>
          
        <el-select v-model="value1" clearable placeholder="回访状态" @change="updateList">
    <el-option
      v-for="item in options1"
      :key="item.value"
      :label="item.label"
      :value="item.value">
    </el-option>
  </el-select>
        </div>
        <div class='threeSelect' >
          
        <el-date-picker
      v-model="value9"
      type="daterange"
      placeholder="选择日期范围">
    </el-date-picker>
        </div>
         <div  class='fourSelect' >
            <el-input
            placeholder="请输入手机号或姓名"
            icon="search"
            v-model="input2"
            :on-icon-click="handleIconClick">
          </el-input>
          </div>
        </div>
       

        </div>
        <div id="table">
          <el-table
    :data="returnData"
    @cell-click="aaa"
     :default-sort = "{prop: 'last_return_time', order: 'descending'}"
    border
    >
    <el-table-column
      prop="name"
      label="学生"

      >
      <template scope="scope" >
        <span onclick='alert(1)'>{{scope.row.name}}</span>
      </template>
    </el-table-column>
    <el-table-column
      prop="school"
      label="校区">
    </el-table-column>
    <el-table-column
      prop="last_return_time"
      sortable
      label="最近回访时间">
    </el-table-column>
    <el-table-column
      prop="times"
      label="回访次数">
    </el-table-column>
    <el-table-column
    class-name = 'tagClass'
      prop="tag"
      label="回访标签"
      width="100"
      :filters="[{ text: '暑期班', value: '暑期班' }, { text: '定期班', value: '定期班' },{ text: '未回访', value: '未回访' }]"
      :filter-method="filterTag"
      filter-placement="bottom-end">
      <template scope="scope">
        <el-tag
          :type="scope.row.tag == '未回访' ? 'danger' : 'success'"
          close-transition 
          v-for='t in scope.row.tag'>{{t}}</el-tag>
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
<el-button v-else class="button-new-tag" size="small" @click="showInput" sytle='margin-top:7px'>+ New Tag</el-button>
</el-dialog> 
</div>


</template>

<script>
var user = localStorage.getItem('user');
var token = JSON.parse(user).token;
import { account,campusList,cityList,sdjList ,departList,put_account,create_account,delete_account} from '../../api/api';

  export default {
    data() {
      return {
        dynamicTags: ['暑期班', '定期班', '特色班'],
        inputVisible: false,
        inputValue: '',
        dialogFormVisible:false,
        input2: '',
        currentPage: 1, //页数
        pagesize: 15, //默认每页
        total:0,
        in:'',
        no:false,
        returnData: 
        [{name:'zhang',school:'徐汇校区',last_return_time:'2017-5-15 08:00',times:'3',tag:['暑期班','定期班']},
        {name:'chang',school:'徐汇校区',last_return_time:'2017-5-15 08:31',times:'3',tag:['定期班']},
        {name:'wei',school:'徐汇校区',last_return_time:'2017-5-14 08:45',times:'3',tag:['未回访']},
        {name:'chao',school:'徐汇校区',last_return_time:'2017-5-15 08:11',times:'3',tag:['暑期班','定期班']}],
//      {name:'wei',school:'徐汇校区',last_return_time:'2017-5-15 07:11',times:'3',tag:['未回访']}],
        number:'',
        options: [], //表单上方的select
        options1: [],//表单上方的select
        options2: [],//表单上方的select
        value: '',   //对应select的值
        value1: '', //对应select的值
        value2: '', //对应select的值
        value9:'',
        tagform:{
          name:''
        }
      }
    },
    methods: {
       updateList(){
          this.fetchData();
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
      fetchData (){
        let self = this;
        let para = { page:this.currentPage,
                    school_id:this.value,
                    did:this.value1,
                    job_id:this.value2,}
        
        account(para,token).then((res) => {
          this.number = res.data.total;
          let a = res.data.data;
           let d = this.copyArr(a);
           this.backUp = d;
          let c = res.data.last_page *this.pagesize;
          //NProgress.done();
          a.map(function(item,index,arr){
            let c = item.school;
           //  let b = []
           // c.map(function(cam,index){
           //  b[cam.id] = cam.title
           // })
           // arr[index].school = b.concat();

            if(c instanceof Array) {
                  let arra = []
                c.map(function(campus){
                    arra.push(campus.title)
                })
                let str =  arra.join(',')
              arr[index].school = str;
              // console.log(c)
            }
          })
          // console.log(res)
          this.accountData = a;
          this.total = parseInt(c);
        }).then((res) => {
                let tr = document.getElementsByTagName('tr')
                let ac = this.accountData;
                ac.map( function(item, index){
                      if(item.fla == '停用'){
                        tr[index+1].children[8].className = 'red';

                        }
                });
        })
        // sdjList(token).then((res) => {
        //     this.options = res.data.school;
        //     this.options1 = res.data.department;
        //     this.options2 = res.data.job
        // })
      },
      handleCurrentChange: function(val) {
                    this.currentPage = val;

                    this.fetchData();
                },   
      filterTag(value, row) {
        // let a = row.tag.join(',')
        // console.log(value.indexOf(row.tag.join('')))
          console.log(value)
        let a = row.tag.some(item=>{
          // console.log(item)
          return item == value
        })
        return a 
        // console.log(a)
        // console.log(value.indexOf(a))
        // return value.indexOf(a) === -1;
      },
      aaa(row,column,cell,event) {
        // console.log(row)
      }, 
      handleIconClick(ev) {
      console.log(ev);//搜索姓名等
    },
    settingTag(){
      //调服务获取tag[]
        this.dialogFormVisible = true
    },
    handleClose(tag) {//移除
      //调服务删除tag,把整个tag传
        this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1);
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
          this.dynamicTags.push(inputValue);
          //调服务 上送tag
        }
        this.inputVisible = false;
        this.inputValue = '';
      }
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
.fourSelect{
 right:0;
  position:absolute;
  top:0;
  width:180px
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
  top: 113px;
  right: 19px;
  color:#1fb5ad;
  z-index: 2000;
  font-size:14px;
  background-color: #eef6f6;
  cursor: pointer;
}
#table .el-table th:nth-last-child(2){
  text-align: left
}
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