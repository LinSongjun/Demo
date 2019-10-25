import Vue from 'vue'
import Router from 'vue-router'
//一级路由
import Index from './views/index'
import Login from './views/Login'
import Register from './views/Register'
import Not from './views/Not'
//二级路由
import Home from './views/Home'
import Fundlist from './views/Fundlist'
import Infoshow from './views/Infoshow'

Vue.use(Router)

const router=  new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      redirect: '/index'
    },
    {
      path: '/index',
      name: 'index',
      component: Index,
      redirect: '/home',
      children: [
        { path: '/home', name: 'home', component: Home},
        { path: '/fundlist', name: 'fundlist', component: Fundlist},
        { path: '/infoshow', name: 'infoshow', component: Infoshow}
      ]
    },
    {
      path: '/home',
      name: 'home',
      component: Home
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/register',
      name: 'register',
      component: Register
    },
    {
      path: '*',
      component: Not
    }
  ]
})

router.beforeEach( (to, from, next) => {
  const isLogin = localStorage.token ? true : false
  if (to.path === '/login' || to.path === '/register') {
    next()
  } else {
    isLogin ? next() : next('/login')
  }
})

export default router
