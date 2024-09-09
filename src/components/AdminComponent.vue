<template>
    <div>
      <!-- 用户列表展示 -->
      <el-table :data="users" style="width: 100%">
        <el-table-column prop="username" label="Username" width="180"></el-table-column>
        <el-table-column prop="balance" label="Balance" width="180"></el-table-column>
        <el-table-column label="Actions" width="180">
          <template #default="scope">
            <el-button type="primary" @click="openEditModal(scope.row)">Edit Balance</el-button>
          </template>
        </el-table-column>
      </el-table>
  
      <!-- 编辑余额的对话框 -->
      <el-dialog v-model="dialogVisible" title="Edit Balance" width="500" :before-close="handleClose">
        <span>Modify the balance for user: {{ selectedUser.username }}</span>
        <!-- 只允许输入整数 -->
        <el-input
          v-model="selectedUser.balance"
          placeholder="Enter new balance"
          type="number"
          @input="validateBalance"
        ></el-input>
        <template #footer>
          <div class="dialog-footer">
            <el-button @click="dialogVisible = false">Cancel</el-button>
            <el-button type="primary" @click="updateBalance">Confirm</el-button>
          </div>
        </template>
      </el-dialog>
    </div>
  </template>
  
  <script>
  import { ref } from 'vue';
  import { bookChangeCuckoo } from '@/axios'; // 自定义 axios 实例
  
  export default {
    setup() {
      const users = ref([]);
      const dialogVisible = ref(false);
      const selectedUser = ref({ username: '', balance: 0 });
  
      // 获取所有用户的函数
      const fetchUsers = async () => {
        try {
          const response = await bookChangeCuckoo.get('/admin/users');
          users.value = response.data;
        } catch (error) {
          console.error('Error fetching users:', error);
        }
      };
  
      // 打开编辑对话框
      const openEditModal = (user) => {
        selectedUser.value = { ...user }; // 克隆选中的用户对象
        dialogVisible.value = true;
      };
  
      // 更新用户余额的函数
      const updateBalance = async () => {
        try {
          await bookChangeCuckoo.put(`/admin/${selectedUser.value.id}/balance`, null, {
            params: { balance: selectedUser.value.balance },
          });
          fetchUsers(); // 更新用户列表
          dialogVisible.value = false; // 关闭对话框
        } catch (error) {
          console.error('Error updating balance:', error);
        }
      };
  
      // 关闭对话框前的处理逻辑
      const handleClose = () => {
        dialogVisible.value = false;
      };
  
      // 确保输入的值是整数
      const validateBalance = () => {
        selectedUser.value.balance = Math.floor(selectedUser.value.balance || 0);
      };
  
      // 初始化时获取用户列表
      fetchUsers();
  
      return {
        users,
        dialogVisible,
        selectedUser,
        openEditModal,
        updateBalance,
        handleClose,
        validateBalance,
      };
    },
  };
  </script>
  
  <style scoped>
  .el-button {
    margin-top: 20px;
  }
  </style>
  