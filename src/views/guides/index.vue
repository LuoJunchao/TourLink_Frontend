<script setup>
import { ref, reactive, onMounted, watch } from 'vue'
import { Star, ChatRound, Edit, Search } from '@element-plus/icons-vue'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import { socialApi } from '@/api/social' // 导入社交API
import { useUserStore } from '@/stores/user' // 导入用户存储

const router = useRouter()
const userStore = useUserStore() // 使用用户存储

// 添加背景图变量
const backgroundImage = '/src/assets/images/banners/home-banner.jpg'

// 筛选条件
const filter = reactive({
  region: '',
  type: '',
  sort: 'latest'
})

// 分页
const currentPage = ref(1)
const pageSize = ref(9)
const total = ref(0) // 初始化为0
const loading = ref(false) // 添加加载状态

// 攻略数据
const guides = ref([])

// 处理点赞
const handleLike = async (guideId) => {
  if (!userStore.isLoggedIn) {
    ElMessage.warning('请先登录')
    return
  }
  
  try {
    const guide = guides.value.find(g => g.id === guideId)
    if (guide) {
      if (guide.isLiked) {
        await socialApi.unlikeBlog(guideId, userStore.userId)
        guide.likes--
      } else {
        await socialApi.likeBlog(guideId, userStore.userId)
        guide.likes++
      }
      guide.isLiked = !guide.isLiked
    }
  } catch (error) {
    console.error('点赞操作失败:', error)
    ElMessage.error('操作失败，请稍后重试')
  }
}

// 处理评论
const handleComment = (guideId) => {
  router.push(`/guides/${guideId}`)
}

// 查看攻略详情
const viewGuideDetail = async (guideId) => {
  try {
    // 增加浏览量
    if (userStore.isLoggedIn) {
      await socialApi.viewBlog(guideId, userStore.userId)
    }
    await router.push(`/guides/${guideId}`)
  } catch (error) {
    console.error('导航到攻略详情页失败:', error)
    ElMessage.error('页面跳转失败，请稍后重试')
  }
}

// 写攻略
const handleWrite = () => {
  if (!userStore.isLoggedIn) {
    ElMessage.warning('请先登录')
    return
  }
  router.push('/guides/edit')
}

const searchType = ref('keyword') // 默认搜索类型为关键字
const searchQuery = ref('')

// 搜索类型选项
const searchTypes = [
  { value: 'keyword', label: '关键字' },
  { value: 'author', label: '作者' }
]

// 处理搜索
const handleSearch = () => {
  if (!searchQuery.value.trim()) return
  fetchGuides({
    searchType: searchType.value,
    keyword: searchQuery.value
  })
}

// 获取攻略数据的函数
const fetchGuides = async (params = {}) => {
  loading.value = true
  try {
    let data
    if (params.keyword) {
      // 搜索博客
      data = await socialApi.searchBlogs(params.keyword, params.searchType)
    } else {
      // 获取所有博客
      data = await socialApi.getBlogs()
    }
    
    // 处理筛选和排序
    let filteredData = [...data]
    
    // 根据地区筛选
    if (filter.region) {
      filteredData = filteredData.filter(blog => 
        blog.destination && blog.destination.includes(filter.region)
      )
    }
    
    // 根据类型筛选
    if (filter.type) {
      filteredData = filteredData.filter(blog => 
        blog.tags && blog.tags.includes(filter.type)
      )
    }
    
    // 排序
    switch (filter.sort) {
      case 'latest':
        filteredData.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        break
      case 'most_liked':
        filteredData.sort((a, b) => b.likes - a.likes)
        break
      case 'most_commented':
        filteredData.sort((a, b) => b.comments - a.comments)
        break
    }
    
    // 分页处理
    total.value = filteredData.length
    const start = (currentPage.value - 1) * pageSize.value
    const end = start + pageSize.value
    guides.value = filteredData.slice(start, end).map(blog => ({
      id: blog.id,
      username: blog.author?.name || '匿名用户',
      userAvatar: blog.author?.avatar || '/src/assets/images/avatars/default.jpg',
      publishTime: new Date(blog.createdAt).toLocaleDateString(),
      title: blog.title,
      content: blog.content.substring(0, 100) + '...',
      coverImage: blog.coverImage || '/src/assets/images/guides/default.jpg',
      likes: blog.likeCount || 0,
      comments: blog.commentCount || 0,
      isLiked: blog.isLiked || false
    }))
  } catch (error) {
    console.error('获取攻略数据失败:', error)
    ElMessage.error('获取攻略数据失败，请稍后重试')
    guides.value = []
  } finally {
    loading.value = false
  }
}

