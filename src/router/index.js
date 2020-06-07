import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/kaos',
    name: 'DetailKaos',
    component: () => import(/* webpackChunkName: "about" */ '../views/page/DetailKaos.vue')
  },
  {
    path: '/product/:slug',
    name: 'DetailProduk',
    props: true,
    component: () => import(/* webpackChunkName: "about" */ '../views/page/DetailProduk.vue')
  },
  {
    path: '/checkout',
    name: 'Checkout',
    props: true,
    component: () => import(/* webpackChunkName: "about" */ '../views/page/Checkout.vue')
  },
  {
    path: '/custom/kaos',
    name: 'CustomKaos',
    component: () => import(/* webpackChunkName: "about" */ '../views/custom/kaos/Kaos.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
