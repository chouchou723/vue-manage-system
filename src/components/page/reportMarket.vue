<template>
    <div>
        <!-- <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-my-tongjifenxi"></i> 合同变更流失表</el-breadcrumb-item>
            </el-breadcrumb>
        </div> -->
        <!-- 工作量统计 -->
        <div style="width: 100%;float:left;background: white;position:relative;height:auto;border-radius:5px;margin-bottom:10px;">
            <div class="newResourceAn" style="position:relative;padding-top:10px;height:45px;border-bottom:1px solid gainsboro;background:#fafafa">
                <div style='margin-left:10px;width:100px;float:right;margin-right:5px' v-if='code.includes("_m")'>
                    <el-select class='circleSelect' v-model="valueCM1" size='small'  :placeholder="code.includes('cc')?'选择CC':code.includes('tmk')?'选择TMK':'选择老师'" @change="updateListCM(4)">
                        <el-option v-for="item in ccs" :key="item.aid" :label="item.uname" :value="item.aid">
                        </el-option>
                    </el-select>
                </div>
                <div style='float:left;'>
                    <h4 style='margin-bottom:20px;padding-top:5px;padding-left:10px'>
                        <span >报表统计</span>
                    </h4>
                </div>
                <div style='margin-left:10px;width:110px;float:left'>
                    <el-select v-model="valueCM6" size='small'  placeholder="最近一周" @change="updateListCM(1)">
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
                   -->
                
                <div style='width:75px;float:left;margin-left:10px' >
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
                <div style='width:140px;float:left;margin-left:10px'>
                    <el-select v-model="valueCM7" size='small' clearable placeholder="渠道来源" @change="updateListCM(4)">
                        <el-option v-for="item in options1" :key="item.id" :label="item.names" :value="item.id">
                        </el-option>
                    </el-select>
                </div> 
                <!-- <div style='width:140px;float:left;margin-left:10px'>
                    <el-select v-model="valueCM8" size='small'  placeholder="校区选择" @change="updateListCM(4)">
                        <el-option v-for="item in schoolList" :label="item.title" :value="item.id">
                        </el-option>
                    </el-select>
                </div>  -->
            </div>
            <div style="width:90%;position:absolute;top:62px;left:30px;z-index:100;font-size:12px">
                <span style="display:inline-block;vertical-align: middle;"><img src="../../../static/img/info.png" width='20'alt=""></span>
                <span style="color:grey;line-height:20px;">根据发展客户的次数绘制</span>
            </div>
            <div style="position:absolute;top:62px;right:10px;z-index:100;font-size:12px;">
                <span class='canD' @click='getDownload'> <img src="../../../static/img/output.png" width='35'alt=""></span>
            </div>
            <IEcharts :option="line" style='height:400px;width:60%;position:absolute;left:0;margin-bottom:10px;'></IEcharts>
            <div style="float:right;width:39%">
                <div style='height:400px;width:100%;float:left;position:relative;margin-bottom:10px;'>
                    <IEcharts :option="funnel" style="height:400px;width:100%">
                    </IEcharts>
                    <div style="position:absolute;bottom:-20px;left:0;width:80%;height:66px;font-size:22px;text-align:center;display:flex;justify-content:center">
                        <div style="flex:auto">
                            <div>{{funnelR.invitationRatio}}</div>
                            <div style="color:grey">邀约率</div>
                        </div>
                        <div style="flex:auto;border-left: 1px solid gainsboro;border-right: 1px solid gainsboro;">
                            <div>{{funnelR.visitRatio}}</div>
                            <div style="color:grey">到访率</div>
                        </div>
                        <div style="flex:auto">
                            <div>{{funnelR.addOrderRatio}}</div>
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
            <div id="tableSale2" style='width: 90%;margin:30px auto 0 '>
                    <el-table :data="resourceData" border  style="width: 100%" :show-summary='currentPage2==1'  :summary-method='allTotal'>
                        <el-table-column prop="date" label="日期">
                        </el-table-column>
                        <el-table-column prop="tmkGetSource" label="资源认领量">
                        </el-table-column>
                        <el-table-column prop="newResources" label="客户认领量">
                        </el-table-column>
                        <el-table-column prop="newCall" label="沟通量">
                        </el-table-column>
                        <el-table-column prop="invitation" label="邀约量">
                        </el-table-column>
                        <el-table-column prop="invitation_percent" label="邀约率">
                        </el-table-column>
                        <el-table-column prop="visit" label="到访量">
                        </el-table-column>
                        <el-table-column prop="visit_percent" label="到访率">
                        </el-table-column>
                        <el-table-column prop="addOrder" label="签单量">
                        </el-table-column>
                        <el-table-column prop="addOrder_percent" label="签单率">
                        </el-table-column>
                    </el-table>
                    <div class="block">
                        <el-pagination layout="prev, pager, next" :total="total2" :current-page="currentPage2" :page-size="pagesize2" @current-change="handleCurrentChange2">
                        </el-pagination>
                    </div>
                </div>
            <!-- <div style="float:left;width:32%" v-if='code.includes("cc")'>
                <div style='height:600px;width:100%;float:left;position:relative'>
                    <IEcharts :option="pie_radius" >
                    </IEcharts>
                    <div style="position:absolute;top:0;bottom:5%;left:0;right:0;margin:auto;width:90px;height:95px;font-size:35px;color:#20a0ff;text-align:center">
                        <div>合同</div>
                        <div>类型</div>
                    </div>

                </div>
            </div>
            <div style="float:left;width:32%" v-if='code.includes("cc")'>
                <div style='height:600px;width:100%;float:left;position:relative'>
                    <IEcharts :option="pie_radius2" >
                    </IEcharts>
                    <div style="position:absolute;top:0;bottom:5%;left:0;right:0;margin:auto;width:90px;height:95px;font-size:35px;color:#13CE66;text-align:center">
                        <div>课程</div>
                        <div>类型</div>
                    </div>

                </div>
            </div>
            <div style="float:left;width:36%" v-if='code.includes("cc")'>

                <div style='height:600px;width:100%;float:left;display:flex;justify-content: center;align-items: center;flex-direction: column;'>
                    <div style='width: 100%;display: flex;justify-content: space-around;align-items: baseline;padding:5px;text-align:center;'>
                        <span style='flex:0 0 160px;text-align:left'>课程名称</span>
                        <span style='flex:0 0 80px'>签单人头数</span>
                        <span style='flex:0 0 80px'>所占比率</span>
                    </div>
                    <div style='width: 100%;display: flex;justify-content: space-around;align-items: baseline;padding:5px;text-align:center;' v-for='item in frozenlist' v-if='frozenlist.length!=0'>
                            <span style='flex:0 0 160px;color:#4e5f70;text-align:left;white-space: nowrap;'> <span style="color:#26987b;font-size:20px;margin-right:5px;">●</span>{{item.name}}</span>
                            <span style='flex:0 0 80px;color:#4e5f70'>{{item.person}}</span>
                            <span style='flex:0 0 80px;color:#4e5f70'>{{item.rate}}%</span>
                        </div>
                        <div style='width: 100%;display: flex;justify-content: space-around;align-items: baseline;padding:5px;text-align:center;' v-if='frozenlist.length==0'>
                            <span style='flex:0 0 80px;color:#4e5f70'>暂无数据</span>
                        </div>
                </div>
            </div> -->
            

        </div>

    </div>
