<template>
  <div class="plan-page">
    <div class="banner" :style="{ backgroundImage: 'url(' + 'src/assets/images/banners/home-banner.jpg' + ')' }">
      <div class="container">
        <h1 class="banner-title">定制你的完美旅程</h1>
        <p class="banner-subtitle">让我们帮你规划一次难忘的旅行</p>
      </div>
    </div>

    <div class="container">
      <div v-if="loading" class="loading-container">
        <el-skeleton :rows="10" animated />
      </div>

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
                <div class="calculated-days" v-if="formData.dateRange && formData.dateRange.length === 2">
                  预计旅行天数: <span class="days-value">{{ calculatedDays }}天</span>
                </div>
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
              <el-form-item label="偏好标签">
                <div class="tag-groups">
                  <div v-for="(tags, groupName) in tagGroups" :key="groupName" class="tag-group">
                    <div class="group-title">{{ groupName }}</div>
                    <el-select
                      v-model="formData.preference.groupSelections[groupName]"
                      multiple
                      collapse-tags
                      collapse-tags-tooltip
                      :placeholder="`选择${groupName}标签`"
                      style="width: 100%"
                      @change="handleTagSelectionChange(groupName)"
                    >
                      <el-option
                        v-for="tag in tags"
                        :key="tag"
                        :label="tag"
                        :value="tag"
                      />
                    </el-select>
                  </div>
                </div>
                
                <div class="selected-tags" v-if="formData.preference.selectedTags.length > 0">
                  <div class="selected-title">已选标签：</div>
                  <div class="tag-container">
                    <el-tag
                      v-for="tag in formData.preference.selectedTags"
                      :key="tag"
                      closable
                      @close="removeTag(tag)"
                      effect="plain"
                    >
                      {{ tag }}
                    </el-tag>
                  </div>
                </div>
              </el-form-item>
            </el-col>



            <el-col :span="24">
              <el-form-item label="交通方式">
                <el-checkbox-group v-model="formData.transportation">
                  <el-checkbox label="plane">飞机</el-checkbox>
                  <el-checkbox label="train">高铁</el-checkbox>
                </el-checkbox-group>
              </el-form-item>
            </el-col>

            <!-- <el-col :span="24">
              <el-form-item label="特殊需求">
                <el-input
                  v-model="formData.specialRequirements"
                  type="textarea"
                  rows="3"
                  placeholder="请输入特殊需求，如：携带宠物、需要无障碍设施等"
                />
              </el-form-item>
            </el-col> -->
          </el-row>

          <div class="form-footer">
            <el-button type="primary" size="large" @click="handleSubmit" :loading="loading">开始规划</el-button>
            <el-button size="large" @click="handleReset">重置</el-button>
          </div>
        </el-form>
      </el-card>

      <!-- 结果为空时显示 -->
      <el-empty 
        v-if="showResult && (!planResult || !planResult.dailyRoutes || planResult.dailyRoutes.length === 0)"
        description="未找到合适的行程规划" 
        :image-size="200"
      >
        <template #description>
          <p>抱歉，未能找到符合您要求的行程规划</p>
        </template>
        <el-button type="primary" @click="showResult = false">返回修改</el-button>
      </el-empty>
      
      <!-- 结果展示区域 -->
      <div v-if="showResult && planResult && planResult.dailyRoutes && planResult.dailyRoutes.length > 0" class="result-container">
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
              <div class="station">{{ planResult.transportEstimate.fromStation }}</div>
              <div class="transport-arrow">
                <span class="transport-type">{{ getTransportTypeText(planResult.transportEstimate.type) }}</span>
                <el-divider direction="horizontal">
                  <i class="el-icon-right"></i>
                </el-divider>
              </div>
              <div class="station">{{ planResult.transportEstimate.toStation }}</div>
            </div>
            <div class="transport-details">
              <div class="detail-item">
                <span class="label">预计距离:</span>
                <span class="value">{{ planResult.transportEstimate.estimatedDistance.toFixed(1) }} 公里</span>
              </div>
              <div class="detail-item">
                <span class="label">预计费用:</span>
                <span class="value">¥{{ planResult.transportEstimate.estimatedPrice.toFixed(2) }}</span>
              </div>
            </div>
          </div>
        </el-card>

        <!-- 每日行程 -->
        <div class="daily-routes">
          <el-timeline>
            <el-timeline-item 
              v-for="route in planResult.dailyRoutes"
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
import { ref, reactive, onMounted, computed } from 'vue'
import {ElLoading, ElMessage, ElMessageBox} from 'element-plus'
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
    tagWeights: {},
    groupSelections: {
      '自然景观': [],
      '人文历史': [],
      '现代都市': [],
      '户外探险': [],
      '休闲度假': [],
      '特色体验': []
    }
  }
})

