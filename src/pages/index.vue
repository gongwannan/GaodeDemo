<!--
 * @Author: your name
 * @Date: 2021-08-05 14:03:38
 * @LastEditTime: 2021-09-08 17:21:01
 * @LastEditors: gongwannan
 * @Description: 
 * @FilePath: \GaodeDemo\src\pages\index.vue
-->
<template>
  <div class="content">
    <Map></Map>
  </div>
</template>

<script lang="ts">
import Map from "../components/map.vue";
export default {
  setup(props: object) {},
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