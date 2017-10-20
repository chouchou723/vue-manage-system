<template>
    <div>
        <!-- <div class='bigs' v-if='isDisplay=="1"' @click='closebig'></div> -->
        <!-- <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-my-kaoqinliuchengtongji"></i> 学员管理</el-breadcrumb-item>
            </el-breadcrumb>
        </div> -->
        <div class='teachSM'>
            <div>
                <!-- <el-checkbox v-model="checked" style='margin-left:5px' @click.native='allCheck(customerData)'></el-checkbox> -->
                <h2 class="myTeachReturn">
                    学员管理({{number}}人)
                </h2>
                <!-- <div style="margin-bottom:5px;position:relative;display:inline-block">
                    <el-button type="info" @click='openSelect'>
                        筛选<i class="el-icon-caret-bottom el-icon--right"></i>
                    </el-button> -->
                    <!-- <div :style='{opacity:isDisplay,top:isNone}' class='selctionWindow'>
                        <div style="margin:15px">筛选条件:</div>
                        <div style="width:50%;float:left">
                            <div class='studentSeletcThreeNewFL' v-if="code.includes('_c')||code.includes('_m')">
                                <span class='teachSelTitle'>老师:</span>
                                <el-select v-model="value1" clearable placeholder="选择老师">
                                    <el-option v-for="item in teacherList" :key="item.aid" :label="item.uname" :value="item.aid">
                                    </el-option>
                                </el-select>
                            </div>
                            <div class='studentSeletcThreeNewFL'>
                                <span class='teachSelTitle'>课程:</span>
                                <el-select v-model="value2" clearable filterable placeholder="课程名称">
                                    <el-option v-for="item in classkind" :key="item.kcid" :label="item.title" :value="item.kcid">
                                    </el-option>
                                </el-select>
                            </div>
                            <div class='studentSeletcThreeNewFL'>
                                <span class='teachSelTitle'>剩余课时:</span>
                                <el-select v-model="value3" clearable placeholder="剩余课时">
                                    <el-option label="6节以下" value="1"></el-option>
                                    <el-option label="6节至12节" value="2"></el-option>
                                    <el-option label="12节至24节" value="3"></el-option>
                                    <el-option label="24节以上" value="4"></el-option>
                                </el-select>
                            </div>
                            <div class='studentSeletcThreeNewFL'>
                                <span class='teachSelTitle'>使用状态:</span>
                                <el-select v-model="value4" clearable placeholder="使用状态">
                                    <el-option label="正常" value="1"></el-option>
                                    <el-option label="冻结" value="2"></el-option>
                                    <el-option label="过期" value="3"></el-option>
                                    <el-option label="已结束" value="4"></el-option>
                                </el-select>
                            </div>
                            <div class='studentSeletcThreeNewFL'>
                                <span class='teachSelTitle'>生日月份:</span>
                                <el-select v-model="value5" clearable placeholder="选择月份">
                                    <el-option label="1月" value="01"></el-option>
                                    <el-option label="2月" value="02"></el-option>
                                    <el-option label="3月" value="03"></el-option>
                                    <el-option label="4月" value="04"></el-option>
                                    <el-option label="5月" value="05"></el-option>
                                    <el-option label="6月" value="06"></el-option>
                                    <el-option label="7月" value="07"></el-option>
                                    <el-option label="8月" value="08"></el-option>
                                    <el-option label="9月" value="09"></el-option>
                                    <el-option label="10月" value="10"></el-option>
                                    <el-option label="11月" value="11"></el-option>
                                    <el-option label="12月" value="12"></el-option>
                                </el-select>
                                </el-date-picker>
                            </div>
                            <div style="position:absolute;bottom:10px;left:130px;">

                                <el-button type="primary" @click='updateList'>确定</el-button>
                                <el-button type="primary" @click='resetSelect'>重置</el-button>
                            </div>
                        </div>
                        <div class='studentSeletcThreeNewClass'>
                            <span class='teachSelTitle'>班级:</span>
                            <el-date-picker v-model="value6" type="date" placeholder="班级日期" @change='getMyClass'>
                            </el-date-picker>
                        </div>
                        <div class='studentSeletcThreeNewSy'>
                            <el-radio-group v-model="value7">
                                <el-radio v-for='item in selectionClassArrange2' :label="item.id" style='margin-bottom:10px;margin-top:10px'>
                                    <span style="margin-right:30px">{{item.week==1?'周一':item.week==2?'周二':item.week==3?'周三':item.week==4?'周四':item.week==5?'周五':item.week==6?'周六':'周日'}}  {{item.class_time.substring(0,5)}}
                        </span>
                                    <span style="margin-right:30px">{{item.teacher?item.teacher.uname:''}}</span><span>{{item.class_room.names+'(当前班级'+item.syllabus_person_num+'人)' }}
                        </span>
                                </el-radio>
                            </el-radio-group>
                        </div>

                    </div> -->
                <!-- </div> -->
               
            </div>
            <div style="display:flex;flex-wrap:wrap">
                    <div class='studentReturnThreeNewTSM' v-if="code.includes('_c')">
                            <el-select v-model="valueR" clearable placeholder="选择校区" @change="updateListCC">
                                <el-option v-for="item in optionR" :key="item.id" :label="item.title" :value="item.id">
                                </el-option>
                            </el-select>
                        </div>
                <div class='studentReturnThreeNewTSM' v-if="code.includes('_c')||code.includes('_m')">
                        <el-select v-model="value1"  placeholder="选择老师" @change="updateList">
                                <el-option v-for="item in teacherList" :key="item.aid" :label="item.uname" :value="item.aid">
                                </el-option>
                            </el-select>
                </div>

                <div class='studentReturnThreeNewTSM'>
                        <el-select v-model="value2" clearable filterable placeholder="课程名称" @change="updateList">
                                <el-option v-for="item in classkind" :key="item.kcid" :label="item.title" :value="item.kcid">
                                </el-option>
                            </el-select>
                </div>
                <div class='studentReturnThreeNewTSM'>
                    <el-select v-model="value3" clearable placeholder="剩余课时" @change="updateList">
                        <el-option label="6节以下" value="1"></el-option>
                        <el-option label="6节至12节" value="2"></el-option>
                        <el-option label="12节至24节" value="3"></el-option>
                        <el-option label="24节以上" value="4"></el-option>
                    </el-select>
                </div>
                <div class='studentReturnThreeNewTSM'>
                    <el-select v-model="value4" clearable placeholder="使用状态" @change="updateList">
                        <el-option label="正常" value="1"></el-option>
                        <el-option label="冻结" value="2"></el-option>
                        <el-option label="过期" value="3"></el-option>
                        <el-option label="已结束" value="4"></el-option>
                    </el-select>
                </div>
                <div class='studentReturnThreeNewTSM'>
                        <el-select v-model="value5" clearable placeholder="生日月份" @change="updateList">
                                <el-option label="1月" value="01"></el-option>
                                <el-option label="2月" value="02"></el-option>
                                <el-option label="3月" value="03"></el-option>
                                <el-option label="4月" value="04"></el-option>
                                <el-option label="5月" value="05"></el-option>
                                <el-option label="6月" value="06"></el-option>
                                <el-option label="7月" value="07"></el-option>
                                <el-option label="8月" value="08"></el-option>
                                <el-option label="9月" value="09"></el-option>
                                <el-option label="10月" value="10"></el-option>
                                <el-option label="11月" value="11"></el-option>
                                <el-option label="12月" value="12"></el-option>
                            </el-select>
                </div>

                <!-- <div style="position:absolute;right:10px;bottom:10px">
                    <el-button type="primary" size="mid" class='myresourceButton' @click="getvalue(1)" v-if="!code.includes('_c')">补课</el-button>
                    <el-button type="primary" size="mid" class='myresourceButton' @click="getvalue(0)"  v-if="!code.includes('_c')">提前上课</el-button>
                </div> -->
                <div style="width:200px;position:absolute;right:10px;bottom:10px">
                        <el-input placeholder="输入手机号或姓名" icon="search" v-model="input2" @keyup.enter.native="updateListI" :on-icon-click="updateListI"
                            style='margin-right:10px'> </el-input>
                    </div>
            </div>
            
        </div>
        <div id="tableTSM" v-loading="loading2">
            <div v-for="(item,index) in customerData" class='customerDataDiv'>
                <div class='TeachcustomerDiv'>
                    <div style="display:flex">

                        <!-- <el-checkbox v-model="arr15[index].check" style='margin-left:5px' @click.native='checkV(arr15[index],item)'></el-checkbox> -->
                        <div @click='gotoDetail(item)' class='myStudentsSpan'>
                            <img :src="item.img" width='38' height='38' alt="" style='border-radius:50%;'>
                            <div style="color:#1fb5ad;font-size:18px;margin-left:10px">{{item.child_name}}</div>
                        </div>
                    </div>
                    <div style="margin-right:10px;color:grey">
                        <span style="padding-right:15px;border-right:1px solid grey">

                        微信认证: <span style="color:#18c318" v-if='item.weixin'>已认证</span>
                        <span v-else>暂无</span>
                        </span>
                        <span style="padding-left:15px">
                        出生日期: {{item.birthday}}
                            </span>
                    </div>
                </div>
                <div style='display:flex;justify-content:space-between;'>
                    <el-table :data="item.order_item" border style="width: 100%;">
                        <el-table-column prop="title" label="课程">
                        </el-table-column>
                        <el-table-column prop="year_num" label="课时" width='67'>
                        </el-table-column>
                        <el-table-column prop="course_curr_num" label="剩余课时" width='67'>
                        </el-table-column>
                        <el-table-column prop="attend" label="上课时间">
                        </el-table-column>
                        <el-table-column prop="status" label="使用状态" column-key='status' width='67'>
                            <template scope="scope">
                                <span :style="scope.row.status=='正常'? 'color:black' : scope.row.status=='未排班'?'color:#dba31c':'color:#50bfff'">{{scope.row.status}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column label="36次课耗相框发放" width='163'>
                            <template scope="scope">
                                <el-button v-if='scope.row.photo_frame =="ing"' type="text" size="small" @click="claim('frame',scope.row)" style='color:white;background:#1fb5ad;padding:8px 30px'>可发</el-button>
                                <span v-else-if='scope.row.photo_frame ==="0"' style='color:white;background:#afafaf;padding:8px 20px;border-radius:7px'>未达标</span>
                                <span v-else-if='scope.row.photo_frame =="ed"'  style="color:#a7a5a5">已发放</span>
                                <span v-else-if='scope.row.photo_frame ===""'  style="color:#a7a5a5">无</span>
                                <!--   <el-button type="text" size="small" @click="open2(scope.$index, accountData)">删除</el-button> -->
                            </template>
                        </el-table-column>
                        <el-table-column label="8次课耗奖励发放" width='163'>
                            <template scope="scope">
                                    <el-button v-if='scope.row.award>0' type="text" size="small" @click="claim('award',scope.row)" style='color:white;background:#1fb5ad;padding:8px 30px'>可发 {{scope.row.award}}</el-button>
                                    <span v-else-if='scope.row.award ==="0"' style='color:white;background:#afafaf;padding:8px 20px;border-radius:7px'>未达标</span>
                                    <span v-else-if='scope.row.award =="ed"'  style="color:#a7a5a5">已发放</span>
                                    <span v-else-if='scope.row.award ===""'  style="color:#a7a5a5">无</span>
                                <!-- <el-button type="text" size="small" @click="claim(scope.$index, customerData)" style='color:white;background:#1fb5ad;padding:8px 30px'>发放</el-button> -->
                                <!--   <el-button type="text" size="small" @click="open2(scope.$index, accountData)">删除</el-button> -->
                            </template>
                        </el-table-column>
                    </el-table>
                </div>
            </div>
            <div v-if="customerData.length==0">
                    <el-table :show-header='no'>
                    </el-table>
                </div>
        </div>
        
        <div class="block">
            <el-pagination layout="prev, pager, next" :total="total" :current-page="currentPage" :page-size="pagesize" @current-change="handleCurrentChange">
            </el-pagination>
        </div>
        <!-- 待补课/提前上课按钮 -->
        <!-- <el-dialog :title="remedialTitle" :visible.sync="dialogFormVisibleremedialTitle" :close-on-click-modal="no" top='7%' show-close
            @close='resetD'>
            <el-form :model="arrange" ref="arrange" :rules='arrangeRules' label-width="80px" style="position:relative">
                <el-form-item label="班级日期" prop='time'>
                    <el-date-picker v-model="arrange.time" type="date" @change='getClassRoomArrange(arrange.time)'>
                    </el-date-picker>
                </el-form-item>
                <el-form-item prop='syllabus_id' class='selectClass' style='height:300px;overflow:auto;margin-left:-70px;width:68%'>
                    <el-radio-group v-model="arrange.syllabus_id" @change='getStudentsList(arrange)'>
                        <el-radio :label="item.id" style='margin-bottom:10px;margin-top:10px' v-for='item in selectionClassArrange'>
                            <span style="margin-right:30px">{{item.week==1?'周一':item.week==2?'周二':item.week==3?'周三':item.week==4?'周四':item.week==5?'周五':item.week==6?'周六':'周日'}}  {{item.class_time.substring(0,5)}}
                        </span>
                            <span style="margin-right:30px">{{item.teacher?item.teacher.uname:''}}</span><span>{{item.class_room.names+'(当前班级'+item.syllabus_person_num+'人)' }}
                        </span>
                        </el-radio>
                    </el-radio-group>
                </el-form-item>
                <div id="tableS" style='width: 45%;position:absolute;top:-4px;right:-10px;' v-if="arrange.syllabus_id!==''">
                    <el-table :data="resourceData" border max-height="362"  @selection-change="handleSelectionChange">
                        <el-table-column type="selection" width="75">
                        </el-table-column>
                        <el-table-column prop="child_name" label="学生">
                        </el-table-column>
                    </el-table>
                </div>
            </el-form>
            <div slot="footer" class="dialog-footer" style='margin-top:-24px'>
                <el-button @click="dialogFormVisibleremedialTitle=false">取消</el-button>
                <el-button type="primary" @click="goToEnd">下一步</el-button>
                <br>
            </div>
        </el-dialog> -->
        <!-- 待补课/提前上课第二步 -->
        <!-- <el-dialog :title="remedialTitleSecond" :visible.sync="dialogFormVisibleremedialTitle2" :close-on-click-modal="no" top='7%'
            show-close  @close='resetD1'>
            <el-form :model="arrange1" ref="arrange1" :rules='arrangeRules1' label-width="80px">
                <el-form-item label="班级日期" prop='time'>
                    <el-date-picker v-model="arrange1.time" type="date" @change='getClassRoomArrange1(arrange1.time)'>
                    </el-date-picker>
                </el-form-item>
                <el-form-item prop='syllabus_id' class='selectClass' style='height:300px;overflow:auto'>
                    <el-radio-group v-model="arrange1.syllabus_id">
                        <el-radio :label="item.id" style='margin-right:30%;margin-bottom:10px;margin-top:10px' v-for='item in selectionClassArrange1'>
                            <span style="margin-right:30px">{{item.week==1?'周一':item.week==2?'周二':item.week==3?'周三':item.week==4?'周四':item.week==5?'周五':item.week==6?'周六':'周日'}}  {{item.class_time.substring(0,5)}}
                        </span>
                            <span style="margin-right:30px">{{item.teacher?item.teacher.uname:''}}</span><span>{{item.class_room.names+'(当前班级'+item.syllabus_person_num+'人)' }}
                        </span>
                        </el-radio>
                    </el-radio-group>
                </el-form-item>

            </el-form>
            <div slot="footer" class="dialog-footer" style='margin-top:-24px'>
                <el-button @click="dialogFormVisibleremedialTitle2=false">取消</el-button>
                <el-button type="primary" @click="submitTheArrange()">提交</el-button>
                <br>
            </div>
        </el-dialog> -->
    </div>
</template>
<script>
    var token, user
    import {
        getClassLibrary,
        getDateClass,
        getTeachStudentList,
        getDetailClassTable,
        putStudentMakeup,
        sendPresent,
        getTeacherList
    } from '../../api/api';
    import {
    mapActions,mapGetters
} from 'vuex';
    export default {

        data() {
            var nan = (rule, value, callback) => {
                if (value === '') {
                    callback('请选择')
                } else if (typeof value == 'number') {
                    callback();
                }
            }
            return {
                // backA:{},
                // aid:'',
                resourceData: [],
                // isNone: '-500px',
                // canClick: true,
                // checked: '',
                // arrange: {
                //     time: '',
                //     syllabus_id: ''
                // },
                // arrange1: {
                //     time: '',
                //     syllabus_id: ''
                // },
                // arrangeRules: {
                //     // time: [{
                //     //     required: true,
                //     //     message: '请选择开课时间',
                //     //     type: 'date',
                //     //     trigger: 'change'
                //     // }],
                //     // syllabus_id: [{
                //     //     required: true,
                //     //     message: '请选择开课班级',
                //     //     validator: nan,
                //     //     trigger: 'change'
                //     // }],
                // },
                // arrangeRules1: {
                //     time: [{
                //         required: true,
                //         message: '请选择开课时间',
                //         type: 'date',
                //         trigger: 'change'
                //     }],
                //     syllabus_id: [{
                //         required: true,
                //         message: '请选择开课班级',
                //         validator: nan,
                //         trigger: 'change'
                //     }],
                // },
                // dialogFormVisibleremedialTitle2: false,
                // dialogFormVisibleremedialTitle: false,
                // selectionClassArrange: [],
                // selectionClassArrange1: [],
                // selectionClassArrange2: [],
                // isDisplay: '0',
                loading2: true,
                currentPage: 1, //页数
                pagesize: 15, //默认每页
                total: 0,
                number: 0,
                no: false,
                customerData: [],
                classkind: [],
                teacherList: [], //表单上方的select
                value1: '',
                value2: '',
                value3: '',
                value4: '', //对应select的值
                value5: '', //状态
                value6: '',
                valueR:'',
                // value7: '', //
                input2: '',
                code: '',
                remedialT: '',
                // v: [],
                optionR:[],
                multipleSelection: []
            }
        },
        methods: {
            ...mapActions([
                'setmyTeachS'
            ]),
            // submitTheArrange(formName) {//补课提前上课提交
            //     this.$refs['arrange1'].validate((valid) => {
            //         if (valid) {
            //             let para = {}
            //             let a = this.backA
            //             let b = this.arrange1
            //             para.school_time = new Date(a.time).toLocaleDateString() //待补课日期
            //             para.class_id = a.syllabus_id //待补课班级id
            //             para.uids = JSON.stringify(a.multipleSelection) //待补课学生
                        
            //             para.new_school_time = new Date(b.time).toLocaleDateString() //补课日期
            //             para.new_class_id = b.syllabus_id //补课班级id
            //             console.log(para)
            //             putStudentMakeup(para, token).then(res => {
            //                 // console.log(res)
            //                 if (res.code == 0) {
            //                     this.$message.success('添加补课成功');
            //                     this.dialogFormVisibleremedialTitle2=false
            //                 } else {
            //                     this.$message.error(res.data)
            //                 }
            //             })
            //         } else {
            //             // this.activeName = b;
            //         }
            //     })

            // },
            // handleSelectionChange(val) {//筛选中勾选学生
            //     this.multipleSelection = val.map(item => {
            //         return item.uid
            //     });
            // },
            // getStudentsList(data) {//补课第一步获取学生名单
                
            //     let para = {
            //             id: data.syllabus_id,
            //             schooltime:data.time,
            //             type:this.remedialT==1?'补课':'提前上课'
            //         }
            //         getDetailClassTable(token, para).then(res => {
            //             this.resourceData = res.data.students
            //         })
            // },
            // resetD() {
            //     this.arrange = {
            //         time: '',
            //         syllabus_id: ''
            //     }
            //     this.multipleSelection = []
            // },
            // resetD1() {
            //     this.arrange1 = {
            //         time: '',
            //         syllabus_id: ''
            //     }
            // },
            // getClassRoomArrange(time) { //补课提前上课第一步选班级 出时间表
            //     // console.log(index)
            //     if (time != '') {
            //         let para = {
            //             date: new Date(time).toLocaleDateString(), //日期
            //             aid:this.aid
            //             // course_id: 17
            //         }
            //         getDateClass(token, para).then(res => {
            //             if (res.data.length != 0) {

            //                 this.selectionClassArrange = res.data
            //                 // that.arrange.syllabus_id = time
            //                 // that.arrange.syllabus_id = ''
            //             } else {
            //                 this.arrange.syllabus_id = ''
            //                 this.selectionClassArrange = [];
            //                 this.$message.info('该天没有该课程')
            //             }
            //         })
            //     } else {
            //         // this.art[index] = {time:'',class:''}
            //         this.selectionClassArrange.splice(0, this.selectionClassArrange.length);
            //     }
            // },
            // getClassRoomArrange1(time) { //补课提前上课第二步选班级 出时间表
            //     // console.log(index)
            //     if (time != '') {
            //         let para = {
            //             date: new Date(time).toLocaleDateString(), //日期
            //             aid:this.aid,
            //             type:this.remedialT==1?1:2
            //         }
            //         getDateClass(token, para).then(res => {
            //             if (res.data.length != 0) {

            //                 this.selectionClassArrange1 = res.data
            //                 // that.arrange.syllabus_id = time
            //                 // that.arrange.syllabus_id = ''
            //             } else {
            //                 this.arrange1.syllabus_id = ''
            //                 this.selectionClassArrange1 = [];
            //                 this.$message.info('该天没有该课程')
            //             }
            //         })
            //     } else {
            //         // this.art[index] = {time:'',class:''}
            //         this.selectionClassArrange1.splice(0, this.selectionClassArrange1.length);
            //     }
            // },
            // getMyClass() { //传日期获当天自己的课
            //     if (this.value6 != '') {
            //         let para = {
            //             date: new Date(this.value6).toLocaleDateString(), //日期
            //             aid:this.aid
            //         }
            //         getDateClass(token, para).then(res => {
            //             if (res.data.length != 0) {

            //                 this.selectionClassArrange2 = res.data
            //                 // that.arrange.syllabus_id = time
            //                 // that.arrange.syllabus_id = ''
            //             } else {
            //                 // this.value6 = ''
            //                 this.selectionClassArrange2 = [];
            //                 this.$message.info('该天没有该课程')
            //             }
            //         })
            //     } else {
            //         // this.art[index] = {time:'',class:''}
            //         this.selectionClassArrange2.splice(0, this.selectionClassArrange2.length);
            //     }
            // },
            
            // checkV(data, item) { //单个checkbox点击效果
            //     let a = this.arr15.every(item => {
            //         return item.check === true;
            //     })
            //     if (a) {
            //         this.checked = true;
            //     }
            //     let b = this.arr15.some(item => {
            //         return item.check === true;
            //     })
            //     if (b) {
            //         this.canClick = false;
            //     } else {
            //         this.canClick = true;
            //     }
            //     if (data.check === false) {
            //         this.checked = false;
            //         data.uid = '';
            //     } else {
            //         data.uid = item.uid;

            //     }
            // },
            // allCheck(data) { //全选效果
            //     if (this.checked === true) {
            //         this.arr15.map((item, index, arr) => {
            //             arr[index].check = true;
            //             arr[index].uid = data[index].uid;
            //         })
            //         this.canClick = false;
            //     } else {
            //         this.arr15.map((item, index, arr) => {
            //             arr[index].check = false;
            //             arr[index].uid = ''
            //         })
            //         this.canClick = true;
            //     }
            // },
            // getvalue(num) { //点击补课,提前上课
            //     // this.v = [];
            //     // this.arr15.map((item, index) => {
            //     //     if (item.check === true) {
            //     //         this.v.push(item.uid)
            //     //     }
            //     // })
            //     this.remedialT = num
            //     this.dialogFormVisibleremedialTitle = true;
            // },
            // goToEnd() { //最后一步
            //     if (this.multipleSelection.length != 0) {
            //         this.backA = {...this.arrange}
            //         this.backA.multipleSelection = this.multipleSelection;
            //         this.dialogFormVisibleremedialTitle = false;
            //         this.dialogFormVisibleremedialTitle2 = true;
            //     } else {
            //         this.$message.info('请选择待补课的班级及学生')
            //     }

            // },
            // openSelect() { //点击筛选
            //     // console.log(this.scrollTop)
            //     let s = document.getElementsByClassName('content')[0].scrollTop;
            //     if (this.isDisplay == '0') {
            //         this.isDisplay = '1';
            //         this.isNone =  (179-s)+'px';
            //     } else {
            //         this.isDisplay = '0';
            //         this.isNone = '-500px';
            //     }
            //     if (this.classkind == '') {

            //         let si = {
            //             simple: 1,
            //         }
            //         getClassLibrary(token, si).then((res) => { //获取课程分类
            //             this.classkind = res.data
            //         })
            //     }
            //     // let para = {
            //     //     school_id: this.valueS
            //     // }
            //     getTeacherList(token).then((res) => { //获取老师
            //         this.teacherList = res.data;
            //     })
            // },
            claim(kind,data) {
                this.$confirm('是否确定发放?', '发放', {
                    title: '发放',
                    customClass: 'green',
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    // type: 'warning'
                }).then(() => {
                    let para = {
                        type:kind,
                        order_item_id:data.order_item_id
                    }
                    console.log(para)
                    sendPresent(para,token).then(res=>{
                        if(res.code==0){
                            this.$message.success('发放成功');
                            this.fetchData();
                        }else{
                            this.$message.error(res.data)
                        }
                    })
                }).catch(() => {
                    console.log('cancel')
                })
            },
            updateListCC() {
                this.currentPage = 1;
                this.value1 = '';
                this.optionR = [{aid:0,uname:'全部老师'}];
                if(this.valueR!=''){

                   let para = {
                    school_id: this.valueS
                }
                    getTeacherList(token,para).then((res) => { //获取老师
                    this.teacherList = res.data;
                    this.teacherList.unshift({
                            aid: '0',
                            uname: '全部老师'
                        })
                })
                }else{
                    this.value1 ='0';
                }
                this.fetchData();
            },
            updateList() {//select更新数据
                this.currentPage = 1;
                this.input2 = '';
                this.fetchData();
            },
            // closebig(){
            //     // this.value1 = '';
            //     // this.value2 = '';
            //     // this.value3 = '';
            //     // this.value4 = '';
            //     // this.value5 = '';
            //     // this.value6 = '';
            //     // this.value7 = '';
            //     // this.input2 = '';
            //     this.isDisplay = '0';
            //     this.isNone = '-500px';
            // },
            // resetSelect() { //筛选重置
            //     this.currentPage = 1;
            //     this.value1 = '';
            //     this.value2 = '';
            //     this.value3 = '';
            //     this.value4 = '';
            //     this.value5 = '';
            //     this.value6 = '';
            //     this.value7 = '';
            //     this.input2 = '';
            //     this.fetchData();
            //     this.isDisplay = '0';
            //     this.isNone = '-500px';
            // },
            updateListI() {//input搜索
                this.value1 = '';
                this.value2 = '';
                this.value3 = '';
                this.value4 = '';
                this.value5 = '';
                // this.value6 = '';
                // this.value7 = '';
                this.currentPage = 1;
                this.fetchData();
                
            },
            gotoDetail(row) {
                let d = {
                    page: this.currentPage,
                    school_id:this.valueR,
                    teach_id: this.value1, //老师
                    kcid: this.value2, //课程
                    course_curr_num: this.value3, //剩余课时
                    status: this.value4, //使用状态
                    birth_month: this.value5, //生日
                    // syllabus_id: this.value7, //具体班级
                }
                this.setmyTeachS(d)
                this.$router.push('/teachstudentDetail/' + row.uid);
            },
            fetchData() {
                if(Object.keys(this.getmyTeachS).length!=0){
                    this.valueR = this.getmyTeachS.school_id;
                    this.currentPage =  this.getmyTeachS.page;
                    this.value1 =  this.getmyTeachS.teach_id;
                    this.value2 =  this.getmyTeachS.kcid;
                    this.value3 =  this.getmyTeachS.course_curr_num;
                    this.value4 =  this.getmyTeachS.status;
                    this.value5 = this.getmyTeachS.birth_month;
                    // this.value7 =  this.getmyTeachS.syllabus_id;
                }
                let para = {
                    page: this.currentPage,
                    school_id:this.valueR,
                    teach_id: this.value1, //老师
                    kcid: this.value2, //课程
                    course_curr_num: this.value3, //剩余课时
                    status: this.value4, //使用状态
                    birth_month: this.value5, //生日
                    // syllabus_id: this.value7, //具体班级
                    input: this.input2
                }
                getTeachStudentList(token, para).then((res) => { //替换服务
                    this.number = res.data.total;
                    let a = res.data.data;
                    let c = res.data.last_page * this.pagesize;
                    // console.log(a)
                    this.customerData = a;
                    this.total = parseInt(c);
                }).then(() => {
                    this.loading2 = false;
                    this.setmyTeachS({})
                }).catch(() => {
                    this.$message.error('该用户未授权');
                    this.loading2 = false
                })
            },
            handleCurrentChange: function (val) {
                this.currentPage = val;
                this.fetchData();
            }
        },
        beforeCreate() {
            user = localStorage.getItem('user');
            token = JSON.parse(user).token;
        },
        created() {
            this.code = JSON.parse(user).job ? JSON.parse(user).job.code : '';
            // this.aid = JSON.parse(user)? JSON.parse(user).aid : '';
            this.fetchData();
            if(this.code.includes('teach_m')){

            getTeacherList(token).then((res) => { //获取老师
                    this.teacherList = res.data;
                    this.teacherList.unshift({
                            aid: '0',
                            uname: '全部老师'
                        })
                }).then(()=>{
                    this.value1 = '0'
                })
            }
            if(this.code.includes('_c')){
                    this.teacherList.unshift({
                            aid: '0',
                            uname: '全部老师'
                        })
                        this.value1 = '0';
            }
                let si = {
                        simple: 1,
                    }
                    getClassLibrary(token, si).then((res) => { //获取课程分类
                        this.classkind = res.data
                    })

        },
        computed: {
            ...mapGetters([
            'getmyTeachS'
            // ...
        ])
            // scrollTop(){
            //     let a = document.getElementsByClassName('content')[0].scrollTop;
            //     return a ;
            // },
            // remedialTitle() {
            //     if (this.remedialT == 1) {
            //         return '待补课班级'
            //     } else {
            //         return '待提前上课班级'
            //     }
            // },
            // remedialTitleSecond() {
            //     if (this.remedialT == 1) {
            //         return '补课班级'
            //     } else {
            //         return '提前上课班级'
            //     }
            // }
        }
        // mounted() {
        // },
        // watch: {
        //     // 如果路由有变化，会再次执行该方法
        //     // '$route' : 'fetchData'
        // }
    }

</script>
<style>
    /* .selctionWindow {
        width: 750px;
        border: 1px solid gainsboro;
        position: fixed;
        top: 179px;
        left: 367px;
        z-index: 1000;
        background: white;
        border-radius: 5px;
        min-height: 320px;
        transition: opacity 0.5s ease-in-out;
    } */

    #tableTSM {
        position: relative;
    }

    #tableTSM .el-table td,
    #tableTSM .el-table th:not(.gutter) {
        padding: 5px 5px;
        text-align: center
    }

    #tableTSM .el-table th>div,
    #tableTSM .el-table .cell {
        padding-left: 0;
        padding-right: 0;
        font-weight: normal;
    }

    /* #tableTSMre .el-table td,
    #tableTSMre .el-table th {
        padding: 5px 5px;
        text-align: center
    }

    #tableTSMre .el-table th>div,
    #tableTSMre .el-table .cell {
        padding-left: 0;
        padding-right: 0;
    } */
