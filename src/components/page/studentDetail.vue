<template>
    <div class="tableUserDSD">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-my-gerenxinxi"></i> 学员合同</el-breadcrumb-item>
                <el-breadcrumb-item to="/myStudents">我的学员</el-breadcrumb-item>
                <el-breadcrumb-item class='ss'>{{student.name}}</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <!-- 用户资料 -->
        <div class="SDtitle">
            <div class='UserDetailTitle'>
                <!--  <i class=el-icon-my-tongxunlu style="font-size:31px"></i> -->
                <span class="SDtitle1">学员资料</span>
                <div class="SDtitle2">
                    <div class="SDtitle3">
                    </div>
                    <div class='addU' @click='addU' v-if="!code.includes('_c')"></div>
                </div>
            </div>
            <el-form id='customerDeatilForm' label-width="102px" label-position='left'>
                <el-form-item label="姓名:" prop='name'>
                    <span>{{student.name}}</span>
                </el-form-item>
                <el-form-item label="性别:" prop='sex'>
                    <span>{{student.sex}}</span>
                </el-form-item>
                <el-form-item label="年龄:" prop='age'>
                    <span>{{student.age}}</span>
                </el-form-item>
                <el-form-item label="身份证号:" prop='id_number'>
                    <span>{{student.id_number}}</span>
                </el-form-item>
                <el-form-item label="家长:" prop='parent'>
                    <span>{{student.parent}}</span>
                </el-form-item>
                <el-form-item label="第二家长:" prop='parent1' v-if='student.parent1.split("(")[0]!=""'>
                    <span>{{student.parent1}}</span>
                </el-form-item>
                <el-form-item label="手机:" prop='parent_phone'>
                    <span>{{student.parent_phone}}</span>
                </el-form-item>
                <el-form-item label="第二手机:" prop='parent1_phone' v-if='student.parent1_phone!=""'>
                    <span>{{student.parent1_phone}}</span>
                </el-form-item>
                <el-form-item label="渠道来源:" prop='channel'>
                    <span>{{student.channel}}</span>
                    <div v-if='student.sour_id==4'>介绍人:{{student.referral_name}} 老师:{{student.teach_name}}</div>
                </el-form-item>
                <el-form-item label="录入时间:" prop='time'>
                    <span>{{student.time}}</span>
                </el-form-item>
                <el-form-item label="所在地区:" prop='fullAddress'>
                        <span>{{student.fullAddress}}</span>
                    </el-form-item>
                <el-form-item label="校区:" prop='school'>
                    <span>{{student.school}}</span>
                </el-form-item>
                <el-form-item label="CC:" prop='teacher'>
                    <span>{{student.teacher}}</span>
                </el-form-item>
            </el-form>
            <div class="SDtitleimg">
                <img width="100" height="100" alt="">
            </div>
        </div>
        <!-- 考勤记录 -->
        <div class="SDsign">
            <div class='AttRecord'>
                <!--  <i class=el-icon-my-tongxunlu style="font-size:31px"></i> -->
                <i class='el-icon-my-richeng' style="font-size:24px"></i><span class="SDsign600">考勤记录</span>
                <div class='studentDetailThreeNew'>
                    <el-select v-model="valueR" clearable placeholder="全部课程" @change="updateListR">
                        <el-option v-for="item in allClass" :key="item.kcid" :label="item.title" :value="item.kcid">
                        </el-option>
                    </el-select>
                </div>
                <div class='studentDetailThreeNew'>
                    <el-select v-model="value1" clearable placeholder="选择老师" filterable @change="updateList1">
                        <el-option v-for="item in teachersName" :key="item.aid" :label="item.uname" :value="item.aid">
                        </el-option>
                    </el-select>
                </div>
            </div>
            <div id="table1">
                <el-table :data="tableData" border style="width: 100%">
                    <el-table-column prop="course_id" label="课程">
                    </el-table-column>
                    <el-table-column prop="course_time" label="上课时间">
                    </el-table-column>
                    <el-table-column prop="teacher_uid" label="上课老师" width='60'>
                    </el-table-column>
                    <el-table-column prop="checkin_types" label="签到情况">
                        <template scope="scope">
                            <span :style="scope.row.checkin_types=='出勤'?'color:#18c318': scope.row.checkin_types=='请假'? 'color:#e4a821' :'color:red' ">{{scope.row.checkin_types}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="course_time" label="签到时间">
                    </el-table-column>
                </el-table>
                <!-- <div class="block">
                <span class="demonstration"></span>
                <el-pagination layout="prev, pager, next" :total="total" :current-page="currentPage" :page-size="pagesize" @current-change="handleCurrentChange">
                </el-pagination>
            </div> -->
            </div>
            <div class="block">
                <el-pagination layout="prev, pager, next" :total="total1" :current-page="currentPage1" :page-size="pagesize1" @current-change="handleCurrentChange1">
                </el-pagination>
            </div>
        </div>
        <!-- 第一步选择合同 -->
        <el-dialog title="合同选择" :visible.sync="dialogFormVisibleFirst" :close-on-click-modal="no" top='33%' size='tiny' show-close>
            <el-form :model="firstform" :rules='firstformrule' ref="firstform" label-width="80px">
                <el-form-item prop='contract' label='合同号'>
                    <el-select v-model="firstform.contract" placeholder="请选择合同" style="width:185px">
                        <el-option v-for="(item,index) in this.fronzeContra" :key="item.order_id" :label="item.sku" :value="index">
                        </el-option>
                    </el-select>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer" style='text-align:center'>
                <el-button type="primary" @click="goToSelect('firstform')" style='margin-right:20px'>确定</el-button>
                <el-button @click="dialogFormVisibleFirst = false">取消</el-button>
                <br>
                <br>
                <br>
            </div>
        </el-dialog>
        <!-- 续费 -->
        <el-dialog title="续接课程选择" :visible.sync="dialogFormVisibleContinue" :close-on-click-modal="no" top='23%' show-close>
            <el-form :model="continueform" :rules='continueformrule' ref="continueform" label-width="80px" label-position='left'>
                <el-form-item prop='contract' label='合同号'>
                    <el-select v-model="continueform.contract" clearable placeholder="选择合同" filterable @change='getContClass'>
                        <el-option v-for="(item,index) in this.continueClassCon" :key="item.order_id" :label="item.sku" :value="index">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item prop='title' label='课程名称' v-show="continueform.contract!==''">
                    <el-select v-model="continueform.title" placeholder="请选择续接课程" style="width:185px" clearable>
                        <el-option v-for="(item,index) in continueClass1" :key="index" :label="item.title" :value="index">
                        </el-option>
                        <!-- <el-option v-for="item in contClass" :key="item.key" :label="item.label" :value="item.key"> -->
                        </el-option>
                    </el-select>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisibleContinue=false">取消</el-button>
                <el-button type="primary" @click="nextToSignContract()">下一步</el-button>
                <br>
            </div>
        </el-dialog>
        <!-- 转课补费 -->
        <el-dialog title="课程剩余金额" :visible.sync="dialogFormVisiblechangtobuy" :close-on-click-modal="no" top='7%' show-close>
            <div id="tablelesson">
                <el-table :data="lessonData" border style="width: 100%" @selection-change="handleSelectionChange" ref="multipleTable">
                    <el-table-column type="selection" width='100'>
                    </el-table-column>
                    <el-table-column prop="title" label="课程">
                    </el-table-column>
                    <el-table-column prop="course_curr_num" label="剩余课时">
                    </el-table-column>
                    <el-table-column prop="unit_price" label="课时单价">
                    </el-table-column>
                    <el-table-column prop="course_curr_price" label="剩余课时金额">
                    </el-table-column>
                </el-table>
            </div>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisiblechangtobuy=false">取消</el-button>
                <el-button type="primary" @click="nextToContract()">下一步</el-button>
                <br>
            </div>
        </el-dialog>
        <!-- 转班/升 -->
        <el-dialog title="转班" :visible.sync="dialogFormVisibletransferOrUp" :close-on-click-modal="no" top='13%' size='small' show-close>
            <el-form :model="transferOrUpform" :rules='transferOrUpformrule' ref="transferOrUpform" label-width="100px">
                <el-form-item prop='class' :label="'转出课程'">
                    <el-select v-model="transferOrUpform.class" placeholder="请选择课程" filterable @change='getTransClass(transferOrUpform.class)'>
                        <el-option v-for="(item,index) in transOut" :key="index" :label="item.title" :value="index">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item prop='school' :label="'转班课程'">
                    <el-select v-model="transferOrUpform.school" placeholder="请选择课程" filterable @change='clearTime'>
                        <el-option v-for="item in transClass" :key="item.kcid" :label="item.title" :value="item.kcid">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item prop='time' label='具体班次' v-if="transferOrUpform.school!==''">
                    <!-- <el-select v-model="transferOrUpform.receiveCC" placeholder="请选择同类型班级" style="width:185px"  >
                         <el-option v-for="item in receiveSchool" :key="item.value" :label="item.label" :value="item.value">
                    </el-option>
                    </el-select> -->
                    <el-date-picker v-model="transferOrUpform.time" type="date" placeholder="选择日期" :picker-options="pickerOptions0"  @change='getClassRoom(transferOrUpform.time,transferOrUpform)'>
                    </el-date-picker>
                </el-form-item>
                <el-form-item prop='class' class='selectClass SDselect' v-if="selectionClass !=''">
                    <el-radio-group v-model="transferOrUpform.syllabus_id">
                        <el-radio :label="item.id" class="SDtu" v-for='item in selectionClass'>
                            <span class="SDm30">{{item.week==1?'周一':item.week==2?'周二':item.week==3?'周三':item.week==4?'周四':item.week==5?'周五':item.week==6?'周六':'周日'}}  {{item.class_time.substring(0,5)}}</span>
                            <span class="SDm30">{{item.teacher?item.teacher.uname:''}}</span>
                            <span>{{item.class_room.names+'(当前班级'+item.syllabus_person_num+'人)' }}</span>
                        </el-radio>
                    </el-radio-group>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer SDtuc">
                <el-button type="primary" class="SDm30" @click='transferToClass'>确定</el-button>
                <el-button @click="dialogFormVisibletransferOrUp = false">取消</el-button>
                <br>
                <br>
                <br>
            </div>
        </el-dialog>
        <!-- 转校 -->
        <el-dialog title="转校" :visible.sync="dialogFormVisibleTransferSchool" :close-on-click-modal="no" top='33%' size='tiny' show-close
            @close="resetD('transferSchoolform')">
            <el-form :model="transferSchoolform" :rules='transferSchoolformrule' ref="transferSchoolform" label-width="80px">
                <el-form-item prop='school' label='接收校区'>
                    <el-select v-model="transferSchoolform.school" clearable placeholder="选择校区" filterable @change='getCC'>
                        <el-option v-for="item in receiveSchool" :key="item.value" :label="item.label" :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item prop='receiveCC' label='接收CC'>
                    <el-select v-model="transferSchoolform.receiveCC" placeholder="请选择CC" style="width:185px">
                        <el-option v-for="item in listCC" :key="item.aid" :label="item.uname" :value="item.aid">
                        </el-option>
                    </el-select>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer SDtuc">
                <el-button type="primary" class="SDm30" @click='transferSchoolToCC'>确定</el-button>
                <el-button @click="dialogFormVisibleTransferSchool = false">取消</el-button>
            </div>
        </el-dialog>
        <!-- 冻结 -->
        <el-dialog title="冻结" :visible.sync="dialogFormVisibleFroze" :close-on-click-modal="no" top='33%' size='tiny' show-close
            class='frozeDialog'>
            <el-form :model="frozeform" :rules='frozeformrule' ref="frozeform" label-width="80px">
                <!-- <el-form-item prop='class' label='冻结课程'>
                    <el-select v-model="frozeform.class" placeholder="请选择课程" style="width:185px">
                        <el-option v-for="item in students[classIndex].dataTable" :key="item.title" :label="item.title" :value="item.course_id">
                        </el-option>
                    </el-select>
                </el-form-item> -->
                <el-form-item prop='Ftime' label='冻结时间'>
                    <el-date-picker v-model="frozeform.Ftime" type="daterange" placeholder="起止时间" :picker-options="pickerOptions0">
                    </el-date-picker>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer SDtuc">
                <el-button type="info" class="SDm30" @click='forzenSubmit'>确定</el-button>
                <el-button @click="dialogFormVisibleFroze = false">取消</el-button>
                <br>
                <br>
                <br>
            </div>
        </el-dialog>
        <!-- 退费试算 -->
        <el-dialog :title="'退费试算清单(合同'+students[classIndex].sku +')'" :visible.sync="dialogFormVisibleRefund" :close-on-click-modal="no"
            top='10%' size='large' show-close class='refundDialog'>
            <div id="table3">
                <div class="SDt1">
                    <el-table :data="refun.item" border style="width: 614px;">
                        <el-table-column prop="course_name" label="课程">
                        </el-table-column>
                        <el-table-column prop="money_amount" label="报名总额">
                        </el-table-column>
                        <el-table-column prop="class_hour" label="总课时">
                        </el-table-column>
                        <el-table-column prop="consuming_hour" label="正常消耗课时">
                        </el-table-column>
                        <el-table-column prop="sale_scale" label="消耗比率">
                        </el-table-column>
                        <el-table-column prop="refundment_scale" label="退费比率">
                        </el-table-column>
                        <el-table-column prop="base_total" label="退费金额">
                        </el-table-column>
                    </el-table>
                    <div class="SDt2">
                        <div class='refundTitle'>
                            <div class='refundS refund68'>管理费</div>
                            <div class='refundS refund68'>报名费</div>
                            <div class='refundS refund68'>教材费</div>
                            <div class='refundS refund68'>书本费</div>
                            <div class='refundS refund68'>礼品费</div>
                            <div class='refundS refund199'>最终退费金额</div>
                        </div>
                        <div class='refundTable'>
                            <div class='refundTable68'>{{refun.manage_money}}</div>
                            <div class='refundTable68'>{{refun.sign_up_money}}</div>
                            <div class='refundTable68'>{{refun.teaching_money}}</div>
                            <div class='refundTable68'>{{refun.book_money}}</div>
                            <div class='refundTable68'>{{refun.give_money}}</div>
                            <div class='refundTable199'>{{refun.grand_total}}</div>
                        </div>
                    </div>
                </div>
            </div>
            <!-- <div style="color:#f74242;margin-top:10px">*凡是在本协议中注明为考证类课程、寒暑假班、冬夏令营、赠送课程、享受特殊优惠价格课程,一律不得退费</div> -->
            <el-collapse accordion id='refunicon'>
                <el-collapse-item>
                    <template slot="title">
                        <span class="SDre1">退学退费规定</span>
                    </template>
                    <p class="SDre2">1.已经开始课程,但未达到全期三分之一(说明:由于旷课或者请假未参与课程导致实际课时的减少不从本条款课程进度中减少)者,根据校方为了课程所付出的劳动以及提供的所有服务,报名总额退还50%,材料费不予退还。</p>
                    <p class="SDre2">2.已经开始课程,但未达全期二分之一者(说明:由于旷课或者请假未参与课程导致实际课时的减少不从本条款课程进度中减少)者,根据校方为了课程所付出的劳动以及提供的所有服务,学费退还30%,材料费不予退还。</p>
                    <p class="SDre2">3.已经开始课程超过二分之一者(说明:由于旷课或者请假未参与课程导致实际课时的减少不从本条款课程进度中减少)者,根据校方为了课程所付出的劳动以及提供的所有服务,校方将不予任何退款。</p>
                    <p class="SDre2">4.除本条以上约定外,学员提出退费申请还应当承担下述费用:</p>
                    <p class="SDre2">(1)管理费,用于补偿甲方相关教学资源的损耗,其金额为该课程原价的10%;</p>
                    <p class="SDre2">(2)已赠送教材和礼品的费用;(不接受退还)</p>
                    <p class="SDre2">(3)报名费用300元。甲方将在扣除上述费用后将剩余的学费退还给学员,但所有相关的银行手续费均由学员承担。</p>
                    <p class="SDrer">(例:上16节课退费:原价*50% - 管理费 - 报名费 (300)- 材料费(600元) - 教材费用(120元) - 礼品费用(熊猫到家1580元)=退还费用)</p>
                    <p class="SDre2">5.凡是在本协议中注明为考证类课程、寒暑假班、冬夏令营、赠送课程,享受特殊优惠价格课程,一律不得退费。</p>
                    <p class="SDre2">6.经校方审核符合退费制度后,每月10日前在校区办理退费手续,交齐退费资料:入学协议原件(白联及相关学籍证明、学员本人或直系亲属的银行名称及开户行、银行用户名和银行账号),《特殊情况申请表(转/延/退)》以及相关证明,次月20号退费至指定银行账户;如每月10号以后办理退费手续者,则隔月10号退费。</p>
                    <p class="SDre2">7.请学员家长妥善保管原始协议和收据及刷卡POS机单和开具过的发票,如有任一遗失,学校一律不予办理退费。</p>
                </el-collapse-item>
            </el-collapse>
        </el-dialog>
        <!-- 合同课程 -->
        <div class="SDcon">
            <div class='contractClass'>
                <!--  <i class=el-icon-my-tongxunlu style="font-size:31px"></i> -->
                <span class="SDcon1">合同课程({{contractNumber}}个)</span>
                <div class="SDconfloat" v-if="!code.includes('_c')">
                    <el-button type="success" size="small" @click='continueClass'>
                        续费</el-button>
                    <el-button type="success" size="small" @click='rebuy'>
                        再购买</el-button>
                    <el-button type="success" size="small" @click='changeToPay'>
                        转课补费</el-button>
                    <el-button type="primary" size="small" @click='upClass'>
                        转班</el-button>
                    <!--  <el-button type="primary" size="small"  @click='transferClass'>
                   转班</el-button> -->
                    <el-button type="primary" size="small" @click='transferSchool'>
                        转校</el-button>
                    <el-button type="info" size="small" @click='frozzen' v-if="code=='cc_m'">
                        冻结</el-button>
                    <el-button type="danger" size="small" @click='refund'>
                        退费试算</el-button>
                </div>
            </div>
            <div id="table4">
                <div v-for="item in students" class='table4Title'>
                    <div class='table4Div'>
                        <div class="SDtable">
                            <div class="SDtable1">
                                <span @click='goToContract(item.order_id)' class='skuJump'>
                          合同编号:  {{item.sku}}  
                        </span>
                                <span :style="item.order_status=='待审核'?'color:blue':item.order_status=='审核通过'?'color:#18c318':item.order_status=='被退回'?'color:#e4a821':'color:red'">
                           ({{item.order_status}}) 
                        </span>
                            </div>
                        </div>
                        <div class="SDtable2">
                            <span class="SDtable3">合同类型: {{item.order_type}}</span>
                            <span class='table4Teacher'>试听老师: {{item.baoming_teach=='无老师'?'无':item.baoming_teach}}</span>
                            <span class="SDtable3">签约时间: {{item.created}}</span></div>
                    </div>
                    <div class="SDtable4">
                        <el-table :data="item.dataTable" border>
                            <el-table-column prop="title" label="课程">
                            </el-table-column>
                            <el-table-column prop="curse_price_num" label="课时" width='80'>
                            </el-table-column>
                            <el-table-column prop="course_curr_num" label="剩余课时" width='80'>
                            </el-table-column>
                            <el-table-column prop="classTime" label="排班管理">
                                <template scope="scope">
                                    <span v-if="scope.row.classTime">{{scope.row.classTime}}</span>
                                    <!-- <img class='imgEdit' src="../../../static/img/editClass.png" width='16' alt="" @click='arrangeClass(scope.row)'> -->
                                    <span v-else-if="!scope.row.classTime&&scope.row.course_curr_num!=0&&code.includes('_c')" class='arrangeClass22' >还未排班</span>
                                    <span v-else-if="!scope.row.classTime&&scope.row.course_curr_num!=0" class='arrangeClass' @click='arrangeClass(item,scope.row)'>立即排班</span>
                                    <span v-else-if='!scope.row.classTime&&scope.row.course_curr_num==0'>无</span>
                                </template>
                            </el-table-column>
                            <el-table-column prop="expired" label="有效期">
                                <template scope="scope">
                                    <span>{{scope.row.expired[0].substring(0,10)}}~{{scope.row.expired[1].substring(0,10)}}</span>
                                </template>
                            </el-table-column>
                            <el-table-column prop="status" label="课程状态" column-key='status' width='80'>
                                <template scope="scope">
                                    <span :style="scope.row.status=='正常'? 'color:black' : scope.row.status=='冻结'? 'color:#50bfff':'color:#dba31c'">{{scope.row.status}}</span>
                                </template>
                            </el-table-column>
                        </el-table>
                    </div>
                    <!-- <div class='table4Record1'>
                        <div class='table4RecordTitle'>抵换记录</div>
                        <div class="table4RecordContent">用于抵扣</div>
                        <div class='table4RecordO'>操作人</div>
                        <div class='table4RecordO'>操作日期</div>
                    </div>
                    <div class='table4Record2'>
                        <div class="table4RecordTitle">冻结记录</div>
                        <div class="table4RecordContent">用于抵扣</div>
                        <div class='table4RecordO'>操作人</div>
                        <div class='table4RecordO'>操作日期</div>
                    </div>
                    <div class="table4Record3">
                        <div class="table4RecordTitle">解冻记录</div>
                        <div class="table4RecordContent">用于抵扣
                        </div>
                        <div class='table4RecordO'>操作人</div>
                        <div class='table4RecordO'>操作日期</div>
                    </div>
                    <div class="table4Record4">
                        <div class="table4RecordTitle">转班记录</div>
                        <div class="table4RecordContent">用于抵扣
                        </div>
                        <div class='table4RecordO'>操作人</div>
                        <div class='table4RecordO'>操作日期</div>
                    </div> -->
                </div>
            </div>
        </div>
        <!-- 修改学员资料 -->
        <el-dialog title="修改学员资料" :visible.sync="dialogFormVisibleSign" :close-on-click-modal="no" top='8%' id='signDialog' @close="resetD('signform')">
            <el-form :model="signform" :rules='Confirmrule' ref="signform" label-width="80px">
                <el-form-item label="学生姓名" prop='names'>
                    <el-input v-model="signform.names" placeholder='请输入学生姓名' class="SDw142"></el-input>
                </el-form-item>
                <el-form-item label="性别" prop='sex'>
                    <el-select v-model="signform.sex" placeholder="请选择性别" class="SDw142">
                        <el-option label="男" value="1"></el-option>
                        <el-option label="女" value="2"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="身份证号" prop='id_number'>
                    <el-input v-model="signform.id_number" placeholder='请输入身份证号' style="width:193px"></el-input>
                </el-form-item>
                <el-form-item label="出生日期" prop='birthday'>
                    <el-date-picker v-model="signform.birthday" type="date" placeholder="选择日期" class="SDw142" :picker-options="pickerOptions1">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="登录密码" prop='pass'>
                    <p class="SDml10">{{signform.birthday?getNowFormatDate(signform.birthday):''}}</p>
                </el-form-item>
                <el-form-item label="联系家长" required>
                    <el-form-item prop="parent" class="SD142float">
                        <el-input v-model="signform.parent" placeholder='请输入家长姓名'></el-input>
                    </el-form-item>
                    <el-form-item prop="con" class="SD142float">
                        <el-select v-model="signform.con" placeholder="请选择关系">
                            <el-option label="妈妈" value="妈妈"></el-option>
                            <el-option label="爸爸" value="爸爸"></el-option>
                            <el-option label="爷爷" value="爷爷"></el-option>
                            <el-option label="奶奶" value="奶奶"></el-option>
                            <el-option label="外公" value="外公"></el-option>
                            <el-option label="外婆" value="外婆"></el-option>
                            <!--  <el-option :label="connect" value="1"></el-option>
      <el-option :label="connect1" value="0"></el-option> -->
                        </el-select>
                    </el-form-item>
                    <el-form-item prop="phone" class='SDfloat'>
                        <el-input v-model="signform.phone" placeholder='请输入手机号' :maxlength='maxlength'></el-input>
                    </el-form-item>
                </el-form-item>
                <el-form-item label="">
                    <el-form-item prop="parent1" class="SD142float">
                        <el-input v-model="signform.parent1" placeholder='请输入家长姓名'></el-input>
                    </el-form-item>
                    <!-- <div style='position:absolute;color:#ff4949;bottom:-26px;font-size:12px;left:184px' v-if="secondRule">第二家长信息如若填写,必须填写完全,不然将不予保存</div> -->
                    <el-form-item prop="con1" class="SD142float">
                        <el-select v-model="signform.con1" clearable placeholder="请选择关系">
                            <el-option label="妈妈" value="妈妈"></el-option>
                            <el-option label="爸爸" value="爸爸"></el-option>
                            <el-option label="爷爷" value="爷爷"></el-option>
                            <el-option label="奶奶" value="奶奶"></el-option>
                            <el-option label="外公" value="外公"></el-option>
                            <el-option label="外婆" value="外婆"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item prop="phone1" class="SDfloat">
                        <el-input v-model="signform.phone1" placeholder='请输入手机号' :maxlength='maxlength'></el-input>
                    </el-form-item>
                    <el-col :span="2">
                        <span class="SDaltergrey"> (选填)</span>
                    </el-col>
                </el-form-item>
                <el-form-item label="就近校区" prop='school_id' class="SDmb5">
                    <!-- <el-select v-model="signform.school_id" placeholder="请选择校区" style="width:142px">
                        <el-option v-for="item in schoolsNear" :key="item.id" :label="item.title" :value="item.id">
                        </el-option>
                    </el-select> -->
                    <p>{{student.school}}</p>
                </el-form-item>
                <el-form-item label="来源渠道" prop='sour_id' class="SDmb5">
                    <p>{{student.channel}}</p>
                    <div v-if='student.sour_id==4'>介绍人:{{student.referral_name}} 老师:{{student.teach_name}}</div>
                    <!-- <div  id='sourceDiv' style="height:40px;float: left;" :class='{readd:isread}' >
                    
                    <el-form-item prop='sour_id' style="width:142px;margin-right:30px;float:left">
                        <el-cascader :options="source" :props="propsource" v-model="signform.sour_id" :show-all-levels="false" placeholder="请选择渠道" ref="source" editable="false" >
                        </el-cascader>
                    </el-form-item>
                </div>
                    <el-form-item prop='referee' style='float:left;width:142px;margin-right:10px'>
                        <el-autocomplete v-if='this.signform.sour_id == 4' v-model="form.referee" :fetch-suggestions="querySearchAsync" placeholder="请输入内容" @select="handleSelect">
                        </el-autocomplete>
                    </el-form-item>
                    <el-form-item prop='familys_name' style='float:left;width:100px;'>
                        <span v-if='this.signform.sour_id == 4'>家长姓名:{{signform.familys_name}}</span>
                    </el-form-item>
                    <el-form-item prop='referral_uid' style="display:none">
                        <span>{{signform.referral_uid}}</span>
                    </el-form-item>
                    <el-form-item prop='familys' style="display:none">
                    </el-form-item>
                    <span v-if='nostudent' style="width:200px;color:red;float:left"> {{warning}}</span> -->
                </el-form-item>
                <el-form-item label="CC" prop='cc' class="SDmb5">
                    <p>{{student.cc_name}}</p>
                </el-form-item>
                <!-- <el-form-item label="电话销售" prop='tmk' style='margin-bottom:5px'>
                    <p>{{userName}}</p>
                </el-form-item> -->
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="nextToSign('signform')">确定</el-button>
                <el-button @click="dialogFormVisibleSign = false">取消</el-button>
            </div>
        </el-dialog>
        <!-- 填写合同 -->
        <el-dialog title="填写合同内容" :visible.sync="dialogFormVisible3" :close-on-click-modal="no" top='7%' show-close class='signContactDialog'
            @close="resetAll('actSchool')">
            <el-form :model="actSchool" id='actSchool1' :rules='ruleActSchool' ref="actSchool">
                <div class="SDstitle">
                    <div class="SDstitle1">课程</div>
                    <div v-for='item in this.tableTitle' :class="[item!='优惠类型'?item=='转课补费额'?'eee':'ccc':'ddd']">{{item}}</div>
                </div>
                <div class="signContractA">
                    <div class='signContractTitle'>
                        <div v-for='i in contracts' class='signContractDiv'>
                            <div class="signContactDivTitle">
                                <div>
                                    <el-select v-model="i.kc_tid" clearable placeholder="课程类型" size='small' class='SDw103' @change='getClassName(i.kc_tid,i)'>
                                        <el-option v-for="item in classkind" :key="item.kc_tid" :label="item.kc_tname" :value="item.kc_tid">
                                        </el-option>
                                    </el-select>
                                </div>
                                <div class="SDml10">
                                    <el-select v-model="i.course_id" clearable placeholder="课程名称" size='small' class='SDw123' @change='getPrice(i,i.course_id)'>
                                        <el-option v-for="item in i.courseName1" :key="item.kcid" :label="item.title" :value="item.kcid">
                                        </el-option>
                                    </el-select>
                                </div>
                            </div>
                            <div class="signContactDiv">
                                <span>{{i.year_num}}</span>
                            </div>
                            <div class="signContactDiv">
                                <span>{{i.head_count}}</span>
                            </div>
                            <div class="signContactDiv">
                                <span>{{i.tuition_price}}</span>
                            </div>
                            <div class="signContactDiv">
                                <span>{{i.teaching_price}}</span>
                            </div>
                            <div class="signContactDiv">
                                <span>{{i.book_price}}</span>
                            </div>
                            <!-- <div style="text-align:center;background:#f3f3f3;flex:0 0 66px;display:flex;border-right:1px solid gainsboro;border-bottom:1px solid gainsboro;justify-content:center;align-items: center;">
                                <span>{{i.study_money}}</span>
                            </div> -->
                        </div>
                    </div>
                    <!--  <div style="background:#ffffff;text-align:center;border-right:1px solid gainsboro;border-bottom:1px solid gainsboro;flex:0 0 66px;display:flex;flex-direction: column;justify-content: center;height:auto">{{totalP}}</div> -->
                    <!-- 总额用法 -->
                    <div class="signContactCoupons">
                        <el-select v-model="coupons" clearable multiple placeholder="请选择" size='mini' class="SD131">
                            <el-option v-for="item in couponsList" :key="item.id" :label="item.title" :value="item.id">
                            </el-option>
                        </el-select>
                    </div>
                    <div class='signContactMoney'>
                        <div v-for='i in contracts' class='signContactMoneyDiv'>
                            <div class="signContactCouponsDiv">
                                <el-input v-model="i.coupons_money" class='promotionMoney'></el-input>
                            </div>
                        </div>
                    </div>
                    <!--  <div style="background:#ffffff;text-align:center;border-right:1px solid gainsboro;border-bottom:1px solid gainsboro;flex:0 0 66px;display:flex;flex-direction: column;justify-content: center;height:auto">{{totalP2}}</div> -->
                    <!-- 总额用法 -->
                    <!--   <div style="line-height:40px;width:66px;display:flex;align-items:stretch;;flex-wrap:wrap">
                        <div v-for='i in contracts' style='font-size:14px;display:flex;flex: 0 0 66px;' class='lessonhover'>
                            <div style="text-align:center;background:#f3f3f3;border-right:1px solid gainsboro;border-bottom:1px solid gainsboro;flex:0 0 66px;display:flex; justify-content:center;align-items: center;">
                                <span>{{i.study_money-i.coupons_money}}</span>
                            </div>
                        </div>
                    </div> -->
                    <div class="signContactzhuan" v-if='this.step=="changtobuy"'>{{multipleSelection.toFixed(2)}}</div>
                    <div class="signContactPay">{{totalP3}}</div>
                    <!-- 总额用法 -->
                    <div class="signContactPayDiv">
                        <div v-for='(i,index) in contracts' class='signContactMoneyDiv'>
                            <div class="signContactCouponsDiv">
                                <el-button type="text" size="small" @click="addCon(index)" :style="{color: index==0?'#1fb5ad':'red'}" v-if='index==0'>添加课程</el-button>
                                <el-button type="text" size="small" @click="delCon(index)" :style="{color: index==0?'#1fb5ad':'red'}" v-if='index!=0'>删除</el-button>
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                        <!-- <div label="抵扣的转课补费额:" v-if="step=='changtobuy'" style='color:#1fb5ad;font-size:15px'>
                             <span style='color:#1fb5ad;font-size:15px;margin-bottom:20px;display:inline-block'>抵扣的转课补费额:</span>   {{multipleSelection.toFixed(2)}}元
                        </div> -->
                    <el-form-item label="合同编号" prop='sku'>
                        <el-input v-model="actSchool.sku" placeholder='请输入合同编号' class="SDw142"></el-input>
                    </el-form-item>
                    <!-- <el-form-item label="试听老师" prop='teacher_uid'>
                        <el-select v-model="actSchool.teacher_uid" placeholder="试听老师" style="width:142px">
                            <el-option v-for="item in teachersName" :key="item.aid" :label="item.uname" :value="item.aid">
                            </el-option>
                        </el-select>
                    </el-form-item> -->
                    <el-form-item label="熊猫到家" prop='panda_gohome'>
                        <el-select v-model="actSchool.panda_gohome" placeholder="请选择" class="SDw142">
                            <el-option label="有" value="1"></el-option>
                            <el-option label="无" value="0"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="付款方式" class="SDpr" required>
                        <div v-for="(a, index) in actSchool.pay" :class="[index !=0?'male':'']">
                            <el-form-item prop="method" class='SD142float'>
                                <el-select v-model="a.method" placeholder="请选择方式" @change='changeReset'>
                                    <el-option v-for="item in payMethods" :key="item.id" :label="item.name" :value="item.id">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item prop="money" class="SDfloat">
                                <el-input v-model.number="a.money" placeholder='请输入金额'></el-input>
                            </el-form-item>
                            <span @click='addPay' class='addPay' v-if='index==0'>添加付款方式</span>
                            <span @click='deletePay' class='deletePay' v-else>删除</span>
                            <div style="clear:both"></div>
                        </div>
                    </el-form-item>
                   
                    <el-form-item label="付款总额" prop='money'>
                        {{payTotal.toFixed(2)}}元
                        <span v-if='this.payTotal+(this.multipleSelection-0) != this.totalP3' class="SDnred">*付款总额与实收总额不符*</span>
                    </el-form-item>
                    <!-- <el-form-item label="签约时间" prop='created'>
                        <el-date-picker v-model="actSchool.created" type="date">
                        </el-date-picker>
                    </el-form-item> -->
                </div>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button v-if="step=='rebuy'" @click="dialogFormVisible3=false">取消</el-button>
                <el-button v-else @click="backTolast">上一步</el-button>
                <el-button type="primary" @click="submitCon('actSchool')">提交</el-button>
                <br>
            </div>
        </el-dialog>
        <!-- 选择性排班 -->
        <el-dialog title="合同课程排班" :visible.sync="dialogFormVisibleLast" :close-on-click-modal="no" top='7%' show-close @close="resetClass('art')">
            <el-tabs v-model="activeName">
                <el-tab-pane v-for='(item,index) in tabClass' :name='item.number'>
                    <span slot="label"><i class="el-icon-star-on" v-if="item.isR=='yes'"></i> {{item.name}}</span>
                    <el-form :model="art[index]" :ref="artName[index]" :rules='artRules' label-width="80px">
                        <el-form-item label="开课日期" prop='time'>
                            <el-date-picker v-model="art[index].time" type="date" @change='getClassRoomByTime(art[index].time,index,item)'>
                            </el-date-picker>
                        </el-form-item>
                        <el-form-item prop='syllabus_id' class='selectClass SDselect'>
                            <el-radio-group v-model="art[index].syllabus_id" @change='radioChange'>
                                <el-radio :label="item.id" class="SDtu" v-for='item in selectionClass1[index]'>
                                    <span class="SDm30">{{item.week==1?'周一':item.week==2?'周二':item.week==3?'周三':item.week==4?'周四':item.week==5?'周五':item.week==6?'周六':'周日'}}  {{item.class_time.substring(0,5)}}
                        </span>
                                    <span class="SDm30">{{item.teacher?item.teacher.uname:''}}</span><span>{{item.class_room.names+'(当前班级'+item.syllabus_person_num+'人)' }}
                        </span>
                                </el-radio>
                            </el-radio-group>
                        </el-form-item>
                    </el-form>
                </el-tab-pane>
            </el-tabs>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisibleLast=false">取消</el-button>
                <el-button type="primary" @click="submitTheContract('art')">提交</el-button>
                <br>
            </div>
        </el-dialog>
        <!-- 立即排班按钮 -->
        <el-dialog :title="arrangeTitle" :visible.sync="dialogFormVisibleArrange" :close-on-click-modal="no" top='7%' show-close>
            <el-form :model="arrange" ref="arrange" :rules='arrangeRules' label-width="80px">
                <el-form-item label="开课日期" prop='time'>
                    <el-date-picker v-model="arrange.time" type="date" @change='getClassRoomArrange(arrange.time)'>
                    </el-date-picker>
                </el-form-item>
                <el-form-item prop='syllabus_id' class='selectClass SDselect'>
                    <el-radio-group v-model="arrange.syllabus_id">
                        <el-radio :label="item.id" class="SDtu" v-for='item in selectionClassArrange'>
                            <span class="SDm30">{{item.week==1?'周一':item.week==2?'周二':item.week==3?'周三':item.week==4?'周四':item.week==5?'周五':item.week==6?'周六':'周日'}}  {{item.class_time.substring(0,5)}}
                        </span>
                            <span class="SDm30">{{item.teacher?item.teacher.uname:''}}</span><span>{{item.class_room.names+'(当前班级'+item.syllabus_person_num+'人)' }}
                        </span>
                        </el-radio>
                    </el-radio-group>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisibleArrange=false">取消</el-button>
                <el-button type="primary" @click="submitTheArrange()">提交</el-button>
                <br>
            </div>
        </el-dialog>
        <!-- 回访记录 -->
        <div id='communityTitle'>
            <div class='communityTitle'>
                <!--  <i class=el-icon-my-tongxunlu style="font-size:31px"></i> -->
                <span class="SDct1">回访记录({{number}})</span>
                <div class="SDct2">
                    <div class='addR' @click='addComm' v-if="!code.includes('_c')"></div>
                </div>
            </div>
            <div class="SDct3">
                <el-row v-for='item in items' class='listUser'>
                    <el-col :span="1" class="SDct5">
                        <img :src="item.tmk.avatar" width='50' height='50' alt="" class="SDct4"></el-col>
                    <el-col :span="22">
                        <div class="SDct6">
                            <div class="SDct7">{{item.tmk.uname}}</div>
                            <div class="SDct8">{{item.created_at.substring(5,16)}}</div>
                        </div>
                        <div>
                            <div class="SDct9">{{item.contents}}</div>
                        </div>
                        <div>
                            <div class="SDct10">
                                <el-tag type='success' v-for='t in item.tags' class='tagTag'>{{t}}</el-tag>
                            </div>
                            <div class='editSpan' @click='editReturn(item.id,item)' v-if="new Date().getTime()-new Date(item.created_at).getTime()<7200000 && item.tmk.uname == userName"></div>
                        </div>
                    </el-col>
                </el-row>
            </div>
            <div class="block" v-if="this.total!=0">
                <el-pagination layout="prev, pager, next" :total="total" :current-page="currentPage" :page-size="pagesize" @current-change="handleCurrentChange">
                </el-pagination>
            </div>
        </div>
        <!-- 添加回访记录 -->
        <el-dialog :title="communityTitle" :visible.sync="dialogFormVisible" :close-on-click-modal="no" size='tiny' show-close class='CDDialog'
            @close="resetD('returnform')">
            <el-form :model="returnform" id='detailForm' :rules='rulereturnform' ref="returnform">
                <el-form-item label="" prop='contents'>
                    <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}" placeholder="请输入内容(100字以内)" v-model="returnform.contents">
                    </el-input>
                </el-form-item>
                <el-form-item label="回访标签(选填)：" class="SDmt10">
                    <br>
                    <el-checkbox-group v-model="returnform.tags">
                        <el-checkbox v-for="box in boxes" :label="box.key" :value='box.key'>
                            <el-tag type='success'>{{box.label}}</el-tag>
                        </el-checkbox>
                    </el-checkbox-group>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="commuFormSubmit('returnform')">确 定</el-button>
                <el-button @click="dialogFormVisible = false">取 消</el-button>
            </div>
        </el-dialog>
    </div>
