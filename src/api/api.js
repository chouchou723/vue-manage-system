import axios from 'axios';

let base = 'http://crmv2.dfth.com';
//登录页面
export const requestLogin = params => {
    return axios.post(`${base}/api/v1/admin/login`, params).then(res => res.data); };

//获取用户信息
export const getUserinfo = (token) => {
    axios.defaults.headers.common['Authorization'] = token.Authorization;
    return axios.get(`${base}/api/v1/userinfo/user`).then(res => res.data);
};

//获取自己菜单
export const menuList = token => {
    axios.defaults.headers.common['Authorization'] = token.Authorization;
    return axios.get(`${base}/api/v1/userinfo/menu`).then(res => res.data);
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
    return axios.get('http://crmv2.dfth.com/auth/loginQrCode', { params: params }).then(res => res.data); };

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


//获取部门
export const department = (token) => {
    axios.defaults.headers.common['Authorization'] = token.Authorization;
    return axios.get(`${base}/api/v1/department/list`).then(res => res.data);
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
    return axios.put(`${base}/api/v1/customer/update`, params).then(res => res.data);
};


//获取来源渠道
export const sourceList = (token) => {
    axios.defaults.headers.common['Authorization'] = token.Authorization;
    return axios.get(`${base}/api/v1/public/getSource`).then(res => res.data);
};

//获取标签
export const tagList = (token) => {
    axios.defaults.headers.common['Authorization'] = token.Authorization;
    return axios.get(`${base}/api/v1/public/getTag`).then(res => res.data);
};

//添加标签
export const create_tag = (params, token) => {
    axios.defaults.headers.common['Authorization'] = token.Authorization;
    return axios.post(`${base}/api/v1/tag/add`, params).then(res => res.data);
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

//获取全部老师列表
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

//CC客户续费转课再购买
export const signThreeContract = (params, token) => {
    axios.defaults.headers.common['Authorization'] = token.Authorization;
    return axios.post(`${base}/api/v1/order/renew`, params).then(res => res.data);
};

//CC获取转课补费的课程剩余金额
export const getRemainMoney = (token, params) => {
    axios.defaults.headers.common['Authorization'] = token.Authorization;
    return axios.get(`${base}/api/v1/order/getCourseBalance`, { params: params }).then(res => res.data);
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

