<template>
  <v-card class="mx-auto analytic-content" outlined>
    <!-- 加载状态 -->
    <PageLoading
      v-if="isLoading"
      :config="{
        text: '页面加载中...',
        size: 40,
        color: 'primary',
      }"
    />
    <!-- 分类选择器 -->
    <!-- <v-card-title>
      <v-select
        v-model="selectedCategoryId"
        :items="categories"
        item-title="name"
        item-value="id"
        label="选择分类"
        clearable
        @update:model-value="loadArticles"
      ></v-select>
    </v-card-title> -->

    <!-- 文章列表 -->
    <v-list :items="displayItems" lines="three" item-props>
      <template v-slot:title="{ item }">
        <div class="text-h6">{{ item.title }}</div>
      </template>
      <template v-slot:subtitle="{ item }">
        <div>{{ item.content }}</div>
        <div class="text-caption text-grey">
          {{ formatDate(item.publishTime) }}
        </div>
      </template>
    </v-list>
  </v-card>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import {
  MOCK_CATEGORIES,
  mockGetCategoriesResponse,
  mockGetArticlesByCategoryResponse,
} from "@/constants";
import type { ArticleCategory, Article } from "@/types";
import { useLoadingStore } from "@/stores/loading";
const loadingStore = useLoadingStore();
// 响应式数据
const isLoading = ref(false);
const selectedCategoryId = ref<number | null>(null);
const categories = ref<ArticleCategory[]>([]);
const articles = ref<Article[]>([]);

// 计算属性：格式化显示项
const displayItems = computed(() =>
  articles.value.map((article) => ({
    title: article.title,
    content: article.content,
    publishTime: article.publishTime,
    value: article.id,
  }))
);

// 加载分类
const loadCategories = async () => {
  isLoading.value = true;
  try {
    // 模拟API调用
    await new Promise((resolve) => setTimeout(resolve, 500));
    const response = mockGetCategoriesResponse();
    categories.value = response.data;
  } finally {
    isLoading.value = false;
  }
};

// 加载文章
const loadArticles = async () => {
  isLoading.value = true;
  try {
    // 模拟API调用
    await new Promise((resolve) => setTimeout(resolve, 300));
    const response = mockGetArticlesByCategoryResponse(
      selectedCategoryId.value || undefined
    );
    articles.value = response.data;
  } finally {
    isLoading.value = false;
  }
};

// 格式化日期
const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString("zh-CN");
};

// 组件挂载时加载数据
onMounted(() => {
  loadCategories();
  loadArticles(); // 初始加载所有文章
});
</script>

<style scoped lang="scss">
.analytic-card {
  height: 100%;
  min-height: 70vh; /* 确保至少占满页面区域 */
}
</style>
