<template>
    <div class='frozenLRE'>
        <!-- <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-my-shezhi"></i> 组织架构</el-breadcrumb-item>
                <el-breadcrumb-item class='ss'>校区管理</el-breadcrumb-item>
            </el-breadcrumb>
        </div> -->
        <div class='frozenLH'>
            <div class="frozenLH1">
                <h3 class='frozenLH2'>
               冻结列表
               <span v-if="number==='0'" style="font-size:14px;color: #bdb8b8;">加载中...</span>
           <span v-else>({{number}}个)</span>
                </h3>
                <div class='frozenLS2'>
                    <el-select v-model="value1" clearable placeholder="合同冻结状态" @change="updateList">
                        <el-option label="未开始" value="0"></el-option>
                        <el-option label="冻结中" value="1"></el-option>
                        <el-option label="已解冻" value="2"></el-option>
                        
                    </el-select>
                </div>
                <!-- v-if="this.code.includes('_c')" -->
                <div class='frozenLS3' >
                    <el-select v-model="value2" clearable placeholder="选择校区" @change="updateList">
                        <el-option v-for="item in options" :key="item.id" :label="item.title" :value="item.id">
                        </el-option>
                    </el-select>
                </div>
                <div class='frozenLIN'>
                    <el-input placeholder="请输入合同号或者姓名" icon="search" v-model="input2" :on-icon-click="handleIconClick" @keyup.enter.native="handleIconClick">
                    </el-input>
                </div>
            </div>
        </div>
       
        <div id="tableSM123">
            <el-table :data="accountData" border style='width:100%' @sort-change='sortChange'>
                <el-table-column prop="title" label="合同编号"  width='120'>
                    <template scope="scope">
                        <span @click="switchDetail(scope.row)" class='frozenLRESW'>{{scope.row.sku}}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="child_name" label="学员" width='90'>
                </el-table-column>
                <el-table-column prop="school_name" label="校区" >
                </el-table-column>
                <el-table-column prop="start" label="冻结开始日期"   >
                </el-table-column>
                <el-table-column prop="end" label="冻结结束日期"   >
                </el-table-column>
                <el-table-column prop="money" label="冻结费用" width='80'>
                    </el-table-column>
                    <el-table-column prop="status" label="合同冻结状态" width='100'>
                            <template scope="scope">
                                    <span :style="scope.row.status==='已解冻'?'color:#4aca37':scope.row.status==='冻结中'?'color:#5365e2':'color:#868686'">{{scope.row.status}}</span>
                                </template>
                        </el-table-column>
                            <el-table-column prop="created" label="操作时间" width='120'  sortable='custom'>
                                </el-table-column>
            </el-table>
            <div class="frozenLBlock">
                <el-pagination layout="prev, pager, next" :total="total" :current-page="currentPage" :page-size="pagesize" @current-change="handleCurrentChange">
                </el-pagination>
            </div>
        </div>
    </div>
</template>
<script>
var user,token
import {
    campusList,
    freezeList,
} from '../../api/api';
import {
    mapActions,mapGetters
} from 'vuex';
import getmap from './getMap.vue';
export default {
    components: {
        getmap
    },
    data() {
            return {
                options:[],
                sortName:'',
                sortOrder:'',
                currentPage: 1, //页数
                pagesize: 15, //默认每页
                total: 0, //总页数
                accountData: [],
                number: '0',
                input2: '',
                value1: '', //对应部门select的值
                value2: '', //对应职位select的值   
                loading: false,
                code:''
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
            switchDetail(row) {
                let d = {
                    page: this.currentPage,
                    status: this.value1,
                    school_id: this.value2,
                    sortType: this.sortOrder,
                    sortName: this.sortName,
                }
                this.setMyF(d)
                this.$router.push('/contractDetail/' + row.order_id + '/' + row.uid);
            },
            handleIconClick() {
                this.currentPage = 1;
                this.fetchData();
            },
            updateList() { //表格上方3个select change之后刷新表格
                this.currentPage = 1;
                this.fetchData();
            },
            ...mapActions([
                'setMyF'
            ]),
            fetchData() {
                if(Object.keys(this.getMyF).length!=0){
                    this.currentPage =  this.getMyF.page;
                    this.value1 =  this.getMyF.status;
                    this.value2 =  this.getMyF.school_id;
                    this.sortOrder =  this.getMyF.sortType;
                    this.sortName =  this.getMyF.sortName;
                }
                let para = {
                    page: this.currentPage,
                    status: this.value1,
                    school_id: this.value2,
                    sortType: this.sortOrder,
                    sortName: this.sortName,
                    input: this.input2
                }

                freezeList(para,token).then((res) => { //替换服务
                    this.number = res.data.total;
                    let a = res.data.list;
                    let c = res.data.lastPage * this.pagesize;

                    // console.log(a)
                    this.accountData = a;
                    this.total = parseInt(c);
                }).then(() => {
                    // this.loading2 = false;
                    this.setMyF({})
                }).catch(() => {
                    // this.$message.error('该用户未授权');
                    // this.loading2 = false
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
            // console.log(this.getLC)
            this.code = JSON.parse(user).job ? JSON.parse(user).job.code : '';
            this.fetchData();
            let cam = {
                        simple: 1
                    }
            campusList(cam, token).then((res) => { //获取校区
                        this.options = res.data
                    // this.options.unshift({
                    //         id:0,
                    //         title:'全部校区'
                    //     })
                    })
            // let cam = {
            //     simple: '1'
            // };
            // schoolList(cam, token).then((res) => {//获取校区
            //     let a = res.data.map(item => {
            //         return {
            //             value: item.id,
            //             label: item.title
            //         };
            //     });
            //     this.options = a
            //     this.schools = a//会被动态修改
            // }).then(() => {
               
            // }).then(() => {
               
            // }).then(() => {
            //     cityList(token).then((res) => { //获取城市
            //         this.cities = res.data
            //     })
            // })
        },
        computed: {
            ...mapGetters([
            'getMyF'
            // ...
        ])
        }
}
</script>
<style>

.frozenLBlock {
    text-align: center;
    margin-top: 10px;
}

.frozenLH {
    width: 100%;
    position: relative;
    height: 45px;
    background-color: white;
  /* margin-top:30px; */
  padding-top:10px;
  margin-bottom: 5px;
  border-radius: 5px;
}
.frozenLH2{
    display: inline-block;
    /*margin-top: 20px;*/
    margin-bottom: 15px;
    padding-left: 10px
}
.frozenLS1 {
    display: inline-block;
     margin-bottom: 10px;
    margin-left: 10px;
    width: 140px
}

.frozenLS2 {
   display: inline-block;
     margin-bottom: 10px;
    margin-left: 10px;
    width: 140px
}

.frozenLS3 {
    display: inline-block;
     margin-bottom: 10px;
    margin-left: 10px;
    width: 140px
}
.frozenLIN{
position:absolute;
top:10px;
right:10px;
width:200px
}
.frozenLRESW:hover {
    cursor: pointer;
}
.frozenLRESW{
    font-weight: 600;
        color:#1fb5ad
}
</style>
