<template>
    <div>
        <!-- <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-my-tongjifenxi"></i> 合同变更流失表</el-breadcrumb-item>
            </el-breadcrumb>
        </div> -->
        <!-- 工作量统计 -->
        <div class="rcc1">
            <div  class="rcc2">
                <div class="rcc3" v-if='code.includes("_m")'>
                    <el-select class='circleSelect' v-model="valueCM1" size='small'  :placeholder="code.includes('cc')?'选择CC':code.includes('tmk')?'选择TMK':'选择老师'" @change="updateListCM(4)">
                        <el-option v-for="item in ccs" :key="item.aid" :label="item.uname" :value="item.aid">
                        </el-option>
                    </el-select>
                </div>
                <div class="rcc3" v-if='code.includes("_c")'>
                    <el-select class='circleSelect' v-model="valueCM5" size='small'  placeholder="选择校区" @change="updateListCM(4)">
                        <el-option v-for="item in schoolList" :key="item.id" :label="item.title" :value="item.id">
                        </el-option>
                    </el-select>
                </div>
                <div style='float:left;'>
                    <h4 class="rcc4">
                        <span v-if='code.includes("cc")'>工作量</span>
                        <span v-if='code.includes("tmk")'>资源发展</span>
                    </h4>
                </div>
                <div class="rcc5">
                    <el-select v-model="valueCM6" size='small'  placeholder="最近一周" @change="updateListCM(1)">
                            <el-option label="最近一周" value="lastweek"></el-option>
                            <el-option label="最近一个月" value="lastmonth"></el-option>
                    </el-select>
                </div>
                <div class="rcc6" v-if='code.includes("teach")'>
                    <el-select v-model="valueCM4" size='small' clearable placeholder="课程选择" @change="updateListCM(4)"  >
                        <el-option v-for="item in options1" :key="item.id" :label="item.names" :value="item.id">
                        </el-option>
                    </el-select>
                </div>
                <div class="rcc7" >
                        <el-select v-model="valueCM3" size='small' placeholder="切换日周月" style='width:75px' @change="updateListCM(3)">
                                <el-option label="按日" value="day"></el-option>
                                <el-option label="按周" value="week"></el-option>
                                <el-option label="按月" value="month"></el-option>
                        </el-select>
                    </div>
                <div class='dateReportS' style='float:left;'>
                    <el-date-picker v-model="valueCM2" type="daterange" size='small' :picker-options="pickerOptions1" :clearable='backface' placeholder="选择日期范围" @change="updateListCM(2)">
                    </el-date-picker>
                </div>
            </div>
            <div class="rcc8">
                <span class="rcc9"><img src="../../../static/img/info.png" width='20'alt=""></span>
                <span class="rcc10">根据发展客户的次数绘制</span>
            </div>
            <div class="rcc11">
                <span class='canD' @click='getDownload'> <img src="../../../static/img/output.png" width='35'alt=""></span>
            </div>
            <IEcharts :option="line" style='height:400px;width:60%;position:absolute;left:0;margin-bottom:10px;'></IEcharts>
            <div class="rcc12">
                <div class="rcc13">
                    <IEcharts :option="funnel" style="height:400px;width:100%">
                    </IEcharts>
                    <div class="rcc14">
                        <div style="flex:auto">
                            <div>{{funnelR.invitationRatio}}</div>
                            <div class="rcc16">邀约率</div>
                        </div>
                        <div class="rcc15">
                            <div>{{funnelR.visitRatio}}</div>
                            <div class="rcc16">到访率</div>
                        </div>
                        <div style="flex:auto">
                            <div>{{funnelR.addOrderRatio}}</div>
                            <div class="rcc16">签单率</div>
                        </div>
                    </div>
                </div>
            </div>
            <div style="clear:both"></div>
            <div id="tableSale2" class="rcc17">
                    <el-table :data="resourceData" border :show-summary='currentPage2==1'  :summary-method='allTotal'>
                        <el-table-column prop="day" label="日期">
                        </el-table-column>
                        <el-table-column prop="newResources" label="客户认领量">
                        </el-table-column>
                        <el-table-column prop="newCall" label="沟通量">
                        </el-table-column>
                        <el-table-column prop="invitation" label="邀约量">
                        </el-table-column>
                        <el-table-column prop="invitation_rate" label="邀约率">
                                <template scope="scope">
                                        <span >{{scope.row.invitation_rate}}%</span>
                                    </template>
                        </el-table-column>
                        <el-table-column prop="visit" label="到访量">
                        </el-table-column>
                        <el-table-column prop="visit_rate" label="到访率">
                                <template scope="scope">
                                        <span >{{scope.row.visit_rate}}%</span>
                                    </template>
                        </el-table-column>
                        <el-table-column prop="addOrder" label="签单量">
                        </el-table-column>
                        <el-table-column prop="addOrder_rate" label="签单率">
                                <template scope="scope">
                                        <span >{{scope.row.addOrder_rate}}%</span>
                                    </template>
                        </el-table-column>
                        <el-table-column prop="people_number" label="签单人头" v-if='code.includes("cc")'>
                        </el-table-column>
                        <el-table-column prop="sales_money" label="销售金额" v-if='code.includes("cc")'>
                        </el-table-column>
                    </el-table>
    
                    <div class="block">
                        <el-pagination layout="prev, pager, next" :total="total2" :current-page="currentPage2" :page-size="pagesize2" @current-change="handleCurrentChange2">
                        </el-pagination>
                    </div>
                </div>
        </div>
        <!-- 销售报表 -->
        <div class="rcc18" v-if='code.includes("cc")'>
                <div  class="rcc2">
                    <div class="rcc3" v-if='code.includes("_m")'>
                        <el-select class='circleSelect' v-model="valueSS1" size='small'  :placeholder="code.includes('cc')?'选择CC':code.includes('tmk')?'选择TMK':'选择老师'" @change="updateListSS(4)">
                            <el-option v-for="item in ccs" :key="item.aid" :label="item.uname" :value="item.aid">
                            </el-option>
                        </el-select>
                    </div>
                    <div class="rcc3" v-if='code.includes("_c")'>
                        <el-select class='circleSelect' v-model="valueSS5" size='small'  placeholder="选择校区" @change="updateListSS(4)">
                            <el-option v-for="item in schoolList" :key="item.id" :label="item.title" :value="item.id">
                            </el-option>
                        </el-select>
                    </div>
                    <div style='float:left;'>
                        <h4 class="rcc4">
                            <span >销售报表</span>
                        </h4>
                    </div>
                    <div class="rcc5">
                        <el-select v-model="valueSS6" size='small'  placeholder="最近一周" @change="updateListSS(1)">
                                <el-option label="最近一周" value="lastweek"></el-option>
                                <el-option label="最近一个月" value="lastmonth"></el-option>
                        </el-select>
                    </div>
                    <div class='dateReportS' style='float:left;margin-left:10px'>
                        <el-date-picker v-model="valueSS2" type="daterange" size='small' :picker-options="pickerOptions1" :clearable='backface' placeholder="选择日期范围" @change="updateListSS(2)">
                        </el-date-picker>
                    </div>
                </div>
                <div class="rcc8">
                    <span class="rcc9"><img src="../../../static/img/info.png" width='20'alt=""></span>
                    <span class="rcc10">根据发展客户的次数绘制</span>
                </div>
                <!-- <div class="rcc11">
                    <span class='canD' @click='getDownload1'> <a :href="downloadA1"><img src="../../../static/img/output.png" width='35'alt="">
                       </a></span>
                </div> -->
                <div style="display:flex">
                    <div style="width:31%" >
                        <div class="rcc19">
                            <IEcharts :option="pie_radius" >
                            </IEcharts>
                            <div class="rcc20">
                                <div>合同</div>
                                <div>类型</div>
                            </div>
                        </div>
                    </div>
                    <div style="width:31%" >
                        <div class="rcc19">
                            <IEcharts :option="pie_radius2" >
                            </IEcharts>
                            <div class="rcc21">
                                <div>课程</div>
                                <div>类型</div>
                            </div>
                        </div>
                    </div>
                    <div style="width:36%" >
                        <div class="rcc22">
                            <div class="rcc23">
                                <span style='flex:0 0 160px;text-align:left'>课程名称</span>
                                <span style='flex:0 0 80px'>签单人头数</span>
                                <span style='flex:0 0 80px'>所占比率</span>
                            </div>
                            <div class="rcc23" v-for='item in frozenlist' v-if='frozenlist.length!=0'>
                                    <span class="rcc25"> <span class="rcc26">●</span>{{item.name}}</span>
                                    <span style='flex:0 0 80px;color:#4e5f70'>{{item.person}}</span>
                                    <span style='flex:0 0 80px;color:#4e5f70'>{{item.rate}}%</span>
                                </div>
                                <div class="rcc23" v-if='frozenlist.length==0'>
                                    <span style='flex:0 0 80px;color:#4e5f70;padding-left: 65px;'>暂无数据</span>
                                </div>
                        </div>
                    </div>
                </div>
            </div>
        <!-- 课耗排行榜 -->
        <div class="rcc24">
            <div  class="rcc2">
                <div style='float:left;'>
                    <h4 class="rcc4">
                        业绩排行榜
                    </h4>
                </div>
                <div style='float:left;margin-left:10px'>
                    <el-select v-model="valueSA1" size='small'  placeholder="切换日周月" style='width:115px' @change="updateListSA(1)">
                        <el-option label="本日" value="day"></el-option>
                        <el-option label="本周" value="week"></el-option>
                        <el-option label="本月" value="month"></el-option>
                    </el-select>
                </div>
                <div style='float:left;margin-left:10px'>
                       
                        <el-date-picker v-model="valueSA2" type="month" size='small' :picker-options="pickerOptions1" :clearable='backface' placeholder="选择月份" @change="updateListSA(2)" style='width:100px'>
                        </el-date-picker>
                    </div>
            </div>
            <div class="rcc27">
                <span class="rcc9"><img src="../../../static/img/info.png" width='20'alt=""></span>
                <span class="rcc10" v-if='code.includes("cc")'>根据签单人头数排列</span>
                <span class="rcc10" v-if='code.includes("tmk")'>根据到访人数排列</span>
                <div style="margin-top:10px" v-if='!code.includes("_c")'> <span class="rcc9"><img src="../../../static/img/rank.png" width='20'alt=""></span>
                    <span class="rcc10">我的排名:第{{myRank}}名</span></div>
            </div>
            <div class="rcc11">
                <span class='canD' @click='getDownload2'><img src="../../../static/img/output.png" width='35'alt="">
                   </span>
            </div>
            <div id="tableRSale" class="rcc28">
                <el-radio-group v-model="radio3" @change='updateListSA(3)' style="position:absolute;top:-55px;left:45%" v-if="code.includes('_c')">
                    <el-radio-button label='teach'>按CC</el-radio-button>
                    <el-radio-button label='school'>按校区</el-radio-button>
                </el-radio-group>
                <div style='display:flex;width:100%'>
                    <el-table :data="SAData1" border  :show-header='backface' >
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
            </div>
        </div>

    </div>
