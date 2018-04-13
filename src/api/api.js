import axios from 'axios';
import { Message } from 'element-ui';
import {router} from '../router';
axios.interceptors.response.use(function (response) {
    return response;
  }, function (error) {
    // 处理统一的验证失效错误
    if(error.response.status==401){
        Message.error('您的帐号已在其他地方登录,请重新登录');
        router.push('/login')
    }else if(error.response.status==405){
            Message.error('请联系管理员确认您的权限')    
        }else if(error.response.status==500){
            Message.error('服务器内部错误,请联系管理员')        
        }else{
            Message.error('请联系管理员检查该问题')
        }   
    return Promise.reject(error);
  });
// let base ='';
let base = 'http://pstest.dfth.com';
// let base = 'http://panda.dfth.com';

//登录页面
export const requestLogin = params => {
    return axios.post(`${base}/api/v1/admin/login`, params).then(res => res.data); };

//获取用户信息
export const getUserinfo = (token) => {
    axios.defaults.headers.common['Authorization'] = token.Authorization;
    return axios.get(`${base}/api/v1/userinfo/user`).then(res => res.data);
};

//获取自己菜单
export const menuList = (token,params) => {
    axios.defaults.headers.common['Authorization'] = token.Authorization;
    return axios.get(`${base}/api/v1/userinfo/menu`,{ params: params }).then(res => res.data);
};

//忘记密码获取验证码
export const findPassword = params => {
    return axios.post(`${base}/auth/findpwd`, params).then(res => res.data); };


//忘记密码提交修改密码
export const findToEditPwd = params => {
    return axios.post(`${base}/auth/changepwd`, params).then(res => res.data); };

//上传头像
export const upload = (token,params) => {
    axios.defaults.headers.common['Authorization'] = token.Authorization;
    return axios.post(`${base}/api/v1/userinfo/uploadAvatar`,params).then(res => res.data);
};

//获取菜单权限
export const getAccess = (token,params) => {
    axios.defaults.headers.common['Authorization'] = token.Authorization;
    return axios.post(`${base}/api/v1/public/authority`,params).then(res => res.data);
};

//提交修改密码
export const editPass = (token,params) => {
    axios.defaults.headers.common['Authorization'] = token.Authorization;
    return axios.post(`${base}/api/v1/userinfo/modifyPass`,params).then(res => res.data);
};

//修改密码获取邮箱验证码
export const mailCode = (token) => {
    axios.defaults.headers.common['Authorization'] = token.Authorization;
    return axios.post(`${base}/api/v1/admin/sendMail`).then(res => res.data);
};

//微信绑定验证码
export const qCode = (params, token) => {
    axios.defaults.headers.common['Authorization'] = token.Authorization;
    return axios.post(`${base}/api/v1/admin/binding`, params).then(res => res.data);
};

//二维码登陆
export const qcodeLogin = (params) => {
    return axios.get(`${base}/auth/loginQrCode`, { params: params }).then(res => res.data); };

//获取当月任务提醒
export const getTask = (params, token) => {
    axios.defaults.headers.common['Authorization'] = token.Authorization;
    return axios.get(`${base}/api/v1/reminder/list`, { params: params }).then(res => res.data);
};

//获取当天任务提醒
export const getDayTask = (params, token) => {
    axios.defaults.headers.common['Authorization'] = token.Authorization;
    return axios.get(`${base}/api/v1/reminder/day`, { params: params }).then(res => res.data);
};

//顶部搜索
export const searchResource = (params, token) => {
    axios.defaults.headers.common['Authorization'] = token.Authorization;
    return axios.get(`${base}/api/v1/search`, { params: params }).then(res => res.data);
};

//获取首页表格数据
export const getIndexData = (token,params) => {
    axios.defaults.headers.common['Authorization'] = token.Authorization;
    return axios.get(`${base}/api/v1/customer/forms`, { params: params }).then(res => res.data);
};
//获取资源统计表折线图数据
export const gettmkFormsPiclData = (token,params) => {
    axios.defaults.headers.common['Authorization'] = token.Authorization;
    return axios.get(`${base}/api/v1/reportForms/tmkFormsPic`, { params: params }).then(res => res.data);
};
//获取资源统计表表格数据
export const gettmkFormsTableData = (token,params) => {
    axios.defaults.headers.common['Authorization'] = token.Authorization;
    return axios.get(`${base}/api/v1/reportForms/tmkFormsTable`, { params: params }).then(res => res.data);
};
//获取资源统计表饼图数据
export const gettmkFormsSource = (token,params) => {
    axios.defaults.headers.common['Authorization'] = token.Authorization;
    return axios.get(`${base}/api/v1/reportForms/tmkFormsSource`, { params: params }).then(res => res.data);
};
//获取资源统计表饼图表格数据
export const tmkFormsSourceTable = (token,params) => {
    axios.defaults.headers.common['Authorization'] = token.Authorization;
    return axios.get(`${base}/api/v1/reportForms/tmkFormsSourceTable`, { params: params }).then(res => res.data);
};
//获取资源统计表销售经理查看TMK排行榜
export const gettmkRankList = (token,params) => {
    axios.defaults.headers.common['Authorization'] = token.Authorization;
    return axios.get(`${base}/api/v1/reportForms/tmkRankList`, { params: params }).then(res => res.data);
};

//获取资源发展表折线图数据
export const gettmkFormsDevelop = (token,params) => {
    axios.defaults.headers.common['Authorization'] = token.Authorization;
    return axios.get(`${base}/api/v1/reportForms/tmkFormsDevelop`, { params: params }).then(res => res.data);
};
//获取CC资源发展表折线图数据
export const getccWorkloadPic = (token,params) => {
    axios.defaults.headers.common['Authorization'] = token.Authorization;
    return axios.get(`${base}/api/v1/reportForms/ccWorkloadPic`, { params: params }).then(res => res.data);
};
//获取CC资源发展表漏斗图数据
export const getccWorkloadFunnel = (token,params) => {
    axios.defaults.headers.common['Authorization'] = token.Authorization;
    return axios.get(`${base}/api/v1/reportForms/ccWorkloadFunnel`, { params: params }).then(res => res.data);
};
//获取CC资源发展表两个饼图一个列表数据
export const getccCourseOrder = (token,params) => {
    axios.defaults.headers.common['Authorization'] = token.Authorization;
    return axios.get(`${base}/api/v1/reportForms/ccCourseOrder`, { params: params }).then(res => res.data);
};
//获取CC资源发展表大列表数据
export const getccWorkloadList = (token,params) => {
    axios.defaults.headers.common['Authorization'] = token.Authorization;
    return axios.get(`${base}/api/v1/reportForms/ccWorkloadList`, { params: params }).then(res => res.data);
};
//获取CC资源发展表排行榜数据
export const getccWorkloadRank = (token,params) => {
    axios.defaults.headers.common['Authorization'] = token.Authorization;
    return axios.get(`${base}/api/v1/reportForms/ccWorkloadRank`, { params: params }).then(res => res.data);
};
//获取教务报表折线图数据
export const getteachFormsPic = (token,params) => {
    axios.defaults.headers.common['Authorization'] = token.Authorization;
    return axios.get(`${base}/api/v1/reportForms/teachFormsPic`, { params: params }).then(res => res.data);
};

//获取教务报表表格数据
export const getteachFormsList = (token,params) => {
    axios.defaults.headers.common['Authorization'] = token.Authorization;
    return axios.get(`${base}/api/v1/reportForms/teachFormsList`, { params: params }).then(res => res.data);
};

//获取教务报表排行榜数据
export const getteachFormsRank = (token,params) => {
    axios.defaults.headers.common['Authorization'] = token.Authorization;
    return axios.get(`${base}/api/v1/reportForms/teachFormsRank`, { params: params }).then(res => res.data);
};

