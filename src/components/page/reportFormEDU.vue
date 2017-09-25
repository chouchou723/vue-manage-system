<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-my-tongjifenxi"></i> 报表统计</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <!-- 签到统计 -->
        <div style="width: 45%;float:left;background: white;">
            <div class="h1" style="position:relative;height:100px;background-color:#6b9ed4;border-radius:5px">
                <div>
                    <h4 style='margin-bottom:20px;color:white;padding-top:10px;margin-left:10px'>
                        签到统计表
                    </h4>
                    <div class='drop' style='position:absolute;top:9px;left:120px;width:140px;'>
                        <el-dropdown @command="handleCommand1">
                            <span class="el-dropdown-link">
                            [{{title1}}<i class="el-icon-caret-bottom el-icon--right"></i>]
                          </span>
                            <el-dropdown-menu slot="dropdown">
                                <el-dropdown-item command="最近一周">最近一周</el-dropdown-item>
                                <el-dropdown-item command="最近一个月">最近一个月</el-dropdown-item>
                            </el-dropdown-menu>
                        </el-dropdown>
                    </div>
                </div>
                <div style='margin-left:10px;width:98px;float:right;margin-right:5px' v-if='code=="cc_m"'>
                    <el-select v-model="value10" size='small' clearable placeholder="全部CC" @change="updateList1">
                        <el-option v-for="item in tmks" :key="item.key" :label="item.label" :value="item.key">
                        </el-option>
                    </el-select>
                </div>
                <div style='margin-left:10px;width:140px;float:left;width:98px;'>
                    <el-select v-model="value" size='small' clearable placeholder="合同类型" @change="updateList1">
                        <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                        </el-option>
                    </el-select>
                </div>
                <div style='width:140px;float:left;margin-left:10px;width:98px;'>
                    <el-select v-model="value1" size='small' clearable placeholder="课程类型" @change="updateList1">
                        <el-option v-for="item in options1" :key="item.id" :label="item.names" :value="item.id">
                        </el-option>
                    </el-select>
                </div>
                <div class='datec' style='float:left;margin-left:10px;' id='reportCCdate'>
                    <el-date-picker v-model="value3" type="daterange" size='small' placeholder="选择日期范围" @change="updateList1">
                    </el-date-picker>
                </div>
            </div>
            <div id="tableR">
                <el-table :data="workData"  border show-summary style="width: 100%;">
                    <el-table-column prop="date" label="日期">
                    </el-table-column>
                    <el-table-column prop="resource" label="签单量">
                    </el-table-column>
                    <el-table-column prop="comm" label="人头数">
                    </el-table-column>
                    <el-table-column prop="active" label="金额">
                    </el-table-column>
                </el-table>
                <div class="block">
                    <el-pagination layout="prev, pager, next" :total="total" :current-page="currentPage" :page-size="pagesize" @current-change="handleCurrentChange">
                    </el-pagination>
                </div>
            </div>
        </div>
        <!-- 签到统计走势图 -->
        <div style="width:54%;float:right;">
            <div class="h1" style="position:relative;height:100px;background-color:#6b9ed4;border-radius:5px">
                <div>
                    <h4 style='margin-bottom:20px;margin-left:10px;color:white;padding-top:10px'>
                        签到统计走势图
                    </h4>
                    <div class='drop' style='position:absolute;top:9px;left:126px;width:140px;'>
                        <el-dropdown @command="handleCommand2">
                            <span class="el-dropdown-link">
                                [{{title2}}<i class="el-icon-caret-bottom el-icon--right"></i>]
                              </span>
                            <el-dropdown-menu slot="dropdown">
                                <el-dropdown-item command="最近一周">最近一周</el-dropdown-item>
                                <el-dropdown-item command="最近一个月">最近一个月</el-dropdown-item>
                            </el-dropdown-menu>
                        </el-dropdown>
                    </div>
                </div>
                <div style='margin-right:10px;width:100px;float:right' v-if='code=="cc_m"'>
                    <el-select v-model="value11" size='small' clearable placeholder="全部CC" @change="updateList2">
                        <el-option v-for="item in tmks" :key="item.key" :label="item.label" :value="item.key">
                        </el-option>
                    </el-select>
                </div>
                <div style='margin-left:10px;width:140px;float:left'>
                    <el-select v-model="value4" size='small' clearable placeholder="课程类型" @change="updateList2">
                        <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                        </el-option>
                    </el-select>
                </div>
                <div class='datec' style='float:left;margin-left:10px'>
                    <el-date-picker v-model="value5" type="daterange" size='small' placeholder="选择日期范围" @change="updateList2">
                    </el-date-picker>
                </div>
            </div>
            <div class="echarts">
                <IEcharts :option="line3" style='height:400px;width:100%'></IEcharts>
            </div>
        </div>
        <div style='clear:both'></div>
        <!-- 业绩统计 -->
        <div style="width: 45%;float:left;background: white;margin-top:10px">
            <div class="h1" style="position:relative;height:100px;background-color:#6b9ed4;border-radius:5px">
                <div>
                    <h4 style='margin-bottom:20px;color:white;padding-top:10px;margin-left:10px'>
                        业绩统计
                    </h4>
                    <div class='drop' style='position:absolute;top:9px;left:120px;width:140px;'>
                        <el-dropdown @command="handleCommand1">
                            <span class="el-dropdown-link">
                            [{{title1}}<i class="el-icon-caret-bottom el-icon--right"></i>]
                          </span>
                            <el-dropdown-menu slot="dropdown">
                                <el-dropdown-item command="最近一周">最近一周</el-dropdown-item>
                                <el-dropdown-item command="最近一个月">最近一个月</el-dropdown-item>
                            </el-dropdown-menu>
                        </el-dropdown>
                    </div>
                </div>
                <div style='margin-left:10px;width:98px;float:right;margin-right:5px' v-if='code=="cc_m"'>
                    <el-select v-model="value10" size='small' clearable placeholder="全部CC" @change="updateList1">
                        <el-option v-for="item in tmks" :key="item.key" :label="item.label" :value="item.key">
                        </el-option>
                    </el-select>
                </div>
                <div style='margin-left:10px;width:140px;float:left;width:98px;'>
                    <el-select v-model="value" size='small' clearable placeholder="合同类型" @change="updateList1">
                        <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                        </el-option>
                    </el-select>
                </div>
                <div style='width:140px;float:left;margin-left:10px;width:98px;'>
                    <el-select v-model="value1" size='small' clearable placeholder="课程类型" @change="updateList1">
                        <el-option v-for="item in options1" :key="item.id" :label="item.names" :value="item.id">
                        </el-option>
                    </el-select>
                </div>
                <div class='datec' style='float:left;margin-left:10px;' id='reportCCdate'>
                    <el-date-picker v-model="value3" type="daterange" size='small' placeholder="选择日期范围" @change="updateList1">
                    </el-date-picker>
                </div>
            </div>
            <div id="tableR">
                <el-table :data="workData"  border show-summary style="width: 100%;">
                    <el-table-column prop="date" label="日期">
                    </el-table-column>
                    <el-table-column prop="resource" label="签单量">
                    </el-table-column>
                    <el-table-column prop="comm" label="人头数">
                    </el-table-column>
                    <el-table-column prop="active" label="金额">
                    </el-table-column>
                </el-table>
                <div class="block">
                    <el-pagination layout="prev, pager, next" :total="total" :current-page="currentPage" :page-size="pagesize" @current-change="handleCurrentChange">
                    </el-pagination>
                </div>
            </div>
        </div>
        <!-- 业绩统计走势图 -->
        <div style="width:54%;float:right;margin-top:10px">
            <div class="h1" style="position:relative;height:100px;background-color:#6b9ed4;border-radius:5px">
                <div>
                    <h4 style='margin-bottom:20px;margin-left:10px;color:white;padding-top:10px'>
                        业绩统计走势图
                    </h4>
                    <div class='drop' style='position:absolute;top:9px;left:126px;width:140px;'>
                        <el-dropdown @command="handleCommand2">
                            <span class="el-dropdown-link">
                                [{{title2}}<i class="el-icon-caret-bottom el-icon--right"></i>]
                              </span>
                            <el-dropdown-menu slot="dropdown">
                                <el-dropdown-item command="最近一周">最近一周</el-dropdown-item>
                                <el-dropdown-item command="最近一个月">最近一个月</el-dropdown-item>
                            </el-dropdown-menu>
                        </el-dropdown>
                    </div>
                </div>
                <div style='margin-right:10px;width:100px;float:right' v-if='code=="cc_m"'>
                    <el-select v-model="value11" size='small' clearable placeholder="全部CC" @change="updateList2">
                        <el-option v-for="item in tmks" :key="item.key" :label="item.label" :value="item.key">
                        </el-option>
                    </el-select>
                </div>
                <div style='margin-left:10px;width:140px;float:left'>
                    <el-select v-model="value4" size='small' clearable placeholder="课程类型" @change="updateList2">
                        <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                        </el-option>
                    </el-select>
                </div>
                <div class='datec' style='float:left;margin-left:10px'>
                    <el-date-picker v-model="value5" type="daterange" size='small' placeholder="选择日期范围" @change="updateList2">
                    </el-date-picker>
                </div>
            </div>
            <div class="echarts">
                <IEcharts :option="line3" style='height:400px;width:100%'></IEcharts>
            </div>
        </div>
        <div style='clear:both'></div>
        <!-- 合同管理统计 -->
        <div style="width: 45%;float:left;background: white;margin-top:10px">
            <div class="h1" style="position:relative;height:100px;background-color:#6b9ed4;border-radius:5px">
                <div>
                    <h4 style='margin-bottom:20px;color:white;padding-top:10px;margin-left:10px'>
                        合同管理统计表
                    </h4>
                    <div class='drop' style='position:absolute;top:9px;left:120px;width:140px;'>
                        <el-dropdown @command="handleCommand1">
                            <span class="el-dropdown-link">
                            [{{title1}}<i class="el-icon-caret-bottom el-icon--right"></i>]
                          </span>
                            <el-dropdown-menu slot="dropdown">
                                <el-dropdown-item command="最近一周">最近一周</el-dropdown-item>
                                <el-dropdown-item command="最近一个月">最近一个月</el-dropdown-item>
                            </el-dropdown-menu>
                        </el-dropdown>
                    </div>
                </div>
                <div style='margin-left:10px;width:98px;float:right;margin-right:5px' v-if='code=="cc_m"'>
                    <el-select v-model="value10" size='small' clearable placeholder="全部CC" @change="updateList1">
                        <el-option v-for="item in tmks" :key="item.key" :label="item.label" :value="item.key">
                        </el-option>
                    </el-select>
                </div>
                <div style='margin-left:10px;width:140px;float:left;width:98px;'>
                    <el-select v-model="value" size='small' clearable placeholder="合同类型" @change="updateList1">
                        <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                        </el-option>
                    </el-select>
                </div>
                <div style='width:140px;float:left;margin-left:10px;width:98px;'>
                    <el-select v-model="value1" size='small' clearable placeholder="课程类型" @change="updateList1">
                        <el-option v-for="item in options1" :key="item.id" :label="item.names" :value="item.id">
                        </el-option>
                    </el-select>
                </div>
                <div class='datec' style='float:left;margin-left:10px;' id='reportCCdate'>
                    <el-date-picker v-model="value3" type="daterange" size='small' placeholder="选择日期范围" @change="updateList1">
                    </el-date-picker>
                </div>
            </div>
            <div id="tableR">
                <el-table :data="workData"  border show-summary style="width: 100%;">
                    <el-table-column prop="date" label="日期">
                    </el-table-column>
                    <el-table-column prop="resource" label="签单量">
                    </el-table-column>
                    <el-table-column prop="comm" label="人头数">
                    </el-table-column>
                    <el-table-column prop="active" label="金额">
                    </el-table-column>
                </el-table>
                <div class="block">
                    <el-pagination layout="prev, pager, next" :total="total" :current-page="currentPage" :page-size="pagesize" @current-change="handleCurrentChange">
                    </el-pagination>
                </div>
            </div>
        </div>
        <!-- 合同管理统计走势图 -->
        <div style="width:54%;float:right;margin-top:10px">
            <div class="h1" style="position:relative;height:100px;background-color:#6b9ed4;border-radius:5px">
                <div>
                    <h4 style='margin-bottom:20px;margin-left:10px;color:white;padding-top:10px'>
                        合同管理统计走势图
                    </h4>
                    <div class='drop' style='position:absolute;top:9px;left:126px;width:140px;'>
                        <el-dropdown @command="handleCommand2">
                            <span class="el-dropdown-link">
                                [{{title2}}<i class="el-icon-caret-bottom el-icon--right"></i>]
                              </span>
                            <el-dropdown-menu slot="dropdown">
                                <el-dropdown-item command="最近一周">最近一周</el-dropdown-item>
                                <el-dropdown-item command="最近一个月">最近一个月</el-dropdown-item>
                            </el-dropdown-menu>
                        </el-dropdown>
                    </div>
                </div>
                <div style='margin-right:10px;width:100px;float:right' v-if='code=="cc_m"'>
                    <el-select v-model="value11" size='small' clearable placeholder="全部CC" @change="updateList2">
                        <el-option v-for="item in tmks" :key="item.key" :label="item.label" :value="item.key">
                        </el-option>
                    </el-select>
                </div>
                <div style='margin-left:10px;width:140px;float:left'>
                    <el-select v-model="value4" size='small' clearable placeholder="课程类型" @change="updateList2">
                        <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                        </el-option>
                    </el-select>
                </div>
                <div class='datec' style='float:left;margin-left:10px'>
                    <el-date-picker v-model="value5" type="daterange" size='small' placeholder="选择日期范围" @change="updateList2">
                    </el-date-picker>
                </div>
            </div>
            <div class="echarts">
                <IEcharts :option="line3" style='height:400px;width:100%'></IEcharts>
            </div>
        </div>
