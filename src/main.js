import { createApp } from 'vue'
import { createPinia } from 'pinia'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import router from './router'
import App from './App.vue'
import './style.css'
import { useUserStore } from './stores/user'

const app = createApp(App)

// 注册所有图标
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

const pinia = createPinia()
app.use(pinia)
app.use(router)
app.use(ElementPlus)

// 在应用挂载前初始化用户状态
const initializeApp = async () => {
  const userStore = useUserStore()
  try {
    await userStore.initializeAuth()
    console.log('应用初始化完成')
  } catch (error) {
    console.error('应用初始化失败:', error)
  }
  app.mount('#app')
}

initializeApp()

/* // 开发环境下加载测试工具
if (import.meta.env.DEV) {
  import('./utils/auth-test.js')
} */

// 添加全局错误处理
app.config.errorHandler = (err, instance, info) => {
  console.error('全局错误:', err)
  console.log('错误组件:', instance)
  console.log('错误信息:', info)

  // 可以在这里添加错误上报逻辑
}
