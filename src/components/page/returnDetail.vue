<template>
    <div class="tableReturn">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item ><i class="icon-tongxunlu iconfont"></i>学员回访</el-breadcrumb-item>
                <el-breadcrumb-item class='ss'>{{student.name}}</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div style='display:flex'>

            <div class="RDtitle">
                <div class='UserTitle'>
                        <i class="iconfont icon-tongxunlu1 fz25"></i>
                    <span class="RDinfo">用户资料</span>
                </div>
                <el-form ref="form" :model="form" label-width="102px" label-position='left' id='returnform'>
                    <el-form-item label="姓名:" prop='name'>
                        <span>{{student.name}}</span>
                    </el-form-item>
                    <el-form-item label="性别:" prop='sex'>
                        <span>{{student.sex}}</span>
                    </el-form-item>
                    <el-form-item label="年龄:" prop='age'>
                        <span>{{student.age}}</span>
                    </el-form-item>
                    <el-form-item label="家长:" prop='parent'>
                        <span style='width:120px;float:left'>{{student.parent}}</span>
                        <el-col :span="11">
                            <span>{{student.parent_phone}}</span>
                        </el-col>
                    </el-form-item>
                    <el-form-item label="" v-if='student.second_family'>
                        <span style='width:120px;float:left'>{{student.parent1}}</span>
                        <el-col :span="11">
                            <span>{{student.parent1_phone}}</span>
                        </el-col>
                    </el-form-item>
                    <el-form-item label="渠道来源:" prop='channel'>
                        <span>{{student.channel}}</span>
                    </el-form-item>
                    <el-form-item label="校区:" prop='school'>
                        <span>{{student.school}}</span>
                    </el-form-item>
                    <el-form-item label="录入时间:" prop='time'>
                        <span>{{student.time}}</span>
                    </el-form-item>
                    <el-form-item label="CC:" prop='teacher'>
                        <span>{{student.teacher}}</span>
                    </el-form-item>
                </el-form>
            </div>
            <div class="RD1">
                <div class='addreturnTitle'>
                     <i class="iconfont icon-shangchuanmoban fz40"></i>
                    <span class="RD2">回访记录({{number}})</span>
                    <div class="RD3">
                        <div class='addR' @click='addReturn' v-if="!code.includes('readonly')"><i class='iconfont icon-group-add fz30 fzh'></i></div>
                    </div>
                </div>
                <div class="RD4">
                    <el-row v-for='item in items' class='RD5'>
                        <el-col :span="4" class="RDright">
                            <img :src="item.tmk.avatar" width='50' height='50' alt="" class="RDimg"></el-col>
                        <el-col :span="20">
                            <div class="RD35">
                                <div class="RD6">{{item.tmk.uname}}</div>
                                <div class="RDcre">{{item.created_at.substring(5,16)}}</div>
                            </div>
                            <div class="RDb5">
                                <div class="RDgrey">{{item.contents}}</div>
                            </div>
                            <div>
                                <div class="RD7">
                                    <el-tag type='success' v-for='t in item.tags' class='tagTag'>{{t}}</el-tag>
                                </div>
                                <div class='editSpan' @click='editReturn(item.id,item)' v-if="new Date().getTime()-new Date(item.created_at).getTime()<7200000 && item.tmk.uname == userName">
                                        <i class="iconfont icon-icon07 fz30 fzh fgrey"></i>
                                </div>
                            </div>
                        </el-col>
                    </el-row>
                </div>
                <div class="block">
                    <el-pagination layout="prev, pager, next" :total="total" :current-page="currentPage" :page-size="pagesize" @current-change="handleCurrentChange">
                    </el-pagination>
                </div>
            </div>
        </div>
        <el-dialog :title="returnRecordTitle" :visible.sync="dialogFormVisible" :close-on-click-modal="no" show-close style='z-index:100;'
            class='tagDialog' @close="resetD('form')">
            <el-form :model="returnform" id='detailForm' :rules='rulereturnform' ref="returnform">
                <el-form-item label="" prop='contents'>
                    <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}" placeholder="请输入内容(100字以内)" v-model="returnform.contents">
                    </el-input>
                </el-form-item>
                <el-form-item label="回访标签：" style='margin-top:10px'>
                    <br>
                    <el-checkbox-group v-model="returnform.tags">
                        <el-checkbox v-for="box in boxes" :label="box.key" :value='box.key'>
                            <el-tag type='success'>{{box.label}}</el-tag>
                        </el-checkbox>
                    </el-checkbox-group>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" :loading='writeL' @click="returnFormSubmit('returnform')">确 定</el-button>
                <el-button @click="dialogFormVisible = false">取 消</el-button>
            </div>
        </el-dialog>
    </div>
