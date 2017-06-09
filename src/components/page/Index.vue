<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator=" ">
                <el-breadcrumb-item><i class="el-icon-my-shouye"></i>首页 </el-breadcrumb-item>
                <el-breadcrumb-item> </el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div style="width: 50%;float:left">
            <div class="h1" style="position:relative;height:50px;">
                <div>
                    <h3 style='margin-bottom:20px;padding-top:5px'>
            
       日数据对比统计
        </h3>
                </div>
                <div style='margin-left:10px;width:100px;position:absolute;top:4px;right:10px' v-if="code =='tmk_m'">
                    <el-select v-model="value1" size='small' clearable placeholder="全部TMK" @change="updateList">
                        <el-option v-for="item in tmks" :key="item.value" :label="item.label" :value="item.value">
                        </el-option>
                    </el-select>
                </div>
            </div>
            <div style="height:150px;background-color:snow;display:flex; align-items:center">
                <el-col :span="8">
                    <div class="dayCompare">
                        <div style="color:#6fc7ca;font-size:14px">较昨天+1</div>
                        <div style="color:#6fc7ca;font-size:32px">80</div>
                        <div style="color:#6fc7ca;font-size:18px">新资源</div>
                    </div>
                </el-col>
                <el-col :span="8">
                    <div class="dayCompare">
                        <div style="color:#ed8d7a;font-size:14px">较昨天+1</div>
                        <div style="color:#ed8d7a;font-size:32px">80</div>
                        <div style="color:#ed8d7a;font-size:18px">邀约量</div>
                    </div>
                </el-col>
                <el-col :span="8">
                    <div class="dayCompare">
                        <div style="color:#71b4db;font-size:14px">较昨天+1</div>
                        <div style="color:#71b4db;font-size:32px">80</div>
                        <div style="color:#71b4db;font-size:18px">到访量</div>
                    </div>
                </el-col>
            </div>
            <div style="height:150px;background-color:snow;margin-top:20px;display:flex; align-items:center">
                <el-col :span="8">
                    <div class="dayCompare">
                        <div style="color:#7089ba;font-size:14px">较昨天+1</div>
                        <div style="color:#7089ba;font-size:32px">80</div>
                        <div style="color:#7089ba;font-size:18px">签单量</div>
                    </div>
                </el-col>
                <el-col :span="8">
                    <div class="dayCompare">
                        <div style="color:#7aba70;font-size:14px">较昨天+1%</div>
                        <div style="color:#7aba70;font-size:32px">80%</div>
                        <div style="color:#7aba70;font-size:18px">到访率</div>
                    </div>
                </el-col>
                <el-col :span="8">
                    <div class="dayCompare">
                        <div style="color:#cbbc5a;font-size:14px">较昨天+1%</div>
                        <div style="color:#cbbc5a;font-size:32px">80%</div>
                        <div style="color:#cbbc5a;font-size:18px">签单率</div>
                    </div>
                </el-col>
            </div>
        </div>
        <div class="echarts" style="position:relative;margin-top:10px;width: 50%;float:left">
            <div style='margin-left:10px;width:100px;position:absolute;top:0;right:10px;z-index:3' v-if="code =='tmk_m'">
                <el-select v-model="value2" size='small' clearable placeholder="全部TMK" @change="updateList1">
                    <el-option v-for="item in tmks" :key="item.value" :label="item.label" :value="item.value">
                    </el-option>
                </el-select>
            </div>
            <IEcharts :option="line" style='height:400px;width:100%'></IEcharts>
        </div>
        <div style="width: 49%;float:left;margin-right:10px">
            <div class="h1" style="position:relative;height:50px;border-bottom:1px solid #cccccc">
                <div>
                    <h3 style='float:left;padding-bottom:20px;padding-top:5px;'>
            
       系统通知
        </h3>
                </div>
                <div class='notifyA' style='float:right;margin-top:12px;font-size: 14px;'>
                    <el-breadcrumb separator=" ">
                        <el-breadcrumb-item :to="{ path: '/calendar'}">更多>></el-breadcrumb-item>
                        <el-breadcrumb-item> </el-breadcrumb-item>
                    </el-breadcrumb>
                </div>
            </div>
            <div v-for="content in notifyData" style="padding:10px;border-bottom:1px solid #e8e8e8;font-size:14px">
                <div style="height:30px">
                    <div style="float:left;font-weight:600" :class="{green:content.date.substring(0,11).replace(/0/g,'') == new Date().toLocaleString().substring(0,9).replace(/0/g,'')}">{{content.title}}</div>
                    <div style="float:right;color:#bebebe">{{content.date.substring(0,11).replace(/0/g,'') == new Date().toLocaleString().substring(0,9).replace(/0/g,'')?content.date.substring(10): content.date.substring(0,11).replace(/0/g,'').replace(/\-/g,'') - new Date().toLocaleString().substring(0,9).replace(/0/g,'').replace(/\-/g,'') == -1? '昨天'+content.date.substring(10) :content.date.substring(6)}}</div>
                </div>
                <div style="color:#666666">
                    {{ content.content}}
                </div>
            </div>
        </div>
        <div style="width: 49%;float:right">
            <div class="h1" style="position:relative;height:50px;border-bottom:1px solid #cccccc">
                <div>
                    <h3 style='float:left;padding-bottom:20px;padding-top:5px;'>
            
       任务提醒
        </h3>
                </div>
                <div class='notifyA' style='float:right;margin-top:12px;font-size: 14px;'>
                    <el-breadcrumb separator=" ">
                        <el-breadcrumb-item :to="{ path: '/calendar'}">更多>></el-breadcrumb-item>
                        <el-breadcrumb-item> </el-breadcrumb-item>
                    </el-breadcrumb>
                </div>
            </div>
            <div v-for="content in taskData" style="padding:10px;border-bottom:1px solid #e8e8e8;font-size:14px">
                <div style="height:30px">
                    <div style="float:left;font-weight:600" class="green"><i class="el-icon-my-tongzhigonggao"></i>{{content.title}}</div>
                    <div style="float:right;color:#bebebe">{{content.date.substring(0,11).replace(/0/g,'') == new Date().toLocaleString().substring(0,9).replace(/0/g,'')?content.date.substring(10): content.date.substring(0,11).replace(/0/g,'').replace(/\-/g,'') - new Date().toLocaleString().substring(0,9).replace(/0/g,'').replace(/\-/g,'') == -1? '昨天'+content.date.substring(10) :content.date.substring(6)}}</div>
                </div>
                <div style="color:#666666">
                    {{ content.content}}
                </div>
            </div>
        </div>
    </div>
