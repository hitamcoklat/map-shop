import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/:alias',
    name: 'Home',
    props: true,
    component: Home,
    meta: {
      title: 'Nested - About Page - Example App'
    }    
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
    path: '/',
    name: 'HomeLandingPage',
    component: () => import(/* webpackChunkName: "about" */ '../views/HomeLandingPage.vue')
  },
  {
    path: '/home-kafe',
    name: 'HomeKafe',
    component: () => import(/* webpackChunkName: "about" */ '../views/HomeKafe.vue')
  },
  {
    path: '/p/buat-toko',
    name: 'BuatToko',
    component: () => import(/* webpackChunkName: "about" */ '../views/page/BuatToko.vue')
  },
  {
    path: '/p/login',
    name: 'Login',
    component: () => import(/* webpackChunkName: "about" */ '../views/page/Login.vue')
  },
  {
    path: '/p/manage',
    name: 'Manage',
    component: () => import(/* webpackChunkName: "about" */ '../views/page/Manage.vue')
  },
  {
    path: '/p/manage-produk',
    name: 'ManageProduk',
    component: () => import(/* webpackChunkName: "about" */ '../views/page/ManageProduk.vue')
  },
  {
    path: '/p/input-produk',
    name: 'InputProduk',
    component: () => import(/* webpackChunkName: "about" */ '../views/page/InputProduk.vue')
  },
  {
    path: '/p/input-category',
    name: 'InputCategory',
    component: () => import(/* webpackChunkName: "about" */ '../views/page/InputCategory.vue')
  },
  {
    path: '/p/list-produk',
    name: 'ListProduk',
    component: () => import(/* webpackChunkName: "about" */ '../views/page/ListProduk.vue')
  },
  {
    path: '/p/list-order',
    name: 'ListOrder',
    component: () => import(/* webpackChunkName: "about" */ '../views/page/ListOrder.vue')
  },
  {
    path: '/p/price-list',
    name: 'PriceList',
    component: () => import(/* webpackChunkName: "about" */ '../views/page/PriceList.vue')
  },
  {
    path: '/p/faq',
    name: 'Faq',
    component: () => import(/* webpackChunkName: "about" */ '../views/page/Faq.vue')
  },
  {
    path: '/p/setting-toko',
    name: 'SettingToko',
    component: () => import(/* webpackChunkName: "about" */ '../views/page/SettingToko.vue')
  },
  {
    path: '/:alias/product/:slug',
    name: 'DetailProduk',
    props: true,
    component: () => import(/* webpackChunkName: "about" */ '../views/page/DetailProduk.vue')
  },
  {
    path: '/:alias/checkout',
    name: 'Checkout',
    props: true,
    component: () => import(/* webpackChunkName: "about" */ '../views/page/Checkout.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router
