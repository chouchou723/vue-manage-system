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
  </el-dropdown-menu>
</el-dropdown>
        </div> 
        </div>
        <div  style='margin-left:10px;width:100px;position:absolute;top:4px;right:10px' v-if='isCharge' >
          
        <el-select v-model="value10" size='small' clearable placeholder="全部TMK" @change="updateList('1')">
    <el-option
      v-for="item in tmks"
      :key="item.value"
      :label="item.label"
      :value="item.value">
    </el-option>
  </el-select>
        </div>

        <div  style='margin-left:10px;width:140px;float:left' >
          
        <el-select v-model="value" size='small' clearable placeholder="选择校区" @change="updateList('1')">
    <el-option
      v-for="item in options"
      :key="item.value"
      :label="item.label"
      :value="item.value">
    </el-option>
  </el-select>
        </div>
        <div  style='width:140px;float:left;margin-left:10px' >
          
        <el-select v-model="value1" size='small' clearable placeholder="渠道来源" @change="updateList('1')">
    <el-option
      v-for="item in options1"
      :key="item.value"
      :label="item.label"
      :value="item.value">
    </el-option>
  </el-select>
        </div>
        <div  class='datec' style='float:left;margin-left:10px' >
          
         <el-date-picker
      v-model="value3"
      type="daterange"
      size='small' 
      placeholder="选择日期范围"  @change="updateList">
    </el-date-picker>
        </div>
        </div>
        <div id="table">
          <el-table
    :data="workData"
    border
    show-summary
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
<div  style="width:40%;float:right">
<div class="h1" style="position:relative;height:100px;background-color:#6b9ed4;border-radius:5px">
        <div >
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
  </el-dropdown-menu>
</el-dropdown>
        </div>  
        </div>
        <div  style='margin-left:10px;width:100px;position:absolute;top:4px;right:10px' v-if='isCharge' >
          
        <el-select v-model="value10" size='small' clearable placeholder="全部TMK" @change="updateList('2')">
    <el-option
      v-for="item in tmks"
      :key="item.value"
      :label="item.label"
      :value="item.value">
    </el-option>
  </el-select>
        </div>
        <div  style='margin-left:10px;width:140px;float:left' >
          
        <el-select v-model="value4" size='small' clearable placeholder="选择校区" @change="updateList('2')">
    <el-option
      v-for="item in options"
      :key="item.value"
      :label="item.label"
      :value="item.value">
    </el-option>
  </el-select>
        </div>
        <div  class='datec' style='float:left;margin-left:10px' >
          
         <el-date-picker
      v-model="value5"
      type="daterange"
      size='small' 
      placeholder="选择日期范围" @change="updateList2">
    </el-date-picker>
        </div>
        </div>
        <div class="echarts">
            <IEcharts :option="pie_radius" style='height:400px;width:100%'></IEcharts>
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
              </el-dropdown-menu>
            </el-dropdown>
                    </div> 
                    <div  class='datec' style='position:absolute;top:0;left:240px;margin-left:15px;z-index:3' >
                      
                     <el-date-picker
                  v-model="value6"
                  type="daterange"
                  size='small' 
                  placeholder="选择日期范围" @change="updateList3">
                </el-date-picker>
                    </div>
                    <div  style='margin-left:10px;width:100px;position:absolute;top:0;right:10px;z-index:3' v-if='isCharge' >
          
                        <el-select v-model="value10" size='small' clearable placeholder="全部TMK" @change="updateList3">
                    <el-option
                      v-for="item in tmks"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
                        </div>
                        <IEcharts :option="line" style='height:400px;width:100%'></IEcharts>
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
  </el-dropdown-menu>
