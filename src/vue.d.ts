/*
 * @Author: gongwannan
 * @Date: 2021-09-10 16:20:07
 * @LastEditTime: 2021-09-10 16:27:12
 * @LastEditors: gongwannan
 * @Description:
 * @FilePath: \GaodeDemo\src\vue.d.ts
 */
// vuex.d.ts
import { ComponentCustomProperties } from "@/vue";
import { Store } from "vuex";

declare module "@vue/runtime-core" {
  // declare your own store states
  interface State {
    orbital;
  }

  // provide typings for `this.$store`
  interface ComponentCustomProperties {
    $store: Store<State>;
  }
}
