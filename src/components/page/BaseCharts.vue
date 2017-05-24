<template>
<div>
    
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-date"></i> 报表统计</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
<div  style="width: 59%;float:left">
        <div class="h1" style="position:relative;height:100px;background-color:rgb(31, 181, 173);border-radius:5px">
        <div>
        <h3 style='margin-bottom:20px;color:white;padding-top:5px'>
            
        工作量统计表
        </h3>
           <div  class='drop' style='position:absolute;top:4px;left:125px;width:140px;' >
          <el-dropdown @command="handleCommand1">
  <span class="el-dropdown-link">
    [{{title1}}<i class="el-icon-caret-bottom el-icon--right"></i>]
  </span>
  <el-dropdown-menu slot="dropdown" >
  <el-dropdown-item command="最近一周">最近一周</el-dropdown-item>
    <el-dropdown-item command="最近一个月">最近一个月</el-dropdown-item>
    <el-dropdown-item command="最近一季度">最近一季度</el-dropdown-item>
    <el-dropdown-item command="最近一年">最近一年</el-dropdown-item>
  </el-dropdown-menu>
</el-dropdown>
        </div> 
        </div>
        <div  style='margin-left:10px;width:140px;float:left' >
          
        <el-select v-model="value" size='small' clearable placeholder="选择校区" @change="updateList">
    <el-option
      v-for="item in options"
      :key="item.value"
      :label="item.label"
      :value="item.value">
    </el-option>
  </el-select>
        </div>
        <div  style='width:140px;float:left;margin-left:2%' >
          
        <el-select v-model="value1" size='small' clearable placeholder="渠道来源" @change="updateList">
    <el-option
      v-for="item in options1"
      :key="item.value"
      :label="item.label"
      :value="item.value">
    </el-option>
  </el-select>
        </div>
        <div  style='float:left;width:140px;margin-left:2%' >
          
         <el-date-picker
      v-model="value3"
      type="daterange"
      size='small' 
      placeholder="选择日期范围">
    </el-date-picker>
        </div>
        </div>
        <div id="table">
          <el-table
    :data="accountData"
    border
    style="width: 100%;height:400px">
    <el-table-column
      prop="date"
      label="日期">
    </el-table-column>
    <el-table-column
      prop="resource"
      label="新资源">
    </el-table-column>
    <el-table-column
      prop="comm"
      label="沟通记录量">
    </el-table-column>
    <el-table-column
      prop="active"
      label="激活无需求">
    </el-table-column>
    <el-table-column
      prop="noneed"
      label="认定无效">
    </el-table-column>
    <el-table-column
      prop="return"
      label="回访量">
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
<div  style="width: 40%;float:right">
<div class="h1" style="position:relative;height:100px;background-color:#6b9ed4;border-radius:5px">
        <div sytle>
        <h3 style='margin-bottom:20px;color:white;padding-top:5px'>
            
       新资源渠道来源分析
        </h3>
           <div  class='drop' style='position:absolute;top:4px;left:179px;width:140px;' >
          <el-dropdown @command="handleCommand2">
  <span class="el-dropdown-link">
    [{{title2}}<i class="el-icon-caret-bottom el-icon--right"></i>]
  </span>
  <el-dropdown-menu slot="dropdown" >
  <el-dropdown-item command="最近一周">最近一周</el-dropdown-item>
    <el-dropdown-item command="最近一个月">最近一个月</el-dropdown-item>
    <el-dropdown-item command="最近一季度">最近一季度</el-dropdown-item>
    <el-dropdown-item command="最近一年">最近一年</el-dropdown-item>
  </el-dropdown-menu>
</el-dropdown>
       <!--  <el-select v-model="value" size='small' clearable placeholder="最近一周" @change="updateList">
    <el-option
      v-for="item in options"
      :key="item.value"
      :label="item.label"
      :value="item.value">
    </el-option>
  </el-select> -->
        </div>  
        </div>

        <div  style='margin-left:10px;width:140px;float:left' >
          
        <el-select v-model="value4" size='small' clearable placeholder="选择校区" @change="updateList">
    <el-option
      v-for="item in options"
      :key="item.value"
      :label="item.label"
      :value="item.value">
    </el-option>
  </el-select>
        </div>
        <div  class='datec' style='width:140px;float:left;margin-left:2%' >
          
         <el-date-picker
      v-model="value5"
      type="daterange"
      size='small' 
      placeholder="选择日期范围">
    </el-date-picker>
        </div>
        </div>
        <div class="echarts">
            <IEcharts :option="pie_radius" ></IEcharts>
        </div>
        </div>

        
        <div class="echarts" style="position:relative;margin-top:10px">
        <div  class='drop' style='position:absolute;top:0;left:118px;width:140px;z-index:3' >
          <el-dropdown @command="handleCommand3">
  <span class="el-dropdown-link">
    [{{title3}}<i class="el-icon-caret-bottom el-icon--right"></i>]
  </span>
  <el-dropdown-menu slot="dropdown" >
  <el-dropdown-item command="最近一周">最近一周</el-dropdown-item>
    <el-dropdown-item command="最近一个月">最近一个月</el-dropdown-item>
    <el-dropdown-item command="最近一季度">最近一季度</el-dropdown-item>
    <el-dropdown-item command="最近一年">最近一年</el-dropdown-item>
  </el-dropdown-menu>
