<template>
  <div class="d-flex align-center justify-center" :style="containerStyle">
    <div class="text-center">
      <v-progress-circular
        :color="color"
        :size="size"
        :width="width"
        indeterminate
      ></v-progress-circular>
      <div v-if="text" class="mt-4">
        <p class="text-body-1 text-grey-darken-1">{{ text }}</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { BaseComponentProps } from '../types'

// 组件 Props 定义
interface PageLoadingProps extends BaseComponentProps {
  text?: string
  color?: string
  size?: number | string
  width?: number | string
  height?: string | number
  minHeight?: string | number
}

// Props 定义
const props = withDefaults(defineProps<PageLoadingProps>(), {
  text: '正在加载...',
  color: 'primary',
  size: 48,
  width: 3,
  height: '300px',
  minHeight: '200px'
})

// 计算容器样式
const containerStyle = computed(() => ({
  height: typeof props.height === 'number' ? `${props.height}px` : props.height,
  minHeight: typeof props.minHeight === 'number' ? `${props.minHeight}px` : props.minHeight
}))
</script>
