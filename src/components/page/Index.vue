<template>
    <div>
        <!-- <div class="crumbs">
            <el-breadcrumb separator=" ">
                <el-breadcrumb-item><i class="el-icon-my-shouye"></i>首页 </el-breadcrumb-item>
            </el-breadcrumb>
        </div> -->
        <!-- tmk第一个报表 -->
        <div class="indexT4" v-if="code.includes('tmk')">
            <div class="index4" >
                <div class="indexO1">
                    <h3 class="indexO2">
                        日数据对比统计
                    </h3>
                </div>
                <div class="indexO3" v-if='code=="tmk_m"'>
                    <el-select v-model="value1" size='small'  placeholder="选择TMK" @change="updateList">
                        <el-option v-for="item in tmks" :key="item.key" :label="item.label" :value="item.key">
                        </el-option>
                    </el-select>
                </div>
                <div class='indexO4' >
                        <el-breadcrumb separator=" " id='systemMore'>
                            <el-breadcrumb-item :to="{ path: '/reportFormTmk'}"><span class="indexO5">更多>></span></el-breadcrumb-item>
                            <!-- :to="{ path: '/reportForm/tmk'}" -->
                            <el-breadcrumb-item> </el-breadcrumb-item>
                        </el-breadcrumb>
                    </div>
            </div>
            <div class="indexO6">
                <el-col class="indexO7">
                    <div class="dayCompare1">
                        <div class="indexO8">新资源</div>
                        <div class="indexO9">
                            <div class="indexO10">
                                <p>
                                    {{tmkindex.today_Customers}}
                                </p>
                                <p class="indexO11">今天</p>
                            </div>
                            <div class="indexO12">
                                <div class="indexO13">
                                    <p class="indexO14">
                                        {{tmkindex.yesterday_customers}}
                                    </p>
                                    <p class="indexO15">昨天</p>
                                </div>
                                <div class="indexO16">
                                    <p class="indexO17">
                                        {{tmkindex.befor_yesterday_customers}}
                                    </p>
                                    <p class="indexO17">较前天</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </el-col>
                <el-col class="indexO7">
                    <div class="dayCompare1">
                        <div class="indexO8">邀约量</div>
                        <div class="indexO9">
                            <div class="indexO18">
                                <p>
                                    {{tmkindex.today_Invitation}}
                                </p>
                                <p class="indexO11">今天</p>
                            </div>
                            <div class="indexO12">
                                <div class="indexO13">
                                    <p class="indexO14">
                                        {{tmkindex.yesterday_Invitation}}
                                    </p>
                                    <p class="indexO15">昨天</p>
                                </div>
                                <div class="indexO16">
                                    <p class="indexO17">
                                        {{tmkindex.befor_yesterday_Invitation}}
                                    </p>
                                    <p class="indexO17">较前天</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </el-col>
                <el-col class="indexO7">
                    <div class="dayCompare1">
                        <div class="indexO8">到访量</div>
                        <div class="indexO9">
                            <div class="indexO19">
                                <p>
                                    {{tmkindex.today_visiting}}
                                </p>
                                <p class="indexO11">今天</p>
                            </div>
                            <div class="indexO12">
                                <div class="indexO13">
                                    <p class="indexO14">
                                        {{tmkindex.yesterday_visiting}}
                                    </p>
                                    <p class="indexO15">昨天</p>
                                </div>
                                <div class="indexO16">
                                    <p class="indexO17">
                                        {{tmkindex.befor_yesterday_visiting}}
                                    </p>
                                    <p class="indexO17">较前天</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </el-col>
            </div>
            <div class="indexO20">
                <el-col class="indexO7">
                    <div class="dayCompare1">
                        <div class="indexO8">沟通量</div>
                        <div class="indexO9">
                            <div class="indexO21">
                                <p>
                                    {{tmkindex.today_call}}
                                </p>
                                <p class="indexO11">今天</p>
                            </div>
                            <div class="indexO12">
                                <div class="indexO13">
                                    <p class="indexO14">
                                        {{tmkindex.yesterday_call}}
                                    </p>
                                    <p class="indexO15">昨天</p>
                                </div>
                                <div class="indexO16">
                                    <p class="indexO17">
                                        {{tmkindex.befor_yesterday_call}}
                                    </p>
                                    <p class="indexO17">较前天</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </el-col>
                <el-col class="indexO7">
                    <div class="dayCompare1">
                        <div class="indexO8">邀约率</div>
                        <div class="indexO9">
                            <div class="indexO22">
                                <p>
                                    {{tmkindex.today_InvitationRate}}
                                </p>
                                <p class="indexO11">今天</p>
                            </div>
                            <div class="indexO12">
                                <div class="indexO13">
                                    <p class="indexO14">
                                        {{tmkindex.yesterday_InvitationRate}}
                                    </p>
                                    <p class="indexO15">昨天</p>
                                </div>
                                <div class="indexO16">
                                    <p class="indexO17">
                                        {{tmkindex.befor_yesterday_InvitationRate}}
                                    </p>
                                    <p class="indexO17">较前天</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </el-col>
                <el-col class="indexO7">
                    <div class="dayCompare1">
                        <div class="indexO8">到访率</div>
                        <div class="indexO9">
                            <div class="indexO23">
                                <p>
                                    {{tmkindex.todayVisitingRate}}
                                </p>
                                <p class="indexO11">今天</p>
                            </div>
                            <div class="indexO12">
                                <div class="indexO13">
                                    <p class="indexO14">
                                        {{tmkindex.yesterdayVisitingRate}}
                                    </p>
                                    <p class="indexO15">昨天</p>
                                </div>
                                <div class="indexO16">
                                    <p class="indexO17">
                                        {{tmkindex.befor_yesterdayVisitingRate}}
                                    </p>
                                    <p class="indexO17">较前天</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </el-col>  
            </div>
        </div>
        <!-- cc第一个报表 -->
        <div  class="indexT4" v-if="code.includes('cc')">
            <div class="index4">
                <div class="indexC1">
                    <h3 class="indexC2">
                        日数据对比统计
                    </h3>
                    <div class="indexC3" v-if="code.includes('_c')">
                            <el-select v-model="valueR" size='small'  placeholder="选择校区" @change="updateListGetCC">
                                    <el-option v-for="item in optionR" :key="item.id" :label="item.title" :value="item.id">
                                        </el-option>
                            </el-select>
                        </div>
                    <div class="indexC4" v-if="code.includes('cc_m')||code.includes('_c_c')||code.includes('_cr_c')">
                            <el-select v-model="valueCC" size='small'  placeholder="选择CC" @change="updateListCC">
                                <el-option v-for="item in ccs" :key="item.aid" :label="item.uname" :value="item.aid">
                                </el-option>
                            </el-select>
                        </div>
                </div>
                <div class='indexO4' >
                        <el-breadcrumb separator=" " id='systemMore'>
                                <!-- :to="{ path: '/reportForm/cc'}" -->
                            <el-breadcrumb-item :to="code.includes('_c')?{ path: '/reportFormCcTotal'}:{ path: '/reportFormCc'}"><span class="indexO5">更多>></span></el-breadcrumb-item>
                            <el-breadcrumb-item> </el-breadcrumb-item>
                        </el-breadcrumb>
                    </div>
            </div>
            <div class="indexO6">
                <el-col class="indexO7">
                    <div class="dayCompare1">
                        <div class="indexO8">客户认领</div>
                        <div class="indexO9">
                            <div class="indexO10">
                                <p>
                                    {{ccindex.today_Customers}}
                                </p>
                                <p class="indexO11">今天</p>
                            </div>
                            <div class="indexO12">
                                <div class="indexO13">
                                    <p class="indexO14">
                                        {{ccindex.yesterday_Customers}}
                                    </p>
                                    <p class="indexO15">昨天</p>
                                </div>
                                <div class="indexO16">
                                    <p class="indexO17">
                                        {{ccindex.before_yesterday_customers}}
                                    </p>
                                    <p class="indexO17">较前天</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </el-col>
                <el-col class="indexO7">
                    <div class="dayCompare1">
                        <div class="indexO8">邀约量</div>
                        <div class="indexO9">
                            <div class="indexO18">
                                <p>
                                    {{ccindex.today_Invitation}}
                                </p>
                                <p class="indexO11">今天</p>
                            </div>
                            <div class="indexO12">
                                <div class="indexO13">
                                    <p class="indexO14">
                                        {{ccindex.yesterday_Invitation}}
                                    </p>
                                    <p class="indexO15">昨天</p>
                                </div>
                                <div class="indexO16">
                                    <p class="indexO17">
                                        {{ccindex.before_yesterday_Invitation}}
                                    </p>
                                    <p class="indexO17">较前天</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </el-col>
                <el-col class="indexO7">
                    <div class="dayCompare1">
                        <div class="indexO8">到访量</div>
                        <div class="indexO9">
                            <div class="indexO19">
                                <p>
                                    {{ccindex.today_Visiting}}
                                </p>
                                <p class="indexO11">今天</p>
                            </div>
                            <div class="indexO12">
                                <div class="indexO13">
                                    <p class="indexO14">
                                        {{ccindex.yesterday_Visiting}}
                                    </p>
                                    <p class="indexO15">昨天</p>
                                </div>
                                <div class="indexO16">
                                    <p class="indexO17">
                                        {{ccindex.before_yesterday_Visiting}}
                                    </p>
                                    <p class="indexO17">较前天</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </el-col>
            </div>
            <div class="indexO20">
                <el-col class="indexO7">
                    <div class="dayCompare1">
                        <div class="indexO8">签约量</div>
                        <div class="indexO9">
                            <div class="indexO21">
                                <p>
                                    {{ccindex.today_Order}}
                                </p>
                                <p class="indexO11">今天</p>
                            </div>
                            <div class="indexO12">
                                <div class="indexO13">
                                    <p class="indexO14">
                                        {{ccindex.yesterday_Order}}
                                    </p>
                                    <p class="indexO15">昨天</p>
                                </div>
                                <div class="indexO16">
                                    <p class="indexO17">
                                        {{ccindex.before_yesterday_Order}}
                                    </p>
                                    <p class="indexO17">较前天</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </el-col>
                <el-col class="indexO7">
                    <div class="dayCompare1">
                        <div class="indexO8">到访率</div>
                        <div class="indexO9">
                            <div class="indexO23">
                                <p>
                                    {{ccindex.todayVisitingRate}}
                                </p>
                                <p class="indexO11">今天</p>
                            </div>
                            <div class="indexO12">
                                <div class="indexO13">
                                    <p class="indexO14">
                                        {{ccindex.yesterdayVisitingRate}}
                                    </p>
                                    <p class="indexO15">昨天</p>
                                </div>
                                <div class="indexO16">
                                    <p class="indexO17">
                                        {{ccindex.beforeYesterdayVisitingRate}}
                                    </p>
                                    <p class="indexO17">较前天</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </el-col>
                <el-col class="indexO7">
                    <div class="dayCompare1">
                        <div class="indexO8">签约率</div>
                        <div class="indexO9">
                            <div class="indexO22">
                                <p>
                                    {{ccindex.todayMemberRate}}
                                </p>
                                <p class="indexO11">今天</p>
                            </div>
                            <div class="indexO12">
                                <div class="indexO13">
                                    <p class="indexO14">
                                        {{ccindex.yesterdayMemberRate}}
                                    </p>
                                    <p class="indexO15">昨天</p>
                                </div>
                                <div class="indexO16">
                                    <p class="indexO17">
                                        {{ccindex.beforeYesterdayMemberRate}}
                                    </p>
                                    <p class="indexO17">较前天</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </el-col>
            </div>
        </div>
        <!-- 教务第一个报表 -->
        <div  class="indexT4" v-if="code.includes('teach')">
            <div class="index4">
                <div class="indexC5">
                    <h3 class="indexC2">
                        签到统计
                    </h3>
                    <div class="indexC6" v-if="code.includes('_c')">
                        <el-select v-model="valueTeachR" size='small'  placeholder="选择校区" @change="updateListGetTeach">
                                <el-option v-for="item in optionR" :key="item.id" :label="item.title" :value="item.id">
                                    </el-option>
                        </el-select>
                    </div>
                    <div class="indexC4" v-if="code.includes('teach_cr_c')||code.includes('teach_c_c')||code.includes('teach_m')">
                        <el-select v-model="valueTeach" size='small'  placeholder="选择老师" @change="updateListTTT">
                            <el-option v-for="item in teachersName" :key="item.aid" :label="item.uname" :value="item.aid">
                            </el-option>
                        </el-select>
                    </div>
                </div>
                        <div  class="indexC13">
                            <el-breadcrumb separator=" " id='taskMore'>
                                <el-breadcrumb-item :to="{ path: '/reportFormEdu'}"><span class="indexO5">更多>></span></el-breadcrumb-item>
                                <el-breadcrumb-item> </el-breadcrumb-item>
                            </el-breadcrumb>
                        </div>
            </div>
            <div class="indexO6">
                <!-- <el-col style='float:left;width:24%;margin-right:1%'>
                    <div class="dayCompare1">
                        <div class="indexO8">学员人数(人)</div>
                        <div class="indexO9">

                            <div class="indexC8">
                                <div class="indexC9">
                                    <span style="margin-left:10px;font-size:16px;">日</span>
                                    <span style="margin-right:10px;">10</span>
                                </div>
                                <div class="indexC9">
                                    <span style="margin-left:10px;font-size:16px;">周</span>
                                    <span style="margin-right:10px;">10</span>
                                </div>
                                <div class="indexC9">
                                    <span style="margin-left:10px;font-size:16px;">月</span>
                                    <span style="margin-right:10px;">{{teachIndex.studentNumber}}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </el-col> -->
                <el-col class="indexC7">
                    <div class="dayCompare1">
                        <div class="indexO8">出勤量(人)</div>
                        <div class="indexO9">
                            <div class="indexC8">
                                <div class="indexC9">
                                    <span class="indexC10">日</span>
                                    <span class="indexC11">{{teachIndex.day.signNumber}}</span>
                                </div>
                                <div class="indexC9">
                                    <span class="indexC10">周</span>
                                    <span class="indexC11">{{teachIndex.week.signNumber}}</span>
                                </div>
                                <div class="indexC9">
                                    <span class="indexC10">月</span>
                                    <span class="indexC11">{{teachIndex.month.signNumber}}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </el-col>
                <el-col class="indexC7">
                    <div class="dayCompare1">
                        <div class="indexO8">出勤率</div>
                        <div class="indexO9">

                            <div class="indexC8">
                                <div class="indexC9">
                                    <span class="indexC10">日</span>
                                    <span class="indexC11">{{teachIndex.day.signRate}}</span>
                                </div>
                                <div class="indexC9">
                                    <span class="indexC10">周</span>
                                    <span class="indexC11">{{teachIndex.week.signRate}}</span>
                                </div>
                                <div class="indexC9">
                                    <span class="indexC10">月</span>
                                    <span class="indexC11">{{teachIndex.month.signRate}}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </el-col>
                <el-col class="indexC7">
                    <div class="dayCompare1">
                        <div class="indexO8">请假量</div>
                        <div class="indexO9">
                            <div class="indexC8">
                                <div class="indexC9">
                                    <span class="indexC10">日</span>
                                    <span class="indexC11">{{teachIndex.day.leaveNumber}}</span>
                                </div>
                                <div class="indexC9">
                                    <span class="indexC10">周</span>
                                    <span class="indexC11">{{teachIndex.week.leaveNumber}}</span>
                                </div>
                                <div class="indexC9">
                                    <span class="indexC10">月</span>
                                    <span class="indexC11">{{teachIndex.month.leaveNumber}}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </el-col>
            </div>
        </div>
        <!-- 教务第二个报表 -->
        <div  class="indexT4" v-if="code.includes('teach')">
            <div class="index4">
                <div class="indexC12">
                    <h3 class="indexC2">
                        业绩统计
                    </h3>
                    <div class="indexC6" v-if="code.includes('_c')">
                        <el-select v-model="valueTeachR1" size='small'  placeholder="选择校区" @change="updateListGetTeach1">
                                <el-option v-for="item in optionR" :key="item.id" :label="item.title" :value="item.id">
                                    </el-option>
                        </el-select>
                    </div>
                    <div class="indexC4" v-if="code.includes('teach_c_c')||code.includes('teach_cr_c')||code.includes('teach_m')">
                        <el-select v-model="valueTeach1" size='small'  placeholder="选择老师" @change="updateListTTT1">
                            <el-option v-for="item in teachersName1" :key="item.aid" :label="item.uname" :value="item.aid">
                            </el-option>
                        </el-select>
                    </div>
                </div>
                <div  class="indexC13">
                        <el-breadcrumb separator=" " id='taskMore'>
                            <el-breadcrumb-item :to="{ path: '/reportFormEdu'}"><span class="indexO5">更多>></span></el-breadcrumb-item>
                            <el-breadcrumb-item> </el-breadcrumb-item>
                        </el-breadcrumb>
                    </div>
            </div>
            <div class="indexO6">
                <el-col class="indexC14">
                    <div class="dayCompare1">
                        <div class="indexO8">试听(人)</div>
                        <div class="indexO9">
                            <div class="indexC8">
                                <div class="indexC9">
                                    <span class="indexC15">日</span>
                                    <span class="indexC16">{{teachIndex1.day.invitation}}</span>
                                </div>
                                <div class="indexC9">
                                    <span class="indexC15">周</span>
                                    <span class="indexC16">{{teachIndex1.week.invitation}}</span>
                                </div>
                                <div class="indexC9">
                                    <span class="indexC15">月</span>
                                    <span class="indexC16">{{teachIndex1.month.invitation}}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </el-col>
                <el-col class="indexC14">
                    <div class="dayCompare1">
                        <div class="indexO8">新报名(人)</div>
                        <div class="indexO9">
                            <div class="indexC8">
                                <div class="indexC9">
                                    <span class="indexC15">日</span>
                                    <span class="indexC16">{{teachIndex1.day.newOrder}}</span>
                                </div>
                                <div class="indexC9">
                                    <span class="indexC15">周</span>
                                    <span class="indexC16">{{teachIndex1.week.newOrder}}</span>
                                </div>
                                <div class="indexC9">
                                    <span class="indexC15">月</span>
                                    <span class="indexC16">{{teachIndex1.month.newOrder}}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </el-col>
                <el-col class="indexC14">
                    <div class="dayCompare1">
                        <div class="indexO8">试听转化率</div>
                        <div class="indexO9">
                            <div class="indexC8">
                                <div class="indexC9">
                                    <span class="indexC15">日</span>
                                    <span class="indexC16">{{teachIndex1.day.newOrderRate}}</span>
                                </div>
                                <div class="indexC9">
                                    <span class="indexC15">周</span>
                                    <span class="indexC16">{{teachIndex1.week.newOrderRate}}</span>
                                </div>
                                <div class="indexC9">
                                    <span class="indexC15">月</span>
                                    <span class="indexC16">{{teachIndex1.month.newOrderRate}}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </el-col>
                <el-col class="indexC14">
                    <div class="dayCompare1">
                        <div class="indexO8">续费</div>
                        <div class="indexO9">
                            <div class="indexC8">
                                <div class="indexC9">
                                    <span class="indexC15">日</span>
                                    <span class="indexC16">{{teachIndex1.day.renewOrder}}</span>
                                </div>
                                <div class="indexC9">
                                    <span class="indexC15">周</span>
                                    <span class="indexC16">{{teachIndex1.week.renewOrder}}</span>
                                </div>
                                <div class="indexC9">
                                    <span class="indexC15">月</span>
                                    <span class="indexC16">{{teachIndex1.month.renewOrder}}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </el-col>
                <el-col style='float:left;width:19%;'>
                    <div class="dayCompare1">
                        <div class="indexO8">转介绍</div>
                        <div class="indexO9">
                            <div class="indexC8">
                                <div class="indexC9">
                                    <span class="indexC15">日</span>
                                    <span class="indexC16">{{teachIndex1.day.referral}}</span>
                                </div>
                                <div class="indexC9">
                                    <span class="indexC15">周</span>
                                    <span class="indexC16">{{teachIndex1.week.referral}}</span>
                                </div>
                                <div class="indexC9">
                                    <span class="indexC15">月</span>
                                    <span class="indexC16">{{teachIndex1.month.referral}}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </el-col>
            </div>
        </div>
        <!-- cc,tmk第二个报表 -->
        <div class="echartsIndex"  v-if="code.includes('cc')||code.includes('tmk')">
            <div class="indexC17">
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
            <div class="indexC18"></div>
            <IEcharts :option="line" style='height:414px;width:100%'></IEcharts>
        </div>
        <!-- 教务第三个报表 -->
        <!-- <div class="echarts1" style="position:relative;width: 50%;margin-top:5px;" v-if="!code.includes('cc')&&!code.includes('tmk')">

            <div style="width:99%;position:absolute;top:0;height:364px;background-color:white;border-bottom-left-radius:5px;border-bottom-right-radius:5px;"></div>
            <IEcharts :option="lineTeacher" style='height:364px;width:100%'></IEcharts>
        </div> -->
        <!-- 教务第四个报表 -->
        <!-- <div class="echarts1" style="position:relative;width: 50%;margin-top:5px;" v-if="!code.includes('cc')&&!code.includes('tmk')">

            <div style="width:99%;position:absolute;top:0;height:364px;background-color:white;border-bottom-left-radius:5px;border-bottom-right-radius:5px;"></div>
            <IEcharts :option="lineTeacher" style='height:364px;width:100%'></IEcharts>
        </div> -->
        <!-- 欢迎首页 -->
        <div class="indexC19" v-if="code=='sys'">
                <div class="indexC20"  >
                    <div>
                        <h3  class="indexC21">
    
                                快捷访问
                        </h3>
                    </div>
                </div>
                <div style="width:100%;position:absolute;top:137px;left:59px;font-size:20px;font-weight: 600;">
                    
                </div>
                <div style='display:flex;width:100%;height:380px;align-items:center;flex-wrap:wrap;justify-content: center;'>
                        <div  id="q1" class="cancanHover" @click="thunderTo('/api/v1/admin')" draggable="true"
                        @drop="drop($event)" @dragstart="drag($event)" @dragover="allowDrop($event)">
                                <i style="font-size:50px;" class="el-icon-my-shezhi"></i>
                                <div>帐号管理</div>
                        </div>
                        <div id="q2" class="cancanHover" @click="thunderTo('/reportMarket')" draggable="true"
                        @drop="drop($event)" @dragstart="drag($event)" @dragover="allowDrop($event)">
                            <i style="font-size:50px;" class="icon-tongjifenxi iconfont"></i>
                            <div>报表统计</div>
                    </div>
                    <div id="q3" class="cancanHover" @click="thunderTo('/myResource')"  draggable="true"
                    @drop="drop($event)" @dragstart="drag($event)" @dragover="allowDrop($event)">
                            <i style="font-size:50px" class="el-icon-my-moban"></i>
                            <div>我的资源</div>
                    </div>
                    <div id="q4" class="cancanHover" @click="thunderTo('/resourceManage')"  draggable="true"
                    @drop="drop($event)" @dragstart="drag($event)" @dragover="allowDrop($event)">
                            <i style="font-size:50px" class="icon-moban iconfont"></i>
                            <div>资源管理</div>
                    </div>
                        <div id="q5" class="cancanHover" @click="thunderTo('/channelManage')"  draggable="true"
                        @drop="drop($event)" @dragstart="drag($event)" @dragover="allowDrop($event)">
                                <i style="font-size:50px" class="icon-chengyuanguanli iconfont"></i>
                                <div>渠道管理</div>
                        </div>
                    <div id="q6" class="cancanHover" @click="thunderTo('/activityManage')"  draggable="true"
                    @drop="drop($event)" @dragstart="drag($event)" @dragover="allowDrop($event)">
                            <i style="font-size:50px" class="icon-tongzhi iconfont"></i>
                            <div>活动管理</div>
                    </div>
                        
                </div>
            </div>
        <!-- 消息通知 -->
        <div class="indexC19">
            <div class="indexC20"  >
                <div>
                    <h3  class="indexC21">消息通知</h3>
                </div>
                <div  class="indexC22">
                    <el-breadcrumb separator=" " id='systemMore'>
                        <el-breadcrumb-item :to="{ path: '/systemMessage'}" style='font-weight:500'><span class="indexO5">更多>></span></el-breadcrumb-item>
                        <el-breadcrumb-item> </el-breadcrumb-item>
                    </el-breadcrumb>
                </div>
            </div>
            <div v-for="content in notifyData" class='messageS' @click='gotoMessage' v-if='notifyData.length !=0'>
                <div  class="indexC23">
                    <div style="float:left;font-weight:600" :class="{green:content.created.substring(0,10).replace(/0/g,'') == new Date().toLocaleString().substring(0,9).replace(/0/g,'')}">{{content.type}}通知</div>
                    <div  class="indexC24">{{new Date(content.created).toLocaleDateString() == new Date().toLocaleDateString().substring(0,9)?content.created.substring(11):
                        new Date(content.created.substring(0,10)).valueOf() - new Date(new Date().toDateString()).valueOf() ==
                        -86400000? '昨天'+content.created.substring(11) :content.created.substring(5)}}</div>
                </div>
                <div  class="indexC25" v-if='content.type=="转校"'>
                    学生:{{ content.content.child}}的转校申请,请您确认
                </div>
                <div  class="indexC25" v-if='content.type=="提前开课申请"'>
                    学生:{{ content.content.uname}}的提前开课申请,请及时处理
                </div>
                <div  class="indexC25" v-if='content.type=="转校失败"'>
                    {{ content.content.msg}}
                </div>
                <div  class="indexC25" v-if='content.type=="代课申请失败"'>
                        您的代课申请请求未通过
                    </div>
                    <div  class="indexC25" v-if='content.type=="代课申请"'>
                            {{ content.content?content.content.teacher:''}}老师的代课申请,请您确认
                        </div>
                        <div  class="indexC25" v-if='content.type=="代课申请通过"'>
                            您的代课申请已通过
                        </div>
            </div>
            <div v-if='notifyData.length ==0' class='messageNoS' style="text-align:center">
                暂无未读消息
            </div>
        </div>
        <!-- 任务提醒 -->
        <div  class="indexC26" v-if="code.includes('cc')||code.includes('tmk')">
            <div class="indexC20"  >
                <div>
                    <h3  class="indexC21">任务提醒</h3>
                </div>
                <div  class="indexC22" v-if='!code.includes("_c")'>
                    <el-breadcrumb separator=" " id='taskMore'>
                        <el-breadcrumb-item :to="{ path: '/calendar'}"><span class="indexO5">更多>></span></el-breadcrumb-item>
                        <el-breadcrumb-item> </el-breadcrumb-item>
                    </el-breadcrumb>
                </div>
            </div>
            <div v-for="content in taskData" class='CcanHover' @click='goToCal' v-if="taskData.length !=0" >
                <div  class="indexC23">
                    <div style="float:left;" class="green"><i class="el-icon-my-tongzhigonggao"></i>{{content.title}}</div>
                    <div  class="indexC24">
                        {{new Date(content.date).toLocaleDateString() == new Date().toLocaleDateString().substring(0,9)?content.date.substring(11):
                        new Date(content.date.substring(0,10)).valueOf() -new Date(new Date().toDateString()).valueOf() ==
                        -86400000? '昨天'+content.date.substring(11) :content.date.substring(5)}}</div>
                </div>
                <div  class="indexC27">
                    {{ content.content}}
                </div>
            </div>
            <div v-if="taskData.length ==0" class='messageNoS' style="text-align:center">今日暂无提醒</div>
        </div>
        <!-- 今天课表 -->
        <div  class="indexC26" v-if="code.includes('teach')">
            <div class="indexC20"  >
                <div>
                    <h3  class="indexC21">今日课表</h3>
                </div>
                <div  class="indexC28" v-if="code.includes('_c')">
                    <el-select v-model="valueTeachR2" size='small'  placeholder="选择校区" @change="updateListGetTeach2">
                            <el-option v-for="item in optionR1" :key="item.id" :label="item.title" :value="item.id">
                                </el-option>
                    </el-select>
                </div>
                <div  class="indexC28" v-if="code.includes('_c_c')||code.includes('_cr_c')||code.includes('_m')">
                    <el-select v-model="valueTeach2" size='small'  placeholder="选择老师" @change="updateListClass" >
                        <el-option v-for="item in teachersName2" :key="item.aid" :label="item.uname" :value="item.aid">
                        </el-option>
                    </el-select>
                </div>
                <div   class="indexC22">
                    <el-breadcrumb separator=" " id='taskMore'>
                        <el-breadcrumb-item :to="{ path: '/courseTable'}"><span class="indexO5">更多>></span></el-breadcrumb-item>
                        <el-breadcrumb-item> </el-breadcrumb-item>
                    </el-breadcrumb>
                </div>
            </div>
            <div id="tablere">
                <el-table :data="ssData" border style="width:95%;margin:0 auto">
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
    var token, user;
    import IEcharts from 'vue-echarts-v3/src/lite.js';
    import {mapActions} from 'vuex';
    import {
        getTMK,getAllCCList,getIndexData,getDayTask,getMessage,getCCindex,campusList,getTeacherList,getDateClass,getTeachIndex
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
            optionR1:[],
            notifyData: [],
            taskData: [],
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
            },
            contGet: '',
            drag1:'',
            teachIndex:{day:{},week:{},month:{}},
            teachIndex1:{day:{},week:{},month:{}}
            
        }),

        methods: {
            allowDrop(ev){//阻止默认拖拽行为
                ev.preventDefault();
            },
            drag(ev){//开始拖动时记录id
                this.drag1 = ev.target.id
            },
            drop(ev){//放下时进行交换
            ev.preventDefault();
            // var data=ev.dataTransfer.getData("Text");
            // ev.target.appendChild(document.getElementById(data));
            let a = document.getElementById(this.drag1);
            let c = ev.target.id||ev.path[1].id
            let b = document.getElementById(c);   
            this.exchange(a,b);
            },
            exchange(el1, el2){//交换节点
                // console.log(el1,el2)
            let ep1 = el1.parentNode//获取节点的父级
            // ep2 = el2.parentNode,//如果不是在同一个父级里
            let index1 = Array.prototype.indexOf.call(ep1.children, el1);//el1在父级里的index
            let index2 = Array.prototype.indexOf.call(ep1.children, el2);//el2在父级里的index
            // ep2.insertBefore(el1,ep2.children[index2]);
             ep1.insertBefore(el2,el1);//因为是同一个父级ep1,所以直接在父级ep1里,把el2插到el1前面
            },
            thunderTo(path){
                this.$router.push(path)
            },
            ...mapActions([
                'setMessNumber'
            ]),
            goToCal(){
                this.$router.push('/calendar/');
            },
            updateListClass(){//教务获取班级课程
                let para = {
                    date:new Date().toLocaleDateString(),
                    aid:this.valueTeach2,
                    school_id:this.valueTeachR2
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
                    school_id:this.valueR,
                    cc_id: this.valueCC
                }
                getCCindex(token,para).then(res => {
                    this.changeNumberCC(res)
                    this.changeChart(res)
                })
            },
            updateListGetCC() {
                // this.valueCC='';
                if(this.valueR!=''){

                let para = {
                    school_id:this.valueR
                }
                getAllCCList(token,para).then((res) => {
                    this.ccs = res.data;
                    this.ccs.unshift({
                        aid: 0,
                        uname: '全部CC'
                    })
                    // this.valueCC=res.data[0].aid
                    // this.valueCC=0;
                }).then(()=>{
                    if( this.valueCC===0){
                    this.updateListCC()
                    }else{
                        this.valueCC=0
                    }
                })
                }else{
                    if(this.valueCC=== 0){//cc选择
                    this.updateListCC()
                    }
                    this.ccs=[{
                        aid: 0,
                        uname: '全部CC'
                    }]
                    this.valueCC= 0;
                }
            },
            changeNumber(data) { //TMK
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
            },
            changeNumberCC(data) {
                let a = data.data
                // console.log(a)
                this.ccindex = a
            },
            updateListGetTeach() {
                // this.valueTeach='';
                if(this.valueTeachR!=''){
                    // console.log(111)
                let para = {
                    school_id:this.valueTeachR
                }
                getTeacherList(token,para).then((res) => {//获取老师
                    this.teachersName = res.data;
                    this.teachersName.unshift({
                        aid: 0,
                        uname: '全部老师'
                    })
                }).then(()=>{
                    if( this.valueTeach===0){
                    this.updateListTTT()
                    }else{
                        this.valueTeach=0
                    }
                })
                }else{
                    if(this.valueTeach=== 0){//老师选择
                    this.updateListTTT()
                    }
                    this.teachersName=[{
                        aid: 0,
                        uname: '全部老师'
                    }]
                    this.valueTeach= 0;
                    
                }
            },
            updateListTTT() { //教务1
                // console.log(1)
                let para = {
                    school_id: this.valueTeachR,
                    aid:this.valueTeach
                }
                getTeachIndex(token,para).then(res=>{
                    let d = res.data;
                    this.teachIndex ={
                        day:{
                            signNumber: d.day.signNumber,
                            signRate: d.day.signRate,
                            leaveNumber: d.day.leaveNumber
                        },
                        week:{
                            signNumber: d.week.signNumber,
                            signRate: d.week.signRate,
                            leaveNumber: d.week.leaveNumber
                        },
                        month:{
                            signNumber: d.month.signNumber,
                            signRate: d.month.signRate,
                            leaveNumber: d.month.leaveNumber
                        }
                    }
                })
            },
            updateListTTT1() { //教务2
                let para = {
                    school_id: this.valueTeachR1,
                    aid:this.valueTeach1
                }
                getTeachIndex(token,para).then(res=>{
                    this.teachIndex1 = res.data
                })
            },
            updateListGetTeach1() {
                // this.valueTeach1='';
                if(this.valueTeachR1!=''){
                let para = {
                    school_id:this.valueTeachR1
                }
                getTeacherList(token,para).then((res) => {//获取老师
                    this.teachersName1 = res.data;
                    this.teachersName1.unshift({
                        aid: 0,
                        uname: '全部老师'
                    })
                }).then(()=>{
                    if( this.valueTeach1===0){
                    this.updateListTTT1()
                    }else{
                        this.valueTeach1=0
                    }
                })
                }else{
                    if(this.valueTeach1=== 0){
                    this.updateListTTT1()
                    }
                    this.teachersName1=[{
                        aid: 0,
                        uname: '全部老师'
                    }]
                    this.valueTeach1= 0;
                    
                }
                
                // let para1 = {
                //     school_id:this.valueR,
                //     cc_id: this.valueCC
                // }
                // getCCindex(token,para1).then(res => {
                //     this.changeNumberCC(res)
                //     this.changeChart(res)
                // })
            },
            updateListGetTeach2() {
                // this.valueTeach2='';
                let para = {
                    school_id:this.valueTeachR2
                }
                getTeacherList(token,para).then((res) => { //获取老师
                    this.teachersName2 = res.data;
                    this.valueTeach2= res.data[0].aid
                    // this.teachersName2.unshift({
                    //     aid: '0',
                    //     uname: '全部老师'
                    // })
                })
                // let para1 = {
                //     school_id:this.valueR,
                //     cc_id: this.valueCC
                // }
                // getCCindex(token,para1).then(res => {
                //     this.changeNumberCC(res)
                //     this.changeChart(res)
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
            if(this.code.includes('_c')){
                    let cam={
                        simple:1
                    }
                    campusList(cam, token).then((res) => { //获取校区,触发change调表格服务
                    this.optionR = [...res.data];
                    this.optionR.unshift({
                            id: 0,
                            title: '全部校区'
                        })

                    this.optionR1 = res.data;
                    this.valueTeachR2 = res.data[0].id;
                    this.valueTeachR1 = 0;
                    this.valueTeachR = 0;
                    this.valueR = 0;
                    if(this.code.includes('cc')){

                        let para = {
                        school_id:this.valueR,
                        cc_id: this.valueCC
                    }
                    getCCindex(token,para).then(res => {
                        this.changeNumberCC(res)
                        this.changeChart(res)
                    })
                    }else if(this.code.includes('teach')){
                        let para = {
                    school_id: this.valueTeachR1,
                    aid:this.valueTeach1
                }
                getTeachIndex(token,para).then(res=>{
                    this.teachIndex1 = res.data
                })
                let para1 = {
                    date:new Date().toLocaleDateString(),
                    aid:this.aid,
                    school_id:this.valueTeachR2
                }
                getDateClass(token,para1).then(res=>{
                    this.ssData = res.data
                })
                    }
                    })
                    }
            if (this.code=='tmk') {
                // this.value1 = this.aid+''
                getIndexData(token).then(res => {
                    this.changeNumber(res)
                    this.changeChart(res)
                })
            }else if (this.code == 'tmk_m') {
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
            if (this.code=='cc'){
                getCCindex(token).then(res => {
                    this.changeNumberCC(res)
                    this.changeChart(res)
                })
            }else if(this.code.includes('cc_m')){
                getAllCCList(token).then((res) => {//主管包括自己
                    this.ccs = res.data
                    this.ccs.unshift({
                        aid: '0',
                        uname: '全部CC'
                    })
                }).then(()=>{
                    this.valueCC = this.aid;
                })
            }
            if (this.code.includes('cc') || this.code.includes('tmk')) {//获取任务提醒
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
            if(this.code=='teach'){
                // if(!this.code.includes('_c')){
                getTeachIndex(token).then(res=>{
                    let da = res.data
                    this.teachIndex = da;
                    this.teachIndex1 = da;
                    // console.log( this.teachIndex)
                })
                let para = {
                    date:new Date().toLocaleDateString(),
                    aid:this.aid
                }
                getDateClass(token,para).then(res=>{
                    this.ssData = res.data
                })
                // }
            }else if(this.code=='teach_m'){
                getTeacherList(token).then((res) => { //获取老师
                    this.teachersName2 = res.data;
                    let a = [...res.data]
                    a.unshift({
                        aid: '0',
                        uname: '全部老师'
                    })
                    this.teachersName = a;
                    this.teachersName1 = a;
                }).then(()=>{
                    this.valueTeach = this.aid-0;
                    this.valueTeach1 = this.aid-0;
                    this.valueTeach2 = this.aid-0;
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
        /* width: 100%; */
        height: 414px;
        z-index: 1;
        position:relative;
        width: 50%;
        float:left;
    }

    /* .echarts1 {
        float: left;
        width: 100%;
        height: 364px;
        z-index: 1;
    } */

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

    /* .block {
        text-align: center;
        margin-top: 10px;
    } */

    /* .drop .el-dropdown {
        font-size: 1.17em;
        color: black;
    } */
    /* .dateIndex .el-date-editor--daterange.el-input {
        width: 187px
    } */
    /* .echarts .drop .el-dropdown {
        color: rgb(31, 181, 173);
    } */
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
.CcanHover:hover{
cursor: pointer;
}
.CcanHover{
padding:10px 10px 20px 10px;border-bottom:1px solid #e8e8e8;font-size:14px;background-color:white;
}
.cancanHover{
    border:1px solid #f5f0f0;
    box-shadow: 2px 2px 20px #888888;
    flex: 0 0 24%;
    text-align: center;
    margin: 2%;
    padding: 5% 0px;
    border-radius: 33px;
}
.cancanHover:hover{
    color:#1fb5ad;
    border:1px solid #1fb5ad;
    cursor: pointer;
    transform: scale(1.1);
}
.index4{
position:relative;height:50px;margin-bottom:8px;
}
.indexT4{
width: 50%;float:left
}
.indexO1{
background-color:white;border-radius:5px;width:99%;margin:0 auto
}
.indexO2{
margin-bottom:20px;padding:14px
}
.indexO3{
margin-left:10px;width:100px;position:absolute;top:12px;left:150px
}
.indexO4{
position:absolute;right:3px;top:10px;font-size: 14px;
}
.indexO5{
font-weight:500;color:#1fb5ad
}
.indexO6{
    display:flex; align-items:center;justify-content: space-around;
}
.indexO7{
    float:left;width:32%
}
.indexO8{
    color:#666666;font-size:18px;width:100%;background:white;text-align:center;padding:6px 0;border-bottom:1px solid gainsboro
}
.indexO9{
    color:#666666;font-size:18px;width:100%;background:white;text-align:center;padding:6px 0;border-bottom:1px solid gainsboro;height: 90%;display: flex
}
.indexO10{
    height:100%;color:#6fc7ca;font-size:32px;width:50%;text-align:center;background:white;display:flex;flex-direction:column;justify-content:center;border-right:1px solid gainsboro
}
.indexO11{
    font-size:20px;margin-top:10px
}
.indexO12{
    width:50%;text-align:center;background:white;padding:7px 0;border-radius:5px;display:flex;flex-direction:column;justify-content:center;
}
.indexO13{
    margin-bottom:10px
}
.indexO14{
    font-size:20px
}
.indexO15{
    font-size:16px
}
.indexO16{
    border-top:1px solid gainsboro;padding-top:10px;width:80%;margin:0 auto
}
.indexO17{
    font-size:14px;
}
.indexO18{
    height:100%;color:#ed8d7a;font-size:32px;width:50%;text-align:center;background:white;display:flex;flex-direction:column;justify-content:center;border-right:1px solid gainsboro
}
.indexO19{
    height:100%;color:#71b4db;font-size:32px;width:50%;text-align:center;background:white;display:flex;flex-direction:column;justify-content:center;border-right:1px solid gainsboro
}
.indexO20{
    height:150px;margin-top:20px;display:flex; align-items:center;justify-content: space-around;
}
.indexO21{
    height:100%;color:#7089ba;font-size:32px;width:50%;text-align:center;background:white;display:flex;flex-direction:column;justify-content:center;border-right:1px solid gainsboro
}
.indexO22{
    height:100%;color:#cbbc5a;font-size:32px;width:50%;text-align:center;background:white;display:flex;flex-direction:column;justify-content:center;border-right:1px solid gainsboro
}
.indexO23{
    height:100%;color:#49c236;font-size:32px;width:50%;text-align:center;background:white;display:flex;flex-direction:column;justify-content:center;border-right:1px solid gainsboro
}
.indexC1{
    background-color:white;border-radius:5px;width:99%;margin:0 auto;display:flex;align-items:center
}
.indexC2{
    padding:14px
}
.indexC3{
    width:100px;margin-right:10px
}
.indexC4{
    width:100px;
}
.indexC5{
    background-color:white;border-radius:5px;width:99%;margin-right:1%;display:flex;align-items: center;
}
.indexC6{
    width:100px;margin-right:10px;
}
.indexC7{
    float:left;width:32%;margin-right:1%;
}
.indexC8{
    height:100%;color:#666666;font-size:22px;line-height:22px;width:100%;text-align:center;background:white;display:flex;flex-direction:column;justify-content:space-around;
}
.indexC9{
    display:flex;justify-content:space-between;
}
.indexC10{
    margin-left:20px;font-size:16px;
}
.indexC11{margin-right:20px;}
.indexC12{
    background-color:white;border-radius:5px;width:100%;display:flex;align-items: center;
}
.indexC13{
    position:absolute;right:10px;top:10px;font-size: 14px;
}
.indexC14{
    float:left;width:19%;margin-right:1%
}
.indexC15{
    margin-left:5px;font-size:16px;
}
.indexC16{
    margin-right:5px;
}
.indexC17{
    width:100%;background-color:white;height:49px;position:absolute;margin-bottom:5px;border-top-left-radius:5px;border-top-right-radius:5px;border-bottom:1px solid grey
}
.indexC18{
    width:100%;position:absolute;bottom:0;height:364px;background-color:white;border-bottom-left-radius:5px;border-bottom-right-radius:5px;
}
.indexC19{
    width: 49.5%;float:left;margin-right:0.5%;margin-top:20px;height:451px;background-color:white
}
.indexC20{
    position:relative;height:50px;border-bottom:1px solid #cccccc;background-color:white;border-top-left-radius:5px;border-top-right-radius:5px;
}
.indexC21{
    float:left;padding:15px 0 20px 10px
}
.indexC22{
    float:right;margin-top:12px;font-size: 14px;
}
.indexC23{
    height:30px
}
.indexC24{
    float:right;color:#bebebe
}
.indexC25{
    color:#666666
}
.indexC26{
    width: 50%;float:right;margin-top:20px;height:451px;background-color:white;overflow: hidden;
}
.indexC27{
    color:#666666;min-height:19px
}
.indexC28{
    width:100px;float:left;margin-top:14px;margin-left:10px;
}
</style>
