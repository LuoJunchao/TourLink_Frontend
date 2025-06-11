<template>
  <div class="plan-page">
    <div class="banner" :style="{ backgroundImage: 'url(' + 'src/assets/images/banners/home-banner.jpg' + ')' }">
      <div class="container">
        <h1 class="banner-title">定制你的完美旅程</h1>
        <p class="banner-subtitle">让我们帮你规划一次难忘的旅行</p>
      </div>
    </div>

    <div class="container">
      <!-- 加载中显示 -->
      <div v-if="loading" class="loading-container">
        <el-skeleton :rows="10" animated />
      </div>

      <!-- 表单区域 -->
      <el-card class="plan-form" v-if="!showResult && !loading">
        <template #header>
          <div class="form-header">制定旅游计划</div>
        </template>
        
        <el-form label-position="top" :model="formData" :rules="rules" ref="planForm">
          <el-row :gutter="20">
            <el-col :xs="24" :sm="24" :md="12">
              <el-form-item label="旅行日期" prop="dateRange">
                <el-date-picker
                  v-model="formData.dateRange"
                  type="daterange"
                  range-separator="至"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                  style="width: 100%"
                />
              </el-form-item>
            </el-col>

            <el-col :xs="24" :sm="24" :md="12">
              <el-form-item label="预算" prop="budget">
                <el-slider
                  v-model="formData.budget"
                  :min="0"
                  :max="10000"
                  :step="100"
                  :format-tooltip="value => `${value}元`"
                />
              </el-form-item>
            </el-col>

            <el-col :xs="24" :sm="24" :md="12">
              <el-form-item label="出发地" prop="fromCity">
                <el-select
                  v-model="formData.fromCity"
                  placeholder="请选择出发城市"
                  style="width: 100%"
                  filterable
                >
                  <el-option 
                    v-for="city in cities" 
                    :key="city.value" 
                    :label="city.label" 
                    :value="city.value"
                  />
                </el-select>
              </el-form-item>
            </el-col>

            <el-col :xs="24" :sm="24" :md="12">
              <el-form-item label="目的地" prop="toCity">
                <el-select
                  v-model="formData.toCity"
                  placeholder="请选择目的地"
                  style="width: 100%"
                  filterable
                >
                  <el-option 
                    v-for="city in cities" 
                    :key="city.value" 
                    :label="city.label" 
                    :value="city.value"
                  />
                </el-select>
              </el-form-item>
            </el-col>

            <el-col :span="24">
              <el-form-item label="旅行天数" prop="maxDays">
                <el-input-number 
                  v-model="formData.maxDays" 
                  :min="1" 
                  :max="14"
                  style="width: 200px"
                />
              </el-form-item>
            </el-col>

            <el-col :span="24">
              <el-form-item label="偏好标签">
                <div class="tag-hint">最多可选择3个标签</div> <!-- 添加提示文字 -->
                <div class="tag-container">
                  <el-tag
                    v-for="tag in availableTags"
                    :key="tag"
                    :class="{ 'active-tag': formData.preference.selectedTags.includes(tag) }"
                    @click="toggleTag(tag)"
                    effect="plain"
                  >
                    {{ tag }}
                  </el-tag>
                </div>
              </el-form-item>
            </el-col>

            <el-col :span="24">
              <el-form-item label="标签权重">
                <div v-for="tag in formData.preference.selectedTags" :key="tag" class="tag-weight">
                  <span class="tag-name">{{ tag }}</span>
                  <el-slider 
                    v-model="formData.preference.tagWeights[tag]" 
                    :min="0" 
                    :max="1" 
                    :step="0.1"
                    :format-tooltip="value => (value * 100).toFixed(0) + '%'"
                  />
                </div>
              </el-form-item>
            </el-col>

            <el-col :span="24">
              <el-form-item label="交通方式">
                <el-checkbox-group v-model="formData.transportation">
                  <el-checkbox label="plane">飞机</el-checkbox>
                  <el-checkbox label="train">火车</el-checkbox>
                  <el-checkbox label="bus">大巴</el-checkbox>
                  <el-checkbox label="car">自驾</el-checkbox>
                </el-checkbox-group>
              </el-form-item>
            </el-col>

            <el-col :span="24">
              <el-form-item label="特殊需求">
                <el-input
                  v-model="formData.specialRequirements"
                  type="textarea"
                  rows="3"
                  placeholder="请输入特殊需求，如：携带宠物、需要无障碍设施等"
                />
              </el-form-item>
            </el-col>
          </el-row>

          <div class="form-footer">
            <el-button type="primary" size="large" @click="handleSubmit" :loading="loading">开始规划</el-button>
            <el-button size="large" @click="handleReset">重置</el-button>
          </div>
        </el-form>
      </el-card>

      <!-- 结果为空时显示 -->
      <el-empty 
        v-if="showResult && (!planResult || !planResult.routes || planResult.routes.length === 0)" 
        description="未找到合适的行程规划" 
        :image-size="200"
      >
        <template #description>
          <p>抱歉，未能找到符合您要求的行程规划</p>
        </template>
        <el-button type="primary" @click="showResult = false">返回修改</el-button>
      </el-empty>
      
      <!-- 结果展示区域 -->
      <div v-if="showResult && planResult && planResult.routes && planResult.routes.length > 0" class="result-container">
        <div class="result-header">
          <h2>您的旅行计划</h2>
          <div class="result-actions">
            <el-dropdown @command="handleExport" split-button type="primary">
              导出行程
              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item command="pdf">导出为PDF</el-dropdown-item>
                  <el-dropdown-item command="image">导出为图片</el-dropdown-item>
                  <el-dropdown-item command="text">导出为文本</el-dropdown-item>
                </el-dropdown-menu>
              </template>
            </el-dropdown>
            <el-button @click="saveItinerary">保存行程</el-button>
            <el-button @click="showResult = false">返回修改</el-button>
          </div>
        </div>

        <!-- 交通信息 -->
        <el-card class="transport-card">
          <template #header>
            <div class="card-header">
              <i class="el-icon-location"></i> 城际交通
            </div>
          </template>
          <div class="transport-info">
            <div class="transport-route">
              <div class="station">{{ planResult.transport.fromStation }}</div>
              <div class="transport-arrow">
                <span class="transport-type">{{ getTransportTypeText(planResult.transport.type) }}</span>
                <el-divider direction="horizontal">
                  <i class="el-icon-right"></i>
                </el-divider>
              </div>
              <div class="station">{{ planResult.transport.toStation }}</div>
            </div>
            <div class="transport-details">
              <div class="detail-item">
                <span class="label">预计距离:</span>
                <span class="value">{{ planResult.transport.distanceKm.toFixed(1) }} 公里</span>
              </div>
              <div class="detail-item">
                <span class="label">预计费用:</span>
                <span class="value">¥{{ planResult.transport.estimatedPrice.toFixed(2) }}</span>
              </div>
            </div>
          </div>
        </el-card>

        <!-- 每日行程 -->
        <div class="daily-routes">
          <el-timeline>
            <el-timeline-item 
              v-for="route in planResult.routes" 
              :key="route.day"
              :timestamp="`第 ${route.day} 天`"
              placement="top"
              type="primary"
            >
              <el-card class="route-card">
                <template #header>
                  <div class="card-header">行程安排</div>
                </template>
                <div class="spots-list">
                  <div v-for="(item, index) in route.spots" :key="index" class="spot-item">
                    <div class="time-slot">{{ item.assignedTimeSlot }}</div>
                    <el-card class="spot-card" shadow="hover">
                      <div class="spot-info">
                        <h3 class="spot-name">{{ item.spot.name }}</h3>
                        <div class="spot-tags">
                          <el-tag v-for="tag in item.spot.tags" :key="tag" size="small" effect="plain">{{ tag }}</el-tag>
                        </div>
                        <div class="spot-details">
                          <div class="detail-item">
                            <i class="el-icon-money"></i>
                            <span>{{ item.spot.price > 0 ? `¥${item.spot.price}` : '免费' }}</span>
                          </div>
                          <div class="detail-item">
                            <i class="el-icon-star-on"></i>
                            <span>{{ item.spot.rating.toFixed(1) }}</span>
                          </div>
                          <div class="detail-item">
                            <i class="el-icon-shopping-cart-full"></i>
                            <span>{{ item.spot.sales }}人去过</span>
                          </div>
                        </div>
                      </div>
                    </el-card>
                  </div>
                </div>
              </el-card>
            </el-timeline-item>
          </el-timeline>
        </div>

        <div class="action-buttons">
          <el-button type="primary" @click="saveItinerary">保存行程</el-button>
          <el-button @click="showResult = false">重新规划</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { routingApi } from '../../api/routing'
