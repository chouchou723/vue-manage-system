<template>
    <div>
        <!-- <div class="crumbs">
                <el-breadcrumb separator="/">
                    <el-breadcrumb-item><i class="el-icon-my-tongjifenxi"></i> 报表统计</el-breadcrumb-item>
                </el-breadcrumb>
            </div> -->
        <!-- 签到统计 -->
        <div style="width: 100%;float:left;background: white;position:relative;height:auto;border-radius:5px">
            <div class="newResourceAn" style="position:relative;padding-top:10px;height:45px;border-bottom:1px solid gainsboro;background:#fafafa">
                <div style='margin-left:10px;width:100px;float:right;margin-right:5px' v-if='code.includes("_m")'>
                    <el-select class="circleSelect" v-model="valueCM1" size='small' placeholder="选择老师" @change="updateListCM(4)">
                        <el-option v-for="item in teacherList" :key="item.aid" :label="item.uname" :value="item.aid">
                        </el-option>
                    </el-select>
                </div>
                <div style='margin-left:10px;width:100px;float:right;margin-right:5px' v-if='code.includes("_c")'>
                    <el-select class="circleSelect" v-model="valueCM5" size='small' placeholder="选择校区" @change="updateListCM(4)">
                        <el-option v-for="item in schoolList" :key="item.id" :label="item.title" :value="item.id">
                        </el-option>
                    </el-select>
                </div>
                <div style='float:left;'>
                    <h4 style='margin-bottom:20px;padding-top:5px;padding-left:10px'>
                        签到统计
                    </h4>
                </div>
                <div style='margin-left:10px;width:110px;float:left'>
                    <el-select v-model="valueCM6" size='small' placeholder="最近一周" @change="updateListCM(1)">
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
                <div style='width:75px;float:left;margin-left:10px'>
                    <el-select v-model="valueCM3" size='small' placeholder="切换日周月" @change="updateListCM(3)">
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
                    <el-select v-model="valueCM4" size='small' clearable placeholder="课程选择" @change="updateListCM(4)">
                        <el-option v-for="item in options1" :key="item.kcid" :label="item.title" :value="item.kcid">
                        </el-option>
                    </el-select>
                </div>
            </div>
            <div style="width:90%;position:absolute;top:68px;left:30px;z-index:100;font-size:12px">
                <span style="display:inline-block;vertical-align: middle;">
                    <img :src="isrc" width='20' alt="">
                </span>
                <span style="color:grey;line-height:20px;">根据上课签到情况绘制</span>
            </div>
            <div style="position:absolute;top:68px;right:10px;z-index:100;font-size:12px;">
                <span class='canD' @click='getDownload'> <img src="../../../static/img/output.png" width='35'alt="">
                   </span>
            </div>
            <IEcharts :option="line" style='height:400px;width:100%;'></IEcharts>
            <div id="tableRTeach2" style='width: 80%;margin:0 auto' >
                <el-table :data="resourceData" border  style="width: 100%" :show-summary='currentPage==1'  :summary-method='allTotal'>
                    <el-table-column prop="day" label="日期">
                    </el-table-column>
                    <!-- <el-table-column prop="newResources" label="学员人数">
                    </el-table-column> -->
                    <el-table-column prop="chuqi" label="出勤量">
                    </el-table-column>
                    <!-- <el-table-column prop="invitation" label="出勤率">
                    </el-table-column> -->
                    <el-table-column prop="qingjia" label="请假量">
                    </el-table-column>
                    <el-table-column prop="kuangke" label="旷课量">
                    </el-table-column>
                </el-table>

                <div class="block" style='margin-bottom:10px'>
                    <el-pagination layout="prev, pager, next" :total="total" :current-page="currentPage" :page-size="pagesize" @current-change="handleCurrentChange">
                    </el-pagination>
                </div>
            </div>

        </div>
        <!-- 课耗排行榜 -->
        <div style="width: 100%;float:left;background: white;margin-top:10px;height:auto;border-radius:5px;position:relative">
            <div class="newResourceAn" style="position:relative;padding-top:10px;height:45px;border-bottom:1px solid gainsboro;background:#fafafa">

                <div style='float:left;'>
                    <h4 style='margin-bottom:20px;padding-top:5px;padding-left:10px'>
                        课耗排行榜
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
                    <el-select v-model="valueSA1" size='small' placeholder="切换日周月" style='width:115px' @change="updateListSA(1)">
                        <el-option label="本日" value="day"></el-option>
                        <el-option label="本周" value="week"></el-option>
                        <el-option label="本月" value="month"></el-option>
                    </el-select>
                    <el-date-picker v-model="valueSA2" type="month" size='small' :clearable='backface'  :picker-options="pickerOptions1" placeholder="选择月份" @change="updateListSA(2)"
                        style='width:100px'>
                    </el-date-picker>
                </div>
                <!-- <div style='width:120px;float:left;margin-left:10px'>
                    <el-select v-model="valueSA3" size='small'  placeholder="类型选择" @change="updateListSA(3)">
                        <el-option label="课耗量" value="1"></el-option>
                        <el-option label="出勤率" value="2"></el-option>
                    </el-select>
                </div> -->
                <!-- <div style='width:100px;float:right;margin-right:10px'>
                                    <el-select v-model="valueSA4" size='small' clearable placeholder="选择老师" @change="updateList4">
                                        <el-option v-for="item in options1" :key="item.id" :label="item.names" :value="item.id">
                                        </el-option>
                                    </el-select>
                                </div>  -->
            </div>
            <div style="width:90%;font-size:12px;height:50px;margin:10px auto">
                <span style="display:inline-block;vertical-align: middle;">
                    <img :src="isrc" width='20' alt="">
                </span>
                <span style="color:grey;line-height:20px;">根据出勤量和旷课量的情况绘制</span>
                <div style="margin-top:10px" v-if='!code.includes("_c")'>
                    <span style="display:inline-block;vertical-align: middle;">
                        <img :src="rsrc" width='20' alt="">
                    </span>
                    <span style="color:grey;line-height:20px;">我的排名:第{{myRank}}名</span>
                </div>
            </div>
            <div style="position:absolute;top:68px;right:10px;z-index:100;font-size:12px;">
                <span class='canD' @click='getDownload1'><img src="../../../static/img/output.png" width='35'alt="">
                </span>
            </div>
            <div id="tableRTeach" style="width:90%;margin:0 auto;position:relative">
                <el-radio-group v-model="radio3" @change='updateListSA(3)' style="position:absolute;top:-55px;left:45%" v-if="code.includes('_c')">
                    <el-radio-button label='teach'>按老师</el-radio-button>
                    <el-radio-button label='school'>按校区</el-radio-button>
                </el-radio-group>
                <el-table :data="SAData1" border  style="width: 100%;" :show-header='backface' >
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
                <div class="block" style='margin-bottom:10px'>
                    <el-pagination layout="prev, pager, next" :total="total1" :current-page="currentPage1" :page-size="pagesize1" @current-change="handleCurrentChange1">
                    </el-pagination>
                </div>
            </div>

        </div>
        <!-- 业绩指标 -->
        <div style="width: 100%;float:left;background: white;margin-top:10px;position:relative;height:auto;border-radius:5px">
            <div class="newResourceAn" style="position:relative;padding-top:10px;height:45px;border-bottom:1px solid gainsboro;background:#fafafa">
                <div style='margin-left:10px;width:100px;float:right;margin-right:5px' v-if='code.includes("_m")'>
                    <el-select class="circleSelect" v-model="valueST1" size='small' placeholder="选择老师" @change="updateListST">
                        <el-option v-for="item in teacherList" :key="item.aid" :label="item.uname" :value="item.aid">
                        </el-option>
                    </el-select>
                </div>
                <div style='margin-left:10px;width:100px;float:right;margin-right:5px' v-if='code.includes("_c")'>
                    <el-select class="circleSelect" v-model="valueST5" size='small'  placeholder="选择校区" @change="updateListST">
                        <el-option v-for="item in schoolList" :key="item.id" :label="item.title" :value="item.id">
                        </el-option>
                    </el-select>
                </div>
                <div style='float:left;'>
                    <h4 style='margin-bottom:20px;padding-top:5px;padding-left:10px'>
                        业绩指标
                    </h4>
                </div>
                <div style="position:absolute;top:62px;right:10px;z-index:100;font-size:12px;">
                    <span class='canD' @click='getDownload2'><img src="../../../static/img/output.png" width='35'alt="">
                       </span>
                </div>
                <!-- <div style='margin-left:10px;width:110px;float:left'>
                    <el-select v-model="valueST4" size='small' clearable placeholder="最近一周" @change="updateListST(1)">
                        <el-option label="最近一周" value="lastweek"></el-option>
                        <el-option label="最近一个月" value="lastmonth"></el-option>
                    </el-select>
                </div>
             
                <div style='width:75px;float:left;margin-left:10px'>
                    <el-select v-model="valueST3" size='small' placeholder="切换日周月" @change="updateListST(3)">
                        <el-option label="按日" value="day"></el-option>
                        <el-option label="按周" value="week"></el-option>
                        <el-option label="按月" value="month"></el-option>
                    </el-select>
                </div>
                <div class='dateReportT' style='float:left;'>

                    <el-date-picker v-model="valueST2" type="daterange" size='small' :clearable='backface' :picker-options="pickerOptions1" placeholder="选择日期范围" @change="updateListST(2)">
                    </el-date-picker>
                </div> -->
            </div>
            <div id="tableRTeach1" style='width: 80%;margin:40px auto 20px'>
                <el-table :data="resourceData1" border style="width: 100%" :row-style='rowStyle'>
                    <el-table-column prop="month" label="日期">
                            <template scope="scope">
                                    <span v-if='scope.row.month=="合计"'>{{scope.row.month}}
                                    </span>
                                    <span v-else>{{scope.row.month}}月
                                    </span>
                                </template>
                    </el-table-column>
                    <el-table-column prop="shiting" label="试听">
                    </el-table-column>
                    <el-table-column prop="newOrder" label="新报名">
                    </el-table-column>
                    <el-table-column prop="ratio" label="试听转化率">
                    </el-table-column>
                    <el-table-column prop="renewals" label="续费">
                    </el-table-column>
                    <el-table-column prop="referral" label="转介绍">
                        <template scope="scope">
                            <span  >{{scope.row.referral}}
                                <!-- <img class='nickRTI' :src="csrc" width='15' alt="" v-if="scope.row.referral" @click="switchDetail(scope.row)"> -->
                            </span>
                        </template>
                    </el-table-column>
                </el-table>

                <!-- <div class="block">
                    <el-pagination layout="prev, pager, next" :total="total2" :current-page="currentPage2" :page-size="pagesize2" @current-change="handleCurrentChange2">
                    </el-pagination>
                </div> -->
            </div>

        </div>
        <el-dialog title="转介绍名单" :visible.sync="dialogFormVisible" :close-on-click-modal="backface" show-close class='reportTeachDialog'>
            <div id="tableRTeach3">
                <el-table :data="resourceData2" border style="width: 100%">
                    <el-table-column prop="date" label="学生姓名">
                    </el-table-column>
                    <el-table-column prop="newResources" label="电话">
                    </el-table-column>
                    <el-table-column prop="newCall" label="介绍人数">
                    </el-table-column>
                    <el-table-column prop="invitation" label="课程顾问">
                    </el-table-column>
                    <el-table-column prop="visit" label="上课老师">
                    </el-table-column>
                </el-table>
            </div>
            <!-- <div slot="footer" class="dialog-footer">
                    <el-button type="primary" @click="returnFormSubmit('returnform')">确 定</el-button>
                    <el-button @click="dialogFormVisible = false">取 消</el-button>
                </div> -->
        </el-dialog>
    </div>
