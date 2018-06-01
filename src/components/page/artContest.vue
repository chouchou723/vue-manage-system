<template>
    <div class="artContest">
        <!-- <el-breadcrumb separator="/">
            <el-breadcrumb-item><i class="el-icon-my-tongzhi"></i> 活动管理</el-breadcrumb-item>
            <el-breadcrumb-item class='ss'>活动模板</el-breadcrumb-item>
        </el-breadcrumb> -->
        <div class='artContestH'>
            <h3 class="artContestH1">

                绘画大赛报名
                <span v-if="number==='0'" style="font-size:14px;color: #bdb8b8;">加载中...</span>
                <span v-else>({{number}}人)</span>
            </h3>
            <div class='artContestH2' >
                <el-select v-model="valueT" clearable placeholder="资料上传状态" @change="updateList">
                    <el-option label="都已上传" value="1"></el-option>
                    <el-option label="都未上传" value="2"></el-option>
                    <el-option label="未上传作品" value="3"></el-option>
                    <el-option label="未上传语音" value="4"></el-option>
                    <el-option label="已上传作品" value="5"></el-option>
                    <el-option label="已上传语音" value="6"></el-option>
                </el-select>
            </div>
            <div class='artContestH2' >
                <el-select v-model="valueK" clearable placeholder="比赛组别" @change="updateList">
                    <!-- <el-option label="全部" value="1"></el-option> -->
                    <el-option label="幼儿组" value="1"></el-option>
                    <el-option label="少儿组" value="2"></el-option>
                    <el-option label="特别组" value="3"></el-option>
                </el-select>
            </div>
            <div class='artContestH2'>
                <el-cascader
                :options="cities"
                :props="propsource"
                v-model="value3"
                 @change="updateList"
                 clearable
                 change-on-select
                placeholder="选择城市" >
              </el-cascader>
            </div>
          
            <div style="float:right;margin-right:240px">
                    <el-button type="info" @click="importout">导出</el-button>
                <el-button type="primary" @click="createActivity">添加参赛者</el-button>
            </div>
                        <div class='artContestH4'>
                            <el-input placeholder="请输入参赛者姓名或手机号" icon="search" v-model="input2" :on-icon-click="updateList" @keyup.enter.native="updateList">
                            </el-input>
                        </div>
        </div>
        <div id="artContestH5">
            <el-table :data="publicData"  style="width: 100%">
                        <el-table-column prop="childname" label="参赛者" width='90'>
                            </el-table-column>
                            <el-table-column prop="mobile" label="手机号码" >
                                </el-table-column>
                                <el-table-column prop="age" label="年龄" width='80'>
                                    </el-table-column>
                                    <el-table-column prop="sex" label="性别" width='80'>
                                        </el-table-column>
                                        <el-table-column prop="group_type" label="比赛组别" >
                                            </el-table-column>
                                            <el-table-column prop="address" label="所在区域" >
                                                </el-table-column>
                                                <el-table-column prop="organization" label="所属机构或学校" >
                                                    </el-table-column>
                                                    <el-table-column prop="works_img" label="作品" >
                                                    <template scope="scope">
                                                        <span v-if='scope.row.works_name' class='artContestH6' @click='openImg(scope.row)'>{{scope.row.works_name}}</span>
                                                        <span v-else>-</span>
                                                    </template>
                                                        </el-table-column>
                                                        <el-table-column prop="works_voice" label="语音" width='70'>
                                                                <template scope="scope">
                                                                    <span v-if='scope.row.works_voice'  class='artContestH6' @click='openAudio(scope.row.works_voice)'>mp3</span>
                                                                    <span v-else>-</span>
                                                                </template>
                                                            </el-table-column>
                                    <el-table-column prop="created" label="报名时间" >
                                        </el-table-column>
                <el-table-column label="操作" width='120'>
                    <template scope="scope">
                          <el-button   type="text" size="small" @click="claim(scope.row)" >编辑</el-button>
                          <el-button type="text" size="small" @click="open2(scope.row.id)" style="color:red">删除</el-button>
                        <!--   <el-button type="text" size="small" @click="open2(scope.$index, accountData)">删除</el-button> -->
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <div class="artContestH7">
              <!-- <span class="demonstration"></span> -->
            <el-pagination layout="prev, pager, next" :total="total" :current-page="currentPage" :page-size="pagesize" @current-change="handleCurrentChange">
            </el-pagination>
        </div>
        <el-dialog :title="cOre" :visible.sync="dialogFormVisible" :close-on-click-modal="no" top='5%' size='small' show-close 
             id='activityD' @close='resetD' custom-class='artContestH8'>
            <el-form :model="form" :rules='rule' ref="form" label-width="120px" v-loading="loading2" element-loading-text="提交中">
                <el-form-item label="参赛者" prop='childname'>
                    <el-input v-model="form.childname" placeholder='请输入参赛者姓名' style="width:172px"></el-input>
                </el-form-item>
                <el-form-item label="手机号码" prop='mobile'>
                        <el-input v-model="form.mobile" placeholder='请输入手机号' style="width:172px"></el-input>
                    </el-form-item>
                    <el-form-item label="性别" prop='sex'>
                            <el-select v-model="form.sex" placeholder="请选择性别" style="width:172px">
                                <el-option label="男" value="1"></el-option>
                                <el-option label="女" value="2"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="年龄" prop='age'>
                            <el-select v-model="form.age" placeholder="选择" style="width:172px">
                                    <el-option v-for="item in 99" :label="item+''" :value="item+''"></el-option>                                
                                <!-- <el-option label="2" value="2"></el-option>
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
                                <el-option label="18" value="18"></el-option> -->
                            </el-select>
                        </el-form-item>
                        <el-form-item label="比赛组别" prop='group_type'>
                                <el-select v-model="form.group_type" placeholder="请选择比赛组别" style="width:172px">
                                    <el-option label="幼儿组" value="0"></el-option>
                                    <el-option label="少儿组" value="1"></el-option>
                                    <el-option label="特别组" value="2"></el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="所在区域" required>
                                    <el-form-item prop="province" class='artContestH3'>
                                        <el-select v-model="form.province" filterable placeholder="请选择省市" @change='getRegion'>
                                            <el-option v-for="item in cities" :key="item.id" :label="item.city_name" :value="item.id">
                                            </el-option>
                                        </el-select>
                                    </el-form-item>
                                    <el-form-item prop="city" class='artContestH3'>
                                        <el-select v-model="form.city" placeholder="请选择城区">
                                            <el-option v-for="item in regions" :key="item.id" :label="item.city_name" :value="item.id">
                                            </el-option>
                                        </el-select>
                                    </el-form-item>
                                </el-form-item>
                                <el-form-item label="所属机构或学校" prop='organization'>
                                        <el-input v-model="form.organization" placeholder='请输入所属机构或学校' style="width:217px"></el-input>
                                    </el-form-item>
                                    <el-form-item label="作品名字" prop='works_name'>
                                            <el-input v-model="form.works_name" placeholder='请输入作品名字' style="width:217px"></el-input>
                                        </el-form-item>
                                        <el-form-item label="作品简介" prop='works_det'>
                                                <el-input type="textarea" :autosize="{ minRows: 4, maxRows: 8}" placeholder="输入作品简介,限100字以内" v-model="form.works_det">
                                                </el-input>
                                            </el-form-item>
                                            <el-form-item label="指导老师" prop='teacher'>
                                                <el-input v-model="form.teacher" placeholder='请输入指导老师姓名(选填)' style="width:217px"></el-input>
                                            </el-form-item>
                                         <el-form-item label="参赛者照片" prop='head_img' style='height:180px;display:inline-block;width:300px;'>
                                                <div style="position:absolute;top:-41px;left:129px;">
                                                         <i class="el-icon-circle-close" style="position:absolute;top:42px;right:-25px;z-index:1" v-if="imageUrl1" @click="handleRemove1"></i>
                                                             <el-upload
                                                             class="avatar-uploader"
                                                             action="https://jsonplaceholder.typicode.com/posts/"
                                                             :show-file-list="false"
                                                             :on-change="beforeAvatarUpload1aa"
                                                             :auto-upload="false"
                                                             >
                                                             <img v-if="imageUrl1" :src="imageUrl1" class="avatar">
                                                             <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                                                           </el-upload>
                                                           <div style="position:absolute;bottom:-20px;left:-113px;color:#ff4949;width:120px" v-if="!imageUrl1&&countImg1!=0">请上传参赛者照片</div>
                                                           <!-- <div style="position:absolute;top: 50%;width: 203px;left: 0;">建议尺寸为500px*700px</div> -->
                                                     </div>
                                             
                                             </el-form-item>
                                             <el-form-item label="作品" prop='works_img' style='height:180px;display:inline-block'>
                                                    <div style="position:absolute;top:-41px;left:129px;">
                                                            <i class="el-icon-circle-close" style="position:absolute;top:42px;right:-25px;z-index:1" v-if="imageUrl" @click="handleRemove"></i>
                                                                    <el-upload
                                                                    class="avatar-uploader"
                                                                    action="https://jsonplaceholder.typicode.com/posts/"
                                                                    :show-file-list="false"
                                                                    :on-change="beforeAvatarUploadaa"
                                                                    :auto-upload="false"
                                                                    >
                                                                    <img v-if="imageUrl" :src="imageUrl" class="avatar">
                                                                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                                                                </el-upload>
                                                               <div style="position:absolute;bottom:-20px;left:-113px;color:#ff4949;width:120px" v-if="!imageUrl1&&countImg1!=0">请上传作品</div>
                                                               <!-- <div style="position:absolute;top: 50%;width: 203px;left: 0;">建议尺寸为500px*700px</div> -->
                                                         </div>
                                                 
                                                 </el-form-item>
            </el-form>
                    <div slot="footer" class="dialog-footer" style='text-align:center'>
                        <el-button type="primary" :loading="loading2" @click="onSubmit('form')">确定</el-button>
                        <el-button @click="dialogFormVisible = false">取消</el-button>
                    </div>
        </el-dialog>
        <el-dialog title="作品详情" :visible.sync="dialogFormVisibleShow" :close-on-click-modal="no" custom-class='classDetailDialog' top='10%' size='small' @close='resetS'>
                <el-form label-width="120px">
                        <el-form-item prop='time' label='作品名字:'>
                            <div>{{detailS.name}}</div>
                        </el-form-item>
                        <el-form-item prop='time' label='作品简介:'>
                            <div>{{detailS.intro}}</div>
                        </el-form-item>
                        <el-form-item prop='time' label='指导老师:'>
                            <div>{{detailS.teacher}}</div>
                        </el-form-item>
                        <el-form-item prop='time' label='参赛者照片:'>
                                <img :src="detailS.head_img" alt="" style='width:auto;max-width:100%'>
                        </el-form-item>
                        <el-form-item prop='time' label='作品图片:'>
                                <img :src="detailS.works_img" alt="" style='width:auto;max-width:100%'>
                        </el-form-item>
                    </el-form>
        </el-dialog>
        <el-dialog title="语音详情" :visible.sync="dialogFormVisibleA" :close-on-click-modal="no" custom-class='classDetailDialog' top='12%' size='small' @close='resetAudio'>
               <div style="text-align:center">
                    <audio controls="controls" preload="true" v-if='dialogFormVisibleA'>
                            <source :src="audioS" type="audio/mp3" />
                        </audio>
               </div> 
        </el-dialog>
       
    </div>