import { userApi } from '../../api/user'
import html2canvas from 'html2canvas'
import jsPDF from 'jspdf'
import { saveAs } from 'file-saver'

// 表单数据
const formData = reactive({
  dateRange: [],
  budget: 2000,
  fromCity: '',
  toCity: '',
  maxDays: 3,
  transportation: ['train'],
  specialRequirements: '',
  preference: {
    selectedTags: [],
    tagWeights: {}
  }
})

// 表单验证规则
const rules = {
  dateRange: [{ required: true, message: '请选择旅行日期', trigger: 'change' }],
  fromCity: [{ required: true, message: '请选择出发城市', trigger: 'change' }],
  toCity: [{ required: true, message: '请选择目的地', trigger: 'change' }],
  maxDays: [{ required: true, message: '请选择旅行天数', trigger: 'change' }]
}

// 城市数据
const cities = ref([
  { value: '上海', label: '上海' },
  { value: '北京', label: '北京' },
  { value: '广州', label: '广州' },
  { value: '深圳', label: '深圳' },
  { value: '成都', label: '成都' },
  { value: '杭州', label: '杭州' },
  { value: '西安', label: '西安' },
  { value: '重庆', label: '重庆' },
  { value: '南京', label: '南京' },
  { value: '武汉', label: '武汉' },
  { value: '厦门', label: '厦门' },
  { value: '长沙', label: '长沙' },
  { value: '桂林', label: '桂林' },
  { value: '昆明', label: '昆明' },
  { value: '丽江', label: '丽江' }
])

