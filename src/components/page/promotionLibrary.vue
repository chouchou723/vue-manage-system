<template>
    <div class='promoLi'>
        <!-- <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-my-richeng"></i> 课程管理</el-breadcrumb-item>
                <el-breadcrumb-item class='ss'>优惠库</el-breadcrumb-item>
            </el-breadcrumb>
        </div> -->
        <div class='accouPL'>
            <div class="promoLiH1">
                <h3 class='promoLiH2'>
               优惠库
               <span v-if="number==='0'" style="font-size:14px;color: #bdb8b8;">加载中...</span>
               <span v-else>({{number}}个)</span>
                </h3>
                <el-button type="primary" size="mid" class='promoLiH2ddB' v-if="!code.includes('school')" @click="createCh('aform')">添加优惠类型</el-button>
            </div>
            <el-dialog :title="alter" :visible.sync="dialogFormVisible" :close-on-click-modal="no" custom-class='promoLiH2dd' top='25%' @close='resetD' size='tiny'>
                <el-form :model="aform" :rules="rules2" ref="aform" style='padding-right:70px'>
                    <el-form-item label="优惠类型" :label-width="formLabelWidth" prop="title">
                        <el-input v-model="aform.title" placeholder='请输入优惠类型名称' :style='{width:inputLabelWidth}'></el-input>
                    </el-form-item>
                    <el-form-item label="优惠理由" :label-width="formLabelWidth" prop="remark">
                        <el-input type="textarea" :autosize="{ minRows: 4, maxRows: 6}" placeholder="请输入优惠理由" v-model="aform.remark">
                        </el-input>
                    </el-form-item>
                    <el-form-item label="使用状态" :label-width="formLabelWidth" prop="stop">
                            <el-select v-model="aform.stop"  placeholder="选择状态"  >
                        <el-option label="启用" value="0"></el-option>
                        <el-option label="停用" value="1"></el-option>
                        </el-select>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer" style="text-align:center;margin-top:40px">
                    <el-button type="primary" :loading='writeL' @click="addAccount('aform')">确 定</el-button>
                    <el-button @click="dialogFormVisible = false">取 消</el-button>
                </div>
            </el-dialog>
        </div>
        <div id="table3PL">
            <el-table :data="accountData" border style='width:100%'>
                <el-table-column prop="name" label="优惠类型" width='280'>
                    <template scope="scope">
                        <span style='font-weight:600'>{{scope.row.title}}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="remark" label="优惠理由">
                </el-table-column>
                <el-table-column prop="sales_total" label="使用数" width='80'>
                    </el-table-column>
                    <el-table-column prop="status" label="使用状态" width='80'>
                        </el-table-column>
                <el-table-column label="操作" width='280' v-if="!code.includes('school')">
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
var token,user
import {
    getPromotionList,
    create_coupons,
    put_coupons,
    delete_coupons
} from '../../api/api';
export default {
    data() {
            return {
                code:'',
                writeL:false,
                currentPage: 1, //页数
                pagesize: 15, //默认每页
                total: 0, //总页数
                in : '', //修改时代表修改的index
                no: false, //取消点击关闭
                accountData: [],
                number: '0',
                aform: {
                    id: '',
                    title: '',
                    remark: '',
                    stop:'0'
                },
                dialogFormVisible: false,
                formLabelWidth: '100px',
                inputLabelWidth: '200px',
                rules2: {
                    title: [{
                        required: true,
                        message: '请输入优惠名称',
                        trigger: 'blur'
                    }],
                    remark: [{
                        required: true,
                        message: '请输入优惠理由',
                        trigger: 'blur'
                    }]
                }
            }
        },
        methods: {
            createCh(formName) { //点击创建按钮
                this.in = '';
                this.aform.id = '';
                this.aform.title = '';
                this.aform.remark = '';
                this.aform.stop = '0'
                this.dialogFormVisible = true;
            },
            resetD() {
                this.$refs['aform'].resetFields();
            },
            editCh(index, data) { //点击就修改
                this.in = index;
                this.aform.id = data[index].id;
                this.aform.title = data[index].title;
                this.aform.remark = data[index].remark;
                this.aform.stop = data[index].stop+'';
                this.dialogFormVisible = true;
            },
            open2(index, data) { //删除课程
                this.$confirm('是否确定要删除该优惠?', '删除优惠', {
                        customClass: 'PLredwarn',
                        cancelButtonText: '取消',
                        confirmButtonText: '确定',
                        type: 'warning'
                    }).then(() => {
                        let para = {
                            id: data[index].id
                        }
                        delete_coupons(para, token).then(() => {

                            this.fetchData();
                        });
                        this.$message({
                            type: 'success',
                            message: '删除成功!'
                        });
                    })

            },
            addAccount(formName) { //点确定后添加优惠
                this.$refs[formName].validate((valid) => {
                    let f = this.aform;
                    let i = this.in;

                    if (valid) {
                        this.writeL = true;
                        if (i !== '') {
                            let para = f;
                            put_coupons(para, token).then(res => {
                                if (res.code == 0) {
                                    this.$message({
                                        message: '修改成功',
                                        type: 'success'
                                    });
                                    this.fetchData();
                                    this.writeL = false;
                                } else {
                                    this.$message({
                                        type: 'error',
                                        message: res.data
                                    });
                                    this.writeL = false;
                                }
                            }).then(() => {
                                this.dialogFormVisible = false;
                            });
                        } else {
                            let para = f;
                            create_coupons(para, token).then(res => {
                                if (res.code == 0) {
                                    this.$message({
                                        message: '创建成功',
                                        type: 'success'
                                    });
                                    this.fetchData();
                                    this.writeL = false;
                                } else {
                                    this.$message({
                                        type: 'error',
                                        message: res.data
                                    });
                                    this.writeL = false;
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
                    type:'all'
                }
                getPromotionList(token,para).then((res) => {
                    this.number = res.data.total;
                    let a = res.data.data;
                    let c = res.data.last_page * this.pagesize;
                    this.total = parseInt(c);
                    this.accountData = a;
                })

            },
            handleCurrentChange: function(val) { //变更页数
                this.currentPage = val;this.backToTop();
                this.fetchData();
            },
        },
        beforeCreate() {
            user = sessionStorage.getItem('user');
            token = JSON.parse(user).token;
        },
        created() { //创建组件时
            this.code = JSON.parse(user).job ? JSON.parse(user).job.code : '';
            this.fetchData();
        },
        computed: {
            alter: function() {
                if (this.in === '') {
                    return '添加优惠库'
                }
                return '修改优惠库'
            }
        }
}
</script>
<style>
.promoLiH1 .el-button--primary {
    background-color: #32a4d3;
    border-color: #32a4d3;
}

/* #table3PL .el-table td,
#table3PL .el-table th:not(.gutter) {
    padding: 5px 5px;
    text-align: center
}

#table3PL .el-table th>div,
#table3PL .el-table .cell {
    padding-left: 0;
    padding-right: 0;
} */

#table3PL .classDel {
    color: #e95c5c;
}

.PLredwarn .el-message-box__header {
    background-color: #e95c5c;
    padding: 20px 20px 20px;
}

.PLredwarn .el-message-box__title {
    color: white;
}

.PLredwarn .el-button--primary {
    background-color: #e95c5c;
    border-color: #e95c5c;
    text-align: center;
}

.PLredwarn .el-message-box__content {
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

.accouPL {
    width: 100%;
    position: relative;
    height: 45px;
    background-color: white;
    /* margin-top: 30px; */
    padding-top: 10px;
    margin-bottom: 5px;
    border-radius: 5px;
}

.promoLiH2 {
    display: inline-block;
    margin-top: 5px;
    margin-bottom: 15px;
    padding-left: 10px
}


.promoLiH2ddB {
    position: absolute;
    right: 10px;
    top: 10px;
}

.promoLiH2dd .el-dialog__body {
    padding: 20px 20px 0 20px;
}

.promoLiH2dd .el-dialog__footer {
    padding: 0 20px 15px;
}
</style>
