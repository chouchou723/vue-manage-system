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
            path: '/Index',
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
                    component: resolve => require(['../components/page/departmantManage.vue'], resolve)    //部门管理
                },{
                    path: '/api/v1/module',
                    component: resolve => require(['../components/page/menuManage.vue'], resolve)     // 菜单管理
                },{
                    path: '/addUser',
                    component: resolve => require(['../components/page/addUser.vue'], resolve)     // 添加用户
                },{
                    path: '/returnVisit',
                    component: resolve => require(['../components/page/returnVisit.vue'], resolve)     // 学员回访
                },{
                    path: '/returnDetail',
                    component: resolve => require(['../components/page/returnDetail.vue'], resolve)     // 学员回访详情
                },
                  {
                    path:'/myResource',
                    component: resolve => require(['../components/page/myResource.vue'],resolve) ,  //我的资源
                },
                                  {
                    path:'/noDemandResource',
                    component: resolve => require(['../components/page/noDemandResource.vue'],resolve) ,  //无需求资源
                },
                                  {
                    path:'/invalidResource',
                    component: resolve => require(['../components/page/invalidResource.vue'],resolve) ,  //无效资源
                },{
                    path: '/userDetail',
                    component: resolve => require(['../components/page/userDetail.vue'], resolve) ,    // 学员详情
                },{
                    path: '/reportForm',
                    component: resolve => require(['../components/page/reportForm.vue'], resolve) ,    // 报表统计
                }
            ]
        },
        {
            path: '/login',
            component: resolve => require(['../components/page/Login.vue'], resolve)
        },
    ]
})
