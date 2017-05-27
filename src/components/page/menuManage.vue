<template>
<div class="table">
<div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-menu"></i> 组织架构</el-breadcrumb-item>
                 <el-breadcrumb-item >菜单管理</el-breadcrumb-item>
            </el-breadcrumb>
  </div>
        <div  class='addMenuTitle' >
        <h2>菜单管理</h2>
         <el-button type="primary" size="mid" class='buttonAdd' @click="addMenu('aform')">添加菜单</el-button>
         </div>
  <div>
  <el-dialog class='dialog' title="添加菜单" :visible.sync="dialogFormVisible"  :close-on-click-modal="no"  >
  <el-form ref="dynamicValidateForm" :model="dynamicValidateForm"   label-width="100px">
  <el-form-item label="菜单名称" prop='menu_name' >
    <el-input v-model="dynamicValidateForm.menu_name" placeholder='请输入菜单名单'  style="width:180px" ></el-input>
  </el-form-item>
  <el-form-item label="菜单级别" prop='level' >
    <el-select v-model="dynamicValidateForm.level" placeholder="请选择级别" style="width:180px" @change='changeDisplay'>
      <el-option label="一级菜单" value="0"></el-option>
      <el-option label="二级菜单" value="1"></el-option>
      <el-option label="三级菜单" value="2"></el-option>
    </el-select>
  </el-form-item>
  <el-form-item label="上级菜单" prop='kid' v-if='icTop'>
    <el-select v-model="dynamicValidateForm.kid" placeholder="选择直属上级" clearable style="width:180px"  @change='getSecond'>
    <el-option
                    v-for="upMenu in upMenus"
                    :key="upMenu.key"
                    :label="upMenu.label"
                    :value="upMenu.key">
                  </el-option>
    </el-select>
  </el-form-item>
  <el-form-item label="" prop='pid' v-if='icTop1'>
    <el-select v-model="dynamicValidateForm.pid" placeholder="选择直属二级" clearable style="width:180px" >
    <el-option
                    v-for="upMenu1 in upMenus1"
                    :key="upMenu1.key"
                    :label="upMenu1.label"
                    :value="upMenu1.key">
                  </el-option>
    </el-select>
  </el-form-item>
  <el-form-item label="菜单图标" prop='icon' v-if='icDisplay'>
    <el-select v-model="dynamicValidateForm.icon" placeholder="请选择图标" style="width:180px"  popper-class='menuIcon'>
    
      <el-option :class='item.value' v-for="(item,index) in cssClass" :label="index+1" :value='item.value' ></el-option>
      <!-- <el-option label="" value="el-icon-my-shouye"><i class="el-icon-my-shouye"></i></el-option> -->
    </el-select>
  </el-form-item>
  <el-form-item label="选择序号" prop='id' >
   <el-input v-model="dynamicValidateForm.id" placeholder='请输入序号'  style="width:180px" ></el-input>
    </el-select>
  </el-form-item>
  <el-form-item label="菜单地址" prop='location' >
    <el-input v-model="dynamicValidateForm.location" placeholder='请输入菜单地址'  style="width:180px" ></el-input>
  </el-form-item>
  <el-form-item label="显示状态" prop='status' >
    <el-select v-model="dynamicValidateForm.status" placeholder="请选择状态" style="width:180px">
      <el-option label="显示" value="1"></el-option>
      <el-option label="隐藏" value="0"></el-option>
    </el-select>
  </el-form-item>
  <el-form-item style='margin-top:60px'>
    <el-button type="primary" @click="onSubmit('form')">确定</el-button>
    <el-button>取消</el-button>
  </el-form-item>
</el-form>

  </el-dialog>
<el-tree
  :data="data2"
  :props="defaultProps"
  @node-click = "cc"
  node-key="module_id"
  default-expand-all
  :expand-on-click-node="false"
  :render-content="renderContent">
</el-tree>
        </div>
  </div>
