<template>
    <div class="tableUserD">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-my-yonhu"></i> 客户管理</el-breadcrumb-item>
                <el-breadcrumb-item to="/myCustomer">我的客户</el-breadcrumb-item>
                <el-breadcrumb-item class='ss'>{{student.names}}</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <!-- 用户资料 -->
        <div style="float:left;width:30%;background-color:white;height:476px;border-radius:5px;margin-right:1%;position:relative">
            <div style='position:absolute;bottom:10px;right:10px;z-index:100'>
                <el-button v-if="this.$route.params.status=='已到访'" type="primary" size="mid" class='signC' @click='signContact'><img src="../../../static/img/recognize.png" alt="" width='25' style="margin-top:-7px;margin-left:-46px">
                    <span style="position:absolute;top:16px;right:8px;font-size:14px">签合同</span></el-button>
            </div>
            <div class='UserDetailTitle'>
                <span style="font-weight:600;font-size:22px">用户资料</span>
                <div style='position:absolute;top:10px;right:10px;width:200px;text-align: right;'>
                    <div style="position:absolute;right:50px;top:0">
                        <el-button type="primary" size="mid" class='setToNo' @click='recognizeResource'><img src="../../../static/img/attention.png" alt="" width='20' style="margin-top:4px;margin-left:-77px;display:inline-block;">
                            <span style="position:absolute;right:5px;font-size:12px">设置为无需求</span></el-button>
                    </div>
                    <div class='addU' @click='addU'></div>
                </div>
            </div>
            <el-form id='customerDeatilForm' label-width="102px" label-position='left' style='border-top:1px solid #e8e8e8 ;padding-left:10px'>
                <el-form-item label="姓名:" prop='names'>
                    <span>{{student.names}}</span>
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
                <el-form-item label="第二家长:" prop='parent'>
                    <span>{{student.parent1}}</span>
                </el-form-item>
                <el-form-item label="手机:" prop='parent'>
                    <span>{{student.parent_phone}}</span>
                </el-form-item>
                <el-form-item label="第二手机:" prop='parent'>
                    <span>{{student.parent1_phone}}</span>
                </el-form-item>
                <el-form-item label="渠道来源:" prop='channel'>
                    <span>{{student.channel}}</span>
                </el-form-item>
                <el-form-item label="录入时间:" prop='created'>
                    <span>{{student.created}}</span>
                </el-form-item>
                <el-form-item label="校区:" prop='school'>
                    <span>{{student.school_name}}</span>
                </el-form-item>
                <el-form-item label="课程顾问(CC):" prop='teacher'>
                    <span>{{userName}}</span>
                </el-form-item>
            </el-form>
        </div>
        <!-- 修改客户 -->
        <el-dialog title="修改客户" :visible.sync="dialogFormVisibleAdd" :close-on-click-modal="no" top='9.7%' id='CDEDialog' @close="resetD('form')">
            <el-form :model="form" :rules='rule' ref="form" label-width="80px">
                <el-form-item label="学生姓名" prop='names'>
                    <el-input v-model="form.names" placeholder='请输入学生姓名' style="width:142px"></el-input>
                </el-form-item>
                <el-form-item label="性别" prop='sex'>
                    <el-select v-model="form.sex" placeholder="请选择性别" style="width:142px">
                        <el-option label="男" value="1"></el-option>
                        <el-option label="女" value="2"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="年龄" prop='age'>
                    <el-select v-model="form.age" placeholder="选择" style="width:142px">
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
                    <el-form-item prop="parent" style="width:142px;margin-right:30px;float:left">
                        <el-input v-model="form.parent" placeholder='请输入家长姓名'></el-input>
                    </el-form-item>
                    <el-form-item prop="con" style="width:142px;margin-right:30px;float:left">
                        <el-select v-model="form.con" placeholder="请选择关系">
                            <el-option label="妈妈" value="妈妈"></el-option>
                            <el-option label="爸爸" value="爸爸"></el-option>
                            <el-option label="爷爷" value="爷爷"></el-option>
                            <el-option label="奶奶" value="奶奶"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item prop="phone" style="width:142px;float:left">
                        <el-input v-model="form.phone" placeholder='请输入手机号'></el-input>
                    </el-form-item>
                </el-form-item>
                <el-form-item label="">
                    <el-form-item prop="parent1" style="width:142px;margin-right:30px;float:left">
                        <el-input v-model="form.parent1" placeholder='请输入家长姓名'></el-input>
                    </el-form-item>
                    <el-form-item prop="con1" style="width:142px;margin-right:30px;float:left">
                        <el-select v-model="form.con1" placeholder="请选择关系">
                            <el-option label="妈妈" value="妈妈"></el-option>
                            <el-option label="爸爸" value="爸爸"></el-option>
                            <el-option label="爷爷" value="爷爷"></el-option>
                            <el-option label="奶奶" value="奶奶"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item prop="phone1" style="width:142px;float:left">
                        <el-input v-model="form.phone1" placeholder='请输入手机号'></el-input>
                    </el-form-item>
                    <el-col :span="2">
                        <span style="margin-left:10px;width:200px;color:grey"> (选填)</span>
                    </el-col>
                </el-form-item>
                <el-form-item label="所在地区" required>
                    <el-form-item prop="city_id" style="width:142px;margin-right:30px;float:left">
                        <el-select v-model="form.city_id" filterable placeholder="请选择城市" @change='getRegion'>
                            <el-option v-for="item in cities" :key="item.id" :label="item.city_name" :value="item.id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item prop="area_id" style="width:142px;margin-right:30px;float:left">
                        <el-select v-model="form.area_id" placeholder="请选择城区">
                            <el-option v-for="item in regions" :key="item.id" :label="item.city_name" :value="item.id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item prop="address" style="width:142px;float:left">
                        <el-input v-model="form.address" placeholder='请输入具体地址'></el-input>
                    </el-form-item>
                </el-form-item>
                <!-- <el-form-item label="就近校区" prop='school_id'>
                    <el-select v-model="form.school_id" placeholder="请选择校区" style="width:142px">
                        <el-option v-for="item in schoolsNear" :key="item.id" :label="item.title" :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="来源渠道" prop='sour_id' >
                <div  id='sourceDiv' style="height:40px;float: left;" :class='{readd:isread}' >
                    
                    <el-form-item prop='sour_id' style="width:142px;margin-right:30px;float:left">
                        <el-cascader :options="source" :props="propsource" v-model="form.sour_id" :show-all-levels="false" placeholder="请选择渠道" ref="source" editable="false" >
                        </el-cascader>
                    </el-form-item>
                </div>
                    <el-form-item prop='referee' style='float:left;width:142px;margin-right:10px'>
                        <el-autocomplete v-if='this.form.sour_id == 4' v-model="form.referee" :fetch-suggestions="querySearchAsync" placeholder="请输入内容" @select="handleSelect">
                        </el-autocomplete>
                    </el-form-item>
                    <el-form-item prop='familys_name' style='float:left;width:100px;'>
                        <span v-if='this.form.sour_id == 4'>家长姓名:{{form.familys_name}}</span>
                    </el-form-item>
                    <el-form-item prop='referral_uid' style="display:none">
                        <span>{{form.referral_uid}}</span>
                    </el-form-item>
                    <el-form-item prop='familys' style="display:none">
                    </el-form-item>
                    <span v-if='nostudent' style="width:200px;color:red;float:left"> {{warning}}</span>
                </el-form-item> -->
                <el-form-item label="更换CC" prop='cc_id' v-if="code =='cc_m'">
                    <el-select v-model="form.cc_id" placeholder="请选择CC" style="width:142px">
                        <el-option v-for="item in allCC" :key="item.aid" :label="item.uname" :value="item.aid">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item style='margin-top:40px;'>
                    <el-button type="primary" @click="onSubmit('form')">确定</el-button>
                    <el-button @click="dialogFormVisibleAdd = false">取消</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
        <!-- 设置为无需求 -->
        <el-dialog title="设置客户需求" :visible.sync="dialogFormVisible2" :close-on-click-modal="no" top='33%' size='tiny' show-close style='z-index:100' class='schoolDialog'>
            <div>是否确认要把客户设置为无需求客户</div>
            <div slot="footer" class="dialog-footer" style='text-align:center'>
                <el-button type="primary" @click="restartResource" style='margin-right:20px'>是</el-button>
                <el-button @click="dialogFormVisible2 = false">否</el-button>
                <br>
                <br>
                <br>
                <span style="color:#ec6161;">*请在了解资源实际情况后做出判断</span>
            </div>
        </el-dialog>
        <!-- 签合同第一步 -->
        <el-dialog title="确认学员资料" :visible.sync="dialogFormVisibleSign" :close-on-click-modal="no" top='8%' id='signDialog' @close="resetD('signform')">
            <el-form :model="signform" :rules='Confirmrule' ref="signform" label-width="80px">
                <el-form-item label="学生姓名" prop='names'>
                    <el-input v-model="signform.names" placeholder='请输入学生姓名' style="width:142px"></el-input>
                </el-form-item>
                <el-form-item label="性别" prop='sex'>
                    <el-select v-model="signform.sex" placeholder="请选择性别" style="width:142px">
                        <el-option label="男" value="1"></el-option>
                        <el-option label="女" value="2"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="身份证号" prop='id_number'>
                    <el-input v-model="signform.id_number" placeholder='请输入身份证号' style="width:202px"></el-input>
                </el-form-item>
                <el-form-item label="出生日期" prop='birthday'>
                    <el-date-picker v-model="signform.birthday" type="date" placeholder="选择日期" style="width:142px">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="登录密码" prop='pass'>
                    <p style="margin-left:10px">{{signform.birthday?getNowFormatDate(signform.birthday):''}}</p>
                </el-form-item>
                <el-form-item label="联系家长" required>
                    <el-form-item prop="parent" style="width:142px;margin-right:30px;float:left">
                        <el-input v-model="signform.parent" placeholder='请输入家长姓名'></el-input>
                    </el-form-item>
                    <el-form-item prop="con" style="width:142px;margin-right:30px;float:left">
                        <el-select v-model="signform.con" placeholder="请选择关系">
                            <el-option label="妈妈" value="妈妈"></el-option>
                            <el-option label="爸爸" value="爸爸"></el-option>
                            <el-option label="爷爷" value="爷爷"></el-option>
                            <el-option label="奶奶" value="奶奶"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item prop="phone" style="width:142px;float:left">
                        <el-input v-model="signform.phone" placeholder='请输入手机号'></el-input>
                    </el-form-item>
                </el-form-item>
                <el-form-item label="">
                    <el-form-item prop="parent1" style="width:142px;margin-right:30px;float:left">
                        <el-input v-model="signform.parent1" placeholder='请输入家长姓名'></el-input>
                    </el-form-item>
                    <el-form-item prop="con1" style="width:142px;margin-right:30px;float:left">
                        <el-select v-model="signform.con1" placeholder="请选择关系">
                            <el-option label="妈妈" value="妈妈"></el-option>
                            <el-option label="爸爸" value="爸爸"></el-option>
                            <el-option label="爷爷" value="爷爷"></el-option>
                            <el-option label="奶奶" value="奶奶"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item prop="phone1" style="width:142px;float:left">
                        <el-input v-model="signform.phone1" placeholder='请输入手机号'></el-input>
                    </el-form-item>
                    <el-col :span="2">
                        <span style="margin-left:10px;width:200px;color:grey"> (选填)</span>
                    </el-col>
                </el-form-item>
                <el-form-item label="就近校区" prop='school_id' style='margin-bottom:5px'>
                    <!-- <el-select v-model="signform.school_id" placeholder="请选择校区" style="width:142px">
                        <el-option v-for="item in schoolsNear" :key="item.id" :label="item.title" :value="item.id">
                        </el-option>
                    </el-select> -->
                    <p>{{signform.school_name}}</p>
                </el-form-item>
                <el-form-item label="来源渠道" prop='sour_id' style='margin-bottom:5px'>
                    <p>{{signform.source_name}}</p>
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
                <el-form-item label="课程顾问" prop='cc' style='margin-bottom:5px'>
                    <p>{{userName}}</p>
                </el-form-item>
                <el-form-item label="电话销售" prop='tmk' style='margin-bottom:5px'>
                    <p>{{signform.tmk_uid}}</p>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisibleSign = false">取消</el-button>
                <el-button type="primary" @click="nextToSign('signform')">下一步</el-button>
            </div>
        </el-dialog>
        <!-- 签合同第二步 -->
        <el-dialog title="填写合同内容" :visible.sync="dialogFormVisible3" :close-on-click-modal="no" top='7%' show-close style='z-index:100' class='signContactDialog' @close="resetAll('actSchool')">
            <el-form :model="actSchool" id='actSchool1' :rules='ruleActSchool' ref="actSchool">
                <div style="display:flex;">
                    <div style="text-align:center;height:40px;line-height:40px;background:#f3f3f3;border:1px solid gainsboro;flex:0 0 260px">课程</div>
                    <div v-for='item in tableTitle' :class="[item!='优惠类型'?'ccc':'ddd']">{{item}}</div>
                </div>
                <div style="width:100%;height:auto;display:flex;align-items:stretch">
                    <div style="line-height:40px;background:white;width:598px;display:flex;align-items:stretch;flex-wrap:wrap">
                        <div v-for='i in contracts' style='font-size:14px;display:flex;width: 598px;' class='lessonhover'>
                            <div style="text-align:center;background:#f3f3f3;border:1px solid gainsboro;border-top:none;flex:0 0 260px;display:flex; justify-content:center;align-items: center;">
                                <div>
                                    <el-select v-model="i.kc_tid" clearable placeholder="课程类型" size='small' style='width:103px' @change='getClassName(i.kc_tid,i)'>
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
                            <!-- <div style="text-align:center;background:#f3f3f3;flex:0 0 66px;display:flex;border-right:1px solid gainsboro;border-bottom:1px solid gainsboro;justify-content:center;align-items: center;">
                                <span>{{i.study_money}}</span>
                            </div> -->
                        </div>
                    </div>
                   <!--  <div style="background:#ffffff;text-align:center;border-right:1px solid gainsboro;border-bottom:1px solid gainsboro;flex:0 0 66px;display:flex;flex-direction: column;justify-content: center;height:auto">{{totalP}}</div> -->
                    <!-- 总额用法 -->
                    <div style="background:#f3f3f3;text-align:center;border-right:1px solid gainsboro;border-bottom:1px solid gainsboro;flex:0 0 145px;display:flex;flex-direction: column;justify-content: center;height:auto">
                        <el-select v-model="coupons" clearable multiple placeholder="请选择" size='mini' style='width:131px;margin-left:7px'>
                            <el-option v-for="item in couponsList" :key="item.id" :label="item.title" :value="item.id">
                            </el-option>
                        </el-select>
                    </div>
                    <div style="line-height:40px;width:68px;display:flex;align-items:stretch;flex-wrap:wrap">
                        <div v-for='i in contracts' style='font-size:14px;display:flex;flex:0 0 68px' class='lessonhover'>
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
                   <!--  <div style="background:#ffffff;text-align:center;border-right:1px solid gainsboro;border-bottom:1px solid gainsboro;flex:0 0 66px;display:flex;flex-direction: column;justify-content: center;height:auto">{{totalP2}}</div> -->
                    <!-- 总额用法 -->
                    <!-- <div style="line-height:40px;width:66px;display:flex;align-items:stretch;;flex-wrap:wrap">
                        <div v-for='i in contracts' style='font-size:14px;display:flex;flex: 0 0 66px;' class='lessonhover'>
                            <div style="text-align:center;background:#f3f3f3;border-right:1px solid gainsboro;border-bottom:1px solid gainsboro;flex:0 0 66px;display:flex; justify-content:center;align-items: center;">
                                <span>{{i.study_money-i.coupons_money}}</span>
                            </div>
                        </div>
                    </div> -->
                    <div style="background:#ffffff;text-align:center;border-right:1px solid gainsboro;border-bottom:1px solid gainsboro;flex:0 0 65px;display:flex;flex-direction: column;justify-content: center;height:auto">{{totalP3}}</div>
                    <!-- 总额用法 -->
                    <div style="line-height:40px;background:white;width:5.4%;display:flex;align-items:stretch;flex-wrap:wrap">
                        <div v-for='(i,index) in contracts' style='font-size:14px;display:flex;flex: 0 0 66px;' class='lessonhover'>
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
                            <el-option label="有" value="1"></el-option>
                            <el-option label="无" value="0"></el-option>
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
                    <el-form-item label="付款总额">
                        {{payTotal}}元
                        <span v-if='this.payTotal != this.totalP3' style="color:red;margin-left:100px">*付款总额与实收总额不符*</span>
                    </el-form-item>
                    <el-form-item label="签约时间" prop='created'>
                        <el-date-picker v-model="actSchool.created" type="date">
                        </el-date-picker>
                    </el-form-item>
                </div>
            </el-form>
            <div slot="footer" class="dialog-footer" style='margin-top:-24px'>
                <el-button @click="backTolast">上一步</el-button>
                <el-button type="primary" @click="nextToLast('actSchool')">下一步</el-button>
                <br>
            </div>
        </el-dialog>
        <!-- 签合同第三步 -->
        <el-dialog title="合同课程排班" :visible.sync="dialogFormVisibleLast" :close-on-click-modal="no" top='7%' show-close style='z-index:100' @close="resetClass('art')">
            <el-tabs v-model="activeName">
                <el-tab-pane v-for='(item,index) in tabClass' :name='item.number'>
                    <span slot="label"><i class="el-icon-star-on" v-if="item.isR=='yes'"></i> {{item.name}}</span>
                    <el-form :model="art[index]" :ref="artName[index]" :rules='artRules' label-width="80px">
                        <el-form-item label="开课日期" prop='time'>
                            <el-date-picker v-model="art[index].time" type="date" @change='getClassRoom(art[index].time,index,item)'>
                            </el-date-picker>
                        </el-form-item>
                        <el-form-item prop='syllabus_id' class='selectClass' style='height:300px;overflow:auto'>
                            <el-radio-group v-model="art[index].syllabus_id" @change='radioChange'>
                                <el-radio v-for='item in selectionClass[index]' :label="item.id" style='margin-right:30%;margin-bottom:10px;margin-top:10px'><span style="margin-right:30px">{{item.week==1?'周一':item.week==2?'周二':item.week==3?'周三':item.week==4?'周四':item.week==5?'周五':item.week==6?'周六':'周日'}}  {{item.class_time.substring(0,5)}}</span><span style="margin-right:30px">{{item.teacher?item.teacher.uname:''}}</span><span>{{item.class_room.names+'(当前班级'+item.syllabus_person_num+'人)' }}</span></el-radio>
                            </el-radio-group>
                        </el-form-item>
                    </el-form>
                </el-tab-pane>
            </el-tabs>
            <div slot="footer" class="dialog-footer" style='margin-top:-24px'>
                <el-button @click="backTolastOne">上一步</el-button>
                <el-button type="primary" @click="submitTheContract('art')">提交</el-button>
                <br>
            </div>
        </el-dialog>
        <!-- 沟通记录 -->
        <div style="float:left;width:34%;background-color:white;border-radius:5px;margin-right:1%;height:476px;position:relative">
            <div class='communityTitle'>
                <span style="font-weight:600;font-size:22px">沟通记录({{number}})</span>
                <div style='position:absolute;top:10px;right:15px'>
                    <div class='addR' @click='addComm'></div>
                </div>
            </div>
            <div style="min-height:300px;width:90%;margin:0 auto">
                <el-row v-for='item in items' class='listUser' style='position:relative;min-height:75px'>
                    <el-col :span="4" style='text-align:right'>
                        <img :src="item.add_call_user.avatar?item.add_call_user.avatar:''" width='50' height='50' alt="" style='border-radius:50%;margin-top:10px;margin-right:12%'></el-col>
                    <el-col :span="20">
                        <div style="height:30px">
                            <div style='margin-top:10px;float:left'>{{item.add_call_user.uname}}</div>
                            <div style="font-size:13px;color:grey;margin-top:10px;text-align:right;float:right">{{item.create_at.substring(5,16)}}</div>
                        </div>
                        <div>
                            <div style="font-size:14px;color:grey;margin-top:2px;">{{item.remark}}</div>
                        </div>
                        <div>
                            <div style="float:left;margin-bottom:8px;margin-top:3px;">
                                <el-tag type='success' v-for='t in item.tags' class='tagTag'>{{t}}</el-tag>
                            </div>
                            <div class='editSpan' @click='editReturn(item.id,item)' v-if="new Date().getTime()-new Date(item.create_at).getTime()<7200000 "></div>
                        </div>
                    </el-col>
                </el-row>
            </div>
            <div class="block" v-if="this.total!=0">
                <el-pagination layout="prev, pager, next" :total="total" :current-page="currentPage" :page-size="pagesize" @current-change="handleCurrentChange">
                </el-pagination>
            </div>
        </div>
        <!-- 添加沟通记录 -->
        <el-dialog :title="communityTitle" :visible.sync="dialogFormVisible" :close-on-click-modal="no" size='tiny' show-close style='z-index:100' class='CDDialog' @close="resetD('commuForm')">
            <el-form :model="commuForm" id='detailForm' :rules='rulecommuForm' ref="commuForm">
                <el-form-item label="" prop="remark">
                    <el-input type="textarea" :autosize="{ minRows: 3, maxRows: 4}" placeholder="请输入内容" v-model="commuForm.remark">
                    </el-input>
                </el-form-item>
                <el-form-item label="记录标签：" style='margin-top:10px' prop="tags">
                    <br>
                    <el-checkbox-group v-model="commuForm.tags">
                        <el-checkbox v-for="box in boxes" :label="box.key" :value='box.key'>
                            <el-tag type='success'>{{box.label}}</el-tag>
                        </el-checkbox>
                    </el-checkbox-group>
                </el-form-item>
                <el-form-item label="跟进时间:" prop="remind_time">
                    <el-date-picker v-model="commuForm.remind_time" type="datetime" placeholder="选择日期时间">
                    </el-date-picker>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="commuFormSubmit('commuForm')">确 定</el-button>
                <el-button @click="dialogFormVisible = false">取 消</el-button>
            </div>
        </el-dialog>
        <!-- 邀约记录 -->
        <div style="float:left;width:34%;background-color:white;border-radius:5px;height:476px;position:relative">
            <div class='inviteTitle'>
                <span style="font-weight:600;font-size:22px;">邀约记录({{number1}})</span>
            </div>
            <div style='position:absolute;top:10px;right:15px'>
                <div class='addR' @click='addInvite'></div>
            </div>
            <div style="min-height:298px">
                <el-row v-for='item in items1' class='listUser' style='position:relative;margin-left:30px;'>
                    <div style="font-weight:600;magin-right:5px">邀约日期: {{item.alert_time.substring(0,16)}}</div>
                    <div class='inviteRecord'>邀约课程: <span style="color:grey">{{item.course}}</span> </div>
                    <div class='inviteRecord'>上课老师: <span style="color:grey">{{item.teach_name.uname}}</span></div>
                    <div class='inviteRecord'>记录时间: <span style="color:grey">{{item.created.substring(0,16)}}</span></div>
                    <div class='inviteRecord'>
                        <div style="float:left;position:relative;width:100%;margin-bottom:15px">
                            <div>到访设置: <span :style="item.fla == '已到访'?'color:#e9bd23':item.fla == '未到访'?'color:#e24545':'color:grey'">{{item.fla}}</span>
                            </div>
                            <div class='editVisit' v-if='item.update_count<2' style='margin-top:0' @click='confirmVisit(item.id,item)'></div>
                            <div class='editVisitI' @click='editInvite(item.id,item,$event)' v-if="new Date().getTime()-new Date(item.created).getTime()<7200000"></div>
                        </div>
                    </div>
                </el-row>
            </div>
            <div class="block" v-if="this.total1!=0">
                <el-pagination layout="prev, pager, next" :total="total1" :current-page="currentPage1" :page-size="pagesize1" @current-change="handleCurrentChange1">
                </el-pagination>
            </div>
        </div>
        <!-- 添加邀约记录 -->
        <el-dialog :title="inviteTitle" :visible.sync="dialogFormVisibleInvite" :close-on-click-modal="no" size='tiny' show-close style='z-index:100' class='CDDialog' @close="resetD('inviteForm')">
            <el-form :model="inviteForm" id='detailForm' :rules='ruleinviteForm' ref="inviteForm">
                <el-form-item label="邀约时间:" prop="alert_time">
                    <el-date-picker v-model="inviteForm.alert_time" type="datetime" placeholder="选择日期时间">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="上课老师:" style='margin-top:10px' prop="teacher_id">
                    <el-select v-model="inviteForm.teacher_id" clearable placeholder="请选择老师" style='width:193px'>
                        <el-option v-for="item in teachersName" :key="item.aid" :label="item.uname" :value="item.aid">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="邀约课程:" prop="course_id">
                    <el-select v-model="inviteForm.course_id" clearable placeholder="请选择课程" style='width:193px'>
                        <el-option v-for="item in courseName" :key="item.kcid" :label="item.title" :value="item.kcid">
                        </el-option>
                    </el-select>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="inviteFormSubmit('inviteForm')">确 定</el-button>
                <el-button @click="dialogFormVisibleInvite = false">取 消</el-button>
            </div>
        </el-dialog>
        <!-- 设置到访未到访 -->
        <el-dialog title="设置到访" :visible.sync="confirmVisitDialog" :close-on-click-modal="no" top='33%' size='tiny' show-close style='z-index:100' class='CDDialog'>
            <div style="font-size:16px">请确认该学员是否到访?</div>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="confirmVisitSubmit('1')">已到访</el-button>
                <el-button @click="confirmVisitSubmit('0')">未到访</el-button>
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
    getDateClass
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
        var isPhone = (rule, value, callback) => {
            var myreg = /^(((1[0-9]{1}))+\d{9})$/;
            if (value == '') {
                callback('不能为空且必须唯一')
            } else if (!myreg.test(value)) {
                callback('请输入有效手机号');
            } else {
                callback();
            }
        }
        var isPhone1 = (rule, value, callback) => {
            var myreg = /^(((1[0-9]{1}))+\d{9})$/;
            if (value == '') {
                callback()
            } else if (!myreg.test(value)) {
                callback('请输入有效手机号');
            } else {
                callback();
            }
        }
        var isId = (rule, value, callback) => {
            var myreg = /(^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$)|(^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{2}$)/;
            if (value == '') {
                callback('请输入身份证号')
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
            couponsList: [],
            courseName1: [],
            classkind: [],
            visitIcon: '',
            teachersName: [],
            courseName: [],
            coupons: '',
            artName: ['art0', 'art1', 'art2', 'art3', 'art4'],
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
                courseName1: []
            }],
            tableTitle: ['课时', '人头数', '学费', '教材费', '材料费',  '优惠类型', '优惠金额',  '实收总额', '操作'],
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
            userName: '',
            loading: false,
            student: {
                names: '',
                sex: '',
                age: '',
                parent: '',
                parent_phone: '',
                parent1: '',
                parent1_phone: '',
                channel: '',
                school_name: '',
                created: '',
                teacher: ''
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
            number: 0,
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
            allCC: [],
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
                // school_id: '',
                // sour_id: [],
                // referee: '',
                // familys_name: '',
                // referral_uid: '',
                // familys: '',
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
                    message: '请输入内容',
                    trigger: 'blur'
                }]
            },
            ruleinviteForm: {
                alert_time: [{
                    required: true,
                    type: 'date',
                    message: '请选择时间',
                    trigger: 'change'
                }]
            },
            ruleActSchool: {
                sku: [{
                    required: true,
                    message: '请输入合同编号',
                    trigger: 'blur'
                }, ],
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
                // money: [{
                //     required: true,
                //     message:'请输入金额',
                //     validator: all,
                //     trigger: 'blur'
                // }],
                created: [{
                    required: true,
                    type: 'date',
                    message: '请选择签约时间',
                    trigger: 'change'
                }],
            },
            Confirmrule: {
                names: [{
                    required: true,
                    message: '请输入姓名',
                    trigger: 'blur'
                }, ],
                sex: [{
                    required: true,
                    message: '请选择性别',
                    trigger: 'change'
                }],
                id_number: [{
                    required: true,
                    // validator: isId,实际要改回来
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
                    message: '请输入家长姓名',
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
                    required: true,
                    message: '请选择时间及开课班级',
                    type: 'date',
                    trigger: 'blur'
                }],
                syllabus_id: [{
                    required: true,
                    message: '请选择时间及开课班级',
                    validator: nan,
                    trigger: 'change'
                }],
            },
            rule: {
                names: [{
                    required: true,
                    message: '请输入姓名',
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
                    message: '请输入家长姓名',
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
            confirmVisitDialog: false,
            isVisitId: ''

        }
    },
    methods: {
        getClassName(data, i) { //获取课程名称
            let para = {
                pid: data,
                simple: 1
            }
            getClassLibrary(token, para).then((res) => {

                i.courseName1 = res.data;
            })
        },
        submitTheContract(formName) { //排班好,最终提交合同
            let a = '';
            let b = '';
            this.tabClass.map((item, index) => {
                if (item.isR == 'yes') {
                    a = index
                    b = item.number
                }
                this.art[index].course_id = item.course_id
            })
            let c = [...this.art]
            c.splice(this.tabClass.length, this.art.length);
            if(a){
                let n = 'art' + a;
                this.$refs[n][0].validate((valid) => {
                if (valid) {
                    let para = {}
                    para.customer_id = this.$route.params.uid
                    para.users = { ...this.backData
                    }
                    para.users.birthday = new Date(para.users.birthday).toLocaleDateString()
                    if (para.users.parent1 || para.users.con1 || para.users.phone1) {
                        para.users.family = para.users.parent + '|' + para.users.con + '|' + para.users.phone + ',' + para.users.parent1 + '|' + para.users.con1 + '|' + para.users.phone1
                    } else {
                        para.users.family = para.users.parent + '|' + para.users.con + '|' + para.users.phone
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
                            this.$message.success('添加成功');
                            this.$router.push('/myCustomer'); //可能要改成去到学员详细页
                        }
                    })
                } else {
                    this.activeName = b;
                }
            }) 
        }else{
            let para = {}
                    para.customer_id = this.$route.params.uid
                    para.users = { ...this.backData
                    }
                    para.users.birthday = new Date(para.users.birthday).toLocaleDateString()
                    if (para.users.parent1 || para.users.con1 || para.users.phone1) {
                        para.users.family = para.users.parent + '|' + para.users.con + '|' + para.users.phone + ',' + para.users.parent1 + '|' + para.users.con1 + '|' + para.users.phone1
                    } else {
                        para.users.family = para.users.parent + '|' + para.users.con + '|' + para.users.phone
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
                            this.$message.success('添加成功');
                            this.$router.push('/myCustomer'); //可能要改成去到学员详细页
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
                        that.art[index].syllabus_id = ''
                        that.selectionClass[index] = [];
                        this.$message.info('该天没有该课程')
                    }
                })

                // console.log(that.selectionClass[index])
            } else {
                that.selectionClass[index].splice(0, this.selectionClass[index].length);

                // this.art[index] = {time:'',class:''}
            }

        },
        nextToSign(formName) { //1 to 2
            this.$refs[formName].validate((valid) => {
                if (valid) {

                    this.backData = { ...this.signform
                    }; //备份第一步数据
                    if (this.backContract && this.backactSchool) { //如果有第二步数据赋值
                        this.contracts = [...this.backContract];
                        this.actSchool = { ...this.backactSchool
                        }
                    }
                    this.dialogFormVisibleSign = false;
                    this.dialogFormVisible3 = true;
                }

            })

        },
        nextToLast(formName) { //2 to 3
            this.$refs[formName].validate((valid) => {
                if (valid && this.isEqual === 1) {
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
                    this.backactSchool = { ...this.actSchool } //备份第二步数据
                    // if(this.backClass){//如果有第三步数据赋值
                    //     this.art = [...this.backClass]
                    // }
                    this.dialogFormVisible3 = false;
                    this.dialogFormVisibleLast = true;

                }
            })


        },
        backTolastOne() { //3 to2
            this.tabClass = []
            this.backClass = [...this.art] //备份第三步数据
            this.contracts = [...this.backContract];
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
        deletePay() { //删除支付方式
            this.actSchool.pay.pop();
        },
        resetAll(formName) { //重置第二步
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
                teacher_uid: '',
                panda_gohome: '',
                pay: [{
                    method: '',
                    money: ''
                }],
                created: '',

            }

            this.$refs[formName].resetFields();

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
            }]
            this.selectionClass = [
                [],
                [],
                [],
                [],
                []
            ];
            this.$refs[formName].resetFields();

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
                courseName1: []
            })
        },
        delCon(index) { //删除某个课程
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
            confirm_visit(para, token).then(res => {
                this.confirmVisitDialog = false;
                let p = {
                    page: '1',
                    customer_id: this.$route.params.uid
                }
                getInviteList(token, p).then(res => {
                    this.number1 = res.data.total;
                    this.items1 = res.data.data;
                    let c = res.data.last_page * this.pagesize1;
                    this.total1 = parseInt(c);
                })

            }).then(() => {
                if (num == 1) {

                    this.$router.push('/customerDetail' + '/' + this.$route.params.uid + '/' + '已到访');
                } else {
                    this.$router.push('/customerDetail' + '/' + this.$route.params.uid + '/' + '未到访');
                }
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
            this.inInvite = '';
            this.inviteForm = {
                id: '',
                alert_time: '',
                teacher_id: '',
                course_id: ''
            }
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
                    let para = { ...this.inviteForm
                    }
                    para.alert_time = new Date(para.alert_time).toLocaleString('chinese',{hour12:false});
                    para.customer_id = this.$route.params.uid
                    if (this.inInvite == '') {
                        create_inviteR(para, token).then(() => {
                            this.$message.success('添加成功')
                            let p = {
                                page: '1',
                                customer_id: this.$route.params.uid
                            }
                            getInviteList(token, p).then(res => {
                                this.number1 = res.data.total;
                                this.items1 = res.data.data;
                                let c = res.data.last_page * this.pagesize1;
                                this.total1 = parseInt(c);
                            })
                            this.currentPage1 = 1;
                            this.dialogFormVisibleInvite = false
                        }).catch(error => {
                            // if (error.response) {
                            this.$message({
                                type: 'error',
                                message: '该用户未授权'
                            });
                            // console.log(error.response);
                            // }
                        })
                    } else {
                        put_inviteR(para, token).then(() => {
                            this.$message.success('修改成功')
                            let p = {
                                page: '1',
                                customer_id: this.$route.params.uid
                            }
                            getInviteList(token, p).then(res => {
                                this.number1 = res.data.total;
                                this.items1 = res.data.data;
                                let c = res.data.last_page * this.pagesize1;
                                this.total1 = parseInt(c);
                            })
                            this.currentPage1 = 1;
                            this.dialogFormVisibleInvite = false
                        }).catch(error => {
                            console.log(error)
                            // if (error) {
                            this.$message({
                                type: 'error',
                                message: '该用户未授权'
                            });
                            // console.log(error.response);
                            // }
                        })
                    }
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        resetD(formName) { //重置表单
            this.$refs[formName].resetFields();
        },
        onSubmit(formName) { //修改用户资料提交
            this.$refs[formName].validate((valid) => { //替换提交服务
                if (valid) {
                    if (this.form.parent1 || this.form.con1 || this.form.phone1) {
                        this.form.familys = this.form.parent + '|' + this.form.con + '|' + this.form.phone + ',' + this.form.parent1 + '|' + this.form.con1 + '|' + this.form.phone1
                    } else {
                        this.form.familys = this.form.parent + '|' + this.form.con + '|' + this.form.phone
                    }
                    this.form.customer_id = this.$route.params.uid;
                    let para = JSON.parse(JSON.stringify(this.form));
                    put_customer(para, token).then(res => {
                        if (res.code == 0) {
                            this.form.sour_id = [];
                            this.$message({
                                message: '修改成功',
                                type: 'success'
                            });
                            this.dialogFormVisibleAdd = false;

                        } else {
                            this.$message.error(res.data);
                            this.form.phone = '';
                            this.$refs.parentPhone.$refs.input.focus();
                            this.$refs.parentPhone.$refs.input.blur();
                        }
                    }).then(() => {
                        let para = {
                            customer_id: this.$route.params.uid
                        }
                        getMyCustomerDetail(token, para).then(res => { //获取用户资料
                            let data = res.data.info
                            this.student = {
                                names: data.names,
                                age: data.age,
                                sex: data.sex == 1 ? '男' : '女',
                                school_name: data.school_name,
                                channel: data.source_name,
                                created: data.created,
                                parent: data.customer_famliy[0].uname ? data.customer_famliy[0].uname + '(' + data.customer_famliy[0].relation + ')' : '',
                                parent1: data.customer_famliy[1] ? data.customer_famliy[1].uname + '(' + data.customer_famliy[1].relation + ')' : '暂无',
                                parent_phone: data.customer_famliy[0].mobile,
                                parent1_phone: data.customer_famliy[1] ? data.customer_famliy[1].mobile : '暂无'
                            }
                        })
                    })
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });

        },
        // handleSelect(item) { //转介绍时 选择同名的人后
        //     this.nostudent = false;
        //     this.form.familys_name = item.familys_name;
        //     this.form.referral_uid = item.referral_uid
        // },
        // querySearchAsync(queryString, cb) { //转介绍时 输入姓名 同步搜索
        //     let para = {
        //         input: queryString
        //     }
        //     repeatStudentList(token, para).then(res => {
        //         // console.log(res.data)
        //         if (res.data.length != 0) {
        //             this.studentsList = res.data.map(item => {
        //                 return {
        //                     referral_uid: item.label.uid,
        //                     value: item.label.nickname,
        //                     familys_name: item.label.familys_name,
        //                     mobile: item.label.mobile
        //                 }
        //             })
        //             var studentsList = this.studentsList;
        //             if (isNaN(queryString)) {

        //                 var results = studentsList.filter(item => {
        //                     return item.value.indexOf(queryString) > -1
        //                 });
        //             } else {
        //                 var results = studentsList
        //             }
        //         } else {
        //             var results = [];
        //             this.nostudent = true;
        //         }

        //         clearTimeout(this.timeout);
        //         this.timeout = setTimeout(() => {
        //             cb(results);
        //         }, 2000 * Math.random());
        //     })

        // },
        // remoteMethod(query) { //远程搜索，录入时进行过滤
        //     if (query !== '') {
        //         this.loading = true;
        //         setTimeout(() => {
        //             this.loading = false;
        //             this.schools = this.list.filter(item => {
        //                 return item.label.toLowerCase()
        //                     .indexOf(query.toLowerCase()) > -1;
        //             });
        //         }, 200);
        //     } else {
        //         this.schools = [];
        //     }
        // },
        signContact() { //点击签合同
            this.coupons = ''
            this.dialogFormVisibleSign = true;
            let para = {
                customer_id: this.$route.params.uid
            }
            getMyCustomerDetail(token, para).then(res => { //获取用户资料
                let data = res.data.info;
                this.signform = {
                    names: data.names,
                    sex: data.sex == '男' ? '1' : '2',
                    id_number: '',
                    birthday: '',
                    parent: data.customer_famliy[0].uname,
                    parent1: data.customer_famliy[1] ? data.customer_famliy[1].uname : '',
                    con: data.customer_famliy[0].relation,
                    con1: data.customer_famliy[1] ? data.customer_famliy[1].relation : '',
                    phone: data.customer_famliy[0].mobile,
                    phone1: data.customer_famliy[1] ? data.customer_famliy[1].mobile : '',
                    family: '',
                    school_name: data.school_name,
                    source_name: data.source_name,
                    tmk_uid: data.tmk_uid,
                }
            }).then(() => {
                this.getRegion(); //根据城市获取区
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
                    this.$message.success('已设置为无需求')
                }
            }).then(() => {
                this.$router.push('/myCustomer');

                this.dialogFormVisible2 = false;
            })
        },

        addComm() { //点击添加沟通记录
            getMyCustomerTag(token).then(res => {
                this.boxes = res.data
            })
            this.in = '';
            this.commuForm.id = ''; //该记录的id
            this.commuForm.remind_time = '';
            this.commuForm.remark = '';
            this.commuForm.customer_id = this.$route.params.uid;
            this.commuForm.tags = [];
            this.dialogFormVisible = true
        },
        commuFormSubmit(formName) { //提交 添加沟通记录
            this.$refs[formName].validate((valid) => { //替换提交服务
                if (valid) {
                    let para = { ...this.commuForm
                    }

                    para.remind_time = new Date(para.remind_time).toLocaleString('chinese',{hour12:false});
                    para.tags = para.tags.join(',')
                    if (this.in == '') {
                        create_commuR(para, token).then(() => {
                            this.$message.success('添加成功')
                            let p = {
                                page: '1',
                                customer_id: this.$route.params.uid
                            }
                            getCommuList(token, p).then(res => {
                                this.number = res.data.total;
                                this.items = res.data.data;
                                let c = res.data.last_page * this.pagesize;
                                this.total = parseInt(c);
                            })
                            this.currentPage = 1;
                            this.dialogFormVisible = false
                        }).catch(error => {
                            // if (error.response) {
                            this.$message({
                                type: 'error',
                                message: '该用户未授权'
                            });
                            // console.log(error.response);
                            // }
                        })
                    } else {
                        put_commuR(para, token).then(() => {
                            this.$message.success('修改成功')
                            let p = {
                                page: '1',
                                customer_id: this.$route.params.uid
                            }
                            getCommuList(token, p).then(res => {
                                this.number = res.data.total;
                                this.items = res.data.data;
                                let c = res.data.last_page * this.pagesize;
                                this.total = parseInt(c);
                            })
                            this.currentPage = 1;
                            this.dialogFormVisible = false
                        }).catch(error => {
                            console.log(error)
                            // if (error) {
                            this.$message({
                                type: 'error',
                                message: '该用户未授权'
                            });
                            // console.log(error.response);
                            // }
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
            let para = {
                pid: this.form.city_id
            }
            // let para1 = {
            //     city_id: this.form.city_id,
            //     simple: '1'
            // }
            cityList(token, para).then((res) => {
                // console.log(res)
                this.regions = res.data
            })
            // campusList(para1, token).then(res => {
            //     this.schoolsNear = res.data
            // })
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
                    // school_id: data.info.school_id - 0,
                    // sour_id: data.info.sour_tree,
                    // referee: data.info.referral ? data.info.referral.nickname : '', //推荐人名字
                    // familys_name: '', //推荐人家长姓名
                    // referral_uid: data.info.referral_uid, //推荐人id
                    // familys: '',
                    cc_id: data.cc_uid - 0,
                }
            }).then(() => {
                this.getRegion(); //根据城市获取区
                // sourceList(token).then(res => {
                //     this.source = res.data
                // })
            }).then(() => {
                this.dialogFormVisibleAdd = true;
            })
            // if (this.code != 'tmk_m') {
            //     this.isread = true;
            // }
            // document.getElementById('sourceDiv').setAttribute('pointer-events', 'none'); 
        },
        handleCurrentChange: function(val) { //变更页数
            this.currentPage = val;
            let p = {
                page: this.currentPage,
                customer_id: this.$route.params.uid
            }
            getCommuList(token, p).then(res => {
                this.number = res.data.total;
                this.items = res.data.data;
                let c = res.data.last_page * this.pagesize;
                this.total = parseInt(c);
            })
        },
        handleCurrentChange1: function(val) { //变更页数
            this.currentPage1 = val;
            let p = {
                page: this.currentPage1,
                customer_id: this.$route.params.uid
            }
            getInviteList(token, p).then(res => {
                this.number1 = res.data.total;
                this.items1 = res.data.data;
                let c = res.data.last_page * this.pagesize1;
                this.total1 = parseInt(c);
            })
        },

    },
    computed: {
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
        user = localStorage.getItem('user');
        token = JSON.parse(user).token;
    },
    created() {
        this.userName = JSON.parse(user).uname;
        // this.school_name = JSON.parse(user).school_name;
        this.code = JSON.parse(user).job ? JSON.parse(user).job.code : '';
        let para = {
            customer_id: this.$route.params.uid
        }
        getMyCustomerDetail(token, para).then(res => { //获取用户资料
            // console.log(res)
            let data = res.data.info
            this.student = {
                names: data.names,
                age: data.age,
                sex: data.sex == 1 ? '男' : '女',
                school_name: data.school_name,
                channel: data.source_name,
                created: data.created,
                parent: data.customer_famliy[0].uname ? data.customer_famliy[0].uname + '(' + data.customer_famliy[0].relation + ')' : '',
                parent1: data.customer_famliy[1] ? data.customer_famliy[1].uname + '(' + data.customer_famliy[1].relation + ')' : '暂无',
                parent_phone: data.customer_famliy[0].mobile,
                parent1_phone: data.customer_famliy[1] ? data.customer_famliy[0].mobile : '暂无',
                // parent1: res.data.famliy[1] ? res.data.famliy[1].uname + '(' + res.data.famliy[1].relation + ')' : '',
                // parent1_phone: res.data.famliy[1] ? res.data.famliy[1].mobile : '',

            }
        }).then(() => {
            let p = {
                page: this.currentPage,
                customer_id: this.$route.params.uid
            }
            getCommuList(token, p).then(res => { //获取沟通记录
                // console.log(res)
                this.number = res.data.total;
                this.items = res.data.data;
                let c = res.data.last_page * this.pagesize;
                this.total = parseInt(c);
            })
            getInviteList(token, p).then(res => { //获取邀约记录
                this.number1 = res.data.total;
                this.items1 = res.data.data;
                let c = res.data.last_page * this.pagesize1;
                this.total1 = parseInt(c);
            }).then(() => {
                getTeacherList(token).then((res) => { //获取老师
                    this.teachersName = res.data;
                })

            }).then(() => {

                let si = {
                    simple: 1,
                }
                getPromotionList(token, si).then((res) => { //获取优惠列表

                    this.couponsList = res.data;
                })
            }).then(() => {
                getClassKind(token).then((res) => { //获取课程分类
                    this.classkind = res.data
                })

            }).then(() => {

                cityList(token).then((res) => { //获取城市 表格中用
                    // console.log(res)
                    this.cities = res.data
                })
            })
        }).catch((res) => {
            console.log('No Data')
        })
        if (this.code == 'cc_m') {
            getAllCCList(token).then((res) => {
                this.allCC = res.data;
                // this.allCC.unshift({aid:0,uname:'自己'})
            })
        }



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

.communityTitle {
    margin-left: 12px;
    position: relative;
    background: url(../../../static/img/comuni.png) left center/30px no-repeat;
    padding: 10px 10px 10px 30px;
    border-bottom: 1px solid #e8e8e8;
}

.tableUserD .addUserTitle {
    padding: 10px;
    position: relative;
}

.tableUserD .inviteTitle {
    margin-left: 5px;
    position: relative;
    background: url(../../../static/img/invite.png) left center/30px no-repeat;
    padding: 10px 10px 10px 30px;
    border-bottom: 1px solid #e8e8e8;
}

#customerDeatilForm .el-form-item {
    margin-bottom: 8px
}

#customerDeatilForm .el-form-item__label {
    padding: 8px 12px 5px 0;
}

#customerDeatilForm .el-form-item__content {
    line-height: 30px
}

.tableUserD .listUser {
    /*min-height: 100px;*/
    /*height: auto;*/
    border-bottom: 1px solid #e8e8e8;
    /*border-bottom:1px solid grey;*/
}

.tableUserD .listUser:last-child {
    border-bottom: 1px solid #e8e8e8;
    /*border-bottom:1px solid grey;*/
}

.tableUserD .el-tag--success {
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

.tableUserD .listUser:nth-child(6) {
    margin-left: 48px
}

.tableUserD .editSpan {
    height: 30px;
    width: 30px;
    background: url(../../../static/img/edit.png) right/30px 30px no-repeat;
    cursor: pointer;
    /*margin-top: 15px;*/
    float: right;
}

.tableUserD .editSpan:hover {
    background-image: url(../../../static/img/edit_h.png);
}

.tableUserD .editVisit {
    position: absolute;
    left: 110px;
    top: 0;
    height: 20px;
    width: 20px;
    background: url(../../../static/img/visitEdit.png) right/20px 20px no-repeat;
    cursor: pointer;
}

.tableUserD .editVisit:hover {
    background-image: url(../../../static/img/visitEdit_h.png);
}

.tableUserD .editVisitI {
    position: absolute;
    right: 0;
    top: 0;
    height: 30px;
    width: 30px;
    background: url(../../../static/img/edit.png) right/30px 30px no-repeat;
    cursor: pointer;
}

.tableUserD .editVisitI:hover {
    background-image: url(../../../static/img/edit_h.png);
}

.tableUserD .addU {
    width: 30px;
    height: 30px;
    background-image: url(../../../static/img/editU.png);
    background-size: 30px 30px;
    cursor: pointer;
    display: inline-block;
    margin-right: 5px;
}

.tableUserD .addU:hover {
    background-image: url(../../../static/img/editU_h.png);
}

.tableUserD .addR {
    width: 30px;
    height: 30px;
    background-image: url(../../../static/img/addR.png);
    background-size: 30px 30px;
    cursor: pointer;
}

.tableUserD .addR:hover {
    background-image: url(../../../static/img/addR_h.png);
}

.tableUserD .block {
    text-align: center;
    position: absolute;
    bottom: -34px;
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

.signContactDialog .el-dialog--small {
    width: 986.75px;
}

.tableUserD .el-dialog .el-dialog__header {
    background-color: #1fb5ad;
    padding: 20px 20px 20px;
}

.tableUserD .el-dialog .el-dialog__title {
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
    float: left;
    color: #1fb5ad;
    margin-left: 20px
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

</style>