</template>
<script>
    var token, user
    import {
        assignClass,
        getRefund,
        tagList,
        getMyStudentLessonDetail,
        campusList,
        put_student,
        getAllCCList,
        getClassLibrary,
        getTeacherList,
        getClassKind,
        getLessonDetail,
        getPromotionList,
        getDateClass,
        returnVisitDetail,
        getMyStudentSign,
        getVisitList,
        signThreeContract,
        put_returnList,
        create_returnList,
        getRemainMoney,
        transferSchool,
        transferClass,
        frozenClass,
        searchResource
    } from '../../api/api';

    export default {
        data() {
            // var moreOne = (rule, value, callback) => {
            //     if (value.length == 0) {
            //         callback('请选择日期')
            //     } else if (new Date(value[1]) - new Date(value[0]) < 2592000000) {
            //         callback('冻结最少为期一个月');
            //     } else {
            //         callback();
            //     }
            // }
            var nan = (rule, value, callback) => {
                if (value === '') {
                    callback('请选择')
                } else if (typeof value == 'number') {
                    callback();
                }
            }
            var isName = (rule, value, callback) => {
                var myreg = /^[\u4e00-\u9fa5a-zA-Z]+$/;
                if (value == '') {
                    callback('请输入学生姓名')
                } else if (!myreg.test(value)) {
                    callback('请输入有效的学生姓名');
                } else {
                    callback();
                }
            }
            var isPName = (rule, value, callback) => {
                var myreg = /^[\u4e00-\u9fa5a-zA-Z]+$/;
                if (value == '') {
                    callback('请输入家长姓名')
                } else if (!myreg.test(value)) {
                    callback('请输入有效的家长姓名');
                } else {
                    callback();
                }
            }
            var isPName1 = (rule, value, callback) => {
                var myreg = /^[\u4e00-\u9fa5a-zA-Z]+$/;
                if (value == '') {
                    callback()
                } else if (!myreg.test(value)) {
                    callback('请输入有效的家长姓名');
                } else {
                    callback();
                }
            }
            // var isValue = (rule, value, callback) => {
            //     if (value === '') {
            //         callback('请选择')
            //     } else if (typeof value == 'number') {
            //         callback();
            //     }
            // }
            var isArr = (rule, value, callback) => {
                if (Array.isArray(value) && value[0]) {
                    callback();
                } else {
                    callback('请选择日期')
                }
            }
            var isPhone = (rule, value, callback) => {
                var myreg = /^(((1[0-9]{1}))+\d{9})$/;
                if (value == '') {
                    callback('不能为空且必须唯一')
                } else if (!myreg.test(value)) {
                    callback('请输入有效手机号');
                } else {
                    callback()
                }
            }
            var isPhone1 = (rule, value, callback) => {
                var myreg = /^(((1[0-9]{1}))+\d{9})$/;
                if (value == '') {
                    callback()
                } else if (!myreg.test(value)) {
                    callback('请输入有效手机号');
                }else if(this.signform.phone==value){
callback('不要输入重复的手机号');
}else {
let para = {
search: value
}
searchResource(para, token).then(res => {
if(res.data.length!=0){
callback('此手机号码已存在');
}else{
callback();

}
})
}
            }
            var isId = (rule, value, callback) => {
                var myreg =
                    /(^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$)|(^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{2}$)/;
                if (value == '') {
                    callback()
                } else if (!myreg.test(value)) {
                    callback('请输入有效的身份证号');
                } else {
                    callback();
                }
            }
            var isPay = (rule, value, callback) => {
                let a = this.actSchool.pay.every(item => {
                    return item.method != ''
                })
                if (!a) {
                    callback('请选择支付方式')
                } else {
                    callback();
                }
            }
            var numAndEng = (rule, value, callback) => {
                var myreg = /^[a-zA-Z0-9]+$/;
                if (value == '') {
                    callback('请输入合同编号')
                } else if (!myreg.test(value)) {
                    callback('请输入有效合同编号');
                } else {
                    callback();
                }
            }
            var isSpace = (rule, value, callback) => {
                var myreg = /^\S{1,100}$/;
                if (value.trim() == '') {
                    callback('内容不得为空')
                } else if (!myreg.test(value)) {
                    callback('内容不得超过100字');
                } else {
                    callback();
                }
            }
            //  var isMoney = (rule, value, callback) => {
            //     let a= 0
            //     this.actSchool.area_id.map(item=>{
            //         a += item.money
            //     })
            //     if (a != this.totalP3) {
            //         callback('付款总额与实收总额不等')
            //     }else{
            //         callback();
            //     }
            // }
            return {
                maxlength:11,
                pickerOptions1: {
                    disabledDate(time) {
                        return time.getTime() > Date.now() ;
                    }
                },
                continueClass1: [],
                listCC: [],
                contClass: [],
                allClass: [],
                total1: 0,
                currentPage1: 1, //页数
                pagesize1: 8, //默认每页
                arrangeTitle: '',
                coupons: [],
                couponsList: [],
                teachersName: [],
                classkind: [],
                lessonData: [],
                refun: {
                    refundment_scale: '',
                    sale_scale: '',
                    base_total: '',
                    manage_money: '',
                    sign_up_money: '',
                    teaching_money: '',
                    book_money: '',
                    give_money: '',
                    grand_total: '',
                    item: [{
                        course_name: '',
                        money_amount: '',
                        class_hour: '',
                        consuming_hour: ''
                    }]
                },
                value1: '',
                valueR: '',
                students: [{
                    dataTable: [],
                    sku: ''
                }, {
                    dataTable: [],
                    sku: ''
                }, {
                    dataTable: [],
                    sku: ''
                }],
                tableData: [],
                artName: ['art0', 'art1', 'art2', 'art3', 'art4'],
                tabClass: [],
                selectionClass1: ['', '', '', '', ''],
                selectionClassArrange: [],
                activeName: '1',
                art: [{
                    time: '',
                    syllabus_id: ''
                }, {
                    time: '',
                    syllabus_id: ''
                }, {
                    time: '',
                    syllabus_id: ''
                }, {
                    time: '',
                    syllabus_id: ''
                }, {
                    time: '',
                    syllabus_id: ''
                }],
                arrange: {
                    time: '',
                    syllabus_id: ''
                },
                addConi: 0,
                contracts: [{
                    kc_tid: '',
                    course_id: '',
                    year_num: '',
                    head_count: '',
                    tuition_price: '',
                    teaching_price: '',
                    book_price: '',
                    study_money: '',
                    coupons_money: '',
                    courseName1: []
                }],
                // tableTitle: ['课时', '签单数', '学费', '教材费', '书本费', '优惠类型', '优惠金额', '转课补费额','实收总额', '操作'],
                // tableTitle1: ['课时', '签单数', '学费', '教材费', '书本费', '优惠类型', '优惠金额','实收总额', '操作'],
                inviteForm: {
                    value1: '',
                    teacher: '',
                    class: ''
                },
                boxes: [],
                dialogFormVisibleInvite: false,
                dialogFormVisibleSign: false,
                userName: '',
                loading: false,
                student: {
                    name: '',
                    sex: '',
                    id_number: '',
                    age: '',
                    parent: '',
                    parent_phone: '',
                    parent1: '',
                    parent1_phone: '',
                    channel: '',
                    fullAddress:'',
                    school: '',
                    time: '',
                    teacher: ''
                },
                items: [],
                dialogFormVisible: false,
                dialogFormVisible2: false, //设置客户无需求
                dialogFormVisible3: false, //填写合同内容
                dialogFormVisibleLast: false,
                dialogFormVisibleArrange: false,
                no: false,
                number: 0,
                returnform: {
                    contents: '',
                    tags: []
                },
                rulereturnform: {
                    contents: [{
                        required: true,
                        validator: isSpace,
                        // message: '请输入内容',
                        trigger: 'blur'
                    }],
                },
                actSchool: {
                    sku: '',
                    // teacher_uid: '',
                    panda_gohome: '',
                    pay: [{
                        method: '',
                        money: ''
                    }],
                    created: '',

                },
                currentPage: 1, //页数
                pagesize: 4, //默认每页
                total: 0,
                signform: {
                    names: '',
                    sex: '',
                    id_number: '',
                    birthday: '',
                    parent: '',
                    parent1: '',
                    con: '',
                    con1: '',
                    phone: '',
                    phone1: '',
                    familys: '',
                },
                in: '',
                code: '',
                backData: '', //备份第一步数据
                backContract: '', //备份第二步数据
                backactSchool: '', //备份第二步数据
                backClass: '', //备份第三步数据
                ruleActSchool: {
                    sku: [{
                        required: true,
                        validator: numAndEng,
                        // message: '请输入合同编号',
                        trigger: 'blur'
                    }, ],
                    // teacher_uid: [{
                    //     required: true,
                    //     validator: nan,
                    //     message: '请选择试听老师',
                    //     trigger: 'change'
                    // }],
                    panda_gohome: [{
                        required: true,
                        message: '请选择是否有熊猫到家',
                        trigger: 'change'
                    }],
                    method: [{
                        required: true,
                        validator: isPay,
                        trigger: 'change'
                    }],
                    // money: [{
                    //     required: true,
                    //     message:'请输入金额',
                    //     validator: all,
                    //     trigger: 'blur'
                    // }],
                    // created: [{
                    //     required: true,
                    //     type: 'date',
                    //     message: '请选择签约时间',
                    //     trigger: 'change'
                    // }],
                },
                Confirmrule: {
                    names: [{
                        required: true,
                        // message: '请输入姓名',
                        validator: isName,                        
                        trigger: 'blur'
                    }, ],
                    sex: [{
                        required: true,
                        message: '请选择性别',
                        trigger: 'change'
                    }],
                    id_number: [{
                        // required: true,
                        validator: isId,
                        trigger: 'blur'
                    }],
                    birthday: [{
                        required: true,
                        type: 'date',
                        message: '请选择出生年月',
                        trigger: 'blur'
                    }],
                    parent: [{
                        required: true,
                        // message: '请输入家长姓名',
                        validator: isPName,
                        trigger: 'blur'
                    }],
                    parent1: [{
                        // message: '请输入家长姓名',
                        validator: isPName1,
                        trigger: 'blur'
                    }],
                    con: [{
                        required: true,
                        message: '请选择关系',
                        trigger: 'change'
                    }],
                    phone: [{
                        required: true,
                        validator: isPhone,
                        trigger: 'blur'
                    }],
                    phone1: [{
                        validator: isPhone1,
                        trigger: 'blur'
                    }],
                    city_id: [{
                        required: true,
                        validator: nan,
                        trigger: 'blur'
                    }],
                    area_id: [{
                        required: true,
                        validator: nan,
                        trigger: 'blur'
                    }],
                    address: [{
                        required: true,
                        trigger: 'blur'
                    }],
                },
                artRules: {
                    time: [{
                        // required: true,
                        // validator: isValue,
                        message: '请选择开课时间',
                        type: 'date',
                        trigger: 'blur'
                    }],
                    // syllabus_id: [{
                    //     // required: true,
                    //     message: '请选择开课班级',
                    //     validator: nan,
                    //     trigger: 'change'
                    // }],
                },
                arrangeRules: {
                    time: [{
                        required: true,
                        message: '请选择开课时间',
                        type: 'date',
                        trigger: 'change'
                    }],
                    // syllabus_id: [{
                    //     required: true,
                    //     message: '请选择开课班级',
                    //     validator: nan,
                    //     trigger: 'change'
                    // }],
                },
                // transferOrUp: '',
                step: '',
                dialogFormVisibleFirst: false,
                dialogFormVisibleRefund: false,
                dialogFormVisibleFroze: false,
                dialogFormVisibleTransferSchool: false,
                dialogFormVisibletransferOrUp: false,
                dialogFormVisiblechangtobuy: false,
                dialogFormVisibleContinue: false,
                firstform: {
                    contract: ''
                },
                options: [],
                firstformrule: {
                    contract: [{
                        required: true,
                        message: '请选择相应合同',
                        validator: nan,
                        trigger: 'change'
                    }],
                },
                frozeform: {
                    // class: '',
                    Ftime: '',
                },
                frozeformrule: {
                    // class: [{
                    //     required: true,
                    //     message: '请选择课程',
                    //     trigger: 'change'
                    // }],
                    Ftime: [{
                        required: true,
                        // type:'date',
                        validator: isArr,
                        trigger: 'change'
                    }],
                },
                transferSchoolform: {
                    school: '',
                    receiveCC: '',
                },
                transferSchoolformrule: {
                    school: [{
                        required: true,
                        message: '请选择课程',
                        validator: nan,
                        trigger: 'change'
                    }],
                    receiveCC: [{
                        required: true,
                        message: '请选择CC',
                        validator: nan,
                        trigger: 'change'
                    }],
                },
                transferOrUpform: {
                    class: '',
                    school: '',
                    time: '',
                    syllabus_id: ''
                },
                transferOrUpformrule: {
                    class: [{
                        required: true,
                        message: '请选择课程',
                        validator: nan,
                        trigger: 'change'
                    }],
                    school: [{
                        required: true,
                        message: '请选择课程',
                        validator: nan,
                        trigger: 'change'
                    }],
                    time: [{
                        required: true,
                        message: '请选择开课时间',
                        type: 'date',
                        trigger: 'change'
                    }],
                    syllabus_id: [{
                        required: true,
                        message: '请选择开课班级',
                        validator: nan,
                        trigger: 'change'
                    }],
                },
                continueform: {
                    contract: '',
                    title: ''
                },
                continueformrule: {
                    contract: [{
                        required: true,
                        message: '请选择合同',
                        validator: nan,
                        trigger: 'change'
                    }],
                    title: [{
                        required: true,
                        message: '请选择课程',
                        validator: nan,
                        trigger: 'change'
                    }]
                },
                receiveSchool: [],
                optionsCC: [],
                classIndex: 0,
                selectionClass: [],
                multipleSelection: 0,
                arrangeCourseId: '',
                arrangeOrderId: '',
                selectArr: [],
                contractNumber: 0,
                transClass: [],
                stopchange: false,
                pickerOptions0: {
                    disabledDate(time) {
                        return time.getTime() < Date.now() - 8.64e7;
                    }
                },
            }
        },
        methods: {
            getTransClass(i) { //转升班
                this.transferOrUpform.school = '';
                // console.log(i)
                if (i !== '') {

                    let para = {
                        pid: this.students[this.classIndex].dataTable[i].kc_tid,
                        simple: 1
                    }
                    getClassLibrary(token, para).then(res => {
                        this.transClass = res.data
                    })
                }
                // this.transClass = 
            },
            goToContract(id) {
                this.$router.push('/contractDetail/' + id + '/' + this.$route.params.uid);
            },
            getCC() {
                let para = {
                    school_id: this.transferSchoolform.school
                }
                getAllCCList(token, para).then((res) => {
                    this.listCC = res.data.filter(item => {
                        return item.uname != JSON.parse(user).uname
                    });
                })
            },
            forzenSubmit() { //冻结提交
                this.$refs['frozeform'].validate((valid) => {
                    if (valid) {
                        let para = {
                            order_item_id: this.students[this.classIndex].order_id,
                            // course_id: this.frozeform.class,
                            start_time: new Date(this.frozeform.Ftime[0]).toLocaleDateString(),
                            end_date: new Date(this.frozeform.Ftime[1]).toLocaleDateString(),
                        }
                        frozenClass(para, token).then(res => {
                            if (res.code == 0) {
                                this.$message.success('冻结成功');
                                let para = {
                                    uid: this.$route.params.uid
                                }
                                getMyStudentLessonDetail(token, para).then(res => { //合同课程
                                    if (res.data.length != 0) {

                                        this.contractNumber = res.data.length
                                        this.students = res.data
                                    } else {
                                        this.students = [{
                                            dataTable: [],
                                            sku: ''
                                        }]
                                    }
                                    // console.log(res)
                                }).then(() => {
                                    this.dialogFormVisibleFroze = false;
                                })
                            } else {
                                this.$message.error(res.data)

                            }
                        })
                    }
                })
            },
            clearTime() {
                this.selectionClass = [];
                this.transferOrUpform.time = '';
                this.transferOrUpform.syllabus_id = '';
            },
            transferToClass() { //转班提交
                this.$refs['transferOrUpform'].validate((valid) => {
                    if (valid && this.transferOrUpform.syllabus_id) {
                        let para = {
                            // order_id: this.students[this.classIndex].order_id,

                            order_item_id: this.students[this.classIndex].dataTable[this.transferOrUpform.class]
                                .order_item_id, //选择的课程名
                            trans_id: this.transferOrUpform.school, //转班的课程id
                            time: new Date(this.transferOrUpform.time).toLocaleDateString(),
                            syllabus_id: this.transferOrUpform.syllabus_id
                        }
                        transferClass(para, token).then(res => {
                            if (res.code == 0) {
                                this.$message.success('转班成功');
                                let para = {
                                    uid: this.$route.params.uid
                                }
                                getMyStudentLessonDetail(token, para).then(res => { //合同课程
                                    if (res.data.length != 0) {

                                        this.contractNumber = res.data.length
                                        this.students = res.data
                                    } else {
                                        this.students = [{
                                            dataTable: [],
                                            sku: ''
                                        }]
                                    }
                                    // console.log(res)
                                }).then(() => {
                                    this.dialogFormVisibletransferOrUp = false;
                                })
                            } else {
                                this.$message.error(res.data)
                            }
                            // console.log(res)
                        })
                    } else {
                        this.$message.info('还有项目未填写');
                    }
                })

                // console.log(para)
            },
            transferSchoolToCC() { //转校提交
                this.$refs['transferSchoolform'].validate((valid) => {
                    if (valid) {
                        let para = {
                            uid: this.$route.params.uid,
                            school_id: this.transferSchoolform.school,
                            cc_uid: this.transferSchoolform.receiveCC
                        }
                        transferSchool(para, token).then(res => {
                            if (res.code == 0) {
                                this.$message.success('成功提交转校')
                            } else {
                                this.$message.error(res.data);
                            }
                            return res
                        }).then((res) => {
                            if (res.code == 0) {
                                this.$router.push('/myStudents');
                            }
                        })
                    }
                })

                // console.log(para)
            },
            getContClass() { //续费选合同change
                this.continueform.title = '';
                this.continueClass1 = []
                if (this.continueform.contract !== '') {

                    this.classIndex = this.continueform.contract;
                    this.continueClass1 = this.students[this.classIndex].dataTable.filter(item => {
                        return item.kc_tid == 1
                    })
                }
            },
            arrangeClass(item, data) { //点击立即排班操作
                // console.log(data)
                this.arrange = {
                    time: '',
                    syllabus_id: ''
                }

                this.arrangeTitle = '[' + data.title + ']' + '排班';
                this.arrangeCourseId = data.course_id;
                this.arrangeOrderId = data.order_item_id;
                this.dialogFormVisibleArrange = true;
            },
            submitTheArrange(formName) { //立即排班提交
                this.$refs['arrange'].validate((valid) => {
                    if (valid && this.arrange.syllabus_id) {
                        let para = {}
                        let a = this.arrange
                        para.assigns = [{
                            time: new Date(a.time).toLocaleDateString(),
                            syllabus_id: a.syllabus_id,
                            order_item_id: this.arrangeOrderId
                        }]
                        para.assigns = JSON.stringify(para.assigns)
                        // console.log(para)
                        assignClass(para, token).then(res => {
                            // console.log(res)
                            if (res.code == 0) {
                                this.$message.success('排班成功');
                                let para = {
                                    uid: this.$route.params.uid
                                }
                                getMyStudentLessonDetail(token, para).then(res => { //合同课程
                                    if (res.data.length != 0) {

                                        this.contractNumber = res.data.length
                                        this.students = res.data
                                    } else {
                                        this.students = [{
                                            dataTable: [],
                                            sku: ''
                                        }]
                                    }
                                    // console.log(res)
                                }).then(() => {
                                    let p = {
                                        uid: this.$route.params.uid
                                    }
                                    getTeacherList(token, p).then((res) => { //获取老师
                                        this.teachersName = res.data;
                                    })
                                    this.dialogFormVisibleArrange = false;
                                })
                            } else {
                                this.$message.error(res.data)
                            }
                        })
                    } else {
                        if (this.arrange.time) {

                            this.$message.info('请选择排课班级')
                        }
                        // this.activeName = b;
                    }
                })

            },
            getClassName(data, i) { //获取课程名称
                let that = this;
                if (!this.stopchange) {
                    i.course_id = ''
                    let para = {
                        pid: data,
                        simple: 1
                    }
                    getClassLibrary(token, para).then((res) => {

                        i.courseName1 = res.data;
                    })
                }
                setTimeout(function () {
                    that.stopchange = false;
                }, 1);
            },
            nextToSignContract() { //续费到下一步
                // console.log(this.$refs)
                this.$refs['continueform'].validate((valid) => {
                    if (valid) {
                        this.dialogFormVisibleContinue = false;
                        this.dialogFormVisible3 = true;

                    }
                })
            },
            handleSelectionChange(val) { //转课补费选中表格的金额相加
                // console.log(val)
                this.selectArr = [];
                let p = 0
                val.map(item => {
                    this.selectArr.push(item.order_item_id)
                    return p += item.course_curr_price
                })
                this.multipleSelection = p;

            },
            nextToContract() { //转课补费到下一步
                if (this.selectArr.length != 0) {
                    // this.$refs.multipleTable.clearSelection();提交的时候清空

                    this.dialogFormVisiblechangtobuy = false;
                    this.dialogFormVisible3 = true;
                } else {
                    this.$message.info('请选择要选的课程')
                }
            },

            radioChange() { //为了显示
                // console.log(1)
            },
            getClassRoomByTime(time, index, data) { //选择性排班用
                // console.log(time)
                let that = this;
                if (time != '') {
                    let para = {
                        date: new Date(time).toLocaleDateString(),
                        course_id: data.course_id
                    }
                    // this.selectionClass[index].splice(0, this.selectionClass[index].length);
                    getDateClass(token, para).then(res => {
                        if (res.data.length != 0) {

                            that.selectionClass1[index] = res.data
                            that.art[index].syllabus_id = time
                            that.art[index].syllabus_id = ''
                        } else {
                            that.selectionClass1[index] = [];
                            that.art[index].syllabus_id = time;
                            that.art[index].syllabus_id = '';
                            this.$message.info('该天没有该课程')
                        }
                    })

                    // console.log(that.selectionClass[index])
                } else {
                    that.selectionClass1[index].splice(0, this.selectionClass1[index].length);

                    // this.art[index] = {time:'',class:''}
                }
            },
            getClassRoom(time, data) { //转升班用 选班级 出时间表
                // console.log(index)
                let that = this;
                if (time != '') {
                    let para = {
                        date: new Date(time).toLocaleDateString(), //日期
                        course_id: data.school //课程id
                    }
                    getDateClass(token, para).then(res => {
                        if (res.data.length != 0) {

                            that.selectionClass = res.data
                            // that.transferOrUpform.syllabus_id = time
                            // that.transferOrUpform.syllabus_id = ''
                        } else {
                            that.transferOrUpform.syllabus_id = ''
                            that.selectionClass = [];
                            this.$message.info('该天没有该课程')
                        }
                    })
                } else {
                    // this.art[index] = {time:'',class:''}
                    this.selectionClass.splice(0, this.selectionClass.length);
                }
            },
            getClassRoomArrange(time) { //立即排班按钮选班级 出时间表
                // console.log(index)
                let that = this;
                if (time != '') {
                    let para = {
                        date: new Date(time).toLocaleDateString(), //日期
                        course_id: this.arrangeCourseId //课程id
                    }
                    getDateClass(token, para).then(res => {
                        if (res.data.length != 0) {

                            that.selectionClassArrange = res.data
                            // that.arrange.syllabus_id = time
                            // that.arrange.syllabus_id = ''
                        } else {
                            that.arrange.syllabus_id = ''
                            that.selectionClassArrange = [];
                            this.$message.info('该天没有该课程')
                        }
                    })
                } else {
                    // this.art[index] = {time:'',class:''}
                    this.selectionClassArrange.splice(0, this.selectionClassArrange.length);
                }
            },
            goToSelect(formName) { //合同选择dialog的确认
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.classIndex = this.firstform.contract
                        switch (this.step) {
                            case 'refund': //退费
                                let para = {
                                    order_id: this.students[this.classIndex].order_id
                                }
                                getRefund(para, token).then(res => {
                                    console.log(res)
                                    this.refun = res.data
                                })
                                this.dialogFormVisibleRefund = true;
                                this.dialogFormVisibleFirst = false;
                                break;
                            case 'froze': //冻结
                                this.dialogFormVisibleFroze = true;
                                this.dialogFormVisibleFirst = false;
                                break;

                                // case 'transferClass'://转升班
                                //     this.dialogFormVisibletransferOrUp = true;
                                //     this.dialogFormVisibleFirst = false;
                                //     break;
                            case 'transferClass': //转升班

                                this.dialogFormVisibletransferOrUp = true;
                                this.dialogFormVisibleFirst = false;
                                break;
                            default:
                                // statements_def
                                break;
                        }
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                })

            },
            updateListR() { //课程考勤记录更新
                this.value1 = '';
                let p = {
                    course_id: this.valueR,
                    uid: this.$route.params.uid
                }
                getTeacherList(token, p).then((res) => { //获取老师
                    this.teachersName = res.data;
                })
                let para = {
                    page: 1,
                    course_id: this.valueR,
                    teacher_uid: this.value1,
                    uid: this.$route.params.uid
                }
                getMyStudentSign(token, para).then(res => {
                    this.tableData = res.data.data;
                    let c = res.data.last_page * this.pagesize1;
                    this.total1 = parseInt(c);
                })

            },
            updateList1() { //选老师考勤记录更新
                let para = {
                    page: 1,
                    course_id: this.valueR,
                    teacher_uid: this.value1,
                    uid: this.$route.params.uid
                }
                getMyStudentSign(token, para).then(res => {
                    this.tableData = res.data.data;
                    let c = res.data.last_page * this.pagesize1;
                    this.total1 = parseInt(c);
                })

            },
            changeReset(val) {
                if (val != '') {

                    this.$refs['actSchool'].validate((valid) => {})
                }
            },
            continueClass() { //续费
                this.continueform.contract = ''
                this.step = 'continueClass';
                this.dialogFormVisibleContinue = true;
            },
            rebuy() { //再购买
                this.step = 'rebuy';
                this.dialogFormVisible3 = true;
            },
            changeToPay() { //转课补费
                this.firstform.contract = '';
                //  this.selectArr=[];
                // this.multipleSelection = 0;
                let para = {
                    uid: this.$route.params.uid
                }
                getRemainMoney(token, para).then(res => {
                    this.lessonData = res.data
                }).then(() => {

                    this.dialogFormVisiblechangtobuy = true;
                })
                this.step = 'changtobuy';
            },
            upClass() { //升班
                this.firstform.contract = ''
                this.transferOrUpform = {
                    class: '',
                    school: '',
                    time: '',
                    syllabus_id: ''
                }
                // this.transferOrUp = 'upClass'
                this.step = 'transferClass';
                this.dialogFormVisibleFirst = true;
            },
            transferSchool() { //转校
                this.step = 'transferSchool';
                this.transferSchoolform.school = '';
                this.transferSchoolform.receiveCC = '';
                this.dialogFormVisibleTransferSchool = true;
            },
            frozzen() { //冻结
                this.firstform.contract = ''
                this.step = 'froze';
                this.dialogFormVisibleFirst = true;
            },
            refund() { //退费
                this.firstform.contract = ''
                this.step = 'refund';
                this.dialogFormVisibleFirst = true;
            },
            submitTheContract(formName) { //排班提交
                let a = [];
                let b = '';
                this.tabClass.map((item, index) => {
                    if (item.isR == 'yes') {
                        a.push(index)
                    }
                    this.art[index].order_item_id = item.order_item_id
                    // if(this.art[index].syllabus_id){
                    //  this.art[index].time = new Date(this.art[index].time).toLocaleDateString()

                    // }
                })
                let c = [...this.art]
                c.splice(this.tabClass.length, this.art.length);
                let count = []
                if (a.length != 0) {
                    a.map((item) => {

                        let n = 'art' + item;
                        this.$refs[n][0].validate((valid) => {
                            if (valid && c[item].syllabus_id) {
                                count.push(item);
                                if (count.length == a.length) {}
                                let para = {}
                                para.assigns = c
                                para.assigns = JSON.stringify(para.assigns)
                                // console.log(para) //提交服务
                                assignClass(para, token).then(res => {
                                    if (res.code == 0) {
                                        this.$message.success('排班成功');
                                        let para = {
                                            uid: this.$route.params.uid
                                        }
                                        getMyStudentLessonDetail(token, para).then(res => { //合同课程
                                            if (res.data.length != 0) {

                                                this.contractNumber = res.data.length
                                                this.students = res.data
                                            } else {
                                                this.students = [{
                                                    dataTable: [],
                                                    sku: ''
                                                }]
                                            }
                                            // console.log(res)
                                        }).then(() => {
                                            let p = {
                                                uid: this.$route.params.uid
                                            }
                                            getTeacherList(token, p).then((res) => { //获取老师
                                                this.teachersName = res.data;
                                            })
                                            this.dialogFormVisibleLast = false;
                                        })
                                    } else {
                                        this.$message.error(res.data)
                                    }
                                })
                            }
                        })
                    })
                    if (c.length != a.length) {
                        console.log(count)
                        console.log(a)

                        let o = new Set(count); //[]
                        let p = new Set(a); //[0,1,2]
                        let r = new Set([...p].filter(x => !o.has(x))); //1,2
                        console.log([...r][0])
                        this.activeName = [...r][0] + 1 + '';
                        if (this.art[[...r][0]].time) {

                            this.$message.info('请选择排课班级')
                        }
                    }
                } else {
                    // let re = c.some(item=>{
                    //     return item.syllabus_id
                    // })
                    // if(re){
                    let para = {}
                    para.assigns = c
                    para.assigns = JSON.stringify(para.assigns)
                    // console.log(para) //提交服务
                    assignClass(para, token).then(res => {
                        if (res.code == 0) {
                            this.$message.success('排班成功');
                            let para = {
                                uid: this.$route.params.uid
                            }
                            getMyStudentLessonDetail(token, para).then(res => { //合同课程
                                if (res.data.length != 0) {

                                    this.contractNumber = res.data.length
                                    this.students = res.data
                                } else {
                                    this.students = [{
                                        dataTable: [],
                                        sku: ''
                                    }]
                                }
                                // console.log(res)
                            }).then(() => {
                                let p = {
                                    uid: this.$route.params.uid
                                }
                                getTeacherList(token, p).then((res) => { //获取老师
                                    this.teachersName = res.data;
                                })
                                this.dialogFormVisibleLast = false;
                            })
                        } else {
                            this.$message.error(res.data)
                        }
                    })
                    // }else{
                    //     this.$message.info('未选择排课班级')
                    // }

                }

            },

            nextToSign(formName) { //提交修改学员资料
                this.$refs[formName].validate((valid) => { //替换提交服务
                    if (valid) {
                        if (this.signform.parent1 || this.signform.con1 || this.signform.phone1) {
                            this.signform.familys = this.signform.parent + '|' + this.signform.con + '|' + this
                                .signform.phone +
                                ',' + this.signform.parent1 + '|' + this.signform.con1 + '|' + this.signform.phone1
                        } else {
                            this.signform.familys = this.signform.parent + '|' + this.signform.con + '|' + this
                                .signform.phone
                        }
                        this.signform.customer_id = this.$route.params.uid;
                        let para = JSON.parse(JSON.stringify(this.signform));
                        para.birthday = new Date(para.birthday).toLocaleDateString()
                        put_student(para, token).then(res => { //接口要换
                            if (res.code == 0) {
                                this.$message({
                                    message: '修改成功',
                                    type: 'success'
                                });
                                this.dialogFormVisibleSign = false;
                            } else {
                                this.$message.error(res.data);
                                // this.form.phone = '';
                                // this.$refs.parentPhone.$refs.input.focus();
                                // this.$refs.parentPhone.$refs.input.blur();
                                // this.form.sour_id = this.form.sour_id.split(',')
                            }
                        }).then(() => {
                            let para = {
                                uid: this.$route.params.uid
                            }
                            returnVisitDetail(token, para).then(res => { //获取用户资料
                                let data = res.data.info;
                                this.student = {
                                    name: data.child_name,
                                    age: data.age,
                                    sex: data.sex,
                                    birthday: data.birthday,
                                    id_number: data.id_number ? data.id_number : '无',
                                    school: data.school_name,
                                    channel: data.source_name,
                                    cc_name:data.cc_name,
                                    fullAddress: data.fullAddress,
                                    time: data.regtime,
                                    parent: res.data.famliys[0].uname + '(' + res.data.famliys[
                                        0].relation + ')',
                                    parent_phone: res.data.famliys[0].mobile,
                                    parent1: res.data.famliys[1] ? res.data.famliys[1].uname?res.data.famliys[1].uname +
                                        '(' + res.data.famliys[1].relation + ')' :'': '',
                                    parent1_phone: res.data.famliys[1] ? res.data.famliys[1].mobile?res.data.famliys[1].mobile:'': '',
                                    teacher: data.cc_name,
                                    sour_id: data.sour_id,
                                    referral_name: data.referral ? data.referral.referral_name :
                                        '',
                                    teach_name: data.referral ? data.referral.teach_name : ''

                                }
                            })
                        }).catch(() => {
                            this.$message.error('该用户未授权');
                        })
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });

            },
            submitCon(formName) { //最后提交合同
                this.$refs[formName].validate((valid) => {
                    if (valid && this.isEqual === 1) {
                        let para = {
                            // order_id: this.step == 'continueClass' ? this.students[this.classIndex].order_id :'',
                            order_item_id: this.step == 'continueClass' ? this.students[this.classIndex].dataTable[
                                this.continueform.title].order_item_id : '',
                            // changtobuy: this.step == 'changtobuy' ? this.multipleSelection : '',students[classIndex].dataTable
                            order_item: this.step == 'changtobuy' ? this.selectArr : '',
                            uid: this.$route.params.uid,
                            sku: this.actSchool.sku,
                            baoming_teach: this.actSchool.teacher_uid,
                            panda_gohome: this.actSchool.panda_gohome,
                            pay: this.actSchool.pay,
                            created: '', //new Date(this.actSchool.created).toLocaleDateString(),
                            kecheng: this.contracts,
                            coupons: this.coupons,
                            new_order: this.step == 'continueClass' ? 2 : this.step == 'rebuy' ? 3 : 4 //2:续费 3：在购买 4:转课',
                        }
                        // para = JSON.stringify(para)
                        para.kecheng = JSON.stringify(para.kecheng)
                        para.order_item = JSON.stringify(para.order_item)
                        para.pay = JSON.stringify(para.pay)
                        para.coupons = JSON.stringify(para.coupons)
                        // console.log(para)
                        signThreeContract(para, token).then(res => {
                            // console.log(res)
                            if (res.code == 0) {

                                res.data.order_item.map((item, index) => {
                                    this.tabClass[index] = {
                                        name: item.title,
                                        isR: item.kc_tid == 1 ? 'yes' : 'no',
                                        number: (index + 1) + '',
                                        order_item_id: item.order_item_id,
                                        course_id: item.course_id
                                    }
                                })
                            }
                            return res
                        }).then((res) => {
                            // console.log(res)
                            if (res.code == 0) {
                                this.dialogFormVisible3 = false;
                                this.$message.success('添加合同成功');
                                this.$confirm('是否立即排班', '排班选择', {
                                    customClass: 'green',
                                    confirmButtonText: '立即排班',
                                    cancelButtonText: '稍后排班',
                                }).then(() => {
                                    this.dialogFormVisibleLast = true;
                                }).catch(() => {
                                    this.tabClass = [];

                                });
                                let para = {
                                    uid: this.$route.params.uid
                                }
                                getMyStudentLessonDetail(token, para).then(res => { //合同课程
                                    if (res.data.length != 0) {

                                        this.contractNumber = res.data.length
                                        this.students = res.data
                                    } else {
                                        this.students = [{
                                            dataTable: [],
                                            sku: ''
                                        }]
                                    }
                                    // console.log(res)
                                })
                            } else {
                                this.$message.error(res.data)
                            }
                        })
                    }else{
                        this.$message.error('付款总额与实收总额不符')
                    }
                })


            },
            backTolast() { //2 to 1
                // this.backContract = [...this.contracts]
                // this.backactSchool = {...this.actSchool}//备份第二步数据
                //  this.signform = {...this.backData}//还原第一步数据
                this.dialogFormVisible3 = false;
                if (this.step == 'continueClass') {
                    this.dialogFormVisibleContinue = true;
                } else {
                    this.dialogFormVisiblechangtobuy = true;
                }
            },
            addPay() {
                this.actSchool.pay.push({
                    method: '',
                    money: ''
                })
            },
            deletePay() {
                this.actSchool.pay.pop();
            },
            resetAll(formName) {
                this.contracts = [{
                    kc_tid: '',
                    course_id: '',
                    year_num: '',
                    head_count: '',
                    tuition_price: '',
                    teaching_price: '',
                    book_price: '',
                    study_money: '',
                    coupons_money: '',
                    courseName1: []
                }]
                this.actSchool = {
                    sku: '',
                    // teacher_uid: '',
                    panda_gohome: '',
                    pay: [{
                        method: '',
                        money: ''
                    }],
                    created: '',

                }
                this.coupons = [];
                this.multipleSelection = 0
                this.$refs[formName].resetFields();

            },
            resetClass(formName) {
                this.art = [{
                    time: '',
                    class: ''
                }, {
                    time: '',
                    class: ''
                }, {
                    time: '',
                    class: ''
                }, {
                    time: '',
                    class: ''
                }, {
                    time: '',
                    class: ''
                }]
                // this.$refs[formName].resetFields();
                // this.selectionClass = [[],[],[],[],[]];

            },
            getPrice(data, index) {
                let para = {
                    kcid: index
                }
                getLessonDetail(token, para).then((res) => {
                    let a = res.data
                    // console.log(a)
                    if (data.course_id !== '') {
                        data.year_num = a.year_num;
                        data.head_count = a.head_count;
                        data.tuition_price = a.tuition_price;
                        data.teaching_price = a.teaching_price;
                        data.book_price = a.book_price;
                        data.study_money = (a.tuition_price - 0) + (a.teaching_price - 0) + (a.book_price - 0);
                    } else {
                        data.year_num = '';
                        data.head_count = '';
                        data.tuition_price = '';
                        data.teaching_price = '';
                        data.book_price = '';
                        data.study_money = '';
                    }
                })
            },
            addCon(index) {
                this.contracts.push({
                    kc_tid: '',
                    course_id: '',
                    year_num: '',
                    head_count: '',
                    tuition_price: '',
                    teaching_price: '',
                    book_price: '',
                    study_money: '',
                    coupons_money: '',
                    courseName1: []
                })
            },
            delCon(index) {
                //删除某个课程
                this.stopchange = true;
                this.contracts.splice(index, 1)
            },
            getNowFormatDate(date) {
                var day = new Date(date);
                var Year = 0;
                var Month = 0;
                var Day = 0;
                var CurrentDate = "";
                //初始化时间 
                Year = day.getFullYear();
                Month = day.getMonth() + 1;
                Day = day.getDate();
                CurrentDate += Year;
                if (Month >= 10) {
                    CurrentDate += Month;
                } else {
                    CurrentDate += "0" + Month;
                }
                if (Day >= 10) {
                    CurrentDate += Day;
                } else {
                    CurrentDate += "0" + Day;
                }

                return CurrentDate;
            },
            addInvite() {
                this.dialogFormVisibleInvite = true;
            },
            resetD(formName) {
                this.selectionClass = [];
                this.$refs[formName].resetFields();

            },
            addComm() { //点击添加回访记录
                // console.log(this.getUserId)
                this.returnform.id = ''
                let para = {
                    type: 'cc'
                }
                tagList(token, para).then(res => {
                    this.boxes = res.data
                })
                this.in = '';
                this.returnform.contents = '';
                this.returnform.tags = [];
                this.dialogFormVisible = true
            },

            editReturn(index, item) { //点击修改回访记录
                console.log(Object.is(item.tags,null))
                this.returnform.tags = [];
                this.returnform.id = item.id;
                
                    let para = {
                        type: 'cc'
                    }
                    tagList(token, para).then(res => {
                        this.boxes = res.data;
                        if (!Object.is(item.tags,null)) {
                        this.returnform.tags = Object.keys(item.tags)
                        }
                        // this.boxes.map(v => {
                        //     for (let key in item.tags) {
                        //         if (v.key == key) {
                        //             this.returnform.tags.push(v.key)
                        //         }
                        //     }
                        // })
                    }).then(() => {
                        this.dialogFormVisible = true
                    })
                

                this.in = 1;
                this.returnform.contents = item.contents;

            },
            commuFormSubmit(formName) { //提交回访记录
                this.$refs[formName].validate((valid) => { //替换提交服务
                    if (valid) {
                        this.returnform.uid = this.$route.params.uid
                        //可能要送 用户名
                        if (this.in) {
                            put_returnList(this.returnform, token).then((res) => {
                                if (res.code == 0) {
                                    this.$message.success('修改成功')
                                    let p = {
                                        page: '1',
                                        uid: this.$route.params.uid
                                    }
                                    getVisitList(token, p).then(res => {
                                        this.number = res.data.total;
                                        this.items = res.data.data;
                                        let c = res.data.last_page * this.pagesize;
                                        this.total = parseInt(c);
                                    })
                                    this.currentPage = 1;
                                    this.dialogFormVisible = false

                                }
                            }).catch(() => {
                                this.$message.error('该用户未授权');
                                this.dialogFormVisible = false
                            })
                        } else {
                            create_returnList(this.returnform, token).then((res) => {
                                if (res.code == 0) {

                                    this.$message.success('添加成功')
                                    let p = {
                                        page: '1',
                                        uid: this.$route.params.uid
                                    }
                                    getVisitList(token, p).then(res => {
                                        this.number = res.data.total;
                                        this.items = res.data.data;
                                        let c = res.data.last_page * this.pagesize;
                                        this.total = parseInt(c);
                                    })
                                    this.currentPage = 1;
                                    this.dialogFormVisible = false
                                }
                            }).catch(() => {
                                this.$message.error('该用户未授权');
                                this.dialogFormVisible = false
                            })
                        }
                    } else {
                        // console.log('error submit!!');
                        return false;
                    }
                });
            },

            addU() { //点击修改用户资料
                let para = {
                    uid: this.$route.params.uid
                }
                returnVisitDetail(token, para).then(res => { //获取用户资料
                    let data = res.data;
                    // console.log(data)
                    this.signform = {
                        names: data.info.child_name,
                        sex: data.info.sex === '男' ? '1' : '2',
                        age: data.info.age + '',
                        id_number: data.info.id_number?data.info.id_number:'',
                        birthday: new Date(data.info.birthday),
                        parent: data.famliys[0].uname,
                        parent1: data.famliys[1] ? data.famliys[1].uname || '' : '',
                        con: data.famliys[0].relation,
                        con1: data.famliys[1] ? data.famliys[1].relation || '' : '',
                        phone: data.famliys[0].mobile,
                        phone1: data.famliys[1] ? data.famliys[1].mobile || '' : '',
                        familys: ''
                    }
                })

                this.dialogFormVisibleSign = true;
            },
            handleCurrentChange: function (val) { //回访记录变更页数
                this.currentPage = val;
                let p = {
                    page: this.currentPage,
                    customer_id: this.$route.params.uid
                }
                getVisitList(token, p).then(res => {
                    this.number = res.data.total;
                    this.items = res.data.data;
                    let c = res.data.last_page * this.pagesize;
                    this.total = parseInt(c);
                })
            },
            handleCurrentChange1: function (val) { //签到变更页数
                this.currentPage1 = val;
                let p = {
                    page: this.currentPage1,
                    uid: this.$route.params.uid
                }
                getMyStudentSign(token, p).then(res => {
                    this.tableData = res.data.data;
                    let c = res.data.last_page * this.pagesize1;
                    this.total1 = parseInt(c);
                })
            },
        },
        computed: {
            tableTitle(){
                if(this.step == 'changtobuy'){
                    return  ['课时', '签单数', '学费', '教材费', '书本费', '优惠类型', '优惠金额', '转课补费额','实收总额', '操作']
                }else{
                    return  ['课时', '签单数', '学费', '教材费', '书本费', '优惠类型', '优惠金额','实收总额', '操作']
                }
            },
            fronzeContra(){
                if(this.step == 'transferClass'||this.step=='refund'){
                    return this.students;
                }else{

                    let b = []
                    this.students.map(item=>{
                        let a = item.dataTable.some(i=>{
                           return i.status=='正常'&&i.kc_tid==1&&i.classTime!=''
                        })
                        if(a){
                            b.push(item)
    
                        }
                    })
                    return b
                }
            },
            continueClassCon(){
                let b = []
                this.students.map(item=>{
                    let a = item.dataTable.some(i=>{
                       return i.kc_tid==1
                    })
                    if(a){
                        b.push(item)

                    }
                })
                return b
            },
            // secondRule(){
            //     if(this.signform.parent1&&this.signform.phone1&&this.signform.con1){
            //             return false;
            //         }else if(this.signform.parent1||this.signform.phone1||this.signform.con1){
    
            //            return true;
            //         }else{
            //             return false;
            //         }
            // },
            payMethods() {
                let m = [{
                    name: '现金',
                    id: '1'
                }, {
                    name: 'POS机',
                    id: '2'
                }, {
                    name: '微信',
                    id: '3'
                }, {
                    name: '银行转账',
                    id: '4'
                }, {
                    name: '团购',
                    id: '5'
                }, {
                    name: '支付宝',
                    id: '6'
                }, {
                    name: '其他',
                    id: '7'
                }]
                let l = this.actSchool.pay.length
                this.actSchool.pay.map((item, index) => {
                    m = m.filter(i => {
                        return i.id != item.method
                    })
                })
                return m
            },
            transOut() {
                let a = this.students[this.classIndex].dataTable.filter(item => {
                    return item.course_curr_num != 0
                })
                return a
            },
            isEqual() {
                if ((this.payTotal + (this.multipleSelection - 0)) >= this.totalP3) {
                    return 1
                } else {
                    return 0
                }
            },
            payTotal() {
                let a = 0;
                this.actSchool.pay.map(item => {
                    a += item.money - 0
                })
                return a
            },
            totalP() {
                let a = 0;
                this.contracts.map(item => {
                    a += item.study_money - 0
                })
                return a
            },
            totalP2() {
                let a = 0;
                this.contracts.map(item => {
                    a += item.coupons_money - 0
                })
                return a
            },
            totalP3() {

                return this.totalP - this.totalP2

            },
            communityTitle() {
                if (this.in === '') {
                    return '添加回访记录'
                } else {

                    return '修改回访记录'
                }

            }

        },
        beforeCreate() {
            user = localStorage.getItem('user');
            token = JSON.parse(user).token;
        },
        created() {
            document.body.scrollTop = 0
            this.userName = JSON.parse(user).uname;
            this.code = JSON.parse(user).job ? JSON.parse(user).job.code : '';
            let para = {
                uid: this.$route.params.uid
            }
            returnVisitDetail(token, para).then(res => { //获取用户资料
                let data = res.data.info;
                this.student = {
                    name: data.child_name,
                    age: data.age,
                    id_number: data.id_number ? data.id_number : '无',
                    sex: data.sex,
                    school: data.school_name,
                    channel: data.source_name,
                    cc_name:data.cc_name,
                    fullAddress: data.fullAddress,
                    time: data.regtime,
                    parent: res.data.famliys[0].uname + '(' + res.data.famliys[0].relation + ')',
                    parent_phone: res.data.famliys[0].mobile,
                    parent1: res.data.famliys[1] ? res.data.famliys[1].uname ? res.data.famliys[1].uname +
                        '(' + res.data.famliys[1].relation + ')' : '' : '',
                    parent1_phone: res.data.famliys[1] ? res.data.famliys[1].mobile || '' : '',
                    teacher: data.cc_name,
                    sour_id: data.sour_id,
                    referral_name: data.referral ? data.referral.referral_name : '',
                    teach_name: data.referral ? data.referral.teach_name : ''

                }
            }).catch(() => {
                // console.log('No Data')
            })
            getMyStudentSign(token, para).then(res => {//获取考勤记录
                this.tableData = res.data.data;
                let c = res.data.last_page * this.pagesize1;
                this.total1 = parseInt(c);
            })
            getMyStudentLessonDetail(token, para).then(res => { //合同课程
                if (res.data.length != 0) {

                    this.contractNumber = res.data.length
                    this.students = res.data
                } else {
                    this.students = [{
                        dataTable: [],
                        sku: ''
                    }]
                }
                // console.log(res)
            }).then(() => {

                let p = {
                    page: this.currentPage,
                    uid: this.$route.params.uid
                }
                getVisitList(token, p).then(res => { //获取回访记录
                    this.number = res.data.total;
                    this.items = res.data.data;
                    // console.log(this.items)
                    let c = res.data.last_page * this.pagesize;
                    this.total = parseInt(c);
                })
            }).then(() => {

                getClassKind(token).then((res) => { //获取课程分类
                    this.classkind = res.data
                })
                let si = {
                    simple: 1,
                    uid: this.$route.params.uid
                }
                getClassLibrary(token, si).then(res => { //考勤记录的全部课程
                    this.allClass = res.data
                })
                getPromotionList(token, si).then((res) => { //获取优惠列表

                    this.couponsList = res.data;
                })
                let p = {
                    uid: this.$route.params.uid
                }
                getTeacherList(token, p).then((res) => { //获取老师
                    this.teachersName = res.data;
                })
                let sii = {
                    simple: 1,
                    uid: this.$route.params.uid,
                    type: 'all'
                }
                campusList(sii, token).then((res) => { //获取校区
                    let a = res.data;
                    this.receiveSchool = a.map(item => {
                        return {
                            value: item.id,
                            label: item.title
                        };
                    });
                })
            })

        },
        // watch:{
        //     '$route' (to,form){
        //         console.log(to)
        //          console.log(from)
        //     }
        // }
    }

