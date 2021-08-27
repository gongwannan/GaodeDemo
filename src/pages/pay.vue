<!--
 * @Descripttion: 
 * @version: 
 * @Author: gongwannan
 * @Date: 2021-07-09 14:24:07
 * @LastEditors: gongwannan
 * @LastEditTime: 2021-07-09 14:44:56
-->
<template>
  <div>
    <!-- 密码输入框 -->
    <van-password-input :value="value" :focused="showKeyboard" @focus="showKeyboard = true" />
    <!-- 数字键盘 -->
    <van-number-keyboard v-model="value" :show="showKeyboard" @blur="showKeyboard = false" />
  </div>
</template>

<script>
import { PasswordInput, NumberKeyboard } from 'vant';
export default {
  components: [PasswordInput, NumberKeyboard],
  data () {
    return {
      amount: 0
    }
  }
}
</script>

<style scoped>
</style>