//获取教务报表业绩指标数据
export const getteachachievementForms = (token,params) => {
    axios.defaults.headers.common['Authorization'] = token.Authorization;
    return axios.get(`${base}/api/v1/reportForms/achievementForms`, { params: params }).then(res => res.data);
};

//获取部门
export const department = (token) => {
    axios.defaults.headers.common['Authorization'] = token.Authorization;
    return axios.get(`${base}/api/v1/department/list`).then(res => res.data);
};

//获取账户类型
export const accountType = (token) => {
    axios.defaults.headers.common['Authorization'] = token.Authorization;
    return axios.get(`${base}/api/v1/account/list`).then(res => res.data);
};

//创建部门
export const create_department = (params, token) => {
    axios.defaults.headers.common['Authorization'] = token.Authorization;
    return axios.post(`${base}/api/v1/department/add`, params).then(res => res.data);
};
//修改部门
export const put_department = (params, token) => {
    axios.defaults.headers.common['Authorization'] = token.Authorization;
    return axios.put(`${base}/api/v1/department/update`, params).then(res => res.data);
};
//删除部门
export const delete_department = (params, token) => {
    axios.defaults.headers.common['Authorization'] = token.Authorization;
    return axios.delete(`${base}/api/v1/department/delete`, { params: params }).then(res => res.data);
};



//获取账号
export const account = (params, token) => {
    axios.defaults.headers.common['Authorization'] = token.Authorization;
    return axios.get(`${base}/api/v1/account/list`, { params: params }).then(res => res.data);
};

//创建账号
export const create_account = (params, token) => {
    axios.defaults.headers.common['Authorization'] = token.Authorization;
    return axios.post(`${base}/api/v1/account/add`, params).then(res => res.data);
};

//修改账号
export const put_account = (params, token) => {
    axios.defaults.headers.common['Authorization'] = token.Authorization;
    return axios.put(`${base}/api/v1/account/update`, params).then(res => res.data);
};

//删除账号
export const delete_account = (params, token) => {
    axios.defaults.headers.common['Authorization'] = token.Authorization;
    return axios.delete(`${base}/api/v1/account/delete`, { params: params }).then(res => res.data);
};

//获取校区select											
export const sdjList = (token) => {
    axios.defaults.headers.common['Authorization'] = token.Authorization;
    return axios.get(`${base}/api/v1/account/filter/data`).then(res => res.data);
};

//获取城市
export const cityList = (token, params) => {
    axios.defaults.headers.common['Authorization'] = token.Authorization;
    return axios.get(`${base}/api/v1/public/getCityList`, { params: params }).then(res => res.data);
};

//根据城市获取校区
export const campusList = (params, token) => {
    axios.defaults.headers.common['Authorization'] = token.Authorization;
    return axios.get(`${base}/api/v1/school/list`, { params: params }).then(res => res.data);
};

//校区详情
export const schoolDetail = (params, token) => {
    axios.defaults.headers.common['Authorization'] = token.Authorization;
    return axios.get(`${base}/api/v1/school/show`, { params: params }).then(res => res.data);
};

//添加学校
export const add_school = (params, token) => {
    axios.defaults.headers.common['Authorization'] = token.Authorization;
    return axios.post(`${base}/api/v1/school/store`, params).then(res => res.data);
};
// 帐号停用筛选
// export const list_account = (token) => {
//     axios.defaults.headers.common['Authorization'] = token.Authorization;
//     return axios.get(`${base}/api/v1/account/list`).then(res => res.data);
// };

//获取角色
export const character = (token) => {
    axios.defaults.headers.common['Authorization'] = token.Authorization;
    return axios.get(`${base}/api/v1/role/list`).then(res => res.data);
};
//创建角色
export const create_character = (params, token) => {
    axios.defaults.headers.common['Authorization'] = token.Authorization;
    return axios.post(`${base}/api/v1/role/add`, params).then(res => res.data);
};

//修改角色
export const put_character = (params, token) => {
    axios.defaults.headers.common['Authorization'] = token.Authorization;
    return axios.put(`${base}/api/v1/role/update`, params).then(res => res.data);
};

//删除角色
export const delete_character = (params, token) => {
    axios.defaults.headers.common['Authorization'] = token.Authorization;
    return axios.delete(`${base}/api/v1/role/delete`, { params: params }).then(res => res.data);
};

//菜单管理中获取菜单列表,角色管理里修改角色时获取的权限菜单
export const rangeList = (token) => {
    axios.defaults.headers.common['Authorization'] = token.Authorization;
    return axios.get(`${base}/api/v1/module/list`).then(res => res.data);
};

//获取角色详情
export const detail_character = (params, token) => {
    axios.defaults.headers.common['Authorization'] = token.Authorization;
    return axios.get(`${base}/api/v1/role/show`, { params: params }).then(res => res.data);
};


//职位管理中获取权限
export const getCharacter = (token) => {
    axios.defaults.headers.common['Authorization'] = token.Authorization;
    return axios.get(`${base}/api/v1/public/roles`).then(res => res.data);
};

//获取职位
export const departList = (params, token) => {
    axios.defaults.headers.common['Authorization'] = token.Authorization;
    return axios.get(`${base}/api/v1/job/list`, { params: params }).then(res => res.data);
};

//创建职位
export const create_departList = (params, token) => {
    axios.defaults.headers.common['Authorization'] = token.Authorization;
    return axios.post(`${base}/api/v1/job/add`, params).then(res => res.data);
};

//修改职位
export const put_departList = (params, token) => {
    axios.defaults.headers.common['Authorization'] = token.Authorization;
    return axios.put(`${base}/api/v1/job/update`, params).then(res => res.data);
};

//删除职位
export const delete_departList = (params, token) => {
    axios.defaults.headers.common['Authorization'] = token.Authorization;
    return axios.delete(`${base}/api/v1/job/delete`, { params: params }).then(res => res.data);
};

//获取职位详情
export const detail_departList = (params, token) => {
    axios.defaults.headers.common['Authorization'] = token.Authorization;
    return axios.get(`${base}/api/v1/job/show`, { params: params }).then(res => res.data);
};




//创建菜单
export const create_menuList = (params, token) => {
    axios.defaults.headers.common['Authorization'] = token.Authorization;
    return axios.post(`${base}/api/v1/module/add`, params).then(res => res.data);
};

//修改菜单
export const put_menuList = (params, token) => {
    axios.defaults.headers.common['Authorization'] = token.Authorization;
    return axios.put(`${base}/api/v1/module/update`, params).then(res => res.data);
};

//删除菜单
export const delete_menuList = (params, token) => {
    axios.defaults.headers.common['Authorization'] = token.Authorization;
    return axios.delete(`${base}/api/v1/module/delete`, { params: params }).then(res => res.data);
};

//获取一级职位列表
export const get_level = (params, token) => {
    axios.defaults.headers.common['Authorization'] = token.Authorization;
    return axios.get(`${base}/api/v1/public/getMenuList`, { params: params }).then(res => res.data);
};

//获取级别详情
export const detail_level = (params, token) => {
    axios.defaults.headers.common['Authorization'] = token.Authorization;
    return axios.get(`${base}/api/v1/module/show`, { params: params }).then(res => res.data);
};


//TMK


//获取回访列表
export const returnVisitList = (token, params) => {
    axios.defaults.headers.common['Authorization'] = token.Authorization;
    return axios.get(`${base}/api/v1/users/list`, { params: params }).then(res => res.data);
};

//获取回访详细
export const returnVisitDetail = (token, params) => {
    axios.defaults.headers.common['Authorization'] = token.Authorization;
    return axios.get(`${base}/api/v1/users/show`, { params: params }).then(res => res.data);
};

