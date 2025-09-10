<template>
  <v-overlay
    :model-value="loading"
    class="d-flex align-center justify-center"
    persistent
  >
    <div class="text-center">
      <v-progress-circular
        :color="color"
        :size="size"
        :width="width"
        indeterminate
      ></v-progress-circular>
      <div v-if="text" class="mt-4">
        <p class="text-h6 text-white">{{ text }}</p>
      </div>
    </div>
  </v-overlay>
</template>

<script setup lang="ts">
import type { BaseComponentProps } from "../types";

// 组件 Props 定义
interface GlobalLoadingProps extends BaseComponentProps {
  loading: boolean;
  text?: string;
  color?: string;
  size?: number | string;
  width?: number | string;
}

// Props 定义
const props = withDefaults(defineProps<GlobalLoadingProps>(), {
  loading: false,
  text: "加载中...",
  color: "primary",
  size: 64,
  width: 4,
});
</script>