</el-dropdown>
        </div> 
        <div  style='position:absolute;top:0;left:240px;width:140px;margin-left:2%;z-index:3' >
          
         <el-date-picker
      v-model="value6"
      type="daterange"
      size='small' 
      placeholder="选择日期范围">
    </el-date-picker>
        </div>
            <IEcharts :option="line" ></IEcharts>
        </div>


<div  style="width: 100%;float:left">
        <div class="h1" style="position:relative;height:100px;background-color:rgb(31, 181, 173);border-radius:5px">
        <div>
        <h3 style='margin-bottom:20px;color:white;padding-top:5px'>
            
        资源状态发展统计表
        </h3>
           <div  class='drop' style='position:absolute;top:4px;left:180px;width:140px;' >
          <el-dropdown @command="handleCommand4">
  <span class="el-dropdown-link">
    [{{title4}}<i class="el-icon-caret-bottom el-icon--right"></i>]
  </span>
  <el-dropdown-menu slot="dropdown" >
  <el-dropdown-item command="最近一周">最近一周</el-dropdown-item>
    <el-dropdown-item command="最近一个月">最近一个月</el-dropdown-item>
    <el-dropdown-item command="最近一季度">最近一季度</el-dropdown-item>
    <el-dropdown-item command="最近一年">最近一年</el-dropdown-item>
  </el-dropdown-menu>
</el-dropdown>
        </div> 
        </div>
        <div  style='margin-left:10px;width:140px;float:left' >
          
        <el-select v-model="value6" size='small' clearable placeholder="选择校区" @change="updateList">
    <el-option
      v-for="item in options"
      :key="item.value"
      :label="item.label"
      :value="item.value">
    </el-option>
  </el-select>
        </div>
        <div  style='width:140px;float:left;margin-left:2%' >
          
        <el-select v-model="value7" size='small' clearable placeholder="渠道来源" @change="updateList">
    <el-option
      v-for="item in options1"
      :key="item.value"
      :label="item.label"
      :value="item.value">
    </el-option>
  </el-select>
        </div>
        <div  style='float:left;width:140px;margin-left:2%' >
          
         <el-date-picker
      v-model="value8"
      type="daterange"
      size='small' 
      placeholder="选择日期范围">
    </el-date-picker>
        </div>
        </div>
        <div id="table">
          <el-table
    :data="resourceData"
    border
    style="width: 100%;height:400px">
    <el-table-column
      prop="date"
      label="日期">
    </el-table-column>
    <el-table-column
      prop="resource"
      label="新资源">
    </el-table-column>
    <el-table-column
      prop="comm"
      label="沟通记录量">
    </el-table-column>
    <el-table-column
      prop="active"
      label="激活无需求">
    </el-table-column>
    <el-table-column
      prop="noneed"
      label="认定无效">
    </el-table-column>
    <el-table-column
      prop="return"
      label="回访量">
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
<div class="echarts" style="position:relative;margin-top:10px">
        <div  class='drop' style='position:absolute;top:0;left:118px;width:140px;z-index:3' >
          <el-dropdown @command="handleCommand5">
  <span class="el-dropdown-link">
    [{{title5}}<i class="el-icon-caret-bottom el-icon--right"></i>]
  </span>
  <el-dropdown-menu slot="dropdown" >
  <el-dropdown-item command="最近一周">最近一周</el-dropdown-item>
    <el-dropdown-item command="最近一个月">最近一个月</el-dropdown-item>
    <el-dropdown-item command="最近一季度">最近一季度</el-dropdown-item>
    <el-dropdown-item command="最近一年">最近一年</el-dropdown-item>
  </el-dropdown-menu>
</el-dropdown>
        </div> 
        <div  style='position:absolute;top:0;left:240px;width:140px;margin-left:2%;z-index:3' >
          
         <el-date-picker
      v-model="value9"
      type="daterange"
      size='small' 
      placeholder="选择日期范围">
    </el-date-picker>
        </div>
            <IEcharts :option="line" ></IEcharts>
        </div>

</div>
</template>

