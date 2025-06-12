import request from "../utils/request";

let instance = null;

class SocialApi {
  constructor() {
    if (instance) {
      return instance;
    }
    instance = this;
  }

  // 博客操作 - 更新路径
  getBlogs() {
    return request("/social/api/blogs");
  }

  getBlogRanking(sortBy,timeRange='',page = 0) {
    return request(`/social/api/blogs/ranking?sortBy=${sortBy}&timeRange=${timeRange}&page=${page}`)

  }

  getBlogDetail(id) {
    return request(`/social/api/blogs/${id}`);
  }

  /* createBlog(userId,title,content) {
    return request("/social/api/blogs", {
      method: "POST",
      body: 
      {
        userId:'9',
        title:'123123',
        content:'111111111111111111111111111111111111111111',
      }
    });
  } */
  
  searchBlogs(keyword, searchType, page = 0) {
    const url = `/social/api/blogs/search?page=${page}&keyword=${keyword}&searchType=${searchType}`
    const data = request(url);
    return data;
  }

  // 同样修改getBlogs方法支持分页
  getBlogs(page = 0, size = 9, sort = 'latest') {
    return request("/social/api/blogs", {
      params: {
        page,
        size,
        sort
      }
    });
  }

  // 视图操作 - 新增
  viewBlog(blogId, userId) {
    console.log('viewblog')
    return request("/social/api/views", {
      method: "POST",
      params: { blogId, userId },
    });
  }

  getViewCount(blogId) {
    return request("/social/api/views/count", {
      params: { blogId },
    });
  }

  // 标签操作
  getAttractionTags(attractionId) {
    return request(`/social/api/attraction-tags/${attractionId}`);
  }

  // 分享操作
  shareBlog(blogId, userId) {
    return request("/social/api/shares", {
      method: "POST",
      params: { blogId, userId },
    });
  }

  getShareCount(blogId) {
    return request("/social/api/shares/count", {
      params: { blogId },
    });
  }

  // 评论操作
  addComment(userId, data) {
    return request("/social/api/comments", {
      method: "POST",
      headers: {
        userId: userId,
      },
      body: JSON.stringify(data),
    });
  }

  getCommentsByBlogId(blogId, page = 0, size = 10) {
    return request(`/social/api/comments/blog/${blogId}`, {
      params: { page, size },
    }).then(data => {
      // 检查是否是分页对象，如果是则返回content数组
      if (data && data.content && Array.isArray(data.content)) {
        return data.content;
      }
      // 如果已经是数组则直接返回
      if (Array.isArray(data)) {
        return data;
      }
      // 默认返回空数组
      return [];
    });
  }

  deleteComment(commentId, userId) {
    return request(`/social/api/comments/${commentId}`, {
      method: "DELETE",
      headers: {
        userId: userId,
      },
    });
  }

  getCommentCount(blogId) {
    return request(`/social/api/comments/blog/${blogId}/count`);
  }

  // 点赞操作
  likeBlog(blogId, userId) {
    console.log(blogId, userId, typeof userId,typeof userId);
    return request("/social/api/likes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      data: { blogId, userId },
    });
  }

  unlikeBlog(blogId, userId) {
    return request("/social/api/likes", {
      method: "DELETE",
      params: { blogId, userId },
    });
  }

  getLikeCount(blogId) {
    return request("/social/api/likes/count", {
      params: { blogId },
    });
  }

  // 获取点赞状态
  getLikeStatus(blogId, userId) {
    return request("/social/api/likes/status", {
      params: { blogId, userId },
    });
  }

  // 浏览操作
  viewBlog(blogId, userId) {
    return request("/social/api/views", {
      method: "POST",
      params: { blogId, userId },
    });
  }

  getViewCount(blogId) {
    return request("/social/api/views/count", {
      params: { blogId },
    });
  }

  // 私信操作
  sendMessage(data) {
    return request("/social/api/messages", {
      method: "POST",
      body: JSON.stringify(data),
    });
  }

  getChat(userId, targetUserId) {
    return request("/social/api/messages/chat", {
      params: { userId, targetUserId },
    });
  }

  getChatList(userId) {
    return request(`/social/api/messages/dialogs/${userId}`);
  }

  // 添加到SocialApi类中
  updateBlog(id, data) {
    return request(`/social/api/blogs/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    });
  }
  // 获取用户博客列表
  getUserBlogs(userId) {
    return request(`/social/api/blogs/user/${userId}`);
  }

  getBlogsByIds(blogIds) {
    return request("/social/api/blogs/batch", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(blogIds),
    });
  }
}

export const socialApi = new SocialApi();
