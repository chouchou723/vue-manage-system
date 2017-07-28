<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-my-gerenxinxi"></i> 学员合同</el-breadcrumb-item>
                <el-breadcrumb-item class='ss'>我的学员1</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class='accouMyresourece'>
            <h2 class="mydataReturn" >
               学员({{number}}人)
      </h2>
            <div style="display:flex;flex-wrap:wrap">
                <div class='studentReturnThreeNew' v-if="code =='cc_m'">
                    <el-select v-model="valueCC" clearable placeholder="选择CC" @change="updateList">
                        <el-option v-for="item in optionsCC" :key="item.aid" :label="item.uname" :value="item.aid">
                        </el-option>
                    </el-select>
                </div>
                <div class='mystudentSelect'>
                    <el-date-picker v-model="value" type="month" placeholder="生日月份" @change="updateList">
                    </el-date-picker>
                </div>
                <div class='studentReturnThreeNew'>
                    <el-select v-model="value1" clearable filterable placeholder="课程名称" @change="updateList">
                        <el-option v-for="item in classkind" :key="item.kcid" :label="item.title" :value="item.kcid">
                                        </el-option>
                    </el-select>
                </div>
                <div class='studentReturnThreeNew'>
                <el-select v-model="value3" clearable placeholder="剩余课时" @change="updateList">
                        <el-option label="6节以下" value="1"></el-option>
                        <el-option label="6节至12节" value="2"></el-option>
                        <el-option label="12节至24节" value="3"></el-option>
                         <el-option label="24节以上" value="4"></el-option>
                    </el-select>
    <!--  <el-dropdown trigger="click" menu-align='start'  @visible-change='remainClass' >
                    <div style="font-size:14px"  class='remainClass'>
                    <i :class="[isActive ? 'el-icon-caret-top' : '']" class='el-input__icon el-icon-caret-bottom'></i>
                        <input autocomplete="off" placeholder="剩余课时" readonly="readonly" icon="caret-top" type="text" rows="2" class="el-input__inner" :value='remainTime' >
                   
                     <el-dropdown-menu slot="dropdown">
                      
                    <el-select v-model="value2" clearable placeholder="选班级"  style='width:90px;margin:5px 15px 10px 15px' size='small'>
                        <el-option v-for="item in classRoom" :key="item.id" :label="item.names" :value="item.id">
                        </el-option>
                    </el-select>
                    <div style="text-align:center">
                        
                     <el-input v-model="value3"  size="mini" style='width:40px'></el-input>
                     到
                       <el-input v-model="value4"  size="mini" style='width:40px'></el-input>
                    </div>
                    <div style="text-align:center">
                        
                     <el-button type="primary" size="small" style='margin-top:5px' @click="confirmTime">确定</el-button>
                      <el-button type="primary" size="small" style='margin-top:5px' @click="resetTime">重置</el-button>
                    </div>
                       
                        </el-dropdown-menu>
                    </div>
                        </el-dropdown> -->
                    <!-- <el-select v-model="value5" clearable placeholder="剩余课时" @change="updateList" >
                    <el-option label="待认领" value="0"></el-option>
                    <el-option label="已认领" value="1"></el-option>
                    <el-option label="已邀约" value="2"></el-option>
                    <el-option label="已到访" value="3"></el-option>
                    <el-option label="未到访" value="4"></el-option>
                </el-select> -->
                </div>
                <div class='studentReturnThreeNew'>
                    <el-select v-model="value5" clearable placeholder="排班状态" @change="updateList">
                        <el-option label="已排班" value="1"></el-option>
                        <el-option label="未排班" value="0"></el-option>
                    </el-select>
                </div>
                <div class='studentReturnThreeNew'>
                    <el-select v-model="value6" clearable placeholder="使用状态" @change="updateList">
                        <el-option label="正常" value="1"></el-option>
                        <el-option label="过期" value="0"></el-option>
                    </el-select>
                </div>
                <div style="width:200px;display:inline-block;margin-left: 10px;margin-bottom: 10px;margin-right:110px">
                    <el-input placeholder="输入手机号或姓名" icon="search" v-model="input2" @keyup.enter.native="updateList" :on-icon-click="updateList" style='margin-right:10px' id='blurselect'> </el-input>
                </div>
                <div style="position:absolute;right:10px;bottom:10px">
                    <el-button type="primary" size="mid" class='myresourceButton' @click="settingTag">创建标签</el-button>
                </div>
            </div>
        </div>
        <div id="table" v-loading="loading2">
            <div v-for="item in customerData" style="background:white;margin-bottom:20px">
                <div style='display:flex;justify-content:space-between;height:50px;line-height:50px;border:1px solid rgb(223, 236, 235);border-bottom:none'>
                    <div style="display:flex;align-items:center;margin-left:10px" @click='gotoDetail(item)' class='myStudentsSpan'>
                        <img :src="item.img" width='40' height='40' alt="" style='border-radius:50%;'>
                        <div style="color:#1fb5ad;font-size:20px;font-weight:bold;margin-left:10px">{{item.child_name}}</div>
                    </div>
                    <div style="margin-right:10px;color:grey">出生日期: {{item.birthday}}</div>
                </div>
                <div style='display:flex;justify-content:space-between;'>
                    <el-table :data="item.order_item" border style="width: 60%;" row-class-name='tableheight'>
                        <el-table-column prop="title" label="课程">
                        </el-table-column>
                        <el-table-column prop="year_num" label="课时" width='40'>
                        </el-table-column>
                        <el-table-column prop="course_curr_num" label="剩余课时" width='67'>
                        </el-table-column>
                        <el-table-column prop="attend" label="上课时间" >
                        <!-- <template scope="scope">
                                <span >{{scope.row.week_num}} {{scope.row.schooltime}}</span>
                            </template> -->
                        </el-table-column>
                        <el-table-column prop="over_time" label="有效期" width='160'>
                         <template scope="scope">
                                <span>{{scope.row.first_time}}~{{scope.row.over_time}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column prop="status" label="使用状态" column-key='status' width='67'>
                            <template scope="scope">
                                <span :style="scope.row.status=='正常'? 'color:black' : 'color:#dba31c' ">{{scope.row.status}}</span>
                            </template>
                        </el-table-column>
                    </el-table>
                    <div style="width:40%;display:flex;flex-direction:column">
                        <div style="height:40px;line-height:40px;display:flex;justify-content:space-around;border:1px solid rgb(223, 236, 235);border-left:none">
                            <div style="flex:0 0 140px;text-align:center;background:rgb(238, 246, 246);font-size:14px;color:rgb(31, 61, 60);font-weight: bold;border-right:1px solid rgb(223, 236, 235);">最近回访时间</div>
                            <div style="flex:auto;text-align:center;background:rgb(238, 246, 246);font-size:14px;color:rgb(31, 61, 60);font-weight: bold;">回访标签</div>
                        </div>
                        <div style="display:flex;justify-content:space-around;flex:auto;align-items:stretch;border-right:1px solid rgb(223, 236, 235);border-bottom:1px solid rgb(223, 236, 235);">
                            <div style="border-right:1px solid rgb(223, 236, 235);flex:0 0 140px;display:flex;justify-content:center;align-items:center;font-size:14px">{{item.last_time}}</div>
                            <div style="flex:auto;display:flex;justify-content:center;align-items:center;flex-wrap: wrap;min-height:56px;height:auto;over-flow:hidden" >
                                <el-tag type='success' close-transition v-for='(t,key) in item.tags' @click.native='aaa(t,key)' style='margin-top:2px;margin-bottom:2px'>{{t.title}}</el-tag>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="block">
            <el-pagination layout="prev, pager, next" :total="total" :current-page="currentPage" :page-size="pagesize" @current-change="handleCurrentChange">
            </el-pagination>
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
    getMyStudent,
    tagList,
    create_tag,
    delete_tag,
    getAllCCList,
    getClassKind,
    getClassLibrary
} from '../../api/api';
export default {
    data() {
            return {
                // classRoom:[],
                classkind:[],
                // remainTime:'',
                // isActive: false,
                loading2: true,
                dynamicTags: [], //动态替换
                backupTages: [],
                inputVisible: false,
                inputValue: '',
                dialogFormVisible: false,
                input2: '',
                currentPage: 1, //页数
                pagesize: 15, //默认每页
                total: 0,
                no: false,
                customerData: [],
                number: 0,
                optionsCC: [], //表单上方的select
                valueCC: '', //对应select的值
                value: '',
                value1: '',
                // value2: '', //对应select的值
                value3: '', //对应select的值
                // value4: '', //点击tag
                value5: '', //状态
                value6:'',
                // valueTag: '', //点击tag
                code: '',
                // propsource: {
                //     value: 'id',
                //     label: 'names',
                //     children: '_child'
                // },
            }
        },
        methods: {
            gotoDetail(row){
                 this.$router.push('/studentDetail/'+row.uid);
            },
            // resetTime(){
            //     this.value2 = ''
            //     this.value3 = ''
            //     this.value4 = ''
            //      this.remainTime = ''
            //      // this.isActive = false;
            // },
            // confirmTime(){
            //     if(this.value3 &&!this.value4){

            //     this.remainTime = this.value3 + '+';
            //     }else if(this.value4 &&!this.value3){
            //         this.remainTime = 0+'~' + this.value4;
            //     }else if(this.value3 &&this.value4){
            //          this.remainTime = this.value3 +'~' + this.value4;
            //     }else{
            //          this.remainTime = ''
            //     }
            //     this.isActive = false;
            //     document.getElementById('blurselect').focus();
            //     // this.$refs.blurselect.localName
            // },
            // remainClass(val) {
            //     if(val ==true ){
            //         console.log(1)
            //         this.isActive = true
            //     }else{
            //          this.isActive = false;
            //     }
            // },
            // aaa(tag, key) {
            //     //调接口配对
            //     if (this.valueTag == key) {
            //         this.valueTag = '';
            //         this.currentPage = 1;
            //         this.fetchData();
            //     } else {
            //         this.valueTag = key;
            //         this.currentPage = 1;
            //         this.fetchData();
            //     }

            // },
            // switchDetail(row) {
            //     console.log(row)
            //     // this.sendUser(row.uid)
            //         // this.$router.push('/returnDetail');
            //     this.$router.push('/customerDetail' + '/' + row.uid + '/' + row.status);
            // },
            updateList() {
                this.currentPage = 1;
                this.fetchData();

            },
            fetchData() {
                let para = {
                    page: this.currentPage,
                    cc_uid: this.valueCC,
                    birthday:this.value,
                    kcid: this.value1,
                    course_curr_num : this.value3,//剩余课时
                    scheduling_status: this.value5,//排版状态
                    status: this.value6,//使用状态
                    input: this.input2,
                    // tag_id: this.valueTag
                }

                getMyStudent(token, para).then((res) => { //替换服务
                    this.number = res.data.total;
                    let a = res.data.data;
                    let c = res.data.last_page * this.pagesize;

                    console.log(a)
                    this.customerData = a;
                    this.total = parseInt(c);
                }).then(() => {
                    this.loading2 = false
                }).catch(() => {
                    this.$message.error('该用户未授权');
                    this.loading2 = false
                })
            },
            handleCurrentChange: function(val) {
                this.currentPage = val;

                this.fetchData();
            },
            settingTag() {
                //调服务获取tag[]
                tagList(token).then(res => {
                    this.dynamicTags = res.data.map(item => {
                        return item.label
                    })
                    this.backupTages = res.data
                })
                this.dialogFormVisible = true
            },
            handleClose(tag) { //移除
                //调服务删除tag,把整个tag传
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
                        tagList(token).then(res => {
                            this.dynamicTags = res.data.map(item => {
                                return item.label
                            })
                            this.backupTages = res.data
                        })
                    }).catch((res) => {
                        this.$message.error('该用户未授权')
                    })
                    // console.log(index)
                    // this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1);
            },

            showInput() {
                this.inputVisible = true;
                this.$nextTick(_ => {
                    this.$refs.saveTagInput.$refs.input.focus();
                });
            },

            handleInputConfirm() {
                let inputValue = this.inputValue;
                if (inputValue) {
                    let para = {
                        title: inputValue
                    }
                    create_tag(para, token).then(res => {
                            if (res.code == 0) {
                                this.$message.success('添加成功')
                                tagList(token).then(res => {
                                    this.dynamicTags = res.data.map(item => {
                                        return item.label
                                    })
                                    this.backupTages = res.data
                                })
                            }
                        }).catch(() => {
                            this.$message.error('添加失败')
                        })
                        // this.dynamicTags.push(inputValue);
                        //调服务 上送tag
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
            let si = {
                simple: 1,
            }
            getClassLibrary(token, si).then((res) => { //获取课程分类
                this.classkind = res.data
            })
            // getClassRoom(token).then((res) => { //获取教室
            //     this.classRoom = res.data;
            // })
            if (this.code == 'cc_m') {
                getAllCCList(token).then((res) => {
                    this.optionsCC = res.data;
                    this.optionsCC.unshift({
                        aid: '0',
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
    /*display: block;*/
    /*margin-top: 20px;*/
    margin-bottom: 15px;
    padding-left: 10px;
    width: 350px;
    /*
    margin-right:70%;*/
}

.studentReturnThreeNew {
    display: inline-block;
    width: 103px;
    /*margin-right: 10px;*/
    margin-bottom: 10px;
    margin-left: 10px
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

.tagDialog .el-tag--success {
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
}

/*.accouMyresourece .el-date-editor--daterange.el-input {
    width: 184px;
}*/


/*#table .el-table th:nth-last-child(2){
  text-align: left
}*/

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
/*
.remainClass .el-input__inner:hover {
    cursor: pointer;
}
.displaynone{
    display: none;
}*/
.myStudentsSpan:hover{
    cursor: pointer;
}
.tableheight{
    height: 58px;
}
</style>