//获取回访记录
export const getVisitList = (token, params) => {
    axios.defaults.headers.common['Authorization'] = token.Authorization;
    return axios.get(`${base}/api/v1/visit/list`, { params: params }).then(res => res.data);
};

//添加回访记录
export const create_returnList = (params, token) => {
    axios.defaults.headers.common['Authorization'] = token.Authorization;
    return axios.post(`${base}/api/v1/visit/add`, params).then(res => res.data);
};

//修改回访记录
export const put_returnList = (params, token) => {
    axios.defaults.headers.common['Authorization'] = token.Authorization;
    return axios.put(`${base}/api/v1/visit/update`, params).then(res => res.data);
};

//添加学员
export const create_student = (params, token) => {
    axios.defaults.headers.common['Authorization'] = token.Authorization;
    return axios.post(`${base}/api/v1/customer/add`, params).then(res => res.data);
};

//修改学员
export const put_student = (params, token) => {
    axios.defaults.headers.common['Authorization'] = token.Authorization;
    return axios.post(`${base}/api/v1/users/update`, params).then(res => res.data);
};

//获取标签列表
export const getTagList = (token,params) => {
    axios.defaults.headers.common['Authorization'] = token.Authorization;
    return axios.get(`${base}/api/v1/tag/getTagsLists`,{ params: params }).then(res => res.data);
};

//获取来源渠道
export const sourceList = (token) => {
    axios.defaults.headers.common['Authorization'] = token.Authorization;
    return axios.get(`${base}/api/v1/public/getSource`).then(res => res.data);
};

//获取标签
export const tagList = (token,params) => {
    axios.defaults.headers.common['Authorization'] = token.Authorization;
    return axios.get(`${base}/api/v1/public/getTag`,{ params: params }).then(res => res.data);
};

//添加标签
export const create_tag = (params, token) => {
    axios.defaults.headers.common['Authorization'] = token.Authorization;
    return axios.post(`${base}/api/v1/tag/add`, params).then(res => res.data);
};
//修改标签
export const put_tag = (params, token) => {
    axios.defaults.headers.common['Authorization'] = token.Authorization;
    return axios.put(`${base}/api/v1/tag/add`, params).then(res => res.data);
};
//删除标签
export const delete_tag = (params, token) => {
    axios.defaults.headers.common['Authorization'] = token.Authorization;
    return axios.delete(`${base}/api/v1/tag/delete`, { params: params }).then(res => res.data);
};





//查询重复学员
export const repeatStudentList = (token, params) => {
    axios.defaults.headers.common['Authorization'] = token.Authorization;
    return axios.get(`${base}/api/v1/customer/refuesrs`, { params: params }).then(res => res.data);
};


//获取我的资源
export const getMyResoure = (params, token) => {
    axios.defaults.headers.common['Authorization'] = token.Authorization;
    return axios.get(`${base}/api/v1/customer/list`, { params: params }).then(res => res.data);
};

//获取资源用户详细列表
export const getUserList = (token, params) => {
    axios.defaults.headers.common['Authorization'] = token.Authorization;
    return axios.get(`${base}/api/v1/customer/show`, { params: params }).then(res => res.data);
};

//激活资源
export const activateResource = (params, token) => {
    axios.defaults.headers.common['Authorization'] = token.Authorization;
    return axios.put(`${base}/api/v1/customer/auth`, params).then(res => res.data);
};

//资源分配
export const dispatchResource = (params, token) => {
    axios.defaults.headers.common['Authorization'] = token.Authorization;
    return axios.post(`${base}/api/v1/customer/assign`, params).then(res => res.data);
};


//获取全部TMK
export const getTMK = (token, params) => {
    axios.defaults.headers.common['Authorization'] = token.Authorization;
    return axios.get(`${base}/api/v1/public/getTmkList`, { params: params }).then(res => res.data);
};



//获取资源用户沟通记录列表
export const getUserCommList = (token, params) => {
    axios.defaults.headers.common['Authorization'] = token.Authorization;
    return axios.get(`${base}/api/v1/tmkCall/list`, { params: params }).then(res => res.data);
};

//添加沟通记录
export const create_community = (params, token) => {
    axios.defaults.headers.common['Authorization'] = token.Authorization;
    return axios.post(`${base}/api/v1/tmkCall/add`, params).then(res => res.data);
};

//修改沟通记录
export const put_community = (params, token) => {
    axios.defaults.headers.common['Authorization'] = token.Authorization;
    return axios.put(`${base}/api/v1/tmkCall/update`, params).then(res => res.data);
};

//获取资源用户邀约记录列表
export const getUserInviteList = (token, params) => {
    axios.defaults.headers.common['Authorization'] = token.Authorization;
    return axios.get(`${base}/api/v1/invitation/list`, { params: params }).then(res => res.data);
};

//CC获取客户认领列表
export const getPublicPoolList = (token, params) => {
    axios.defaults.headers.common['Authorization'] = token.Authorization;
    return axios.get(`${base}/api/v1/cc/getCustomerList`, { params: params }).then(res => res.data);
};

//客户认领确认
export const claim_customer = (params, token) => {
    axios.defaults.headers.common['Authorization'] = token.Authorization;
    return axios.post(`${base}/api/v1/cc/claimCustomer`, params).then(res => res.data);
};

//CC获取我的客户列表
export const getMyCustomerList = (token, params) => {
    axios.defaults.headers.common['Authorization'] = token.Authorization;
    return axios.get(`${base}/api/v1/cc/getMyCustomerList`, { params: params }).then(res => res.data);
};

//CC获取我的客户标签
export const getMyCustomerTag = (token, params) => {
    axios.defaults.headers.common['Authorization'] = token.Authorization;
    return axios.get(`${base}/api/v1/public/getCcTagList`, { params: params }).then(res => res.data);
};

//CC获取我的客户详情
export const getMyCustomerDetail = (token, params) => {
    axios.defaults.headers.common['Authorization'] = token.Authorization;
    return axios.get(`${base}/api/v1/cc/showMyCustomer`, { params: params }).then(res => res.data);
};


//添加我的客户
export const create_myCustomer = (params, token) => {
    axios.defaults.headers.common['Authorization'] = token.Authorization;
    return axios.post(`${base}/api/v1/cc/addCustomer`, params).then(res => res.data);
};

//获取优惠库列表
export const getPromotionList = (token, params) => {
    axios.defaults.headers.common['Authorization'] = token.Authorization;
    return axios.get(`${base}/api/v1/coupons/list`, { params: params }).then(res => res.data);
};

//删除优惠库
export const delete_coupons = (params, token) => {
    axios.defaults.headers.common['Authorization'] = token.Authorization;
    return axios.delete(`${base}/api/v1/coupons/delete`, { params: params }).then(res => res.data);
};

//添加优惠库
export const create_coupons = (params, token) => {
    axios.defaults.headers.common['Authorization'] = token.Authorization;
    return axios.post(`${base}/api/v1/coupons/add`, params).then(res => res.data);
};

//修改优惠库
export const put_coupons = (params, token) => {
    axios.defaults.headers.common['Authorization'] = token.Authorization;
    return axios.put(`${base}/api/v1/coupons/update`, params).then(res => res.data);
};

//获取课程库列表
export const getClassLibrary = (token, params) => {
    axios.defaults.headers.common['Authorization'] = token.Authorization;
    return axios.get(`${base}/api/v1/course/list`, { params: params }).then(res => res.data);
};

//获取课程详细
export const getLessonDetail = (token, params) => {
    axios.defaults.headers.common['Authorization'] = token.Authorization;
    return axios.get(`${base}/api/v1/course/show`, { params: params }).then(res => res.data);
};

