import { defineStore } from 'pinia'
import { userApi } from '../api/user'


export const useUserStore = defineStore('user', {
  state: () => ({
    userInfo: null,
    token: localStorage.getItem('token'),
    loading: false
  }),

  getters: {
    isLoggedIn: (state) => !!state.token,
    userId: (state) => state.userInfo?.id
  },

  actions: {
    async register(credentials) {
      this.loading = true
      try {
        const response = await userApi.register(credentials)
        // 注册成功后不自动登录，返回响应让用户去登录页面
        return response
      } finally {
        this.loading = false
      }
    },

    async login(credentials) {
      this.loading = true
      try {
        const response = await userApi.login(credentials)
        this.token = response.token
        localStorage.setItem('token', response.token)
        
        // 存储用户ID，用于后续获取用户信息
        if (response.userId) {
          localStorage.setItem('userId', response.userId)
        }
        
        await this.fetchUserInfo()
        return response
      } finally {
        this.loading = false
      }
    },

    async fetchUserInfo() {
      if (!this.token) return
      
      try {
        // 使用存储的用户ID获取用户信息
        const userId = localStorage.getItem('userId')
        if (!userId) {
          throw new Error('未找到用户ID')
        }
        
        const userInfo = await userApi.getUserInfo(userId)
        this.userInfo = userInfo
      } catch (error) {
        console.error('获取用户信息失败:', error)
        this.logout()
        throw error
      }
    },

    logout() {
      this.token = null
      this.userInfo = null
      localStorage.removeItem('token')
      localStorage.removeItem('userId')
    },
    
    // 添加收藏景点
    async addFavorite(attractionId) {
      if (!this.isLoggedIn || !this.userId) {
        throw new Error('请先登录')
      }
      return await userApi.addFavorite(this.userId, attractionId)
    },
    
    // 取消收藏景点
    async removeFavorite(attractionId) {
      if (!this.isLoggedIn || !this.userId) {
        throw new Error('请先登录')
      }
      return await userApi.removeFavorite(this.userId, attractionId)
    },
    
    // 获取用户收藏的景点
    async getFavorites() {
      if (!this.isLoggedIn || !this.userId) {
        return []
      }
      return await userApi.getUserFavorites(this.userId)
    },
    
    // 获取用户评论
    async getReviews() {
      if (!this.isLoggedIn || !this.userId) {
        return []
      }
      return await userApi.getUserReviews(this.userId)
    },
    // 添加更新用户信息的方法
    async updateUser(userId, userData) {
      if (!this.isLoggedIn || !userId) {
        throw new Error('请先登录')
      }
      
      try {
        const updatedUser = await userApi.updateUser(userId, userData)
        this.userInfo = updatedUser
        return updatedUser
      } catch (error) {
        console.error('更新用户信息失败:', error)
        throw error
      }
    }
  }
})