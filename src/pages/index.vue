<!--
 * @Author: your name
 * @Date: 2021-08-05 14:03:38
 * @LastEditTime: 2021-09-01 09:10:07
 * @LastEditors: gongwannan
 * @Description: 
 * @FilePath: \gaodeDemo\src\pages\index.vue
-->
<template>
  <div class="content">
    <Map></Map>
  </div>
</template>

<script>
import Map from "../components/map.vue";
export default {
  components: { Map },
  data() {
    return {};
  },
  methods: {},
  async created() {},
};
</script>

<style lang="sass" scoped>
.content
  height: 100vh
  width: 100vw
</style>