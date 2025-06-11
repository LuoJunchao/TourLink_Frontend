import { defineStore } from 'pinia'
import request from '../utils/request'

export const useSpotStore = defineStore('spots', {
  state: () => ({
    spots: [],
    loading: false,
    total: 0,
    currentPage: 1,
    pageSize: 9,
    filters: {
      keyword: '',
      region: null,
      type: null,
      priceRange: [0, 10000],
      rating: null
    },
    fallbackMode: false,
    error: false,  // 添加错误状态
    errorMessage: '' // 添加错误信息
  }),

  // 在 useSpotStore 中添加重置方法
  actions: {
    async fetchSpots() {
      this.loading = true
      try {
        const response = await request('/api/attraction-service/attractions', {
          method: 'GET',
          params: {
            page: this.currentPage,
            size: this.pageSize,
            keyword: this.filters.keyword,
            region: this.filters.region,
            type: this.filters.type,
            minPrice: this.filters.priceRange[0],
            maxPrice: this.filters.priceRange[1],
            rating: this.filters.rating
          }
        })
        this.spots = response.content
        this.total = response.totalElements
      } catch (error) {
        console.error('获取景点列表失败:', error)
      } finally {
        this.loading = false
      }
    },
    setFilters(filters) {
      // 更新过滤条件
      if (filters.keyword !== undefined) this.filters.keyword = filters.keyword
      if (filters.region !== undefined) this.filters.region = filters.region
      if (filters.type !== undefined) this.filters.type = filters.type
      if (filters.priceRange !== undefined) this.filters.priceRange = filters.priceRange
      if (filters.rating !== undefined) this.filters.rating = filters.rating
      
      // 重置页码
      this.currentPage = 1
      
      // 重新获取数据
      this.fetchSpots()
    },
    clearErrors() {
      this.error = false
      this.errorMessage = ''
    },
    setFallbackMode(mode) {
      this.fallbackMode = mode
    },
    
    // 重置整个store状态
    resetState() {
      this.spots = []
      this.loading = false
      this.total = 0
      this.currentPage = 1
      this.filters = {
        keyword: '',
        region: null,
        type: null,
        priceRange: [0, 10000],
        rating: null
      }
      this.fallbackMode = false
      this.error = false
      this.errorMessage = ''
    },
    
    // 深度克隆数据以防止引用污染
    getIsolatedSpotData(spotId) {
      const spot = this.spots.find(s => s.id === spotId)
      return spot ? JSON.parse(JSON.stringify(spot)) : null
    }
  }
})