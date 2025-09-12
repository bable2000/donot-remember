<template>
  <div style="width: 240px">
    <div class="el-input el-input--prefix el-input--suffix">
      <div class="el-input__wrapper" tabindex="-1">
        <span class="el-input__prefix"
          ><span class="el-input__prefix-inner">
            <el-icon class="el-input__icon"><Search /></el-icon></span
        ></span>
        <DoNotRemember
          class="el-input__inner"
          v-model="value"
          :type="type"
          color="#606266"
          placeholder-color="#a8abb2"
          font-size="14px"
          font-family="Arial"
          placeholder="请输入密码"
          style="width: 50%"
        ></DoNotRemember>
        <span class="el-input__suffix"
          ><span class="el-input__suffix-inner"
            ><el-icon class="el-input__icon el-input__password"
              ><Hide v-if="type === 'password'" @click="type = 'text'" />
              <View v-if="type === 'text'" @click="type = 'password'" /></el-icon></span
        ></span>
      </div>
    </div>

    <DnrElm
      v-model="value"
      color="#606266"
      placeholder-color="#a8abb2"
      font-size="14px"
      font-family="Arial"
      show-password
      clearable
      :prefix-icon="Search"
      :suffix-icon="Calendar"
      placeholder="请输入密码"
      @input="inputFn"
      @change="changeFn"
    ></DnrElm>

    <el-input
      v-model="value"
      show-password
      clearable
      :prefix-icon="Search"
      :suffix-icon="Calendar"
      placeholder="请输入密码"
      @input="inputFn"
      @change="changeFn"
    />
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import DoNotRemember from './DoNotRemember.vue'
import DnrElm from './DnrElm/index.vue'
import { Calendar, Search, View, Hide } from '@element-plus/icons-vue'

const type = ref<'password' | 'text'>('password')
const value = ref('123')
const inputFn = (val: string) => {
  console.log(val, 'inputFn')
}
const changeFn = (val: string) => {
  console.log(val, 'changeFn')
}
</script>