<script>
    import IEcharts from 'vue-echarts-v3';
    export default {
        components: {
            IEcharts
        },
        data: () => ({
            workData:[],
            resourceData:[],
            title1:'最近一周',
            title2:'最近一周',
            title3:'最近一周',
            title4:'最近一周',
            title5:'最近一周',
            value:"",
            value1:"",
            value2:"",
            value3:"",
            value4:"",
            value5:"",
            value6:"",
            value7:"",
            value8:"",
            value9:"",
            line: {
                color:["#20a0ff","#13CE66","#F7BA2A"],
                title: {
                    text: '工作量趋势图'
                },
                tooltip: {
                    trigger: 'axis'
                },
                xAxis: {
                    axisTick:{
                        alignWithLabel:true
                    },
                    data: ["周一", "周二", "周三", "周四", "周五", "周六","周日"]
                
                },
                yAxis:{
                    splitLine: {
                show: false
            }
                },
                 legend: {
                    orient: 'horizontal',
                    bottom: '0',
                    data: ["新纪录", "访问量", "人数"]
                },
                series: []
            },
            bar: {
                color:["#20a0ff","#13CE66","#F7BA2A","#FF4949"],
                title: {
                    text: '柱状图'
                },
                xAxis: {
                    data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"]
                },
                yAxis:{},
                series: [
                    {
                        name: "销量",
                        type: "bar",
                        data: [5, 20, 36, 10, 10, 20]
                    }
                ]
            },
            pie: {
                color:["#20a0ff","#13CE66","#F7BA2A","#FF4949","#61a0a8"],
                title : {
                    text: '',
                    x:'center'
                },
                tooltip : {
                    trigger: 'item',
                    formatter: "{a} <br/>{b} : {c} ({d}%)"
                },
                
                series : [
                    {
                        name: '渠道比例',
                        type: 'pie',
                        radius : '55%',
                        center: ['50%', '50%'],
                        data:[
                            {value:335, name:'线上'},
                            {value:310, name:'线下'},
                            {value:234, name:'转介绍'},
                            {value:135, name:'续费'},
                            {value:548, name:'顺访'}
                        ],
                        itemStyle: {
                            emphasis: {
                                shadowBlur: 10,
                                shadowOffsetX: 0,
                                shadowColor: 'rgba(0, 0, 0, 0.5)'
                            }
                        }
                    }
                ]
            },
            pie_radius:{
                color:["#20a0ff","#13CE66","#F7BA2A","#FF4949","#61a0a8"],
                // title : {
                //     text: '',
                //     x:'center'
                // },
                tooltip : {
                    trigger: 'item',
                    formatter: "{a} <br/>{b} : {c} ({d}%)"
                },
                // legend: {
                //     orient: 'vertical',
                //     left: 'left',
                //     data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋"]
                // },
                graphic: [
        {
            type: 'image',
            id: 'logo',
            right: 110,
            top: 125,
            z: -10,
            bounding: 'raw',
            origin: [75, 75],
            style: {
                image: '../../../static/img/charts.png',
                width: 150,
                height: 150,
                opacity: 0.4
            }
        }],
                series : [
                    {
                        name: '渠道比例',
                        type: 'pie',
                        radius : ['30%','70%'],
                        data:[
                           {value:335, name:'线上'},
                            {value:310, name:'线下'},
                            {value:234, name:'转介绍'},
                            {value:135, name:'续费'},
                            {value:548, name:'顺访'}
                        ],
                        itemStyle: {
                            emphasis: {
                                shadowBlur: 10,
                                shadowOffsetX: 0,
                                shadowColor: 'rgba(0, 0, 0, 0.5)'
                            }
                        }
                    }
                ]
            }
        }),

    methods:{
      handleCommand1(command) {
        this.title1 = command;
      },
      handleCommand2(command) {
        this.title2 = command;
      },
      handleCommand3(command) {
        this.title3 = command;
        let y = new Date().getFullYear();
        let m = new Date().getMonth()+1;
        function getDaysInOneMonth(year, month){   //获取月份天数
                  month = parseInt(month, 10);  
                  var d= new Date(year, month, 0);  
                  return d.getDate();  
                }  
     let a = getDaysInOneMonth(y,m);
     let arr = [];
     for(let i = 1;i<=a;i++){
        arr.push(i)
     }
        this.line.xAxis.data = arr
      },
      handleCommand4(command) {
        this.title4 = command;
      },
      handleCommand5(command) {
        this.title5 = command;
      }
},
    created(){
        this.line.series =  [{   //以后改成动态获取
                        name: "新纪录",
                        type: "line",
                        data: [1, 5, 10, 5,1, 5, 10]
                    },
                    {
                        name: "访问量",
                        type: "line",
                        data:[5, 10, 12, 3, 9, 0,  2]
                    },
                    {
                        name: "人数",
                        type: "line",
                        data: [3, 8, 18, 15, 4, 2, 1]
                    },
                    {
                        name: "人数",
                        type: "line",
                        data: [10,1,2,3,5,7,8]
                    }]
    }
    }
</script>

<style >
    .echarts {
        float: left;
        width: 100%;
        height: 400px;
        z-index: 1;
    }
     #table .el-table td ,#table  .el-table th{
      padding: 5px 5px;
      text-align: center
    }
    #table  .el-table th>div,  #table  .el-table .cell{
      padding-left: 0;
      padding-right: 0;
    }
.block{
  text-align: center;
  margin-top:10px;
}
.drop .el-dropdown{
    font-size: 1.17em;
    color:black;
}
.datec .el-date-editor--daterange.el-input{
    width: 189px
}
.echarts .drop .el-dropdown{
    
    color:rgb(31, 181, 173);
}
</style>