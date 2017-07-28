<template>
    <div class="tableUserD">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-my-gerenxinxi"></i> 学员合同</el-breadcrumb-item>
                <el-breadcrumb-item to="/myContracts">我的合同</el-breadcrumb-item>
                <el-breadcrumb-item class='ss'>合同编号:{{contract.sku}}</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
         <!-- 用户资料 -->
        <div style="background-color:white;height:auto;border-radius:5px;position:relative;margin-bottom:10px">
            <!-- <div style='position:absolute;bottom:10px;right:10px'>
              <el-button v-if="this.$route.params.status=='已到访'" type="primary" size="mid" class='signC' @click='signContact'><img src="../../../static/img/recognize.png" alt="" width='25' style="margin-top:-7px;margin-left:-46px">
                            <span style="position:absolute;top:16px;right:8px;font-size:14px">签合同</span></el-button>
            </div> -->
            <div class='UserDetailTitle'>
                <!--  <i class=el-icon-my-tongxunlu style="font-size:31px"></i> -->
                <span style="font-weight:600;font-size:22px">学员资料</span>
                <!-- <div style='position:absolute;top:10px;right:10px;width:200px;text-align: right;'>
                    <div style="position:absolute;right:50px;top:0">
                      <el-button type="primary" size="mid" class='setToNo' @click='recognizeResource'><img src="../../../static/img/attention.png" alt="" width='20' style="margin-top:4px;margin-left:-77px;display:inline-block;">
                    <span style="position:absolute;right:5px;font-size:12px">设置为无需求</span></el-button>
                        
                    </div>
                    <div class='addU' @click='addU'></div>
                </div> -->
            </div>
            <el-form id='contractDeatilForm' label-width="102px" label-position='left' style='border-top:1px solid #e8e8e8 ;padding-left:10px'>
                <el-form-item label="姓名:" prop='name'>
                    <span>{{student.name}}</span>
                </el-form-item>
                <el-form-item label="性别:" prop='sex'>
                    <span>{{student.sex}}</span>
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
                    <span>{{student.channel}}</span>
                    <!-- <span v-if="student.channel =='转介绍'">家长：{{student.channel}}</span> -->
                </el-form-item>
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
        </div>
         <!-- 合同信息 -->
        <div style="background-color:white;margin-bottom: 20px;border-radius:5px;position:relative" id='contractAll'>
            <div class='contractDetailTitle'>
                <span style="font-weight:600;font-size:22px">合同</span>
                <div style='position:absolute;top:7px;right:10px;width:200px;text-align: right;'>
                    <el-button type="primary" size="mid"  @click="editContract(contract)">修改合同</el-button>
                </div>
            </div>
             <div style='display:flex;justify-content:space-between;flex-wrap:wrap;background:white;position:relative' id='contractDetail'>
                    <el-table :data="contract.datatable" border style="width: 100%;">
                        <el-table-column prop="title" label="课程" width='170'>
                        <template scope="scope">
                        <div style='display:flex;flex-direction:column;jestify-content:center;align-items:center;'>
                            
                                <div v-for='(item,index) in scope.row.title' :style="scope.row.title.length==1?'':index != (scope.row.title.length-1)?'border-bottom :1px solid rgb(223, 236, 235);flex:0 0 42px;line-height:42px;width:100%;overflow:hidden;text-overflow:ellipsis;white-space:nowrap': 'flex:0 0 42px;line-height:42px;width:100%;overflow:hidden;text-overflow:ellipsis;white-space:nowrap'" >{{item}}</div>
                        </div>
                            </template>
                        </el-table-column>
                        <el-table-column prop="course_curr_num" label="课时" width='50'>
                        <template scope="scope">
                                <div v-for='(item,index) in scope.row.course_curr_num' :style="scope.row.title.length==1?'':index != (scope.row.title.length-1)?'border-bottom :1px solid rgb(223, 236, 235);line-height: 42px;': 'line-height: 42px;'" >{{item}}</div>
                            </template>
                        </el-table-column>
                        <el-table-column prop="peopleNumber" label="签单数" width='50'>
                        <template scope="scope">
                                <div v-for='(item,index) in scope.row.peopleNumber' :style="scope.row.title.length==1?'':index != (scope.row.title.length-1)?'border-bottom :1px solid rgb(223, 236, 235);line-height: 42px;': 'line-height: 42px;'" >{{item}}</div>
                            </template>
                        </el-table-column>
                        <el-table-column prop="tuition_money" label="学费" width='65'>
                        <template scope="scope">
                                <div v-for='(item,index) in scope.row.tuition_money' :style="scope.row.title.length==1?'':index != (scope.row.title.length-1)?'border-bottom :1px solid rgb(223, 236, 235);line-height: 42px;': 'line-height: 42px;'" >{{item}}</div>
                            </template>
                        </el-table-column>
                        <el-table-column prop="teaching_money" label="教材费" width='65'>
                        <template scope="scope">
                                <div v-for='(item,index) in scope.row.teaching_money' :style="scope.row.title.length==1?'':index != (scope.row.title.length-1)?'border-bottom :1px solid rgb(223, 236, 235);line-height: 42px;': 'line-height: 42px;'" >{{item}}</div>
                            </template>
                        </el-table-column>
                        <el-table-column prop="bookMoney" label="书本费" width='65'>
                        <template scope="scope">
                                <div v-for='(item,index) in scope.row.bookMoney' :style="scope.row.title.length==1?'':index != (scope.row.title.length-1)?'border-bottom :1px solid rgb(223, 236, 235);line-height: 42px;': 'line-height: 42px;'" >{{item}}</div>
                            </template>
                        </el-table-column>
                        <el-table-column prop="coupons" label="优惠类型" width='100'>
                        <template scope="scope">
                                <div v-for='(item,index) in scope.row.coupons'   style='color:#18c318'>{{item}}</div>
                            </template>
                        </el-table-column>
                        <el-table-column prop="couponsMoney" label="优惠金额" width='65'>
                        <template scope="scope">
                                <div v-for='(item,index) in scope.row.couponsMoney' :style="scope.row.title.length==1?'':index != (scope.row.title.length-1)?'border-bottom :1px solid rgb(223, 236, 235);line-height: 42px;': 'line-height: 42px;'">{{item}}</div>
                            </template>
                        </el-table-column>
                        <el-table-column prop="collectMoney" label="实收总额" width='70'>
                        <template scope="scope">
                                <div >{{scope.row.collectMoney}}</div>
                            </template>
                        </el-table-column>
                        <el-table-column prop="assignClass" label="排班状态">
                        <template scope="scope">
                                <div v-for='(item,index) in scope.row.syllabus' v-if="item.teacher_name !=''" :style="scope.row.title.length==1?'':index != (scope.row.title.length-1)?'border-bottom :1px solid rgb(223, 236, 235);line-height: 21px;': 'line-height: 21px;'" >
                                <div>{{item.first_time}} 开课</div>{{item.week_num}} {{item.schooltime.substring(0,5)}} {{item.class_name}} {{item.teacher_name}}</div>
                                <div v-else :style="scope.row.title.length==1?'':index != (scope.row.title.length-1)?'border-bottom :1px solid rgb(223, 236, 235);line-height: 42px;color:#f29c9c': 'line-height: 42px;color:#f29c9c'" class='gotoS' @click='gotoS'>还未排班</div>
                            </template>
                        </el-table-column>
                    </el-table>
                    <el-form id='contractDeatilForm1' label-width="102px" label-position='left' style='padding-left:10px;display:inline-block;color:rgb(72, 106, 106)'>
                <el-form-item label="合同编号:" prop='name' style='margin-top:20px'>
                    <span>{{contract.sku}}</span>
                </el-form-item>
                <el-form-item label="试听老师:" prop='sex'>
                    <span>{{contract.baomingTeachName}}</span>
                </el-form-item>
                <el-form-item label="熊猫到家:" prop='age'>
                    <span>{{contract.panda_gohome==1?'是':'否'}}</span>
                </el-form-item>
                <!-- <el-form-item label="优惠类型:" prop='parent'>
                    <span>{{student.parent}}</span>
                </el-form-item> -->
                <el-form-item label="付款方式:" prop='money'>
                    <div v-for='item in contract.money'>{{item}}</div>
                </el-form-item>
                <el-form-item label="转课补费额" >
                       元
                    </el-form-item>
                <el-form-item label="付款总金额:" prop='online_money' style='margin-bottom:40px'>
                    <span>{{contract.datatable[0].collectMoney}}</span>
                </el-form-item>
            </el-form>
            <div style="display:inline-block;margin-top:20px;margin-right:20px">
                <el-upload
               disable
  action="https://jsonplaceholder.typicode.com/posts/"
  list-type="picture-card"
  :on-preview="handlePictureCardPreview"
  :on-remove="handleRemove"
  :on-success='handleSuccess'
   :file-list="fileList2"
   :data = "upData"
  >
  <i class="el-icon-plus"></i>
