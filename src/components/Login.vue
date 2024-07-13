<template>
    <div class="login-container">
      <el-form :model="loginForm" label-width="80px">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="loginForm.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input type="password" v-model="loginForm.password"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="login">登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  import { booksManager } from '@/axios'
  import { useRouter } from 'vue-router'
  import { useUserStore } from '@/stores/user'
  import { ElMessage } from 'element-plus'
  
  const router = useRouter()
  const userStore = useUserStore()
  
  const loginForm = ref({
    username: '',
    password: ''
  })
  
  const login = async () => {
    try {
      const response = await booksManager.post('/user/login', loginForm.value)
      const token = document.cookie  // token是从cookie中获取
      document.cookie = `AuthToken=${token}; path=/` // 将 token 存储在 cookie 中
      localStorage.setItem('AuthToken', token) // 将 token 存储在 localStorage 中
      userStore.login() // 更新用户状态为已登录
      router.push('/')
    } catch (error) {
      console.error('登录失败:', error)
      ElMessage.error('登录失败，请检查用户名和密码')
    }
  }
  </script>
  
  <style scoped>
  .login-container {
    max-width: 400px;
    margin: 100px auto;
    padding: 20px;
    border: 1px solid #dcdcdc;
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  }
  </style>
  