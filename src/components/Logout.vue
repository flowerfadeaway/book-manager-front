<template>
  <div>
    <el-button type="primary" @click="logout">退出登录</el-button>
  </div>
</template>

<script setup>
import { useUserStore } from '@/stores/user'
import { useRouter } from 'vue-router'

const router = useRouter()
const userStore = useUserStore()

const logout = () => {
  // 清除 Cookie
  document.cookie = "AuthToken=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/"

  // 清除 LocalStorage
  localStorage.removeItem('AuthToken')
  userStore.logout()

  // 页面跳转到登录页
  router.push({ path: '/login' })
}
</script>
