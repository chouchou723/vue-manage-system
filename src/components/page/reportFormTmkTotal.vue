<template>
    <div>
        <!-- <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-my-tongjifenxi"></i> TMK工作量</el-breadcrumb-item>
            </el-breadcrumb>
        </div> -->
        <!-- 合同变更统计 -->
        <div style='display:flex;flex-wrap: wrap;'>
        <div style="width: 100%;margin-bottom:10px;float:left;background: white;position:relative;height:auto;border-radius:5px;">
            <div class="newResourceAn" style="position:relative;padding-top:10px;height:70px;border-bottom:1px solid gainsboro;background:#fafafa">
                <div style='margin-left:10px;width:100px;float:right;margin-right:5px' v-if='code.includes("_m")'>
                    <el-select class='circleSelect' v-model="valueCM1" size='small'  :placeholder="选择TMK" @change="updateListCM(4)">
                        <el-option v-for="item in ccs" :key="item.key" :label="item.label" :value="item.key">
                        </el-option>
                    </el-select>
                </div>
                <div style='float:left;'>
                    <h4 style='margin-bottom:10px;padding-top:5px;padding-left:10px'>
                        <span>工作量</span>
                    </h4>
                </div>
                    <div style="clear:both"></div>
                    <div style='margin-left:10px;width:110px;float:left'>
                            <el-select v-model="valueCM6" size='small'  placeholder="最近一周" @change="updateListCM(1)">
                                    <el-option label="最近一周" value="lastweek"></el-option>
                                    <el-option label="最近一个月" value="lastmonth"></el-option>
                            </el-select>
                        </div>
                        <div style='margin-left:10px;width:75px;float:left'>
                            <el-select v-model="valueCM3" size='small' placeholder="切换日周月" style='width:75px'  @change="updateListCM(3)">
                                <el-option label="按日" value="day"></el-option>
                                <el-option label="按周" value="week"></el-option>
                                <el-option label="按月" value="month"></el-option>
                            </el-select>
                        </div>
                <div class='dateReportT' style='float:left;'>  
                    <el-date-picker v-model="valueCM2" type="daterange" size='small' :clearable='backface' :picker-options="pickerOptions1" placeholder="选择日期范围" @change="updateListCM(2)">
                    </el-date-picker>
                </div>
                <div style='width:140px;float:left;margin-left:10px'>
                        <el-select v-model="valueCM4" size='small' clearable placeholder="选择校区" @change="updateListCM(4)">
                            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                            </el-option>
                        </el-select>
                    </div>
                    <div style='width:140px;float:left;margin-left:10px'>
                            <el-select v-model="valueCM5" size='small' clearable placeholder="选择渠道" @change="updateListCM(4)" style='width:115px'>
                                <el-option v-for="item in options1" :key="item.id" :label="item.names" :value="item.id">
                                </el-option>
                            </el-select>
                        </div>
            </div>
            <div style="width:90%;position:absolute;top:88px;left:30px;z-index:100;font-size:12px;">
                <span style="display:inline-block;vertical-align: middle;"><img src="../../../static/img/info.png" width='20'alt=""></span>
                <span style="color:grey;line-height:20px;">根据发展客户的次数绘制</span>
            </div>
            <div style="position:absolute;top:88px;right:10px;z-index:100;font-size:12px;">
                <span class='canD' @click='getDownload'> <img src="../../../static/img/output.png" width='35'alt="">
                  </span>
            </div>
            <IEcharts :option="line" style='height:460px;width:100%;float:left'></IEcharts>
            <div id="tableRTMK2" style='width: 90%;margin:10px auto' >
                <el-table :data="resourceCMData" border :show-summary='currentPage==1'  :summary-method='allTotal'
               >
                    <el-table-column prop="day" label="日期">
                    </el-table-column>
                    <el-table-column prop="newResources" label="新资源">
                    </el-table-column>
                    <el-table-column prop="newCall" label="沟通量">
                    </el-table-column>
                    <el-table-column prop="activation" label="资源激活">
                    </el-table-column>
                    <el-table-column prop="invalid" label="无效认证">
                    </el-table-column>
                    <el-table-column prop="returnCall" label="学员回访">
                    </el-table-column>
                </el-table>

                <div class="block">
                    <el-pagination layout="prev, pager, next" :total="total" :current-page="currentPage" :page-size="pagesize" @current-change="handleCurrentChange">
                    </el-pagination>
                </div>
            </div>

        </div>
        <!-- 新资源渠道 -->
        <div style="width:100%;float:left;background: white;position:relative;height:auto;border-radius:5px;">
                <div class="newResourceAn" style="position:relative;padding-top:10px;height:70px;border-bottom:1px solid gainsboro;background:#fafafa">
                    <div style='margin-left:10px;width:100px;float:right;margin-right:5px' v-if='code.includes("_m")'>
                        <el-select class='circleSelect' v-model="valueRE4" size='small'  :placeholder="选择TMK" @change="updateListRE(4)">
                            <el-option v-for="item in ccs" :key="item.key" :label="item.label" :value="item.key">
                            </el-option>
                        </el-select>
                    </div>
                    <!-- <div style='margin-left:10px;width:100px;float:right;margin-right:5px' v-if='code.includes("_c")'>
                        <el-select v-model="valueCM5" size='small' clearable placeholder="选择校区" @change="updateListCM">
                            <el-option v-for="item in ccs" :key="item.aid" :label="item.uname" :value="item.aid">
                            </el-option>
                        </el-select>
                    </div> -->
                    <div style='float:left;'>
                        <h4 style='margin-bottom:10px;padding-top:5px;padding-left:10px'>
                            <span >新资源来源渠道统计</span>
                        </h4>
                    </div>
                        <div style="clear:both"></div>
                    <div style='margin-left:10px;width:110px;float:left'>
                        <el-select v-model="valueRE1" size='small'  placeholder="最近一周" @change="updateListRE(1)">
                                <el-option label="最近一周" value="lastweek"></el-option>
                                <el-option label="最近一个月" value="lastmonth"></el-option>
                        </el-select>
                    </div>
            <div class='dateReportT' style='float:left;margin-left:10px;'>  
                <el-date-picker v-model="valueRE5" type="daterange" size='small' :clearable='backface' :picker-options="pickerOptions1" placeholder="选择日期范围" @change="updateListRE(2)">
                </el-date-picker>
            </div>
                    <div style='width:140px;float:left;margin-left:10px'>
                            <el-select v-model="valueRE3" size='small' clearable placeholder="选择校区" @change="updateListRE(3)">
                                <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                                </el-option>
                            </el-select>
                        </div>
                </div>
                <div style="width:90%;position:absolute;top:88px;left:30px;z-index:100;font-size:12px">
                    <span style="display:inline-block;vertical-align: middle;"><img src="../../../static/img/info.png" width='20'alt=""></span>
                    <span style="color:grey;line-height:20px;">根据新资源的来源渠道绘制</span>
                </div>
                <div style="position:absolute;top:88px;right:10px;z-index:100;font-size:12px;">
                    <span class='canD' @click='getDownload1'> <img src="../../../static/img/output.png" width='35'alt="">
                       </a></span>
                </div>
                <div style='height:480px;width:40%;float:left;position:relative'>
                        <IEcharts :option="pie_radius" style="height:480px;width:100%">
                        </IEcharts>
    
                    </div>
                    <div id="tableRTMK" style='width: 52%;float:left;margin: 60px 3% 30px;'>
                            <el-table :data="resourceData" border  style="width: 100%" show-summary :summary-method='allTotal1'>
                                <el-table-column prop="day" label="渠道">
                                </el-table-column>
                                <el-table-column prop="newResources" label="新资源">
                                </el-table-column>
                                <el-table-column prop="ratio" label="新资源占比">
                                </el-table-column>
                                <el-table-column prop="newCall" label="沟通量">
                                </el-table-column>
                                <el-table-column prop="activation" label="资源激活">
                                </el-table-column>
                                <el-table-column prop="invalid" label="无效认证">
                                </el-table-column>
                                <el-table-column prop="returnCall" label="学员回访">
                                </el-table-column>
                            </el-table>
                        </div>
    
            </div>
            </div>
