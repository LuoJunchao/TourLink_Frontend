import request from '../utils/request'

let instance = null

class RoutingApi {
  constructor() {
    if (instance) {
      return instance
    }
    instance = this
  }

  // 行程规划
  createItinerary(data) {
    return request('/routing/api/path/plan', {
      method: 'POST',
      body: JSON.stringify(data)
    })
  }

  // 确保其他API也添加了/routing前缀
  getAllCities() {
    return request('/routing/api/cities')
  }

  getCityById(cityId) {
    return request(`/routing/api/cities/${cityId}`)
  }
  
  // 节点信息
  getNodesByCity(cityId) {
    return request('/routing/api/nodes', {
      params: { cityId }
    })
  }

  getNodeById(nodeId) {
    return request(`/routing/api/nodes/${nodeId}`)
  }

  addNode(data) {
    return request('/routing/api/nodes', {
      method: 'POST',
      body: JSON.stringify(data)
    })
  }
}

export const routingApi = new RoutingApi()