//添加课程库
export const create_class = (params, token) => {
    axios.defaults.headers.common['Authorization'] = token.Authorization;
    return axios.post(`${base}/api/v1/course/add`, params).then(res => res.data);
};

//修改课程库
export const put_class = (params, token) => {
    axios.defaults.headers.common['Authorization'] = token.Authorization;
    return axios.put(`${base}/api/v1/course/update`, params).then(res => res.data);
};

//删除课程库
export const delete_class = (params, token) => {
    axios.defaults.headers.common['Authorization'] = token.Authorization;
    return axios.delete(`${base}/api/v1/course/delete`, { params: params }).then(res => res.data);
};

//获取课程分类
export const getClassKind = (token, params) => {
    axios.defaults.headers.common['Authorization'] = token.Authorization;
    return axios.get(`${base}/api/v1/course/categorylist`, { params: params }).then(res => res.data);
};

//获取课程表列表
export const getClassTable = (token, params) => {
    axios.defaults.headers.common['Authorization'] = token.Authorization;
    return axios.get(`${base}/api/v1/syllabus/list`, { params: params }).then(res => res.data);
};

//添加课程表
export const create_lesson = (params, token) => {
    axios.defaults.headers.common['Authorization'] = token.Authorization;
    return axios.post(`${base}/api/v1/syllabus/add`, params).then(res => res.data);
};

//修改课程表
export const put_lesson = (params, token) => {
    axios.defaults.headers.common['Authorization'] = token.Authorization;
    return axios.put(`${base}/api/v1/syllabus/update`, params).then(res => res.data);
};

//获取课程表详细
export const getClassDetail = (token, params) => {
    axios.defaults.headers.common['Authorization'] = token.Authorization;
    return axios.get(`${base}/api/v1/syllabus/show`, { params: params }).then(res => res.data);
};

//获取教室
export const getClassRoom = (token, params) => {
    axios.defaults.headers.common['Authorization'] = token.Authorization;
    return axios.get(`${base}/api/v1/classroom/list`, { params: params }).then(res => res.data);
};

//获取全部老师列表
export const getTeacherList = (token, params) => {
    axios.defaults.headers.common['Authorization'] = token.Authorization;
    return axios.get(`${base}/api/v1/teacher/list`, { params: params }).then(res => res.data);
};

//获取全部cc列表
export const getAllCCList = (token, params) => {
    axios.defaults.headers.common['Authorization'] = token.Authorization;
    return axios.get(`${base}/api/v1/cc/getCcList`, { params: params }).then(res => res.data);
};

//CC获取沟通记录
export const getCommuList = (token, params) => {
    axios.defaults.headers.common['Authorization'] = token.Authorization;
    return axios.get(`${base}/api/v1/cc/getCustomerCall`, { params: params }).then(res => res.data);
};

//CC添加沟通记录
export const create_commuR = (params, token) => {
    axios.defaults.headers.common['Authorization'] = token.Authorization;
    return axios.post(`${base}/api/v1/cc/addCustomerCall`, params).then(res => res.data);
};

//CC修改沟通记录
export const put_commuR = (params, token) => {
    axios.defaults.headers.common['Authorization'] = token.Authorization;
    return axios.put(`${base}/api/v1/cc/updateCustomerCall`, params).then(res => res.data);
};

//CC获取邀约记录
export const getInviteList = (token, params) => {
    axios.defaults.headers.common['Authorization'] = token.Authorization;
    return axios.get(`${base}/api/v1/invitation/list`, { params: params }).then(res => res.data);
};

//CC添加邀约记录
export const create_inviteR = (params, token) => {
    axios.defaults.headers.common['Authorization'] = token.Authorization;
    return axios.post(`${base}/api/v1/invitation/add`, params).then(res => res.data);
};

//CC修改邀约记录
export const put_inviteR = (params, token) => {
    axios.defaults.headers.common['Authorization'] = token.Authorization;
    return axios.put(`${base}/api/v1/invitation/update`, params).then(res => res.data);
};

//CC修改客户资料
export const put_customer = (params, token) => {
    axios.defaults.headers.common['Authorization'] = token.Authorization;
    return axios.put(`${base}/api/v1/cc/updateCustomer`, params).then(res => res.data);
};
//TMK修改or激活客户资料
export const TMKput_customer = (params, token) => {
    axios.defaults.headers.common['Authorization'] = token.Authorization;
    return axios.put(`${base}/api/v1/customer/update`, params).then(res => res.data);
};
//CC确认客户无需求
export const confirm_noDemand = (params, token) => {
    axios.defaults.headers.common['Authorization'] = token.Authorization;
    return axios.post(`${base}/api/v1/cc/noDemandCustomer`, params).then(res => res.data);
};

//CC客户到访确认
export const confirm_visit = (params, token) => {
    axios.defaults.headers.common['Authorization'] = token.Authorization;
    return axios.post(`${base}/api/v1/invitation/checkVisit`, params).then(res => res.data);
};

//CC获取邀约记录
export const getDateClass = (token, params) => {
    axios.defaults.headers.common['Authorization'] = token.Authorization;
    return axios.get(`${base}/api/v1/syllabus/getDaySyllabus`, { params: params }).then(res => res.data);
};

//CC客户签合同确认提交3个数据
export const signContract = (params, token) => {
    axios.defaults.headers.common['Authorization'] = token.Authorization;
    return axios.post(`${base}/api/v1/cc/checkUser`, params).then(res => res.data);
};

//检查合同是否重复
export const  checkOrderSku = (params, token) => {
    axios.defaults.headers.common['Authorization'] = token.Authorization;
    return axios.post(`${base}/api/v1/public/checkOrderSku`, params).then(res => res.data);
};

//CC获取我的学员列表
export const getMyStudent = (token, params) => {
    axios.defaults.headers.common['Authorization'] = token.Authorization;
    return axios.get(`${base}/api/v1/cc/myusers`, { params: params }).then(res => res.data);
};

//CC获取我的合同列表
export const getMyContract = (token, params) => {
    axios.defaults.headers.common['Authorization'] = token.Authorization;
    return axios.get(`${base}/api/v1/order/list`, { params: params }).then(res => res.data);
};

//CC获取我的合同详细
export const getMyContractDetail = (token, params) => {
    axios.defaults.headers.common['Authorization'] = token.Authorization;
    return axios.get(`${base}/api/v1/order/show`, { params: params }).then(res => res.data);
};

//CC修改合同
export const put_contract = (params, token) => {
    axios.defaults.headers.common['Authorization'] = token.Authorization;
    return axios.put(`${base}/api/v1/order/update`, params).then(res => res.data);
};

//CC获取我的学员详细合同课程
export const getMyStudentLessonDetail = (token, params) => {
    axios.defaults.headers.common['Authorization'] = token.Authorization;
    return axios.get(`${base}/api/v1/order/orderItemList`, { params: params }).then(res => res.data);
};

//CC获取我的学员详细学员签到
export const getMyStudentSign = (token, params) => {
    axios.defaults.headers.common['Authorization'] = token.Authorization;
    return axios.get(`${base}/api/v1/checkinItem/userlog`, { params: params }).then(res => res.data);
};

//CC学员续费转课再购买
export const signThreeContract = (params, token) => {
    axios.defaults.headers.common['Authorization'] = token.Authorization;
    return axios.post(`${base}/api/v1/order/renew`, params).then(res => res.data);
};

//CC获取转课补费的课程剩余金额
export const getRemainMoney = (token, params) => {
    axios.defaults.headers.common['Authorization'] = token.Authorization;
    return axios.get(`${base}/api/v1/order/getCourseBalance`, { params: params }).then(res => res.data);
};

