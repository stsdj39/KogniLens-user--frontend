<template>
  <div>
    <!-- 页面标题组件 -->
    <div class="mb-4">
      <h1 class="text-h4 font-weight-bold mb-2">数据分析</h1>
      <p class="text-body-1 text-grey">查看和分析您的数据统计</p>
    </div>

    <!-- HelloWorld 组件 -->
    <div class="mb-6">
      <HelloWorld />
    </div>

    <!-- 分析面板组件 -->
    <div class="mb-6">
      <AnalyticsPanel />
    </div>

    <!-- AppFooter 组件 -->
    <AppFooter />
  </div>
</template>

<script setup lang="ts">
// 页面文件只负责组装组件，不包含具体业务逻辑
// 所有具体功能都应封装在各个组件中：
// - HelloWorld: 欢迎信息组件
// - AnalyticsPanel: 数据分析面板组件  
// - AppFooter: 页脚组件
</script>
