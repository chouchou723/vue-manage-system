<template>
    <div>
        <!-- <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-my-tongjifenxi"></i> 报表统计</el-breadcrumb-item>
            </el-breadcrumb>
        </div> -->
        <!-- 客户管理 -->
        <div style="width: 100%;float:left;background: white;margin-top:10px;position:relative;height:500px;transform-style:preserve-3d;">
            <div class="newResourceAn" style="position:relative;margin-top:10px;height:45px;border-bottom:1px solid gainsboro">
                <div style='margin-left:10px;width:100px;float:right;margin-right:5px' v-if='code=="cc_m"'>
                    <el-select v-model="valueCM1" size='small' clearable placeholder="全部CC" @change="updateListCM">
                        <el-option v-for="item in ccs" :key="item.aid" :label="item.uname" :value="item.aid">
                        </el-option>
                    </el-select>
                </div>
                <div style='float:left;'>
                    <h4 style='margin-bottom:20px;padding-top:5px;padding-left:10px'>
                        客户管理统计表
                    </h4>
                </div>
                <div class='drop' style='float:left;width:111px;margin-top:4px;margin-left:4px'>
                    <el-dropdown @command="handleCommandCM">
                        <span class="el-dropdown-link">
    [{{titleCM}}<i class="el-icon-caret-bottom el-icon--right"></i>]
  </span>
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item command="最近一周">最近一周</el-dropdown-item>
                            <el-dropdown-item command="最近一个月">最近一个月</el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
                </div>
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
                <div style='width:140px;float:left;margin-left:10px'>
                    <el-button type="primary" size="mid" class='buttonAdd' @click="changeChart">切换图表</el-button>
                </div>
                <div class='datec' style='float:left;margin-left:10px'>
                    <el-date-picker v-model="valueCM2" type="daterange" size='small' placeholder="选择日期范围" @change="updateListCM">
                    </el-date-picker>
                </div>
            </div>
            <div id="tableS" :class='{backfa:backface}' style='position:absolute;width: 100%;'>
                <el-table :data="resourceData" border show-summary style="width: 100%">
                    <el-table-column prop="date" label="日期">
                    </el-table-column>
                    <el-table-column prop="newResources" label="客户认领">
                    </el-table-column>
                    <el-table-column prop="newCall" label="沟通量">
                    </el-table-column>
                    <el-table-column prop="invitation" label="邀约量">
                    </el-table-column>
                    <el-table-column prop="visit" label="到访量">
                    </el-table-column>
                    <el-table-column prop="notVisit" label="未到访量">
                    </el-table-column>
                    <el-table-column prop="addOrder" label="签约量">
                    </el-table-column>
                    <el-table-column prop="visitingRate" label="到访率">
                    </el-table-column>
                    <el-table-column prop="memberRate" label="签单率">
                    </el-table-column>
                </el-table>
                <div class="block">
                    <el-pagination layout="prev, pager, next" :total="total2" :current-page="currentPage2" :page-size="pagesize2" @current-change="handleCurrentChange2">
                    </el-pagination>
                </div>
            </div>
            <IEcharts :option="line" style='height:400px;width:100%;position:absolute;' :class='{backfa1:backface1}'></IEcharts>
        </div>
        <!-- 客户管理 -->
        <!-- <div class="echarts" style="position:relative;margin-top:10px">
            <div style="width:100%;background-color:white;height:49px;position:absolute;margin-bottom:5px;border-top-left-radius:5px;border-top-right-radius:5px;border-bottom:1px solid gainsboro;z-index:100">
                <div>
                    <h4 style='padding-left:10px;margin-top:15px'>
                        客户管理趋势图
                    </h4>
                </div>
                <div class='drop' style='position:absolute;top:14px;left:126px;width:111px;z-index:3'>
                    <el-dropdown @command="handleCommandCT">
                        <span class="el-dropdown-link">
                [{{titleCT}}<i class="el-icon-caret-bottom el-icon--right"></i>]
              </span>
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item command="最近一周">最近一周</el-dropdown-item>
                            <el-dropdown-item command="最近一个月">最近一个月</el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
                </div>
                <div class='datec' style='position:absolute;top:10px;left:240px;margin-left:15px;z-index:3'>
                    <el-date-picker v-model="valueCT1" type="daterange" size='small' placeholder="选择日期范围" @change="updateListCT">
                    </el-date-picker>
                </div>
                <div style='margin-left:10px;width:100px;position:absolute;top:10px;right:10px;z-index:3' v-if='code=="cc_m"'>
                    <el-select v-model="valueCT2" size='small' clearable placeholder="全部CC" @change="updateListCT">
                        <el-option v-for="item in ccs" :key="item.aid" :label="item.uname" :value="item.aid">
                        </el-option>
                    </el-select>
                </div>
            </div>
            <div style="width:100%;position:absolute;bottom:0;height:350px;background-color:white;border-bottom-left-radius:5px;border-bottom-right-radius:5px;"></div>
            <IEcharts :option="line" style='height:400px;width:100%'></IEcharts>
        </div> -->
        <!-- 销售额 -->
        <div style="width: 35%;float:left;background: white;margin-top:10px">
            <div class="h1" style="position:relative;height:100px;background-color:#6b9ed4;border-radius:5px">
                <div>
                    <h4 style='margin-bottom:20px;color:white;padding-top:10px;margin-left:10px'>
                        销售额统计表
                    </h4>
                    <div class='drop' style='position:absolute;top:9px;left:120px;width:111px;'>
                        <el-dropdown @command="handleCommandSA">
                            <span class="el-dropdown-link">
                            [{{titleSA}}<i class="el-icon-caret-bottom el-icon--right"></i>]
                          </span>
                            <el-dropdown-menu slot="dropdown">
                                <el-dropdown-item command="最近一周">最近一周</el-dropdown-item>
                                <el-dropdown-item command="最近一个月">最近一个月</el-dropdown-item>
                            </el-dropdown-menu>
                        </el-dropdown>
                    </div>
                </div>
                <div style='margin-left:10px;width:98px;float:right;margin-right:5px' v-if='code=="cc_m"'>
                    <el-select v-model="valueSA1" size='small' clearable placeholder="全部CC" @change="updateListSA">
                        <el-option v-for="item in ccs" :key="item.aid" :label="item.uname" :value="item.aid">
                        </el-option>
                    </el-select>
                </div>
                <!-- <div style='margin-left:10px;width:140px;float:left;width:98px;'>
                    <el-select v-model="valueSA2" size='small' clearable placeholder="合同类型" @change="updateListSA">
                        <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                        </el-option>
                    </el-select>
                </div>
                <div style='width:140px;float:left;margin-left:10px;width:98px;'>
                    <el-select v-model="valueSA3" size='small' clearable placeholder="课程类型" @change="updateListSA">
                        <el-option v-for="item in options1" :key="item.id" :label="item.names" :value="item.id">
                        </el-option>
                    </el-select>
                </div> -->
                <div class='datec' style='float:left;margin-left:10px;' id='reportCCdate'>
                    <el-date-picker v-model="valueSA4" type="daterange" size='small' placeholder="选择日期范围" @change="updateListSA">
                    </el-date-picker>
                </div>
            </div>
            <div id="tableSA" >
                <el-table :data="SAData" border show-summary style="width: 100%;">
                    <el-table-column prop="date" label="日期">
                    </el-table-column>
                    <el-table-column prop="orderNum" label="签单量">
                    </el-table-column>
                    <el-table-column prop="people" label="人头数">
                    </el-table-column>
                    <el-table-column prop="money" label="金额">
                    </el-table-column>
                </el-table>
                <div class="block">
                    <el-pagination layout="prev, pager, next" :total="total" :current-page="currentPage" :page-size="pagesize" @current-change="handleCurrentChange">
                    </el-pagination>
                </div>
            </div>
        </div>
        <!-- 销售额 -->
        <div style="width:64%;float:right;margin-top:10px">
            <div class="h1" style="position:relative;height:100px;background-color:#6b9ed4;border-radius:5px">
                <div>
                    <h4 style='margin-bottom:20px;margin-left:10px;color:white;padding-top:10px'>
                        销售额走势图
                    </h4>
                    <div class='drop' style='position:absolute;top:9px;left:126px;width:111px;'>
                        <el-dropdown @command="handleCommandST">
                            <span class="el-dropdown-link">
                                [{{titleST}}<i class="el-icon-caret-bottom el-icon--right"></i>]
                              </span>
                            <el-dropdown-menu slot="dropdown">
                                <el-dropdown-item command="最近一周">最近一周</el-dropdown-item>
                                <el-dropdown-item command="最近一个月">最近一个月</el-dropdown-item>
                            </el-dropdown-menu>
                        </el-dropdown>
                    </div>
                </div>
                <div style='margin-right:10px;width:100px;float:right' v-if='code=="cc_m"'>
                    <el-select v-model="valueST1" size='small' clearable placeholder="全部CC" @change="updateListST">
                        <el-option v-for="item in ccs" :key="item.aid" :label="item.uname" :value="item.aid">
                        </el-option>
                    </el-select>
                </div>
                <!-- <div style='margin-left:10px;width:140px;float:left'>
                    <el-select v-model="value4" size='small' clearable placeholder="课程类型" @change="updateListST">
                        <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                        </el-option>
                    </el-select>
                </div> -->
                <div class='datec' style='float:left;margin-left:10px'>
                    <el-date-picker v-model="valueST2" type="daterange" size='small' placeholder="选择日期范围" @change="updateListST">
                    </el-date-picker>
                </div>
            </div>
            <div class="echarts">
                <IEcharts :option="line3" style='height:443px;width:100%'></IEcharts>
            </div>
        </div>
        <!-- cc销售额排行榜-->
        <div class="echarts" style="position:relative;margin-top:10px">
            <div style="width:100%;background-color:white;height:50px;position:absolute;margin-bottom:5px;border-top-left-radius:5px;border-top-right-radius:5px;border-bottom:1px solid gainsboro">
                <div class='drop' style='position:absolute;top:14px;left:132px;width:111px;z-index:3'>
                    <el-dropdown @command="handleCommandSR">
                        <span class="el-dropdown-link">
                      [{{titleSR}}<i class="el-icon-caret-bottom el-icon--right"></i>]
                    </span>
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item command="最近一周">最近一周</el-dropdown-item>
                            <el-dropdown-item command="最近一个月">最近一个月</el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
                </div>
                <div class='datec' style='position:absolute;top:10px;left:236px;margin-left:9px;z-index:3'>
                    <el-date-picker v-model="valueSR1" type="daterange" size='small' placeholder="选择日期范围" @change="updateListSR">
                    </el-date-picker>
                </div>
                <div style='margin-left:10px;width:100px;position:absolute;top:10px;right:10px;z-index:3' v-if='code=="cc_m"'>
                    <el-select v-model="valueSR2" size='small' clearable placeholder="全部CC" @change="updateListSR">
                        <el-option v-for="item in ccs" :key="item.value" :label="item.label" :value="item.value">
                        </el-option>
                    </el-select>
                </div>
            </div>
            <div style="width:100%;position:absolute;bottom:0;height:349px;background-color:white;border-bottom-left-radius:5px;border-bottom-right-radius:5px;"></div>
            <IEcharts :option="bar" style='height:400px;width:100%'></IEcharts>
        </div>
        <!-- 合同管理 -->
        <div style="width: 100%;float:left;background: white;margin-top:10px">
            <div class="h1" style="position:relative;height:50px;background-color:#1fb5ad;border-radius:5px">
                <div style="float:left;margin-top:15px">
                    <h4 style='color:white;margin-left:10px'>
                        合同管理统计表
                    </h4>
                    <div class='drop' style='position:absolute;top:14px;left:123px;width:111px;'>
                        <el-dropdown @command="handleCommandHM">
                            <span class="el-dropdown-link">
                            [{{titleHM}}<i class="el-icon-caret-bottom el-icon--right"></i>]
                          </span>
                            <el-dropdown-menu slot="dropdown">
                                <el-dropdown-item command="最近一周">最近一周</el-dropdown-item>
                                <el-dropdown-item command="最近一个月">最近一个月</el-dropdown-item>
                            </el-dropdown-menu>
                        </el-dropdown>
                    </div>
                </div>
                <div style='width:98px;float:right;margin-right:5px;margin-top:10px;' v-if='code=="cc_m"'>
                    <el-select v-model="valueHM1" size='small' clearable placeholder="全部CC" @change="updateListHM">
                        <el-option v-for="item in ccs" :key="item.aid" :label="item.uname" :value="item.aid">
                        </el-option>
                    </el-select>
                </div>
                <!-- <div style='margin-left:120px;margin-top:10px;width:140px;float:left;width:98px;'>
                    <el-select v-model="valueHM" size='small' clearable placeholder="课程类型" @change="updateList1">
                        <el-option v-for="item in options1" :key="item.id" :label="item.names" :value="item.id">
                        </el-option>
                    </el-select>
                </div> -->
                <div class='datec' style='float:left;margin-top:10px;margin-left:110px;' id='reportCCdate'>
                    <el-date-picker v-model="valueHM2" type="daterange" size='small' placeholder="选择日期范围" @change="updateListHM">
                    </el-date-picker>
                </div>
            </div>
            <div id="tableR">
                <el-table :data="HMData" border show-summary style="width: 100%;">
                    <el-table-column prop="date" label="日期">
                    </el-table-column>
                    <el-table-column prop="resource" label="冻结量">
                    </el-table-column>
                    <el-table-column prop="comm" label="延期量">
                    </el-table-column>
                    <el-table-column prop="active" label="转班量">
                    </el-table-column>
                    <el-table-column prop="resource" label="转校量">
                    </el-table-column>
                    <el-table-column prop="comm" label="过期量">
                    </el-table-column>
                    <el-table-column prop="active" label="退费量">
                    </el-table-column>
                    <el-table-column prop="active" label="退费金额">
                    </el-table-column>
                </el-table>
                <div class="block">
                    <el-pagination layout="prev, pager, next" :total="total" :current-page="currentPage" :page-size="pagesize" @current-change="handleCurrentChange">
                    </el-pagination>
                </div>
            </div>
        </div>
        <!-- 合同管理 -->
        <div class="echarts" style="position:relative;margin-top:10px">
            <div style="width:100%;background-color:white;height:47px;position:absolute;margin-bottom:5px;border-top-left-radius:5px;border-top-right-radius:5px;border-bottom:1px solid gainsboro;z-index:100">
                <div>
                    <h4 style='padding-left:10px;margin-top:15px'>
                        合同管理趋势图
                    </h4>
                </div>
                <div class='drop' style='position:absolute;top:14px;left:126px;width:111px;z-index:3'>
                    <el-dropdown @command="handleCommandHT">
                        <span class="el-dropdown-link">
                [{{titleHT}}<i class="el-icon-caret-bottom el-icon--right"></i>]
              </span>
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item command="最近一周">最近一周</el-dropdown-item>
                            <el-dropdown-item command="最近一个月">最近一个月</el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
                </div>
                <div class='datec' style='position:absolute;top:10px;left:240px;margin-left:15px;z-index:3'>
                    <el-date-picker v-model="valueHT1" type="daterange" size='small' placeholder="选择日期范围" @change="updateListHT">
                    </el-date-picker>
                </div>
                <div style='margin-left:10px;width:100px;position:absolute;top:10px;right:10px;z-index:3' v-if='code=="cc_m"'>
                    <el-select v-model="valueHT2" size='small' clearable placeholder="全部CC" @change="updateListHT">
                        <el-option v-for="item in ccs" :key="item.aid" :label="item.uname" :value="item.aid">
                        </el-option>
                    </el-select>
                </div>
            </div>
            <div style="width:100%;position:absolute;bottom:0;height:350px;background-color:white;border-bottom-left-radius:5px;border-bottom-right-radius:5px;"></div>
            <IEcharts :option="line4" style='height:400px;width:100%'></IEcharts>
        </div>
        <!-- 签到统计 -->
        <div style="width: 100%;float:left;background: white;margin-top:10px">
            <div class="newResourceAn" style="position:relative;margin-top:10px;height:35px;margin-bottom:10px;border-bottom:1px solid gainsboro">
                <div style='margin-left:10px;width:100px;float:right;margin-right:5px' v-if='code=="cc_m"'>
                    <el-select v-model="value13" size='small' clearable placeholder="全部TMK" @change="updateList4">
                        <el-option v-for="item in ccs" :key="item.aid" :label="item.uname" :value="item.aid">
                        </el-option>
                    </el-select>
                </div>
                <div style='float:left;'>
                    <h4 style='padding-top:5px;margin-left:10px'>
                        签到统计
                    </h4>
                </div>
                <div class='drop' style='float:left;width:111px;margin-top:4px;margin-left:4px'>
                    <el-dropdown @command="handleCommand4">
                        <span class="el-dropdown-link">
    [{{title4}}<i class="el-icon-caret-bottom el-icon--right"></i>]
  </span>
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item command="最近一周">最近一周</el-dropdown-item>
                            <el-dropdown-item command="最近一个月">最近一个月</el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
                </div>
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
                <div class='datec' style='float:left;margin-left:10px'>
                    <el-date-picker v-model="value8" type="daterange" size='small' placeholder="选择日期范围" @change="updateList4">
                    </el-date-picker>
                </div>
            </div>
            <div id="tableS" style="width: 35%;float:left;margin-left:20px">
                <el-table :data="resourceData" border show-summary>
                    <el-table-column prop="date" label="日期">
                    </el-table-column>
                    <el-table-column prop="claim" label="出勤">
                    </el-table-column>
                    <el-table-column prop="invite" label="请假">
                    </el-table-column>
                    <el-table-column prop="arrive" label="旷课">
                    </el-table-column>
                </el-table>
                <div class="block">
                    <el-pagination layout="prev, pager, next" :total="total2" :current-page="currentPage2" :page-size="pagesize2" @current-change="handleCurrentChange2">
                    </el-pagination>
                </div>
            </div>
            <IEcharts :option="line2" style='height:400px;width:63%;float:right'></IEcharts>
        </div>
        <!-- 排班统计 -->
        <div style="width: 100%;float:left;background: white;margin-top:10px">
            <div class="newResourceAn" style="position:relative;margin-top:10px;height:35px;margin-bottom:10px;border-bottom:1px solid gainsboro">
                <div style='margin-left:10px;width:100px;float:right;margin-right:5px' v-if='code=="cc_m"'>
                    <el-select v-model="value13" size='small' clearable placeholder="全部TMK" @change="updateList4">
                        <el-option v-for="item in ccs" :key="item.aid" :label="item.uname" :value="item.aid">
                        </el-option>
                    </el-select>
                </div>
                <div style='float:left;'>
                    <h4 style='padding-top:5px;margin-left:10px'>
                        排班统计
                    </h4>
                </div>
                <div class='drop' style='float:left;width:111px;margin-top:4px;margin-left:4px'>
                    <el-dropdown @command="handleCommand4">
                        <span class="el-dropdown-link">
    [{{title4}}<i class="el-icon-caret-bottom el-icon--right"></i>]
  </span>
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item command="最近一周">最近一周</el-dropdown-item>
                            <el-dropdown-item command="最近一个月">最近一个月</el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
                </div>
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
                <div class='datec' style='float:left;margin-left:10px'>
                    <el-date-picker v-model="value8" type="daterange" size='small' placeholder="选择日期范围" @change="updateList4">
                    </el-date-picker>
                </div>
            </div>
            <div id="tableS" style="width: 35%;float:left;margin-left:20px">
                <el-table :data="resourceData" border show-summary>
                    <el-table-column prop="date" label="日期">
                    </el-table-column>
                    <el-table-column prop="claim" label="出勤">
                    </el-table-column>
                    <el-table-column prop="invite" label="请假">
                    </el-table-column>
                    <el-table-column prop="arrive" label="旷课">
                    </el-table-column>
                </el-table>
                <div class="block">
                    <el-pagination layout="prev, pager, next" :total="total2" :current-page="currentPage2" :page-size="pagesize2" @current-change="handleCurrentChange2">
                    </el-pagination>
                </div>
            </div>
            <IEcharts :option="line2" style='height:400px;width:63%;float:right'></IEcharts>
        </div>
        <!-- 班级统计 -->
        <div style="width: 100%;float:left;background: white;margin-top:10px">
            <div class="newResourceAn" style="position:relative;margin-top:10px;height:35px;margin-bottom:10px;border-bottom:1px solid gainsboro">
                <div style='margin-left:10px;width:100px;float:right;margin-right:5px' v-if='code=="cc_m"'>
                    <el-select v-model="value13" size='small' clearable placeholder="全部TMK" @change="updateList4">
                        <el-option v-for="item in ccs" :key="item.aid" :label="item.uname" :value="item.aid">
                        </el-option>
                    </el-select>
                </div>
                <div style='float:left;'>
                    <h4 style='padding-top:5px;margin-left:10px'>
                        班级统计
                    </h4>
                </div>
                <div class='drop' style='float:left;width:111px;margin-top:4px;margin-left:4px'>
                    <el-dropdown @command="handleCommand4">
                        <span class="el-dropdown-link">
    [{{title4}}<i class="el-icon-caret-bottom el-icon--right"></i>]
  </span>
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item command="最近一周">最近一周</el-dropdown-item>
                            <el-dropdown-item command="最近一个月">最近一个月</el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
                </div>
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
                <div class='datec' style='float:left;margin-left:10px'>
                    <el-date-picker v-model="value8" type="daterange" size='small' placeholder="选择日期范围" @change="updateList4">
                    </el-date-picker>
                </div>
            </div>
            <div id="tableS" style="width: 35%;float:left;margin-left:20px">
                <el-table :data="resourceData" border show-summary>
                    <el-table-column prop="date" label="日期">
                    </el-table-column>
                    <el-table-column prop="claim" label="出勤">
                    </el-table-column>
                    <el-table-column prop="invite" label="请假">
                    </el-table-column>
                    <el-table-column prop="arrive" label="旷课">
                    </el-table-column>
                </el-table>
                <div class="block">
                    <el-pagination layout="prev, pager, next" :total="total2" :current-page="currentPage2" :page-size="pagesize2" @current-change="handleCurrentChange2">
                    </el-pagination>
                </div>
            </div>
            <IEcharts :option="line2" style='height:400px;width:63%;float:right'></IEcharts>
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
            code: '',
            radio3: '2',
            isCharge: true,
            currentPage: 1, //页数
            pagesize: 15, //默认每页
            total: 0, //总页数
            currentPage2: 1, //页数
            pagesize2: 15, //默认每页
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
            SAData:[],
            HMData:[],            
            options: [],
            options1: [],
            titleCM: '最近一周',
            titleCT: '最近一周',
            titleSA: '最近一周',  
            titleST: '最近一周',  
            titleSR: '最近一周',                            
            titleHM: '最近一周',
            titleHT: '最近一周',                                   
            title1: '最近一周',
            title2: '最近一周',
            title3: '最近一周',
            title4: '最近一周',
            title5: '最近一周',
            title6: '最近一周',
            valueCM1: '',
            valueCM2: '',
            periodCM:'w',
            valueCT1: '',
            valueCT2: '',
            periodCT:'w',            
            valueSA1: '',
            valueSA2: '',
            valueSA3: '',
            valueSA4: '',           
            periodSA:'w',            
            valueST1: '',
            valueST2: '',
            periodST:'w',            
            valueSR1: '',
            valueSR2: '',
            periodSR:'w',            
            valueHM1: '',
            valueHM2: '',
            periodHM:'w',        
            valueHT1: '',
            valueHT2: '',
            periodHT:'w',            
            value: "",
            value1: "",
            value2: "",
            value3: "",
            value4: "",
            value5: "",
            value6: "",
            value7: "",
            value8: "",
            value9: "",
            value10: '',
            value11: '',
            value12: '',
            value13: '',
            value14: '',
            value15: '',
            backface:false,
            backface1:true,
            line: {
                color: ["#13CE66", "#F7BA2A", "#16b8be", "#ed42b3","#c7be40", "#20a0ff"],
                title: {
                    // text: '客户管理趋势图',
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
                series: [],
                backgroundColor: 'white'
            },
            line2: {
                color: ["#13CE66", "#F7BA2A", "#16b8be", "#ed42b3"],
                title: {

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
                    data: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"]

                },
                yAxis: {
                    splitLine: {
                        show: true
                    }
                },
                legend: {
                    orient: 'horizontal',
                    bottom: 10,
                    data: ["新客户", "邀约量", "到访量", "签单量"]
                },
                series: []
            },
            line3: {
                color: ["#13CE66", "#F7BA2A", "#16b8be", "#ed42b3", "#20a0ff"],
                title: {
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
                series: [],
                backgroundColor: 'white'
            },
            line4: {
                color: ["#13CE66", "#F7BA2A", "#16b8be", "#ed42b3", "#20a0ff","#c7be40"],
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
                    data: ["冻结量", "延期量", "转班量", "转校量", "过期量","退费量"]
                },
                series: [],
                backgroundColor: 'white'
            },
            pie_radius: {
                color: ["#20a0ff", "#13CE66", "#F7BA2A", "#FF4949", "#61a0a8", "#9caad6"],

                tooltip: {
                    trigger: 'item',
                    formatter: "{a} <br/>{b} : {c} ({d}%)"
                },
                graphic: [{
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
                }],
                series: [{
                    name: '渠道比例',
                    type: 'pie',
                    radius: ['30%', '70%'],
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
            updateListCM() {
                if(this.valueCM2 !=''){

                    this.periodCM = ''
                }
                this.getResoureData();
            },
            updateListCT() {
                if(this.valueCT2 !=''){
                this.periodCT = ''
                }
                this.getCTData();
            },
            updateListSA() {
                if(this.valueSA4 !=''){
                this.periodSA = ''
                }
                this.getSAData();
            },
            updateListST() {
                if(this.valueST2 !=''){
                this.periodST = ''
                }
                this.getSTData();
            },
            updateListSR() {
                if(this.valueSR2 !=''){
                this.periodSR = ''
                }
                this.getSRData();
            },
            updateListHM() {
                this.periodHM = ''
                this.getSRData();
            },
            updateListHT() {
                this.periodHT = ''
                this.getSRData();
            },
            updateList1() {
                console.log(1)
            },
            updateList2() {
                console.log(2)
            },
            updateList3() {
                console.log(3)
            },
            updateList4() {},
            updateList5() {},
            updateList6() {},
            changeChart(){
                  if(this.backface){
                    this.backface = false;
                    this.backface1 = true;
                }else{
                    this.backface1 = false;
                this.backface = true;
                }
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
            handleCommandCT(command) {
                this.titleCT = command;
                this.valueCT1 = '';
                if(command=='最近一周'){
                    this.periodCT = 'w'
                }else{
                    this.periodCT = 'm'
                }
                this.getCTData();
                //调服务查询表单
            },
            handleCommandSA(command) {
                this.titleSA = command;
                this.valueSA4 = '';
                if(command=='最近一周'){
                    this.periodSA = 'w'
                }else{
                    this.periodSA = 'm'
                }
                this.getSAData();
                //调服务查询表单
            },
            handleCommandST(command) {
                this.titleST = command;
                this.valueST2 = '';
                if(command=='最近一周'){
                    this.periodST = 'w'
                }else{
                    this.periodST = 'm'
                }
                this.getSTData();
                //调服务查询表单
            },
            handleCommandSR(command) {
                this.titleSR = command;
                this.valueSR1='';
                if(command=='最近一周'){
                    this.periodSR = 'w'
                }else{
                    this.periodSR = 'm'
                }
                this.getSRData();
                //调服务查询表单
            },
            handleCommandHM(command) {
                this.titleHM = command;
                //调服务查询表单
            },
            handleCommandHT(command) {
                this.titleHT = command;
                //调服务查询表单
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
                if (command === '最近一个月') {

                    let y = new Date().getFullYear();
                    let m = new Date().getMonth() + 1;

                    function getDaysInOneMonth(year, month) { //获取月份天数
                        month = parseInt(month, 10);
                        var d = new Date(year, month, 0);
                        return d.getDate();
                    }
                    let a = getDaysInOneMonth(y, m);
                    let arr = [];
                    for (let i = 1; i <= a; i++) {
                        arr.push(i)
                    }
                    this.line.xAxis.data = arr
                } else {
                    this.line.xAxis.data = ["周一", "周二", "周三", "周四", "周五", "周六", "周日"]
                }
            },
            handleCommand4(command) {
                this.title4 = command;
            },
            handleCommand5(command) {
                this.title5 = command;
                if (command === '最近一个月') {

                    let y = new Date().getFullYear();
                    let m = new Date().getMonth() + 1;

                    function getDaysInOneMonth(year, month) { //获取月份天数
                        month = parseInt(month, 10);
                        var d = new Date(year, month, 0);
                        return d.getDate();
                    }
                    let a = getDaysInOneMonth(y, m);
                    let arr = [];
                    for (let i = 1; i <= a; i++) {
                        arr.push(i)
                    }
                    this.line2.xAxis.data = arr
                } else {
                    this.line2.xAxis.data = ["周一", "周二", "周三", "周四", "周五", "周六", "周日"]
                }
            },
            handleCommand6(command) {
                this.title6 = command;
            },
            getResoureData() {
                let para = {
                    period:this.periodCM,
                    startDay: this.valueCM2[0] != null? new Date(this.valueCM2[0]).toLocaleDateString(): '',
                    endDay: this.valueCM2[1] != null? new Date(this.valueCM2[1]).toLocaleDateString(): '',                    
                    cc_id: this.valueCM1
                }
                getReport1(token, para).then(res => {
                    this.resourceData = res.data
                })
            },
            getCTData() {
                let para = {
                    period:this.periodCT,
                    startDay: this.valueCT1[0] != null? new Date(this.valueCT1[0]).toLocaleDateString(): '',
                    endDay: this.valueCT1[1] != null? new Date(this.valueCT1[1]).toLocaleDateString(): '',
                    cc_id: this.valueCT2,
                    view:'picture'
                }
                getReport1(token, para).then(res => {
                    let data = res.data;
                    // console.log(data)
                    this.line.xAxis.data = data.day;
                this.line.series = [{ //以后改成动态获取
                    name: "客户认领",
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
                } ,{
                    name: "到访量",
                    type: "line",
                    data: data.visit
                }, {
                    name: "未到访量",
                    type: "line",
                    data: data.notVisit
                }, {
                    name: "签约量",
                    type: "line",
                    data: data.addOrder
                }];
                this.line.legend = {
                    orient: 'horizontal',
                    bottom: 10,
                    data: ["客户认领", "沟通量", "邀约量", "到访量", "未到访量","签约量"]
                    // backgroundColor:'white'
                };
                })
            },
            getSAData() {
                let para = {
                    period:this.periodSA,
                    startDay: this.valueSA4[0] != null? new Date(this.valueSA4[0]).toLocaleDateString(): '',
                    endDay: this.valueSA4[1] != null? new Date(this.valueSA4[1]).toLocaleDateString(): '',
                    cc_id: this.valueSA1,
                    view:'table'
                }
                getReportSA(token, para).then(res => {
                    this.SAData = res.data
                })
            },
            getSTData() {
                let para = {
                    period:this.periodST,
                    startDay: this.valueST2[0] != null? new Date(this.valueST2[0]).toLocaleDateString(): '',
                    endDay: this.valueST2[1] != null? new Date(this.valueST2[1]).toLocaleDateString(): '',
                    cc_id: this.valueST1,
                    view:'picture'
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
            getSRData() {
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
            getHMData() {
                let para = {
                    period:this.periodHM,
                    startDay: this.valueHM2[0] != null? new Date(this.valueHM2[0]).toLocaleDateString(): '',
                    endDay: this.valueHM2[1] != null? new Date(this.valueHM2[1]).toLocaleDateString(): '',                    
                    cc_id: this.valueCM1
                }
                // getHM(token, para).then(res => {
                //     this.HMData = res.data
                // })
            },
            getChart1() {
                this.line.xAxis.data = data.data.weekList.week;
                this.line.series = [{ //以后改成动态获取
                    name: "新资源",
                    type: "line",
                    data: data.data.weekList.newResources
                }, {
                    name: "沟通记录量",
                    type: "line",
                    data: data.data.weekList.newCall
                }, {
                    name: "激活无需求",
                    type: "line",
                    data: data.data.weekList.activation
                } ,{
                    name: "认定无效",
                    type: "line",
                    data: data.data.weekList.invalid
                }, {
                    name: "回访量",
                    type: "line",
                    data: data.data.weekList.returnCall
                }];
                this.line.legend = {
                    orient: 'horizontal',
                    bottom: 10,
                    data: ["新资源", "沟通记录量", "激活无需求", "认定无效", "回访量"],
                    // backgroundColor:'white'
                };
            },
        },
        beforeCreate() {
            user = sessionStorage.getItem('user');
            token = JSON.parse(user).token;
        },
        created() {
            this.code = JSON.parse(user).job ? JSON.parse(user).job.code : '';
            this.getResoureData();
            this.getCTData();
            this.getSAData();
            this.getSTData();
            this.getSRData();
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
                if(this.code.includes('cc_m')){
                    getAllCCList(token).then((res) => {
                        this.ccs = res.data
                    })
                }
            this.line4.series = [{ //以后改成动态获取
                name: "新资源",
                type: "line",
                data: [1, 5, 10, 5, 1, 5, 10]
            }, {
                name: "沟通记录量",
                type: "line",
                data: [5, 10, 12, 3, 9, 0, 2]
            }, {
                name: "激活无需求",
                type: "line",
                data: [3, 8, 18, 15, 4, 2, 1]
            }, {
                name: "认定无效",
                type: "line",
                data: [10, 1, 2, 3, 5, 7, 8]
            }, {
                name: "回访量",
                type: "line",
                data: [3, 11, 6, 2, 15, 2, 10]
            }]
            this.line4.xAxis.data = ["周一", "周二", "周三", "周四", "周五", "周六", "周日"]
            this.pie_radius.series[0].data = [{
                value: 20,
                name: '线上'
            }, {
                value: 30,
                name: '线下'
            }, {
                value: 10,
                name: '转介绍'
            }, {
                value: 20,
                name: '续费'
            }, {
                value: 20,
                name: '顺访'
            }]
            this.line2.series = [{ //以后改成动态获取
                name: "新客户",
                type: "line",
                data: [2, 5, 10, 5, 1, 5, 10]
            }, {
                name: "邀约量",
                type: "line",
                data: [3, 10, 12, 3, 9, 0, 2]
            }, {
                name: "到访量",
                type: "line",
                data: [4, 8, 18, 15, 4, 2, 1]
            }, {
                name: "签单量",
                type: "line",
                data: [5, 1, 2, 3, 5, 7, 8]
            }]


        }
    }

</script>
<style>
    .echarts {
        float: left;
        width: 100%;
        height: 400px;
        z-index: 1;
    }
 #tableSA{
     height: 443px;
 }
    #tableSA .el-table td,
    #tableSA .el-table th:not(.gutter) {
        padding: 5px 5px;
        text-align: center
    }

    #tableSA .el-table th>div,
    #tableSA .el-table .cell {
        padding-left: 0;
        padding-right: 0;
    }

    #tableR .el-table td,
    #tableR .el-table th:not(.gutter) {
        padding: 5px 5px;
        text-align: center
    }

    #tableR .el-table th>div,
    #tableR .el-table .cell {
        padding-left: 0;
        padding-right: 0;
    }
    #tableS .el-table td,
    #tableS .el-table th:not(.gutter) {
        padding: 5px 5px;
        text-align: center
    }

    #tableS .el-table th>div,
    #tableS .el-table .cell {
        padding-left: 0;
        padding-right: 0;
    }


    /* #tableR .el-table__footer .gutter {
        display: none
    }

    #tableS .el-table__footer .gutter {
        display: none
    }
    #tableSA .el-table__footer .gutter {
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
.backfa{
    transform: rotateY(180deg);
    backface-visibility: hidden;
}
.backfa1{
    transform: rotateY(180deg);
    backface-visibility: hidden;
}
</style>