</template>
<script>
var user = localStorage.getItem('user');
var token = JSON.parse(user).token;
let  module_id = 1000;
import { rangeList,create_menuList,put_menuList,delete_menuList,get_level,detail_level} from '../../api/api';
  export default {
    data() {
      return {
        // cssClass:[{value:'el-icon-my-shouye',label:"1"},
        //           {value:'el-icon-my-huoquxiaoxi', label:"2"},
        //            {value:'el-icon-my-shezhi', label:"2"}],
        // cssClass:[],
        no:false,
        in:'',
        dialogFormVisible:false,
        iconDisplay:false,
        icDisplay:false,
        icTop:false,
        icTop1:false,
        dynamicValidateForm: {
          module_id:'',
          menu_name:'',
          icon:'',
          id:'',
          location:'',
          status:'',
          level:'',
          kid:'',
          pid:''
        },
        upMenus:[],
          upMenus1:[],
        data2:[],
        defaultProps: {
          label: 'menu_name',
          children: '_child',
        }
      }
    },
    methods: {
      getSecond(){ //获取二级菜单
        get_level({pid:this.dynamicValidateForm.kid},token).then(res=>{
            this.upMenus1 = res.data;
           })
      },
      changeDisplay(){//显示隐藏直属上级
        if(this.dynamicValidateForm.level == 0){

         this.icTop = false;
         this.icTop1 = false;
         this.dynamicValidateForm.kid = '';
         this.dynamicValidateForm.pid = '';
         this.icDisplay = true
        }else if(this.dynamicValidateForm.level == 1){
           this.icDisplay = false
           this.icTop1 = false;
           this.dynamicValidateForm.pid = '';
           this.dynamicValidateForm.icon = '';
           detail_level({module_id:this.dynamicValidateForm.module_id},token).then(res=>{
              this.dynamicValidateForm.kid = res.data.pid-0;
            })
           this.icTop = true;
        }else{
           this.icDisplay = false
           this.dynamicValidateForm.kid = '';
           this.dynamicValidateForm.icon = '';
           detail_level({module_id:this.dynamicValidateForm.module_id},token).then(res=>{
              this.dynamicValidateForm.kid = res.data.one_level-0;
              this.dynamicValidateForm.pid = res.data.pid-0;
            })
           this.icTop = true;
           this.icTop1 = true;
        }
      },
      cc(a,b,c){//点击节点时赋值
        if(b.level == 1){
          this.dynamicValidateForm.level = '0';

        }else if(b.level == 2){
          this.dynamicValidateForm.level = '1';
        }
        else if(b.level == 3){
          this.dynamicValidateForm.level = '2';
        }
      },

      remove(store, data) {//删除
        // console.log(data);
        if(data._child){
            this.$alert('当前菜单有下级菜单,无法删除菜单', '删除菜单', {
                 title:'删除菜单',
                 type: 'warning',
                 customClass:'redwarn',
                 confirmButtonText: '确定'
        });
        }
        else{
            this.$confirm('是否确定要删除该菜单?', '删除菜单', {
                  title:'删除菜单',
                  customClass:'redwarn',
                  confirmButtonText: '确定',
                  cancelButtonText: '取消',
                  type: 'warning'
        }).then(() => {
          let para = {module_id:data.module_id}
        delete_menuList(para,token).then(()=>{
          rangeList(token).then(res=>{

          this.data2 = res.data
        })
        })
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
          
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
      }
      },
      edit(store,data){//修改
        this.dialogFormVisible = true;
        this.dynamicValidateForm.menu_name = data.menu_name;
        this.dynamicValidateForm.module_id = data.module_id;
        this.dynamicValidateForm.location = data.location;
        this.dynamicValidateForm.icon = data.icon;
       this.dynamicValidateForm.status = data.status;
       this.in = '1';
      },
      addMenu(formName){  //点击创建按钮
        this.in = '';
        this.dynamicValidateForm = {
                                        module_id:'',
                                        menu_name:'',
                                        icon:'',
                                        id:'',
                                        location:'',
                                        status:'',
                                        level:'',
                                        kid:'',
                                        pid:''},
            this.dialogFormVisible = true;
            this.dynamicValidateForm.status = '1';
          },
      onSubmit(formName) {
        if(this.dynamicValidateForm.level ==1){
          this.dynamicValidateForm.pid = this.dynamicValidateForm.kid
        }
        let para = this.dynamicValidateForm;
        if(this.in !=0){
put_menuList(para,token).then(()=>{
          rangeList(token).then(res=>{

          this.data2 = res.data
          // console.log(this.data2)
        })
        }).then(()=>{
           this.dialogFormVisible = false;
        })
        }else{
create_menuList(para,token).then(()=>{
          rangeList(token).then(res=>{

          this.data2 = res.data
          // console.log(this.data2)
        })
        }).then(()=>{
           this.dialogFormVisible = false;
        })
        }
        
        

      },
      renderContent(h, { node, data, store }) {
        return (
          <span>
            <span>
              <span>{node.label}</span>
            </span>
            <span style="float: right; margin-right: 20px">
             <el-button type="primary" size="mini" on-click={ () => this.edit(store, data) }>修改</el-button>
              <el-button type="danger" size="mini" on-click={ () => this.remove(store, data) }>删除</el-button>
            </span>
          </span>);
      }
    },
    computed:{
       cssClass(){
        let a = ['el-icon-my-shouye','el-icon-my-shezhi','el-icon-my-shoujianxiang',
                'el-icon-my-xiaoxi','el-icon-my-wendang','el-icon-my-shangchu','el-icon-my-sousuo',
                'el-icon-my-xieyoujian','el-icon-my-jichubangong','el-icon-my-jihua','el-icon-my-hetongguanli',
                'el-icon-my-shengpi','el-icon-my-daiban','el-icon-my-tongzhi','el-icon-my-baobiaoguanli',
                'el-icon-my-yewuzhongxin','el-icon-my-guanliyuancaozuo','el-icon-my-xitongguanli',
                'el-icon-my-caidan','el-icon-my-xiugai',
               'el-icon-my-tongxunlu','el-icon-my-guanliyuan','el-icon-my-yonhu',
                'el-icon-my-tongjifenxi','el-icon-my-gerenxinxi','el-icon-my-tongzhigonggao','el-icon-my-zhuanxierizhi',
                'el-icon-my-rizhi','el-icon-my-chayuerizhi','el-icon-my-chengyuanguanli','el-icon-my-wodericheng',
                'el-icon-my-richenganpai','el-icon-my-richeng','el-icon-my-chayuericheng','el-icon-my-huiyijiyao',
                'el-icon-my-qita','el-icon-my-yibanrenwu','el-icon-my-daibanrenwu','el-icon-my-cailiaopinpai',
                'el-icon-my-chengyuanyingyonchakanqi','el-icon-my-chuchai','el-icon-my-yonhuxinxipingtai',
                'el-icon-my-xitonggongju','el-icon-my-zaixianyonhu','el-icon-my-xuexiyuandi','el-icon-my-gongsilei',
                'el-icon-my-zidian','el-icon-my-weituoguanxiguanli','el-icon-my-kuaijieyingyon','el-icon-my-yoncheguanli',
                'el-icon-my-kaoqinliuchengtongji','el-icon-my-yingyonchengxumuban','el-icon-my-jiaban','el-icon-my-weizhi',
                'el-icon-my-tongyi','el-icon-my-jujue','el-icon-my-xingzhengbangongguanli',
                'el-icon-my-dayinchulijian','el-icon-my-zidianxinxipingtai','el-icon-my-gongwen','el-icon-my-xiangmu',
                'el-icon-my-cailiaochangjia','el-icon-my-mima','el-icon-my-wodejihua',
                'el-icon-my-huiyijiyao1','el-icon-my-ziyuanxinxipingtai','el-icon-my-liuchengchaoqitongji','el-icon-my-zhiduliucheng',
                'el-icon-my-moban','el-icon-my-moban1']
       return   a.map(item=>{
          return {value:item}
        })
       }
    },
    created(){
      rangeList(token).then(res=>{

          this.data2 = res.data
          // console.log(this.data2)
        })
      get_level({pid:0},token).then(res=>{
            this.upMenus = res.data;
           })
    },
    mounted(){
        
        
        // console.log(a)
      
    }
  }
</script>
<style>
.addUserTitle{
  padding:10px 10px 30px 10px;
}
.buttonAdd{
  position:absolute;
  right:0;
  top:0
}
.addMenuTitle{
  width: 100%;
  position:relative;
  height:50px
}
.addMenuTitle .el-button--primary{
    background-color: #32a4d3;
    border-color: #32a4d3;
}
.dialog .el-dialog--small{
  width:50%
}
.redwarn .el-message-box__header{
    background-color: #e95c5c;
    padding: 20px 20px 20px;
}
.redwarn .el-message-box__title{
    color:white;
}
.redwarn .el-button--primary{
    background-color: #e95c5c;
    border-color: #e95c5c;
}
.menuIcon{

}
.menuIcon li{
  display: list-item;
}
</style>