// 可用标签
const availableTags = [
  '文化  ', '自然  ', '历史  ', '美食  ', '购物  ', '娱乐  ', '艺术  ', '建筑  ', '宗教  ', '户外  ', '海滩  ', '山水  ', '古迹  ', '博物馆 ', '主题公园'
]

// 状态变量
const planForm = ref(null)
const loading = ref(false)
const showResult = ref(false)
const planResult = ref(null)
const savedItineraries = ref([])

// 获取城市数据
const fetchCities = async () => {
  try {
    const data = await routingApi.getAllCities()
    if (data && data.length > 0) {
      cities.value = data.map(city => ({
        value: city.name,
        label: city.name
      }))
    }
  } catch (error) {
    console.error('获取城市数据失败:', error)
  }
}

// 切换标签选择
const toggleTag = (tag) => {
  const index = formData.preference.selectedTags.indexOf(tag)
  if (index > -1) {
    formData.preference.selectedTags.splice(index, 1)
    delete formData.preference.tagWeights[tag]
  } else {
    // 检查是否已经选择了三个标签
    if (formData.preference.selectedTags.length >= 3) {
      ElMessage.warning('最多只能选择三个标签')
      return
    }
    formData.preference.selectedTags.push(tag)
    formData.preference.tagWeights[tag] = 0.5 // 默认权重
  }
}

