<template>
  <div class="spots-container">
    <!-- 顶部搜索区域 -->
    <div class="search-section" :style="{ backgroundImage: 'url(' + backgroundImage + ')' }">
      <div class="container search-container">
        <h1 class="search-title">发现精彩景点</h1>
        <p class="search-subtitle">探索令人难忘的旅游胜地</p>
        <el-input v-model="searchQuery" placeholder="搜索景点名称、地区、特色" class="search-input" size="large"
          @keyup.enter="handleSearch">
          <template #suffix>
            <el-icon class="search-icon" @click="handleSearch">
              <Search />
            </el-icon>
          </template>
        </el-input>
      </div>
    </div>

    <!-- 景点列表区域 -->
    <div class="spots-content">
      <div class="container">
        <!-- 筛选器 -->
        <div class="filters">
          <div class="sort-options">
            <span>排序方式：</span>
            <el-radio-group v-model="currentSort" size="small" @change="handleSortChange">
              <el-radio-button v-for="option in sortOptions" :key="option.value" :label="option.value">
                {{ option.label }}
              </el-radio-button>
            </el-radio-group>
          </div>
          
          <!-- 添加标签筛选区域 -->
          <div class="tag-filters">
            <span>热门标签：</span>
            <div class="tag-list">
              <el-tag 
                v-for="tag in popularTags" 
                :key="tag.id"
                :type="selectedTags.includes(tag.name) ? 'primary' : 'info'"
                effect="light"
                class="filter-tag"
                @click="toggleTagFilter(tag.name)"
              >
                {{ tag.name }}
              </el-tag>
            </div>
          </div>
          
          <el-row :gutter="20">
            <el-col :span="6">
              <el-select v-model="filters.region" placeholder="选择地区" clearable @change="handleFilter">
                <el-option v-for="region in regionOptions" :key="region.value" :label="region.label"
                  :value="region.value" />
              </el-select>
            </el-col>
            <el-col :span="6">
              <el-select v-model="filters.type" placeholder="景点类型" clearable @change="handleFilter">
                <el-option v-for="type in typeOptions" :key="type.value" :label="type.label" :value="type.value" />
              </el-select>
            </el-col>
            <el-col :span="6">
              <el-select v-model="filters.priceRange" placeholder="价格区间" clearable @change="handleFilter">
                <el-option label="免费" value="0-0" />
                <el-option label="0-100元" value="0-100" />
                <el-option label="100-300元" value="100-300" />
                <el-option label="300元以上" value="300-9999" />
              </el-select>
            </el-col>
            <el-col :span="6">
              <el-button type="primary" @click="handleFilter">筛选</el-button>
              <el-button @click="resetFilters">重置</el-button>
            </el-col>
          </el-row>
        </div>

        <!-- 其余部分保持不变 -->
        <el-row :gutter="20" class="spots-grid" v-loading="loading">
          <el-col :xs="24" :sm="12" :md="8" :lg="6" v-for="spot in spots" :key="spot.attractionId">
            <el-card class="spot-card" :body-style="{ padding: '0px' }" shadow="hover"
              @click="viewSpotDetail(spot.attractionId)">
              <img :src="spot.mainImage" class="spot-image" :alt="spot.name" />
              <div class="spot-info">
                <h3 class="spot-name">{{ spot.name }}</h3>
                <p class="spot-location">{{ spot.region }}</p>
                <div class="spot-tags">
                  <el-tag v-if="spot.tags && spot.tags.length" v-for="tag in spot.tags.slice(0, 3)" :key="tag"
                    size="small" class="spot-tag">
                    {{ tag }}
                  </el-tag>
                </div>
                <div class="spot-footer">
                  <span class="spot-price" v-if="!spot.isFree">¥{{ spot.price }}起</span>
                  <span class="spot-price" v-else>免费</span>
                  <div class="spot-rating">
                    <el-rate v-model="spot.rating" disabled show-score text-color="#ff9900" />
                    <span class="spot-views">
                      <el-icon>
                        <View />
                      </el-icon> {{ spot.viewCount || 0 }}
                    </span>
                  </div>
                </div>
              </div>
            </el-card>
          </el-col>
        </el-row>

        <!-- 无数据提示 -->
        <el-empty v-if="spots.length === 0 && !loading" description="暂无符合条件的景点" />

        <!-- 分页 -->
        <div class="pagination" v-if="spots.length > 0">
          <el-pagination v-model:current-page="currentPage" v-model:page-size="pageSize" :total="total"
            :page-sizes="[12, 24, 36]" layout="total, sizes, prev, pager, next" @size-change="handleSizeChange"
            @current-change="handleCurrentChange" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import { Search, View } from '@element-plus/icons-vue'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import { attractionApi } from '@/api/attraction'

const router = useRouter()

// 背景图片URL - 修改为与主页相同的背景图
const backgroundImage = '/src/assets/images/banners/home-banner.jpg'

// 搜索和筛选
const searchQuery = ref('')
const filters = reactive({
  region: '',
  type: '',
  priceRange: ''
})



