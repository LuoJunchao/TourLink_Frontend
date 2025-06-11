<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useSpotStore } from '../../stores/spots'
import { attractionApi } from '../../api/attraction'
import { socialApi } from '../../api/social' // 添加导入socialApi
import { useUserStore } from '../../stores/user'

const router = useRouter()
const spotStore = useSpotStore()
const userStore = useUserStore()

// 搜索相关
const searchType = ref('spot')
const searchQuery = ref('')
const searchTypes = [
  { value: 'spot', label: '景点' },
  { value: 'region', label: '地区' }
]

// 景点数据
const popularSpots = ref([])
const spotCategories = ref([])
const categorySpots = ref({})
const userFavorites = ref([])
const recentReviews = ref([])

// 新增：标签筛选相关
const allTags = ref([])
const selectedTags = ref([])

// 新增：当前视图状态
const currentView = ref('all') // 'all', 'popular', 'topRated'

// 计算属性
const isLoggedIn = computed(() => userStore.isLoggedIn)

// 处理搜索
const handleSearch = () => {
  if (!searchQuery.value.trim()) return
  
  // 设置搜索参数到store
  spotStore.setSearchParams({
    type: searchType.value,
    keyword: searchQuery.value
  })
  
  // 导航到景点列表页
  router.push('/spots')
}

// 获取热门景点
const fetchPopularSpots = async () => {
  try {
    const data = await attractionApi.getMostViewedAttractions()
    popularSpots.value = data.content || []
  } catch (error) {
    console.error('获取热门景点失败:', error)
    popularSpots.value = []
  }
}

// 新增：获取高评分景点
const fetchTopRatedSpots = async () => {
  try {
    const data = await attractionApi.getTopRatedAttractions()
    popularSpots.value = data.content || []
  } catch (error) {
    console.error('获取高评分景点失败:', error)
    popularSpots.value = []
  }
}

// 新增：获取所有景点
const fetchAllSpots = async () => {
  try {
    const data = await attractionApi.getAllAttractions()
    popularSpots.value = data.slice(0, 8) || []
  } catch (error) {
    console.error('获取所有景点失败:', error)
    popularSpots.value = []
  }
}

// 新增：切换视图
const switchView = (view) => {
  currentView.value = view
  if (view === 'popular') {
    fetchPopularSpots()
  } else if (view === 'topRated') {
    fetchTopRatedSpots()
  } else {
    fetchAllSpots()
  }
}

// 获取景点分类和对应的景点
const fetchSpotCategories = async () => {
  try {
    // 获取所有景点标签
    const response = await socialApi.getAttractionTags()
    if (response && response.data && response.data.tags) {
      allTags.value = response.data.tags.map(tag => ({ name: tag }))
      spotCategories.value = allTags.value.slice(0, 3) // 取前3个分类，避免页面过长
    } else {
      console.error('获取景点标签失败: 响应格式不正确', response)
      allTags.value = []
      spotCategories.value = []
    }
    
    // 为每个分类获取对应的景点
    for (const tag of spotCategories.value) {
      try {
        // 修改为传递对象参数
        const spots = await attractionApi.searchAttractions({ keyword: tag.name })
        categorySpots.value[tag.name] = spots.slice(0, 4) // 每个分类取4个景点
      } catch (error) {
        console.error(`获取${tag.name}分类景点失败:`, error)
        categorySpots.value[tag.name] = []
      }
    }
  } catch (error) {
    console.error('获取景点分类失败:', error)
    spotCategories.value = []
  }
}

// 新增：处理标签点击
const handleTagClick = (tag) => {
  const index = selectedTags.value.indexOf(tag)
  if (index > -1) {
    selectedTags.value.splice(index, 1)
  } else {
    selectedTags.value.push(tag)
  }
  
  // 根据选中的标签筛选景点
  if (selectedTags.value.length > 0) {
    // 设置搜索参数到store
    spotStore.setSearchParams({
      tags: selectedTags.value.join(',')
    })
    
    // 导航到景点列表页
    router.push('/spots')
  }
}

// 获取用户收藏
const fetchUserFavorites = async () => {
  if (!isLoggedIn.value) return
  
  try {
    const userId = userStore.user.id
    const favorites = await attractionApi.getFavorites(userId)
    userFavorites.value = favorites.slice(0, 4) // 只显示前4个收藏
  } catch (error) {
    console.error('获取用户收藏失败:', error)
    userFavorites.value = []
  }
}

