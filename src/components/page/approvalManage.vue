<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item ><i class="el-icon-my-shouye"></i> 审批管理</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class='systemTitle'>
            <h2 style='background:white;padding:9px 17px'>
                审批消息(未处理{{number}}条)
            </h2>
        </div>
        <div class="systemwrapper">
            <div style="position:relative;width:450px;height:900px;float:left;margin-top:10px;margin-left:25px;border:1px solid gainboro;border-radius:5px;box-shadow:0 -9px 20px gainsboro"
                v-loading='loading'>
                <div v-for="(content,index) in notifyData" :class="[content.read =='0'?'greenContent':'','systemContent']" @click='chooseContent(content,index)'
                    :id='index'>
                    <div v-if="content.read == '0'" style="position:absolute;top:16px;left:0">
                        <span class='circle'></span>
                    </div>
                    <div style="height:40px;margin-left:5px">
                        <div style="float:left;font-weight:600;font-size: 16px;" :class="{green:content.created.substring(0,10).replace(/0/g,'') == new Date().toLocaleString().substring(0,9).replace(/0/g,'')}">{{content.type}}审批</div>
                        <div style="float:right;">{{content.created.substring(0,10).replace(/0/g,'') == new Date().toLocaleDateString().substring(0,9).replace(/0/g,'').replace(/\//g,'-')?content.created.substring(11):
                            new Date(content.created.substring(0,10)).valueOf() - new Date().toLocaleDateString().valueOf()
                            == -86400000? '昨天'+content.created.substring(11) :content.created.substring(5)}}</div>
                    </div>
                    <div style="margin-left:5px" v-if='content.type=="转校"'>
                        学生:{{ content.content.child}}的转校申请,请您确认
                    </div>
                    <div style="margin-left:5px" v-if='content.type=="代课申请"'>
                        {{ content.content?content.content.teacher:''}}老师的代课申请,请您确认
                    </div>
                     <div style="margin-left:5px" v-if='content.type=="转校失败"'>
                    学生:{{ content.content.child}}的转校申请, {{ content.content.msg}}
                </div>
                </div>
                <div class="sysblock">
                    <el-pagination layout="prev, pager, next" :total="total" :current-page="currentPage" :page-size="pagesize" @current-change="handleCurrentChange">
                    </el-pagination>
                </div>
            </div>
            <div v-if="display" style="flex:auto;height:837px;float:right;margin-top:66px;margin-right:2%;background:#f3f3f3;border-radius:5px;box-shadow:9px 12px 10px gainsboro">
                <div class='detailContent'>

                    <div style="height:30px;margin-left:20px;padding-bottom:10px;border-bottom:1px solid gainsboro">
                        <div style="float:left;font-weight:600;font-size:20px;margin-top:5px">{{detailData.type}}通知</div>
                        <div style="float:right;margin-right:20px;margin-top:10px">
                            {{new Date(detailData.created).toLocaleDateString() == new Date().toLocaleDateString().substring(0,9)?detailData.created.substring(11):
                                new Date(detailData.created.substring(0,10)).valueOf() - new Date().toLocaleDateString().valueOf() ==
                                -86400000? '昨天'+detailData.created.substring(11) :detailData.created.substring(5)}}</div>
                    </div>
                    <div style="margin-left:5px">
                        <div v-if='detailData.type=="转校"' style="width:92%;margin:0 auto">
                            <el-form label-width="120px">
                                <el-form-item prop='time' label='转校学生:'>
                                    <div>{{detailData.content.child}}</div>
                                </el-form-item>
                                <el-form-item prop='time' label='转出校区:'>
                                    <div>{{detailData.content.school}}</div>
                                </el-form-item>
                                <el-form-item prop='time' label='操作CC:'>
                                    <div>{{detailData.content.cc}}</div>
                                </el-form-item>
                            </el-form>
                            <div style="margin-left: 120px;" v-if="detailData.action!=''">
                                <el-button type="primary" size="small" @click="acceptStudent(detailData,1)">接收</el-button>
                                <el-button type="danger" size="small" @click="acceptStudent(detailData,0)">拒绝</el-button>
                            </div>
                        </div>
                        <div v-if='detailData.type=="转校失败"' style="width:92%;margin:0 auto">
                            <el-form label-width="120px">
                                <el-form-item prop='time' label='学生:'>
                                   
                                    <div> {{ detailData.content.child}}的转校申请, {{ detailData.content.msg}}</div>
                                </el-form-item>
                            </el-form>
                        </div>
                        <div v-if='detailData.type=="代课申请"' style="width:92%;margin:0 auto">
                            <el-form label-width="120px">
                                <el-form-item prop='time' label='申请人:'>
                                    <div>{{detailData.content.teacher}}</div>
                                </el-form-item>
                                <el-form-item prop='time' label='代课老师:'>
                                    <div>{{detailData.content.Toteacher}}</div>
                                </el-form-item>
                                <el-form-item prop='time' label='代课班级:'>
                                    <div>{{detailData.content.topic}}</div>
                                </el-form-item>
                                <el-form-item prop='time' label='申请日期:'>
                                    <div>{{detailData.created}}</div>
                                </el-form-item>
                            </el-form>
                            <div style="margin-left: 120px;" v-if="detailData.action!=''">
                                <el-button type="primary" size="small" @click="acceptStudent(detailData,1)">同意</el-button>
                                <el-button type="danger" size="small" @click="acceptStudent(detailData,0)">拒绝</el-button>
                            </div>
                        </div>
                        <div v-else>
                            <!-- <textarea name="" id="" cols="80" class='systemText' > 学生:{{ detailData.content.child}}的转校申请,请您确认</textarea>
                             <textarea name="" id="" cols="80" class='systemText' v-if='detailData.type=="转校失败"'>{{ detailData.content.msg}}</textarea> -->
                        </div>

                    </div>
                    <div v-for="item in imgs" style="float:left;margin-top:10px;" v-if='detailData.type =="pic"'>
                        <img :src="item.src" alt="" style="margin-right:5px;max-width:200px">
                    </div>
                    <div class="clear"></div>
                    <div v-for="item in attachData" style="margin-top:20px;color:#1fb5ad" class='attachA' v-if='detailData.type =="dow"'>
                        <img src="../../../static/img/attach.png" width='20' alt=""><span style="margin-right:30px;font-size:20px;width:50px;display:inline-block">{{item.name}}</span>                        <a :href="item.url" style="margin-right:10px;color:#1fb5ad">下载</a>
                    </div>
                </div>
            </div>
        </div>
        <div class='clear'></div>
        
    </div>
</template>
<script>
    var token, user
    import {
        getMessage,
        getMessagDetail,
        agreeTransferSchool
    } from '../../api/api';
    import {
        mapGetters,
        mapActions
    } from 'vuex';
    export default {
        data() {

            return {
                loading: true,
                changegrey: false,
                display: false,
                input2: '',
                number: 0,
                total: 0,
                currentPage: 1,
                pagesize: 10,
                mail: '',
                receiveCode: '',
                notifyData: [],
                detailData: {},
                imgs: [{
                    src: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1497521223102&di=e16c4a9724307f217b06dd4a4fb36e44&imgtype=0&src=http%3A%2F%2Fi1.hdslb.com%2Fbfs%2Farchive%2F6f2c7b79ac8beb3e2552ff333407148e6ecd8780.jpg'
                }, {
                    src: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1497521223102&di=e16c4a9724307f217b06dd4a4fb36e44&imgtype=0&src=http%3A%2F%2Fi1.hdslb.com%2Fbfs%2Farchive%2F6f2c7b79ac8beb3e2552ff333407148e6ecd8780.jpg'
                }, {
                    src: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1497521223102&di=e16c4a9724307f217b06dd4a4fb36e44&imgtype=0&src=http%3A%2F%2Fi1.hdslb.com%2Fbfs%2Farchive%2F6f2c7b79ac8beb3e2552ff333407148e6ecd8780.jpg'
                }],
                attachData: [{
                    name: 'meow',
                    url: 'https://exmail.qq.com/cgi-bin/download?mailid=ZL1213-mt7NNrcFhJSrNx5H712QE7i&filename=favicon.ico&sid=ZyPzK6p22sqLQmsy,2&detect_qmail=1'
                }, {
                    name: 'catty',
                    url: 'https://exmail.qq.com/cgi-bin/download?mailid=ZL1213-mt7NNrcFhJSrNx5H712QE7i&filename=favicon.ico&sid=ZyPzK6p22sqLQmsy,2&detect_qmail=1'
                }],
                aaa: '',
                contGet:''
            };
        },
        methods: {
            ...mapActions([
                'setMessNumber'
            ]),
            acceptStudent(data, agree) {
                let para = {
                    message_id: data.id,
                    agree: agree
                }
                agreeTransferSchool(para, token).then(res => {
                    // console.log(res)
                    if (res.code == 0) {
                            this.$message.success('操作成功');
                            if(data.type=='转校'){

                                this.$router.push('/studentDetail/' + data.action.uid);
                            }
                        let para = {
                            msgid: data.id
                        }
                        getMessagDetail(para, token).then(res => {
                            // console.log(res);
                            this.detailData = res.data
                        })
                    } else {
                        this.$message.error(res.data)

                    }
                }).catch(() => {
                    this.$message.error('数据有误')
                })
            },
            handleCurrentChange:function (val) {
                this.currentPage = val;
                let para = {
                page: this.currentPage
            }
            getMessage(para, token).then(res => {
                this.number = res.data.total;
                this.notifyData = res.data.list.data;
                let c = res.data.list.last_page * this.pagesize;
                this.total = parseInt(c);
                this.loading = false;
            })
            },
            handleIconClick() {

            },
            chooseContent(data, index) {

                if (this.aaa === '') {
                    this.aaa = index;
                    document.getElementById(this.aaa).style.background = '#f3f3f3';
                } else {
                    document.getElementById(this.aaa).style.background = '#ffffff'
                    this.aaa = index;
                    document.getElementById(this.aaa).style.background = '#f3f3f3'

                }
                if (data.read == 0) {
                    // let a = this.getMessNumber - 1;
                    // console.log(a)
                    if(this.number>=1){
                        --this.number
                    // this.number =this.number -1;
                    }else{
                        this.number = 0
                    }
                    this.setMessNumber( this.number)
                }
                let para = {
                    msgid: data.id
                }
                getMessagDetail(para, token).then(res => {
                    // console.log(res);
                    // if(data.type=='代课申请'){

                    // }
                    this.detailData = res.data
                }).then(() => {
                    this.display = true;
                })
                // console.log(data)
                data.read = '1';
            },
            getM(){
                let p ={
                    page: this.currentPage
                }
                getMessage(p,token).then(res=>{
                // console.log(res);
                this.number = res.data.total;
                this.notifyData = res.data.list.data;
                let c = res.data.list.last_page * this.pagesize;
                this.total = parseInt(c);
                this.setMessNumber(this.number)
            })
            }

        },
        beforeCreate() {
            user = localStorage.getItem('user');
            token = JSON.parse(user).token;
        },
        created() {
            let para = {
                page: this.currentPage
            }
            getMessage(para, token).then(res => {
                this.number = res.data.total;
                this.notifyData = res.data.list.data;
                let c = res.data.list.last_page * this.pagesize;
                this.total = parseInt(c);
                this.loading = false;
            })
            this.contGet = setInterval(this.getM,600000)
            // this.mail = JSON.parse(user).name ? JSON.parse(user).name : ''; //获取mail
        },
        computed: {
            ...mapGetters([
                'getMessNumber'
            ])
        },
        beforeDestroy() {
            clearInterval(this.contGet)
        },
    }

</script>
<style scoped>
    .attachA a:hover {
        text-decoration: underline;
    }

    ::-webkit-scrollbar {
        display: none
    }

    .systemText {
        border: none;
        overflow: hidden;
        resize: none;
        background: #f3f3f3;
    }

    .systemText:focus {
        outline: none
    }

    .systemTitle {
        border-bottom: 1px solid #e8e1e1
    }

    .sysblock {
        width:100%;
        position: absolute;
        bottom:2px;
        text-align: center
    }

    .circle {
        border-radius: 50%;
        width: 8px;
        height: 8px;
        float: left;
        background-color: #f29543;
        /* 宽度和高度需要相等 */
    }

    .systemContent {
        position: relative;
        padding: 10px;
        border-bottom: 1px solid #e8e8e8;
        font-size: 14px;
        color:#486a6a
    }

    .systemContent:hover {
        cursor: pointer;
    }

    .detailContent {
        position: relative;
        margin: 10px;
        font-size: 14px;
        background: white;
        height: 817px;
    }

    .greenContent {
        color: #1fb5ad
    }

    .clear {
        clear: both
    }

    .systemwrapper {
        background: white;
        height: 920px;
        display: flex;
        margin-bottom:30px
    }

    .changGrey {
        background: #f3f3f3;
    }

    .returnG {
        background: white;
    }

</style>
