<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user'

const userStore = useUserStore()

// 检查用户登录状态
userStore.checkAuth()

const isLoggedIn = computed(() => userStore.isAuthenticated)
</script>

<template>
  <nav>
    <RouterLink to="/cuckoo">查询</RouterLink>
    <RouterLink to="/contact">联系我们</RouterLink>
    <RouterLink v-if="isLoggedIn" to="/logout">登出</RouterLink>
    <RouterLink v-if="!isLoggedIn" to="/register">注册</RouterLink>
  </nav>

  <RouterView />
</template>
