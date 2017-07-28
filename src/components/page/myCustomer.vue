<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-my-yonhu"></i> 客户管理</el-breadcrumb-item>
                <el-breadcrumb-item class='ss'>我的客户</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class='accouMyresourece'>
            <h2 class="mydataReturn">
               我的客户({{number}}人)
      </h2>
            <div style="display:flex;flex-wrap:wrap">
                <div class='studentReturnThreeNew' v-if="code =='cc_m'">
                    <el-select v-model="valueCC" clearable placeholder="选择CC" @change="updateList">
                        <el-option v-for="item in optionsCC" :key="item.aid" :label="item.uname" :value="item.aid">
                        </el-option>
                    </el-select>
                </div>
                <div class='studentReturnThreeNew'>
                    <el-cascader :options="options2" :props="propsource" v-model="value2" :show-all-levels="false" @change="updateList" clearable change-on-select placeholder="渠道来源">
                    </el-cascader>
                </div>
                <div class='studentReturnThreeN'>
                    <el-date-picker v-model="value3" type="daterange" placeholder="录入时间" @change="updateList">
                    </el-date-picker>
                </div>
                <div class='studentReturnThreeN'>
                    <el-date-picker v-model="value4" type="daterange" placeholder="最近联系时间" @change="updateList">
                    </el-date-picker>
                </div>
                <div class='studentReturnThreeNew'>
                    <el-select v-model="value5" clearable placeholder="客户状态" @change="updateList">
                        <el-option label="已认领" value="1"></el-option>
                        <el-option label="已邀约" value="2"></el-option>
                        <el-option label="已到访" value="3"></el-option>
                        <el-option label="未到访" value="4"></el-option>
                    </el-select>
                </div>
                <div class='studentReturnThreeNew'>
                    <el-select v-model="valueTag" clearable placeholder="沟通标签" @change="updateList">
                        <el-option v-for="item in backupTages" :key="item.key" :label="item.label" :value="item.key">
                        </el-option>
                    </el-select>
                </div>
                <div style="width:158px;display:inline-block;margin-left: 10px;margin-bottom: 10px;margin-right:110px">
                    <el-input placeholder="输入手机号或姓名" icon="search" v-model="input2" @keyup.enter.native="updateList" :on-icon-click="updateList" style='margin-right:10px'> </el-input>
                </div>
                <div style="position:absolute;right:10px;bottom:10px">
                    <el-button type="primary" size="mid" class='myresourceButton' @click="goToAdd">添加客户</el-button>
                </div>
            </div>
        </div>
        <div id="table" v-loading="loading2">
            <el-table :data="customerData" :default-sort="{prop: 'last_time', order: 'descending'}" border  style="width: 100%" >
                <el-table-column prop="names" label="学生" width="80">
                    <template scope="scope">
                        <span @click="switchDetail(scope.row)" class='nicknameSpan'>{{scope.row.names}}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="sex" label="性别" width='80'>
                </el-table-column>
                <el-table-column prop="age" label="年龄" width='80'>
                </el-table-column>
                <el-table-column prop="cc_name" label="CC" width='80'>
                </el-table-column>
                <el-table-column prop="soure_name" label="渠道来源">
                </el-table-column>
                <el-table-column prop="created" label="录入时间" sortable>
                </el-table-column>
                <el-table-column prop="last_time" label="最近联系时间" sortable>
                </el-table-column>
                <el-table-column prop="status" label="客户状态" column-key='status' width='80'>
                    <template scope="scope">
                        <span :style="scope.row.status=='已认领'? 'color:#dba31c' : scope.row.status=='已邀约'? 'color:#33c616' : scope.row.status=='已到访'? 'color:#4057e0':'color:rgb(232, 51, 20)' ">{{scope.row.status}}</span>
                    </template>
                </el-table-column>
                <el-table-column class-name='tagClass' prop="tags" label="沟通标签" width="250">
                    <template scope="scope">
                        <el-tag type="success" close-transition v-for='(t,key) in scope.row.tags' >{{t.title}}</el-tag>
                    </template>
                </el-table-column>
            </el-table>
            <div class='settingTag' v-if="code =='cc_m'">
                <span @click='settingTag'>[设置]</span>
            </div>
            <div class="block">
                <el-pagination layout="prev, pager, next" :total="total" :current-page="currentPage" :page-size="pagesize" @current-change="handleCurrentChange">
                </el-pagination>
            </div>
        </div>
        <el-dialog title="设置访问标签" :visible.sync="dialogFormVisible" :close-on-click-modal="no" show-close style='z-index:100' class='tagDialog'>
            <el-tag :key="tag" v-for="tag in dynamicTags" :closable="true" type="success" :close-transition="false" @close="handleClose(tag)">
                {{tag}}
            </el-tag>
            <el-input class="input-new-tag" v-if="inputVisible" v-model="inputValue" ref="saveTagInput" size="mini" @keyup.enter.native="handleInputConfirm" @blur="handleInputConfirm">
            </el-input>
            <el-button v-else class="button-new-tag" size="small" @click="showInput" sytle='margin-top:7px'>创建标签</el-button>
        </el-dialog>
    </div>