</el-dropdown>
        </div> 
        </div>
        <div  style='margin-left:10px;width:100px;position:absolute;top:6px;right:10px;' v-if='isCharge' >
          
                        <el-select v-model="value10" size='small' clearable placeholder="全部TMK" @change="updateList4">
                    <el-option
                      v-for="item in tmks"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
                        </div>
        <div  style='margin-left:10px;width:140px;float:left' >
          
        <el-select v-model="value6" size='small' clearable placeholder="选择校区" @change="updateList4">
    <el-option
      v-for="item in options"
      :key="item.value"
      :label="item.label"
      :value="item.value">
    </el-option>
  </el-select>
        </div>
        <div  style='width:140px;float:left;margin-left:10px' >
          
        <el-select v-model="value7" size='small' clearable placeholder="渠道来源" @change="updateList4">
    <el-option
      v-for="item in options1"
      :key="item.value"
      :label="item.label"
      :value="item.value">
    </el-option>
  </el-select>
        </div>
        <div  class='datec' style='float:left;margin-left:10px' >
          
         <el-date-picker
      v-model="value8"
      type="daterange"
      size='small' 
      placeholder="选择日期范围" @change="updateList4">
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
      prop="claim"
      label="认领量">
    </el-table-column>
    <el-table-column
      prop="invite"
      label="邀约量">
    </el-table-column>
    <el-table-column
      prop="arrive"
      label="到访量">
    </el-table-column>
    <el-table-column
      prop="unarrive"
      label="未到访量">
    </el-table-column>
    <el-table-column
      prop="sign"
      label="签约量">
    </el-table-column>
    <el-table-column
      prop="arrivalrate"
      label="到访率">
    </el-table-column>
    <el-table-column
      prop="sighrate"
      label="签到率">
    </el-table-column>
  </el-table>
    <div class="block">
  
  <el-pagination
    layout="prev, pager, next"
    :total="total2"
    :current-page="currentPage2"
     :page-size="pagesize2"
     @current-change="handleCurrentChange2">
  </el-pagination>
    </div>

        </div>
</div>
<div class="echarts" style="position:relative;margin-top:10px">
        <div  class='drop' style='position:absolute;top:0;left:168px;width:140px;z-index:3' >
          <el-dropdown @command="handleCommand5">
  <span class="el-dropdown-link">
    [{{title5}}<i class="el-icon-caret-bottom el-icon--right"></i>]
  </span>
  <el-dropdown-menu slot="dropdown" >
  <el-dropdown-item command="最近一周">最近一周</el-dropdown-item>
    <el-dropdown-item command="最近一个月">最近一个月</el-dropdown-item>
  </el-dropdown-menu>
</el-dropdown>
        </div> 
        <div  class='datec' style='position:absolute;top:0;left:288px;margin-left:15px;z-index:3' >
          
         <el-date-picker
      v-model="value9"
      type="daterange"
      size='small' 
      placeholder="选择日期范围" @change="updateList5">
    </el-date-picker>
        </div>
        <div  style='margin-left:10px;width:100px;position:absolute;top:0;right:10px;z-index:3' v-if='isCharge' >
          
                        <el-select v-model="value10" size='small' clearable placeholder="全部TMK" @change="updateList5">
                    <el-option
                      v-for="item in tmks"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
                        </div>
            <IEcharts :option="line2" style='height:400px;width:100%'></IEcharts>
        </div>

        <div class="echarts" style="position:relative;margin-top:10px">
                <div  class='drop' style='position:absolute;top:0;left:106px;width:140px;z-index:3' >
                  <el-dropdown @command="handleCommand6">
                    <span class="el-dropdown-link">
                      [{{title6}}<i class="el-icon-caret-bottom el-icon--right"></i>]
                    </span>
                    <el-dropdown-menu slot="dropdown" >
                    <el-dropdown-item command="最近一周">最近一周</el-dropdown-item>
                      <el-dropdown-item command="最近一个月">最近一个月</el-dropdown-item>
                    </el-dropdown-menu>
                  </el-dropdown>
                          </div> 
                <div  class='datec' style='position:absolute;top:0;left:236px;margin-left:9px;z-index:3' >
                            
                           <el-date-picker
                        v-model="value11"
                        type="daterange"
                        size='small' 
                        placeholder="选择日期范围" @change="updateList6">
                      </el-date-picker>
                </div>
                          <div  style='margin-left:10px;width:100px;position:absolute;top:0;right:10px;z-index:3' v-if='isCharge' >
                  
                                <el-select v-model="value10" size='small' clearable placeholder="全部TMK" @change="updateList6">
                            <el-option
                              v-for="item in tmks"
                              :key="item.value"
                              :label="item.label"
                              :value="item.value">
                            </el-option>
                          </el-select>
                       </div>
                       <div style="position:absolute;top:0;left:42%;z-index:3">
                       <el-radio-group v-model="radio3" @change='getNewRank'>
                        <el-radio-button :label='1'>按邀约量</el-radio-button>
                        <el-radio-button :label='2'>按到访量</el-radio-button>
                        <el-radio-button :label='3'>按签单量</el-radio-button>
                      </el-radio-group></div>
                    <IEcharts :option="bar" style='height:400px;width:100%'></IEcharts>
        </div>

