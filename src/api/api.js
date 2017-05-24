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
											return axios.post(`${base}/api/v1/admin/805`,params).then(res => res.data);  };

//删除账号
export const delete_account = (params,token) => { 
											axios.defaults.headers.common['Authorization'] = token.Authorization;
											return axios.delete(`${base}/api/v1/admin/805`,{params:params}).then(res => res.data);  };	

//获取部门职位校区											
export const sdjList =(token)=>{
											axios.defaults.headers.common['Authorization'] = token.Authorization;
											return axios.get(`${base}/api/v1/admin/filter/data`).then(res => res.data);  };

//获取城市
export const cityList =  (token) => {	axios.defaults.headers.common['Authorization'] = token.Authorization;
										 return axios.get(`${base}/api/v1/city`).then(res => res.data);  };
										
//根据城市获取校区
export const campusList = (params,token) => { 	axios.defaults.headers.common['Authorization'] = token.Authorization;
												return axios.get(`${base}/api/v1/school`,{params:params}).then(res => res.data);  };



//获取角色
export const character = (token) => {    axios.defaults.headers.common['Authorization'] = token.Authorization;
												return axios.get(`${base}/api/v1/role`).then(res => res.data);  };
//创建角色
export const create_character = (params,token) => {    axios.defaults.headers.common['Authorization'] = token.Authorization;
												return axios.pose(`${base}/api/v1/role`,params).then(res => res.data);  };

//修改角色
export const put_character = (params,token) => {    axios.defaults.headers.common['Authorization'] = token.Authorization;
												return axios.put(`${base}/api/v1/role/21`,params).then(res => res.data);  };

//删除角色
export const delete_character = (params,token) => {    axios.defaults.headers.common['Authorization'] = token.Authorization;
												return axios.delete(`${base}/api/v1/role/1`,{params:params}).then(res => res.data);  };




//获取职位
export const departList = (params,token) => { axios.defaults.headers.common['Authorization'] = token.Authorization;
										return axios.get(`${base}/api/v1/job`,{params:params}).then(res => res.data);  };




export const levelList = params => { return axios.get(`${base}/levelList`,params).then(res => res.data);  };

export const jobList = params => { return axios.get(`${base}/jobList`,params).then(res => res.data);  };