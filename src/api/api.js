import axios from 'axios';

let base = 'http://crmv2.dfth.com';
//登录页面
export const requestLogin = params => { return axios.post(`${base}/oauth/token`, params).then(res => res.data); };

//获取用户信息
export const getUserinfo = (token) => {
										axios.defaults.headers.common['Authorization'] = token.Authorization;
										return axios.get(`${base}/api/v1/userinfo`).then(res => res.data); };



// export const getUserList = params => { return axios.get(`${base}/user/list`, { params: params }); };

// export const getUserListPage = params => { return axios.get(`${base}/user/listpage`, { params: params }); };

// export const removeUser = params => { return axios.get(`${base}/user/remove`, { params: params }); };

// export const batchRemoveUser = params => { return axios.get(`${base}/user/batchremove`, { params: params }); };

// export const editUser = params => { return axios.get(`${base}/user/edit`, { params: params }); };

// export const addUser = params => { return axios.get(`${base}/user/add`, { params: params }); };

export const taskList = params => { return axios.get(`${base}/task`).then(res => res.data);  };

export const counterList = params => { return axios.get(`${base}/counter`).then(res => res.data);  };

export const mailCode = params => { return axios.post(`${base}/mailcode`,params).then(res => res.data);  };

//获取菜单
export const menuList = token => { 
									axios.defaults.headers.common['Authorization'] = token.Authorization;
									return axios.get(`${base}/api/v1/userinfo/menu`).then(res => res.data);  };

//获取部门
export const department = (token) => { 
												axios.defaults.headers.common['Authorization'] = token.Authorization;
												return axios.get(`${base}//api/v1/department`).then(res => res.data);  };
//创建部门
export const create_department = (params,token) => { 
												axios.defaults.headers.common['Authorization'] = token.Authorization;
												return axios.post(`${base}//api/v1/department`,params).then(res => res.data);  };
//修改部门
export const put_department = (params,token) => { 
												axios.defaults.headers.common['Authorization'] = token.Authorization;
												return axios.put(`${base}//api/v1/department/1`,params).then(res => res.data);  };												
//删除部门
export const delete_department = (params,token) => { 
												axios.defaults.headers.common['Authorization'] = token.Authorization;
												return axios.delete(`${base}//api/v1/department/1`,{params:params}).then(res => res.data);  };



//获取账号
export const account = (params,token) => { 
											axios.defaults.headers.common['Authorization'] = token.Authorization;
											return axios.get(`${base}/api/v1/admin`,{params:params}).then(res => res.data);  };

//创建账号
export const create_account = (params,token) => { 
											axios.defaults.headers.common['Authorization'] = token.Authorization;
											return axios.post(`${base}/api/v1/admin`,params).then(res => res.data);  };

//修改账号
export const put_account = (params,token) => { 
											axios.defaults.headers.common['Authorization'] = token.Authorization;
											return axios.put(`${base}/api/v1/admin/1`,params).then(res => res.data);  };

//删除账号
export const delete_account = (params,token) => { 
											axios.defaults.headers.common['Authorization'] = token.Authorization;
											return axios.delete(`${base}/api/v1/admin/1`,{params:params}).then(res => res.data);  };	

//获取部门职位校区											
export const sdjList =(token)=>{
											axios.defaults.headers.common['Authorization'] = token.Authorization;
											return axios.get(`${base}/api/v1/admin/filter/data`).then(res => res.data);  };

//获取城市
export const cityList =  (token,params) => {	axios.defaults.headers.common['Authorization'] = token.Authorization;
										 return axios.get(`${base}/api/v1/city`,{params:params}).then(res => res.data);  };
										
//根据城市获取校区
export const campusList = (params,token) => { 	axios.defaults.headers.common['Authorization'] = token.Authorization;
												return axios.get(`${base}/api/v1/school`,{params:params}).then(res => res.data);  };



//获取角色
export const character = (token) => {    axios.defaults.headers.common['Authorization'] = token.Authorization;
												return axios.get(`${base}/api/v1/role`).then(res => res.data);  };
//创建角色
export const create_character = (params,token) => {    axios.defaults.headers.common['Authorization'] = token.Authorization;
												return axios.post(`${base}/api/v1/role`,params).then(res => res.data);  };

//修改角色
export const put_character = (params,token) => {    axios.defaults.headers.common['Authorization'] = token.Authorization;
												return axios.put(`${base}/api/v1/role/21`,params).then(res => res.data);  };

//删除角色
export const delete_character = (params,token) => {    axios.defaults.headers.common['Authorization'] = token.Authorization;
												return axios.delete(`${base}/api/v1/role/1`,{params:params}).then(res => res.data);  };

