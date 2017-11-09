<template>
    <div>
        <!-- <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-my-tongjifenxi"></i> 合同变更流失表</el-breadcrumb-item>
            </el-breadcrumb>
        </div> -->
        <!-- 合同变更统计 -->
        <div style="width: 100%;float:left;background: white;position:relative;height:auto;border-radius:5px">
            <div class="newResourceAn" style="position:relative;padding-top:10px;height:45px;border-bottom:1px solid gainsboro;background:#fafafa">
                <div style='margin-left:10px;width:100px;float:right;margin-right:5px' v-if='code.includes("_m")'>
                    <el-select class='circleSelect' v-model="valueCM1" size='small'  :placeholder="code.includes('cc')?'选择CC':code.includes('tmk')?'选择TMK':'选择老师'" @change="updateListCM(4)">
                        <el-option v-for="item in ccs" :key="item.aid" :label="item.uname" :value="item.aid">
                        </el-option>
                    </el-select>
                </div>
                <div style='margin-left:10px;width:100px;float:right;margin-right:5px' v-if='code.includes("_c")'>
                    <el-select class='circleSelect' v-model="valueCM5" size='small' clearable placeholder="选择校区" @change="updateListCM(4)">
                        <el-option v-for="item in schoolList" :key="item.id" :label="item.title" :value="item.id">
                        </el-option>
                    </el-select>
                </div>
                <div style='float:left;'>
                    <h4 style='margin-bottom:20px;padding-top:5px;padding-left:10px'>
                        <span v-if='code.includes("cc")'>工作量</span>
                        <span v-if='code.includes("tmk")'>资源发展</span>
                    </h4>
                </div>
                <div style='margin-left:10px;width:110px;float:left'>
                    <el-select v-model="valueCM6" size='small' clearable placeholder="最近一周" @change="updateListCM(1)">
                            <el-option label="最近一周" value="lastweek"></el-option>
                            <el-option label="最近一个月" value="lastmonth"></el-option>
                    </el-select>
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
                <div style='width:140px;float:left;margin-left:10px' v-if='code.includes("teach")'>
                    <el-select v-model="valueCM4" size='small' clearable placeholder="课程选择" @change="updateListCM(4)"  >
                        <el-option v-for="item in options1" :key="item.id" :label="item.names" :value="item.id">
                        </el-option>
                    </el-select>
                </div>
                <div style='width:75px;float:left;margin-left:10px' >
                        <el-select v-model="valueCM3" size='small' placeholder="切换日周月" style='width:75px' @change="updateListCM(3)">
                                <el-option label="按日" value="day"></el-option>
                                <el-option label="按周" value="week"></el-option>
                                <el-option label="按月" value="month"></el-option>
                        </el-select>
                    </div>
                <div class='dateReportS' style='float:left;'>
                   
                    <el-date-picker v-model="valueCM2" type="daterange" size='small' :clearable='backface' placeholder="选择日期范围" @change="updateListCM(2)">
                    </el-date-picker>
                </div>
            </div>
            <div style="width:90%;position:absolute;top:62px;left:30px;z-index:100;font-size:12px">
                <span style="display:inline-block;vertical-align: middle;"><img src="../../../static/img/info.png" width='20'alt=""></span>
                <span style="color:grey;line-height:20px;">根据发展客户的次数绘制</span>
            </div>
            <IEcharts :option="line" style='height:400px;width:60%;position:absolute;left:0;margin-bottom:10px;'></IEcharts>
            <div style="float:right;width:39%">
                <div style='height:400px;width:100%;float:left;position:relative;margin-bottom:10px;'>
                    <IEcharts :option="funnel" style="height:400px;width:100%">
                    </IEcharts>
                    <div style="position:absolute;bottom:-20px;left:0;width:80%;height:66px;font-size:22px;text-align:center;display:flex;justify-content:center">
                        <div style="flex:auto">
                            <div>12%</div>
                            <div style="color:grey">邀约率</div>
                        </div>
                        <div style="flex:auto;border-left: 1px solid gainsboro;border-right: 1px solid gainsboro;">
                            <div>12%</div>
                            <div style="color:grey">到访率</div>
                        </div>
                        <div style="flex:auto">
                            <div>12%</div>
                            <div style="color:grey">签单率</div>
                        </div>

                    </div>

                </div>
                <!-- <div style='height:400px;width:50%;float:left;display:flex;justify-content: center;align-items: center;flex-direction: column;'>
                            <div style='width: 100%;display: flex;justify-content: space-around;align-items: baseline;padding:5px' v-for='item in frozenlist'>
                                <span style="color:#20a0ff">{{item.title}}</span>
                                <span>{{item.num}}</span>
                                <span>{{item.rate}}</span>
                            </div>
                        </div> -->
            </div>
            <div style="clear:both"></div>
            <div style="float:left;width:32%" v-if='code.includes("cc")'>
                <div style='height:650px;width:100%;float:left;position:relative'>
                    <IEcharts :option="pie_radius" >
                    </IEcharts>
                    <div style="position:absolute;top:0;bottom:0;left:0;right:0;margin:auto;width:90px;height:95px;font-size:35px;color:#20a0ff;text-align:center">
                        <div>合同</div>
                        <div>类型</div>
                    </div>

                </div>
            </div>
            <div style="float:left;width:32%" v-if='code.includes("cc")'>
                <div style='height:650px;width:100%;float:left;position:relative'>
                    <IEcharts :option="pie_radius2" >
                    </IEcharts>
                    <div style="position:absolute;top:0;bottom:0;left:0;right:0;margin:auto;width:90px;height:95px;font-size:35px;color:#13CE66;text-align:center">
                        <div>课程</div>
                        <div>类型</div>
                    </div>

                </div>
            </div>
            <div style="float:left;width:36%" v-if='code.includes("cc")'>

                <div style='height:650px;width:100%;float:left;display:flex;justify-content: center;align-items: center;flex-direction: column;'>
                    <div style='width: 100%;display: flex;justify-content: space-around;align-items: baseline;padding:5px;text-align:center;'>
                        <span style='flex:0 0 80px;'>课程名称</span>
                        <span style='flex:0 0 80px'>签单人头数</span>
                        <span style='flex:0 0 80px'>所占比率</span>
                    </div>
                    <div style='width: 100%;display: flex;justify-content: space-around;align-items: baseline;padding:5px;text-align:center;' v-for='item in frozenlist'>
                            <span style='flex:0 0 80px'> <span style="color:#26987b;font-size:20px;margin-right:5px;">●</span>{{item.title}}</span>
                            <span style='flex:0 0 80px'>{{item.num}}</span>
                            <span style='flex:0 0 80px'>{{item.rate}}</span>
                        </div>
                    <!-- <div style='overflow:hidden;width:100%;height:60%;'>

                        <div style='height:100%;overflow-x:hidden;overflow-y:auto;width:104.3%;text-align:center'>
        <div style='width: 100%;display: flex;justify-content: space-around;align-items: baseline;padding:5px' v-for='item in frozenlist'>
            <span style='flex:0 0 80px'> <span style="color:#48d4ab;">●</span>{{item.title}}</span>
            <span style='flex:0 0 80px'>{{item.num}}</span>
            <span style='flex:0 0 80px'>{{item.rate}}</span>
        </div>
    </div>
                    </div> -->
                </div>
            </div>
            <div id="tableSale2" style='width: 90%;margin:20px auto 0 '>
                <el-table :data="resourceData" border  style="width: 100%">
                    <el-table-column prop="date" label="日期">
                    </el-table-column>
                    <el-table-column prop="newResources" label="客户认领量">
                    </el-table-column>
                    <el-table-column prop="newCall" label="沟通量">
                    </el-table-column>
                    <el-table-column prop="invitation" label="邀约量">
                    </el-table-column>
                    <el-table-column prop="newResources" label="邀约率">
                    </el-table-column>
                    <el-table-column prop="newCall" label="到访量">
                    </el-table-column>
                    <el-table-column prop="invitation" label="到访率">
                    </el-table-column>
                    <el-table-column prop="newResources" label="签单量">
                    </el-table-column>
                    <el-table-column prop="newCall" label="签单率">
                    </el-table-column>
                    <el-table-column prop="invitation" label="签单人头" v-if='code.includes("cc")'>
                    </el-table-column>
                    <el-table-column prop="invitation" label="销售金额" v-if='code.includes("cc")'>
                    </el-table-column>
                </el-table>

                <div class="block">
                    <el-pagination layout="prev, pager, next" :total="total2" :current-page="currentPage2" :page-size="pagesize2" @current-change="handleCurrentChange2">
                    </el-pagination>
                </div>
            </div>

        </div>
        <!-- 课耗排行榜 -->
        <div style="width: 100%;float:left;background: white;margin-top:10px;height:auto;border-radius:5px">
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
                <div style='float:left;margin-left:10px'>
                    <el-select v-model="valueSA1" size='small'  placeholder="切换日周月" style='width:75px' @change="updateListSA(1)">
                        <el-option label="本日" value="1"></el-option>
                        <el-option label="本周" value="2"></el-option>
                        <el-option label="本月" value="3"></el-option>
                    </el-select>
                </div>
                <div style='float:left;margin-left:10px'>
                       
                        <el-date-picker v-model="valueSA2" type="month" size='small' :clearable='backface' placeholder="选择月份" @change="updateListSA(2)" style='width:100px'>
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
                <span style="color:grey;line-height:20px;" v-if='code.includes("cc")'>根据签单人头数排列</span>
                <span style="color:grey;line-height:20px;" v-if='code.includes("tmk")'>根据到访人数排列</span>
                <div style="margin-top:10px"> <span style="display:inline-block;vertical-align: middle;"><img src="../../../static/img/rank.png" width='20'alt=""></span>
                    <span style="color:grey;line-height:20px;">我的排名:第{{myRank}}名</span></div>
            </div>
            <div id="tableRSale" style="width:96%;margin:0 auto;position:relative">
                <el-radio-group v-model="radio3" @change='updateListSA(3)' style="position:absolute;top:-55px;left:45%" v-if="code.includes('_c')">
                    <el-radio-button :label='teach'>按老师</el-radio-button>
                    <el-radio-button :label='school'>按校区</el-radio-button>
                </el-radio-group>
                <div style='display:flex;width:100%'>

                    <!-- <el-table :data="code.includes('cc')?titleData2:code.includes('tmk')?titleData3:titleData" border style="width: 10%;" :show-header='backface'>
                        <el-table-column prop="title" label="日期">
                        </el-table-column>
                    </el-table> -->
                    <el-table :data="SAData1" border y style="width: 100%;" :show-header='backface' >
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
                </div>
                        <div class="block">
                            <el-pagination layout="prev, pager, next" :total="total" :current-page="currentPage" :page-size="pagesize" @current-change="handleCurrentChange">
                            </el-pagination>
                        </div>
                <!-- <div style="clear:both"></div> -->
            </div>

        </div>

    </div>
