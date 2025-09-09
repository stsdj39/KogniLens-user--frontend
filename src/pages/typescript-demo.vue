<template>
  <div>
    <!-- 页面标题 -->
    <div class="mb-6">
      <h1 class="text-h4 font-weight-bold mb-2">TypeScript 示例页面</h1>
      <p class="text-body-1 text-grey">演示项目中的 TypeScript 类型使用</p>
    </div>

    <!-- 统计卡片组件 -->
    <div class="mb-6">
      <StatisticsCards :statistics="mockStatistics" />
    </div>

    <!-- 分析面板组件 -->
    <div class="mb-6">
      <AnalyticsPanel 
        :loading="panelLoading"
        default-period="本月"
      />
    </div>

    <!-- 用户信息示例 -->
    <div class="mb-6">
      <v-card class="pa-4" elevation="2">
        <v-card-title>用户信息示例</v-card-title>
        <v-card-text>
          <pre class="text-body-2">{{ JSON.stringify(mockUser, null, 2) }}</pre>
        </v-card-text>
      </v-card>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { User, Statistic } from '../types'

// 页面状态
const panelLoading = ref(false)

// 模拟用户数据
const mockUser: User = {
  id: '1',
  username: 'john_doe',
  email: 'john@example.com',
  avatar: 'https://example.com/avatar.jpg',
  role: 'admin',
  status: 'active',
  createdAt: '2024-01-01T00:00:00Z',
  updatedAt: '2024-01-01T00:00:00Z',
  profile: {
    firstName: 'John',
    lastName: 'Doe',
    phone: '+1234567890',
    bio: '全栈开发工程师'
  }
}

// 模拟统计数据
const mockStatistics: Statistic[] = [
  {
    title: '总用户数',
    value: 2847,
    icon: 'mdi-account-group',
    color: 'primary',
    trend: 12,
    unit: '%'
  },
  {
    title: '活跃项目',
    value: 156,
    icon: 'mdi-folder-multiple',
    color: 'success',
    trend: 8,
    unit: '%'
  },
  {
    title: '本月收入',
    value: '¥45,920',
    icon: 'mdi-currency-cny',
    color: 'warning',
    trend: -3,
    unit: '%'
  },
  {
    title: '系统负载',
    value: '68%',
    icon: 'mdi-speedometer',
    color: 'info',
    trend: 5,
    unit: '%'
  }
]
</script>
