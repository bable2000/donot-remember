<template>
  <iframe
    ref="frameRef"
    class="el-input_inner"
    frameborder="0"
    :src="blobSrc"
    @load="frameLoad"
  ></iframe>
</template>

<script lang="ts" setup>
// @ts-ignore
import _srcDoc from './password.html?raw'
import { ref, useAttrs, watch } from 'vue'

export interface Props {
  modelValue: string
  type?: 'password' | 'text'
  placeholder?: string
  fontSize?: string
  fontFamily?: string
  color?: string
  placeholderColor?: string
}

export interface Emits {
  (e: 'update:model-value', value: any): void
  (e: 'compositionstart', value: any): void
  (e: 'compositionupdate', value: any): void
  (e: 'compositionend', value: any): void
  (e: 'input', value: any, event?: any): void
  (e: 'change', value: any, event?: any): void
  (e: 'keydown', event: any): void
  (e: 'focus', event: any): void
  (e: 'blur', event: any): void
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: '',
  type: 'password',
  placeholder: ''
})
const emits = defineEmits<Emits>()

let srcDoc: string = _srcDoc
for (const key in props) {
  if (Object.prototype.hasOwnProperty.call(props, key)) {
    srcDoc = srcDoc.replace(new RegExp(`--${key}`, 'g'), (props as any)[key] ?? '')
  }
}

const blob = new Blob([srcDoc], { type: 'text/html' })
const blobSrc = URL.createObjectURL(blob)

const frameRef = ref<HTMLIFrameElement>()
const inputRef = ref<HTMLInputElement>()
const frameLoad = () => {
  const documentRef = frameRef.value!.contentDocument
  inputRef.value = documentRef!.querySelector('#do-not-remember') as HTMLInputElement
  inputSetup(inputRef.value)
}
watch(
  () => props.modelValue,
  () => {
    if (inputRef.value) {
      inputRef.value.value = props.modelValue
    }
  }
)
watch(
  () => props.type,
  () => {
    if (inputRef.value) {
      inputRef.value.type = props.type
    }
  }
)
const inputSetup = (input: HTMLInputElement) => {
  input.value = props.modelValue
  input.addEventListener('compositionstart', (event) => {
    emits('compositionstart', event.data)
  })
  input.addEventListener('compositionupdate', (event) => {
    emits('compositionupdate', event.data)
  })
  input.addEventListener('compositionend', (event) => {
    emits('compositionend', event.data)
  })
  input.addEventListener('input', (event) => {
    emits('input', input.value, event)
    emits('update:model-value', input.value)
  })
  input.addEventListener('change', (event) => {
    emits('change', input.value, event)
  })
  input.addEventListener('keydown', (event) => {
    emits('keydown', new KeyboardEvent('', event))
  })
  input.addEventListener('focus', (event) => {
    emits('focus', new FocusEvent('', event))
  })
  input.addEventListener('blur', (event) => {
    emits('blur', new FocusEvent('', event))
  })
}
defineExpose({
  input: inputRef,
  focus() {
    inputRef.value?.focus?.()
  },
  blur() {
    inputRef.value?.blur?.()
  },
  clear() {
    emits('update:model-value', '')
    emits('change', '')
  }
})
</script>