</template>
<script>
    var token, user
    import IEcharts from 'vue-echarts-v3';
    import {
        getReport1,
        gettmkFormsDevelop,
        getReportSA,
        campusList,
        getAllCCList,
        sourceList,
        gettmkRankList
    } from '../../api/api';
    export default {
        components: {
            IEcharts
        },
        data: () => ({
            frozenlist: [{
                title: 'art1',
                num: '10人',
                rate: '2%'
            }, {
                title: 'art2',
                num: '10人',
                rate: '2%'
            }, {
                title: 'art3',
                num: '10人',
                rate: '2%'
            }, {
                title: 'art4',
                num: '10人',
                rate: '2%'
            }, {
                title: 'art5',
                num: '10人',
                rate: '2%'
            }, {
                title: '动漫',
                num: '10人',
                rate: '2%'
            }, {
                title: '书画班',
                num: '10人',
                rate: '2%'
            },{
                title: '国画班',
                num: '10人',
                rate: '2%'
            },],
            datatype: '',
            code: '',
            aid:'',
            myRank:0,
            radio3: 'teach',
            schoolList:[],
            isCharge: true,
            currentPage: 1, //页数
            pagesize: 3, //默认每页
            total: 0, //总页数
            currentPage2: 1, //页数
            pagesize2: 3, //默认每页
            total2: 0, //总页数
            workData: [{
                date: '2017.6.12',
                resource: '2',
                comm: '3',
                active: '4',
                noneed: '5',
                return: '6'
            }, {
                date: '2017.6.13',
                resource: '2',
                comm: '3',
                active: '4',
                noneed: '5',
                return: '6'
            }, {
                date: '2017.6.14',
                resource: '2',
                comm: '3',
                active: '4',
                noneed: '5',
                return: '6'
            }, {
                date: '2017.6.15',
                resource: '2',
                comm: '3',
                active: '4',
                noneed: '5',
                return: '6'
            }, {
                date: '2017.6.16',
                resource: '2',
                comm: '3',
                active: '4',
                noneed: '5',
                return: '6'
            }, {
                date: '2017.6.17',
                resource: '2',
                comm: '3',
                active: '4',
                noneed: '5',
                return: '6'
            }, {
                date: '2017.6.18',
                resource: '2',
                comm: '3',
                active: '4',
                noneed: '5',
                return: '6'
            }],
            ccs: [],
            SADataD:[],
            resourceData: [{date:'2017-10-03',newResources:4,newCall:9,invitation:3,},
            {date:'2017-10-04',newResources:4,newCall:9,invitation:3,},
            {date:'2017-10-05',newResources:4,newCall:9,invitation:3,},
            {date:'2017-10-06',newResources:4,newCall:9,invitation:3,},
            {date:'2017-10-07',newResources:4,newCall:9,invitation:3,},],
            SAData: [{},{},{}],
            HMData: [],
            options: [],
            options1: [],
            titleCM: '最近一周',
            titleST: '最近一周',
            titleSR: '最近一周',
            titleHM: '最近一周',
            titleHT: '最近一周',
            valueCM1: '',
            valueCM2: '',
            valueCM3: 'day',
            valueCM4: '',
            valueCM5: '',
            valueCM6: 'lastweek',
            periodCM: 'w',
            valueSA1: '1',
            valueSA2: '',
            backface: false,
            backface1: true,
            uname:'',
            line: {
                color: ["#4dc0e5", "#0075aa", "#0baa32", "#b6a800", "#ed6a3a"],
                // title: {
                //     // text: '客户管理趋势图',
                //     textStyle: {
                //         fontSize: 17
                //     },
                //     padding: [15, 5, 5, 5]
                // },
                tooltip: {
                    trigger: 'axis'
                },
                // dataZoom: [{
                //         startValue: '2017-05-01',
                //         textStyle:{
                //             fontSize:9
                //         }
                //     }, 
                //     {
                //         type: 'inside',
                        
                //         // maxSpan:2
                //         // filterMode: 'filter'
                //     }],
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
                    width: '80%'
                },
                series: [],
                backgroundColor: 'white'
            },
            pie_radius: {
                color: ["#2689b8", "#76bddf", "#aed6e9"],
                tooltip: {
                    trigger: 'item',
                    formatter: "{b} : {c} ({d}%)"
                },
                legend: {
                    orient: 'horizontal',
                    bottom: 100,
                    data: ["新报名", "续费", "再购买"]
                },
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
                    name: '新报名再购买',
                    type: 'pie',
                    radius: ['40%', '50%'],
                    width: '20%',
                    label: {
                        normal: {
                            show: true,
                            formatter: "{b}\n{c}({d}%)",
                        }
                    },
                    labelLine: {
                        normal: {
                            length2: 5
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
            pie_radius2: {
                color: ["#48d4ab", "#aee9d7", "#32997b", "#2ab58c"],
                legend: {
                    orient: 'horizontal',
                    bottom: 100,
                    data: ["常规班", "夏令营", "暑假班", "考级班"]
                },
                tooltip: {
                    trigger: 'item',
                    formatter: "{b}:{c} ({d}%)"
                },
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
                    name: '常规班等',
                    type: 'pie',
                    radius: ['40%', '50%'],
                    label: {
                        normal: {
                            show: true,
                            formatter: "{b}\n{c}({d}%)",
                            align: 'right'
                        }
                    },
                    labelLine: {
                        normal: {
                            length2: 5
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
            funnel: {
                color: ["#4dc0e5", "#0075aa", "#0baa32", "#b6a800", "#ed6a3a"],
                tooltip: {
                    trigger: 'item',
                    formatter: "{b} : {c}"
                },
                toolbox: {
                    // feature: {
                    //     dataView: {
                    //         readOnly: false
                    //     },
                    //     restore: {},
                    //     saveAsImage: {}
                    // }
                },
                // legend: {

                //     data: ['客户认领量', '沟通量', '邀约量', '到访量', '签单量'],
                //     orient: 'horizontal',
                //     bottom: 10,
                // },
                calculable: true,
                series: [{
                    name: '漏斗图',
                    type: 'funnel',
                    left: '0',
                    top: 60,
                    //x2: 80,
                    // bottom: 60,
                    width: '80%',
                    // height: {totalHeight} - y - y2,
                    // min: 90,
                    // max: 100,
                    minSize: '1%',
                    maxSize: '100%',
                    sort: 'none',
                    gap: 2,
                    label: {
                        normal: {
                            show: true,
                            position: 'outside',
                            formatter: "{b} : {c}"
                        },
                        emphasis: {
                            textStyle: {
                                fontSize: 14
                            }
                        }
                    },
                    labelLine: {
                        normal: {
                            length: 12,
                            lineStyle: {
                                width: 1,
                                type: 'solid'
                            }
                        }
                    },
                    itemStyle: {
                        normal: {
                            borderColor: '#fff',
                            borderWidth: 1
                        }
                    },
                    data: [
                    ]
                }]
            },
            bar: {
                color: ["#6b9ed4"],
                title: {
                    text: 'CC销售额排行榜',
                    textStyle: {
                        fontSize: 17
                    },
                    padding: [15, 5, 5, 5]
                },
                xAxis: {

                    axisTick: {
                        interval: 0
                    },
                    axisLabel: {
                        interval: 0
                    },
                    data: [
                        // "张帅", "李东", "鹿晗", "吴亦凡", "李易峰", "杨洋", "张帅", "李东", "鹿晗", "吴亦凡", "李易峰", "杨洋", "张帅",
                        // "李东", "鹿晗", "吴亦凡", "李易峰", "杨洋", "鹿晗", "吴亦凡", "李易峰", "杨洋"
                    ],

                },
                yAxis: {

                },
                tooltip: {
                    trigger: 'item'
                },
                legend: {
                    orient: 'horizontal',
                    bottom: 10,
                    data: ["销售额"]
                },
                barGap: 0,
                series: [{
                    name: "销售额",
                    type: "bar",
                    data: []
                }]
            },
        }),

        methods: {
            getNewRank() {
                //切换不同的标签来获取最新数据
            },
            handleCurrentChange: function (val) { //变更页数
                this.currentPage = val;
                let z = (val-1)*10
                let b = Object.values(this.SADataD[0])
                let d = Object.values(this.SADataD[1])
                let f = Object.values(this.SADataD[2])
                if(this.code.includes('cc')){
                    let one = {title:'排名',val1:b[z],val2:b[z+1],val3:b[z+2],val4:b[z+3],val5:b[z+4],val6:b[z+5],val7:b[z+6],val8:b[z+7],val9:b[z+8],val10:b[z+9]};
                    let two =  {title:'CC',val1:d[z],val2:d[z+1],val3:d[z+2],val4:d[z+3],val5:d[z+4],val6:d[z+5],val7:d[z+6],val8:d[z+7],val9:d[z+8],val10:d[z+9]};
                    let three =  {title:'签单量',val1:f[z],val2:f[z+1],val3:f[z+2],val4:f[z+3],val5:f[z+4],val6:f[z+5],val7:f[z+6],val8:f[z+7],val9:f[z+8],val10:f[z+9]};
                    this.SAData = [one,two,three]
                }else{
                    let one = {title:'排名',val1:b[z],val2:b[z+1],val3:b[z+2],val4:b[z+3],val5:b[z+4],val6:b[z+5],val7:b[z+6],val8:b[z+7],val9:b[z+8],val10:b[z+9]};
                    let two =  {title:'TMK',val1:d[z],val2:d[z+1],val3:d[z+2],val4:d[z+3],val5:d[z+4],val6:d[z+5],val7:d[z+6],val8:d[z+7],val9:d[z+8],val10:d[z+9]};
                    let three =  {title:'到访量',val1:f[z],val2:f[z+1],val3:f[z+2],val4:f[z+3],val5:f[z+4],val6:f[z+5],val7:f[z+6],val8:f[z+7],val9:f[z+8],val10:f[z+9]};
                    this.SAData = [one,two,three]
                }
            },
            handleCurrentChange2: function (val) { //变更页数
                this.currentPage2 = val;
                // this.fetchData();
            },
            handleCommandCM(command) {
                this.titleCM = command;
                this.valueCM2 = ''
                if (command == '最近一周') {
                    this.periodCM = 'w'
                } else {
                    this.periodCM = 'm'
                }
                this.getResoureData();
                //调服务查询表单
            },
            updateListCM(i) {//第一个大表格
                if(i==1&&this.valueCM6!=''){
                        this.valueCM2=[];
                        this.valueCM3='day'
                        this.getCM1Data();
                    // this.getCM2Data(); 
                    }else if(i==3&&this.valueCM2.length!=0){
                        this.valueCM6 = '';
                        this.getCM1Data();
                    }else if(i==2&&this.valueCM2.length!=0){
                        this.valueCM6 = '';
                        this.getCM1Data();
                    // this.getCM2Data(); 
                    }else if(i==4){
                        this.getCM1Data();
                    // this.getCM2Data(); 
                    }
            },
            getCM1Data() {//折线图
                let para = {
                    start_date: this.valueCM2[0] != null ? new Date(this.valueCM2[0]).toLocaleDateString() : '',
                    end_date: this.valueCM2[1] != null ? new Date(this.valueCM2[1]).toLocaleDateString() : '',
                    tmk_uid: this.valueCM1,
                    short_date:this.valueCM6,
                    column:this.valueCM3,
                }
                gettmkFormsDevelop(token, para).then(res => {
                    let data = res.data;
                    // console.log(data)
                    this.line.xAxis.data = data.day;
                    this.line.series = [{ //以后改成动态获取
                        name: "客户认领量",
                        type: "line",
                        data: data.newResources
                    }, {
                        name: "沟通量",
                        type: "line",
                        data: data.newCall
                    }, {
                        name: "邀约量",
                        type: "line",
                        data: data.invitation
                    }, {
                        name: "到访量",
                        type: "line",
                        data: data.visit
                    }, {
                        name: "签单量",
                        type: "line",
                        data: data.addOrder
                    }];
                    this.line.legend = {
                        orient: 'horizontal',
                        bottom: 30,
                        data: ["客户认领量", "沟通量", "邀约量", "到访量", "签单量"]
                        // backgroundColor:'white'
                    };
                })
            },
            getCM2Data() {//漏斗图
                let para = {
                    start_date: this.valueCM2[0] != null ? new Date(this.valueCM2[0]).toLocaleDateString() : '',
                    end_date: this.valueCM2[1] != null ? new Date(this.valueCM2[1]).toLocaleDateString() : '',
                    tmk_uid: this.valueCM1,
                    short_date:this.valueCM6,
                    column:this.valueCM3,
                }
                getReportSA(token, para).then(res => {//替换方法和data

                    let data = res.data;
                    // console.log(data)
                    this.funnel.series[0].data = [{
                            value: 1,
                            name: '客户认领量'
                        },
                        {
                            value: 40,
                            name: '沟通量'
                        },
                        {
                            value: 20,
                            name: '邀约量'
                        },
                        {
                            value: 80,
                            name: '到访量'
                        },
                        {
                            value: 100,
                            name: '签单量'
                        }]
                })
            },
            getCM3Data() {//2个饼状图要替换
                let para = {
                    start_date: this.valueCM2[0] != null ? new Date(this.valueCM2[0]).toLocaleDateString() : '',
                    end_date: this.valueCM2[1] != null ? new Date(this.valueCM2[1]).toLocaleDateString() : '',
                    tmk_uid: this.valueCM1,
                    short_date:this.valueCM6,
                    column:this.valueCM3,
                }
                getReportSA(token, para).then(res => {
                    let data = res.data;
                    // console.log(data)
                    this.bar.xAxis.data = data.teach;
                    this.bar.series[0].data = data.money;
                    this.pie_radius.series[0].data = [{
                value: 20,
                name: '新报名'
            }, {
                value: 30,
                name: '续费'
            }, {
                value: 30,
                name: '再购买'
            }]
            this.pie_radius2.series[0].data = [{
                value: 20,
                name: '常规班'
            }, {
                value: 30,
                name: '夏令营'
            }, {
                value: 30,
                name: '暑假班'
            }, {
                value: 30,
                name: '考级班'
            }]
                })
            },
            getCM3Data(){//课程名称签单人头数
                //this.getCM2Data = 
            },
            getCM4Data() {//最后的表格数据
                let para = {
                    // period:this.periodCM,
                    // startDay: this.valueCM2[0] != null? new Date(this.valueCM2[0]).toLocaleDateString(): '',
                    // endDay: this.valueCM2[1] != null? new Date(this.valueCM2[1]).toLocaleDateString(): '',                    
                    // cc_id: this.valueCM1
                }
                getReport1(token, para).then(res => {
                    this.resourceData = res.data
                })
            },
            updateListSA(i) {
                if (i==1&&this.valueSA1 != '') {
                    this.valueSA2 = '';
                    // this.getSAData(i);
                }
                if (i==2&&this.valueSA2 != '') {
                    this.valueSA1 = '';
                    // this.getSAData(i);
                }
            },
            getSAData() {
                let para = {
                    view:this.radio3
                    // period:this.periodCM,
                    // startDay: this.valueCM2[0] != null? new Date(this.valueCM2[0]).toLocaleDateString(): '',
                    // endDay: this.valueCM2[1] != null? new Date(this.valueCM2[1]).toLocaleDateString(): '',                    
                    // cc_id: this.valueCM1
                }
                gettmkRankList(token, para).then(res => {
                    this.SAData = res.data;
                    for (let key in this.SAData[0]){
                    this.SAData[0][key] = '第'+this.SAData[0][key]+ '名'
                }
                    this.SADataD[0] = {...this.SAData[0]}
                    this.SADataD[1] = {...this.SAData[1]}
                    this.SADataD[2] = {...this.SAData[2]}
                    if(this.code.includes('cc')){
                        this.SAData[0].title='排名';
                        this.SAData[1].title='CC';
                        this.SAData[2].title='签单量';
                    }else{
                        this.SAData[0].title='排名';
                        this.SAData[1].title='TMK';
                        this.SAData[2].title='到访量';
                    }
                    this.myRank = res.data[res.data.length-1].val1;
                    let a = Math.ceil(Object.getOwnPropertyNames(res.data[0]).length/10)
                    let c = a * this.pagesize;
                    this.total = parseInt(c);
                })
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
            }
        },
        created() {
            document.body.scrollTop = 0
            this.code = JSON.parse(user).job ? JSON.parse(user).job.code : '';
            this.uname = JSON.parse(user).uname ? JSON.parse(user).uname : '';
            this.aid = JSON.parse(user).aid ? JSON.parse(user).aid : ''; //获取aid
            this.getSAData();
            // this.getResoureData();
            // this.getCTData();
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
            // this.line.legend = {
            //     orient: 'horizontal',
            //     bottom: 10,
            //     data: ["客户认领量", "沟通量", "邀约量","到访量","签单量"],
            //     // backgroundColor:'white'
            // };
            this.funnel.series[0].data = [{
                            value: 40,
                            name: '客户认领量'
                        },
                        {
                            value: 30,
                            name: '沟通量'
                        },
                        {
                            value: 20,
                            name: '邀约量'
                        },
                        {
                            value: 10,
                            name: '到访量'
                        },
                        {
                            value: 2,
                            name: '签单量'
                        }]

            this.line.xAxis.data = ["2017-05-01", "2017-05-01", "2017-05-01", "2017-05-01", "2017-05-01", "2017-05-01", "2017-05-07"]
            // this.line2.xAxis.data = ["周一", "周二", "周三", "周四", "周五", "周六", "周日"]
            // this.line3.xAxis.data = ["周一", "周二", "周三", "周四", "周五", "周六", "周日"]
            this.line.series = [{ //以后改成动态获取
                name: "客户认领量",
                type: "line",
                data: [2, 5, 10, 5, 1, 5, 10]
            }, {
                name: "沟通量",
                type: "line",
                data: [3, 10, 12, 3, 9, 0, 2]
            }, {
                name: "邀约量",
                type: "line",
                data: [4, 8, 18, 15, 4, 2, 1]
            }, {
                name: "到访量",
                type: "line",
                data: [5, 11, 9, 4,19, 10, 12]
            }, {
                name: "签单量",
                type: "line",
                data: [14, 18, 8, 5, 14, 12, 11]
            }]
            this.line.legend = {
                            orient: 'horizontal',
                            bottom: 0,
                            textStyle:{
                                fontSize:14
                            },
                            data: ["客户认领量", "沟通量", "邀约量", "到访量", "签单量"]
                            // backgroundColor:'white'
                        };
            // this.line2.series = [{ //以后改成动态获取
            //     name: "人数",
            //     type: "line",
            //     data: [2, 5, 10, 5, 1, 5, 10]
            // }]
            // this.line3.series = [{ //以后改成动态获取
            //     name: "人数",
            //     type: "line",
            //     data: [2, 5, 10, 5, 1, 5, 10]
            // }]
            if (this.code.includes('cc_m')) {
                getAllCCList(token).then((res) => {
                    this.ccs = res.data;
                    this.ccs.unshift({
                        aid: '0',
                        uname: '全部CC'
                    })
                }).then(()=>{
                    this.valueCM1 = this.aid
                })
            }
            if(this.code.includes('_c')){

                    let cam={
                        simple:1
                    }
                    campusList(cam, token).then((res) => { //获取校区
                    this.schoolList = res.data;
                    this.valueCM5 = res.data[0].id;
                    // this.valueTeachR2 = res.data[0].id
                    // this.valueTeachR1 = res.data[0].id
                    // this.valueTeachR = res.data[0].id
                    // this.valueR = res.data[0].id
                })
                }
            this.pie_radius.series[0].data = [{
                value: 20,
                name: '新报名'
            }, {
                value: 30,
                name: '续费'
            }, {
                value: 30,
                name: '再购买'
            }]
            this.pie_radius2.series[0].data = [{
                value: 20,
                name: '常规班'
            }, {
                value: 30,
                name: '夏令营'
            }, {
                value: 30,
                name: '暑假班'
            }, {
                value: 30,
                name: '考级班'
            }]


        }
    }

</script>
<style>
     #tableSale2 .el-table th{
           background: #f2f2f2
       }
       #tableSale2 .el-table th>div{
        background: #f2f2f2

    }
    .echarts {
        float: left;
        width: 100%;
        height: 400px;
        z-index: 1;
    }
    /* #tableRSale{
         height: 443px;
     } */

    /* #tableRSale .el-table__empty-block {
        min-height: 120px;
    } */

    #tableright {
        border-left: none;
    }
/* 
    #tableRSale .el-table td:not(.gutter),
    #tableRSale .el-table th:not(.gutter) {
        padding: 5px 5px;
        text-align: center
    }

    #tableRSale .el-table th>div,
    #tableRSale .el-table .cell {
        padding-left: 0;
        padding-right: 0;
        
    }

    #tableSale2 .el-table td:not(.gutter),
    #tableSale2 .el-table th:not(.gutter) {
        padding: 5px 5px;
        text-align: center
    }

    #tableSale2 .el-table th>div,
    #tableSale2 .el-table .cell {
        padding-left: 0;
        padding-right: 0;
    }
     */
    /* #tableRSale1 .el-table__footer .gutter {
            display: none
        }
    
        #tableSale2 .el-table__footer .gutter {
            display: none
        }
        #tableRSale .el-table__footer .gutter {
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

    .dateReportS .el-date-editor--daterange.el-input {
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
