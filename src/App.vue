<template>
  <div>
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

    <div class="main-content">
      <h1 style="text-align: center; margin-top: 50px;">Books-Change 交换分享每本精彩的书籍</h1>
      <p style="text-align: center; margin-top: 20px;">
        欢迎来到Books-Change，这里交换分享每本精彩的书籍。探索我们的书籍库存，并加入我们的社区，分享你喜爱的书籍和读后感。
      </p>
    </div>
  </div>
  
  <RouterView />
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user'
import { RouterLink } from 'vue-router'

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
  justify-content: space-between;
}

.logout-item {
  margin-left: auto;
}

.main-content {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}
</style>
