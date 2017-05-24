<template>
<div>
    <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-menu"></i> 客户管理</el-breadcrumb-item>
                <el-breadcrumb-item>学员回访</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div  class= 'accou' style="width: 100%;position:relative;height:50px">
        <div class="h1"><h2>
            
        学员回访({{number}}人)
        </h2>
        <div  style='margin-left:200px;position:absolute;top:0;width:140px' >
          
        <el-select v-model="value" clearable placeholder="选择校区" @change="updateList">
    <el-option
      v-for="item in options"
      :key="item.value"
      :label="item.label"
      :value="item.value">
    </el-option>
  </el-select>
        </div>
        <div  style='margin-left:350px;position:absolute;top:0;width:140px' >
          
        <el-select v-model="value1" clearable placeholder="回访状态" @change="updateList">
    <el-option
      v-for="item in options1"
      :key="item.value"
      :label="item.label"
      :value="item.value">
    </el-option>
  </el-select>
        </div>
        <div  style='margin-left:500px;position:absolute;top:0;width:140px' >
          
        <el-date-picker
      v-model="value9"
      type="daterange"
      placeholder="选择日期范围">
    </el-date-picker>
        </div>
        </div>
       

        </div>
        <div id="table">
          <el-table
    :data="returnData"
    @cell-click="aaa"
     :default-sort = "{prop: 'last_return_time', order: 'descending'}"
    border
    style="width: 100%">
    <el-table-column
      prop="name"
      label="学生"
      >
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
      prop="tag"
      label="标签"
      width="100"
      :filters="[{ text: '家', value: '家' }, { text: '公司', value: '公司' }]"
      :filter-method="filterTag"
      filter-placement="bottom-end">
      <template scope="scope">
        <el-tag
          :type="scope.row.tag === '家' ? 'primary' : 'success'"
          close-transition 
          v-for='t in scope.row.tag'>{{t}}</el-tag>
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
var user = localStorage.getItem('user');
var token = JSON.parse(user).token;
import { account,campusList,cityList,sdjList ,departList,put_account,create_account,delete_account} from '../../api/api';

  export default {
    data() {
      return {
        currentPage: 1, //页数
        pagesize: 15, //默认每页
        total:0,
        in:'',
        no:false,
        returnData: [{name:'zhang',school:'徐汇校区',last_return_time:'2017-5-15 08:00',times:'3',tag:['暑期班','定期班']},
        {name:'chang',school:'徐汇校区',last_return_time:'2017-5-15 08:31',times:'3',tag:['暑期班','定期班']},
        {name:'chao',school:'徐汇校区',last_return_time:'2017-5-15 08:11',times:'3',tag:['暑期班','定期班']}],
        number:'',
        options: [], //表单上方的select
        options1: [],//表单上方的select
        options2: [],//表单上方的select
        value: '',   //对应select的值
        value1: '', //对应select的值
        value2: '', //对应select的值
        value9:''
      }
    },
    methods: {
       updateList(){
        
        this.fetchData();
      },copyArr : function (arr){
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
        sdjList(token).then((res) => {
            this.options = res.data.school;
            this.options1 = res.data.department;
            this.options2 = res.data.job
        })
      },
      handleCurrentChange: function(val) {
                    this.currentPage = val;

                    this.fetchData();
                },   
      filterTag(value, row) {

        return row.tag === value;
      },
      aaa(row,column,cell,event) {
        console.log(row)
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