import axios from 'axios';
import qs from 'qs'

let base = 'http://localhost:8081';

export const requestLogin = params => { return axios.post(`http://localhost:8081/login`, qs.stringify(params)).then(res => res.data); };

export const requestRegister = params => { return axios.post(`http://localhost:8081/register`, params) };

export const getUserList = params => { return axios.get(`${base}/user/list`, { params: params }); };

export const getUserListPage = params => { return axios.get(`${base}/user/listpage`, { params: params }); };

export const removeUser = params => { return axios.get(`${base}/user/remove`, { params: params }); };

export const batchRemoveUser = params => { return axios.get(`${base}/user/batchremove`, { params: params }); };

export const editUser = params => { return axios.get(`${base}/user/edit`, { params: params }); };

export const addUser = params => { return axios.get(`${base}/user/add`, { params: params }); };

export const advancedGeneral = params => { return axios.post(`http://localhost:8081/thingsIdentify/advancedGeneral`, qs.stringify(params)) };