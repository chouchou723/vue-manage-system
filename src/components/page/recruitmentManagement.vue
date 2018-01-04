<template>
        <div class="recuManage">
            <!-- <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-my-tongzhi"></i> 活动管理</el-breadcrumb-item>
                <el-breadcrumb-item class='ss'>活动模板</el-breadcrumb-item>
            </el-breadcrumb> -->
            <div class='recuManageH'>
                <h3 class="recuManageH1">
                    职位管理
                </h3>
                <!-- <div class='studentReturnNoneed' v-if="code =='cc_m'">
                    <el-select v-model="valueT" clearable placeholder="选择CC" @change="updateList">
                        <el-option v-for="item in optionsCC" :key="item.key" :label="item.label" :value="item.key">
                        </el-option>
                    </el-select>
                </div> -->
                <div style="float:right;margin-right:10px">
                    <el-button type="success" @click="createActivity" >发布职位</el-button>
                </div>
            </div>
            <div id="table2ATREC">
                <el-table :data="publicData"  style="width: 100%">
                    <el-table-column prop="pname" label="职位名称" width='140'>
                    </el-table-column>
                    <el-table-column prop="requires" label="职位描述" >
                            <template scope="scope">
                                   <div v-html="scope.row.requires" style='text-align:left'></div>
                              </template>
                    </el-table-column>
                    <el-table-column prop="area_name" label="工作城市" width="80">
                    </el-table-column>
                    <el-table-column prop="area_det" label="工作区域" width='160'>
                        </el-table-column>
                        <el-table-column prop="is_active" label="职位状态" width="80">
                            </el-table-column>
                            <el-table-column prop="create_time" label="发布时间" width='140'>
                                </el-table-column>
                    <el-table-column label="操作" width='140'>
                        <template scope="scope">
                              <el-button   type="text" size="small" @click="claim(scope.row)" style="font-size:14px;">编辑</el-button>
                              <el-button type="text" size="small" @click="open2(scope.row.id)" style="color:red">删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
            <div class="recuManageBlock">
                  <!-- <span class="demonstration"></span> -->
                <el-pagination layout="prev, pager, next" :total="total" :current-page="currentPage" :page-size="pagesize" @current-change="handleCurrentChange">
                </el-pagination>
            </div>
            <el-dialog :title="cOre" :visible.sync="dialogFormVisible" :close-on-click-modal="no" top='11%' size='small' show-close 
                 id='activityD' @close='resetD'>
                <el-form :model="form" :rules='rule' ref="form" label-width="120px" v-loading="loading2" element-loading-text="提交中">
                        
                    <el-form-item label="职位名称" prop='pname'>
                        <el-input v-model="form.pname" placeholder='请输入职位名称' style="width:60%"></el-input>
                    </el-form-item>
                    <el-form-item label="职位描述" :label-width="formLabelWidth" prop="requires">
                            <el-input type="textarea" style="width:60%" :autosize="{ minRows: 4, maxRows: 6}" placeholder="输入职位描述的内容" v-model="form.requires">
                            </el-input>
                        </el-form-item>
                        <el-form-item label="工作城市" prop='area'>
                                <el-cascader
                                :options="cities"
                                :props="propsource"
                                v-model="form.area"
                                 clearable
                                 change-on-select
                                placeholder="请选择省市" >
                              </el-cascader>
                            </el-form-item>
                            <el-form-item label="工作区域" prop='area_det'>
                                    <el-input v-model="form.area_det" placeholder='选填,输入工作区域' style="width:60%"></el-input>
                                </el-form-item>
                                <el-form-item label="职位状态" prop='is_active'>
                                        <el-select v-model="form.is_active"  placeholder="职位状态" @change="updateList">
                                                <el-option label="显示" value="1"></el-option>
                                                <el-option label="隐藏" value="0"></el-option>
                                            </el-select>
                                    </el-form-item>
                </el-form>
                        <div slot="footer" class="dialog-footer" style='text-align:center'>
                            <el-button type="primary" @click="onSubmit('form')">确定</el-button>
                            <el-button @click="dialogFormVisible = false">取消</el-button>
                        </div>
            </el-dialog>
        </div>
    </template>
    <script>
        var user, token;   
        import {
            positionsList,
            positionsAdd,
            speciallyCityList,
            positionsDet
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
                var isSpace = (rule, value, callback) => {
                var myreg1 = /^\s/;
                if(value==''){
                    callback('请输入职位名称')
                }else if (myreg1.test(value)) {
                    callback('请输入有效的职位名称')
                }else {
                    callback();
                }
            }
            var isSpace1 = (rule, value, callback) => {
                var myreg1 = /^\s/;
                if(value==''){
                    callback('请输入职位描述')
                }else if (myreg1.test(value)) {
                    callback('请输入有效的职位描述')
                }else {
                    callback();
                }
            }
            var isArr = (rule, value, callback) => {
                if(value.length!=2){
                    callback('请选择省市')
                }else{
                    callback();
                }
            }
                return {
                    // pickerOptions0: {
                    //     disabledDate(time) {
                    //         return time.getTime() < Date.now() - 8.64e7;
                    //     }
                    // },
                    in:'',
                    cities:[],
                    propsource:{
              value: 'id',
              label:'city_name',
              children: '_child'
            },
                    rule:{
                        pname: [{
                            required: true,
                            validator: isSpace,
                            trigger: 'blur'
                        }],
                        requires: [{
                            required: true,
                            validator: isSpace1,
                            trigger: 'blur'
                        }],
                        area: [{
                            required: true,
                            validator: isArr,
                            trigger: 'change'
                        }],
                        // area_det: [{
                        //     required: true,
                        //     validator: isSpace1,
                        //     trigger: 'blur'
                        // }],
                    },
                    form:{
                        pname:'',
                        requires:'',
                        area:[],
                        area_det:'',
                        is_active:'1',
    
                    },
                    dialogFormVisible: false,
                    no: false,
                    code: '',
                    // total: 0,
                    number: '0',
                    publicData: [],
                    // optionsCC: [],
                    // valueT: '', //全部CC下拉
                    currentPage: 1, //页数
                    pagesize: 15, //默认每页
                }
            },
            methods: {
                claim(data){
                    this.in = data.id;
                    let arr = data.area.split(',').map(item=>item-0);
                    this.form ={
                        pname:data.pname,
                        requires:data.requires.replace(/<br\/>/g,"\n"),
                        area:arr,
                        area_det:data.area_det,
                        is_active:data.is_active=='显示'?'1':'0',
                    }
                    this.dialogFormVisible = true;
                },
                open2(id){
                        this.$confirm('是否要删除该职位', '删除职位', {
                        // customClass: 'redwarn',
                        cancelButtonText: '否',
                        confirmButtonText: '是',
                        type: 'error',
                        customClass: 'RMMred',
                    }).then(() => {
                        let para = {
                            id:id,
                        }
                        positionsDet(para, token).then((res) => {
                            if(res.code==0){
                                this.$message.success('删除成功')
                                this.fetchData();
                            }else{
                                this.$message.error(res.data)
                            }
                        })
                    }).catch(() => {         
                    });
                    },
                resetD(){
                    this.form={
                        pname:'',
                        requires:'',
                        area:[],
                        area_det:'',
                        is_active:'1',
    
                    } 
                    this.in='';                         
                    this.$refs['form'].resetFields();
                },
                onSubmit(form){
                    // console.log(this.form.requires.replace(/\n/g,'<br/>'));  
                    this.$refs[form].validate((valid) => {
                        if (valid) {
                            let para = {...this.form}
                            para.area = para.area[para.area.length-1];
                            para.requires = para.requires.replace(/\n/g,'<br/>')
                            
                    if(this.in!=''){
                        para.id = this.in;
                        positionsAdd(para,token).then(res=>{
                        if(res.code==0){
                            this.$message.success('修改成功');
                            this.dialogFormVisible = false;
                            this.fetchData();
                        }else{
                            this.$message.error(res.data)
                        }
                        // console.log(res)
    
                    })
                    }else{
                        positionsAdd(para,token).then(res=>{
                        if(res.code==0){
                            this.$message.success('添加成功')
                            this.dialogFormVisible = false;
                            this.fetchData();
                        }else{
                            this.$message.error(res.data);
                            
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
                        page: this.currentPage
                    }
                    positionsList(para,token).then((res) => { //
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
                let para = {}
                speciallyCityList(para,token).then((res) => { //获取城市
                    this.cities = res.data
            })
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
                        return '发布职位'
                    }
                    return '编辑职位'
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
    
    
        /* .nicknameSpanAT {
            font-weight: 600;
            color:#1fb5ad
        }
         .nicknameSpanAT:hover {
            cursor: pointer;
        } */
        .recuManageBlock {
            text-align: center;
            margin-top: 10px;
        }
    
        .recuManageH1 {
            float: left;
            margin-right: 5px;
            padding-left: 10px;
            margin-top: 5px;
        }
    
        .recuManageH {
            width: 100%;
            position: relative;
            height: 46px;
            background-color: white;
            /* margin-top: 30px; */
            padding-top: 10px;
            margin-bottom: 5px;
            border-radius: 5px;
        }
    
        .recuManage .el-dialog .el-dialog__header {
            background-color: #1fb5ad;
            padding: 20px 20px 20px;
        }
    
        .recuManage .el-dialog .el-dialog__title {
            color: white;
        }
        .RMMred .el-message-box__header {
    background-color: #e95c5c;
    padding: 20px 20px 20px;
}

.RMMred .el-message-box__title {
    color: white;
}

.RMMred .el-button--primary {
    background-color: #e95c5c;
    border-color: #e95c5c;
}
    </style>
    