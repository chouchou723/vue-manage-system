
<template>
<div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-menu"></i> 资源管理</el-breadcrumb-item>
                <el-breadcrumb-item>无效资源</el-breadcrumb-item><el-breadcrumb-item>({{names}})</el-breadcrumb-item>
            </el-breadcrumb>
            
            
<div class="kuangyi">            
            
            
 <div  class= 'accou' >            
<h2>
               无效资源({{number}}人)
                </h2>


  <div  class='twoSelectp'  >
                       <el-select v-model="value" clearable placeholder="选择校区" filterable @change="updateList">
                  <el-option
                    <!--v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">-->
                  </el-option>
                </el-select>
                      </div>
                      
                      
                      <div  class='threeSelectp'  >
                        
                      <el-select v-model="value2" clearable placeholder="渠道来源" @change="updateList">
                  <el-option
                    <!--v-for="item in options2"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">-->
                  </el-option>
                </el-select>
                </div>
                
     <div  class='fourSelectq'  >
                       <el-select v-model="value3" clearable placeholder="录入时间" filterable @change="updateList">
                  <el-option
                    <!--v-for="item in options3"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">-->
                  </el-option>
                </el-select>
                      </div>
                       <div  class='fiveSelect' >
                        
                      <el-select v-model="value4" clearable placeholder="最近联系时间" @change="updateList">
                  <el-option
                    <!--v-for="item in options4"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">-->
                  </el-option>
                </el-select>
                      </div>
                 
                   </div>
                   
                   
                   

  <el-table
    :data="tableData"
    border
    style="width: 100%"
    @cell-click="aaa"
    :default-sort = "{prop: 'date', order: 'descending'}"
    >


    <el-table-column
      prop="names"
      label="姓名"
      width="80">
    </el-table-column>
    
     <el-table-column
      prop="sex"
      label="性别"
      width="65">
    </el-table-column>
    
     <el-table-column
      prop="group_id"
      label="年龄"
      width="65">
    </el-table-column>//此为替代测试数据    
    
    <el-table-column
      prop="cc_name" 
      label="家长"
      width="80">
    </el-table-column> //此为替代测试数据
    
    <el-table-column
      prop="mobile"
      label="手机"
      width="150">
    </el-table-column>
    
    <el-table-column
      prop="address"
      label="校区"
      width="110">
    </el-table-column>
    
    <el-table-column
      prop="sour_name"
      label="渠道来源"
      width="130">
    </el-table-column>
    


    

     <el-table-column
      prop="date"
      label="录入日期"
      sortable
      :formatter="formatter">
    </el-table-column>

  </el-table>            


<div class="block">
  <span class="demonstration"></span>
  <el-pagination
    layout="prev, pager, next"
    :total="1000">
  </el-pagination>
</div>                   
                   
</div>





</div>

</template>



