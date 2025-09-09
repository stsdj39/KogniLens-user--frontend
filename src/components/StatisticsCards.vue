<template>
  <v-row>
    <v-col
      v-for="stat in statistics"
      :key="stat.title"
      cols="12"
      sm="6"
      md="3"
    >
      <v-card class="pa-4 text-center" elevation="2">
        <v-icon 
          :color="stat.color" 
          size="40" 
          class="mb-2"
        >
          {{ stat.icon }}
        </v-icon>
        <h3 class="text-h5 font-weight-bold mb-1">{{ stat.value }}</h3>
        <p class="text-body-2 text-grey">{{ stat.title }}</p>
        <v-chip 
          v-if="stat.trend !== undefined"
          :color="stat.trend > 0 ? 'success' : 'error'"
          size="small"
          variant="outlined"
        >
          <v-icon start size="12">
            {{ stat.trend > 0 ? 'mdi-trending-up' : 'mdi-trending-down' }}
          </v-icon>
          {{ Math.abs(stat.trend) }}{{ stat.unit || '%' }}
        </v-chip>
      </v-card>
    </v-col>
  </v-row>
</template>

<script setup lang="ts">
import type { BaseComponentProps, Statistic } from '../types'

// 组件 Props 定义
interface StatisticsCardsProps extends BaseComponentProps {
  statistics: Statistic[]
}

// Props 定义
defineProps<StatisticsCardsProps>()
</script>
