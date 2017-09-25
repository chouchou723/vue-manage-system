import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
    // mode:'history',
    routes: [{
            path: '/',
            redirect: '/login'
        },
        {
            path: '/Index',
            meta: {
                keepAlive: true // 不需要被缓存
            },
            component: resolve => require(['../components/common/Home.vue'], resolve),
            children: [{
                    path: '/',
                    meta: {
                        keepAlive: true // 不需要被缓存
                    },
                    component: resolve => require(['../components/page/Index.vue'], resolve) //首页
                },
                {
                    path: '/setting',
                    meta: {
                        keepAlive: true // 不需要被缓存
                    },
                    component: resolve => require(['../components/page/Setting.vue'], resolve) //设置头像
                },
                {
                    path: '/editPassword',
                    meta: {
                        keepAlive: true // 不需要被缓存
                    },
                    component: resolve => require(['../components/page/EditPassword.vue'], resolve) //密码修改
                },
                {
                    path: '/wechat',
                    meta: {
                        keepAlive: true // 不需要被缓存
                    },
                    component: resolve => require(['../components/page/Wechat.vue'], resolve) //微信绑定
                }, {
                    path: '/message',
                    meta: {
                        keepAlive: true // 不需要被缓存
                    },
                    component: resolve => require(['../components/page/Message.vue'], resolve) //消息设置
                }, {
                    path: '/searchResult',
                    meta: {
                        keepAlive: true // 不需要被缓存
                    },
                    component: resolve => require(['../components/page/searchResult.vue'], resolve) //搜索
                }, {
                    path: '/systemMessage',
                    meta: {
                        keepAlive: true // 不需要被缓存
                    },
                    component: resolve => require(['../components/page/systemMessage.vue'], resolve) //系统通知
                },
                {
                    path: '/calendar',
                    meta: {
                        keepAlive: true // 不需要被缓存
                    },
                    component: resolve => require(['../components/page/calendar.vue'], resolve) //任务提醒
                },
                {
                    path: '/api/v1/admin',
                    meta: {
                        keepAlive: true // 不需要被缓存
                    },
                    component: resolve => require(['../components/page/accountManage.vue'], resolve) // 账号管理
                }, {
                    path: '/api/v1/job',
                    meta: {
                        keepAlive: true // 不需要被缓存
                    },
                    component: resolve => require(['../components/page/jobManage.vue'], resolve) // 职位管理
                }, {
                    path: '/api/v1/role',
                    meta: {
                        keepAlive: true // 不需要被缓存
                    },
                    component: resolve => require(['../components/page/characterManage.vue'], resolve) // 角色管理
                }, {
                    path: '/api/v1/department',
                    meta: {
                        keepAlive: true // 不需要被缓存
                    },
                    component: resolve => require(['../components/page/departmantManage.vue'], resolve) //部门管理
                },  {
                    path: '/schoolManage',
                    meta: {
                        keepAlive: true // 不需要被缓存
                    },
                    component: resolve => require(['../components/page/schoolManage.vue'], resolve) //校区管理
                }, {
                    path: '/api/v1/module',
                    meta: {
                        keepAlive: true // 不需要被缓存
                    },
                    component: resolve => require(['../components/page/menuManage.vue'], resolve) // 菜单管理
                }, {
                    path: '/addUser',
                    meta: {
                        keepAlive: true // 不需要被缓存
                    },
                    component: resolve => require(['../components/page/addUser.vue'], resolve) // 添加用户
                }, {
                    path: '/returnVisit',
                    meta: {
                        keepAlive: false // 需要被缓存
                    },

                    component: resolve => require(['../components/page/returnVisit.vue'], resolve) // 学员回访

                }, {
                    path: '/returnDetail/:post',
                    meta: {
                        keepAlive: true // 不需要被缓存
                    },
                    params: {
                        post: 'rd'
                    },
                    component: resolve => require(['../components/page/returnDetail.vue'], resolve) // 学员回访详情

                },
                {
                    path: '/myResource',
                    meta: {
                        keepAlive: false // 需要被缓存
                    },
                    component: resolve => require(['../components/page/myResource.vue'], resolve) //我的资源

                },
                {
                    path: '/noDemandResource',
                    meta: {
                        keepAlive: false // 需要被缓存
                    },
                    component: resolve => require(['../components/page/noDemandResource.vue'], resolve), //无需求资源
                },
                {
                    path: '/invalidResource',
                    meta: {
                        keepAlive: false // 需要被缓存
                    },
                    component: resolve => require(['../components/page/invalidResource.vue'], resolve), //无效资源
                },
                {
                    path: '/userDetail/:uid/:status/:resource',
                    meta: {
                        keepAlive: true // 不需要被缓存
                    },
                    params: {
                        uid: 'rd',
                        status: '0',
                        resource: 0
                    },
                    component: resolve => require(['../components/page/userDetail.vue'], resolve) // 客户详情

                }, {
                    path: '/reportForm/tmk',
                    meta: {
                        keepAlive: true // 不需要被缓存
                    },
                    component: resolve => require(['../components/page/reportTMK.vue'], resolve), //TMK报表
                    // 报表统计
                },{
                    path: '/reportForm/cc',
                    meta: {
                        keepAlive: true // 不需要被缓存
                    },
                    component: resolve => require(['../components/page/reportSale.vue'], resolve), //cc工作量报表
                    // 报表统计
                },{
                    path: '/addCustomer',
                    meta: {
                        keepAlive: true // 不需要被缓存
                    },
                    component: resolve => require(['../components/page/addCustomer.vue'], resolve), //添加客户

                }, {
                    path: '/publicPool',
                    meta: {
                        keepAlive: true // 不需要被缓存
                    },
                    component: resolve => require(['../components/page/publicPool.vue'], resolve), //客户认领

                }, {
                    path: '/myCustomer',
                    meta: {
                        keepAlive: true // 不需要被缓存
                    },
                    component: resolve => require(['../components/page/myCustomer.vue'], resolve), //我的客户

                }, {
                    path: '/classLibrary',
                    meta: {
                        keepAlive: true // 不需要被缓存
                    },
                    component: resolve => require(['../components/page/classLibrary.vue'], resolve), //课程库

                }, {
                    path: '/promotionLibrary',
                    meta: {
                        keepAlive: true // 不需要被缓存
                    },
                    component: resolve => require(['../components/page/promotionLibrary.vue'], resolve), //优惠库

                },  {
                    path: '/tagLibrary',
                    meta: {
                        keepAlive: true // 不需要被缓存
                    },
                    component: resolve => require(['../components/page/tagLibrary.vue'], resolve), //标签库

                },{
                    path: '/customerDetail/:uid/:status',
                    meta: {
                        keepAlive: true // 不需要被缓存
                    },
                    params: {
                        uid: 'rd',
                        status: '0'
                    },
                    component: resolve => require(['../components/page/customerDetail.vue'], resolve), //客户详细

                }, {
                    path: '/classTable',
                    meta: {
                        keepAlive: true // 不需要被缓存
                    },
                    component: resolve => require(['../components/page/classTable.vue'], resolve), //课程表

                }, {
                    path: '/myStudents',
                    meta: {
                        keepAlive: true // 不需要被缓存
                    },
                    component: resolve => require(['../components/page/myStudents.vue'], resolve), //我的学员

                }, {
                    path: '/myContracts',
                    meta: {
                        keepAlive: true // 不需要被缓存
                    },
                    component: resolve => require(['../components/page/myContracts.vue'], resolve), //我的合同

                }, {
                    path: '/contractDetail/:order_id/:uid',
                    meta: {
                        keepAlive: true // 不需要被缓存
                    },
                    params: {
                        uid: 'ud',
                        order_id: 'od'
                    },
                    component: resolve => require(['../components/page/contractDetail.vue'], resolve), //合同详细

                }, {
                    path: '/studentDetail/:uid',
                    meta: {
                        keepAlive: true // 不需要被缓存
                    },
                    params: {
                        uid: 'ud'
                    },
                    component: resolve => require(['../components/page/studentDetail.vue'], resolve), //学员详细

                }, {
                    path: '/personnelAssign/cc',
                    meta: {
                        keepAlive: true // 不需要被缓存
                    },
                    component: resolve => require(['../components/page/personnelAssignCC.vue'], resolve), //人员调配CC

                }, {
                    path: '/personnelAssign/tmk',
                    meta: {
                        keepAlive: true // 不需要被缓存
                    },
                    component: resolve => require(['../components/page/personnelAssignTMK.vue'], resolve), //人员调配TMK

                }, {
                    path: '/personnelAssign/edu',
                    meta: {
                        keepAlive: true // 不需要被缓存
                    },
                    component: resolve => require(['../components/page/personnelAssignEDU.vue'], resolve), //学员调配教务

                }, {
                    path: '/api/v1/Travel/tplList',
                    meta: {
                        keepAlive: true // 不需要被缓存
                    },
                    component: resolve => require(['../components/page/activityTemplet.vue'], resolve), //活动模板

                }, {
                    path: '/api/v1/Travel/activityList',
                    meta: {
                        keepAlive: true // 不需要被缓存
                    },
                    component: resolve => require(['../components/page/activityAlready.vue'], resolve), //已发起活动

                }, {
                    path: '/activityDetail/:id/:type',
                    meta: {
                        keepAlive: true // 不需要被缓存
                    },
                    params: {
                        id: 'ud',
                        type:'0'
                    },
                    component: resolve => require(['../components/page/activityDetail.vue'], resolve), //活动详细

                }, {
                    path: '/teachStudentManage',
                    meta: {
                        keepAlive: true // 不需要被缓存
                    },
                    component: resolve => require(['../components/page/teachStudentManage.vue'], resolve), //教务学员管理

                }, {
                    path: '/teachstudentDetail/:uid',
                    meta: {
                        keepAlive: true // 不需要被缓存
                    },
                    params: {
                        uid: 'ud'
                    },
                    component: resolve => require(['../components/page/teachstudentDetail.vue'], resolve), //教务学员详细

                }, {
                    path: '/courseTable',
                    meta: {
                        keepAlive: true // 不需要被缓存
                    },
                    component: resolve => require(['../components/page/courseTable.vue'], resolve), //教务课程表

                },{
                    path: '/reportForm/edu',
                    meta: {
                        keepAlive: true // 不需要被缓存
                    },
                    component: resolve => require(['../components/page/reportTeach.vue'], resolve), //教务报表工作量
                },{
                    path: '/reportChange',
                    meta: {
                        keepAlive: true // 不需要被缓存
                    },
                    component: resolve => require(['../components/page/reportChange.vue'], resolve), //教务报表变更流失
                },{
                    path: '/inventoryTable',
                    meta: {
                        keepAlive: true // 不需要被缓存
                    },
                    component: resolve => require(['../components/page/inventoryTable.vue'], resolve), //熊猫到家库存报表
                },{
                    path: '/orderTable',
                    meta: {
                        keepAlive: true // 不需要被缓存
                    },
                    component: resolve => require(['../components/page/orderTable.vue'], resolve), //熊猫到家订单报表
                },{
                    path: '/deliveryTable',
                    meta: {
                        keepAlive: true // 不需要被缓存
                    },
                    component: resolve => require(['../components/page/deliveryTable.vue'], resolve), //熊猫到家发货报表
                },{
                    path: '/salesTable',
                    meta: {
                        keepAlive: true // 不需要被缓存
                    },
                    component: resolve => require(['../components/page/salesTable.vue'], resolve), //熊猫到家销售报表
                },{
                    path: '/purchaseManage',
                    meta: {
                        keepAlive: true // 不需要被缓存
                    },
                    component: resolve => require(['../components/page/purchaseManage.vue'], resolve), //熊猫到家采购管理
                },{
                    path: '/productionLibrary',
                    meta: {
                        keepAlive: true // 不需要被缓存
                    },
                    component: resolve => require(['../components/page/productionLibrary.vue'], resolve), //熊猫到家产品库
                },{
                    path: '/deliveryManage',
                    meta: {
                        keepAlive: true // 不需要被缓存
                    },
                    component: resolve => require(['../components/page/deliveryManage.vue'], resolve), //熊猫到家发货管理
                },{
                    path: '/inventoryManage',
                    meta: {
                        keepAlive: true // 不需要被缓存
                    },
                    component: resolve => require(['../components/page/inventoryManage.vue'], resolve), //熊猫到家库存管理
                },{
                    path: '/orderManage',
                    meta: {
                        keepAlive: true // 不需要被缓存
                    },
                    component: resolve => require(['../components/page/orderManage.vue'], resolve), //熊猫到家订单管理
                },{
                    path: '/approvalManage',
                    meta: {
                        keepAlive: true // 不需要被缓存
                    },
                    component: resolve => require(['../components/page/approvalManage.vue'], resolve), //审批管理
                },
            ]
        },
        {
            path: '/login',
            meta: {
                keepAlive: true // 不需要被缓存
            },
            component: resolve => require(['../components/page/Login.vue'], resolve)
        }, {
            path: '/forgetPassword',
            meta: {
                keepAlive: true // 不需要被缓存
            },
            component: resolve => require(['../components/page/forgetPassword.vue'], resolve) //忘记密码
        },
    ],
    scrollBehavior (to, from, savedPosition) {
        return { x: 0, y: 0 }
      }
})

