import request from '../utils/request'

let instance = null

class SocialApi {
  constructor() {
    if (instance) {
      return instance
    }
    instance = this
  }

  // 博客操作 - 更新路径
  getBlogs() {
    return request('/api/social/blogs')
  }

  getBlogDetail(id) {
    return request(`/api/social/blogs/${id}`)
  }

  createBlog(data) {
    return request('/api/social/blogs', {
      method: 'POST',
      body: JSON.stringify(data)
    })
  }
  
  searchBlogs(keyword, searchType) {
    return request('/api/social/blogs/search', {
      params: { keyword, searchType }
    })
  }
  
  // 视图操作 - 新增
  viewBlog(blogId, userId) {
    return request('/api/views', {
      method: 'POST',
      params: { blogId, userId }
    })
  }

  getViewCount(blogId) {
    return request('/api/views/count', {
      params: { blogId }
    })
  }
  
  // 标签操作
  getAttractionTags(attractionId) {
    return request(`/api/social/attraction-tags/${attractionId}`)
  }
  
  // 分享操作
  shareBlog(blogId, userId) {
    return request('/api/shares', {
      method: 'POST',
      params: { blogId, userId }
    })
  }

  getShareCount(blogId) {
    return request('/api/shares/count', {
      params: { blogId }
    })
  }
  
  // 评论操作
  addComment(userId, data) {
    return request('/api/comments', {
      method: 'POST',
      headers: {
        'userId': userId
      },
      body: JSON.stringify(data)
    })
  }
  
  getCommentsByBlogId(blogId, page, size) {
    return request(`/api/comments/blog/${blogId}`, {
      params: { page, size }
    })
  }
  
  deleteComment(commentId, userId) {
    return request(`/api/comments/${commentId}`, {
      method: 'DELETE',
      headers: {
        'userId': userId
      }
    })
  }
  
  getCommentCount(blogId) {
    return request(`/api/comments/blog/${blogId}/count`)
  }
  
  // 点赞操作
  likeBlog(blogId, userId) {
    return request('/api/likes', {
      method: 'POST',
      params: { blogId, userId }
    })
  }
  
  unlikeBlog(blogId, userId) {
    return request('/api/likes', {
      method: 'DELETE',
      params: { blogId, userId }
    })
  }
  
  getLikeCount(blogId) {
    return request('/api/likes/count', {
      params: { blogId }
    })
  }
  
  // 浏览操作
  viewBlog(blogId, userId) {
    return request('/api/views', {
      method: 'POST',
      params: { blogId, userId }
    })
  }
  
  getViewCount(blogId) {
    return request('/api/views/count', {
      params: { blogId }
    })
  }
  
  // 私信操作
  sendMessage(data) {
    return request('/api/messages', {
      method: 'POST',
      body: JSON.stringify(data)
    })
  }

  getChat(userId, targetUserId) {
    return request('/api/messages/chat', {
      params: { userId, targetUserId }
    })
  }

  getChatList(userId) {
    return request(`/api/messages/dialogs/${userId}`)
  }
  
  // 添加到SocialApi类中
updateBlog(id, data) {
  return request(`/api/social/blogs/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data)
  })
}
}

export const socialApi = new SocialApi()