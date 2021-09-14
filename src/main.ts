/*
 * @Description:
 * @version:
 * @Author: gongwannan
 * @Date: 2021-05-25 15:22:38
 * @LastEditors: gongwannan
 * @LastEditTime: 2021-09-10 16:33:21
 */
import { createApp } from "vue";
import mixin from "./common/mixin";
import App from "./App.vue";
import router from "./router/index";
import store from "./store/index";

import "./index.css";

createApp(App).use(router).mixin(mixin).use(store).mount("#app");