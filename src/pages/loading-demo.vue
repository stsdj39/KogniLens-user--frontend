<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12">
        <h1 class="text-h4 mb-6">🔄 加载状态系统演示</h1>
        <v-alert
          type="info"
          variant="tonal"
          class="mb-6"
          icon="mdi-information"
        >
          <div class="font-weight-medium">加载状态系统说明</div>
          <div class="text-body-2 mt-2">
            本项目使用 Vuetify 的 v-progress-circular
            组件实现了完整的加载状态管理系统，
            包括全局加载、页面级加载和组件级内联加载。路由切换时会自动显示全局加载状态。
          </div>
        </v-alert>
      </v-col>
    </v-row>

    <!-- 全局加载演示 -->
    <v-row>
      <v-col cols="12">
        <v-card class="mb-6" elevation="2">
          <v-card-title class="d-flex align-center">
            <v-icon class="me-2" color="primary">mdi-earth</v-icon>
            全局加载状态
          </v-card-title>
          <v-card-text>
            <p class="text-body-1 mb-4">
              全局加载会覆盖整个应用界面，适用于路由切换、应用初始化等场景。
            </p>
            <div class="d-flex flex-wrap gap-3">
              <v-btn
                color="primary"
                :loading="globalDemoLoading"
                @click="triggerGlobalLoading"
                prepend-icon="mdi-rocket-launch"
              >
                触发全局加载 (3秒)
              </v-btn>
              <v-btn
                color="primary"
                variant="outlined"
                @click="triggerCustomGlobalLoading"
                prepend-icon="mdi-cog"
              >
                自定义加载文本
              </v-btn>
            </div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <!-- 页面加载演示 -->
    <v-row>
      <v-col cols="12">
        <v-card class="mb-6" elevation="2">
          <v-card-title class="d-flex align-center">
            <v-icon class="me-2" color="secondary">mdi-file-document</v-icon>
            页面加载状态
          </v-card-title>
          <v-card-text>
            <PageLoading
              v-if="pageLoadingVisible"
              :config="{
                text: '页面内容加载中...',
                size: 40,
                color: 'secondary',
              }"
              class="my-4"
            />
            <p class="text-body-1 mb-4">
              页面级加载适用于页面内容、数据表格、图表等大块内容的加载。
            </p>
            <v-btn
              color="secondary"
              :disabled="pageLoadingVisible"
              @click="triggerPageLoading"
              prepend-icon="mdi-refresh"
            >
              显示页面加载 (2秒)
            </v-btn>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <!-- 内联加载演示 -->
    <v-row>
      <v-col cols="12" md="6">
        <v-card class="mb-6" elevation="2">
          <v-card-title class="d-flex align-center">
            <v-icon class="me-2" color="success">mdi-content-save</v-icon>
            保存操作加载
          </v-card-title>
          <v-card-text>
            <InlineLoading
              v-if="saveLoading"
              :config="{ size: 20, text: '保存中...', color: 'success' }"
              class="my-2"
            />
            <v-btn
              color="success"
              :disabled="saveLoading"
              @click="triggerSaveLoading"
              prepend-icon="mdi-content-save"
            >
              保存数据
            </v-btn>
          </v-card-text>
        </v-card>
      </v-col>

      <v-col cols="12" md="6">
        <v-card class="mb-6" elevation="2">
          <v-card-title class="d-flex align-center">
            <v-icon class="me-2" color="warning">mdi-database</v-icon>
            数据处理加载
          </v-card-title>
          <v-card-text>
            <InlineLoading
              v-if="processLoading"
              :config="{ size: 30, text: '数据处理中...', color: 'warning' }"
              class="my-2"
            />
            <v-btn
              color="warning"
              :disabled="processLoading"
              @click="triggerProcessLoading"
              prepend-icon="mdi-cog"
            >
              处理数据
            </v-btn>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <!-- 多种尺寸演示 -->
    <v-row>
      <v-col cols="12">
        <v-card class="mb-6" elevation="2">
          <v-card-title class="d-flex align-center">
            <v-icon class="me-2" color="info">mdi-resize</v-icon>
            不同尺寸的加载状态
          </v-card-title>
          <v-card-text>
            <v-row>
              <v-col cols="12" md="4">
                <div class="text-center">
                  <div class="text-subtitle-2 mb-2">小型 (16px)</div>
                  <v-progress-circular
                    :size="16"
                    color="primary"
                    indeterminate
                  ></v-progress-circular>
                </div>
              </v-col>
              <v-col cols="12" md="4">
                <div class="text-center">
                  <div class="text-subtitle-2 mb-2">中型 (32px)</div>
                  <v-progress-circular
                    :size="32"
                    color="secondary"
                    indeterminate
                  ></v-progress-circular>
                </div>
              </v-col>
              <v-col cols="12" md="4">
                <div class="text-center">
                  <div class="text-subtitle-2 mb-2">大型 (48px)</div>
                  <v-progress-circular
                    :size="48"
                    color="success"
                    indeterminate
                  ></v-progress-circular>
                </div>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <!-- 代码示例 -->
    <v-row>
      <v-col cols="12">
        <v-card elevation="2">
          <v-card-title class="d-flex align-center">
            <v-icon class="me-2" color="purple">mdi-code-tags</v-icon>
            代码使用示例
          </v-card-title>
          <v-card-text>
            <v-tabs v-model="activeTab" color="primary">
              <v-tab value="global">全局加载</v-tab>
              <v-tab value="page">页面加载</v-tab>
              <v-tab value="inline">内联加载</v-tab>
              <v-tab value="store">Store 方法</v-tab>
            </v-tabs>

            <v-tabs-window v-model="activeTab" class="mt-4">
              <v-tabs-window-item value="global">
                <div class="bg-grey-lighten-4 pa-4 rounded">
                  <pre><code>// 使用全局加载状态
