<!--
 * @Descripttion: 
 * @version: 
 * @Author: gongwannan
 * @Date: 2021-05-25 15:22:38
 * @LastEditors: gongwannan
 * @LastEditTime: 2021-06-18 09:47:12
-->
<template>
  <keep-alive>
    <router-view v-if="$route.meta.keepAlive"></router-view>
  </keep-alive>
  <router-view v-if="!$route.meta.keepAlive"></router-view>
</template>

<script>

export default {
  name: 'App',
  components: {}
}
</script>
