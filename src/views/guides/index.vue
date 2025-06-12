<script setup>
import { ref, reactive, onMounted, watch ,computed} from 'vue'
import { Star, ChatRound, Edit, Search } from '@element-plus/icons-vue'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import { socialApi } from '@/api/social' // 导入社交API
import { useUserStore } from '@/stores/user' // 导入用户存储
import { userApi } from '../../api/user'

const router = useRouter()
const userStore = useUserStore() // 使用用户存储

// 添加背景图变量
const backgroundImage = '/src/assets/images/banners/home-banner.jpg'

const searchType = ref('content')

// 筛选条件
const filter = reactive({
  region: '',
  type: '',
  sort: 'viewCount'  // 默认按浏览量排序
})

// 分页
const currentPage = ref(1)
const pageSize = ref(10)
const total = ref(0) // 初始化为0
const loading = ref(false) // 添加加载状态

// 攻略数据
const guides = ref([])

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

const getSearchPlaceholder = () => {
  switch(searchType.value) {
    case 'content': return '搜索攻略内容';
    case 'title': return '搜索攻略标题'
    default: return '搜索攻略内容';
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

const handleSearch = () => {
  if (!searchQuery.value.trim()) return
  currentPage.value = 1 // 重置到第一页
  fetchGuides({
    searchType: searchType.value,
    keyword: searchQuery.value
  })
}


const searchQuery = ref('')

// 搜索类型选项
const searchTypes = [
  { value: 'content', label: '内容' },
  { value: 'title', label: '标题' }
]

const isLoggedIn = computed(() => userStore.isLoggedIn)

// 排序选项
const sortOptions = [
  { value: 'viewCount', label: '最多浏览' },
  { value: 'like', label: '最多点赞' },
  { value: 'comment', label: '最多评论' },
  { value: 'new', label: '最新发布' }
]

// 获取攻略数据的函数
const fetchGuides = async (params = {}) => {
  loading.value = true
  try {
    let response;
    
    if (params.keyword) {
      // 搜索博客，传递分页参数
      response = await socialApi.searchBlogs(
        params.keyword, 
        params.searchType || searchType.value,
        currentPage.value - 1,  // 后端分页从0开始
      )
    } else {
      // 获取所有博客，同样传递分页参数
      response = await socialApi.getBlogRanking(
        filter.sort,
        '',
        currentPage.value - 1,
      )
    }
    
    // 获取所有博客作者的用户信息
    const blogs = response.content || []
    const userPromises = blogs.map(blog => {
      /* if (blog.userId) {
        return userApi.getUserInfo(blog.userId)
          .catch(error => {
            console.error(`获取用户 ${blog.userId} 信息失败:`, error)
            return null
          })
      }
      return Promise.resolve(null) */
    })
    
    const userInfos = await Promise.all(userPromises)
    
    // 将用户信息与博客数据结合
    guides.value = blogs.map((blog, index) => {
      const userInfo = userInfos[index]
      return {
        id: blog.blogId,
        username: userInfo ? (userInfo.username || userInfo.name || '匿名用户') : '匿名用户',
        userAvatar: userInfo ? (userInfo.avatar || '/src/assets/images/avatars/default.jpg') : '/src/assets/images/avatars/default.jpg',
        publishTime: blog.publishTime ? new Date(blog.publishTime).toLocaleDateString() : '未知时间',
        title: blog.title || '无标题',
        content: blog.content ? (blog.content.substring(0, 100) + '...') : '',
        coverImage: blog.coverImage ?? '/src/assets/images/spots/default.jpg',
        likes: blog.likeCount || 0,
        comments: blog.commentCount || 0,
        isLiked: blog.isLiked || false
      };
    });
    
    // 更新总数
    total.value = response.totalElements || 0
    
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

// 处理排序变化
const handleSortChange = (value) => {
  filter.sort = value
  currentPage.value = 1 // 重置到第一页
  fetchGuides()
}

//获取推荐
const getRecommendations = async () => {
  // 如果用户未登录，不获取推荐
  if (!isLoggedIn.value) return;

  try {
    loading.value = true;
    const userId = userStore.userId;
    console.log("获取推荐");
    const response = await fetch("http://localhost:8000/recommend_blogs", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        user_id: userId,
        top_k_tags: 5,
        top_k_attractions: 8, // 限制为8个推荐景点
        alpha: 0.8
      })
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    console.log("推荐结果:", result.data);

    // 获取推荐景点的详细信息并替换 popularSpots
    if (result.data && result.data.length > 0) {
      const attractionIds = result.data;
      const attractions = await socialApi.getBlogsByIds(attractionIds);
      guides.value = attractions || [];
    }
  } catch (error) {
    console.error("获取推荐失败:", error);
    ElMessage.error("获取推荐失败，将显示默认景点");
  } finally {
    loading.value = false;
  }
};


const fetchGuidesWithRecommendation = async (params = {}) => {
  loading.value = true;
  try {
    let blogs = [];

    // 先尝试推荐（仅登录用户）
    if (isLoggedIn.value) {
      try {
        const userId = userStore.userId;
        const response = await fetch("http://localhost:8000/recommend_blogs", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            user_id: userId,
            top_k_tags: 5,
            top_k_attractions: 8,
            alpha: 0.8
          })
        });

        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const result = await response.json();

        if (result.data && result.data.length > 0) {
          console.log("推荐结果:", result.data);
          blogs = await socialApi.getBlogsByIds(result.data);
          console.log("tuituituituitui:", blogs);
        } else {
          console.warn("推荐为空，使用默认博客");
        }
      } catch (err) {
        console.error("推荐失败:", err);
      }
    }

    // 如果没有成功获取推荐，使用默认逻辑
    if (blogs.length === 0) {
      let response;
      if (params.keyword) {
        response = await socialApi.searchBlogs(
          params.keyword,
          params.searchType || searchType.value,
          currentPage.value - 1
        );
      } else {
        response = await socialApi.getBlogRanking(
          "ViewCount",
          "",
          currentPage.value - 1
        );
      }
      blogs = response.content || [];
      total.value = response.totalElements || 0;
    }

    // 获取所有博客作者信息
    const userPromises = blogs.map(blog =>
      blog.userId
        ? userApi.getUserInfo(blog.userId).catch(error => {
            console.error(`获取用户 ${blog.userId} 信息失败:`, error);
            return null;
          })
        : Promise.resolve(null)
    );
    const userInfos = await Promise.all(userPromises);

    // 合并博客和用户信息
    guides.value = blogs.map((blog, index) => {
      const userInfo = userInfos[index];
      return {
        id: blog.blogId,
        username: userInfo ? (userInfo.username || userInfo.name || "匿名用户") : "匿名用户",
        userAvatar: userInfo ? (userInfo.avatar || "/src/assets/images/avatars/default.jpg") : "/src/assets/images/avatars/default.jpg",
        publishTime: blog.publishTime ? new Date(blog.publishTime).toLocaleDateString() : "未知时间",
        title: blog.title || "无标题",
        content: blog.content ? blog.content.substring(0, 100) + "..." : "",
        coverImage: blog.coverImage || "/src/assets/images/guides/default.jpg",
        likes: blog.likeCount || 0,
        comments: blog.commentCount || 0,
        isLiked: blog.isLiked || false
      };
    });

  } catch (error) {
    console.error("获取攻略失败:", error);
    ElMessage.error("获取攻略失败，请稍后重试");
    guides.value = [];
  } finally {
    loading.value = false;
  }
};


// 页面加载时获取数据
onMounted(() => {
  fetchGuidesWithRecommendation()
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
            @keyup.enter="handleSearch"
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
            :placeholder="getSearchPlaceholder()"
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
      <!-- 添加排序选项 -->
      <div class="filter-section">
        <el-select v-model="filter.sort" @change="handleSortChange" placeholder="排序方式">
          <el-option
            v-for="option in sortOptions"
            :key="option.value"
            :label="option.label"
            :value="option.value"
          />
        </el-select>
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
                <div class="user-details">
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
                <div class="interaction-btn">
                  <el-icon><Star /></el-icon>
                  <span>{{ guide.likes }}</span>
                </div>
                <div class="interaction-btn">
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
          :page-sizes="[10]"
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
  line-clamp: 3;
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

.filter-section {
  margin-bottom: 20px;
  display: flex;
  justify-content: flex-end;
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
