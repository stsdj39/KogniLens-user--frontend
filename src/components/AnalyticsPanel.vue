<template>
  <v-card class="pa-4" elevation="2">
    <v-card-title class="text-h5 mb-4">
      <v-icon class="mr-2">mdi-chart-line</v-icon>
      数据分析面板
    </v-card-title>
    
    <v-card-text>
      <v-row>
        <v-col cols="12" md="6">
          <v-select
            v-model="selectedPeriod"
            :items="periodOptions"
            label="选择时间段"
            variant="outlined"
            density="compact"
          ></v-select>
        </v-col>
        <v-col cols="12" md="6">
          <v-btn 
            color="primary" 
            @click="refreshData"
            prepend-icon="mdi-refresh"
            block
            :disabled="loading"
          >
            <InlineLoading 
              v-if="loading"
              text="刷新中..."
              size="16"
              color="white"
            />
            <span v-else>刷新数据</span>
          </v-btn>
        </v-col>
      </v-row>
      
      <v-divider class="my-4"></v-divider>
      
      <div class="text-center">
        <h3 class="text-h6 mb-2">当前数据概览</h3>
        <p class="text-body-2 text-grey">
          时间段: {{ selectedPeriod }} | 最后更新: {{ lastUpdate }}
        </p>
      </div>
    </v-card-text>
  </v-card>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { BaseComponentProps, SelectOption } from '../types'

// 组件 Props 定义
interface AnalyticsPanelProps extends BaseComponentProps {
  defaultPeriod?: string
}

// Props 定义
const props = withDefaults(defineProps<AnalyticsPanelProps>(), {
  defaultPeriod: '本周',
  loading: false,
  disabled: false
})

// 响应式数据
const selectedPeriod = ref(props.defaultPeriod)
const lastUpdate = ref(new Date().toLocaleString())
const loading = ref(false)

// 时间段选项
const periodOptions: SelectOption[] = [
  { label: '今天', value: '今天' },
  { label: '本周', value: '本周' },
  { label: '本月', value: '本月' },
  { label: '本季度', value: '本季度' },
  { label: '今年', value: '今年' }
]

// 方法定义
const refreshData = async () => {
  loading.value = true
  try {
    // 模拟 API 调用
    await new Promise(resolve => setTimeout(resolve, 1000))
    lastUpdate.value = new Date().toLocaleString()
    console.log('数据已刷新')
  } finally {
    loading.value = false
  }
}
</script>
