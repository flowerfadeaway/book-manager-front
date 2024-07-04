<template>
    <div>
      <el-button type="primary" @click="logout">退出登录</el-button>
    </div>
  </template>
  
  <script setup>
  import { useCounterStore } from '@/stores/counter';
import { useRouter } from 'vue-router';
  // 获取路由实例
  const router = useRouter();
  const counter = useCounterStore();
  
  
  const logout = () => {
    // 清除 Cookie
    document.cookie = "AuthToken=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/";
  
    // 清除 LocalStorage
    localStorage.removeItem('AuthToken');
    counter.removeRole();
  
    // 页面跳转到登录页
    router.push({ path: '/login' });
  };
  </script>
  