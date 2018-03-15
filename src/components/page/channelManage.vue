<template>
        <div id="tableMM">
        <!-- <div class="crumbs">
                    <el-breadcrumb separator="/">
                        <el-breadcrumb-item><i class="el-icon-my-shezhi"></i> 组织架构</el-breadcrumb-item>
                         <el-breadcrumb-item class='ss'>菜单管理</el-breadcrumb-item>
                    </el-breadcrumb>
          </div> -->
                <div  class='channelM2' >
                <h3 class='channelM3'>渠道管理
                    <span v-if="number==='0'" style="font-size:14px;color: #bdb8b8;">加载中...</span>
                    <span v-else>({{number}})</span>
                </h3>
                 <el-button type="primary" size="mid" class='channelM1' @click="addMenu('aform')">添加渠道</el-button>
                 </div>
       
          <el-dialog class='dialog' :title="alTitle" :visible.sync="dialogFormVisible"  :close-on-click-modal="no"  @close = 'resetLevel' size='tiny' top="20%">
          <el-form ref="dynamicValidateForm" :model="dynamicValidateForm" :rules='drule' label-width="100px">
          <el-form-item label="渠道名称" prop='names' >
            <el-input v-model="dynamicValidateForm.names" placeholder='请输入渠道名称'  class="channelM5" ></el-input>
          </el-form-item>
          <el-form-item label="直属渠道" prop='pid' >
              <el-cascader
              :options="options2"
              :props="propsource"
              v-model="dynamicValidateForm.pid"
               change-on-select
              placeholder="选择渠道" >
            </el-cascader>
          </el-form-item>
          <el-form-item >
            <el-button type="primary" @click="onSubmit('dynamicValidateForm')">确定</el-button>
            <el-button @click='dialogFormVisible = false'>取消</el-button>
          </el-form-item>
        </el-form>
        
          </el-dialog>
          <div >

            <div style='background:white;height:40px;line-height:40px;border: 1px solid rgb(209, 229, 229);border-bottom:none;'>
                <span style="margin-left:25px;">渠道名称</span>
                <span style='float:right;margin-right:55px;'>操作</span>
                <span style='float:right;margin-right:212px;width:130px;text-align:center'>创建时间</span>
                <span style='float:right;margin-right:200px;  width:70px;text-align:center'>资源量</span>
            </div>
          <el-tree
          id='channelMt'
          accordion
            :data="data2"
            :props="defaultProps"
            @node-click = "cc"
            node-key="id"
            :expand-on-click-node="cando"
            :render-content="renderContent">
          </el-tree>
          </div>
          </div>
        </template>
        <script>
        var token
        import { delChannel,addChannel,channelList} from '../../api/api';
          export default {
            data() {
              var isName = (rule, value, callback) => {
                var myreg = /^[\u4e00-\u9fa5a-zA-Z0-9()]+$/;
                if (value == '') {
                    callback('请输入渠道名称')
                } else if (!myreg.test(value)) {
                    callback('请输入有效的渠道名称');
                } else {
                    callback();
                }
            }
            var isArr = (rule, value, callback) => {
                if (value.length == 0) {
                    callback('请选择直属上级')
                }else {
                    callback();
                }
            }
              return {
                drule: {
                    names: [{
                        required: true,
                        validator: isName,
                        // message: '请输入姓名',
                        trigger: 'blur'
                    }],
                    pid: [{
                        required: true,
                        message: '请选择直属上级',
                        validator: isArr,
                        trigger: 'change'
                    }]
                  },
                no:false,
                cando:true,
                in:'',
                number: '0',
                options2:[],
                dialogFormVisible:false,
                dynamicValidateForm: {
                  names:'',
                  pid:[],
                },
                data2:[],
                propsource:{
          value: 'id',
          label:'names',
          children: 'children'
        },
                defaultProps: {
                  // key: 'id',
                  label: 'names',
                  children: 'children',
                  total:'total'
                },
                
              }
            },
            methods: {
              resetLevel(){
                // this.false = true;
                this.cando = true;
                this.in = '';
                this.dynamicValidateForm = {
                  names:'',
                  pid:[],
                id:''
              }
              this.$refs['dynamicValidateForm'].resetFields();
              },
        
              remove(store, data) {//删除
                // console.log(data);
                this.cando = false;
                if(data.source_total>0){
                    this.$alert('该渠道已经被使用,无法删除该渠道', '删除渠道', {
                         type: 'warning',
                         customClass:'channelM4',
                         confirmButtonText: '确定'
                }).then(()=>{
                this.cando = true;                  
                }).catch(()=>{
                this.cando = true;                  
                });
                }
                else{
                    this.$confirm('是否确定要删除该渠道?', '删除渠道', {
                          customClass:'channelM4',
                          confirmButtonText: '确定',
                          cancelButtonText: '取消',
                          type: 'warning'
                }).then(() => {
                  let para = {id:data.id}
                  delChannel(para,token).then((res)=>{
                    if(res.code==0){
                      this.$message({
                    type: 'success',
                    message: '删除成功!'
                  });
                  this.cando = true;
                  channelList(token).then(res => {
                              this.data2 = res.data.list;
                              this.number = res.data.total;
                          })

                    }else{
                      this.$message.error(res.data);
                      this.cando = true;
                    }
                })
             }).catch(() => {
                  this.cando = true; 
                //   this.$message({
                //     type: 'info',
                //     message: '已取消删除'
                //   });          
                });
              }
              },
              edit(store,data){//修改
                this.cando = false;
                // console.log(data)
                if(data.source_total>0){
                    this.$alert('该渠道已经被使用,请先解除使用', '修改提示', {
                         type: 'warning',
                         customClass:'channelM4',
                         confirmButtonText: '确定'
                }).then(()=>{
                this.cando = true;   
                }).catch(()=>{
                this.cando = true;                  
                });
                }else{
                    this.dialogFormVisible = true;
                    this.dynamicValidateForm.names = data.names;
                     this.dynamicValidateForm.pid = data.source_path.split(',');
                    this.dynamicValidateForm.id = data.id;
                   this.in = '1';
                }
              },
              addMenu(formName){  //点击创建按钮
                    this.dialogFormVisible = true;
                  },
              onSubmit(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                      let para = {...this.dynamicValidateForm};
                      para.pid = para.pid[para.pid.length-1]
                      if(this.in !=0){
                        this.writeL = true;
                        addChannel(para,token).then(res=>{
                          if(res.code==0){
                            this.$message.success('修改成功');
                            this.writeL = false;
                            this.cando = true;
                            this.dialogFormVisible = false;                            
                            channelList(token).then(res => {
                              this.data2 = res.data.list;
                              this.number = res.data.total;
                          })
                          }else{
                            this.$message.error(res.data);
                            this.writeL = false;
                            this.cando = true;    
                          }
                        })
                      }else{
                        this.writeL = true;
                        addChannel(para,token).then(res=>{
                          if(res.code==0){
                            this.$message.success('添加成功');
                            this.writeL = false;
                            this.cando = true;    
                            this.dialogFormVisible = false;
                            channelList(token).then(res => {
                              this.data2 = res.data.list;
                              this.number = res.data.total;
                          })
                          }else{
                            this.$message.error(res.data);
                            this.writeL = false;
                            this.cando = true;    
                          }
                        })
                      }
                    }
                })
        },
              renderContent(h, { node, data, store }) {
                  // console.log(node)
                return (
                  <span style='font-size:14px;'>
                    <span >
                      <span>{node.label}
                        {node.data.total?
                            <span style="color:#1fb5ad">({node.data.total})</span>
                            :
                            <span ></span>
                        }
                        </span>
                    </span>
                    <span style="float: right; margin-right: 20px">
                        <el-button type="text" size="mini" on-click={ () => this.edit(store, data) }>修改</el-button>
                        <el-button type="text" style='color:red; 'size="mini" on-click={ () => this.remove(store, data) }>删除</el-button>
                        </span>
                        <span  style="float: right; margin-right: 200px;width:130px;text-align:center">
                          <span>{node.data.created_at}</span>
                        </span>  
                        <span  style="float: right; margin-right: 200px;width:70px;text-align:center">
                          <span>{node.data.source_total}</span>
                        </span>
                  </span>);
              }
            },
            computed:{
               alTitle(){
                   if(this.in==''){
                       return '添加渠道'
                   }else{
                    return '修改渠道'
                   }
               },
            },
            beforeCreate(){
                   let user = sessionStorage.getItem('user');
                    token =  JSON.parse(user).token;
                },
            created(){
              channelList(token).then(res => {
                this.data2 = res.data.list;
                this.number = res.data.total;
                this.options2 = [...res.data.list]
                this.options2.unshift({id:'0',names:'无'})
            })

        //       rangeList(token).then(res=>{
        // this.data2 = res.data
        //         }).then(()=>{
        //           get_level({pid:0},token).then(res=>{
        //             this.upMenus = res.data;
        //            })
        //         })
              
            }
          }
        </script>
        <style>
        .channelM1{
          position:absolute;
          right:10px;
          top:16%;
        }
        .channelM2{
          width: 100%;
          position:relative;
          height:40px;
          background-color: white;
          margin-top:0px;
          padding-top:10px;
          margin-bottom: 5px;
          border-radius: 5px;
        }
        .channelM2 .el-button--primary{
            background-color: #32a4d3;
            border-color: #32a4d3;
        }
        .channelM3{
           padding-left: 10px
        }
        .dialog .el-dialog--small{
          width:50%
        }
        .channelM4 .el-message-box__header{
            background-color: #e95c5c;
            padding: 20px 20px 20px;
        }
        .channelM4 .el-message-box__title{
            color:white;
        }
        .channelM4 .el-button--primary{
            background-color: #e95c5c;
            border-color: #e95c5c;
        }
        .el-dialog .el-dialog__header {
            background-color: #1fb5ad;
            padding: 20px 20px 20px;
        }
        
        .el-dialog .el-dialog__title {
            color: white;
        }
        .channelM5{
        width:180px
        }
        #channelMt{
padding-bottom:10px;
        }
        #channelMt .el-tree-node{
          white-space: normal;
        }
        #channelMt .el-tree-node__content{
            border-bottom: 1px solid gainsboro;
    margin-left: 20px;;
    margin-right:20px;
    padding-left: 0;
        }
        </style>