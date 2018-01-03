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
                        <el-select class="circleSelect" v-model="valueCM1" size='small'  :placeholder="code.includes('cc')?'选择CC':'选择老师'" @change="updateListCM">
                            <el-option v-for="item in ccs" :key="item.aid" :label="item.uname" :value="item.aid">
                            </el-option>
                        </el-select>
                    </div>
                    <div style='margin-left:10px;width:100px;float:right;margin-right:5px' v-if='code.includes("_c")'>
                            <el-select class='circleSelect' v-model="valueCM5" size='small' clearable placeholder="选择校区" @change="updateListCM">
                                <el-option v-for="item in schoolList" :key="item.id" :label="item.title" :value="item.id">
                                </el-option>
                            </el-select>
                        </div>
                    <div style='float:left;'>
                        <h4 style='margin-bottom:20px;padding-top:5px;padding-left:10px'>
                           合同变更统计
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
                    <div style='width:140px;float:left;margin-left:10px'>
                        <el-select v-model="value7" size='small' clearable placeholder="渠道来源" @change="updateList4">
                            <el-option v-for="item in options1" :key="item.id" :label="item.names" :value="item.id">
                            </el-option>
                        </el-select>
                    </div> -->
                    <!-- <div style='width:140px;float:left;margin-left:10px' v-if='code.includes("teach")'>
                            <el-select v-model="valueCM4" size='small' clearable placeholder="课程选择" @change="updateListCM">
                                <el-option v-for="item in options1" :key="item.id" :label="item.names" :value="item.id">
                                </el-option>
                            </el-select>
                        </div>  -->
                        <div style='margin-left:10px;width:75px;float:left'>
                                <el-select v-model="valueCM3" size='small'  placeholder="切换日周月"  @change="updateListCM(3)">
                                        <el-option label="按日" value="day"></el-option>
                                        <el-option label="按周" value="week"></el-option>
                                        <el-option label="按月" value="month"></el-option>
                                    </el-select>
                            </div>
                    <div class='dateReportT' style='float:left;'>
                           
                        <el-date-picker v-model="valueCM2" type="daterange" size='small' :clearable='backface' placeholder="选择日期范围" @change="updateListCM(2)">
                        </el-date-picker>
                    </div>
                </div>
                <div style="width:90%;position:absolute;top:68px;left:30px;z-index:100;font-size:12px">
                    <span style="display:inline-block;vertical-align: middle;"><img src="../../../static/img/info.png" width='20'alt=""></span>
                    <span style="color:grey;line-height:20px;">根据发生合同变更人次绘制</span>
                </div>
                <IEcharts :option="line" style='height:400px;width:65%;position:absolute;left:0' ></IEcharts>
               
                <div style="float:right;width:35%;margin-bottom:10px;position:relative" class='fronzeB'>
                   
                    <div style='height:400px;width:50%;float:left;position:relative'>
                        <IEcharts :option="pie_radius"  style="height:400px;width:100%">
                        </IEcharts>
                        <div style="position:absolute;top:0;bottom:0;left:0;right:0;margin:auto;width:90px;height:66px;font-size:23px;line-height:33px;color:#20a0ff;text-align:center">
                            <div>60人</div>
                            <div>12%</div>
                        </div>

                    </div>
                        <div style='height:400px;width:50%;position:absolute;right:0;top:0;display:flex;justify-content: center;align-items: center;flex-direction: column;'>
                            <div style='width: 100%;display: flex;justify-content: space-around;align-items: baseline;padding:5px;font-size:18px;' v-for='item in frozenlist'>
                                <span style="color:#20a0ff">{{item.title}}</span>
                                <span>{{item.num}}</span>
                                <span>{{item.rate}}</span>
                            </div>
                        </div>
                </div>
                <div style='width:1px;height:400px;position:absolute;left:62%'>
                    <div style="position:absolute;background:#cccccc;height:330px;top:35px;width:1px"></div>
                </div>
                <div style='clear:both'></div>
                <div id="tableRChange1"  style='width: 80%;margin:0 auto'>
                    <el-table :data="resourceData" border  style="width: 100%;">
                        <el-table-column prop="date" label="日期">
                        </el-table-column>
                        <el-table-column prop="newResources" label="冻结量">
                        </el-table-column>
                        <el-table-column prop="newCall" label="转班量">
                        </el-table-column>
                        <el-table-column prop="invitation" label="转校量">
                        </el-table-column>
                    </el-table>
                    
                    <div class="block">
                        <el-pagination layout="prev, pager, next" :total="total" :current-page="currentPage" :page-size="pagesize" @current-change="handleCurrentChange">
                        </el-pagination>
                    </div>
                </div>
                
            </div>
            <!-- 流失统计 -->
            <div style="width: 100%;float:left;background: white;margin-top:10px;position:relative;height:auto;border-radius:5px">
                    <div class="newResourceAn" style="position:relative;padding-top:10px;height:45px;border-bottom:1px solid gainsboro;background:#fafafa">
                        <div style='margin-left:10px;width:100px;float:right;margin-right:5px' v-if='code.includes("_m")'>
                            <el-select class="circleSelect" v-model="valueSA1" size='small'  :placeholder="code.includes('cc')?'选择CC':'选择老师'" @change="updateListSA">
                                <el-option v-for="item in ccs" :key="item.aid" :label="item.uname" :value="item.aid">
                                </el-option>
                            </el-select>
                        </div>
                        <div style='margin-left:10px;width:100px;float:right;margin-right:5px' v-if='code.includes("_c")'>
                                <el-select class='circleSelect' v-model="valueSA2" size='small' clearable placeholder="选择校区" @change="updateListSA">
                                    <el-option v-for="item in schoolList" :key="item.id" :label="item.title" :value="item.id">
                                    </el-option>
                                </el-select>
                            </div>
                        <div style='float:left;'>
                            <h4 style='margin-bottom:20px;padding-top:5px;padding-left:10px'>
                                    流失统计
                            </h4>
                        </div>
                        <div style='margin-left:10px;width:110px;float:left'>
                            <el-select v-model="valueSA4" size='small'  placeholder="最近一周" @change="updateListSA(1)">
                                    <el-option label="最近一周" value="lastweek"></el-option>
                                    <el-option label="最近一个月" value="lastmonth"></el-option>
                            </el-select>
                        </div>
                        <!-- <div class='drop' style='float:left;width:111px;margin-top:4px;margin-left:4px'>
                            <el-dropdown @command="handleCommandSA">
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
                        <!-- <div style='width:140px;float:left;margin-left:10px' v-if='code.includes("teach")'>
                                <el-select v-model="valueCM4" size='small' clearable placeholder="课程选择" @change="updateListCM">
                                    <el-option v-for="item in options1" :key="item.id" :label="item.names" :value="item.id">
                                    </el-option>
                                </el-select>
                            </div>  -->
                            <div style='width:75px;float:left;margin-left:10px' >
                                    <el-select v-model="valueSA3" size='small'  placeholder="切换日周月" @change="updateListSA(3)">
                                            <el-option label="按日" value="day"></el-option>
                                            <el-option label="按周" value="week"></el-option>
                                            <el-option label="按月" value="month"></el-option>
                                        </el-select>
                                </div>
                        <div class='dateReportT' style='float:left;'>
                               
                            <el-date-picker v-model="valueSA5" type="daterange" size='small' :clearable='backface' placeholder="选择日期范围" @change="updateListSA(2)">
                            </el-date-picker>
                        </div>
                    </div>
                    <div style="width:80%;position:absolute;top:68px;left:40px;z-index:100;font-size:18px">
                            未续费
                    </div>
                    <div style="width:90%;position:absolute;top:98px;left:30px;z-index:100;font-size:12px">
                        <span style="display:inline-block;vertical-align: middle;"><img src="../../../static/img/info.png" width='20'alt=""></span>
                        <span style="color:grey;line-height:20px;">根据常规课程结课后未续约常规班的人数累计</span>
                    </div>
                   
                   <div style="display:flex">
                    <div style='width: 50%;margin:30px auto 0 ;'>
                            <IEcharts :option="line2" style='height:400px;width:100%;' ></IEcharts>
                            <div style='display:flex;margin-top:10px'>
                                <div style='width:47%'>
                                        <div id="tableRChange"  style='width: 90%;margin:0 auto;'>
                                                <el-table :data="resourceData1" border show-summary style="width: 100%;height:120px">
                                                    <el-table-column prop="date" label="课程">
                                                    </el-table-column>
                                                    <el-table-column prop="newResources" label="人数">
                                                    </el-table-column>
                                                    <el-table-column prop="newCall" label="流失率">
                                                    </el-table-column>
                                                </el-table>
                                                
                                                <div class="block">
                                                    <el-pagination layout="prev, pager, next" :total="total2" :current-page="currentPage2" :page-size="pagesize2" @current-change="handleCurrentChange2">
                                                    </el-pagination>
                                                </div>
                                            </div>
                                </div>
                                <div style='width:52%'>
                                        <div id="tableRChange2"  style='width:90%;margin:0 auto;'>
                                                <el-table :data="resourceData2" border show-summary style="width: 100%">
                                                    <el-table-column prop="date" label="日期">
                                                    </el-table-column>
                                                    <el-table-column prop="newResources" label="人数">
                                                    </el-table-column>
                                                    <el-table-column prop="newCall" label="流失率">
                                                    </el-table-column>
                                                </el-table>
                                                
                                                <div class="block">
                                                    <el-pagination layout="prev, pager, next" :total="total3" :current-page="currentPage3" :page-size="pagesize3" @current-change="handleCurrentChange3">
                                                    </el-pagination>
                                                </div>
                                            </div>
                                </div>
                            </div>
                            <!-- <div id="tableRChange"  style='width: 90%;margin:0 auto;'>
                                <el-table :data="resourceData1" border show-summary style="width: 100%;height:120px">
                                    <el-table-column prop="date" label="课程">
                                    </el-table-column>
                                    <el-table-column prop="newResources" label="人数">
                                    </el-table-column>
                                    <el-table-column prop="newCall" label="流失率">
                                    </el-table-column>
                                </el-table>
                                
                                <div class="block">
                                    <el-pagination layout="prev, pager, next" :total="total2" :current-page="currentPage2" :page-size="pagesize2" @current-change="handleCurrentChange2">
                                    </el-pagination>
                                </div>
                            </div>
                            <div id="tableRChange2"  style='width:90%;margin:0 auto;'>
                                    <el-table :data="resourceData2" border show-summary style="width: 100%">
                                        <el-table-column prop="date" label="日期">
                                        </el-table-column>
                                        <el-table-column prop="newResources" label="人数">
                                        </el-table-column>
                                        <el-table-column prop="newCall" label="流失率">
                                        </el-table-column>
                                    </el-table>
                                    
                                    <div class="block">
                                        <el-pagination layout="prev, pager, next" :total="total3" :current-page="currentPage3" :page-size="pagesize3" @current-change="handleCurrentChange3">
                                        </el-pagination>
                                    </div>
                                </div> -->
                    </div>
                    <div style='width: 50%;margin:0 auto;float:right;position:relative'>
                            <div style="width:80%;position:absolute;top:14px;left:40px;z-index:100;font-size:18px">
                                    退费
                            </div>
                            <div style="width:90%;position:absolute;top:45px;left:30px;z-index:100;font-size:12px">
                                    <span style="display:inline-block;vertical-align: middle;"><img src="../../../static/img/info.png" width='20'alt=""></span>
                                    <span style="color:grey;line-height:20px;">根据退费人数绘制</span>
                                </div>
                            <IEcharts :option="line3" style='height:400px;width:100%;margin-top:30px' ></IEcharts>
                            <div style='display:flex;margin-top:10px'>
                                    <div style='width:47%'>
                                            <div id="tableRChange3"  style='width:90%;margin:0 auto;'>
                                                    <el-table :data="resourceData3" border show-summary style="width: 100%;height:120px">
                                                        <el-table-column prop="date" label="课程">
                                                        </el-table-column>
                                                        <el-table-column prop="newResources" label="人数">
                                                        </el-table-column>
                                                        <el-table-column prop="newCall" label="退费额">
                                                        </el-table-column>
                                                    </el-table>
                                                    
                                                    <div class="block">
                                                        <el-pagination layout="prev, pager, next" :total="total4" :current-page="currentPage4" :page-size="pagesize4" @current-change="handleCurrentChange4">
                                                        </el-pagination>
                                                    </div>
                                                </div>
                                    </div>
                                    <div style='width:52%'>
                                            <div id="tableRChange4"  style='width: 90%;margin:0 auto;'>
                                                    <el-table :data="resourceData4" border show-summary style="width: 100%">
                                                        <el-table-column prop="date" label="日期">
                                                        </el-table-column>
                                                        <el-table-column prop="newResources" label="人数">
                                                        </el-table-column>
                                                        <el-table-column prop="newCall" label="退费额">
                                                        </el-table-column>
                                                    </el-table>
                                                    
                                                    <div class="block">
                                                        <el-pagination layout="prev, pager, next" :total="total5" :current-page="currentPage5" :page-size="pagesize5" @current-change="handleCurrentChange5">
                                                        </el-pagination>
                                                    </div>
                                                </div>
                                    </div>
                                    </div>
                            <!-- <div id="tableRChange3"  style='width:90%;margin:0 auto;'>
                                    <el-table :data="resourceData3" border show-summary style="width: 100%;height:120px">
                                        <el-table-column prop="date" label="课程">
                                        </el-table-column>
                                        <el-table-column prop="newResources" label="人数">
                                        </el-table-column>
                                        <el-table-column prop="newCall" label="退费额">
                                        </el-table-column>
                                    </el-table>
                                    
                                    <div class="block">
                                        <el-pagination layout="prev, pager, next" :total="total4" :current-page="currentPage4" :page-size="pagesize4" @current-change="handleCurrentChange4">
                                        </el-pagination>
                                    </div>
                                </div>
                                <div id="tableRChange4"  style='width: 90%;margin:0 auto;'>
                                        <el-table :data="resourceData4" border show-summary style="width: 100%">
                                            <el-table-column prop="date" label="日期">
                                            </el-table-column>
                                            <el-table-column prop="newResources" label="人数">
                                            </el-table-column>
                                            <el-table-column prop="newCall" label="退费额">
                                            </el-table-column>
                                        </el-table>
                                        
                                        <div class="block">
                                            <el-pagination layout="prev, pager, next" :total="total5" :current-page="currentPage5" :page-size="pagesize5" @current-change="handleCurrentChange5">
                                            </el-pagination>
                                        </div>
                                    </div> -->
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
            getReportSA,
            campusList,
            getAllCCList,
            sourceList,
            getTeacherList
        } from '../../api/api';
        export default {
            components: {
                IEcharts
            },
            data: () => ({
                frozenlist:[{title:'art1',num:'10人',rate:'2%'},{title:'art2',num:'10人',rate:'2%'},{title:'art3',num:'10人',rate:'2%'},
                {title:'art4',num:'10人',rate:'2%'},{title:'art5',num:'10人',rate:'2%'},{title:'动漫',num:'10人',rate:'2%'}],
                titleData:[{title:'排名'},{title:'老师'},{title:'课耗量'}],
                datatype:'',
                code: '',
                aid:'',
                schoolList:[],
                radio3: '2',
                isCharge: true,
                currentPage: 1, //页数
                pagesize: 15, //默认每页
                total: 0, //总页数
                currentPage2: 1, //页数
                pagesize2: 15, //默认每页
                total2: 0, //总页数
                currentPage3: 1, //页数
                pagesize3: 15, //默认每页
                total3: 0, //总页数
                currentPage4: 1, //页数
                pagesize4: 15, //默认每页
                total4: 0, //总页数
                currentPage5: 1, //页数
                pagesize5: 15, //默认每页
                total5: 0, //总页数
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
                resourceData: [{date:'2017-10-01',newResources:4,newCall:10,invitation:7},
                {date:'2017-10-02',newResources:4,newCall:10,invitation:7},
                {date:'2017-10-03',newResources:4,newCall:10,invitation:7},
                {date:'2017-10-04',newResources:4,newCall:10,invitation:7},
                {date:'2017-10-05',newResources:4,newCall:10,invitation:7},],
                resourceData1: [{date:'art1',newResources:4,newCall:10,invitation:7},
                {date:'art2',newResources:4,newCall:10,invitation:7},
                {date:'art3',newResources:4,newCall:10,invitation:7},
                {date:'art4',newResources:4,newCall:10,invitation:7},
                {date:'art5',newResources:4,newCall:10,invitation:7},],
                resourceData2: [{date:'2017-10-01',newResources:4,newCall:10,invitation:7},
                {date:'2017-10-02',newResources:4,newCall:10,invitation:7},
                {date:'2017-10-03',newResources:4,newCall:10,invitation:7},
                {date:'2017-10-04',newResources:4,newCall:10,invitation:7},
                {date:'2017-10-05',newResources:4,newCall:10,invitation:7},],
                resourceData3: [{date:'art1',newResources:4,newCall:10,invitation:7},
                {date:'art2',newResources:4,newCall:10,invitation:7},
                {date:'art3',newResources:4,newCall:10,invitation:7},
                {date:'art4',newResources:4,newCall:10,invitation:7},
                {date:'art5',newResources:4,newCall:10,invitation:7},],
                resourceData4: [{date:'2017-10-01',newResources:4,newCall:10,invitation:7},
                {date:'2017-10-02',newResources:4,newCall:10,invitation:7},
                {date:'2017-10-03',newResources:4,newCall:10,invitation:7},],
                SAData: [{rank1:'第一名',rank2:'第二名',rank3:'第三名',rank4:'第四名',rank5:'第五名',rank6:'第六名',rank7:'第七名',rank8:'第八名',rank9:'第九名',rank10:'第十名'},
                {rank1:'张一',rank2:'张聪',rank3:'汪苏泷',rank4:'第四名',rank5:'第五名',rank6:'第六名',rank7:'第七名',rank8:'第八名',rank9:'第九名',rank10:'第十名'},
                {rank1:'21',rank2:'12',rank3:'11',rank4:'9',rank5:'8',rank6:'7',rank7:'6',rank8:'3',rank9:'2',rank10:'1'}
            ],
                HMData:[],            
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
                valueCM5:'',
                valueCM6:'lastweek',
                periodCM:'w',            
                valueSA1: '',
                valueSA2: '',          
                valueSA3: 'day',          
                valueSA4: 'lastweek', 
                valueSA5:[],        
                periodSA:'w',
                backface:false,
                backface1:true,
                line: {
                    color: ["#59c2e6", "#ec6941", "#22ac38",],
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
                    grid:{
                        width: '80%'
                    },
                    series: [],
                    backgroundColor: 'white'
                },
                line2: {
                    color: ["#ec6941"],
                    // title: {
    
                    //     textStyle: {
                    //         fontSize: 17
                    //     },
                    //     padding: [15, 5, 5, 5]
                    // },
                    tooltip: {
                        trigger: 'axis',
                        formatter: "{a} : {c} <br/>"
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
                    // title: {
                    //     textStyle: {
                    //         fontSize: 17
                    //     },
                    //     padding: [15, 5, 5, 5]
                    // },
                    tooltip: {
                        trigger: 'axis',
                        formatter: "{a} : {c} <br/>"
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
                pie_radius: {
                    color: ["#20a0ff", "#dfeceb"],
                    title: {
                        text: '冻结中',
                        textStyle: {
                            fontSize: 22,
                            fontWeight:400,
                        },
                        padding: [55, 5, 5, 5]
                    },
                    tooltip: {
                        trigger: 'item',
                        formatter: "{a} <br/>{b} : {c} ({d}%)"
                    },
                //     legend: {
                //     orient: 'horizontal',
                //     bottom: 120,
                //     data: ["冻结人数", "有限人数"]
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
                        name: '冻结占比',
                        type: 'pie',
                        radius: ['50%', '60%'],
                        label:{
                            normal:{
                                show:false
                            }
                        },
                    //     label: {
                    //     normal: {
                    //         show: true,
                    //         textStyle:{
                    //             fontSize:8,
                    //         },
                    //         formatter: "{b}\n{c}({d}%)",
                    //     }
                    // },
                    // labelLine: {
                    //     normal: {
                    //         length:15,
                    //         length2: 15
                    //     }
                    // },
                    // itemStyle: {
                    //     emphasis: {
                    //         shadowBlur: 10,
                    //         shadowOffsetX: 0,
                    //         shadowColor: 'rgba(0, 0, 0, 0.5)'
                    //     }
                    // },
                    }],
                    backgroundColor: 'white'
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
                handleCurrentChange3: function (val) { //变更页数
                    this.currentPage3 = val;
                    // this.fetchData();
                },
                handleCurrentChange4: function (val) { //变更页数
                    this.currentPage4 = val;
                    // this.fetchData();
                },
                handleCurrentChange5: function (val) { //变更页数
                    this.currentPage5 = val;
                    // this.fetchData();
                },
                handleCommandCM(command) {
                    this.titleCM = command;
                    this.valueCM2=''
                    if(command=='最近一周'){
                        this.periodCM = 'w'
                    }else{
                        this.periodCM = 'm'
                    }
                    this.getResoureData();
                    // if(this.backface){
                    //     this.backface = false;
                    //     this.backface1 = true;
                    // }else{
                    //     this.backface1 = false;
                    // this.backface = true;
                    // }
                    //调服务查询表单
                },
                updateListCM(i) {//第一个大表格
                    if(i==1&&this.valueCM6!=''){
                        this.valueCM2=[];
                        this.valueCM3='day'
                        // this.getCM1Data();
                    // this.getCM2Data(); 
                    }else if(i==3&&this.valueCM2.length!=0){
                        this.valueCM6 = '';
                        // this.getCM1Data();
                    // this.getCM2Data(); 
                    }else if(i==2&&this.valueCM2.length!=0){
                        this.valueCM6 = '';
                        // this.getCM1Data();
                    // this.getCM2Data(); 
                    }
                    // this.getResoureData();
                },
                getCM1Data() {//折线图
                    let para = {
                        // period:this.periodST,
                        // startDay: this.valueST2[0] != null? new Date(this.valueST2[0]).toLocaleDateString(): '',
                        // endDay: this.valueST2[1] != null? new Date(this.valueST2[1]).toLocaleDateString(): '',
                        // cc_id: this.valueST1,
                        // view:'picture'
                    }
                    getReportSA(token, para).then(res => {
                        let data = res.data;
                        // console.log(data)
                        this.line3.xAxis.data = data.day;
                    this.line3.series = [{ //以后改成动态获取
                        name: "新报名合同",
                        type: "line",
                        data: data.t1
                    }, {
                        name: "续费合同",
                        type: "line",
                        data: data.t2
                    }, {
                        name: "再购买合同",
                        type: "line",
                        data: data.t3
                    } ,{
                        name: "转课补费合同",
                        type: "line",
                        data: data.t4
                    }, {
                        name: "全部合同",
                        type: "line",
                        data: data.all
                    }];
                    this.line3.legend = {
                        orient: 'horizontal',
                        bottom: 10,
                        data: ["新报名合同", "续费合同", "再购买合同", "转课补费合同", "全部合同"],
                        // backgroundColor:'white'
                    };
                    })
                },
                getCM2Data() {//饼图
                    let para = {
                        period:this.periodSR,
                        startDay: this.valueSR1[0] != null? new Date(this.valueSR1[0]).toLocaleDateString(): '',
                        endDay: this.valueSR1[1] != null? new Date(this.valueSR1[1]).toLocaleDateString(): '',
                        cc_id: this.valueSR1,
                        view:'rank'
                    }
                    getReportSA(token, para).then(res => {
                        let data = res.data;
                        // console.log(data)
                        this.bar.xAxis.data = data.teach;
                    this.bar.series[0].data = data.money
                    })
                },
                getCM3Data() {//表格
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
                
                // handleCommandSA(command) {
                //     this.titleSA = command;
                //     this.valueSA4 = '';
                //     if(command=='最近一周'){
                //         this.periodSA = 'w'
                //     }else{
                //         this.periodSA = 'm'
                //     }
                //     // this.getSAData();
                //     //调服务查询表单
                // },
                updateListSA(i) {//第二个大表格
                    if(i==1&&this.valueSA4!=''){
                        this.valueSA5=[];
                        this.valueSA3='day'
                        // this.getCM1Data();
                    // this.getCM2Data(); 
                    }else if(i==3&&this.valueSA5.length!=0){
                        this.valueSA4 = '';
                        // this.getCM1Data();
                    // this.getCM2Data(); 
                    }else if(i==2&&this.valueSA5.length!=0){
                        this.valueSA4 = '';
                        // this.getCM1Data();
                    // this.getCM2Data(); 
                    }
                    // this.getSAData();
                },
                getSA1Data() {//折线图
                    let para = {
                        // period:this.periodST,
                        // startDay: this.valueST2[0] != null? new Date(this.valueST2[0]).toLocaleDateString(): '',
                        // endDay: this.valueST2[1] != null? new Date(this.valueST2[1]).toLocaleDateString(): '',
                        // cc_id: this.valueST1,
                        // view:'picture'
                    }
                    getReportSA(token, para).then(res => {
                        let data = res.data;
                        // console.log(data)
                        this.line3.xAxis.data = data.day;
                    this.line3.series = [{ //以后改成动态获取
                        name: "新报名合同",
                        type: "line",
                        data: data.t1
                    }, {
                        name: "续费合同",
                        type: "line",
                        data: data.t2
                    }, {
                        name: "再购买合同",
                        type: "line",
                        data: data.t3
                    } ,{
                        name: "转课补费合同",
                        type: "line",
                        data: data.t4
                    }, {
                        name: "全部合同",
                        type: "line",
                        data: data.all
                    }];
                    this.line3.legend = {
                        orient: 'horizontal',
                        bottom: 10,
                        data: ["新报名合同", "续费合同", "再购买合同", "转课补费合同", "全部合同"],
                        // backgroundColor:'white'
                    };
                    })
                },
                getSA2Data() {//表格
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
                user = sessionStorage.getItem('user');
                token = JSON.parse(user).token;
            },
            created() {
                document.body.scrollTop = 0
                this.code = JSON.parse(user).job ? JSON.parse(user).job.code : '';
                this.aid = JSON.parse(user).aid ? JSON.parse(user).aid : ''; //获取aid
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
                if (this.code.includes('cc_m')) {
                getAllCCList(token).then((res) => {
                    this.ccs = res.data;
                    this.ccs.unshift({
                        aid: '0',
                        uname: '全部CC'
                    })
                }).then(()=>{
                    this.valueCM1 = this.aid;
                    this.valueSA1 = this.aid;
                })
            }
            if(this.code=='teach_m'){
                getTeacherList(token).then((res) => { //获取老师
                    let a = res.data
                    a.unshift({
                        aid: '0',
                        uname: '全部老师'
                    })
                    this.ccs = a;
                }).then(()=>{
                    this.valueCM1 = this.aid;
                    this.valueSA1 = this.aid;
                })
            }
            if(this.code.includes('_c')){

                    let cam={
                        simple:1
                    }
                    campusList(cam, token).then((res) => { //获取校区
                    this.schoolList = res.data;
                    this.valueCM5 = res.data[0].id;
                    this.valueSA2 = res.data[0].id;                    
                    // this.valueTeachR2 = res.data[0].id
                    // this.valueTeachR1 = res.data[0].id
                    // this.valueTeachR = res.data[0].id
                    // this.valueR = res.data[0].id
                })
                }
                this.line.legend = {
                        orient: 'horizontal',
                        bottom: 10,
                        data: ["冻结量", "转班量", "转校量"],
                        // backgroundColor:'white'
                    };
                this.line.xAxis.data = ["周一", "周二", "周三", "周四", "周五", "周六", "周日"]
                this.line2.xAxis.data = ["周一", "周二", "周三", "周四", "周五", "周六", "周日"]
                this.line3.xAxis.data = ["周一", "周二", "周三", "周四", "周五", "周六", "周日"]
                this.line.series = [{ //以后改成动态获取
                    name: "冻结量",
                    type: "line",
                    data: [2, 5, 10, 5, 1, 5, 10]
                }, {
                    name: "转班量",
                    type: "line",
                    data: [3, 10, 12, 3, 9, 0, 2]
                }, {
                    name: "转校量",
                    type: "line",
                    data: [4, 8, 18, 15, 4, 2, 1]
                }]
                this.line2.series = [{ //以后改成动态获取
                    name: "人数",
                    type: "line",
                    data: [2, 5, 10, 5, 1, 5, 10]
                }]
                this.line3.series = [{ //以后改成动态获取
                    name: "人数",
                    type: "line",
                    data: [2, 5, 10, 5, 1, 5, 10]
                }]
                this.pie_radius.series[0].data = [{
                    value: 20,
                    name: '冻结人数'
                }, {
                    value: 70,
                    name: '有效人数'
                },]
    
    
            }
        }
    
    </script>
    <style>
           #tableRChange .el-table th,  #tableRChange1 .el-table th,
            #tableRChange2 .el-table th,  #tableRChange3 .el-table th,
            #tableRChange4 .el-table th{
           background: #f2f2f2
       } 
       #tableRChange .el-table th>div,  #tableRChange4 .el-table th>div, #tableRChange3 .el-table th>div, #tableRChange2 .el-table th>div,
        #tableRChange1 .el-table th>div{
            background: #f2f2f2
        }
        .echarts {
            float: left;
            width: 100%;
            height: 400px;
            z-index: 1;
        }
     /* #tableRChange{
         height: 443px;
     } */
     /* #tableRChange .el-table__empty-block{
         min-height: 120px;
     } */
     /* #tableright{
         border-left: none;
     } */
        /* #tableRChange .el-table td:not(.gutter),
        #tableRChange .el-table th:not(.gutter) {
            padding: 5px 5px;
            text-align: center
        }
    
        #tableRChange .el-table th>div,
        #tableRChange .el-table .cell {
            padding-left: 0;
            padding-right: 0;
        }
    
        #tableRChange1 .el-table td:not(.gutter),
        #tableRChange1 .el-table th:not(.gutter) {
            padding: 5px 5px;
            text-align: center
        }
    
        #tableRChange1 .el-table th>div,
        #tableRChange1 .el-table .cell {
            padding-left: 0;
            padding-right: 0;
        }
        #tableRChange2 .el-table td:not(.gutter),
        #tableRChange2 .el-table th:not(.gutter) {
            padding: 5px 5px;
            text-align: center
        }
    
        #tableRChange2 .el-table th>div,
        #tableRChange2 .el-table .cell {
            padding-left: 0;
            padding-right: 0;
        }
        #tableRChange3 .el-table td,
        #tableRChange3 .el-table th:not(.gutter) {
            padding: 5px 5px;
            text-align: center
        }
    
        #tableRChange3 .el-table th>div,
        #tableRChange3 .el-table .cell {
            padding-left: 0;
            padding-right: 0;
        }
        #tableRChange4 .el-table td:not(.gutter),
        #tableRChange4 .el-table th:not(.gutter) {
            padding: 5px 5px;
            text-align: center
        }
    
        #tableRChange4 .el-table th>div,
        #tableRChange4 .el-table .cell {
            padding-left: 0;
            padding-right: 0;
        }
         */
        /* #tableRChange1 .el-table__footer .gutter {
            display: none
        }
    
        #tableRChange2 .el-table__footer .gutter {
            display: none
        }
        #tableRChange .el-table__footer .gutter {
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
            width: 198px
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
    .backfa{
        transform: rotateY(180deg);
        backface-visibility: hidden;
    }
    .backfa1{
        transform: rotateY(180deg);
        backface-visibility: hidden;
    }
    .circleSelect .el-input__inner{
    border-radius: 28px
}
/* .fronzeB{
    position: relative
}
.fronzeB::before{
    position: absolute;
    top:0;
    left:0;
    width:10px;
    border-left:1px solid gainsboro;
} */
    </style>
    