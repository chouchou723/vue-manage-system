<template>
    <div class='classLibrary'>
        <!-- <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-my-richeng"></i> 课程管理</el-breadcrumb-item>
                <el-breadcrumb-item class='ss'>课程库</el-breadcrumb-item>
            </el-breadcrumb>
        </div> -->
        <div class='classLi'>
            <div class="h1">
                <h3 class='accountH2'>
               课程库({{number}}个)
                </h3>
                <div class='oneSelect'>
                    <el-select v-model="value" clearable placeholder="课程类型" filterable @change="updateList">
                        <el-option v-for="item in options" :key="item.kc_tid" :label="item.kc_tname" :value="item.kc_tid">
                        </el-option>
                    </el-select>
                </div>
                <el-button type="primary" size="mid" class='buttonAdd' @click="createCh('aform')">添加课程</el-button>
            </div>
            <el-dialog :title="alter" :visible.sync="dialogFormVisible" :close-on-click-modal="no" custom-class='classLibraryDialog' top='9%' @close='resetD' size='tiny'>
                <el-form :model="aform" ref="aform" :rules="rules2">
                    <el-form-item label="课程名称" :label-width="formLabelWidth" prop="title">
                        <el-input v-model="aform.title" placeholder='请输入课程名称' class='CL200'></el-input>
                    </el-form-item>
                    <el-form-item label="课程类型" :label-width="formLabelWidth" prop="kc_tid">
                        <el-select v-model="aform.kc_tid" class='CL200'>
                            <el-option v-for="item in options" :key="item.kc_tid" :label="item.kc_tname" :value="item.kc_tid">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="课时" :label-width="formLabelWidth" prop="year_num">
                        <el-input v-model.number="aform.year_num" auto-complete="off" placeholder='请输入课时'class='CL200'></el-input>
                    </el-form-item>
                    <el-form-item label="签单数" :label-width="formLabelWidth" prop="head_count">
                        <el-input v-model.number="aform.head_count" auto-complete="off" placeholder='请输入签单数' class='CL200'></el-input>
                    </el-form-item>
                    <el-form-item label="学费" :label-width="formLabelWidth" prop="tuition_price">
                        <el-input v-model.number="aform.tuition_price" auto-complete="off" placeholder='请输入学费' class='CL200'></el-input>
                    </el-form-item>
                    <el-form-item label="教材费" :label-width="formLabelWidth" prop="teaching_price">
                        <el-input v-model.number="aform.teaching_price" auto-complete="off" placeholder='请输入教材费' class='CL200'></el-input>
                    </el-form-item>
                    <el-form-item label="书本费" :label-width="formLabelWidth" prop="book_price">
                        <el-input v-model.number="aform.book_price" auto-complete="off" placeholder='请输入书本费' class='CL200'></el-input>
                    </el-form-item>
                    <el-form-item label="有效期" :label-width="formLabelWidth" prop="order_date">
                        <el-select v-model="aform.order_date" class='CL200'>
                            <el-option v-for="item in period" :key="item.value" :label="item.label" :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer" >
                    <el-button type="primary" @click="addAccount('aform')">确 定</el-button>
                    <el-button @click="dialogFormVisible = false">取 消</el-button>
                </div>
            </el-dialog>
        </div>
        <div id="tableCL">
            <el-table :data="accountData" border style='width:100%'>
                <el-table-column prop="title" label="课程名称">
                    <template scope="scope">
                        <span class='CLbold'>{{scope.row.title}}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="kecheng_type" label="课程类型">
                </el-table-column>
                <el-table-column prop="year_num" label="课时">
                </el-table-column>
                <el-table-column prop="head_count" label="签单数">
                </el-table-column>
                <el-table-column prop="tuition_price" label="学费">
                </el-table-column>
                <el-table-column prop="teaching_price" label="教材费">
                </el-table-column>
                <el-table-column prop="book_price" label="书本费">
                </el-table-column>
                <el-table-column prop="order_date" label="有效期" :formatter='formatter'>
                </el-table-column>
                <el-table-column prop="person_num" label="在读数/总销量" width='120'>
                     <template scope="scope">
                        <span >{{scope.row.person_num}}/{{scope.row.total_num}}</span>
                    </template>
                </el-table-column>
                <el-table-column label="操作">
                    <template scope="scope">
                        <el-button type="text" size="small" @click="editCh(scope.$index, accountData)">修改</el-button>
                        <el-button type="text" size="small" @click="open2(scope.$index, accountData)" class='classDel'>删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="block">
                <el-pagination layout="prev, pager, next" :total="total" :current-page="currentPage" :page-size="pagesize" @current-change="handleCurrentChange">
                </el-pagination>
            </div>
        </div>
    </div>
