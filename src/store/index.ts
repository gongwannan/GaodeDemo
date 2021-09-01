/*
 * @Description:
 * @version:
 * @Author: gongwannan
 * @Date: 2021-06-18 09:25:07
 * @LastEditors: gongwannan
 * @LastEditTime: 2021-08-30 14:48:06
 */
import { createStore } from "vuex";
interface arg {
  name: string;
  value: any;
}

const store = createStore({
  state: {},
  getters: {},
  mutations: {
    changeSetting(state, { name, value }: arg) {
      if (name in state) {
        state[name] = value;
      }
    },
  },
  actions: {},
  modules: {},
});

export default store;
