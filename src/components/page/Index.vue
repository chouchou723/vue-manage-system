<template>
    <div>
        <!-- <div class="crumbs">
            <el-breadcrumb separator=" ">
                <el-breadcrumb-item><i class="el-icon-my-shouye"></i>首页 </el-breadcrumb-item>
            </el-breadcrumb>
        </div> -->
        <!-- tmk第一个报表 -->
        <div style="width: 50%;float:left" v-if="code.includes('tmk')">
            <div class="h1" style="position:relative;height:50px;margin-bottom:8px;">
                <div style="background-color:white;border-radius:5px;width:99%;margin:0 auto">
                    <h3 style='margin-bottom:20px;padding:14px'>

                        日数据对比统计
                    </h3>
                </div>
                <div style='margin-left:10px;width:100px;position:absolute;top:12px;left:150px' v-if='code=="tmk_m"'>
                    <el-select v-model="value1" size='small'  placeholder="选择TMK" @change="updateList">
                        <el-option v-for="item in tmks" :key="item.key" :label="item.label" :value="item.key">
                        </el-option>
                    </el-select>
                </div>
                <div class='notifyA' style='position:absolute;right:3px;top:10px;font-size: 14px;'>
                        <el-breadcrumb separator=" " id='systemMore'>
                            <el-breadcrumb-item ><span style='font-weight:500;color:#1fb5ad'>更多>></span></el-breadcrumb-item>
                            <!-- :to="{ path: '/reportForm/tmk'}" -->
                            <el-breadcrumb-item> </el-breadcrumb-item>
                        </el-breadcrumb>
                    </div>
            </div>
            <div style="display:flex; align-items:center;justify-content: space-around;">
                <el-col style='float:left;width:32%'>
                    <div class="dayCompare1">
                        <div style="color:#666666;font-size:18px;width:100%;background:white;text-align:center;padding:6px 0;border-bottom:1px solid gainsboro">新资源</div>
                        <div style="display:flex;justify-content: space-around;width:100%;height:100%;background:white;align-items:center">

                            <div style="height:80%;color:#6fc7ca;font-size:32px;width:50%;text-align:center;background:white;display:flex;flex-direction:column;justify-content:center;border-right:1px solid gainsboro">
                                <p>
                                    {{tmkindex.today_Customers}}
                                </p>
                                <p style="font-size:20px;margin-top:10px">今天</p>
                            </div>
                            <div style="width:50%;text-align:center;background:white;padding:7px 0;border-radius:5px;display:flex;flex-direction:column;justify-content:center;">
                                <div style="margin-bottom:10px">
                                    <p style="font-size:20px">
                                        {{tmkindex.yesterday_customers}}
                                    </p>
                                    <p style="font-size:16px">昨天</p>
                                </div>
                                <div style='border-top:1px solid gainsboro;padding-top:10px;width:80%;margin:0 auto'>
                                    <p style="font-size:14px;">
                                        {{tmkindex.befor_yesterday_customers}}
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

                            <div style="height:80%;color:#ed8d7a;font-size:32px;width:50%;text-align:center;background:white;display:flex;flex-direction:column;justify-content:center;border-right:1px solid gainsboro">
                                <p>
                                    {{tmkindex.today_Invitation}}
                                </p>
                                <p style="font-size:20px;margin-top:10px">今天</p>
                            </div>
                            <div style="width:50%;text-align:center;background:white;padding:7px 0;border-radius:5px;display:flex;flex-direction:column;justify-content:center;">
                                <div style="margin-bottom:10px">
                                    <p style="font-size:20px">
                                        {{tmkindex.yesterday_Invitation}}
                                    </p>
                                    <p style="font-size:16px">昨天</p>
                                </div>
                                <div style='border-top:1px solid gainsboro;padding-top:10px;width:80%;margin:0 auto'>
                                    <p style="font-size:14px;">
                                        {{tmkindex.befor_yesterday_Invitation}}
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

                            <div style="height:80%;color:#71b4db;font-size:32px;width:50%;text-align:center;background:white;display:flex;flex-direction:column;justify-content:center;border-right:1px solid gainsboro">
                                <p>
                                    {{tmkindex.today_visiting}}
                                </p>
                                <p style="font-size:20px;margin-top:10px">今天</p>
                            </div>
                            <div style="width:50%;text-align:center;background:white;padding:7px 0;border-radius:5px;display:flex;flex-direction:column;justify-content:center;">
                                <div style="margin-bottom:10px">
                                    <p style="font-size:20px">
                                        {{tmkindex.yesterday_visiting}}
                                    </p>
                                    <p style="font-size:16px">昨天</p>
                                </div>
                                <div style='border-top:1px solid gainsboro;padding-top:10px;width:80%;margin:0 auto'>
                                    <p style="font-size:14px;">
                                        {{tmkindex.befor_yesterday_visiting}}
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

                            <div style="height:80%;color:#7089ba;font-size:32px;width:50%;text-align:center;background:white;display:flex;flex-direction:column;justify-content:center;border-right:1px solid gainsboro">
                                <p>
                                    {{tmkindex.today_member}}
                                </p>
                                <p style="font-size:20px;margin-top:10px">今天</p>
                            </div>
                            <div style="width:50%;text-align:center;background:white;padding:7px 0;border-radius:5px;display:flex;flex-direction:column;justify-content:center;">
                                <div style="margin-bottom:10px">
                                    <p style="font-size:20px">
                                        {{tmkindex.yesterday_member}}
                                    </p>
                                    <p style="font-size:16px">昨天</p>
                                </div>
                                <div style='border-top:1px solid gainsboro;padding-top:10px;width:80%;margin:0 auto'>
                                    <p style="font-size:14px;">
                                        {{tmkindex.befor_yesterday_member}}
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

                            <div style="height:80%;color:#49c236;font-size:32px;width:50%;text-align:center;background:white;display:flex;flex-direction:column;justify-content:center;border-right:1px solid gainsboro">
                                <p>
                                    {{tmkindex.todayVisitingRate}}
                                </p>
                                <p style="font-size:20px;margin-top:10px">今天</p>
                            </div>
                            <div style="width:50%;text-align:center;background:white;padding:7px 0;border-radius:5px;display:flex;flex-direction:column;justify-content:center;">
                                <div style="margin-bottom:10px">
                                    <p style="font-size:20px">
                                        {{tmkindex.yesterdayVisitingRate}}
                                    </p>
                                    <p style="font-size:16px">昨天</p>
                                </div>
                                <div style='border-top:1px solid gainsboro;padding-top:10px;width:80%;margin:0 auto'>
                                    <p style="font-size:14px;">
                                        {{tmkindex.befor_yesterdayVisitingRate}}
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

                            <div style="height:80%;color:#cbbc5a;font-size:32px;width:50%;text-align:center;background:white;display:flex;flex-direction:column;justify-content:center;border-right:1px solid gainsboro">
                                <p>
                                    {{tmkindex.todayMemberRate}}
                                </p>
                                <p style="font-size:20px;margin-top:10px">今天</p>
                            </div>
                            <div style="width:50%;text-align:center;background:white;padding:7px 0;border-radius:5px;display:flex;flex-direction:column;justify-content:center;">
                                <div style="margin-bottom:10px">
                                    <p style="font-size:20px">
                                        {{tmkindex.yesterdayMemberRate}}
                                    </p>
                                    <p style="font-size:16px">昨天</p>
                                </div>
                                <div style='border-top:1px solid gainsboro;padding-top:10px;width:80%;margin:0 auto'>
                                    <p style="font-size:14px;">
                                        {{tmkindex.befor_yesterdayMemberRate}}
                                    </p>
                                    <p style="font-size:14px;">较前天</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </el-col>
            </div>
            <!-- <div style="display:flex; align-items:center;justify-content: space-around;">
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
            </div> -->
        </div>
        <!-- cc第一个报表 -->
        <div style="width: 50%;float:left" v-if="code.includes('cc')">
            <div class="h1" style="position:relative;height:50px;margin-bottom:8px;">
                <div style="background-color:white;border-radius:5px;width:99%;margin:0 auto;display:flex;align-items:center">
                    <h3 style='padding:14px'>

                        日数据对比统计
                    </h3>
                    <div style='width:100px;margin-right:10px' v-if="code.includes('cc_c')">
                            <el-select v-model="valueR" size='small'  placeholder="选择校区" @change="updateListGetCC">
                                    <el-option v-for="item in optionR" :key="item.id" :label="item.title" :value="item.id">
                                        </el-option>
                            </el-select>
                        </div>
                    <div style='width:100px;' v-if="code =='cc_m'||code.includes('cc_c')">
                            <el-select v-model="valueCC" size='small'  placeholder="选择CC" @change="updateListCC">
                                <el-option v-for="item in ccs" :key="item.aid" :label="item.uname" :value="item.aid">
                                </el-option>
                            </el-select>
                        </div>
                </div>
                <div class='notifyA' style='position:absolute;right:3px;top:10px;font-size: 14px;'>
                        <el-breadcrumb separator=" " id='systemMore'>
                                <!-- :to="{ path: '/reportForm/cc'}" -->
                            <el-breadcrumb-item ><span style='font-weight:500;color:#1fb5ad'>更多>></span></el-breadcrumb-item>
                            <el-breadcrumb-item> </el-breadcrumb-item>
                        </el-breadcrumb>
                    </div>
            </div>
            <div style="display:flex; align-items:center;justify-content: space-around;">
                <el-col style='float:left;width:32%'>
                    <div class="dayCompare1">
                        <div style="color:#666666;font-size:18px;width:100%;background:white;text-align:center;padding:6px 0;border-bottom:1px solid gainsboro">客户认领</div>
                        <div style="display:flex;justify-content: space-around;width:100%;height:100%;background:white;align-items:center">

                            <div style="height:80%;color:#6fc7ca;font-size:32px;width:50%;text-align:center;background:white;display:flex;flex-direction:column;justify-content:center;border-right:1px solid gainsboro">
                                <p>
                                    {{ccindex.today_Customers}}
                                </p>
                                <p style="font-size:20px;margin-top:10px">今天</p>
                            </div>
                            <div style="width:50%;text-align:center;background:white;padding:7px 0;border-radius:5px;display:flex;flex-direction:column;justify-content:center;">
                                <div style="margin-bottom:10px">
                                    <p style="font-size:20px">
                                        {{ccindex.yesterday_Customers}}
                                    </p>
                                    <p style="font-size:16px">昨天</p>
                                </div>
                                <div style='border-top:1px solid gainsboro;padding-top:10px;width:80%;margin:0 auto'>
                                    <p style="font-size:14px;">
                                        {{ccindex.before_yesterday_customers}}
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

                            <div style="height:80%;color:#ed8d7a;font-size:32px;width:50%;text-align:center;background:white;display:flex;flex-direction:column;justify-content:center;border-right:1px solid gainsboro">
                                <p>
                                    {{ccindex.today_Invitation}}
                                </p>
                                <p style="font-size:20px;margin-top:10px">今天</p>
                            </div>
                            <div style="width:50%;text-align:center;background:white;padding:7px 0;border-radius:5px;display:flex;flex-direction:column;justify-content:center;">
                                <div style="margin-bottom:10px">
                                    <p style="font-size:20px">
                                        {{ccindex.yesterday_Invitation}}
                                    </p>
                                    <p style="font-size:16px">昨天</p>
                                </div>
                                <div style='border-top:1px solid gainsboro;padding-top:10px;width:80%;margin:0 auto'>
                                    <p style="font-size:14px;">
                                        {{ccindex.before_yesterday_Invitation}}
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

                            <div style="height:80%;color:#71b4db;font-size:32px;width:50%;text-align:center;background:white;display:flex;flex-direction:column;justify-content:center;border-right:1px solid gainsboro">
                                <p>
                                    {{ccindex.today_Visiting}}
                                </p>
                                <p style="font-size:20px;margin-top:10px">今天</p>
                            </div>
                            <div style="width:50%;text-align:center;background:white;padding:7px 0;border-radius:5px;display:flex;flex-direction:column;justify-content:center;">
                                <div style="margin-bottom:10px">
                                    <p style="font-size:20px">
                                        {{ccindex.yesterday_Visiting}}
                                    </p>
                                    <p style="font-size:16px">昨天</p>
                                </div>
                                <div style='border-top:1px solid gainsboro;padding-top:10px;width:80%;margin:0 auto'>
                                    <p style="font-size:14px;">
                                        {{ccindex.before_yesterday_Visiting}}
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

                            <div style="height:80%;color:#7089ba;font-size:32px;width:50%;text-align:center;background:white;display:flex;flex-direction:column;justify-content:center;border-right:1px solid gainsboro">
                                <p>
                                    {{ccindex.today_Order}}
                                </p>
                                <p style="font-size:20px;margin-top:10px">今天</p>
                            </div>
                            <div style="width:50%;text-align:center;background:white;padding:7px 0;border-radius:5px;display:flex;flex-direction:column;justify-content:center;">
                                <div style="margin-bottom:10px">
                                    <p style="font-size:20px">
                                        {{ccindex.yesterday_Order}}
                                    </p>
                                    <p style="font-size:16px">昨天</p>
                                </div>
                                <div style='border-top:1px solid gainsboro;padding-top:10px;width:80%;margin:0 auto'>
                                    <p style="font-size:14px;">
                                        {{ccindex.before_yesterday_Order}}
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

                            <div style="height:80%;color:#49c236;font-size:32px;width:50%;text-align:center;background:white;display:flex;flex-direction:column;justify-content:center;border-right:1px solid gainsboro">
                                <p>
                                    {{ccindex.todayVisitingRate}}
                                </p>
                                <p style="font-size:20px;margin-top:10px">今天</p>
                            </div>
                            <div style="width:50%;text-align:center;background:white;padding:7px 0;border-radius:5px;display:flex;flex-direction:column;justify-content:center;">
                                <div style="margin-bottom:10px">
                                    <p style="font-size:20px">
                                        {{ccindex.yesterdayVisitingRate}}
                                    </p>
                                    <p style="font-size:16px">昨天</p>
                                </div>
                                <div style='border-top:1px solid gainsboro;padding-top:10px;width:80%;margin:0 auto'>
                                    <p style="font-size:14px;">
                                        {{ccindex.beforeYesterdayVisitingRate}}
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

                            <div style="height:80%;color:#cbbc5a;font-size:32px;width:50%;text-align:center;background:white;display:flex;flex-direction:column;justify-content:center;border-right:1px solid gainsboro">
                                <p>
                                    {{ccindex.todayMemberRate}}
                                </p>
                                <p style="font-size:20px;margin-top:10px">今天</p>
                            </div>
                            <div style="width:50%;text-align:center;background:white;padding:7px 0;border-radius:5px;display:flex;flex-direction:column;justify-content:center;">
                                <div style="margin-bottom:10px">
                                    <p style="font-size:20px">
                                        {{ccindex.yesterdayMemberRate}}
                                    </p>
                                    <p style="font-size:16px">昨天</p>
                                </div>
                                <div style='border-top:1px solid gainsboro;padding-top:10px;width:80%;margin:0 auto'>
                                    <p style="font-size:14px;">
                                        {{ccindex.beforeYesterdayMemberRate}}
                                    </p>
                                    <p style="font-size:14px;">较前天</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </el-col>
            </div>
        </div>
        <!-- 教务第一个报表 -->
        <div style="width: 50%;float:left" v-if="code.includes('teach')">
            <div class="h1" style="position:relative;height:50px;margin-bottom:8px;">
                <div style="background-color:white;border-radius:5px;width:99%;margin-right:1%">
                    <h3 style='margin-bottom:20px;padding:14px'>

                        签到统计
                    </h3>
                </div>
                <div style='width:100px;position:absolute;top:10px;right:120px' v-if="code.includes('teach_c')">
                    <el-select v-model="valueTeachR" size='small'  placeholder="选择校区" @change="updateListGetTeach">
                            <el-option v-for="item in optionR" :key="item.id" :label="item.title" :value="item.id">
                                </el-option>
                    </el-select>
                </div>
                <div style='margin-left:10px;width:100px;position:absolute;top:10px;right:10px' v-if="code.includes('teach_c')||code.includes('teach_m')">
                    <el-select v-model="valueTeach" size='small'  placeholder="选择老师" @change="updateList">
                        <el-option v-for="item in teachersName" :key="item.aid" :label="item.uname" :value="item.aid">
                        </el-option>
                    </el-select>
                </div>
            </div>
            <div style="display:flex; align-items:center;justify-content: space-around;">
                <el-col style='float:left;width:24%;margin-right:1%'>
                    <div class="dayCompare1">
                        <div style="color:#666666;font-size:18px;width:100%;background:white;text-align:center;padding:6px 0;border-bottom:1px solid gainsboro">学员人数(人)</div>
                        <div style="display:flex;justify-content: space-around;width:100%;height:100%;background:white;align-items:center">

                            <div style="height:90%;color:#666666;font-size:22px;line-height:22px;width:90%;text-align:center;background:white;display:flex;flex-direction:column;justify-content:space-around;">
                                <div style='display:flex;justify-content:space-between;'>
                                    <span style="margin-left:10px;font-size:16px;">日</span>
                                    <span style="margin-right:10px;">10</span>
                                </div>
                                <div style='display:flex;justify-content:space-between;'>
                                    <span style="margin-left:10px;font-size:16px;">周</span>
                                    <span style="margin-right:10px;">10</span>
                                </div>
                                <div style='display:flex;justify-content:space-between;'>
                                    <span style="margin-left:10px;font-size:16px;">月</span>
                                    <span style="margin-right:10px;">{{teachIndex.studentNumber}}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </el-col>
                <el-col style='float:left;width:24%;margin-right:1%'>
                    <div class="dayCompare1">
                        <div style="color:#666666;font-size:18px;width:100%;background:white;text-align:center;padding:6px 0;border-bottom:1px solid gainsboro">出勤量(人)</div>
                        <div style="display:flex;justify-content: space-around;width:100%;height:100%;background:white;align-items:center">

                            <div style="height:90%;color:#666666;font-size:22px;line-height:22px;width:90%;text-align:center;background:white;display:flex;flex-direction:column;justify-content:space-around;">
                                <div style='display:flex;justify-content:space-between;'>
                                    <span style="margin-left:10px;font-size:16px;">日</span>
                                    <span style="margin-right:10px;">10</span>
                                </div>
                                <div style='display:flex;justify-content:space-between;'>
                                    <span style="margin-left:10px;font-size:16px;">周</span>
                                    <span style="margin-right:10px;">10</span>
                                </div>
                                <div style='display:flex;justify-content:space-between;'>
                                    <span style="margin-left:10px;font-size:16px;">月</span>
                                    <span style="margin-right:10px;">{{teachIndex.signNumber}}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </el-col>
                <el-col style='float:left;width:24%;margin-right:1%'>
                    <div class="dayCompare1">
                        <div style="color:#666666;font-size:18px;width:100%;background:white;text-align:center;padding:6px 0;border-bottom:1px solid gainsboro">出勤率</div>
                        <div style="display:flex;justify-content: space-around;width:100%;height:100%;background:white;align-items:center">

                            <div style="height:90%;color:#666666;font-size:22px;line-height:22px;width:90%;text-align:center;background:white;display:flex;flex-direction:column;justify-content:space-around;">
                                <div style='display:flex;justify-content:space-between;'>
                                    <span style="margin-left:10px;font-size:16px;">日</span>
                                    <span style="margin-right:10px;">10</span>
                                </div>
                                <div style='display:flex;justify-content:space-between;'>
                                    <span style="margin-left:10px;font-size:16px;">周</span>
                                    <span style="margin-right:10px;">10</span>
                                </div>
                                <div style='display:flex;justify-content:space-between;'>
                                    <span style="margin-left:10px;font-size:16px;">月</span>
                                    <span style="margin-right:10px;">{{teachIndex.signRate}}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </el-col>
                <el-col style='float:left;width:24%;margin-right:1%'>
                    <div class="dayCompare1">
                        <div style="color:#666666;font-size:18px;width:100%;background:white;text-align:center;padding:6px 0;border-bottom:1px solid gainsboro">请假量</div>
                        <div style="display:flex;justify-content: space-around;width:100%;height:100%;background:white;align-items:center">

                            <div style="height:90%;color:#666666;font-size:22px;line-height:22px;width:90%;text-align:center;background:white;display:flex;flex-direction:column;justify-content:space-around;">
                                <div style='display:flex;justify-content:space-between;'>
                                    <span style="margin-left:10px;font-size:16px;">日</span>
                                    <span style="margin-right:10px;">10</span>
                                </div>
                                <div style='display:flex;justify-content:space-between;'>
                                    <span style="margin-left:10px;font-size:16px;">周</span>
                                    <span style="margin-right:10px;">10</span>
                                </div>
                                <div style='display:flex;justify-content:space-between;'>
                                    <span style="margin-left:10px;font-size:16px;">月</span>
                                    <span style="margin-right:10px;">{{teachIndex.leaveNumber}}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </el-col>
            </div>
        </div>
        <!-- 教务第二个报表 -->
        <div style="width: 50%;float:left" v-if="code.includes('teach')">
            <div class="h1" style="position:relative;height:50px;margin-bottom:8px;">
                <div style="background-color:white;border-radius:5px;width:99%;margin-right:1%">
                    <h3 style='margin-bottom:20px;padding:14px'>

                        业绩统计
                    </h3>
                </div>
                <div style='width:100px;position:absolute;top:10px;right:120px' v-if="code.includes('teach_c')">
                    <el-select v-model="valueTeachR1" size='small'  placeholder="选择校区" @change="updateListGetTeach1">
                            <el-option v-for="item in optionR" :key="item.id" :label="item.title" :value="item.id">
                                </el-option>
                    </el-select>
                </div>
                <div style='margin-left:10px;width:100px;position:absolute;top:10px;right:10px' v-if="code.includes('teach_c')||code.includes('teach_m')">
                    <el-select v-model="valueTeach1" size='small'  placeholder="选择老师" @change="updateList">
                        <el-option v-for="item in teachersName1" :key="item.aid" :label="item.uname" :value="item.aid">
                        </el-option>
                    </el-select>
                </div>
            </div>
            <div style="display:flex; align-items:center;justify-content: space-around;">
                <el-col style='float:left;width:19%;margin-right:1%'>
                    <div class="dayCompare1">
                        <div style="color:#666666;font-size:18px;width:100%;background:white;text-align:center;padding:6px 0;border-bottom:1px solid gainsboro">试听(人)</div>
                        <div style="display:flex;justify-content: space-around;width:100%;height:100%;background:white;align-items:center">

                            <div style="height:90%;color:#666666;font-size:22px;line-height:22px;width:90%;text-align:center;background:white;display:flex;flex-direction:column;justify-content:space-around;">
                                <div style='display:flex;justify-content:space-between;'>
                                    <span style="margin-left:10px;font-size:16px;">日</span>
                                    <span style="margin-right:10px;">10</span>
                                </div>
                                <div style='display:flex;justify-content:space-between;'>
                                    <span style="margin-left:10px;font-size:16px;">周</span>
                                    <span style="margin-right:10px;">10</span>
                                </div>
                                <div style='display:flex;justify-content:space-between;'>
                                    <span style="margin-left:10px;font-size:16px;">月</span>
                                    <span style="margin-right:10px;">{{teachIndex.invitation}}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </el-col>
                <el-col style='float:left;width:19%;margin-right:1%'>
                    <div class="dayCompare1">
                        <div style="color:#666666;font-size:18px;width:100%;background:white;text-align:center;padding:6px 0;border-bottom:1px solid gainsboro">新报名(人)</div>
                        <div style="display:flex;justify-content: space-around;width:100%;height:100%;background:white;align-items:center">

                            <div style="height:90%;color:#666666;font-size:22px;line-height:22px;width:90%;text-align:center;background:white;display:flex;flex-direction:column;justify-content:space-around;">
                                <div style='display:flex;justify-content:space-between;'>
                                    <span style="margin-left:10px;font-size:16px;">日</span>
                                    <span style="margin-right:10px;">10</span>
                                </div>
                                <div style='display:flex;justify-content:space-between;'>
                                    <span style="margin-left:10px;font-size:16px;">周</span>
                                    <span style="margin-right:10px;">10</span>
                                </div>
                                <div style='display:flex;justify-content:space-between;'>
                                    <span style="margin-left:10px;font-size:16px;">月</span>
                                    <span style="margin-right:10px;">{{teachIndex.newOrder}}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </el-col>
                <el-col style='float:left;width:19%;margin-right:1%'>
                    <div class="dayCompare1">
                        <div style="color:#666666;font-size:18px;width:100%;background:white;text-align:center;padding:6px 0;border-bottom:1px solid gainsboro">试听转化率</div>
                        <div style="display:flex;justify-content: space-around;width:100%;height:100%;background:white;align-items:center">

                            <div style="height:90%;color:#666666;font-size:22px;line-height:22px;width:90%;text-align:center;background:white;display:flex;flex-direction:column;justify-content:space-around;">
                                <div style='display:flex;justify-content:space-between;'>
                                    <span style="margin-left:10px;font-size:16px;">日</span>
                                    <span style="margin-right:10px;">10</span>
                                </div>
                                <div style='display:flex;justify-content:space-between;'>
                                    <span style="margin-left:10px;font-size:16px;">周</span>
                                    <span style="margin-right:10px;">10</span>
                                </div>
                                <div style='display:flex;justify-content:space-between;'>
                                    <span style="margin-left:10px;font-size:16px;">月</span>
                                    <span style="margin-right:10px;">{{teachIndex.newOrderRate}}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </el-col>
                <el-col style='float:left;width:19%;margin-right:1%'>
                    <div class="dayCompare1">
                        <div style="color:#666666;font-size:18px;width:100%;background:white;text-align:center;padding:6px 0;border-bottom:1px solid gainsboro">续费</div>
                        <div style="display:flex;justify-content: space-around;width:100%;height:100%;background:white;align-items:center">

                            <div style="height:90%;color:#666666;font-size:22px;line-height:22px;width:90%;text-align:center;background:white;display:flex;flex-direction:column;justify-content:space-around;">
                                <div style='display:flex;justify-content:space-between;'>
                                    <span style="margin-left:10px;font-size:16px;">日</span>
                                    <span style="margin-right:10px;">10</span>
                                </div>
                                <div style='display:flex;justify-content:space-between;'>
                                    <span style="margin-left:10px;font-size:16px;">周</span>
                                    <span style="margin-right:10px;">10</span>
                                </div>
                                <div style='display:flex;justify-content:space-between;'>
                                    <span style="margin-left:10px;font-size:16px;">月</span>
                                    <span style="margin-right:10px;">{{teachIndex.renewOrder}}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </el-col>
                <el-col style='float:left;width:19%;margin-right:1%'>
                    <div class="dayCompare1">
                        <div style="color:#666666;font-size:18px;width:100%;background:white;text-align:center;padding:6px 0;border-bottom:1px solid gainsboro">转介绍</div>
                        <div style="display:flex;justify-content: space-around;width:100%;height:100%;background:white;align-items:center">

                            <div style="height:90%;color:#666666;font-size:22px;line-height:22px;width:90%;text-align:center;background:white;display:flex;flex-direction:column;justify-content:space-around;">
                                <div style='display:flex;justify-content:space-between;'>
                                    <span style="margin-left:10px;font-size:16px;">日</span>
                                    <span style="margin-right:10px;">10</span>
                                </div>
                                <div style='display:flex;justify-content:space-between;'>
                                    <span style="margin-left:10px;font-size:16px;">周</span>
                                    <span style="margin-right:10px;">10</span>
                                </div>
                                <div style='display:flex;justify-content:space-between;'>
                                    <span style="margin-left:10px;font-size:16px;">月</span>
                                    <span style="margin-right:10px;">{{teachIndex.referral}}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </el-col>
            </div>
        </div>
        <!-- cc,tmk第二个报表 -->
        <div class="echartsIndex" style="position:relative;width: 50%;float:left;" v-if="code.includes('cc')||code.includes('tmk')">
            <div style="width:100%;background-color:white;height:49px;position:absolute;margin-bottom:5px;border-top-left-radius:5px;border-top-right-radius:5px;border-bottom:1px solid grey">
                <!-- <div style='margin-left:10px;width:100px;position:absolute;top:9px;right:10px;z-index:3' v-if="code =='tmk_m'">
                    <el-select v-model="value2" size='small' clearable placeholder="选择TMK" @change="updateList1">
                        <el-option v-for="item in tmks" :key="item.key" :label="item.label" :value="item.key">
                        </el-option>
                    </el-select>
                </div> -->
                <!-- <div style='margin-left:10px;width:100px;position:absolute;top:9px;right:10px;z-index:3' v-if="code =='cc_m'">
                    <el-select v-model="value2CC" size='small' clearable placeholder="选择CC" @change="updateList1CC">
                        <el-option v-for="item in ccs" :key="item.aid" :label="item.uname" :value="item.aid">
                        </el-option>
                    </el-select>
                </div> -->
            </div>
            <div style="width:100%;position:absolute;bottom:0;height:364px;background-color:white;border-bottom-left-radius:5px;border-bottom-right-radius:5px;"></div>
            <IEcharts :option="line" style='height:414px;width:100%'></IEcharts>
        </div>
        <!-- 教务第三个报表 -->
        <div class="echarts1" style="position:relative;width: 50%;margin-top:5px;" v-if="!code.includes('cc')&&!code.includes('tmk')">

            <div style="width:99%;position:absolute;top:0;height:364px;background-color:white;border-bottom-left-radius:5px;border-bottom-right-radius:5px;"></div>
            <IEcharts :option="lineTeacher" style='height:364px;width:100%'></IEcharts>
        </div>
        <!-- 教务第四个报表 -->
        <div class="echarts1" style="position:relative;width: 50%;margin-top:5px;" v-if="!code.includes('cc')&&!code.includes('tmk')">

            <div style="width:99%;position:absolute;top:0;height:364px;background-color:white;border-bottom-left-radius:5px;border-bottom-right-radius:5px;"></div>
            <IEcharts :option="lineTeacher" style='height:364px;width:100%'></IEcharts>
        </div>
        <div style="width: 49.7%;float:left;margin-right:0.3%;margin-top:20px;height:451px;background-color:white">
            <div class="h1" style="position:relative;height:50px;border-bottom:1px solid #cccccc;background-color:white;border-top-left-radius:5px;border-top-right-radius:5px;">
                <div>
                    <h3 style='float:left;padding:15px 0 20px 10px'>

                        消息通知
                    </h3>
                </div>
                <div class='notifyA' style='float:right;margin-top:12px;font-size: 14px;'>
                    <el-breadcrumb separator=" " id='systemMore'>
                        <el-breadcrumb-item :to="{ path: '/systemMessage'}" style='font-weight:500'><span style='font-weight:500;color:#1fb5ad'>更多>></span></el-breadcrumb-item>
                        <el-breadcrumb-item> </el-breadcrumb-item>
                    </el-breadcrumb>
                </div>
            </div>
            <div v-for="content in notifyData" class='messageS' @click='gotoMessage' v-if='notifyData.length !=0'>
                <div style="height:30px">
                    <div style="float:left;font-weight:600" :class="{green:content.created.substring(0,10).replace(/0/g,'') == new Date().toLocaleString().substring(0,9).replace(/0/g,'')}">{{content.type}}通知</div>
                    <div style="float:right;color:#bebebe">{{new Date(content.created).toLocaleDateString() == new Date().toLocaleDateString().substring(0,9)?content.created.substring(11):
                        new Date(content.created.substring(0,10)).valueOf() - new Date(new Date().toDateString()).valueOf() ==
                        -86400000? '昨天'+content.created.substring(11) :content.created.substring(5)}}</div>
                </div>
                <div style="color:#666666" v-if='content.type=="转校"'>
                    学生:{{ content.content.child}}的转校申请,请您确认
                </div>
                <div style="color:#666666" v-if='content.type=="转校失败"'>
                    {{ content.content.msg}}
                </div>
                <div style="color:#666666" v-if='content.type=="代课申请失败"'>
                        您的代课申请请求未通过
                    </div>
            </div>
            <div v-if='notifyData.length ==0' class='messageNoS' style="text-align:center">
                暂无未读消息
            </div>
        </div>
        <div style="width: 49.9%;float:right;margin-top:20px;height:451px;background-color:white" v-if="code.includes('cc')||code.includes('tmk')">
            <div class="h1" style="position:relative;height:50px;border-bottom:1px solid #cccccc;background-color:white;border-top-left-radius:5px;border-top-right-radius:5px;">
                <div>
                    <h3 style='float:left;padding:15px 0 20px 10px'>

                        任务提醒
                    </h3>
                </div>
                <div class='notifyA' style='float:right;margin-top:12px;font-size: 14px;'>
                    <el-breadcrumb separator=" " id='taskMore'>
                        <el-breadcrumb-item :to="{ path: '/calendar'}"><span style='font-weight:500;color:#1fb5ad'>更多>></span></el-breadcrumb-item>
                        <el-breadcrumb-item> </el-breadcrumb-item>
                    </el-breadcrumb>
                </div>
            </div>
            <div v-for="content in taskData" v-if="taskData.length !=0" style="padding:10px 10px 20px 10px;border-bottom:1px solid #e8e8e8;font-size:14px;background-color:white;">
                <div style="height:30px">
                    <div style="float:left;" class="green"><i class="el-icon-my-tongzhigonggao"></i>{{content.title}}</div>
                    <div style="float:right;color:#bebebe">
                        {{new Date(content.date).toLocaleDateString() == new Date().toLocaleDateString().substring(0,9)?content.date.substring(11):
                        new Date(content.date.substring(0,10)).valueOf() -new Date(new Date().toDateString()).valueOf() ==
                        -86400000? '昨天'+content.date.substring(11) :content.date.substring(5)}}</div>
                </div>
                <div style="color:#666666;min-height:19px">
                    {{ content.content}}
                </div>
            </div>
            <div v-if="taskData.length ==0" class='messageNoS' style="text-align:center">
                今日暂无提醒
            </div>
        </div>
        <div style="width: 49.8%;float:right;margin-top:20px;height:451px;background-color:white" v-if="code.includes('teach')">
            <div class="h1" style="position:relative;height:50px;border-bottom:1px solid #cccccc;background-color:white;border-top-left-radius:5px;border-top-right-radius:5px;">
                <div>
                    <h3 style='float:left;padding:15px 0 20px 10px'>

                        今日课表
                    </h3>
                </div>
                <div style='width:100px;float:left;margin-top:14px;margin-left:10px;' v-if="code.includes('teach_c')">
                    <el-select v-model="valueTeachR2" size='small'  placeholder="选择校区" @change="updateListGetTeach2">
                            <el-option v-for="item in optionR" :key="item.id" :label="item.title" :value="item.id">
                                </el-option>
                    </el-select>
                </div>
                <div style='width:100px;float:left;margin-top:14px;margin-left:10px;' v-if="code.includes('_c')||code.includes('_m')">
                    <el-select v-model="valueTeach2" size='small'  placeholder="选择老师" @change="updateListClass" >
                        <el-option v-for="item in teachersName2" :key="item.aid" :label="item.uname" :value="item.aid">
                        </el-option>
                    </el-select>
                </div>
                <div class='notifyA' style='float:right;margin-top:12px;font-size: 14px;'>
                    <el-breadcrumb separator=" " id='taskMore'>
                        <el-breadcrumb-item :to="{ path: '/courseTable'}">更多>></el-breadcrumb-item>
                        <el-breadcrumb-item> </el-breadcrumb-item>
                    </el-breadcrumb>
                </div>
            </div>
            <div id="tablere">
                <el-table :data="ssData" border style="width: 100%;">
                    <el-table-column prop="title" label="课程名称">
                    </el-table-column>
                    <el-table-column prop="class_time" label="上课时间">
                    </el-table-column>
                    <el-table-column prop="class_room" label="上课教室">
                            <template scope="scope">
                                    <span >{{scope.row.class_room.names}}</span>
                                </template>
                    </el-table-column>
                    <el-table-column prop="status" label="备注">
                        <template scope="scope">
                            <span :style="scope.row.ps=='代课'? 'color:#1fb5ad' : 'color:#dba31c' ">{{scope.row.status=='default'?'—':''}}</span>
                        </template>
                    </el-table-column>
                </el-table>
            </div>

        </div>
    </div>
