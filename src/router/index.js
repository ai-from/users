import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store'
import Auth from '../views/Auth.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Auth',
    component: Auth
  },
  {
    path: '/users',
    name: 'Users',
    component: () => import('@/views/Users')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  if(to.path !== '/' && store.getters.GET_ADMIN_STATUS === false) {
    next('/')
  } else {
    next()
  }
})

export default router
