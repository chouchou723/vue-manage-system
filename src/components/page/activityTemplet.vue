<template>
    <div class="publicPool">
        <el-breadcrumb separator="/">
            <el-breadcrumb-item><i class="el-icon-my-tongzhi"></i> 活动管理</el-breadcrumb-item>
            <el-breadcrumb-item class='ss'>活动模板</el-breadcrumb-item>
        </el-breadcrumb>
        <div class='noEff'>
            <h2 class="studentReturnnoEff">

                活动模板({{number}}个)
            </h2>
            <!-- <div class='studentReturnNoneed' v-if="code =='cc_m'">
                <el-select v-model="valueT" clearable placeholder="选择CC" @change="updateList">
                    <el-option v-for="item in optionsCC" :key="item.key" :label="item.label" :value="item.key">
                    </el-option>
                </el-select>
            </div> -->
            <div style="float:right;margin-right:10px">
                <el-button type="success" @click="createActivity" v-if='code.includes("_c")'>创建活动模板</el-button>
                 <el-button type="success" @click="createBirthdayActivity" v-if='code.includes("_m")'>发起生日会活动</el-button>
            </div>
        </div>
        <div id="table2">
            <el-table :data="publicData" border style="width: 100%">
                <el-table-column prop="names" label="活动名称" width='140'>
                    <template scope="scope">
                        <span class='nicknameSpan' @click='showAct(scope.row.id,scope.row.type_id)'>{{scope.row.names}}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="type_id" label="活动类型" width='120'>
                </el-table-column>
                <el-table-column prop="price" label="活动价格" width='120'>
                        <template scope="scope">
                                <span v-if='scope.row.type_id=="生日会"'>—</span>
                                <span v-else>{{scope.row.price}}</span>
                                
                            </template>
                </el-table-column>
                <el-table-column prop="stock" label="最大报名人数" width='120'>
                        <template scope="scope">
                                <span v-if='scope.row.type_id=="生日会"'>—</span>
                                <span v-else>{{scope.row.stock}}</span>
                                
                            </template>
                </el-table-column>
                <el-table-column prop="age" label="适合年龄段" width='120'>
                        <template scope="scope">
                                <span v-if='scope.row.type_id=="生日会"'>—</span>
                                <span v-else>{{scope.row.age}}</span>
                                
                            </template>
                </el-table-column>
                <el-table-column prop="created" label="创建时间" sortable>
                </el-table-column>
                <el-table-column prop="course_num" label="发起次数" width='120'>
                    </el-table-column>
                <el-table-column label="操作" width='140'>
                    <template scope="scope">
                          <el-button   type="text" size="small" v-if='code.includes("_c")&&scope.row.type_id!="生日会"'@click="claim(scope.row.id)" style="font-size:14px">修改</el-button>
                          <el-button  v-if='code.includes("_m")&&scope.row.type_id!="生日会"' type="text" size="small" @click="launch(scope.row.id)" style="font-size:14px">发起</el-button>                       
                          <el-button  v-if='code.includes("_m")&&scope.row.type_id=="生日会"' type="text" size="small" @click="claimB(scope.row.id)" style="font-size:14px">修改</el-button>
                        <!--   <el-button type="text" size="small" @click="open2(scope.$index, accountData)">删除</el-button> -->
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <div class="block">
            <span class="demonstration"></span>
            <el-pagination layout="prev, pager, next" :total="total" :current-page="currentPage" :page-size="pagesize" @current-change="handleCurrentChange">
            </el-pagination>
        </div>
        <el-dialog :title="cOre" :visible.sync="dialogFormVisible" :close-on-click-modal="no" top='1%' size='small' show-close 
             id='activityD' @close='resetD'>
            <el-form :model="form" :rules='rule' ref="form" label-width="120px" v-loading="loading2" element-loading-text="提交中">
                <el-form-item label="活动名称" prop='names'>
                    <el-input v-model="form.names" placeholder='请输入活动名称' style="width:172px"></el-input>
                </el-form-item>
                <el-form-item label="活动类型" prop='type'>
                    <el-select v-model="form.type" placeholder="请选择活动类型" style="width:172px">
                        <el-option label="亲子俱乐部" value="100"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="活动价格" prop='price'>
                    <el-select v-model="form.price" placeholder="请选择活动所消耗课时" style="width:172px">
                            <el-option label="1" value="1"></el-option>
                        <el-option label="2" value="2"></el-option>
                        <el-option label="3" value="3"></el-option>
                        <el-option label="4" value="4"></el-option>
                        <el-option label="5" value="5"></el-option>
                        <el-option label="6" value="6"></el-option>
                        <el-option label="7" value="7"></el-option>
                        <el-option label="8" value="8"></el-option>
                        <el-option label="9" value="9"></el-option>
                        <el-option label="10" value="10"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="最大报名人数" prop='stock'>
                    <el-input v-model="form.stock" placeholder='最大报名人数' style="width:172px"></el-input>
                </el-form-item>
                <el-form-item label="适合年龄段" prop='age' required>
                    <el-col :span="3" style='margin-right:10px'>
                            <el-form-item  prop='minage'>
                        <el-select v-model="form.minage" placeholder="请选择最小年龄" style="width:70px">
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

                    </el-col>
                    <el-col class="line" :span="1">至</el-col>
                    <el-col :span="3">
                            <el-form-item  prop='maxage'>
                        <el-select v-model="form.maxage" placeholder="请选择最大年龄" style="width:70px">
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

                    </el-col>
                </el-form-item>
                <el-form-item label="活动介绍" prop='content'>
                        <quill-editor ref="myTextEditor" v-model="form.content" :config="editorOption"></quill-editor>
                        <div style="position:absolute;bottom:-26px;left:0;color:#ff4949;width:120px" v-if="!form.content">请输入活动介绍</div>
                    <!-- <el-input type="textarea" :rows="4" placeholder="请输入内容" v-model="form.des"  :autosize="{ minRows: 4, maxRows: 24}"  style="width:342px" >
                    {{form.des}}
                    </el-input> -->
                </el-form-item>
                <div style="position:absolute;top:72px;right:58px">
                   <div style="position:absolute;top:20px;right:-9px;width:100px"><span style="color:#ff4949">*</span> 封面图片</div>
                    <i class="el-icon-circle-close" style="position:absolute;top:43px;right:-33px;z-index:1" v-if="imageUrl" @click="handleRemove"></i>
                        <el-upload
                        class="avatar-uploader"
                        action="https://jsonplaceholder.typicode.com/posts/"
                        :show-file-list="false"
                        :on-change="beforeAvatarUpload"
                        :auto-upload="false"
                        >
                        <img v-if="imageUrl" :src="imageUrl" class="avatar">
                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                      </el-upload>
                      <div style="position:absolute;bottom:-20px;left:-53px;color:#ff4949;width:120px" v-if="!imageUrl">请选择封面图片</div>
                </div>
                <el-form-item style='margin-top:40px;'>
                    <el-button type="primary" @click="onSubmit('form')">确定</el-button>
                    <el-button @click="dialogFormVisibleAdd = false">取消</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
        <el-dialog :title="corReB" :visible.sync="dialogFormVisibleBirthday" :close-on-click-modal="no" top='7%' size='small' show-close style='z-index:100'
        id='activityDB' @close='resetDB'>
            <el-form :model="formBirthday" :rules='ruleBirthday' ref="formBirthday" label-width="120px" v-loading="loadingB" element-loading-text="提交中">
                <el-form-item label="生日主题" prop='names'>
                    <el-input v-model="formBirthday.names" placeholder='请输入生日主题' style="width:172px"></el-input>
                </el-form-item>
                <el-form-item label="生日月份" prop='age'>
                    <el-select v-model="formBirthday.age" multiple placeholder="请选择生日月份" style="width:172px">
                         <el-option label="1" value="1"></el-option>
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
                     </el-select>
                </el-form-item>
                <el-form-item label="举办校区" prop='school_id'>
                   <el-select v-model="formBirthday.school_id" clearable placeholder="选择校区" filterable @change='getTeacher' style="width:172px" >
                        <el-option v-for="item in schoolList" :key="item.id" :label="item.title" :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>
                 <el-form-item label="负责老师" prop='teachid'>
                    <el-select v-model="formBirthday.teachid" clearable placeholder="选择老师" filterable  style="width:172px">
                        <el-option v-for="item in teachersName" :key="item.aid" :label="item.uname" :value="item.aid">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="报名截至时间" prop='sign_time' >
                   <el-date-picker v-model="formBirthday.sign_time" format="yyyy-MM-dd HH:mm" type="datetime" placeholder="报名截至时间" style="width:172px">
                    </el-date-picker>
                
                </el-form-item>
                <el-form-item prop='start_end_time' label='活动起止时间' >
                    <el-date-picker v-model="formBirthday.start_end_time" format="yyyy-MM-dd HH:mm" type="datetimerange" placeholder="活动起止时间" style="width:280px">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="活动地点" prop='address'>
                    <el-input v-model="formBirthday.address" placeholder='请输入活动地点' style="width:512px"></el-input>
                </el-form-item>
                 <el-form-item label="活动介绍" prop='content'>
                        <quill-editor ref="myTextEditor" v-model="formBirthday.content" :options="editorOption"></quill-editor>
                        <div style="position:absolute;bottom:-26px;left:0;color:#ff4949;width:120px" v-if="!formBirthday.content">请输入活动介绍</div>
                </el-form-item>
                <div style="position:absolute;top:72px;right:58px">
                        <div style="position:absolute;top:20px;right:-9px;width:100px"><span style="color:#ff4949">*</span> 封面图片</div>
                        <i class="el-icon-circle-close" style="position:absolute;top:43px;right:-33px;z-index:1" v-if="imageUrl1" @click="handleRemove1"></i>
                            <el-upload
                            class="avatar-uploader"
                            action="https://jsonplaceholder.typicode.com/posts/"
                            :show-file-list="false"
                            :on-change="beforeAvatarUpload1"
                            :auto-upload="false"
                            >
                            <img v-if="imageUrl1" :src="imageUrl1" class="avatar">
                            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                          </el-upload>
                          <div style="position:absolute;bottom:-20px;left:-53px;color:#ff4949;width:120px" v-if="!imageUrl1">请选择封面图片</div>
                    </div>
                <el-form-item style='margin-top:40px;'>
                    <el-button type="primary" @click="onBirthdaySubmit('formBirthday')">确定</el-button>
                    <el-button @click="dialogFormVisibleAdd = false">取消</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
        <el-dialog title="活动模板详情" :visible.sync="dialogFormVisibleShow" :close-on-click-modal="no" custom-class='classDetailDialog' top='2%' size='small' @close='resetS'>
            <el-form id='actDeatilForm' label-width="102px" label-position='left' style='padding-left:10px;'>
                <el-form-item label="活动名称:" prop='names'>
                    <span>{{activity.names}}</span>
                </el-form-item>
                <el-form-item label="活动类型:" prop='type_id'>
                    <span>{{activity.type_id}}</span>
                </el-form-item>
                <el-form-item label="活动价格:" prop='price'>
                    <span>{{activity.price}}</span>
                </el-form-item>
                <el-form-item label="最大报名人数:" prop='stock'>
                    <span>{{activity.stock}}</span>
                </el-form-item>
                <el-form-item label="适合年龄段:" prop='age'>
                    <span>{{activity.age}}</span>
                </el-form-item>
                <el-form-item label="活动介绍:" prop='content'>
                        <div  style='border:1px solid gainsboro' v-html="activity.content" class='actImg'></div>
                </el-form-item>
                <el-form-item label="创建时间:" prop='created'>
                    <span>{{activity.created}}</span>
                </el-form-item>
                <div style="position: absolute;top: 72px;right: 12px;width: 300px;text-align: center;" >
                        <div style="position: absolute;top: 20px;right: 99px;width: 100px;"> 封面图片</div>
                        <img :src="activity.images" alt="" width='178' height="100"  style="margin-top:40px">
                    </div>
            </el-form>
        </el-dialog>
        <el-dialog title="生日会详情" :visible.sync="dialogFormVisibleShowB" :close-on-click-modal="no" custom-class='classDetailDialog' top='2%' size='small' @close='resetSB'>
                <el-form id='birthdayDeatilForm' label-width="102px" label-position='left' style='padding-left:10px;'  
                >
                    <el-form-item label="生日会主题:" prop='names'>
                        <span>{{activityB.names}}</span>
                    </el-form-item>
                    <el-form-item label="生日月份:" prop='type_id'>
                        <span>{{activityB.type_id}}</span>
                    </el-form-item>
                    <el-form-item label="举办校区:" prop='school_name'>
                        <span>{{activityB.schoolName}}</span>
                    </el-form-item>
                    <el-form-item label="负责老师:" prop='teacherName'>
                        <span>{{activityB.teachName}}</span>
                    </el-form-item>
                    <el-form-item label="报名截至时间:" prop='sign_time'>
                        <span>{{activityB.sign_time}}</span>
                    </el-form-item>
                    <el-form-item label="活动起止时间:" prop='start_time'>
                            <span>{{activityB.start_time}} - {{activityB.end_time}}</span>
                        </el-form-item>
                        <el-form-item label="活动地点:" prop='address'>
                                <span>{{activityB.address}}</span>
                            </el-form-item>
                    <el-form-item label="活动介绍:" prop='content'>
                            <div  style='border:1px solid gainsboro' v-html="activityB.content" class='actImg'></div>
                    </el-form-item>
                    <el-form-item label="创建时间:" prop='created'>
                        <span>{{activityB.created}}</span>
                    </el-form-item>
                    <div style="position: absolute;top: 72px;right: 12px;width: 300px;text-align: center;">
                            <div style="position: absolute;top: 20px;right: 99px;width: 100px;"> 封面图片</div>
                            <img :src="activityB.images" alt="" width='178' height="100"  style="margin-top:40px">
                        </div>
                </el-form>
            </el-dialog>
        <el-dialog title="发起活动" :visible.sync="dialogFormVisibleLaunch" :close-on-click-modal="no" top='7%' size='small' show-close @close='resetDL'
        >
        <el-form :model="formLaunch" :rules='ruleLaunch' ref="formLaunch" label-width="120px">
            <el-form-item label="举办校区" prop='school_id'>
               <el-select v-model="formLaunch.school_id" clearable placeholder="选择校区" filterable @change='getTeacherL'>
                    <el-option v-for="item in schoolList" :key="item.id" :label="item.title" :value="item.id">
                    </el-option>
                </el-select>
            </el-form-item>
             <el-form-item label="负责老师" prop='teachid'>
                <el-select v-model="formLaunch.teachid" clearable placeholder="选择老师" filterable >
                    <el-option v-for="item in teachersNameL" :key="item.aid" :label="item.uname" :value="item.aid">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="报名截至时间" prop='sign_time' >
                <el-date-picker v-model="formLaunch.sign_time" format="yyyy-MM-dd HH:mm" type="datetime" placeholder="报名截至时间" style="width:217px">
                </el-date-picker>     
            </el-form-item>
                    <el-form-item label="活动地点" prop='address'>
                        <el-input v-model="formLaunch.address" placeholder='请输入活动地点' style="width:280px"></el-input>
                    </el-form-item>
            <el-form-item prop='start_end_time' label='活动起止时间' >
                <el-date-picker v-model="formLaunch.start_end_time" format="yyyy-MM-dd HH:mm" type="datetimerange" placeholder="活动起止时间" style="width:280px">
                </el-date-picker>
            </el-form-item>
            <el-form-item style='margin-top:40px;'>
                <el-button type="primary" @click="onSubmitLaunch('formLaunch')">确定</el-button>
                <el-button @click="dialogFormVisibleAdd = false">取消</el-button>
            </el-form-item>
        </el-form>
    </el-dialog>
    </div>
