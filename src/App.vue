<template>
  <nav class="nav-bar">
    <el-menu mode="horizontal" background-color="#545c64" text-color="#fff" active-text-color="#ffd04b">
      <RouterLink to="/cuckoo">
        <el-menu-item>查询</el-menu-item>
      </RouterLink>
      <RouterLink to="/contact">
        <el-menu-item>联系我们</el-menu-item>
      </RouterLink>
      <el-menu-item v-if="isLoggedIn" class="logout-item" @click="logout">
        登出
      </el-menu-item>
      <RouterLink v-if="!isLoggedIn" to="/register">
        <el-menu-item>注册</el-menu-item>
      </RouterLink>
    </el-menu>
  </nav>

  <RouterView />
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user'
import { RouterLink, RouterView } from 'vue-router'

const router = useRouter()
const userStore = useUserStore()

userStore.checkAuth()
const isLoggedIn = computed(() => userStore.isAuthenticated)

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

<style scoped>
.nav-bar {
  padding: 10px;
  display: flex;
  justify-content: space-between; /* 将菜单项分散排列 */
}

.logout-item {
  margin-left: auto; /* 将该菜单项推到最右侧 */
}
</style>