//CC学员冻结
export const  frozenClass = (params, token) => {
    axios.defaults.headers.common['Authorization'] = token.Authorization;
    return axios.post(`${base}/api/v1/order/freezeCouse`, params).then(res => res.data);
};

//CC学员转班
export const transferClass = (params, token) => {
    axios.defaults.headers.common['Authorization'] = token.Authorization;
    return axios.post(`${base}/api/v1/order/transferClass`, params).then(res => res.data);
};
//CC学员转校
export const transferSchool = (params, token) => {
    axios.defaults.headers.common['Authorization'] = token.Authorization;
    return axios.post(`${base}/api/v1/order/transferSchoolMessage`, params).then(res => res.data);
};

//CC学员接收或拒绝转校
export const agreeTransferSchool = (params, token) => {
    axios.defaults.headers.common['Authorization'] = token.Authorization;
    return axios.post(`${base}/api/v1/order/transferSchool`, params).then(res => res.data);
};

//cc删除合同图片
export const deleteContractImg = (params, token) => {
    axios.defaults.headers.common['Authorization'] = token.Authorization;
    return axios.post(`${base}/api/v1/order/uploadOrderImg`, params).then(res => res.data);
};

//CC获取学员退费信息
export const getRefund = (params, token) => {
    axios.defaults.headers.common['Authorization'] = token.Authorization;
    return axios.post(`${base}/api/v1/order/returnsList`, params).then(res => res.data);
};

//CC立即排班选择性排班
export const assignClass = (params, token) => {
    axios.defaults.headers.common['Authorization'] = token.Authorization;
    return axios.post(`${base}/api/v1/order/assignsCouse`, params).then(res => res.data);
};

//CC获取首页报表
export const getCCindex = (token, params) => {
    axios.defaults.headers.common['Authorization'] = token.Authorization;
    return axios.get(`${base}/api/v1/cc/forms`, { params: params }).then(res => res.data);
};
//CC获取客户管理统计表
export const getReport1 = (token, params) => {
    axios.defaults.headers.common['Authorization'] = token.Authorization;
    return axios.get(`${base}/api/v1/cc/customerForm`, { params: params }).then(res => res.data);
};
//CC获取销售额统计表
export const getReportSA = (token, params) => {
    axios.defaults.headers.common['Authorization'] = token.Authorization;
    return axios.get(`${base}/api/v1/cc/salesNumber`, { params: params }).then(res => res.data);
};
//CC获取业务交接
export const getTransposing = (token, params) => {
    axios.defaults.headers.common['Authorization'] = token.Authorization;
    return axios.get(`${base}/api/v1/cc/transposing`, { params: params }).then(res => res.data);
};
//业务交接分配人员
export const dispatchPerson = (params, token) => {
    axios.defaults.headers.common['Authorization'] = token.Authorization;
    return axios.post(`${base}/api/v1/cc/replaceCc`, params).then(res => res.data);
};
//获取消息通知
export const getMessage = (params, token) => {
    axios.defaults.headers.common['Authorization'] = token.Authorization;
    return axios.post(`${base}/api/v1/message/myMessageList`, params).then(res => res.data);
};

//获取消息详细
export const getMessagDetail = (params, token) => {
    axios.defaults.headers.common['Authorization'] = token.Authorization;
    return axios.post(`${base}/api/v1/message/msgInfo`, params).then(res => res.data);
};

//教务获取课程表
export const getteachClassTable = (token, params) => {
    axios.defaults.headers.common['Authorization'] = token.Authorization;
    return axios.get(`${base}/api/v1/teacher/syllabus`, { params: params }).then(res => res.data);
};

//教务课程表详细
export const getDetailClassTable = (token, params) => {
    axios.defaults.headers.common['Authorization'] = token.Authorization;
    return axios.get(`${base}/api/v1/teacher/checkWork`, { params: params }).then(res => res.data);
};

//教务签到
export const  signClass = (params, token) => {
    axios.defaults.headers.common['Authorization'] = token.Authorization;
    return axios.post(`${base}/api/v1/teacher/checkWorkPost`, params).then(res => res.data);
};
//教务添加补课
export const  makeUpLesson = (params, token) => {
    axios.defaults.headers.common['Authorization'] = token.Authorization;
    return axios.post(`${base}/api/v1/teacher/addBuKe`, params).then(res => res.data);
};
//教务申请代课
export const  takeOverLesson = (params, token) => {
    axios.defaults.headers.common['Authorization'] = token.Authorization;
    return axios.post(`${base}/api/v1/teacher/addDaiKe`, params).then(res => res.data);
};
//教务停课
export const  stopLesson = (params, token) => {
    axios.defaults.headers.common['Authorization'] = token.Authorization;
    return axios.post(`${base}/api/v1/teacher/stopClass`, params).then(res => res.data);
};
//教务代课审批查询详细
export const getApprovalDetail = (token, params) => {
    axios.defaults.headers.common['Authorization'] = token.Authorization;
    return axios.get(`${base}/api/v1/teacher/viewApproval`, { params: params }).then(res => res.data);
};
//教务获取学员管理列表
export const getTeachStudentList = (token, params) => {
    axios.defaults.headers.common['Authorization'] = token.Authorization;
    return axios.get(`${base}/api/v1/teacher/studentlist`, { params: params }).then(res => res.data);
};
//教务添加补课学生
export const  putStudentMakeup = (params, token) => {
    axios.defaults.headers.common['Authorization'] = token.Authorization;
    return axios.post(`${base}/api/v1/teacher/addBuKeUser`, params).then(res => res.data);
};
//教务发放礼品
export const  sendPresent = (params, token) => {
    axios.defaults.headers.common['Authorization'] = token.Authorization;
    return axios.post(`${base}/api/v1/teacher/sendAwards`, params).then(res => res.data);
};
//教务获取活动管理列表
export const getActivityList = (token, params) => {
    axios.defaults.headers.common['Authorization'] = token.Authorization;
    return axios.get(`${base}/api/v1/Travel/tplList`, { params: params }).then(res => res.data);
};
//教务主管创建生日会活动
export const  addBirthdayParty = (params, token) => {
    axios.defaults.headers.common['Authorization'] = token.Authorization;
    return axios.post(`${base}/api/v1/Travel/addBirthdayParty`, params).then(res => res.data);
};
//教务经理发布活动模板
export const  addTpl = (params, token) => {
    axios.defaults.headers.common['Authorization'] = token.Authorization;
    return axios.post(`${base}/api/v1/Travel/addTpl`, params).then(res => res.data);
};
//教务获取活动模板的详细
export const getTplInfo = (token, params) => {
    axios.defaults.headers.common['Authorization'] = token.Authorization;
    return axios.get(`${base}/api/v1/Travel/tplInfo`, { params: params }).then(res => res.data);
};
//教务获取生日会活动的详细
export const getBirthdayInfo = (token, params) => {
    axios.defaults.headers.common['Authorization'] = token.Authorization;
    return axios.get(`${base}/api/v1/Travel/birthdayInfo`, { params: params }).then(res => res.data);
};
//教务主管发起活动
export const  addActivity = (params, token) => {
    axios.defaults.headers.common['Authorization'] = token.Authorization;
    return axios.post(`${base}/api/v1/Travel/addActivity`, params).then(res => res.data);
};
//教务获取已发布活动列表
export const getActivityAlreadyList = (token, params) => {
    axios.defaults.headers.common['Authorization'] = token.Authorization;
    return axios.get(`${base}/api/v1/Travel/activityList`, { params: params }).then(res => res.data);
};
//教务获取已发布活动的详细的报名学员列表
export const getActivityOrderList = (token, params) => {
    axios.defaults.headers.common['Authorization'] = token.Authorization;
    return axios.get(`${base}/api/v1/Travel/getOrderList`, { params: params }).then(res => res.data);
};
//教务获取已发布活动的详细的报名学员列表
export const getClassBonus = (token, params) => {
    axios.defaults.headers.common['Authorization'] = token.Authorization;
    return axios.get(`${base}/api/v1/users/classBonus`, { params: params }).then(res => res.data);
};

