<template>
  <a-input-password
    v-bind="{ ...$attrs }"
    :value="value"
    @update:value="(value:string) => $emit('update:value', value)"
    :placeholder="placeholder"
    :tag="Tag"
    class="ant-input-affix-wrapper-do_not_remember"
    :style="{ '--input-height': height }"
  >
    <template v-if="$slots.prefix" #prefix>
      <slot name="prefix"></slot>
    </template>
    <template v-if="$slots.suffix" #suffix>
      <slot name="suffix"></slot>
    </template>
    <template v-if="$slots.iconRender" #iconRender>
      <slot name="iconRender"></slot>
    </template>
  </a-input-password>
</template>

<script lang="tsx" setup>
import { type InputProps } from 'ant-design-vue'
import _Tag from './Tag.vue'
import { cloneDeep, set } from 'lodash-unified'

export interface Props {
  value?: string
  placeholder?: string
  fontSize?: string
  fontFamily?: string
  color?: string
  placeholderColor?: string
  height?: `${string}px`
}

const props = withDefaults(defineProps<Props>(), {
  value: '',
  type: 'password',
  placeholder: '',
  height: '30px'
})

const Tag = cloneDeep(_Tag)
set(Tag, ['props', 'fontSize', 'default'], props.fontSize)
set(Tag, ['props', 'fontFamily', 'default'], props.fontFamily)
set(Tag, ['props', 'color', 'default'], props.color)
set(Tag, ['props', 'placeholderColor', 'default'], props.placeholderColor)
</script>

<style lang="css">
.ant-input-affix-wrapper-do_not_remember {
  padding-top: 0;
  padding-bottom: 0;
}
.ant-input-do_not_remember {
  height: var(--input-height);
  padding: 0;
  border: none;
  border-radius: 0;
  background: none;
  outline: none;
}
</style>