// 提交表单
const handleSubmit = async () => {
  if (!formData.fromCity || !formData.toCity) {
    ElMessage.warning('请选择出发城市和目的地')
    return
  }

  if (formData.fromCity === formData.toCity) {
    ElMessage.warning('出发城市和目的地不能相同')
    return
  }

  if (formData.preference.selectedTags.length === 0) {
    ElMessage.warning('请至少选择一个偏好标签')
    return
  }

  loading.value = true
  try {
    // 构建请求参数
    const requestData = {
      fromCity: formData.fromCity,
      toCity: formData.toCity,
      maxDays: formData.maxDays,
      preference: {
        tagWeights: formData.preference.tagWeights,
        selectedTags: formData.preference.selectedTags
      }
    }

    // 调用API
    const result = await routingApi.createItinerary(requestData)
    planResult.value = result
    showResult.value = true
    ElMessage.success('行程规划成功')
  } catch (error) {
    console.error('行程规划失败:', error)
    ElMessage.error('行程规划失败，请稍后重试')
  } finally {
    loading.value = false
  }
}

// 重置表单
const handleReset = () => {
  formData.dateRange = []
  formData.budget = 2000
  formData.fromCity = ''
  formData.toCity = ''
  formData.maxDays = 3
  formData.transportation = ['train']
  formData.specialRequirements = ''
  formData.preference.selectedTags = []
  formData.preference.tagWeights = {}
}

// 获取交通方式文本
const getTransportTypeText = (type) => {
  const types = {
    'TRAIN': '火车',
    'FLIGHT': '飞机',
    'BUS': '大巴',
    'CAR': '自驾'
  }
  return types[type] || type
}

// 保存行程
const saveItinerary = () => {
  if (!planResult.value) {
    ElMessage.warning('没有可保存的行程')
    return
  }
  
  try {
    // 获取用户ID
    const userId = localStorage.getItem('userId')
    if (!userId) {
      ElMessage.warning('请先登录后再保存行程')
      return
    }
    
    // 创建行程对象
    const itinerary = {
      id: Date.now(), // 使用时间戳作为临时ID
      userId: userId,
      name: `${formData.fromCity}到${formData.toCity}的${formData.maxDays}天行程`,
      fromCity: formData.fromCity,
      toCity: formData.toCity,
      dateRange: formData.dateRange,
      createdAt: new Date().toISOString(),
      routes: planResult.value.routes,
      transport: planResult.value.transport
    }
    
    // 获取已保存的行程
    let savedItineraries = JSON.parse(localStorage.getItem('savedItineraries') || '[]')
    
    // 添加新行程
    savedItineraries.push(itinerary)
    
    // 保存到本地存储
    localStorage.setItem('savedItineraries', JSON.stringify(savedItineraries))
    
    ElMessage.success('行程已成功保存')
  } catch (error) {
    console.error('保存行程失败:', error)
    ElMessage.error('保存行程失败，请稍后重试')
  }
}

// 处理导出命令
const handleExport = (command) => {
  switch (command) {
    case 'pdf':
      exportToPDF()
      break
    case 'image':
      exportToImage()
      break
    case 'text':
      exportToText()
      break
  }
}

