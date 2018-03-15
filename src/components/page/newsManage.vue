<template>
        <div class="newsManage">
            <!-- <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-my-tongzhi"></i> 活动管理</el-breadcrumb-item>
                <el-breadcrumb-item class='ss'>活动模板</el-breadcrumb-item>
            </el-breadcrumb> -->
            <div class='newsManageH'>
                <h3 class="newsManageH1">
    
                    新闻管理
                </h3>
                <!-- <div class='studentReturnNoneed' v-if="code =='cc_m'">
                    <el-select v-model="valueT" clearable placeholder="选择CC" @change="updateList">
                        <el-option v-for="item in optionsCC" :key="item.key" :label="item.label" :value="item.key">
                        </el-option>
                    </el-select>
                </div> -->
                <div style="float:right;margin-right:10px">
                    <el-button type="success" @click="createActivity" >发布新闻</el-button>
                </div>
            </div>
            <div id="table2ATNM">
                <el-table :data="publicData"  style="width: 100%">
                    <el-table-column prop="title" label="新闻标题" >
                    </el-table-column>
                    <el-table-column prop="img" label="封面图" width='280'>
                            <template scope="scope">
                                    <!-- <div style='display:flex;justify-content: center;'> -->

                                        <img :src="scope.row.img"  width='150' height="85" alt="" >
                                    <!-- </div> -->
                                    </template>
                    </el-table-column>
                    <el-table-column prop="created" label="发布时间" >
                    </el-table-column>
                    <el-table-column label="操作" width='140'>
                        <template scope="scope">
                              <el-button   type="text" size="small" @click="claim(scope.row.id)" style="font-size:14px;">编辑</el-button>
                            <!--   <el-button type="text" size="small" @click="open2(scope.$index, accountData)">删除</el-button> -->
                        </template>
                    </el-table-column>
                </el-table>
            </div>
            <div class="newsManageBlock">
                  <!-- <span class="demonstration"></span> -->
                <el-pagination layout="prev, pager, next" :total="total" :current-page="currentPage" :page-size="pagesize" @current-change="handleCurrentChange">
                </el-pagination>
            </div>
            <el-dialog :title="cOre" :visible.sync="dialogFormVisible" :close-on-click-modal="no" top='1%' size='large' show-close 
                 id='NManageAdd' @close='resetD'>
                <el-form :model="form" :rules='rule' ref="form" label-width="120px" v-loading="loading2" element-loading-text="Loading">
                        <el-form-item label="封面图" prop='img' style='height:150px;'>
                                <div style="position:absolute;top:-41px;left:79px;">
                                         <i class="el-icon-circle-close" style="position:absolute;top:49px;right:-58px;z-index:1" v-if="imageUrl" @click="handleRemove"></i>
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
                                           <div style="position:absolute;bottom:-20px;left:-78px;color:#ff4949;width:120px" v-if="!imageUrl&&countImg!=0">请选择封面图片</div>
                                           <div style="position:absolute;top: 50%;width: 203px;left: 172px;">建议尺寸为900px*508px</div>
                                     </div>
                             
                             </el-form-item>
                    <el-form-item label="新闻标题" prop='title'>
                        <el-input v-model="form.title" placeholder='请输入新闻标题' style="width:50%"></el-input>
                    </el-form-item>
                    <el-form-item label="导语" :label-width="formLabelWidth" prop="description">
                            <el-input type="textarea" style="width:50%" :autosize="{ minRows: 4, maxRows: 6}" placeholder="选填,属于导语内容" v-model="form.description">
                            </el-input>
                        </el-form-item>
                    <el-form-item label="新闻内容" prop='content' required>
                            <quill-editor ref="myTextEditor" v-model="form.content" :config="editorOption" @change='resetTE1'></quill-editor>
                            <!-- <div style="position:absolute;bottom:-26px;left:0;color:#ff4949;width:120px" v-if="!form.content">请输入活动介绍</div> -->
                        <!-- <el-input type="textarea" :rows="4" placeholder="请输入内容" v-model="form.des"  :autosize="{ minRows: 4, maxRows: 24}"  style="width:342px" >
                        {{form.des}}
                        </el-input> -->
                    </el-form-item>
                </el-form>
                        <div slot="footer" class="dialog-footer" style='text-align:center'>
                            <el-button type="primary" :loading='loading2' @click="onSubmit('form')">确定</el-button>
                            <el-button @click="dialogFormVisible = false">取消</el-button>
                        </div>
            </el-dialog>
        </div>
    </template>
    <script>
        var user, token
        import 'quill/dist/quill.core.css'
    // import 'quill/dist/quill.snow.css'
    // import 'quill/dist/quill.bubble.css'       
        import {
            getActivityList,
            newsList,
            newsDet,
            newsAdd
        } from '../../api/api';
        export default {
            // components: {
            //     quillEditor
            // },
            data() {
                var contentA = (rule, value, callback) => {
                   
                    if (this.form.content == '') {
                        callback('请输入新闻内容');
                    } else {
                        callback()
                    }
                }
                return {
                    loading2:false,
                    imageUrl: '',
                    countImg:0,
                    editorOption: {
    
                        // something config
                    },
                    activity:{
                    },
                    in:'',
                    rule:{
                        title: [{
                            required: true,
                            message: '请输入新闻标题',
                            trigger: 'blur'
                        }],
                        title: [{
                            required: true,
                            message: '请输入新闻标题',
                            trigger: 'blur'
                        }],
                        // price: [{
                        //     required: true,
                        //     message: '请选择活动所耗课时',
                        //     trigger: 'change'
                        // }],
                        // stock: [{
                        //     required: true,
                        //     type:'number',
                        //     message: '请输入最大报名人数',
                        //     trigger: 'blur'
                        // }],
                        // // minage: [{
                        // //     required: true,
                        // // validator: smallerer,
                        // //     // message: '请选择最小年龄',
                        // //     trigger: 'change'
                        // // }],
                        content: [{
                            required: true,
                            validator: contentA,
                            // message: '请输入活动介绍',
                            trigger: 'blur'
                        }],
                    },
                    form:{
                        title:'',
                        img:'',
                        description:'',
                        content:''
    
                    },
                    dialogFormVisible: false,
                    no: false,
                    code: '',
                    total: 0,
                    // number: '0',
                    publicData: [],
                    // optionsCC: [],
                    // valueT: '', //全部CC下拉
                    currentPage: 1, //页数
                    pagesize: 15, //默认每页
                    // temId:''
                }
            },
            methods: {
                claim(id){
                    let para = {
                        id:id
                    }
                    this.in = id;
                    this.loading2 = true
                    newsDet(para,token).then(res=>{
                        // console.log(res.data)
                        let data = res.data;
                        this.form = {
                            title:data.title,
                        // img:'',
                        description:data.description,
                        content:data.contents
                        }
                        this.imageUrl = data.img
                    }).then(()=>{
                        this.loading2 = false;
                    })
                    this.dialogFormVisible = true;
                },
                resetD(){
                    this.form={
                        title:'',
                        img:'',
                        description:'',
                        content:''
                    }
                    this.imageUrl = ''   
                    this.in='';
                    this.countImg = 0; 
                    this.loading2 = false;                          
                    this.$refs['form'].resetFields();
                },
                handleRemove(){
                    this.imageUrl = ''
                },
                beforeAvatarUploadaa(file, fileList){
                    const isLt2M = file.size / 1024 / 1024 < 1;
    
                    // if (!isJPG) {
                    //     this.$message.error('上传图片只能是 JPG或者PNG 格式!');
                    // }
                    if (!isLt2M) {
                        this.$message.error('上传图片大小不能超过5MB!');
                    }else{
    
                    let that = this;                
                    let a = new FileReader();
                   a.onload = function ( event ) { 
                        var txt = event.target.result;
                        that.imageUrl = txt;
                        };
                    a.readAsDataURL(file.raw);
                    }
                    
                    // this.imageUrl =URL.createObjectURL(file.raw);
                    // console.log(d)
                },
                onSubmit(form){
                    this.countImg = 1;
                    // console.log(this.form.content)
                    this.$refs[form].validate((valid) => {
                        if (valid&&this.imageUrl&&this.form.content) {
                            this.loading2 = true;
                            let para = {...this.form}
                    para.img = this.imageUrl
                    // console.log(para)     
                    if(this.in!=''){
                        para.id = this.in;
                        newsAdd(para,token).then(res=>{
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
    
                    })
                    }else{
                        newsAdd(para,token).then(res=>{
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
                createActivity() {
                    this.in = '';
                    this.dialogFormVisible = true;
                },
                handleCurrentChange: function (val) { //换页
                    this.currentPage = val;this.backToTop();
                    this.fetchData();
                },
                fetchData() {
                    let para = {
                        // cc_id: this.valueT, //CC
                        page: this.currentPage
                    }
                    newsList(para,token).then((res) => { //
                        // this.number = res.data.total;
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
                        return '发布新闻'
                    }
                    return '编辑新闻'
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
/*     
    
        .nicknameSpanAT {
            font-weight: 600;
            color:#1fb5ad
        }
         .nicknameSpanAT:hover {
            cursor: pointer;
        } */
        .newsManageBlock {
            text-align: center;
            margin-top: 10px;
        }
    
        .newsManageH1 {
            float: left;
            margin-right: 5px;
            padding-left: 10px;
            margin-top: 5px;
        }
    
        .newsManageH {
            width: 100%;
            position: relative;
            height: 46px;
            background-color: white;
            /* margin-top: 30px; */
            padding-top: 10px;
            margin-bottom: 5px;
            border-radius: 5px;
        }
    
        .newsManage .el-dialog .el-dialog__header {
            background-color: #1fb5ad;
            padding: 20px 20px 20px;
        }
    
        .newsManage .el-dialog .el-dialog__title {
            color: white;
        }
    #NManageAdd .ql-video{
        display: none;
    }
    .newsManage .avatar-uploader .el-upload {
        border: 2px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
      }
      .newsManage  .avatar-uploader .el-upload:hover {
        border-color: #20a0ff;
      }
      .newsManage  .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 225px;
        height: 127px;
        line-height: 127px;
        text-align: center;
      }
      .newsManage .avatar {
        width: 225px;
        height: 127px;
        display: block;
      }
      .newsManage .avatar-uploader .el-upload--text{
          width:auto;
          height:auto;
      }
      .newsManage  .ql-editor{
            color:black;
        }
    </style>
    