/* 
    #tableTSMS .el-table td,
    #tableTSMS .el-table th {
        padding: 5px 5px;
        text-align: center
    }

    #tableTSMS .el-table th>div,
    #tableTSMS .el-table .cell {
        padding-left: 0;
        padding-right: 0;
    } */

    .block {
        text-align: center;
        margin-top: 10px;
    }

    .teachSM {
        width: 100%;
        position: relative;
        height: auto;
        display: flex;
        flex-wrap: wrap;
        justify-content: flex-start;
        background-color: white;
        /* margin-top: 30px; */
        padding-top: 10px;
        margin-bottom: 5px;
        border-radius: 5px;
    }

    .myTeachReturn {
        display: inline-block;
        /*margin-top: 20px;*/
        margin-bottom: 15px;
        padding-left: 10px;
        /*
            margin-right:70%;*/
    }

    /* .studentSeletcThreeNewFL {
        width: 163px;
        margin-bottom: 10px;
        margin-left: 15px;
        float: left;
    } */

    /* .studentSeletcThreeNewFR {
        width: 163px;
        margin-bottom: 10px;
        margin-left: 15px;
        float: right;
    } */

    /* .studentSeletcThreeNewClass {
        width: 163px;
        margin-bottom: 10px;
        margin-left: 15px;
        float: right;
        margin-right: 185px
    } */

    /* .studentSeletcThreeNewSy {
        margin-bottom: 10px;
        margin-left: 15px;
        max-height: 200px;
        height: auto;
        overflow: auto;
        float: right;
        width: 350px;
    } */

    /* .studentSeletcThreeNewSy::-webkit-scrollbar {
        display: none
    } */

    /* .studentSeletcThreeNewFL .el-date-editor.el-input {
        width: 163px;
    } */

    /* .studentSeletcThreeNewSy .el-radio+.el-radio {
        margin-left: 0
    } */
    
    .studentReturnThreeNewTSM {
        display: inline-block;
        width: 103px;
        margin-right: 10px;
        margin-bottom: 10px;
        margin-left: 10px;
    }
    /* .mystudentSelect {
        display: inline-block;
        margin-left: 10px
    } */
    /* .mystudentSelect .el-date-editor.el-input {
        width: 103px;
    } */

    /*
        .remainClass .el-input__inner:hover {
            cursor: pointer;
        }
        .displaynone{
            display: none;
        }*/

    .myStudentsSpan {
        display: flex;
        align-items: center;
        margin-left: 10px;
    }

    .myStudentsSpan:hover {
        cursor: pointer;
    }


    .customerDataDiv {
        /* background: white; */
        margin-bottom: 10px;
    }

    .TeachcustomerDiv {
        display: flex;
        justify-content: space-between;
        height: 42px;
        line-height: 42px;
        border: 1px solid rgb(223, 236, 235);
        border-bottom: none;
        background: #fafafa;
        border-top-left-radius: 5px;
        border-top-right-radius: 5px;        
    }

    /* .tableReturn {
        height: 40px;
        line-height: 40px;
        display: flex;
        justify-content: space-around;
        border: 1px solid rgb(223, 236, 235);
        border-left: none;
        font-size: 14px;
    } */

    /* .tableReturnDiv140 {
        flex: 0 0 140px;
        border-right: 1px solid rgb(223, 236, 235);
    } */

    /* .tableReturnDiv2 {
        text-align: center;
        background: rgb(238, 246, 246);
        color: rgb(31, 61, 60);
        font-weight: bold;
    } */

    /* .tableReturnDiv2Auto {
        flex: auto;
    } */

    /* .tableItem {
        display: flex;
        justify-content: space-around;
        flex: auto;
        align-items: stretch;
        border-right: 1px solid rgb(223, 236, 235);
        border-bottom: 1px solid rgb(223, 236, 235);
    } */

    /* .tableItemLast {
        border-right: 1px solid rgb(223, 236, 235);
        flex: 0 0 140px;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 14px;
    } */

    /* .tableItemTag {
        flex: auto;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-wrap: wrap;
        min-height: 56px;
        height: auto;
    } */

    .green .el-message-box__header {
        background-color: #1fb5ad;
        padding: 20px 20px 20px;
    }

    .green .el-message-box__title {
        color: white;
    }

    /* .selectClass .el-radio+.el-radio {
        margin-left: 0;
    } */

    /* .teachSelTitle {
        font-size: 14px;
        width: 60px;
        display: inline-block
    } */

    /* .selectClass::-webkit-scrollbar {
        display: none
    } */
/* .bigs{
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    opacity: .5;
    background: #000;
    z-index: 999;
} */
</style>
