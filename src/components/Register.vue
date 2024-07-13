<!-- Register.vue -->
<template>
    <div class="register-container">
      <el-form :model="registerForm" :rules="rules" label-width="80px">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="registerForm.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input type="password" v-model="registerForm.password"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="confirmPassword">
          <el-input type="password" v-model="registerForm.confirmPassword" @input="validatePassword"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="register">注册</el-button>
        </el-form-item>
      </el-form>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import { booksManager } from '@/axios';
  import { ElMessage } from 'element-plus';
  
  const registerForm = ref({
    username: '',
    password: '',
    confirmPassword: ''
  });
  
  const rules = {
    username: [
      { required: true, message: '请输入用户名', trigger: 'blur' }
    ],
    password: [
      { required: true, message: '请输入密码', trigger: 'blur' },
      { min: 6, message: '密码长度不能少于6位', trigger: 'blur' }
    ],
    confirmPassword: [
      { required: true, message: '请输入确认密码', trigger: 'blur' }
    ]
  };
  
  const register = async () => {
    try {
      // 确保密码和确认密码一致
      if (registerForm.value.password !== registerForm.value.confirmPassword) {
        throw new Error('密码和确认密码不匹配');
      }
  
      // 确保密码长度大于等于6位
      if (registerForm.value.password.length < 6) {
        throw new Error('密码长度不能少于6位');
      }
  
      const response = await booksManager.post('/user/register', {
        username: registerForm.value.username,
        password: registerForm.value.password
      });
  
      console.log(response.data); // 处理响应，可能是注册成功或失败的消息
      // 弹出注册成功提示给用户
      ElMessage.success('注册成功！');
    } catch (error) {
      console.error('注册失败:', error);
      // 弹出报错提示给用户
      ElMessage.error(error.message);
    }
  };
  
  const validatePassword = () => {
    // 可以添加一些交互或验证逻辑，例如显示密码不匹配的消息
  };
  </script>
  
  <style scoped>
  .register-container {
    max-width: 400px;
    margin: 100px auto;
    padding: 20px;
    border: 1px solid #dcdcdc;
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  }
  </style>
  