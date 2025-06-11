import { createRouter, createWebHistory } from 'vue-router'
import { useUserStore } from '../stores/user'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: () => import('../views/home/index.vue')
    },
    {
      path: '/spots',
      name: 'Spots',
      component: () => import('../views/spots/index.vue')
    },
    {
      path: '/spots/:id',
      name: 'SpotDetail',
      component: () => import('../views/spots/detail.vue')
    },
    {
      path: '/plan',
      name: 'Plan',
      component: () => import('../views/plan/index.vue')
    },
    {
      path: '/guides',
      name: 'Guides',
      component: () => import('../views/guides/index.vue')
    },
    {
      path: '/guides/edit/:id?',
      name: 'GuideEdit',
      component: () => import('../views/guides/edit.vue'),
      meta: { requiresAuth: true } // 添加路由元信息
    },
    {
      path: '/guides/:id',        // 详情路由放在后面
      name: 'GuideDetail',
      component: () => import('../views/guides/detail.vue')
    },
    // 在路由配置中添加requiresAuth元信息
    {
      path: '/profile',
      name: 'Profile',
      component: () => import('../views/profile/index.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/login',
      name: 'Login',
      component: () => import('../views/auth/login.vue')
    },
    {
      path: '/register',
      name: 'Register',
      component: () => import('../views/auth/register.vue')
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'NotFound',
      component: () => import('../views/NotFound.vue')
    }
  ]
})

router.beforeEach(async (to, from, next) => {
  const userStore = useUserStore()
  
  // 需要登录的路由
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth)

  if (requiresAuth && !userStore.isLoggedIn) {
    next('/login')
  } else if (to.path === '/login' && userStore.isLoggedIn) {
    next('/')
  } else {
    next()
  }
})


router.onError((error) => {
  console.error('路由错误:', error)
  // 只有在特定情况下才重定向
  if (error.type === 'chunk-load-error') {
    // 只有在代码分割加载失败等严重错误时才重定向
    router.push({
      name: 'Error',
      params: {
        errorMessage: '系统错误',
        errorDetails: error.message || '加载页面时发生错误'
      }
    })
  }
})

// 确保Error路由已添加
if (!router.hasRoute('Error')) {
  router.addRoute({
    path: '/error',
    name: 'Error',
    component: () => import('../views/Error.vue'),
    props: true
  })
}

export default router