</div>
</template>

<script>
var token
    import IEcharts from 'vue-echarts-v3';
    import { campusList} from '../../api/api';
    export default {
        components: {
            IEcharts
        },
        data: () => ({
          radio3:'2',
            isCharge:true,
            currentPage: 1, //页数
            pagesize: 15, //默认每页
            total:0,      //总页数
            currentPage2: 1, //页数
            pagesize2: 15, //默认每页
            total2:0,      //总页数
            workData:[{date:'2017',resource:'2',comm:'3',active:'4',noneed:'5',return:'6'}],
            resourceData:[{date:'2017',claim:'2',invite:'3',arrive:'4',arriverate:'4',unarrive:'5',sign:'6',signrate:'6'}],
            options:[],
            options1:[],
            tmks:[],
            title1:'最近一周',
            title2:'最近一周',
            title3:'最近一周',
            title4:'最近一周',
            title5:'最近一周',
            title6:'最近一周',
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
            value10:'',
            value11:'',
            line: {
                color:["#13CE66","#F7BA2A","#16b8be","#ed42b3","#20a0ff"],
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
                    data: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"]
                
                },
                yAxis:{
                    splitLine: {
                show: false
            }
                },
                 legend: {
                    orient: 'horizontal',
                    bottom: 10,
                    data: ["新资源", "沟通记录量", "激活无需求","认定无效","回访量"]
                },
                series: []
            },
            line2: {
                color:["#13CE66","#F7BA2A","#16b8be","#ed42b3"],
                title: {
                    text: '资源状态发展统计表'
                },
                tooltip: {
                    trigger: 'axis'
                },
                xAxis: {
                    axisTick:{
                        alignWithLabel:true
                    },
                    data: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"]
                
                },
                yAxis:{
                    splitLine: {
                show: false
            }
                },
                 legend: {
                    orient: 'horizontal',
                    bottom: 10,
                    data: ["新客户", "邀约量", "到访量","签单量"]
                },
                series: []
            },
            pie_radius:{
                color:["#20a0ff","#13CE66","#F7BA2A","#FF4949","#61a0a8","#9caad6"],
                
                tooltip : {
                    trigger: 'item',
                    formatter: "{a} <br/>{b} : {c} ({d}%)"
                },
                graphic: [
                          {
                              type: 'image',
                              id: 'logo',
                              right: 'center',
                              top: 'center',
                              z: -10,
                              bounding: 'raw',
                              origin: [75, 75],
                              style: {
                                  image: '../../../static/img/charts.png',
                                  width: 150,
                                  height: 150,
                                  opacity: 0.4
                              }
                          }
                        ],
                series : [
                    {
                        name: '渠道比例',
                        type: 'pie',
                        radius : ['30%','70%'],
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
            bar: {
                color:["#ff9948","#16b8be","#ed42b3"],
                title: {
                    text: 'TMK排行榜'
                },
                xAxis: {
                    data: ["张帅", "李东", "鹿晗", "吴亦凡", "李易峰", "杨洋"],
                    
                },
                yAxis:{

                },
                tooltip: {
            trigger: 'item'
        },
                legend: {
                    orient: 'horizontal',
                    bottom: 10,
                    data: ["新资源","签单量","回访量"]
                },
                  barGap:0,
                series: [
                    {
                        name: "新资源",
                        type: "bar",
                        data: [5, 20, 16, 7, 10, 2]
                    },
                    {
                        name: "签单量",
                        type: "bar",
                        data: [10, 10, 5, 20, 8, 19]
                    },
                    {
                        name: "回访量",
                        type: "bar",
                        data: [6, 12, 10, 2, 9, 18]
                    }
                ]
            },
        }),

    methods:{
      getNewRank(){
          //切换不同的标签来获取最新数据
      },
      handleCurrentChange: function(val) {  //变更页数
            this.currentPage = val;
            // this.fetchData();
      }, 
      handleCurrentChange2: function(val) {  //变更页数
            this.currentPage2 = val;
            // this.fetchData();
      }, 
      updateList(index){
          if(index === '1'){
            console.log('a')
          }else if(index === '2'){
            console.log('b')
          }
      },
      updateList2(){

      },
      updateList3(){

      },
      updateList4(){

      },
      updateList5(){

      },
      updateList6(){

      },
      handleCommand1(command) {
        this.title1 = command;
        //调服务查询表单
      },
      handleCommand2(command) {
        this.title2 = command;
      },
      handleCommand3(command) {
        this.title3 = command;
        if(command ==='最近一个月'){

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
        }else{
          this.line.xAxis.data = ["周一", "周二", "周三", "周四", "周五", "周六", "周日"]
        }
      },
      handleCommand4(command) {
        this.title4 = command;
      },
      handleCommand5(command) {
        this.title5 = command;
        if(command ==='最近一个月'){

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
            this.line2.xAxis.data = arr
        }else{
          this.line2.xAxis.data = ["周一", "周二", "周三", "周四", "周五", "周六", "周日"]
        }
      },
      handleCommand6(command) {
        this.title6 = command;
      },
  },
    beforeCreate(){
           let user = localStorage.getItem('user');
            token =  JSON.parse(user).token;
        },
    created(){
      let cam = {
          simple:'1'
        };
      campusList(cam,token).then((res)=>{//获取校区
          let a = res.data;
          this.options = a.map(item => {
        return { value: item.id, label: item.title };
      });
        })
        this.line.series =  [{   //以后改成动态获取
                        name: "新资源",
                        type: "line",
                        data: [1, 5, 10, 5,1, 5, 10]
                    },
                    {
                        name: "沟通记录量",
                        type: "line",
                        data:[5, 10, 12, 3, 9, 0,  2]
                    },
                    {
                        name: "激活无需求",
                        type: "line",
                        data: [3, 8, 18, 15, 4, 2, 1]
                    },
                    {
                        name: "认定无效",
                        type: "line",
                        data: [10,1,2,3,5,7,8]
                    },
                    {
                        name: "回访量",
                        type: "line",
                        data: [3,11,6,2,15,2,10]
                    }]
        this.pie_radius.series[0].data = [{value:20, name:'线上'},
                                          {value:30, name:'线下'},
                                          {value:10, name:'转介绍'},
                                          {value:20, name:'续费'},
                                          {value:20, name:'顺访'}]
           this.line2.series =  [{   //以后改成动态获取
                        name: "新客户",
                        type: "line",
                        data: [2, 5, 10, 5,1, 5, 10]
                    },
                    {
                        name: "邀约量",
                        type: "line",
                        data:[3, 10, 12, 3, 9, 0,  2]
                    },
                    {
                        name: "到访量",
                        type: "line",
                        data: [4, 8, 18, 15, 4, 2, 1]
                    },
                    {
                        name: "签单量",
                        type: "line",
                        data: [5,1,2,3,5,7,8]
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
    width: 187px
}
.echarts .drop .el-dropdown{
    
    color:rgb(31, 181, 173);
}
</style>