</el-upload>
<el-dialog v-model="dialogVisible" size="small" top='17%'>
  <img width="100%" :src="dialogImageUrl" alt="">
</el-dialog>
            </div>
            <div style="position:absolute;bottom:17px;right:134px;font-size:14px;color:#486a6a">
                <div style="margin-bottom:10px">
                    财务签章:
                </div>
                <div>
                    签约时间:{{contract.created}}
                </div>
                <div style="position:absolute;right:-24px;bottom:-8px"> 
                    <img :src="approvalSrc" alt="" width="100" v-if="contract.order_status =='审核通过'">
                     <img :src="approvalSrc1" alt="" width="100" v-if="contract.order_status =='审核退回'">
                      <img :src="approvalSrc2" alt="" width="100" v-else>
                    
                </div>
            </div>
                </div>
                <div style="display:flex;height:40px;line-height:40px;background:#d6fffd;border:1px solid rgb(223, 236, 235);">
                    <div style="flex:0 0 100px;text-align:center">抵换记录</div>
                    <div style="flex:1 1 400px;border-left:1px solid rgb(223, 236, 235);padding-left:10px">用于抵扣</div>
                    <div style="flex:auto;border-left:1px solid rgb(223, 236, 235);padding-left:10px">操作人</div>
                     <div style="flex:auto;border-left:1px solid rgb(223, 236, 235);padding-left:10px">操作日期</div>
                </div>
                <div style="display:flex;height:40px;line-height:40px;background:#fffff5;border:1px solid rgb(223, 236, 235);">
                    <div style="flex:0 0 100px;text-align:center">冻结记录</div>
                    <div style="flex:1 1 400px;border-left:1px solid rgb(223, 236, 235);padding-left:10px">用于抵扣</div>
                    <div style="flex:auto;border-left:1px solid rgb(223, 236, 235);padding-left:10px">操作人</div>
                     <div style="flex:auto;border-left:1px solid rgb(223, 236, 235);padding-left:10px">操作日期</div>
                </div>
                <div style="display:flex;height:40px;line-height:40px;background:#e3f1f8;border:1px solid rgb(223, 236, 235);">
                    <div style="flex:0 0 100px;text-align:center">解冻记录</div>
                    <div style="flex:1 1 400px;border-left:1px solid rgb(223, 236, 235);padding-left:10px;position:relative">用于抵扣
                     <!-- <el-button type="primary" style='position:absolute;right:10px;top:5px;height:30px;line-height: 0;'>重新排班</el-button> -->
                    </div>
                    <div style="flex:auto;border-left:1px solid rgb(223, 236, 235);padding-left:10px">操作人</div>
                     <div style="flex:auto;border-left:1px solid rgb(223, 236, 235);padding-left:10px">操作日期</div>
                </div>
        </div>

         <!-- 修改合同 -->
        <el-dialog title="修改合同" :visible.sync="dialogFormVisible3" :close-on-click-modal="no" top='7%' show-close style='z-index:100' class='signContactDialog' @close="resetAll('actSchool')">
            <el-form :model="actSchool" id='actSchool1' :rules='ruleActSchool' ref="actSchool">
               <div style="display:flex;">
                <div style="text-align:center;height:40px;line-height:40px;background:#f3f3f3;border:1px solid gainsboro;flex:0 0 280px">课程</div>
                <div v-for='item in tableTitle' :class="[item!='优惠类型'?'ccc':'ddd']">{{item}}</div>
            </div>

            <div style="width:100%;height:auto;display:flex;align-items:stretch">
            
               
            
            <div  style="line-height:40px;background:white;width:617px;display:flex;align-items:stretch;flex-wrap:wrap">
             <div v-for='i in contracts'  style='font-size:14px;display:flex;width: 617px;' class='lessonhover'>
             <div style="text-align:center;background:#f3f3f3;border:1px solid gainsboro;border-top:none;flex:0 0 280px;display:flex; justify-content:center;align-items: center;">
                        <div>
                         <el-select v-model="i.kc_tid" clearable placeholder="课程类型" size='small' style='width:123px' @change='getClassName(i.kc_tid,i)'>
                                        <el-option v-for="item in classkind" :key="item.kc_tid" :label="item.kc_tname" :value="item.kc_tid">
                                        </el-option>
                                    </el-select>
                        </div>
                        <div style="margin-left:10px">
                        <el-select v-model="i.course_id" clearable placeholder="课程名称" size='small' style='width:123px' @change='getPrice(i,i.course_id)'>
                                        <el-option v-for="item in i.courseName1" :key="item.kcid" :label="item.title" :value="item.kcid">
                                        </el-option>
                                    </el-select>
                        </div>
                 </div>
                 <div style="text-align:center;;background:#f3f3f3;flex:0 0 66px;display:flex;border-right:1px solid gainsboro;border-bottom:1px solid gainsboro;justify-content:center;align-items: center;">
                 <span>{{i.year_num}}</span>
                 </div>
                 <div style="text-align:center;background:#f3f3f3;flex:0 0 66px;display:flex;border-right:1px solid gainsboro;border-bottom:1px solid gainsboro;justify-content:center;align-items: center;">
                 <span>{{i.head_count}}</span>
                 </div>
                 <div style="text-align:center;background:#f3f3f3;flex:0 0 66px;display:flex;border-right:1px solid gainsboro;border-bottom:1px solid gainsboro;justify-content:center;align-items: center;">
                 <span>{{i.tuition_price}}</span>
                 </div>
                 <div style="text-align:center;background:#f3f3f3;flex:0 0 66px;display:flex;border-right:1px solid gainsboro;border-bottom:1px solid gainsboro;justify-content:center;align-items: center;">
                 <span>{{i.teaching_price}}</span>
                 </div>
                 <div style="text-align:center;background:#f3f3f3;flex:0 0 66px;display:flex;border-right:1px solid gainsboro;border-bottom:1px solid gainsboro;justify-content:center;align-items: center;">
                 <span>{{i.book_price}}</span>
                 </div>
            </div>

            </div>
            
             <div style="background:#f3f3f3;text-align:center;border-right:1px solid gainsboro;border-bottom:1px solid gainsboro;flex:0 0 146px;display:flex;flex-direction: column;justify-content: center;height:auto">
             <el-select v-model="coupons" clearable multiple placeholder="请选择" size='mini' style='width:131px;margin-left:7px'>
                            <el-option v-for="item in couponsList" :key="item.id" :label="item.title" :value="item.id">
                            </el-option>
                        </el-select>
            </div> 


              <div  style="line-height:40px;width:68px;display:flex;align-items:stretch;flex-wrap:wrap">
             <div v-for='i in contracts'  style='font-size:14px;display:flex;flex:0 0 68px' class='lessonhover'>
            
                 <!-- <div style="text-align:center;height:40px;line-height:40px;background:#f3f3f3;;flex:0 0 126px;display:flex;border-right:1px solid gainsboro;border-bottom:1px solid gainsboro;justify-content:center">
                 <el-select v-model="i.teacher3" clearable placeholder="请选择" size='mini' style='width:90px'>
                        <el-option label="林俊杰" value="0"></el-option>
                        <el-option label="周杰伦" value="1"></el-option>
                        <el-option label="汪苏泷" value="2"></el-option>
                    </el-select>
                 </div> -->
                 <div style="text-align:center;background:#f3f3f3;border-right:1px solid gainsboro;border-bottom:1px solid gainsboro;flex:0 0 66px;display:flex; justify-content:center;align-items: center;">
                  <el-input v-model="i.coupons_money" class='promotionMoney'></el-input>
                 </div>
            </div>

            </div>
            <div style="background:#ffffff;text-align:center;border-right:1px solid gainsboro;border-bottom:1px solid gainsboro;flex:0 0 65px;display:flex;flex-direction: column;justify-content: center;height:auto">{{totalP3}}</div> <!-- 总额用法 -->
            <div  style="line-height:40px;background:white;width:5.4%;display:flex;align-items:stretch;flex-wrap:wrap">
             <div v-for='(i,index) in contracts'  style='font-size:14px;display:flex;flex: 0 0 66px;' class='lessonhover'>
            
                 <div style="text-align:center;background:#f3f3f3;flex:0 0 66px;display:flex;border-right:1px solid gainsboro;border-bottom:1px solid gainsboro;justify-content:center">
                 <el-button type="text" size="small" @click="addCon(index)" :style="{color: index==0?'#1fb5ad':'red'}" v-if='index==0'>添加课程</el-button>
                  <el-button type="text" size="small" @click="delCon(index)" :style="{color: index==0?'#1fb5ad':'red'}" v-if='index!=0'>删除</el-button>
                 </div>
            </div>

            </div>
            </div>
            <div style="margin-top:50px">
                <el-form-item label="合同编号" prop='sku'>
                    <el-input v-model="actSchool.sku" placeholder='请输入合同编号' style="width:142px"></el-input>
                </el-form-item>
                <el-form-item label="试听老师" prop='teacher_uid'>
                   <el-select v-model="actSchool.teacher_uid" placeholder="请选择试听老师" style="width:142px">
                            <el-option v-for="item in teachersName" :key="item.aid" :label="item.uname" :value="item.aid">
                            </el-option>
                        </el-select>
                </el-form-item>
                <el-form-item label="熊猫到家" prop='panda_gohome'>
                    <el-select v-model="actSchool.panda_gohome" placeholder="请选择" style="width:142px">
                        <el-option label="是" value="1"></el-option>
                        <el-option label="否" value="0"></el-option>
                    </el-select>
                </el-form-item>
                 <el-form-item label="付款方式" style='position:relative' required>
                 <div v-for="(a, index) in actSchool.pay" :class="[index !=0?'male':'']">
                     <el-form-item prop="method" style="width:142px;margin-right:30px;float:left">
                                <el-select v-model="a.method" clearable placeholder="请选择方式">
                                    <el-option label="现金" value="1"></el-option>
                                    <el-option label="POS机" value="2"></el-option>
                                    <el-option label="微信" value="3"></el-option>
                                    <el-option label="银行转账" value="4"></el-option>
                                    <el-option label="团购" value="5"></el-option>
                                    <el-option label="支付宝" value="6"></el-option>
                                    <el-option label="其他" value="7"></el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item prop="money" style="width:142px;float:left">
                                <el-input v-model.number="a.money" placeholder='请输入金额'></el-input>
                            </el-form-item>
                            <span @click='addPay' class='addPay' v-if='index==0'>添加付款方式</span>
                            <span @click='deletePay' class='deletePay' v-else>删除</span>
                            <div style="clear:both"></div>
                 </div>
                </el-form-item>
                <el-form-item label="付款总额" >
                    {{payTotal}}元
                    <span v-if='this.payTotal != this.totalP3' style="color:red;margin-left:100px">*付款总额与实收总额不符*</span>
                </el-form-item>
                <el-form-item label="签约时间" prop='created'>
                    <el-date-picker v-model="actSchool.created" type="date" >
                </el-date-picker>
                </el-form-item>
                
            </div>
            </el-form>
            <div slot="footer" class="dialog-footer" style='margin-top:-24px'>
                <el-button type="primary" @click="nextToLast('actSchool')">确定</el-button>
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
    put_contract
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
                    callback('请选择支付方式')
                } else {
                    callback();
                }
            }
             var isMoney = (rule, value, callback) => {
                let a = 0
                this.actSchool.pay.map(item => {
                    a += item.money
                })
                if (a != this.totalP3) {
                    callback('付款总额与实收总额不等')
                } else {
                    callback();
                }
            }
            return {
                upData:{id:this.$route.params.uid},
                approvalSrc:'../../../static/img/pass.png',
                approvalSrc1:'../../../static/img/nopass.png',
                approvalSrc2:'../../../static/img/nopass.png',
                fileList2: [{name: 'food.jpeg', id:1,url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}, {name: 'food2.jpeg', id:2,url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}],
                coupons:[],
                courseName1:[],
                classkind:[],
                couponsList:[],
                teachersName:[],
                canUpload:true,
                dialogImageUrl: '',
                dialogVisible: false,
                contract:{datatable:[{collectMoney:0}]},
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
                tableTitle:['课时','签单数','学费','教材费','书本费','优惠类型','优惠金额','实收总额','操作'],
                student: {
                    name: '',
                    sex: '',
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
                ruleActSchool: {
                    sku: [{
                        required: true,
                        message: '请输入合同编号',
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
                    // money: [{
                    //     required: true,
                    //      validator: isMoney,
                    //     trigger: 'blur'
                    // }],
                    created: [{
                        required: true,
                        type:'date',
                         message: '请选择签约时间',
                        trigger: 'blur'
                    }],
                },

            }
        },
        methods: {
            gotoS(){
                 this.$router.push('/studentDetail/'+this.$route.params.uid);
            },
            handleSuccess(response, file, fileList){//上传图片成功
                   let a =document.getElementsByClassName('el-upload--picture-card')[0];
                if(fileList.length==2){
                   a.style.display ='none'
                }
            },
             handleRemove(file, fileList) {//移除图片
                console.log(file)
                console.log(fileList)

             let a =document.getElementsByClassName('el-upload--picture-card')[0];
                if(fileList.length<2){
                   a.style.display ='inline-block'
                }
        // console.log(file, fileList);//file.id调服务移除
      },
      handlePictureCardPreview(file) {//图片预览
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
      },
            editContract(data){//修改合同
                // console.log(data)
                this.actSchool={
                    sku: data.sku,
                    teacher_uid: data.baoming_teach.aid,
                    panda_gohome: data.panda_gohome,
                    pay: data.pay,
                    created: data.created//,

                }
                this.coupons = Object.keys(data.datatable[0].coupons)
                this.coupons = this.coupons.map(item=>{
                    return item-0
                })
               let arr =  data.order_item.map(item=>{

                    return  {kc_tid: item.kc_tid-0,
                    course_id: item.course_id-0,
                    year_num: '',
                    head_count: '',
                    tuition_price: '',
                    teaching_price: '',
                    book_price: '',
                    study_money: '',
                    coupons_money: parseInt(item.coupons_money),
                    courseName1: []}
                })
               arr.map((item,index,arr)=>{
                let a = item.kc_tid
                 this.getClassName(a,arr[index])
                 let b = item.course_id
                 this.getPrice(arr[index],b)
               })
               this.contracts = [...arr]
                 
                this.dialogFormVisible3 = true
            },
            
            nextToLast(formName){//提交修改合同
                this.$refs[formName].validate((valid) => {
                    if(valid&&this.isEqual ===1){
                        let para={}
                        para.order = {...this.actSchool
                        }
                        para.order.created = new Date(para.order.created).toLocaleDateString()
                        para.order.kecheng = [...this.contracts]
                        para.order.coupons = this.coupons
                        para.order_id = this.$route.params.order_id
                        para.order = JSON.stringify(para.order)
                        put_contract(para,token).then(res=>{
                                console.log(res)
                                let pa = {
                order_id :this.$route.params.order_id
            }
            getMyContractDetail(token,pa).then(res=>{
                // console.log(res)
                this.contract = res.data

            })
                        })
                this.dialogFormVisible3 = false;
                this.dialogFormVisibleLast = true;
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
            },
            resetAll(formName){
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
                 this.$refs[formName].resetFields();

            },
            getClassName(data, i) { //获取课程名称
                let para = {
                    pid: data,
                    simple: 1
                }
                getClassLibrary(token, para).then((res) => {

                    i.courseName1 = res.data;
                })
            },
            getPrice(data, index) { //调详细获取价格
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
                        data.study_money = (a.year_num - 0) + (a.head_count - 0) + (a.tuition_price - 0) + (a.teaching_price - 0) + (a.book_price - 0);
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
            addCon(index) {//添加课程
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
                this.contracts.splice(index, 1)
            }
            },
        computed: {
            isEqual(){
                if(this.payTotal == this.totalP3){
                    return 1
                }else{
                    return  0
                }
            },
            payTotal(){
                let a =0;
                this.actSchool.pay.map(item=>{
                    a+= item.money-0
                })
                 return a;
            },
            totalP3(){
                let a = 0 
               this.contracts.map(item=>{
                      a +=  ((item.tuition_price-0)+(item.teaching_price-0)+(item.book_price-0)-(item.coupons_money-0))
                })
                 return a
               
            },

        },
        beforeCreate() {
            user = localStorage.getItem('user');
            token = JSON.parse(user).token;
        },
        created() {
            // this.userName = JSON.parse(user).uname;
            // this.code = JSON.parse(user).job ? JSON.parse(user).job.code : '';
            let para = {
                uid: this.$route.params.uid
            }
            returnVisitDetail(token, para).then(res => { //获取用户资料
                let data = res.data.info;
                // console.log(data)
                this.student = {
                    name: data.child_name,
                    age: data.age,
                    sex: data.sex,
                    school: data.school_name,
                    channel: data.source_name,
                    time: data.regtime,
                    parent:res.data.famliys[0].uname + '(' + res.data.famliys[0].relation + ')',
                    parent_phone: res.data.famliys[0].mobile,
                    parent1: res.data.famliys[1] ? res.data.famliys[1].uname?res.data.famliys[1].uname + '(' + res.data.famliys[1].relation + ')':'暂无' : '暂无',
                    parent1_phone: res.data.famliys[1] ? res.data.famliys[1].mobile||'暂无' : '暂无',
                    teacher: data.cc_name

                }
            }).catch(() => {
                console.log('No Data')
            })
            let pa = {
                order_id :this.$route.params.order_id
            }
            getMyContractDetail(token,pa).then(res=>{
                // console.log(res)
                this.contract = res.data

            })
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

        },
        mounted(){
               let a =document.getElementsByClassName('el-upload--picture-card')[0];
                if(this.fileList2.length==2){
                   a.style.display ='none'
                }
        }
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
#contractAll .el-button--primary{
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


.tableUserD .el-tag--success {
    background-color: #1fb5ad;
    border-color: #bcf1d4;
    color: #FFFFFF;
    border-radius: 25px;
}


.signContactDialog .el-dialog--small {
    width: 1256.75px;
}
.tableUserD .el-dialog .el-dialog__header {
    background-color: #1fb5ad;
    padding: 20px 20px 20px;
}

.tableUserD .el-dialog .el-dialog__title {
    color: white;
}

.ccc{
    text-align:center;height:40px;line-height:40px;background:#f3f3f3;flex:0 0 66px;border-right:1px solid gainsboro;border-bottom:1px solid gainsboro;border-top:1px solid gainsboro
}
.ddd{
    text-align:center;height:40px;line-height:40px;background:#f3f3f3;flex:0 0 146px;border-right:1px solid gainsboro;border-bottom:1px solid gainsboro;border-top:1px solid gainsboro
}
.male{
    margin-left:76px;
    margin-top:22px;
}
.addPay{
    position:absolute;
    top:0 ;
    left:400px;
    color:#1fb5ad
}
.addPay:hover{
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
.promotionMoney input{
    height:22px;
    margin:9px auto;
    width: 80%;
}
#contractDetail .el-table td,
#contractDetail .el-table th {
    padding: 5px 0;
    text-align: center
}

#contractDetail .el-table th>div,
#contractDetail .el-table .cell {
    padding-left: 0;
    padding-right: 0;
}
#contractDetail .el-table::before{
    height: 0;
}
.gotoS:hover{
     cursor: pointer;
}
</style>
