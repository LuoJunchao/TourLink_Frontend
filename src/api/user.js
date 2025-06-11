import request from '../utils/request'

let instance = null

class UserApi {
  constructor() {
    if (instance) {
      return instance
    }
    instance = this
  }

  // 用户基本操作
  register(data) {
    return request('/api/auth/register', {
      method: 'POST',
      body: JSON.stringify(data)
    })
  }

  login(data) {
    return request('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify(data)
    })
  }

  getUserInfo(id) {
    return request(`/api/users/${id}`)
  }

  updateUser(id, data) {
    return request(`/api/users/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data)
    })
  }
  
  // 用户档案操作
  getProfile(userId) {
    return request(`/api/user-profiles/user/${userId}`)
  }

  updateProfile(id, data) {
    return request(`/api/user-profiles/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data)
    })
  }
  
  // 用户角色操作
  getUserRoles(userId) {
    return request(`/api/user-roles/user/${userId}`)
  }
  
  // 获取当前用户信息（使用存储的用户ID）
  getCurrentUser() {
    // 从localStorage获取用户ID
    const userId = localStorage.getItem('userId')
    if (!userId) {
      return Promise.reject(new Error('未找到用户ID'))
    }
    return this.getUserInfo(userId)
  }
  
  // 用户收藏操作
  addFavorite(userId, attractionId) {
    return request(`/api/users/${userId}/favorites/${attractionId}`, {
      method: 'POST'
    })
  }
  
  removeFavorite(userId, attractionId) {
    return request(`/api/users/${userId}/favorites/${attractionId}`, {
      method: 'DELETE'
    })
  }
  
  getUserFavorites(userId) {
    return request(`/api/users/${userId}/favorites`)
  }
  
  // 用户评论操作
  getUserReviews(userId) {
    return request(`/api/users/${userId}/reviews`)
  }
}

export const userApi = new UserApi()