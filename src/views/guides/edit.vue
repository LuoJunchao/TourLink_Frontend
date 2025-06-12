<template>
  <div class="blog-edit-container">
    <el-card>
      <template #header>
        <div class="edit-header">
          <h2>{{ isEdit ? '编辑博客' : '创建新博客' }}</h2>
        </div>
      </template>

      <el-form :model="blogForm" :rules="rules" ref="blogFormRef" label-width="100px">
        <!-- 标题 -->
        <el-form-item label="标题" prop="title">
          <el-input v-model="blogForm.title" placeholder="请输入博客标题" />
        </el-form-item>

        <!-- 封面图片 -->
        <el-form-item label="封面图片" prop="coverImage">
          <el-upload class="cover-uploader" action="/api/upload" :show-file-list="false"
            :on-success="handleCoverSuccess">
            <el-image v-if="blogForm.coverImage" :src="blogForm.coverImage" fit="cover" class="cover-image" />
            <el-icon v-else class="cover-uploader-icon">
              <Plus />
            </el-icon>
          </el-upload>
          <div class="upload-tip">建议尺寸：1200x675px</div>
        </el-form-item>



        <!-- 标签 -->
        <!--  <el-form-item label="标签" prop="tags">
          <el-select
            v-model="blogForm.tags"
            multiple
            filterable
            allow-create
            placeholder="请选择或创建标签"
          >
            <el-option
              v-for="tag in tagOptions"
              :key="tag.value"
              :label="tag.label"
              :value="tag.value"
            />
          </el-select>
        </el-form-item> -->

        <!-- 关联景点 -->
        <el-form-item label="关联景点" prop="spotIds">
          <div class="spot-selection-container">
            <!-- 搜索框 -->
            <el-input
              v-model="spotSearch"
              placeholder="搜索景点..."
              clearable
              class="spot-search"
            >
              <template #prefix>
                <el-icon><Search /></el-icon>
              </template>
            </el-input>

            <!-- 景点列表 -->
            <div class="spot-list">
              <div
                v-for="spot in filteredSpots"
                :key="spot.id"
                class="spot-card"
                :class="{ selected: isSpotSelected(spot.id) }"
                @click.stop="toggleSpotSelection(spot)"
              >
                <div class="spot-info">
                  <div class="spot-name">{{ spot.name }}</div>
                </div>
                <el-button
                  size="small"
                  :type="isSpotSelected(spot.id) ? 'danger' : 'primary'"
                  
                >
                  {{ isSpotSelected(spot.id) ? '移除' : '选择' }}
                </el-button>
              </div>
            </div>

            <!-- 已选景点 -->
            <div class="selected-spots" v-if="blogForm.spotIds.length > 0">
              <div class="selected-title">已选景点 ({{ blogForm.spotIds.length }}/5):</div>
              <div class="tag-container">
                <el-tag
                  v-for="id in blogForm.spotIds"
                  :key="id"
                  closable
                  @close="removeSpot(id)"
                  type="success"
                  effect="plain"
                >
                  {{ getSpotName(id) }}
                </el-tag>
              </div>
            </div>
          </div>
        </el-form-item>

        <!-- 正文编辑器 -->
        <el-form-item label="正文" prop="content">
          <div class="editor-container">
            <el-input v-model="blogForm.content" type="textarea" :rows="15" placeholder="请输入博客正文" resize="none" />
          </div>
        </el-form-item>

        <!-- 在正文编辑器下方添加内容处理选项 -->


        <!-- 操作按钮 -->
        <el-form-item>
          <el-button type="primary" @click="submitBlog">发布</el-button><!-- 
          <el-button @click="saveDraft">保存草稿</el-button> -->
          <el-button @click="cancel">取消</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script setup>
import { ref, onMounted, watch, computed } from 'vue'
import { Search } from '@element-plus/icons-vue'
import { useRoute, useRouter } from 'vue-router'
import { Plus } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'
import { socialApi } from '@/api/social' // 导入社交API
import { attractionApi } from '@/api/attraction' // 导入景点API
import { useUserStore } from '@/stores/user' // 导入用户存储
import { processContent } from '@/utils/contentUtils' // 导入内容处理工具

const route = useRoute()
const router = useRouter()
const userStore = useUserStore() // 使用用户存储

// 判断是否为编辑模式
const isEdit = ref(!!route.params.id)

// 表单数据
const blogForm = ref({
  title: '',
  content: '',
  spotIds: [] // 确保初始化为空数组
})

// 景点搜索
const spotSearch = ref('')
const filteredSpots = computed(() => {
  return favoriteSpots.value.filter(spot =>
    spot.name.toLowerCase().includes(spotSearch.value.toLowerCase()))
})

// 检查景点是否已选
const isSpotSelected = (id) => {
  return blogForm.value.spotIds.includes(String(id))
}