<!-- 课耗排行榜 -->
<div style="width: 100%;float:left;background: white;margin-top:10px;height:auto;border-radius:5px;position:relative;" v-if='code.includes("_c")'>
    <div class="newResourceAn" style="position:relative;padding-top:10px;height:45px;border-bottom:1px solid gainsboro;background:#fafafa">

        <div style='float:left;'>
            <h4 style='margin-bottom:20px;padding-top:5px;padding-left:10px'>
                业绩排行榜
            </h4>
        </div>
        <div class='dateReportT' style='float:left;margin-left:10px'>
            <el-select v-model="valueSA1" size='small'  placeholder="切换日周月" style='width:115px' @change="updateListSA(1)">
                <el-option label="本日" value="day"></el-option>
                <el-option label="本周" value="week"></el-option>
                <el-option label="本月" value="month"></el-option>
            </el-select>
            <el-date-picker v-model="valueSA2" type="month" size='small' :clearable='backface' placeholder="选择月份" :picker-options="pickerOptions1" @change="updateListSA(2)" style='width:100px'>
            </el-date-picker>
        </div>
        <!-- <div style='width:100px;float:right;margin-right:10px'>
                        <el-select v-model="valueSA4" size='small' clearable placeholder="选择老师" @change="updateList4">
                            <el-option v-for="item in options1" :key="item.id" :label="item.names" :value="item.id">
                            </el-option>
                        </el-select>
                    </div>  -->
    </div>
    <div style="width:90%;font-size:12px;height:50px;margin:10px auto">
        <span style="display:inline-block;vertical-align: middle;"><img src="../../../static/img/info.png" width='20'alt=""></span>
        <!-- <span style="color:grey;line-height:20px;" v-if='code.includes("cc")'>根据签单人头数排列</span> -->
        <span style="color:grey;line-height:20px;">根据到访人数排列</span>
        <div style="margin-top:10px" v-if='!code.includes("_c")'> <span style="display:inline-block;vertical-align: middle;"><img src="../../../static/img/rank.png" width='20'alt=""></span>
            <span style="color:grey;line-height:20px;">我的排名:第{{myRank}}名</span></div>
    </div>
    <div style="position:absolute;top:88px;right:10px;z-index:100;font-size:12px;">
        <span class='canD' @click='getDownload1'> <img src="../../../static/img/output.png" width='35'alt="">
        </span>
    </div>
    <div id="tableRTMK1" style="width:90%;margin:0 auto;position:relative">
        <!-- <el-radio-group v-model="radio3" @change='updateListSA(3)' style="position:absolute;top:-55px;left:45%" v-if="code.includes('_c')">
            <el-radio-button label='teach'>按老师</el-radio-button>
            <el-radio-button label='school'>按校区</el-radio-button>
        </el-radio-group> -->
        <!-- <el-table :data="code.includes('cc')?titleData2:code.includes('tmk')?titleData3:titleData" border style="width: 10%;float:left" :show-header='backface'>
            <el-table-column prop="title" label="日期">
            </el-table-column>
        </el-table> -->
        <el-table :data="SAData1" border y style="width: 100%;float:left" :show-header='backface'>
                <el-table-column prop="title" >
                    </el-table-column>
            <el-table-column prop="val1" >
                    <template scope="scope">
                            <span :style="scope.row.val1==uname?'color:#dc2500': '' ">{{scope.row.val1}}</span>
                        </template>
            </el-table-column>
            <el-table-column prop="val2" >
                    <template scope="scope">
                            <span :style="scope.row.val2==uname?'color:#dc2500': '' ">{{scope.row.val2}}</span>
                        </template>
            </el-table-column>
            <el-table-column prop="val3" >
                    <template scope="scope">
                            <span :style="scope.row.val3==uname?'color:#dc2500': '' ">{{scope.row.val3}}</span>
                        </template>
            </el-table-column>
            <el-table-column prop="val4" >
                    <template scope="scope">
                            <span :style="scope.row.val4==uname?'color:#dc2500': '' ">{{scope.row.val4}}</span>
                        </template>
                </el-table-column>
                <el-table-column prop="val5" >
                        <template scope="scope">
                                <span :style="scope.row.val5==uname?'color:#dc2500': '' ">{{scope.row.val5}}</span>
                            </template>
                </el-table-column>
                <el-table-column prop="val6" >
                        <template scope="scope">
                                <span :style="scope.row.val6==uname?'color:#dc2500': '' ">{{scope.row.val6}}</span>
                            </template>
                </el-table-column>
                <el-table-column prop="val7" >
                        <template scope="scope">
                                <span :style="scope.row.val7==uname?'color:#dc2500': '' ">{{scope.row.val7}}</span>
                            </template>
                    </el-table-column>
                    <el-table-column prop="val8" >
                            <template scope="scope">
                                    <span :style="scope.row.val8==uname?'color:#dc2500': '' ">{{scope.row.val8}}</span>
                                </template>
                    </el-table-column>
                    <el-table-column prop="val9" >
                            <template scope="scope">
                                    <span :style="scope.row.val9==uname?'color:#dc2500': '' ">{{scope.row.val9}}</span>
                                </template>
                    </el-table-column>
                    <el-table-column prop="val10" >
                            <template scope="scope">
                                    <span :style="scope.row.val10==uname?'color:#dc2500': '' ">{{scope.row.val10}}</span>
                                </template>
                        </el-table-column>
        </el-table>
        <div style="clear:both"></div>
        <div class="block">
            <el-pagination layout="prev, pager, next" :total="total3" :current-page="currentPage3" :page-size="pagesize3" @current-change="handleCurrentChange3">
            </el-pagination>
        </div>
    </div>