</template>
<script>
    var user, token
    import { quillEditor } from 'vue-quill-editor';
    import {
        getMyResoure,
        getActivityList,
        campusList,
        getTeacherList,
        // getAllCCList,
        claim_customer,
        addTpl,
        addBirthdayParty,
        getTplInfo,
        addActivity,
        getBirthdayInfo,
    } from '../../api/api';
    export default {
        components: {
            quillEditor
        },
        data() {
            var bigger = (rule, value, callback) => {
                if (this.form.maxage<this.form.minage) {
                    callback('最选择正确的年龄段')
                } else {
                    callback('')
                }
            }
            var nan = (rule, value, callback) => {
                if (typeof value == 'number') {
                    callback();
                } else {
                    callback('请选择')
                }
            }
            var isArr = (rule, value, callback) => {
                if (Array.isArray(value) && value[0]) {
                    callback();
                } else {
                    callback('请选择日期')
                }
            }
            var content = (rule, value, callback) => {
                if (value == '') {
                    callback('请选择时间');
                } else {
                    callback()
                }
            }
            return {
                loading2:false,
                loadingB:false,
                imageUrl: '',
                imageUrl1: '',
                editorOption: {
                    // something config
                },
                teachersName:[],
                teachersNameL:[],
                schoolList:[],
                formBirthday:{
                    names:'',
                    age:[],
                    school_id:'',
                    teachid:'',
                    sign_time:'',
                    start_end_time:'',
                    address:'',
                    content:'',
                    images:''
                },
                ruleBirthday:{
                    names: [{
                        required: true,
                        message: '请输入生日主题',
                        trigger: 'blur'
                    }],
                    age: [{
                        required: true,
                        validator: isArr,
                        trigger: 'change'
                    }],
                    school_id: [{
                        required: true,
                        validator: nan,
                        trigger: 'change'
                    }],
                    teachid: [{
                        required: true,
                        validator: nan,
                        trigger: 'change'
                    }],
                    sign_time: [{
                        required: true,
                        validator: content,
                        trigger: 'change'
                    }],
                    start_end_time: [{
                        required: true,
                        validator: content,
                        trigger: 'change'
                    }],
                    address: [{
                        required: true,
                        message: '请输入活动地点',
                        trigger: 'blur'
                    }],
                    // maxage: [{
                    //     required: true,
                    //     validator: bigger,
                    //     trigger: 'change'
                    // }],
                    // content: [{
                    //     required: true,
                    //     message: '请输入活动介绍',
                    //     trigger: 'blur'
                    // }],
                },
                activity:{
                },
                activityB:{
                },
                in:'',
                inB:'',
                rule:{
                    names: [{
                        required: true,
                        message: '请输入活动名称',
                        trigger: 'blur'
                    }],
                    price: [{
                        required: true,
                        message: '请选择活动所耗课时',
                        trigger: 'change'
                    }],
                    stock: [{
                        required: true,
                        message: '请输入最大报名人数',
                        trigger: 'blur'
                    }],
                    // minage: [{
                    //     required: true,
                    // validator: bigger,
                    //     // message: '请选择最小年龄',
                    //     trigger: 'change'
                    // }],
                    // maxage: [{
                    //     required: true,
                    //     validator: bigger,
                    //     trigger: 'change'
                    // }],
                    // content: [{
                    //     required: true,
                    //     validator: content,
                    //     trigger: 'blur'
                    // }],
                },
                formLaunch:{
                    school_id:'',
                    teachid:'',
                    sign_time:'',
                    start_end_time:'',
                    address:'',
                },
                ruleLaunch:{
                    school_id: [{
                        required: true,
                        validator: nan,
                        trigger: 'change'
                    }],
                    teachid: [{
                        required: true,
                        validator: nan,
                        trigger: 'change'
                    }],
                    sign_time: [{
                        required: true,
                        validator: content,
                        trigger: 'change'
                    }],
                    start_end_time: [{
                        required: true,
                        validator: content,
                        trigger: 'change'
                    }],
                    address: [{
                        required: true,
                        message: '请输入活动地点',
                        trigger: 'blur'
                    }],
                },
                form:{
                    names:'',
                    type:'100',
                    stock:'',
                    minage:'3',
                    maxage:'3',
                    price:'',
                    content:''

                },
                dialogFormVisible: false,
                dialogFormVisibleShow:false,
                dialogFormVisibleShowB:false,
                dialogFormVisibleLaunch:false,
                dialogFormVisibleBirthday:false,
                no: false,
                code: '',
                total: 0,
                number: 0,
                publicData: [],
                // optionsCC: [],
                // valueT: '', //全部CC下拉
                currentPage: 1, //页数
                pagesize: 15, //默认每页
                claimConfirm: {
                    customer_id: ''
                },
                temId:''
            }
        },
        methods: {
            resetS(){
                this.activity={}
            },
            resetSB(){
                this.activityB={}
            },
            resetD(){
                this.form={
                    names:'',
                    type:'100',
                    stock:'',
                    minage:'3',
                    maxage:'3',
                    price:'',
                    content:''

                }
                this.imageUrl = ''   
                this.in=''                             
                this.$refs['form'].resetFields();
            },
            resetDB(){
                this.formBirthday={
                    names:'',
                    age:[],
                    school_id:'',
                    teachid:'',
                    sign_time:'',
                    start_end_time:'',
                    address:'',
                    content:'',

                }
                this.teachersName = []
                this.imageUrl1 = ''
                this.inB=''
                this.$refs['formBirthday'].resetFields();
            },
            resetDL(){
                this.formLaunch={
                    school_id:'',
                    teachid:'',
                    sign_time:'',
                    start_end_time:'',
                    address:'',

                }
                this.teachersNameL = []                
                this.$refs['formLaunch'].resetFields();
            },
            handleRemove1(){
                this.imageUrl1 = ''
            },
            handleRemove(){
                this.imageUrl = ''
            },
            beforeAvatarUpload(file, fileList){
                let that = this;                
                let a = new FileReader();
               a.onload = function ( event ) { 
                    var txt = event.target.result;
                    that.imageUrl = txt;
                    };
                a.readAsDataURL(file.raw);
                
                // this.imageUrl =URL.createObjectURL(file.raw);
                // console.log(d)
            },
            beforeAvatarUpload1(file, fileList){
                let that = this;
                let a = new FileReader();
               a.onload = function ( event ) { 
                    var txt = event.target.result;
                    that.imageUrl1 = txt;
                    };
                a.readAsDataURL(file.raw);
                
                // this.imageUrl1 =URL.createObjectURL(file.raw);
                // console.log(d)
            },
            handleAvatarSuccess(){},
            onSubmit(form){
                this.$refs[form].validate((valid) => {
                    this.loading2 = true;
                    if (valid&&this.imageUrl&&this.form.content) {
                        let para = {...this.form}
                para.age = para.minage+'-'+para.maxage
                para.images = this.imageUrl
                console.log(para)     
                if(this.in!=''){
                    para.id = this.in;
                    addTpl(para,token).then(res=>{
                    if(res.code==0){
                        this.loading2 = false;
                        this.$message.success('修改成功');
                        this.dialogFormVisible = false;
                        this.fetchData();
                    }else{
                        this.$message.error(res.data)
                    }
                    // console.log(res)

                })
                }else{
                    addTpl(para,token).then(res=>{
                    if(res.code==0){
                        this.loading2 = false;
                        this.$message.success('创建成功')
                        this.dialogFormVisible = false;
                        this.fetchData();
                    }else{
                        this.$message.error(res.data);
                        this.loading2 = false;
                        
                    }
                    // console.log(res)

                })
                }       
                
                    }else{
                        this.$message.info('还有项目未填写')
                    }
                })
                
            },
            onBirthdaySubmit(form){
                this.$refs[form].validate((valid) => {
                    
                    if (valid&&this.imageUrl1) {
                        this.loadingB = true;
                        let para = {...this.formBirthday}
                para.sign_time = new Date(para.sign_time).toLocaleString('chinese', {
                    hour12: false
                });
                para.start_end_time = new Date(para.start_end_time[0]).toLocaleString('chinese', {
                    hour12: false
                }) +','+new Date(para.start_end_time[1]).toLocaleString('chinese', {
                    hour12: false
                });
                para.age = para.age.join(',')
                para.images = this.imageUrl1
                console.log(para)  
                if(this.inB!==''){
                    para.id = this.inB;
                    addBirthdayParty(para,token).then(res=>{
                    // console.log(res)
                    if(res.code==0){
                    this.loadingB = false;                        
                        this.$message.success('修改成功')
                        this.dialogFormVisibleBirthday = false;
                        this.fetchData();
                    }else{
                        this.$message.error(res.data);
                    this.loadingB = false;                        
                        
                    }

                })
                }else{
                    addBirthdayParty(para,token).then(res=>{
                    // console.log(res)
                    if(res.code==0){
                    this.loadingB = false;                                                
                        this.$message.success('发布成功')
                        this.dialogFormVisibleBirthday = false;
                        this.fetchData();
                    }else{
                        this.$message.error(res.data);
                    this.loadingB = false;                        
                        
                    }

                })
                }           
                
                    }else{
                        this.$message.info('还有项目未填写')
                    }
                })
                
            },
            onSubmitLaunch(form){
                this.$refs[form].validate((valid) => {

                    if (valid) {
                        let para = {...this.formLaunch}
                        para.tpl_id = this.temId;
                para.sign_time = new Date(para.sign_time).toLocaleString('chinese', {
                    hour12: false
                });
                para.start_end_time = new Date(para.start_end_time[0]).toLocaleString('chinese', {
                    hour12: false
                }) +','+new Date(para.start_end_time[1]).toLocaleString('chinese', {
                    hour12: false
                });
                console.log(para)                
                addActivity(para,token).then(res=>{
                    // console.log(res)
                    if(res.code==0){
                        this.$message.success('发起成功')
                        this.dialogFormVisibleLaunch = false
                    }else{
                        this.$message.error(res.data)
                    }

                })
                    }else{
                        this.$message.info('还有项目未填写')
                    }
                })
                
            },
            createBirthdayActivity(){
                 this.dialogFormVisibleBirthday = true;
            },
            getTeacher() {
                let para = {school_id:this.formBirthday.school_id}
                getTeacherList(token,para).then((res) => { //获取老师
                    this.teachersName = res.data;
                })
            },
            getTeacherL() {
                let para = {school_id:this.formLaunch.school_id}
                getTeacherList(token,para).then((res) => { //获取老师
                    this.teachersNameL = res.data;
                })
            },
            launch(id){
                this.dialogFormVisibleLaunch = true;
                this.temId = id
            },
            showAct(id,type){
                let para={
                    id :id
                }
                if(type=='生日会'){
                    getTplInfo(token,para).then(res=>{
                    console.log(res)
                    this.activityB = res.data
                    // this.activityB.images = 'http://pandatest.dfth.com/uploads/adminHead/860.jpeg'
                        this.dialogFormVisibleShowB = true;
                })
                }else{
                    getTplInfo(token,para).then(res=>{
                        console.log(res)
                        this.activity = res.data
                        // this.activity.images = 'http://pandatest.dfth.com/uploads/adminHead/860.jpeg'
                            this.dialogFormVisibleShow = true;
                    })
                }
            },
            claim(id){
                this.in =id;
                let para={
                    id :id
                }
                getTplInfo(token,para).then(res=>{
                    // console.log(res)
                    this.form = res.data
                    let a = res.data.age.split('-');
                    this.form.type = '100'
                    this.form.minage = a[0]
                    this.form.maxage = a[1]
                    this.imageUrl= this.form.images  //'http://pandatest.dfth.com/uploads/adminHead/860.jpeg'
                    this.dialogFormVisible = true;
                })
            },
            claimB(id){
                this.inB =id;
                let para={
                    id :id
                }
                getTplInfo(token,para).then(res=>{
                    // console.log(res)
                    this.formBirthday = res.data
                    this.formBirthday.age = this.formBirthday.age.split(',')
                    this.formBirthday.school_id =this.formBirthday.school_id-0;
                    this.formBirthday.teachid =this.formBirthday.teachid-0
                    this.formBirthday.start_end_time =[this.formBirthday.start_time,this.formBirthday.end_time]
                    
                    this.imageUrl1= res.data.images//'http://pandatest.dfth.com/uploads/adminHead/860.jpeg'//res.data.images
                this.dialogFormVisibleBirthday = true;
                })
            },
            createActivity() {
                this.in = '';
                this.dialogFormVisible = true;
            },
            formatter(row, column) {
                let reg = /(\d{4})\d{4}(\d{3})/;
                if (reg.test(row.mobile)) {
                    return row.mobile.replace(reg, '$1****$2');
                } else {
                    return row.mobile
                }
            },
            handleCurrentChange: function (val) { //换页
                this.currentPage = val;
                this.fetchData();
            },
            fetchData() {
                let para = {
                    // cc_id: this.valueT, //CC
                    page: this.currentPage
                }
                getActivityList(token,para).then((res) => { //
                    this.number = res.data.total;
                    let a = res.data.data;
                    let c = res.data.last_page * this.pagesize;
                    this.publicData = a;
                    this.total = parseInt(c);
                })
            },
        },

        beforeCreate() {
            user = localStorage.getItem('user');
            token = JSON.parse(user).token;
        },
        created() {
            this.code = JSON.parse(user).job ? JSON.parse(user).job.code : '';
            this.fetchData();
            if(this.code.includes('_m')){

                let cam = {
                        simple: 1
                    }
                    campusList(cam, token).then((res) => { //获取校区
                        this.schoolList = res.data
                    })
            }
                // getTeacherList(token).then((res) => { //获取老师
                //     this.teachersName = res.data;
                // })
            // if (this.code == 'cc_m') {
            //     getAllCCList(token).then((res) => {
            //         this.optionsCC = res.data;
            //         this.optionsCC.unshift({
            //             key: '0',
            //             label: '全部CC'
            //         })
            //     })
            // }
        },
         computed: {
            cOre: function() {
                if (this.in === '') {
                    return '创建活动模板'
                }
                return '修改活动模板'
            },
            corReB: function() {
                if (this.in === '') {
                    return '创建生日会活动'
                }
                return '修改生日会活动'
            },
        }
    }

