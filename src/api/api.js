import axios from 'axios';
import qs from 'qs'

let base = 'http://localhost:8081';

export const requestLogin = params => { return axios.post(`${base}/login`, qs.stringify(params)).then(res => res.data); };

export const requestRegister = params => { return axios.post(`${base}/register`, params) };

export const getUserList = params => { return axios.get(`${base}/user/list`, { params: params }); };

export const getUserListPage = params => { return axios.post(`${base}/user/query`, params ); };

export const removeUser = params => { return axios.post(`${base}/user/delete`,params,{headers:{
    'Content-Type': 'application/json;charset=UTF-8' 
  }}) };

export const getRole = params => { return axios.post(`${base}/user/getRole`, params ); };

export const deleteUser = params => { return axios.post(`${base}/user/deleteUser`, params) };

export const update = params => { return axios.post(`${base}/user/update`, params) };

export const addUser = params => { return axios.get(`${base}/user/add`, { params: params }); };

export const advancedGeneral = params => { return axios.post(`${base}/thingsIdentify/advancedGeneral`, qs.stringify(params)) };