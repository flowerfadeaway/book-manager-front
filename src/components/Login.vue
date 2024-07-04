<!-- Login.vue -->
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
import { ref } from 'vue';
import { booksManager } from '@/axios';
import { useRouter } from 'vue-router';
import { useCounterStore } from '@/stores/counter';
const router = useRouter();
const counter = useCounterStore();

const loginForm = ref({
    username: '',
    password: ''
});

const login = async () => {
    try {
        const response = await booksManager.post('/user/login', loginForm.value);
        // const setCookieHeader = response.headers['set-cookie'];
        // console.log(document.cookie);
        // console.log(response.headers.get("set-cookie"));
        // console.log(response);
        // console.log(response.headers['Set-Cookie']);
        // console.log(setCookieHeader);
        const token = document.cookie;
        localStorage.setItem('AuthToken', token); // 将 token 存储在 localStorage 中
        // console.log(response.data); // 处理响应，可能是登录成功或失败的消息
        counter.setRole(response.data);
        console.log(counter.role);
        router.push('/');
    } catch (error) {
        console.error('登录失败:', error);
    }
};

// // 从 Set-Cookie 字段中提取 token 的方法
// function extractTokenFromSetCookieHeader(setCookieHeader) {
//   // 假设 Set-Cookie 字段的格式是 "token=xxx; Path=/; HttpOnly"
//   const match = setCookieHeader.match(/AuthToken=([^;]+);/);
//   if (match) {
//     return match[1];
//   } else {
//     return null;
//   }
// }
</script>