</template>
<script>
    var token, user
    import {
        mapActions
    } from 'vuex';
    import IEcharts from 'vue-echarts-v3';
    import {
        getTMK,
        getAllCCList,
        getIndexData,
        getDayTask,
        getMessage,
        getCCindex,
        campusList,
        getTeacherList,
        getDateClass,
        getTeachIndex
    } from '../../api/api';
    export default {
        components: {
            IEcharts
        },
        data: () => ({
            valueTeach1:'',
            valueTeach:'',
            valueTeach2:'',
            valueTeachR:'',
            valueTeachR1:'',
            valueTeachR2:'',
            aid:'',
            ssData: [],
            valueR:'',
            optionR:[],
            notifyData: [],
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
            ccs: [],
            teachersName:[],
            teachersName1:[],
            teachersName2:[],
            tmkindex:{},
            ccindex: {
            },
            value1: "",
            value2: "",
            valueCC: '',
            value2CC: '',
            code: '',
            line: {
                color: ["#F7BA2A", "#16b8be", "#ed42b3"],
                title: {
                    text: '资源发展趋势图',
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
            },
            lineTeacher: {
                color: ["#F7BA2A", "#16b8be", "#ed42b3"],
                title: {
                    // text: '客户发展趋势图',
                    // padding: [15, 5, 5, 5]
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
            },
            contGet: '',
            teachIndex:{}
        }),

        methods: {
            ...mapActions([
                'setMessNumber'
            ]),
            updateListClass(){
                let para = {
                    date:new Date().toLocaleDateString(),
                    aid:this.valueTeach2
                }
                getDateClass(token,para).then(res=>{
                    this.ssData = res.data
                })
            },
            gotoMessage() {
                this.$router.push('/systemMessage/');
            },
            updateList() { //tmk
                let para = {
                    tmk_id: this.value1
                }
                getIndexData(token, para).then(res => {
                    this.changeNumber(res);
                    this.changeChart(res);
                })
                //调服务
            },
            updateListCC() { //cc
                let para = {
                    cc_id: this.valueCC
                }
                getCCindex(token,para).then(res => {
                    this.changeNumberCC(res)
                    this.changeChartCC(res)
                })
            },
            updateListGetCC() {
                this.valueCC='';
                let para = {
                    school_id:this.valueR
                }
                getAllCCList(token,para).then((res) => {
                    this.optionsCC = res.data;
                    // console.log(res.data)
                    this.valueCC=res.data[0].aid;
                    this.optionsCC.unshift({
                        aid: 0,
                        uname: '全部CC'
                    })
                }).then(()=>{

                let para1 = {
                    school_id:this.valueR,
                    cc_id: this.valueCC
                }
                getCCindex(token,para1).then(res => {
                    this.changeNumberCC(res)
                    this.changeChartCC(res)
                })
                })
            },
            changeNumber(data) { //TMK
                // let a = data.data
                // this.today_Customers = a.today_Customers;
                // this.today_Invitation = a.today_Invitation;
                // this.today_visiting = a.today_visiting;
                // this.today_member = a.today_member;
                // this.todayVisitingRate = a.todayVisitingRate;
                // this.todayMemberRate = a.todayMemberRate;
                // this.yesterday_customers = a.yesterday_customers;
                // this.yesterday_Invitation = a.yesterday_Invitation;
                // this.yesterday_visiting = a.yesterday_visiting;
                // this.yesterday_member = a.yesterday_member;
                // this.yesterdayVisitingRate = a.yesterdayVisitingRate;
                // this.yesterdayMemberRate = a.yesterdayMemberRate;
                let a = data.data
                // console.log(a)
                this.tmkindex = a
            },
            changeChart(data) { //TMK
                this.line.xAxis.data = data.data.weekList.week;
                this.line.series = [{ //以后改成动态获取
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
                };

                // this.lineTeacher.xAxis.data = data.data.weekList.week;
                // this.lineTeacher.series = [{ //以后改成动态获取
                //     name: "已邀约",
                //     type: "line",
                //     data: data.data.weekList.invitation
                // }, {
                //     name: "已到访",
                //     type: "line",
                //     data: data.data.weekList.visiting
                // }, {
                //     name: "已签单",
                //     type: "line",
                //     data: data.data.weekList.member
                // }];
                // this.lineTeacher.legend = {
                //     orient: 'horizontal',
                //     bottom: 10,
                //     data: ["已邀约", "已到访", "已签单"],
                //     // backgroundColor:'white'
                // }
            },
            changeNumberCC(data) {
                let a = data.data
                // console.log(a)
                this.ccindex = a
            },
            changeChartCC(data) {
                this.line.xAxis.data = data.data.weekList.week;
                this.line.series = [{ //以后改成动态获取
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
                };
            },
            updateListGetTeach() {
                this.valueTeach='';
                let para = {
                    school_id:this.valueTeachR
                }
                getTeacherList(token,para).then((res) => { //获取老师
                    this.teachersName = res.data;
                    this.valueTeach= res.data[0].aid;
                    this.teachersName.unshift({
                        aid: '0',
                        uname: '全部老师'
                    })
                })
                // let para1 = {
                //     school_id:this.valueR,
                //     cc_id: this.valueCC
                // }
                // getCCindex(token,para1).then(res => {
                //     this.changeNumberCC(res)
                //     this.changeChartCC(res)
                // })
            },
            updateListGetTeach1() {
                this.valueTeach1='';
                let para = {
                    school_id:this.valueTeachR1
                }
                getTeacherList(token,para).then((res) => { //获取老师
                    this.teachersName1 = res.data;
                    
                    this.valueTeach1= res.data[0].aid;
                    this.teachersName1.unshift({
                        aid: '0',
                        uname: '全部老师'
                    })
                })
                // let para1 = {
                //     school_id:this.valueR,
                //     cc_id: this.valueCC
                // }
                // getCCindex(token,para1).then(res => {
                //     this.changeNumberCC(res)
                //     this.changeChartCC(res)
                // })
            },
            updateListGetTeach2() {
                this.valueTeach2='';
                let para = {
                    school_id:this.valueTeachR2
                }
                getTeacherList(token,para).then((res) => { //获取老师
                    this.teachersName2 = res.data;
                    this.valueTeach2= res.data[0].aid
                    this.teachersName2.unshift({
                        aid: '0',
                        uname: '全部老师'
                    })
                })
                // let para1 = {
                //     school_id:this.valueR,
                //     cc_id: this.valueCC
                // }
                // getCCindex(token,para1).then(res => {
                //     this.changeNumberCC(res)
                //     this.changeChartCC(res)
                // })
            },
            getM() {
                let p = {
                    length: 5
                }
                let that = this;
                getMessage(p, token).then(res => {
                    // console.log(res);
                    that.notifyData = res.data.list;
                    that.setMessNumber(res.data.total);
                })
                
            }
        },
        beforeCreate() {
            user = sessionStorage.getItem('user');
            token = JSON.parse(user).token;
        },
        created() {
            this.code = JSON.parse(user).job ? JSON.parse(user).job.code : ''; //获取职位code
            this.aid = JSON.parse(user).aid ? JSON.parse(user).aid : ''; //获取aid
            
            if (this.code.includes('tmk')) {
                // this.value1 = this.aid+''
                getIndexData(token).then(res => {
                    this.changeNumber(res)
                    this.changeChart(res)
                })
            }
            if (this.code.includes('cc')||this.code.includes('cc_m')) {
                getCCindex(token).then(res => {
                    this.changeNumberCC(res)
                    this.changeChartCC(res)
                })
            }
            // else if(this.code.includes('cc_c')){
            //     let para1 = {
            //         school_id:'',
            //         cc_id: 0
            //     }
            //     getCCindex(token,para1).then(res => {
            //         this.changeNumberCC(res)
            //         this.changeChartCC(res)
            //     })
            // }
            if (this.code.includes('cc') || this.code.includes('tmk')) { //获取任务提醒
                let para = {
                    date: new Date().toLocaleDateString()
                }
                getDayTask(para, token).then(res => {
                    if (res.length != 0) {
                        this.taskData = res.data.map(item => {
                            return {
                                title: item.topic,
                                content: item.remark,
                                date: item.create_at.substring(0, 16)
                            }
                        })
                    }
                })
            }
            if(this.code.includes('_c')){

                    let cam={
                        simple:1
                    }
                    campusList(cam, token).then((res) => { //获取校区
                    this.optionR = res.data;
                    this.valueTeachR2 = res.data[0].id
                    this.valueTeachR1 = res.data[0].id
                    this.valueTeachR = res.data[0].id
                    this.valueR = res.data[0].id
                })
                }
            this.contGet = setInterval(this.getM, 600000)
            let p = {
                length: 5
            }
            getMessage(p, token).then(res => {//获取消息通知
                // console.log(res);
                this.notifyData = res.data.list;
                this.setMessNumber(res.data.total);
            })
            if (this.code == 'tmk_m') {
                getTMK(token).then((res) => {
                    this.tmks = res.data
                    this.tmks.unshift({
                        key: '0',
                        label: '全部TMK'
                    })
                }).then(()=>{
                    this.value1 = this.aid+'';
                })
            }
            if (this.code == 'cc_m'||this.code.includes('cc_c')) {
                // if(this.code.includes('_c')){//经理以上初始都只有全部cc
                //     this.ccs.unshift({
                //         aid: '0',
                //         uname: '全部CC'
                //     })
                //     this.valueCC ='0';
                // }else{
                getAllCCList(token).then((res) => {//主管包括自己
                    this.ccs = res.data
                    this.ccs.unshift({
                        aid: '0',
                        uname: '全部CC'
                    })
                }).then(()=>{
                    this.valueCC = this.aid;
                    
                })
                // }
            }
            if(this.code.includes('teach')){
                if(!this.code.includes('_c')){

                getTeachIndex(token).then(res=>{
                    this.teachIndex = res.data
                })
                let para = {
                    date:new Date().toLocaleDateString(),
                    aid:this.aid
                }
                getDateClass(token,para).then(res=>{
                    this.ssData = res.data
                })
                }else{

                }
            }
            if(this.code=='teach_m'){
                getTeacherList(token).then((res) => { //获取老师
                    let a = res.data
                    a.unshift({
                        aid: '0',
                        uname: '全部老师'
                    })
                    this.teachersName = a;
                    this.teachersName1 = a;
                    this.teachersName2 = a;
                }).then(()=>{
                    this.valueTeach = this.aid;
                    this.valueTeach1 = this.aid;
                    this.valueTeach2 = this.aid;
                })
            }
            // if(this.code=='teach_c'){
            //     getTeacherList(token).then((res) => { //获取老师
            //         let a = res.data
            //         a.unshift({
            //             aid: '0',
            //             uname: '全部老师'
            //         })
            //         this.teachersName = a;
            //         this.teachersName1 = a;
            //         this.teachersName2 = a;
            //     }).then(()=>{
            //         // this.valueTeach = this.aid;
            //         // this.valueTeach1 = this.aid;
            //         // this.valueTeach2 = this.aid;
            //     })
            // }
        },
        beforeDestroy() {
            clearInterval(this.contGet)
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
        height: 162px;
        flex-direction: column;
        /*box-shadow: 2px 2px 9px #888888;*/
        /*border:1px solid grey;*/
        padding: 0 20px 12px 20px;
        border-radius: 8px;
        flex: auto;
        background-color: white;
    }

    .echartsIndex {
        float: left;
        width: 100%;
        height: 414px;
        z-index: 1;
    }

    .echarts1 {
        float: left;
        width: 100%;
        height: 364px;
        z-index: 1;
    }

    /* #table .el-table td,
    #table .el-table th:not(.gutter) {
        padding: 5px 5px;
        text-align: center
    }

    #table .el-table th>div,
    #table .el-table .cell {
        padding-left: 0;
        padding-right: 0;
    } */

    .block {
        text-align: center;
        margin-top: 10px;
    }

    .drop .el-dropdown {
        font-size: 1.17em;
        color: black;
    }
    .dateIndex .el-date-editor--daterange.el-input {
        width: 187px
    }
    .echarts .drop .el-dropdown {
        color: rgb(31, 181, 173);
    }
    #systemMore .el-breadcrumb__item__inner:hover {
        cursor: pointer;
    }
    #taskMore .el-breadcrumb__item__inner:hover {
        cursor: pointer;
    }
    #systemMore .el-breadcrumb__item__inner {
        font-weight: 500
    }
    #taskMore .el-breadcrumb__item__inner {
        font-weight: 500
    }
    #tablere .el-table td,
    #tablere .el-table th:not(.gutter) {
        padding: 5px 5px;
        text-align: center
    }
    #tablere .el-table th>div,
    #tablere .el-table .cell {
        padding-left: 0;
        padding-right: 0;
    }
    .messageS {
        padding: 10px 10px 20px 10px;
        border-bottom: 1px solid #e8e8e8;
        font-size: 14px;
        background-color: white;
    }
    .messageS:hover {
        cursor: pointer
    }
    .messageNoS {
        padding: 50px;
        /* border-bottom:1px solid #e8e8e8; */
        font-size: 14px;
        background-color: white;
    }

</style>
