<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item :to="{ path: '/Index'}"><i class="el-icon-my-shouye"></i> 首页</el-breadcrumb-item>
                <el-breadcrumb-item class='ss'>头像设置</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class='settingT'>
      <h3 class='settingH3'>头像设置</h3>
  </div>
        <div class="form-box" style="width:auto;padding-top:100px;padding-bottom:30px;background-color:white;">
            <!-- <el-form ref="form" :model="form" label-width="80px" style="width:100%"> -->
            <!-- <el-upload
  class="avatar-uploader"
  action="http://crmv2.dfth.com/api/v1/userinfo/uploadAvatar"
  :headers="header"
  :show-file-list="false"
  :on-success="handleAvatarSuccess"
  :before-upload="beforeAvatarUpload"> -->
  
            <div style="width:256px;height:256px;border: 1px dashed #967171;border-radius: 50%;position: relative;margin:0 auto">
             <img class="preview-img avatar"  v-for="(item, index) in img" :src="item.src"  @click="$preview.open(index,img)">
                <!-- <img v-if="imageUrl" :src="imageUrl" class="avatar"> -->
            </div>
            <div style='text-align:center;margin-top:20px'>
                <el-button size="large" type="primary" @click="toggleShow">上传头像</el-button>
            </div>
            <!-- </el-upload> -->
            <!-- </el-form> -->
            <my-upload field="file" @crop-upload-success="cropUploadSuccess" @crop-upload-fail="cropUploadFail" v-model="show" :width="100" :height="100" url="http://crmv2.dfth.com/api/v1/userinfo/uploadAvatar" :headers="headers" img-format="jpg"></my-upload>
        </div>
    </div>
</template>
<script>
import myUpload from 'vue-image-crop-upload/upload-2.vue';


var token, user
import {
    mapActions
} from 'vuex';
import {
    mapGetters
} from 'vuex';
import {
    upload
} from '../../api/api';
export default {
    data: function() {
        return {
            show: false,
            headers: {
                Authorization: token.Authorization,
            },
            img:[{src:'',
                  w: 400,
                  h: 400}]
        }
    },
    components: {
        'my-upload': myUpload
    },
    computed: {

    },
    created() {
        this.img[0].src = JSON.parse(user).avatar;
    },
    methods: {
        toggleShow() {
            this.show = !this.show;
        },
        cropUploadSuccess(jsonData, field) {
          // this.$message({
          //                             message: '上传成功',
          //                             type: 'success'
          //                         })
            // this.imageUrl = jsonData.data
            console.log(jsonData)
            let a = JSON.parse(user);
            a.avatar = jsonData.data;
            localStorage.setItem('user', JSON.stringify(a));
            this.$router.go();
        },
        cropUploadFail(status, field) {
            this.$message.error('上传失败')
        },
        //       handleAvatarSuccess(res, file) {
        //   this.$message({
        //                               message: '上传成功',
        //                               type: 'success'
        //                           })
        //   this.imageUrl = URL.createObjectURL(file.raw)
        // let a =  JSON.parse(user);
        // a.avatar = res.data;
        // localStorage.setItem('user', JSON.stringify(a));
        //     // console.log( a)


        //   this.$router.go();
        //       },
        //     beforeAvatarUpload(file) {
        //   // const isJPG = file.type === 'image/jpeg';
        //   const isLt2M = file.size / 1024 / 1024 < 2;

        //   // if (!isJPG) {
        //   //   this.$message.error('上传头像图片只能是 JPG 格式!');
        //   // }
        //   if (!isLt2M) {
        //     this.$message.error('上传头像图片大小不能超过 2MB!');
        //   }
        //   return isLt2M;
        // }
    },
    beforeCreate() {
        user = localStorage.getItem('user');
        token = JSON.parse(user).token;
    },
}
</script>
<style scoped>
.clear {
    clear: both
}
.settingT{
     width: 100%;
    position: relative;
    height: 35px;
    background-color: white;
  margin-top:30px;
  padding-top:10px;
  margin-bottom: 10px;
  border-radius: 5px;
}
.settingH3{
    margin-bottom:15px;
    margin-left:10px;
}
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
