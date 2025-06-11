<template>
  <div class="spot-container">
    <div class="spot-detail" v-loading="loading && !error">
      <div class="spot-header">
        <el-carousel height="500px" indicator-position="outside" arrow="always" class="spot-banner-carousel">
          <el-carousel-item v-for="(image, index) in spot.images || [spot.image]" :key="index">
            <el-image :src="image" fit="cover" class="spot-banner" />
          </el-carousel-item>
        </el-carousel>
        <div class="spot-info-overlay">
          <div class="spot-tags">
            <el-tag v-for="(tag, index) in spot.tags" :key="index" effect="plain" size="small">{{ tag }}</el-tag>
          </div>
          <h1 class="spot-name">{{ spot.name }}</h1>
          <div class="spot-meta">
            <el-tag size="large" type="danger">¥{{ spot.price }}</el-tag>
            <el-rate v-model="spot.rating" disabled show-score class="spot-rating" />
            <span class="spot-views"><el-icon>
                <View />
              </el-icon> {{ spot.viewCount || 0 }}人浏览</span>
            <el-button :type="spot.isFavorite ? 'danger' : 'default'" :icon="spot.isFavorite ? StarFilled : Star" circle
              @click="toggleFavorite" :disabled="!userStore.isLoggedIn"
              :title="userStore.isLoggedIn ? '收藏景点' : '请先登录'" />
            <el-button type="primary" @click="showShareDialog = true" icon="Share" circle title="分享景点" />
          </div>
        </div>
      </div>

      <div class="spot-content container">
        <el-tabs type="border-card" class="spot-tabs">
          <el-tab-pane label="景点介绍">
            <div class="spot-info">
              <el-card>
                <el-descriptions :column="2" border>
                  <el-descriptions-item label="位置">
                    <el-tag size="large" type="info">
                      <el-icon>
                        <Location />
                      </el-icon>
                      {{ spot.location }}
                    </el-tag>
                  </el-descriptions-item>
                  <el-descriptions-item label="开放时间">{{ spot.openTime || '全天开放' }}</el-descriptions-item>
                  <el-descriptions-item label="最佳季节">{{ spot.bestSeason || '四季皆宜' }}</el-descriptions-item>
                  <el-descriptions-item label="建议游玩">{{ spot.suggestedTime || '2-3小时' }}</el-descriptions-item>
                </el-descriptions>
              </el-card>
            </div>

            <div class="spot-description">
              <el-card>
                <template #header>
                  <div class="card-header">
                    <h2>景点介绍</h2>
                  </div>
                </template>
                <p>{{ spot.description }}</p>
              </el-card>
            </div>
          </el-tab-pane>

          <el-tab-pane label="景点图片">
            <div class="spot-gallery">
              <el-card>
                <el-image-group>
                  <el-image v-for="(image, index) in spot.images || [spot.image]" :key="index" :src="image"
                    :alt="spot.name" class="gallery-image" :preview-src-list="spot.images || [spot.image]" />
                </el-image-group>
              </el-card>
            </div>
          </el-tab-pane>

          <el-tab-pane label="游客点评">
            <div class="spot-reviews">
              <el-card>
                <template #header>
                  <div class="card-header">
                    <h2>游客点评</h2>
                    <el-button type="primary" @click="showReviewDialog = true">写点评</el-button>
                  </div>
                </template>
                <div v-if="spot.reviews && spot.reviews.length" class="review-list">
                  <div v-for="review in spot.reviews" :key="review.id" class="review-item">
                    <el-avatar :src="review.userAvatar" />
                    <div class="review-content">
                      <div class="review-header">
                        <span class="review-username">{{ review.username }}</span>
                        <el-rate v-model="review.rating" disabled />
                      </div>
                      <p class="review-text">{{ review.content }}</p>
                      <span class="review-time">{{ review.time }}</span>
                    </div>
                  </div>
                </div>
                <el-empty v-else description="暂无点评" />
              </el-card>
            </div>
          </el-tab-pane>

          <el-tab-pane label="交通指南">
            <div class="spot-transportation">
              <el-card>
                <template #header>
                  <div class="card-header">
                    <h2>交通指南</h2>
                  </div>
                </template>
                <div class="transportation-content">
                  <div class="transportation-item">
                    <h3><el-icon>
                        <Van />
                      </el-icon> 自驾路线</h3>
                    <p>{{ spot.drivingDirections || '暂无自驾路线信息' }}</p>
                  </div>
                  <div class="transportation-item">
                    <h3><el-icon>
                        <Ship />
                      </el-icon> 公共交通</h3>
                    <p>{{ spot.publicTransport || '暂无公共交通信息' }}</p>
                  </div>
                </div>
              </el-card>
            </div>
          </el-tab-pane>
        </el-tabs>
      </div>

      <el-dialog v-model="showReviewDialog" title="写点评" width="50%">
        <el-form :model="newReview" label-width="80px">
          <el-form-item label="评分">
            <el-rate v-model="newReview.rating" />
          </el-form-item>
          <el-form-item label="点评">
            <el-input v-model="newReview.content" type="textarea" rows="4" placeholder="分享你的游玩体验" />
          </el-form-item>
        </el-form>
        <template #footer>
          <span class="dialog-footer">
            <el-button @click="showReviewDialog = false">取消</el-button>
            <el-button type="primary" @click="submitReview">发布</el-button>
          </span>
        </template>
      </el-dialog>
    </div>
    <div class="related-spots" v-if="relatedSpots.length > 0">
      <el-card>
        <template #header>
          <div class="card-header">
            <h2>相关景点推荐</h2>
          </div>
        </template>
        <div class="related-spots-container">
          <el-carousel :interval="4000" type="card" height="200px">
            <el-carousel-item v-for="(relatedSpot, index) in relatedSpots" :key="index">
              <div class="related-spot-card" @click="viewSpotDetail(relatedSpot.id)">
                <img :src="relatedSpot.image" :alt="relatedSpot.name" class="related-spot-image">
                <div class="related-spot-info">
                  <h3>{{ relatedSpot.name }}</h3>
                  <p>{{ relatedSpot.location }}</p>
                </div>
              </div>
            </el-carousel-item>
          </el-carousel>
        </div>
      </el-card>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch, onBeforeUnmount } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { attractionApi } from '@/api/attraction'
