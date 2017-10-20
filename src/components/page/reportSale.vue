<template>
    <div>
        <!-- <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-my-tongjifenxi"></i> 合同变更流失表</el-breadcrumb-item>
            </el-breadcrumb>
        </div> -->
        <!-- 合同变更统计 -->
        <div style="width: 100%;float:left;background: white;position:relative;height:auto;">
            <div class="newResourceAn" style="position:relative;margin-top:10px;height:45px;border-bottom:1px solid gainsboro">
                <div style='margin-left:10px;width:100px;float:right;margin-right:5px' v-if='code.includes("_m")'>
                    <el-select class='circleSelect' v-model="valueCM1" size='small' clearable :placeholder="code.includes('cc')?'选择CC':code.includes('tmk')?'选择TMK':'选择老师'" @change="updateListCM">
                        <el-option v-for="item in ccs" :key="item.aid" :label="item.uname" :value="item.aid">
                        </el-option>
                    </el-select>
                </div>
                <div style='margin-left:10px;width:100px;float:right;margin-right:5px' v-if='code.includes("_c")'>
                    <el-select class='circleSelect' v-model="valueCM5" size='small' clearable placeholder="选择校区" @change="updateListCM">
                        <el-option v-for="item in ccs" :key="item.aid" :label="item.uname" :value="item.aid">
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
                    <el-select v-model="valueCM6" size='small' clearable placeholder="最近一周" @change="updateListCM">
                            <el-option label="最近一周" value="1"></el-option>
                            <el-option label="最近一个月" value="2"></el-option>
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
                    <el-select v-model="valueCM4" size='small' clearable placeholder="课程选择" @change="updateListCM"  >
                        <el-option v-for="item in options1" :key="item.id" :label="item.names" :value="item.id">
                        </el-option>
                    </el-select>
                </div>
                <div class='datec' style='float:left;margin-left:10px'>
                    <el-select v-model="valueCM3" size='small' placeholder="切换日周月" style='width:75px'>
                        <el-option label="按日" value="1"></el-option>
                        <el-option label="按周" value="2"></el-option>
                        <el-option label="按月" value="3"></el-option>
                    </el-select>
                    <el-date-picker v-model="valueCM2" type="daterange" size='small' placeholder="选择日期范围" @change="updateListCM">
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
                    <div style="position:absolute;bottom:0;left:0;width:80%;height:66px;font-size:20px;text-align:center;display:flex;justify-content:center">
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
                <div style='height:350px;width:100%;float:left;position:relative'>
                    <IEcharts :option="pie_radius" >
                    </IEcharts>
                    <div style="position:absolute;top:0;bottom:0;left:0;right:0;margin:auto;width:90px;height:95px;font-size:35px;color:#20a0ff;text-align:center">
                        <div>合同</div>
                        <div>类型</div>
                    </div>

                </div>
            </div>
            <div style="float:left;width:32%" v-if='code.includes("cc")'>
                <div style='height:350px;width:100%;float:left;position:relative'>
                    <IEcharts :option="pie_radius2" >
                    </IEcharts>
                    <div style="position:absolute;top:0;bottom:0;left:0;right:0;margin:auto;width:90px;height:95px;font-size:35px;color:#13CE66;text-align:center">
                        <div>课程</div>
                        <div>类型</div>
                    </div>

                </div>
            </div>
            <div style="float:left;width:36%" v-if='code.includes("cc")'>

                <div style='height:350px;width:100%;float:left;display:flex;justify-content: center;align-items: center;flex-direction: column;'>
                    <div style='width: 100%;display: flex;justify-content: space-around;align-items: baseline;padding:5px'>
                        <span>课程名称</span>
                        <span>签单人头数</span>
                        <span>所占比率</span>
                    </div>
                    <div style='width: 100%;display: flex;justify-content: space-around;align-items: baseline;padding:5px' v-for='item in frozenlist'>
                        <span> <span style="color:#48d4ab;">●</span>{{item.title}}</span>
                        <span>{{item.num}}</span>
                        <span>{{item.rate}}</span>
                    </div>
                </div>
            </div>
            <div id="tableSale2" style='width: 90%;margin:20px auto 0 '>
                <el-table :data="resourceData" border show-summary style="width: 100%">
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
        <div style="width: 100%;float:left;background: white;margin-top:10px;height:auto">
            <div class="newResourceAn" style="position:relative;margin-top:10px;height:45px;border-bottom:1px solid gainsboro">

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
                <div class='datec' style='float:left;margin-left:10px'>
                    <el-select v-model="valueSA1" size='small' clearable placeholder="切换日周月" style='width:75px' @change="updateListSA">
                        <el-option label="本日" value="1"></el-option>
                        <el-option label="本周" value="2"></el-option>
                        <el-option label="本月" value="3"></el-option>
                    </el-select>
                    <el-date-picker v-model="valueSA2" type="month" size='small' placeholder="选择月份" @change="updateListSA" style='width:100px'>
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
                    <span style="color:grey;line-height:20px;">第十名</span></div>
            </div>
            <div id="tableRSale" style="width:90%;margin:0 auto;position:relative">
                <el-radio-group v-model="radio3" @change='getNewRank' style="position:absolute;top:-55px;left:45%" v-if="code.includes('_c')">
                    <el-radio-button :label='1'>按老师</el-radio-button>
                    <el-radio-button :label='2'>按校区</el-radio-button>
                </el-radio-group>
                <el-table :data="code.includes('cc')?titleData2:code.includes('tmk')?titleData3:titleData" border style="width: 10%;float:left" :show-header='backface'>
                    <el-table-column prop="title" label="日期">
                    </el-table-column>
                </el-table>
                <el-table :data="SAData" border y style="width: 90%;float:left" :show-header='backface' id='tableright'>
                    <el-table-column prop="rank1" >
                    </el-table-column>
                    <el-table-column prop="rank2" >
                    </el-table-column>
                    <el-table-column prop="rank3" >
                    </el-table-column>
                    <el-table-column prop="rank4" >
                        </el-table-column>
                        <el-table-column prop="rank5" >
                        </el-table-column>
                        <el-table-column prop="rank6" >
                        </el-table-column>
                        <el-table-column prop="rank7" >
                            </el-table-column>
                            <el-table-column prop="rank8" >
                            </el-table-column>
                            <el-table-column prop="rank9" >
                            </el-table-column>
                            <el-table-column prop="rank10" >
                                </el-table-column>
                </el-table>
                <div style="clear:both"></div>
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
    import IEcharts from 'vue-echarts-v3';
    import {
        getReport1,
        getReportSA,
        campusList,
        getAllCCList,
        sourceList
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
                title: 'art2',
                num: '10人',
                rate: '2%'
            }, {
                title: 'art3',
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
            }],
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
            datatype: '',
            code: '',
            radio3: '2',
            isCharge: true,
            currentPage: 1, //页数
            pagesize: 7, //默认每页
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
            resourceData: [],
            SAData: [{rank1:'第一名',rank2:'第二名',rank3:'第三名',rank4:'第四名',rank5:'第五名',rank6:'第六名',rank7:'第七名',rank8:'第八名',rank9:'第九名',rank10:'第十名'},
            {rank1:'张一',rank2:'张聪',rank3:'汪苏泷',rank4:'第四名',rank5:'第五名',rank6:'第六名',rank7:'第七名',rank8:'第八名',rank9:'第九名',rank10:'第十名'},
            {rank1:'21',rank2:'12',rank3:'11',rank4:'9',rank5:'8',rank6:'7',rank7:'6',rank8:'3',rank9:'2',rank10:'1'}
        ],
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
            valueCM3: '1',
            valueCM4: '',
            valueCM5: '',
            valueCM6: '',
            periodCM: 'w',
            valueSA1: '1',
            valueSA2: '',
            backface: false,
            backface1: true,
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
                dataZoom: [{
                        startValue: '2017-05-01',
                        textStyle:{
                            fontSize:9
                        }
                    }, 
                    {
                        type: 'inside',
                        
                        // maxSpan:2
                        // filterMode: 'filter'
                    }],
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
            line2: {
                color: ["#ec6941"],
                title: {

                    textStyle: {
                        fontSize: 17
                    },
                    padding: [15, 5, 5, 5]
                },
                tooltip: {
                    trigger: 'axis',
                    formatter: "{a} : {c} <br/>"
                },
                xAxis: {
                    axisTick: {
                        alignWithLabel: true
                    },


                },
                yAxis: {
                    splitLine: {
                        show: true
                    }
                },
                series: []
            },
            line3: {
                color: ["#ec6941"],
                title: {
                    textStyle: {
                        fontSize: 17
                    },
                    padding: [15, 5, 5, 5]
                },
                tooltip: {
                    trigger: 'axis',
                    formatter: "{a} : {c} <br/>"
                },
                xAxis: {
                    axisTick: {
                        alignWithLabel: true
                    },
                    data: []

                },
                yAxis: {
                    splitLine: {
                        show: true
                    }
                },
                series: [],
                backgroundColor: 'white'
            },
            line4: {
                color: ["#13CE66", "#F7BA2A", "#16b8be", "#ed42b3", "#20a0ff", "#c7be40"],
                title: {
                    text: '合同管理趋势图',
                    textStyle: {
                        fontSize: 17
                    },
                    padding: [15, 5, 5, 5]
                },
                tooltip: {
                    trigger: 'axis'
                },
                xAxis: {
                    axisTick: {
                        alignWithLabel: true
                    },
                    data: []

                },
                yAxis: {
                    splitLine: {
                        show: true
                    }
                },
                legend: {
                    orient: 'horizontal',
                    bottom: 10,
                    data: ["冻结量", "延期量", "转班量", "转校量", "过期量", "退费量"]
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
                    bottom: 20,
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
                    name: '冻结占比',
                    type: 'pie',
                    radius: ['40%', '60%'],
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
                    bottom: 20,
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
                    name: '冻结占比',
                    type: 'pie',
                    radius: ['40%', '60%'],
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
                color: ["#13CE66", "#F7BA2A", "#16b8be", "#ed42b3", "#20a0ff"],
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
                    bottom: 60,
                    width: '80%',
                    // height: {totalHeight} - y - y2,
                    min: 0,
                    max: 100,
                    minSize: '0%',
                    maxSize: '100%',
                    sort: 'descending',
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
                            length: 10,
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
                    data: [{
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
                        }
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
                // this.fetchData();
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
            updateListCM() {//第一个大表格
                if (this.valueCM2 != '') {

                    this.periodCM = ''
                }
                // this.getResoureData();
            },
            getCM1Data() {//折线图
                let para = {
                    period: this.periodCM,
                    startDay: this.valueCM2[0] != null ? new Date(this.valueCM2[0]).toLocaleDateString() : '',
                    endDay: this.valueCM2[1] != null ? new Date(this.valueCM2[1]).toLocaleDateString() : '',
                    cc_id: this.valueCM1,
                    view: 'picture'
                }
                getReport1(token, para).then(res => {
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
                        bottom: 10,
                        data: ["客户认领量", "沟通量", "邀约量", "到访量", "签单量"]
                        // backgroundColor:'white'
                    };
                })
            },
            getCM2Data() {//3个饼状图可以一起
                let para = {
                    period: this.periodSR,
                    startDay: this.valueSR1[0] != null ? new Date(this.valueSR1[0]).toLocaleDateString() : '',
                    endDay: this.valueSR1[1] != null ? new Date(this.valueSR1[1]).toLocaleDateString() : '',
                    cc_id: this.valueSR1,
                    view: 'rank'
                }
                getReportSA(token, para).then(res => {
                    let data = res.data;
                    // console.log(data)
                    this.bar.xAxis.data = data.teach;
                    this.bar.series[0].data = data.money
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
            updateListSA() {
                this.getSAData();
            },
            getSAData() {
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
        },
        beforeCreate() {
            user = localStorage.getItem('user');
            token = JSON.parse(user).token;
        },
        created() {
            document.body.scrollTop = 0
            this.code = JSON.parse(user).job ? JSON.parse(user).job.code : '';
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
            this.line.xAxis.data = ["2017-05-01", "周二", "周三", "周四", "周五", "周六", "2017-05-07"]
            this.line2.xAxis.data = ["周一", "周二", "周三", "周四", "周五", "周六", "周日"]
            this.line3.xAxis.data = ["周一", "周二", "周三", "周四", "周五", "周六", "周日"]
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
                            top: 30,
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
                    this.ccs = res.data
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

    #tableRSale .el-table td,
    #tableRSale .el-table th:not(.gutter) {
        padding: 5px 5px;
        text-align: center
    }

    #tableRSale .el-table th>div,
    #tableRSale .el-table .cell {
        padding-left: 0;
        padding-right: 0;
        
    }

    #tableSale2 .el-table td,
    #tableSale2 .el-table th:not(.gutter) {
        padding: 5px 5px;
        text-align: center
    }

    #tableSale2 .el-table th>div,
    #tableSale2 .el-table .cell {
        padding-left: 0;
        padding-right: 0;
    }
    #tableSale2 .el-table th>div{
        background: #f2f2f2

    }
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

    .datec .el-date-editor--daterange.el-input {
        width: 187px
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