// 在script setup部分添加
const sortOptions = [
  { label: '浏览量优先', value: 'viewCount,desc' },
  { label: '评分优先', value: 'rating,desc' },
  { label: '价格从低到高', value: 'price,asc' },
  { label: '价格从高到低', value: 'price,desc' }
]

// 添加排序选择变量
const currentSort = ref('viewCount,desc')

// 处理排序变化
const handleSortChange = (val) => {
  currentSort.value = val
  fetchSpots()
}
// 地区选项
const regionOptions = [
  { label: '广西', value: '广西' },
  { label: '云南', value: '云南' },
  { label: '四川', value: '四川' },
  { label: '北京', value: '北京' },
  { label: '上海', value: '上海' }
]

// 类型选项
const typeOptions = [
  { label: '自然风光', value: 'nature' },
  { label: '人文古迹', value: 'cultural' },
  { label: '主题公园', value: 'theme' },
  { label: '博物馆', value: 'museum' }
]

// 分页和加载状态
const currentPage = ref(1)
const pageSize = ref(12)
const total = ref(0)
const loading = ref(false)
const spots = ref([])

// 处理搜索
const handleSearch = () => {
  currentPage.value = 1
  fetchSpots()
}

// 处理筛选
const handleFilter = () => {
  currentPage.value = 1
  fetchSpots()
}

// 重置筛选条件
const resetFilters = () => {
  searchQuery.value = ''
  Object.keys(filters).forEach(key => filters[key] = '')
  currentPage.value = 1
  fetchSpots()
}

// 处理页码变化
const handleSizeChange = (val) => {
  pageSize.value = val
  fetchSpots()
}

const handleCurrentChange = (val) => {
  currentPage.value = val
  fetchSpots()
}

// 获取景点列表
const fetchSpots = async () => {
  loading.value = true
  try {
    // 处理价格范围
    let minPrice, maxPrice
    if (filters.priceRange) {
      const [min, max] = filters.priceRange.split('-').map(Number)
      minPrice = min
      maxPrice = max
    }

    // 在fetchSpots函数中修改API调用参数
    const response = await attractionApi.getAttractions({
      page: currentPage.value - 1,
      size: pageSize.value,
      sort: currentSort.value,
      keyword: searchQuery.value,
      region: filters.region,
      type: filters.type,
      minPrice,
      maxPrice,
      tags: selectedTags.value.length > 0 ? selectedTags.value.join(',') : undefined
    })

    spots.value = response.content || []
    total.value = response.totalElements || 0
  } catch (error) {
    console.error('获取景点列表失败:', error)
    ElMessage.error('获取景点列表失败，请稍后重试')
    spots.value = []
    total.value = 0
  } finally {
    loading.value = false
  }
}

// 查看景点详情
const viewSpotDetail = (spotId) => {
  router.push(`/spots/${spotId}`)
}

// 初始加载
onMounted(() => {
  fetchSpots()
})
// 获取热门景点
const fetchMostViewedSpots = async () => {
  loading.value = true
  try {
    const response = await attractionApi.getMostViewedAttractions()
    spots.value = response.content || []
    total.value = response.totalElements || 0
  } catch (error) {
    console.error('获取热门景点失败:', error)
    ElMessage.error('获取热门景点失败，请稍后重试')
    spots.value = []
    total.value = 0
  } finally {
    loading.value = false
  }
}

// 获取高评分景点
const fetchTopRatedSpots = async () => {
  loading.value = true
  try {
    const response = await attractionApi.getTopRatedAttractions()
    spots.value = response.content || []
    total.value = response.totalElements || 0
  } catch (error) {
    console.error('获取高评分景点失败:', error)
    ElMessage.warning({
      message: '获取高评分景点失败，请稍后重试',
      duration: 1000
    })
    spots.value = []
    total.value = 0
  } finally {
    loading.value = false
  }
}

// 获取所有景点
const fetchAllSpots = () => {
  // 重置筛选条件
  resetFilters()
}
// 添加标签筛选
const selectedTags = ref([])

// 热门标签列表
const popularTags = [
  { id: 1, name: '自然风光' },
  { id: 2, name: '人文古迹' },
  { id: 3, name: '主题公园' },
  { id: 4, name: '博物馆' },
  { id: 5, name: '免费景点' },
  { id: 6, name: '亲子游' },
  { id: 7, name: '摄影胜地' },
  { id: 8, name: '历史遗迹' }
]

// 切换标签筛选
const toggleTagFilter = (tagName) => {
  const index = selectedTags.value.indexOf(tagName)
  if (index > -1) {
    selectedTags.value.splice(index, 1)
  } else {
    selectedTags.value.push(tagName)
  }
  currentPage.value = 1
  fetchSpots()
}
</script>

<style scoped>
.spots-container {
  min-height: 100vh;
}

.search-section {
  height: 400px;
  background-size: cover;
  background-position: center;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  color: white;
  text-align: center;
  margin-top: -60px;
  /* 补偿导航栏的高度 */
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
  max-width: 800px;
  margin: 0 auto;
  padding: 0 20px;
}