// 导出为PDF
const exportToPDF = async () => {
  if (!planResult.value) {
    ElMessage.warning('没有可导出的行程')
    return
  }
  
  try {
    // 显示加载提示
    const loadingInstance = ElMessage({
      type: 'info',
      message: '正在生成PDF，请稍候...',
      duration: 0
    })
    
    // 获取要导出的DOM元素
    const element = document.querySelector('.result-container')
    
    // 使用html2canvas将DOM元素转换为canvas
    const canvas = await html2canvas(element, {
      scale: 2, // 提高清晰度
      useCORS: true, // 允许加载跨域图片
      logging: false,
      backgroundColor: '#ffffff'
    })
    
    // 计算PDF尺寸（A4纸，宽210mm，高根据内容自适应）
    const imgWidth = 210
    const pageHeight = 297
    const imgHeight = canvas.height * imgWidth / canvas.width
    let heightLeft = imgHeight
    let position = 0
    
    // 创建PDF文档
    const pdf = new jsPDF('p', 'mm', 'a4')
    const imgData = canvas.toDataURL('image/png')
    
    // 添加标题
    pdf.setFontSize(16)
    pdf.text(`${formData.fromCity}到${formData.toCity}的${formData.maxDays}天行程`, 105, 15, { align: 'center' })
    
    // 添加内容（可能需要分页）
    pdf.addImage(imgData, 'PNG', 0, 30, imgWidth, imgHeight)
    heightLeft -= pageHeight - 30
    
    // 如果内容超过一页，添加新页面
    while (heightLeft > 0) {
      position = heightLeft - imgHeight
      pdf.addPage()
      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight)
      heightLeft -= pageHeight
    }
    
    // 保存PDF
    pdf.save(`旅行计划_${formData.fromCity}到${formData.toCity}.pdf`)
    
    // 关闭加载提示
    loadingInstance.close()
    ElMessage.success('PDF导出成功')
  } catch (error) {
    console.error('导出PDF失败:', error)
    ElMessage.error('导出PDF失败，请稍后重试')
  }
}

// 导出为图片
const exportToImage = async () => {
  if (!planResult.value) {
    ElMessage.warning('没有可导出的行程')
    return
  }
  
  try {
    // 显示加载提示
    const loadingInstance = ElMessage({
      type: 'info',
      message: '正在生成图片，请稍候...',
      duration: 0
    })
    
    // 获取要导出的DOM元素
    const element = document.querySelector('.result-container')
    
    // 使用html2canvas将DOM元素转换为canvas
    const canvas = await html2canvas(element, {
      scale: 2, // 提高清晰度
      useCORS: true, // 允许加载跨域图片
      logging: false,
      backgroundColor: '#ffffff'
    })
    
    // 转换为图片并下载
    canvas.toBlob((blob) => {
      saveAs(blob, `旅行计划_${formData.fromCity}到${formData.toCity}.png`)
      
      // 关闭加载提示
      loadingInstance.close()
      ElMessage.success('图片导出成功')
    })
  } catch (error) {
    console.error('导出图片失败:', error)
    ElMessage.error('导出图片失败，请稍后重试')
  }
}

// 导出为文本
const exportToText = () => {
  if (!planResult.value) {
    ElMessage.warning('没有可导出的行程')
    return
  }
  
  try {
    // 构建文本内容
    let content = `${formData.fromCity}到${formData.toCity}的${formData.maxDays}天行程\n\n`
    
    // 添加交通信息
    content += `城际交通:\n`
    content += `出发: ${planResult.value.transport.fromStation}\n`
    content += `到达: ${planResult.value.transport.toStation}\n`
    content += `交通方式: ${getTransportTypeText(planResult.value.transport.type)}\n`
    content += `预计距离: ${planResult.value.transport.distanceKm.toFixed(1)} 公里\n`
    content += `预计费用: ¥${planResult.value.transport.estimatedPrice.toFixed(2)}\n\n`
    
    // 添加每日行程
    planResult.value.routes.forEach(route => {
      content += `第 ${route.day} 天:\n`
      
      route.spots.forEach(item => {
        content += `${item.assignedTimeSlot}: ${item.spot.name}\n`
        content += `  标签: ${item.spot.tags.join(', ')}\n`
        content += `  价格: ${item.spot.price > 0 ? `¥${item.spot.price}` : '免费'}\n`
        content += `  评分: ${item.spot.rating.toFixed(1)}\n`
        content += `  销量: ${item.spot.sales}人去过\n\n`
      })
    })
    
    // 创建Blob对象
    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' })
    
    // 下载文件
    saveAs(blob, `旅行计划_${formData.fromCity}到${formData.toCity}.txt`)
    
    ElMessage.success('文本导出成功')
  } catch (error) {
    console.error('导出文本失败:', error)
    ElMessage.error('导出文本失败，请稍后重试')
  }
}