</template>
<script>
    var user, token
    import {
        cityList,
        pictureSayList,
        pictureSayAdd,
        pictureSayDet,
        exportPictureSay
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
            var isName = (rule, value, callback) => {
                // var myreg = /^[\u4e00-\u9fa5a-zA-Z]+$/;
                var myreg1 = /^\s/;
                if (value == '') {
                    callback('请输入参赛者姓名')
                } else if (myreg1.test(value)) {
                    callback('请输入有效的参赛者姓名');
                } else {
                    callback();
                }
            }
            var isTeacher = (rule, value, callback) => {
                // var myreg = /^[\u4e00-\u9fa5a-zA-Z]+$/;
                var myreg1 = /^\s/;
                if (value == '') {
                    callback()
                } else if (myreg1.test(value)) {
                    callback('请输入有效的指导老师姓名');
                } else {
                    callback();
                }
            }
            var isPhone1 = (rule, value, callback) => {
                var myreg =  /^(((1[0-9]{1}))+\d{9})$/; 
                if (value == '') {
                    callback('请输入手机号')
                } else if (!myreg.test(value)) {
                    callback('请输入有效手机号');
                }else{
                    callback();
                }
            }
            var isSpace2 = (rule, value, callback) => {
                var myreg1 = /^\s/;
                if(value==''){
                    callback('请输入所属机构或学校')
                }else if (myreg1.test(value)) {
                    callback('请输入有效的所属机构或学校')
                }else {
                    callback();
                }
            }
            var isImg = (rule, value, callback) => {
                if(this.imageUrl==''){
                    callback('')
                }else {
                    callback();
                }
            }
            var isImg1 = (rule, value, callback) => {
                if(this.imageUrl1==''){
                    callback('')
                }else {
                    callback();
                }
            }
            var isSpace10 = (rule, value, callback) => {
            var myreg = /^.{1,10}$/;
            var myreg1 = /^\s/;
            if(value==''){
                callback('请输入作品名字,最多10个字')
            }else if (myreg1.test(value)) {
                callback('请输入有效的作品名字')
            }else if (!myreg.test(value)) {
                    callback('作品名字不得超过10字');
                }else {
                callback();
            }
            
        }
        var isSpace100 = (rule, value, callback) => {
            var myreg = /^.{1,100}$/;
            var myreg1 = /^\s/;
            if(value==''){
                callback('请输入作品简介,最多100个字')
            }else if (myreg1.test(value)) {
                callback('请输入有效的作品简介')
            }else if (!myreg.test(value)) {
                    callback('作品简介不得超过100字');
                }else {
                callback();
            }
            
        }
            return {
                propsource:{
              value: 'id',
              label:'city_name',
              children: '_child'
            },
            value3:[],
                audioS:'',
                valueK:'',
                valueT:'',
                imgSrc:'',
                imgSrc1:'',                
                imageUrl: '',
                imageUrl1: '',
                countImg:0,
                countImg1:0,                
                cities:[],
                editorOption: {
                    // something config
                },
                // schoolList:[],
                in:'',
                regions:[],
                loading2:false,
                rule:{
                    childname: [{
                        required: true,
                        validator: isName,
                        trigger: 'blur'
                    }],
                    mobile:[
                    { required:true,validator: isPhone1,trigger: 'blur'}],
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
                    group_type: [{
                        required: true,
                        message: '请选择组别',
                        trigger: 'change'
                    }],
                    province: [{
                        required: true,
                        validator: nan,
                        trigger: 'change'
                    }, ],
                    city: [{
                        required: true,
                        validator: nan,
                        trigger: 'change'
                    }],
                    organization: [{
                        required: true,
                        validator: isSpace2,
                        trigger: 'blur'
                    }],
                    works_name: [{
                        required: true,
                        validator: isSpace10,
                        trigger: 'blur'
                    }],
                    works_det: [{
                        required: true,
                        validator: isSpace100,
                        trigger: 'blur'
                    }],
                    teacher: [{
                        // required: true,
                        validator: isTeacher,
                        trigger: 'blur'
                    }],
                    works_img: [{
                        required: true,
                        validator: isImg,
                        trigger: 'change'
                    }],
                    head_img: [{
                        required: true,
                        validator: isImg1,
                        trigger: 'change'
                    }]
                },
                form:{
                    childname:'',
                    mobile:'',
                    age:'',
                    sex:'',
                    group_type:'',
                    province:'',
                    city:'',
                    organization:'',
                    works_name:'',
                    works_det:'',
                    teacher:'',
                    works_img:'',
                    head_img:''
                },
                dialogFormVisible: false,
                dialogFormVisibleShow:false,
                dialogFormVisibleA:false,
                no: false,
                code: '',
                total: 0,
                number: '0',
                publicData: [],
                // optionsCC: [],
                // valueT: '', //全部CC下拉
                currentPage: 1, //页数
                pagesize: 15, //默认每页
                detailS:{}
            }
        },
        methods: {
            importout(){
                exportPictureSay(token).then(res=>{
                    // console.log(res)
                    //   let a = 'http://pandatest.dfth.com';
                        let a = '';
                        window.open( a+res)
                    })
            },
            resetAudio(){
                this.audioS=''
            },
            openAudio(data){
                this.audioS= data             
                this.dialogFormVisibleA = true
            },
            open2(id) { //删除课程
                    this.$confirm('确定要删除该参赛者?', '删除参赛者', {

                        customClass: 'artContestH9',
                        cancelButtonText: '取消',
                        confirmButtonText: '确定',
                        type: 'warning'
                    }).then(() => {
                        let a = {
                            id: id
                        }
                        pictureSayDet(a, token).then(() => {
                            this.fetchData();
                            this.$message({
                            type: 'success',
                            message: '删除成功!'
                        })
                        }).catch((res) => {
                            // this.$message.error('该用户未授权')
                        })
                    })
                
            },
            getRegion() {
                let para = {
                    pid: this.form.province
                }
                cityList(token, para).then((res) => {
                    // console.log(res)
                    this.regions = res.data
                })
            },
            updateList(){
                this.fetchData()
            },
            openImg(row){//查看作品
                this.detailS = {
                    name:row.works_name,
                    intro:row.works_det,
                    teacher:row.teacher,
                    head_img:row.head_img,
                    works_img:row.works_img
                }
                this.dialogFormVisibleShow = true;
            },
            claim(row){//修改
            //    console.log(data);
            this.in = row.id
            
               this.form={
                childname:row.childname,
                    mobile:row.mobile,
                    age:row.age,
                    sex:row.sex==='男'?'1':'2',
                    group_type:row.group_type_id,
                    province:row.province-0,
                    city:row.city-0,
                    organization:row.organization,
                    works_name:row.works_name,
                    works_det:row.works_det,
                    teacher:row.teacher,
                    head_img:'',
                    works_img:''                    
                }
                // let para={
                //         areaid:cs[cs.length-1]
                //     }
                //     schoolArea(token,para).then(res=>{
                //         this.schoolList = res.data
                //     })
                // setTimeout(() => {
                //     this.form.school_id = data.school_id-0
                // }, 0);
                this.getRegion();
                this.imageUrl1 = row.head_img;
                this.imageUrl = row.works_img;
                this.dialogFormVisible = true;
            },
            resetD(){
                this.form={
                    childname:'',
                    mobile:'',
                    age:'',
                    sex:'',
                    group_type:'',
                    province:'',
                    city:'',
                    teacher:'',
                    organization:'',
                    works_name:'',
                    works_det:'',
                    works_img:'',
                    head_img:''
                }
                this.loading2 = false;
                this.imageUrl = '';  
                this.imageUrl1 = '';  
                this.in='';
                this.countImg = 0;                           
                this.countImg1 = 0;   
                // this.schoolList = [];                        
                this.$refs['form'].resetFields();
            },
            handleRemove1(){
                this.imageUrl1 = ''
            },
            handleRemove(){
                this.imageUrl = ''
            },
            beforeAvatarUploadaa(file, fileList){
                const isJPG =  file.raw.type === 'image/jpeg' || file.raw.type === 'image/png';
                const isLt2M = file.size / 1024 / 1024 < 6;

                if (!isJPG) {
                    this.$message.error('上传图片格式为.jpg或.jpeg或.png!');
                }else if (!isLt2M) {
                    this.$message.error('上传图片大小不能超过6MB!');
                }else{

                let that = this;                
                let a = new FileReader();
               a.onload = function ( event ) { 
                    var txt = event.target.result;
                    that.imageUrl = txt;
                    that.form.works_img = txt
               
                    };
                a.readAsDataURL(file.raw);
                }
                
                // this.imageUrl =URL.createObjectURL(file.raw);
                // console.log(d)
            },
            beforeAvatarUpload1aa(file, fileList){
                const isJPG = file.raw.type === 'image/jpeg' || file.raw.type === 'image/png';
                const isLt2M = file.size / 1024 / 1024 < 6;

                if (!isJPG) {
                    this.$message.error('上传图片格式为.jpg或.jpeg或.png!');
                }else if (!isLt2M) {
                    this.$message.error('上传图片大小不能超过6MB!');
                }else{

                let that = this;
                let a = new FileReader();
               a.onload = function ( event ) { 
                    var txt = event.target.result;
                    that.imageUrl1 = txt;
                    that.form.head_img = txt
                    };
                a.readAsDataURL(file.raw);
                }
                
                // this.imageUrl1 =URL.createObjectURL(file.raw);
                // console.log(d)
            },
            onSubmit(form){
                this.countImg = 1;
                this.countImg1 = 1;   
                // console.log(this.form)             
                this.$refs[form].validate((valid) => {
                    if (valid&&this.imageUrl&&this.imageUrl1) {
                        this.loading2 = true;
                        let para = {...this.form}        
                // console.log(para)     
                if(this.in!=''){
                    para.id = this.in;
                    pictureSayAdd(para,token).then(res=>{
                    if(res.code==0){
                        this.loading2 = false;
                        this.$message.success('修改成功');
                        this.dialogFormVisible = false;
                        this.fetchData();
                    }else{
                        this.$message.error(res.data);
                        this.loading2 = false;
                        
                    }
                    // console.log(res)

                }).catch(()=>{
                    this.loading2 = false;
                    
                })
                }else{
                    pictureSayAdd(para,token).then(res=>{
                    if(res.code==0){
                        this.loading2 = false;
                        this.$message.success('添加成功')
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
                        // this.$message.info('还有项目未填写')
                    }
                })
                
            },
            createActivity() {
                this.in = '';
                this.dialogFormVisible = true;
            },
            // formatter(row, column) {
            //     let reg = /(\d{4})\d{4}(\d{3})/;
            //     if (reg.test(row.mobile)) {
            //         return row.mobile.replace(reg, '$1****$2');
            //     } else {
            //         return row.mobile
            //     }
            // },
            handleCurrentChange: function (val) { //换页
                this.currentPage = val;this.backToTop();
                this.fetchData();
                
            },
            fetchData() {
                let para = {
                    // cc_id: this.valueT, //CC
                    city:this.value3.length!==0?this.value3[this.value3.length-1]:'',
                    input:this.input2,
                    page: this.currentPage,
                    status:this.valueT,
                    group_type:this.valueK
                }
                pictureSayList(para,token).then((res) => { //
                    this.number = res.data.total;
                    let a = res.data.data;
                    let c = res.data.last_page * this.pagesize;
                    this.publicData = a;
                    this.total = parseInt(c);
                })
            },
        },

        beforeCreate() {
            user = sessionStorage.getItem('user');
            token = JSON.parse(user).token;
        },
        created() {
            // this.code = JSON.parse(user).job ? JSON.parse(user).job.code : '';
            this.fetchData();
            cityList(token).then((res) => { //获取城市
                this.cities = res.data
            })
            // let cam = {
            //             simple: 1
            //         }
            //         campusList(cam, token).then((res) => { //获取校区
            //             this.schoolList = res.data
            //         })
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
                    return '添加参赛者'
                }
                return '修改参赛者'
            },
        }
    }

</script>
<style>
    /* #table2AT .el-table td,
    #table2AT .el-table th:not(.gutter) {
        padding: 1px;
        text-align: center
    }

    #table2AT .el-table th>div,
    #table2AT .el-table .cell {
        padding-left: 0;
        padding-right: 0;
    } */


    .artContestH6 {
        font-weight: 600;
        color:#1fb5ad
    }
     .artContestH6:hover {
        cursor: pointer;
    }
    .artContestH7 {
        text-align: center;
        margin-top: 10px;
    }

    .artContestH1 {
        float: left;
        margin-right: 5px;
        padding-left: 10px;
        margin-top: 5px;
    }

    .artContestH {
        width: 100%;
        position: relative;
        height: 46px;
        background-color: white;
        /* margin-top: 30px; */
        padding-top: 10px;
        margin-bottom: 5px;
        border-radius: 5px;
    }

    .artContest .el-dialog .el-dialog__header {
        background-color: #1fb5ad;
        padding: 20px 20px 20px;
    }

    .artContest .el-dialog .el-dialog__title {
        color: white;
    }
.artContest .avatar-uploader .el-upload {
    border: 2px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .artContest .avatar-uploader .el-upload:hover {
    border-color: #20a0ff;
  }
  .artContest .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 170px;
    height: 170px;
    line-height: 170px;
    text-align: center;
  }
  .artContest .avatar {
    width: 170px;
    height: 170px;
    display: block;
  }
  .artContest textarea {
    resize: none;
  }
  .artContest .avatar-uploader .el-upload--text{
      width:170px;
      height:170px;
  }
  /* .top55  .el-time-panel__content::after,.top55 .el-time-panel__content::before{
        top:55%
    } */
    .artContestH4{
    position:absolute;
    top:10px;
    right:10px;
    width:220px
    }
    /* .artContestH3 {
        width: 122px;
        margin-right: 10px;
        float: left
    } */
    .artContestH8{
        width:750px;
    }
    .artContestH9 .el-message-box__header {
    background-color: #e95c5c;
    padding: 20px 20px 20px;
}

.artContestH9 .el-message-box__title {
    color: white;
}

.artContestH9 .el-button--primary {
    background-color: #e95c5c;
    border-color: #e95c5c;
    text-align: center;
}

.artContestH9 .el-message-box__content {
    padding: 40px 20px;
}
.artContestH2{
    display: inline-block;
    width:140px;
}
.artContestH3 {
        width: 142px;
        margin-right: 10px;
        float: left
    }
</style>
