<template>
  <div 
    class="d-inline-flex align-center"
    :class="{ 'justify-center': center }"
  >
    <v-progress-circular
      :color="color"
      :size="size"
      :width="width"
      indeterminate
    ></v-progress-circular>
    <span v-if="text" class="ml-2 text-body-2">{{ text }}</span>
  </div>
</template>

<script setup lang="ts">
import type { BaseComponentProps } from '../types'

// 组件 Props 定义
interface InlineLoadingProps extends BaseComponentProps {
  text?: string
  color?: string
  size?: number | string
  width?: number | string
  center?: boolean
}

// Props 定义
const props = withDefaults(defineProps<InlineLoadingProps>(), {
  text: '',
  color: 'primary',
  size: 20,
  width: 2,
  center: false
})
</script>