// 获取景点名称
const getSpotName = (id) => {
  return favoriteSpots.value.find(s => s.id === id)?.name || '未知景点'
}
const toggleSpotSelection = (spot) => {
  // 检查是否已达上限且不是取消选择
  if (blogForm.value.spotIds.length >= 5 && 
      !blogForm.value.spotIds.includes(String(spot.id))) {
    ElMessage.warning('最多只能关联5个景点')
    return
  }
  
  const spotId = String(spot.id)
  const index = blogForm.value.spotIds.indexOf(spotId)
  
  if (index > -1) {
    blogForm.value.spotIds.splice(index, 1)
  } else {
    blogForm.value.spotIds.push(spotId)
  }
}

// 记录景点点击
const logSpotClick = (spotId) => {
  console.log('点击了景点:', spotId)
}

// 移除已选景点
const removeSpot = (id) => {
  if (!id) return
  
  blogForm.value.spotIds = blogForm.value.spotIds
    .filter(spotId => spotId && spotId !== 'undefined' && spotId !== 'null')
    .filter(spotId => spotId !== String(id)) // 确保类型一致
}

// 调试观察spotIds变化
watch(() => blogForm.value.spotIds, (newVal) => {
  console.log('spotIds changed:', newVal)
}, { deep: true })

// 用户收藏的景点列表
const favoriteSpots = ref([])

// 内容处理选项
const contentProcessOptions = ref({
  filterSensitive: true, // 是否过滤敏感词
  format: true, // 是否格式化文本
  formatParagraph: true // 是否格式化段落
})

// 表单验证规则
const rules = {
  title: [
    { required: true, message: '请输入标题', trigger: 'blur' },
    { min: 5, max: 50, message: '长度在5到50个字符', trigger: 'blur' }
  ],
  content: [{ required: true, message: '请输入正文内容', trigger: 'blur' }],
  destination: [{ required: true, message: '请选择目的地', trigger: 'change' }]
}

// 目的地选项（示例数据）
const destinations = [
  {
    value: 'asia',
    label: '亚洲',
    children: [
      {
        value: 'china',
        label: '中国',
        children: [
          { value: 'beijing', label: '北京' },
          { value: 'shanghai', label: '上海' }
        ]
      }
    ]
  }
]

// 标签选项（示例数据）
const tagOptions = [
  { value: 'food', label: '美食' },
  { value: 'culture', label: '文化' },
  { value: 'photography', label: '摄影' },
  { value: 'adventure', label: '冒险' }
]

// 处理封面图片上传成功
const handleCoverSuccess = (response) => {
  blogForm.value.coverImage = response.url
}

// 获取博客详情
const getBlogDetail = async (id) => {
  try {
    const blogData = await socialApi.getBlogDetail(id)

    // 将后端数据映射到表单
    blogForm.value = {
      title: blogData.title,
      coverImage: blogData.coverImage,
      destination: blogData.destination || [],
      tags: blogData.tags || [],
      content: blogData.content
    }
  } catch (error) {
    console.error('获取攻略详情失败:', error)
    ElMessage.error('获取攻略详情失败')
  }
}

// 处理内容
const handleContentProcess = () => {
  // 处理内容
  const processedContent = processContent(blogForm.value.content, contentProcessOptions.value)

  // 更新表单内容
  blogForm.value.content = processedContent

  ElMessage.success('内容处理完成')
}

// 提交博客
const submitBlog = async () => {
  if (!userStore.isLoggedIn) {
    ElMessage.warning('请先登录')
    return
  }

  try {
    // 处理内容
    blogForm.value.content = processContent(blogForm.value.content, contentProcessOptions.value)


    console.log(blogForm)
    let result
    if (isEdit.value) {
      // 更新博客
      result = await socialApi.updateBlog(route.params.id, blogData)
    } else {
      // 创建博客
      result = await fetch('http://localhost:9082/social/api/blogs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          userId: userStore.userId,
          title: blogForm.value.title,
          content: blogForm.value.content,
          spotIds: blogForm.value.spotIds
        })
      })
    }

    console.log('提交的spotIds:', blogForm.value.spotIds)
    if (result.blogId == -1) {
      ElMessage.success('发布成功')
    }
    else {
      ElMessage.error('发布失败,请重新检查输入')
    }
    router.push('/guides')
  } catch (error) {
    console.error(isEdit.value ? '更新失败:' : '发布失败:', error)
    ElMessage.error(isEdit.value ? '更新失败' : '发布失败')
  }
}

// 保存草稿
const saveDraft = async () => {
  if (!userStore.isLoggedIn) {
    ElMessage.warning('请先登录')
    return
  }

  try {
    // 处理内容
    blogForm.value.content = processContent(blogForm.value.content, contentProcessOptions.value)

    const blogData = {
      ...blogForm.value,
      userId: userStore.userId,
    }

    await socialApi.createBlog(blogData)
    ElMessage.success('保存草稿成功')
  } catch (error) {
    console.error('保存失败:', error)
    ElMessage.error('保存失败')
  }
}

