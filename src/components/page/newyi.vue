<template>
<div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-menu"></i> 资源管理</el-breadcrumb-item>
                <el-breadcrumb-item>我的资源</el-breadcrumb-item><el-breadcrumb-item>({{number}})</el-breadcrumb-item>
            </el-breadcrumb>
            
            
<div class="kuangyi">            
            
            
 <div  class= 'accou' >            
<h2 class="mydataReturn">
               我的资源({{number}}人)
                </h2>

                       <div  class='oneSelect2' >
                        
                      <el-select v-model="datadx" clearable placeholder="资源类型" @change="updateList">
                  <el-option
                    v-for="item in options1"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
                      </div>
                      
                                      <div  class='twoSelect2'  >
                       <el-select v-model="value1" clearable placeholder="选择校区" filterable @change="updateList">
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
                      </div>
                      
                      
                      <div  class='threeSelect2'  >
                        
                      <el-select v-model="value2" clearable placeholder="渠道来源" @change="updateList">
                  <el-option
                    v-for="item in options2"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
                </div>
                
     <div  class='fourSelectp'  >
                       <el-select v-model="value3" clearable placeholder="注册时间" filterable @change="updateList">
                  <el-option
                    v-for="item in options3"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
                      </div>
                       <div  class='fiveSelect' >
                        
                      <el-select v-model="value4" clearable placeholder="最近联系时间" @change="updateList">
                  <el-option[{key:,name:,},{key:,name,}]
                    v-for="item in options4"
                    :key="item.key"
                    :label="item.name"
                    :value="item.value">
                  </el-option>
                </el-select>
                      </div>
                      <div  class='sexSelect'  >
                        
                      <el-select v-model="value5" clearable placeholder="资源状态" @change="updateList">
                  <el-option
                    v-for="item in options5"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
                </div>
                
                <div class='search1'>
            <el-input
              placeholder="请输入手机号或姓名"
              icon="search"
              v-model="input2"
              :on-icon-click="handleIconClick">
            </el-input>
            </div>

<div class="block">
  <span class="demonstration"></span>
  <el-pagination
    layout="prev, pager, next"
    :total="1000">
  </el-pagination>
</div>  


                      </div>
                      

<div id="table">
  <el-table
    :data="tableData"
    border
    style="width: 100%"
    :default-sort = "{prop: 'last_time', order: 'descending'}"
    >


     <el-table-column
      prop="names"
      label="姓名"
      width="80">
      <template scope="scope">
        <span  @click="switchDetail(scope.row)">{{scope.row.names}}</span>
      </template>
      
    </el-table-column>
    
     <el-table-column
      prop="sex"
      label="性别"
      width="65">
    </el-table-column>
    
     <el-table-column
      prop="age"
      label="年龄"
      width="65">
    </el-table-column>  
    
    <el-table-column
      prop="familys" 
      label="家长"
      width="80">
    </el-table-column> 
    
    <el-table-column
      prop="mobile"
      label="手机"
      width="150">
    </el-table-column>
    
    <el-table-column
      prop="school_id"
      label="校区"
      width="110">
    </el-table-column>
    
    <el-table-column
      prop="sour_id"
      label="渠道来源"
      width="130">
    </el-table-column>
    
        <el-table-column
      prop=""
      label="注册日期"
      sortable
      width="150">
    </el-table-column>
    <el-table-column
      prop=""
      label="最近访问"
      sortable
      width="150">
    </el-table-column>
    
        <el-table-column
      prop=""
      label="资源状态"
      :formatter="formatter">
    </el-table-column>
    
  </el-table>              
                     
                     <div class="block">
  <span class="demonstration"></span>
  <el-pagination
    layout="prev, pager, next"
    :total="1000"
   
     :current-page="currentPage"
     :page-size="pagesize"
     @current-change="handleCurrentChange">
   </el-pagination>
</div>    
                      
 
</div>
</div>

</div>

</template>

