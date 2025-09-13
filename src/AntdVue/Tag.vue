<template>
  <DoNotRemember
    ref="inputRef"
    class="ant-input ant-input-do_not_remember"
    v-bind="{ ...props, value: undefined }"
    :model-value="value"
    @input="(_, event) => emits('input', event)"
    @change="(_, event) => emits('change', event)"
    @keydown="(event) => emits('keydown', event)"
    @focus="(event) => emits('focus', event)"
    @blur="(event) => emits('blur', event)"
  ></DoNotRemember>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import DoNotRemember from '../DoNotRemember.vue'

export interface Props {
  value?: string
  type?: 'password' | 'text'
  placeholder?: string
  fontSize?: string
  fontFamily?: string
  color?: string
  placeholderColor?: string
}

export interface Emits {
  (e: 'compositionstart', event: any): void
  (e: 'compositionupdate', event: any): void
  (e: 'compositionend', event: any): void
  (e: 'input', event: any): void
  (e: 'change', event: any): void
  (e: 'keydown', event: any): void
  (e: 'focus', event: any): void
  (e: 'blur', event: any): void
}

const props = defineProps<Props>()
const emits = defineEmits<Emits>()
const inputRef = ref()

defineExpose({
  focus() {
    inputRef.value?.focus?.()
  },
  blur() {
    inputRef.value?.blur?.()
  },
  clear() {
    emits('input', new Event('', { target: { value: '' } } as any))
    emits('change', '')
  },
  cloneNode(arg: any) {
    return inputRef.value?.input?.cloneNode(arg)
  }
})
</script>
