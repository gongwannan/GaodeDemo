/*
 * @Author: gongwannan
 * @Date: 2021-09-10 17:32:39
 * @LastEditTime: 2021-09-14 10:12:07
 * @LastEditors: gongwannan
 * @Description:
 * @FilePath: \GaodeDemo\src\plugins\i18n.js
 */
export default {
  install: (app, options) => {
    app.config.globalProperties.$translate = key => {
      return key.split('.').reduce((o, i) => {
        if (o) return o[i]
      }, options)
    }
    app.provide('i18n', options)
    app.directive('v-translate', {
      mounted(el, binding, vnode, prevNode) {
        el.value
      },
    })
    app.mixin({
      created() {
        console.log('Translate plugins init')
      }
    })
  }
};