// 自动计算旅行天数
const calculatedDays = computed(() => {
  if (formData.dateRange && formData.dateRange.length === 2) {
    const startDate = new Date(formData.dateRange[0])
    const endDate = new Date(formData.dateRange[1])
    const diffTime = Math.abs(endDate - startDate)
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1 // 包含首尾两天
    return diffDays
  }
  return 3 // 默认值
})

// 表单验证规则
const rules = {
  dateRange: [{ required: true, message: '请选择旅行日期', trigger: 'change' }],
  fromCity: [{ required: true, message: '请选择出发城市', trigger: 'change' }],
  toCity: [{ required: true, message: '请选择目的地', trigger: 'change' }]
  // 移除maxDays的验证规则
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
  { value: '丽江', label: '丽江' },
  { value: '青岛', label: '青岛' },
  { value: '大连', label: '大连' },
  { value: '三亚', label: '三亚' },
  { value: '苏州', label: '苏州' },
  { value: '天津', label: '天津' }
])

const tagGroups = reactive({
  '自然景观': ["自然风光", "山水奇观", "火山地貌", "海滨沙滩", "森林氧吧", "冰雪世界", "日出日落", "瀑布湖泊"],
  '人文历史': ["历史遗迹", "古建筑群", "宗教圣地", "博物馆", "文化古镇", "传统民俗", "古街小巷", "战争遗址"],
  '现代都市': ["城市地标", "摩天大楼", "主题乐园", "购物中心", "艺术街区", "游乐场", "夜景胜地", "现代交通"],
  '户外探险': ["登山徒步", "露营野炊", "骑行路线", "荒野求生", "极限运动", "水上活动", "高原探险", "观星胜地"],
  '休闲度假': ["温泉疗养", "奢华酒店", "葡萄酒庄", "海岛度假", "垂钓休闲", "高尔夫场", "禅修静心", "音乐节"],
  '特色体验': ["美食之旅", "艺术展览", "传统手工艺", "节日庆典", "野生动物", "生态保护区", "怀旧火车", "花海胜地"]
})



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

// 处理标签选择变化
const handleTagSelectionChange = (groupName) => {
  // 清空当前selectedTags
  formData.preference.selectedTags = []
  
  // 重新从所有分组的选择中构建selectedTags
  Object.entries(formData.preference.groupSelections).forEach(([group, selectedGroupTags]) => {
    selectedGroupTags.forEach(tag => {
      if (!formData.preference.selectedTags.includes(tag)) {
        formData.preference.selectedTags.push(tag)
      }
    })
  })
}