</div>
    </div>
</template>
<script>
    var token, user
    import IEcharts from 'vue-echarts-v3/src/lite.js';
    import {
        gettmkFormsPiclData,
        gettmkFormsTableData,
        gettmkFormsSource,
        campusList,
        getTMK,
        sourceList,
        gettmkRankList,
        tmkFormsSourceTable,
    } from '../../api/api';
    export default {
        components: {
            IEcharts
        },
        data: () => ({
            dateRangeOptions1: {
                firstDayOfWeek: 1,
                disabledDate(time) {
                    return time.getTime() > Date.now() ;
                }
            },
            pickerOptions1: {
                disabledDate(time) {
                    return time.getTime() > Date.now() ;
                }
            },
            uname:'',
            code: '',
            SAData: [{},{},{}],
            SADataD:[],
            radio3: 'teach',
            currentPage: 1, //页数
            pagesize: 15, //默认每页
            total: 0, //总页数
            // currentPage2: 1, //页数
            // pagesize2: 15, //默认每页
            // total2: 0, //总页数
            currentPage3: 1, //页数
            pagesize3: 3, //默认每页
            total3: 0, //总页数
            ccs: [],
            resourceCMData:[],
            resourceData: [],
            options: [],//校区
            options1: [],//渠道
            valueCM1: '',
            valueCM2: [],
            valueCM3: 'day',
            valueCM4: '',
            valueCM5: '',
            valueCM6:'lastweek',//最近一周
            valueRE1:'lastweek',
            valueRE2:'day',
            valueRE3:'',
            valueRE4:'',
            valueRE5:[],
            valueSA1: 'day',
            valueSA2: '',
            backface: false,
            allT:[],
            line: {
                color: ["#30b44a", "#da7cbb", "#80b8df", "#1fd9a1","#f27a52",  "#decf00",
                "#CD2626", "#4169E1", "#00FA9A", "#008B8B","#8968CD",  "#858585"],
                //  ["#4dc0e5", "#0075aa", "#0baa32", "#b6a800", "#ed6a3a"],
                // title: {
                //     // text: '客户管理趋势图',
                //     textStyle: {
                //         fontSize: 17
                //     },
                //     padding: [15, 5, 5, 5]
                // },
                // dataZoom: [{
                //     // startValue: '2017-05-01',
                //     textStyle:{
                //         fontSize:9
                //     }
                // }, 
                // {
                //     type: 'inside',
                    
                //     // maxSpan:2
                //     // filterMode: 'filter'
                // }],
                tooltip: {
                    trigger: 'axis'
                },
                xAxis: {
                    axisPointer:{
                        snap:true
                    },
                    axisTick: {//刻度设置
                        alignWithLabel: true,
                    // showMaxLabel:true,                 
                        // interval: 0
                    },
                    axisLabel: {
                    // showMinLabel:true,
                    showMaxLabel:true,                    
                    // rotate:90,
                    // interval: 0
                },
                    data: [],

                },
                yAxis: {
                    splitLine: {
                        // show: true
                    }
                },
                grid: {
                    width: '80%',
                    // left: '5%'
                },
                series: [],
                backgroundColor: 'white'
            },
            pie_radius: {
                color: ["#30b44a", "#da7cbb", "#80b8df", "#1fd9a1","#f27a52",  "#decf00",
                "#CD2626", "#4169E1", "#00FA9A", "#008B8B","#8968CD",  "#858585"],
                tooltip: {
                    trigger: 'item',
                    formatter: "{b} : {c} ({d}%)"
                },
                title: {
                    // text: '客户管理趋势图',
                    // textStyle: {
                    //     fontSize: 17
                    // },
                    padding: [15, 15, 15, 15]
                },
                legend: {},
                //     width:'250px',
                //     orient: 'horizontal',
                //     bottom: 10,
                //     data:[{name:'线上TIN',textStyle:{
                //         width:'50px'
                //     }
                // },{name:'线下OUT',textStyle:{
                //     width:'50px'
                //     }
                // },{name:'顺访WI',textStyle:{
                //         width:'50px'
                //     }
                // },{name:'续费',textStyle:{
                //         padding:[0,20,0,0]
                //     }
                // },{name:'转介绍',textStyle:{
                //     padding:[0,14,0,0]
                //     }
                // },{name:'其他',textStyle:{
                //         width:'150px'
                //     }
                // },]
                // },
                // graphic: [{
                //     type: 'image',
                //     id: 'logo',
                //     right: 'center',
                //     top: 'center',
                //     z: -10,
                //     bounding: 'raw',
                //     origin: [75, 75],
                //     style: {
                //         image: '../../../static/img/charts.png',
                //         width: 150,
                //         height: 150,
                //         opacity: 0.4
                //     }
                // }],
                series: [{
                    name: '占比',
                    type: 'pie',
                    radius: ['40%', '60%'],
                    label: {
                        normal: {
                            show: true,
                            formatter: "{b}\n{c}({d}%)",
                            padding: 1
                        }
                    },
                    labelLine: {
                        normal: {
                            length:15,
                            length2: 18
                        }
                    },
                    itemStyle: {
                        emphasis: {
                            shadowBlur: 10,
                            shadowOffsetX: 0,
                            shadowColor: 'rgba(0, 0, 0, 0.5)'
                        }
                    }
                }],
                backgroundColor: 'white'
            },
        }),
        methods: {
            allTotal( columns, data ){
                return this.allT
                // return ['合计',1,1,1,1,1]
            },
            allTotal1( param ){
                const { columns, data } = param;
    const sums = [];
    columns.forEach((column, index) => {
      if (index === 0) {
        sums[index] = '合计';
        return;
      }
      const values = data.map(item => Number(item[column.property]));
      if (!values.every(value => isNaN(value))) {
        sums[index] = values.reduce((prev, curr) => {
          const value = Number(curr);
          if (!isNaN(value)) {
            return prev + curr;
          } else {
            return prev;
          }
        }, 0);
        // sums[index] += ' 元';
      } else {
          if(sums[1]!==0){

              sums[index] = '100%';
          }else{
            sums[index] = '0%'
          }
      }
    });

    return sums;
                // return ['合计',1,1,1,1,1]
            },
            // rowStyle(row, index){
            //     // console.log(row)
            //     if(row.day=='合计'){
            //         return 'color:#1fb5ad'
            //     }
            // },
            handleCurrentChange: function (val) { //变更页数
                this.currentPage = val;this.backToTop();
                this.getCM2Data()
                // this.fetchData();
            },
            // handleCurrentChange2: function (val) { //变更页数
            //     this.currentPage2 = val;
            //     // this.fetchData();
            // },
            getDownload(){
                let para = {
                    tmk_id:this.valueCM1,
                    start_date: this.valueCM2[0] ? new Date(this.valueCM2[0]).toLocaleDateString() : '',
                    end_date:this.valueCM2[1]  ? new Date(this.valueCM2[1]).toLocaleDateString() : '',
                    short_date:this.valueCM6,
                    column:this.valueCM3,
                    school_id:this.valueCM4,
                    source_id:this.valueCM5,
                    download:1
                }
                gettmkFormsPiclData(token, para).then(res => {
                    // let a = 'http://pandatest.dfth.com/download/stream?name=';
                    let a = '/download/stream?name=';
                    window.open( a +res.data.name)
                })
            },
            getDownload1(){
                let para = {
                    tmk_id:this.valueRE4,
                    start_date: this.valueRE5[0]  ? new Date(this.valueRE5[0]).toLocaleDateString() : '',
                    end_date:this.valueRE5[1]  ? new Date(this.valueRE5[1]).toLocaleDateString() : '',
                    short_date:this.valueRE1,
                    column:this.valueRE2,
                    school_id:this.valueRE3,
                    source_id:this.valueCM5,
                    download:1
                }
                tmkFormsSourceTable(token, para).then(res => {
                    // let a = 'http://pandatest.dfth.com/download/stream?name=';
                    let a ='/download/stream?name=';
                    window.open( a+res.data.name)
                })
            },
            handleCurrentChange3: function (val) { //排名变更页数
            this.currentPage3 = val;
            let z = (val-1)*10
            let b = Object.values(this.SADataD[0])
            let d = Object.values(this.SADataD[1])
            let f = Object.values(this.SADataD[2])
                let one = {title:'排名',val1:b[z],val2:b[z+1],val3:b[z+2],val4:b[z+3],val5:b[z+4],val6:b[z+5],val7:b[z+6],val8:b[z+7],val9:b[z+8],val10:b[z+9]};
                let two =  {title:'TMK',val1:d[z],val2:d[z+1],val3:d[z+2],val4:d[z+3],val5:d[z+4],val6:d[z+5],val7:d[z+6],val8:d[z+7],val9:d[z+8],val10:d[z+9]};
                let three =  {title:'到访量',val1:f[z],val2:f[z+1],val3:f[z+2],val4:f[z+3],val5:f[z+4],val6:f[z+5],val7:f[z+6],val8:f[z+7],val9:f[z+8],val10:f[z+9]};
                this.SAData = [one,two,three]
        },
            updateListCM(i) {//第一张表格
                if(i==1&&this.valueCM6!=''){
                    this.valueCM2=[];
                    this.valueCM3='day'
                    this.getCM1Data();
                this.getCM2Data(); 
                }else if(i==3&&this.valueCM2.length!=0){
                    this.valueCM6 = '';
                    this.getCM1Data();
                this.getCM2Data(); 
                }else if(i==2&&this.valueCM2.length!=0){
                    this.valueCM6 = '';
                    this.getCM1Data();
                this.getCM2Data(); 
                }else if(i==4){
                    this.getCM1Data();
                this.getCM2Data(); 
                }
                                  
            },
            getCM1Data() {//折线图
                let para = {
                    tmk_id:this.valueCM1,
                    start_date: this.valueCM2[0] ? new Date(this.valueCM2[0]).toLocaleDateString() : '',
                    end_date:this.valueCM2[1]  ? new Date(this.valueCM2[1]).toLocaleDateString() : '',
                    short_date:this.valueCM6,
                    column:this.valueCM3,
                    school_id:this.valueCM4,
                    source_id:this.valueCM5,
                }
                gettmkFormsPiclData(token, para).then(res => {
                    let data = res.data;
                    // console.log(data)
                    this.line.xAxis.data = data.day;
                    this.line.series = [{ //以后改成动态获取
                        name: "新资源",
                        type: "line",
                        data: data.newResources
                    }, {
                        name: "沟通量",
                        type: "line",
                        data: data.newCall
                    }, {
                        name: "资源激活",
                        type: "line",
                        data: data.activation
                    }, {
                        name: "无效认定",
                        type: "line",
                        data: data.invalid
                    }, {
                        name: "学员回访",
                        type: "line",
                        data: data.returnCall
                    }];
                    this.line.legend = {
                        orient: 'horizontal',
                        bottom: 10,
                        data: ["新资源", "沟通量", "资源激活","无效认定","学员回访"],
                        // backgroundColor:'white'
                    };
                    // this.line.xAxis.axisLabel.showMaxLabel=true
                })
            },
            getCM2Data() {//表格
                let para = {
                    tmk_id:this.valueCM1,
                    start_date: this.valueCM2[0]  ? new Date(this.valueCM2[0]).toLocaleDateString() : '',
                    end_date:this.valueCM2[1]  ? new Date(this.valueCM2[1]).toLocaleDateString() : '',
                    short_date:this.valueCM6,
                    column:this.valueCM3,
                    school_id:this.valueCM4,
                    source_id:this.valueCM5,
                    page:this.currentPage
                }
                gettmkFormsTableData(token, para).then(res => {//替换接口
                let a = res.data.data;
                let c = res.data.last_page * this.pagesize;
                this.total = parseInt(c);
                this.resourceCMData = a;
                if(this.currentPage==1){

                    this.allT = res.data.sum.split(',')
                }
                })
            },
            // handleCommandCM(command) {//最近一周切换
            //     this.titleCM = command;
            //     this.valueCM2 = ''
            //     if (command == '最近一周') {
            //         this.periodCM = 'w'
            //     } else {
            //         this.periodCM = 'm'
            //     }
            //     // this.getSAData();
            //     //调服务查询表单
            // },
            updateListRE(i) {//第一张表格
                if(i==1&&this.valueRE1!=''){
                    this.valueRE5=[];
                    this.valueRE2='day'
                    this.getRE1Data();
                this.getRE2Data(); 
                }else if(i==3&&this.valueRE5.length!=0){
                    this.valueRE1 = '';
                    this.getRE1Data();
                    this.getRE2Data();  
                }else if(i==2&&this.valueRE5.length!=0){
                    this.valueRE1 = '';
                    this.getRE1Data();
                    this.getRE2Data(); 
                }else if(i==4){
                    this.getRE1Data();
                    this.getRE2Data(); 
                }
                                  
            },
            getRE1Data(i) {//饼状图
                let para = {
                    tmk_id:this.valueRE4,
                    start_date: this.valueRE5[0]  ? new Date(this.valueRE5[0]).toLocaleDateString() : '',
                    end_date:this.valueRE5[1]  ? new Date(this.valueRE5[1]).toLocaleDateString() : '',
                    short_date:this.valueRE1,
                    column:this.valueRE2,
                    school_id:this.valueRE3,
                    source_id:this.valueCM5,
                    page:this.currentPage
                }
                gettmkFormsSource(token, para).then(res => {
                    let data = res.data;
                    // console.log(data)
                    let dd = data.map(item=>{
                        return {value:item.value,name:item.names}
                    })
                    let arr = data.map(item=>{
                        return item.names
                    })
                    this.pie_radius.series[0].data = dd;
                    this.pie_radius.legend= {
                        show:false,
                    width:'80%',
                    orient: 'horizontal',
                    bottom: 0,
                //     data:[{name:'线上TIN',textStyle:{
                //         width:'50px'
                //     }
                // },{name:'线下OUT',textStyle:{
                //     width:'50px'
                //     }
                // },{name:'顺访WI',textStyle:{
                //         width:'50px'
                //     }
                // },{name:'续费',textStyle:{
                //         padding:[0,20,0,0]
                //     }
                // },{name:'转介绍',textStyle:{
                //     padding:[0,14,0,0]
                //     }
                // },{name:'其他',textStyle:{
                //         width:'150px'
                //     }
                // },]
                    data: arr
                }
                    // this.resourceData = data;
                })
            },
            getRE2Data() {//表格
                let para = {
                    tmk_id:this.valueRE4,
                    start_date: this.valueRE5[0]  ? new Date(this.valueRE5[0]).toLocaleDateString() : '',
                    end_date:this.valueRE5[1]  ? new Date(this.valueRE5[1]).toLocaleDateString() : '',
                    short_date:this.valueRE1,
                    column:this.valueRE2,
                    school_id:this.valueRE3,
                }
                tmkFormsSourceTable(token, para).then(res => {//替换接口
                let a = res.data;
                // let c = res.data.last_page * this.pagesize;
                // this.total = parseInt(c);
                this.resourceData = a;
                })
            },
            // getRE2Data() {//表格
            //     let para = {
            //         // period:this.periodCM,
            //         // startDay: this.valueCM2[0] != null? new Date(this.valueCM2[0]).toLocaleDateString(): '',
            //         // endDay: this.valueCM2[1] != null? new Date(this.valueCM2[1]).toLocaleDateString(): '',                    
            //         // cc_id: this.valueCM1
            //     }
            //     getReport1(token, para).then(res => {
            //         this.resourceData = res.data
            //     })
            // },
            updateListSA(i) {//第三张表格排行榜
                if (i==1&&this.valueSA1) {
                    // console.log(1)
                    this.valueSA2 = '';
                    this.getSAData();
                }else if (i==2&&this.valueSA2 != '') {
                    
                    this.valueSA1 = '';
                    this.getSAData();
                    // this.getRE1Data(i);
                }else if(i==3){
                    this.getSAData();
                    // this.getSAData();
                }
            },
            getSAData() {
                let para = {
                    column:this.valueSA1,
                    month:this.valueSA2?new Date(this.valueSA2).toLocaleDateString():'',
                    view:this.radio3
                    // period:this.periodCM,
                    // startDay: this.valueCM2[0] != null? new Date(this.valueCM2[0]).toLocaleDateString(): '',
                    // endDay: this.valueCM2[1] != null? new Date(this.valueCM2[1]).toLocaleDateString(): '',                    
                    // cc_id: this.valueCM1
                }
                gettmkRankList(token, para).then(res => {
                    gettmkRankList(token, para).then(res => {
                this.SAData = res.data;
                for (let key in this.SAData[0]){
                this.SAData[0][key] = '第'+this.SAData[0][key]+ '名'
            }
                this.SADataD[0] = {...this.SAData[0]}
                this.SADataD[1] = {...this.SAData[1]}
                this.SADataD[2] = {...this.SAData[2]}
                
                    this.SAData[0].title='排名';
                    this.SAData[1].title='TMK';
                    this.SAData[2].title='到访量';
                
                this.myRank = res.data[res.data.length-1].val1;
                let a = Math.ceil(Object.getOwnPropertyNames(res.data[0]).length/10)
                let c = a * this.pagesize3;
                this.total3 = parseInt(c);
            })
                })
            },
            exchange(el1, el2){//交换节点
        let ep1 = el1.parentNode
        // ep2 = el2.parentNode,//如果不是在同一个父级里
        let index1 = Array.prototype.indexOf.call(ep1.children, el1);//el1在父级里的index
        let index2 = Array.prototype.indexOf.call(ep1.children, el2);//el2在父级里的index
    // ep2.insertBefore(el1,ep2.children[index2]);
    ep1.insertBefore(el2,ep1.children[index1]);//因为是同一个父级ep1,所以直接在父级ep1里,把el2插到el1前面
},
        },
        beforeCreate() {
            user = sessionStorage.getItem('user');
            token = JSON.parse(user).token;
        },
        computed: {
        SAData1(){
            // let a = this.SADataD[0];
            // for (let key in this.SADataD[0]){
            //     this.SADataD[0][key] = '第'+this.SADataD[0][key]+ '名'
            // }
            return this.SAData.slice(0,3)
        },
        format: function () {
            let a = new Date(this.valueRE1)
            let year = a.getFullYear();
            let month = a.getMonth()
            let day = a.getDate() - 1;
            let thisWeekStart = new Date(year, month, day).toLocaleDateString()
            let year1 = a.getFullYear();
            let month1 = a.getMonth()
            let day1 = a.getDate() + 5;
            let thisWeekEnd = new Date(year1, month1, day1).toLocaleDateString()
            let dis = thisWeekStart + ' ~ ' + thisWeekEnd;
            return dis
        }
    },
    mounted(){
        let a = document.getElementById("tableRTMK2").getElementsByClassName("el-table__body-wrapper")[0];
        let b = document.getElementById("tableRTMK2").getElementsByClassName("el-table__footer-wrapper")[0];   
        this.exchange(a,b);
        let c = document.getElementById("tableRTMK").getElementsByClassName("el-table__body-wrapper")[0];
        let d = document.getElementById("tableRTMK").getElementsByClassName("el-table__footer-wrapper")[0];   
        this.exchange(c,d)
    },
        created() {
            document.body.scrollTop = 0
            this.code = JSON.parse(user).job ? JSON.parse(user).job.code : '';
            this.aid = JSON.parse(user).aid ? JSON.parse(user).aid : ''; //获取aid
            this.uname = JSON.parse(user).uname ? JSON.parse(user).uname : '';
            if(this.code==='tmk'){
                this.getCM1Data();
                this.getCM2Data();
                this.getRE1Data();
                this.getRE2Data();
                
            }
            
            if(this.code.includes('_c')){
                this.getCM1Data();
                this.getCM2Data();
                this.getRE1Data();
                this.getRE2Data();                    
                this.getSAData();
            }
            if (this.code === 'tmk_m') {
                getTMK(token).then((res) => {
                    this.ccs = res.data
                    this.ccs.unshift({key:'0',label:'全部TMK'})
                }).then(()=>{
                    this.valueCM1 = this.aid+'';
                    this.valueRE4 = this.aid+'';
                    this.getRE1Data();
                    this.getRE2Data();
                })
            }
            let cam = {
        simple: '1'
    };
    campusList(cam, token).then((res) => {//获取校区
        let a = res.data;
        this.options = a.map(item => {
            return {
                value: item.id,
                label: item.title
            };
        });
    })
            sourceList(token).then(res => {
        this.options1 = res.data

    })
            // this.getSAData();
            // this.getSTData();
            // this.getSRData();
            // let cam = {
            //     simple: '1'
            // };
            // campusList(cam, token).then((res) => { //获取校区
            //     let a = res.data;
            //     this.options = a.map(item => {
            //         return {
            //             value: item.id,
            //             label: item.title
            //         };
            //     });
            // })
            // sourceList(token).then(res => {
            //     this.options1 = res.data

            // })
            
            // this.line.xAxis.data = ["2017-05-01", "2017-05-02", "2017-05-03", "2017-05-04", "2017-05-05", "2017-05-06", "2017-05-07",
            // "2017-05-08", "2017-05-09", "2017-05-10", "2017-05-11", "2017-05-12", "2017-05-13", "2017-05-14",
            // "2017-05-15", "2017-05-16", "2017-05-17", "2017-05-18", "2017-05-19", "2017-05-20", "2017-05-21",
            // "2017-05-22", "2017-05-23", "2017-05-24", "2017-05-25", "2017-05-26", "2017-05-27", "2017-05-28",
            // "2017-05-29", "2017-05-30", "2017-05-31", 
            // "2017-06-01", "2017-06-02", "2017-06-03", "2017-06-04", "2017-06-05", "2017-06-06", "2017-06-07",
            // "2017-06-08", "2017-06-09", "2017-06-10", "2017-06-11", "2017-06-12", "2017-06-13", "2017-06-14",
            // "2017-06-15", "2017-06-16", "2017-06-17", "2017-06-18", "2017-06-19", "2017-06-20", "2017-06-21",
            // "2017-06-22", "2017-06-23", "2017-06-24", "2017-06-25", "2017-06-26", "2017-06-27", "2017-06-28",
            // "2017-06-29", "2017-06-30",  ]
            // this.line.xAxis.axisLabel={
            //     showMinLabel:true,
            //     //     showMaxLabel:true,
            // }
            // this.line.series = [{ //以后改成动态获取
            //     name: "新资源",
            //     type: "line",
            //     data: [2, 5, 10, 5, 1, 5, 10,2, 5, 10, 5, 1, 5, 10,2, 5, 10, 5, 1, 5, 10,2, 5, 10, 5, 1, 5, 10,2, 5, 10, 5, 1, 5, 10,2, 5, 10, 5, 1, 5, 10]
            // }, {
            //     name: "沟通量",
            //     type: "line",
            //     data: [3, 10, 12, 3, 9, 0, 2,3, 10, 12, 3, 9, 0, 2,3, 10, 12, 3, 9, 0, 2,3, 10, 12, 3, 9, 0, 2,3, 10, 12, 3, 9, 0, 2,3, 10, 12, 3, 9, 0, 2]
            // }, {
            //     name: "资源激活",
            //     type: "line",
            //     data: [4, 8, 18, 15, 4, 2, 1,4, 8, 18, 15, 4, 2, 1,4, 8, 18, 15, 4, 2, 1,4, 8, 18, 15, 4, 2, 1,4, 8, 18, 15, 4, 2, 1,4, 8, 18, 15, 4, 2, 1,]
            // }, {
            //     name: "无效认定",
            //     type: "line",
            //     data: [5, 11, 9, 4,19, 10, 12]
            // }, {
            //     name: "学员回访",
            //     type: "line",
            //     data: [14, 18, 8, 5, 14, 12, 11]
            // }]
           
            // this.pie_radius.series[0].data = [
            //     {
            //     value: 0,
            //     name: '线上TIN'
            // }, {
            //     value: 0,
            //     name: '线下OUT'
            // }, {
            //     value: 0,
            //     name: '顺访WI'
            // }, {
            //     value: 0,
            //     name: '续费'
            // }, {
            //     value: 0,
            //     name: '转介绍'
            // }, {
            //     value: 30,
            //     name: '其他'
            // }]


        }
    }

