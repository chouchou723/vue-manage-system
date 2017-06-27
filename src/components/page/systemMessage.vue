<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item :to="{ path: '/Index'}"><i class="el-icon-my-shouye"></i> 首页</el-breadcrumb-item>
                <el-breadcrumb-item class='ss'>系统通知</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class='systemTitle'>
            <h2>
               系统通知(未读{{number}})
      </h2>
        </div>
        <div class="systemwrapper">
            <div style="width:33%;height:auto;float:left;margin-top:10px;margin-left:80px;">
                <div style='width:80%;margin:10px auto'>
                    <el-input placeholder="请输入关键字" icon="search" v-model="input2" :on-icon-click="handleIconClick">
                    </el-input>
                </div>
                <div v-for="content in notifyData" class='systemContent' :class="{greenContent:content.read =='no'}" @click='chooseContent(content)'>
                    <div v-if="content.read == 'no'" style="position:absolute;top:16px;left:0">
                        <span class='circle'></span>
                    </div>
                    <div style="height:30px;margin-left:5px">
                        <div style="float:left;font-weight:600" :class="{green:content.date.substring(0,10).replace(/0/g,'') == new Date().toLocaleString().substring(0,9).replace(/0/g,'')}">{{content.title}}</div>
                        <div style="float:right;">{{content.date.substring(0,10).replace(/0/g,'') == new Date().toLocaleString().substring(0,9).replace(/0/g,'')?content.date.substring(11): content.date.substring(0,10).replace(/0/g,'').replace(/\-/g,'') - new Date().toLocaleString().substring(0,9).replace(/0/g,'').replace(/\-/g,'') == -1? '昨天'+content.date.substring(11) :content.date.substring(5)}}</div>
                    </div>
                    <div style="margin-left:5px">
                        {{ content.content}}
                    </div>
                </div>
            </div>
            <div v-if="display" style="width:52%;height:auto;float:right;margin-top:62px;margin-right:40px">
            <div  class='detailContent' >
                    
                    <div style="height:30px;margin-left:5px;margin-bottom:10px">
                        <div style="float:left;font-weight:600;font-size:20px" >{{detailData.title}}</div>
                        <div style="float:right;">{{detailData.date.substring(0,10).replace(/0/g,'') == new Date().toLocaleString().substring(0,9).replace(/0/g,'')?detailData.date.substring(11): detailData.date.substring(0,10).replace(/0/g,'').replace(/\-/g,'') - new Date().toLocaleString().substring(0,9).replace(/0/g,'').replace(/\-/g,'') == -1? '昨天'+detailData.date.substring(11) :detailData.date.substring(5)}}</div>
                    </div>
                    <div style="margin-left:5px">
                        <textarea name="" id="" cols="80" class='systemText' >{{ detailData.content}}</textarea>
                    </div>
                    <div v-for="item in imgs" style="float:left;margin-top:10px;">
                        <img :src="item.src" alt="" style="margin-right:5px;max-width:200px">
                    </div>
                    <div class="clear"></div>
                    <div v-for="item in attachData" style="margin-top:20px;color:#1fb5ad" class='attachA'>
                        <img src="../../../static/img/attach.png" width='20' alt=""><span style="margin-right:30px;font-size:20px;width:50px;display:inline-block">{{item.name}}</span> <a :href="item.url" style="margin-right:10px;color:#1fb5ad">下载</a>  
                    </div>
                </div>
            </div>
        </div>
        <div class='clear'></div>
        <div class="block">
            <el-pagination layout="prev, pager, next" :total="total" :current-page="currentPage" :page-size="pagesize" @current-change="handleCurrentChange">
            </el-pagination>
        </div>
    </div>
