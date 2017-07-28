<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator=" ">
                <el-breadcrumb-item><i class="el-icon-my-shouye"></i>首页 </el-breadcrumb-item>
                <!--  <el-breadcrumb-item> </el-breadcrumb-item> -->
            </el-breadcrumb>
        </div>
        <div style="width: 50%;float:left" v-if="code.includes('tmk')">
            <div class="h1" style="position:relative;height:50px;margin-bottom:8px;">
                <div style="background-color:white;border-radius:5px;width:99%;margin:0 auto">
                    <h3 style='margin-bottom:20px;padding:14px'>
            
       日数据对比统计
        </h3>
                </div>
                <div style='margin-left:10px;width:100px;position:absolute;top:10px;right:10px' v-if="code =='tmk_m'">
                    <el-select v-model="value1" size='small' clearable placeholder="选择TMK" @change="updateList">
                        <el-option v-for="item in tmks" :key="item.key" :label="item.label" :value="item.key">
                        </el-option>
                    </el-select>
                </div>
            </div>
            <div style="display:flex; align-items:center;justify-content: space-around;">
                <el-col style='float:left;width:32%'>
                    <div class="dayCompare">
                        <div style="color:#6fc7ca;font-size:14px">较昨天{{yesterday_customers}}</div>
                        <div style="color:#6fc7ca;font-size:32px">{{today_Customers}}</div>
                        <div style="color:#6fc7ca;font-size:18px">新资源</div>
                    </div>
                </el-col>
                <el-col style='float:left;width:32%'>
                    <div class="dayCompare">
                        <div style="color:#ed8d7a;font-size:14px">较昨天{{yesterday_Invitation}}</div>
                        <div style="color:#ed8d7a;font-size:32px">{{today_Invitation}}</div>
                        <div style="color:#ed8d7a;font-size:18px">邀约量</div>
                    </div>
                </el-col>
                <el-col style='float:left;width:32%'>
                    <div class="dayCompare">
                        <div style="color:#71b4db;font-size:14px">较昨天{{yesterday_visiting}}</div>
                        <div style="color:#71b4db;font-size:32px">{{today_visiting}}</div>
                        <div style="color:#71b4db;font-size:18px">到访量</div>
                    </div>
                </el-col>
            </div>
            <div style="height:150px;margin-top:20px;display:flex; align-items:center;justify-content: space-around;">
                <el-col style='float:left;width:32%'>
                    <div class="dayCompare">
                        <div style="color:#7089ba;font-size:14px">较昨天{{yesterday_member}}</div>
                        <div style="color:#7089ba;font-size:32px">{{today_member}}</div>
                        <div style="color:#7089ba;font-size:18px">签单量</div>
                    </div>
                </el-col>
                <el-col style='float:left;width:32%'>
                    <div class="dayCompare">
                        <div style="color:#7aba70;font-size:14px">较昨天{{yesterdayVisitingRate}}</div>
                        <div style="color:#7aba70;font-size:32px">{{todayVisitingRate}}</div>
                        <div style="color:#7aba70;font-size:18px">到访率</div>
                    </div>
                </el-col>
                <el-col style='float:left;width:32%'>
                    <div class="dayCompare">
                        <div style="color:#cbbc5a;font-size:14px">较昨天{{yesterdayMemberRate}}</div>
                        <div style="color:#cbbc5a;font-size:32px">{{todayMemberRate}}</div>
                        <div style="color:#cbbc5a;font-size:18px">签单率</div>
                    </div>
                </el-col>
            </div>
        </div>
        <div style="width: 50%;float:left" v-else>
            <div class="h1" style="position:relative;height:50px;margin-bottom:8px;">
                <div style="background-color:white;border-radius:5px;width:99%;margin:0 auto">
                    <h3 style='margin-bottom:20px;padding:14px'>
            
       日数据对比统计
        </h3>
                </div>
                <div style='margin-left:10px;width:100px;position:absolute;top:10px;right:10px' v-if="code =='cc_m'">
                    <el-select v-model="value1" size='small' clearable placeholder="选择TMK" @change="updateList">
                        <el-option v-for="item in tmks" :key="item.key" :label="item.label" :value="item.key">
                        </el-option>
                    </el-select>
                </div>
            </div>
            <div style="display:flex; align-items:center;justify-content: space-around;">
                <el-col style='float:left;width:32%'>
                    <div class="dayCompare1">
                        <div style="color:#666666;font-size:18px;width:100%;background:white;text-align:center;padding:6px 0;border-bottom:1px solid gainsboro">客户认领</div>
                        <div style="display:flex;justify-content: space-around;width:100%;height:100%;background:white;align-items:center">
                            
                        <div style="height:80%;color:#6fc7ca;font-size:32px;width:50%;text-align:center;background:white;display:flex;flex-direction:column;justify-content:center;border-right:1px solid gainsboro"><p>
                         {{today_Customers}}   
                        </p>
                        <p style="font-size:20px;margin-top:10px">今天</p></div>
                         <div style="width:50%;text-align:center;background:white;padding:7px 0;border-radius:5px;display:flex;flex-direction:column;justify-content:center;">
                         <div style="margin-bottom:10px">
                           <p style="font-size:20px">
                         {{yesterday_customers}}   
                        </p>
                        <p style="font-size:16px">昨天</p>  
                         </div>
                          <div style='border-top:1px solid gainsboro;padding-top:10px;width:80%;margin:0 auto'>
                           <p  style="font-size:14px;">
                         +12
                        </p>
                        <p style="font-size:14px;">较前天</p>  
                         </div>
                         </div>
                        </div>
                    </div>
                </el-col>
                <el-col style='float:left;width:32%'>
                    <div class="dayCompare1">
                    <div style="color:#666666;font-size:18px;width:100%;background:white;text-align:center;padding:6px 0;border-bottom:1px solid gainsboro">邀约量</div>
                        <div style="display:flex;justify-content: space-around;width:100%;height:100%;background:white;align-items:center">
                            
                        <div style="height:80%;color:#ed8d7a;font-size:32px;width:50%;text-align:center;background:white;display:flex;flex-direction:column;justify-content:center;border-right:1px solid gainsboro"><p>
                         {{today_Invitation}}   
                        </p>
                        <p style="font-size:20px;margin-top:10px">今天</p></div>
                         <div style="width:50%;text-align:center;background:white;padding:7px 0;border-radius:5px;display:flex;flex-direction:column;justify-content:center;">
                         <div style="margin-bottom:10px">
                           <p style="font-size:20px">
                         {{yesterday_Invitation}}   
                        </p>
                        <p style="font-size:16px">昨天</p>  
                         </div>
                          <div style='border-top:1px solid gainsboro;padding-top:10px;width:80%;margin:0 auto'>
                           <p  style="font-size:14px;">
                         +12
                        </p>
                        <p style="font-size:14px;">较前天</p>  
                         </div>
                         </div>
                        </div>
                    </div>
                </el-col>
                <el-col style='float:left;width:32%'>
                    <div class="dayCompare1">
                    <div style="color:#666666;font-size:18px;width:100%;background:white;text-align:center;padding:6px 0;border-bottom:1px solid gainsboro">到访量</div>
                        <div style="display:flex;justify-content: space-around;width:100%;height:100%;background:white;align-items:center">
                            
                        <div style="height:80%;color:#71b4db;font-size:32px;width:50%;text-align:center;background:white;display:flex;flex-direction:column;justify-content:center;border-right:1px solid gainsboro"><p>
                         {{today_visiting}}   
                        </p>
                        <p style="font-size:20px;margin-top:10px">今天</p></div>
                         <div style="width:50%;text-align:center;background:white;padding:7px 0;border-radius:5px;display:flex;flex-direction:column;justify-content:center;">
                         <div style="margin-bottom:10px">
                           <p style="font-size:20px">
                         {{yesterday_visiting}}   
                        </p>
                        <p style="font-size:16px">昨天</p>  
                         </div>
                          <div style='border-top:1px solid gainsboro;padding-top:10px;width:80%;margin:0 auto'>
                           <p  style="font-size:14px;">
                         +12
                        </p>
                        <p style="font-size:14px;">较前天</p>  
                         </div>
                         </div>
                        </div>
                    </div>
                </el-col>
            </div>
            <div style="height:150px;margin-top:20px;display:flex; align-items:center;justify-content: space-around;">
                <el-col style='float:left;width:32%'>
                <div class="dayCompare1">
                <div style="color:#666666;font-size:18px;width:100%;background:white;text-align:center;padding:6px 0;border-bottom:1px solid gainsboro">签约量</div>
                        <div style="display:flex;justify-content: space-around;width:100%;height:100%;background:white;align-items:center">
                            
                        <div style="height:80%;color:#7089ba;font-size:32px;width:50%;text-align:center;background:white;display:flex;flex-direction:column;justify-content:center;border-right:1px solid gainsboro"><p>
                         {{today_member}}   
                        </p>
                        <p style="font-size:20px;margin-top:10px">今天</p></div>
                         <div style="width:50%;text-align:center;background:white;padding:7px 0;border-radius:5px;display:flex;flex-direction:column;justify-content:center;">
                         <div style="margin-bottom:10px">
                           <p style="font-size:20px">
                         {{yesterday_member}}   
                        </p>
                        <p style="font-size:16px">昨天</p>  
                         </div>
                          <div style='border-top:1px solid gainsboro;padding-top:10px;width:80%;margin:0 auto'>
                           <p  style="font-size:14px;">
                         +12
                        </p>
                        <p style="font-size:14px;">较前天</p>  
                         </div>
                         </div>
                        </div>
                    </div>
                </el-col>
                <el-col style='float:left;width:32%'>
                 <div class="dayCompare1">
                 <div style="color:#666666;font-size:18px;width:100%;background:white;text-align:center;padding:6px 0;border-bottom:1px solid gainsboro">到访率</div>
                        <div style="display:flex;justify-content: space-around;width:100%;height:100%;background:white;align-items:center">
                            
                        <div style="height:80%;color:#49c236;font-size:32px;width:50%;text-align:center;background:white;display:flex;flex-direction:column;justify-content:center;border-right:1px solid gainsboro"><p>
                         {{todayVisitingRate}}   
                        </p>
                        <p style="font-size:20px;margin-top:10px">今天</p></div>
                         <div style="width:50%;text-align:center;background:white;padding:7px 0;border-radius:5px;display:flex;flex-direction:column;justify-content:center;">
                         <div style="margin-bottom:10px">
                           <p style="font-size:20px">
                         {{yesterdayVisitingRate}}   
                        </p>
                        <p style="font-size:16px">昨天</p>  
                         </div>
                          <div style='border-top:1px solid gainsboro;padding-top:10px;width:80%;margin:0 auto'>
                           <p  style="font-size:14px;">
                         +12
                        </p>
                        <p style="font-size:14px;">较前天</p>  
                         </div>
                         </div>
                        </div>
                    </div>
                </el-col>
                <el-col style='float:left;width:32%'>
                 <div class="dayCompare1">
                 <div style="color:#666666;font-size:18px;width:100%;background:white;text-align:center;padding:6px 0;border-bottom:1px solid gainsboro">签约率</div>
                        <div style="display:flex;justify-content: space-around;width:100%;height:100%;background:white;align-items:center">
                            
                        <div style="height:80%;color:#cbbc5a;font-size:32px;width:50%;text-align:center;background:white;display:flex;flex-direction:column;justify-content:center;border-right:1px solid gainsboro"><p>
                         {{todayMemberRate}}   
                        </p>
                        <p style="font-size:20px;margin-top:10px">今天</p></div>
                         <div style="width:50%;text-align:center;background:white;padding:7px 0;border-radius:5px;display:flex;flex-direction:column;justify-content:center;">
                         <div style="margin-bottom:10px">
                           <p style="font-size:20px">
                         {{yesterdayMemberRate}}   
                        </p>
                        <p style="font-size:16px">昨天</p>  
                         </div>
                          <div style='border-top:1px solid gainsboro;padding-top:10px;width:80%;margin:0 auto'>
                           <p  style="font-size:14px;">
                         +12
                        </p>
                        <p style="font-size:14px;">较前天</p>  
                         </div>
                         </div>
                        </div>
                    </div>
                </el-col>
            </div>
        </div>
        <div class="echarts" style="position:relative;width: 50%;float:left;">
            <div style="width:100%;background-color:white;height:49px;position:absolute;margin-bottom:5px;border-top-left-radius:5px;border-top-right-radius:5px;border-bottom:1px solid grey">
                <div style='margin-left:10px;width:100px;position:absolute;top:9px;right:10px;z-index:3' v-if="code =='tmk_m'">
                    <el-select v-model="value2" size='small' clearable placeholder="选择TMK" @change="updateList1">
                        <el-option v-for="item in tmks" :key="item.key" :label="item.label" :value="item.key">
                        </el-option>
                    </el-select>
                </div>
                <div style='margin-left:10px;width:100px;position:absolute;top:9px;right:10px;z-index:3' >
                    <el-select v-model="value2" size='small' clearable placeholder="选择TMK" @change="updateList1">
                        <el-option v-for="item in tmks" :key="item.key" :label="item.label" :value="item.key">
                        </el-option>
                    </el-select>
                </div>
            </div>
            <div style="width:100%;position:absolute;bottom:0;height:364px;background-color:white;border-bottom-left-radius:5px;border-bottom-right-radius:5px;"></div>
            <IEcharts :option="line" style='height:414px;width:100%'></IEcharts>
        </div>
        <div style="width: 49.7%;float:left;margin-right:5px;margin-top:20px">
            <div class="h1" style="position:relative;height:50px;border-bottom:1px solid #cccccc;background-color:white;border-top-left-radius:5px;border-top-right-radius:5px;">
                <div>
                    <h3 style='float:left;padding:15px 0 20px 10px'>
            
       系统通知
        </h3>
                </div>
                <div class='notifyA' style='float:right;margin-top:12px;font-size: 14px;'>
                    <el-breadcrumb separator=" " id='systemMore'>
                        <el-breadcrumb-item :to="{ path: '/systemMessage'}" style='font-weight:500'>更多>></el-breadcrumb-item>
                        <el-breadcrumb-item> </el-breadcrumb-item>
                    </el-breadcrumb>
                </div>
            </div>
            <div v-for="content in notifyData" style="padding:10px 10px 20px 10px;border-bottom:1px solid #e8e8e8;font-size:14px;background-color:white;">
                <div style="height:30px">
                    <div style="float:left;font-weight:600" :class="{green:content.date.substring(0,10).replace(/0/g,'') == new Date().toLocaleString().substring(0,9).replace(/0/g,'')}">{{content.title}}</div>
                    <div style="float:right;color:#bebebe">{{content.date.substring(0,10).replace(/0/g,'') == new Date().toLocaleString().substring(0,9).replace(/0/g,'')?content.date.substring(11): content.date.substring(0,10).replace(/0/g,'').replace(/\-/g,'') - new Date().toLocaleString().substring(0,9).replace(/0/g,'').replace(/\-/g,'') == -1? '昨天'+content.date.substring(11) :content.date.substring(5)}}</div>
                </div>
                <div style="color:#666666">
                    {{ content.content}}
                </div>
            </div>
        </div>
        <div style="width: 49.8%;float:right;margin-top:20px;height:451px;background-color:white">
            <div class="h1" style="position:relative;height:50px;border-bottom:1px solid #cccccc;background-color:white;border-top-left-radius:5px;border-top-right-radius:5px;">
                <div>
                    <h3 style='float:left;padding:15px 0 20px 10px'>
            
       任务提醒
        </h3>
                </div>
                <div class='notifyA' style='float:right;margin-top:12px;font-size: 14px;'>
                    <el-breadcrumb separator=" " id='taskMore'>
                        <el-breadcrumb-item :to="{ path: '/calendar'}">更多>></el-breadcrumb-item>
                        <el-breadcrumb-item> </el-breadcrumb-item>
                    </el-breadcrumb>
                </div>
            </div>
            <div v-for="content in taskData" style="padding:10px 10px 20px 10px;border-bottom:1px solid #e8e8e8;font-size:14px;background-color:white;">
                <div style="height:30px">
                    <div style="float:left;" class="green"><i class="el-icon-my-tongzhigonggao"></i>{{content.title}} 提醒</div>
                    <div style="float:right;color:#bebebe">{{content.date.substring(0,10).replace(/0/g,'') == new Date().toLocaleString().substring(0,9).replace(/0/g,'')?content.date.substring(11): content.date.substring(0,10).replace(/0/g,'').replace(/\-/g,'') - new Date().toLocaleString().substring(0,9).replace(/0/g,'').replace(/\-/g,'') == -1? '昨天'+content.date.substring(11) :content.date.substring(5)}}</div>
                </div>
                <div style="color:#666666;min-height:19px">
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
    getTMK,
    getIndexData,
    getDayTask
} from '../../api/api';
export default {
    components: {
        IEcharts
    },
    data: () => ({
        notifyData: [{
            title: '徐家汇校区通知',
            content: '夫君子之行，静以修身，俭以养德，非淡泊无以明志，非宁静无以致远',
            date: '2017-06-12 14:30'
        }, {
            title: '徐家汇校区通知',
            content: '欲思其利,必虑其害,欲思其成,必虑其败',
            date: '2017-06-11 14:30'
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
        taskData: [],
        today_Customers: 0,
        today_Invitation: 0,
        today_visiting: 0,
        today_member: 0,
        todayVisitingRate: 0,
        todayMemberRate: 0,
        yesterday_customers: 0,
        yesterday_Invitation: 0,
        yesterday_visiting: 0,
        yesterday_member: 0,
        yesterdayVisitingRate: 0,
        yesterdayMemberRate: 0,
        tmks: [],
        value1: "",
        value2: "",
        code:'',
        line: {
            color: ["#F7BA2A", "#16b8be", "#ed42b3"],
            title: {
                text: '客户发展趋势图',
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
                    show: false
                }
            },
           
            
            // backgroundColor:'white'
        }
    }),

    methods: {
        updateList() {
            let para = {
                    tmk_id: this.value1
                }
                getIndexData(token,para).then(res => {
                this.changeNumber(res)
            })
                //调服务
        },
        updateList1() {
            let para = {
                    tmk_id: this.value2
                }
                getIndexData(token).then(res => {
                this.changeChart(res)
            })
                //调服务
        },
        changeNumber(data){
            let a = data.data
            this.today_Customers = a.today_Customers;
                this.today_Invitation = a.today_Invitation;
                this.today_visiting = a.today_visiting;
                this.today_member = a.today_member;
                this.todayVisitingRate = a.todayVisitingRate;
                this.todayMemberRate = a.todayMemberRate;
                this.yesterday_customers = a.yesterday_customers;
                this.yesterday_Invitation = a.yesterday_Invitation;
                this.yesterday_visiting = a.yesterday_visiting;
                this.yesterday_member = a.yesterday_member;
                this.yesterdayVisitingRate = a.yesterdayVisitingRate;
                this.yesterdayMemberRate = a.yesterdayMemberRate;
        },
        changeChart(data){
            this.line.xAxis.data = data.data.weekList.week;
            this.line.series = [{//以后改成动态获取
                    name: "已邀约",
                    type: "line",
                    data: data.data.weekList.invitation
                }, {
                    name: "已到访",
                    type: "line",
                    data: data.data.weekList.visiting
                }, {
                    name: "已签单",
                    type: "line",
                    data: data.data.weekList.member
                }];
            this.line.legend = {
                orient: 'horizontal',
                bottom: 10,
                data: ["已邀约", "已到访", "已签单"],
                // backgroundColor:'white'
            }
        }
    },
    beforeCreate() {
        user = localStorage.getItem('user');
        token = JSON.parse(user).token;
    },
    created() {
        this.code = JSON.parse(user).job ? JSON.parse(user).job.code : ''; //获取职位code
        getIndexData(token).then(res => {
                this.changeNumber(res)
                this.changeChart(res)
            })
        let para = {
            date : new Date().toLocaleDateString()
        }
        getDayTask(para,token).then(res=>{
            // let arr = []
            // for(let i =0;i<=4;i++){
            //     arr.unshift(res[i])
            // }
            if(res.length ==0){
                // arr = [{title:'今日暂无提醒'}]
                this.taskData = [{title:'今日暂无',content:'',date:''}]
            }else{

                this.taskData = res.map(item=>{
                    return {title:item.remind_time.substring(11, 16),
                        content:item.remark,
                        date:item.create_at.substring(0,16)}
                })
            }
        })
            if (this.code == 'tmk_m') {
        getTMK(token).then((res) => {
                this.tmks = res.data;
                 this.tmks.unshift({key:'0',label:'全部TMK'})
            })
            }


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

.dayCompare1 {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 174px;
    flex-direction: column;
    /*box-shadow: 2px 2px 9px #888888;*/
    /*border:1px solid grey;*/
    /*padding: 0 20px 12px 20px;*/
    border-radius: 8px;
    flex: auto;
    /*background-color: white;*/
}

.dayCompare {
    display: flex;
    justify-content: space-around;
    align-items: center;
    height: 154px;
    flex-direction: column;
    /*box-shadow: 2px 2px 9px #888888;*/
    /*border:1px solid grey;*/
    padding: 0 20px 12px 20px;
    border-radius: 8px;
    flex: auto;
    background-color: white;
}
.echarts {
    float: left;
    width: 100%;
    height: 414px;
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
#systemMore .el-breadcrumb__item__inner:hover{
    cursor: pointer;
}
#taskMore .el-breadcrumb__item__inner:hover{
    cursor: pointer;
}
#systemMore .el-breadcrumb__item__inner{
    font-weight: 500
}
#taskMore .el-breadcrumb__item__inner{
    font-weight: 500
}
</style>
