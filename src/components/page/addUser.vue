<template>
<div class="table">
<div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-menu"></i> 客户管理</el-breadcrumb-item>
                <el-breadcrumb-item>我的资源</el-breadcrumb-item>
                 <el-breadcrumb-item>添加客户</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div  style="width: 100%;position:relative;padding:10px 10px 30px 10px;">
        <h2>添加用户资料</h2>
         </div>


        <div>
<el-form ref="form" :model="form" label-width="80px">
  <el-form-item label="学生姓名">
    <el-input v-model="form.name" placeholder='请输入学生姓名' style="width:142px"></el-input>
  </el-form-item>
  <el-form-item label="性别">
    <el-select v-model="form.region" placeholder="请选择性别" style="width:142px">
      <el-option label="男" value="1"></el-option>
      <el-option label="女" value="0"></el-option>
    </el-select>
  </el-form-item>
  <el-form-item label="联系家长">
    <el-col :span="4">
    <el-input v-model="form.name" placeholder='请输入家长姓名' ></el-input>
    </el-col>
    <el-col class="line" :span="1">&nbsp</el-col>
    <el-col :span="4">
    <el-select v-model="form.region" placeholder="请选择关系">
      <el-option label="男" value="1"></el-option>
      <el-option label="女" value="0"></el-option>
    </el-select>
    </el-col>
    <el-col class="line" :span="1">&nbsp</el-col>
    <el-col :span="4">
    <el-input v-model="form.name" placeholder='请输入手机号' ></el-input>
    </el-col>
  </el-form-item>
  <el-form-item label="">
    <el-col :span="4">
    <el-input v-model="form.name" placeholder='请输入家长姓名'></el-input>
    </el-col>
    <el-col class="line" :span="1">&nbsp</el-col>
    <el-col :span="4">
    <el-select v-model="form.region" placeholder="请选择关系">
      <el-option label="男" value="1"></el-option>
      <el-option label="女" value="0"></el-option>
    </el-select>
    </el-col>
    <el-col class="line" :span="1">&nbsp</el-col>
    <el-col :span="4">
    <el-input v-model="form.name" placeholder='请输入手机号' ></el-input>
    </el-col>
    <el-col :span="4">
   <span style="margin-left:10px;width:200px" placeholder='请输入角色名称'> (选填)</span>
    </el-col>
  </el-form-item>

<el-form-item label="所在地区">
    <el-col :span="4">
    <el-select v-model="form.region" placeholder="请选择城市">
      <el-option label="上海" value="1"></el-option>
      <el-option label="北京" value="0"></el-option>
    </el-select>
    </el-col>
    <el-col class="line" :span="1">&nbsp</el-col>
    <el-col :span="4">
    <el-select v-model="form.region" placeholder="请选择城区">
      <el-option label="男" value="1"></el-option>
      <el-option label="女" value="0"></el-option>
    </el-select>
    </el-col>
    <el-col class="line" :span="1">&nbsp</el-col>
    <el-col :span="4">
    <el-select v-model="form.region" placeholder="请选择地标">
      <el-option label="男" value="1"></el-option>
      <el-option label="女" value="0"></el-option>
    </el-select>
    </el-col>
  </el-form-item>

  <el-form-item label="就近校区">
    <el-select v-model="form.region" placeholder="请选择校区" style="width:142px">
      <el-option label="徐汇校区" value="1"></el-option>
      <el-option label="静安校区" value="0"></el-option>
    </el-select>
  </el-form-item>

  <el-form-item label="来源渠道">
    <el-col :span="4">
    <el-select v-model="form.region" placeholder="请选择渠道">
      <el-option label="转介绍" value="1"></el-option>
      <el-option label="上门" value="0"></el-option>
    </el-select>
    </el-col>
    <el-col class="line" :span="1">&nbsp</el-col>
    <el-col :span="4">
    <el-input v-model="form.name" placeholder='请输入学生姓名' style="width:142px"></el-input>
    </el-col>
    <el-col :span="4">
   <span style="margin-left:10px;width:200px;color:red" > {{warning}}</span>
    </el-col>
  </el-form-item>
  <el-form-item style='margin-top:60px'>
    <el-button type="primary" @click="onSubmit">确定</el-button>
    <el-button>取消</el-button>
  </el-form-item>
</el-form>

        </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        warning:'*系统中没有该成员',
        form: {
          name: '',
          region: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: ''
        }
      }
    },
    methods: {
      onSubmit() {
        console.log('submit!');
      }
    }
  }
</script>
<style>
</style>