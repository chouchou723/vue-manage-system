<template>
    <div class="tableUserDCD">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-my-gerenxinxi"></i> 学员合同</el-breadcrumb-item>
                <el-breadcrumb-item to="/myContracts">我的合同</el-breadcrumb-item>
                <el-breadcrumb-item class='ss'>合同编号:{{contract.sku}}</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <!-- 用户资料 -->
        <!-- <div style="background-color:white;height:auto;border-radius:5px;position:relative;margin-bottom:10px">
            <div class='UserDetailTitle'>
                <span style="font-weight:600;font-size:22px">学员资料</span>
            </div>
            <el-form id='contractDeatilForm' label-width="102px" label-position='left' style='border-top:1px solid #e8e8e8 ;padding-left:10px'>
                <el-form-item label="姓名:" prop='name'>
                    <span class='canToS' @click='gotoS'>{{student.name}}</span>
                </el-form-item>
                <el-form-item label="性别:" prop='sex'>
                    <span>{{student.sex}}</span>
                </el-form-item>
                <el-form-item label="身份证号:" prop='id_number'>
                    <span>{{student.id_number}}</span>
                </el-form-item>
                <el-form-item label="年龄:" prop='age'>
                    <span>{{student.age}}</span>
                </el-form-item>
                <el-form-item label="家长:" prop='parent'>
                    <span>{{student.parent}}</span>
                </el-form-item>
                <el-form-item label="第二家长:" prop='parent1'>
                    <span>{{student.parent1}}</span>
                </el-form-item>
                <el-form-item label="手机:" prop='parent_phone'>
                    <span>{{student.parent_phone}}</span>
                </el-form-item>
                <el-form-item label="第二手机:" prop='parent1_phone'>
                    <span>{{student.parent1_phone}}</span>
                </el-form-item>
                <el-form-item label="渠道来源:" prop='channel'>
                    <span>{{student.channel}}</span> -->
        <!-- <span v-if="student.channel =='转介绍'">家长：{{student.channel}}</span> -->
        <!-- </el-form-item>
                <el-form-item label="录入时间:" prop='time'>
                    <span>{{student.time}}</span>
                </el-form-item>
                <el-form-item label="校区:" prop='school'>
                    <span>{{student.school}}</span>
                </el-form-item>
                <el-form-item label="课程顾问(CC):" prop='teacher'>
                    <span>{{student.teacher}}</span>
                </el-form-item>
            </el-form>
        </div> -->
        <!-- 合同信息 -->
        <div id='contractAll'>
            <div class='contractDetailTitle'>
                <span class='CDtitle'>合同</span>
                <span class='canToS' @click='gotoS'>学员姓名:{{student.name}}</span>
                <span class='CDgrey'>合同类型:{{contract.new_order}}</span>
                <div class="CDbutton">
                    <el-button type="primary" size="mid" @click="editContract(contract)" v-if="contract.order_status!='审核通过'&&!code.includes('_c')">修改合同</el-button>
                </div>
            </div>
            <div id='contractDetail'>
                <el-table :data="contract.datatable" border style="width: 100%;">
                    <el-table-column prop="title" label="课程" width='170'>
                        <template scope="scope">
                            <div class="CDtableTitle">
                                <div v-for='(item,index) in scope.row.title' :class="index != (scope.row.title.length-1)?'CDtableCourse':'CDtableCourse1'">{{item}}</div>
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column prop="course_num" label="课时" width='50'>
                        <template scope="scope">
                            <div v-for='(item,index) in scope.row.course_num' :class="index != (scope.row.title.length-1)?'CDtableTime':'CDtableTime1'">
                                {{item}}</div>
                        </template>
                    </el-table-column>
                    <el-table-column prop="peopleNumber" label="签单数" width='50'>
                        <template scope="scope">
                            <div v-for='(item,index) in scope.row.peopleNumber' :class="index != (scope.row.title.length-1)?'CDtableTime':'CDtableTime1'">
                                {{item}}</div>
                        </template>
                    </el-table-column>
                    <el-table-column prop="tuition_money" label="学费" width='65'>
                        <template scope="scope">
                            <div v-for='(item,index) in scope.row.tuition_money' :class="index != (scope.row.title.length-1)?'CDtableTime':'CDtableTime1'">
                                {{item}}</div>
                        </template>
                    </el-table-column>
                    <el-table-column prop="teaching_money" label="教材费" width='65'>
                        <template scope="scope">
                            <div v-for='(item,index) in scope.row.teaching_money' :class="index != (scope.row.title.length-1)?'CDtableTime':'CDtableTime1'">
                                {{item}}</div>
                        </template>
                    </el-table-column>
                    <el-table-column prop="bookMoney" label="书本费" width='65'>
                        <template scope="scope">
                            <div v-for='(item,index) in scope.row.bookMoney' :class="index != (scope.row.title.length-1)?'CDtableTime':'CDtableTime1'">
                                {{item}}</div>
                        </template>
                    </el-table-column>
                    <el-table-column prop="coupons" label="优惠类型" width='100'>
                        <template scope="scope">
                            <el-tooltip class="item" effect="dark" placement="top" v-for='(item,index) in scope.row.coupons' v-if="scope.row.coupons !=''"
                                popper-class='w200'>
                                <div slot="content">{{item.info}}</div>
                                <div class='CDgreen'>{{item.title}}</div>
                            </el-tooltip>
                            <div v-if='Number(scope.row.coupons) ==0'>无</div>
                        </template>
                    </el-table-column>
                    <el-table-column prop="couponsMoney" label="优惠金额" width='65'>
                        <template scope="scope">
                            <div v-for='(item,index) in scope.row.couponsMoney' :class="index != (scope.row.title.length-1)?'CDtableTime':'CDtableTime1'">
                                {{item}}</div>
                        </template>
                    </el-table-column>
                    <el-table-column prop="bufei_money" label="转课补费额" width='80' v-if='contract.bufei_money-0!=0'>
                        <template scope="scope">
                            <div>{{contract.bufei_money}}</div>
                        </template>
                    </el-table-column>
                    <el-table-column prop="collectMoney" label="实收总额" width='70'>
                        <template scope="scope">
                            <div>{{scope.row.collectMoney}}</div>
                        </template>
                    </el-table-column>
                    <el-table-column prop="assignClass" label="排班状态">
                        <template scope="scope">
                            <div v-for='(item,index) in scope.row.syllabus' v-if="item.teacher_name !=''" :class="index != (scope.row.title.length-1)?'CDtableArr':'CDtableArr1'">
                                <div>{{item.first_time}} 开课</div>
                                <div>{{item.week_num}} {{item.schooltime.substring(0,5)}} {{item.class_name}} {{item.teacher_name}}</div>
                            </div>
                            <div v-else :class="index != (scope.row.title.length-1)?'gotoS':'gotoS1'" >
                                <span  style='color: rgb(226, 26, 89)' v-if="scope.row.course_curr_num[index]==='0'">已结束</span>
                                <span  style='color: #dba31c' v-else>未排班</span>
                                <!-- {{ scope.row.course_curr_num[index]==='0'?'已结束':'还未排班'}} -->
                            </div>
                            <!-- <div v-else :class="index != (scope.row.title.length-1)?'gotoS':'gotoS1'" @click='gotoS'>还未排班</div> -->
                        </template>
                    </el-table-column>
                </el-table>
                <el-form id='contractDeatilForm1' label-width="102px" label-position='left' class="CDform">
                    <!-- <div label="转课补费额:" v-if="contract.bufei_money!=0" style='color:#1fb5ad;font-size:15px;margin-bottom:10px'>
                               <span style='width:98px;display:inline-block'>
                                    转课补费额: </span>  {{contract.bufei_money}}元
                        </div> -->
                    <el-form-item label="合同编号:" prop='name'>
                        <span>{{contract.sku}}</span>
                    </el-form-item>
                    <el-form-item label="试听老师:" prop='sex'>
                        <span>{{contract.baomingTeachName?contract.baomingTeachName:'无'}}</span>
                    </el-form-item>
                    <el-form-item label="熊猫到家:" prop='age'>
                        <span>{{contract.panda_gohome==1?'有':'无'}}</span>
                    </el-form-item>
                    <el-form-item label="付款方式:" prop='money'>
                        <div v-for='item in contract.money'>{{item}}</div>
                    </el-form-item>
                    <!-- <el-form-item label="转课补费额" v-if='contract.bufei_money!=0'>
                        {{contract.bufei_money}}元
                    </el-form-item> -->
                    <el-form-item label="付款总金额:" prop='online_money' style='margin-bottom:40px'>
                        <span>{{contract.datatable[0].collectMoney}}元</span>
                    </el-form-item>
                </el-form>
                <div class="CDupload" v-if="!code.includes('_c')">
                    <el-upload   :action="action" :headers='headers'
                    list-type="picture-card" :on-preview="handlePictureCardPreview" :on-remove="handleRemove" :on-success='handleSuccess'
                    :on-error='handleError' :before-upload="beforeAvatarUpload" :on-progress='onChange' :file-list="fileList2"
                    name='orderImg' :data="upData">
                    <i class="el-icon-plus" style='position:relative'>
                            <span class='addphoto'>上传纸质合同</span>
                        <!-- <div class="addphoto" v-if="!code.includes('_c')">添加纸质合同</div> -->
                    </i>
                    </el-upload>
                    <el-dialog v-model="dialogVisible" size="small" top='5%'>
                        <img width="100%" :src="dialogImageUrl" alt="">
                    </el-dialog>
                </div>
                <div v-else style='display:flex;width:300px;justify-content: flex-end;padding:10px'>
                    <div v-for="item in fileList2" class="canClickCD" @click='clickImg(item.url)'>
                        <img :src="item.url" alt="" width="148px" height="148px">
                    </div>
                    <el-dialog v-model="dialogVisible1" size="small" top='5%'>
                            <img width="100%" :src="dialogImageUrl1" alt="">
                        </el-dialog>
                </div>
                <div class='CDsign'>
                    <div class="CDmargin10">
                        财务签章:
                        <span v-if="contract.order_status =='待审核'" class="CDblue">待审核</span>
                    </div>
                    <div>
                        签约时间: {{contract.created?contract.created.slice(0,10):''}}
                    </div>
                    <div class="CDpic">
                        <img :src="approvalSrc" alt="" width="100" v-if="contract.order_status =='审核通过'">
                        <img :src="approvalSrc1" alt="" width="100" v-if="contract.order_status =='审核失败'">
                        <img :src="approvalSrc2" alt="" width="100" v-if="contract.order_status =='审核驳回'">

                    </div>
                </div>
            </div>
            <div class='record' v-if='contract.order_logs.exchange.length!=0' v-for='item in contract.order_logs.exchange'>
                <div class='recordTitle'>抵换记录</div>
                <div class='recordTitleContent1'>{{item.content}}</div>
                <div class='recordTitleContent3'>操作人:{{item.teach_uid}}</div>
                <div class='recordTitleContent2'>操作日期:{{item.created}}</div>
            </div>
            <div class='record2' v-if='contract.order_logs.freeze.length!=0' v-for='item in contract.order_logs.freeze'>
                <div class='recordTitle'>冻结记录</div>
                <div class='recordTitleContent1'>{{item.content}}</div>
                <div class='recordTitleContent3'>操作人:{{item.teach_uid}}</div>
                <div class='recordTitleContent2'>操作日期:{{item.created}}</div>
            </div>
            <div class='record3' v-if='contract.order_logs.thaw.length!=0' v-for='item in contract.order_logs.thaw'>
                <div class='recordTitle'>解冻记录</div>
                <div class='recordTitleContent1'>{{item.content}}
                </div>
                <div class='recordTitleContent3'>操作人:{{item.teach_uid}}</div>
                <div class='recordTitleContent2'>操作日期:{{item.created}}</div>
            </div>
            <div class='record4' v-if='contract.order_logs.modifyclass.length!=0' v-for='item in contract.order_logs.modifyclass'>
                <div class='recordTitle'>转班记录</div>
                <div class='recordTitleContent1'>{{item.content}}
                </div>
                <div class='recordTitleContent3'>操作人:{{item.teach_uid}}</div>
                <div class='recordTitleContent2'>操作日期:{{item.created}}</div>
            </div>
        </div>

        <!-- 修改合同 -->
        <el-dialog title="修改合同" :visible.sync="dialogFormVisible3" :close-on-click-modal="no" top='7%' show-close class='signContactDialogA'
            @close="resetAll('actSchool')">
            <el-form :model="actSchool" id='actSchool1' :rules='ruleActSchool' ref="actSchool" >
                <div class="CDflex">
                    <div class="CDdialogC">课程</div>
                    <div v-for='item in tableTitle' :class="[item!='优惠类型'?item=='转课补费额'?'aeee':'accc':'addd']">{{item}}</div>
                </div>
                <div class='CDdialogT'>
                    <div class='CDdialogTitle'>
                        <div v-for='i in contracts' class='CDlessonhover'>
                            <div class="CDlessonD">
                                <div>
                                    <el-select v-model="i.kc_tid"  placeholder="课程类型" size='small' class="CD123" @change='getClassName(i.kc_tid,i)'>
                                        <el-option v-for="item in classkind" :key="item.kc_tid" :label="item.kc_tname" :value="item.kc_tid">
                                        </el-option>
                                    </el-select>
                                </div>
                                <div style="margin-left:10px">
                                    <el-select v-model="i.course_id"  placeholder="课程名称" size='small' class="CD143" @change='getPrice(i,i.course_id)'>
                                        <el-option v-for="item in i.courseName1" :key="item.kcid" :label="item.title" :value="item.kcid">
                                        </el-option>
                                    </el-select>
                                </div>
                            </div>
                            <div class='editDiv'>
                                <span>{{i.year_num}}</span>
                            </div>
                            <div class='editDiv'>
                                <span>{{i.head_count}}</span>
                            </div>
                            <div class='editDiv'>
                                <span>{{i.tuition_price}}</span>
                            </div>
                            <div class='editDiv'>
                                <span>{{i.teaching_price}}</span>
                            </div>
                            <div class='editDiv'>
                                <span>{{i.book_price}}</span>
                            </div>
                            <div class='editDiv' style="background:#ffffff">
                                <span>{{i.study_money}}</span>
                            </div>
                        </div>

                    </div>
                    <div class='editCoupons'>
                        <el-select v-model="coupons" clearable multiple placeholder="请选择" size='mini' class='CD131'>
                            <el-option v-for="item in couponsList" :key="item.id" :label="item.title" :value="item.id">
                            </el-option>
                        </el-select>
                    </div>
                    <div class='editPromtion'>
                        <div v-for='i in contracts' class='editPromtionDiv'>
                            <div class='editCouponesMoney'>
                                <el-input v-model="i.coupons_money" class='promotionMoney'></el-input>
                            </div>
                        </div>
                    </div>
                    <div class='editPromtion' >
                        <div v-for='i in contracts' class='editCouponesMoney'  style="background:#ffffff">
                            <span>{{i.study_money-(i.coupons_money-0)}}</span>
                        </div>
                    </div>
                    <div class='totalP3zhuan' v-if="contract.bufei_money-0!=0">{{contract.bufei_money}}</div>
                    <div class='totalP3'>{{totalP3}}</div>
                    <!-- 总额用法 -->
                    <div class='payMethod'>
                        <div v-for='(i,index) in contracts' class='payMethodDiv'>
                            <div class='editCouponesMoney'>
                                <el-button type="text" size="small" @click="addCon(index)" :style="{color: index==0?'#1fb5ad':'red'}" v-if='index==0'>添加课程</el-button>
                                <el-button type="text" size="small" @click="delCon(index)" :style="{color: index==0?'#1fb5ad':'red'}" v-if='index!=0'>删除</el-button>
                            </div>
                        </div>

                    </div>
                </div>
                <div>
                    <!-- <div label="抵扣的转课补费额" v-if='contract.bufei_money!=0' style='color:#1fb5ad;font-size:15px;margin-bottom:20px'>
                               <span style='display:inline-block;width:128px'>抵扣的转课补费额:</span> {{contract.bufei_money}}元
                        </div> -->
                    <el-form-item label="合同编号" prop='sku'>
                        <el-input v-model="actSchool.sku" placeholder='请输入合同编号' class="CD142"></el-input>
                    </el-form-item>
                    <el-form-item label="试听老师" prop='teacher_uid' required v-if='contract.new_order_id==1'>
                        <el-select v-model="actSchool.teacher_uid" placeholder="请选择试听老师" class="CD142">
                            <el-option v-for="item in teachersName" :key="item.aid" :label="item.uname" :value="item.aid">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="熊猫到家" prop='panda_gohome'>
                        <el-select v-model="actSchool.panda_gohome" placeholder="请选择" class="CD142">
                            <el-option label="有" value="1"></el-option>
                            <el-option label="无" value="0"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="付款方式" class="CDposition" prop="method">
                        <div v-for="(a, index) in actSchool.pay" :class="[index !=0?'CDmale':'']">
                            <el-form-item  class="CD142float">
                                <el-select v-model="a.method"  placeholder="请选择方式" @change='changeReset1("method")'>
                                    <el-option v-for="item in payMethods" :key="item.id" :label="item.name" :value="item.id">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item prop="money" class="CDfloat">
                                <el-input v-model="a.money" placeholder='请输入金额' @change='changeReset1("money")'></el-input>
                            </el-form-item>
                            <span @click='addPay' class='addPayC' v-if='index==0'>添加付款方式</span>
                            <span @click='deletePay' class='deletePayC' v-else>删除</span>
                            <div style="clear:both"></div>
                        </div>
                    </el-form-item>

                    <el-form-item label="付款总额">
                        {{payTotal}}元
                        <!-- <span v-if='this.payTotal +(this.contract.bufei_money-0) != this.totalP3' class='CDred'>*付款总额与实收总额不符*</span> -->
                    </el-form-item>
                    <!-- <el-form-item label="签约时间" prop='created'>
                        <el-date-picker v-model="actSchool.created" type="date">
                        </el-date-picker>
                    </el-form-item> -->

                </div>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" :loading='writeL' @click="nextToLast('actSchool')">确定</el-button>
                <el-button @click="dialogFormVisible3 =false">取消</el-button>
                <br>
            </div>
        </el-dialog>

    </div>