//教务获取首页报表
export const getTeachIndex = (token, params) => {
    axios.defaults.headers.common['Authorization'] = token.Authorization;
    return axios.get(`${base}/api/v1/teacher/forms`, { params: params }).then(res => res.data);
};

//教务业务交接获取学员
export const getTeachmyStudent = (token, params) => {
    axios.defaults.headers.common['Authorization'] = token.Authorization;
    return axios.get(`${base}/api/v1/teacher/myStudent`, { params: params }).then(res => res.data);
};

//熊猫到家产品库添加产品
export const  productAdd = (params, token) => {
    axios.defaults.headers.common['Authorization'] = token.Authorization;
    return axios.post(`${base}/api/v1/pandagohome/productAdd`, params).then(res => res.data);
};
//熊猫到家产品库列表
export const productList = (token, params) => {
    axios.defaults.headers.common['Authorization'] = token.Authorization;
    return axios.get(`${base}/api/v1/pandagohome/productList`, { params: params }).then(res => res.data);
};
//熊猫到家库存管理-添加产品库存
export const  addStock = (params, token) => {
    axios.defaults.headers.common['Authorization'] = token.Authorization;
    return axios.post(`${base}/api/v1/pandagohome/addStock`, params).then(res => res.data);
};
//熊猫到家订单管理-产品库-删除
export const  productDel = (params, token) => {
    axios.defaults.headers.common['Authorization'] = token.Authorization;
    return axios.post(`${base}/api/v1/pandagohome/productDel`, params).then(res => res.data);
};
//熊猫到家订单管理-添加订单合同
export const  addOrders = (params, token) => {
    axios.defaults.headers.common['Authorization'] = token.Authorization;
    return axios.post(`${base}/api/v1/pandagohome/addOrders`, params).then(res => res.data);
};
//熊猫到家订单管理-订单列表
export const orderList = (token, params) => {
    axios.defaults.headers.common['Authorization'] = token.Authorization;
    return axios.get(`${base}/api/v1/pandagohome/orderList`, { params: params }).then(res => res.data);
};
//熊猫到家发货报表-发货记录
export const shipmentList = (token, params) => {
    axios.defaults.headers.common['Authorization'] = token.Authorization;
    return axios.get(`${base}/api/v1/pandagohome/shipmentList`, { params: params }).then(res => res.data);
};
//熊猫到家销售报表-销售列表
export const salesReport = (token, params) => {
    axios.defaults.headers.common['Authorization'] = token.Authorization;
    return axios.get(`${base}/api/v1/pandagohome/salesReport`, { params: params }).then(res => res.data);
};
//熊猫到家订单管理-订单退订
export const orderRefund = (token, params) => {
    axios.defaults.headers.common['Authorization'] = token.Authorization;
    return axios.get(`${base}/api/v1/pandagohome/orderRefund`, { params: params }).then(res => res.data);
};
//熊猫到家物流-库存管理库存报表
export const stockControl = (token, params) => {
    axios.defaults.headers.common['Authorization'] = token.Authorization;
    return axios.get(`${base}/api/v1/pandagohome/stockControl`, { params: params }).then(res => res.data);
};

//熊猫到家采购管理-订单量
export const orderCount = (token, params) => {
    axios.defaults.headers.common['Authorization'] = token.Authorization;
    return axios.get(`${base}/api/v1/pandagohome/orderCount`, { params: params }).then(res => res.data);
};

//熊猫到家订单管理-详细
export const orderInfo = (token, params) => {
    axios.defaults.headers.common['Authorization'] = token.Authorization;
    return axios.get(`${base}/api/v1/pandagohome/orderInfo`, { params: params }).then(res => res.data);
};
//熊猫到家发货管理-获取本月发货单
export const exportDelivery = (token, params) => {
    axios.defaults.headers.common['Authorization'] = token.Authorization;
    return axios.get(`${base}/api/v1/pandagohome/exportDelivery`, { params: params }).then(res => res.data);
};
//熊猫到家库存管理-取得指定产品库存记录
export const getProductStockLog = (token, params) => {
    axios.defaults.headers.common['Authorization'] = token.Authorization;
    return axios.get(`${base}/api/v1/pandagohome/getProductStockLog`, { params: params }).then(res => res.data);
};
//熊猫到家订单管理订单报表-已发期数的获取月份
export const orderShipmentList = (token, params) => {
    axios.defaults.headers.common['Authorization'] = token.Authorization;
    return axios.get(`${base}/api/v1/pandagohome/orderShipmentList`, { params: params }).then(res => res.data);
};
//熊猫到家-物流订单查询
export const getShipmentLogistics = (token, params) => {
    axios.defaults.headers.common['Authorization'] = token.Authorization;
    return axios.get(`${base}/api/v1/pandagohome/getShipmentLogistics`, { params: params }).then(res => res.data);
};


//学员中心后台-校长信箱-列表
export const emailboxlist = (token, params) => {
    axios.defaults.headers.common['Authorization'] = token.Authorization;
    return axios.get(`${base}/api/v1/wxmanage/emailboxlist`, { params: params }).then(res => res.data);
};
//学员中心后台 校长信箱-处理
export const  ProEmail = (params, token) => {
    axios.defaults.headers.common['Authorization'] = token.Authorization;
    return axios.post(`${base}/api/v1/wxmanage/ProEmail`, params).then(res => res.data);
};

//学员中心后台-校长信箱-学员详细
export const userinfo = (token, params) => {
    axios.defaults.headers.common['Authorization'] = token.Authorization;
    return axios.get(`${base}/api/v1/wxmanage/userinfo`, { params: params }).then(res => res.data);
};
//学员中心后台-公告管理-公告列表
export const schoolBulletinList = (token, params) => {
    axios.defaults.headers.common['Authorization'] = token.Authorization;
    return axios.get(`${base}/api/v1/wxmanage/schoolBulletinList`, { params: params }).then(res => res.data);
};

//学员中心后台 公告管理-添加公告
export const  schoolBulletinAdd = (params, token) => {
    axios.defaults.headers.common['Authorization'] = token.Authorization;
    return axios.post(`${base}/api/v1/wxmanage/schoolBulletinAdd`, params).then(res => res.data);
};

//学员中心后台-微信管理-微信列表
export const wxMsgList = (token, params) => {
    axios.defaults.headers.common['Authorization'] = token.Authorization;
    return axios.get(`${base}/api/v1/wxmanage/wxMsgList`, { params: params }).then(res => res.data);
};
//学员中心后台 微信管理-群发消息
export const  condMassWX = (params, token) => {
    axios.defaults.headers.common['Authorization'] = token.Authorization;
    return axios.post(`${base}/api/v1/wxmanage/condMassWX`, params).then(res => res.data);
};
//学员中心后台-微信管理-失败列表
export const WxFail = (token, params) => {
    axios.defaults.headers.common['Authorization'] = token.Authorization;
    return axios.get(`${base}/api/v1/wxmanage/WxFail`, { params: params }).then(res => res.data);
};

//学员中心后台-短信管理-短信列表
export const SmsMList = (token, params) => {
    axios.defaults.headers.common['Authorization'] = token.Authorization;
    return axios.get(`${base}/api/v1/wxmanage/SmsMList`, { params: params }).then(res => res.data);
};

//学员中心后台 短信管理-发送消息
export const  condMassSms = (params, token) => {
    axios.defaults.headers.common['Authorization'] = token.Authorization;
    return axios.post(`${base}/api/v1/wxmanage/condMassSms`, params).then(res => res.data);
};

