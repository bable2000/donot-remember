# donot-remember

使浏览器不记住密码

### 浏览器记住密码，能够提高浏览器的用户粘性；

- 现代浏览器都不再遵循标签属性设置，去忽略密码；
- 但这也存在一定的安全隐患：
  - 登录浏览器后，浏览器记住密码的密码，会同步到浏览器厂商的服务器；
  - 提供电脑的登录密码，就可以查看浏览器保存的所有账号密码；

### 如果产品确实有这方面的安全考虑，需要避开浏览器记住密码功能

- 市面上能搜索到的方法，有一下几种：
  - 通过标签属性设置，要求浏览器不记住密码，实验过失败；
  - 通过添加一个隐藏假密码输入框，骗过浏览器，实验过失败；
  - 通过把文本输入框的文字显示设置为\*，模拟密码输入框，存在浏览器兼容问题；
  - 通过 js 程序将文本输入框的文字替换为\*显示，模拟密码输入框，需要处理复杂粘贴退格删除等问题；
- 通过文本框模拟密码框，还存在被第三方输入法读取到密码的风险；
  - 真实的密码框输入时，系统会强行使用原生输入法;
  - 文本框可以输入汉字，密码框不能输入汉字；

### 如果既要使用原生密码输入框的安全便捷性，又要不被浏览器记住密码，可以使用本插件；

### Vue 自定义版本

```html
<template>
  <div class="el-input el-input--prefix el-input--suffix" style="width: 240px">
    <div class="el-input__wrapper" tabindex="-1">
      <span class="el-input__prefix"
        ><span class="el-input__prefix-inner">
          <el-icon class="el-input__icon"><User /></el-icon></span
      ></span>
      <DoNotRemember
        class="el-input__inner"
        v-model="value"
        :type="type"
        color="#606266"
        placeholder-color="#a8abb2"
        font-size="14px"
        font-family="sans-serif"
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
</template>

<script lang="ts" setup>
  import DoNotRemember from 'donot-remember'
  import { User, View, Hide } from '@element-plus/icons-vue'
  import { ref } from 'vue'

  const type = ref<'password' | 'text'>('password')
  const value = ref('ABC')
</script>
```

### ElementPlus 版本

```html
<template>
  <DnrElm
    v-model="value"
    color="#606266"
    placeholder-color="#a8abb2"
    font-size="14px"
    font-family="sans-serif"
    show-password
    clearable
    :prefix-icon="User"
    placeholder="请输入密码"
    style="width: 240px"
  ></DnrElm>
</template>

<script lang="ts" setup>
  import { User } from '@element-plus/icons-vue'
  // @ts-ignore
  import DnrElm from 'donot-remember/dist/element-plus'
  import { ref } from 'vue'

  const value = ref('ABC')
</script>
```

### AntDesignVue 版本

```html
<template>
  <DnrAntd
    v-model:value="value"
    allow-clear
    color="#606266"
    placeholder-color="#a8abb2"
    font-size="14px"
    font-family="sans-serif"
    placeholder="请输入密码"
    style="width: 240px"
  >
    <template #prefix>
      <user-outlined />
    </template>
  </DnrAntd>
</template>

<script lang="ts" setup>
  import { UserOutlined, InfoCircleOutlined } from '@ant-design/icons-vue'
  import DnrAntd from 'donot-remember/dist/antd-vue'
  import { ref } from 'vue'

  const value = ref('ABC')
</script>
```
