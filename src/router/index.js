import Vue from 'vue'
import VueRouter from 'vue-router'
import Guide from '../views/guide/guide.vue'
import List from '../views/list/list.vue'
import ListShow from '../views/list/listShow.vue'
import Column from '../views/list/column.vue'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Guide',
    component: Guide,
    meta: {
      title: '广西人社办事指南',
    },
  },
  {
    path: '/list',
    name: 'List',
    component: List,
    meta: {
      title: '公共服务事项办事指南',
    },
  },
  {
    path: '/column',
    name: 'Column',
    component: Column,
    meta: {
      title: '公共服务事项办事指南',
    },
  },
  {
    path: '/listShow',
    name: 'Show',
    component: ListShow,
    meta: {
      title: '详情',
    },
  },
]

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes,
})

export default router
