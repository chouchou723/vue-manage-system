<template>
    <div class='classLibrary'>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-my-yoncheguanli"></i> 熊猫到家</el-breadcrumb-item>
                <el-breadcrumb-item class='ss'>订单管理</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class='accou'>
            <div class="h1">
                <h3 class='accountH2'>
                    订单管理({{number}})
                </h3>
                <div class='oneSelectOM'>
                    <el-select v-model="value1" clearable placeholder="全部订单" @change="updateList">
                        <el-option label="全部订单" value="1"></el-option>
                        <el-option label="学员订单" value="2"></el-option>
                        <el-option label="手工订单" value="3"></el-option>
                    </el-select>
                </div>
                <div class='oneSelectOM'>
                    <el-select v-model="value2" clearable placeholder="产品级别" @change="updateList">
                        <el-option label="3+" value="1"></el-option>
                        <el-option label="5+" value="2"></el-option>
                    </el-select>
                </div>
                <div class='oneSelectOM'>
                    <el-select v-model="value3" clearable placeholder="地址完整情况" @change="updateList">
                        <el-option label="完整" value="1"></el-option>
                        <el-option label="不完整" value="2"></el-option>
                    </el-select>
                </div>
                <div style="float:right;width:200px;margin-bottom: 10px;margin-right:5px">
                    <el-input placeholder="输入手机号或姓名" icon="search" v-model="input2" @keyup.enter.native="updateList" :on-icon-click="updateList"
                        style='margin-right:10px'> </el-input>
                </div>
                <el-button type="primary" size="mid" class='buttonAdd' @click="createCh('aform')">添加订单</el-button>
            </div>
        </div>
        <div id="table2OM">
            <el-table :data="accountData" border style='width:100%'>
                <el-table-column prop="title" label="录入时间">
                    <template scope="scope">
                        <span style='font-weight:600'>{{scope.row.title}}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="kecheng_type" label="学员">
                </el-table-column>
                <el-table-column prop="kecheng_type" label="报名电话">
                </el-table-column>
                <el-table-column prop="year_num" label="校区">
                </el-table-column>
                <el-table-column prop="head_count" label="收件人">
                </el-table-column>
                <el-table-column prop="tuition_price" label="联系方式">
                </el-table-column>
                <el-table-column prop="teaching_price" label="收获地址">
                </el-table-column>
                <el-table-column prop="book_price" label="产品级别">
                </el-table-column>
                <el-table-column prop="book_price" label="订阅总期数">
                </el-table-column>
                <el-table-column prop="book_price" label="已发期数">
                    <template scope="scope">
                        <span style='color:#1fb5ad' @click='openInfo' class='canclick'>{{scope.row.book_price}}</span>
                    </template>
                </el-table-column>
                <el-table-column label="操作" width='120'>
                    <template scope="scope">
                        <el-button type="text" size="small" @click="editCh(scope.$index, accountData)">修改</el-button>
                        <el-button type="text" size="small" @click="open2(scope.$index, accountData)" class='classDel'>退订</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="block">
                <el-pagination layout="prev, pager, next" :total="total" :current-page="currentPage" :page-size="pagesize" @current-change="handleCurrentChange">
                </el-pagination>
            </div>
        </div>
        <el-dialog :title="alter" :visible.sync="dialogFormVisible" :close-on-click-modal="no" custom-class='classLibraryDialog'
            top='19%' @close='resetD' size='tiny'>
            <el-form :model="aform" ref="aform" :rules="rules2">
                <el-form-item label="收件人姓名" :label-width="formLabelWidth" prop="name">
                    <el-input v-model="aform.name" placeholder='请输入收件人姓名' :style='{width:inputLabelWidth}'></el-input>
                </el-form-item>
                <el-form-item label="联系方式" :label-width="formLabelWidth" prop="connect">
                    <el-input v-model="aform.connect" placeholder='请输入联系方式' :style='{width:inputLabelWidth}'></el-input>
                </el-form-item>
                <el-form-item label="收货地址" :label-width="formLabelWidth" prop="add">
                    <el-input v-model="aform.add" auto-complete="off" placeholder='请输入收货地址' :style='{width:inputLabelWidth}'></el-input>
                </el-form-item>
                <el-form-item label="订阅期数" :label-width="formLabelWidth" prop="num">
                    <el-select v-model="aform.num" clearable placeholder="订阅期数" :style='{width:inputLabelWidth}'>
                        <el-option label="1" value="1"></el-option>
                        <el-option label="3" value="2"></el-option>
                        <el-option label="6" value="3"></el-option>
                        <el-option label="12" value="4"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="产品级别" :label-width="formLabelWidth" prop="level">
                    <el-select v-model="aform.level" clearable placeholder="产品级别" :style='{width:inputLabelWidth}'>
                        <el-option label="3+" value="1"></el-option>
                        <el-option label="5+" value="2"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item :label-width="formLabelWidth">
                    <el-checkbox v-model="aform.checked">发货规则</el-checkbox>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer" style="text-align:center;margin-top:40px">
                <el-button type="primary" @click="addAccount('aform')">确 定</el-button>
                <el-button @click="dialogFormVisible = false">取 消</el-button>
            </div>
        </el-dialog>
        <el-dialog title="已发期数" :visible.sync="dialogFormVisibleInfo" :close-on-click-modal="no" custom-class='infoDialog' top='9%'
            size='small'>
            <div style="display:flex;;height:550px;border: 1px solid gainsboro;align-items:center">
                <div style="flex: 0 0 50px;text-align:center;height:100%;display: flex;align-items: center;justify-content: center;border-right:1px solid gainsboro">7月</div>
                <div style="display:flex;height:100%;flex:auto;flex-direction:column;justify-content:flex-start;">
                    <div style="height:50px;line-height:50px;font-size:18px;border-bottom:1px solid gainsboro;padding-left:25px">你的订单已签收</div>
                    <div class="track-rcol">
                        <div class="track-list">
                            <ul>
                                <li v-for='(item,index) in stepData' :class='stepData.length==1?"onlyone":index==stepData.length-1?"last":index==0?"first":""'>
                                    <i class="node-icon"></i>
                                    <span class="time">{{item.title}}</span>
                                    <span class="txt">{{item.content}}</span>
                                </li>
                            </ul>
                            <div class='cleargrey'></div>
                        </div>
                    </div>

                    <div style='display:flex;padding:10px 25px;width:80%;justify-content: space-between;'>
                        <div >运单号:111</div>
                        <div>物流公司:顺风</div>
                        <div>客户电话:95533</div>
                    </div>
                    <div style='padding:0 25px 10px 25px;width:80%;'>

                        <div style="padding-bottom:10px">产品类型:DFTH-EFEF-FE-FEF</div>
                        <div style="padding-bottom:10px">产品名称:俄方金额空间</div>
                        <div style="padding-bottom:10px">收获地址:上海市黄浦区北京西路201号世纪佳缘88号楼1808室   200030  </div>
                        <div style="padding-left:62px"> 刘科长  18689786654</div>
                    </div>
                </div>
            </div>
        </el-dialog>
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
            return {
                stepData: [{
                        title: '2017-8-31 周一',
                        content: '13:44:13 卖家发货'
                    }, {
                        content: '13:44:13 卖家发货'
                    }, {
                        title: '2017-8-31 周一',
                        content: '13:44:13 卖家发货'
                    }, {
                        content: '13:44:13 卖家发货'
                    },
                    {
                        title: '2017-8-31 周一',
                        content: '13:44:13 卖家发货'
                    }, {
                        content: '13:44:13 卖家发货'
                    }, {
                        title: '2017-8-31 周一',
                        content: '13:44:13 卖家发货'
                    }, {
                        content: '13:44:13 卖家发货'
                    },
                    {
                        title: '2017-8-31 周一',
                        content: '13:44:13 卖家发货'
                    }, {
                        content: '13:44:13 卖家发货'
                    }, {
                        title: '2017-8-31 周一',
                        content: '13:44:13 卖家发货'
                    }, {
                        content: '13:44:13 卖家发货'
                    },
                    {
                        title: '2017-8-31 周一',
                        content: '13:44:13 卖家发货'
                    }, {
                        content: '13:44:13 卖家发货'
                    }, {
                        title: '2017-8-31 周一',
                        content: '13:44:13 卖家发货'
                    }, {
                        content: '13:44:13 卖家发货'
                    }
                ],
                in: '',
                value1: '',
                value2: '',
                value3: '',
                currentPage: 1, //页数
                pagesize: 15, //默认每页
                total: 0, //总页数
                accountData: [],
                input2: '',
                number: 0,
                dialogFormVisible: false,
                dialogFormVisibleInfo: false,
                no: false,
                aform: {
                    name: '',
                    connect: '',
                    add: '',
                    num: '',
                    level: '',
                    checked: ''
                },
                rules2: {
                    name: [{
                        required: true,
                        message: '请输入收件人姓名',
                        trigger: 'blur'
                    }],
                    connect: [{
                        required: true,
                        message: '请输入联系方式',
                        trigger: 'blur'
                    }],
                    add: [{
                        required: true,
                        message: '请输入收获地址',
                        trigger: 'blur'
                    }],
                    num: [{
                        required: true,
                        message: '请选择订阅期数',
                        trigger: 'change'
                    }],
                    level: [{
                        required: true,
                        message: '请输入产品级别',
                        trigger: 'change'
                    }],
                },
                formLabelWidth: '120px',
                inputLabelWidth: '140px',
            }
        },
        methods: {
            openInfo() {
                this.dialogFormVisibleInfo = true;
            },
            resetD() {
                this.$refs['aform'].resetFields();

            },
            open2(index, data) { //删除账号
                this.$confirm('该客户还有产品未发,退订后将从下一期停止发货,是否确定要退订?', '退订提示', {
                    customClass: 'redwarn',
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    let para = {
                        aid: data[index].aid
                    }
                    delete_account(para, token).then(() => {

                        this.fetchData();
                    })
                    this.$message({
                        type: 'success',
                        message: '退订成功!'
                    });
                })
                // .catch(() => {
                //   this.$message({
                //     type: 'info',
                //     message: '已取消删除'
                //   });          
                // });
            },
            updateList() { //表格上方select change之后刷新表格
                this.currentPage = 1;
                this.fetchData();
            },
            createCh(formName) { //点击创建按钮
                this.dialogFormVisible = true;

            },
            editCh(index, data) {
                this.in = 1;
                this.dialogFormVisible = true;

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
            handleCurrentChange: function (val) { //变更页数
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

        },
        computed: {
            alter: function () {
                if (this.in === '') {
                    return '添加订单'
                }
                return '修改订单'
            }
        }
    }

</script>
<style>
    .h1 .el-button--primary {
        background-color: #32a4d3;
        border-color: #32a4d3;
    }

    #table2OM .el-table td,
    #table2OM .el-table th:not(.gutter) {
        padding: 5px 5px;
        text-align: center
    }

    #table2OM .el-table th>div,
    #table2OM .el-table .cell {
        padding-left: 0;
        padding-right: 0;
    }

    .block {
        text-align: center;
        margin-top: 10px;
    }

    .accou {
        width: 100%;
        position: relative;
        height: 45px;
        background-color: white;
        margin-top: 30px;
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

    .oneSelectOM {
        display: inline-block;
        margin-bottom: 10px;
        margin-left: 10px;
        width: 130px
    }

    .oneSelect .el-date-editor.el-input {
        width: 120px;
    }

    .buttonAdd {
        position: absolute;
        left: 560px;
        top: 10px;
    }

    .classDel {
        color: #dc1919
    }

    .classLibraryDialog .el-dialog__body {
        padding: 20px 20px 0 20px;
    }

    .classLibraryDialog .el-dialog__footer {
        padding: 0 20px 15px;
    }

    .el-dialog .el-dialog__header {
        background-color: #1fb5ad;
        padding: 20px 20px 20px;
    }

    .el-dialog .el-dialog__title {
        color: white;
    }

    .infoDialog .el-dialog__body {
        padding: 15px;
    }
.canclick{
    cursor: pointer;
}
    ul li {
        list-style: none;
    }

    .track-rcol {
        width: 100%;
        border-bottom: 1px solid gainsboro;
        height: 350px;
        overflow-y: auto;
    }

    .track-list {
        margin: 10px 20px;
        padding-left: 5px;
        position: relative;
    }

    .track-list li {
        position: relative;
        padding: 0 0 0 25px;
        line-height: 18px;
        border-left: 1px solid #d9d9d9;
        color: #999;
        display: flex;
        align-items: center;
        height: 27px;
    }

    .track-list li.first {
        padding-top: 0;
        border-left-color: #fff;
    }

    .track-list li.last {
        color: red;
        padding-top: 0;
    }

    .track-list li.onlyone {
        color: red;
        padding-top: 0;
        border-left-color: #fff;
    }

    .track-list li .node-icon {
        position: absolute;
        left: -6px;
        top: 49%;
        width: 11px;
        height: 11px;
        background: url(http://demo.daimabiji.com/3531/img/order-icons.png) -21px -72px no-repeat;
    }

    .track-list li.first .node-icon {
        background-position: -21px -72px;
    }

    .track-list li.last .node-icon,
    .track-list li.onlyone .node-icon {
        background-position: 0 -72px;
    }

    .track-list li .time {
        margin-right: 20px;
        position: relative;
        top: 4px;
        display: inline-block;
        vertical-align: middle;
        width: 110px;
    }

    .track-list li .txt {
        max-width: 600px;
        position: relative;
        top: 4px;
        display: inline-block;
        vertical-align: middle;
    }

    .track-list li.first .time {
        margin-right: 20px;
    }

    .track-list li.first .txt {
        max-width: 600px;
    }

    .cleargrey {
        position: absolute;
        bottom: -2px;
        left: -2px;
        width: 20px;
        height: 5px;
        background: #fff;
    }

</style>