// 移除标签
const removeTag = (tag) => {
  // 从selectedTags中移除
  const index = formData.preference.selectedTags.indexOf(tag)
  if (index > -1) {
    formData.preference.selectedTags.splice(index, 1)
    delete formData.preference.tagWeights[tag]
  }
  
  // 从对应的分组选择中也移除
  Object.entries(tagGroups).forEach(([groupName, tags]) => {
    if (tags.includes(tag)) {
      const groupIndex = formData.preference.groupSelections[groupName].indexOf(tag)
      if (groupIndex > -1) {
        formData.preference.groupSelections[groupName].splice(groupIndex, 1)
      }
    }
  })
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
  
  if (!formData.dateRange || formData.dateRange.length !== 2) {
    ElMessage.warning('请选择旅行日期')
    return
  }
  let userId;
  userId = await userApi.getCurrentUser();
  loading.value = true
  try {
    // 构建请求参数
    const transportMap = {
      train: 'TRAIN',
      plane: 'AIRPORT'
    };
    const requestData = {
      fromCity: formData.fromCity,
      toCity: formData.toCity,
      maxDays: calculatedDays.value, // 使用计算得到的天数
      userId: userId,
      transportMode: transportMap[formData.transportation[0]] || '',
      preference: {
        selectedTags: formData.preference.selectedTags,
        tagWeights: null
      }
    }
    console.log(requestData);
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
  // 移除maxDays的重置
  formData.transportation = ['train']
  formData.specialRequirements = ''
  formData.preference.selectedTags = []
  formData.preference.tagWeights = {}
  // 重置分组选择
  Object.keys(formData.preference.groupSelections).forEach(key => {
    formData.preference.groupSelections[key] = []
  })
}

// 获取交通方式文本
const getTransportTypeText = (type) => {
  const types = {
    'TRAIN': '火车',
    'FLIGHT': '飞机'
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
      routes: planResult.value.dailyRoutes,
      transport: planResult.value.transportEstimate
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
// 添加格式化日期函数
const formatDate = (date) => {
  const d = new Date(date)
  return `${d.getFullYear()}年${(d.getMonth() + 1).toString().padStart(2, '0')}月${d.getDate().toString().padStart(2, '0')}日`
}

// 导出为PDF
const exportToPDF = async () => {
  if (!planResult.value) {
    ElMessage.warning('没有可导出的行程')
    return
  }

  try {
    const loadingInstance = ElLoading.service({
      lock: true,
      text: '正在生成PDF，请稍候...',
      background: 'rgba(0, 0, 0, 0.7)',
    })

    // 创建新的容器用于导出（避免影响页面显示）
    const exportContainer = document.createElement('div')
    exportContainer.className = 'export-container'
    exportContainer.style.position = 'absolute'
    exportContainer.style.left = '-9999px'
    exportContainer.style.width = '800px'
    document.body.appendChild(exportContainer)

    // 构建PDF内容
    const content = `
      <div class="pdf-header">
        <h1>${formData.fromCity}到${formData.toCity}的${calculatedDays.value}天行程计划</h1>
        <div class="pdf-meta">
          <div>行程日期: ${formatDate(formData.dateRange[0])} - ${formatDate(formData.dateRange[1])}</div>
          <div>预算: ¥${formData.budget.toFixed(2)}</div>
          <div>导出时间: ${new Date().toLocaleString('zh-CN')}</div>
        </div>
      </div>

      <div class="pdf-section">
        <h2>交通信息</h2>
        <div class="transport-info">
          <div class="transport-route">
            <div class="station">${planResult.value.transportEstimate.fromStation}</div>
            <div class="transport-arrow">
              <span class="transport-type">${getTransportTypeText(planResult.value.transportEstimate.type)}</span>
              <div class="arrow">→</div>
            </div>
            <div class="station">${planResult.value.transportEstimate.toStation}</div>
          </div>
          <div class="transport-details">
            <div class="detail-item">
              <span class="label">预计距离:</span>
              <span class="value">${planResult.value.transportEstimate.estimatedDistance.toFixed(1)} 公里</span>
            </div>
            <div class="detail-item">
              <span class="label">预计费用:</span>
              <span class="value">¥${planResult.value.transportEstimate.estimatedPrice.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>

      <div class="pdf-section">
        <h2>每日行程</h2>
        ${planResult.value.dailyRoutes.map(route => `
          <div class="day-plan">
            <h3>第 ${route.day} 天</h3>
            <div class="spots">
              ${route.spots.map((item, index) => `
                <div class="spot-item">
                  <div class="time">${item.assignedTimeSlot}</div>
                  <div class="spot-detail">
                    <div class="spot-name">${item.spot.name}</div>
                    <div class="spot-meta">
                      <span class="price">${item.spot.price > 0 ? `¥${item.spot.price}` : '免费'}</span>
                      <span class="rating">评分: ${item.spot.rating.toFixed(1)}</span>
                      <span class="sales">${item.spot.sales}人去过</span>
                    </div>
                    <div class="spot-tags">${item.spot.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}</div>
                  </div>
                </div>
              `).join('')}
            </div>
          </div>
        `).join('')}
      </div>

      <div class="pdf-footer">
        <p>感谢使用我们的旅行规划服务</p>
        <p>© ${new Date().getFullYear()} 旅行规划助手</p>
      </div>
    `

    exportContainer.innerHTML = content

    // 添加样式
    const style = document.createElement('style')
    style.innerHTML = `
      .export-container {
        font-family: 'PingFang SC', 'Microsoft YaHei', sans-serif;
        color: #333;
        line-height: 1.6;
        padding: 30px;
        box-sizing: border-box;
      }
      .pdf-header {
        text-align: center;
        margin-bottom: 30px;
        border-bottom: 2px solid #3a8ee6;
        padding-bottom: 20px;
      }
      .pdf-header h1 {
        font-size: 24px;
        color: #3a8ee6;
        margin-bottom: 15px;
      }
      .pdf-meta {
        display: flex;
        justify-content: center;
        gap: 30px;
        font-size: 14px;
        color: #666;
      }
      .pdf-section {
        margin-bottom: 30px;
        page-break-inside: avoid;
      }
      .pdf-section h2 {
        font-size: 20px;
        color: #3a8ee6;
        border-left: 4px solid #3a8ee6;
        padding-left: 10px;
        margin-bottom: 15px;
      }
      .transport-info {
        background: #f5f9ff;
        border-radius: 8px;
        padding: 20px;
      }
      .transport-route {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 15px;
        font-size: 18px;
        font-weight: bold;
      }
      .transport-arrow {
        display: flex;
        flex-direction: column;
        align-items: center;
        flex: 1;
      }
      .transport-type {
        background: #3a8ee6;
        color: white;
        padding: 3px 10px;
        border-radius: 4px;
        font-size: 14px;
        margin-bottom: 5px;
      }
      .transport-details {
        display: flex;
        justify-content: center;
        gap: 30px;
        font-size: 16px;
      }
      .detail-item {
        display: flex;
        gap: 8px;
      }
      .label {
        color: #666;
      }
      .value {
        font-weight: bold;
      }
      .day-plan {
        margin-bottom: 30px;
        page-break-inside: avoid;
      }
      .day-plan h3 {
        font-size: 18px;
        color: #3a8ee6;
        margin-bottom: 15px;
        padding-bottom: 5px;
        border-bottom: 1px dashed #ddd;
      }
      .spot-item {
        display: flex;
        margin-bottom: 15px;
        padding-bottom: 15px;
        border-bottom: 1px solid #eee;
      }
      .time {
        min-width: 80px;
        font-weight: bold;
        color: #3a8ee6;
      }
      .spot-detail {
        flex: 1;
      }
      .spot-name {
        font-weight: bold;
        margin-bottom: 5px;
        font-size: 16px;
      }
      .spot-meta {
        display: flex;
        gap: 15px;
        margin-bottom: 8px;
        font-size: 14px;
        color: #666;
      }
      .spot-tags {
        display: flex;
        flex-wrap: wrap;
        gap: 5px;
      }
      .tag {
        background: #ecf5ff;
        color: #3a8ee6;
        padding: 2px 8px;
        border-radius: 4px;
        font-size: 12px;
      }
      .pdf-footer {
        text-align: center;
        margin-top: 40px;
        padding-top: 20px;
        border-top: 1px solid #ddd;
        color: #999;
        font-size: 14px;
      }
    `
    exportContainer.appendChild(style)

    // 生成PDF
    const canvas = await html2canvas(exportContainer, {
      scale: 3,
      useCORS: true,
      logging: false,
      backgroundColor: '#ffffff'
    })

    const imgData = canvas.toDataURL('image/png')
    const imgWidth = 210 // A4宽210mm
    const pageHeight = 297 // A4高297mm
    const imgHeight = canvas.height * imgWidth / canvas.width
    let heightLeft = imgHeight
    let position = 0

    const pdf = new jsPDF('p', 'mm', 'a4')

    // 添加第一页
    pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight)
    heightLeft -= pageHeight

    // 添加剩余页
    while (heightLeft > 0) {
      position = heightLeft - imgHeight
      pdf.addPage()
      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight)
      heightLeft -= pageHeight
    }

    // 保存并清理
    pdf.save(`旅行计划_${formData.fromCity}到${formData.toCity}.pdf`)
    document.body.removeChild(exportContainer)
    loadingInstance.close()
    ElMessage.success('PDF导出成功')
  } catch (error) {
    console.error('导出PDF失败:', error)
    ElMessage.error('导出PDF失败，请稍后重试')
  }
}

// 导出为图片（使用相同的优化内容）
const exportToImage = async () => {
  if (!planResult.value) {
    ElMessage.warning('没有可导出的行程')
    return
  }

  try {
    const loadingInstance = ElLoading.service({
      lock: true,
      text: '正在生成图片，请稍候...',
      background: 'rgba(0, 0, 0, 0.7)',
    })

    const exportContainer = document.createElement('div')
    exportContainer.className = 'export-container'
    exportContainer.style.position = 'absolute'
    exportContainer.style.left = '-9999px'
    exportContainer.style.width = '800px'
    document.body.appendChild(exportContainer)

    // 使用与PDF相同的HTML内容
    // 构建PDF内容
    const content = `
      <div class="pdf-header">
        <h1>${formData.fromCity}到${formData.toCity}的${calculatedDays.value}天行程计划</h1>
        <div class="pdf-meta">
          <div>行程日期: ${formatDate(formData.dateRange[0])} - ${formatDate(formData.dateRange[1])}</div>
          <div>预算: ¥${formData.budget.toFixed(2)}</div>
          <div>导出时间: ${new Date().toLocaleString('zh-CN')}</div>
        </div>
      </div>

      <div class="pdf-section">
        <h2>交通信息</h2>
        <div class="transport-info">
          <div class="transport-route">
            <div class="station">${planResult.value.transportEstimate.fromStation}</div>
            <div class="transport-arrow">
              <span class="transport-type">${getTransportTypeText(planResult.value.transportEstimate.type)}</span>
              <div class="arrow">→</div>
            </div>
            <div class="station">${planResult.value.transportEstimate.toStation}</div>
          </div>
          <div class="transport-details">
            <div class="detail-item">
              <span class="label">预计距离:</span>
              <span class="value">${planResult.value.transportEstimate.estimatedDistance.toFixed(1)} 公里</span>
            </div>
            <div class="detail-item">
              <span class="label">预计费用:</span>
              <span class="value">¥${planResult.value.transportEstimate.estimatedPrice.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>

      <div class="pdf-section">
        <h2>每日行程</h2>
        ${planResult.value.dailyRoutes.map(route => `
          <div class="day-plan">
            <h3>第 ${route.day} 天</h3>
            <div class="spots">
              ${route.spots.map((item, index) => `
                <div class="spot-item">
                  <div class="time">${item.assignedTimeSlot}</div>
                  <div class="spot-detail">
                    <div class="spot-name">${item.spot.name}</div>
                    <div class="spot-meta">
                      <span class="price">${item.spot.price > 0 ? `¥${item.spot.price}` : '免费'}</span>
                      <span class="rating">评分: ${item.spot.rating.toFixed(1)}</span>
                      <span class="sales">${item.spot.sales}人去过</span>
                    </div>
                    <div class="spot-tags">${item.spot.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}</div>
                  </div>
                </div>
              `).join('')}
            </div>
          </div>
        `).join('')}
      </div>

      <div class="pdf-footer">
        <p>感谢使用我们的旅行规划服务</p>
        <p>© ${new Date().getFullYear()} 旅行规划助手</p>
      </div>
    `

    exportContainer.innerHTML = content

    // 添加样式
    const style = document.createElement('style')
    style.innerHTML = `
      .export-container {
        font-family: 'PingFang SC', 'Microsoft YaHei', sans-serif;
        color: #333;
        line-height: 1.6;
        padding: 30px;
        box-sizing: border-box;
      }
      .pdf-header {
        text-align: center;
        margin-bottom: 30px;
        border-bottom: 2px solid #3a8ee6;
        padding-bottom: 20px;
      }
      .pdf-header h1 {
        font-size: 24px;
        color: #3a8ee6;
        margin-bottom: 15px;
      }
      .pdf-meta {
        display: flex;
        justify-content: center;
        gap: 30px;
        font-size: 14px;
        color: #666;
      }
      .pdf-section {
        margin-bottom: 30px;
        page-break-inside: avoid;
      }
      .pdf-section h2 {
        font-size: 20px;
        color: #3a8ee6;
        border-left: 4px solid #3a8ee6;
        padding-left: 10px;
        margin-bottom: 15px;
      }
      .transport-info {
        background: #f5f9ff;
        border-radius: 8px;
        padding: 20px;
      }
      .transport-route {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 15px;
        font-size: 18px;
        font-weight: bold;
      }
      .transport-arrow {
        display: flex;
        flex-direction: column;
        align-items: center;
        flex: 1;
      }
      .transport-type {
        background: #3a8ee6;
        color: white;
        padding: 3px 10px;
        border-radius: 4px;
        font-size: 14px;
        margin-bottom: 5px;
      }
      .transport-details {
        display: flex;
        justify-content: center;
        gap: 30px;
        font-size: 16px;
      }
      .detail-item {
        display: flex;
        gap: 8px;
      }
      .label {
        color: #666;
      }
      .value {
        font-weight: bold;
      }
      .day-plan {
        margin-bottom: 30px;
        page-break-inside: avoid;
      }
      .day-plan h3 {
        font-size: 18px;
        color: #3a8ee6;
        margin-bottom: 15px;
        padding-bottom: 5px;
        border-bottom: 1px dashed #ddd;
      }
      .spot-item {
        display: flex;
        margin-bottom: 15px;
        padding-bottom: 15px;
        border-bottom: 1px solid #eee;
      }
      .time {
        min-width: 80px;
        font-weight: bold;
        color: #3a8ee6;
      }
      .spot-detail {
        flex: 1;
      }
      .spot-name {
        font-weight: bold;
        margin-bottom: 5px;
        font-size: 16px;
      }
      .spot-meta {
        display: flex;
        gap: 15px;
        margin-bottom: 8px;
        font-size: 14px;
        color: #666;
      }
      .spot-tags {
        display: flex;
        flex-wrap: wrap;
        gap: 5px;
      }
      .tag {
        background: #ecf5ff;
        color: #3a8ee6;
        padding: 2px 8px;
        border-radius: 4px;
        font-size: 12px;
      }
      .pdf-footer {
        text-align: center;
        margin-top: 40px;
        padding-top: 20px;
        border-top: 1px solid #ddd;
        color: #999;
        font-size: 14px;
      }
    `
    exportContainer.appendChild(style)
    // ... 此处内容与exportToPDF中相同 ...

    const canvas = await html2canvas(exportContainer, {
      scale: 3,
      useCORS: true,
      logging: false,
      backgroundColor: '#ffffff'
    })

    canvas.toBlob((blob) => {
      saveAs(blob, `旅行计划_${formData.fromCity}到${formData.toCity}.png`)
      document.body.removeChild(exportContainer)
      loadingInstance.close()
      ElMessage.success('图片导出成功')
    })
  } catch (error) {
    console.error('导出图片失败:', error)
    ElMessage.error('导出图片失败，请稍后重试')
  }
}

// 导出为文本（优化内容）
const exportToText = () => {
  if (!planResult.value) {
    ElMessage.warning('没有可导出的行程')
    return
  }

  try {
    let content = `旅行计划：${formData.fromCity}到${formData.toCity}的${calculatedDays.value}天行程\n\n`

    // 添加行程概览
    content += `行程概览\n`
    content += `====================\n`
    content += `出发日期: ${formatDate(formData.dateRange[0])} 至 ${formatDate(formData.dateRange[1])}\n`
    content += `预算: ¥${formData.budget.toFixed(2)}\n`
    content += `出发城市: ${formData.fromCity}\n`
    content += `目的地: ${formData.toCity}\n\n`

    // 交通信息
    content += `交通信息\n`
    content += `====================\n`
    content += `出发站: ${planResult.value.transportEstimate.fromStation}\n`
    content += `到达站: ${planResult.value.transportEstimate.toStation}\n`
    content += `交通方式: ${getTransportTypeText(planResult.value.transportEstimate.type)}\n`
    content += `预计距离: ${planResult.value.transportEstimate.estimatedDistance.toFixed(1)} 公里\n`
    content += `预计费用: ¥${planResult.value.transportEstimate.estimatedPrice.toFixed(2)}\n\n`

    // 每日行程
    content += `每日行程\n`
    content += `====================\n`

    planResult.value.dailyRoutes.forEach(route => {
      content += `第 ${route.day} 天\n`
      content += `----------------------\n`

      route.spots.forEach(item => {
        content += `${item.assignedTimeSlot} ${item.spot.name}\n`
        content += `  - 价格: ${item.spot.price > 0 ? `¥${item.spot.price}` : '免费'}\n`
        content += `  - 评分: ${item.spot.rating.toFixed(1)}\n`
        content += `  - 标签: ${item.spot.tags.join(', ')}\n\n`
      })

      content += '\n'
    })

    // 添加页脚
    content += `\n导出时间: ${new Date().toLocaleString('zh-CN')}\n`
    content += `© ${new Date().getFullYear()} 旅行规划助手`

    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' })
    saveAs(blob, `旅行计划_${formData.fromCity}到${formData.toCity}.txt`)
    ElMessage.success('文本导出成功')
  } catch (error) {
    console.error('导出文本失败:', error)
    ElMessage.error('导出文本失败，请稍后重试')
  }
}
// // 导出为PDF
// const exportToPDF = async () => {
//   if (!planResult.value) {
//     ElMessage.warning('没有可导出的行程')
//     return
//   }
//
//   try {
//     // 显示加载提示
//     const loadingInstance = ElMessage({
//       type: 'info',
//       message: '正在生成PDF，请稍候...',
//       duration: 0
//     })
//
//     // 获取要导出的DOM元素
//     const element = document.querySelector('.result-container')
//
//     // 使用html2canvas将DOM元素转换为canvas
//     const canvas = await html2canvas(element, {
//       scale: 2, // 提高清晰度
//       useCORS: true, // 允许加载跨域图片
//       logging: false,
//       backgroundColor: '#ffffff'
//     })
//
//     // 计算PDF尺寸（A4纸，宽210mm，高根据内容自适应）
//     const imgWidth = 210
//     const pageHeight = 297
//     const imgHeight = canvas.height * imgWidth / canvas.width
//     let heightLeft = imgHeight
//     let position = 0
//
//     // 创建PDF文档
//     const pdf = new jsPDF('p', 'mm', 'a4')
//     const imgData = canvas.toDataURL('image/png')
//
//     // 添加标题
//     pdf.setFontSize(16)
//     pdf.text(`${formData.fromCity}到${formData.toCity}的${formData.maxDays}天行程`, 105, 15, { align: 'center' })
//
//     // 添加内容（可能需要分页）
//     pdf.addImage(imgData, 'PNG', 0, 30, imgWidth, imgHeight)
//     heightLeft -= pageHeight - 30
//
//     // 如果内容超过一页，添加新页面
//     while (heightLeft > 0) {
//       position = heightLeft - imgHeight
//       pdf.addPage()
//       pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight)
//       heightLeft -= pageHeight
//     }
//
//     // 保存PDF
//     pdf.save(`旅行计划_${formData.fromCity}到${formData.toCity}.pdf`)
//
//     // 关闭加载提示
//     loadingInstance.close()
//     ElMessage.success('PDF导出成功')
//   } catch (error) {
//     console.error('导出PDF失败:', error)
//     ElMessage.error('导出PDF失败，请稍后重试')
//   }
// }
//
// // 导出为图片
// const exportToImage = async () => {
//   if (!planResult.value) {
//     ElMessage.warning('没有可导出的行程')
//     return
//   }
//
//   try {
//     // 显示加载提示
//     const loadingInstance = ElMessage({
//       type: 'info',
//       message: '正在生成图片，请稍候...',
//       duration: 0
//     })
//
//     // 获取要导出的DOM元素
//     const element = document.querySelector('.result-container')
//
//     // 使用html2canvas将DOM元素转换为canvas
//     const canvas = await html2canvas(element, {
//       scale: 2, // 提高清晰度
//       useCORS: true, // 允许加载跨域图片
//       logging: false,
//       backgroundColor: '#ffffff'
//     })
//
//     // 转换为图片并下载
//     canvas.toBlob((blob) => {
//       saveAs(blob, `旅行计划_${formData.fromCity}到${formData.toCity}.png`)
//
//       // 关闭加载提示
//       loadingInstance.close()
//       ElMessage.success('图片导出成功')
//     })
//   } catch (error) {
//     console.error('导出图片失败:', error)
//     ElMessage.error('导出图片失败，请稍后重试')
//   }
// }
//
// // 导出为文本
// const exportToText = () => {
//   if (!planResult.value) {
//     ElMessage.warning('没有可导出的行程')
//     return
//   }
//
//   try {
//     // 构建文本内容
//     let content = `${formData.fromCity}到${formData.toCity}的${formData.maxDays}天行程\n\n`
//
//     // 添加交通信息
//     content += `城际交通:\n`
//     content += `出发: ${planResult.value.transportEstimate.fromStation}\n`
//     content += `到达: ${planResult.value.transportEstimate.toStation}\n`
//     content += `交通方式: ${getTransportTypeText(planResult.value.transportEstimate.type)}\n`
//     content += `预计距离: ${planResult.value.transportEstimate.estimatedDistance.toFixed(1)} 公里\n`
//     content += `预计费用: ¥${planResult.value.transportEstimate.estimatedPrice.toFixed(2)}\n\n`
//
//     // 添加每日行程
//     planResult.value.routes.forEach(route => {
//       content += `第 ${route.day} 天:\n`
//
//       route.spots.forEach(item => {
//         content += `${item.assignedTimeSlot}: ${item.spot.name}\n`
//         content += `  标签: ${item.spot.tags.join(', ')}\n`
//         content += `  价格: ${item.spot.price > 0 ? `¥${item.spot.price}` : '免费'}\n`
//         content += `  评分: ${item.spot.rating.toFixed(1)}\n`
//         content += `  销量: ${item.spot.sales}人去过\n\n`
//       })
//     })
//
//     // 创建Blob对象
//     const blob = new Blob([content], { type: 'text/plain;charset=utf-8' })
//
//     // 下载文件
//     saveAs(blob, `旅行计划_${formData.fromCity}到${formData.toCity}.txt`)
//
//     ElMessage.success('文本导出成功')
//   } catch (error) {
//     console.error('导出文本失败:', error)
//     ElMessage.error('导出文本失败，请稍后重试')
//   }
// }

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
.tag-groups {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 40px; /* 增加间距 */
  margin-bottom: 40px; /* 增加底部间距 */
  padding: 3px; /* 增加内边距 */
  background-color: #f9f9f9; /* 优化背景色 */
  border-radius: 16px; /* 增大圆角 */
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08); /* 增强阴影效果 */
  border: 1px solid #eaeaea; /* 添加边框 */
}

