/*
 * @Description:
 * @version:
 * @Author: gongwannan
 * @Date: 2021-06-18 09:08:20
 * @LastEditors: gongwannan
 * @LastEditTime: 2021-08-30 15:07:49
 */
// 本科 宗教
import { createRouter, createWebHashHistory } from "vue-router";
import index from "@/pages/index.vue";

const Router = createRouter({
  history: createWebHashHistory(),
  routes: [{ path: "/", name: "index", component: index }],
});

export default Router;