// 获取最新评论
const fetchRecentReviews = async () => {
  try {
    // 这里应该调用获取最新评论的API
    // 目前使用模拟数据
    recentReviews.value = []
  } catch (error) {
    console.error('获取最新评论失败:', error)
    recentReviews.value = []
  }
}

// 增加景点浏览量
const incrementSpotView = async (spotId) => {
  try {
    await attractionApi.incrementView(spotId)
  } catch (error) {
    console.error('增加景点浏览量失败:', error)
  }
}

// 查看景点详情
const viewSpotDetail = (spot) => {
  incrementSpotView(spot.attractionId)
  router.push(`/spots/${spot.attractionId}`)
}

onMounted(() => {
  fetchPopularSpots()
  fetchSpotCategories()
  fetchUserFavorites()
  fetchRecentReviews()
})
</script>

<template>
  <div class="home">
    <!-- 顶部搜索区域 -->
    <div class="search-section" :style="{ backgroundImage: 'url(' + '/src/assets/images/banners/home-banner.jpg' + ')' }">
      <div class="container search-container">
        <h1 class="search-title">探索美丽中国</h1>
        <p class="search-subtitle">发现令人惊叹的旅游胜地</p>
        <div class="search-box">
          
          <el-input
            v-model="searchQuery"
            placeholder="搜索您感兴趣的景点"
            class="search-input"
            @keyup.enter="handleSearch"
          >
            <template #suffix>
              <el-icon class="search-icon" @click="handleSearch"><Search /></el-icon>
            </template>
          </el-input>
          <el-select v-model="searchType" class="search-type-select" >
            <el-option label="景点名称" value="name" />
            <el-option label="地区" value="region" />
            <el-option label="标签" value="tag" />
          </el-select>
        </div>
      </div>
    </div>

    <!-- 热门景点部分 -->
    <section class="section popular-spots-section">
      <div class="container">
        <h2 class="section-title">探索景点</h2>

        <div class="quick-filters">
          <el-button 
            :class="{ 'active': currentView === 'all' }" 
            @click="switchView('all')"
          >
            全部景点
          </el-button>
          <el-button 
            :class="{ 'active': currentView === 'popular' }" 
            @click="switchView('popular')"
          >
            热门景点
          </el-button>
          <el-button 
            :class="{ 'active': currentView === 'topRated' }" 
            @click="switchView('topRated')"
          >
            高评分景点
          </el-button>
        </div>
        
        <!-- 新增：标签筛选 -->
        <div class="tag-filters">
          <div class="tag-list">
            <span class="filter-tag" 
              v-for="tag in allTags.slice(0, 10)" 
              :key="tag.name"
              :class="{ 'active': selectedTags.includes(tag.name) }"
              @click="handleTagClick(tag.name)"
            >
              {{ tag.name }}
            </span>
          </div>
        </div>
        
        <div class="spots-container">
          <div v-for="spot in popularSpots" :key="spot.attractionId" class="spot-card" @click="viewSpotDetail(spot)">
            <div class="spot-image-wrapper">
              <img :src="spot.mainImage || 'https://via.placeholder.com/300x200?text=景点图片'" :alt="spot.name" class="spot-image">
              <div v-if="!spot.isFree" class="spot-price-tag">¥{{ spot.price }}</div>
            </div>
            <div class="spot-info">
              <h3 class="spot-name">{{ spot.name }}</h3>
              <div class="spot-location">
                <i class="el-icon-location"></i>
                {{ spot.region || spot.province }}
              </div>
              <div class="spot-footer">
                <div class="spot-rating">
                  <el-rate v-model="spot.rating" disabled text-color="#ff9900"></el-rate>
                </div>
                <div class="spot-views">
                  <i class="el-icon-view"></i>
                  {{ spot.viewCount || 0 }}
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div class="view-more">
          <el-button type="primary" @click="router.push('/spots')">查看更多景点</el-button>
        </div>
      </div>
    </section>

    <!-- 景点分类区域 -->
    <div v-for="category in spotCategories" :key="category.id" class="section category-section">
      <div class="container">
        <h2 class="section-title">{{ category.name }}景点</h2>
        <el-row :gutter="24" class="spots-grid">
          <el-col :xs="24" :sm="12" :md="8" :lg="6" v-for="spot in categorySpots[category.id]" :key="spot.id">
            <el-card :body-style="{ padding: '0px' }" shadow="hover" class="spot-card">
              <div class="spot-image-wrapper">
                <img :src="spot.image" class="spot-image" :alt="spot.name">
                <div class="spot-badges">
                  <el-tag v-if="spot.isFeatured" type="danger" size="small" class="spot-badge">热门</el-tag>
                  <el-tag v-if="spot.isNew" type="success" size="small" class="spot-badge">新上线</el-tag>
                </div>
                <div class="spot-price-tag">¥{{ spot.price }}起</div>
              </div>
              <div class="spot-info">
                <h3 class="spot-name">{{ spot.name }}</h3>
                <p class="spot-location">
                  <el-icon><Location /></el-icon>
                  {{ spot.location }}
                </p>
                <div class="spot-tags">
                  <el-tag v-for="(tag, index) in spot.tags" :key="index" size="small" effect="plain" class="spot-tag">{{ tag }}</el-tag>
                </div>
                <p class="spot-description">{{ spot.description }}</p>
                <div class="spot-footer">
                  <div class="spot-rating">
                    <el-rate v-model="spot.rating" disabled show-score text-color="#ff9900" />
                    <span class="spot-views"><el-icon><View /></el-icon> {{ spot.viewCount || 0 }}</span>
                  </div>
                  <el-button type="primary" text @click="viewSpotDetail(spot.id)">查看详情</el-button>
                </div>
              </div>
            </el-card>
          </el-col>
        </el-row>
      </div>
    </div>

    <!-- 用户收藏区域 -->
    <div v-if="isLoggedIn && userFavorites.length > 0" class="section">
      <div class="container">
        <h2 class="section-title">我的收藏</h2>
        <el-row :gutter="24" class="spots-grid">
          <el-col :xs="24" :sm="12" :md="8" :lg="6" v-for="spot in userFavorites" :key="spot.id">
            <el-card :body-style="{ padding: '0px' }" shadow="hover" class="spot-card">
              <div class="spot-image-wrapper">
                <img :src="spot.image" class="spot-image" :alt="spot.name">
                <div class="spot-price-tag">¥{{ spot.price }}起</div>
              </div>
              <div class="spot-info">
                <h3 class="spot-name">{{ spot.name }}</h3>
                <p class="spot-location">
                  <el-icon><Location /></el-icon>
                  {{ spot.location }}
                </p>
                <p class="spot-description">{{ spot.description }}</p>
                <div class="spot-footer">
                  <div class="spot-rating">
                    <el-rate v-model="spot.rating" disabled show-score text-color="#ff9900" />
                  </div>
                  <el-button type="primary" text @click="viewSpotDetail(spot.id)">查看详情</el-button>
                </div>
              </div>
            </el-card>
          </el-col>
        </el-row>
      </div>
    </div>

    <!-- 最新评论区域 -->
    <div v-if="recentReviews.length > 0" class="section reviews-section">
      <div class="container">
        <h2 class="section-title">最新评论</h2>
        <el-timeline>
          <el-timeline-item
            v-for="review in recentReviews"
            :key="review.id"
            :timestamp="new Date(review.createdAt).toLocaleString()"
            placement="top"
          >
            <el-card>
              <div class="review-header">
                <span class="review-user">{{ review.userName }}</span>
                <span class="review-spot">评论了 <a @click="viewSpotDetail(review.attractionId)">{{ review.attractionName }}</a></span>
                <el-rate v-model="review.rating" disabled size="small" />
              </div>
              <div class="review-content">{{ review.content }}</div>
            </el-card>
          </el-timeline-item>
        </el-timeline>
      </div>
    </div>
  </div>