onMounted(() => {
  fetchCities()
})
</script>

<style scoped>
.plan-page {
  min-height: 100vh;
  background-color: #f8f9fa;
}

.loading-container {
  padding: 2rem;
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
  margin-bottom: 3rem;
}

/* 打印样式 */
@media print {
  .banner, .plan-form, .result-actions, .action-buttons {
    display: none !important;
  }
  
  .result-container {
    margin: 0;
    padding: 0;
  }
  
  .transport-card, .route-card {
    break-inside: avoid;
    page-break-inside: avoid;
    box-shadow: none !important;
    border: 1px solid #eee;
  }
  
  .el-timeline-item {
    break-inside: avoid;
    page-break-inside: avoid;
  }
}

.banner {
  height: 400px;
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
  position: relative;
  display: flex;
  align-items: center;
  color: white;
  margin-bottom: 3rem;
}

.banner::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(to bottom, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.7));
}

.banner .container {
  position: relative;
  text-align: center;
  max-width: 800px;
  margin: 0 auto;
  padding: 0 2rem;
}

.banner-title {
  font-size: 3rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
  animation: fadeInDown 1s ease;
}

.banner-subtitle {
  font-size: 1.4rem;
  opacity: 0.9;
  line-height: 1.6;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.3);
  animation: fadeInUp 1s ease 0.3s;
}

@keyframes fadeInDown {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
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

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
}

.plan-form {
  border-radius: 12px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
  margin-bottom: 3rem;
  background: #fff;
  overflow: hidden;
  transition: all 0.3s ease;
}

.plan-form:hover {
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
  transform: translateY(-5px);
}

.form-header {
  font-size: 1.8rem;
  color: var(--primary-color);
  font-weight: 600;
  padding: 1.5rem;
  border-bottom: 1px solid #eee;
  background: #f8f9fa;
}

.tag-hint {
  font-size: 12px;
  color: #909399;
  margin-bottom: 8px;
}

.el-form {
  padding: 2rem;
}

.el-form-item {
  margin-bottom: 2rem;
}

:deep(.el-form-item__label) {
  font-weight: 500;
  color: #333;
  font-size: 1rem;
  margin-bottom: 0.5rem;
}

:deep(.el-input__inner),
:deep(.el-textarea__inner) {
  border-radius: 8px;
  padding: 0.8rem 1rem;
  font-size: 1rem;
  border: 1px solid #dcdfe6;
  transition: all 0.3s ease;
}

:deep(.el-input__inner:focus),
:deep(.el-textarea__inner:focus) {
  border-color: var(--primary-color);
  box-shadow: 0 0 0 2px rgba(var(--primary-color-rgb), 0.1);
}

:deep(.el-slider__runway) {
  margin: 1rem 0;
}

:deep(.el-checkbox__label) {
  font-size: 1rem;
  color: #333;
}

.form-footer {
  text-align: center;
  margin-top: 3rem;
  padding-top: 2rem;
  border-top: 1px solid #eee;
}

.el-button {
  padding: 0.8rem 2.5rem;
  font-size: 1.1rem;
  font-weight: 500;
  border-radius: 8px;
  transition: all 0.3s ease;
}

.el-button--primary {
  background: var(--primary-color);
  border-color: var(--primary-color);
}

.el-button--primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(var(--primary-color-rgb), 0.3);
}

