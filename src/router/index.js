/*
 * @Descripttion:
 * @version:
 * @Author: gongwannan
 * @Date: 2021-06-18 09:08:20
 * @LastEditors: gongwannan
 * @LastEditTime: 2021-07-09 14:23:51
 */
// 本科 宗教
import { createRouter, createWebHashHistory } from 'vue-router'
import index from '@/pages/index.vue'
import pay from '@/pages/pay.vue'

const Router = createRouter({
  history: createWebHashHistory(),
  routes: [
    { path: '/', name: 'index', component: index },
    { path: '/pay', name: 'pay', component: pay },
  ]
})

export default Router