@media (max-width: 768px) {
  .tag-groups {
    grid-template-columns: 1fr;
  }
}

.tag-group {
  margin-bottom: 0px; /* 增加底部间距 */
  transition: all 0.2s ease;
  padding: 10px; /* 添加内边距 */
  background-color: white; /* 添加背景色 */
  border-radius: 12px; /* 添加圆角 */
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.04); /* 添加阴影 */
  width: 400px;
}

.tag-group:hover {
  transform: translateY(-5px); /* 增强悬停效果 */
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1); /* 增强悬停时阴影 */
}

.group-title {
  font-weight: 600;
  margin-bottom: 16px; /* 增加底部间距 */
  color: #333; /* 更改为更深的颜色 */
  font-size: 18px; /* 增大字体 */
  padding-bottom: 10px; /* 增加底部内边距 */
  border-bottom: 2px solid #e6f1ff; /* 保留底部边框 */
  position: relative; /* 添加定位 */
}

.group-title::after {
  content: '';
  position: absolute;
  bottom: -2px;
  left: 0;
  width: 50px; /* 短于整个边框 */
  height: 2px;
  background-color: #409EFF; /* 主题色 */
}

.selected-tags {
  margin-top: 40px; /* 增加顶部间距 */
  padding: 25px; /* 增加内边距 */
  background-color: #f0f7ff; /* 保留背景色 */
  border-radius: 16px; /* 增大圆角 */
  border-left: 5px solid #409EFF; /* 增粗左侧边框 */
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.06); /* 添加阴影 */
}