<script>
	var token
	import {ccount,campusList,cityList,sdjList ,departList,put_account,create_account,delete_account,department,returnLeixing,sourceList,returnNewyi,} from '../../api/api';
	
		
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
        in:'',
        no:false,
        tableData: [],
        number:'',
        options: [], //表单上方的select
        options1: [],//表单上方的select
        options2: [],//渠道来源
        options5:[],//资源状态
        value1: '',   //对应select的值
        value2: '', //对应select的值
        value3: '', //对应select的值

        list: [],
        loading: false,
        cities:[], //form中的城市
      }
    },
     methods: {
     	 		formatter(row, column) {
        return row.address;
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
        let para = { group_id:this.datadx,
                    school_id:this.value1,
                    sour_name:this.value2,
                    status:this.value5,
        			page:this.currentPage}
        
        returnNewyi(para,token).then((res) => {//替换服务
          this.number = res.data.total;
          let a = res.data.data;
          let c = res.data.last_page *this.pagesize;
          
          // console.log(a)
          this.tableData = a;
          this.total = parseInt(c);
        })
      },
 created(){

        this.fetchData();
        let cam = {
          simple:'1'
        };
        campusList(cam,token).then((res)=>{//获取校区
          let a = res.data;
          console.log(res); 
          this.options = a.map(item => {
        return { value: item.id, label: item.title };
      });
        })
    },
     handleCurrentChange: function(val) {
                    this.currentPage = val;

                    this.fetchData();
                },   
  /*    formatter(row, column) {
        return row.address;
      },*/
 	  switchDetail(row){
        // console.log(row)
        this.sendUser(row.id)
       this.$router.push('/returnDetail');
      },
      updateList(){
          this.fetchData();
      
      },
 		formatter(row, column) {
        return row.address;
      }
   
    }
  }

</script>   
<style scroped>
h2 {
    display: block;
    font-size: 1.5em;
    -webkit-margin-before: 0.83em;
    -webkit-margin-after: 0.83em;
    -webkit-margin-start: 0px;
    -webkit-margin-end: 0px;
    font-weight: bold;
   
}

.el-input__inner {
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    background-color: #fff;
    background-image: none;
    border-radius: 4px;
    border: 1px solid rgb(191, 217, 216);
    box-sizing: border-box;
    color: rgb(31, 61, 60);
    display: block;
    font-size: inherit;
    height: 25px;
    margin-left: 0px;
    line-height: 1;
    outline: 0;
    padding: 3px 5px;
    transition: border-color .2s 		cubic-bezier(.645,.045,.355,1);
    width: 100%;
    margin-top: 5px;
}
.accou{
  width: 100%;
  position:relative;
  height:50px;
  
}
.oneSelect2{
  margin-left:250px;
  position:absolute;
  top:0;
  width:100px
}
.twoSelect2{
  margin-left:360px;
  position:absolute;
  top:0;
  width:100px
}
.threeSelect2{
  margin-left:470px;
  position:absolute;
  top:0;
  width:100px
}

.fourSelectp{
  margin-left:580px;
  position:absolute;
  top:0;
  width:100px
}
.fiveSelect{
  margin-left:690px;
  position:absolute;
  top:0;
  width:100px
}
.sexSelect{
  margin-left:800px;
  position:absolute;
  top:0;
  width:100px
}
.search1{
 margin-left:930px;
  position:absolute;
  top:0;
  width:170px
}
.kuangyi{
	padding: 1px;
	width: 100%;
	height: 500px;
	border-style: none;
}
.el-table .cell, .el-table th>div {
    padding-left: 0px;
    padding-right: 0px;
    box-sizing: border-box;
    text-overflow: ellipsis;
}
.el-table .cell {
    white-space: normal;
    word-break: break-all;
    line-height: 24px;
    text-align: center;
}
.el-pagination {
    white-space: nowrap;
    padding: 20px;
    vertical-align: middle;
    color: rgb(72, 106, 106);
    	text-align: center;
}


</style>