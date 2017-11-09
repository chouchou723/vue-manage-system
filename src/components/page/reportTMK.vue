<template>
        <div>
            <!-- <div class="crumbs">
                <el-breadcrumb separator="/">
                    <el-breadcrumb-item><i class="el-icon-my-tongjifenxi"></i> TMK工作量</el-breadcrumb-item>
                </el-breadcrumb>
            </div> -->
            <!-- 合同变更统计 -->
            <div style='display:flex'>
            <div style="width: 62.5%;margin-right:0.5%;float:left;background: white;position:relative;height:auto;border-radius:5px;">
                <div class="newResourceAn" style="position:relative;padding-top:10px;height:70px;border-bottom:1px solid gainsboro;background:#fafafa">
                    <div style='margin-left:10px;width:100px;float:right;margin-right:5px' v-if='code.includes("_m")'>
                        <el-select class='circleSelect' v-model="valueCM1" size='small' clearable :placeholder="code.includes('cc')?'选择CC':code.includes('tmk')?'选择TMK':'选择老师'" @change="updateListCM(4)">
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
                            <span>工作量</span>
                        </h4>
                    </div>
                   
                    <!-- <div class='drop' style='float:left;width:111px;margin-top:4px;margin-left:4px'>
                        <el-dropdown @command="handleCommandCM">
                            <span class="el-dropdown-link">
            [{{titleCM}}<i class="el-icon-caret-bottom el-icon--right"></i>]
          </span>
                            <el-dropdown-menu slot="dropdown">
                                <el-dropdown-item command="最近一周">最近一周</el-dropdown-item>
                                <el-dropdown-item command="最近一个月">最近一个月</el-dropdown-item>
                            </el-dropdown-menu>
                        </el-dropdown>
                    </div> -->
                    <!-- <div style='margin-left:10px;width:140px;float:left'>
                            <el-select v-model="value6" size='small' clearable placeholder="选择校区" @change="updateList4">
                                <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                                </el-option>
                            </el-select>
                        </div>
                        <div style='width:140px;float:left;margin-left:10px'>
                            <el-select v-model="value7" size='small' clearable placeholder="渠道来源" @change="updateList4">
                                <el-option v-for="item in options1" :key="item.id" :label="item.names" :value="item.id">
                                </el-option>
                            </el-select>
                        </div> -->
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
                <IEcharts :option="line" style='height:460px;width:100%;float:left'></IEcharts>
                <div id="tableRTMK2" style='width: 90%;margin:0 auto'>
                    <el-table :data="resourceCMData" border  style="width: 100%">
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
            <div style="width: 37%;float:left;background: white;position:relative;height:auto;border-radius:5px;">
                    <div class="newResourceAn" style="position:relative;padding-top:10px;height:70px;border-bottom:1px solid gainsboro;background:#fafafa">
                        <div style='margin-left:10px;width:100px;float:right;margin-right:5px' v-if='code.includes("_m")'>
                            <el-select class='circleSelect' v-model="valueRE4" size='small' clearable :placeholder="code.includes('cc')?'选择CC':code.includes('tmk')?'选择TMK':'选择老师'" @change="updateListRE">
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
                        <!-- <div class='drop' style='float:left;width:111px;margin-top:4px;margin-left:4px'>
                            <el-dropdown @command="handleCommandCM">
                                <span class="el-dropdown-link">
                [{{titleCM}}<i class="el-icon-caret-bottom el-icon--right"></i>]
              </span>
                                <el-dropdown-menu slot="dropdown">
                                    <el-dropdown-item command="最近一周">最近一周</el-dropdown-item>
                                    <el-dropdown-item command="最近一个月">最近一个月</el-dropdown-item>
                                </el-dropdown-menu>
                            </el-dropdown>
                        </div> -->
                        <!-- <div style='margin-left:10px;width:140px;float:left'>
                                <el-select v-model="value6" size='small' clearable placeholder="选择校区" @change="updateList4">
                                    <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                                    </el-option>
                                </el-select>
                            </div>
                            <div style='width:140px;float:left;margin-left:10px'>
                                <el-select v-model="value7" size='small' clearable placeholder="渠道来源" @change="updateList4">
                                    <el-option v-for="item in options1" :key="item.id" :label="item.names" :value="item.id">
                                    </el-option>
                                </el-select>
                            </div> -->
                            <div style="clear:both"></div>
                        <div style='float:left;margin-left:10px'>
                            <el-date-picker v-model="valueRE1" type="week" size='small' :clearable='backface' placeholder="周选择" :picker-options="dateRangeOptions1" @change="updateListRE(1)" style='width:100px'>
                                </el-date-picker>
                        </div>
                        <div  style='float:left;margin-left:10px'>
                            <el-date-picker v-model="valueRE2" type="month" size='small' :clearable='backface' placeholder="月选择" :picker-options="pickerOptions1" @change="updateListRE(2)" style='width:100px'>
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
                    <div style='height:460px;width:100%;float:left;position:relative'>
                            <IEcharts :option="pie_radius" style="height:460px;width:100%">
                            </IEcharts>
        
                        </div>
                    <div id="tableRTMK" style='width: 90%;margin:10px auto'>
                        <el-table :data="resourceData" border show-summary style="width: 100%">
                            <el-table-column prop="names" label="排名">
                            </el-table-column>
                            <el-table-column prop="value" label="人数">
                            </el-table-column>
                            <el-table-column prop="ratio" label="占比">
                            </el-table-column>
                        </el-table>
        
                        <!-- <div class="block">
                            <el-pagination layout="prev, pager, next" :total="total2" :current-page="currentPage2" :page-size="pagesize2" @current-change="handleCurrentChange2">
                            </el-pagination>
                        </div> -->
                    </div>
        
                </div>
                </div>
    <!-- 课耗排行榜 -->
    <div style="width: 100%;float:left;background: white;margin-top:10px;height:auto;border-radius:5px" v-if='code.includes("_c")'>
        <div class="newResourceAn" style="position:relative;padding-top:10px;height:45px;border-bottom:1px solid gainsboro;background:#fafafa">

            <div style='float:left;'>
                <h4 style='margin-bottom:20px;padding-top:5px;padding-left:10px'>
                    业绩排行榜
                </h4>
            </div>
            <!-- <div class='drop' style='float:left;width:111px;margin-top:4px;margin-left:4px'>
                        <el-dropdown @command="handleCommandCM">
                            <span class="el-dropdown-link">
        [{{titleSA}}<i class="el-icon-caret-bottom el-icon--right"></i>]
      </span>
                            <el-dropdown-menu slot="dropdown">
                                <el-dropdown-item command="最近一周">最近一周</el-dropdown-item>
                                <el-dropdown-item command="最近一个月">最近一个月</el-dropdown-item>
                            </el-dropdown-menu>
                        </el-dropdown>
                    </div> -->
            <!-- <div style='margin-left:10px;width:140px;float:left'>
                        <el-select v-model="value6" size='small' clearable placeholder="选择校区" @change="updateList4">
                            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                            </el-option>
                        </el-select>
                    </div>
                    <div style='width:140px;float:left;margin-left:10px'>
                        <el-select v-model="value7" size='small' clearable placeholder="渠道来源" @change="updateList4">
                            <el-option v-for="item in options1" :key="item.id" :label="item.names" :value="item.id">
                            </el-option>
                        </el-select>
                    </div> -->
            <!-- <div style='width:140px;float:left;margin-left:10px'>
                            <el-select v-model="valueCM4" size='small' clearable placeholder="课程选择" @change="updateList4">
                                <el-option v-for="item in options1" :key="item.id" :label="item.names" :value="item.id">
                                </el-option>
                            </el-select>
                        </div>  -->
            <div class='dateReportT' style='float:left;margin-left:10px'>
                <el-select v-model="valueSA1" size='small'  placeholder="切换日周月" style='width:115px' @change="updateListSA(1)">
                    <el-option label="本日" value="1"></el-option>
                    <el-option label="本周" value="2"></el-option>
                    <el-option label="本月" value="3"></el-option>
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
            <div style="margin-top:10px"> <span style="display:inline-block;vertical-align: middle;"><img src="../../../static/img/rank.png" width='20'alt=""></span>
                <span style="color:grey;line-height:20px;">我的排名:第十名</span></div>
        </div>
        <div id="tableRTMK1" style="width:90%;margin:0 auto;position:relative">
            <el-radio-group v-model="radio3" @change='updateListSA(3)' style="position:absolute;top:-55px;left:45%" v-if="code.includes('_c')">
                <el-radio-button :label='teach'>按老师</el-radio-button>
                <el-radio-button :label='school'>按校区</el-radio-button>
            </el-radio-group>
            <el-table :data="code.includes('cc')?titleData2:code.includes('tmk')?titleData3:titleData" border style="width: 10%;float:left" :show-header='backface'>
                <el-table-column prop="title" label="日期">
                </el-table-column>
            </el-table>
            <el-table :data="SAData" border y style="width: 90%;float:left" :show-header='backface' id='tableright'>
                <el-table-column prop="val1" >
                </el-table-column>
                <el-table-column prop="val2" >
                </el-table-column>
                <el-table-column prop="val3" >
                </el-table-column>
                <el-table-column prop="val4" >
                    </el-table-column>
                    <el-table-column prop="val5" >
                    </el-table-column>
                    <el-table-column prop="val6" >
                    </el-table-column>
                    <el-table-column prop="val7" >
                        </el-table-column>
                        <el-table-column prop="val8" >
                        </el-table-column>
                        <el-table-column prop="val9" >
                        </el-table-column>
                        <el-table-column prop="val10" >
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
        import IEcharts from 'vue-echarts-v3';
        import {
            gettmkFormsPiclData,
            gettmkFormsTableData,
            gettmkFormsSource,
            campusList,
            getTMK,
            sourceList,
            gettmkRankList
        } from '../../api/api';
        export default {
            components: {
                IEcharts
            },
            data: () => ({
                titleData: [{
                    title: '排名'
                }, {
                    title: '老师'
                }, {
                    title: '课耗量'
                }],
                titleData2: [{
                    title: '排名'
                }, {
                    title: 'CC'
                }, {
                    title: '签单量'
                }],
                titleData3: [{
                    title: '排名'
                }, {
                    title: 'TMK'
                }, {
                    title: '到访量'
                }],
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
                code: '',
                radio3: 'teach',
                currentPage: 1, //页数
                pagesize: 15, //默认每页
                total: 0, //总页数
                currentPage2: 1, //页数
                pagesize2: 15, //默认每页
                total2: 0, //总页数
                currentPage3: 1, //页数
                pagesize3: 15, //默认每页
                total3: 0, //总页数
                ccs: [],
                resourceCMData:[],
                resourceData: [],
                SAData: [{},{},{}],
                options: [],//校区
                options1: [],//渠道
                titleCM: '最近一周',
                valueCM1: '',
                valueCM2: [],
                valueCM3: 'day',
                valueCM4: '',
                valueCM5: '',
                valueCM6:'lastweek',//最近一周
                periodCM: 'w',
                valueRE1:new Date(),
                valueRE2:'',
                valueRE3:'',
                valueRE4:'',
                valueSA1: '1',
                valueSA2: '',
                backface: false,
                line: {
                    color: ["#4dc0e5", "#0075aa", "#0baa32", "#b6a800", "#ed6a3a"],
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
                        axisTick: {//刻度设置
                            alignWithLabel: true,
                            // interval: 0
                        },
                        axisLabel: {
                        // showMinLabel:true,
                        showMaxLabel:true,                    
                        // rotate:90,
                        // interval: 0
                    },
                        data: []
    
                    },
                    yAxis: {
                        splitLine: {
                            show: true
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
                        padding: [5, 5, 5, 5]
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
                handleCurrentChange: function (val) { //变更页数
                    this.currentPage = val;
                    // this.fetchData();
                },
                handleCurrentChange2: function (val) { //变更页数
                    this.currentPage2 = val;
                    // this.fetchData();
                },
                handleCurrentChange3: function (val) { //变更页数
                    this.currentPage3 = val;
                    // this.fetchData();
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
                    }
                    gettmkFormsTableData(token, para).then(res => {
                    let a = res.data.data;
                    let c = res.data.last_page * this.pagesize;
                    this.total = parseInt(c);
                    this.resourceCMData = a;
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
                updateListRE(i) {//第二张表格
                    if (i==1&&this.valueRE1) {
                        // console.log(1)
                        this.valueRE2 = '';
                        this.getRE1Data(i);
                    }else if (i==2&&this.valueRE2 != '') {
                        
                        this.valueRE1 = '';
                        this.getRE1Data(i);
                    }else if(i==3){
                        if(this.valueRE1){
                            console.log(1)
                            this.getRE1Data(1);
                        }else{
                            this.getRE1Data(2);                            
                        }
                    }
                   
                },
                getRE1Data(i) {//饼状图
                    let para = {
                        start_date: i==1?new Date(this.valueRE1).toLocaleDateString():i==2?new Date(this.valueRE2).toLocaleDateString():new Date().toLocaleDateString(),//周or月
                        short_date:i==2?'lastmonth':'lastweek',
                        school_id: this.valueRE3,//校区
                        tmk_uid:this.valueRE4,//tmk
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
                    },
                        this.resourceData = data;
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
                updateListSA(i) {//第三张表格
                    if (i==1&&this.valueSA1) {
                        // console.log(1)
                        this.valueSA2 = '';
                        // this.getRE1Data(i);
                    }else if (i==2&&this.valueSA2 != '') {
                        
                        this.valueSA1 = '';
                        // this.getRE1Data(i);
                    }else if(i==3){

                        // this.getSAData();
                    }
                },
                getSAData() {
                    let para = {
                        column:this.valueSA1,
                        month:this.valueSA2,
                        view:this.radio3
                        // period:this.periodCM,
                        // startDay: this.valueCM2[0] != null? new Date(this.valueCM2[0]).toLocaleDateString(): '',
                        // endDay: this.valueCM2[1] != null? new Date(this.valueCM2[1]).toLocaleDateString(): '',                    
                        // cc_id: this.valueCM1
                    }
                    gettmkRankList(token, para).then(res => {
                        this.SAData = res.data
                    })
                },
            },
            beforeCreate() {
                user = sessionStorage.getItem('user');
                token = JSON.parse(user).token;
            },
            created() {
                document.body.scrollTop = 0
                this.code = JSON.parse(user).job ? JSON.parse(user).job.code : '';
                this.aid = JSON.parse(user).aid ? JSON.parse(user).aid : ''; //获取aid

                this.getCM1Data();
                this.getCM2Data();
                this.getRE1Data(0);
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
                if (this.code == 'tmk_m'||this.code=='cc_c') {
                    getTMK(token).then((res) => {
                        this.ccs = res.data
                        this.ccs.unshift({key:'0',label:'全部TMK'})
                    }).then(()=>{
                        this.valueCM1 = this.aid+'';
                    })
                }
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
        /* #tableRTMK1TMK{
             height: 443px;
         } */
    
        /* #tableRTMK .el-table__empty-block {
            min-height: 120px;
        } */
    
        #tableright {
            border-left: none;
        }
    
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
    
        .drop .el-dropdown {
            font-size: 1em;
            color: black;
        }
    
        .dateReportT .el-date-editor--daterange.el-input {
            width: 191px
        }
    
        #reportCCdate .el-date-editor--daterange.el-input {
            width: 169px
        }
    
        .echarts .drop .el-dropdown {
            color: rgb(31, 181, 173);
        }
    
        .newResourceAn .drop .el-dropdown {
            color: rgb(31, 181, 173);
        }
    
        .backfa {
            transform: rotateY(180deg);
            backface-visibility: hidden;
        }
    
        .backfa1 {
            transform: rotateY(180deg);
            backface-visibility: hidden;
        }
        .circleSelect .el-input__inner{
    border-radius: 28px
}
    </style>
    