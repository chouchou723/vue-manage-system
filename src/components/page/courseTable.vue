<template>
    <div class='courseTableCT'>
        <div class='bigs' v-if='isDisplay=="1"'></div>
        <!-- <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-my-richeng"></i> 课程表</el-breadcrumb-item>
            </el-breadcrumb>
        </div> -->
        <div class='classTCT'>
            <div id="CTh1">
                <h3 class='classTH2'>
                    课程表
                </h3>
                <div class='oneSelect' v-if="code.includes('_c')">
                    <el-select v-model="valueS"  placeholder="校区选择" filterable @change="updateListTeach">
                        <el-option v-for="item in receiveSchool" :key="item.id" :label="item.title" :value="item.id">
                        </el-option>
                    </el-select>
                </div>
                <div class='oneSelect' v-if="code.includes('_m')||code.includes('_c')">
                    <el-select v-model="valueT" placeholder="老师选择" filterable @change="updateList">
                        <el-option v-for="item in teachersName" :key="item.aid" :label="item.uname" :value="item.aid">
                        </el-option>
                    </el-select>
                </div>
                <div class='oneSelect'>
                    <el-select v-model="valueC" clearable placeholder="选择教室" filterable @change="updateList">
                        <el-option v-for="item in classRoom" :key="item.id" :label="item.names" :value="item.id">
                        </el-option>
                    </el-select>
                </div>
                <div class='oneSelect'>
                    <el-select v-model="valueL" clearable placeholder="课程选择" filterable @change="updateList">
                        <el-option v-for="item in courseName1" :key="item.kcid" :label="item.title" :value="item.kcid">
                        </el-option>
                    </el-select>
                </div>
                <!-- <div class='oneSelect'>
                    <el-select v-model="valueK" clearable placeholder="上课类型" filterable @change="updateList">
                            <el-option label="正常" value="1"></el-option>
                            <el-option label="补课" value="2"></el-option>
                            <el-option label="代课" value="3"></el-option>
                            <el-option label="被代课" value="4"></el-option>
                    </el-select>
                </div> -->
                <el-button type="success" size="mid" style='margin:0 10px;' class='buttonAdd1' @click="createCh('classform')" v-if="!code.includes('_c')">创建补课</el-button>
                <el-button type="warning" size="mid" class='buttonAdd2' @click="openSubstitute" :disabled='isdisable2||(valueT!=aid&&code!="teach")' v-if="!code.includes('_c')">申请代课</el-button>
                <el-button type="info" size="mid" class='buttonAdd3' @click="openChange" :disabled='isdisable||(valueT!=aid&&code!="teach")' v-if="!code.includes('_c')">调课</el-button>
                <el-button type="danger" size="mid" class='buttonAdd4' @click="openStop" v-if="code.includes('teach_c')">停课</el-button>
            </div>
            <el-dialog title="创建补课" :visible.sync="dialogFormVisible" :close-on-click-modal="no" custom-class='classTableDialog' top='20%'
                @close='resetD'>
                <el-form :model="classform" :rules="rules2" ref="classform" label-position='right' label-width="80px">
                    <el-form-item label="课程" required>
                        <!-- <el-form-item prop="kc_tid" style="width:142px;margin-right:30px;display:inline-block">
                            <el-select v-model="classform.kc_tid" filterable placeholder="请选择课程类型" @change='getClassName'>
                                <el-option v-for="item in classkind" :key="item.kc_tid" :label="item.kc_tname" :value="item.kc_tid">
                                </el-option>
                            </el-select>
                        </el-form-item> -->
                        <el-form-item prop="course_id" class='CTselect'>
                            <el-select v-model="classform.course_id" placeholder="请选择课程名">
                                <el-option v-for="item in courseName" :key="item.kcid" :label="item.title" :value="item.kcid">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-form-item>
                    <el-form-item label="教室" prop="classroom_id">
                        <el-select v-model="classform.classroom_id" placeholder="请选择教室" class="CT142">
                            <el-option v-for="item in classRoom" :key="item.id" :label="item.names" :value="item.id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <!-- <el-form-item label="上课老师" prop="teacher_id">
                        {{username}} -->
                    <!-- <el-select v-model="classform.teacher_id" placeholder="请选择老师" style="width:142px;">
                            <el-option v-for="item in teachersName" :key="item.aid" :label="item.uname" :value="item.aid">
                            </el-option>
                        </el-select>
                        <span>(选填)</span> -->
                    <!-- </el-form-item> -->
                    <el-form-item label="上课时间" required>
                        <el-form-item prop="start_time" class='CTselect'>
                            <el-date-picker v-model="classform.start_time" type="date" placeholder="选择日期" style="width:142px;" :picker-options="pickerOptions0">
                            </el-date-picker>
                        </el-form-item>
                        <el-form-item prop="class_time" class='CTselect'>
                            <el-time-picker v-model="classform.class_time" format="HH:mm" style="width:142px;" placeholder="请选择具体时间" popper-class='top55'>
                            </el-time-picker>
                        </el-form-item>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer CTfooter">
                    <el-button type="primary" :loading='writeL' @click="addAccount('classform')">确 定</el-button>
                    <el-button @click="dialogFormVisible = false">取 消</el-button>
                </div>
            </el-dialog>
            <!-- <el-dialog title="考勤记录" :visible.sync="dialogFormVisibleRecord" :close-on-click-modal="no" custom-class='classTableDialog' top='10%' size="large"
            @close='resetRecord'>
            <div style="display:flex;justify-content: center;margin-bottom:10px;">
                <div>
                   日期选择: <el-date-picker v-model="classform.start_time" type="month" placeholder="选择日期" style="width:142px;" :picker-options="pickerOptions1"  @change="getClassMonth">
                                </el-date-picker>
                </div>
                <div style='margin-left:10px;'>
                      班级选择:  <el-select v-model="valueL" clearable placeholder="班级选择" filterable @change="updateList">
                                <el-option v-for="item in courseName1" :key="item.kcid" :label="item.title" :value="item.kcid">
                                </el-option>
                            </el-select>  
                    </div>
            </div>
            <div id="tableRTeach3">
                <el-table :data="resourceData2" border style="width: 100%;margin:10px auto 20px">
                    <el-table-column prop="name" label="学生姓名">
                    </el-table-column>
                    <el-table-column :prop="d.name" v-for="d in checkDate" :label="d.date">
                    </el-table-column>
                </el-table>
            </div>
        </el-dialog> -->
        </div>
        <div class="CTclass">
            <div class='classweekCT'>
                <i class="el-icon-arrow-left" @click='lastWeek'></i>
                <el-date-picker v-model="value3" type="week" class="CTclass1" :format="format" placeholder="当前周" :clearable='no' :editable='no'
                    :picker-options="dateRangeOptions1" @change='updateClass'>
                </el-date-picker>
                <i class="el-icon-arrow-right" @click='nextWeek'></i>
                <!-- <div v-if="code=='teach'" style="position: absolute;top: 0;right: 8px;"><el-button type="danger" size="mini" @click='openRecord'><i class="el-icon-my-baobiaoguanli" style="font-size:16px;"></i><span style="font-size:16px;">考勤记录</span></el-button></div> -->
                <div class="CTclass2" v-if='isdisable||isdisable2'>
                    <el-button :type="typeStatus" @click="nextToStep">下一步</el-button>
                    <el-button @click="cancelAll">取 消</el-button>
                </div>
            </div>
            <div class="CTclass3">
                <!-- <div style="text-align:center;height:40px;line-height:40px;background:white;border-left:1px solid gainsboro;border-right:1px solid gainsboro;border-bottom:1px solid gainsboro;flex:0 0 100px">老师</div> -->
                <div v-for='(item,index) in week' class="CTclass4">{{item}}
                        <span>{{index==0?w1:index==1?w2:index==2?w3:index==3?w4:index==4?w5:index==5?w6:index==6?w7:''}}</span>                        
                </div>
            </div>
            <div class="CTclass5" v-loading='loading'>

                <!-- <div style="text-align:center;background:white;border-left:1px solid gainsboro;border-right:1px solid gainsboro;border-bottom:1px solid gainsboro;flex:0 0 100px;display:flex;flex-direction: column;justify-content: center;">{{t.uname}}</div> -->
                <div v-for='item in teachers' class="CTclass6" v-if='Object.values(teachers).some(item=>{return item.length!=0})'>
                    <div v-for='i in item' :class="[i.type==0?'lessonempty':i.type==1?'lessonno':i.type==2?'lessonhoverCT':i.type==3?'lessonbe':i.type==4?'lessoning':i.type==5?'lessonstop':'']"
                        @click='showClass(i,$event)'>
                        <div class='blockDiv' v-if='openStatus=="substitute"&&(new Date()>new Date(i.schooltime)||i.type!=0)'></div>
                        <div class='blockDiv' v-if='openStatus=="change"&&(i.type==1||i.type==2)'></div>

                        <img :src="selectimg" width='50' height='50' class="disN" :id='i.schooltime' alt="" style="position:absolute;bottom:-2px;right:5px;opacity:0.5;">
                        <div class="CTclass8">
                            <span class="CTclass9">{{i.class_time}}</span>
                            <span class="CTclass10">{{i.class_room.names}}({{i.studentCount}}人)</span>
                        </div>
                        <div class="CTclass11">
                            <span class="CTclass12">{{i.title}}</span>
                            <span class="CTclass14" v-if="i.type==5">已停课</span>
                            <span class="CTclass13" v-if="i.check_status=='yes'">已签到</span>
                            <span class="CTclass14" v-if="i.check_status=='overdue'&&i.studentCount!==0">签到超时</span>
                        </div>
                    </div>
                    <!-- <div v-if='!Array.isArray(item)' style='padding-left:10px;border-bottom:1px solid gainsboro' class='lessonhoverCT'>
                        <div><span style="margin-right:10px">{{item.class_time}}</span><span style="margin-left:10px">{{item.course.title}}</span></div>
                        <div><span>{{item.class_room.names}}({{item.syllabus_person_num}}人)</span>
                            <img src="../../../static/img/editClass.png" width='20' alt="" class='classImg'>
                        </div>
                    </div> -->
                </div>
                <div v-if='Object.values(teachers).every(item=>{return item.length==0})' class='courseTableNo'>暂无课程</div>
            </div>
        </div>
        <!-- 签到超时班级详情 -->
        <el-dialog :title="classTitle" :visible.sync="dialogFormVisibleOverTime" :close-on-click-modal="no" top='10%' size='tiny' @close='clearNoSignStill'>

            <div class="CTover">
                <div class="CTover1">
                    <div>学生姓名</div>
                    <div>剩余课时</div>
                    <div>签到情况</div>
                </div>
                <div class="CTover2" v-for='(s,index) in signStatusNo.students' v-if='signStatusNo.students.length!=0'>
                    <div style='flex:0 0 56px;text-align: center;'>{{s.child_name}}</div>
                    <div style='flex:0 0 56px;text-align: center;'>{{s.course_curr_num}}</div>
                    <div :style="s.checkin_types_name=='出勤'?'color:#13ce66;flex:0 0 56px;text-align: center;':s.checkin_types_name=='请假'?'color:#dba31c;flex:0 0 56px;text-align: center;':s.checkin_types_name=='旷课'?'color:#ff4949;flex:0 0 56px;text-align: center;':'color:#c1c2c2;flex:0 0 56px;text-align: center;'">{{s.checkin_types_name}}</div>
                </div>
                <div v-if='signStatusNo.students.length==0' class="CTover3">暂无学生</div>
            </div>
            <div class="CTover4" v-if='signStatusNo.students.length!=0&&signStatusNo.check_status=="overdue"&&signStatusNo.courseType!=="short"'>
                <span class="CTover5">*签到时间已超,请尽快联系教学经理进行处理</span>
            </div>
            <div class="CTover4" v-if='signStatusNo.students.length!=0&&signStatusNo.check_status==""'>
                <span class="CTover5">*该班级还未上课,无法签到</span>
            </div>
            <div class="CTover4" v-if='signStatusNo.students.length!=0&&noSignStill===1'>
                <span class="CTover5">*该班级老师还未签到</span>
            </div>
        </el-dialog>
        <!-- 老师点名 -->
        <el-dialog :title="classTitle" :visible.sync="dialogFormVisibleClassSignup" :close-on-click-modal="no" top='10%' size='small' >

            <div class="CTover">
                <div class="CTover1">
                    <div>学生姓名</div>
                    <div>剩余课时</div>
                    <div>签到情况</div>
                </div>
                <div class="CTsign" v-for='(s,index) in signStatusNo.students' v-if='signStatusNo.students.length!=0'>
                    <div class="CTsign1">{{s.child_name}}</div>
                    <div class="CTsign2">{{s.course_curr_num}}</div>
                    <div class="CTsign3">
                        <el-switch v-model="s.checkin_types" on-text='出勤' :on-value='one' :off-value='three' off-text='旷课'  @click.native.prevent='signUpS(s,signStatusNo)' on-color="#13ce66" off-color="#ff4949"
                            v-if='s.checkin_types_name=="出勤"'>
                        </el-switch>
                        <el-switch v-model="s.checkin_types" on-text='出勤' :on-value='one' :off-value='four' off-text='调课'  @click.native.prevent='signUpS1(s,signStatusNo)' on-color="#13ce66" off-color="#50bfff"
                        v-if='s.checkin_types_name=="调课"'>
                    </el-switch>
                        <span v-if='s.checkin_types==2' class="CTsign4">请假</span>
                        <!-- <el-dropdown trigger="click" @command="handleCommand1" @click.native='signUpS(s)' menu-align='start' class='drophover'>
                            <span class="el-dropdown-link" :style="s.checkin_types_name=='出勤'?'color:#13ce66':s.checkin_types_name=='请假'?'color:#dba31c':s.checkin_types_name=='旷课'?'color:#ff4949':'color:#c1c2c2'">
                           {{s.checkin_types_name}} <i class="el-icon-arrow-down"></i>
                          </span>
                            <el-dropdown-menu slot="dropdown">
                                <el-dropdown-item command="1">出勤</el-dropdown-item>
                                <el-dropdown-item command="2">请假</el-dropdown-item>
                                <el-dropdown-item command="3">旷课</el-dropdown-item>
                            </el-dropdown-menu>
                        </el-dropdown> -->
                    </div>
                    <!-- <div :style="s.sign=='出勤'?'color:#13ce66':s.sign=='请假'?'color:#dba31c':s.sign=='旷课'?'color:#ff4949':'color:#c1c2c2'">{{s.sign}}</div> -->
                </div>
                <div v-if='signStatusNo.students.length==0' class="CTover3">暂无学生</div>
            </div>
            <div slot="footer" class="dialog-footer CTsign5" v-if='signStatusNo.students.length!=0'>
                <el-button type="primary" :loading='writeL' @click="submitTheSubstitute()" v-if='signStatusNo.courseType=="normal"'>完成</el-button>
                <!-- <el-button type="primary" @click="setAllGreen(signStatus1)" v-if='signStatusNo.courseType=="short"'>全部出勤</el-button> -->
                <el-button @click="dialogFormVisibleClassSignup=false" v-if='signStatusNo.courseType=="normal"'>取消</el-button>
                <br>
            </div>
        </el-dialog>
        <!-- 代课审核状态 -->
        <el-dialog title="代课审批" :visible.sync="dialogFormVisibleStatus" :close-on-click-modal="no" top='7%' show-close>
            <el-form label-width="120px">
                <el-form-item prop='time' label='申请人:'>
                    <div>{{approvalData.apply_teacher}}</div>
                </el-form-item>
                <el-form-item prop='time' label='代课老师:'>
                    <div>{{approvalData.deputy_teacher}}</div>
                </el-form-item>
                <el-form-item prop='time' label='代课班级:'>
                    <div v-for="item in approvalData.class">{{item}}</div>
                </el-form-item>
                <el-form-item prop='time' label='申请时间:'>
                    <div>{{approvalData.time}}</div>
                </el-form-item>
                <el-form-item prop='time' label='当前审批状态:'>
                    <el-steps :space="100" :active="approvalData.approveNumber" finish-status="success">
                        <el-step v-for="item in approvalData.approvalList">
                            <span slot='title'>{{item}}</span>
                        </el-step>
                    </el-steps>
                </el-form-item>
            </el-form>
        </el-dialog>
        <!-- 班级详情已签到 -->
        <el-dialog :title="classTitle" :visible.sync="dialogFormVisibleClass" :close-on-click-modal="no" custom-class='classDetailDialog'
            top='10%' size='tiny'>
            <div class="CTover">
                <div class="CTover1">
                    <div>学生姓名</div>
                    <div>剩余课时</div>
                    <div>签到情况</div>
                </div>
                <div class="CTover2" v-for='s in signStatusNo.students' v-if='signStatusNo.students.length!=0'>
                        <div style='flex:0 0 56px;text-align: center;'>{{s.child_name}}</div>
                        <div style='flex:0 0 56px;text-align: center;'>{{s.course_curr_num}}</div>
                        <div :style="s.checkin_types_name=='出勤'?'color:#13ce66;flex:0 0 56px;text-align: center;':s.checkin_types_name=='请假'?'color:#dba31c;flex:0 0 56px;text-align: center;':s.checkin_types_name=='旷课'?'color:#ff4949;flex:0 0 56px;text-align: center;':'color:#c1c2c2;flex:0 0 56px;text-align: center;'">{{s.checkin_types_name}}</div>
                </div>
                <div v-if='signStatusNo.students.length==0' class="CTover3">暂无学生</div>
            </div>
            <div class="CTdetail" v-if='signStatusNo.students.length!=0'>
                <div class="CTdetail1">出勤:{{signStatusNo.count.work||0}}人</div>
                <div class="CTsign4">请假:{{signStatusNo.count.vacation||0}}人</div>
                <div class="CTdetail2">旷课:{{signStatusNo.count.absent||0}}人</div>
            </div>
        </el-dialog>
        <!-- 停课 -->
        <el-dialog title="停课" :visible.sync="dialogFormVisibleStop" :close-on-click-modal="no" top='7%' show-close custom-class='stopClass'
            @close="resetClass('suspendClass')">
            <el-form :model="suspendClass" ref="suspendClass" :rules='suspendClassRules' label-width="120px">
                <el-form-item prop='school' label='选择校区' v-if="selectClass.length==0">
                    <el-select v-model="suspendClass.school"  placeholder="选择校区" filterable @change='getTeacher1'>
                        <el-option v-for="item in receiveSchool2" :key="item.id" :label="item.title" :value="item.id">
                        </el-option>
                    </el-select>
                    <!-- <el-checkbox v-model="suspendClass.isAll" class="CTstop"></el-checkbox>
                    <span class='typing' v-if='suspendClass.isAll'>全校区停课</span> -->
                </el-form-item>
                <el-form-item prop='teacher_id' label='上课老师' v-if='suspendClass.school!==0'>
                    <el-select v-model="suspendClass.teacher_id" clearable placeholder="选择老师" filterable>
                        <el-option v-for="item in listTeacher" :key="item.aid" :label="item.uname" :value="item.aid">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item prop='time' label='停课时间'>
                    <el-date-picker v-model="suspendClass.time" type="daterange" :picker-options="pickerOptions0">
                    </el-date-picker>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button type="danger" :loading='writeL' @click="submitTheStop()">提交</el-button>
                <el-button @click="cancelAll">取消</el-button>
                <br>
            </div>
        </el-dialog>
        <!-- 申请代课 -->
        <el-dialog title="选择老师" :visible.sync="dialogFormVisibleSubstitute" :close-on-click-modal="no" top='7%' show-close custom-class='substituteClass'
            @close="resetClass('substitute')">
            <el-form :model="substitute" ref="substitute" :rules='substituteRules' label-width="120px">
                <el-form-item prop='school' label='选择校区'>
                    <el-select v-model="substitute.school"  placeholder="选择校区" filterable @change='getTeacher'>
                        <el-option v-for="item in receiveSchool1" :key="item.id" :label="item.title" :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item prop='teacher' label='选择老师'>
                    <el-select v-model="substitute.teacher" placeholder="请选择老师">
                        <el-option v-for="item in listTeacher1" :key="item.aid" :label="item.uname" :value="item.aid">
                        </el-option>
                    </el-select>
                </el-form-item>
                <!-- 

                <el-form-item label="请求代课日期" prop='time' style='display:inline-block;margin-right:40px'>
                    <el-date-picker v-model="substitute.time" type="date" @change='getClassRoomArrange(substitute.time)'>
                    </el-date-picker>
                </el-form-item>
                <div style='position:absolute;right:0;top:90px;margin-top:5px;width:260px'>
                    <span style='margin-bottom:5px;display:inline-block;'>已选择班级:</span>
                    <div v-for="item in resultArr">
                        <span>{{item.week==1?'周一':item.week==2?'周二':item.week==3?'周三':item.week==4?'周四':item.week==5?'周五':item.week==6?'周六':'周日'}}  {{item.class_time.substring(0,5)}} {{item.teacher?item.teacher.uname:''}}{{item.class_room.names+'(当前班级'+item.syllabus_person_num+'人)' }}
                         </span>
                    </div>
                </div>
                <el-form-item prop='syllabus_id' class='selectClass' style='height:300px;overflow:auto;margin-left:-100px;width: 455px;'>
                    <el-checkbox-group v-model="substitute.syllabus_id">
                        <el-checkbox :label="item.id" v-for='item in selectionClassArrange' @change='getName(substitute.syllabus_id)'>
                            <span style="margin-right:20px">{{item.week==1?'周一':item.week==2?'周二':item.week==3?'周三':item.week==4?'周四':item.week==5?'周五':item.week==6?'周六':'周日'}}  {{item.class_time.substring(0,5)}}
                        </span>
                            <span style="margin-right:20px">{{item.teacher?item.teacher.uname:''}}</span><span>{{item.class_room.names+'(当前班级'+item.syllabus_person_num+'人)' }}
                        </span>
                        </el-checkbox>
                    </el-checkbox-group>
                </el-form-item> -->
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button type="warning" :loading='writeL' @click="submitTheTakeOver()">提交</el-button>
                <el-button @click="dialogFormVisibleSubstitute=false">取消</el-button>
                <br>
            </div>
        </el-dialog>
        <el-dialog title="调课" :visible.sync="dialogFormVisibleremedialTitle" :close-on-click-modal="no" top='10%' show-close @close='resetDT'
            size='small' custom-class='changeClass'>
            <div style="width:45%;display:inline-block">

                <div id="tableSCT" style='width: 280px;margin:0 auto'>
                    <!-- <div style="padding-top:9px;padding-bottom:15px">请勾选所需调课的学生</div> -->
                    <el-table :data="resourceData" border @selection-change="handleSelectionChange">
                        <el-table-column type="selection">
                        </el-table-column>
                        <el-table-column prop="child_name" label="学生" min-width='232'>
                        </el-table-column>
                    </el-table>
                    <div style="color:#ff4949" v-if='this.multipleSelection.length==0'>*请选择需要调课的学生</div>
                </div>
            </div>
            <el-form :model="arrange" ref="arrange" :rules='arrangeRules' label-width="130px" style="width:54%;float:right;">


                <el-form-item label="调入的班级日期" prop='time'>
                    <el-date-picker v-model="arrange.time" type="date" @change='getClassRoomArrange(arrange.time)' :picker-options="pickerOptions0">
                    </el-date-picker>
                </el-form-item>

                <div prop='syllabus_id' class='selectClasssyllabus' style='max-height:300px;overflow:auto;width:100%;margin-left:20px'>
                    <el-radio-group v-model="arrange.syllabus_id">
                        <el-radio :label="item.id" style='margin-bottom:10px;margin-top:10px' v-for='item in selectionClassArrange'>
                            <span style="margin-right:15px">{{item.week==1?'周一':item.week==2?'周二':item.week==3?'周三':item.week==4?'周四':item.week==5?'周五':item.week==6?'周六':'周日'}}
                                {{item.class_time}}
                            </span>
                            <span style="margin-right:15px">{{item.teacher?item.teacher.uname:''}}</span>
                            <span>{{item.class_room.names+'(当前班级'+item.syllabus_person_num+'人)' }}
                            </span>
                        </el-radio>
                    </el-radio-group>
                </div>

            </el-form>
            <div style="clear:both"></div>
            <div slot="footer" class="dialog-footer" style='margin-top:-24px'>
                <el-button type="info" :loading='writeL' @click="goToEnd">提交</el-button>
                <el-button @click="dialogFormVisibleremedialTitle=false">取消</el-button>
                <br>
            </div>
        </el-dialog>
    </div>
