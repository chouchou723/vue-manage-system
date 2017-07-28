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
            meta: {
                              keepAlive: true // 不需要被缓存
                            } ,
            component: resolve => require(['../components/common/Home.vue'], resolve),
            children:[
                {
                    path: '/',
                    meta: {
                              keepAlive: true // 不需要被缓存
                            } ,
                    component: resolve => require(['../components/page/Index.vue'], resolve)   //首页
                },
                {
                    path:'/setting',
                    meta: {
                              keepAlive: true // 不需要被缓存
                            } ,
                    component: resolve => require(['../components/page/Setting.vue'],resolve)   //设置头像
                },
                {
                    path:'/editPassword',
                    meta: {
                              keepAlive: true // 不需要被缓存
                            } ,
                    component: resolve => require(['../components/page/EditPassword.vue'],resolve)      //密码修改
                },
                {
                    path:'/wechat',
                    meta: {
                              keepAlive: true // 不需要被缓存
                            } ,
                    component: resolve => require(['../components/page/Wechat.vue'],resolve)            //微信绑定
                },{
                    path:'/message',
                    meta: {
                              keepAlive: true // 不需要被缓存
                            } ,
                    component: resolve => require(['../components/page/Message.vue'],resolve)              //消息设置
                },{
                    path:'/searchResult',
                    meta: {
                              keepAlive: true // 不需要被缓存
                            } ,
                    component: resolve => require(['../components/page/searchResult.vue'],resolve)              //搜索
                },{
                    path:'/systemMessage',
                    meta: {
                              keepAlive: true // 不需要被缓存
                            } ,
                    component: resolve => require(['../components/page/systemMessage.vue'],resolve)              //系统通知
                },
                {
                    path:'/calendar',
                    meta: {
                              keepAlive: true // 不需要被缓存
                            } ,
                    component: resolve => require(['../components/page/calendar.vue'],resolve)      //任务提醒
                },
                {
                    path: '/api/v1/admin',
                    meta: {
                              keepAlive: true // 不需要被缓存
                            } ,
                    component: resolve => require(['../components/page/accountManage.vue'], resolve)     // 账号管理
                },{
                    path: '/api/v1/job',
                    meta: {
                              keepAlive: true // 不需要被缓存
                            } ,
                    component: resolve => require(['../components/page/jobManage.vue'], resolve)     // 职位管理
                },{
                    path: '/api/v1/role',
                    meta: {
                              keepAlive: true // 不需要被缓存
                            } ,
                    component: resolve => require(['../components/page/characterManage.vue'], resolve)     // 角色管理
                },{
                    path: '/api/v1/department',
                    meta: {
                              keepAlive: true // 不需要被缓存
                            } ,
                    component: resolve => require(['../components/page/departmantManage.vue'], resolve)    //部门管理
                },{
                    path: '/api/v1/module',
                    meta: {
                              keepAlive: true // 不需要被缓存
                            } ,
                    component: resolve => require(['../components/page/menuManage.vue'], resolve)     // 菜单管理
                },{
                    path: '/addUser',
                    meta: {
                              keepAlive: true // 不需要被缓存
                            } ,
                    component: resolve => require(['../components/page/addUser.vue'], resolve)     // 添加用户
                },{
                    path: '/returnVisit',
                    meta: {
                              keepAlive: false // 需要被缓存
                            } ,

                    component: resolve => require(['../components/page/returnVisit.vue'], resolve)     // 学员回访
                    
                },{
                    path: '/returnDetail/:post',
                    meta: {
                              keepAlive: true // 不需要被缓存
                            } ,
                            params:{post:'rd'},
                    component: resolve => require(['../components/page/returnDetail.vue'], resolve)// 学员回访详情
                    
                },
                  {
                    path:'/myResource',
                    meta: {
                              keepAlive: false // 需要被缓存
                            } ,
                    component: resolve => require(['../components/page/myResource.vue'],resolve)  //我的资源
                    
                },
                  {
                    path:'/noDemandResource',
                    meta: {
                              keepAlive: false // 需要被缓存
                            },
                    component: resolve => require(['../components/page/noDemandResource.vue'],resolve),  //无需求资源
                },
                  {
                    path:'/invalidResource',
                    meta: {
                              keepAlive: false // 需要被缓存
                            },
                    component: resolve => require(['../components/page/invalidResource.vue'],resolve) , //无效资源
                },
                {
                    path: '/userDetail/:uid/:status/:resource',
                    meta: {
                              keepAlive: true // 不需要被缓存
                            } ,
                             params:{uid:'rd',status:'0',resource:0},
                    component: resolve => require(['../components/page/userDetail.vue'], resolve)    // 客户详情
                    
                },{
                    path: '/reportForm/tmk',
                    meta: {
                              keepAlive: true // 不需要被缓存
                            } ,
                    component: resolve => require(['../components/page/reportForm.vue'], resolve) , //TMK报表
                       // 报表统计
                },,{
                    path: '/reportForm/cc',
                    meta: {
                              keepAlive: true // 不需要被缓存
                            } ,
                    component: resolve => require(['../components/page/reportFormCC.vue'], resolve) , //cc报表
                       // 报表统计
                },{
                    path: '/addCustomer',
                    meta: {
                              keepAlive: true // 不需要被缓存
                            } ,
                    component: resolve => require(['../components/page/addCustomer.vue'], resolve) , //添加客户
                      
                },{
                    path: '/publicPool',
                    meta: {
                              keepAlive: true // 不需要被缓存
                            } ,
                    component: resolve => require(['../components/page/publicPool.vue'], resolve) , //客户认领
                      
                },{
                    path: '/myCustomer',
                    meta: {
                              keepAlive: true // 不需要被缓存
                            } ,
                    component: resolve => require(['../components/page/myCustomer.vue'], resolve) , //我的客户
                      
                },{
                    path: '/classLibrary',
                    meta: {
                              keepAlive: true // 不需要被缓存
                            } ,
                    component: resolve => require(['../components/page/classLibrary.vue'], resolve) , //课程库
                      
                },{
                    path: '/promotionLibrary',
                    meta: {
                              keepAlive: true // 不需要被缓存
                            } ,
                    component: resolve => require(['../components/page/promotionLibrary.vue'], resolve) , //优惠库
                      
                },{
                    path: '/customerDetail/:uid/:status',
                    meta: {
                              keepAlive: true // 不需要被缓存
                            } ,
                            params:{uid:'rd',status:'0'},
                    component: resolve => require(['../components/page/customerDetail.vue'], resolve) , //客户详细
                      
                },{
                    path: '/classTable',
                    meta: {
                              keepAlive: true // 不需要被缓存
                            } ,
                    component: resolve => require(['../components/page/classTable.vue'], resolve) , //课程表
                      
                },{
                    path: '/myStudents',
                    meta: {
                              keepAlive: true // 不需要被缓存
                            } ,
                    component: resolve => require(['../components/page/myStudents.vue'], resolve) , //我的学员
                      
                },{
                    path: '/myContracts',
                    meta: {
                              keepAlive: true // 不需要被缓存
                            } ,
                    component: resolve => require(['../components/page/myContracts.vue'], resolve) , //我的合同
                      
                },{
                    path: '/contractDetail/:order_id/:uid',
                    meta: {
                              keepAlive: true // 不需要被缓存
                            } ,
                            params:{uid:'ud',order_id:'od'},
                    component: resolve => require(['../components/page/contractDetail.vue'], resolve) , //合同详细
                      
                },{
                    path: '/studentDetail/:uid',
                    meta: {
                              keepAlive: true // 不需要被缓存
                            } ,
                             params:{uid:'ud'},
                    component: resolve => require(['../components/page/studentDetail.vue'], resolve) , //学员详细
                      
                }
            ]
        },
        {
            path: '/login',
            meta: {
                              keepAlive: true // 不需要被缓存
                            } ,
            component: resolve => require(['../components/page/Login.vue'], resolve)
        },{
                    path:'/forgetPassword',
                    meta: {
                              keepAlive: true // 不需要被缓存
                            } ,
                    component: resolve => require(['../components/page/forgetPassword.vue'],resolve)      //忘记密码
                },
    ]
})
