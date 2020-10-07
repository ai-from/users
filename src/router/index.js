import Vue from 'vue'
import VueRouter from 'vue-router'
import Auth from '../views/Auth.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Auth',
    component: Auth,
    meta: {title: 'Auth'}
  },
  {
    path: '/users',
    name: 'Users',
    component: () => import('@/views/Users'),
    meta: {title: 'Users'}
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  let auth = localStorage.getItem('auth')
  if(to.path !== '/' && auth !== 'true') {
    next('/')
  } else {
    next()
  }
  document.title = to.meta.title
})

export default router