</script>
<style>
   #tableRTMK2 .el-table th, #tableRTMK .el-table th{
       background: #f2f2f2
   } 
   #tableRTMK .el-table th>div,#tableRTMK2 .el-table th>div{
    background: #f2f2f2
    } 
    .echarts {
        float: left;
        width: 100%;
        height: 400px;
        z-index: 1;
    }
    #tableRTMK2 .el-table__footer-wrapper, #tableRTMK .el-table__footer-wrapper{
        color:#1fb5ad
    }
    /* #tableRTMK1TMK{
         height: 443px;
     } */

    /* #tableRTMK .el-table__empty-block {
        min-height: 120px;
    } */
/*     
    #tableright {
        border-left: none;
    } */

    /* #tableRTMK .el-table td:not(.gutter),
    #tableRTMK .el-table th:not(.gutter) {
        padding: 5px 5px;
        text-align: center
    }

    #tableRTMK .el-table th>div,
    #tableRTMK .el-table .cell {
        padding-left: 0;
        padding-right: 0;
    }

    #tableRTMK1 .el-table td:not(.gutter),
    #tableRTMK1 .el-table th:not(.gutter) {
        padding: 5px 5px;
        text-align: center
    }

    #tableRTMK1 .el-table th>div,
    #tableRTMK1 .el-table .cell {
        padding-left: 0;
        padding-right: 0;
    }

    #tableRTMK2 .el-table td:not(.gutter),
    #tableRTMK2 .el-table th:not(.gutter) {
        padding: 5px 5px;
        text-align: center
    }

    #tableRTMK2 .el-table th>div,
    #tableRTMK2 .el-table .cell {
        padding-left: 0;
        padding-right: 0;
    }
    */
    
    /* #tableRTMK1 .el-table__footer .gutter {
            display: none
        }
    
        #tableRTMK2 .el-table__footer .gutter {
            display: none
        }
        #tableRTMK1TMK .el-table__footer .gutter {
            display: none
        } */

    .block {
        text-align: center;
        margin-top: 10px;
    }

    /* .drop .el-dropdown {
        font-size: 1em;
        color: black;
    } */

    .dateReportT .el-date-editor--daterange.el-input {
        width: 191px
    }

    #reportCCdate .el-date-editor--daterange.el-input {
        width: 169px
    }

    /* .echarts .drop .el-dropdown {
        color: rgb(31, 181, 173);
    } */

    /* .newResourceAn .drop .el-dropdown {
        color: rgb(31, 181, 173);
    } */

    /* .backfa {
        transform: rotateY(180deg);
        backface-visibility: hidden;
    }

    .backfa1 {
        transform: rotateY(180deg);
        backface-visibility: hidden;
    } */
    .circleSelect .el-input__inner{
border-radius: 28px
}
.canD:hover{
cursor: pointer
}
</style>
