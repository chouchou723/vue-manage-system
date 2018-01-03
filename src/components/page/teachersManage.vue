<template>
    <div class="teacherManage">
        <!-- <el-breadcrumb separator="/">
            <el-breadcrumb-item><i class="el-icon-my-tongzhi"></i> 活动管理</el-breadcrumb-item>
            <el-breadcrumb-item class='ss'>活动模板</el-breadcrumb-item>
        </el-breadcrumb> -->
        <div class='teacherManageH'>
            <h3 class="teacherManageH1">

                师资管理
            </h3>
            <!-- <div class='studentReturnNoneed' v-if="code =='cc_m'">
                <el-select v-model="valueT" clearable placeholder="选择CC" @change="updateList">
                    <el-option v-for="item in optionsCC" :key="item.key" :label="item.label" :value="item.key">
                    </el-option>
                </el-select>
            </div> -->
            <div class='teacherManageH12'>
                <el-input placeholder="输入老师姓名或认证编号" icon="search" v-model="input2" :on-icon-click="updateList" @keyup.enter.native="updateList">
                </el-input>
            </div>
            <div style="float:right;margin-right:10px">
                <el-button type="success" @click="createActivity">新增老师</el-button>
            </div>
        </div>
        <div id="table2AT12">
            <el-table :data="publicData"  style="width: 100%">
                    <el-table-column prop="head_img" label="老师照片" >
                            <template scope="scope">
                                   <img :src="scope.row.head_img" height='105' width='75' alt="" >
                                   <!-- @click="openImg(scope.row.head_img)" class='teacherManagehOVER' -->
                                </template>
                        </el-table-column>
                        <el-table-column prop="uname" label="老师姓名" width='90'>
                            </el-table-column>
                            <el-table-column prop="courses" label="授课范围" >
                                </el-table-column>
                                <el-table-column prop="school_addr" label="授课校区" >
                                        <template scope="scope">
                                                <span v-html="scope.row.school_addr"></span>
                                            </template>
                                </el-table-column>
                                <el-table-column prop="other" label="教育格言" >
                                    </el-table-column>
                                    <el-table-column prop="code_num" label="认证编号" >
                                        </el-table-column>
                                        <el-table-column prop="code_data" label="认证时间" width='100'>
                                            </el-table-column>
                <el-table-column prop="certificate_img" label="认证证书" width='70'>
                    <template scope="scope">
                        <span class='teacherManagehOVER1' @click='openImg(scope.row.certificate_img)'>查看</span>
                    </template>
                </el-table-column>
                <el-table-column prop="created" label="创建时间" >
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
        <div class="teacherManageBlock">
              <!-- <span class="demonstration"></span> -->
            <el-pagination layout="prev, pager, next" :total="total" :current-page="currentPage" :page-size="pagesize" @current-change="handleCurrentChange">
            </el-pagination>
        </div>
        <el-dialog :title="cOre" :visible.sync="dialogFormVisible" :close-on-click-modal="no" top='5%' size='small' show-close 
             id='activityD' @close='resetD' custom-class='w50'>
            <el-form :model="form" :rules='rule' ref="form" label-width="120px" v-loading="loading2" element-loading-text="提交中">
                <el-form-item label="老师姓名" prop='name'>
                    <el-input v-model="form.name" placeholder='请输入老师姓名' style="width:172px"></el-input>
                </el-form-item>
                <el-form-item label="授课范围" prop='course'>
                        <el-input v-model="form.course" placeholder='输入授课范围,如art1-art5,素描' style="width:217px"></el-input>
                    </el-form-item>
                    <el-form-item label="授课校区" prop="city" >
                            <!-- <el-form-item prop="city_id" class='AU142float'>
                                <el-select v-model="form.city_id" filterable placeholder="请选择城市" @change='getRegion'>
                                    <el-option v-for="item in cities" :key="item.id" :label="item.city_name" :value="item.id">
                                    </el-option>
                                </el-select>
                            </el-form-item> -->
                            <!-- <el-form-item > -->
                                <!-- <el-select v-model="form.city" placeholder="请选择城区">
                                    <el-option v-for="item in regions" :key="item.id" :label="item.city_name" :value="item.id">
                                    </el-option>
                                </el-select> -->
                                <el-cascader
                                :options="cities"
                                :props="propsource"
                                v-model="form.city"
                                 @change="updateListSchool"
                                 clearable
                                 change-on-select
                                placeholder="选择省市城区" >
                              </el-cascader>
                            <!-- </el-form-item> -->
                        </el-form-item>
                        <el-form-item label="" prop='school_id'>
                                <el-select v-model="form.school_id"  placeholder="选择校区" filterable >
                                     <el-option v-for="item in schoolList" :key="item.id" :label="item.title" :value="item.id">
                                     </el-option>
                                 </el-select>
                             </el-form-item>
                             <el-form-item label="教育格言" :label-width="formLabelWidth" prop="motto">
                                    <el-input type="textarea" style="width:360px;" :autosize="{ minRows: 4, maxRows: 6}" placeholder="输入教育格言" v-model="form.motto">
                                    </el-input>
                                    <span style='color:grey;position:absolute;left: 318px;top: 74px;width:40px;text-align:right;background: white;line-height: 20px;'>
                                        {{form.motto.length}}/50
                                    </span>
                                </el-form-item>
                                <el-form-item label="认证编号" prop='code'>
                                        <el-input v-model="form.code" placeholder='请输入认证编号' style="width:172px"></el-input>
                                    </el-form-item>
                                    <el-form-item label="认证时间" prop='code_date' >
                                            <el-date-picker v-model="form.code_date" format="yyyy-MM-dd" type="date" :clearable="no" :picker-options="pickerOptions0" placeholder="请选择认证时间" style="width:172px">
                                             </el-date-picker>
                                         
                                         </el-form-item>
                                         <el-form-item label="认证证书" prop='certificate_img' style='height:180px;'>
                                                <div style="position:absolute;top:-41px;left:129px;">
                                                         <i class="el-icon-circle-close" style="position:absolute;top:49px;right:-3px;z-index:1" v-if="imageUrl1" @click="handleRemove1"></i>
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
                                                           <div style="position:absolute;bottom:-20px;left:-113px;color:#ff4949;width:120px" v-if="!imageUrl1&&countImg1!=0">请选择认证证书</div>
                                                           <div style="position:absolute;top: 50%;width: 203px;left: 0;">建议尺寸为500px*700px</div>
                                                     </div>
                                             
                                             </el-form-item>
                <div style="position:absolute;top:72px;left:678px">
                   <div style="position:absolute;top:10px;right:1px;width:100px"><span style="color:#ff4949">*</span> 老师照片</div>
                    <i class="el-icon-circle-close" style="position:absolute;top:49px;right:-3px;z-index:1" v-if="imageUrl" @click="handleRemove"></i>
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
                      <div style="position:absolute;bottom:-20px;left:-113px;color:#ff4949;width:120px" v-if="!imageUrl&&countImg!=0">请选择老师照片</div>
                      <div style="position:absolute;top: 31px;width: 203px;left: -142px;">建议尺寸为250px*340px</div>
                </div>
            </el-form>
                    <div slot="footer" class="dialog-footer" style='text-align:center'>
                        <el-button type="primary" @click="onSubmit('form')">确定</el-button>
                        <el-button @click="dialogFormVisible = false">取消</el-button>
                    </div>
        </el-dialog>
        <el-dialog title="证书详情" :visible.sync="dialogFormVisibleShow" :close-on-click-modal="no" custom-class='classDetailDialog' top='2%' size='small' @close='resetS'>
            <img :src="imgSrc" alt="" style='width:100%'>
        </el-dialog>
    </div>
