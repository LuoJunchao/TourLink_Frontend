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
          <el-upload
            class="cover-uploader"
            action="/api/upload"
            :show-file-list="false"
            :on-success="handleCoverSuccess"
          >
            <el-image
              v-if="blogForm.coverImage"
              :src="blogForm.coverImage"
              fit="cover"
              class="cover-image"
            />
            <el-icon v-else class="cover-uploader-icon"><Plus /></el-icon>
          </el-upload>
          <div class="upload-tip">建议尺寸：1200x675px</div>
        </el-form-item>

        <!-- 目的地 -->
        <el-form-item label="目的地" prop="destination">
          <el-cascader
            v-model="blogForm.destination"
            :options="destinations"
            placeholder="请选择目的地"
          />
        </el-form-item>

        <!-- 标签 -->
        <el-form-item label="标签" prop="tags">
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
        </el-form-item>

        <!-- 正文编辑器 -->
        <el-form-item label="正文" prop="content">
          <div class="editor-container">
            <el-input
              v-model="blogForm.content"
              type="textarea"
              :rows="15"
              placeholder="请输入博客正文"
              resize="none"
            />
          </div>
        </el-form-item>

        <!-- 操作按钮 -->
        <el-form-item>
          <el-button type="primary" @click="submitBlog">发布</el-button>
          <el-button @click="saveDraft">保存草稿</el-button>
          <el-button @click="cancel">取消</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { Plus } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'
import { socialApi } from '@/api/social' // 导入社交API
import { useUserStore } from '@/stores/user' // 导入用户存储

const route = useRoute()
const router = useRouter()
const userStore = useUserStore() // 使用用户存储

// 判断是否为编辑模式
const isEdit = ref(!!route.params.id)

// 表单数据
const blogForm = ref({
  title: '',
  coverImage: '',
  destination: [],
  tags: [],
  content: ''
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

// 提交博客
const submitBlog = async () => {
  if (!userStore.isLoggedIn) {
    ElMessage.warning('请先登录')
    return
  }
  
  try {
    const blogData = {
      ...blogForm.value,
      authorId: userStore.userId
    }
    
    let result
    if (isEdit.value) {
      // 更新博客
      result = await socialApi.updateBlog(route.params.id, blogData)
    } else {
      // 创建博客
      result = await socialApi.createBlog(blogData)
    }
    
    ElMessage.success(isEdit.value ? '更新成功' : '发布成功')
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
    const blogData = {
      ...blogForm.value,
      authorId: userStore.userId,
      status: 'draft' // 设置状态为草稿
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

// 如果是编辑模式，获取博客详情
onMounted(() => {
  if (isEdit.value) {
    getBlogDetail(route.params.id)
  }
})
</script>

<style scoped>
.blog-edit-container {
  max-width: 1200px;  /* 增加容器最大宽度 */
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
  width: 100%;  /* 确保编辑器容器占满宽度 */
}

.editor-container :deep(.el-textarea__inner) {
  border: none;
  padding: 0;
  font-size: 14px;
  line-height: 1.6;
  min-height: 300px;
  width: 100%;  /* 确保文本框占满容器宽度 */
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
  width: calc(100% - 100px);  /* 减去label的宽度 */
  margin-left: 0 !important;  /* 覆盖默认的margin */
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