// 处理分页大小变化
const handleSizeChange = (size) => {
  pageSize.value = size
  fetchGuides()
}

// 处理页码变化
const handleCurrentChange = (page) => {
  currentPage.value = page
  fetchGuides()
}

// 监听筛选条件变化
watch(filter, () => {
  currentPage.value = 1 // 重置页码
  fetchGuides()
}, { deep: true })

// 页面加载时获取数据
onMounted(() => {
  fetchGuides()
})
</script>

<template>
  <div class="guides-page">
    <!-- 横幅搜索区域 -->
    <div class="banner" :style="{ backgroundImage: 'url(' + backgroundImage + ')' }">
      <div class="search-container">
        <h1 class="banner-title">探索旅行攻略</h1>
        <p class="banner-subtitle">发现精彩旅程，分享独特体验</p>
        <div class="search-box">
          <el-select
            v-model="searchType"
            class="search-type-select"
            size="large"
          >
            <el-option
              v-for="type in searchTypes"
              :key="type.value"
              :label="type.label"
              :value="type.value"
            />
          </el-select>
          <el-input
            v-model="searchQuery"
            :placeholder="searchType === 'keyword' ? '搜索攻略关键字' : '搜索作者名称'"
            size="large"
            class="search-input"
            @keyup.enter="handleSearch"
          >
            <template #suffix>
              <el-icon class="search-icon" @click="handleSearch"><Search /></el-icon>
            </template>
          </el-input>
        </div>
      </div>
    </div>

    <div class="container">
      <!-- 筛选器 -->
      <div class="filters">
        <el-row :gutter="20">
          <el-col :xs="24" :sm="8">
            <el-select v-model="filter.region" placeholder="选择地区" clearable style="width: 100%">
              <el-option label="广西" value="guangxi" />
              <el-option label="云南" value="yunnan" />
            </el-select>
          </el-col>
          <el-col :xs="24" :sm="8">
            <el-select v-model="filter.type" placeholder="攻略类型" clearable style="width: 100%">
              <el-option label="美食" value="food" />
              <el-option label="住宿" value="hotel" />
              <el-option label="景点" value="spot" />
            </el-select>
          </el-col>
          <el-col :xs="24" :sm="8">
            <el-select v-model="filter.sort" placeholder="排序方式" clearable style="width: 100%">
              <el-option label="最新发布" value="latest" />
              <el-option label="最多点赞" value="most_liked" />
              <el-option label="最多评论" value="most_commented" />
            </el-select>
          </el-col>
        </el-row>
      </div>

      <!-- 攻略列表 -->
      <div class="guides-list">
        <el-row :gutter="20">
          <el-col :xs="24" :sm="12" :md="8" v-for="guide in guides" :key="guide.id">
            <el-card 
              class="guide-card" 
              shadow="hover"
            >
              <!-- 用户信息 -->
              <div class="user-info">
                <el-avatar :size="40" :src="guide.userAvatar" />
                <div class="user-details">
                  <div class="username">{{ guide.username }}</div>
                  <div class="publish-time">{{ guide.publishTime }}</div>
                </div>
              </div>
              
              <!-- 攻略封面图 -->
              <el-image 
                v-if="guide.coverImage"
                :src="guide.coverImage"
                fit="cover"
                class="guide-cover"
              />
              
              <!-- 攻略标题和预览 -->
              <h2 class="guide-title">{{ guide.title }}</h2>
              <p class="guide-preview">{{ guide.content }}</p>
              
              <!-- 互动区域 -->
              <div class="interaction-area">
                <div class="interaction-btn" :class="{ active: guide.isLiked }" @click="handleLike(guide.id)">
                  <el-icon><Star /></el-icon>
                  <span>{{ guide.likes }}</span>
                </div>
                <div class="interaction-btn" @click="handleComment(guide.id)">
                  <el-icon><ChatRound /></el-icon>
                  <span>{{ guide.comments }}</span>
                </div>
                <el-button type="primary" text @click="viewGuideDetail(guide.id)">查看详情</el-button> 
              </div>
            </el-card>
          </el-col>
        </el-row>
      </div>

      <!-- 分页 -->
      <div class="pagination">
        <el-pagination
          v-model:current-page="currentPage"
          v-model:page-size="pageSize"
          :total="total"
          :page-sizes="[9, 18, 36]"
          layout="total, sizes, prev, pager, next"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </div>

      <!-- 写攻略按钮 -->
      <el-button
        class="write-guide-btn"
        type="primary"
        size="large"
        circle
        @click="handleWrite"
      >
        <el-icon><Edit /></el-icon>
      </el-button>
    </div>
  </div>
