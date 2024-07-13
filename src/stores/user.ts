import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
  state: () => ({
    isAuthenticated: false
  }),
  actions: {
    login() {
      this.isAuthenticated = true
    },
    logout() {
      this.isAuthenticated = false
    },
    checkAuth() {
      // 你可以在这里检查用户是否已登录（例如通过检查 token）
      this.isAuthenticated = !!localStorage.getItem('AuthToken')
    }
  }
})
