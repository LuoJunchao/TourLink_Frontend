<template>
  <div class="guide-detail" v-loading="loading">
    <template v-if="guide">
      <!-- 顶部封面和标题区域 -->
      <div class="guide-header">
        <el-image :src="guide.coverImage" fit="cover" class="guide-banner" />
        <div class="guide-info-overlay">
          <h1 class="guide-title">{{ guide.title }}</h1>
          <div class="author-info">
            <el-avatar :src="guide.author.avatar" />
            <span class="author-name">{{ guide.author.name }}         {{ guide.publishTime.split('T')[0]  }}</span>
          </div>
          <!-- 添加统计信息到顶部 -->
          <div class="meta-stats">
            <div class="stat-item">
              <el-icon><View /></el-icon>
              <span>{{ guide.views }} 阅读</span>
            </div>
            <div class="stat-item" @click="handleLikeBlog" :class="{ 'liked': guide.isLiked }">
              <el-icon><Star /></el-icon>
              <span>{{ guide.likes }} 点赞</span>
            </div>
            <div class="stat-item">
              <el-icon><ChatDotRound /></el-icon>
              <span>{{ guide.comments }} 评论</span>
            </div>
          </div>
        </div>
      </div>

      <div class="guide-content container">
        <!-- 攻略正文内容 -->
        <div class="guide-body">
          <el-card>
            <template #header>
              <div class="card-header">
                <h2>攻略内容</h2>
              </div>
            </template>
            <div v-html="guide.content" class="markdown-content"></div>
          </el-card>
        </div>

        <!-- 评论区域 -->
        <div class="guide-comments">
          <el-card>
            <template #header>
              <div class="card-header">
                <h2>评论区</h2>
                <el-button type="primary" @click="showCommentDialog = true">写评论</el-button>
              </div>
            </template>
            <div v-if="guide.commentList && guide.commentList.length > 0" class="comment-list">
              <div v-for="comment in guide.commentList" :key="comment.id" class="comment-item">
                <el-avatar :src="comment.userAvatar" />
                <div class="comment-content">
                  <div class="comment-header">
                    <span class="comment-username">{{ comment.username }}</span>
                    <span class="comment-time">{{ comment.time }}</span>
                  </div>
                  <p class="comment-text">{{ comment.content }}</p>
                  <!-- 其他评论操作 -->
                </div>
              </div>
            </div>
            <el-empty v-else description="暂无评论" />
          </el-card>
        </div>
      </div>
    </template>

    <!-- 评论对话框 -->
    <el-dialog v-model="showCommentDialog" title="写评论" width="50%">
      <el-form :model="newComment" label-width="0">
        <el-form-item>
          <el-input
            v-model="newComment.content"
            type="textarea"
            rows="4"
            placeholder="写下你的评论"
          />
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="showCommentDialog = false">取消</el-button>
          <el-button type="primary" @click="submitComment">发布</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<style lang="scss" scoped>
.guide-detail {
  width: 100%;
}

.guide-header {
  position: relative;
  width: 100%;
  height: 400px;
  overflow: hidden;

  &:hover .guide-banner {
    transform: scale(1.05);
  }
}