</script>
<style>
    #table2 .el-table td,
    #table2 .el-table th {
        padding: 1px;
        text-align: center
    }

    #table2 .el-table th>div,
    #table2 .el-table .cell {
        padding-left: 0;
        padding-right: 0;
    }


    .nicknameSpan {
        font-weight: 600;
    }
     .nicknameSpan:hover {
        cursor: pointer;
    }
    .block {
        text-align: center;
        margin-top: 10px;
    }

    .studentReturnnoEff {
        float: left;
        margin-right: 5px;
        padding-left: 10px;
    }

    .noEff {
        width: 100%;
        position: relative;
        height: 46px;
        background-color: white;
        margin-top: 30px;
        padding-top: 10px;
        margin-bottom: 5px;
        border-radius: 5px;
    }

    .publicDialog .el-dialog__body {
        text-align: center;
        /*color:#ec6161;*/
    }

    .publicPool .el-dialog .el-dialog__header {
        background-color: #1fb5ad;
        padding: 20px 20px 20px;
    }

    .publicPool .el-dialog .el-dialog__title {
        color: white;
    }
#activityD .ql-link,#activityD .ql-video,#activityDB .ql-link,#activityDB .ql-video{
    display: none;
}
.avatar-uploader .el-upload {
    border: 2px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #20a0ff;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
  .avatar-uploader .el-upload--text{
      width:auto;
      height:auto;
  }
  #actDeatilForm .el-form-item,#birthdayDeatilForm .el-form-item{
      margin-bottom: 5px;
  }
  .actImg img{
      width: 100%
  }
</style>