</template>
<script>
var token, user
import IEcharts from 'vue-echarts-v3';
import {
    getTMK
} from '../../api/api';
export default {
    components: {
        IEcharts
    },
    data: () => ({
        notifyData: [{
            title: '徐家汇校区通知',
            content: '夫君子之行，静以修身，俭以养德，非淡泊无以明志，非宁静无以致远',
            date: '2017-06-09 14:30'
        }, {
            title: '徐家汇校区通知',
            content: '欲思其利,必虑其害,欲思其成,必虑其败',
            date: '2017-06-08 14:30'
        }, {
            title: '徐家汇校区通知',
            content: '下周一开始要努力工作',
            date: '2017-06-06 14:30'
        }, {
            title: '徐家汇校区通知',
            content: '风萧萧兮易水寒',
            date: '2017-06-04 14:30'
        }, {
            title: '徐家汇校区通知',
            content: '千里之行始于足下',
            date: '2017-06-03 14:30'
        }],
        taskData: [{
            title: '9:30提醒',
            content: '夫君子之行，静以修身，俭以养德，非淡泊无以明志，非宁静无以致远',
            date: '2017-06-09 14:30'
        }, {
            title: '9:30提醒',
            content: '欲思其利,必虑其害,欲思其成,必虑其败',
            date: '2017-06-09 14:30'
        }, {
            title: '9:30提醒',
            content: '下周一开始要努力工作',
            date: '2017-06-09 14:30'
        }, {
            title: '9:30提醒',
            content: '风萧萧兮易水寒',
            date: '2017-06-09 14:30'
        }, {
            title: '9:30提醒',
            content: '千里之行始于足下',
            date: '2017-06-08 14:30'
        }],


        tmks: [],
        value1: "",
        value2: "",
        line: {
            color: ["#F7BA2A", "#16b8be", "#ed42b3"],
            title: {
                text: '客户发展趋势图'
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
                    show: false
                }
            },
            legend: {
                orient: 'horizontal',
                bottom: 10,
                data: ["已邀约", "已到访", "已签单"]
            },
            series: []
        }
    }),

    methods: {
        updateList() {
            let para = {
                    tmk_id: this.value1
                }
                //调服务
        },
        updateList1() {
            let para = {
                    tmk_id: this.value2
                }
                //调服务
        },
    },
    beforeCreate() {
        user = localStorage.getItem('user');
        token = JSON.parse(user).token;
    },
    created() {
        this.code = JSON.parse(user).job ? JSON.parse(user).job.code : ''; //获取职位code
        this.line.series = [{ //以后改成动态获取
                name: "已邀约",
                type: "line",
                data: [20, 25, 15, 20, 19, 15, 18]
            }, {
                name: "已到访",
                type: "line",
                data: [5, 7, 9, 10, 11, 12, 13]
            }, {
                name: "已签单",
                type: "line",
                data: [3, 2, 3, 3, 4, 5, 1]
            }]
            // if (this.code == 'tmk_m') {
        getTMK(token).then((res) => {
                this.tmks = res.data
            })
            // }

    }
}
</script>
<style>
.green {
    color: #1fb5ad;
}

.notifyA a:link {
    color: #6fc7ca
}

.notifyA a:visited {
    color: #6fc7ca
}

.notifyA a:hover {
    text-decoration: underline;
}

.notifyA a:acitve {
    text-decoration: underline;
}

.dayCompare {
    display: flex;
    justify-content: space-around;
    align-items: center;
    height: 150px;
    flex-direction: column;
    box-shadow: 2px 2px 9px #888888;
    padding:0 20px 12px 15px;
    border-radius: 8px;
    flex:auto;
}

.echarts {
    float: left;
    width: 100%;
    height: 400px;
    z-index: 1;
}

#table .el-table td,
#table .el-table th {
    padding: 5px 5px;
    text-align: center
}

#table .el-table th>div,
#table .el-table .cell {
    padding-left: 0;
    padding-right: 0;
}

.block {
    text-align: center;
    margin-top: 10px;
}

.drop .el-dropdown {
    font-size: 1.17em;
    color: black;
}

.datec .el-date-editor--daterange.el-input {
    width: 187px
}

.echarts .drop .el-dropdown {
    color: rgb(31, 181, 173);
}
</style>
