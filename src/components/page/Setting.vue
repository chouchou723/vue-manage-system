<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-date"></i> 首页</el-breadcrumb-item>
                <el-breadcrumb-item>头像设置</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="form-box" style="width:auto">
            <el-form ref="form" :model="form" label-width="80px" style="width:100%">
            <!-- <ul style="list-style:none;margin:100px auto;width:700px;" >
              <li >
                  
            <img class="pre-img" :src="settingsrc" alt="" width="200px" height="200px" style="float:left;border:2px solid grey;border-radius:50%;margin-right:150px">
            
              </li>  
           <li>
               
            <img class="pre-img" :src="src" alt="" width="200px" height="200px" style="float:left;border:2px solid grey;border-radius:50%">
           </li>
                
            </ul>
            <div class="clear"></div>
            <ul style="list-style:none;margin:100px auto;width:700px;" >
            <li>
             <el-button type="info" style='float:left;width:200px;margin-right:150px' @click="changeAvatar">点击更换头像</el-button>
           </li>

              <li >            <vue-core-image-upload :class="['pure-button','pure-button-primary','js-btn-crop']"
                               :crop="false"
                               text="确认上传"
                               url="https://jsonplaceholder.typicode.com/posts/"
                               extensions="png,gif,jpeg,jpg"
                               @:imageuploaded="imageuploaded"
                               @:errorhandle="handleError" style="width:200px;height:36px;" ></vue-core-image-upload>
              </li>  
           
                
            </ul> -->

            <el-upload
  class="avatar-uploader"
  action="https://jsonplaceholder.typicode.com/posts/"
  
  :show-file-list="false"
  :on-success="handleAvatarSuccess"
  :before-upload="beforeAvatarUpload">
  <div style="width:256px;height:256px;border: 1px dashed #967171;border-radius: 50%;position: relative">
    <img v-if="imageUrl" :src="imageUrl" class="avatar">
  <!-- <i class="el-icon-plus avatar-uploader-icon"></i> -->
  </div>
   <el-button size="large" type="primary" style='position:absolute;bottom:36%;margin-left:-52px'>更改头像</el-button>
  
  <!-- <el-button size="large" type="primary" style='position:absolute;bottom:-10%'>点击上传</el-button> -->
</el-upload>
 

            </el-form>
        </div>

    </div>
</template>

<script>
import VueCoreImageUpload  from 'vue-core-image-upload';
import { mapActions } from 'vuex';
import { mapGetters } from 'vuex';
    export default {
        data: function(){
            return {
                form: {
                },
                fileList: [],
                settingsrc : '',
                 imageUrl: ''
            }
        },
        computed:{
          ...mapGetters([
                'getSrc'
      // ...
            ]),
            
        },
        components: {
                'vue-core-image-upload': VueCoreImageUpload
        },
        created(){
          
                let user = localStorage.getItem('user');
                this.imageUrl =  JSON.parse(user).avatar;
            
        },
        methods: {
        ...mapActions([
              'updateSrc'
          ]),
            handleAvatarSuccess(res, file) {
        this.imageUrl = URL.createObjectURL(file.raw);
        // this.updateSrc(this.imageUrl);
        // let d = JSON.stringify(c);     
            // localStorage.setItem('user',d);
        //waiting for the res to reset the localstorage
            },
          beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg';
        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return isJPG && isLt2M;
      }
        }
    }
</script>

<style scoped>
    .clear{ clear:both} 
    .avatar-uploader .el-upload {
    border: 2px dashed #d9d9d9;
    border-radius: 50%;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #20a0ff;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 256px;
    height: 256px;
    line-height: 256px;
    text-align: center;
  }
  .avatar {
    width: 256px;
    height: 256px;
    display: block;
    border-radius: 50%
  }
</style>