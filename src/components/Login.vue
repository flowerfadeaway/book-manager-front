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

const router = useRouter()
const userStore = useUserStore()

const loginForm = ref({
    username: '',
    password: ''
})

const login = async () => {
    try {
        const response = await booksManager.post('/user/login', loginForm.value)
        const token = document.cookie // 从响应中获取 token
        localStorage.setItem('AuthToken', token) // 将 token 存储在 localStorage 中
        userStore.login() // 更新用户状态为已登录
        router.push('/')
    } catch (error) {
        console.error('登录失败:', error)
    }
}
</script>
