<template>
<div id="tableMM">
<!-- <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-my-shezhi"></i> 组织架构</el-breadcrumb-item>
                 <el-breadcrumb-item class='ss'>菜单管理</el-breadcrumb-item>
            </el-breadcrumb>
  </div> -->
        <div  class='addMenuTitle' >
        <h3 class='menuH2'>菜单管理</h3>
         <el-button type="primary" size="mid" class='menubuttonAdd' @click="addMenu('aform')">添加菜单</el-button>
         </div>
  <div>
  <el-dialog class='dialog' title="添加菜单" :visible.sync="dialogFormVisible"  :close-on-click-modal="no"  @close = 'resetLevel'>
  <el-form ref="dynamicValidateForm" :model="dynamicValidateForm"   label-width="100px">
  <el-form-item label="菜单名称" prop='menu_name' >
    <el-input v-model="dynamicValidateForm.menu_name" placeholder='请输入菜单名称'  class="MM180" ></el-input>
  </el-form-item>
  <el-form-item label="菜单级别" prop='level' >
    <el-select v-model="dynamicValidateForm.level" placeholder="请选择级别" class="MM180"  @change='changeDisplay'>
      <el-option label="一级菜单" value="0"></el-option>
      <el-option label="二级菜单" value="1"></el-option>
      <el-option label="三级菜单" value="2"></el-option>
    </el-select>
  </el-form-item>
  <el-form-item label="上级菜单" prop='kid' v-if='icTop'>
    <el-select v-model="dynamicValidateForm.kid" placeholder="选择直属上级" clearable class="MM180"   @change='getSecond'>
    <el-option
                    v-for="upMenu in upMenus"
                    :key="upMenu.key"
                    :label="upMenu.label"
                    :value="upMenu.key">
                  </el-option>
    </el-select>
  </el-form-item>
  <el-form-item label="" prop='pid' v-if='icTop1'>
    <el-select v-model="dynamicValidateForm.pid" placeholder="选择直属二级" clearable class="MM180"  >
    <el-option
                    v-for="upMenu1 in upMenus1"
                    :key="upMenu1.key"
                    :label="upMenu1.label"
                    :value="upMenu1.key">
                  </el-option>
    </el-select>
  </el-form-item>
  <el-form-item label="菜单图标" prop='icon' v-if='dynamicValidateForm.level==="0"'>
    <el-select v-model="dynamicValidateForm.icon" placeholder="请选择图标" class="MM180"   popper-class='menuIcon'>
    
      <el-option :class='[item.value,"iconfont"]'  style='font-size:20px' v-for="(item,index) in cssClass" :label="index+1" :value='item.value' ></el-option>
      <!-- <el-option label="" value="el-icon-my-shouye"><i class="el-icon-my-shouye"></i></el-option> -->
    </el-select>
  </el-form-item>
  <el-form-item label="选择序号" prop='sort_code' >
   <el-input v-model="dynamicValidateForm.sort_code" placeholder='请输入序号'  class="MM180"  ></el-input>
    </el-select>
  </el-form-item>
  <el-form-item label="菜单地址" prop='location' >
    <el-input v-model="dynamicValidateForm.location" placeholder='请输入菜单地址'  class="MM180"  ></el-input>
  </el-form-item>
  <el-form-item label="显示状态" prop='status' >
    <el-select v-model="dynamicValidateForm.status" placeholder="请选择状态" class="MM180" >
      <el-option label="显示" value="1"></el-option>
      <el-option label="隐藏" value="0"></el-option>
    </el-select>
  </el-form-item>
  <el-form-item class='MM60'>
    <el-button type="primary" @click="onSubmit('form')">确定</el-button>
    <el-button @click='dialogFormVisible = false'>取消</el-button>
  </el-form-item>
</el-form>

  </el-dialog>