<script>
  export default {
    data() {
      return {
        tableData: [{
                "id":1675,
                "sour_id":55,
                "names":"佳玉",
                "address":"北新泾",
                "sex":1,
                "mobile":"13524000233",
                "group_id":1,
                "tmk_name":null,
                "cc_name":"杨快",
                "school_name":"北新泾体验馆",
                "sour_name":"大众点评（少儿绘画）"
            },
            {
                "id":1658,
                "sour_id":55,
                "names":"孩子",
                "address":"北新泾",
                "sex":1,
                "mobile":"13761833542",
                "group_id":5,
                "tmk_name":"朱海萍",
                "cc_name":"杨快",
                "school_name":"北新泾体验馆",
                "sour_name":"大众点评（少儿绘画）"
            },
            {
                "id":1653,
                "sour_id":4,
                "names":"吕佳润",
                "address":"长宁",
                "sex":2,
                "mobile":"15821198361",
                "group_id":7,
                "tmk_name":null,
                "cc_name":"严媚",
                "school_name":"北新泾体验馆",
                "sour_name":"Ref(转介绍)"
            },
            {
                "id":1646,
                "sour_id":55,
                "names":"孩子",
                "address":"北新泾",
                "sex":1,
                "mobile":"13918267703",
                "group_id":6,
                "tmk_name":"朱海萍",
                "cc_name":"严媚",
                "school_name":"北新泾体验馆",
                "sour_name":"大众点评（少儿绘画）"
            },
            {
                "id":1622,
                "sour_id":55,
                "names":"毛嘉睿",
                "address":"北新泾",
                "sex":1,
                "mobile":"18018698373",
                "group_id":5,
                "tmk_name":null,
                "cc_name":"严媚",
                "school_name":"北新泾体验馆",
                "sour_name":"大众点评（少儿绘画）"
            },
            {
                "id":1610,
                "sour_id":55,
                "names":"孩子",
                "address":"北新泾",
                "sex":1,
                "mobile":"13918191332",
                "group_id":7,
                "tmk_name":"朱海萍",
                "cc_name":"杨快",
                "school_name":"北新泾体验馆",
                "sour_name":"大众点评（少儿绘画）"
            },
            {
                "id":1604,
                "sour_id":4,
                "names":"张劭阳",
                "address":"北新泾",
                "sex":1,
                "mobile":"13764331239",
                "group_id":7,
                "tmk_name":null,
                "cc_name":"杨快",
                "school_name":"北新泾体验馆",
                "sour_name":"Ref(转介绍)"
            },
            {
                "id":1599,
                "sour_id":9,
                "names":"谢思辰",
                "address":"北新泾",
                "sex":1,
                "mobile":"13701885321",
                "group_id":5,
                "tmk_name":"朱海萍",
                "cc_name":"杨快",
                "school_name":"北新泾体验馆",
                "sour_name":"市场活动"
            },
            {
                "id":1568,
                "sour_id":78,
                "names":"孩子",
                "address":"北新泾",
                "sex":1,
                "mobile":"15901907302",
                "group_id":6,
                "tmk_name":"朱海萍",
                "cc_name":"严媚",
                "school_name":"北新泾体验馆",
                "sour_name":" 支付宝口碑"
            },
            {
                "id":1566,
                "sour_id":54,
                "names":"朱泽龙",
                "address":"北新泾",
                "sex":1,
                "mobile":"15221810821",
                "group_id":5,
                "tmk_name":"朱海萍",
                "cc_name":"严媚",
                "school_name":"北新泾体验馆",
                "sour_name":"大众点评38团购"
            },
            {
                "id":1555,
                "sour_id":54,
                "names":"孩子",
                "address":"北新泾",
                "sex":1,
                "mobile":"13621730833",
                "group_id":7,
                "tmk_name":null,
                "cc_name":"杨快",
                "school_name":"北新泾体验馆",
                "sour_name":"大众点评38团购"
            },
            {
                "id":1536,
                "sour_id":78,
                "names":"孩子",
                "address":"北新泾",
                "sex":1,
                "mobile":"13681974808",
                "group_id":6,
                "tmk_name":"孙慧钧",
                "cc_name":"杨快",
                "school_name":"北新泾体验馆",
                "sour_name":" 支付宝口碑"
            },
            {
                "id":1515,
                "sour_id":55,
                "names":"孩子",
                "address":"北新泾",
                "sex":1,
                "mobile":"13564679912",
                "group_id":6,
                "tmk_name":"朱海萍",
                "cc_name":"杨快",
                "school_name":"北新泾体验馆",
                "sour_name":"大众点评（少儿绘画）"
            },
            {
                "id":1514,
                "sour_id":26,
                "names":"孩子",
                "address":"长宁龙柏",
                "sex":1,
                "mobile":"13020258017",
                "group_id":1,
                "tmk_name":"孙慧钧",
                "cc_name":"严媚",
                "school_name":"北新泾体验馆",
                "sour_name":"教育人生网"
            },
            {
                "id":1490,
                "sour_id":57,
                "names":"曹昕玥",
                "address":"长宁",
                "sex":2,
                "mobile":"13816673796",
                "group_id":7,
                "tmk_name":null,
                "cc_name":"严媚",
                "school_name":"北新泾体验馆",
                "sour_name":"妈妈帮"
            }]
      }
    },
      	     methods: {
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

.twoSelectp{
  margin-left:360px;
  position:absolute;
  top:0;
  width:100px
}
.threeSelectp{
  margin-left:470px;
  position:absolute;
  top:0;
  width:100px
}

.fourSelectq{
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


.kuangyi{
	padding: 1px;
	width: 100%;
	height: 100%;
	border-style: none;
}
	
</style>