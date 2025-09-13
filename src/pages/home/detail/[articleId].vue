<template>
  <div class="detail-container">
    <div class="detail-content-header">模拟文章标题</div>
    <div class="detail-content-body">
      这里是模拟的文章内容，用于展示详情页面的主体部分。
      这里是模拟的文章内容，用于展示详情页面的主体部分。
      这里是模拟的文章内容，用于展示详情页面的主体部分。
      这里是模拟的文章内容，用于展示详情页面的主体部分。
      这里是模拟的文章内容，用于展示详情页面的主体部分。
      这里是模拟的文章内容，用于展示详情页面的主体部分。
      这里是模拟的文章内容，用于展示详情页面的主体部分。
      这里是模拟的文章内容，用于展示详情页面的主体部分。
      这里是模拟的文章内容，用于展示详情页面的主体部分。
      这里是模拟的文章内容，用于展示详情页面的主体部分。
      这里是模拟的文章内容，用于展示详情页面的主体部分。
      这里是模拟的文章内容，用于展示详情页面的主体部分。
      这里是模拟的文章内容，用于展示详情页面的主体部分。
      这里是模拟的文章内容，用于展示详情页面的主体部分。
      这里是模拟的文章内容，用于展示详情页面的主体部分。
      这里是模拟的文章内容，用于展示详情页面的主体部分。
      这里是模拟的文章内容，用于展示详情页面的主体部分。
      这里是模拟的文章内容，用于展示详情页面的主体部分。
      这里是模拟的文章内容，用于展示详情页面的主体部分。
      这里是模拟的文章内容，用于展示详情页面的主体部分。
      这里是模拟的文章内容，用于展示详情页面的主体部分。
      这里是模拟的文章内容，用于展示详情页面的主体部分。
      这里是模拟的文章内容，用于展示详情页面的主体部分。
      这里是模拟的文章内容，用于展示详情页面的主体部分。
      这里是模拟的文章内容，用于展示详情页面的主体部分。
      这里是模拟的文章内容，用于展示详情页面的主体部分。
      这里是模拟的文章内容，用于展示详情页面的主体部分。
    </div>
    <v-divider :thickness="3" class="mb-5"></v-divider>
    <div class="detail-content-recommend">
      <strong class="font-semibold">相关推荐：</strong>
      <ul class="list-none mt-5 recommendation-list">
        <li>如何做用户调研</li>
        <li>产品路线图实操</li>
        <li>设计体系落地经验</li>
      </ul>
    </div>
    <div class="detail-content-comment">
      <CommentArea />
    </div>
  </div>
</template>

<script setup lang="ts">
import CommentArea from "@/components/commen/commentArea.vue";
</script>

<style scoped lang="scss">
.detail-container {
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 50px;
  .detail-content-header {
    font-size: 24px;
    font-weight: 600;
    color: #333;
    text-align: left;
    margin-bottom: 20px;
  }
  .detail-content-body {
    font-size: 16px;
    font-weight: 400;
    color: #333;
    text-align: left;
    margin-bottom: 30px;
  }
  .detail-content-recommend {
    font-size: 16px;
    font-weight: 600;
    color: #333;
    text-align: left;

    margin-bottom: 20px;
    .recommendation-list {
      li {
        font-weight: 400 !important;
        margin-bottom: 1rem; // 相当于 gap-4 的效果
      }
    }
  }
  .detail-content-comment {
    margin-bottom: 20px;
  }
}
</style>