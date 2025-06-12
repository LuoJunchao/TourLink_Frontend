import request from '../utils/request'

let instance = null

class AttractionApi {
  constructor() {
    if (instance) {
      return instance
    }
    instance = this
  }

  // 参数验证函数
  validateParams(params) {
    if (!params) return {}
    const validParams = {}
    const allowedKeys = ['page', 'size', 'sort', 'filter']
    
    for (const key of allowedKeys) {
      if (params[key] !== undefined) {
        validParams[key] = params[key]
      }
    }
    return validParams
  }

  // 数据转换函数
  transformResponse(data) {
    if (!data) return null
    return {
      ...data,
      createdAt: data.createdAt ? new Date(data.createdAt) : null,
      updatedAt: data.updatedAt ? new Date(data.updatedAt) : null
    }
  }

  async getAttractions(params) {
    // 确保参数存在且有默认值
    const page = params.page ?? 0;  // 使用空值合并运算符
    const size = params.size ?? 12;
    const sort = params.sort ?? 'viewCount,desc';
    
    // 构建URL，确保参数正确编码
    const url = `/attraction/api/attractions/paged?page=${page}&size=${size}&sort=${encodeURIComponent(sort)}`;
    
    // 调用API
    const data = await request(url);
    console.log('API原始响应:', data);
    return this.transformResponse(data);
  }

  getAttractionDetail(id) {
    return request(`/attraction/api/attractions/${id}`)
  }
  
  // 景点收藏
  getFavorites(userId) {
    return request(`/attraction/api/attraction-favorites/user/${userId}`)
  }

  checkFavorite(attractionId, userId) {
    return request(`/attraction/api/attraction-favorites/attraction/${attractionId}/user/${userId}`)
  }

  addFavorite(attractionId, userId) {
    return request(`/attraction/api/attraction-favorites/attraction/${attractionId}/user/${userId}`, {
      method: 'POST'
    })
  }

  removeFavorite(attractionId, userId) {
    return request(`/attraction/api/attraction-favorites/attraction/${attractionId}/user/${userId}`, {
      method: 'DELETE'
    })
  }

  // 移除原来的toggleFavorite方法，改为使用addFavorite和removeFavorite
  toggleFavorite(data) {
    return request('/attraction/api/attraction-favorites', {
      method: 'POST',
      body: JSON.stringify(data)
    })
  }
  
  // 景点评论
  getReviews(attractionId) {
    return request(`/attraction/api/attraction-reviews/attraction/${attractionId}`)
  }

  addReview(data) {
    return request('/attraction/api/attraction-reviews', {
      method: 'POST',
      body: JSON.stringify(data)
    })
  }
  
  // 景点热度
  getPopularity(attractionId) {
    return request(`/attraction/api/attraction-popularity/${attractionId}`)
  }

  incrementView(attractionId) {
    return request(`/attraction/api/attraction-popularity/${attractionId}/view`, {
      method: 'POST'
    })
  }

  // 获取所有景点
  getAllAttractions() {
    return request('/attraction/api/attractions')
  }

  // 创建景点
  createAttraction(data) {
    return request('/attraction/api/attractions', {
      method: 'POST',
      body: JSON.stringify(data)
    })
  }

  // 更新景点
  updateAttraction(id, data) {
    return request(`/attraction/api/attractions/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data)
    })
  }

  // 删除景点
  deleteAttraction(id) {
    return request(`/attraction/api/attractions/${id}`, {
      method: 'DELETE'
    })
  }

  // 搜索景点
  searchAttractions(params) {
    // 支持更多搜索参数
    const searchParams = {
      keyword: params.keyword || '',
      type: params.type || '',
      region: params.region || '',
      // 可以添加更多搜索参数
    }
    
    return request('/attraction/api/attractions/search', {
      params: searchParams
    })
  }

  // 获取最多浏览的景点
  getMostViewedAttractions() {
    return request('/attraction/api/attractions/most-viewed')
  }
  
  // 获取评分最高的景点
  getTopRatedAttractions() {
    return request('/attraction/api/attractions/top-rated')
  }

  getAttractionsByIds(ids) {
    return request('/attraction/api/attractions/batch', {
      method: 'POST',
      body: JSON.stringify(ids)
    })
  }
}

export const attractionApi = new AttractionApi()