.search-title {
  font-size: 3rem;
  font-weight: bold;
  margin-bottom: 1rem;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
}

.search-subtitle {
  font-size: 1.5rem;
  margin-bottom: 2rem;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
}

.search-input {
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
}

.search-input :deep(.el-input__wrapper) {
  background: rgba(255, 255, 255, 0.9);
  border: none;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.search-input :deep(.el-input__inner) {
  height: 50px;
  font-size: 1.1rem;
}

.search-icon {
  font-size: 1.5rem;
  cursor: pointer;
  color: var(--el-color-primary);
  transition: transform 0.2s;
}

.search-icon:hover {
  transform: scale(1.1);
}

@media (max-width: 768px) {
  .search-section {
    height: 400px;
  }

  .search-title {
    font-size: 2rem;
  }

  .search-subtitle {
    font-size: 1.2rem;
  }
}


.spots-content {
  padding: 2rem 0;
}

.filters {
  background: #f8f9fa;
  padding: 1.5rem;
  border-radius: 8px;
  margin-bottom: 2rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

.el-select {
  width: 100%;
}

.el-button {
  margin-right: 1rem;
  min-width: 80px;
}

.tag-filters {
  margin: 1rem 0 2rem;
  padding: 1rem;
  background: #f8f9fa;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

.tag-list {
  display: flex;
  flex-wrap: nowrap;
  gap: 10px;
  padding: 0.5rem;
}

.filter-tag {
  cursor: pointer;
  padding: 0.5rem 1rem;
  font-size: 0.9rem;
  transition: all 0.3s ease;
}

.filter-tag:hover {
  transform: translateY(-2px);
}

.spot-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
  margin: 0.5rem 0;
}

.spot-tag {
  font-size: 0.8rem;
}

.spot-views {
  font-size: 0.8rem;
  color: #909399;
  margin-left: 0.5rem;
  display: flex;
  align-items: center;
  gap: 4px;
}

.spot-badges {
  position: absolute;
  top: 10px;
  left: 10px;
  display: flex;
  gap: 5px;
}

.spot-badge {
  padding: 0 8px;
  height: 24px;
  line-height: 24px;
  font-weight: bold;
}

.spot-card {
  margin-bottom: 2rem;
  transition: transform 0.3s ease;
}

.spot-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.15);
}

.spot-image {
  width: 100%;
  height: 220px;
  transition: transform 0.3s ease;
}

.spot-card:hover .spot-image {
  transform: scale(1.05);
}

.spot-info {
  padding: 1.5rem;
  background: #fff;
}

.spot-name {
  font-size: 1.2rem;
  margin: 0 0 0.5rem;
  color: #333;
}

.spot-location {
  color: #666;
  font-size: 0.9rem;
  margin-bottom: 0.5rem;
}

.spot-description {
  color: #666;
  font-size: 0.9rem;
  margin-bottom: 1rem;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.spot-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.spot-price {
  color: #f56c6c;
  font-size: 1.1rem;
  font-weight: bold;
}

.pagination {
  margin-top: 2rem;
  text-align: center;
  padding: 2rem 0;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

@media screen and (max-width: 768px) {
  .search-section {
    padding: 2rem 0;
  }

  .search-box {
    padding: 1rem;
    margin: 0 1rem;
  }

  .filters {
    padding: 1rem;
    margin: 0 1rem 2rem;

    .el-col {
      margin-bottom: 1rem;
    }

    .el-button {
      width: 100%;
      margin-bottom: 0.5rem;
    }
  }

  .spots-grid {
    margin: 0 0.5rem;
  }

  .spot-card {
    margin-bottom: 1.5rem;
  }

  .spot-image {
    height: 180px;
  }

  .spot-info {
    padding: 1rem;
  }

  .spot-name {
    font-size: 1.1rem;
  }
}

/* 在style部分添加 */
.sort-options {
  margin: 20px 0;
  display: flex;
  align-items: center;
}

.sort-options span {
  margin-right: 10px;
  font-weight: bold;
}

.quick-filters {
  margin-bottom: 20px;
}

.quick-filters .el-button {
  margin-right: 10px;
  margin-bottom: 10px;
}

.tag-filters {
  margin: 15px 0;
  display: flex;
  align-items: center;
}

.tag-list {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-left: 10px;
}

.filter-tag {
  cursor: pointer;
  transition: all 0.3s;
  padding: 6px 12px;
}

.filter-tag:hover {
  transform: translateY(-2px);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

/* 筛选器样式优化 */
.filters {
  background-color: #f9f9f9;
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 30px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.05);
}

.sort-options {
  margin-bottom: 15px;
  display: flex;
  align-items: center;
}

.el-select {
  width: 100%;
}

/* 响应式调整 */
@media (max-width: 768px) {
  .tag-filters {
    flex-direction: column;
    align-items: flex-start;
  }
  
  .tag-list {
    margin-left: 0;
    margin-top: 10px;
  }
}
</style>
