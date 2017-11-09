<template>
    <div class='classLibrary'>
        <!-- <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-my-richeng"></i> 课程管理</el-breadcrumb-item>
                <el-breadcrumb-item class='ss'>标签库</el-breadcrumb-item>
            </el-breadcrumb>
        </div> -->
        <div class='tagLi'>
            <div class="h1">
                <h3 class='accountH2'>
               标签库({{number}}个)
                </h3>
                <div class='oneSelectTag'>
                    <el-select v-model="value" clearable placeholder="标签类型" filterable @change="updateList">
                        <el-option label="沟通标签" value="student"></el-option>
                        <el-option label="回访标签" value="return"></el-option>
                    </el-select>
                </div>
                <el-button type="primary" size="mid" class='buttonAdd' @click="createCh('aform')">添加标签</el-button>
            </div>
            <el-dialog :title="alter" :visible.sync="dialogFormVisible" :close-on-click-modal="no" custom-class='classLibraryDialog' top='29%' @close='resetD' size='tiny'>
                <el-form :model="aform" ref="aform" :rules="rules2">
                    <el-form-item label="标签类型" :label-width="formLabelWidth" prop="type">
                        <el-select v-model="aform.type" :style='{width:inputLabelWidth}'>
                                <el-option label="沟通标签" value="student"></el-option>
                                <el-option label="回访标签" value="return"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="标签内容" :label-width="formLabelWidth" prop="title">
                        <el-input v-model="aform.title" placeholder='请输入标签内容' :style='{width:inputLabelWidth}'></el-input>
                    </el-form-item>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer" style="text-align:center;margin-top:40px">
                    <el-button type="primary" @click="addAccount('aform')">确 定</el-button>
                    <el-button @click="dialogFormVisible = false">取 消</el-button>
                </div>
            </el-dialog>
        </div>
        <div id="tableTL">
            <el-table :data="accountData"  style='width:100%'>
                
                <el-table-column prop="types" label="标签类型">
                </el-table-column>
                <el-table-column prop="title" label="标签内容">
                </el-table-column>
                <el-table-column prop="created_at" label="创建时间">
                </el-table-column>
                <el-table-column label="操作" width='120'>
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
    delete_class,
    getTagList,
    create_tag,
    delete_tag,
    put_tag
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
            return {
                currentPage: 1, //页数
                pagesize: 15, //默认每页
                total: 0, //总页数
                in : '', //修改时代表修改的index
                no: false, //取消点击关闭
                accountData: [],
                number: 0,
                value: '', //对应课程类型select的值
                aform: {
                    title: '',
                    type: ''
                },
                dialogFormVisible: false,
                formLabelWidth: '31%',
                inputLabelWidth: '200px',
                rules2: {
                    title: [{
                        required: true,
                        message: '请输入标签内容',
                        trigger: 'blur'
                    }],
                    type: [{
                        required: true,
                        trigger: 'blur'
                    }]
                }
            }
        },
        methods: {
            updateList() { //表格上方select change之后刷新表格
                this.currentPage = 1;
                this.fetchData();
            },
            createCh(formName) { //点击创建按钮
                this.in = '';
                this.dialogFormVisible = true;
                this.aform = {
                   title:'',
                   type:'',
                   id:''
                }

            },
            resetD() {
                this.$refs['aform'].resetFields();

            },
            editCh(index, data) { //点击就修改
                if (data[index].use != 0) {
                    this.$alert('当前标签已使用,无法修改', '修改标签', {
                        showConfirmButton: false,
                        type: 'warning',
                        customClass: 'classredwarn',
                        confirmButtonText: '确定'
                    });
                }else{

                    this.in = index;
                    this.aform = {
                        type: data[index].types=='回访标签'?'return':'student',
                        title: data[index].title,
                        id:data[index].id
                    }
                    this.dialogFormVisible = true;
                }

            },
            open2(index, data) { //删除课程
                if (data[index].use != 0) {
                    this.$alert('当前标签已使用,无法删除', '删除标签', {
                        showConfirmButton: false,
                        type: 'warning',
                        customClass: 'classredwarn',
                        confirmButtonText: '确定'
                    });
                } else {
                    this.$confirm('是否确定要删除该标签?', '删除标签', {

                        customClass: 'classredwarn',
                        cancelButtonText: '取消',
                        confirmButtonText: '确定',
                        type: 'warning'
                    }).then(() => {
                        let a = {
                            id: data[index].id
                        }
                        delete_tag(a, token).then(() => {
                            this.fetchData();
                            this.$message({
                            type: 'success',
                            message: '删除成功!'
                        })
                        }).catch((res) => {
                            this.$message.error('该用户未授权')
                        })
                    })
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
                            create_tag(para, token).then(res => {
                                if (res.code == 0) {
                                    this.$message({
                                        message: '修改成功',
                                        type: 'success'
                                    });
                                    this.fetchData();
                                } else {
                                    this.$message({
                                        type: 'error',
                                        message: res.data
                                    });
                                }
                            }).then(() => {
                                this.dialogFormVisible = false;
                            });
                        } else {
                            let para = f;
                            create_tag(para, token).then(res => {
                                if (res.code == 0) {
                                    this.$message({
                                        message: '创建成功',
                                        type: 'success'
                                    });
                                    this.fetchData();
                                } else {
                                    this.$message({
                                        type: 'error',
                                        message: res.data
                                    });
                                }
                            }).then(() => {
                                this.dialogFormVisible = false;
                            });
                        }
                        this.in = '';

                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            fetchData() {
                let para = {
                    page: this.currentPage,
                    type: this.value
                }
                getTagList(token, para).then((res) => {
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
            let user = sessionStorage.getItem('user');
            token = JSON.parse(user).token;
        },
        created() { //创建组件时
            this.fetchData();

        },
        computed: {
            alter: function() {
                if (this.in === '') {
                    return '添加标签'
                }
                return '修改标签'
            }
        }
}
</script>
<style>
.h1 .el-button--primary {
    background-color: #32a4d3;
    border-color: #32a4d3;
}

#tableTL .el-table td,
#tableTL .el-table th:not(.gutter) {
    padding: 5px 5px;
    text-align: center
}

#tableTL .el-table th>div,
#tableTL .el-table .cell {
    padding-left: 0;
    padding-right: 0;
}

#tableTL .classDel {
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

.tagLi {
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

.oneSelectTag {
    display: inline-block;
    margin-bottom: 10px;
    margin-left: 10px;
    width: 110px
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
</style>
