<template>
  <div class="profile-container">
    <!-- 个人信息卡片 -->
    <el-card class="profile-card">
      <div class="profile-header">
        <el-avatar :size="100" :src="userInfo.avatar" />
        <div class="profile-info">
          <h2 class="username">{{ userInfo.username }}</h2>
          <p class="bio">{{ userInfo.bio }}</p>
        </div>
        <el-button type="primary" @click="handleEdit">编辑资料</el-button>
      </div>
      <div class="profile-stats">
        <div class="stat-item">
          <span class="stat-number">{{ userInfo.guides }}</span>
          <span class="stat-label">发布的攻略</span>
        </div>
        <div class="stat-item">
          <span class="stat-number">{{ userInfo.collections }}</span>
          <span class="stat-label">收藏的景点</span>
        </div>
        <div class="stat-item">
          <span class="stat-number">{{ userInfo.likes }}</span>
          <span class="stat-label">获得的点赞</span>
        </div>
      </div>
    </el-card>

    <!-- 内容区域 -->
    <el-tabs v-model="activeTab" class="profile-tabs">
      <!-- 在我的攻略标签页添加新建按钮 -->
      <el-tab-pane label="我的攻略" name="guides">
        <div class="guides-header">
          <h3>我的攻略</h3>
          <el-button type="primary" @click="createGuide">新建攻略</el-button>
        </div>
        <div class="guides-grid">
          <el-row :gutter="20">
            <el-col :xs="24" :sm="12" :md="8" v-for="guide in userGuides" :key="guide.id">
              <el-card class="guide-card" shadow="hover">
                <el-image :src="guide.coverImage" fit="cover" class="guide-cover" />
                <h3 class="guide-title">{{ guide.title }}</h3>
                <p class="guide-preview">{{ guide.content }}</p>
                <div class="guide-footer">
                  <span class="publish-time">{{ guide.publishTime }}</span>
                  <div class="guide-actions">
                    <el-button type="primary" link @click="editGuide(guide.id)">编辑</el-button>
                    <el-button type="danger" link @click="deleteGuide(guide.id)">删除</el-button>
                  </div>
                </div>
              </el-card>
            </el-col>
          </el-row>
        </div>
      </el-tab-pane>

      <el-tab-pane label="收藏的景点" name="collections">
        <div class="spots-grid">
          <el-row :gutter="20">
            <el-col :xs="24" :sm="12" :md="8" v-for="spot in userCollections" :key="spot.id">
              <el-card class="spot-card" shadow="hover">
                <el-image :src="spot.image" fit="cover" class="spot-cover" />
                <div class="spot-info">
                  <h3 class="spot-name">{{ spot.name }}</h3>
                  <p class="spot-location">{{ spot.location }}</p>
                  <div class="spot-footer">
                    <span class="spot-price">¥{{ spot.price }}起</span>
                    <el-button type="danger" link @click="removeCollection(spot.id)">
                      取消收藏
                    </el-button>
                  </div>
                </div>
              </el-card>
            </el-col>
          </el-row>
        </div>
      </el-tab-pane>
    </el-tabs>

    <!-- 编辑个人资料对话框 -->
    <el-dialog v-model="editDialogVisible" title="编辑个人资料" width="500px">
      <el-form :model="editForm" label-width="80px">
        <el-form-item label="头像">
          <el-upload
            class="avatar-uploader"
            action="/api/upload"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
          >
            <el-image v-if="editForm.avatar" :src="editForm.avatar" class="avatar" />
            <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
          </el-upload>
        </el-form-item>
        <el-form-item label="用户名">
          <el-input v-model="editForm.username" />
        </el-form-item>
        <el-form-item label="邮箱">
          <el-input v-model="editForm.email" />
        </el-form-item>
        <el-form-item label="手机号">
          <el-input v-model="editForm.phoneNumber" />
        </el-form-item>
        <el-form-item label="个人简介">
          <el-input v-model="editForm.bio" type="textarea" :rows="3" />
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="editDialogVisible = false">取消</el-button>
          <el-button type="primary" @click="saveProfile">保存</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { ref,onMounted } from 'vue'
import { Plus } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'

const router = useRouter()

// 用户信息
const userInfo = ref({
  username: '旅行小明',
  avatar: '/src/assets/images/avatars/default.jpg',
  bio: '热爱旅行，分享生活',
  guides: 12,
  collections: 25,
  likes: 168
})