// 取消编辑
const cancel = () => {
  router.back()
}

// 获取用户收藏的景点
onMounted(async () => {
  console.log('开始加载收藏景点...')
  if (userStore.isLoggedIn) {
    try {
      // 1. 获取收藏列表
      const favorites = await attractionApi.getFavorites(userStore.userId)
      console.log('收藏景点ID:', favorites)
      
      if (!Array.isArray(favorites)) {
        throw new Error('收藏数据格式错误')
      }

      // 2. 提取attractionId数组
      const attractionIds = favorites.map(f => f.attractionId)
      
      // 3. 并行获取所有景点详情
      const attractions = await Promise.all(
        attractionIds.map(id =>
          attractionApi.getAttractionDetail(id)
            .catch(e => {
              console.error(`获取景点${id}详情失败:`, e)
              return { id, name: '未命名景点' }
            })
        )
      )
      
      // 4. 处理返回的数据格式
      favoriteSpots.value = attractions.map(att => ({
        id: String(att.id), // 确保id为字符串
        attractionId: String(att.id),
        name: att.name || '未命名景点'
      }))
      console.log('favoriteSpots loaded:', favoriteSpots.value)
      console.log('favoriteSpots loaded:', favoriteSpots.value)
      
    } catch (error) {
      console.error('获取收藏景点失败:', error)
      favoriteSpots.value = []
    }
  }
  
  // 如果是编辑模式，获取博客详情
  if (isEdit.value) {
    getBlogDetail(route.params.id)
  }
})
</script>

<style scoped>
.blog-edit-container {
  max-width: 1200px;
  /* 增加容器最大宽度 */
  margin: 20px auto;
  padding: 0 20px;
  padding: 2rem;
  background: #f8f9fa;
  min-height: calc(100vh - 64px);
}

.el-card {
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
}

.edit-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.edit-header h2 {
  margin: 0;
  font-size: 1.8rem;
  color: var(--primary-color);
  font-weight: 600;
}

.cover-uploader {
  border: 1px dashed #d9d9d9;
  border-radius: 12px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: border-color 0.3s;
  background: #f8f9fa;
  transition: all 0.3s ease;
}

.cover-uploader:hover {
  border-color: #409EFF;
  background: #f0f2f5;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.cover-image {
  width: 400px;
  height: 225px;
  display: block;
  border-radius: 12px;
  object-fit: cover;
}

.cover-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 400px;
  height: 225px;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
}

.upload-tip {
  font-size: 12px;
  color: #666;
  margin-top: 8px;
  margin-top: 1rem;
  color: #909399;
}

.editor-container {
  border: 1px solid #dcdfe6;
  border-radius: 4px;
  padding: 10px;
  background-color: #fff;
  width: 100%;
  /* 确保编辑器容器占满宽度 */
}

.editor-container :deep(.el-textarea__inner) {
  border: none;
  padding: 0;
  font-size: 14px;
  line-height: 1.6;
  min-height: 300px;
  width: 100%;
  /* 确保文本框占满容器宽度 */
  font-family: 'Source Code Pro', monospace;
  line-height: 1.8;
  color: #2c3e50;
  padding: 0.5rem;
}

.el-form {
  padding: 1rem;
}

.el-form-item {
  margin-bottom: 2rem;
}

.el-form-item :deep(.el-form-item__label) {
  font-weight: 500;
  color: #333;
}

.el-form-item :deep(.el-form-item__content) {
  width: calc(100% - 100px);
  /* 减去label的宽度 */
  margin-left: 0 !important;
  /* 覆盖默认的margin */
}

.el-input :deep(.el-input__inner) {
  border-radius: 8px;
  padding: 0.8rem 1rem;
  font-size: 1rem;
}

.editor-container :deep(.el-textarea__inner:focus) {
  box-shadow: none;
}

.el-form-item:last-child {
  margin-top: 2rem;
  padding-top: 2rem;
  border-top: 1px solid #ebeef5;
}

.el-button {
  padding: 0.8rem 2rem;
  font-weight: 500;
  border-radius: 8px;
  transition: all 0.3s ease;
}

.el-button--primary {
  background: var(--primary-color);
  border-color: var(--primary-color);
}

.el-button--primary:hover {
  background: var(--primary-color-light);
  border-color: var(--primary-color-light);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

@media screen and (max-width: 768px) {
  .blog-edit-container {
    padding: 1rem;
  }

  .edit-header h2 {
    font-size: 1.5rem;
  }

  .cover-image,
  .cover-uploader-icon {
    width: 100%;
    height: 180px;
  }

  .el-form-item :deep(.el-form-item__content) {
    width: 100%;
  }

  .el-button {
    width: 100%;
    margin-bottom: 1rem;
  }
}
</style>