.selected-title {
  font-weight: 600;
  margin-bottom: 20px; /* 增加底部间距 */
  color: #333; /* 更改为更深的颜色 */
  font-size: 18px; /* 增大字体 */
  position: relative;
  display: inline-block;
  padding-bottom: 8px;
}

.selected-title::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 2px;
  background-color: #409EFF;
}

.tag-container {
  display: flex;
  flex-wrap: wrap;
  gap: 18px; /* 增加间距 */
}

.el-tag {
  cursor: pointer;
  padding: 12px 20px; /* 增加内边距 */
  font-size: 16px; /* 增大字体 */
  border-radius: 25px; /* 增大圆角 */
  transition: all 0.3s ease;
  width: 160px; /* 增加宽度 */
  text-align: center;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08); /* 增强阴影 */
  font-weight: 500; /* 增加字重 */
}

.el-tag:hover {
  transform: translateY(-5px); /* 增强悬停效果 */
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.12); /* 增强悬停时阴影 */
}
:root {
  --primary-color-rgb: 59, 130, 246; /* Tailwind 的 blue-500，对应 #3B82F6 */
}

.active-tag {
  background-color: var(--primary-color) !important;
  color: white !important;
  border-color: var(--primary-color) !important;
  box-shadow: 0 6px 16px rgba(var(--primary-color-rgb), 0.4) !important; /* 增强阴影 */
  font-weight: 600; /* 增加字重 */
}