</template>

<style scoped>
.search-box {
  display: flex;
  gap: 10px;
  max-width: 600px;
  margin: 0 auto;
}

.search-type-select {
  width: 100px;
}

.search-input {
  flex: 1;
}

.banner {
  height: 300px;
  background-size: cover;
  background-position: center;
  position: relative;
  display: flex;
  align-items: center;
  color: white;
  margin-bottom: 2rem;
}

.banner::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.4);
}

.search-container {
  position: relative;
  z-index: 1;
  text-align: center;
  width: 100%;
  padding: 0 20px;
}

.banner-title {
  position: relative;
  font-size: 2.5rem;
  margin-bottom: 1rem;
}

.banner-subtitle {
  position: relative;
  font-size: 1.2rem;
  opacity: 0.9;
  margin-bottom: 2rem;
}

.filters {
  margin-bottom: 2rem;
}

.guide-card {
  margin-bottom: 2rem;
  transition: transform 0.3s ease;
}

.guide-card:hover {
  transform: translateY(-5px);
}

.user-info {
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
}

.user-details {
  margin-left: 1rem;
}

.username {
  font-weight: bold;
  color: #333;
}

.publish-time {
  font-size: 0.9rem;
  color: #999;
}

.guide-cover {
  width: 100%;
  height: 200px;
  border-radius: 4px;
  margin-bottom: 1rem;
}

.guide-title {
  font-size: 1.2rem;
  margin: 1rem 0;
  color: #333;
}

.guide-preview {
  color: #666;
  font-size: 0.9rem;
  margin-bottom: 1rem;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.interaction-area {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding-top: 1rem;
  border-top: 1px solid #eee;
}

.interaction-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #666;
  cursor: pointer;
  transition: color 0.3s ease;
}

.interaction-btn:hover,
.interaction-btn.active {
  color: #409EFF;
}

.write-guide-btn {
  position: fixed;
  right: 2rem;
  bottom: 2rem;
  width: 60px;
  height: 60px;
}

.pagination {
  margin-top: 2rem;
  text-align: center;
}

@media screen and (max-width: 768px) {
  .banner {
    height: 200px;
  }

  .banner-title {
    font-size: 2rem;
  }

  .banner-subtitle {
    font-size: 1rem;
  }

  .filters {
    .el-col {
      margin-bottom: 1rem;
    }
  }

  .guide-card {
    margin-bottom: 1rem;
  }

  .guide-cover {
    height: 150px;
  }

  .write-guide-btn {
    width: 50px;
    height: 50px;
    right: 1rem;
    bottom: 1rem;
  }
}
</style>