</template>
<script>    
    var token, user
    import myUpload from 'vue-image-crop-upload/upload-2.vue';
    import {
        getClassLibrary,
        getLessonDetail,
        getClassKind,
        getPromotionList,
        getTeacherList,
        returnVisitDetail,
        getMyContractDetail,
        put_contract,
        deleteContractImg,
        checkOrderSku
    } from '../../api/api';
    export default {
        data() {
            var nan = (rule, value, callback) => {
                if (value === '') {
                    callback('请选择')
                } else if (typeof value == 'number') {
                    callback();
                }
            }
            var isPay = (rule, value, callback) => {
                let a = this.actSchool.pay.every(item => {
                    return item.method != ''
                })
                if (!a) {
                    callback('请选择付款方式')
                } else {
                    callback();
                }
            }
            var isMoney = (rule, value, callback) => {
                let a = 0
                this.actSchool.pay.map(item => {
                    a += item.money-0
                })
                if (this.contract.bufei_money!=0&&(a  != this.totalP3)) {
                    callback('付款金额不正确')
                }else if(a  != this.totalP3){
                    callback('付款总额与实收总额不等')
                }else{
                    callback();
                }


                if (a != this.totalP3) {
                    callback('付款总额与实收总额不等')
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
                    let para={
                        orderid:this.$route.params.order_id,
                        sku:value
                    }
                    checkOrderSku(para,token).then(res=>{
                        // console.log(res)
                        if(res.data.repeat===0){

                            callback();
                        }else{
                            callback('合同编号已存在')
                        }
                    })
                }
            }
            return {
                // action:'http://pandatest.dfth.com/api/v1/order/uploadOrderImg',
                aciton:'/api/v1/order/uploadOrderImg',
                writeL:false,
                headers: {
                    Authorization: token.Authorization
                },
                upData: {
                    order_id: this.$route.params.order_id
                },
                approvalSrc: '../../../static/img/pass.png',
                approvalSrc1: '../../../static/img/nopass.png',
                approvalSrc2: '../../../static/img/nopass.png',
                fileList2: [],
                coupons: [],
                courseName1: [],
                classkind: [],
                couponsList: [],
                teachersName: [],
                canUpload: true,
                dialogImageUrl: '',
                dialogImageUrl1: '',                
                dialogVisible: false,
                dialogVisible1: false,                
                contract: {
                    datatable: [{
                        collectMoney: 0
                    }],
                    order_logs: {
                        exchange: [],
                        freeze: [],
                        modifyclass: [],
                        thaw: []
                    }
                },
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
                // tableTitle: ['课时', '签单数', '学费', '教材费', '书本费', '优惠类型', '优惠金额', '实收总额', '操作'],
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
                    school: '',
                    time: '',
                    teacher: ''
                },
                dialogFormVisible3: false, //填写合同内容
                no: false,
                actSchool: {
                    sku: '',
                    teacher_uid: '',
                    panda_gohome: '',
                    pay: [{
                        method: '',
                        money: ''
                    }],
                    created: '',
                },
                code: '',
                paylength: '',
                ruleActSchool: {
                    sku: [{
                        required: true,
                        validator: numAndEng,
                        // message: '请输入合同编号',
                        trigger: 'blur'
                    }, ],
                    teacher_uid: [{
                        required: true,
                        message: '请选择试听老师',
                        validator: nan,
                        trigger: 'change'
                    }],
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
                    money: [{
                        required: true,
                         validator: isMoney,
                        trigger: 'blur'
                    }],
                    // created: [{
                    //     required: true,
                    //     type: 'date',
                    //     message: '请选择签约时间',
                    //     trigger: 'blur'
                    // }],
                },
                d: 0,
                stopchange: false,
            }
        },
        methods: {
            clickImg(data){
                this.dialogImageUrl1 = data;
                this.dialogVisible1 = true;
            },
            changeReset1(val){
                if(val==='money'){
                    this.$refs['actSchool'].validate((valid) => {})
                }else{
                    this.$refs['actSchool'].validateField(val);
                }
            },
            onChange(event, file, fileList) {
                // console.log(file)
                let a = document.getElementsByClassName('el-upload--picture-card')[0];
                if (file) {
                    a.style.display = 'none'
                }
            },
            beforeAvatarUpload(file) {
                const isJPG = file.type === 'image/jpeg' || file.type === 'image/png';
                const isLt2M = file.size / 1024 / 1024 < 10;

                if (!isJPG) {
                    this.$message.error('上传图片只能是 JPG或者PNG 格式!');
                }else if (!isLt2M) {
                    this.$message.error('上传图片大小不能超过10MB!');
                }
                return isJPG && isLt2M;
            },
            gotoS() {
                this.$router.push('/studentDetail/' + this.$route.params.uid);
            },
            handleSuccess(response, file, fileList) {//上传图片成功
                this.$message.success('上传成功')
                file.id = response.data.id
                let a = document.getElementsByClassName('el-upload--picture-card')[0];
                if (fileList.length == 1) {
                    a.style.display = 'inline-block'
                }else{
                    a.style.display = 'none'
                }
            },
            handleError(err, file, fileList) {
                this.$message.error(error.message)
            },
            handleRemove(file, fileList) {//移除图片
                // console.log(fileList)
                if(file.id){

                    let para = {
                        order_id: this.$route.params.order_id,
                        img_id: file.id
                    }
                    deleteContractImg(para, token).then(res => {
                        if (res.code == 0) {
                            this.$message.success('删除成功')
                        }
                    }).then(() => {
                        let a = document.getElementsByClassName('el-upload--picture-card')[0];
                        if (fileList.length < 2) {
                            setTimeout(() => {
                                
                                a.style.display = 'inline-block'
                            }, 850);
                        }
                    })
                }
            },
            handlePictureCardPreview(file) { //图片预览
                this.dialogImageUrl = file.url;
                this.dialogVisible = true;
            },
            editContract(data) { //修改合同
                
            setTimeout(() => {
                this.d = 2
            }, 500);
                this.coupons = data.datatable[0].coupons.map(item => {
                    return item.id
                })
                let arr = data.order_item.map(item => {
                    return {
                        kc_tid: item.kc_tid - 0,
                        course_id: item.course_id - 0,
                        year_num: '',
                        head_count: '',
                        tuition_price: '',
                        teaching_price: '',
                        book_price: '',
                        study_money: '',
                        coupons_money: parseInt(item.coupons_money),
                        courseName1: []
                    }
                })
                arr.map((item, index, arr) => {
                    // let that = this;
                    let a = item.kc_tid
                    this.getClassName(a, arr[index])
                    setTimeout(function () {

                        arr[index].course_id = data.order_item[index].course_id - 0
                        // that.getPrice(arr[index], arr[index].course_id)
                    }, 200);

                    // let b = item.course_id
                })
                this.contracts = [...arr]
                let pa = {
                order_id: this.$route.params.order_id
            }
            getMyContractDetail(token, pa).then(res => {
                // console.log(res)
                // let that = this;
                let data = res.data;
                this.actSchool = {
                    sku: data.sku,
                    teacher_uid: data.baomingTeachName ? data.baoming_teach.aid : '',
                    panda_gohome: data.panda_gohome,
                    pay: data.pay.filter(item => {
                        return item.method != ''
                    }),
                    created: '' //,
                }
            }).then(()=>{
                this.dialogFormVisible3 = true
            })
            },
            nextToLast(formName) { //提交修改合同
                this.$refs[formName].validate((valid) => {
                    if (valid && this.isEqual === 1&&this.contracts.every(item=>{return item.course_id})) {
                        let para = {}
                        para.order = { ...this.actSchool
                        }
                        para.order.created = ''
                        para.order.kecheng = [...this.contracts]
                        para.order.coupons = this.coupons
                        para.order_id = this.$route.params.order_id
                        para.order = JSON.stringify(para.order);
                        this.writeL = true;
                        put_contract(para, token).then(res => {
                            // console.log(res)
                            if (res.code == 0) {
                                this.$message.success('修改成功')
                                let pa = {
                                    order_id: this.$route.params.order_id
                                }
                                getMyContractDetail(token, pa).then(res => {
                                    // console.log(res)
                                    this.contract = res.data
                                })
                                this.dialogFormVisible3 = false;
                                this.writeL = false;
                            } else {
                                this.$message.error(res.data);
                                this.writeL = false;
                            }
                        }).catch((res)=>{
                            // this.$message.error('该用户未授权');
                                this.writeL = false;
                        })
                    } else {
                        // this.$message.error('付款总额与实收总额不符')
                        if(!this.contracts.every(item=>{return item.course_id})){
                            this.$message.info('课程还未选择')
                        }else{
                            this.$message.info('请确认所有项目填写正确')      
                        }
                    }
                })
            },
            addPay() {
                this.actSchool.pay.push({
                    method: '',
                    money: ''
                })
            },
            deletePay() {
                this.actSchool.pay.pop();
                this.changeReset1('method');
                this.changeReset1('money')
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
                    coupons_money: '',
                    courseName1: []
                }]
                this.actSchool = {
                    sku: '',
                    teacher_uid: '',
                    panda_gohome: '',
                    pay: [{
                        method: '',
                        money: ''
                    }],
                    created: '',
                },
                this.coupons = []
                this.d = 0
                this.$refs[formName].resetFields();
            },
            getClassName(data, i) { //获取课程名称
                if (!this.stopchange&&data) {
                    i.course_id = ''
                    let para = {
                        pid: data,
                        simple: 1
                    }
                    getClassLibrary(token, para).then((res) => {
                        i.courseName1 = res.data;
                    })
                }
            },
            getPrice(data, index) { //调详细获取价格
                if(index){

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
                            data.study_money = (a.tuition_price - 0) + (a.teaching_price -
                                0) + (a.book_price - 0);
                        } else {
                            data.year_num = '';
                            data.head_count = '';
                            data.tuition_price = '';
                            data.teaching_price = '';
                            data.book_price = '';
                            data.study_money = '';
                        }
                    })
                }
            },
            addCon(index) { //添加课程
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
            delCon(index) { //删除某个课程
                this.stopchange = true;
                let that =this;
                this.contracts.splice(index, 1);
                setTimeout(function () {
                    that.stopchange = false;
                }, 0);
               
            },
            changeReset(val) {
                if (val != '') {

                    this.$refs['actSchool'].validate((valid) => {})
                }
            }
        },
        computed: {
            tableTitle() {
                if (this.contract.bufei_money-0 != 0) {
                    return ['课时', '签单数', '学费', '教材费', '书本费', '课程金额','优惠类型', '优惠金额', '小计','转课补费额', '实收总额', '操作']
                } else {
                    return ['课时', '签单数', '学费', '教材费', '书本费', '课程金额','优惠类型', '优惠金额','小计', '实收总额', '操作']
                }
            },
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
                if (this.d > 1) {
                    this.actSchool.pay.map((item, index) => {
                        if (item != '') {
                            m = m.filter(item1 => {
                                return item1.id != item.method
                            })
                        }
                    })
                    return m
                } else {
                    return m
                }
            },
            isEqual() {
                if (this.payTotal  == this.totalP3) {
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
                return a;
            },
            totalP() {
                let a = 0;
                this.contracts.map(item => {
                    a +=((item.tuition_price - 0) + (item.teaching_price - 0) + (item.book_price - 0) - (item.coupons_money -
                        0))
                })
                return a
            },
            totalP3() {
                return (this.totalP  - (this.contract.bufei_money-0)>0?this.totalP - (this.contract.bufei_money-0):0)
                // let a = 0
                // this.contracts.map(item => {
                //     a += ((item.tuition_price - 0) + (item.teaching_price - 0) + (item.book_price - 0) - (item.coupons_money -
                //         0))
                // })
                // return a
            },
        },
        beforeCreate() {
            user = sessionStorage.getItem('user');
            token = JSON.parse(user).token;
        },
        created() {
            // this.userName = JSON.parse(user).uname;
            this.code = JSON.parse(user).job ? JSON.parse(user).job.code : '';
            let para = {
                uid: this.$route.params.uid
            }
            returnVisitDetail(token, para).then(res => { //获取用户资料
                let data = res.data.info;
                this.student.name = data.child_name
                //     // console.log(data)
                //     this.student = {
                //         name: data.child_name,
                //         age: data.age,
                //         sex: data.sex,
                //         id_number: data.id_number ? data.id_number : '无',
                //         school: data.school_name,
                //         channel: data.source_name,
                //         time: data.regtime,
                //         parent: res.data.famliys[0].uname + '(' + res.data.famliys[0].relation + ')',
                //         parent_phone: res.data.famliys[0].mobile,
                //         parent1: res.data.famliys[1] ? res.data.famliys[1].uname ? res.data.famliys[1].uname +
                //             '(' + res.data.famliys[1].relation + ')' : '暂无' : '暂无',
                //         parent1_phone: res.data.famliys[1] ? res.data.famliys[1].mobile || '暂无' : '暂无',
                //         teacher: data.cc_name
                //     }
            }).catch(() => {
                // console.log('No Data')
            })
            
        },
        mounted() {
            let pa = {
                order_id: this.$route.params.order_id
            }
            getMyContractDetail(token, pa).then(res => {
                // console.log(res)
                this.contract = res.data
                this.fileList2 = this.contract.order_img.map(item => {
                    return {
                        id: item.id,
                        url: item.path
                    }
                })
            }).then(() => {

                let a = document.getElementsByClassName('el-upload--picture-card')[0];
                if (this.fileList2.length == 2) {
                    a.style.display = 'none'
                }
            }).then(() => {
                getClassKind(token).then((res) => { //获取课程分类
                    this.classkind = res.data
                })
                let si = {
                    simple: 1,
                }
                getPromotionList(token, si).then((res) => { //获取优惠列表
                    this.couponsList = res.data;
                })
                getTeacherList(token).then((res) => { //获取老师
                    this.teachersName = res.data;
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
    .w200 {
        max-width: 200px;
        /* text-indent: 20px; */
    }

    #contractAll {
        background-color: white;
        margin-bottom: 20px;
        border-radius: 5px;
        position: relative
    }

    #contractAll .el-button--primary {
        background-color: #32a4d3;
        border-color: #32a4d3;
    }

    .UserDetailTitle {
        position: relative;
        background: url(../../../static/img/contact.png) left center/25px no-repeat;
        padding: 10px 10px 10px 27px;
        margin-left: 12px
    }

    .contractDetailTitle {
        position: relative;
        background: url(../../../static/img/contract.png) left center/30px no-repeat;
        padding: 10px 10px 10px 30px;
        margin-left: 12px
    }

    #contractDeatilForm .el-form-item {
        margin-bottom: 12px
    }

    #contractDeatilForm1 .el-form-item {
        margin-bottom: 12px
    }

    #contractDeatilForm1 .el-form-item__label {
        padding: 8px 12px 5px 0;
    }

    #contractDeatilForm1 .el-form-item__content {
        line-height: 30px
    }

    #contractDeatilForm .el-form-item__label {
        padding: 8px 12px 5px 0;
    }

    #contractDeatilForm .el-form-item__content {
        line-height: 30px
    }

    .tableUserDCD .el-tag--success {
        background-color: #1fb5ad;
        border-color: #bcf1d4;
        color: #FFFFFF;
        border-radius: 25px;
    }

    .signContactDialogA .el-dialog--small {
        width: 1256.75px;
    }

    .tableUserDCD .el-dialog .el-dialog__header {
        background-color: #1fb5ad;
        padding: 20px 20px 20px;
    }

    .tableUserDCD .el-dialog .el-dialog__title {
        color: white;
    }

    .accc {
        text-align: center;
        height: 40px;
        line-height: 40px;
        background: #f3f3f3;
        flex: 0 0 66px;
        border-right: 1px solid gainsboro;
        border-bottom: 1px solid gainsboro;
        border-top: 1px solid gainsboro
    }

    .addd {
        text-align: center;
        height: 40px;
        line-height: 40px;
        background: #f3f3f3;
        flex: 0 0 146px;
        border-right: 1px solid gainsboro;
        border-bottom: 1px solid gainsboro;
        border-top: 1px solid gainsboro
    }

    .aeee {
        text-align: center;
        height: 40px;
        line-height: 40px;
        background: #f3f3f3;
        flex: 0 0 86px;
        border-right: 1px solid gainsboro;
        border-bottom: 1px solid gainsboro;
        border-top: 1px solid gainsboro
    }

    .CDmale {
        margin-left: 76px;
        margin-top: 22px;
    }

    .addPayC {
        float: left;
        /* color: #f29c9c; */
        margin-left: 20px;
        color: #1fb5ad
    }

    .addPayC:hover {
        cursor: pointer;
    }

    .deletePayC {
        float: left;
        color: #f29c9c;
        margin-left: 20px
    }

    .deletePayC:hover {
        cursor: pointer;
    }

    .promotionMoney input {
        height: 22px;
        margin: 9px auto;
        width: 80%;
    }

    #contractDetail {
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
        background: white;
        position: relative
    }

    #contractDetail .el-table td,
    #contractDetail .el-table th:not(.gutter) {
        padding: 5px 0;
        text-align: center
    }

    #contractDetail .el-table th>div,
    #contractDetail .el-table .cell {
        padding-left: 0;
        padding-right: 0;
    }

    #contractDetail .el-table::before {
        height: 0;
    }

    .gotoS {
        border-bottom: 1px solid rgb(223, 236, 235);
        line-height: 42px;
        /* color: #dba31c */
    }

    .gotoS1 {
        line-height: 42px;
        /* color: #dba31c */
    }

    /* .gotoS:hover,
    .gotoS1:hover {
        cursor: pointer;
    } */

    .record {
        display: flex;
        line-height: 40px;
        background: #fffff5;
        border: 1px solid rgb(223, 236, 235);
        color: #486a6a;
    }

    .record2 {
        display: flex;
        line-height: 40px;
        background: #d6fffd;
        border: 1px solid rgb(223, 236, 235);
        color: #486a6a;
    }

    .record3 {
        display: flex;
        line-height: 40px;
        background: #e3f1f8;
        border: 1px solid rgb(223, 236, 235);
        color: #486a6a;
    }

    .record4 {
        display: flex;
        line-height: 40px;
        background: #83c3e2;
        border: 1px solid rgb(223, 236, 235);
        color: #486a6a;
    }

    .recordTitle {
        flex: 0 0 100px;
        text-align: center;
    }

    .recordTitleContent1 {
        flex: 1 1 400px;
        border-left: 1px solid rgb(223, 236, 235);
        padding-left: 10px;
        font-size: 14px;
    }

    .recordTitleContent2 {
        font-size: 14px;
        flex: 0 0 210px;
        border-left: 1px solid rgb(223, 236, 235);
        padding-left: 10px;
    }

    .recordTitleContent3 {
        font-size: 14px;
        flex: 0 0 110px;
        border-left: 1px solid rgb(223, 236, 235);
        padding-left: 10px;
    }

    .editDiv {
        text-align: center;
        background: #f3f3f3;
        flex: 0 0 66px;
        display: flex;
        border-right: 1px solid gainsboro;
        border-bottom: 1px solid gainsboro;
        justify-content: center;
        align-items: center;
    }

    .editCoupons {
        background: #f3f3f3;
        text-align: center;
        border-right: 1px solid gainsboro;
        border-bottom: 1px solid gainsboro;
        flex: 0 0 146px;
        display: flex;
        flex-direction: column;
        justify-content: center;
    }

    .editPromtion {
        line-height: 40px;
        width: 67px;
        display: flex;
        align-items: stretch;
        flex-wrap: wrap;
    }

    .editPromtionDiv {
        font-size: 14px;
        display: flex;
        flex: 0 0 67px;
    }

    .editCouponesMoney {
        text-align: center;
        background: #f3f3f3;
        border-right: 1px solid gainsboro;
        border-bottom: 1px solid gainsboro;
        flex: 0 0 66px;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .totalP3 {
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

    .totalP3zhuan {
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

    .payMethod {
        line-height: 40px;
        background: white;
        width: 5.4%;
        display: flex;
        align-items: stretch;
        flex-wrap: wrap
    }

    .payMethodDiv {
        font-size: 14px;
        display: flex;
        flex: 0 0 66px;
    }

    .canToS {
        font-weight: bold;
        color: #1fb5ad;
        margin-left: 5px;
        padding-right: 5px;
        border-right: 1px solid gainsboro
    }

    .canToS:hover {
        cursor: pointer
    }

    .CDtitle {
        font-weight: 600;
        font-size: 22px
    }

    .CDgrey {
        color: grey;
    }

    .CDbutton {
        position: absolute;
        top: 7px;
        right: 10px;
        width: 200px;
        text-align: right;
    }

    .CDtableTitle {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }

    .CDtableCourse {
        border-bottom: 1px solid rgb(223, 236, 235);
        flex: 0 0 42px;
        line-height: 42px;
        width: 100%;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap
    }

    .CDtableCourse1 {
        flex: 0 0 42px;
        line-height: 42px;
        width: 100%;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap
    }

    .CDtableTime {
        border-bottom: 1px solid rgb(223, 236, 235);
        line-height: 42px;
    }

    .CDtableTime1 {
        line-height: 42px;
    }

    .CDgreen {
        color: #18c318
    }

    .CDtableArr {
        border-bottom: 1px solid rgb(223, 236, 235);
        line-height: 21px;
    }

    .CDtableArr1 {
        line-height: 21px;
    }

    .CDform {
        padding-top: 10px;
        padding-left: 10px;
        display: inline-block;
        color: rgb(72, 106, 106)
    }

    .CDupload {
        display: inline-block;
        margin-top: 25px;
        margin-right: 20px;
        position: relative
    }

    .CDsign {
        position: absolute;
        bottom: 17px;
        right: 134px;
        font-size: 14px;
        color: #486a6a
    }

    .CDmargin10 {
        margin-bottom: 10px
    }

    .CDblue {
        color: #2828dc;
        font-size: 16px
    }

    .CDpic {
        position: absolute;
        right: -24px;
        bottom: -8px
    }

    .CDflex {
        display: flex;
    }

    .CDdialogC {
        text-align: center;
        height: 40px;
        line-height: 40px;
        background: #f3f3f3;
        border: 1px solid gainsboro;
        flex: 0 0 280px
    }

    .CDdialogT {
        width: 100%;
        height: auto;
        display: flex;
        align-items: stretch;
        margin-bottom: 20px;
    }

    .CDdialogTitle {
        line-height: 40px;
        background: white;
        width:684px;
        display: flex;
        align-items: stretch;
        flex-wrap: wrap
    }

    .CDlessonhover {
        font-size: 14px;
        display: flex;
        width: 684px;
    }

    .CDlessonD {
        text-align: center;
        background: #f3f3f3;
        border: 1px solid gainsboro;
        border-top: none;
        flex: 0 0 280px;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .CD123 {
        width: 103px
    }
    .CD143 {
        width: 163px
    }
    .CD131 {
        width: 131px;
        margin-left: 7px
    }

    .CD142 {
        width: 142px
    }

    .CDposition {
        position: relative
    }

    .CD142float {
        width: 142px;
        margin-right: 30px;
        float: left
    }

    .CDfloat {
        width: 142px;
        float: left
    }

    .CDred {
        color: red;
        margin-left: 100px
    }

    .addphoto {
        /* position: absolute;
        font-size: 14px;
        top: -21px;
        left: 33px;
        color: rgb(72, 106, 106) */
        position: absolute;
        top: -38px;
        left: -42px;
        font-size: 18px;
        font-weight: 600;
        width: 110px;
    }
.CDupload li .el-icon-close{
    display: none;
}
.canClickCD{
    padding-right: 10px;
}
.canClickCD:hover{
cursor: pointer
}
</style>