</script>
<style>
    /*.readd {
    pointer-events: none
}*/

    .UserDetailTitle {
        position: relative;
        background: url(../../../static/img/contact.png) left center/25px no-repeat;
        padding: 10px 10px 10px 27px;
        margin-left: 12px
    }

    .contractClass {
        position: relative;
        background: url(../../../static/img/contract.png) left center/25px no-repeat;
        padding: 10px 10px 10px 27px;
        margin-left: 12px
    }

    .contractClass .el-button--success {
        color: #fff;
        background-color: #13ce66;
        border-color: #13ce66;
    }

    .contractClass .el-button--success:hover {
        background: #42d885;
        border-color: #42d885;
        color: #fff;
    }

    .AttRecord {
        position: relative;
        /*background: url(../../../static/img/contact.png) left center/25px no-repeat;*/
        padding: 10px 10px 10px 17px;
        /*margin-left: 12px*/
    }

    .communityTitle {
        margin-left: 12px;
        position: relative;
        background: url(../../../static/img/comuni.png) left center/30px no-repeat;
        padding: 10px 10px 10px 30px;
        border-bottom: 1px solid #e8e8e8;
    }

    #customerDeatilForm {
        border-top: 1px solid #e8e8e8;
        padding-left: 10px;
        position: relative;
    }

    #customerDeatilForm .el-form-item {
        margin-bottom: 5px
    }

    #customerDeatilForm .el-form-item__label {
        padding: 8px 12px 5px 0;
    }

    #customerDeatilForm .el-form-item__content {
        line-height: 30px
    }

    .tableUserDSD .listUser {
        /*min-height: 100px;*/
        /*height: auto;*/
        border-bottom: 1px solid #e8e8e8;
        position: relative;
        min-height: 75px
        /*border-bottom:1px solid grey;*/
    }



    .tableUserDSD .el-tag--success {
        background-color: #1fb5ad;
        border-color: #bcf1d4;
        color: #FFFFFF;
        border-radius: 25px;
    }

    .signC {
        background-color: rgb(113, 180, 219);
        border-color: rgb(113, 180, 219);
        height: 33px;
        line-height: 0;
        width: 75px
    }

    .setToNo {
        background-color: #f29c9c;
        border-color: #f29c9c;
        height: 30px;
        line-height: 30px;
        width: 107px;
        padding: 0;
        position: absolute;
        right: 0;
    }


    .tableUserDSD .editSpan {
        height: 30px;
        background: url(../../../static/img/edit.png) right/30px 30px no-repeat;
        cursor: pointer;
        margin-top: 10px;
        width:30px;
        float:right;
    }

    .tableUserDSD .editSpan:hover {
        background-image: url(../../../static/img/edit_h.png);
    }

    .tableUserDSD .addU {
        width: 30px;
        height: 30px;
        background-image: url(../../../static/img/editU.png);
        background-size: 30px 30px;
        cursor: pointer;
        display: inline-block;
        margin-right: 5px;
    }

    .tableUserDSD .addU:hover {
        background-image: url(../../../static/img/editU_h.png);
    }

    .tableUserDSD .addR {
        width: 30px;
        height: 30px;
        background-image: url(../../../static/img/addR.png);
        background-size: 30px 30px;
        cursor: pointer;
    }

    .tableUserDSD .addR:hover {
        background-image: url(../../../static/img/addR_h.png);
    }

    .tableUserDSD .block {
        text-align: center;
        position: absolute;
        bottom: 10px;
        width: 100%;
    }

    #communityTitle {
        float: left;
        width: 100%;
        background-color: white;
        border-radius: 5px;
        margin-right: 12px;
        position: relative
    }

    #communityTitle .block {
        bottom: 0;
    }

    #detailForm .el-form-item .el-form-item__content .el-checkbox {
        margin-left: 15px
    }

    #CDEDialog .el-dialog .el-dialog__body {
        padding: 10px 20px 0 20px;
    }

    #CDEDialog .el-dialog--small {
        width: 56%;
    }

    #signDialog .el-dialog .el-dialog__body {
        padding: 10px 20px 0 20px;
    }

    #signDialog .el-dialog--small {
        width: 56%;
    }

    .signContactDialog .el-dialog--small {
        width: 1086.75px;
    }

    .tableUserDSD .el-dialog .el-dialog__header {
        background-color: #1fb5ad;
        padding: 20px 20px 20px;
    }

    .tableUserDSD .refundDialog .el-dialog .el-dialog__header {
        background-color: #f74242;
        padding: 20px 20px 20px;
    }

    .tableUserDSD .frozeDialog .el-dialog .el-dialog__header {
        background-color: #50bfff;
        padding: 20px 20px 20px;
    }

    .tableUserDSD .el-dialog .el-dialog__title {
        color: white;
    }

    .inviteRecord {
        font-size: 14px;
        margin: 10px;
    }

    .schoolDialog .el-dialog__body {
        text-align: center;
        /*color:#ec6161;*/
    }

    .green .el-message-box__header {
        background-color: #1fb5ad;
        padding: 20px 20px 20px;
    }

    .green .el-message-box__title {
        color: white;
    }

    .CDDialog .el-dialog__footer {
        text-align: center;
    }

    .ccc {
        text-align: center;
        height: 40px;
        line-height: 40px;
        background: #f3f3f3;
        flex: 0 0 66px;
        border-right: 1px solid gainsboro;
        border-bottom: 1px solid gainsboro;
        border-top: 1px solid gainsboro
    }
    .eee {
        text-align: center;
        height: 40px;
        line-height: 40px;
        background: #f3f3f3;
        flex: 0 0 86px;
        border-right: 1px solid gainsboro;
        border-bottom: 1px solid gainsboro;
        border-top: 1px solid gainsboro
    }
    .ddd {
        text-align: center;
        height: 40px;
        line-height: 40px;
        background: #f3f3f3;
        flex: 0 0 146px;
        border-right: 1px solid gainsboro;
        border-bottom: 1px solid gainsboro;
        border-top: 1px solid gainsboro
    }

    .male {
        margin-left: 76px;
        margin-top: 22px;
    }

    .addPay {
        position: absolute;
        top: 0;
        left: 400px;
        color: #1fb5ad
    }

    .addPay:hover {
        cursor: pointer;
    }

    .deletePay {
        float: left;
        color: #f29c9c;
        margin-left: 20px
    }

    .deletePay:hover {
        cursor: pointer;
    }

    .promotionMoney input {
        height: 22px;
        margin: 9px auto;
        width: 80%;
    }

    .selectClass .el-radio+.el-radio {
        margin-left: 0;
    }

    #table1 .el-table td,
    #table1 .el-table th:not(.gutter) {
        padding: 1px;
        text-align: center
    }

    #table1 .el-table th>div,
    #table1 .el-table .cell {
        padding-left: 0;
        padding-right: 0;
    }

    #table2 .el-table td,
    #table2 .el-table th:not(.gutter) {
        padding: 1px;
        text-align: center
    }

    #table2 .el-table th>div,
    #table2 .el-table .cell {
        padding-left: 0;
        padding-right: 0;
    }

    #table3 .el-table td,
    #table3 .el-table th:not(.gutter) {
        padding: 1px;
        text-align: center
    }

    #table3 .el-table th>div,
    #table3 .el-table .cell {
        padding-left: 0;
        padding-right: 0;
    }

    #table4 .el-table td,
    #table4 .el-table th:not(.gutter) {
        padding: 1px;
        text-align: center
    }

    #table4 .el-table th>div,
    #table4 .el-table .cell {
        padding-left: 0;
        padding-right: 0;
    }

    #tablelesson .el-table td,
    #tablelesson .el-table th:not(.gutter) {
        padding: 1px;
        text-align: center
    }

    #tablelesson .el-table th>div,
    #tablelesson .el-table .cell {
        padding-left: 0;
        padding-right: 0;
    }

    .studentDetailThreeNew {
        display: inline-block;
        width: 106px;
        /*margin-right: 10px;*/
        margin-bottom: 10px;
        margin-left: 10px
    }

    .arrangeClass {
        color: #1fb5ad;
    }
    .arrangeClass22 {
        color: #dba31c;
    }
    .arrangeClass:hover {
        cursor: pointer;
    }

    .imgEdit:hover {
        cursor: pointer;
    }
    /*::-webkit-scrollbar {
    display: none
}*/

    .refundTitle {
        height: 40px;
        line-height: 40px;
        display: flex;
        justify-content: space-around;
        border: 1px solid rgb(223, 236, 235);
        border-left: none;
        font-size: 14px;
    }

    .refund80 {
        flex: 0 0 80px;
    }

    .refund68 {
        flex: 0 0 68px;
    }

    .refund199 {
        flex: 0 0 199px;
        text-align: center;
        background: rgb(238, 246, 246);
        color: rgb(31, 61, 60);
        font-weight: bold;
    }

    .refundS {
        text-align: center;
        background: rgb(238, 246, 246);
        color: rgb(31, 61, 60);
        font-weight: bold;
        border-right: 1px solid rgb(223, 236, 235);
    }

    .refundTable {
        display: flex;
        justify-content: space-around;
        flex: auto;
        align-items: stretch;
        border-right: 1px solid rgb(223, 236, 235);
        border-bottom: 1px solid rgb(223, 236, 235);
    }

    .refundTable80 {
        border-right: 1px solid rgb(223, 236, 235);
        flex: 0 0 80px;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .refundTable68 {
        border-right: 1px solid rgb(223, 236, 235);
        flex: 0 0 68px;
        display: flex;
        justify-content: center;
        align-items: center
    }

    .refundTable199 {
        flex: 0 0 199px;
        display: flex;
        justify-content: center;
        align-items: center
    }

    .table4Title {
        background: white;
        margin-bottom: 20px
    }

    .table4Div {
        display: flex;
        justify-content: space-between;
        height: 50px;
        line-height: 50px;
        border: 1px solid rgb(223, 236, 235);
        border-bottom: none;
        background: #fafafa;
    }

    .table4Teacher {
        padding-left: 10px;
        padding-right: 10px;
        border-left: 1px solid rgb(223, 236, 235);
        border-right: 1px solid rgb(223, 236, 235)
    }

    .table4Record1 {
        display: flex;
        height: 40px;
        line-height: 40px;
        background: #d6fffd;
        border: 1px solid rgb(223, 236, 235);
        font-size: 14px
    }

    .table4Record2 {
        display: flex;
        height: 40px;
        line-height: 40px;
        background: #fffff5;
        border: 1px solid rgb(223, 236, 235);
        ;
        font-size: 14px
    }

    .table4Record3 {
        display: flex;
        height: 40px;
        line-height: 40px;
        background: #e3f1f8;
        border: 1px solid rgb(223, 236, 235);
        ;
        font-size: 14px
    }

    .table4Record4 {
        display: flex;
        height: 40px;
        line-height: 40px;
        background: #6fa6c1;
        border: 1px solid rgb(223, 236, 235);
        ;
        font-size: 14px
    }

    .table4RecordTitle {
        flex: 0 0 100px;
        text-align: center
    }

    .table4RecordContent {
        flex: 1 1 400px;
        border-left: 1px solid rgb(223, 236, 235);
        padding-left: 10px
    }

    .table4RecordO {
        flex: auto;
        border-left: 1px solid rgb(223, 236, 235);
        padding-left: 10px
    }

    .signContactDiv {
        text-align: center;
        background: #f3f3f3;
        flex: 0 0 66px;
        display: flex;
        border-right: 1px solid gainsboro;
        border-bottom: 1px solid gainsboro;
        justify-content: center;
        align-items: center;
    }

    .signContactCoupons {
        background: #f3f3f3;
        text-align: center;
        border-right: 1px solid gainsboro;
        border-bottom: 1px solid gainsboro;
        flex: 0 0 145px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        height: auto
    }

    .signContactMoney {
        line-height: 40px;
        width: 67px;
        display: flex;
        align-items: stretch;
        flex-wrap: wrap
    }

    .signContactMoneyDiv {
        font-size: 14px;
        display: flex;
        flex: 0 0 67px
    }

    .signContactCouponsDiv {
        text-align: center;
        background: #f3f3f3;
        border-right: 1px solid gainsboro;
        border-bottom: 1px solid gainsboro;
        flex: 0 0 66px;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .signContactPay {
        background: #ffffff;
        text-align: center;
        border-right: 1px solid gainsboro;
        border-bottom: 1px solid gainsboro;
        flex: 0 0 66px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        height: auto
    }
    .signContactzhuan {
        background: #ffffff;
        text-align: center;
        border-right: 1px solid gainsboro;
        border-bottom: 1px solid gainsboro;
        flex: 0 0 86px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        height: auto
    }
    .signContactPayDiv {
        line-height: 40px;
        background: white;
        width: 5.4%;
        display: flex;
        align-items: stretch;
        flex-wrap: wrap
    }

    .signContactDivTitle {
        text-align: center;
        background: #f3f3f3;
        border: 1px solid gainsboro;
        border-top: none;
        flex: 0 0 260px;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .signContractDiv {
        font-size: 14px;
        display: flex;
        width: 598px;
    }

    .signContractTitle {
        line-height: 40px;
        background: white;
        width: 598px;
        display: flex;
        align-items: stretch;
        flex-wrap: wrap
    }

    .signContractA {
        width: 100%;
        height: auto;
        display: flex;
        align-items: stretch;
        margin-bottom: 20px;
    }

    .skuJump {
        font-weight: bold;
        color:#1fb5ad
    }

    .skuJump:hover {
        cursor: pointer
    }

    #refunicon {
        margin-top: 10px;
        width: 1158px
    }

    #refunicon .el-icon-arrow-right:before {
        content: "\E61C";
        font-size: 16px;
    }

    .SDtitle {
        float: left;
        width: 30%;
        background-color: white;
        height: 528px;
        border-radius: 5px;
        margin-right: 1%;
        position: relative
    }

    .SDtitle1 {
        font-weight: 600;
        font-size: 22px
    }

    .SDtitle2 {
        position: absolute;
        top: 10px;
        right: 10px;
        width: 200px;
        text-align: right;
    }

    .SDtitle3 {
        position: absolute;
        right: 50px;
        top: 0
    }

    .SDtitleimg {
        position: absolute;
        top: 60px;
        right: 15px
    }

    .SDtitleimg img {
        border-radius: 50%
    }

    .SDsign {
        float: left;
        width: 69%;
        background-color: white;
        height: 528px;
        border-radius: 5px;
        position: relative
    }

    .SDsign600 {
        font-weight: 600;
        font-size: 22px
    }

    .SDselect {
        min-height: 100px;
        height: atuo;
        overflow: auto
    }

    .SDtu {
        margin-right: 30%;
        margin-bottom: 10px;
        margin-top: 10px
    }

    .SDm30 {
        margin-right: 30px
    }

    .SDtuc {
        text-align: center
    }

    .SDt1 {
        display: flex;
        justify-content: flex-start;
    }

    .SDt2 {
        width: 545px;
        display: flex;
        flex-direction: column
    }

    .SDre1 {
        font-weight: bold;
        font-size: 16px;
    }

    .SDre2 {
        text-indent: 2em;
    }

    .SDrer {
        text-indent: 2em;
        color: #f74242
    }

    .SDcon {
        float: left;
        width: 100%;
        background-color: white;
        height: auto;
        border-radius: 5px;
        position: relative;
        margin-top: 20px;
        margin-bottom: 20px
    }

    .SDcon1 {
        font-weight: 600;
        font-size: 22px;
       
    }

    .SDconfloat {
        float: right
    }

    .SDtable {
        display: flex;
        align-items: center;
        margin-left: 10px
    }

    .SDtable1 {
        font-size: 16px;
        margin-left: 10px
    }

    .SDtable2 {
        margin-right: 10px;
        color: grey;
        font-size: 16px
    }

    .SDtable3 {
        margin-right: 5px
    }

    .SDtable4 {
        display: flex;
        justify-content: space-between;
    }

    .SDct1 {
        font-weight: 600;
        font-size: 22px
    }

    .SDct2 {
        position: absolute;
        top: 10px;
        right: 15px
    }

    .SDct3 {
        min-height: 300px;
        width: 96%;
        margin: 0 auto;
        padding-bottom: 35px;
    }

    .SDct4 {
        border-radius: 50%;
        margin-top: 15px;
        margin-right: 12%;
        border:1px solid gainsboro;
    }

    .SDct5 {
        margin-right: 20px
    }

    .SDct6 {
        height: 30px
    }

    .SDct7 {
        margin-top: 15px;
        float: left
    }

    .SDct8 {
        font-size: 13px;
        color: grey;
        margin-top: 15px;
        text-align: right;
        float: right
    }

    .SDct9 {
        font-size: 14px;
        color: grey;
        margin-top: 10px
    }

    .SDct10 {
        float: left;
        margin-bottom: 8px
    }

    .SDstitle {
        display: flex;
    }

    .SDstitle1 {
        text-align: center;
        height: 40px;
        line-height: 40px;
        background: #f3f3f3;
        border: 1px solid gainsboro;
        flex: 0 0 260px
    }

    .SDw142 {
        width: 142px
    }

    .SD142float {
        width: 142px;
        margin-right: 30px;
        float: left
    }

    .SDfloat {
        width: 142px;
        float: left
    }

    .SDaltergrey {
        margin-left: 10px;
        width: 200px;
        color: grey
    }

    .SDmb5 {
        margin-bottom: 5p
    }

    .SDw103 {
        width: 103px
    }

    .SDw123 {
        width: 123px
    }

    .SDml10 {
        margin-left: 10px
    }

    .SD131 {
        width: 131px;
        margin-left: 7px
    }

    .SDpr {
        position: relative
    }

    .SDnred {
        color: red;
        margin-left: 100px
    }

    .SDmt10 {
        margin-top: 10px
    }

</style>