</template>
<script>
var token
import {
    getClassLibrary,
    getClassKind,
    create_class,
    put_class,
    delete_class
} from '../../api/api';
export default {
    data() {
            var nan = (rule, value, callback) => {
                if (typeof value == 'number') {
                    callback();
                } else {
                    callback('请选择课程类型')
                }
            }
            // var isPName = (rule, value, callback) => {
            //     var myreg = /^[\u4e00-\u9fa5a-zA-Z()]+$/;
            //     if (value == '') {
            //         callback('请输入课程名称')
            //     } else if (!myreg.test(value)) {
            //         callback('请输入有效的课程名称');
            //     } else {
            //         callback();
            //     }
            // }
            return {
                period: [{
                    label: '1个月',
                    value: '1'
                }, {
                    label: '2个月',
                    value: '2'
                }, {
                    label: '3个月',
                    value: '3'
                }, {
                    label: '4个月',
                    value: '4'
                }, {
                    label: '5个月',
                    value: '5'
                }, {
                    label: '6个月',
                    value: '6'
                }, {
                    label: '7个月',
                    value: '7'
                }, {
                    label: '8个月',
                    value: '8'
                }, {
                    label: '9个月',
                    value: '9'
                }, {
                    label: '10个月',
                    value: '10'
                }, {
                    label: '11个月',
                    value: '11'
                }, {
                    label: '12个月',
                    value: '12'
                }, {
                    label: '13个月',
                    value: '13'
                }, {
                    label: '14个月',
                    value: '14'
                }, {
                    label: '15个月',
                    value: '15'
                }],
                currentPage: 1, //页数
                pagesize: 15, //默认每页
                total: 0, //总页数
                in : '', //修改时代表修改的index
                no: false, //取消点击关闭
                accountData: [],
                number: 0,
                options: '', //选择课程类型
                value: '', //对应课程类型select的值
                aform: {
                    title: '',
                    kc_tid: '',
                    year_num: '',
                    head_count: '',
                    tuition_price: '',
                    teaching_price: '',
                    book_price: '',
                    order_date: ''
                },
                dialogFormVisible: false,
                formLabelWidth: '31%',
                rules2: {
                    title: [{
                        required: true,
                        // validator: isPName,                        
                        message: '请输入课程名称',
                        trigger: 'blur'
                    }],
                    kc_tid: [{
                        required: true,
                        validator: nan,
                        trigger: 'blur'
                    }],
                    year_num: [{
                        required: true,
                        type:'number',
                        // validator: isNan,                        
                        message: '请输入课时',
                        trigger: 'blur'
                    }],
                    head_count: [{
                        required: true,
                        type:'number',
                        message: '请输入签单数',
                        trigger: 'blur'
                    }],
                    tuition_price: [{
                        required: true,
                        type:'number',
                        message: '请输入学费',
                        trigger: 'blur'
                    }],
                    teaching_price: [{
                        required: true,
                        type:'number',
                        message: '请输入教材费',
                        trigger: 'blur'
                    }],
                    book_price: [{
                        required: true,
                        type:'number',
                        message: '请输入书本费',
                        trigger: 'blur'
                    }],
                    order_date: [{
                        required: true,
                        message: '请选择有效期',
                        trigger: 'blur'
                    }]
                }
            }
        },
        methods: {
            formatter(row, column) {
                return row.order_date + '个月'
            },
            updateList() { //表格上方select change之后刷新表格
                this.currentPage = 1;
                this.fetchData();
            },
            createCh(formName) { //点击创建按钮
            this.dialogFormVisible = true;
            },
            resetD() {
                this.in = '';
                this.aform = {
                    kcid: '',
                    title: '',
                    kc_tid: '',
                    year_num: '',
                    head_count: '',
                    tuition_price: '',
                    teaching_price: '',
                    book_price: '',
                    order_date: ''
                }
                this.$refs['aform'].resetFields();

            },
            editCh(index, data) { //点击就修改
                this.in = index;
                this.aform = {
                    kcid: data[index].kcid,
                    title: data[index].title,
                    kc_tid: data[index].kc_tid - 0,
                    year_num: data[index].year_num,
                    head_count: data[index].head_count,
                    tuition_price: data[index].tuition_price,
                    teaching_price: data[index].teaching_price,
                    book_price: data[index].book_price,
                    order_date: data[index].order_date
                }
                this.dialogFormVisible = true;
            },
            open2(index, data) { //删除课程
                if (data[index].person_num != 0) {
                    this.$alert('当前课程已有学员报名,无法删除', '删除课程', {
                        showConfirmButton: false,
                        type: 'warning',
                        customClass: 'classredwarn',
                        confirmButtonText: '确定'
                    });
                } else {
                    this.$confirm('是否确定要删除该课程?', '删除课程', {
                        customClass: 'classredwarn',
                        cancelButtonText: '取消',
                        confirmButtonText: '确定',
                        type: 'warning'
                    }).then(() => {
                        let a = {
                            kcid: data[index].kcid
                        }
                        delete_class(a, token).then((res) => {
                            if(res.code==0){
                                this.fetchData();
                                this.$message({
                            type: 'success',
                            message: '删除成功!'
                        })
                            }
                        }).catch((res) => {
                            this.$message.error('该用户未授权')
                        })
                    }).catch(()=>{})
                }
            },

            addAccount(formName) { //点确定后添加课程
                this.$refs[formName].validate((valid) => {
                    let f = {...this.aform};
                    let i = this.in;
                    // console.log(valid)
                    if (valid) {
                        if (i !== '') {
                            let para = f;
                            put_class(para, token).then(res => {
                                if (res.code == 0) {
                                    this.$message({
                                        message: '修改成功',
                                        type: 'success'
                                    });
                                    this.fetchData();
                                    this.dialogFormVisible = false;
                                } else {
                                    this.$message({
                                        type: 'error',
                                        message: res.data
                                    });
                                }
                            })
                        } else {
                            let para = f;
                            create_class(para, token).then(res => {
                                if (res.code == 0) {
                                    this.$message({
                                        message: '创建成功',
                                        type: 'success'
                                    });
                                    this.fetchData();
                                    this.dialogFormVisible = false;
                                } else {
                                    this.$message({
                                        type: 'error',
                                        message: res.data
                                    });
                                }
                            })
                        }
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            fetchData() {
                let para = {
                    page: this.currentPage,
                    pid: this.value
                }
                getClassLibrary(token, para).then((res) => {
                    this.number = res.data.total;
                    let a = res.data;
                    let c = res.data.last_page * this.pagesize;
                    this.total = parseInt(c);
                    this.accountData = a.data;
                })

            },
            handleCurrentChange: function(val) { //变更页数
                this.currentPage = val;
                this.fetchData();
            },
        },
        beforeCreate() {
            let user = localStorage.getItem('user');
            token = JSON.parse(user).token;
        },
        created() { //创建组件时
            this.fetchData();
            getClassKind(token).then((res) => { //获取课程分类
                this.options = res.data
            })

        },
        computed: {
            alter: function() {
                if (this.in === '') {
                    return '添加课程'
                }
                return '修改课程'
            }
        }
}
</script>
<style>
.h1 .el-button--primary {
    background-color: #32a4d3;
    border-color: #32a4d3;
}

/* #tableCL .el-table td,
#tableCL .el-table th:not(.gutter) {
    padding: 5px 5px;
    text-align: center
}

#tableCL .el-table th>div,
#tableCL .el-table .cell {
    padding-left: 0;
    padding-right: 0;
} */

#tableCL .classDel {
    color: #e95c5c;
}

.classredwarn .el-message-box__header {
    background-color: #e95c5c;
    padding: 20px 20px 20px;
}

.classredwarn .el-message-box__title {
    color: white;
}

.classredwarn .el-button--primary {
    background-color: #e95c5c;
    border-color: #e95c5c;
    text-align: center;
}

.classredwarn .el-message-box__content {
    padding: 40px 20px;
}


.el-dialog .el-dialog__header {
    background-color: #1fb5ad;
    padding: 20px 20px 20px;
}

.el-dialog .el-dialog__title {
    color: white;
}

.block {
    text-align: center;
    margin-top: 10px;
}

.classLi {
    width: 100%;
    position: relative;
    height: 45px;
    background-color: white;
    /* margin-top: 30px; */
    padding-top: 10px;
    margin-bottom: 5px;
    border-radius: 5px;
}

.accountH2 {
    display: inline-block;
    /*margin-top: 20px;*/
    margin-bottom: 15px;
    padding-left: 10px
}

.oneSelect {
    display: inline-block;
    margin-bottom: 10px;
    margin-left: 10px;
    width: 140px
}

.buttonAdd {
    position: absolute;
    right: 10px;
    top: 10px;
}

.classLibraryDialog .el-dialog__body {
    padding: 20px 20px 0 20px;
}

.classLibraryDialog .el-dialog__footer {
    padding: 0 20px 15px;
}
.dialog-footer{
text-align:center;margin-top:40px
}
.CL200{
    width: 200px;
}
.CLbold{
    font-weight: bold
}
</style>
