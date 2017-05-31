import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
    // mode:'history',
    routes: [
        {
            path: '/',
            redirect: '/login'
        },
        {
            path: '/home',
            component: resolve => require(['../components/common/Home.vue'], resolve),
            children:[
                {
                    path: '/',
                    component: resolve => require(['../components/page/Index.vue'], resolve)   //首页
                },
                {
                    path:'/setting',
                    component: resolve => require(['../components/page/Setting.vue'],resolve)   //设置头像
                },
                {
                    path:'/editPassword',
                    component: resolve => require(['../components/page/EditPassword.vue'],resolve)      //密码修改
                },
                {
                    path:'/wechat',
                    component: resolve => require(['../components/page/Wechat.vue'],resolve)            //微信绑定
                },{
                    path:'/message',
                    component: resolve => require(['../components/page/Message.vue'],resolve)              //消息设置
                },
                {
                    path:'/calendar',
                    component: resolve => require(['../components/page/calendar.vue'],resolve)      //任务提醒
                },
                {
                    path: '/basetable',
                    component: resolve => require(['../components/page/BaseTable.vue'], resolve)
                },
                {
                    path: '/vuetable',
                    component: resolve => require(['../components/page/VueTable.vue'], resolve)     // vue-datasource组件
                },
                {
                    path: '/baseform',
                    component: resolve => require(['../components/page/BaseForm.vue'], resolve)
                },
                {
                    path: '/vueeditor',
                    component: resolve => require(['../components/page/VueEditor.vue'], resolve)    // Vue-Quill-Editor组件
                },
                {
                    path: '/markdown',
                    component: resolve => require(['../components/page/Markdown.vue'], resolve)     // Vue-Quill-Editor组件
                },
                {
                    path: '/upload',
                    component: resolve => require(['../components/page/Upload.vue'], resolve)       // Vue-Core-Image-Upload组件
                },
                {
                    path: '/basecharts',
                    component: resolve => require(['../components/page/BaseCharts.vue'], resolve)   // 报表统计
                },
                {
                    path: '/mixcharts',
                    component: resolve => require(['../components/page/MixCharts.vue'], resolve)    // vue-echarts-v3组件
                },
                {
                    path: '/api/v1/admin',
                    component: resolve => require(['../components/page/accountManage.vue'], resolve)     // 账号管理
                },{
                    path: '/api/v1/job',
                    component: resolve => require(['../components/page/jobManage.vue'], resolve)     // 职位管理
                },{
                    path: '/api/v1/role',
                    component: resolve => require(['../components/page/characterManage.vue'], resolve)     // 角色管理
                },{
                    path: '/api/v1/department',
                    component: resolve => require(['../components/page/departmantManage.vue'], resolve) ,name:'部门'    //部门管理
                },{
                    path: '/addUser',
                    component: resolve => require(['../components/page/addUser.vue'], resolve) ,name:'添加'    // 添加用户
                },{
                    path: '/returnVisit',
                    component: resolve => require(['../components/page/returnVisit.vue'], resolve) ,    // 学员回访
                },{
                    path: '/userDetail',
                    component: resolve => require(['../components/page/userDetail.vue'], resolve) ,    // 学员回访详情
                },{
                    path: '/api/v1/module',
                    component: resolve => require(['../components/page/menuManage.vue'], resolve) ,    // 学员回访详情
                },
                  {
                    path:'/newyi',
                    component: resolve => require(['../components/page/newyi.vue'],resolve) ,  //我的资源
                },
                                  {
                    path:'/nodata',
                    component: resolve => require(['../components/page/nodata.vue'],resolve) ,  //无需求资源
                },
                                  {
                    path:'/noxdata',
                    component: resolve => require(['../components/page/noxdata.vue'],resolve) ,  //无效资源
                },
            ]
        },
        {
            path: '/login',
            component: resolve => require(['../components/page/Login.vue'], resolve)
        },
    ]
})