</template>
<script>
    var user, token
    import {
        cityList,
        getActivityList,
        campusList,
        addTpl,
        teacherlist,
        addTeacher,
        delTeacher,
        schoolArea,
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
                var myreg = /^[\u4e00-\u9fa5a-zA-Z]+$/;
                if (value == '') {
                    callback('请输入老师姓名')
                } else if (!myreg.test(value)) {
                    callback('请输入有效的老师姓名');
                } else {
                    callback();
                }
            }
            var isSpace = (rule, value, callback) => {
                var myreg1 = /^\s/;
                if(value==''){
                    callback('请输入授课范围')
                }else if (myreg1.test(value)) {
                    callback('请输入有效的授课范围')
                }else {
                    callback();
                }
            }
            var isSpace1 = (rule, value, callback) => {
                var myreg = /^.{1,50}$/;
                var myreg1 = /^\s/;
                if(value==''){
                    callback('请输入教育格言')
                }else if (myreg1.test(value)) {
                    callback('请输入有效的教育格言')
                } else if (!myreg.test(value)) {
                    callback('内容不得超过50字');
                } else {
                    callback();
                }
            }
            var isSpace2 = (rule, value, callback) => {
                var myreg1 = /^\s/;
                if(value==''){
                    callback('请输入认证编号')
                }else if (myreg1.test(value)) {
                    callback('请输入有效的认证编号')
                }else {
                    callback();
                }
            }
            var isImg = (rule, value, callback) => {
                if(this.imageUrl1==''){
                    callback('')
                }else {
                    callback();
                }
            }
            var isArr = (rule, value, callback) => {
                if(value.length==0){
                    callback('请选择省市城区')
                }else{
                    callback();
                }
            }
            return {
                pickerOptions0: {
                    disabledDate(time) {
                        return time.getTime() > Date.now();
                    }
                },
                imgSrc:'',
                imageUrl: '',
                imageUrl1: '',
                countImg:0,
                countImg1:0,                
                cities:[],
                propsource:{
              value: 'id',
              label:'city_name',
              children: '_child'
            },
                editorOption: {

                    // something config
                },
                schoolList:[],
                in:'',
                loading2:false,
                rule:{
                    name: [{
                        required: true,
                        validator: isName,
                        trigger: 'blur'
                    }],
                    course: [{
                        required: true,
                        validator: isSpace,
                        trigger: 'blur'
                    }],
                    city: [{
                        required: true,
                        validator: isArr,
                        trigger: 'change'
                    }],
                    school_id: [{
                        required: true,
                        validator: nan,
                        trigger: 'change'
                    }],
                    motto: [{
                        required: true,
                        // message: '请输入格言',
                        validator: isSpace1,
                        trigger: 'blur'
                    }],
                    code: [{
                        required: true,
                        validator: isSpace2,
                        trigger: 'blur'
                    }],
                    code_date: [{
                        required: true,
                        type:'date',
                        message: '请选择日期',
                        trigger: 'change'
                    }],
                    certificate_img: [{
                        required: true,
                        validator: isImg,
                        trigger: 'change'
                    }]
                },
                form:{
                    name:'',
                    head_img:'',
                    course:'',
                    school_id:'',
                    motto:'',
                    city:[],
                    code:'',
                    code_date:'',
                    certificate_img:''

                },
                dialogFormVisible: false,
                dialogFormVisibleShow:false,
                no: false,
                code: '',
                total: 0,
                // number: '0',
                publicData: [],
                // optionsCC: [],
                // valueT: '', //全部CC下拉
                currentPage: 1, //页数
                pagesize: 15, //默认每页
            }
        },
        methods: {
            updateListSchool(val){
                // console.log(val)
                this.form.school_id = ''
                if(val.length!=0){

                    let para={
                        areaid:val[val.length-1]
                    }
                    schoolArea(token,para).then(res=>{
                        this.schoolList = res.data
                    })
                }
            },
            open2(id) { //删除课程
                    this.$confirm('确定要删除该老师?', '删除老师', {

                        customClass: 'TLredwarn',
                        cancelButtonText: '取消',
                        confirmButtonText: '确定',
                        type: 'warning'
                    }).then(() => {
                        let a = {
                            id: id
                        }
                        delTeacher(a, token).then(() => {
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
            updateList(){
                this.fetchData()
            },
            openImg(src){
                this.imgSrc = src;
                this.dialogFormVisibleShow = true;
            },
            claim(data){//修改
            //    console.log(data);
            let cs =data.city.split(',');
            this.in = data.id
               this.form={
                    name:data.uname,
                    head_img:'',
                    course:data.courses,
                    school_id:'',
                    motto:data.other,
                    city:cs.map(item=>item-0),
                    code:data.code_num,
                    code_date:new Date(data.code_data),
                    certificate_img:''
                }
                let para={
                        areaid:cs[cs.length-1]
                    }
                    schoolArea(token,para).then(res=>{
                        this.schoolList = res.data
                    })
                setTimeout(() => {
                    this.form.school_id = data.school_id-0
                }, 0);
                this.imageUrl = data.head_img;
                this.imageUrl1 = data.certificate_img;
                this.dialogFormVisible = true;
            },
            resetD(){
                this.form={
                    name:'',
                    head_img:'',
                    course:'',
                    school_id:'',
                    motto:'',
                    city:[],
                    code:'',
                    code_date:'',
                    certificate_img:''
                }
                this.loading2 = false;
                this.imageUrl = '';  
                this.imageUrl1 = '';  
                this.in='';
                this.countImg = 0;                           
                this.countImg1 = 0;   
                this.schoolList = [];                        
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
                const isLt2M = file.size / 1024 / 1024 < 2;

                if (!isJPG) {
                    this.$message.error('上传图片格式为.jpg或.jpeg或.png!');
                }else if (!isLt2M) {
                    this.$message.error('上传图片大小不能超过2MB!');
                }else{

                let that = this;                
                let a = new FileReader();
               a.onload = function ( event ) { 
                    var txt = event.target.result;
                    that.imageUrl = txt;
                    that.form.head_img = txt
               
                    };
                a.readAsDataURL(file.raw);
                }
                
                // this.imageUrl =URL.createObjectURL(file.raw);
                // console.log(d)
            },
            beforeAvatarUpload1aa(file, fileList){
                const isJPG = file.raw.type === 'image/jpeg' || file.raw.type === 'image/png';
                const isLt2M = file.size / 1024 / 1024 < 2;

                if (!isJPG) {
                    this.$message.error('上传图片格式为.jpg或.jpeg或.png!');
                }else if (!isLt2M) {
                    this.$message.error('上传图片大小不能超过2MB!');
                }else{

                let that = this;
                let a = new FileReader();
               a.onload = function ( event ) { 
                    var txt = event.target.result;
                    that.imageUrl1 = txt;
                    that.form.certificate_img = txt
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
              
                para.city = para.city[para.city.length-1]            
                // console.log(para)     
                if(this.in!=''){
                    para.id = this.in;
                    addTeacher(para,token).then(res=>{
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
                    addTeacher(para,token).then(res=>{
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
                this.currentPage = val;
                this.fetchData();
            },
            fetchData() {
                let para = {
                    // cc_id: this.valueT, //CC
                    searchVal:this.input2,
                    page: this.currentPage
                }
                teacherlist(token,para).then((res) => { //
                    // this.number = res.data.total;
                    let a = res.data.list;
                    let c = res.data.lastpage * this.pagesize;
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
                    return '新增老师'
                }
                return '修改老师'
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


    .teacherManagehOVER1 {
        font-weight: 600;
        color:#1fb5ad
    }
     .teacherManagehOVER1:hover {
        cursor: pointer;
    }
    .teacherManageBlock {
        text-align: center;
        margin-top: 10px;
    }

    .teacherManageH1 {
        float: left;
        margin-right: 5px;
        padding-left: 10px;
        margin-top: 5px;
    }

    .teacherManageH {
        width: 100%;
        position: relative;
        height: 46px;
        background-color: white;
        /* margin-top: 30px; */
        padding-top: 10px;
        margin-bottom: 5px;
        border-radius: 5px;
    }

    .teacherManage .el-dialog .el-dialog__header {
        background-color: #1fb5ad;
        padding: 20px 20px 20px;
    }

    .teacherManage .el-dialog .el-dialog__title {
        color: white;
    }
.teacherManage .avatar-uploader .el-upload {
    border: 2px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .teacherManage .avatar-uploader .el-upload:hover {
    border-color: #20a0ff;
  }
  .teacherManage .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 125px;
    height: 170px;
    line-height: 178px;
    text-align: center;
  }
  .teacherManage .avatar {
    width: 125px;
    height: 170px;
    display: block;
  }
  .teacherManage .avatar-uploader .el-upload--text{
      width:125px;
      height:170px;
  }
  /* .top55  .el-time-panel__content::after,.top55 .el-time-panel__content::before{
        top:55%
    } */
    .teacherManageH12{
    position:absolute;
    top:10px;
    right:100px;
    width:200px
    }
    /* .AU142float {
        width: 122px;
        margin-right: 10px;
        float: left
    } */
    .w50{
        width:750px;
    }
    .TLredwarn .el-message-box__header {
    background-color: #e95c5c;
    padding: 20px 20px 20px;
}

.TLredwarn .el-message-box__title {
    color: white;
}

.TLredwarn .el-button--primary {
    background-color: #e95c5c;
    border-color: #e95c5c;
    text-align: center;
}

.TLredwarn .el-message-box__content {
    padding: 40px 20px;
}
</style>
