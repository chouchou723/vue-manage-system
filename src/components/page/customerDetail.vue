<template>
    <div class="tableUserCD">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="icon-yonhu iconfont"></i> 客户管理</el-breadcrumb-item>
                <el-breadcrumb-item to="/myCustomer">我的客户</el-breadcrumb-item>
                <el-breadcrumb-item class='ss'>{{student.names}}</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div style="display:flex">
<!-- 用户资料 -->
<div class="CDEtitle">
        <div class="CDEtitle1">
            <el-button v-if="this.Pstatus=='已到访'&&!code.includes('readonly')" type="primary" size="mid" class='signC' @click='signContact'>
                <!-- <img :src="signSrc" alt="" width='25' class='CDEtitleimg'> -->
                <i class="iconfont icon-gaizhangjilu"></i>
                <span class="CDEtitleSign">签合同</span>
            </el-button>
        </div>
        <div class='UserDetailTitleCD'>
                <i class="iconfont icon-tongxunlu1 fz25"></i>
            <span class="CDEinfo">用户资料</span>
            <div class="CDEinfo1">
                <div class='CDEinfo2'>
                    <el-button v-if="!code.includes('readonly')" type="primary" size="mid" class='setToNo' @click='recognizeResource'>
                        <!-- <img :src="attSrc" alt="" width='20' class="CDEinfoimg"> -->
                        <i class="iconfont icon-shiliangzhinengduixiang22 fl30"></i>
                        <span class='CDEinfoN'>设置为无需求</span></el-button>
                </div>
                <div class='addU' @click='addU' v-if="!code.includes('readonly')"> <i class="iconfont icon-1 fz30 fzh"></i></div>
            </div>
        </div>
        <el-form id='customerDeatilForm' label-width="102px" label-position='left' class="CDEform">
            <el-form-item label="姓名:" prop='names'>
                <span>{{student.names}}</span>
            </el-form-item>
            <el-form-item label="性别:" prop='sex'>
                <span>{{student.sex}}</span>
            </el-form-item>
            <el-form-item label="生日:" prop='age'>
                <span>{{student.born}}</span>
                <span>({{student.age}}岁)</span>
            </el-form-item>
            <el-form-item label="家长:" prop='parent'>
                <span>{{student.parent}}</span>
            </el-form-item>
            <el-form-item label="第二家长:" prop='parent' v-if='student.parent1.split("(")[0]!=""'>
                <span>{{student.parent1}}</span>
            </el-form-item>
            <el-form-item label="手机:" prop='parent'>
                <span>{{student.parent_phone}}</span>
            </el-form-item>
            <el-form-item label="第二手机:" prop='parent' v-if='student.parent1_phone!=""'>
                <span>{{student.parent1_phone}}</span>
            </el-form-item>
            <el-form-item label="渠道来源:" prop='channel' style="position:relative">
                <span>{{student.channel}}</span>
                <div v-if='student.sour_id==4'>介绍人:{{student.referral_name||' 无 '}} 老师:{{student.teach_name||' 无 '}}</div>
            </el-form-item>
            <el-form-item label="录入时间:" prop='created'>
                <span>{{student.created}}</span>
            </el-form-item>
            <el-form-item label="所在地区:" prop='fullAddress'>
                    <span>{{student.fullAddress}}</span>
                </el-form-item>
            <el-form-item label="校区:" prop='school'>
                <span>{{student.school_name}}</span>
            </el-form-item>
            <el-form-item label="CC:" prop='teacher'>
                <span>{{student.cc_name}}</span>
            </el-form-item>
        </el-form>
    </div>
 <!-- 沟通记录 -->
 <div class="CDEcom">
        <div class='communityTitleCD'>
                <i class='iconfont icon-xueyuangoutongguanli fz30' ></i>
            <span class="CDEcom1">沟通记录({{number}})</span>
            <div class="CDEcom2">
                <div class='addR' @click='addComm' v-if="!code.includes('readonly')">
                        <i class='iconfont icon-group-add fz30 fzh'></i>
                </div>
            </div>
        </div>
        <div class="CDEcom3">
            <el-row v-for='item in items' class='CDEcom4'>
                <el-col :span="4" class='CDEcomright'>
                    <img :src="item.add_call_user.avatar?item.add_call_user.avatar:''" width='50' height='50' alt="" class="CDEcomimg"></el-col>
                <el-col :span="20">
                    <div class="CDEh30">
                        <div class="CDEh1">{{item.add_call_user.uname}}</div>
                        <div class="CDEh2">{{item.create_at.substring(5,16)}}</div>
                    </div>
                    <div>
                        <div class="CDEh3">{{item.remark}}</div>
                    </div>
                    <div>
                        <div class="CDEh4">
                            <el-tag type='success' v-for='t in item.tags' class='tagTag'>{{t}}</el-tag>
                        </div>
                    </div>
                    <div style="clear:both"></div>
                    <div>
                        <div style="float:left;font-size:14px;color:#1fb5ad;margin-bottom:5px;" v-if="item.remind_time">下次跟进时间:{{item.remind_time}}</div>
                        <div class='editSpanCD' @click='editReturn(item.id,item)' v-if="new Date().getTime()-new Date(item.create_at).getTime()<7200000&&userid==item.tmk_uid ">
                                <i class="iconfont icon-icon07 fz30 fzh fgrey"></i>
                        </div>

                    </div>
                </el-col>
            </el-row>
        </div>
        <div class="block" v-if="this.total!=0">
            <el-pagination layout="prev, pager, next" :total="total" :current-page="currentPage" :page-size="pagesize" @current-change="handleCurrentChange">
            </el-pagination>
        </div>
    </div>
  <!-- 邀约记录 -->
  <div class='CDEint'>
        <div class='inviteTitle'>
                <i class="iconfont icon-5 fz30"></i>
            <span class="CDEcom1">邀约记录({{number1}})</span>
        </div>
        <div class="CDEcom2">
            <div class='addR' @click='addInvite' v-if="!code.includes('readonly')">
                    <i class='iconfont icon-group-add fz30 fzh'></i>
            </div>
        </div>
        <div class='CDEinth'>
            <el-row v-for='item in items1' class="CDEint1">
                <div class="CDEint2">邀约日期: {{item.alert_time.substring(0,16)}}</div>
                <div class='inviteRecord'>邀约课程: <span class='CDErgrey'>{{item.course}}</span> </div>
                <div class='inviteRecord'>上课老师: <span class='CDErgrey'>{{item.teach_name?item.teach_name.uname:'无'}}</span></div>
                <div class='inviteRecord'>记录时间: <span class='CDErgrey'>{{item.created.substring(0,16)}}</span></div>
                <div class='inviteRecord'>
                    <div class="CDEint3">
                        <div>到访设置: <span :style="item.fla == '已到访'?'color:#e9bd23':item.fla == '未到访'?'color:#e24545':'color:grey'">{{item.fla}}</span>
                        </div>
                        <div class='editVisit' v-if='item.update_count-0<1&&!code.includes("_c_c")&&!code.includes("_cr_c")' @click='confirmVisit(item.id,item)'>
                                <i class="iconfont icon-xiugai1  fzh fgrey"></i>
                        </div>
                        <div class='editVisitI' @click='editInvite(item.id,item,$event)' v-if="new Date().getTime()-new Date(item.created).getTime()<7200000&&userid==item.tmk_uid&&!code.includes('_c')&&item.update_count<1">
                                <i class="iconfont icon-icon07 fz30 fzh fgrey"></i>
                        </div>
                    </div>
                </div>
            </el-row>
        </div>
        <div class="block" v-if="this.total1!=0">
            <el-pagination layout="prev, pager, next" :total="total1" :current-page="currentPage1" :page-size="pagesize1" @current-change="handleCurrentChange1">
            </el-pagination>
        </div>
    </div>
        </div>
        
        <!-- 修改客户 -->
        <el-dialog title="修改客户" :visible.sync="dialogFormVisibleAdd" :close-on-click-modal="no" top='9.7%' id='CDEDialog' @close="resetD('form')">
            <el-form :model="form" :rules='rule' ref="form" label-width="80px">
                <el-form-item label="学生姓名" prop='names'>
                    <el-input v-model="form.names" placeholder='请输入学生姓名' class='CDE142'></el-input>
                </el-form-item>
                <el-form-item label="性别" prop='sex'>
                    <el-select v-model="form.sex" placeholder="请选择性别" class='CDE142'>
                        <el-option label="男" value="1"></el-option>
                        <el-option label="女" value="2"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="年龄" prop='age'>
                    <el-select v-model="form.age" placeholder="选择" class='CDE142'>
                        <el-option label="2" value="2"></el-option>
                        <el-option label="3" value="3"></el-option>
                        <el-option label="4" value="4"></el-option>
                        <el-option label="5" value="5"></el-option>
                        <el-option label="6" value="6"></el-option>
                        <el-option label="7" value="7"></el-option>
                        <el-option label="8" value="8"></el-option>
                        <el-option label="9" value="9"></el-option>
                        <el-option label="10" value="10"></el-option>
                        <el-option label="11" value="11"></el-option>
                        <el-option label="12" value="12"></el-option>
                        <el-option label="13" value="13"></el-option>
                        <el-option label="14" value="14"></el-option>
                        <el-option label="15" value="15"></el-option>
                        <el-option label="16" value="16"></el-option>
                        <el-option label="17" value="17"></el-option>
                        <el-option label="18" value="18"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="联系家长" required>
                    <el-form-item prop="parent" class="CDE142float">
                        <el-input v-model="form.parent" placeholder='请输入家长姓名'></el-input>
                    </el-form-item>
                    <el-form-item prop="con" class="CDE142float">
                        <el-select v-model="form.con" placeholder="请选择关系">
                            <el-option label="妈妈" value="妈妈"></el-option>
                            <el-option label="爸爸" value="爸爸"></el-option>
                            <el-option label="爷爷" value="爷爷"></el-option>
                            <el-option label="奶奶" value="奶奶"></el-option>
                            <el-option label="外公" value="外公"></el-option>
                            <el-option label="外婆" value="外婆"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item prop="phone" class="CDEfloat">
                        <el-input v-model="form.phone" placeholder='请输入手机号' :maxlength='maxlength'></el-input>
                    </el-form-item>
                </el-form-item>
                <el-form-item label="">
                    <el-form-item prop="parent1" class="CDE142float">
                        <el-input v-model="form.parent1" placeholder='请输入家长姓名' @blur='checkP1'></el-input>
                    </el-form-item>
                    <!-- <div style='position:absolute;color:#ff4949;bottom:-26px;font-size:12px;left:184px' v-if="secondRule">第二家长信息如若填写,必须填写完全,不然将不予保存</div> -->
                    <el-form-item prop="con1" class="CDE142float">
                        <el-select v-model="form.con1" clearable placeholder="请选择关系" @change='checkP1'>
                            <el-option label="妈妈" value="妈妈"></el-option>
                            <el-option label="爸爸" value="爸爸"></el-option>
                            <el-option label="爷爷" value="爷爷"></el-option>
                            <el-option label="奶奶" value="奶奶"></el-option>
                            <el-option label="外公" value="外公"></el-option>
                            <el-option label="外婆" value="外婆"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item prop="phone1" class="CDEfloat">
                        <el-input v-model="form.phone1" placeholder='请输入手机号' :maxlength='maxlength' @blur='checkP1'></el-input>
                    </el-form-item>
                    <el-col :span="2">
                        <span class='CDEgrey'> (选填)</span>
                    </el-col>
                </el-form-item>
                <el-form-item label="所在地区" required>
                    <el-form-item prop="city_id" class="CDE142float">
                        <el-select v-model="form.city_id" filterable placeholder="请选择城市" @change='getRegion'>
                            <el-option v-for="item in cities" :key="item.id" :label="item.city_name" :value="item.id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item prop="area_id" class="CDE142float">
                        <el-select v-model="form.area_id" placeholder="请选择城区">
                            <el-option v-for="item in regions" :key="item.id" :label="item.city_name" :value="item.id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item prop="address" class="CDEfloat">
                        <el-input v-model="form.address" placeholder='请输入具体地址'></el-input>
                    </el-form-item>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" :loading='writeL' @click="onSubmit('form')">确定</el-button>
                    <el-button @click="dialogFormVisibleAdd = false">取消</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
        <!-- 设置为无需求 -->
        <el-dialog title="设置客户需求" :visible.sync="dialogFormVisible2" :close-on-click-modal="no" top='33%' size='tiny' show-close
            class='schoolDialog'>
            <div>是否确认要把客户设置为无需求客户</div>
            <div slot="footer" class="dialog-footer CDEcenter">
                <el-button type="primary" :loading='writeL' @click="restartResource" class="CDEm20">是</el-button>
                <el-button @click="dialogFormVisible2 = false">否</el-button>
                <div class="CDEred">*请在了解资源实际情况后做出判断</div>
            </div>
        </el-dialog>
        <!-- 签合同第一步 -->
        <el-dialog title="确认学员资料" :visible.sync="dialogFormVisibleSign" :close-on-click-modal="no" top='8%' id='signDialog' @close="resetD('signform')">
            <el-form :model="signform" :rules='Confirmrule' ref="signform" label-width="80px">
                <el-form-item label="学生姓名" prop='names'>
                    <el-input v-model="signform.names" placeholder='请输入学生姓名' class='CDE142'></el-input>
                </el-form-item>
                <el-form-item label="性别" prop='sex'>
                    <el-select v-model="signform.sex" placeholder="请选择性别" class='CDE142'>
                        <el-option label="男" value="1"></el-option>
                        <el-option label="女" value="2"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="身份证号" prop='id_number'>
                    <el-input v-model="signform.id_number" placeholder='请输入身份证号' class="CDE202"></el-input>
                </el-form-item>
                <el-form-item label="出生日期" prop='birthday'>
                    <el-date-picker v-model="signform.birthday" type="date" placeholder="选择日期" class='CDE142' :editable="no" :clearable="no" :picker-options="pickerOptions1">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="登录密码" prop='pass'>
                    <span class="CDE66">{{signform.birthday?getNowFormatDate(signform.birthday):''}}</span>
                    <span v-if='signform.birthday' class='CDEfgrey'>*默认登录密码为该学生出生日期</span>
                </el-form-item>
                <el-form-item label="联系家长" required>
                    <el-form-item prop="parent" class='CDE142float'>
                        <el-input v-model="signform.parent" placeholder='请输入家长姓名'></el-input>
                    </el-form-item>
                    <el-form-item prop="con" class='CDE142float'>
                        <el-select v-model="signform.con" placeholder="请选择关系">
                            <el-option label="妈妈" value="妈妈"></el-option>
                            <el-option label="爸爸" value="爸爸"></el-option>
                            <el-option label="爷爷" value="爷爷"></el-option>
                            <el-option label="奶奶" value="奶奶"></el-option>
                            <el-option label="外公" value="外公"></el-option>
                            <el-option label="外婆" value="外婆"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item prop="phone" class='CDEfloat'>
                        <el-input v-model="signform.phone" placeholder='请输入手机号' ref="parentPhone" :maxlength='maxlength'></el-input>
                    </el-form-item>
                </el-form-item>
                <el-form-item label="">
                    <el-form-item prop="parent1" class='CDE142float'>
                        <el-input v-model="signform.parent1" placeholder='请输入家长姓名' @blur='checkP2'></el-input>
                    </el-form-item>
                    <!-- <div style='position:absolute;color:#ff4949;bottom:-26px;font-size:12px;left:184px' v-if="secondRule1">第二家长信息如若填写,必须填写完全,不然将不予保存</div> -->
                    <el-form-item prop="con1" class='CDE142float'>
                        <el-select v-model="signform.con1" clearabel placeholder="请选择关系" @change='checkP2'>
                            <el-option label="妈妈" value="妈妈"></el-option>
                            <el-option label="爸爸" value="爸爸"></el-option>
                            <el-option label="爷爷" value="爷爷"></el-option>
                            <el-option label="奶奶" value="奶奶"></el-option>
                            <el-option label="外公" value="外公"></el-option>
                            <el-option label="外婆" value="外婆"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item prop="phone1" class='CDEfloat'>
                        <el-input v-model="signform.phone1" placeholder='请输入手机号' :maxlength='maxlength' @blur='checkP2'></el-input>
                    </el-form-item>
                    <el-col :span="2">
                        <span class="CDEgrey"> (选填)</span>
                    </el-col>
                </el-form-item>
                <el-form-item label="所属校区" prop='school_id' class="CDEm5">
                    <p>{{signform.school_name}}</p>
                </el-form-item>
                <el-form-item label="来源渠道" prop='sour_id' class="CDEm5">
                    <p>{{signform.source_name}}</p>
                    <div v-if='student.sour_id==4'>介绍人:{{student.referral_name}} 老师:{{student.teach_name}}</div>
                </el-form-item>
                <el-form-item label="CC" prop='cc' class="CDEm5">
                    <p>{{signform.cc_name}}</p>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisibleSign = false">取消</el-button>
                <el-button type="primary" @click="nextToSign('signform')">下一步</el-button>
            </div>
        </el-dialog>
        <!-- 签合同第二步 @close="resetAll('actSchool')"-->
        <el-dialog title="填写合同内容" :visible.sync="dialogFormVisible3" :close-on-click-modal="no" top='7%' show-close class='signContactDialogC'
            >
            <el-form :model="actSchool" id='actSchool1' :rules='ruleActSchool' ref="actSchool">
                <div class="CDEflex">
                    <div class="CDEflex1">课程</div>
                    <div v-for='item in tableTitle' :class="[item!='优惠类型'?'cccCD':'dddCD']">{{item}}</div>
                </div>
                <div class="CDEflex2">
                    <div class='CDEflex3'>
                        <div v-for='i in contracts' class='CDEflex4'>
                            <div class="CDEflex5">
                                <div>
                                    <el-select v-model="i.kc_tid"  placeholder="课程类型" size='small' class="CDE103" @change='getClassName(i.kc_tid,i)'>
                                        <el-option v-for="item in classkind" :key="item.kc_tid" :label="item.kc_tname" :value="item.kc_tid">
                                        </el-option>
                                    </el-select>
                                </div>
                                <div style="margin-left:10px">
                                    <el-select v-model="i.course_id"  placeholder="课程名称" size='small' class="CDE123" @change='getPrice(i,i.course_id)'>
                                        <el-option v-for="item in i.courseName1" :key="item.kcid" :label="item.title" :value="item.kcid">
                                        </el-option>
                                    </el-select>
                                </div>
                            </div>
                            <div class='CDEflex6'>
                                <span>{{i.year_num}}</span>
                            </div>
                            <div class='CDEflex6'>
                                <span>{{i.head_count}}</span>
                            </div>
                            <div class='CDEflex6'>
                                <span>{{i.tuition_price}}</span>
                            </div>
                            <div class='CDEflex6'>
                                <span>{{i.teaching_price}}</span>
                            </div>
                            <div class='CDEflex6'>
                                <span>{{i.book_price}}</span>
                            </div>
                            <div class='CDEflex6' style='background:#ffffff'>
                                <span >{{i.study_money}}</span>
                            </div>
                        </div>
                    </div>
                    <!-- 总额用法 -->
                    <div class='CDEflex7'>
                        <el-select v-model="coupons" clearable multiple placeholder="请选择" size='mini' class='CDE131' @change='checkCou1(contracts)'>
                            <el-option v-for="item in couponsList" :key="item.id" :label="item.title" :value="item.id">
                            </el-option>
                        </el-select>
                    </div>
                    <div class="CDEflex8">
                        <div v-for='i in contracts' class='CDEflex68'>
                            <div class='CDEflex6'>
                                <el-input v-model="i.coupons_money" class='CDdpromotionMoney' @blur="checkCou(contracts,i.coupons_money,i.study_money)"></el-input>
                            </div>
                        </div>
                    </div>
                    <div class="CDEflex8">
                        <div v-for='i in contracts' class='CDEflex6'>
                            <span >{{i.study_money-(i.coupons_money-0)}}</span>
                        </div>
                    </div>
                    <div class='CDEflex9'>{{totalP3}}</div>
                    <!-- 熊猫到家 -->
                    <!-- <div class="CDEflex8">
                        <div v-for='i in contracts' class='CDEflex68'>
                            <div class='CDEflex6'>
                                <el-select v-model="i.panda_gohome"  placeholder="请选择"  >
                                    <el-option label="有" value="1" v-if="i.kc_tid==1"></el-option>
                                    <el-option label="无" value="0"></el-option>
                                </el-select>
                            </div>
                        </div>
                    </div> -->
                    <!-- 总额用法 -->
                    <div class='CDEflex10'>
                        <div v-for='(i,index) in contracts' class='CDEflex11'>
                            <div class='CDEflex12'>
                                <el-button type="text" size="small" @click="addCon(index)" :style="{color: index==0?'#1fb5ad':'red'}" v-if='index==0'>添加课程</el-button>
                                <el-button type="text" size="small" @click="delCon(index,contracts)" :style="{color: index==0?'#1fb5ad':'red'}" v-if='index!=0'>删除</el-button>
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <el-form-item label="合同编号" prop='sku'>
                        <el-input v-model="actSchool.sku" placeholder='请输入合同编号' class='CDE142'></el-input>
                    </el-form-item>
                    <el-form-item label="试听老师" prop="teacher_uid">
                        <el-select v-model="actSchool.teacher_uid"  placeholder="请选择试听老师" class='CDE142'  @change='changeReset1("teacher_uid")'>
                            <el-option v-for="item in teachersName" :key="item.aid" :label="item.uname" :value="item.aid">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="熊猫到家" prop='panda_gohome'>
                        <el-select v-model="actSchool.panda_gohome" placeholder="请选择" class='CDE142' @change='changeReset1("panda_gohome")'>
                                <el-option label="无" value="0"></el-option>
                                <el-option label="12期" value="1"></el-option>
                                <el-option label="24期" value="2"></el-option>       
                        </el-select>
                    </el-form-item>
                    <el-form-item label="付款方式" style='position:relative'  prop="method">
                        <div v-for="(a, index) in actSchool.pay" :class="[index !=0?'maleCD':'']">
                            <el-form-item  class='CDE142float'>
                                <el-select v-model="a.method"  placeholder="请选择方式" @change='changeReset1("method")'>
                                    <el-option v-for="item in payMethods" :key="item.id" :label="item.name" :value="item.id">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item prop="money" class='CDEfloat'>
                                <el-input v-model.number="a.money" placeholder='请输入金额' @change='changeReset1("money")'></el-input>
                            </el-form-item>
                            <span @click='addPay' class='CDaddp' v-if='index==0'>添加付款方式</span>
                            <span @click='deletePay(index)' class='CDdeletePay' v-else>删除</span>
                            <div style="clear:both"></div>
                        </div>
                    </el-form-item>
                    <el-form-item label="付款总额">
                        {{payTotal}}元
                        <!-- <span class='CDEnred' id="CDEnred" v-if='this.payTotal != this.totalP3'>*付款总额与实收总额不符*</span> -->
                        <!--<span v-if='this.payTotal != this.totalP3' class='{CDEnred:ok,cmk:yes}' id="CDEnred">*付款总额与实收总额不符*</span>-->
                    </el-form-item>
                    <!-- <el-form-item label="签约时间" prop='created'>
                        <el-date-picker v-model="actSchool.created" type="date">
                        </el-date-picker>
                    </el-form-item> -->
                </div>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="backTolast">上一步</el-button>
                <el-button type="primary" @click="nextToLast('actSchool')">下一步</el-button>
                <br>
            </div>
        </el-dialog>
        <!-- 签合同第三步 -->
        <el-dialog title="合同课程排班" :visible.sync="dialogFormVisibleLast" :close-on-click-modal="no" top='7%' show-close @close="resetClass('art')">
            <el-tabs v-model="activeName">
                <el-tab-pane v-for='(item,index) in tabClass' :name='item.number'>
                    <span slot="label"><i class="el-icon-star-on" v-if="item.isR=='yes'"></i> {{item.name}}</span>
                    <el-form :model="art[index]" :ref="artName[index]" :rules='artRules' label-width="80px">
                        <el-form-item label="开课日期" prop='time'>
                            <el-date-picker v-model="art[index].time" type="date" :picker-options="pickerOptions0" :editable="no" :clearable="no" @change='getClassRoom(art[index].time,index,item)'>
                            </el-date-picker>
                        </el-form-item>
                        <el-form-item prop='syllabus_id' class='CDselectClass'>
                            <el-radio-group v-model="art[index].syllabus_id" @change='radioChange'>
                                <el-radio :label="item.id" class='selectClass1' v-for='item in selectionClass[index]'>
                                    <span class="selectClass2">{{item.week==1?'周一':item.week==2?'周二':item.week==3?'周三':item.week==4?'周四':item.week==5?'周五':item.week==6?'周六':'周日'}}  {{item.class_time}}
                        </span>
                                    <span class="selectClass2">{{item.teacher?item.teacher.uname:''}}</span>
                                    <span>{{item.class_room.names+'(当前班级'+item.syllabus_person_num+'人)' }}
                        </span>
                                </el-radio>
                            </el-radio-group>
                        </el-form-item>
                    </el-form>
                </el-tab-pane>
            </el-tabs>
            <div slot="footer" class="dialog-footer">
                <el-button @click="backTolastOne">上一步</el-button>
                <el-button type="primary" :loading='writeL' @click="submitTheContract('art')">提交</el-button>
                <br>
            </div>
        </el-dialog>
        <!-- 添加沟通记录 -->
        <el-dialog :title="communityTitle" :visible.sync="dialogFormVisible" :close-on-click-modal="no" size='tiny' show-close class='CDDialog'
            @close="resetD('commuForm')">
            <el-form :model="commuForm" id='detailForm' :rules='rulecommuForm' ref="commuForm">
                <el-form-item label="" prop="remark">
                    <el-input  type="textarea" :autosize="{ minRows: 3, maxRows: 4}" placeholder="请输入内容(100字以内)" v-model="commuForm.remark">
                    </el-input>
                </el-form-item>
                <el-form-item label="记录标签：" class="CDEm10" prop="tags">
                    <br>
                    <el-checkbox-group v-model="commuForm.tags">
                        <el-checkbox v-for="box in boxes" :label="box.key" :value='box.key'>
                            <el-tag type='success'>{{box.label}}</el-tag>
                        </el-checkbox>
                    </el-checkbox-group>
                </el-form-item>
                <el-form-item label="跟进时间:" prop="remind_time">
                    <el-date-picker v-model="commuForm.remind_time" type="datetime" placeholder="选择日期时间" :picker-options="pickerOptions0"  popper-class='top55' :editable="no" :clearable="no" format='yyyy-MM-dd HH:mm'>
                    </el-date-picker>
                    <span>(选填)</span>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary"  :loading="writeL" @click="commuFormSubmit('commuForm')">确 定</el-button>
                <el-button @click="dialogFormVisible = false">取 消</el-button>
            </div>
        </el-dialog>
        <!-- 添加邀约记录 -->
        <el-dialog :title="inviteTitle" :visible.sync="dialogFormVisibleInvite" :close-on-click-modal="no" size='tiny' show-close
            class='CDDialog' @close="resetD('inviteForm')">
            <el-form :model="inviteForm" id='detailForm' :rules='ruleinviteForm' ref="inviteForm" label-width='82px'>
                <el-form-item label="邀约时间:" prop="alert_time">
                    <el-date-picker v-model="inviteForm.alert_time" type="datetime" placeholder="选择日期时间" :picker-options="pickerOptions0" :editable="no" :clearable="no" popper-class='top55' format='yyyy-MM-dd HH:mm'>
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="上课老师:" style='margin-top:10px' prop="teacher_id">
                    <el-select v-model="inviteForm.teacher_id"  placeholder="请选择老师" class="CDE193">
                        <el-option v-for="item in teachersName" :key="item.aid" :label="item.uname" :value="item.aid">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="邀约课程:" prop="course_id">
                    <el-select v-model="inviteForm.course_id"  placeholder="请选择课程" class="CDE193">
                        <el-option v-for="item in courseName" :key="item.kcid" :label="item.title" :value="item.kcid">
                        </el-option>
                    </el-select>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" :loading="writeL" @click="inviteFormSubmit('inviteForm')">确 定</el-button>
                <el-button @click="dialogFormVisibleInvite = false">取 消</el-button>
            </div>
        </el-dialog>
        <!-- 设置到访未到访 -->
        <el-dialog title="设置到访" :visible.sync="confirmVisitDialog" :close-on-click-modal="no" top='33%' size='tiny' show-close style='z-index:100'
            class='CDDialog'>
            <div class='CDEfs16'>请确认该学员是否到访?</div>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" :loading="writeL" @click="confirmVisitSubmit('1')">已到访</el-button>
                <el-button :loading="writeL" @click="confirmVisitSubmit('0')">未到访</el-button>
            </div>
        </el-dialog>
    </div>
