import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../components/Home.vue'
// import Website from '../components/Website.vue'
import Login from '../components/Login.vue'
import Basic from '../components/company/basic.vue'
import Company from '../components/company/Company.vue'
import Register from '../components/Register.vue'
import Stock from '../components/company/Stock.vue'
import Lrb from '../components/echarts/Lrb.vue'
import Analyze from '../components/company/Analyze.vue'
import Zcfzb from '../components/echarts/Zcfzb.vue'
import Xjllb from '../components/echarts/Xjllb.vue'
import Economies from '../components/echarts/Economies.vue'
import Paying from '../components/echarts/Paying.vue'
import Cost from '../components/echarts/Cost.vue'
import Profit from '../components/echarts/Profit.vue'

import stock2 from '../components/stock.vue'

import User from '../components/user/User.vue'
import UserInfo from '../components/user/UserInfo.vue'
import Comment from '../components/user/Comment.vue'

import Exam from '../components/echarts/exam.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
    // children: [{ path: 'website', component: Website }]
  },
  {
    path: '/login',
    component: Login
  },
  {
    path: '/basic',
    component: Basic,
    meta: {
      requireAuth: true
    }
  },
  {
    path: '/company',
    component: Company,
    meta: {
      requireAuth: true
    }
  },
  {
    path: '/register',
    component: Register
  },
  {
    path: '/stock',
    component: Stock,
    meta: {
      requireAuth: true
    }
  },
  {
    path: '/zcfzb',
    component: Zcfzb
  },
  {
    path: '/analyze',
    component: Analyze,
    meta: {
      requireAuth: true
    },
    // components: {
    //   default: Analyze,
    //   lrb: Lrb,
    //   zcfzb: Zcfzb
    // }
    children: [
      {
        path: '/analyze',
        // eslint-disable-next-line no-undef
        // name: 'lrb',
        components: { default: Lrb, lrb: Lrb, zcfzb: Zcfzb, xjllb: Xjllb, economies: Economies, paying: Paying, cost: Cost, profit: Profit, stock2: stock2 }
      }
      // {
      //   path: '/',
      //   components: { stock2: stock2 }
      // }
      // {
      //   path: '',
      //   // name: 'zcfzb',
      //   component: Zcfzb
      // }
    ]
  },
  {
    path: '/user',
    component: User,
    children: [
      {
        // 如果是页面的子页面，在路径之前不要加'/'
        path: 'userinfo',
        component: UserInfo
      },
      {
        // 如果是页面的子页面，在路径之前不要加'/'
        path: 'comment',
        component: Comment
      }
    ]
  },
  {
    path: '/stock89',
    component: stock2
  },
  {
    path: '/exam',
    component: Exam
  }
]

const router = new VueRouter({
  routes
})

export default router
router.beforeEach((to, from, next) => {
  if (to.meta.requireAuth) {
    // 判断该路由是否需要登录权限
    if (window.sessionStorage.getItem('token')) {
      // 判断本地是否存在token
      next()
    } else {
      // 未登录,跳转到登陆页面
      next({
        path: '/login'
      })
    }
  } else {
    next()
  }
})