<!-- 签到统计 -->
        <div style="width: 100%;float:left;background: white;margin-top:10px">
            <div class="newResourceAn" style="position:relative;margin-top:10px;height:35px;margin-bottom:10px;border-bottom:1px solid gainsboro">
                <div style='margin-left:10px;width:100px;float:right;margin-right:5px' v-if='code=="cc_m"'>
                    <el-select v-model="value13" size='small' clearable placeholder="全部TMK" @change="updateList4">
                        <el-option v-for="item in tmks" :key="item.key" :label="item.label" :value="item.key">
                        </el-option>
                    </el-select>
                </div>
                <div style='float:left;'>
                    <h4 style='padding-top:5px;margin-left:10px'>
                    签到统计
                    </h4>
                </div>
                <div class='drop' style='float:left;width:140px;margin-top:4px;margin-left:4px'>
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
                <div style='margin-left:10px;width:140px;float:left'>
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
                </div>
                <div class='datec' style='float:left;margin-left:10px'>
                    <el-date-picker v-model="value8" type="daterange" size='small' placeholder="选择日期范围" @change="updateList4">
                    </el-date-picker>
                </div>
            </div>
            <div id="tableS" style="width: 35%;float:left;margin-left:20px">
                <el-table :data="resourceData" border show-summary >
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

        <!-- cc销售额排行榜-->
        <div class="echarts" style="position:relative;margin-top:10px">
        <div style="width:100%;background-color:white;height:50px;position:absolute;margin-bottom:5px;border-top-left-radius:5px;border-top-right-radius:5px;border-bottom:1px solid gainsboro">
            <h4 style='margin-top:14px;margin-left:6px'>CC销售额排行榜</h4>
            <div class='drop' style='position:absolute;top:14px;left:132px;width:140px;z-index:3'>
                <el-dropdown @command="handleCommand6">
                    <span class="el-dropdown-link">
                      [{{title6}}<i class="el-icon-caret-bottom el-icon--right"></i>]
                    </span>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item command="最近一周">最近一周</el-dropdown-item>
                        <el-dropdown-item command="最近一个月">最近一个月</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
            </div>
            <div class='datec' style='position:absolute;top:10px;left:236px;margin-left:9px;z-index:3'>
                <el-date-picker v-model="value11" type="daterange" size='small' placeholder="选择日期范围" @change="updateList6">
                </el-date-picker>
            </div>
            <div style='margin-left:10px;width:100px;position:absolute;top:10px;right:10px;z-index:3' v-if='code=="cc_m"'>
                <el-select v-model="value14" size='small' clearable placeholder="全部CC" @change="updateList6">
                    <el-option v-for="item in tmks" :key="item.value" :label="item.label" :value="item.value">
                    </el-option>
                </el-select>
            </div>
            </div>
        <div style="position:absolute;top:68px;left:42%;z-index:3">
                <el-radio-group v-model="radio3" @change='getNewRank'>
                    <el-radio-button :label='1'>按课耗量</el-radio-button>
                    <el-radio-button :label='2'>按课耗率</el-radio-button>
                </el-radio-group>
            </div>
             <div style="position:absolute;top:68px;right:10px;z-index:3;font-size:13px;color:#969494">
               <p>课耗量=出勤量+旷课量</p>
               <p>课耗率=(出勤量+旷课量)/(出勤量+旷课量+请假量)</p>
            </div>
             <div style="width:100%;position:absolute;bottom:-75px;height:424px;background-color:white;border-bottom-left-radius:5px;border-bottom-right-radius:5px;"></div>
            <IEcharts :option="bar" style='height:400px;width:100%;margin-top:70px'></IEcharts>
        </div>
    </div>
