import axios from 'axios';

let base = '';

export const requestLogin = params => { return axios.post(`${base}/login`, params).then(res => res.data); };

export const getUserList = params => { return axios.get(`${base}/user/list`, { params: params }); };

export const getUserListPage = params => { return axios.get(`${base}/user/listpage`, { params: params }); };

export const removeUser = params => { return axios.get(`${base}/user/remove`, { params: params }); };

export const batchRemoveUser = params => { return axios.get(`${base}/user/batchremove`, { params: params }); };

export const editUser = params => { return axios.get(`${base}/user/edit`, { params: params }); };

export const addUser = params => { return axios.get(`${base}/user/add`, { params: params }); };

export const taskList = params => { return axios.get(`${base}/task`).then(res => res.data);  };

export const counterList = params => { return axios.get(`${base}/counter`).then(res => res.data);  };

export const mailCode = params => { return axios.post(`${base}/mailcode`,params).then(res => res.data);  };

export const menuList = params => { return axios.get(`${base}/menu`,params).then(res => res.data);  };

export const department = params => { return axios.post(`${base}/department`,params).then(res => res.data);  };

export const character = params => { return axios.post(`${base}/character`,params).then(res => res.data);  };

export const account = params => { return axios.post(`${base}/account`,params).then(res => res.data);  };

export const campusList = params => { return axios.get(`${base}/campusList`,params).then(res => res.data);  };

export const jobList = params => { return axios.get(`${base}/jobList`,params).then(res => res.data);  };

export const cityList = params => { return axios.get(`${base}/cityList`,params).then(res => res.data);  };

export const departList = params => { return axios.get(`${base}/departList`,params).then(res => res.data);  };