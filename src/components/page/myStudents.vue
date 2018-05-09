<template>
    <div>
        <!-- <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-my-gerenxinxi"></i> 学员合同</el-breadcrumb-item>
                <el-breadcrumb-item class='ss'>我的学员</el-breadcrumb-item>
            </el-breadcrumb>
        </div> -->
        <div class='accouMyStudents'>
            <h3 class="myMSReturn">
                学员
                <span v-if="number==='0'" style="font-size:14px;color: #bdb8b8;">加载中...</span>
               <span v-else>({{number}}人)</span>
            </h3>
            <div class="MStitle">
                <div class='studentReturnThreeNewMS' v-if="code.includes('_c')">
                    <el-select v-model="valueR"  placeholder="选择校区" @change="updateListCC">
                        <el-option v-for="item in optionR" :key="item.id" :label="item.title" :value="item.id">
                        </el-option>
                    </el-select>
                </div>

                <div class='studentReturnThreeNewMS' v-if="code.includes('cc_m')||code.includes('_c_c')||code.includes('_cr_c')">
                    <el-select v-model="valueCC" placeholder="选择CC" @change="updateList">
                        <el-option v-for="item in optionsCC" :key="item.aid" :label="item.uname" :value="item.aid">
                        </el-option>
                    </el-select>
                </div>
                <div class='studentReturnThreeNewMS'>
                    <!-- <el-date-picker v-model="value" type="month" placeholder="生日月份" @change="updateList">
                    </el-date-picker> -->
                    <el-select v-model="value" clearable placeholder="生日月份" @change="updateList">
                            <el-option label="1月" value="1"></el-option>
                            <el-option label="2月" value="2"></el-option>
                            <el-option label="3月" value="3"></el-option>
                            <el-option label="4月" value="4"></el-option>
                            <el-option label="5月" value="5"></el-option>
                            <el-option label="6月" value="6"></el-option>
                            <el-option label="7月" value="7"></el-option>
                            <el-option label="8月" value="8"></el-option>
                            <el-option label="9月" value="9"></el-option>
                            <el-option label="10月" value="10"></el-option>
                            <el-option label="11月" value="11"></el-option>
                            <el-option label="12月" value="12"></el-option>
                        </el-select>
                </div>
                <div class='studentReturnThreeNewMS'>
                    <el-select v-model="value1" clearable filterable placeholder="课程名称" @change="updateList">
                        <el-option v-for="item in classkind" :key="item.kcid" :label="item.title" :value="item.kcid">
                        </el-option>
                    </el-select>
                </div>
                <div class='studentReturnThreeNewMS'>
                    <el-select v-model="value3" clearable placeholder="剩余课时" @change="updateList">
                        <el-option label="6节以下" value="1"></el-option>
                        <el-option label="6节至12节" value="2"></el-option>
                        <el-option label="12节至24节" value="3"></el-option>
                        <el-option label="24节以上" value="4"></el-option>
                    </el-select>
                </div>
                <div class='studentReturnThreeNewMS'>
                    <el-select v-model="value5" clearable placeholder="排班状态" @change="updateList">
                        <el-option label="已排班" value="1"></el-option>
                        <el-option label="未排班" value="0"></el-option>
                    </el-select>
                </div>
                <div class='studentReturnThreeNewMS'>
                    <el-select v-model="value6" clearable placeholder="使用状态" @change="updateList">
                        <el-option label="正常" value="1"></el-option>
                        <el-option label="冻结" value="2"></el-option>
                        <el-option label="过期" value="3"></el-option>
                        <el-option label="已结束" value="4"></el-option>
                    </el-select>
                </div>
                <!-- <div class='studentReturnThreeNewMS'>
                    <el-select v-model="valueTag" clearable filterable placeholder="标签类型" @change="updateList">
                        <el-option v-for="item in backupTages" :key="item.key" :label="item.label" :value="item.key">
                        </el-option>
                    </el-select>
                </div> -->
                <div class="MSinput">
                    <el-input placeholder="输入手机号或姓名" icon="search" v-model="input2" @keyup.enter.native="updateList" :on-icon-click="updateList">
                    </el-input>
                </div>
                <!-- <div style="margin-left:10px;margin-right:5px;" v-if='!code.includes("_c")' >
                    <el-button type="primary" size="mid" class='myresourceButton' @click="settingTag" v-if="code=='cc_m'">创建标签</el-button>
                </div> -->
            </div>
        </div>
        <div id="table1MS" v-loading="loading2">
            <div v-for="item in customerData" class='customerDataDiv' v-if='customerData.length!=0'>
                <div class='customerDiv'>
                    <div @click='gotoDetail(item)' class='myStudentsSpan'>
                        <img :src="item.head_img" width='35' height='35' alt="" class="MSradius">
                        <div class="MSname">{{item.child_name}}</div>
                    </div>
                    <div class="MSgrey">出生日期: {{item.birthday}}</div>
                </div>
                <div class="MStable">
                    <el-table :data="item.order_item" border style="width: 100%;" row-class-name='tableheight'>
                        <el-table-column prop="title" label="课程" width='237'>
                        </el-table-column>
                        <el-table-column prop="year_num" label="课时" width='107'>
                        </el-table-column>
                        <el-table-column prop="course_curr_num" label="剩余课时" width='107'>
                        </el-table-column>
                        <el-table-column prop="attend" label="上课时间">
                        </el-table-column>
                        <el-table-column prop="over_time" label="有效期">
                            <template scope="scope">
                                <span>{{scope.row.first_time}}~{{scope.row.over_time}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column prop="status" label="使用状态" column-key='status' width='107'>
                            <template scope="scope">
                                <span :style="scope.row.status=='正常'? 'color:black' : scope.row.status=='冻结'? 'color:#50bfff':'color:#dba31c' ">{{scope.row.status}}</span>
                            </template>
                        </el-table-column>
                    </el-table>
                    <!-- <div style="width:40%;display:flex;flex-direction:column">
                        <div class='tableReturn'>
                            <div class='tableReturnDiv140 tableReturnDiv2'>最近回访时间</div>
                            <div class='tableReturnDiv2 tableReturnDiv2Auto'>回访标签</div>
                        </div>
                        <div class='tableItem'>
                            <div class='tableItemLast'>{{item.last_time}}</div>
                            <div class='tableItemTag'>
                                <el-tag type='success' close-transition v-for='(t,key) in item.tags' @click.native='aaa(t,key)' style='margin-top:2px;margin-bottom:2px'>{{t.title}}</el-tag>
                            </div>
                        </div>
                    </div> v-model="activeName"-->
                </div>
                <el-collapse accordion id='studentColl' v-if='item.visit_lists.length!=0'>
                    <el-collapse-item name="1">
                        <template slot="title">
                            <span class="MSreturn">最近回访记录</span>
                            <span class="MSpadding">回访标签:</span>
                            <el-tag type='success' close-transition v-if='item.tags.length!=0' v-for='(t,key) in item.tags' @click.native='aaa(t,key)'
                                class="MStag">{{t.title}}</el-tag>
                            <span v-if='item.tags.length==0'>暂无标签</span>
                        </template>
                        <div v-if='item.visit_lists.length!=0' v-for='(i,index) in item.visit_lists' class="MSlist">
                            <span class="MS30">{{index+1}}.</span>
                            <span class="MScontent">"{{i.contents}}"</span>
                            <span class="MScre">{{i.created_at}}</span>
                        </div>
                        <!-- <div v-if='item.visit_lists.length==0' style="text-align:center;margin-top:5px">暂无记录</div> -->
                    </el-collapse-item>
                </el-collapse>

            </div>
            <div v-if="customerData.length==0">
                <el-table :show-header='no'>
                </el-table>
            </div>
        </div>
        <div class="block">
            <el-pagination layout="prev, pager, next" :total="total" :current-page="currentPage" :page-size="pagesize" @current-change="handleCurrentChange">
            </el-pagination>
        </div>
        <!-- <el-dialog title="设置访问标签" :visible.sync="dialogFormVisible" :close-on-click-modal="no" show-close style='z-index:100' class='tagDialog'>
            <el-tag :key="tag" v-for="tag in dynamicTags" :closable="true" type="success" :close-transition="false" @close="handleClose(tag)">
                {{tag}}
            </el-tag>
            <el-input class="input-new-tag" v-if="inputVisible" v-model="inputValue" ref="saveTagInput" size="mini" @keyup.enter.native="handleInputConfirm"
                @blur="handleInputConfirm">
            </el-input>
            <el-button v-else class="button-new-tag" size="small" @click="showInput" sytle='margin-top:7px'>创建标签</el-button>
        </el-dialog> -->
    </div>
</template>
<script>
    var token, user
    import {
        getMyStudent,
        // tagList,
        // create_tag,
        // delete_tag,
        getAllCCList,
        getClassKind,
        getClassLibrary,
        campusList
    } from '../../api/api';
    import {
        mapActions,
        mapGetters
    } from 'vuex';
    export default {
        data() {
            return {
                valueR: '',
                optionR: [],
                // activeName: '1',
                classkind: [],
                loading2: true,
                // dynamicTags: [], //动态替换
                // backupTages: [],
                // inputVisible: false,
                // inputValue: '',
                // dialogFormVisible: false,
                input2: '',
                currentPage: 1, //页数
                pagesize: 15, //默认每页
                total: 0,
                no: false,
                customerData: [],
                number: '0',
                optionsCC: [], //表单上方的select
                valueCC: '', //对应select的值
                value: '',
                value1: '',
                value3: '', //对应select的值
                value5: '', //状态
                value6: '',
                valueTag: '', //点击tag
                code: '',
            }
        },
        methods: {
            gotoDetail(row) {
                let d = {
                    school_id: this.valueR,
                    page: this.currentPage,
                    cc_uid: this.valueCC,
                    birthday: this.value,
                    kcid: this.value1,
                    course_curr_num: this.value3, //剩余课时
                    scheduling_status: this.value5, //排班状态
                    status: this.value6, //使用状态
                    optionsCC : this.optionsCC,
                    optionR : this.optionR
                }
                this.setmyStudentS(d)
                this.$router.push('/studentDetail/' + row.uid);
            },
            updateList() {
                this.currentPage = 1;
                this.fetchData();
            },
            updateListCC() {
                this.currentPage = 1;
                // this.valueCC = '';
                if (this.valueR != '') {
                    let para = {
                    school_id: this.valueR
                }
                getAllCCList(token, para).then((res) => {
                    this.optionsCC = res.data;
                    this.optionsCC.unshift({
                        aid: 0,
                        uname: '全部CC'
                    })
                }).then(()=>{
                    if( this.valueCC===0){
                    this.updateList()
                    }else{
                        this.valueCC=0
                    }
                    })
                }else{
                    if(this.valueCC=== 0){//cc选择
                    this.updateList()
                    }
                    this.optionsCC=[{
                        aid: 0,
                        uname: '全部CC'
                    }]
                    this.valueCC= 0;
                }
            },
            ...mapActions([
                'setmyStudentS'
            ]),
            fetchData() {
                if (Object.keys(this.getmyStudentS).length != 0) {
                    this.valueR = this.getmyStudentS.school_id;
                    this.currentPage = this.getmyStudentS.page;
                    this.valueCC = this.getmyStudentS.cc_uid;
                    this.value = this.getmyStudentS.birthday;
                    this.value1 = this.getmyStudentS.kcid;
                    this.value3 = this.getmyStudentS.course_curr_num;
                    this.value5 = this.getmyStudentS.scheduling_status;
                    this.value6 = this.getmyStudentS.status;
                    this.optionsCC = this.getmyStudentS.optionsCC;
                    this.optionR = this.getmyStudentS.optionR
                }

                let para = {
                    school_id: this.valueR,
                    page: this.currentPage,
                    cc_uid: this.valueCC,
                    birthday: this.value,
                    kcid: this.value1,
                    course_curr_num: this.value3, //剩余课时
                    scheduling_status: this.value5, //排版状态
                    status: this.value6, //使用状态
                    input: this.input2,
                    // tag_id: this.valueTag
                }
                getMyStudent(token, para).then((res) => { //替换服务
                    this.number = res.data.total;
                    let a = res.data.data;
                    let c = res.data.last_page * this.pagesize;
                    // console.log(a)
                    this.customerData = a;
                    this.total = parseInt(c);
                }).then(() => {
                    this.loading2 = false;
                    this.setmyStudentS({})
                }).catch(() => {
                    // this.$message.error('该用户未授权');
                    this.loading2 = false
                })
            },
            handleCurrentChange: function (val) {
                this.currentPage = val;this.backToTop();
                this.fetchData();
            },
            // settingTag() {
            //     //调服务获取tag[]
            //     tagList(token).then(res => {
            //         this.dynamicTags = res.data.map(item => {
            //             return item.label
            //         })
            //         this.backupTages = res.data
            //     })
            //     this.dialogFormVisible = true
            // },
            // handleClose(tag) {//移除
            //     let index;
            //     this.backupTages.map(item => {
            //         if (item.label === tag) {
            //             index = item.key
            //         }
            //     })
            //     let para = {
            //         id: index
            //     }
            //     delete_tag(para, token).then(res => {
            //         this.$message.success('删除成功')
            //         tagList(token).then(res => {
            //             this.dynamicTags = res.data.map(item => {
            //                 return item.label
            //             })
            //             this.backupTages = res.data
            //         })
            //     }).catch((res) => {
            //         this.$message.error('该用户未授权')
            //     })
            // },
            // showInput() {
            //     this.inputVisible = true;
            //     this.$nextTick(_ => {
            //         this.$refs.saveTagInput.$refs.input.focus();
            //     });
            // },
            // handleInputConfirm() {
            //     let inputValue = this.inputValue;
            //     if (inputValue) {
            //         let para = {
            //             title: inputValue
            //         }
            //         create_tag(para, token).then(res => {
            //             if (res.code == 0) {
            //                 this.$message.success('添加成功')
            //                 tagList(token).then(res => {
            //                     this.dynamicTags = res.data.map(item => {
            //                         return item.label
            //                     })
            //                     this.backupTages = res.data
            //                 })
            //             }
            //         }).catch(() => {
            //             this.$message.error('添加失败')
            //         })
            //     }
            //     this.inputVisible = false;
            //     this.inputValue = '';
            // }
        },
        beforeCreate() {
            user = sessionStorage.getItem('user');
            token = JSON.parse(user).token;
        },
        created() {
            this.code = JSON.parse(user).job ? JSON.parse(user).job.code : '';

            if (Object.keys(this.getmyStudentS).length == 0) {
                if (this.code.includes('_c')) {//经理以上
                    let cam = {
                        simple: 1
                    }
                    campusList(cam, token).then((res) => {//获取校区
                        this.optionR = res.data
                    this.optionR.unshift({
                            id:0,
                            title:'全部校区'
                        })
                    }).then(()=>{
                        this.valueR=0;
                        this.fetchData();
                    })
                    // this.fetchData();
                }else if(this.code.includes('cc_m')){
                    getAllCCList(token).then((res) => {
                        this.optionsCC = res.data;
                        this.optionsCC.unshift({
                            aid: 0,
                            uname: '全部CC'
                        })
                    }).then(()=>{
                        this.valueCC = JSON.parse(user).aid

                    })
                }else{
                    this.fetchData();
                }
            }else{
                this.fetchData();
            }
            let si = {
                simple: 1,
            }
            getClassLibrary(token, si).then((res) => {//获取课程名称
                this.classkind = res.data
            })

        },
        computed: {
            ...mapGetters([
                'getmyStudentS'
                // ...
            ])
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
    #table1MS {
        position: relative;
    }

    /* #table1MS .el-table td,
    #table1MS .el-table th:not(.gutter) {
        padding: 5px 5px;
        text-align: center
    }

    #table1MS .el-table th>div,
    #table1MS .el-table .cell {
        padding-left: 0;
        padding-right: 0;
        font-weight: normal;
    } */
    #table1MS .el-table th>div,
    #table1MS .el-table .cell {
        font-weight: normal;
    }
    .block {
        text-align: center;
        margin-top: 10px;
    }

    .accouMyStudents {
        width: 100%;
        position: relative;
        height: auto;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        background-color: white;
        /* margin-top: 10px; */
        padding-top: 10px;
        margin-bottom: 5px;
        border-radius: 5px;
    }

    .myMSReturn {
        /*display: block;*/
        margin-top: 5px;
        margin-bottom: 15px;
        padding-left: 10px;
        width: 350px;
        /*
            margin-right:70%;*/
    }

    .studentReturnThreeNewMS {
        display: inline-block;
        width: 103px;
        /*margin-right: 10px;*/
        margin-bottom: 10px;
        margin-left: 10px;
    }

    .mystudentSelect {
        display: inline-block;
        margin-left: 10px
    }

    .mystudentSelect .el-date-editor.el-input {
        width: 103px;
    }

    .el-tag--success {
        background-color: #1fb5ad;
        border-color: #bcf1d4;
        color: #FFFFFF;
        border-radius: 25px;
    }
    /*.el-tag--success:hover {
            cursor: pointer;
        }*/
    /* .tagDialog .el-tag--success {
        background-color: #1fb5ad;
        border-color: #bcf1d4;
        color: #FFFFFF;
        border-radius: 25px;
        margin-bottom: 11px
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
    } */
    /*.accouMyStudents .el-date-editor--daterange.el-input {
            width: 184px;
        }*/
    /*#table1MS .el-table th:nth-last-child(2){
          text-align: left
        }*/
    /* .el-dialog .el-dialog__header {
        background-color: #1fb5ad;
        padding: 20px 20px 20px;
    }

    .el-dialog .el-dialog__title {
        color: white;
    }

    .tagDialog .input-new-tag {
        width: 120px
    } */
    /*
        .remainClass .el-input__inner:hover {
            cursor: pointer;
        }
        .displaynone{
            display: none;
        }*/

    .myStudentsSpan {
        display: flex;
        align-items: center;
        margin-left: 10px;
    }

    .myStudentsSpan:hover {
        cursor: pointer;
    }
    /* .tableheight {
        height: 58px;
    } */

    .customerDataDiv {
        background: white;
        margin-bottom: 20px;
    }

    .customerDiv {
        display: flex;
        justify-content: space-between;
        height: 42px;
        line-height: 42px;
        border: 1px solid rgb(223, 236, 235);
        border-bottom: none;
        background: #fafafa
    }
    /* .tableReturn {
        height: 40px;
        line-height: 40px;
        display: flex;
        justify-content: space-around;
        border: 1px solid rgb(223, 236, 235);
        border-left: none;
        font-size: 14px;
    }

    .tableReturnDiv140 {
        flex: 0 0 140px;
        border-right: 1px solid rgb(223, 236, 235);
    }

    .tableReturnDiv2 {
        text-align: center;
        background: rgb(238, 246, 246);
        color: rgb(31, 61, 60);
        font-weight: bold;
    }

    .tableReturnDiv2Auto {
        flex: auto;
    } */
    /* .tableItem {
        display: flex;
        justify-content: space-around;
        flex: auto;
        align-items: stretch;
        border-right: 1px solid rgb(223, 236, 235);
        border-bottom: 1px solid rgb(223, 236, 235);
    }

    .tableItemLast {
        border-right: 1px solid rgb(223, 236, 235);
        flex: 0 0 140px;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 14px;
    }

    .tableItemTag {
        flex: auto;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-wrap: wrap;
        min-height: 56px;
        height: auto;
    } */

    #studentColl .el-collapse-item__content {
        padding: 0 15px 5px
    }

    .MStitle {
        display: flex;
        flex-wrap: wrap
    }

    .MSinput {
        width: 200px;
        display: inline-block;
        margin-left: 10px;
        margin-bottom: 10px;
        margin-right: 10px
    }

    .MSradius {
        border-radius: 50%;
        border: 1px solid gainsboro
    }

    .MSname {
        color: #1fb5ad;
        font-size: 18px;
        /* font-weight: bold; */
        margin-left: 10px
    }

    .MSgrey {
        margin-right: 10px;
        color: grey
    }

    .MStable {
        display: flex;
        justify-content: space-between;
    }

    .MSreturn {
        font-weight: bold;
        font-size: 16px;
        padding-right: 5px;
        border-right: 1px solid gainsboro
    }

    .MSpadding {
        padding-left: 3px;
    }

    .MStag {
        margin-top: 2px;
        margin-bottom: 2px
    }

    .MSlist {
        min-height: 30px;
        display: flex;
        border-bottom: 1px solid rgb(223, 236, 235);
        justify-content: space-between;
        align-items: center;
    }

    .MS30 {
        margin-left: 30px;
    }

    .MScontent {
        margin-left: 10px;
        font-size: 15px;
        flex: auto
    }

    .MScre {
        margin-right: 10px;
        color: #a5a0a0;
        flex: 0 0 125px
    }

</style>
