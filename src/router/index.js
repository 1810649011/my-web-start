import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'login',
      component: import('@/views/Login.vue')
    },
    {
      path: '/register',
      name: 'register',
      component: import('@/views/Register.vue')
    },
    {
      path: '/',
      name: 'home',
      component: import('@/views/HomeView.vue')
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('@/views/AboutView.vue'), // 路由懒加载
      meta: { requiresAuth: true } // 👈 标记需要登录才能访问
    },
    {
      path: '/todo',
      name: 'todo',
      component: () => import('@/views/Todo.vue'), // 路由懒加载
      meta: { requiresAuth: true } // 👈 标记需要登录才能访问
    },
    // 放在最后：匹配所有未定义路径
    { path: '/:pathMatch(.*)*', redirect: '/' }
  ]
})

// 全局前置守卫 —— 每次路由跳转前都会执行
router.beforeEach((to, from, next) => {
  // 假设你有一个判断用户是否登录的方法（比如从 localStorage 或 Pinia 获取）
  const isAuthenticated = !!localStorage.getItem('token')

  // 如果目标路由需要认证
  if (to.meta.requiresAuth && !isAuthenticated) {
    // 跳转到登录页，并带上原路径（用于登录后跳回）
    next({
      name: 'login',
      query: { redirect: to.fullPath }
    })
  } else if (to.name === 'login' && isAuthenticated) {
    // 已登录用户访问登录页，重定向到首页
    next({ name: 'home' })
  } else {
    // 其他情况正常放行
    next()
  }
})

export default router
