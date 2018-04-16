<template>
    <div class='ReturnV'>
        <!-- <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-my-tongxunlu"></i>学员回访</el-breadcrumb-item>
            </el-breadcrumb>
        </div> -->
        <div class='accouVisit'>
              <h3 class="studentReturn">
        学员回访
        <span v-if="number==='0'" style="font-size:14px;color: #bdb8b8;">加载中...</span>
               <span v-else>({{number}}人)</span>
        </h3>
        
   
    <div style="display:flex;flex-wrap:wrap;margin-right: 5px;">
<div class='studentReturnThree' v-if="code.includes('tmk_m')||code.includes('cc_c')">
                <el-select v-model="value2"  placeholder="选择TMK" @change="updateList">
                    <el-option v-for="item in options1" :key="item.key" :label="item.label" :value="item.key">
                    </el-option>
                </el-select>
            </div>
            <div class='studentReturnThreeS'>
                <el-select v-model="value1" clearable filterable placeholder="选择校区" @change="updateList">
                    <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                    </el-option>
                </el-select>
            </div>
            <div class='studentReturnThree'>
                <el-select v-model="status" clearable placeholder="回访状态" @change="updateList">
                    <el-option label="已回访" value="1"></el-option>
                    <el-option label="未回访" value="0"></el-option>
                </el-select>
            </div>
            <div class='studentReturnThreedate'>
                <el-date-picker v-model="value3" type="daterange" placeholder="选择签约时间" @change="updateList"  :picker-options="pickerOptions0">
                </el-date-picker>
            </div>
        <div class='studentReturnThreeS'>
            <el-input placeholder="输入手机号或姓名" icon="search" v-model="input2" @keyup.enter.native="updateList" :on-icon-click="updateList">
            </el-input>
        </div>
       
    </div>
            
        </div>
        <div id="tableRV" v-loading="loading2">
            <el-table :data="returnData"  @sort-change='sortChange'>
                <el-table-column prop="nickname" label="学生" width="150">
                    <template scope="scope">
                        <span @click="switchDetail(scope.row)" class='nicknameSpanReturn'>{{scope.row.nickname}}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="school_name" label="校区">
                </el-table-column>
                <el-table-column prop="regtime" sortable='custom' label="签约时间" width="180">
                </el-table-column>
                <el-table-column prop="last_time" sortable='custom' label="最近回访时间" width="180">
                </el-table-column>
                <el-table-column prop="visit_count"   label="回访次数"width="100">
                </el-table-column>
                <el-table-column class-name='tagClass' prop="tags" label="回访标签" width="250">
                    <template scope="scope">
                        <el-tag :type="scope.row.tags == '未回访' ? 'danger' : 'success'" close-transition v-for='(t,key) in scope.row.tags' v-if='scope.row.tags.length != 0' @click.native='aaa(t,key)'>{{t}}</el-tag>
                        <el-tag v-for='(t,key) in noreturnlist' v-if='scope.row.tags.length == 0' type='danger'>{{t}}</el-tag>
                    </template>
                </el-table-column>
            </el-table>
            <!-- <div class='settingTag' v-if="code =='tmk_m'">
                <span @click='settingTag'>[设置]</span>
            </div> -->
            <div class="block">
                <el-pagination layout="prev, pager, next" :total="total" :current-page="currentPage" :page-size="pagesize" @current-change="handleCurrentChange">
                </el-pagination>
            </div>
        </div>
        <!-- <el-dialog title="设置访问标签" :visible.sync="dialogFormVisible" :close-on-click-modal="no" show-close style='z-index:100' class='tagDialog'>
            <el-tag :key="tag" v-for="tag in dynamicTags" :closable="true" type="success" :close-transition="false" @close="handleClose(tag)">
                {{tag}}
            </el-tag>
            <el-input class="input-new-tag" v-if="inputVisible" v-model="inputValue" ref="saveTagInput" size="mini" @keyup.enter.native="handleInputConfirm" @blur="handleInputConfirm">
            </el-input>
            <el-button v-else class="button-new-tag" size="small" @click="showInput" sytle='margin-top:7px'>创建标签</el-button>
        </el-dialog> -->
    </div>