/* 标签样式 */
.tag-container {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.el-tag {
  cursor: pointer;
  padding: 8px 16px;
  font-size: 14px;
  border-radius: 20px;
  transition: all 0.3s ease;
  width: 120px; /* 添加固定宽度 */
  text-align: center; /* 文本居中 */
  white-space: nowrap; /* 防止文本换行 */
  overflow: hidden; /* 隐藏溢出内容 */
  text-overflow: ellipsis; /* 溢出显示省略号 */
}

.el-tag:hover {
  transform: translateY(-2px);
}

.active-tag {
  background-color: var(--primary-color) !important;
  color: white !important;
  border-color: var(--primary-color) !important;
}

.tag-weight {
  margin-bottom: 15px;
  width: 300px; /* 添加固定宽度 */
}

.tag-name {
  display: block;
  margin-bottom: 5px;
  font-weight: 500;
  color: #333;
  width: 120px; /* 与标签宽度保持一致 */
  text-align: left;
}

/* 结果展示样式 */
.result-container {
  margin-bottom: 3rem;
  animation: fadeIn 0.5s ease;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.result-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
}

.result-header h2 {
  font-size: 2rem;
  color: var(--primary-color);
  margin: 0;
}

.result-actions {
  display: flex;
  gap: 10px;
}

.transport-card,
.route-card {
  margin-bottom: 2rem;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
}

.transport-card:hover,
.route-card:hover {
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
}

.card-header {
  font-size: 1.4rem;
  font-weight: 600;
  color: var(--primary-color);
}

.transport-info {
  padding: 1.5rem;
}

.transport-route {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1.5rem;
}

.station {
  font-size: 1.2rem;
  font-weight: 500;
  color: #333;
  flex: 1;
}

.transport-arrow {
  flex: 2;
  text-align: center;
  position: relative;
}

.transport-type {
  position: absolute;
  top: -10px;
  left: 50%;
  transform: translateX(-50%);
  background-color: white;
  padding: 0 10px;
  color: var(--primary-color);
  font-weight: 500;
  z-index: 1;
}

.transport-details {
  display: flex;
  justify-content: space-around;
  background-color: #f8f9fa;
  padding: 1rem;
  border-radius: 8px;
}

.detail-item {
  display: flex;
  align-items: center;
  gap: 8px;
}

.label {
  color: #666;
  font-size: 0.9rem;
}

.value {
  font-weight: 500;
  color: #333;
  font-size: 1.1rem;
}

.spots-list {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.spot-item {
  display: flex;
  gap: 1rem;
}

.time-slot {
  width: 80px;
  text-align: center;
  padding-top: 1rem;
  font-weight: 500;
  color: var(--primary-color);
}

.spot-card {
  flex: 1;
  border-radius: 8px;
  transition: all 0.3s ease;
}

.spot-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
}

.spot-info {
  padding: 1rem;
}

.spot-name {
  font-size: 1.3rem;
  margin: 0 0 0.8rem;
  color: #333;
}

.spot-tags {
  display: flex;
  gap: 5px;
  margin-bottom: 1rem;
  flex-wrap: wrap;
}

.spot-details {
  display: flex;
  gap: 1.5rem;
  color: #666;
}

.action-buttons {
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-top: 2rem;
}

@media screen and (max-width: 768px) {
  .banner {
    height: 300px;
  }

  .banner-title {
    font-size: 2.2rem;
  }

  .banner-subtitle {
    font-size: 1.1rem;
  }

  .container {
    padding: 0 1rem;
  }

  .plan-form {
    margin: 0 1rem 2rem;
  }

  .form-header {
    font-size: 1.5rem;
    padding: 1rem;
  }

  .el-form {
    padding: 1rem;
  }

  .form-footer {
    margin-top: 2rem;
  }

  .el-button {
    width: 100%;
    margin-bottom: 1rem;
  }

  .spot-item {
    flex-direction: column;
  }

  .time-slot {
    width: 100%;
    text-align: left;
    padding-top: 0;
    padding-bottom: 0.5rem;
  }
  
  .result-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
  }
  
  .result-actions {
    width: 100%;
  }
  
  .result-actions .el-button {
    flex: 1;
  }
}
</style>