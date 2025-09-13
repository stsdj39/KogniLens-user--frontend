<template>
  <v-app id="inspire">
    <v-app-bar flat class="content-header">
      <v-container class="mx-auto d-flex align-center justify-center">
        <div class="me-15" style="width: 130px">
          <v-img
            :src="images[0].src"
            :alt="images[0].name"
            width="221"
            height="57"
            contain
            @click="$router.push('/home/article')"
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

        <v-responsive max-width="160" class="me-10">
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
        <!-- 登录注册 -->
        <v-menu 
          min-width="200px" 
          class="pl-10"
          :close-on-content-click="false"
          location="bottom end"
          offset="8"
        >
          <template v-slot:activator="{ props }">
            <v-btn icon v-bind="props">
              <v-avatar color="brown" size="30">
                <span class="text-h5">{{ user.initials }}</span>
              </v-avatar>
            </v-btn>
          </template>
          <v-card class="user-menu">
            <v-card-text>
              <div class="mx-auto text-center">
                <v-avatar color="brown">
                  <span class="text-h5">{{ user.initials }}</span>
                </v-avatar>
                <h3>{{ user.fullName }}</h3>
                <p class="text-caption mt-1">
                  {{ user.email }}
                </p>
                <div
                  v-for="userLink in userNavigationLinks"
                  :key="userLink.name"
                >
                  <v-divider class="my-3"> </v-divider>
                  <v-btn variant="text" rounded :to="userLink.route">
                    {{ userLink.name }}
                  </v-btn>
                </div>
              </div>
            </v-card-text>
          </v-card>
        </v-menu>
      </v-container>
    </v-app-bar>

    <v-main class="bg-grey-lighten-3 pt-16">
      <v-container>
        <v-row>
          <!-- 侧边栏 -->
          <!-- <v-col cols="2">
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
          </v-col> -->

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
    <!-- <GlobalLoading
      :loading="loadingStore.globalLoading"
      :text="loadingStore.globalLoadingText"
    /> -->
  </v-app>
</template>

<script setup lang="ts">
import type { NavigationLink, Image } from "../types";
import { useLoadingStore } from "../stores/loading";

// // 使用加载状态管理
// const loadingStore = useLoadingStore();
// 用户数据
const user = {
  initials: "JD",
  fullName: "John Doe",
  email: "john.doe@doe.com",
};
//图片
const images: Image[] = [
  {
    name: "KogniLens Logo",
    src: "/src/assets/images/logo.png",
  },
];
// 导航链接配置
const navigationLinks: NavigationLink[] = [
  { name: "科情推荐", route: "/home/article" },
  { name: "智能检索", route: "/analytics" },
  { name: "智能报告撰写", route: "/loading-demo" },
];
//侧边导航
// const sideNavigationLinks: NavigationLink[] = [
//   { name: "历史", route: "/personal/history" },
//   { name: "收藏", route: "/personal/favorites" },
//   { name: "设置", route: "/personal/settings" },
//   { name: "帮助", route: "/personal/help" },
// ];
// 用户导航
const userNavigationLinks: NavigationLink[] = [
  { name: "历史", route: "/personal/history" },
  { name: "收藏", route: "/personal/favorites" },
  { name: "设置", route: "/personal/settings" },
  { name: "帮助", route: "/personal/help" },
];
</script>

<style scoped lang="scss">
.content-header {
  position: fixed !important;
  top: 0 !important;
  left: 0;
  right: 0 !important;
  z-index: 1000 !important;
  width: 100% !important;
}
.user-menu {
  // 确保菜单有固定的最小宽度
  min-width: 200px !important;
  // 添加阴影效果
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15) !important;
  // 确保菜单内容不会溢出
  max-width: 250px;
  .v-card-text {
    padding: 16px;
  }
}

</style>