</template>
<script>
var token, user
import {
    getMyCustomerList,
    create_tag,
    delete_tag,
    getAllCCList,
    sourceList,
    getMyCustomerTag
} from '../../api/api';
export default {
    data() {
            return {
                loading2: true,
                dynamicTags: [], //动态替换
                backupTages: [],
                inputVisible: false,
                inputValue: '',
                dialogFormVisible: false,
                currentPage: 1, //页数
                pagesize: 15, //默认每页
                total: 0,
                no: false,
                customerData: [],
                number: 0,
                optionsCC: [], //表单上方的select
                options2: [], //表单上方的select
                valueCC: '', //对应select的值
                value2: [], //对应select的值
                value3: '', //对应select的值
                value4: '', //点击tag
                value5: '', //状态
                valueTag: '', //点击tag
                input2: '',
                code: '',
                propsource: {
                    value: 'id',
                    label: 'names',
                    children: '_child'
                },
            }
        },
        methods: {
            goToAdd() { //添加客户
                this.$router.push('/addCustomer');
            },
            switchDetail(row) { //点击名字进详细
                this.$router.push('/customerDetail' + '/' + row.id + '/' + row.status);
            },
            updateList() {
                this.currentPage = 1;
                this.fetchData();
            },
            fetchData() { //查询列表
                let para = {
                    page: this.currentPage,
                    cc_uid: this.valueCC,
                    sour_id: this.value2[this.value2.length-1],
                    create_start_time: this.value3[0] != null ? new Date(this.value3[0]).toLocaleDateString() : '',
                    create_end_time: this.value3[1] != null ? new Date(this.value3[1]).toLocaleDateString() : '',
                    last_start_time: this.value4[0] != null ? new Date(this.value4[0]).toLocaleDateString() : '',
                    last_end_time: this.value4[1] != null ? new Date(this.value4[1]).toLocaleDateString() : '',
                    status: this.value5,
                    input: this.input2,
                    tag_id: this.valueTag
                }

                getMyCustomerList(token, para).then((res) => { //重新获取列表
                    this.number = res.data.total;
                    let a = res.data.data;
                    let c = res.data.last_page * this.pagesize;
                    this.customerData = a;
                    this.total = parseInt(c);
                }).then(() => {
                    this.loading2 = false
                }).catch(() => {
                    this.$message.error('该用户未授权');
                    this.loading2 = false
                })
            },
            handleCurrentChange: function(val) { //改页数
                this.currentPage = val;
                this.fetchData();
            },
            settingTag() {
                //调服务获取tag[]
                
                this.dialogFormVisible = true
            },
            handleClose(tag) { //移除
                let index;
                this.backupTages.map(item => {
                    if (item.label === tag) {
                        index = item.key
                    }
                })
                let para = {
                    id: index
                }
                delete_tag(para, token).then(res => {
                        this.$message.success('删除成功')
                        getMyCustomerTag(token).then(res => {
                            this.dynamicTags = res.data.map(item => {
                                return item.label
                            })
                            this.backupTages = res.data
                        })
                    }).catch((res) => {
                        this.$message.error('该用户未授权')
                    })
            },

            showInput() { //点击创建标签
                this.inputVisible = true;
                this.$nextTick(_ => {
                    this.$refs.saveTagInput.$refs.input.focus();
                });
            },

            handleInputConfirm() { //添加标签
                let inputValue = this.inputValue;
                if (inputValue) {
                    let para = {
                        title: inputValue
                    }
                    create_tag(para, token).then(res => {
                            if (res.code == 0) {
                                this.$message.success('添加成功')
                                getMyCustomerTag(token).then(res => {
                                    this.dynamicTags = res.data.map(item => {
                                        return item.label
                                    })
                                    this.backupTages = res.data
                                })
                            } else {
                                this.$message.error(res.message)
                            }
                        }).catch(() => {
                            this.$message.error('添加失败')
                        })
                }
                this.inputVisible = false;
                this.inputValue = '';
            }
        },
        beforeCreate() {
            user = localStorage.getItem('user');
            token = JSON.parse(user).token;
        },
        created() {
            this.code = JSON.parse(user).job ? JSON.parse(user).job.code : '';
            this.fetchData();
            sourceList(token).then(res => {
                // let a = res.data.splice(0,1);
                this.options2 = res.data;

            }).then(()=>{

            getMyCustomerTag(token).then(res => {
                    this.dynamicTags = res.data.map(item => {
                        return item.label
                    })
                    this.backupTages = res.data
                })
            })
            if (this.code == 'cc_m') {
                getAllCCList(token).then((res) => {
                    this.optionsCC = res.data;
                    this.optionsCC.unshift({
                        aid: 0,
                        uname: '全部CC'
                    })
                })
            }
        },
        // mounted() {

        // },
        // watch: {
        //     // 如果路由有变化，会再次执行该方法
        //     // '$route' : 'fetchData'
        // }
}
</script>
<style>
#table {
    position: relative;
}