</template>
<script>
    var token, user
    import IEcharts from 'vue-echarts-v3/src/lite.js';
    import {
        campusList,
        getClassLibrary,
        getTeacherList,
        getteachFormsPic,
        getteachFormsList,
        getteachFormsRank,
        getteachachievementForms
    } from '../../api/api';
    export default {
        components: {
            IEcharts
        },
        data: () => ({
            isrc:'../../../static/img/info.png',
            rsrc:'../../../static/img/rank.png',
            csrc:'../../../static/img/canClick.png',
            myRank:0,
            code: '',
            aid: '',
            schoolList: [],
            radio3: 'teach',
            currentPage: 1, //页数
            total: 0, //总页数
            pagesize: 7, //默认每页
            currentPage1: 1, //页数
            total1: 0, //总页数
            pagesize1: 3, //默认每页
            // currentPage2: 1, //页数
            // pagesize2: 15, //默认每页
            // total2: 0, //总页数
            teacherList: [],
            resourceData: [],
            resourceData1: [],
            resourceData2:[],
            SAData: [],
            SADataD: [],
            uname:'',
            options: [],
            options1: [],
            valueCM1: '',
            valueCM2: [],
            valueCM3: 'day',
            valueCM4: '',
            valueCM5: '',
            valueCM6: 'lastweek',
            valueSA1: 'day',
            valueSA2: '',
            valueSA3: '1',            
            valueST1: '',
            valueST2: '',
            valueST3: 'day',
            valueST4: 'lastweek',
            valueST5: '',
            backface: false,
            dialogFormVisible: false,
            line: {
                color: [ "#0073a7", "#0ba930", "#b7a900"],
                // title: {
                   // "#4ec1e7",
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
                //     startValue: '2017-05-01',
                //     textStyle:{
                //         fontSize:9
                //     }
                // }, 
                // {
                //     type: 'inside',

                //     // maxSpan:2
                //     // filterMode: 'filter'
                // }],
                xAxis: {
                    axisTick: { //刻度设置
                        alignWithLabel: true,
                        // interval: 0
                    },
                    axisLabel: {
                        // showMinLabel:true,
                        showMaxLabel: true,
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

                series: [],
                backgroundColor: 'white'
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
                    return this.allT
                    // return ['合计',1,1,1,]
                },
                  rowStyle(row, index){
                    // console.log(row)
                    if(row.month=='合计'){
                        return 'color:#1fb5ad'
                    }
                },
            switchDetail() {
                this.dialogFormVisible = true;
            },
            getDownload(){
                let para = {
                    teach_uid: this.valueCM1,
                    start_date: this.valueCM2[0]  ? new Date(this.valueCM2[0]).toLocaleDateString() : '',
                    end_date: this.valueCM2[1] ? new Date(this.valueCM2[1]).toLocaleDateString() : '',
                    short_date: this.valueCM6,
                    course_id: this.valueCM4,
                    column: this.valueCM3,
                    school_id: this.valueCM5,
                    download:1
                }
                getteachFormsPic(token, para).then(res => {
                     // let a = 'http://pandatest.dfth.com/download/stream?name=';
                     let a ='/download/stream?name=';
                        window.open( a+res.data.name)
                    })
            },
            getDownload1(){
                let para = {
                    // start_date:'2017-08-15'
                    view:this.radio3,
                    column: this.valueSA1,
                    month: this.valueSA2  ? new Date(this.valueSA2).toLocaleDateString() : '',
                    download:1
                }
                getteachFormsRank(token, para).then(res => {
                     // let a = 'http://pandatest.dfth.com/download/stream?name=';
                     let a ='/download/stream?name=';
                        window.open( a+res.data.name)
                    })
            },
            getDownload2(){
                let para = {
                    // startDay: this.valueST2[0] != '' ? new Date(this.valueST2[0]).toLocaleDateString() : '',
                    // endDay: this.valueST2[1] != '' ? new Date(this.valueST2[1]).toLocaleDateString() : '',
                    school_id:this.valueST5,
                    teach_uid: this.valueST1,
                    download:1
                }
                getteachachievementForms(token, para).then(res => {
                     // let a = 'http://pandatest.dfth.com/download/stream?name=';
                     let a ='/download/stream?name=';
                        window.open( a+res.data.name)
                    })
            },
            handleCurrentChange: function (val) { //变更页数
                this.currentPage = val;this.backToTop();
                this.getCM2Data()
                // this.fetchData();
            },
            handleCurrentChange1: function (val) { //变更页数
                this.currentPage1 = val;
                let z = (val-1)*10
                let b = this.SAData1b
                let d = this.SAData1d
                let f = this.SAData1f
                // let obj  = {val1:'',val2:'',val3:'',val4:'',val5:'',val6:'',val7:'',val8:'',val9:'',val10:''};
                // for(let key in obj){
                //     obj[key]= 
                // }
                let one = {title:'排名',val1:b[z],val2:b[z+1],val3:b[z+2],val4:b[z+3],val5:b[z+4],val6:b[z+5],val7:b[z+6],val8:b[z+7],val9:b[z+8],val10:b[z+9]};
                let two =  {title:this.radio3=="school"?'校区':'老师',val1:d[z],val2:d[z+1],val3:d[z+2],val4:d[z+3],val5:d[z+4],val6:d[z+5],val7:d[z+6],val8:d[z+7],val9:d[z+8],val10:d[z+9]};
                let three =  {title:'',val1:f[z],val2:f[z+1],val3:f[z+2],val4:f[z+3],val5:f[z+4],val6:f[z+5],val7:f[z+6],val8:f[z+7],val9:f[z+8],val10:f[z+9]};
                three.title=this.valueSA3==1?'课耗量':'出勤率'
                this.SAData = [one,two,three]
            },
            // handleCurrentChange2: function (val) { //变更页数
            //     this.currentPage2 = val;
            //     // this.fetchData();
            // },
            updateListCM(i) { //第一个大表格
                if (i == 1 && this.valueCM6 != '') {
                    this.valueCM2 = [];
                    this.valueCM3 = 'day'
                    this.getCM1Data();
                    this.getCM2Data(); 
                } else if (i == 3 && this.valueCM2.length != 0) {
                    this.valueCM6 = '';
                    this.getCM1Data();
                    this.getCM2Data(); 
                } else if (i == 2 && this.valueCM2.length != 0) {
                    this.valueCM6 = '';
                    this.getCM1Data();
                    this.getCM2Data(); 
                } else if (i == 4) {
                    this.getCM1Data();
                    this.getCM2Data();
                }
                // this.getResoureData();
            },
            getCM1Data() { //折线图
                let para = {
                    teach_uid: this.valueCM1,
                    start_date: this.valueCM2[0]  ? new Date(this.valueCM2[0]).toLocaleDateString() : '',
                    end_date: this.valueCM2[1] ? new Date(this.valueCM2[1]).toLocaleDateString() : '',
                    short_date: this.valueCM6,
                    course_id: this.valueCM4,
                    column: this.valueCM3,
                    school_id: this.valueCM5,
                }
                getteachFormsPic(token, para).then(res => {
                    let data = res.data;
                    // console.log(data)
                    this.line.xAxis.data = data.day;
                    this.line.series = [
                    //     { //以后改成动态获取
                    //     name: "学员人数",
                    //     type: "line",
                    //     data: [2, 5, 10, 5, 1, 5, 10]
                    // },
                     {
                        name: "出勤量",
                        type: "line",
                        data: data.chuqi
                    }, {
                        name: "请假量",
                        type: "line",
                        data: data.aingjia
                    }, {
                        name: "旷课量",
                        type: "line",
                        data: data.kuangke
                    }]
                    this.line.legend = {
                        orient: 'horizontal',
                        bottom: 10,
                        data: ["出勤量", "请假量", "旷课量", ]
                        // backgroundColor:'white'
                    };
                })
            },
            getCM2Data() { //表格
                let para = {
                    teach_uid:this.valueCM1,
                    start_date: this.valueCM2[0]  ? new Date(this.valueCM2[0]).toLocaleDateString() : '',
                    end_date: this.valueCM2[1]  ? new Date(this.valueCM2[1]).toLocaleDateString() : '',
                    short_date: this.valueCM6,
                    course_id: this.valueCM4,
                    column: this.valueCM3,
                    school_id: this.valueCM5,
                    page:this.currentPage
                }
                getteachFormsList(token, para).then(res => {
                    let a = Object.values(res.data.data);
                    // console.log(a)
                    let c = res.data.last_page * this.pagesize;
                    this.total = parseInt(c);
                    this.resourceData = a;
                    if(this.currentPage==1){
                        this.allT = res.data.sum.split(',')
                    }
                    // console.log(this.resourceData)
                })
            },
            updateListSA(i) {
                this.currentPage1 = 1;
                if (i == 1 && this.valueSA1 != '') {
                    this.valueSA2 = '';
                    this.getSA1Data();
                }
                if (i == 2 && this.valueSA2 != '') {
                    this.valueSA1 = '';
                    this.getSA1Data();
                }else{

                    this.getSA1Data();
                }
            },
            getSA1Data() { //排行榜表格
                let para = {
                    // start_date:'2017-08-15'
                    view:this.radio3,
                    column: this.valueSA1,
                    month: this.valueSA2  ? new Date(this.valueSA2).toLocaleDateString() : '',
                    type:this.valueSA3
                }
                getteachFormsRank(token, para).then(res => {
                    this.SAData = res.data;
                    for (let key in this.SAData[0]){
                    this.SAData[0][key] = '第'+this.SAData[0][key]+ '名'
                }
                this.SADataD[0] = {...this.SAData[0]}
                this.SADataD[1] = {...this.SAData[1]}
                this.SADataD[2] = {...this.SAData[2]}
                this.SAData[0].title='排名';
                this.SAData[1].title=this.radio3=="school"?'校区':'老师';
                this.SAData[2].title= this.valueSA3==1?'课耗量':'出勤率';
                this.myRank = res.data[res.data.length-1].val1;
                let a = Math.ceil(Object.getOwnPropertyNames(res.data[0]).length/10)
                let c = a * this.pagesize1;
                this.total1 = parseInt(c);
                })
            },
            // updateListST(i) {
            //     if (i == 1 && this.valueST4 != '') {
            //         this.valueST2 = [];
            //         this.valueST3 = 'day'
            //         this.getST1Data();
            //     } else if (i == 3 && this.valueST2.length != 0) {
            //         this.valueST4 = '';
            //         this.getST1Data();                                        
            //     } else if (i == 2 && this.valueST2.length != 0) {
            //         this.valueST4 = '';
            //         this.getST1Data();                                        
            //     }else{
            //         this.getST1Data();                    
            //     }
            //     // this.getSTData();
            // },
            updateListST(){
                this.getST1Data();
            },
            getST1Data() { //表格
                let para = {
                    // startDay: this.valueST2[0] != '' ? new Date(this.valueST2[0]).toLocaleDateString() : '',
                    // endDay: this.valueST2[1] != '' ? new Date(this.valueST2[1]).toLocaleDateString() : '',
                    school_id:this.valueST5,
                    teach_uid: this.valueST1
                }
                getteachachievementForms(token, para).then(res => {
                    this.resourceData1 = res.data
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
            SAData1b(){
                return Object.values(this.SADataD[0])
            },
            SAData1d(){
                return Object.values(this.SADataD[1])
            },
            SAData1f(){
                return Object.values(this.SADataD[2])
            },
        },
        mounted(){
            let a = document.getElementById("tableRTeach2").getElementsByClassName("el-table__body-wrapper")[0];
            let b = document.getElementById("tableRTeach2").getElementsByClassName("el-table__footer-wrapper")[0];   
            this.exchange(a,b)
        },
        created() {
            document.body.scrollTop = 0
            this.code = JSON.parse(user).job ? JSON.parse(user).job.code : '';
            this.aid = JSON.parse(user).aid ? JSON.parse(user).aid : ''; //获取aid
            this.uname = JSON.parse(user).uname ? JSON.parse(user).uname : '';
            // // this.getCM1Data();
            // // this.getCM2Data(); 
            // this.getSA1Data();
            // // this.getST1Data();
            let si = {
                        simple: 1,
                    }
                    getClassLibrary(token, si).then((res) => { //获取课程分类
                        this.options1 = res.data
                    })
            // if(this.code.includes('cc_m')){
            //     getAllCCList(token).then((res) => {
            //         this.teacherList = res.data
            //     })
            // }
            if(this.code==='teach'){
                this.getCM1Data();
                this.getCM2Data(); 
                this.getSA1Data();
                this.getST1Data();
            }
            if (this.code === 'teach_m') {
                getTeacherList(token).then((res) => { //获取老师
                    let a = res.data
                    a.unshift({
                        aid: '0',
                        uname: '全部老师'
                    })
                    this.teacherList = a;
                }).then(() => {
                    this.valueCM1 = this.aid;
                    this.valueST1 = this.aid;
                this.getSA1Data();                    
                })
            }
            if (this.code.includes('_c')) {

                let cam = {
                    simple: 1
                }
                campusList(cam, token).then((res) => { //获取校区
                    this.schoolList = res.data;
                    this.schoolList.unshift({
                        id:0,
                        title:'全部校区'
                    })
                    // console.log(res.data)
                    this.valueCM5 = res.data[0].id;
                    this.valueST5 = res.data[0].id;
                this.getSA1Data();                    
                    // this.valueTeachR2 = res.data[0].id
                    // this.valueTeachR1 = res.data[0].id
                    // this.valueTeachR = res.data[0].id
                    // this.valueR = res.data[0].id
                })
            }
        }
    }

</script>
<style>
    #tableRTeach1 .el-table th,
    #tableRTeach2 .el-table th,
    #tableRTeach3 .el-table th {
        background: #f2f2f2
    }

    #tableRTeach1 .el-table th>div,
    #tableRTeach2 .el-table th>div,
    #tableRTeach3 .el-table th>div {
        background: #f2f2f2
    }
    #tableRTeach2 .el-table__footer-wrapper{
            color:#1fb5ad
        }
    .echarts {
        float: left;
        width: 100%;
        height: 400px;
        z-index: 1;
    }
    /* #tableRTeach{
         height: 443px;
     } */
    /* #tableRTeach .el-table__empty-block{
         min-height: 120px;
     } */

    /* #tableright {
        border-left: none;
    } */
    /* #tableRTeach .el-table td:not(.gutter),
        #tableRTeach .el-table th:not(.gutter) {
            padding: 5px 5px;
            text-align: center
        }
    
        #tableRTeach .el-table th>div,
        #tableRTeach .el-table .cell {
            padding-left: 0;
            padding-right: 0;
        }
    
        #tableRTeach1 .el-table td:not(.gutter),
        #tableRTeach1 .el-table th:not(.gutter) {
            padding: 5px 5px;
            text-align: center
        }
    
        #tableRTeach1 .el-table th>div,
        #tableRTeach1 .el-table .cell {
            padding-left: 0;
            padding-right: 0;
        }
        #tableRTeach2 .el-table td:not(.gutter),
        #tableRTeach2 .el-table th:not(.gutter) {
            padding: 5px 5px;
            text-align: center
        }
    
        #tableRTeach2 .el-table th>div,
        #tableRTeach2 .el-table .cell {
            padding-left: 0;
            padding-right: 0;
        }
        #tableRTeach3 .el-table td:not(.gutter),
        #tableRTeach3 .el-table th:not(.gutter) {
            padding: 5px 5px;
            text-align: center
        }
    
        #tableRTeach3 .el-table th>div,
        #tableRTeach3 .el-table .cell {
            padding-left: 0;
            padding-right: 0;
        }
        */
    /* #tableRTeach1 .el-table__footer .gutter {
            display: none
        }
    
        #tableRTeach2 .el-table__footer .gutter {
            display: none
        }
        #tableRTeach .el-table__footer .gutter {
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
        width: 198px
    }


    /* .echarts .drop .el-dropdown {
        color: rgb(31, 181, 173);
    }

    .newResourceAn .drop .el-dropdown {
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

    .circleSelect .el-input__inner {
        border-radius: 28px
    }

    /* .nicknameSpanTeach:hover {
        cursor: pointer;
    }

    .nicknameSpanTeach {
        position: relative
    } */

    .nickRTI {
        position: absolute;
        left: 15px;
    }
    .nickRTI :hover{
        cursor: pointer;        
    }
    .reportTeachDialog .el-dialog .el-dialog__header {
        background-color: #1fb5ad;
        padding: 20px 20px 20px;
    }

    .reportTeachDialog .el-dialog .el-dialog__title {
        color: white;
    }
.canD:hover{
    cursor: pointer
}
</style>