</template>
<script>
var token, user
import {
    campusList,
    returnVisitList,
    // tagList,
    // create_tag,
    // delete_tag,
    getTMK
} from '../../api/api';
import {
    mapActions,mapGetters
} from 'vuex';
export default {
    data() {
            return {
                pickerOptions0: {
                        disabledDate(time) {
                            return time.getTime() > Date.now();
                        }
                    },
                noreturnlist:{0:'未回访'},
                loading2:true,
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
                returnData: [],
                number: '0',
                options: [], //表单上方的select
                options1: [], //表单上方的select
                value1: '', //对应select的值
                value2: '0', //对应select的值
                status: '', //对应select的值
                value3: '', //对应select的值
                value4: '', //点击tag
                code: '',
                sortName:'',
                sortOrder:'',
            }
        },
        methods: {
            sortChange(column){
                let {prop,order} = column
                // console.log(prop)
                this.sortName=prop;
                this.sortOrder = order;
                this.currentPage = 1;
                this.fetchData()
            },
            sortM(a,b){
                let i = parseInt(a.visit_count);
                let h = parseInt(b.visit_count);
               return i > h
                
            },
            aaa(tag, key) {
                //调接口配对
                if (this.value4 == key) {
                    this.value4 = '';
                    this.currentPage = 1;
                     this.fetchData();
                } else {
                    this.value4 = key;
                    this.currentPage = 1;
                     this.fetchData();
                }
               
            },
            ...mapActions([
            'setmyReturnS'
        ]),
            switchDetail(row) {
                // console.log(row)
                // this.sendUser(row.uid)
                let d = {
                    page: this.currentPage,
                    tmk_uid: this.value2,
                    school_id: this.value1,
                    status: this.status,
                    start_time: this.value3,
                    sortName:this.sortName,
                    sortOrder:this.sortOrder,
                    options1 : this.options1
                    
                }
                this.setmyReturnS(d)
                this.$router.push('/returnDetail'+'/'+row.uid); 
            },
            updateList() {
                this.currentPage = 1;
                this.fetchData();

            },
            fetchData() {
                if(Object.keys(this.getmyReturnS).length!=0){
                    this.currentPage = this.getmyReturnS.page;
                    this.value2 =  this.getmyReturnS.tmk_uid;
                    this.value1 =  this.getmyReturnS.school_id;
                    this.status =  this.getmyReturnS.status;
                    this.value3 =  this.getmyReturnS.start_time;
                    this.sortName =  this.getmyReturnS.sortName;
                    this.sortOrder =  this.getmyReturnS.sortOrder;
                    this.options1= this.getmyReturnS.options1;
                }
                let para = {
                    page: this.currentPage,
                    tmk_uid: this.value2,
                    school_id: this.value1,
                    status: this.status,
                    start_time: this.value3[0] != null? new Date(this.value3[0]).toLocaleDateString(): '',
                    end_time: this.value3[1] != null?new Date(this.value3[1]).toLocaleDateString(): '',
                    input: this.input2,
                    tag_id: this.value4,
                    sortName:this.sortName,
                    sortOrder:this.sortOrder
                }

                returnVisitList(token, para).then((res) => { //替换服务
                    this.number = res.data.total;
                    let a = res.data.data;
                    let c = res.data.last_page * this.pagesize;

                    // console.log(a)
                    this.returnData = a;
                    this.total = parseInt(c);
                }).then(()=>{
                    this.loading2 = false;
                    this.setmyReturnS({})
                }).catch(()=>{
                    // this.$message.error('该用户未授权');
                    this.loading2 = false
                })
            },
            handleCurrentChange: function(val) {
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
            // handleClose(tag) { //移除
            //     //调服务删除tag,把整个tag传
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
            //             tagList(token).then(res => {
            //                 this.dynamicTags = res.data.map(item => {
            //                     return item.label
            //                 })
            //                 this.backupTages = res.data
            //             })
            //         }).catch((res)=>{
            //             this.$message.error('该用户未授权')
            //         })
            //         // console.log(index)
            //         // this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1);
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
            //             if(res.code == 0){
            //                 this.$message.success('添加成功')
            //                 tagList(token).then(res => {
            //                     this.dynamicTags = res.data.map(item => {
            //                         return item.label
            //                     })
            //                     this.backupTages = res.data
            //                 })
            //             }
            //             }).catch(()=>{
            //                 this.$message.error('添加失败')
            //             })
            //             // this.dynamicTags.push(inputValue);
            //             //调服务 上送tag
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
            if(Object.keys(this.getmyReturnS).length==0){
                if (this.code.includes('tmk_m')||this.code.includes('cc_c')) {
            getTMK(token).then((res) => {
                this.options1 = res.data;
                 this.options1.unshift({key:0,label:'全部TMK'});
                 this.value2= 0;
            })
                }else{
                    this.fetchData(); //获取表格数据
                    }
            }else{
                this.fetchData(); //获取表格数据
                }
            let cam = {
                simple: '1'
            };
            campusList(cam, token).then((res) => { //获取校区
                let a = res.data;
                this.options = a.map(item => {
                    return {
                        value: item.id,
                        label: item.title
                    };
                });
            })
        },
        computed: {
        ...mapGetters([
            'getmyReturnS'
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
#tableRV{
    position: relative;
}
/* #tableRV .el-table td,
#tableRV .el-table th:not(.gutter) {
    padding: 5px 5px;
    text-align: center
}

#tableRV .el-table th>div,
#tableRV .el-table .cell {
    padding-left: 0;
    padding-right: 0;
} */
/* 
.redwarn .el-message-box__header {
    background-color: #e95c5c;
    padding: 20px 20px 20px;
}

.redwarn .el-message-box__title {
    color: white;
}

.redwarn .el-button--primary {
    background-color: #e95c5c;
    border-color: #e95c5c;
} */

.block {
    text-align: center;
    margin-top: 10px;
}

.accouVisit {
    width: 100%;
    position: relative;
    height: auto;
    background-color: white;
    display: flex;
    flex-wrap: wrap;
  justify-content: flex-start;
  margin-top:0;
  padding-top:10px;
  margin-bottom: 5px;
  border-radius: 5px;
}

.nicknameSpanReturn:hover {
    cursor: pointer;
}
.nicknameSpanReturn{
    font-weight: 600;
    color:#1fb5ad
}

.fourSelect {
    padding-left: 10px;
    margin:0 10px 10px 0;
    width: 160px
}

.studentReturn {
   display: inline-block;
    margin-top: 5px;
    margin-bottom: 15px;
    padding-left: 10px;
    
}

.studentReturnThree {
    display: inline-block;
    width: 105px;
     margin-left: 10px;
     margin-bottom: 15px;
}

.studentReturnThreeS {
    display: inline-block;
    margin-left: 10px;
    width: 159px;
    margin-bottom: 15px;
    
}
.studentReturnThreedate {
    display: inline-block;
    margin-left: 10px;
    /* width: 189px; */
    margin-bottom: 15px;
    
}
/* .studentReturnThreedate .el-date-editor--daterange.el-input{
    width: 189px;
    font-size: 10px
} */
.el-tag--success {
    background-color: #1fb5ad;
    border-color: #bcf1d4;
    color: #FFFFFF;
    border-radius: 25px;
}

.ReturnV .el-tag--success:hover {
    cursor: pointer;
}

.ReturnV .el-tag--danger {
    border-radius: 25px;
}

/* .settingTag {
    position: absolute;
    top: 11px;
    right: 19px;
    color: #1fb5ad;
    z-index: 2000;
    font-size: 14px;
    background-color: #eef6f6;
    cursor: pointer;
} */


/*#tableRV .el-table th:nth-last-child(2){
  text-align: left
}*/

/* .el-dialog .el-dialog__header {
    background-color: #1fb5ad;
    padding: 20px 20px 20px;
}

.el-dialog .el-dialog__title {
    color: white;
} */

/* .tagDialog .input-new-tag {
    width: 120px
} */
</style>