</template>

<style scoped>



/* 搜索区域样式优化 */
.search-section {
  background-image: url('../../assets/images/travel-bg.jpg');
  background-size: cover;
  background-position: center;
  height: 500px;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  text-align: center;
}

.search-section::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.6));
}

.search-container {
  position: relative;
  z-index: 1;
  max-width: 800px;
  width: 100%;
  padding: 0 20px;
}

.search-title {
  font-size: 3.5rem;
  margin-bottom: 1rem;
  font-weight: 700;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
}

.search-subtitle {
  font-size: 1.5rem;
  margin-bottom: 2rem;
  font-weight: 300;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
}

.search-input {
  display: flex;
  max-width: 600px;
  margin: 0 auto;
  height: 40px;
}

.search-input :deep(.el-input__inner) {
  height: 50px;
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
}

.search-input .el-button {
  height: 50px;
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
}

/* 快捷筛选按钮样式 */
.quick-filters {
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
  gap: 10px;
}

.quick-filters .el-button {
  border-radius: 20px;
  padding: 8px 20px;
  transition: all 0.3s ease;
}

.quick-filters .el-button.active {
  background-color: var(--primary-color);
  color: white;
  border-color: var(--primary-color);
}

/* 标签筛选样式 */
.tag-filters {
  margin-bottom: 30px;
}