</template>
<script>
    var token, user
    import IEcharts from 'vue-echarts-v3/src/lite.js';
    import {
        getReport1,
        gettmkFormsDevelop,
        getReportSA,
        campusList,
        getAllCCList,
        sourceList,
        gettmkRankList,
        getccWorkloadPic,
        getccWorkloadFunnel,
        getccWorkloadRank,
        getccWorkloadList,
        getccCourseOrder,
    } from '../../api/api';
    export default {
        components: {
            IEcharts
        },
        data: () => ({
            funnelR:{invitationRatio:0,visitRatio:0,addOrderRatio:0},
            frozenlist: [],
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
            pagesize2: 7, //默认每页
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
            resourceData: [],
            SAData: [{},{},{}],
            HMData: [],
            options: [],
            options1: [],
            valueCM1: '',
            valueCM2: '',
            valueCM3: 'day',
            valueCM4: '',
            valueCM5: '',
            valueCM6: 'lastweek',
            valueSS1: '',
            valueSS2: '',
            valueSS3: 'day',
            valueSS4: '',
            valueSS5: '',
            valueSS6: 'lastweek',
            valueSA1: 'day',
            valueSA2: '',
            backface: false,
            backface1: true,
            uname:'',
            line: {
                symbolSize:100,
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
                    width: '85%'
                },
                series: [],
                backgroundColor: 'white'
            },
            pie_radius: {
                color: ["#b6e1f3","#5a9cbb", "#76bddf", ],
                tooltip: {
                    trigger: 'item',
                    formatter: "{b} : {c} ({d}%)"
                },
                legend: {
                    // orient: 'horizontal',
                    // bottom: 120,
                    // data: ["新报名", "续费", "再购买"]
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
                    center: ['50%', '47%'],
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
                color: [ "#32997b","#48d4ab","#2ab58c", "#aee9d7",,],
                legend: {
                    // orient: 'horizontal',
                    // bottom: 120,
                    // data: ["常规班", "夏令营", "暑假班", "考级班"]
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
                    center: ['50%', '47%'],
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
                    maxSize: '70%',
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
            pickerOptions1: {
                    disabledDate(time) {
                        return time.getTime() > Date.now() ;
                    }
                },
                allT:[],
        }),

        methods: {
            allTotal( columns, data ){
                    return this.allT;
                    // return ['合计',1,1,1,1,1,1,1,1,1,1,]
                },
            getDownload(){
                let para = {
                    start_date: this.valueCM2[0]? new Date(this.valueCM2[0]).toLocaleDateString() : '',
                    end_date: this.valueCM2[1]? new Date(this.valueCM2[1]).toLocaleDateString() : '',
                    cc_uid: this.valueCM1,
                    short_date:this.valueCM6,
                    column:this.valueCM3,
                    school_id:this.valueCM5,
                    download:1
                }
                getccWorkloadList(token, para).then(res => {
                    // let a = 'http://pandatest.dfth.com/download/stream?name=';
                    let a = '/download/stream?name=';
                        window.open( a+res.data.name)
                    })
            },
            // getDownload1(){
            //     this.downloadA1 = 'https://image.baidu.com/search/down?tn=download&word=download&ie=utf8&fr=detail&url=https%3A%2F%2Ftimgsa.baidu.com%2Ftimg%3Fimage%26quality%3D80%26size%3Db9999_10000%26sec%3D1510732763284%26di%3Da586c3c5b1215cf87979da208f428f85%26imgtype%3D0%26src%3Dhttp%253A%252F%252Feasyread.ph.126.net%252FP252hyNA-X_WiEw3rMmFtA%253D%253D%252F7917057665060942069.jpg&thumburl=https%3A%2F%2Fss2.bdstatic.com%2F70cFvnSh_Q1YnxGkpoWK1HF6hhy%2Fit%2Fu%3D3212574178%2C2908544870%26fm%3D27%26gp%3D0.jpg'
            // },
            getDownload2(){
                let para = {
                    view:this.radio3,
                    column:this.valueSA1,
                        month:this.valueSA2?new Date(this.valueSA2).toLocaleDateString():'',
                    download:1
                }
                getccWorkloadRank(token, para).then(res => {
                    // let a ='http://pandatest.dfth.com/download/stream?name=';
                    let a = '/download/stream?name='
                        window.open( a +res.data.name)
                    })
            },
            handleCurrentChange: function (val) { //变更页数
                this.currentPage = val;
                let z = (val-1)*10
                let b = Object.values(this.SADataD[0])
                let d = Object.values(this.SADataD[1])
                let f = Object.values(this.SADataD[2])
                if(this.code.includes('cc')){
                    let one = {title:'排名',val1:b[z],val2:b[z+1],val3:b[z+2],val4:b[z+3],val5:b[z+4],val6:b[z+5],val7:b[z+6],val8:b[z+7],val9:b[z+8],val10:b[z+9]};
                    let two =  {title:this.radio3=="school"?'校区':'CC',val1:d[z],val2:d[z+1],val3:d[z+2],val4:d[z+3],val5:d[z+4],val6:d[z+5],val7:d[z+6],val8:d[z+7],val9:d[z+8],val10:d[z+9]};
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
                this.getCM4Data();
                // this.fetchData();
            },
            updateListCM(i) {//第一个大表格
                if(i==1&&this.valueCM6!=''){
                        this.valueCM2=[];
                        this.valueCM3='day'
                        this.getCM1Data();
                    this.getCM2Data(); 
                    // this.getCM3Data();                     
                    this.getCM4Data();
                    }else if(i==3&&this.valueCM2.length!=0){
                        this.valueCM6 = '';
                        this.getCM1Data();
                    this.getCM2Data();
                    // this.getCM3Data();                     
                    this.getCM4Data();                                      
                    }else if(i==2&&this.valueCM2.length!=0){
                        this.valueCM6 = '';
                        this.getCM1Data();
                    this.getCM2Data();
                    // this.getCM3Data();                     
                    this.getCM4Data();                    
                    }else if(i==4){
                        this.getCM1Data();
                    this.getCM2Data();
                    // this.getCM3Data();                     
                    this.getCM4Data();                    
                    }
            },
            getCM1Data() {//折线图
                let para = {
                    start_date: this.valueCM2[0]? new Date(this.valueCM2[0]).toLocaleDateString() : '',
                    end_date: this.valueCM2[1]? new Date(this.valueCM2[1]).toLocaleDateString() : '',
                    cc_uid: this.valueCM1,
                    short_date:this.valueCM6,
                    column:this.valueCM3,
                    school_id:this.valueCM5
                    
                }
                getccWorkloadPic(token, para).then(res => {
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
                        bottom: 0,
                        data: ["客户认领量", "沟通量", "邀约量", "到访量", "签单量"]
                        // backgroundColor:'white'
                    };
                })
                // gettmkFormsDevelop(token, para).then(res => {
                //     let data = res.data;
                //     // console.log(data)
                //     this.line.xAxis.data = data.day;
                //     this.line.series = [{ //以后改成动态获取
                //         name: "客户认领量",
                //         type: "line",
                //         data: data.newResources
                //     }, {
                //         name: "沟通量",
                //         type: "line",
                //         data: data.newCall
                //     }, {
                //         name: "邀约量",
                //         type: "line",
                //         data: data.invitation
                //     }, {
                //         name: "到访量",
                //         type: "line",
                //         data: data.visit
                //     }, {
                //         name: "签单量",
                //         type: "line",
                //         data: data.addOrder
                //     }];
                //     this.line.legend = {
                //         orient: 'horizontal',
                //         bottom: 30,
                //         data: ["客户认领量", "沟通量", "邀约量", "到访量", "签单量"]
                //         // backgroundColor:'white'
                //     };
                // })
            },
            getCM2Data() {//漏斗图
                let para = {
                    start_date: this.valueCM2[0]? new Date(this.valueCM2[0]).toLocaleDateString() : '',
                    end_date: this.valueCM2[1]? new Date(this.valueCM2[1]).toLocaleDateString() : '',
                    cc_uid: this.valueCM1,
                    short_date:this.valueCM6,
                    column:this.valueCM3,
                    school_id:this.valueCM5
                }
                getccWorkloadFunnel(token, para).then(res => {//替换方法和data

                    let data = res.data;
                    // console.log(data)
                    this.funnel.series[0].data = [{
                            value: data.newResources,
                            name: '客户认领量'
                        },
                        {
                            value: data.newCall,
                            name: '沟通量'
                        },
                        {
                            value: data.invitation,
                            name: '邀约量'
                        },
                        {
                            value: data.visit,
                            name: '到访量'
                        },
                        {
                            value: data.addOrder,
                            name: '签单量'
                        }]
                        this.funnelR = {invitationRatio:data.invitationRatio,
                            visitRatio:data.visitRatio,
                            addOrderRatio:data.addOrderRatio}
                })
            },
            getCM4Data() {//最后的表格数据
                let para = {
                    start_date: this.valueCM2[0]? new Date(this.valueCM2[0]).toLocaleDateString() : '',
                    end_date: this.valueCM2[1]? new Date(this.valueCM2[1]).toLocaleDateString() : '',
                    cc_uid: this.valueCM1,
                    short_date:this.valueCM6,
                    column:this.valueCM3,
                    school_id:this.valueCM5,
                    page:this.currentPage2
                }
                getccWorkloadList(token, para).then(res => {
                    let a = res.data.data;
                    let c = res.data.last_page * this.pagesize2;
                    this.total2 = parseInt(c);
                    this.resourceData = a;
                    if(this.currentPage2==1){

                        this.allT = res.data.sum.split(',')
                    }
                })
            },
            updateListSS(i) {//第一个大表格
                if(i==1&&this.valueSS6!=''){
                        this.valueSS2=[];
                        this.valueSS3='day'
                    this.getCM3Data();
                    }else if(i==3&&this.valueSS2.length!=0){
                        this.valueSS6 = '';
                    this.getCM3Data();                                    
                    }else if(i==2&&this.valueSS2.length!=0){
                        this.valueSS6 = '';
                    this.getCM3Data();                  
                    }else if(i==4){
                    this.getCM3Data();                  
                    }
            },
            getCM3Data() {//2个饼状图要替换
                let para = {
                    start_date: this.valueSS2[0]? new Date(this.valueSS2[0]).toLocaleDateString() : '',
                    end_date: this.valueSS2[1]? new Date(this.valueSS2[1]).toLocaleDateString() : '',
                    cc_uid: this.valueSS1,
                    short_date:this.valueSS6,
                    column:this.valueSS3,
                    school_id:this.valueSS5
                }
                getccCourseOrder(token, para).then(res => {
                    let data = res.data;
                    this.frozenlist = data.courseList;
                    // console.log(data)
                    this.pie_radius.series[0].data = data.order
                    this.pie_radius.legend= {
                        orient: 'horizontal',
                        bottom: 120,
                        data: ["新合同", "续费", "再购买"]
                    }
            this.pie_radius2.series[0].data = data.course
            this.pie_radius2.legend={
                    orient: 'horizontal',
                    bottom: 120,
                    data: ["常规班", "夏令营", "暑假班", "考级班"]
                }
                })
            },
           
            updateListSA(i) {
                if (i==1&&this.valueSA1 != '') {
                    this.valueSA2 = '';
                    this.getSAData();
                }
                if (i==2&&this.valueSA2 != '') {
                    this.valueSA1 = '';
                    this.getSAData();
                }else{
                    this.getSAData();                    
                }
            },
            getSAData() {//排名
                let para = {
                    view:this.radio3,
                    column:this.valueSA1,
                        month:this.valueSA2?new Date(this.valueSA2).toLocaleDateString():'',
                    // period:this.periodCM,
                    // startDay: this.valueCM2[0] != null? new Date(this.valueCM2[0]).toLocaleDateString(): '',
                    // endDay: this.valueCM2[1] != null? new Date(this.valueCM2[1]).toLocaleDateString(): '',                    
                    // cc_id: this.valueCM1
                }
                if(this.code.includes('tmk')){

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
                        let c = a * this.pagesize;
                        this.total = parseInt(c);
                    })
                }else{

                    getccWorkloadRank(token, para).then(res => {
                        this.SAData = res.data;
                        for (let key in this.SAData[0]){
                        this.SAData[0][key] = '第'+this.SAData[0][key]+ '名'
                    }
                        this.SADataD[0] = {...this.SAData[0]}
                        this.SADataD[1] = {...this.SAData[1]}
                        this.SADataD[2] = {...this.SAData[2]}
                       
                            this.SAData[0].title='排名';
                            this.SAData[1].title=this.radio3=="school"?'校区':'CC';
                            this.SAData[2].title='签单量';
                        
                        this.myRank = res.data[res.data.length-1].val1;
                        let a = Math.ceil(Object.getOwnPropertyNames(res.data[0]).length/10)
                        let c = a * this.pagesize;
                        this.total = parseInt(c);
                    })
                }
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
            }
        },
        mounted(){
            let a = document.getElementById("tableSale2").getElementsByClassName("el-table__body-wrapper")[0];
            let b = document.getElementById("tableSale2").getElementsByClassName("el-table__footer-wrapper")[0];   
            this.exchange(a,b)
        },
        created() {
            document.body.scrollTop = 0
            this.code = JSON.parse(user).job ? JSON.parse(user).job.code : '';
            this.uname = JSON.parse(user).uname ? JSON.parse(user).uname : '';
            this.aid = JSON.parse(user).aid ? JSON.parse(user).aid : ''; //获取aid
            if(this.code =='cc'){
                this.getCM1Data();
                this.getCM2Data(); 
                this.getCM4Data();
                this.getCM3Data();  
            }                   
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
            // this.funnel.series[0].data = [{
            //                 value: 40,
            //                 name: '客户认领量'
            //             },
            //             {
            //                 value: 30,
            //                 name: '沟通量'
            //             },
            //             {
            //                 value: 20,
            //                 name: '邀约量'
            //             },
            //             {
            //                 value: 10,
            //                 name: '到访量'
            //             },
            //             {
            //                 value: 2,
            //                 name: '签单量'
            //             }]

            // this.line.xAxis.data = ["2017-05-01", "2017-05-01", "2017-05-01", "2017-05-01", "2017-05-01", "2017-05-01", "2017-05-07"]
            // // this.line2.xAxis.data = ["周一", "周二", "周三", "周四", "周五", "周六", "周日"]
            // // this.line3.xAxis.data = ["周一", "周二", "周三", "周四", "周五", "周六", "周日"]
            // this.line.series = [{ //以后改成动态获取
            //     name: "客户认领量",
            //     type: "line",
            //     data: [2, 5, 10, 5, 1, 5, 10]
            // }, {
            //     name: "沟通量",
            //     type: "line",
            //     data: [3, 10, 12, 3, 9, 0, 2]
            // }, {
            //     name: "邀约量",
            //     type: "line",
            //     data: [4, 8, 18, 15, 4, 2, 1]
            // }, {
            //     name: "到访量",
            //     type: "line",
            //     data: [5, 11, 9, 4,19, 10, 12]
            // }, {
            //     name: "签单量",
            //     type: "line",
            //     data: [14, 18, 8, 5, 14, 12, 11]
            // }]
            // this.line.legend = {
            //                 orient: 'horizontal',
            //                 bottom: 0,
            //                 textStyle:{
            //                     fontSize:14
            //                 },
            //                 data: ["客户认领量", "沟通量", "邀约量", "到访量", "签单量"]
            //                 // backgroundColor:'white'
            //             };
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
                    this.valueCM1 = this.aid;
                    this.valueSS1 = this.aid
                })
            }
            if(this.code.includes('_c')){

                    let cam={
                        simple:1
                    }
                    campusList(cam, token).then((res) => { //获取校区
                    this.schoolList = res.data;
                    this.schoolList.unshift({
                        id:0,
                        title:'全部校区'
                    })
                    this.valueCM5 = 0;
                    this.valueSS5 = 0;
                    // this.valueTeachR2 = res.data[0].id
                    // this.valueTeachR1 = res.data[0].id
                    // this.valueTeachR = res.data[0].id
                    // this.valueR = res.data[0].id
                })
                }
            // this.pie_radius.series[0].data = [{
            //     value: 20,
            //     name: '新报名'
            // }, {
            //     value: 30,
            //     name: '续费'
            // }, {
            //     value: 30,
            //     name: '再购买'
            // }]
            // this.pie_radius2.series[0].data = [{
            //     value: 20,
            //     name: '常规班'
            // }, {
            //     value: 30,
            //     name: '夏令营'
            // }, {
            //     value: 30,
            //     name: '暑假班'
            // }, {
            //     value: 30,
            //     name: '考级班'
            // }]


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
    #tableSale2 .el-table__footer-wrapper{
            color:#1fb5ad
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
.canD:hover{
    cursor: pointer
}
.rcc1{
    width: 100%;float:left;background: white;position:relative;height:auto;border-radius:5px;margin-bottom:10px;
}
.rcc2{
    position:relative;padding-top:10px;height:45px;border-bottom:1px solid gainsboro;background:#fafafa
}
.rcc3{
    margin-left:10px;width:100px;float:right;margin-right:5px
}
.rcc4{
    margin-bottom:20px;padding-top:5px;padding-left:10px
}
.rcc5{
    margin-left:10px;width:110px;float:left
}
.rcc6{
    margin-left:10px;width:110px;float:left
}
.rcc7{
    width:75px;float:left;margin-left:10px
}
.rcc8{
    width:90%;position:absolute;top:62px;left:30px;z-index:100;font-size:12px
}
.rcc9{
    display:inline-block;vertical-align: middle;
}
.rcc10{
    color:grey;line-height:20px;
}
.rcc11{
    position:absolute;top:62px;right:10px;z-index:100;font-size:12px;
}
.rcc12{
    float:right;width:39%
}
.rcc13{
    height:400px;width:100%;float:left;position:relative;margin-bottom:10px;
}
.rcc14{
    position:absolute;bottom:-20px;left:0;width:80%;height:66px;font-size:22px;text-align:center;display:flex;justify-content:center
}
.rcc15{
    flex:auto;border-left: 1px solid gainsboro;border-right: 1px solid gainsboro;
}
.rcc16{
    color:grey
}
.rcc17{
    width: 90%;margin:30px auto 0
}
.rcc18{
    width: 100%;float:left;background: white;position:relative;height:auto;border-radius:5px
}
.rcc19{
    height:600px;width:100%;float:left;position:relative
}
.rcc20{
    position:absolute;top:0;bottom:5.2%;left:0;right:0;margin:auto;width:90px;height:95px;font-size:35px;color:#20a0ff;text-align:center
}
.rcc21{
    position:absolute;top:0;bottom:5.2%;left:0;right:0;margin:auto;width:90px;height:95px;font-size:35px;color:#13CE66;text-align:center
}
.rcc22{
    height:600px;width:100%;float:left;display:flex;justify-content: center;align-items: center;flex-direction: column;flex-wrap:wrap
}
.rcc23{
    width: 100%;display: flex;justify-content: space-around;align-items: baseline;padding:5px;text-align:center;
}
.rcc24{
    width: 100%;float:left;background: white;margin-top:10px;height:auto;border-radius:5px;position:relative
}
.rcc25{
    flex:0 0 160px;color:#4e5f70;text-align:left;white-space: nowrap;overflow:hidden
}
.rcc26{
    color:#26987b;font-size:20px;margin-right:5px;
}
.rcc27{
    width:90%;font-size:12px;height:50px;margin:10px auto
}
.rcc28{
    width:96%;margin:0 auto;position:relative
}
</style>