</template>
<script>
var token, user
import {
    mailCode,
    editPass
} from '../../api/api';
export default {
    data() {

            return {
                display:false,
                input2: '',
                number: 0,
                total: 0,
                currentPage: 1,
                pagesize: 15,
                mail: '',
                receiveCode: '',
                notifyData: [{
                    read: 'yes',
                    title: '徐家汇校区通知',
                    content: '夫君子之行，静以修身，俭以养德，非淡泊无以明志，非宁静无以致远',
                    date: '2017-06-15 14:30'
                }, {
                    read: 'no',
                    title: '徐家汇校区通知',
                    content: '欲思其利,必虑其害,欲思其成,必虑其败',
                    date: '2017-06-14 14:30'
                }, {
                    read: 'no',
                    title: '徐家汇校区通知',
                    content: '下周一开始要努力工作',
                    date: '2017-06-06 14:30'
                }, {
                    read: 'no',
                    title: '徐家汇校区通知',
                    content: '风萧萧兮易水寒',
                    date: '2017-06-04 14:30'
                }, {
                    read: 'no',
                    title: '徐家汇校区通知',
                    content: '千里之行始于足下',
                    date: '2017-06-03 14:30'
                }, {
                    read: 'yes',
                    title: '徐家汇校区通知',
                    content: '夫君子之行，静以修身，俭以养德，非淡泊无以明志，非宁静无以致远',
                    date: '2017-06-15 14:30'
                }, {
                    read: 'no',
                    title: '徐家汇校区通知',
                    content: '欲思其利,必虑其害,欲思其成,必虑其败',
                    date: '2017-06-14 14:30'
                }, {
                    read: 'no',
                    title: '徐家汇校区通知',
                    content: '下周一开始要努力工作',
                    date: '2017-06-06 14:30'
                }, {
                    read: 'no',
                    title: '徐家汇校区通知',
                    content: '风萧萧兮易水寒',
                    date: '2017-06-04 14:30'
                }, {
                    read: 'no',
                    title: '徐家汇校区通知',
                    content: '千里之行始于足下',
                    date: '2017-06-03 14:30'
                }],
                detailData:{ read: 'yes',
                    title: '徐家汇校区通知',
                    content: '夫君子之行，静以修身，俭以养德，非淡泊无以明志，非宁静无以致远\n夫君子之行，静以修身，俭以养德，非淡泊无以明志，非宁静无以致远\n夫君子之行，静以修身，俭以养德，非淡泊无以明志，非宁静无以致远',
                    date: '2017-06-15 14:30'},
                imgs:[{src:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1497521223102&di=e16c4a9724307f217b06dd4a4fb36e44&imgtype=0&src=http%3A%2F%2Fi1.hdslb.com%2Fbfs%2Farchive%2F6f2c7b79ac8beb3e2552ff333407148e6ecd8780.jpg'},{src:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1497521223102&di=e16c4a9724307f217b06dd4a4fb36e44&imgtype=0&src=http%3A%2F%2Fi1.hdslb.com%2Fbfs%2Farchive%2F6f2c7b79ac8beb3e2552ff333407148e6ecd8780.jpg'},{src:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1497521223102&di=e16c4a9724307f217b06dd4a4fb36e44&imgtype=0&src=http%3A%2F%2Fi1.hdslb.com%2Fbfs%2Farchive%2F6f2c7b79ac8beb3e2552ff333407148e6ecd8780.jpg'}],
                attachData:[{name:'meow',url:'https://exmail.qq.com/cgi-bin/download?mailid=ZL1213-mt7NNrcFhJSrNx5H712QE7i&filename=favicon.ico&sid=ZyPzK6p22sqLQmsy,2&detect_qmail=1'},{name:'catty',url:'https://exmail.qq.com/cgi-bin/download?mailid=ZL1213-mt7NNrcFhJSrNx5H712QE7i&filename=favicon.ico&sid=ZyPzK6p22sqLQmsy,2&detect_qmail=1'}]
            };
        },
        methods: {
            handleCurrentChange() {

            },
            handleIconClick() {

            },
            chooseContent(data) {
                console.log(data)
                data.read = 'yes';
                this.display = true;
            },
            handleSubmit2(formName) {
                this.$refs.ruleForm2.validate((valid) => {
                    if (valid) {
                        editPass(token, this.ruleForm2).then(res => {
                                if (res.code == 0) {

                                    this.$message({
                                        message: '修改成功',
                                        type: 'success'
                                    });
                                }
                                return res
                            }).then(res => {
                                if (res.code == 0) {

                                    this.$router.push('/Index');
                                } else {
                                    this.$message.error(res.message);
                                    this.ruleForm2.code = '';
                                }

                            })
                            //替换提交服务
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            getCode() {
                mailCode(token).then((res) => {

                });
            }
        },
        beforeCreate() {
            user = localStorage.getItem('user');
            token = JSON.parse(user).token;
        },
        created() {
            this.mail = JSON.parse(user).name ? JSON.parse(user).name : ''; //获取mail
        }
}
</script>
<style scoped>
.attachA a:hover{
    text-decoration: underline;
}
.systemText{
    border:none;
    overflow:hidden;
     resize:none;
}
.systemText:focus{
    outline: none
}
.systemTitle {
    padding-bottom: 10px;
    border-bottom: 1px solid #e8e1e1
}

.block {
    text-align: center;
    margin-top: 10px;
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
}

.systemContent:hover {
    cursor: pointer;
}

.detailContent{
    position: relative;
    padding: 10px;
    font-size: 14px;
}
.greenContent {
    color: #1fb5ad
}

.clear {
    clear: both
}
</style>