#table .el-table td,
#table .el-table th {
    padding: 5px 5px;
    text-align: center
}

#table .el-table th>div,
#table .el-table .cell {
    padding-left: 0;
    padding-right: 0;
}

.block {
    text-align: center;
    margin-top: 10px;
}

.nicknameSpan:hover {
    cursor: pointer;
}

.nicknameSpan {
    font-weight: 600;
}

.accouMyresourece {
    width: 100%;
    position: relative;
    height: auto;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    background-color: white;
    margin-top: 30px;
    padding-top: 10px;
    margin-bottom: 5px;
    border-radius: 5px;
}

.mydataReturn {
    margin-bottom: 15px;
    padding-left: 10px;
    width: 350px;
}

.studentReturnThreeNew {
    display: inline-block;
    width: 100px;
    /*margin-right: 10px;*/
    margin-bottom: 10px;
    margin-left: 10px
}
.studentReturnThreeN {
    display: inline-block;
    margin-left: 10px
}

.search1 {
    padding-left: 10px;
    margin: 0 10px 10px 0;
    /*align-self:flex-end;*/
}

.search1 .el-input {
    width: 158px;
}

.el-tag--success {
    background-color: #1fb5ad;
    border-color: #bcf1d4;
    color: #FFFFFF;
    border-radius: 25px;
}
/*
.el-tag--success:hover {
    cursor: pointer;
}*/

.el-tag--danger {
    border-radius: 25px;
}

.settingTag {
    position: absolute;
    top: 11px;
    right: 19px;
    color: #1fb5ad;
    z-index: 2000;
    font-size: 14px;
    background-color: #eef6f6;
    cursor: pointer;
}

.accouMyresourece .el-date-editor--daterange.el-input {
    width: 184px;
    font-size: 12px;
}
.el-dialog .el-dialog__header {
    background-color: #1fb5ad;
    padding: 20px 20px 20px;
}

.el-dialog .el-dialog__title {
    color: white;
}

.tagDialog .input-new-tag {
    width: 120px
}
</style>
