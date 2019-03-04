<template>
	<div style="margin:0 auto; width: 150 px">
    
    <el-form :model="userInfoReq" status-icon style="width: 300px;height: 500px;margin-left: 500px;" :rules="rules2" ref="userInfoReq" label-width="100px" class="demo-ruleForm">
      <h2 style="margin-left: 150px">注册</h2>
  <el-form-item label="用户名" prop="userName">
    <el-input  v-model="userInfoReq.userName" auto-complete="off"></el-input>
  </el-form-item>
  <el-form-item label="密码" prop="password">
    <el-input type="password" v-model="userInfoReq.password" auto-complete="off"></el-input>
  </el-form-item>
  <el-form-item label="确认密码" prop="checkPass">
    <el-input type="password" v-model="userInfoReq.checkPass" auto-complete="off"></el-input>
  </el-form-item>
  <el-form-item label="qq" prop="qq">
    <el-input v-model="userInfoReq.qq" auto-complete="off"></el-input>
  </el-form-item>
  <el-form-item label="电话号码" prop="telephone">
    <el-input type="telephone" v-model="userInfoReq.telephone" auto-complete="off"></el-input>
  </el-form-item>
  <el-form-item>
    <el-button type="primary" @click="submitForm('userInfoReq')">提交</el-button>
    <el-button @click="resetForm('userInfoReq')">重置</el-button>
  </el-form-item>
</el-form>
  </div>
</template>

<script>
import { requestRegister } from '../api/api';
import Axios from 'axios';


  export default {
    data() {
      var checkQq = (rule, value, callback) => {
        if (value=== '') {
          return callback(new Error('qq不能为空'));
        }
        setTimeout(() => {
          var exp=/^[1-9]\d{4,9}$/
            if (!exp.test(value) ) {
              callback(new Error('请输入正确的QQ号'));
            } else {
              callback();
          }
        }, 500);
      };
      var checkTelephone = (rule, value, callback) => {
        if (value=== '') {
          return callback(new Error('电话不能为空'));
        }
        setTimeout(() => {
          var exp=/^(13[0-9]|14[5|7]|15[0|1|2|3|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$/
            if (!exp.test(value) ) {
              callback(new Error('请输入正确的电话号码'));
            } else {
              callback();
          }
        }, 500);
      };
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          if (this.userInfoReq.checkPass !== '') {
            this.$refs.userInfoReq.validateField('checkPass');
          }
          callback();
        }
      };
      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.userInfoReq.password) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
      return {
        userInfoReq: {
          userName: '',
          password: '',
          checkPass: '',
          qq: '',
          telephone: ''
        },
        rules2: {
          pass: [
            { validator: validatePass, trigger: 'blur' }
          ],
          checkPass: [
            { validator: validatePass2, trigger: 'blur' }
          ],
          qq: [
            {validator: checkQq, trigger: 'blur'}
          ],
          telephone: [
            {validator: checkTelephone, trigger: 'blur'}
          ],
        }
      };
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            let loginParams = this.userInfoReq;
            console.log('userInfoReq',loginParams)
            requestRegister(loginParams).then(res=>{
              console.log('res.successful',res.data)
              if(res.data.successful){
                 this.$store.commit('setStorage', res.data.data)
                this.$router.push({ path: '/table' });
              }else{
                //this.$router.push({ path: '/404' });
                this.$notify.error(res.data)
              }
            })
          } else {
             this.$notify.error("请输入正确的格式！！")
            return false;
          }
        });
      },
      resetForm(formName) {
        Axios.post
        this.$refs[formName].resetFields();
	  },
	  
    }
  }
</script>