import { useLoadingStore } from '@/stores/loading'

const loadingStore = useLoadingStore()

// 手动控制
loadingStore.setGlobalLoading(true, '数据加载中...')
// 执行异步操作
await fetchData()
loadingStore.setGlobalLoading(false)

// 使用包装器自动管理
await loadingStore.withGlobalLoading(async () => {
  await fetchData()
}, '获取数据中...')</code></pre>
                </div>
              </v-tabs-window-item>

              <v-tabs-window-item value="page">
                <div class="bg-grey-lighten-4 pa-4 rounded">
                  <pre><code>&lt;!-- 页面加载组件使用 --&gt;
&lt;template&gt;
  &lt;div&gt;
    &lt;PageLoading
      v-if="isLoading"
      :config="{ 
        text: '页面加载中...', 
        size: 40,
        color: 'primary' 
      }"
    /&gt;
    &lt;!-- 页面内容 --&gt;
  &lt;/div&gt;
&lt;/template&gt;

&lt;script setup lang="ts"&gt;
import PageLoading from '@/components/PageLoading.vue'
import { ref } from 'vue'

const isLoading = ref(false)
&lt;/script&gt;</code></pre>
                </div>
              </v-tabs-window-item>

              <v-tabs-window-item value="inline">
                <div class="bg-grey-lighten-4 pa-4 rounded">
                  <pre><code>&lt;!-- 内联加载组件使用 --&gt;
&lt;template&gt;
  &lt;div&gt;
    &lt;InlineLoading
      v-if="isSaving"
      :config="{ 
        size: 20, 
        text: '保存中...',
        color: 'success' 
      }"
    /&gt;
    &lt;v-btn @click="save"&gt;保存&lt;/v-btn&gt;
  &lt;/div&gt;
&lt;/template&gt;

&lt;script setup lang="ts"&gt;
import InlineLoading from '@/components/InlineLoading.vue'
&lt;/script&gt;</code></pre>
                </div>
              </v-tabs-window-item>

              <v-tabs-window-item value="store">
                <div class="bg-grey-lighten-4 pa-4 rounded">
                  <pre><code>// Loading Store 可用方法
const loadingStore = useLoadingStore()

// 全局加载控制
loadingStore.setGlobalLoading(true, '加载中...')
loadingStore.setGlobalLoading(false)

// 页面级加载控制
loadingStore.setPageLoading('page-id', true, '页面加载中...')
loadingStore.getPageLoading('page-id')

// 组件级加载控制
loadingStore.setComponentLoading('comp-id', true, '组件加载中...')

// 包装器方法（推荐）
await loadingStore.withGlobalLoading(asyncFn, '加载文本')
await loadingStore.withPageLoading('page-id', asyncFn, '加载文本')</code></pre>
                </div>
              </v-tabs-window-item>
            </v-tabs-window>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <!-- 路由测试 -->
    <v-row>
      <v-col cols="12">
        <v-card class="mt-6" elevation="2">
          <v-card-title class="d-flex align-center">
            <v-icon class="me-2" color="info">mdi-navigation</v-icon>
            路由加载测试
          </v-card-title>
          <v-card-text>
            <p class="text-body-1 mb-4">
              点击以下链接测试路由切换时的自动全局加载状态：
            </p>
            <div class="d-flex flex-wrap gap-3">
              <v-btn
                color="info"
                to="/"
                variant="outlined"
                prepend-icon="mdi-home"
              >
                返回首页
              </v-btn>
              <v-btn
                color="info"
                to="/typescript-demo"
                variant="outlined"
                prepend-icon="mdi-language-typescript"
              >
                TypeScript 演示
              </v-btn>
            </div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useLoadingStore } from "@/stores/loading";
import PageLoading from "@/components/PageLoading.vue";
import InlineLoading from "@/components/InlineLoading.vue";

// 演示状态
const globalDemoLoading = ref(false);
const pageLoadingVisible = ref(false);
const saveLoading = ref(false);
const processLoading = ref(false);
const activeTab = ref("global");

const loadingStore = useLoadingStore();

// 触发全局加载演示
const triggerGlobalLoading = async () => {
  globalDemoLoading.value = true;

  await loadingStore.withGlobalLoading(async () => {
    // 模拟异步操作
    await new Promise((resolve) => setTimeout(resolve, 3000));
  }, "全局加载演示中...");

  globalDemoLoading.value = false;
};

// 触发自定义全局加载演示
const triggerCustomGlobalLoading = async () => {
  await loadingStore.withGlobalLoading(async () => {
    await new Promise((resolve) => setTimeout(resolve, 2000));
  }, "🚀 正在执行自定义操作...");
};

// 触发页面加载演示
const triggerPageLoading = () => {
  pageLoadingVisible.value = true;
  setTimeout(() => {
    pageLoadingVisible.value = false;
  }, 2000);
};

// 触发保存加载演示
const triggerSaveLoading = () => {
  saveLoading.value = true;
  setTimeout(() => {
    saveLoading.value = false;
  }, 1500);
};

// 触发处理加载演示
const triggerProcessLoading = () => {
  processLoading.value = true;
  setTimeout(() => {
    processLoading.value = false;
  }, 2500);
};
</script>

<style scoped>
.gap-3 {
  gap: 12px;
}

pre {
  overflow-x: auto;
  border-radius: 4px;
  margin: 0;
}

code {
  font-family: "Consolas", "Monaco", "Courier New", monospace;
  font-size: 0.875rem;
  color: #2d3748;
}
</style>
