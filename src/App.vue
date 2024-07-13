<template>
  <nav>
    <RouterLink to="/cuckoo">查询</RouterLink>
    <RouterLink to="/contact">联系我们</RouterLink>
    <button v-if="isLoggedIn" @click="logout">登出</button>
    <RouterLink v-if="!isLoggedIn" to="/register">注册</RouterLink>
  </nav>

  <RouterView />
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRouter, RouterLink, RouterView } from 'vue-router'
import { useUserStore } from '@/stores/user'

const router = useRouter()
const userStore = useUserStore()

// 检查用户登录状态，可以根据实际情况调整
userStore.checkAuth()

const isLoggedIn = computed(() => userStore.isAuthenticated)

// 定义退出登录方法
const logout = () => {
  // 清除 Cookie
  document.cookie = "AuthToken=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/"

  // 清除 LocalStorage
  localStorage.removeItem('AuthToken')
  userStore.logout()

  // 页面跳转到登录页
  router.push({ path: '/login' }) // 确保 '/login' 是一个有效的路由路径
}
</script>