.tag-weight {
  margin-bottom: 25px; /* 增加底部间距 */
  width: 100%; /* 调整宽度为100% */
  max-width: 400px; /* 设置最大宽度 */
  padding: 20px; /* 增加内边距 */
  background-color: white; /* 更改背景色 */
  border-radius: 12px; /* 增大圆角 */
  transition: all 0.3s ease;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.06); /* 添加阴影 */
  border: 1px solid #eaeaea; /* 添加边框 */
}

.tag-weight:hover {
  background-color: #f9f9f9; /* 调整悬停背景色 */
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.1); /* 增强悬停时阴影 */
}

.tag-name {
  display: block;
  margin-bottom: 15px; /* 增加底部间距 */
  font-weight: 600; /* 保持字重 */
  color: #333;
  width: 100%; /* 调整宽度 */
  text-align: left;
  font-size: 16px; /* 增大字体 */
}

/* 为el-select添加样式 */
.tag-group .el-select {
  width: 100%;
}

.tag-group .el-select .el-input__wrapper {
  padding: 10px 18px; /* 增加内边距 */
  border-radius: 12px; /* 增大圆角 */
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.06) !important; /* 增强阴影 */
  border: 1px solid #eaeaea; /* 添加边框 */
}

.tag-group .el-select .el-input__wrapper:hover {
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.1) !important; /* 增强悬停时阴影 */
}

/* 为el-form-item添加样式 */
.el-form-item__label {
  font-size: 18px; /* 增大标签字体 */
  font-weight: 600; /* 保持字重 */
  margin-bottom: 15px; /* 增加底部间距 */
  color: #333;
}

/* 为el-slider添加样式 */
.el-slider {
  margin-top: 15px; /* 增加顶部间距 */
}

.el-slider__runway {
  height: 10px; /* 增加滑块轨道高度 */
  border-radius: 5px; /* 增大圆角 */
}

.el-slider__bar {
  height: 10px; /* 与轨道高度一致 */
  border-radius: 5px; /* 增大圆角 */
}

.el-slider__button-wrapper {
  height: 28px; /* 增加按钮包装器高度 */
  width: 28px; /* 增加按钮包装器宽度 */
}

.el-slider__button {
  width: 24px; /* 增加按钮宽度 */
  height: 24px; /* 增加按钮高度 */
  border: 2px solid var(--primary-color); /* 保持边框 */
  box-shadow: 0 2px 8px rgba(var(--primary-color-rgb), 0.3); /* 添加阴影 */
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
  padding: 0 30px;
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