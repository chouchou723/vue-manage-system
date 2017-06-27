<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item  :to="{ path: '/Index'}"><i class="el-icon-my-shouye"></i> 首页</el-breadcrumb-item>
                <el-breadcrumb-item class='ss'>消息设置</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="form-box">
            <el-form ref="form" :model="form" label-width="120px" label-position='top'>
                <el-form-item label="总部/校区通知">
                    <p style="font-size:12px;color:grey">总部校区有事时通知</p>
                    <el-checkbox-group v-model="form.type">
                        <el-checkbox label="邮件通知" name="type"></el-checkbox>
                        <el-checkbox label="微信通知" name="type"></el-checkbox>
                    </el-checkbox-group>
                </el-form-item>
                <el-form-item label="客户新增通知">
                    <p style="font-size:12px;color:grey">总部校区有事时通知</p>
                    <el-checkbox-group v-model="form.type">
                        <el-checkbox label="邮件通知" name="type"></el-checkbox>
                        <el-checkbox label="微信通知" name="type"></el-checkbox>
                    </el-checkbox-group>
                </el-form-item>
                <el-form-item label="客户认领通知">
                    <p style="font-size:12px;color:grey">总部校区有事时通知</p>
                    <el-checkbox-group v-model="form.type">
                        <el-checkbox label="邮件通知" name="type"></el-checkbox>
                        <el-checkbox label="微信通知" name="type"></el-checkbox>
                    </el-checkbox-group>
                </el-form-item>
                <el-form-item label="客户变更通知">
                    <p style="font-size:12px;color:grey">总部校区有事时通知</p>
                    <el-checkbox-group v-model="form.type">
                        <el-checkbox label="邮件通知" name="type"></el-checkbox>
                        <el-checkbox label="微信通知" name="type"></el-checkbox>
                    </el-checkbox-group>
                </el-form-item>
                <el-form-item label="代办事务通知">
                    <p style="font-size:12px;color:grey">总部校区有事时通知</p>
                    <el-checkbox-group v-model="form.type">
                        <el-checkbox label="邮件通知" name="type"></el-checkbox>
                        <el-checkbox label="微信通知" name="type"></el-checkbox>
                    </el-checkbox-group>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="onSubmit">确定</el-button>
                    <el-button @click="back">取消</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>
<script>
export default {
    data: function() {
        return {
            form: {
                type: ['邮件通知']
            }
        }
    },
    methods: {
        onSubmit() {
            this.$message.success('提交成功！');
        },
        back() {
            this.$router.push('/home');

        }
    }
}
</script>
