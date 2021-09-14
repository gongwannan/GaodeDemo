/*
 * @Description:
 * @version:
 * @Author: gongwannan
 * @Date: 2021-05-25 15:22:38
 * @LastEditors: gongwannan
 * @LastEditTime: 2021-09-14 10:18:40
 */
import { createApp } from "vue";
import mixin from "./common/mixin";
import App from "./App.vue";
import router from "./router/index";
import store from "./store/index";
import il8nPlugin from "./plugins/i18n";

import "./index.css";

createApp(App)
  .use(router)
  .use(il8nPlugin)
  .mixin(mixin)
  .use(store)
  .mount("#app");