//获取权限菜单
export const rangeList = (token) => { axios.defaults.headers.common['Authorization'] = token.Authorization;
										return axios.get(`${base}/api/v1/module`).then(res => res.data);  };

//获取角色详情
export const detail_character = (params,token) => {    axios.defaults.headers.common['Authorization'] = token.Authorization;
												return axios.get(`${base}/api/v1/role/1`,{params:params}).then(res => res.data);  };



//获取职位
export const departList = (params,token) => { axios.defaults.headers.common['Authorization'] = token.Authorization;
										return axios.get(`${base}/api/v1/job`,{params:params}).then(res => res.data);  };

//创建职位
export const create_departList = (params,token) => { axios.defaults.headers.common['Authorization'] = token.Authorization;
										return axios.post(`${base}/api/v1/job`,params).then(res => res.data);  };										

//修改职位
export const put_departList = (params,token) => { axios.defaults.headers.common['Authorization'] = token.Authorization;
										return axios.put(`${base}/api/v1/job/1`,params).then(res => res.data);  };

//删除职位
export const delete_departList = (params,token) => { axios.defaults.headers.common['Authorization'] = token.Authorization;
										return axios.delete(`${base}/api/v1/job/18`,{params:params}).then(res => res.data);  };

//获取职位详情
export const detail_departList = (params,token) => { axios.defaults.headers.common['Authorization'] = token.Authorization;
										return axios.get(`${base}/api/v1/job/2`,{params:params}).then(res => res.data);  };




//创建菜单
export const create_menuList = (params,token) => { axios.defaults.headers.common['Authorization'] = token.Authorization;
										return axios.post(`${base}/api/v1/module`,params).then(res => res.data);  };										

//修改菜单
export const put_menuList = (params,token) => { axios.defaults.headers.common['Authorization'] = token.Authorization;
										return axios.put(`${base}/api/v1/module/1`,params).then(res => res.data);  };

//删除菜单
export const delete_menuList = (params,token) => { axios.defaults.headers.common['Authorization'] = token.Authorization;
										return axios.delete(`${base}/api/v1/module/1`,{params:params}).then(res => res.data);  };

//获取级别列表
export const get_level = (params,token) => { axios.defaults.headers.common['Authorization'] = token.Authorization;
										return axios.get(`${base}/api/v1/public/getMenuList`,{params:params}).then(res => res.data);  };	

//获取级别详情
export const detail_level = (params,token) => { axios.defaults.headers.common['Authorization'] = token.Authorization;
										return axios.get(`${base}/api/v1/module/1`,{params:params}).then(res => res.data);  };	

//TMK
//添加学员
export const create_student = (params,token) => { axios.defaults.headers.common['Authorization'] = token.Authorization;
										return axios.post(`${base}/api/v1/tmk/customer`,params).then(res => res.data);  };	

//获取回访列表
export const returnVisitList = (token,params) => { axios.defaults.headers.common['Authorization'] = token.Authorization;
										return axios.get(`${base}/api/v1/visit`,{params:params}).then(res => res.data);  };										
//获取来源渠道
export const sourceList = (token) => { axios.defaults.headers.common['Authorization'] = token.Authorization;
										return axios.get(`${base}/api/v1/public/getSource`).then(res => res.data);  };

//获取标签
export const tagList = (token) => { axios.defaults.headers.common['Authorization'] = token.Authorization;
										return axios.get(`${base}/api/v1/public/getTag`).then(res => res.data);  };		

//添加标签
export const create_tag = (params,token) => { axios.defaults.headers.common['Authorization'] = token.Authorization;
										return axios.post(`${base}/api/v1/tag`,params).then(res => res.data);  };	
//删除标签
export const delete_tag = (params,token) => { axios.defaults.headers.common['Authorization'] = token.Authorization;
										return axios.delete(`${base}/api/v1/tag`,{params:params}).then(res => res.data);  };										

//添加回访记录
export const create_returnList = (params,token) => { axios.defaults.headers.common['Authorization'] = token.Authorization;
										return axios.post(`${base}/api/v1/visit`,params).then(res => res.data);  };	

//添加沟通记录
export const create_community = (params,token) => { axios.defaults.headers.common['Authorization'] = token.Authorization;
										return axios.post(`${base}/api/v1/tmk/customer/call`,params).then(res => res.data);  };											
//查询重复学员
export const repeatStudentList = (token,params) => { axios.defaults.headers.common['Authorization'] = token.Authorization;
										return axios.get(`${base}/api/v1/tmk/getuesrs`,{params:params}).then(res => res.data);  };									