.guide-banner {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.guide-info-overlay {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 30px;
  background: linear-gradient(to top, rgba(0,0,0,0.8), transparent);
  color: white;
  backdrop-filter: blur(5px);

  .meta-stats {
    display: flex;
    gap: 20px;
    margin-top: 15px;

    .stat-item {
      display: flex;
      align-items: center;
      gap: 5px;
      cursor: pointer;
      transition: all 0.3s ease;
      
      &.liked {
        color: #ff6b6b;
      }
      
      &:hover {
        transform: scale(1.05);
      }
    }
  }
}

.guide-content {
  max-width: 1200px;
  margin: 20px auto;
  padding: 0 20px;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0;

  h2 {
    margin: 0;
    font-size: 20px;
    color: #333;
  }
}

.comment-list {
  .comment-item {
    display: flex;
    gap: 15px;
    padding: 15px 0;
    border-bottom: 1px solid #eee;

    &:last-child {
      border-bottom: none;
    }
  }

  .comment-content {
    flex: 1;
  }

  .comment-header {
    display: flex;
    justify-content: space-between;
    margin-bottom: 8px;
  }

  .comment-username {
    font-weight: bold;
    color: #333;
  }

  .comment-time {
    color: #999;
    font-size: 14px;
  }

  .comment-text {
    margin: 0 0 10px;
    color: #666;
    display: -webkit-box;
    -webkit-line-clamp: 3;  /* 限制最多显示3行 */
    line-clamp: 3;  /* 标准属性 */
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .comment-actions {
    display: flex;
    gap: 15px;
  }
}

@media (max-width: 768px) {
  .guide-header {
    height: 300px;
  }

  .guide-title {
    font-size: 24px;
  }

  .meta-stats {
    flex-wrap: wrap;
  }
}
</style>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import { View, Star, ChatDotRound, ChatRound } from '@element-plus/icons-vue'
import { socialApi } from '@/api/social' // 导入社交API
import { useUserStore } from '@/stores/user' // 导入用户存储
import { userApi } from '@/api/user'

const route = useRoute()
const router = useRouter()
const userStore = useUserStore() // 使用用户存储

const loading = ref(true)
const guide = ref(null)
const showCommentDialog = ref(false)
const newComment = ref({
  content: ''
})

// 处理点赞
const handleLikeBlog = async () => {
  if (!userStore.isLoggedIn) {
    ElMessage.warning('请先登录')
    return
  }
  
  try {
    // 获取当前点赞状态
    const isLiked = await socialApi.getLikeStatus(route.params.id, userStore.userId)
    
    if (isLiked) {
      // 如果已经点赞，则取消点赞
      await socialApi.unlikeBlog(route.params.id, userStore.userId)
      guide.value.likes--
    } else {
      // 如果未点赞，则添加点赞
      await socialApi.likeBlog(route.params.id, userStore.userId)
      guide.value.likes++
    }
    guide.value.isLiked = !isLiked
  } catch (error) {
    console.error('点赞操作失败:', error)
    ElMessage.error('操作失败，请稍后重试')
  }
}

// 获取攻略详情
const fetchGuideDetail = async () => {
  loading.value = true
  try {
    // 获取博客详情
    const blogData = await socialApi.getBlogDetail(route.params.id)
    
    // 获取评论
    const comments = await socialApi.getCommentsByBlogId(route.params.id)
    
    // 检查用户是否已点赞
    let isLiked = false
    if (userStore.isLoggedIn) {
      try {
        isLiked = await socialApi.getLikeStatus(route.params.id, userStore.userId)
      } catch (error) {
        console.error('检查点赞状态失败:', error)
      }
    }
    
    // 获取作者信息
    let authorName = '匿名用户'
    let authorAvatar = '/src/assets/images/user.jpg'
    
    if (blogData.userId) {
      try {
        const authorInfo = await userApi.getUserInfo(blogData.userId)
        if (authorInfo) {
          authorName = authorInfo.username || authorInfo.name || '匿名用户'
          authorAvatar = authorInfo.avatar || '/src/assets/images/user.jpg'
          console.log('作者名称:', authorName)
        }
      } catch (error) {
        console.error('获取作者信息失败:', error)
      }
    }
    
    // 处理评论用户信息
    const processedComments = []
    for (const comment of comments) {
      let username = '匿名用户'
      let userAvatar = '/src/assets/images/user.jpg'
      
      if (comment.userId) {
        try {
          const userInfo = await userApi.getUserInfo(comment.userId)
          if (userInfo) {
            username = userInfo.username || userInfo.name || '匿名用户'
            userAvatar = userInfo.avatar || '/src/assets/images/user.jpg'
          }
        } catch (error) {
          console.error('获取评论用户信息失败:', error)
        }
      }
      
      processedComments.push({
        id: comment.commentId || comment.id, // 使用commentId或fallback到id
        username: username,
        userAvatar: userAvatar,
        content: comment.content,
        time: comment.commentTime ? comment.commentTime.split('T')[0] : new Date().toISOString().split('T')[0],
        likes: comment.likeCount || 0
      })
    }
    
    // 整合数据
    guide.value = {
      id: blogData.blogId, // 使用blogId
      title: blogData.title,
      author: {
        name: authorName,
        avatar: authorAvatar
      },
      publishTime: blogData.publishTime || new Date().toLocaleDateString(),
      coverImage: blogData.images[0],
      views: blogData.viewCount || 0,
      likes: blogData.likeCount || 0,
      comments: blogData.commentCount || 0,
      content: blogData.content,
      commentList: processedComments,
      isLiked: isLiked // 添加点赞状态
    }
    
    // 如果用户已登录，增加浏览量
    if (userStore.isLoggedIn) {
      await socialApi.viewBlog(route.params.id, userStore.userId)
    }
  } catch (error) {
    console.error('获取攻略详情失败:', error)
  } finally {
    loading.value = false
  }
}

// 提交评论
const submitComment = async () => {
  if (!userStore.isLoggedIn) {
    ElMessage.warning('请先登录')
    return
  }
  
  if (!newComment.value.content.trim()) {
    ElMessage.warning('评论内容不能为空')
    return
  }
  
  try {
    await socialApi.addComment(userStore.userId, {
      blogId: route.params.id,
      content: newComment.value.content
    })
    
    // 重新获取评论数据
    await fetchGuideDetail()
    
    // 重置表单并关闭对话框
    newComment.value.content = ''
    showCommentDialog.value = false
    
    ElMessage.success('评论成功')
  } catch (error) {
    console.error('评论失败:', error)
    ElMessage.error('评论失败，请稍后重试')
  }
}

// 回复评论
const replyToComment = (comment) => {
  if (!userStore.isLoggedIn) {
    ElMessage.warning('请先登录')
    return
  }
  
  // 在评论框中添加@用户名
  newComment.value.content = `@${comment.username} `
  showCommentDialog.value = true
}

// 点赞评论
const likeComment = async (comment) => {
  if (!userStore.isLoggedIn) {
    ElMessage.warning('请先登录')
    return
  }
  
  try {
    // 这里需要后端提供点赞评论的API
    // 暂时模拟点赞效果
    comment.likes++
    ElMessage.success('点赞成功')
  } catch (error) {
    console.error('点赞失败:', error)
    ElMessage.error('点赞失败，请稍后重试')
  }
}

onMounted(() => {
  socialApi.viewBlog(route.params.id, userStore.userId)
  fetchGuideDetail()
})
</script>