</template>
<script>
    var token, user
    import {
        tagList,
        create_returnList,
        returnVisitDetail,
        put_returnList,
        getVisitList
    } from '../../api/api';
    // import {
    //     mapGetters
    // } from 'vuex';

    export default {
        data() {
            var isSpace = (rule, value, callback) => {
                var myreg = /^.{1,100}$/;
                var myreg1 = /^\s/;
                
                if (myreg1.test(value)) {
                    callback('请输入有效内容')
                } else if (!myreg.test(value)) {
                    callback('内容不得超过100字');
                } else {
                    callback();
                }
            }
            return {
                writeL:false,
                student: {
                    name: '',
                    sex: '',
                    age: '',
                    parent: '',
                    parent_phone: '',
                    parent1: '',
                    parent1_phone: '',
                    channel: '',
                    school: '',
                    time: '',
                    teacher: ''
                },
                items: [],
                dialogFormVisible: false,
                no: false,
                number: '0',
                warning: '*系统中没有该成员', //以后改成调服务显示
                boxes: [],
                returnform: {
                    contents: '',
                    tags: []
                },
                rulereturnform: {
                    contents: [{
                        required: true,
                        validator: isSpace,
                        // message: '请输入内容',
                        trigger: 'blur'
                    }],
                },
                form: {
                    name: '',
                    sex: '',
                    parent: '',
                    parent1: '',
                    con: '',
                    con1: '',
                    phone: '',
                    phone1: '',
                    city: '',
                    region: '',
                    add: '',
                    school: '',
                    channel: '',
                    referee: ''
                },
                currentPage: 1, //页数
                pagesize: 4, //默认每页
                total: 0, //总页数
                in: '',
                userName: '',
                code:''

            }
        },
        methods: {
            resetD(formName) {
                this.in = '';
                this.returnform.contents = '';
                this.returnform.tags = [];
                this.returnform.id = ''
                this.$refs[formName].resetFields();

            },
            returnFormSubmit(formName) {
                this.$refs[formName].validate((valid) => { //替换提交服务
                    if (valid) {
                        this.returnform.uid = this.$route.params.post;
                        this.writeL = true;
                        //可能要送 用户名
                        if (this.in) {
                            put_returnList(this.returnform, token).then((res) => {
                                if (res.code == 0) {

                                    this.$message.success('修改成功')
                                    let p = {
                                        page: '1',
                                        uid: this.$route.params.post
                                    }
                                    getVisitList(token, p).then(res => {
                                        this.number = res.data.total;
                                        this.items = res.data.data;
                                        let c = res.data.last_page * this.pagesize;
                                        this.total = parseInt(c);
                                    })
                                    this.currentPage = 1;
                                    this.dialogFormVisible = false;
                                    this.writeL = false;
                                } else {
                                    this.$message.error(res.data);
                                    this.writeL = false;
                                }
                            }).catch(() => {
                                // this.$message.error('该用户未授权');
                                // this.dialogFormVisible = false;
                                this.writeL = false;
                            })
                        } else {
                            create_returnList(this.returnform, token).then((res) => {
                                if (res.code == 0) {
                                    this.$message.success('添加成功')
                                    let p = {
                                        page: '1',
                                        uid: this.$route.params.post
                                    }
                                    getVisitList(token, p).then(res => {
                                        this.number = res.data.total;
                                        this.items = res.data.data;
                                        let c = res.data.last_page * this.pagesize;
                                        this.total = parseInt(c);
                                    })
                                    this.currentPage = 1;
                                    this.dialogFormVisible = false;
                                    this.writeL = false;

                                } else {
                                    this.$message.error(res.data);
                                    this.writeL = false;
                                }
                            }).catch(() => {
                                // this.$message.error('该用户未授权');
                                // this.dialogFormVisible = false;
                                this.writeL = false;
                            })
                        }
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });



            },
            addReturn() { //点击添加回访记录
                // console.log(this.getUserId)

                let para = {
                    type: 'tmk'
                }
                tagList(token, para).then(res => {
                    this.boxes = res.data
                })
                this.dialogFormVisible = true
            },

            editReturn(index, item) {
                this.in = 1;
                this.returnform.id = item.id;
                this.returnform.contents = item.contents;
                let para = {
                    type: 'tmk'
                }
                tagList(token, para).then(res => {
                    this.boxes = res.data;
                    if (item.tags && item.tags.length != 0) {

                        this.returnform.tags = Object.keys(item.tags)
                    }
                    // this.boxes.map(v => {
                    //     for (let key in item.tags) {
                    //         if (v.key == key) {
                    //             this.returnform.tags.push(v.key)
                    //         }
                    //     }
                    // })
                }).then(() => {
                    this.dialogFormVisible = true
                })




            },
            handleCurrentChange: function (val) { //变更页数
                this.currentPage = val;this.backToTop();
                let p = {
                    page: this.currentPage,
                    uid: this.$route.params.post
                }
                getVisitList(token, p).then(res => {
                    this.number = res.data.total;
                    this.items = res.data.data;
                    // console.log(this.items)
                    let c = res.data.last_page * this.pagesize;
                    this.total = parseInt(c);
                })

            },
        },
        computed: {
            returnRecordTitle() {
                if (this.in === '') {
                    return '添加回访记录'
                } else {

                    return '修改回访记录'
                }

            },
            // ...mapGetters([
            //     'getUserId'

            //     // ...
            // ]),
        },
        beforeCreate() {
            user = sessionStorage.getItem('user');
            token = JSON.parse(user).token;

        },
        created() {
            this.code = JSON.parse(user).job ? JSON.parse(user).job.code : '';
            this.userName = JSON.parse(user).uname;
            let para = {
                uid: this.$route.params.post
            }
            returnVisitDetail(token, para).then(res => {

                let {
                    nickname,
                    age,
                    sex,
                    source_name,
                    school_name,
                    regtime,
                    cc_name
                } = res.data.info;
                this.student = {
                    name: nickname,
                    age: age,
                    sex: sex,
                    school: school_name,
                    channel: source_name,
                    time: regtime,
                    parent: res.data.famliys[0] ? res.data.famliys[0].uname + '(' + res.data.famliys[0].relation +
                        ') ' : '',
                    parent_phone: res.data.famliys[0] ? res.data.famliys[0].mobile : '',
                    parent1: res.data.famliys[1] ? res.data.famliys[1].uname + ' (' + res.data.famliys[1].relation +
                        ') ' : '',
                    parent1_phone: res.data.famliys[1] ? res.data.famliys[1].mobile : '',
                    teacher: cc_name,
                    second_family: res.data.famliys[1]?res.data.famliys[1].uname?res.data.famliys[1].uname:'':''

                }
                // this.items = res.data.visits
            })
            let p = {
                page: this.currentPage,
                uid: this.$route.params.post
            }
            getVisitList(token, p).then(res => {
                this.number = res.data.total;
                this.items = res.data.data;
                let c = res.data.last_page * this.pagesize;
                this.total = parseInt(c);
            })
            // cityList(token).then((res)=>{
            //     // console.log(res)
            //     this.cities = res.data
            //   })
        }
    }

</script>
<style>
    .tableReturn .UserTitle {
        padding: 10px;
        position: relative;
        /* background: url(../../../static/img/contact.png) left center/25px no-repeat; */
        /* padding-left: 27px; */
        /* margin-left: 12px; */
        display: flex;
    }
.fz25{
    font-size: 25px;
    line-height: 29px;
}

    .tableReturn .addreturnTitle {
        padding: 10px;
        position: relative;
        display: flex;
        border-bottom: 1px solid gainsboro;
        /* background: url(../../../static/img/custService.png) left center/40px no-repeat; */
        /* padding-left: 40px; */
        /* margin-left: 12px */
    }
.fz40{
    font-size: 40px;
    line-height: 29px;
}
.fz30{
    font-size:30px;
    line-height: 29px;
}
    .tagDialog .el-dialog .el-dialog__header {
        background-color: #1fb5ad;
        padding: 20px 20px 20px;
    }

    .tagDialog .el-dialog .el-dialog__title {
        color: white;
    }

    #returnform {
        border-top: 1px solid #e8e8e8;
        padding-left: 10px
    }

    #returnform .el-form-item {
        margin-bottom: 18px
    }

    #returnform .el-form-item__label {
        padding: 8px 12px 5px 0;
    }

    #returnform .el-form-item__content {
        line-height: 30px
    }

    .RD5 {
        position: relative;
        border-bottom: 1px solid #e8e8e8;
    }

    .tableReturn .el-tag--success {
        background-color: #1fb5ad;
        border-color: #bcf1d4;
        color: #FFFFFF;
        border-radius: 25px;
    }


    .tableReturn .editSpan {
        width: 30px;
        float: right;
        height: 30px;
        /* background: url(../../../static/img/edit.png) right/30px 30px no-repeat; */
        cursor: pointer;
    }

    /* .tableReturn .editSpan:hover {
        background-image: url(../../../static/img/edit_h.png);
    } */

    .tableReturn .addR {
        width: 30px;
        height: 30px;
        /* background-image: url(../../../static/img/addR.png); */
        /* background-size: 30px 30px; */
        cursor: pointer;
    }

    /* .tableReturn .addR:hover {
        background-image: url(../../../static/img/addR_h.png);
    } */

    .tableReturn .block {
        text-align: center;
        position: absolute;
        bottom: 0;
        width: 100%;
    }

    #detailForm .el-form-item .el-form-item__content .el-checkbox {
        margin-left: 15px
    }

    .RDtitle {
        float: left;
        width: 33%;
        background-color: white;
        /* min-height: 476px; */
        border-radius: 5px;
        margin-right: 1%
    }

    .RDinfo {
        font-weight: 600;
        font-size: 22px
    }

    .RD1 {
        float: left;
        width: 34%;
        background-color: white;
        border-radius: 5px;
        margin-right: 30px;
        /* min-height: 476px; */
        /* height: auto; */
        position: relative;
        padding-bottom:10px;
    }

    .RD2 {
        font-weight: 600;
        font-size: 22px
    }

    .RD3 {
        position: absolute;
        top: 10px;
        right: 10px
    }

    .RD4 {
        min-height: 290px;
        width: 90%;
        margin: 0 auto;
       
        padding-bottom:30px;
    }

    .RDright {
        text-align: right
    }

    .RDimg {
        border-radius: 50%;
        margin-top: 10px;
        margin-right: 12%;
        border:1px solid gainsboro;
    }

    .RD35 {
        height: 35px
    }

    .RD6 {
        margin-top: 10px;
        float: left
    }

    .RDcre {
        font-size: 15px;
        color: grey;
        margin-top: 10px;
        margin-bottom: 5px;
        float: right
    }

    .RDb5 {
        margin-bottom: 5px
    }

    .RDgrey {
        font-size: 14px;
        color: grey
    }

    .RD7 {
        float: left;
        margin-bottom: 8px
    }
    .fzh:hover{
        color: #1fb5ad
    }
    .fgrey{
        color: #cacaca
    }
</style>