</template>
<script>
    var token, user
    import {
        getDateClass,
        getClassRoom,
        getTeacherList,
        getClassKind,
        getClassLibrary,
        getteachClassTable,
        getDetailClassTable,
        signClass,
        makeUpLesson,
        takeOverLesson,
        campusList,
        stopLesson,
        getApprovalDetail,
        putStudentMakeup
    } from '../../api/api';
    export default {
        data() {
            var nan = (rule, value, callback) => {
                if (typeof value == 'number') {
                    callback();
                } else {
                    callback('请选择')
                }
            }

            var stopDate = (rule, value, callback) => {
                if (value == '') {
                    callback('请选择停课时间')
                } else {
                    callback();
                }
            }
            return {
                writeL:false,
                pickerOptions0: {
                    disabledDate(time) {
                        return time.getTime() < Date.now() - 8.64e7;
                    }
                },
                pickerOptions1: {
                    disabledDate(time) {
                        return time.getTime() > Date.now() ;
                    }
                },
                one:1,
                four:4,
                loading:true,
                three:3,
                checkDate:[{date:'2017-12-04',name:'s1'},{date:'2017-12-14',name:'s2'},{date:'2017-12-24',name:'s3'},{date:'2017-11-04',name:'s4'}],
                resourceData2:[{name:'ss',s1:'出勤',s2:'请假',s3:'出勤',s4:"旷课",s5:'出勤',s6:'请假',s7:'出勤',s8:"旷课"},{name:'ssa',s1:'出勤',s2:'请假',s3:'出勤',s4:"旷课"},{name:'ssa',s1:'出勤',s2:'请假',s3:'出勤',s4:"旷课"},
                {name:'ss',s1:'出勤',s2:'请假',s3:'出勤',s4:"旷课",s5:'出勤',s6:'请假',s7:'出勤',s8:"旷课"},{name:'ssa',s1:'出勤',s2:'请假',s3:'出勤',s4:"旷课"},{name:'ssa',s1:'出勤',s2:'请假',s3:'出勤',s4:"旷课"},
                {name:'ss',s1:'出勤',s2:'请假',s3:'出勤',s4:"旷课",s5:'出勤',s6:'请假',s7:'出勤',s8:"旷课"},{name:'ssa',s1:'出勤',s2:'请假',s3:'出勤',s4:"旷课"},{name:'ssa',s1:'出勤',s2:'请假',s3:'出勤',s4:"旷课"},
                {name:'ss',s1:'出勤',s2:'请假',s3:'出勤',s4:"旷课",s5:'出勤',s6:'请假',s7:'出勤',s8:"旷课"},{name:'ssa',s1:'出勤',s2:'请假',s3:'出勤',s4:"旷课"},{name:'ssa',s1:'出勤',s2:'请假',s3:'出勤',s4:"旷课"}],
                selectionClassArrange: [],
                resourceData: [],
                dialogFormVisibleremedialTitle: false,
                arrange: {
                    time: '',
                    syllabus_id: ''
                },
                arrangeRules: {
                    time: [{
                        required: true,
                        message: '请选择调入的班级日期',
                        type: 'date',
                        trigger: 'change'
                    }],
                },
                strue: true,
                selectimg: '../../../static/img/select.png',
                valueC: '',
                valueS: '',
                valueT: '',
                valueL: '',
                valueK: '',
                aid:'',
                suspendClassRules: {
                    school: [{
                        required: true,
                        message: '请选择学校',
                        validator: nan,
                        trigger: 'change'
                    }],
                    teacher_id: [{
                        required: true,
                        message: '请选择老师',
                        validator: nan,
                        trigger: 'change'
                    }],
                    time: [{
                        required: true,
                        validator: stopDate,
                        trigger: 'change'
                    }],

                },
                suspendClass: {
                    school: '',
                    isAll: false,
                    time: [],
                    teacher_id: ''
                },
                receiveSchool: [],
                receiveSchool1: [],
                receiveSchool2: [],
                listTeacher: [],
                listTeacher1: [],
                openStatus: '',
                isdisable: false,
                isdisable2: false,
                dialogFormVisibleRecord:false,
                substitute: {
                    school: '',
                    teacher: ''
                },
                substituteRules: {
                    school: [{
                        required: true,
                        message: '请选择学校',
                        validator: nan,
                        trigger: 'change'
                    }],
                    teacher: [{
                        required: true,
                        message: '请选择老师',
                        validator: nan,
                        trigger: 'change'
                    }],
                },
                signStatusNo: {
                    students: [],
                    count: {
                        work: '',
                        vocation: '',
                        absent: ''
                    }
                },
                classRoom: [],
                teachersName: [],
                // src: '../../../static/img/editClass.png',
                dateRangeOptions1: {
                    firstDayOfWeek: 1,
                },
                value3: new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDay() == 0 ? new Date()
                    .getDate() - 5 : new Date().getDate() - new Date().getDay() + 2),
                classkind: [],
                students: [],
                teachers: [],
                noSignStill:0,
                week: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
                // currentPage: 1, //页数
                // pagesize: 15, //默认每页
                // total: 0, //总页数
                // in: '', //修改时代表修改的index
                no: false, //取消点击关闭
                courseName: [],
                courseName1: [],
                // number: '',
                value: '', //对应校区select的值
                classform: {
                    // kc_tid: '', //课程类型
                    course_id: '', //课程名
                    classroom_id: '', //教室
                    teacher_id: '', //老师
                    week: '', //星期
                    class_time: '', //具体时间
                    start_time: '', //开班时间
                    end_time: '' //结班
                },
                rules2: {
                    // kc_tid: [{
                    //     required: true,
                    //     message: '请选择课程类型',
                    //     validator: nan,
                    //     trigger: 'change'
                    // }],
                    course_id: [{
                        required: true,
                        message: '请选择课程',
                        validator: nan,
                        trigger: 'change'
                    }],
                    classroom_id: [{
                        required: true,
                        message: '请选择教室',
                        validator: nan,
                        trigger: 'change'
                    }],
                    class_time: [{
                        required: true,
                        type: 'date',
                        message: '请选择具体时间',
                        trigger: 'change'
                    }],
                    start_time: [{
                        required: true,
                        type: 'date',
                        message: '请选择开班日期',
                        trigger: 'change'
                    }],
                },
                isDisplay: '0',
                dialogFormVisible: false,
                dialogFormVisibleClass: false,
                dialogFormVisibleSubstitute: false,
                dialogFormVisibleStop: false,
                dialogFormVisibleStatus: false,
                dialogFormVisibleClassSignup: false,
                dialogFormVisibleOverTime: false,
                resultArr: [],
                selectClass: [],
                signName: {},
                code: '',
                classTitle: '',
                approvalData: {},
                thisWeekStart: '',
                thisWeekEnd: '',
                multipleSelection: [],
            }
        },
        methods: {
            resetRecord(){},
            getClassMonth(){
                
            },
            openRecord(){
                this.dialogFormVisibleRecord=true;
            },
            clearNoSignStill(){
                this.noSignStill = 0;
            },
            goToEnd() { //提交调课
                this.$refs['arrange'].validate((valid) => {
                    if (valid && this.multipleSelection.length != 0 && this.arrange.syllabus_id) {
                        let para = {}
                        let a = [...this.multipleSelection]
                        let b = { ...this.arrange
                        }
                        let c = this.selectClass
                        para.school_time = c[0].schoolDate //待补课日期
                        para.class_id = c[0].class_id //待补课班级id
                        para.uids = JSON.stringify(a) //待补课学生

                        para.new_school_time = new Date(b.time).toLocaleDateString() //补课日期
                        para.new_class_id = b.syllabus_id //补课班级id
                        // console.log(para)
                        this.writeL = true;
                        putStudentMakeup(para, token).then(res => {
                            // console.log(res)
                            if (res.code == 0) {
                                this.$message.success('调课成功');
                                this.writeL = false;
                                this.fetchData();
                                this.cancelAll();
                            } else {
                                this.$message.error(res.data);
                                this.writeL = false;
                            }
                        })
                    } else {
                        if (this.arrange.time) {
                            this.$message.info('请选择调入的班级')
                        }
                        // this.activeName = b;
                    }
                })
            },
            handleSelectionChange(val) { //筛选中勾选学生
                this.multipleSelection = val.map(item => {
                    return item.uid
                });
            },
            getClassRoomArrange(time) { //调课选班级
                // console.log(index)
                if (time != '') {
                    let para = {
                        date: new Date(time).toLocaleDateString(), //日期
                        // aid: this.aid,
                        id: this.selectClass[0].class_id
                        // course_id: 17
                    }
                    getDateClass(token, para).then(res => {
                        if (res.data.length != 0) {

                            this.selectionClassArrange = res.data
                            // that.arrange.syllabus_id = time
                            // that.arrange.syllabus_id = ''
                        } else {
                            this.arrange.syllabus_id = ''
                            this.selectionClassArrange = [];
                            this.$message.info('该天没有该课程')
                        }
                    })
                } else {
                    // this.art[index] = {time:'',class:''}
                    this.selectionClassArrange.splice(0, this.selectionClassArrange.length);
                }
            },
            resetDT() {
                this.arrange = {
                    time: '',
                    syllabus_id: ''
                }
                this.multipleSelection = []
            },

            lastWeek() {
                // this.loading= true;
                let date = new Date(this.thisWeekStart)
                let c = date.setDate(date.getDate() - 6);
                this.value3 = new Date(c)
            },
            nextWeek() {
                // this.loading= true;                
                let date = new Date(this.thisWeekStart)
                let c = date.setDate(date.getDate() + 8);
                this.value3 = new Date(c)
            },
            submitTheStop() { //提交停课
                this.$refs['suspendClass'].validate((valid) => {

                    if (valid) {
                        let para = {}
                        para.class = [...this.selectClass]
                        para.class = JSON.stringify(para.class)
                        para.teacher_id = this.suspendClass.teacher_id
                        para.school_id = this.suspendClass.school
                        para.start_time = this.suspendClass.time[0].toLocaleDateString()
                        para.end_time = this.suspendClass.time[1].toLocaleDateString()
                        para.isAll = this.suspendClass.isAll
                        // console.log(para)
                        this.writeL = true;
                        stopLesson(para, token).then(res => {
                            if (res.code == 0) {
                                this.$message.success('停课成功');
                                this.writeL = false;
                                this.fetchData()
                                this.cancelAll();
                            } else {
                                this.$message.error(res.data);
                                this.writeL = false;
                            }
                            // console.log(res)
                        })

                    }
                })

            },
            cancelStop() {
                this.dialogFormVisibleStop = false;
                this.selectClass = [];
            },
            // setAllGreen(data){//全部出勤
            //     // console.log(data)
            //     data.map(item=>{
            //         item.checkin_types_name = '出勤';
            //         item.checkin_types = 1;
            //     })
            //     this.signName = data;
            // },
            signUpS(data,course) { //点按钮出勤
            if(course.courseType!=='short'){
                if (data.checkin_types == 1) {
                    data.checkin_types = 3;
                } else {
                    data.checkin_types = 1;
                }
            }
            },
            signUpS1(data,course) { //点按钮出勤-调课
            if(course.courseType!=='short'){
                if (data.checkin_types == 1) {
                    data.checkin_types = 5;
                } else {
                    data.checkin_types = 1;
                }
            }
            },
            getTeacher() {
                this.substitute.teacher = ''
                if(this.substitute.school){

                    let para = {
                        school_id: this.substitute.school
                    }
                    getTeacherList(token, para).then((res) => { //获取老师
                        this.listTeacher1 = res.data;
                    })
                }
            },
            getTeacher1() {
                this.suspendClass.teacher_id=''
                if(this.suspendClass.school){

                    let para = {
                        school_id: this.suspendClass.school
                    }
                    getTeacherList(token, para).then((res) => { //获取老师
                        this.listTeacher = res.data;
                        this.listTeacher.unshift({uname:'全部老师',aid:0})
                    })
                }
            },
            nextToStep() {
                if (this.openStatus == 'change') {//调课
                    if (this.selectClass.length === 1) {
                        let para = {
                            id: this.selectClass[0].class_id,
                            schooltime: this.selectClass[0].schoolDate,
                            type:1
                        }
                        getDetailClassTable(token, para).then(res => {
                            this.resourceData = res.data.students
                        }).then(() => {

                            this.dialogFormVisibleremedialTitle = true;
                        })
                    } else {
                        this.$message.info('请选择需要调课的班级')
                    }
                } else {
                    if (this.selectClass.length != 0) {

                        this.dialogFormVisibleSubstitute = true;
                    } else {
                        this.$message.warning('请选择需要代课的班级')
                    }
                }
            },
            cancelAll() {
                this.isdisable = false;
                this.isdisable2 = false;
                this.openStatus = '';
                this.isDisplay = 0;
                this.selectClass.map(item => {
                    let o = document.getElementById(item.schoolDate);
                    if (o) {
                        o.className = 'disN'

                    }
                })
                this.dialogFormVisibleStop = false;
                this.dialogFormVisibleSubstitute = false;
                this.dialogFormVisibleremedialTitle = false;
                this.selectClass = []
            },
            openChange() {
                this.$message.info('请选择需要调课的班级');
                this.openStatus = 'change'
                this.isDisplay = '1';
                this.isdisable = true;
            },
            openSubstitute() {
                this.$message.warning('请选择需要代课的课程')
                this.openStatus = 'substitute'
                this.isDisplay = '1';
                this.isdisable2 = true;
               
            },
            openStop() {
                // this.isDisplay = '1';
                // this.openStatus = 'stop'
                this.dialogFormVisibleStop = true;
                // this.isdisable = true;
            },
            resetClass(form) {
                if (form == 'substitute') {
                    this.substitute = {
                        school: '',
                        teacher: ''
                    }

                    this.$refs[form].resetFields();
                    this.listTeacher1=[]
                } else {
                    this.suspendClass = {
                        school: '',
                        checked: false,
                        time: [],
                        teacher_id: ''
                    }
                    this.$refs[form].resetFields();
                    this.listTeacher=[]
                }

            },
            // getClassRoomArrange(time) { //立即排班按钮选班级 出时间表
            //     // console.log(index)
            //     let that = this;
            //     if (time != '') {
            //         let para = {
            //             date: new Date(time).toLocaleDateString(), //日期
            //             course_id: 17 //课程id
            //         }
            //         getDateClass(token, para).then(res => {
            //             if (res.data.length != 0) {

            //                 that.selectionClassArrange = res.data
            //                 // that.arrange.syllabus_id = time
            //                 // that.arrange.syllabus_id = ''
            //             } else {
            //                 that.arrange.syllabus_id = ''
            //                 that.selectionClassArrange = [];
            //                 this.$message.info('该天没有该课程')
            //             }
            //         })
            //     } else {
            //         // this.art[index] = {time:'',class:''}
            //         this.selectionClassArrange.splice(0, this.selectionClassArrange.length);
            //     }
            // },
            submitTheSubstitute() { //提交签到
                let p = { ...this.signStatusNo
                };
                p.students = JSON.stringify(p.students);
                this.writeL = true;
                signClass(p, token).then(res => {
                    if (res.code == 0) {
                        this.$message.success('签到成功');
                        this.dialogFormVisibleClassSignup = false;
                        this.writeL = false;
                        this.fetchData();

                    } else {
                        this.$message.error(res.data);
                        this.writeL = false;
                    }
                })

            },
            submitTheTakeOver() { //提交申请代课
                this.$refs['substitute'].validate((valid) => {

                    if (valid) {
                        let para = {}
                        para.class = [...this.selectClass]
                        para.class = JSON.stringify(para.class)
                        para.teacher_id = this.substitute.teacher
                        // console.log(para)
                        this.writeL = true;
                        takeOverLesson(para, token).then(res => {
                            if (res.code == 0) {
                                this.$message.success('申请成功');
                                this.writeL = false;
                                this.fetchData();
                                this.cancelAll();
                            } else {
                                this.$message.error(res.data);
                                this.writeL = false;
                            }
                            // console.log(res)
                        })

                    }
                })
            },
            substituteClass() { //点击创建补课
                this.dialogFormVisibleSubstitute = true;
            },
            // getClassName() {//获取课程名称
            //     let para = {
            //         pid: 1,
            //         simple: 1
            //     }
            //     getClassLibrary(token, para).then((res) => {

            //         this.courseName = res.data;
            //     })
            // },
            showClass(i, e) { //获取课程详细
                if (this.openStatus == '') {
                    this.classTitle = i.class_time + ' ' + i.title + ' ' + i.teacher.uname + ' ' + i.class_room.names +
                        '(' + i.studentCount + '人' + ')'
                    if (i.type == 4) {//代课审批的课
                        let para = {
                            kid: i.id
                        }
                        getApprovalDetail(token, para).then(res => {
                            this.approvalData = {
                                apply_teacher: res.data.apply_teacher,
                                deputy_teacher: res.data.deputy_teacher,
                                class: res.data.courseList,
                                time: res.data.created_at,
                                approveNumber: res.data.approveNumber,
                                approvalList: res.data.approvalList.map(item => {
                                    return item.teacher
                                })
                            }
                        }).then(()=>{
                        this.dialogFormVisibleStatus = true; //代课审批
                        })
                    } else {
                        let para = {
                            id: i.id,
                            schooltime: i.schooltime
                        }
                        getDetailClassTable(token, para).then(res => {
                            // this.signStatusNo.students =[];
                            this.signStatusNo.class_id = i.id;
                            this.signStatusNo.courseType = res.data.courseType;
                            this.signStatusNo.schooltime = i.schooltime;
                            this.signStatusNo.students = res.data.students
                            this.signStatusNo.check_status = res.data.check_status
                            this.signStatusNo.count = res.data.count ? res.data.count : {
                                work: '',
                                vocation: '',
                                absent: ''
                            }
                            return res
                        }).then((res) => {
                            if (i.type == 5 || i.type == 3) { //停课或者被代课
                                this.dialogFormVisibleClass = true; //已签到
                            }else if (i.type == 0 || i.type == 1 || i.type == 2) {//正常课,代课,补课
                                if (res.data.check_status == 'no') { //可以签到状态
                                    if(i.teacher_id==this.aid||i.check_status==='overdue'){

                                        this.dialogFormVisibleClassSignup = true; //未签到
                                    }else{
                                        this.noSignStill =1;
                                        this.dialogFormVisibleOverTime = true; //超时
                                    }
                                } else if (res.data.check_status == 'yes') {
                                    this.dialogFormVisibleClass = true; //已签到
                                }else {
                                    this.dialogFormVisibleOverTime = true; //超时    check_status == 'overdue';check_status == ''   课还未上的                             
                                } 
                                // else if (res.data.check_status == 'overdue') {
                                //     this.dialogFormVisibleOverTime = true; //超时
                                // } else {
                                //     this.dialogFormVisibleOverTime = true; //超时    check_status == ''   课还未上的                             
                                // }
                            }
                        })
                    }

                } else if (this.openStatus == 'substitute') {//代课
                    let at = new Date() < new Date(i.schooltime)
                    if (i.type == 0 &&at&&i.teacher_id==this.aid) {

                        let o = document.getElementById(i.schooltime)
                        if (o.className.match(new RegExp('(\\s|^)' + 'disN' + '(\\s|$)'))) {
                            o.className = '';
                            let a = {
                                class_id: i.id,
                                schoolDate: i.schooltime
                            }
                            this.selectClass.push(a);
                        } else {
                            o.className = 'disN';
                            this.selectClass.map((item, index, arr) => {
                                if (item.schoolDate == i.schooltime) {
                                    arr.splice(index, 1);
                                }
                            })
                        }
                    }
                    // console.log(this.selectClass)
                } else { //调课选择
                    if (i.type!='1'&&i.type!='2') {
                        // console.log(1)
                        let o = document.getElementById(i.schooltime)
                        if (o.className.match(new RegExp('(\\s|^)' + 'disN' + '(\\s|$)'))) {
                            if (this.selectClass.length != 0) {
                                this.selectClass.map(item => {
                                    let a = document.getElementById(item.schoolDate);
                                    if (a) {
                                        a.className = 'disN';
                                    }
                                })
                            }
                            o.className = '';
                            let a = {
                                class_id: i.id,
                                schoolDate: i.schooltime,
                            }
                            this.selectClass = [a]
                        } else {
                            o.className = 'disN';
                            this.selectClass.map((item, index, arr) => {
                                if (item.schoolDate == i.schooltime) {
                                    arr.splice(index, 1);
                                }
                            })
                        }
                    }
                }
            },
            updateClass() { //获取当前第几周 调服务
                // this.isdisable = false;
                // this.isdisable2 = false;
                // this.openStatus = '';
                this.selectClass.map(item => {
                    let o = document.getElementById(item.schoolDate);
                    if (o) {

                        o.className = 'disN'
                    }
                })
                // this.$next();
                // this.$nextTick();
                this.fetchData();

                // this.selectClass = []
            },
            updateListTeach() { //校区选择更新老师列表
                this.currentPage = 1;
                // this.valueT = '';
                let para = {
                    school_id: this.valueS
                }
                getTeacherList(token, para).then((res) => { //获取老师
                    this.teachersName = res.data;
                    this.valueT = res.data[0].aid
                }).then(()=>{

                // this.fetchData();
                })
            },

            updateList() { //选教室刷新表格
                this.fetchData();
            },
            createCh(formName) { //点击创建按钮
                this.dialogFormVisible = true;
            },
            resetD() {
                this.classform = {
                        // kc_tid: '',
                        course_id: '',
                        classroom_id: '',
                        class_time: '',
                        start_time: '',
                    },
                    this.$refs['classform'].resetFields();
            },
            addAccount(formName) { //点确定后创建补课
                this.$refs[formName].validate((valid) => {
                    let f = this.classform;
                    if (valid) {
                        let para = { ...f
                        };
                        para.start_time = para.start_time.toLocaleDateString();
                        para.class_time = para.class_time.toTimeString().substring(0, 5);
                        this.writeL = true;
                        makeUpLesson(para, token).then(res => {
                            if (res.code == 0) {
                                this.$message({
                                    message: '创建成功',
                                    type: 'success'
                                });
                                this.dialogFormVisible = false;
                                this.writeL = false;
                                this.fetchData();
                            } else {
                                this.$message({
                                    type: 'error',
                                    message: res.data
                                });
                                this.writeL = false;
                            }
                        })


                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            fetchData() {
                this.loading = true;                
                let a = new Date(this.value3)
                let year = a.getFullYear();
                let month = a.getMonth()
                let day = a.getDate() - 1;
                this.thisWeekStart = new Date(year, month, day).toLocaleDateString()
                // let year1 = a.getFullYear();
                // let month1 = a.getMonth()
                let day1 = a.getDate() + 5;
                this.thisWeekEnd = new Date(year, month, day1).toLocaleDateString()
                let para = {
                    start_date: this.thisWeekStart,
                    end_date: this.thisWeekEnd,
                    school_id: this.valueS,
                    classroom_id: this.valueC,
                    course_id: this.valueL,
                    // kind:this.valueK,
                    teach_id: this.valueT //this.valueT
                }
                getteachClassTable(token, para).then((res) => {
                    this.teachers = res.data;
                }).then(() => {
                    this.loading = false;
                    this.$nextTick(function () {
                        this.selectClass.map(item => {
                            let o = document.getElementById(item.schoolDate);
                            if (o) {
                                o.className = 'dis'
                            }
                        })
                    })
                })

            }
        },
        beforeCreate() {
            user = sessionStorage.getItem('user');
            token = JSON.parse(user).token;
        },
        created() { //创建组件时
            // this.username = JSON.parse(user).uname;
            this.code = JSON.parse(user).job ? JSON.parse(user).job.code : '';
            this.aid = JSON.parse(user).aid;
            if(this.code=='teach'){
            this.fetchData()
            }
            if(this.code=='teach_m'){
                getTeacherList(token).then((res) => {//获取老师
                    this.teachersName = res.data;
                }).then(()=>{
                    this.valueT =  this.aid
                })
                }
            if(this.code.includes('_c')){

            let cam = {
                simple: 1
            }
            campusList(cam, token).then((res) => { //获取校区,筛选用,停课用
                this.receiveSchool = [...res.data];
                this.valueS = res.data[0].id
                this.receiveSchool2 = res.data
                this.receiveSchool2.unshift({id:0,title:'全部校区'})
            })
            }
            getClassRoom(token).then((res) => {//获取教室
                this.classRoom = res.data;
            }).then(() => {
                let c = {
                    simple: 1,
                    type: 'all'
                }
                campusList(c, token).then((res) => {//获取校区
                    this.receiveSchool1 = res.data
                })
                let para = {//全部课程
                    // pid: 1,
                    simple: 1
                }
                getClassLibrary(token, para).then((res) => {

                    this.courseName1 = res.data;
                })
                let para1 = {//常规课
                    pid: 1,
                    simple: 1
                }
                getClassLibrary(token, para1).then((res) => {

                    this.courseName = res.data;
                })
            })
            // .then(() => {
            //     getClassKind(token).then((res) => { //获取课程分类
            //         this.classkind = res.data.filter(item=>{
            //             return item.kc_tid ==1
            //         })
            //     })
            // });



        },
        computed: {
            w1(){
                let a = new Date(this.value3);
                let b = new Date(a.setDate(a.getDate() - 1));
                return b.toLocaleDateString().substring(5);
            },
            w2(){
                let a = new Date(this.value3);
                return a.toLocaleDateString().substring(5);
            },
            w3(){
                let a = new Date(this.value3);
                let b = new Date(a.setDate(a.getDate() + 1));
                return b.toLocaleDateString().substring(5);
            },
            w4(){
                let a = new Date(this.value3);
                let b = new Date(a.setDate(a.getDate() + 2));
                return b.toLocaleDateString().substring(5);
            },
            w5(){
                let a = new Date(this.value3);
                let b = new Date(a.setDate(a.getDate() + 3));
                return b.toLocaleDateString().substring(5);
            },
            w6(){
                let a = new Date(this.value3);
                let b = new Date(a.setDate(a.getDate() + 4));
                return b.toLocaleDateString().substring(5);
            },
            w7(){
                let a = new Date(this.value3);
                let b = new Date(a.setDate(a.getDate() + 5));
                return b.toLocaleDateString().substring(5);
            },
            typeStatus: function () {
                if (this.openStatus == 'change') {
                    return 'info'
                } else {
                    return 'warning'
                }
            },
            format: function () {
                let a = new Date(this.value3)
                let year = a.getFullYear();
                let month = a.getMonth()
                let day = a.getDate() - 1;
                let thisWeekStart = new Date(year, month, day).toLocaleDateString()
                // let year1 = a.getFullYear();
                // let month1 = a.getMonth()
                let day1 = a.getDate() + 5;
                let thisWeekEnd = new Date(year, month, day1).toLocaleDateString()
                let dis = thisWeekStart + ' ~ ' + thisWeekEnd;
                return dis
            }
        }
    }

</script>
<style>
    .dis {
        display: block;
    }

    .disN {
        display: none;
    }

    .courseTableCT .el-dialog .el-dialog__header {
        background-color: #1fb5ad;
        padding: 20px 20px 20px;
    }

    .courseTableCT .el-dialog .el-dialog__title {
        color: white;
    }

    .classTCT {
        width: 100%;
        position: relative;
        height: 45px;
        background-color: white;
        /* margin-top: 30px; */
        padding-top: 10px;
        margin-bottom: 5px;
        border-radius: 5px;
    }

    .classTH2 {
        display: inline-block;
        /*margin-top: 20px;*/
        margin-bottom: 15px;
        padding-left: 10px
    }

    .oneSelect {
        display: inline-block;
        margin-bottom: 10px;
        margin-left: 10px;
        width: 140px
    }

    #CTh1 .buttonAdd1,
    .buttonAdd2,
    .buttonAdd3 {
        float: right;
    }
    /* .buttonAdd2 {
        position: absolute;
        right: 10px;
        top: 10px;
    }

    .buttonAdd3 {
        position: absolute;
        right: 200px;
        top: 10px;
    }
 */

    .buttonAdd4 {
        float: right;
        margin-right: 10px;
    }

    .courseTableCT .substituteClass .el-dialog__header {
        background-color: #f7ba2a;
        padding: 20px 20px 20px;
    }

    .courseTableCT .changeClass .el-dialog__header {
        background-color: #50bfff;
        padding: 20px 20px 20px;
    }

    .courseTableCT .stopClass .el-dialog__header {
        background-color: #ff4949;
        padding: 20px 20px 20px;
    }

    .classTableDialog .el-dialog__body {
        padding: 20px 20px 0 20px;
    }

    .classTableDialog .el-dialog__footer {
        padding: 0 20px 15px;
    }

    .classDetailDialog .el-dialog__body {
        background-color: #f3f3f3
    }

    .classDetailDialog .el-dialog__body {
        padding: 10px 10px 10px 10px;
    }

    .classDetailDialog .el-dialog__footer {
        padding: 0 20px 15px;
    }

    .classweekCT {
        width: 100%;
        background-color: white;
        text-align: center;
        height: 50px;
        line-height: 50px;
        border: 1px solid gainsboro;
        border-left: none;
        box-sizing: border-box;
        position: relative;
        z-index: 1000;
    }

    .classweekCT .el-icon-arrow-left:hover,
    .classweekCT .el-icon-arrow-right:hover {
        cursor: pointer;
        color: #1fb5ad;
    }

    .classweekCT .el-icon-arrow-left,
    .classweekCT .el-icon-arrow-right {
        color: rgb(191, 217, 216)
    }

    .lessonhoverCT,
    .lessonno,
    .lessonbe,
    .lessoning,
    .lessonstop,
    .lessonempty {
        padding-left: 20px;
        border-bottom: 1px solid gainsboro;
        position: relative
    }
    /* .lessonstop::before {
        content: '';
        position: absolute;
        width: 0;
        height: 81px;
        top: 0;
        left: 0;
        border-left: solid 18px #ff4949;
    }

    .lessonstop::after {
        content: '停课';
        color: white;
        position: absolute;
        left: 2px;
        top: 1px;
        width: 10px;
    } */

    .lessoning::before {
        content: '';
        position: absolute;
        width: 0;
        height: 81px;
        top: 0;
        left: 0;
        border-left: solid 18px #f29c9c;
        /* border-bottom:solid 30px transparent; */
    }

    .lessoning::after {
        content: '代课审批中';
        color: white;
        position: absolute;
        left: 2px;
        top: 3px;
        width: 10px;
        line-height: 16px;
    }

    .lessonbe::before {
        content: '';
        position: absolute;
        width: 0;
        height: 81px;
        top: 0;
        left: 0;
        border-left: solid 18px #f7ba2a;
        /* border-bottom:solid 30px transparent; */
    }

    .lessonbe::after {
        content: '被代课';
        color: white;
        position: absolute;
        left: 2px;
        top: 15px;
        width: 10px;
        line-height: 18px;
    }

    .lessonno::before {
        content: '';
        position: absolute;
        width: 0;
        height: 81px;
        top: 0;
        left: 0;
        border-left: solid 18px #1fb5ad;
        /* border-bottom:solid 30px transparent; */
    }

    .lessonno::after {
        content: '代课';
        color: white;
        position: absolute;
        left: 2px;
        top: 1px;
        width: 10px
    }

    .lessonhoverCT::before {
        content: '';
        position: absolute;
        width: 0;
        height: 81px;
        top: 0;
        left: 0;
        border-left: solid 18px #13ce66;
        /* border-bottom:solid 30px transparent; */
    }

    .lessonhoverCT::after {
        content: '补课';
        color: white;
        position: absolute;
        left: 2px;
        top: 1px;
        width: 10px
    }
    /* .lessonsign::before {
        content: '';
        position: absolute;
        width: 0;
        height: 81px;
        top: 0;
        left: 0;
        border-left: solid 18px #da4b63;
    }

    .lessonsign::after {
        content: '签到超时';
        color: white;
        position: absolute;
        left: 2px;
        top: 7px;
        width: 10px;
        line-height: 18px;
    } */

    .lessonhoverCT:hover {
        color: #13ce66;
        cursor: pointer;
    }
    /* .lessonsign:hover {
        color: #da4b63;
        cursor: pointer;
    } */

    .lessonno:hover {
        color: #1fb5ad;
        cursor: pointer;
    }

    .lessonbe:hover {
        color: #f7ba2a;
        cursor: pointer;
    }

    .lessoning:hover {
        color: #f29c9c;
        cursor: pointer;
    }

    .lessonstop:hover {
        color: #ff4949;
        cursor: pointer;
    }

    .lessonempty:hover {
        color: #98a9b7;
        cursor: pointer;
    }
    /* 
    .classImg {
        display: none;
        float: right;
        margin-top: 10px;
        margin-right: 10px;
        cursor: pointer;
    }

    .lessonhoverCT:hover .classImg {
        display: inline;
    } */

    .courseTableCT ::-webkit-scrollbar {
        display: none
    }
    /* .selectClass .el-checkbox+.el-checkbox {
        margin-left: 0;
    } */
    /* .drophover:hover {
        cursor: pointer
    } */

    .typing {
        display: inline-block;
        line-height: 12px;
        width: 70px;
        /* border-right: .1em solid; */
        white-space: nowrap;
        overflow: hidden;
        color: #ff4949;
        /* animation: typing 2s steps(5, end), blink-caret 0.5s step-end infinite alternate; */
    }
    /* @keyframes typing {
        0% {
            width: 0;
        }
    }

    @keyframes blink-caret {
        50% {
            border-color: transparent;
        }
    } */

    .CTselect {
        width: 142px;
        margin-right: 30px;
        display: inline-block
    }

    .CT142 {
        width: 142px;
    }

    .CTfooter {
        text-align: center;
        margin-top: 40px
    }

    .CTclass {
        border-left: 1px solid gainsboro;
    }

    .classweekCT .CTclass1 {
        width: 210px
    }

    .CTclass2 {
        position: absolute;
        right: 5px;
        top: 0
    }

    .CTclass3 {
        display: flex;
        color: darkslategrey;
    }

    .CTclass4 {
        text-align: center;
        height: 40px;
        line-height: 40px;
        background: white;
        flex: 1 1 1px;
        border-right: 1px solid gainsboro;
        border-bottom: 1px solid gainsboro;
        z-index: 1000;
    }

    .CTclass5 {
        width: 100%;
        background: white;
        display: flex;
        align-items: stretch;
        position: relative;
        color: darkslategrey;
        z-index: 1000;
    }

    .CTclass6 {
        line-height: 40px;
        background: white;
        flex: 1 1 1px;
        border-right: 1px solid gainsboro;
        border-bottom: 1px solid gainsboro;
        font-size: 12.8px;
        position: relative
    }

    .CTclass8 {
        display: flex;
        align-items: center;
        justify-content: space-between;
    }

    .CTclass9 {
        font-weight: bold;
        width: 24%;
        padding-left: 1px
    }

    .CTclass10 {
        width: 76%;
        text-align: center;
    }

    .CTclass11 {
        display: flex;
        height: 40px;
        align-items: center
    }

    .CTclass12 {
        line-height: 20px;
        flex: auto;
        padding-left: 1px;
        font-size: 15px;
        font-style: oblique;
        font-weight: bold;
    }

    .CTclass13 {
        position: absolute;
        right: 50%;
        bottom: 31px;
        color: #13ce66;
        width: 50px;
        transform: translate(25px, 0);
        border: 1px solid #13ce66;
        line-height: 17px;
        text-align: center
    }

    .CTclass14 {
        position: absolute;
        right: 50%;
        bottom: 31px;
        color: #ff4949;
        width: 60px;
        transform: translate(36px, 0);
        border: 1px solid #ff4949;
        line-height: 17px;
        text-align: center
    }

    .CTover {
        max-height: 500px;
        overflow-y: auto;
        background: white
    }

    .CTover1 {
        display: flex;
        justify-content: space-between;
        padding: 10px 0;
        margin-left: 17%;
        margin-right: 17%;
        font-weight: 600
    }

    .CTover2 {
        display: flex;
        justify-content: space-between;
        padding: 10px 0;
        /* margin-left: 20%;
        margin-right: 20% */
        width: 244px;
    margin: 0 auto;
    }

    .CTover3 {
        text-align: center;
        padding: 10px 0;
    }

    .CTover4 {
        margin-top: 10px;
        text-align: center;
    }

    .CTover5 {
        color: #ff4949
    }

    .CTsign {
        display: flex;
        justify-content: space-between;
        padding: 10px 0;
        margin-left: 20%;
        margin-right: 17%
    }

    .CTsign1 {
        flex: 1 1 1px
    }

    .CTsign2 {
        flex: 1 1 1px;
        text-align: center
    }

    .CTsign3 {
        flex: 1 1 10px;
        text-align: right
    }

    .CTsign4 {
        color: #f7ba2a
    }

    .CTsign5 {
        margin-top: -24px;
        text-align: center
    }

    .CTdetail {
        display: flex;
        justify-content: space-between;
        background: white;
        margin: 0 auto;
        line-height: 50px
    }

    .CTdetail1 {
        margin-left: 50px;
        color: #13ce66
    }

    .CTdetail2 {
        margin-right: 50px;
        color: #ff4949
    }

    .CTstop {
        margin-left: 10px
    }

    .bigs {
        position: fixed;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        opacity: .5;
        background: #000;
        z-index: 999;
    }

    #tableSCT .el-table td,
    #tableSCT .el-table th:not(.gutter) {
        padding: 5px 5px;
        text-align: center
    }

    #tableSCT .el-table th>div,
    #tableSCT .el-table .cell {
        padding-left: 0;
        padding-right: 0;
    }

    .selectClasssyllabus::-webkit-scrollbar {
        display: none
    }

    .selectClasssyllabus .el-radio+.el-radio {
        margin-left: 0;
    }

    .blockDiv {
        z-index: 1001;
        background: #000;
        width: 100%;
        height: 100%;
        opacity: 0.5;
        position: absolute;
        left: 0
    }
.courseTableNo{
width:100%;text-align:center;line-height:82px;height:82px;border-right:1px solid gainsboro;border-bottom:1px solid gainsboro
}
.top55  .el-time-panel__content::after,.top55 .el-time-panel__content::before{
        top:55%
    }
</style>