</template>
<script>
    var token, user
    import {
        getMyCustomerTag,
        getAllCCList,
        cityList,
        getCommuList,
        put_commuR,
        create_commuR,
        getInviteList,
        create_inviteR,
        put_inviteR,
        getMyCustomerDetail,
        put_customer,
        getClassLibrary,
        getTeacherList,
        confirm_noDemand,
        confirm_visit,
        getClassKind,
        getLessonDetail,
        getPromotionList,
        signContract,
        getClassTable,
        getDateClass,
        searchResource,
        checkOrderSku
    } from '../../api/api';
    export default {
        data() {
            var isSpace = (rule, value, callback) => {
                var myreg = /^.{1,100}$/;
                var myreg1 = /^\s/;
                
                if (myreg1.test(value)) {
                    callback('请输入有效内容')
                } else if (!myreg.test(value)) {
                    callback('内容不得超过100字');
                } else {
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
            var isPName1 = (rule, value, callback) => {//修改用户
                var myreg = /^[\u4e00-\u9fa5a-zA-Z]+$/;
                if (value == '') {
                    callback()
                } else if (!myreg.test(value)) {
                    callback('请输入有效的家长姓名');
                } else {
                    if(this.form.phone1&&this.form.con1){
                        callback();
                        }else{
                        callback('必须填写全第二家长信息');
                        }
                }
            }
            var isPName2 = (rule, value, callback) => {//签合同
                var myreg = /^[\u4e00-\u9fa5a-zA-Z]+$/;
                if (value == '') {
                    callback()
                } else if (!myreg.test(value)) {
                    callback('请输入有效的家长姓名');
                } else {
                    if(this.signform.phone1&&this.signform.con1){
                        callback();
                        }else{
                        callback('必须填写全第二家长信息');
                        }
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
            var nan = (rule, value, callback) => {
                if (value == '') {
                    callback('请选择')
                } else if (typeof value == 'number') {
                    callback();
                }else{
                    callback();
                    
                }
            }
            var hasTag = (rule, value, callback) => {
                if (value.length == 0) {
                    callback('请选择')
                }else{
                    callback();
                    
                }
            }
            var isPhone = (rule, value, callback) => {//签合同
                var myreg = /^(((1[0-9]{1}))+\d{9})$/;
                if (value == '') {
                    callback('不能为空且必须唯一')
                } else if (!myreg.test(value)) {
                    callback('请输入有效手机号');
                } else {
                    let para = {
                search: value
                }
                searchResource(para, token).then(res => {
                if(res.data.data.length!=0&&res.data.data[0].id!=this.signform.id){
                callback('此手机号码已存在');
                }else{
                callback();

                }
                })
                }
            }
            var isPhone2 = (rule, value, callback) => {//签合同
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
                if(res.data.data.length!=0&&res.data.data[0].id!=this.signform.id){
                callback('此手机号码已存在');
                }else{
                    if(this.signform.parent1&&this.signform.con1){

                        callback();
                    }else{
                        callback('必须填写全第二家长信息');
                    }

                }
                })
                }
            }
            var isPhone3 = (rule, value, callback) => {//修改用户
                var myreg = /^(((1[0-9]{1}))+\d{9})$/;
                if (value == '') {
                    callback('不能为空且必须唯一')
                } else if (!myreg.test(value)) {
                    callback('请输入有效手机号');
                } else {
                    let para = {
                search: value
                }
                searchResource(para, token).then(res => {
                if(res.data.data.length!=0&&res.data.data[0].id!=this.form.id){
                callback('此手机号码已存在');
                }else{
                callback();

                }
                })
                }
            }
            var iscon1 = (rule, value, callback) => {//修改用户
                if (value == '') {
                    callback()
                }else{
                    if(this.form.phone1&&this.form.parent1){
                        callback();
                        }else{
                        callback('必须填写全第二家长信息');
                        }
                }
            }
            var iscon = (rule, value, callback) => {//签合同
                if (value == '') {
                    callback()
                }else{
                    if(this.signform.phone1&&this.signform.parent1){
                        callback();
                        }else{
                        callback('必须填写全第二家长信息');
                        }
                }
            }
            var isPhone1 = (rule, value, callback) => {//修改用户
                var myreg = /^(((1[0-9]{1}))+\d{9})$/;
                if (value == '') {
                    callback()
                } else if (!myreg.test(value)) {
                    callback('请输入有效手机号');
                }else if(this.form.phone==value){
                callback('不要输入重复的手机号');
                }else {
                let para = {
                search: value
                }
                searchResource(para, token).then(res => {
                if(res.data.data.length!=0&&res.data.data[0].id!=this.form.id){
                callback('此手机号码已存在');
                }else{
                    if(this.form.parent1&&this.form.con1){
                        callback();
                        }else{
                        callback('必须填写全第二家长信息');
                        }

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
                    callback('请选择付款方式')
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
            // var isToday = (rule, value, callback) => {
            //     if (value == '') {
            //         callback('请选择签约日期')
            //     } else if (new Date(value) - new Date() > 0) {
            //         callback('签约日期不得晚于当日')
            //     } else {
            //         callback()
            //     }
            // }
            return {
                writeL:false,
                ok:true,
                isActive:true,
                maxlength:11,
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
                // attSrc: '../../../static/img/attention.png',
                // signSrc: '../../../static/img/recognize.png',
                couponsList: [],
                courseName1: [],
                classkind: [],
                teachersName: [],
                courseName: [],
                coupons: [],
                artName: ['art0', 'art1', 'art2', 'art3', 'art4','art5','art6','art7','art8','art9'],
                tabClass: [],
                selectionClass: ['', '', '', '', ''],
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
                },{
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
                    // panda_gohome:'0',
                    courseName1: []
                }],
                tableTitle: ['课时', '签单数', '学费', '教材费', '书本费', '课程金额','优惠类型', '优惠金额','小计', '实收总额','操作'],
                inviteForm: {
                    alert_time: '',
                    teacher_id: '',
                    course_id: ''
                },
                boxes: [],
                // nostudent: false,
                dialogFormVisibleInvite: false,
                dialogFormVisibleSign: false,
                // warning: '*系统中没有该成员',
                // userName: '',
                userid: '',
                loading: false,
                student: {
                    names: '',
                    born:'',
                    sex: '',
                    age: '',
                    parent: '',
                    parent_phone: '',
                    parent1: '',
                    parent1_phone: '',
                    channel: '',
                    school_name: '',
                    fullAddrese:'',
                    created: '',
                    teacher: '',
                    sour_id: ''
                },
                propsource: {
                    value: 'id',
                    label: 'names',
                    children: '_child'
                },
                items: [],
                items1: [],
                dialogFormVisible: false,
                dialogFormVisibleAdd: false, //修改客户资料
                dialogFormVisible2: false, //设置客户无需求
                dialogFormVisible3: false, //填写合同内容
                dialogFormVisibleLast: false,
                no: false,
                number: '0',
                number1: 0,
                commuForm: {
                    remark: '',
                    remind_time: '',
                    customer_id: '',
                    tags: []
                },
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
                currentPage: 1, //页数
                currentPage1: 1, //页数
                pagesize: 4, //默认每页
                pagesize1: 2, //默认每页
                total: 0,
                total1: 0,
                regions: [],
                // allCC: [],
                form: { //修改客户的form
                    names: '',
                    sex: '',
                    age: '',
                    parent: '',
                    parent1: '',
                    con: '',
                    con1: '',
                    phone: '',
                    phone1: '',
                    familys: '',
                    city_id: '',
                    area_id: '',
                    address: '',
                    cc_id: '',
                },
                signform: { //合同第一步
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
                    school_name: '',
                    source_name: '',
                    tmk_uid: '',
                },
                cities: [],
                in: '',
                inInvite: '',
                code: '',
                backData: '', //备份第一步数据
                backContract: '', //备份第二步数据
                backactSchool: '', //备份第二步数据
                backClass: '', //备份第三步数据
                rulecommuForm: {
                    remark: [{
                        required: true,
                        // message: '请输入内容',
                        validator: isSpace,
                        trigger: 'blur'
                    }],
                    tags:[{required:true,
                        message: '请选择标签',
                        validator: hasTag,
                        trigger: 'blur'
                    }]
                },
                ruleinviteForm: {
                    alert_time: [{
                        required: true,
                        type: 'date',
                        message: '请选择时间',
                        trigger: 'change'
                    }],
                    teacher_id: [{
                        required: true,
                        validator: nan,
                        trigger: 'change'
                    }],
                    course_id: [{
                        required: true,
                        validator: nan,
                        trigger: 'change'
                    }],
                },
                ruleActSchool: {
                    sku: [{
                        required: true,
                        validator: numAndEng,
                        // message: '请输入合同编号',
                        trigger: 'blur'
                    }],
                    teacher_uid: [{
                        required: true,
                        validator: nan,
                        message: '请选择试听老师',
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
                        // message:'请输入金额',
                        validator: isMoney,
                        trigger: 'blur'
                    }],
                    // created: [{
                    //     required: true,
                    //     validator: isToday,
                    //     // type: 'date',
                    //     // message: '请选择签约时间',
                    //     trigger: 'change'
                    // }],
                },
                Confirmrule: {
                    names: [{
                        required: true,
                        validator: isName,
                        // message: '请输入姓名',
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
                        validator: isPName2,
                        trigger: 'blur'
                    }],
                    con: [{
                        required: true,
                        message: '请选择关系',
                        trigger: 'change'
                    }],
                    con1: [{
                        required: true,
                        // message: '请选择关系',
                        validator: iscon,
                        trigger: 'change'
                    }],
                    phone: [{
                        required: true,
                        validator: isPhone,
                        trigger: 'blur'
                    }],
                    phone1: [{
                        validator: isPhone2,
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
                        message: '请输入具体地址',
                        trigger: 'blur',
                    }],
                },
                artRules: {
                    time: [{
                        // required: true,
                        message: '请选择时间及开课班级',
                        type: 'date',
                        trigger: 'blur'
                    }],
                    // syllabus_id: [{
                    //     // required: true,
                    //     message: '请选择时间及开课班级',
                    //     validator: nan,
                    //     trigger: 'change'
                    // }],
                },
                rule: {
                    names: [{
                        required: true,
                        validator: isName,
                        // message: '请输入姓名',
                        trigger: 'blur'
                    }, ],
                    sex: [{
                        required: true,
                        message: '请选择性别',
                        trigger: 'change'
                    }],
                    age: [{
                        required: true,
                        message: '请选择年龄',
                        trigger: 'change'
                    }],
                    parent: [{
                        required: true,
                        validator: isPName,
                        // message: '请输入家长姓名',
                        trigger: 'blur'
                    }],
                    parent1: [{
                        validator: isPName1,
                        // message: '请输入家长姓名',
                        trigger: 'blur'
                    }],
                    con: [{
                        required: true,
                        message: '请选择关系',
                        trigger: 'change'
                    }],
                    con1: [{
                        required: true,
                        // message: '请选择关系',
                        validator: iscon1,
                        trigger: 'change'
                    }],
                    phone: [{
                        required: true,
                        validator: isPhone3,
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
                        message: '请输入具体地址',
                        trigger: 'blur'
                    }],
                },
                confirmVisitDialog: false,
                isVisitId: '',
                stopchange:false,
                secondO:true,
            }
        },
        methods: {
            checkCou1(data){
                if(data.some(item=>{return item.coupons_money-0})){
                    if(this.coupons.length===0){
                        this.$message.error('优惠类型为必选项，请选择后再提交');
                        this.secondO = false; 
                    }else{
                        this.secondO = true;
                    }
                }else{
                    if(this.coupons.length==0){
                        this.secondO = true; 
                    }else{
                        this.$message.error('请输入对应的优惠金额');
                    this.secondO = false; 
                    }
                }
            },
            checkCou(data,money,smoney){
                if(data.some(item=>{return item.coupons_money-0})){
                    if(this.coupons.length==0){
                        this.$message.error('优惠类型为必选项，请选择后再提交');
                    this.secondO = false;
                    }else{
                        this.secondO = true;
                    }
                }else{
                    if(this.coupons.length==0){
                        this.secondO = true;
                    }else{
                        this.$message.error('请输入对应的优惠金额');                    
                    this.secondO = false;
                    }
                }
                if(money>smoney){
                    this.$message.error('优惠金额不得大于课程金额');
                    this.secondO = false;
                }
            },
            checkP1(){
                this.$refs['form'].validateField('parent1');
                this.$refs['form'].validateField('con1');
                this.$refs['form'].validateField('phone1');                
            },
            checkP2(){
                this.$refs['signform'].validateField('parent1');
                this.$refs['signform'].validateField('con1');
                this.$refs['signform'].validateField('phone1');                
            },
            getClassName(data, i) { //获取课程名称
                let that =this;
                if(!this.stopchange&&data){
                    i.course_id = '';
                    i.year_num = '';
                        i.head_count = '';
                        i.tuition_price = '';
                        i.teaching_price = '';
                        i.book_price = '';
                        i.study_money = '';
                    let para = {
                        pid: data,
                        simple: 1
                    }
                    getClassLibrary(token, para).then((res) => {
                        i.courseName1 = res.data;
                    })
                }
                setTimeout(function() {
                    that.stopchange = false;
                }, 1);
            },
            submitTheContract(formName) { //排班好,最终提交合同
                let a = [];
                // let b = '';
                this.tabClass.map((item, index) => {//生成的tab长度
                    if (item.isR == 'yes') {
                        a.push(index)
                    }
                    this.art[index].course_id = item.course_id
                })
                let c = [...this.art]//10个长度
                c.splice(this.tabClass.length, this.art.length);
                let count = []
                if (a.length!=0) {
                    a.map((item)=>{
                        let n = 'art' + item;
                        this.$refs[n][0].validate((valid) => {
                            if (valid&&c[item].syllabus_id) {
                                count.push(item);
                                if(count.length>=1){
                                    this.writeL = true;
                                let para = {}
                                para.customer_id = this.$route.params.uid
                                para.users = { ...this.backData
                                }
                                para.users.birthday = new Date(para.users.birthday).toLocaleDateString()
                                if (para.users.parent1 ) {
                                    para.users.family = para.users.parent + '|' + para.users.con + '|' + para.users
                                        .phone + ',' + para.users.parent1 + '|' + para.users.con1 + '|' + para.users
                                        .phone1
                                } else {
                                    para.users.family = para.users.parent + '|' + para.users.con + '|' + para.users
                                        .phone
                                }
                                para.order = { ...this.backactSchool
                                }
                                para.order.created = new Date(para.order.created).toLocaleDateString()
                                para.order.kecheng = [...this.backContract]
                                para.order.coupons = this.coupons
                                para.scheduling = c
    
                                para.order = JSON.stringify(para.order)
                                para.users = JSON.stringify(para.users)
                                para.scheduling = JSON.stringify(para.scheduling)
                                signContract(para, token).then((res) => {
                                    if (res.code == 0) {
                                        this.$message.success('合同签约成功');
                                        this.dialogFormVisibleLast = false;
                                        this.writeL = false;
                                        this.$router.push('/studentDetail/' + res.data.uid); //可能要改成去到学员详细页
                                    } else {
                                        this.$message.error(res.data);
                                        this.writeL = false;
                                    }
                                })
                                }
                            }else{
                                if(c[item].time&&this.selectionClass[item].length!=0){
                                this.$message.error('请选择具体班级')
                                }
                                if(c[item].time&&this.selectionClass[item].length==0){
                                    this.$message.error('该日没有此课程班级,请重新选择')
                                }
                            }
                        })
                    })
                    if(c.length!=a.length&&count.length==0){//c全部tab长度,a必填长度
                        // console.log(count)
                        // console.log(a)
                        let o = new Set(count);//[]
                        let p = new Set(a);//[0,1,2]
                        let r = new Set([...p].filter(x => !o.has(x)));//1,2
                        // console.log([...r][0])
                        this.activeName = [...r][0]+1+'';
                        if (this.art[[...r][0]].time&&this.selectionClass[[...r][0]].length!=0) {
                            this.$message.error('请选择具体班级')
                        }
                        if (this.art[[...r][0]].time&&this.selectionClass[[...r][0]].length==0){
                                    this.$message.error('该日没有此课程班级,请重新选择')
                                }
                    }
                } else {
                    let para = {}
                    para.customer_id = this.$route.params.uid
                    para.users = { ...this.backData
                    }
                    para.users.birthday = new Date(para.users.birthday).toLocaleDateString()
                    if (para.users.parent1) {
                        para.users.family = para.users.parent + '|' + para.users.con + '|' + para.users.phone + ',' +
                            para.users.parent1 + '|' + para.users.con1 + '|' + para.users.phone1
                    } else {
                        para.users.family = para.users.parent + '|' + para.users.con + '|' + para.users.phone
                    }
                    para.order = { ...this.backactSchool}
                    para.order.created = new Date(para.order.created).toLocaleDateString()
                    para.order.kecheng = [...this.backContract]
                    para.order.coupons = this.coupons
                    para.scheduling = c
                    para.order = JSON.stringify(para.order)
                    para.users = JSON.stringify(para.users)
                    para.scheduling = JSON.stringify(para.scheduling);
                    this.writeL = true;
                    signContract(para, token).then((res) => {
                        if (res.code == 0) {
                            this.$message.success('合同签约成功');
                            this.dialogFormVisibleLast = false;
                            this.writeL = false;
                            this.$router.push('/studentDetail/' + res.data.uid); //可能要改成去到学员详细页
                        } else {
                            this.$message.error(res.data);
                            this.writeL = false;
                        }
                    })
                }
            },
            radioChange() { //为了显示
                // console.log(1)
            },
            getClassRoom(time, index, data) { //切换日期获取当天班级
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
                            that.selectionClass[index] = res.data
                            that.art[index].syllabus_id = time
                            that.art[index].syllabus_id = ''
                        } else {
                            that.art[index].syllabus_id = 999;
                            that.selectionClass[index] = [];
                            that.art[index].syllabus_id = ''                            
                            this.$message.info('该日没有此课程班级')
                        }
                    })
                    // console.log(that.selectionClass[index])
                } else {
                    that.selectionClass[index].splice(0, this.selectionClass[index].length);
                }
            },
            nextToSign(formName) { //1 to 2
                let that = this;
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.backData = { ...this.signform
                        }; //备份第一步数据
                        if (this.backContract && this.backactSchool) { //如果有第二步数据赋值
                            this.contracts = [...this.backContract];
                            this.actSchool = { ...this.backactSchool
                            }
                        }else{
                        setTimeout(function() {
                            that.$refs['actSchool'].resetFields();
                        }, 1);
                        }
                        this.dialogFormVisibleSign = false;
                        this.dialogFormVisible3 = true;
                    }
                })
            },
            nextToLast(formName) { //2 to 3
                this.$refs[formName].validate((valid) => {
                    if (valid && this.isEqual === 1&& this.secondO && this.contracts.every(item=>{return item.course_id})) {
                        this.backContract = [...this.contracts]
                        this.backContract.map((item, index) => {
                            item.courseName1.map(i => {
                                if (i.kcid == item.course_id) {
                                    this.tabClass[index] = {
                                        name: i.title,
                                        isR: item.kc_tid == 1 ? 'yes' : 'no',
                                        number: (index + 1) + '',
                                        course_id: item.course_id
                                    }
                                }
                            })
                        })
                        this.backactSchool = { ...this.actSchool
                        } //备份第二步数据
                        // if(this.backClass){//如果有第三步数据赋值
                        //     this.art = [...this.backClass]
                        // }
                        this.dialogFormVisible3 = false;
                        this.dialogFormVisibleLast = true;
                    }else{
                        if(!this.contracts.every(item=>{return item.course_id})){
                        this.$message.info('课程还未选择')
                        }else{
                        this.$message.info('请确认所有项目填写正确')                            
                        }
                    }
                })
            },
            backTolastOne() { //3 to2
                this.tabClass = []
                this.backClass = [...this.art] //备份第三步数据
                this.contracts = [...this.backContract];
                // this.backContract.map((item,index)=>{
                //     this.contracts[index].course_id = item.course_id
                // })
                this.actSchool = { ...this.backactSchool
                }; //还原第二步数据
                this.dialogFormVisible3 = true;
                this.dialogFormVisibleLast = false;
                // this.signform = {...this.backData}
            },
            backTolast() { //2 to 1
                this.backContract = [...this.contracts]
                this.backactSchool = { ...this.actSchool
                } //备份第二步数据
                this.signform = { ...this.backData
                } //还原第一步数据
                this.dialogFormVisible3 = false;
                this.dialogFormVisibleSign = true;
            },
            addPay() { //增加支付方式
                this.actSchool.pay.push({
                    method: '',
                    money: ''
                })
            },
            deletePay(index) { //删除支付方式
                this.actSchool.pay.splice(index,1);
                this.changeReset1('method');
                this.changeReset1('money')
            },
            resetAll() { //重置第二步
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
                    // panda_gohome:'0',
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
                }
                // this.$refs['actSchool'].resetFields();
            },
            changeReset1(val){
                if(val==='money'){
                    this.$refs['actSchool'].validate((valid) => {})
                }else{
                    this.$refs['actSchool'].validateField(val);
                }
            },
            resetClass(formName) { //重置第三步
                this.art = [{
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
                },{
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
                }]
                this.selectionClass = [[],[],[],[],[]];
                // this.$refs[formName].resetFields();
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
            addCon(index) { //增加第二步课程
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
                    // panda_gohome:'0',
                    courseName1: []
                })
            },
            delCon(index,data) { //删除某个课程
                this.stopchange = true;
                this.contracts.splice(index, 1)
            },
            getNowFormatDate(date) { //时间格式转换
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
            confirmVisitSubmit(num) { //已到访设置
                let para = {
                    id: this.isVisitId,
                    status: num
                }
                this.writeL = true;
                confirm_visit(para, token).then(res => {
                    if (res.code == 0) {
                        this.confirmVisitDialog = false;
                        this.writeL = false;
                        this.getIL();
                    } else {
                        this.$message.error(res.message);
                        this.writeL = false;
                    }
                    return res
                }).then((res) => {
                    if (res.code == 0) {
                        if (num == 1) {
                            this.$router.push({ name: 'customerDetailList', params: { uid: this.$route.params.uid,status: '已到访'}});
                        } else {
                            this.$router.push({ name: 'customerDetailList', params: { uid: this.$route.params.uid,status: '未到访'}});
                        }
                    }
                }).catch(()=>{
                    this.writeL = false;
                })

            },
            confirmVisit(id, item) { //点击到访按钮
                this.confirmVisitDialog = true;
                this.isVisitId = id
            },
            editInvite(index, item, e) { //点击修改邀约记录
                let para = {
                    simple: 1
                }
                getClassLibrary(token, para).then((res) => { //获取邀约课程名称
                    this.courseName = res.data;
                })
                this.inInvite = '1';
                // this.inviteForm.customer_id = this.$route.params.uid //this.getUserId;
                this.inviteForm.id = item.id;
                this.inviteForm.alert_time = new Date(item.alert_time)
                this.inviteForm.teacher_id = item.teacher_id ? item.teacher_id - 0 : '';
                this.inviteForm.course_id = item.course_id - 0;
                this.dialogFormVisibleInvite = true

            },
            addInvite() { //点击添加邀约记录
                let para = {
                    simple: 1
                }
                getClassLibrary(token, para).then((res) => { //获取邀约课程名称
                    this.courseName = res.data;
                })
                this.dialogFormVisibleInvite = true;
            },
            inviteFormSubmit(formName) { //提交 添加邀约记录
                this.$refs[formName].validate((valid) => { //替换提交服务
                    if (valid) {
                        this.writeL = true;
                        let para = { ...this.inviteForm}
                        para.alert_time = new Date(para.alert_time)
                        para.customer_id = this.$route.params.uid
                        if (this.inInvite == '') {
                            create_inviteR(para, token).then((res) => {
                                if (res.code == 0) {
                                    this.$message.success('添加成功')
                                    this.currentPage1 = 1;
                                    this.getIL();
                                    this.writeL = false;                                    
                                    this.$router.push({ name: 'customerDetailList', params: { uid: this.$route.params.uid,status: '未到访'}});
                                    this.dialogFormVisibleInvite = false;
                                } else {
                                    this.$message.error(res.data);
                                    this.writeL = false;
                                }
                            }).catch(error => {
                                this.writeL = false;
                            })
                        } else {
                            put_inviteR(para, token).then((res) => {
                                if (res.code == 0) {
                                    this.$message.success('修改成功')
                                    this.currentPage1 = 1;
                                    this.getIL();
                                    this.dialogFormVisibleInvite = false;
                                    this.writeL = false;                                    
                                } else {
                                    this.$message.error(res.data);
                                    this.writeL = false;
                                }
                            }).catch(error => {
                                this.writeL = false;
                            })
                        }
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            resetD(formName) { //重置表单
                this.in = '';
                this.commuForm.id = ''; //该记录的id
                this.commuForm.remind_time = '';
                this.commuForm.remark = '';
                this.commuForm.tags = [];
                this.inInvite = '';
                this.inviteForm = {
                    id: '',
                    alert_time: '',
                    teacher_id: '',
                    course_id: ''
                }
                this.$refs['inviteForm'].resetFields();
            },
            onSubmit(formName) { //修改用户资料提交
                this.$refs[formName].validate((valid) => { //替换提交服务
                    if (valid) {
                        this.writeL = true;  
                        let para = {...this.form}                      
                        if (para.parent1) {
                            para.familys = para.parent + '|' + para.con + '|' + para.phone +
                                ',' + para.parent1 + '|' + para.con1 + '|' + para.phone1
                        } else {
                            para.familys = para.parent + '|' + para.con + '|' + para.phone
                        }
                        para.customer_id = this.$route.params.uid;
                        // let para = JSON.parse(JSON.stringify(this.form));
                        put_customer(para, token).then(res => {
                            if (res.code == 0) {
                                this.form.sour_id = [];
                                this.$message({
                                    message: '修改成功',
                                    type: 'success'
                                });
                                this.dialogFormVisibleAdd = false;
                                this.writeL = false;                                
                            } else {
                                this.$message.error(res.message);
                                this.writeL = false;
                            }
                        }).then(() => {
                            this.getCU();
                        })
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });

            },
            signContact() { //点击签合同第一步
                this.resetAll();
                this.coupons = [];
                this.backData = ''
                this.backContract = ''
                this.backactSchool = ''
                this.backClass = '';
                this.tabClass = [];
                this.dialogFormVisibleSign = true;
                let para = {
                    customer_id: this.$route.params.uid
                }
                getMyCustomerDetail(token, para).then(res => {//获取用户资料
                    let data = res.data.info;
                    this.signform = {
                        id:data.id,
                        names: data.names,
                        sex: data.sex == '男' ? '1' : '2',
                        id_number: '',
                        birthday: '',//new Date(data.birthday),
                        parent: data.customer_famliy[0].uname,
                        parent1: data.customer_famliy[1] ? data.customer_famliy[1].uname? data.customer_famliy[1].uname:'' : '',
                        con: data.customer_famliy[0].relation,
                        con1: data.customer_famliy[1] ? data.customer_famliy[1].relation?data.customer_famliy[1].relation:'' : '',
                        phone: data.customer_famliy[0].mobile,
                        phone1: data.customer_famliy[1] ? data.customer_famliy[1].mobile?data.customer_famliy[1].mobile:'' : '',
                        family: '',
                        school_name: data.school_name,
                        cc_name: data.cc_name,
                        source_name: data.source_name,
                        tmk_uid: data.tmk_uid,
                    }
                })
            },
            recognizeResource() { //点击设置为无需求
                this.dialogFormVisible2 = true;
            },
            restartResource() { //点击确定为无需求调服务
                let para = {
                    cid: this.$route.params.uid
                }
                confirm_noDemand(para, token).then(res => {
                    if (res.code == 0) {
                        this.$message.success('已设置为无需求');
                    }else{
                        this.$message.error(res.data);
                        this.writeL = false;
                    }
                }).then(() => {
                    this.$router.push('/myCustomer');
                    this.dialogFormVisible2 = false;
                    this.writeL = false;
                })
            },
            addComm() { //点击添加沟通记录
                getMyCustomerTag(token).then(res => {
                    this.boxes = res.data
                })
                this.commuForm.customer_id = this.$route.params.uid;
                this.dialogFormVisible = true
            },
            commuFormSubmit(formName) { //提交 添加沟通记录
                this.$refs[formName].validate((valid) => { //替换提交服务
                    if (valid) {
                        this.writeL = true;
                        let para = { ...this.commuForm}
                        para.remind_time = new Date(para.remind_time)
                        para.tags = para.tags.join(',')
                        if (this.in == '') {
                            create_commuR(para, token).then((res) => {
                                if(res.code==0){
                                    this.$message.success('添加成功')
                                    this.currentPage = 1;
                                    this.getCL();
                                    this.dialogFormVisible = false;
                                    this.writeL = false;
                                }else{
                                    this.$message.error(res.data);
                                    this.writeL = false;                                    
                                }
                            }).catch(error => {
                                this.writeL = false;
                            })
                        } else {
                            put_commuR(para, token).then((res) => {
                                if(res.code==0){
                                    this.$message.success('修改成功');
                                    this.currentPage = 1;
                                    this.getCL();
                                    this.dialogFormVisible = false;
                                    this.writeL = false;
                                }else{
                                    this.$message.error(res.data);
                                    this.writeL = false;                                    
                                }
                            }).catch(error => {
                                this.writeL = false;
                            })
                        }
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            editReturn(index, item) { //点击修改沟通记录
                getMyCustomerTag(token).then(res => {
                    this.boxes = res.data
                })
                this.in = '1';
                this.commuForm.remark = item.remark
                this.commuForm.remind_time = item.remind_time == 0 ? '' : item.remind_time;
                this.commuForm.customer_id = this.$route.params.uid //this.getUserId;
                this.commuForm.tags = Object.keys(item.tags);
                this.commuForm.id = item.id; //该记录的id
                this.dialogFormVisible = true
            },
            getRegion() { //获取城市，就近校区
                this.form.area_id = '';
                // this.form.address = ''
                let para = {
                    pid: this.form.city_id
                }
                cityList(token, para).then((res) => {
                    // console.log(res)
                    this.regions = res.data
                })
            },
            addU() { //点击修改用户资料
                this.nostudent = false;
                let para = {
                    customer_id: this.$route.params.uid
                }
                getMyCustomerDetail(token, para).then(res => { //获取用户资料
                    let data = res.data.info;
                    // console.log(data)
                    // let arr = [];
                    this.form = {
                        id:data.id,
                        names: data.names,
                        sex: data.sex,
                        age: data.age + '',
                        parent: data.customer_famliy[0].uname,
                        parent1: data.customer_famliy[1] ? data.customer_famliy[1].uname : '',
                        con: data.customer_famliy[0].relation,
                        con1: data.customer_famliy[1] ? data.customer_famliy[1].relation : '',
                        phone: data.customer_famliy[0].mobile,
                        phone1: data.customer_famliy[1] ? data.customer_famliy[1].mobile : '',
                        familys: '',
                        city_id: data.city_id - 0,
                        area_id: data.area_id - 0,
                        address: data.address,
                        cc_id: data.cc_uid - 0,
                    }
                    let para = {
                    pid: this.form.city_id
                }
                    cityList(token, para).then((res) => {
                        // console.log(res)
                        this.regions = res.data
                    }).then(()=>{
                        this.form.area_id =data.area_id - 0;    
                    }).then(()=>{
                        this.dialogFormVisibleAdd = true;
                        
                    })
                    // return data
                })
            },
            handleCurrentChange: function (val) { //沟通记录变更页数
                this.currentPage = val;this.backToTop();
                this.getCL();
            },
            handleCurrentChange1: function (val) { //邀约记录变更页数
                this.currentPage1 = val;
                this.getIL();
            },
            getCU(){//用户信息
                let para = {
                customer_id: this.$route.params.uid
            }
                getMyCustomerDetail(token, para).then(res => {//获取用户资料
                // console.log(res)
                let data = res.data.info
                this.student = {
                                    names: data.names,
                                    born:data.birthday,
                                    age: data.age,
                                    sex: data.sex ,
                                    school_name: data.school_name,
                                    cc_name: data.cc_name,
                                    channel: data.source_name,
                                    fullAddress: data.fullAddress,
                                    school_id: data.school_id,                                    
                                    created: data.created,
                                    parent: data.customer_famliy[0].uname ? data.customer_famliy[
                                            0].uname + '(' + data.customer_famliy[0].relation +
                                        ')' : '',

                                    parent1: data.customer_famliy[1] ? data.customer_famliy[
                                            1].uname?data.customer_famliy[
                                            1].uname + '(' + data.customer_famliy[1].relation +
                                        ')' :'': '',
                                    parent_phone: data.customer_famliy[0].mobile,
                                    parent1_phone: data.customer_famliy[1] ? data.customer_famliy[
                                        1].mobile?data.customer_famliy[
                                        1].mobile:'' : '',
                                    sour_id: data.sour_id,
                                    referral_name: data.referral ? data.referral.referral_name :
                                        '',
                                    teach_name: data.referral ? data.referral.teach_name : ''
                                }
                                let para={
                    school_id:this.student.school_id
                }
                getTeacherList(token,para).then((res) => { //获取老师
                    this.teachersName = res.data;
                })
            }).catch((res) => {
                // console.log('No Data');
                // this.$message.error('数据有误')
            })
            },
            getCL(){//沟通记录
                let p = {
                    page: this.currentPage,
                    customer_id: this.$route.params.uid
                }
                getCommuList(token, p).then(res => {//获取沟通记录
                    // console.log(res)
                    this.number = res.data.total;
                    this.items = res.data.data;
                    let c = res.data.last_page * this.pagesize;
                    this.total = parseInt(c);
                })
            },
            getIL(){//邀约记录
                let p = {
                    page: this.currentPage1,
                    customer_id: this.$route.params.uid
                }
                getInviteList(token, p).then(res => { //获取邀约记录
                    this.number1 = res.data.total;
                    this.items1 = res.data.data;
                    let c = res.data.last_page * this.pagesize1;
                    this.total1 = parseInt(c);
                })
            },

        },
        computed: {
            Pstatus(){
                return this.$route.params.status
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
                let l =  this.actSchool.pay.length
                    this.actSchool.pay.map((item, index) => {
                        m = m.filter(i => {
                            return i.id != item.method
                        })
                    })
                    return m
            },
            isEqual() {
                if (this.payTotal == this.totalP3) {
                    return 1
                } else {    
                    return 0
                }
            },
            payTotal() { //付款总额
                let a = 0;
                this.actSchool.pay.map(item => {
                    a += item.money - 0
                })
                return a;
            },
            totalP() { //总计费用
                let a = 0;
                this.contracts.map(item => {
                    a += item.study_money - 0
                })
                return a
            },
            totalP2() { //优惠总额
                let a = 0;
                this.contracts.map(item => {
                    a += item.coupons_money - 0
                })
                return a
            },
            totalP3() { //实收总额
                return this.totalP - this.totalP2

            },
            communityTitle() {
                if (this.in === '') {
                    return '添加沟通记录'
                } else {

                    return '修改沟通记录'
                }

            },
            inviteTitle() {
                if (this.in === '') {
                    return '添加邀约记录'
                } else {

                    return '修改邀约记录'
                }
            },

        },
        beforeCreate() {
            user = sessionStorage.getItem('user');
            token = JSON.parse(user).token;
        },
        created() {
            // this.userName = JSON.parse(user).uname;
            this.userid = JSON.parse(user).aid;
            // this.school_name = JSON.parse(user).school_name;
            this.code = JSON.parse(user).job ? JSON.parse(user).job.code : '';
            this.getCU();
            this.getCL();
            this.getIL();
            getClassKind(token).then((res) => { //获取课程分类
                this.classkind = res.data;
            }).then(()=>{
                
                let si = {
                    simple: 1,
                }
                getPromotionList(token, si).then((res) => { //获取优惠列表
                    this.couponsList = res.data;
                })
                cityList(token).then((res) => { //获取城市 表格中用
                    // console.log(res)
                    this.cities = res.data
                })
                    })
            // if (this.code == 'cc_m') {
            //     getAllCCList(token).then((res) => {
            //         this.allCC = res.data;
            //         // this.allCC.unshift({aid:0,uname:'自己'})
            //     })
            // }
        },        
        // watch:{
        //     // 'payTotal':function (val) {
        //     //     if(this.payTotal==this.totalP3){
        //     //         this.isActive=true;
        //     //         console.log(this.isActive);
        //     //     }else{
        //     //         this.isActive=false;
        //     //     }
        //     // }
        //     // '$route' (to,form){
        //     //     console.log(to)
        //     //      console.log(from)
        //     // }
        // }
    }

</script>
<style>
        /*.readd {
        pointer-events: none
    }*/

    .UserDetailTitleCD {
        position: relative;
        /* background: url(../../../static/img/contact.png) left center/25px no-repeat; */
        padding: 10px;
        /* margin-left: 12px */
        display: flex;
    }

    .communityTitleCD {
        /* margin-left: 12px; */
        position: relative;
        padding: 10px 10px 10px 12px;
        border-bottom: 1px solid #e8e8e8;
        display: flex;
        /* background: url(../../../static/img/comuni.png) left center/30px no-repeat; */
        /* padding: 10px 10px 10px 30px; */
        /* border-bottom: 1px solid #e8e8e8; */
    }

    .tableUserCD .addUserTitle {
        padding: 10px;
        position: relative;
    }

    .tableUserCD .inviteTitle {
        /* margin-left: 5px; */
        position: relative;
        /* background: url(../../../static/img/invite.png) left center/30px no-repeat; */
        padding: 10px 10px 8px 5px;
        border-bottom: 1px solid #e8e8e8;
        display: flex;
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

    .tableUserCD .el-tag--success {
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
        width: 75px;
        padding:0 3px;
        display: flex;
    }

    .setToNo {
        background-color: #f29c9c;
        border-color: #f29c9c;
        height: 30px;
        line-height: 30px;
        width: 107px;
        padding: 0 4px;
        position: absolute;
        right: 0;
        display: flex;
    }

    .tableUserCD .editSpanCD {
        height: 30px;
        width: 30px;
        /* background: url(../../../static/img/edit.png) right/30px 30px no-repeat; */
        cursor: pointer;
        /*margin-top: 15px;*/
        float: right;
    }

    /* .tableUserCD .editSpanCD:hover {
        background-image: url(../../../static/img/edit_h.png);
    } */

    .tableUserCD .editVisit {
        position: absolute;
        left: 110px;
        top: 0;
        height: 20px;
        width: 20px;
        /* background: url(../../../static/img/visitEdit.png) right/20px 20px no-repeat; */
        cursor: pointer;
    }

    /* .tableUserCD .editVisit:hover {
        background-image: url(../../../static/img/visitEdit_h.png);
    } */

    .tableUserCD .editVisitI {
        position: absolute;
        right: 0;
        top: -5px;
        height: 30px;
        width: 30px;
        /* background: url(../../../static/img/edit.png) right/30px 30px no-repeat; */
        cursor: pointer;
    }

    /* .tableUserCD .editVisitI:hover {
        background-image: url(../../../static/img/edit_h.png);
    } */

    .tableUserCD .addU {
        width: 30px;
        height: 30px;
        /* background-image: url(../../../static/img/editU.png); */
        /* background-size: 30px 30px; */
        cursor: pointer;
        display: inline-block;
        margin-right: 5px;
    }

    /* .tableUserCD .addU:hover {
        background-image: url(../../../static/img/editU_h.png);
    } */

    .tableUserCD .addR {
        width: 30px;
        height: 30px;
        /* background-image: url(../../../static/img/addR.png); */
        /* background-size: 30px 30px; */
        cursor: pointer;
    }

    /* .tableUserCD .addR:hover {
        background-image: url(../../../static/img/addR_h.png);
    } */

    .tableUserCD .block {
        text-align: center;
        position: absolute;
        bottom: 0;
        width: 100%;
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

    .signContactDialogC .el-dialog--small {
        width: 1216.75px;
    }

    .tableUserCD .el-dialog .el-dialog__header {
        background-color: #1fb5ad;
        padding: 20px 20px 20px;
    }

    .tableUserCD .el-dialog .el-dialog__title {
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

    .cccCD {
        text-align: center;
        height: 40px;
        line-height: 40px;
        background: #f3f3f3;
        flex: 0 0 66px;
        border-right: 1px solid gainsboro;
        border-bottom: 1px solid gainsboro;
        border-top: 1px solid gainsboro
    }

    .dddCD {
        text-align: center;
        height: 40px;
        line-height: 40px;
        background: #f3f3f3;
        flex: 0 0 146px;
        border-right: 1px solid gainsboro;
        border-bottom: 1px solid gainsboro;
        border-top: 1px solid gainsboro
    }

    .maleCD {
        margin-left: 76px;
        margin-top: 22px;
    }

    .CDaddp {
        float: left;
        color: #1fb5ad;
        margin-left: 20px
    }

    .CDaddp:hover {
        cursor: pointer;
    }

    .CDdeletePay {
        float: left;
        color: #f29c9c;
        margin-left: 20px
    }

    .CDdeletePay:hover {
        cursor: pointer;
    }

    .CDdpromotionMoney input {
        height: 22px;
        margin: 9px auto;
        width: 91%;
    }

    .CDselectClass {
        height: 300px;
        overflow: auto
    }

    .CDselectClass .el-radio+.el-radio {
        margin-left: 0;
    }

    .selectClass1 {
        margin-right: 30%;
        margin-bottom: 10px;
        margin-top: 10px
    }

    .selectClass2 {
        margin-right: 30px
    }

    .CDEtitle {
        float: left;
        width: 30%;
        background-color: white;
        /* height: 476px; */
        border-radius: 5px;
        margin-right: 1%;
        position: relative
    }

    .CDEtitle1 {
        position: absolute;
        bottom: 10px;
        right: 10px;
        z-index: 100
    }

    .CDEtitleimg {
        position:absolute;left:0px;top:5px
    }

    .CDEtitleSign {
        position: absolute;
        right: 5px;
        top: 16px
    }

    .CDEinfo {
        font-weight: 600;
        font-size: 22px
    }

    .CDEinfo1 {
        position: absolute;
        top: 10px;
        right: 10px;
        width: 200px;
        text-align: right;
    }

    .CDEinfo2 {
        position: absolute;
        right: 50px;
        top: 0
    }

    .CDEinfoimg {
        position:absolute;left:0px;top:5px
    }

    .CDEinfoN {
        position: absolute;
        right: 5px;
        top:0;
        font-size: 12px
    }

    .CDEform {
        border-top: 1px solid #e8e8e8;
        padding-left: 10px
    }

    .CDE142 {
        width: 142px
    }

    .CDE142float {
        width: 142px;
        margin-right: 30px;
        float: left
    }

    .CDEfloat {
        width: 142px;
        float: left
    }

    .CDEgrey {
        margin-left: 10px;
        width: 200px;
        color: grey
    }

    .CDEcenter {
        text-align: center
    }

    .CDEm20 {
        margin-right: 20px
    }

    .CDEred {
        color: #ec6161;
        margin-top: 40px
    }

    .CDE202 {
        width: 193px
    }

    .CDE66 {
        margin-left: 10px;
        margin-right: 66px
    }

    .CDEfgrey {
        color: #a9a7a7
    }

    .CDEm5 {
        margin-bottom: 5px
    }

    .CDEflex {
        display: flex;
    }

    .CDEflex1 {
        text-align: center;
        height: 40px;
        line-height: 40px;
        background: #f3f3f3;
        border: 1px solid gainsboro;
        flex: 0 0 280px
    }

    .CDEflex2 {
        width: 100%;
        height: auto;
        display: flex;
        align-items: stretch;
        margin-bottom: 50px
    }

    .CDEflex3 {
        line-height: 40px;
        background: white;
        flex:0 0 617px;
        display: flex;
        align-items: stretch;
        flex-wrap: wrap
    }

    .CDEflex4 {
        font-size: 14px;
        display: flex;
        width: 684px;
    }

    .CDEflex5 {
        text-align: center;
        background: #f3f3f3;
        border: 1px solid gainsboro;
        border-top: none;
        flex: 0 0 280px;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .CDE103 {
        width: 101px
    }

    .CDE123 {
        width: 155px
    }

    .CDEflex6 {
        text-align: center;
        background: #f3f3f3;
        flex: 0 0 66px;
        display: flex;
        border-right: 1px solid gainsboro;
        border-bottom: 1px solid gainsboro;
        justify-content: center;
        align-items: center;
    }

    .CDEflex7 {
        background: #f3f3f3;
        text-align: center;
        border-right: 1px solid gainsboro;
        border-bottom: 1px solid gainsboro;
        flex: 0 0 146px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        height: auto
    }

    .CDE131 {
        width: 131px;
        margin-left: 7px
    }

    .CDEflex8 {
        line-height: 40px;
        flex: 0 0 67px;
        display: flex;
        align-items: stretch;
        flex-wrap: wrap;
    }

    .CDEflex68 {
        font-size: 14px;
        display: flex;
        flex: 0 0 68px;
    }

    .CDEflex9 {
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

    .CDEflex10 {
        line-height: 40px;
        background: white;
        flex: 0 0 68;
        display: flex;
        align-items: stretch;
        flex-wrap: wrap
    }

    .CDEflex11 {
        font-size: 14px;
        display: flex;
        flex: 0 0 66px;
    }

    .CDEflex12 {
        text-align: center;
        background: #f3f3f3;
        flex: 0 0 66px;
        display: flex;
        border-right: 1px solid gainsboro;
        border-bottom: 1px solid gainsboro;
        justify-content: center
    }

    .CDEnred {
        color: red;
        margin-left: 35px;
    }

    .cmk {
        display:none;
    }


    .CDEcom {
        float: left;
        width: 34%;
        background-color: white;
        border-radius: 5px;
        margin-right: 1%;
        /* height: 466px; */
        position: relative;
        padding-bottom:10px;
    }

    .CDEcom1 {
        font-weight: 600;
        font-size: 22px
    }

    .CDEcom2 {
        position: absolute;
        top: 10px;
        right: 15px
    }

    .CDEcom3 {
        min-height: 300px;
        width: 90%;
        margin: 0 auto;
        padding-bottom:30px;
    }

    .CDEcom4 {
        position: relative;
        min-height: 75px;
        border-bottom: 1px solid #e8e8e8;
    }

    .CDEcomright {
        text-align: right
    }

    .CDEcomimg {
        border-radius: 50%;
        margin-top: 10px;
        margin-right: 12%;
        border:1px solid gainsboro;
    }

    .CDEh30 {
        height: 30px
    }

    .CDEh1 {
        margin-top: 10px;
        float: left
    }

    .CDEh2 {
        font-size: 13px;
        color: grey;
        margin-top: 10px;
        text-align: right;
        float: right
    }

    .CDEh3 {
        font-size: 14px;
        color: grey;
        margin-top: 2px;
    }

    .CDEh4 {
        float: left;
        /* margin-bottom: 8px; */
        margin-top: 3px;
    }

    .CDEm10 {
        margin-top: 10px
    }

    .CDEint {
        float: left;
        width: 34%;
        background-color: white;
        border-radius: 5px;
        min-height: 435px;
        position: relative
    }

    .CDEinth {
        min-height: 298px;
        padding-bottom:30px;
    }

    .CDEint1 {
        position: relative;
        margin-left: 30px;
        border-bottom: 1px solid #e8e8e8;
    }

    .CDEint2 {
        font-weight: 600;
        margin-right: 5px
    }

    .CDErgrey {
        color: grey
    }

    .CDEint3 {
        float: left;
        position: relative;
        width: 100%;
        margin-bottom: 15px
    }

    .CDE193 {
        width: 193px
    }

    .CDEfs16 {
        font-size: 16px
    }
    .top55  .el-time-panel__content::after,.top55 .el-time-panel__content::before{
        top:55%
    }
    .fz30{
        font-size: 30px;
        line-height: 29px;        
        /* vertical-align: sub; */
    }
    .fzh:hover{
        color: #1fb5ad
    }
    .fz25{
        font-size: 25px;
        line-height: 29px;
    }
    .fgrey{
        color: #cacaca
    }
    .fl30{
        line-height: 30px;
    }
</style>
