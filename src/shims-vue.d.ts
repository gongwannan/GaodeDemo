/*
 * @Author: gongwannan
 * @Date: 2021-08-30 11:21:03
 * @LastEditTime: 2021-08-30 11:21:04
 * @LastEditors: gongwannan
 * @Description:
 * @FilePath: \gaodeDemo\src\shims-vue.d.ts
 */
declare module "*.vue" {
  import type { DefineComponent } from "vue";
  const component: DefineComponent<{}, {}, any>;
  export default component;
}
