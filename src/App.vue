<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'

</script>

<template>


      <nav>
        <!-- <RouterLink to="/">Home</RouterLink> -->
        <RouterLink to="/cuckoo">查询</RouterLink>
        <RouterLink to="/contact">联系我们</RouterLink>
        <!-- <RouterLink to="/login">登录</RouterLink> -->
        <!-- <RouterLink to="/logout">登出</RouterLink> -->
        <!-- <RouterLink to="/register">注册</RouterLink> -->

      </nav>

  <RouterView />
</template>

