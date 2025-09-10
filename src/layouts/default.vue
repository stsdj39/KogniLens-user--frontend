<template>
  <v-app id="inspire">
    <v-app-bar flat>
      <v-container class="mx-auto d-flex align-center justify-center">
        <div class="me-15" style="width: 130px">
          <v-img
            :src="images[0].src"
            :alt="images[0].name"
            width="221"
            height="57"
            contain
            @click="$router.push('/')"
          ></v-img>
        </div>
        <v-btn
          v-for="link in navigationLinks"
          :key="link.name"
          :text="link.name"
          :to="link.route"
          variant="text"
        ></v-btn>

        <v-spacer></v-spacer>

        <v-responsive max-width="160">
          <v-text-field
            density="compact"
            label="搜索"
            rounded="lg"
            variant="solo-filled"
            flat
            hide-details
            single-line
          ></v-text-field>
        </v-responsive>
        <v-avatar class="ml-10" color="grey-darken-1" size="32"></v-avatar>
      </v-container>
    </v-app-bar>

    <v-main class="bg-grey-lighten-3">
      <v-container>
        <v-row>
          <v-col cols="2">
            <v-sheet rounded="lg">
              <v-list rounded="lg">
                <v-list-item
                  v-for="sideLink in sideNavigationLinks"
                  :key="sideLink.name"
                  :title="sideLink.name"
                  :to="sideLink.route"
                  link
                ></v-list-item>

                <v-divider class="my-2"></v-divider>

                <v-list-item
                  color="grey-lighten-4"
                  title="Refresh"
                  link
                ></v-list-item>
              </v-list>
            </v-sheet>
          </v-col>

          <v-col>
            <v-sheet min-height="70vh" rounded="lg">
              <!-- 页面内容区域，显示通过组件组装的页面 -->
              <router-view />
            </v-sheet>
          </v-col>
        </v-row>
      </v-container>
    </v-main>

    <!-- 全局加载组件 -->
    <GlobalLoading
      :loading="loadingStore.globalLoading"
      :text="loadingStore.globalLoadingText"
    />
  </v-app>
</template>

<script setup lang="ts">
import type { NavigationLink, Image } from "../types";
import { useLoadingStore } from "../stores/loading";

// 使用加载状态管理
const loadingStore = useLoadingStore();

//图片
const images: Image[] = [
  {
    name: "KogniLens Logo",
    src: "/src/assets/images/logo.png",
  },
];
// 导航链接配置
const navigationLinks: NavigationLink[] = [
  { name: "科情推荐", route: "/" },
  { name: "Analytics", route: "/analytics" },
  { name: "Loading Demo", route: "/loading-demo" },
  { name: "TS Demo", route: "/typescript-demo" },
];
//侧边导航
const sideNavigationLinks: NavigationLink[] = [
  { name: "历史", route: "/personal/history" },
  { name: "收藏", route: "/personal/favorites" },
  { name: "设置", route: "/personal/settings" },
  { name: "帮助", route: "/personal/help" },
];
</script>