.tag-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 10px;
  margin-top: 10px;
}

.filter-tag {
  padding: 6px 15px;
  background-color: #f5f7fa;
  border-radius: 16px;
  font-size: 14px;
  color: #606266;
  cursor: pointer;
  transition: all 0.3s ease;
}

.filter-tag:hover {
  background-color: #e6f1fc;
  color: var(--primary-color);
}

.filter-tag.active {
  background-color: var(--primary-color);
  color: white;
}

.search-box {
  display: flex;
  gap: 10px;
  max-width: 600px;
  margin: 0 auto;
}

.search-type-select {
  width: 100px;
  height: 45px;
}

.search-section {
  height: 600px;
  background-size: cover;
  background-position: center;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  color: white;
  text-align: center;
  margin-top: -60px; /* 补偿导航栏的高度 */
}

.search-section::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(to bottom, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.3));
}

.search-container {
  position: relative;
  z-index: 1;
  padding: 0 20px;
  margin-top: 60px; /* 确保内容不被导航栏遮挡 */
}

.search-title {
  font-size: 4rem;
  margin-bottom: 1.5rem;
  font-weight: bold;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
}

.search-subtitle {
  font-size: 1.8rem;
  margin-bottom: 2.5rem;
  opacity: 0.9;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
}

.search-input {
  flex: 1;
}

.search-input :deep(.el-input__inner) {
  height: 45px;
  font-size: 1.1rem;
  border-radius: 25px;
  padding: 0 25px;
}

.search-icon {
  font-size: 1.4rem;
  color: var(--primary-color);
  cursor: pointer;
  padding: 0 10px;
}

.section {
  padding: 4rem 0;
}

.section-title {
  font-size: 2.2rem;
  margin-bottom: 2.5rem;
  text-align: center;
  color: var(--text-primary);
  font-weight: bold;
}

.spots-grid {
  margin-bottom: 3rem;
}

.spot-card {
  margin-bottom: 24px;
  transition: transform 0.3s ease;
  border-radius: 12px;
  overflow: hidden;
}

.spot-card:hover {
  transform: translateY(-10px);
}

.spot-image-wrapper {
  position: relative;
  height: 200px;
  overflow: hidden;
}

.spot-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.spot-card:hover .spot-image {
  transform: scale(1.1);
}

.spot-price-tag {
  position: absolute;
  top: 10px;
  right: 10px;
  background: rgba(245, 108, 108, 0.9);
  color: white;
  padding: 5px 10px;
  border-radius: 15px;
  font-weight: bold;
}

.spot-info {
  padding: 20px;
}

.spot-name {
  font-size: 1.3rem;
  margin: 0 0 10px;
  color: var(--text-primary);
  font-weight: bold;
}

.spot-location {
  color: var(--text-regular);
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  gap: 5px;
}

.spot-description {
  color: var(--text-secondary);
  margin-bottom: 15px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  line-height: 1.5;
}

.spot-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 15px;
}

.view-more {
  text-align: center;
  margin-top: 2rem;
}

@media (max-width: 768px) {
  .search-section {
    height: 400px;
  }

  .search-title {
    font-size: 2.5rem;
  }

  .search-subtitle {
    font-size: 1.2rem;
  }

  .search-input :deep(.el-input__inner) {
    height: 40px;
  }

  .section {
    padding: 2rem 0;
  }

  .section-title {
    font-size: 1.8rem;
    margin-bottom: 1.5rem;
  }
}

.reviews-section {
  background-color: #f9f9f9;
}

.review-header {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  gap: 10px;
}

.review-user {
  font-weight: bold;
  color: var(--primary-color);
}

.review-spot a {
  color: var(--primary-color);
  cursor: pointer;
}

.review-content {
  color: var(--text-regular);
  line-height: 1.5;
}

.spot-views {
  display: flex;
  align-items: center;
  gap: 5px;
  color: var(--text-secondary);
  font-size: 0.9rem;
}
</style>