// 标签页控制
const activeTab = ref('guides')

// 用户攻略数据
const userGuides = ref([
  {
    id: 1,
    title: '桂林山水甲天下 - 三天两夜深度游攻略',
    content: '桂林山水是中国最美自然景观之一，本攻略将为您详细介绍...',
    coverImage: '/src/assets/images/guides/guilin.jpg',
    publishTime: '2025.4.15'
  }
  // 添加更多攻略数据
])

// 收藏的景点数据
const userCollections = ref([
  {
    id: 1,
    name: '桂林山水',
    location: '广西桂林',
    image: '/src/assets/images/spots/guilin.jpg',
    price: 199
  }
  // 添加更多收藏数据
])

// 编辑对话框控制
const editDialogVisible = ref(false)
const editForm = ref({
  avatar: '',
  username: '',
  bio: '',
  email: '',
  phoneNumber: ''
})

// 处理编辑按钮点击
const handleEdit = () => {
  editForm.value = {
    avatar: userInfo.value.avatar,
    username: userInfo.value.username,
    bio: userInfo.value.bio,
    email: userInfo.value.email,
    phoneNumber: userInfo.value.phoneNumber
  }
  editDialogVisible.value = true
}

// 处理头像上传成功
const handleAvatarSuccess = (response) => {
  editForm.value.avatar = response.url
}

// 保存个人资料
// 引入userApi和userStore
import { userApi } from '../../api/user'
import { useUserStore } from '../../stores/user'

const userStore = useUserStore()
const userId = localStorage.getItem('userId')

// 获取用户信息
const fetchUserInfo = async () => {
  try {
    if (!userId) {
      ElMessage.error('未找到用户ID')
      return
    }
    const response = await userApi.getUserInfo(userId)
    userInfo.value = response
  } catch (error) {
    ElMessage.error('获取用户信息失败')
  }
}

// 获取用户收藏列表
const fetchUserCollections = async () => {
  try {
    userCollections.value = await userStore.getFavorites()
  } catch (error) {
    ElMessage.error('获取收藏列表失败')
  }
}

// 获取用户攻略列表
const fetchUserGuides = async () => {
  try {
    if (!userId) {
      ElMessage.error('未找到用户ID')
      return
    }
    // 使用socialApi获取用户博客列表
    const response = await request(`/api/social/blogs/user/${userId}`)
    userGuides.value = response
  } catch (error) {
    ElMessage.error('获取攻略列表失败')
  }
}

// 在组件挂载时调用
onMounted(async () => {
  await fetchUserInfo()
  await fetchUserCollections()
  await fetchUserGuides()
})

// 更新用户信息
// 在编辑表单中添加邮箱和手机号字段
const editForm = ref({
  email: '',
  phoneNumber: ''
})

// 在editForm中添加相应字段
const editForm = ref({
  username: '',
  avatar: '',
  bio: '',
  email: '',
  phoneNumber: ''
})

// 保存个人资料
const saveProfile = async () => {
  try {
    await userStore.updateUser(userStore.userId, {
      username: editForm.value.username,
      email: editForm.value.email,
      phoneNumber: editForm.value.phoneNumber,
      // 注意：后端API不支持直接更新bio，这可能需要单独的API
    })
    
    // 更新本地显示的用户信息
    userInfo.value.username = editForm.value.username
    userInfo.value.email = editForm.value.email
    userInfo.value.phoneNumber = editForm.value.phoneNumber
    userInfo.value.avatar = editForm.value.avatar
    userInfo.value.bio = editForm.value.bio
    
    editDialogVisible.value = false
    ElMessage.success('个人资料已更新')
  } catch (error) {
    ElMessage.error(error.message || '更新失败')
  }
}

// 编辑攻略
const editGuide = (guideId) => {
  router.push(`/guides/edit/${guideId}`)
}

// 引入socialApi
import { socialApi } from '../../api/social'

// 删除攻略
const deleteGuide = async (guideId) => {
  try {
    // 使用socialApi删除博客
    await request(`/api/social/blogs/${guideId}`, {
      method: 'DELETE'
    })
    // 更新本地数据
    userGuides.value = userGuides.value.filter(guide => guide.id !== guideId)
    ElMessage.success('删除成功')
  } catch (error) {
    ElMessage.error('删除失败')
  }
}

