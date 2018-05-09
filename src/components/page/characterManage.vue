<template>
    <div class="tableCharacter">
        <!-- <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-my-shezhi"></i> 组织架构</el-breadcrumb-item>
                <el-breadcrumb-item class='ss'>角色管理</el-breadcrumb-item>
            </el-breadcrumb>
        </div> -->
        <div class='crea' >
         <h3 class='charatcterH2'>角色管理</h3>
            <el-button type="primary" size="mid" class='CMbutton' @click="createCh">创建角色</el-button>
        </div>
        <div>
            <el-dialog :title="alter" :visible.sync="dialogFormVisible" :close-on-click-modal="no" top='10%' show-close  class='charDialog' @close='resetTree'>
                <el-form :model="form" ref="form" :rules="rules2">
                    <el-form-item label="角色名称" :label-width="formLabelWidth" prop="name">
                        <el-input v-model="form.name" auto-complete="off" placeholder='请输入角色名称' class='CM200'></el-input>
                    </el-form-item>
                    <el-form-item label="角色编码" :label-width="formLabelWidth" prop="code">
                        <el-input v-model="form.code" auto-complete="off" placeholder='请输入角色编码' class='CM200'></el-input>
                    </el-form-item>
                </el-form>
                <el-tree class='CMtree' :data="data2" show-checkbox="" check-strictly v-model="form.access" node-key="module_id" ref="tree" highlight-current :props="defaultProps" v-loading="loading2">
                </el-tree>
                <div slot="footer" class="dialog-footer">
                    <el-button type="primary" @click="addChar">确 定</el-button>
                    <el-button @click="dialogFormVisible = false">取 消</el-button>
                </div>
            </el-dialog>
        </div>
        <el-table :data="charData" border style="width: 100%;margin-bottom:10px;">
            <el-table-column prop="name" label="">
            </el-table-column>
            <el-table-column width='140px' label="操作">
                <template scope="scope">
                    <el-button type="text" size="small" @click="open4(scope.$index, charData)">修改</el-button>
                    <el-button type="text" size="small" class='CMred' @click="open2(scope.$index, charData)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>
<script>
var token
import {
    character,
    create_character,
    put_character,
    delete_character,
    rangeList,
    detail_character
} from '../../api/api';
export default {
    
    data() {
        var isJob = (rule, value, callback) => {
                var myreg = /^[\u4e00-\u9fa5a-zA-Z0-9]+$/;
                if (value == '') {
                    callback('请输入角色名称')
                } else if (!myreg.test(value)) {
                    callback('请输入有效的角色名称');
                } else {
                    callback();
                }
            }
        return {
            loading2:true,
            charData: [],
            dialogFormVisible: false,
            formLabelWidth: '80px',
            in : '',
            no: false,
            form: {
                roleid: '',
                name: '',
                code:''
            },
            rules2: {
                name: [{
                        required: true,
                        validator: isJob,
                        // message: '请输入职位名称',
                        trigger: 'blur'
                    }],
                },
            data2: [],
            defaultProps: {
                children: '_child',
                label: 'menu_name'
            }
        }
    },
    methods: {
        resetTree(){
            this.in = '';
            this.form.name = '';
            this.form.role_id = '';
            this.form.code = '';
            this.loading2 =  true;
             this.$refs.tree.setCheckedKeys([]);
        },
        createCh() { //点击创建角色
            this.dialogFormVisible = true;
            this.loading2 =  false;
        },
        open2(index, data) { //删除角色
            this.$confirm('是否确定要删除该角色?', '删除角色', {
                    customClass: 'CMredwarn',
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    let a = {
                        roleid: data[index].roleid
                    }
                    delete_character(a, token).then(()=>{
                        character(token).then((res) => {
            this.charData = res.data;
        })
                    });
                    this.$message({
                        type: 'success',
                        message: '删除成功!'
                    });
                })
                // .catch(() => {
                //   this.$message({
                //     type: 'info',
                //     message: '已取消删除'
                //   });          
                // });


        },
        open4(index, data) { //修改角色
            this.form.roleid = data[index].roleid;
            let para = {
                roleid: data[index].roleid
            }
            detail_character(para, token).then(res => {
                // let a = res.data.module_ids
                this.$refs.tree.setCheckedKeys(res.data.module_ids);
                // console.log(a)
            }).then(()=>{
                // if( this.$refs.tree.getCheckedKeys().length !=0){

            this.loading2 =  false;
                // }
            })
            this.in = index;
            this.form.name = data[index].name;
            this.form.code = data[index].code;
            
            this.dialogFormVisible = true;
        },
        addChar() {//确定提交
            let s = this.$refs.tree.getCheckedKeys();
            let a = s.join(',');
            let b = this.form.name;
            let c = this.in;
            let d = this.form.code;
            this.$refs['form'].validate((valid) => {
                if(valid){

                    if (a && b && d && c === '') {
        
                        let para = {
                                name: b,
                                module_id: a,
                                code:d
                            } //number要替换
                        create_character(para, token).then((res) => {
                            if(res.code==0){
                                this.$message.success('创建成功')
                            character(token).then((res) => {
                                this.charData = res.data;
                            })
                        this.dialogFormVisible = false;
                            }
                        });
                    } else if (a && b && d && c !== '') {
                        let para = {
                                role_id: this.form.roleid,
                                name: b,
                                module_id: a,
                                code:d
                                
                            } 
                        put_character(para, token).then((res) => {
                            if(res.code==0){
                                this.$message.success('修改成功')                        
                            character(token).then((res) => {
                                this.charData = res.data;
                            })
                        this.dialogFormVisible = false;
                            }
                        });
                    }else{
                        this.$message.info('请勾选角色权限')
                    }
                }
            })

        }
    },

    beforeCreate() {
        let user = sessionStorage.getItem('user');
        token = JSON.parse(user).token;
    },
    created() {
        character(token).then((res) => {
            this.charData = res.data;
        }).then(()=>{
        rangeList(token).then(res => {
                 this.data2 = res.data
        })

        })
    },
    computed: {
        alter: function() {
            if (this.in === '') {
                return '创建角色'
            }
            return '修改角色'
        }
    }

}
</script>
<style>
    .crea{
width: 100%;position:relative;background-color:white;margin-bottom:5px;padding:15px 0 15px 0;border-radius:5px
    }
.crea .el-button--primary {
    background-color: #32a4d3;
    border-color: #32a4d3;
}

.CMredwarn .el-message-box__header {
    background-color: #e95c5c;
    padding: 20px 20px 20px;
}

.CMredwarn .el-message-box__title {
    color: white;
}

.CMredwarn .el-button--primary {
    background-color: #e95c5c;
    border-color: #e95c5c;
}

.green .el-message-box__header {
    background-color: #1fb5ad;
    padding: 20px 20px 20px;
}

.green .el-message-box__title {
    color: white;
}

.charDialog .el-tree-node__children .el-tree-node {
    float: left;
}

.el-dialog .el-dialog__header {
    background-color: #1fb5ad;
    padding: 20px 20px 20px;
}

.el-dialog .el-dialog__title {
    color: white;
}

.charatcterH2{
    padding-left: 10px
}
.CMbutton{
position:absolute;right:10px;top:16%
}
.CM200{
width:200px
}
.CMred{
    color:red
}
.CMtree{
height:550px;overflow:auto
}
.tableCharacter .el-table th:first-child, .tableCharacter .el-table td:first-child{
        text-align: left;
        padding:5px 5px 5px 20px;
    }
</style>
