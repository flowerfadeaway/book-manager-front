<!-- Register.vue -->
<template>
    <div class="register-container">
        <el-form :model="registerForm" label-width="80px">
            <el-form-item label="用户名" prop="username">
                <el-input v-model="registerForm.username"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password">
                <el-input type="password" v-model="registerForm.password"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="register">注册</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { booksManager } from '@/axios';

const registerForm = ref({
    username: '',
    password: ''
});

const register = async () => {
    try {
        const response = await booksManager.post('/user/register', registerForm.value);
        console.log(response.data); // 处理响应，可能是注册成功或失败的消息
    } catch (error) {
        console.error('注册失败:', error);
    }
};
</script>