</template>
<script>
var token,user
import IEcharts from 'vue-echarts-v3';
import {
    campusList,
    getTMK,
    sourceList
} from '../../api/api';
export default {
    components: {
        IEcharts
    },
    data: () => ({
        code:'',
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
        resourceData: [{
            date: '2017.6.12',
            claim: '2',
            invite: '3',
            arrive: '4',
            arrivalrate: '4',
            unarrive: '5',
            sign: '6',
            signrate: '6%'
        }, {
            date: '2017.6.13',
            claim: '2',
            invite: '3',
            arrive: '4',
            arrivalrate: '4',
            unarrive: '5',
            sign: '6',
            signrate: '6%'
        }, {
            date: '2017.6.14',
            claim: '2',
            invite: '3',
            arrive: '4',
            arrivalrate: '4',
            unarrive: '5',
            sign: '6',
            signrate: '6%'
        }, {
            date: '2017.6.15',
            claim: '2',
            invite: '3',
            arrive: '4',
            arrivalrate: '4',
            unarrive: '5',
            sign: '6',
            signrate: '6%'
        }, {
            date: '2017.6.16',
            claim: '2',
            invite: '3',
            arrive: '4',
            arrivalrate: '4',
            unarrive: '5',
            sign: '6',
            signrate: '6%'
        }, {
            date: '2017.6.17',
            claim: '2',
            invite: '3',
            arrive: '4',
            arrivalrate: '4',
            unarrive: '5',
            sign: '6',
            signrate: '6%'
        }, {
            date: '2017.6.18',
            claim: '2',
            invite: '3',
            arrive: '4',
            arrivalrate: '4',
            unarrive: '5',
            sign: '6',
            signrate: '6%'
        }],
        options: [],
        options1: [],
        tmks: [],
        title1: '最近一周',
        title2: '最近一周',
        title3: '最近一周',
        title4: '最近一周',
        title5: '最近一周',
        title6: '最近一周',
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
        line: {
            color: ["#13CE66", "#F7BA2A", "#16b8be", "#ed42b3", "#20a0ff"],
            title: {
                text: '客户管理趋势图',
                textStyle: {
                    fontSize: 17
                },
                padding:[15,5,5,5]
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
                data: ["新资源", "沟通记录量", "激活无需求", "认定无效", "回访量"]
            },
            series: [],
            backgroundColor:'white'
        },
        line2: {
            color: ["#13CE66", "#F7BA2A", "#16b8be", "#ed42b3"],
            title: {
                
                textStyle: {
                    fontSize: 17
                },
                 padding:[15,5,5,5]
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
                padding:[15,5,5,5]
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
                data: ["新资源", "沟通记录量", "激活无需求", "认定无效", "回访量"]
            },
            series: [],
            backgroundColor:'white'
        },
        line4: {
            color: ["#13CE66", "#F7BA2A", "#16b8be", "#ed42b3", "#20a0ff"],
            title: {
                text: '合同管理趋势图',
                textStyle: {
                    fontSize: 17
                },
                padding:[15,5,5,5]
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
                data: ["新资源", "沟通记录量", "激活无需求", "认定无效", "回访量"]
            },
            series: [],
            backgroundColor:'white'
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
            backgroundColor:'white'
        },
        bar: {
            color: ["#6b9ed4"],
            title: {
                // text: 'CC销售额排行榜',
                // textStyle: {
                //     fontSize: 17
                // },
                // padding:[15,5,5,5]
            },
            grid:{width:'1080px',
        left:'3%'},
            xAxis: {

                axisTick:{
                    interval:0
                },
                axisLabel:{
                    interval:0
                },
                data: ["张帅", "李东", "鹿晗", "吴亦凡", "李易峰", "杨洋","张帅", "李东", "鹿晗", "吴亦凡", "李易峰", "杨洋","张帅", "李东", "鹿晗", "吴亦凡", "李易峰", "杨洋", "鹿晗", "吴亦凡", "李易峰", "杨洋",
            "张帅", "李东", "鹿晗", "吴亦凡", "李易峰", "杨洋","张帅", "李东", "鹿晗",],

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
                data: [5, 20, 16, 7, 10, 2,5, 20, 16, 7, 10, 2,5, 20, 16, 7, 10, 2,3,5,6,8,5, 20, 16, 7, 10, 2,5, 20, 16]
            }]
        },
    }),

    methods: {
        getNewRank() {
            //切换不同的标签来获取最新数据
        },
        handleCurrentChange: function(val) { //变更页数
            this.currentPage = val;
            // this.fetchData();
        },
        handleCurrentChange2: function(val) { //变更页数
            this.currentPage2 = val;
            // this.fetchData();
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
    },
    beforeCreate() {
        user = localStorage.getItem('user');
        token = JSON.parse(user).token;
    },
    created() {
        this.code = JSON.parse(user).job ? JSON.parse(user).job.code : '';
        let cam = {
            simple: '1'
        };
        campusList(cam, token).then((res) => { //获取校区
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

        getTMK(token).then((res) => {
            this.tmks = res.data
        })
        this.line.series = [{ //以后改成动态获取
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
        this.line.xAxis.data = ["周一", "周二", "周三", "周四", "周五", "周六", "周日"]
        this.line3.series = [{ //以后改成动态获取
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
        this.line3.xAxis.data = ["周一", "周二", "周三", "周四", "周五", "周六", "周日"]
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

#tableR .el-table td,
#tableR .el-table th {
    padding: 5px 5px;
    text-align: center
}

#tableR .el-table th>div,
#tableR .el-table .cell {
    padding-left: 0;
    padding-right: 0;
}

#tableS .el-table td,
#tableS .el-table th {
    padding: 5px 5px;
    text-align: center
}

#tableS .el-table th>div,
#tableS .el-table .cell {
    padding-left: 0;
    padding-right: 0;
}


#tableR .el-table__footer .gutter{
    display: none
}

#tableS .el-table__footer .gutter{
    display: none
}
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
</style>