// 取消收藏
const removeCollection = async (spotId) => {
  try {
    const userId = localStorage.getItem('userId')
    if (!userId) {
      ElMessage.error('未找到用户ID')
      return
    }
    await userApi.removeFavorite(userId, spotId)
    // 更新本地数据
    userCollections.value = userCollections.value.filter(spot => spot.id !== spotId)
    ElMessage.success('取消收藏成功')
  } catch (error) {
    ElMessage.error('取消收藏失败')
  }
}

// 新建攻略
const createGuide = () => {
  router.push('/guides/edit')
}
</script>

<style scoped>
.profile-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  background: #f8f9fa;
  min-height: calc(100vh - 64px);
}

.profile-card {
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  margin-bottom: 2rem;
  overflow: hidden;
}

.profile-header {
  display: flex;
  align-items: center;
  padding: 2rem;
  background: linear-gradient(135deg, var(--primary-color-light), var(--primary-color));
  color: #0816aa;
}

.profile-info {
  margin: 0 2rem;
  flex: 1;
}

.username {
  font-size: 1.8rem;
  margin: 0 0 0.5rem;
  color: #0816aa;
}

.bio {
  font-size: 1rem;
  margin: 0;
  opacity: 0.9;
}

.profile-stats {
  display: flex;
  justify-content: space-around;
  padding: 1.5rem;
  background: #fff;
  border-top: 1px solid #eee;
}

.stat-item {
  text-align: center;
  padding: 0 1rem;
}

.stat-number {
  display: block;
  font-size: 1.5rem;
  font-weight: 600;
  color: var(--primary-color);
}

.stat-label {
  color: #666;
  font-size: 0.9rem;
  margin-top: 0.3rem;
}

.profile-tabs {
  background: #fff;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
}

.guides-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
}

.guides-header h3 {
  margin: 0;
  font-size: 1.5rem;
  color: #333;
}

.guide-card {
  border: none;
  border-radius: 12px;
  overflow: hidden;
  transition: all 0.3s ease;
  margin-bottom: 2rem;
}

.guide-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
}

.guide-cover {
  width: 100%;
  height: 220px;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.guide-card:hover .guide-cover {
  transform: scale(1.05);
}

.guide-title {
  font-size: 1.3rem;
  margin: 1rem;
  color: #333;
  font-weight: 600;
}

.guide-preview {
  color: #666;
  margin: 0 1rem 1rem;
  line-height: 1.6;
}

.guide-footer {
  padding: 1rem;
  border-top: 1px solid #eee;
  background: #f8f9fa;
}

.publish-time {
  color: #999;
  font-size: 0.9rem;
}

.guide-preview {
  color: #666;
  margin-bottom: 10px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.guide-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.spot-card {
  border: none;
  border-radius: 12px;
  overflow: hidden;
  transition: all 0.3s ease;
  margin-bottom: 2rem;
}

.spot-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
}

.spot-cover {
  width: 100%;
  height: 220px;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.spot-card:hover .spot-cover {
  transform: scale(1.05);
}

.spot-info {
  padding: 1.5rem;
}

.spot-name {
  font-size: 1.3rem;
  color: #333;
  font-weight: 600;
  margin-bottom: 0.5rem;
}

.spot-location {
  color: #666;
  font-size: 0.9rem;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.spot-price {
  color: #f56c6c;
  font-size: 1.2rem;
  font-weight: 600;
  background: #fff8f8;
  padding: 0.3rem 0.8rem;
  border-radius: 4px;
}

.avatar-uploader {
  text-align: center;
  margin: 1rem 0;
}

.avatar {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  border: 4px solid #fff;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  object-fit: cover;
}

.avatar-uploader-icon {
  font-size: 32px;
  color: #909399;
  width: 120px;
  height: 120px;
  border: 2px dashed #dcdfe6;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all 0.3s ease;
}

.avatar-uploader-icon:hover {
  border-color: var(--primary-color);
  color: var(--primary-color);
}

@media screen and (max-width: 768px) {
  .profile-header {
    flex-direction: column;
    text-align: center;
  }

  .profile-info {
    margin: 10px 0;
  }

  .profile-stats {
    flex-wrap: wrap;
    gap: 20px;
  }

  .stat-item {
    width: 45%;
  }
}
</style>