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
                    component: resolve => require(['../components/page/Readme.vue'], resolve)
                },
                {
                    path:'/setting',
                    component: resolve => require(['../components/page/Setting.vue'],resolve)
                },
                {
                    path:'/editPassword',
                    component: resolve => require(['../components/page/EditPassword.vue'],resolve)
                },
                {
                    path:'/wechat',
                    component: resolve => require(['../components/page/Wechat.vue'],resolve)
                },{
                    path:'/message',
                    component: resolve => require(['../components/page/Message.vue'],resolve)
                },
                {
                    path:'/calendar',
                    component: resolve => require(['../components/page/calendar.vue'],resolve)
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
                    component: resolve => require(['../components/page/BaseCharts.vue'], resolve)   // vue-echarts-v3组件
                },
                {
                    path: '/mixcharts',
                    component: resolve => require(['../components/page/MixCharts.vue'], resolve)    // vue-echarts-v3组件
                },
                {
                    path: '/api/v1/admin',
                    component: resolve => require(['../components/page/accountManage.vue'], resolve)     // vue-datasource组件
                },{
                    path: '/api/v1/job',
                    component: resolve => require(['../components/page/jobManage.vue'], resolve)     // 职位管理
                },{
                    path: '/api/v1/role',
                    component: resolve => require(['../components/page/characterManage.vue'], resolve)     // vue-datasource组件
                },{
                    path: '/api/v1/department',
                    component: resolve => require(['../components/page/departmantManage.vue'], resolve) ,name:'部门'    // vue-datasource组件
                },{
                    path: '/addUser',
                    component: resolve => require(['../components/page/addUser.vue'], resolve) ,name:'添加'    // vue-datasource组件
                },{
                    path: '/returnVisit',
                    component: resolve => require(['../components/page/returnVisit.vue'], resolve) ,    // vue-datasource组件
                }
            ]
        },
        {
            path: '/login',
            component: resolve => require(['../components/page/Login.vue'], resolve)
        },
    ]
})
