/*
 * @Descripttion: 
 * @version: 
 * @Author: gongwannan
 * @Date: 2021-05-25 15:22:38
 * @LastEditors: gongwannan
 * @LastEditTime: 2021-06-18 09:26:27
 */
import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index'
import store from './store/index'

import './index.css'

createApp(App).use(router).use(store).mount('#app')