import { useUserStore } from '@/stores/user'
import { useSpotStore } from '@/stores/spots'
import { ElMessage } from 'element-plus'
import { Location, Star, StarFilled, View } from '@element-plus/icons-vue'
import { ChatDotRound, Promotion, Link, Van, Ship } from '@element-plus/icons-vue'


const error = ref(false)
const retryCount = ref(0)

const showShareDialog = ref(false)

const route = useRoute()
const userStore = useUserStore()
const loading = ref(true)
const spot = ref(null)
const showReviewDialog = ref(false)
const newReview = ref({
  rating: 5,
  content: ''
})
const relatedSpots = ref([])
const router = useRouter()


// 备用数据
const fallbackSpot = {
  id: 'fallback',
  name: '景点信息暂时无法获取',
  image: '/src/assets/images/banners/home-banner.jpg', // 使用首页横幅作为备用图片
  price: '暂无价格信息',
  rating: 0,
  location: '暂无位置信息',
  description: '很抱歉，当前无法获取该景点的详细信息。这可能是由于网络问题或服务器维护导致的。您可以稍后再试，或者浏览其他景点。',
  gallery: [],
  reviews: [],
  isFavorite: false
}



const submitReview = async () => {
  if (!userStore.isLoggedIn) {
    ElMessage.warning('请先登录后再发表评论')
    showReviewDialog.value = false
    return
  }

  if (!newReview.value.content.trim()) {
    ElMessage.warning('评论内容不能为空')
    return
  }

  try {
    const reviewData = {
      attractionId: spot.value.id,
      userId: userStore.userId,
      rating: newReview.value.rating,
      content: newReview.value.content
    }

    await attractionApi.addReview(reviewData)

    // 添加到当前评论列表
    const currentDate = new Date()
    const formattedDate = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(currentDate.getDate()).padStart(2, '0')}`

    spot.value.reviews.unshift({
      id: Date.now(), // 临时ID
      username: userStore.userInfo.username,
      userAvatar: userStore.userInfo.avatar || '/src/assets/images/avatar.jpg',
      rating: newReview.value.rating,
      content: newReview.value.content,
      time: formattedDate
    })

    // 重置表单
    newReview.value = {
      rating: 5,
      content: ''
    }

    ElMessage.success('评论发布成功')
    showReviewDialog.value = false
  } catch (error) {
    console.error('提交评论失败:', error)
    ElMessage.error('评论发布失败，请稍后重试')
  }
}

const fetchSpotData = async () => {
  loading.value = true
  error.value = null
  retryCount.value = 0

  try {
    // 检查store是否可用
    const spotStore = useSpotStore()
    if (!spotStore) {
      throw new Error('无法访问景点数据存储')
    }

    // 检查路由参数
    const spotId = route.params.id
    if (!spotId) {
      throw new Error('缺少景点ID参数')
    }

    // 并行请求数据
    const [spotData, reviewsData, popularityData] = await Promise.all([
      attractionApi.getAttractionDetail(id),
      attractionApi.getReviews(id),
      attractionApi.getPopularity(id)
    ])

    // 检查数据有效性
    if (!spotData || Object.keys(spotData).length === 0) {
      throw new Error('景点数据为空')
    }

    // 增加浏览量
    attractionApi.incrementView(id).catch(error => {
      console.error('增加浏览量失败:', error)
    })

    // 处理景点数据
    spot.value = {
      ...spotData,
      reviews: reviewsData || [],
      viewCount: popularityData?.viewCount || spotData.viewCount || 0,
      images: spotData.images?.length ? spotData.images : [spotData.mainImage || spotData.image]
    }

    // 如果用户已登录，检查是否已收藏
    if (userStore.isLoggedIn) {
      try {
        const isFavorite = await attractionApi.checkFavorite(id, userStore.userId)
        spot.value.isFavorite = isFavorite
      } catch (error) {
        console.error('检查收藏状态失败:', error)
      }
    }
    // 获取相关推荐景点
    try {
      // 可以根据景点类型或地区获取相关景点
      const related = await attractionApi.searchAttractions({
        region: spotData.region,
        tags: spotData.tags,
        limit: 5,
        excludeId: id // 排除当前景点
      })
      relatedSpots.value = related
    } catch (error) {
      console.error('获取相关景点失败:', error)
      relatedSpots.value = []
    }
  } catch (error) {
    console.log(error)
    error.value = true
    retryCount.value++
    spot.value = null

    // 添加更多错误处理逻辑
    if (retryCount.value >= 1) {
      useFallbackData()
    } else {
      ElMessage.error('获取景点详情失败，请稍后重试')
    }
  } finally {
    loading.value = false
  }
}

// 使用备用数据的方法
const useFallbackData = () => {
  console.log('使用备用数据')
  spot.value = { ...fallbackSpot }
  error.value = false
  loading.value = false
  retryCount.value = 0
  relatedSpots.value = [] // 清空相关景点

  // 添加标记，表示当前处于备用数据模式
  const spotStore = useSpotStore()
  spotStore.setFallbackMode(true)

  // 添加视觉提示，让用户知道正在查看备用数据
  ElMessage.warning({
    message: '当前正在查看备用数据，部分功能可能不可用',
    duration: 1000
  })
}

// 查看景点详情的方法
const viewSpotDetail = (spotId) => {
  // 完全重置状态
  error.value = false
  retryCount.value = 0
  spot.value = null
  relatedSpots.value = []
  loading.value = true

  // 使用replace而不是push，避免在历史记录中堆积
  router.replace(`/spots/${spotId}`)
}

// 在组件销毁前重置状态
onBeforeUnmount(() => {
  // 重置所有状态
  error.value = false
  loading.value = false
  spot.value = null
  retryCount.value = 0
})

// 修改watch钩子，确保immediate为true
watch(() => route.params.id, (newId, oldId) => {
  if (newId !== oldId) {
    // 重置状态
    error.value = false
    retryCount.value = 0
    spot.value = null
    // 重新获取数据
    fetchSpotData()
  }
}, { immediate: true }) // 修改为true，确保首次加载时执行 

</script>

<style scoped>
.spot-detail {
  width: 100%;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
}

.spot-content {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-bottom: 3rem;
  animation: fadeIn 1s ease;
}

.spot-header {
  position: relative;
  height: 500px;
  overflow: hidden;
  margin-bottom: 2rem;
  border-radius: 0 0 20px 20px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
}

.spot-banner {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
  filter: brightness(0.9);
}

.spot-header:hover .spot-banner {
  transform: scale(1.05);
  filter: brightness(1);
}

.spot-info-overlay {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 3rem 2rem 2rem;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.8) 30%, transparent 100%);
  color: #fff;
  backdrop-filter: blur(2px);
}

.spot-name {
  font-size: 2.5rem;
  font-weight: 700;
  margin: 0;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
  animation: fadeInUp 0.8s ease;
}

.spot-meta {
  display: flex;
  align-items: center;
  gap: 1.5rem;
  margin-top: 1rem;
  animation: fadeInUp 0.8s ease 0.2s;
}

.spot-meta .el-tag {
  background: rgba(255, 255, 255, 0.9);
  border: none;
  font-size: 1.1rem;
  padding: 0.5rem 1rem;
}

.spot-rating :deep(.el-rate__icon) {
  font-size: 1.2rem;
  margin-right: 4px;
  color: #ffd700;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.3);
}

.el-card {
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
  border: none;
}

.el-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.1);
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem;
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
  border-bottom: 1px solid #eee;
}

.card-header h2 {
  font-size: 1.5rem;
  color: #2c3e50;
  font-weight: 600;
  margin: 0;
  position: relative;
  padding-left: 15px;
}

.card-header h2::before {
  content: '';
  position: absolute;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
  width: 5px;
  height: 20px;
  background: #409EFF;
  border-radius: 3px;
}

:deep(.el-descriptions) {
  padding: 1.5rem;
}

:deep(.el-descriptions__label) {
  font-weight: 500;
  color: #333;
}

:deep(.el-tag) {
  padding: 0.5rem 1rem;
  border-radius: 6px;
}

/* 5. 图片画廊 */
.spot-gallery .el-card__body {
  padding: 1.5rem;
}

.gallery-image {
  width: calc(25% - 1rem);
  height: 180px;
  object-fit: cover;
  margin: 0.5rem;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  position: relative;
  overflow: hidden;
}

.gallery-image:hover {
  transform: scale(1.05);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  z-index: 1;
}

.gallery-image::after {
  content: '点击查看大图';
  position: absolute;
  bottom: -50px;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.6);
  color: white;
  text-align: center;
  padding: 5px 0;
  font-size: 12px;
  transition: bottom 0.3s ease;
}

.gallery-image:hover::after {
  bottom: 0;
}

/* 6. 评论区域 */
.review-list {
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 10px;
}

.review-item {
  display: flex;
  gap: 15px;
  padding: 15px;
  border-radius: 10px;
  background: #f9f9f9;
  transition: all 0.3s ease;
  border-left: 4px solid transparent;
}

.review-item:hover {
  background: #f0f7ff;
  border-left: 4px solid #409EFF;
  transform: translateX(5px);
}

.review-content {
  flex: 1;
}

.review-header {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 8px;
}

.review-username {
  font-weight: bold;
  color: #333;
}

.review-text {
  margin: 8px 0;
  color: #666;
  line-height: 1.6;
}

.review-time {
  color: #999;
  font-size: 12px;
  display: block;
  text-align: right;
  margin-top: 5px;
}

/* 7. 相关景点 */
.related-spots {
  margin-top: 2rem;
}

.related-spot-card {
  height: 100%;
  border-radius: 8px;
  overflow: hidden;
  position: relative;
  cursor: pointer;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
}

.related-spot-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
}

.related-spot-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.related-spot-info {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 15px;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.8), transparent);
  color: white;
}

.related-spot-info h3 {
  margin: 0 0 5px 0;
  font-size: 16px;
}

.related-spot-info p {
  margin: 0;
  font-size: 12px;
  opacity: 0.8;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
}

@media (max-width: 768px) {
  .spot-header {
    height: 300px;
  }

  .spot-name {
    font-size: 24px;
  }

  .gallery-image {
    width: calc(50% - 10px);
    height: 120px;
  }

  .el-descriptions {
    width: 100%;
  }
}

.error-container {
  padding: 40px 0;
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  margin: 40px auto;
  max-width: 800px;
  text-align: center;
}

.error-container :deep(.el-result__icon) {
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0% {
    transform: scale(1);
  }

  50% {
    transform: scale(1.05);
  }

  100% {
    transform: scale(1);
  }
}
</style>