</template>
<script>
    var token, user
    import IEcharts from 'vue-echarts-v3/src/lite.js';
    import {
        campusList,
        sourceList,
        marketPic,
        marketTable
    } from '../../api/api';
    export default {
        components: {
            IEcharts
        },
        data: () => ({
            funnelR:{invitationRatio:'0%',visitRatio:'0%',addOrderRatio:'0%'},
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
            valueCM7:'',
            valueCM8:'',
            backface: false,
            backface1: true,
            uname:'',
            line: {
                symbolSize:100,
                color: ["#4dc0e5", "#952be2","#0075aa", "#0baa32", "#b6a800", "#ed6a3a"],
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
            pickerOptions1: {
                    disabledDate(time) {
                        return time.getTime() > Date.now() ;
                    }
                },
                allT:['合计',1,1,1,1,1,1,1,1,1],
        }),

        methods: {
            allTotal( columns, data ){
                // console.log(this.allT)
                    return this.allT;
                    // return ['合计',1,1,1,1,1,1,1,1,1]
                },
            getDownload(){
                let para = {
                    start_date: this.valueCM2[0]? new Date(this.valueCM2[0]).toLocaleDateString() : '',
                    end_date: this.valueCM2[1]? new Date(this.valueCM2[1]).toLocaleDateString() : '',
                    cc_uid: this.valueCM1,
                    short_date:this.valueCM6,
                    column:this.valueCM3,
                    channel:this.valueCM7,
                    // school_id:this.valueCM8,
                    download:1
                }
                marketTable(para,token).then(res => {
                    // let a = 'http://pandatest.dfth.com';
                    let a = '';
                        window.open( a+res.data)
                    })
            },
            // getDownload1(){
            //     this.downloadA1 = 'https://image.baidu.com/search/down?tn=download&word=download&ie=utf8&fr=detail&url=https%3A%2F%2Ftimgsa.baidu.com%2Ftimg%3Fimage%26quality%3D80%26size%3Db9999_10000%26sec%3D1510732763284%26di%3Da586c3c5b1215cf87979da208f428f85%26imgtype%3D0%26src%3Dhttp%253A%252F%252Feasyread.ph.126.net%252FP252hyNA-X_WiEw3rMmFtA%253D%253D%252F7917057665060942069.jpg&thumburl=https%3A%2F%2Fss2.bdstatic.com%2F70cFvnSh_Q1YnxGkpoWK1HF6hhy%2Fit%2Fu%3D3212574178%2C2908544870%26fm%3D27%26gp%3D0.jpg'
            // },
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
                    // this.getCM2Data(); 
                    // this.getCM3Data();                     
                    this.getCM4Data();
                    }else if(i==3&&this.valueCM2.length!=0){
                        this.valueCM6 = '';
                        this.getCM1Data();
                    // this.getCM2Data();
                    // this.getCM3Data();                     
                    this.getCM4Data();                                      
                    }else if(i==2&&this.valueCM2.length!=0){
                        this.valueCM6 = '';
                        this.getCM1Data();
                    // this.getCM2Data();
                    // this.getCM3Data();                     
                    this.getCM4Data();                    
                    }else if(i==4){
                        this.getCM1Data();
                    // this.getCM2Data();
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
                    channel:this.valueCM7,                    
                    // school_id:this.valueCM8
                    
                }
                marketPic( para,token).then(res => {
                    let data = res.data;
                    // console.log(data)
                    this.line.xAxis.data = data.day;
                    this.line.series = [{ //以后改成动态获取
                        name: "资源认领量",
                        type: "line",
                        data: data.list.tmkGetSource
                    },{ //以后改成动态获取
                        name: "客户认领量",
                        type: "line",
                        data: data.list.newResources
                    }, {
                        name: "沟通量",
                        type: "line",
                        data: data.list.newCall
                    }, {
                        name: "邀约量",
                        type: "line",
                        data: data.list.invitation
                    }, {
                        name: "到访量",
                        type: "line",
                        data: data.list.visit
                    }, {
                        name: "签单量",
                        type: "line",
                        data: data.list.addOrder
                    }];
                    this.line.legend = {
                        orient: 'horizontal',
                        bottom: 0,
                        data: ["资源认领量","客户认领量", "沟通量", "邀约量", "到访量", "签单量"]
                        // backgroundColor:'white'
                    };
                    this.funnel.series[0].data = data.funnel;
                        this.funnelR = {invitationRatio:data.rate.invitationRatio,
                            visitRatio:data.rate.visitRatio,
                            addOrderRatio:data.rate.addOrderRatio}
                })
               
            },
            // getCM2Data() {//漏斗图
            //     let para = {
            //         start_date: this.valueCM2[0]? new Date(this.valueCM2[0]).toLocaleDateString() : '',
            //         end_date: this.valueCM2[1]? new Date(this.valueCM2[1]).toLocaleDateString() : '',
            //         cc_uid: this.valueCM1,
            //         short_date:this.valueCM6,
            //         column:this.valueCM3,
            //         school_id:this.valueCM5
            //     }
            //     marketPic (para,token).then(res => {//替换方法和data
            //         let data = res.data;
            //         // console.log(data)
            //         this.funnel.series[0].data = data.funnel;
            //             this.funnelR = {invitationRatio:data.rate.invitationRatio,
            //                 visitRatio:data.rate.visitRatio,
            //                 addOrderRatio:data.rate.addOrderRatio}
            //     })
            // },
            getCM4Data() {//最后的表格数据
                let para = {
                    start_date: this.valueCM2[0]? new Date(this.valueCM2[0]).toLocaleDateString() : '',
                    end_date: this.valueCM2[1]? new Date(this.valueCM2[1]).toLocaleDateString() : '',
                    cc_uid: this.valueCM1,
                    short_date:this.valueCM6,
                    column:this.valueCM3,
                    channel:this.valueCM7,                    
                    // school_id:this.valueCM8,
                    page:this.currentPage2
                }
                marketTable(para,token).then(res => {
                    // console.log(res.data.sum)
                    let a = res.data.list;
                    let c = res.data.lastPage * this.pagesize2;
                    this.total2 = parseInt(c);
                    this.resourceData = Object.values(a);
                    if(this.currentPage2==1){
                    // console.log(res.data.sum)                        
                        this.allT = res.data.sum
                    }
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
        },
        mounted(){
            let a = document.getElementById("tableSale2").getElementsByClassName("el-table__body-wrapper")[0];
            let b = document.getElementById("tableSale2").getElementsByClassName("el-table__footer-wrapper")[0];   
            this.exchange(a,b)
        },
        created() {
            document.body.scrollTop = 0
            this.code = JSON.parse(user).job ? JSON.parse(user).job.code : '';
           this.getCM1Data();
           this.getCM4Data();
            sourceList(token).then(res => {
                this.options1 = res.data
            })
            // let cam={
            //             simple:1
            //         }
            //         campusList(cam, token).then((res) => {//获取校区
            //         this.schoolList = res.data;
            //         this.schoolList.unshift({
            //             id:0,
            //             title:'全部校区'
            //         })
            //         this.valueCM8 = 0;
            //     })
            // this.funnel.series[0].data = [{
            //                 value: 50,
            //                 name: '资源认领量'
            //             },{
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
            // this.line.series = [{ //以后改成动态获取
            //     name: "资源认领量",
            //     type: "line",
            //     data: [2, 5, 10, 5, 1, 5, 10]
            // }, { //以后改成动态获取
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
            //                 data: ["资源认领量","客户认领量", "沟通量", "邀约量", "到访量", "签单量"]
            //                 // backgroundColor:'white'
            //             };


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
.canD:hover{
    cursor: pointer
}
</style>