<el-tree
id='MMtree'
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
var token
import { rangeList,create_menuList,put_menuList,delete_menuList,get_level,detail_level} from '../../api/api';
  export default {
    data() {
      return {
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
          sort_code:'',
          location:'',
          status:'1',
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
      resetLevel(){
        this.dynamicValidateForm.level = '';
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
            this.dynamicValidateForm.status = '1';
      },
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
           if(this.dynamicValidateForm.module_id){

         detail_level({module_id:this.dynamicValidateForm.module_id},token).then(res=>{
         
               this.dynamicValidateForm.sort_code = res.data.sort_code;
            })
           }
         this.icDisplay = true
        }else if(this.dynamicValidateForm.level == 1){
           this.icDisplay = false
           this.icTop1 = false;
           this.dynamicValidateForm.pid = '';
           this.dynamicValidateForm.icon = '';
           if(this.dynamicValidateForm.module_id){

           detail_level({module_id:this.dynamicValidateForm.module_id},token).then(res=>{
              this.dynamicValidateForm.kid = res.data.pid;
               this.dynamicValidateForm.sort_code = res.data.sort_code;
            })
           }
           this.icTop = true;
        }else if(this.dynamicValidateForm.level == 2){
           this.icDisplay = false;
           this.dynamicValidateForm.kid = '';
           this.dynamicValidateForm.icon = '';
             if(this.dynamicValidateForm.module_id){

           detail_level({module_id:this.dynamicValidateForm.module_id},token).then(res=>{
              this.dynamicValidateForm.kid = res.data.one_level;
              this.dynamicValidateForm.pid = res.data.pid;
              this.dynamicValidateForm.sort_code = res.data.sort_code;
            })
             }
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
                 customClass:'MMredwarn',
                 confirmButtonText: '确定'
        });
        }
        else{
            this.$confirm('是否确定要删除该菜单?', '删除菜单', {
                  title:'删除菜单',
                  customClass:'MMredwarn',
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
         this.dynamicValidateForm.full_name = data.menu_name;
        this.dynamicValidateForm.module_id = data.module_id;
        this.dynamicValidateForm.location = data.location;
        this.dynamicValidateForm.icon = data.icon;
       this.dynamicValidateForm.status = data.status;
       this.dynamicValidateForm.sort_code = data.sort_code;
       this.in = '1';
      },
      addMenu(formName){  //点击创建按钮
            this.dialogFormVisible = true;
          },
      onSubmit(formName) {
        let para = {...this.dynamicValidateForm};
        if(this.dynamicValidateForm.level ==1){
          para.pid = para.kid
        }
        if(this.in !=0){
                put_menuList(para,token).then((res)=>{
                  if(res.code==0){
                    this.$message.success('修改成功')
                    rangeList(token).then(res=>{
                    this.data2 = res.data
                  })
                  }
                  return res
                        }).then((res)=>{
                          if(res.code==0){
                            this.dialogFormVisible = false;
                            this.$router.go();

                          }else{
                            this.$message.error(res.message)
                          }
                        })
        }else{
              create_menuList(para,token).then((res)=>{
                if(res.code==0){
                  this.$message.success('创建成功')
                  rangeList(token).then(res=>{
                this.data2 = res.data
                })
                }  
                return res
                      }).then((res)=>{
                        if(res.code==0){
                          this.dialogFormVisible = false;
                          this.$router.go();
                        }else{
                          this.$message.error(res.message)
                        }
                      })
        }
},
      renderContent(h, { node, data, store }) {
        return (
          <span >
            <span >
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
        let a = ['icon-shouye','icon-shezhi','icon-shoujianxiang',
                'icon-xiaoxi','icon-wendang','icon-shangchu','icon-sousuo',
                'icon-xieyoujian','icon-jichubangong','icon-jihua','icon-hetongguanli',
                'icon-shengpi','icon-daiban','icon-tongzhi','icon-baobiaoguanli',
                'icon-yewuzhongxin','icon-guanliyuancaozuo','icon-xitongguanli',
                'icon-caidan','icon-xiugai',
               'icon-tongxunlu','icon-guanliyuan','icon-yonhu',
                'icon-tongjifenxi','icon-gerenxinxi','icon-tongzhigonggao','icon-zhuanxierizhi',
                'icon-rizhi','icon-chayuerizhi','icon-chengyuanguanli','icon-wodericheng',
                'icon-richenganpai','icon-richeng','icon-chayuericheng','icon-huiyijiyao',
                'icon-qita','icon-yibanrenwu','icon-daibanrenwu','icon-cailiaopinpai',
                'icon-chengyuanyingyonchakanqi','icon-chuchai','icon-yonhuxinxipingtai',
                'icon-xitonggongju','icon-zaixianyonhu','icon-xuexiyuandi','icon-gongsilei',
                'icon-zidian','icon-weituoguanxiguanli','icon-kuaijieyingyon','icon-yoncheguanli',
                'icon-kaoqinliuchengtongji','icon-yingyonchengxumuban','icon-jiaban','icon-weizhi',
                'icon-tongyi','icon-jujue','icon-xingzhengbangongguanli',
                'icon-dayinchulijian','icon-zidianxinxipingtai','icon-gongwen','icon-xiangmu',
                'icon-cailiaochangjia','icon-mima','icon-wodejihua',
                'icon-huiyijiyao1','icon-ziyuanxinxipingtai','icon-liuchengchaoqitongji','icon-zhiduliucheng',
                'icon-moban','icon-moban1','icon-fapiao']
       return   a.map(item=>{
          return {value:item}
        })
       }
    },
    beforeCreate(){
           let user = sessionStorage.getItem('user');
            token =  JSON.parse(user).token;
        },
    created(){
      rangeList(token).then(res=>{
this.data2 = res.data
        }).then(()=>{
          get_level({pid:0},token).then(res=>{
            this.upMenus = res.data;
           })
        })
      
    }
  }
</script>
<style>
.addUserTitle{
  padding:10px 10px 30px 10px;
}
.menubuttonAdd{
  position:absolute;
  right:10px;
  top:16%;
}
.addMenuTitle{
  width: 100%;
  position:relative;
  height:40px;
  background-color: white;
  margin-top:0px;
  padding-top:10px;
  margin-bottom: 5px;
  border-radius: 5px;
}
.addMenuTitle .el-button--primary{
    background-color: #32a4d3;
    border-color: #32a4d3;
}
.menuH2{
   padding-left: 10px
}
.dialog .el-dialog--small{
  width:50%
}
.MMredwarn .el-message-box__header{
    background-color: #e95c5c;
    padding: 20px 20px 20px;
}
.MMredwarn .el-message-box__title{
    color:white;
}
.MMredwarn .el-button--primary{
    background-color: #e95c5c;
    border-color: #e95c5c;
}

.menuIcon li{
  display: list-item;
}
.el-dialog .el-dialog__header {
    background-color: #1fb5ad;
    padding: 20px 20px 20px;
}

.el-dialog .el-dialog__title {
    color: white;
}
.MM180{
width:180px
}
.MM60{
margin-top:60px
}
#MMtree .el-tree-node{
  white-space: normal;
}
</style>