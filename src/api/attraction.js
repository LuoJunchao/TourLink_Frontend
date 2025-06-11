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
    // 构建查询参数
    const queryParams = {
      page: params.page || 0,
      size: params.size || 10,
      sort: params.sort || 'viewCount,desc',
      keyword: params.keyword || '',
      region: params.region || '',
      type: params.type || '',
      minPrice: params.minPrice,
      maxPrice: params.maxPrice,
      rating: params.rating,
      tags: params.tags // 添加标签参数
    }
    
    // 移除undefined的参数
    Object.keys(queryParams).forEach(key => {
      if (queryParams[key] === undefined) {
        delete queryParams[key]
      }
    })
    
    // 调用API
    const data = await request('/api/attractions/paged', { params: queryParams })
    return this.transformResponse(data)
  }

  getAttractionDetail(id) {
    return request(`/api/attractions/${id}`)
  }
  
  // 景点收藏
  getFavorites(userId) {
    return request(`/api/attraction-favorites/user/${userId}`)
  }

  checkFavorite(attractionId, userId) {
    return request(`/api/attraction-favorites/check`, {
      params: { attractionId, userId }
    })
  }

  toggleFavorite(data) {
    return request('/api/attraction-favorites', {
      method: 'POST',
      body: JSON.stringify(data)
    })
  }
  
  // 景点评论
  getReviews(attractionId) {
    return request(`/api/attraction-reviews/attraction/${attractionId}`)
  }

  addReview(data) {
    return request('/api/attraction-reviews', {
      method: 'POST',
      body: JSON.stringify(data)
    })
  }
  
  // 景点热度
  getPopularity(attractionId) {
    return request(`/api/attraction-popularity/${attractionId}`)
  }

  incrementView(attractionId) {
    return request(`/api/attraction-popularity/${attractionId}/view`, {
      method: 'POST'
    })
  }

  // 获取所有景点
  getAllAttractions() {
    return request('/api/attractions')
  }

  // 创建景点
  createAttraction(data) {
    return request('/api/attractions', {
      method: 'POST',
      body: JSON.stringify(data)
    })
  }

  // 更新景点
  updateAttraction(id, data) {
    return request(`/api/attractions/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data)
    })
  }

  // 删除景点
  deleteAttraction(id) {
    return request(`/api/attractions/${id}`, {
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
    
    return request('/api/attractions/search', {
      params: searchParams
    })
  }

  // 获取最多浏览的景点
  getMostViewedAttractions() {
    return request('/api/attractions/most-viewed')
  }
  
  // 获取评分最高的景点
  getTopRatedAttractions() {
    return request('/api/attractions/top-rated')
  }
}

export const attractionApi = new AttractionApi()