//学员中心后台-短信管理-短信失败列表
export const smsFail = (token, params) => {
    axios.defaults.headers.common['Authorization'] = token.Authorization;
    return axios.get(`${base}/api/v1/wxmanage/smsFail`, { params: params }).then(res => res.data);
};
//学员中心后台 短信管理-失败重发
export const  smsResend = (params, token) => {
    axios.defaults.headers.common['Authorization'] = token.Authorization;
    return axios.post(`${base}/api/v1/wxmanage/smsResend`, params).then(res => res.data);
};

//学员中心后台-画廊管理-画廊列表
export const hualangList = (token, params) => {
    axios.defaults.headers.common['Authorization'] = token.Authorization;
    return axios.get(`${base}/api/v1/wxmanage/hualangList`, { params: params }).then(res => res.data);
};
//学员中心后台 画廊管理-推荐作品
export const  recomHualangWork = (params, token) => {
    axios.defaults.headers.common['Authorization'] = token.Authorization;
    return axios.post(`${base}/api/v1/wxmanage/recomHualangWork`, params).then(res => res.data);
};

//官网后台管理-师资管理-老师列表
export const teacherlist = (token, params) => {
    axios.defaults.headers.common['Authorization'] = token.Authorization;
    return axios.get(`${base}/api/v1/pcmanage/teacherlist`, { params: params }).then(res => res.data);
};
//学员中心后台 师资管理-添加老师
export const  addTeacher = (params, token) => {
    axios.defaults.headers.common['Authorization'] = token.Authorization;
    return axios.post(`${base}/api/v1/pcmanage/addTeacher`, params).then(res => res.data);
};
//学员中心后台 师资管理-删除老师
export const  delTeacher = (params, token) => {
    axios.defaults.headers.common['Authorization'] = token.Authorization;
    return axios.post(`${base}/api/v1/pcmanage/delTeacher`, params).then(res => res.data);
};
//官网后台管理-根据省市城区筛选校区
export const schoolArea = (token, params) => {
    axios.defaults.headers.common['Authorization'] = token.Authorization;
    return axios.get(`${base}/api/v1/pcmanage/schoolArea`, { params: params }).then(res => res.data);
};
//批量排课学生 列表
export const autoSyllabusStudentList = (token, params) => {
    axios.defaults.headers.common['Authorization'] = token.Authorization;
    return axios.get(`${base}/api/v1/teacher/autoSyllabusStudentList`, { params: params }).then(res => res.data);
};

//批量排课学生 踢人
export const removeSyllabusUser = (token, params) => {
    axios.defaults.headers.common['Authorization'] = token.Authorization;
    return axios.get(`${base}/api/v1/teacher/removeSyllabusUser`, { params: params }).then(res => res.data);
};
//学员中心后台 师资管理-批量确定
export const  postSyllabusStudentList = (params, token) => {
    axios.defaults.headers.common['Authorization'] = token.Authorization;
    return axios.post(`${base}/api/v1/teacher/autoSyllabusStudentList`, params).then(res => res.data);
};

//官网后台管理-校区管理
export const schoolList = (params,token) => {
    axios.defaults.headers.common['Authorization'] = token.Authorization;
    return axios.get(`${base}/api/v1/pcmanage/schoolList`, { params: params }).then(res => res.data);
};
//学员中心后台 校区管理-显示隐藏校区
export const  hideSchool = (params, token) => {
    axios.defaults.headers.common['Authorization'] = token.Authorization;
    return axios.post(`${base}/api/v1/school/delete`, params).then(res => res.data);
};

//官网后台管理-新闻管理-新闻列表
export const newsList = (params,token) => {
    axios.defaults.headers.common['Authorization'] = token.Authorization;
    return axios.get(`${base}/api/v1/pcmanage/newsList`, { params: params }).then(res => res.data);
};
//学员中心后台 -新闻管理-添加新闻
export const  newsAdd = (params, token) => {
    axios.defaults.headers.common['Authorization'] = token.Authorization;
    return axios.post(`${base}/api/v1/pcmanage/newsAdd`, params).then(res => res.data);
};
//官网后台管理-新闻管理-新闻详细
export const newsDet = (params,token) => {
    axios.defaults.headers.common['Authorization'] = token.Authorization;
    return axios.get(`${base}/api/v1/pcmanage/newsDet`, { params: params }).then(res => res.data);
};
//官网后台管理-授权合作-列表
export const jiamengLIst = (params,token) => {
    axios.defaults.headers.common['Authorization'] = token.Authorization;
    return axios.get(`${base}/api/v1/pcmanage/jiamengLIst`, { params: params }).then(res => res.data);
};

//官网后台管理-招聘管理-列表
export const positionsList = (params,token) => {
    axios.defaults.headers.common['Authorization'] = token.Authorization;
    return axios.get(`${base}/api/v1/pcmanage/positionsList`, { params: params }).then(res => res.data);
};
//学员中心后台 -招聘管理-添加职位
export const  positionsAdd = (params, token) => {
    axios.defaults.headers.common['Authorization'] = token.Authorization;
    return axios.post(`${base}/api/v1/pcmanage/positionsAdd`, params).then(res => res.data);
};
//学员中心后台 -招聘管理-删除职位
export const  positionsDet = (params, token) => {
    axios.defaults.headers.common['Authorization'] = token.Authorization;
    return axios.post(`${base}/api/v1/pcmanage/positionsDet`, params).then(res => res.data);
};
//官网后台管理-招聘管理-上海-上海的省市列表
export const speciallyCityList = (params,token) => {
    axios.defaults.headers.common['Authorization'] = token.Authorization;
    return axios.get(`${base}/api/v1/pcmanage/speciallyCityList`, { params: params }).then(res => res.data);
};
//官网后台管理-申请职位-列表
export const positionsApply = (params,token) => {
    axios.defaults.headers.common['Authorization'] = token.Authorization;
    return axios.get(`${base}/api/v1/pcmanage/positionsApply`, { params: params }).then(res => res.data);
};
//合同修复-列表
export const repairOrderList = (params,token) => {
    axios.defaults.headers.common['Authorization'] = token.Authorization;
    return axios.get(`${base}/api/v1/order/repairOrderList`, { params: params }).then(res => res.data);
};
//合同修复-提交
export const  editOrderList = (params, token) => {
    axios.defaults.headers.common['Authorization'] = token.Authorization;
    return axios.post(`${base}/api/v1/order/repairOrders`, params).then(res => res.data);
};
//发票列表
export const invoiceList = (params,token) => {
    axios.defaults.headers.common['Authorization'] = token.Authorization;
    return axios.get(`${base}/api/v1/invoice/invoiceList`, { params: params }).then(res => res.data);
};
//导出发票
export const exportInvoice = (params,token) => {
    axios.defaults.headers.common['Authorization'] = token.Authorization;
    return axios.get(`${base}/api/v1/invoice/exportInvoice`, { params: params }).then(res => res.data);
};
//教务签到记录列表
export const getSignList = (params,token) => {
    axios.defaults.headers.common['Authorization'] = token.Authorization;
    return axios.get(`${base}/api/v1/teacher/checkList`, { params: params }).then(res => res.data);
};
//教务签到记录详细
export const checkListInfo = (params,token) => {
    axios.defaults.headers.common['Authorization'] = token.Authorization;
    return axios.get(`${base}/api/v1/teacher/checkListInfo`, { params: params }).then(res => res.data);
};
//市场资源列表
export const mksourceList = (params,token) => {
    axios.defaults.headers.common['Authorization'] = token.Authorization;
    return axios.get(`${base}/api/v1/market/mksourceList`, { params: params }).then(res => res.data);
};
//市场渠道列表
export const channelList = (token) => {
    axios.defaults.headers.common['Authorization'] = token.Authorization;
    return axios.get(`${base}/api/v1/market/channelList`).then(res => res.data);
};
//市场添加渠道
export const  addChannel = (params, token) => {
    axios.defaults.headers.common['Authorization'] = token.Authorization;
    return axios.post(`${base}/api/v1/market/addChannel`, params).then(res => res.data);
};
//市场删除渠道
export const  delChannel = (params, token) => {
    axios.defaults.headers.common['Authorization'] = token.Authorization;
    return axios.post(`${base}/api/v1/market/delChannel`, params).then(res => res.data);
};
//市场活动列表
export const GetactivityList = (params,token) => {
    axios.defaults.headers.common['Authorization'] = token.Authorization;
    return axios.get(`${base}/api/v1/market/activityList`,{ params: params }).then(res => res.data);
};
//市场添加活动
export const  activityAdd = (params, token) => {
    axios.defaults.headers.common['Authorization'] = token.Authorization;
    return axios.post(`${base}/api/v1/market/activityAdd`, params).then(res => res.data);
};
//市场二维码列表
export const  qrcodeList = (params, token) => {
    axios.defaults.headers.common['Authorization'] = token.Authorization;
    return axios.post(`${base}/api/v1/market/qrcodeList`, params).then(res => res.data);
};
//市场二维码下载
export const  qrcodeDownload = (params, token) => {
    axios.defaults.headers.common['Authorization'] = token.Authorization;
    return axios.post(`${base}/api/v1/market/qrcodeDownload`, params).then(res => res.data);
};
//市场活动删除
export const activityDel = (params,token) => {
    axios.defaults.headers.common['Authorization'] = token.Authorization;
    return axios.get(`${base}/api/v1/market/activityDel`,{ params: params }).then(res => res.data);
};
//市场添加二维码
export const qrcodeAdd = (params,token) => {
    axios.defaults.headers.common['Authorization'] = token.Authorization;
    return axios.get(`${base}/api/v1/market/qrcodeAdd`,{ params: params }).then(res => res.data);
};
//财务合同审核列表
export const getcheckorder = (params,token) => {
    axios.defaults.headers.common['Authorization'] = token.Authorization;
    return axios.get(`${base}/api/v1/order/checkorder`,{ params: params }).then(res => res.data);
};
//财务合同审核操作
export const  orderAudit = (params, token) => {
    axios.defaults.headers.common['Authorization'] = token.Authorization;
    return axios.post(`${base}/api/v1/order/orderAudit`, params).then(res => res.data);
};
//财务导出签到
export const  signinListExport = (params, token) => {
    axios.defaults.headers.common['Authorization'] = token.Authorization;
    return axios.get(`${base}/api/v1/order/signinListExport`, { params: params }).then(res => res.data);
};
//财务导出销售
export const  salesDetailExport = (params, token) => {
    axios.defaults.headers.common['Authorization'] = token.Authorization;
    return axios.get(`${base}/api/v1/order/salesDetailExport`, { params: params }).then(res => res.data);
};

