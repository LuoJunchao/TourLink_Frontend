import { createApp } from 'vue'
import { createPinia } from 'pinia'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import router from './router'
import App from './App.vue'
import './style.css'

const app = createApp(App)

// 注册所有图标
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

app.use(createPinia())
app.use(router)
app.use(ElementPlus)
app.mount('#app')

// 添加全局错误处理
app.config.errorHandler = (err, instance, info) => {
  console.error('全局错误:', err)
  console.log('错误组件:', instance)
  console.log('错误信息:', info)
  
  // 可以在这里添加错误上报逻辑
  
  // 获取store并设置错误状态
  const spotStore = useSpotStore()
  spotStore.error = true
  spotStore.errorMessage = err.message || '应用发生未知错误'
}
