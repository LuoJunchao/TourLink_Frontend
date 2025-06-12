import { defineStore } from 'pinia'
import { userApi } from '../api/user'


export const useUserStore = defineStore('user', {
  state: () => ({
    userInfo: null,
    token: localStorage.getItem('token'),
    loading: false,
    initialized: false // 添加初始化状态标记
  }),

  getters: {
    // 修改登录状态判断逻辑：有token就认为已登录，userInfo可以异步获取
    isLoggedIn: (state) => !!state.token,
    // 添加一个更严格的登录状态检查
    isFullyLoggedIn: (state) => !!state.token && !!state.userInfo,
    userId: (state) => state.userInfo?.id || localStorage.getItem('userId')
  },

  actions: {
    // 初始化用户状态 - 应用启动时调用
    async initializeAuth() {
      if (this.initialized) return

      const token = localStorage.getItem('token')
      const userId = localStorage.getItem('userId')

      if (token && userId) {
        this.token = token
        try {
          // 验证token有效性并获取用户信息
          await this.fetchUserInfo()
          console.log('用户状态已恢复')
        } catch (error) {
          console.log('Token已过期或无效，清除登录状态')
          this.logout()
        }
      }

      this.initialized = true
    },

    // 验证token有效性
    async validateToken() {
      if (!this.token) return false

      try {
        const userId = localStorage.getItem('userId')
        if (!userId) return false

        // 尝试获取用户信息来验证token
        await userApi.getUserInfo(userId)
        return true
      } catch (error) {
        console.log('Token验证失败:', error.message)
        return false
      }
    },

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
        console.log('开始登录，凭据:', credentials)
        const response = await userApi.login(credentials)
        console.log('登录API响应:', response)

        // 检查响应数据结构
        if (!response) {
          throw new Error('登录响应为空')
        }

        // 检查token字段
        const token = response.token || response.accessToken || response.access_token
        if (!token) {
          console.error('响应中没有找到token字段，响应数据:', response)
          throw new Error('登录响应中缺少token')
        }

        //检查userId字段
        const userId = response.userId || response.user_id || response.id || response.user?.id
        if (!userId) {
          console.error('响应中没有找到userId字段，响应数据:', response)
          throw new Error('登录响应中缺少用户ID')
        }

        console.log('提取到的数据:', { token: token ? '存在' : '不存在', userId })

        // 设置登录状态
        this.token = token
        try {
          localStorage.setItem('token', token)
          console.log('Token已保存到localStorage')
        } catch (storageError) {
          console.error('保存token到localStorage失败:', storageError)
          throw new Error('无法保存登录状态')
        }

        // 存储用户ID
        try {
          localStorage.setItem('userId', String(userId))
          console.log('UserId已保存到localStorage:', userId)
        } catch (storageError) {
          console.error('保存userId到localStorage失败:', storageError)
          throw new Error('无法保存用户ID')
        }

        // 验证保存是否成功
        const savedToken = localStorage.getItem('token')
        const savedUserId = localStorage.getItem('userId')
        console.log('验证保存结果:', {
          savedToken: savedToken ? '存在' : '不存在',
          savedUserId: savedUserId ? savedUserId : '不存在'
        })

        // 获取用户详细信息
        try {
          await this.fetchUserInfo()
          console.log('用户信息获取成功')
        } catch (fetchError) {
          console.warn('获取用户信息失败，但登录状态已保存:', fetchError.message)
          // 不抛出错误，允许登录继续
        }

        console.log('登录成功，用户状态已更新')
        return response
      } catch (error) {
        console.error('登录过程中发生错误:', error)
        // 只有在真正的登录失败时才清理状态，不要因为获取用户信息失败就清理
        if (!this.token) {
          this.logout()
        }
        throw error
      } finally {
        this.loading = false
      }
    },

    async fetchUserInfo() {
      if (!this.token) {
        console.log('没有token，无法获取用户信息')
        return
      }

      try {
        // 使用存储的用户ID获取用户信息
        const userId = localStorage.getItem('userId')
        console.log('从localStorage获取的userId:', userId)

        if (!userId) {
          throw new Error('未找到用户ID')
        }

        console.log('正在获取用户信息，userId:', userId)
        const userInfo = await userApi.getUserInfo(userId)
        console.log('API返回的用户信息:', userInfo)

        this.userInfo = userInfo
        console.log('用户信息设置成功:', userInfo?.username || '未知用户名')
      } catch (error) {
        console.error('获取用户信息失败:', error)
        console.error('错误详情:', {
          message: error.message,
          status: error.status,
          response: error.response
        })

        // 如果是认证错误，清除登录状态
        if (error.message.includes('401') || error.message.includes('登录已过期') || error.message.includes('请求失败: 401')) {
          console.log('认证错误，清除登录状态')
          this.logout()
        }
        throw error
      }
    },

    logout() {
      console.log('用户退出登录')
      this.token = null
      this.userInfo = null
      this.initialized = false
      localStorage.removeItem('token')
      localStorage.removeItem('userId')
      console.log('登录状态已清除')
    },

    // 调试方法：检查当前状态
    debugAuthState() {
      const state = {
        storeToken: this.token ? '存在' : '不存在',
        storeUserInfo: this.userInfo ? '存在' : '不存在',
        localStorageToken: localStorage.getItem('token') ? '存在' : '不存在',
        localStorageUserId: localStorage.getItem('userId') || '不存在',
        isLoggedIn: this.isLoggedIn,
        initialized: this.initialized
      }
      console.log('当前认证状态:', state)
      return state
    },

    // 检查并刷新登录状态
    async refreshAuthState() {
      if (!this.token) return false

      const isValid = await this.validateToken()
      if (!isValid) {
        this.logout()
        return false
      }

      // 如果没有用户信息，尝试获取
      if (!this.userInfo) {
        try {
          await this.fetchUserInfo()
        } catch (error) {
          this.logout()
          return false
        }
      }

      return true
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