//tmk认领资源列表
export const  marketClaim = (params, token) => {
    axios.defaults.headers.common['Authorization'] = token.Authorization;
    return axios.get(`${base}/api/v1/cc/marketClaim`, { params: params }).then(res => res.data);
};
//tmk提交认领
export const  marketClaimPost = (params, token) => {
    axios.defaults.headers.common['Authorization'] = token.Authorization;
    return axios.post(`${base}/api/v1/cc/marketClaimPost`, params).then(res => res.data);
};
//tmk待定资源列表
export const  tmkmyResource = (params, token) => {
    axios.defaults.headers.common['Authorization'] = token.Authorization;
    return axios.get(`${base}/api/v1/cc/myResource`, { params: params }).then(res => res.data);
};
//tmk待定资源详细
export const  marketUserInfo = (params, token) => {
    axios.defaults.headers.common['Authorization'] = token.Authorization;
    return axios.get(`${base}/api/v1/cc/marketUserInfo`, { params: params }).then(res => res.data);
};
//tmk认领更新状态
export const  setResourceType = (params, token) => {
    axios.defaults.headers.common['Authorization'] = token.Authorization;
    return axios.post(`${base}/api/v1/cc/setResourceType`, params).then(res => res.data);
};

//市场报表
export const  marketPic = (params, token) => {
    axios.defaults.headers.common['Authorization'] = token.Authorization;
    return axios.get(`${base}/api/v1/market/marketPic`, { params: params }).then(res => res.data);
};
//市场报表表格
export const  marketTable = (params, token) => {
    axios.defaults.headers.common['Authorization'] = token.Authorization;
    return axios.get(`${base}/api/v1/market/marketTable`, { params: params }).then(res => res.data);
};
//市场资源详情
export const  mksourceInfoe = (params, token) => {
    axios.defaults.headers.common['Authorization'] = token.Authorization;
    return axios.get(`${base}/api/v1/market/mksourceInfo`, { params: params }).then(res => res.data);
};
//知言平台跳转
export const  yifengke = (token) => {
    axios.defaults.headers.common['Authorization'] = token.Authorization;
    return axios.get(`${base}/api/v1/public/yifengke`).then(res => res.data);
};
//熊猫到家导出产品
export const  getProductShippingList = (params, token) => {
    axios.defaults.headers.common['Authorization'] = token.Authorization;
    return axios.get(`${base}/api/v1/pandagohome/getProductShippingList`, { params: params }).then(res => res.data);
};
//冻结列表
export const  freezeList = (params, token) => {
    axios.defaults.headers.common['Authorization'] = token.Authorization;
    return axios.get(`${base}/api/v1/freeze/freezeList`, { params: params }).then(res => res.data);
};

//提前开课
export const  editCourseStartTime = (params, token) => {
    axios.defaults.headers.common['Authorization'] = token.Authorization;
    return axios.post(`${base}/api/v1/order/editCourseStartTime`, params).then(res => res.data);
};
//产品库详情
export const  productInfo = (params, token) => {
    axios.defaults.headers.common['Authorization'] = token.Authorization;
    return axios.get(`${base}/api/v1/pandagohome/productInfo`, { params: params }).then(res => res.data);
};

//产品库更新产品
export const  iterationProduct = (params, token) => {
    axios.defaults.headers.common['Authorization'] = token.Authorization;
    return axios.post(`${base}/api/v1/pandagohome/iterationProduct`, params).then(res => res.data);
};
//绘画大赛报名列表
export const  pictureSayList = (params, token) => {
    axios.defaults.headers.common['Authorization'] = token.Authorization;
    return axios.get(`${base}/api/v1/active/pictureSayList`, { params: params }).then(res => res.data);
};
//绘画大赛报名添加
export const  pictureSayAdd = (params, token) => {
    axios.defaults.headers.common['Authorization'] = token.Authorization;
    return axios.post(`${base}/api/v1/active/pictureSayAdd`, params).then(res => res.data);
};
//绘画大赛报名删除
export const  pictureSayDet = (params, token) => {
    axios.defaults.headers.common['Authorization'] = token.Authorization;
    return axios.post(`${base}/api/v1/active/pictureSayDet`, params).then(res => res.data);
};
//活动列表导出
export const  userReport = (params, token) => {
    axios.defaults.headers.common['Authorization'] = token.Authorization;
    return axios.post(`${base}/api/v1/Travel/userReport`, params).then(res => res.data);
};
// //code字段说明
//     tmk_m:  tmk主管
//     tmk : tmk
//     teach_m : 老师主管
//     teach : 老师
//     cc : cc
//     cc_m : cc主管	
//tmk_m@test.com  tmk主管
// tmk@test.com   tmk
//hr@test.com

