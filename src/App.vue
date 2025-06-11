<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { useRouter } from 'vue-router'
import { Histogram, UserFilled, Menu as MenuIcon, User, SwitchButton } from '@element-plus/icons-vue'
import { useUserStore } from './stores/user'
import { useSpotStore } from './stores/spots' // 添加这一行导入useSpotStore

const router = useRouter()
const userStore = useUserStore()
const showMobileMenu = ref(false)

// 监听路由变化关闭移动端菜单
router.afterEach(() => {
  showMobileMenu.value = false
})

// 监听滚动以显示/隐藏顶部导航栏
const isHeaderVisible = ref(true)
let lastScrollPosition = 0

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

const handleScroll = () => {
  const currentScrollPosition = window.scrollY
  if (currentScrollPosition < 0) return
  
  // 向下滚动超过50px时隐藏，向上滚动时显示
  if (Math.abs(currentScrollPosition - lastScrollPosition) < 50) return
  
  isHeaderVisible.value = currentScrollPosition < lastScrollPosition
  lastScrollPosition = currentScrollPosition
}

const handleLogout = () => {
  userStore.logout()
  router.push('/login')
}

// 监听路由变化，清理可能的错误状态
const routeListener = router.beforeEach((to, from, next) => {
  // 获取所有可能的store
  const spotStore = useSpotStore()
  // 可以添加其他store
  // const guideStore = useGuideStore()
  
  // 统一清理所有store的错误状态
  spotStore.clearErrors()
  spotStore.setFallbackMode(false)
  
  // 如果有其他store也需要清理
  // guideStore.clearErrors()
  
  next()
})

// 组件卸载前移除监听器
onBeforeUnmount(() => {
  routeListener()
})

</script>

<template>
  <div class="app-container">
    <header class="header" :class="{ 'header-hidden': !isHeaderVisible }">
      <div class="container header-content">
        <div class="logo">
          <el-icon><Histogram /></el-icon>
          <span class="logo-text">TourLink</span>
        </div>
        
        <!-- 桌面端导航 -->
        <nav class="nav desktop-nav">
          <a class="nav-item" :class="{ 'active': $route.path === '/' }" @click="router.push('/')">首页</a>
          <a class="nav-item" :class="{ 'active': $route.path.startsWith('/spots') }" @click="router.push('/spots')">热门景点</a>
          <a class="nav-item" :class="{ 'active': $route.path.startsWith('/plan') }" @click="router.push('/plan')">旅游规划</a>
          <a class="nav-item" :class="{ 'active': $route.path.startsWith('/guides') }" @click="router.push('/guides')">攻略大全</a>
          <a class="nav-item" :class="{ 'active': $route.path.startsWith('/profile') }" @click="userStore.isLoggedIn ? router.push('/profile') : router.push('/login')">个人中心</a>
        </nav>
        
        
        
        <!-- 在 user div 中替换现有内容 -->
        <div class="user">
          <template v-if="userStore.isLoggedIn">
            <el-dropdown>
              <div class="user-info">
                <el-avatar :size="32" :src="userStore.userInfo?.avatar" :icon="UserFilled" />
                <span class="user-name">{{ userStore.userInfo?.username }}</span>
              </div>
              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item @click="router.push('/profile')">
                    <el-icon><User /></el-icon>个人中心
                  </el-dropdown-item>
                  <el-dropdown-item @click="handleLogout">
                    <el-icon><SwitchButton /></el-icon>退出登录
                  </el-dropdown-item>
                </el-dropdown-menu>
              </template>
            </el-dropdown>
          </template>
          <template v-else>
            <el-button type="primary" @click="router.push('/login')">登录</el-button>
            <el-button type="primary" @click="router.push('/register')">注册</el-button>
          </template>
        </div>
      </div>
      
      
    </header>
    
    <main class="main-content">
      <router-view v-slot="{ Component }">
        <transition name="page" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </main>
  </div>
</template>

<style scoped>
.header {
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(10px);
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  position: fixed;
  width: 100%;
  top: 0;
  z-index: 100;
  transition: transform 0.3s ease;
}

.header-hidden {
  transform: translateY(-100%);
}

.header-content {
  display: flex;
  align-items: center;
  padding: 1rem 0;
}

.logo {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 1.5rem;
  color: var(--primary-color);
}

.logo-text {
  font-weight: bold;
}

.desktop-nav {
  flex: 1;
  display: flex;
  justify-content: center;
  gap: 2rem;
}
.nav-item {
  color: var(--text-regular);
  font-size: 1rem;
  transition: all 0.3s ease;
  position: relative;
  padding: 0.5rem 0;
  text-decoration: none; /* 添加这一行去掉下划线 */
}

.nav-item:hover,
.nav-item.active {
  color: var(--primary-color);
  font-weight: 500;
}



/* 在App.vue的<style>部分添加或修改 */
.user {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

/* 修改登录按钮样式 */
.user .el-button:first-of-type {
  background-color: var(--primary-color);
  color: white;
}
.user-name {
  font-size: 0.9rem;
  color: var(--text-regular);
}

.mobile-menu-btn {
  display: none;
}

.mobile-nav {
  display: none;
}

.main-content {
  padding-top: 80px; /* 头部固定后的偏移 */
  min-height: calc(100vh - 80px);
}

/* 响应式样式 */
@media screen and (max-width: 768px) {
  .desktop-nav {
    display: none;
  }

  .mobile-menu-btn {
    display: block;
    margin-left: auto;
    margin-right: 1rem;
  }

  .mobile-nav {
    display: flex;
    flex-direction: column;
    background: white;
    padding: 1rem;
    max-height: 0;
    overflow: hidden;
    transition: max-height 0.3s ease;
  }

  .mobile-nav.show {
    max-height: 300px;
  }

  .mobile-nav .nav-item {
    padding: 0.8rem 0;
  }

  .mobile-nav .nav-item:last-child {
    border-bottom: none;
  }

  .logo-text {
    display: none;
  }

  .user-name {
    display: none;
  }
}

@media (prefers-color-scheme: dark) {
  .header {
    background: rgba(26, 26, 26, 0.9);
  }

  .mobile-nav {
    background: var(--bg-color);
  }
}
</style>
