<template>
  <v-app id="inspire">
    <!-- 顶部导航栏 -->
    <v-app-bar flat>
      <v-container class="mx-auto d-flex align-center justify-center">
        <!-- 应用图标/Logo -->
        <v-avatar
          class="me-4"
          color="primary"
          size="32"
        >
          <v-icon>mdi-brain</v-icon>
        </v-avatar>

        <!-- 主导航链接 -->
        <v-btn
          v-for="link in navigationLinks"
          :key="link.name"
          :text="link.name"
          :to="link.route"
          variant="text"
          class="mx-1"
        ></v-btn>

        <v-spacer></v-spacer>

        <!-- 搜索框 -->
        <v-responsive max-width="200">
          <v-text-field
            v-model="searchQuery"
            density="compact"
            label="搜索..."
            rounded="lg"
            variant="solo-filled"
            flat
            hide-details
            single-line
            prepend-inner-icon="mdi-magnify"
            @input="handleSearch"
          ></v-text-field>
        </v-responsive>

        <!-- 用户菜单 -->
        <v-menu>
          <template v-slot:activator="{ props }">
            <v-avatar
              class="ml-4 cursor-pointer"
              color="secondary"
              size="32"
              v-bind="props"
            >
              <v-icon>mdi-account</v-icon>
            </v-avatar>
          </template>
          
          <v-list>
            <v-list-item
              v-for="item in userMenuItems"
              :key="item.title"
              :title="item.title"
              :prepend-icon="item.icon"
              @click="item.action"
            ></v-list-item>
          </v-list>
        </v-menu>
      </v-container>
    </v-app-bar>

    <!-- 主内容区域 -->
    <v-main class="bg-grey-lighten-4">
      <v-container fluid>
        <v-row>
          <!-- 左侧边栏 -->
          <v-col cols="12" md="3" lg="2" class="d-none d-md-block">
            <v-sheet rounded="lg" class="pa-2">
              <v-list rounded="lg">
                <!-- 主要功能列表 -->
                <v-list-subheader>主要功能</v-list-subheader>
                <v-list-item
                  v-for="item in sidebarItems"
                  :key="item.title"
                  :title="item.title"
                  :prepend-icon="item.icon"
                  :to="item.route"
                  link
                  rounded="lg"
                  class="mb-1"
                ></v-list-item>

                <v-divider class="my-3"></v-divider>

                <!-- 工具列表 -->
                <v-list-subheader>工具</v-list-subheader>
                <v-list-item
                  v-for="tool in toolItems"
                  :key="tool.title"
                  :title="tool.title"
                  :prepend-icon="tool.icon"
                  @click="tool.action"
                  link
                  rounded="lg"
                  class="mb-1"
                ></v-list-item>
              </v-list>
            </v-sheet>
          </v-col>

          <!-- 主内容区域 -->
          <v-col cols="12" md="9" lg="10">
            <v-sheet
              min-height="75vh"
              rounded="lg"
              class="pa-4"
            >
              <!-- 这里是路由视图，用于显示页面内容 -->
              <router-view />
            </v-sheet>
          </v-col>
        </v-row>
      </v-container>
    </v-main>

    <!-- 移动端底部导航 -->
    <v-bottom-navigation
      v-model="bottomNav"
      class="d-md-none"
      grow
    >
      <v-btn
        v-for="item in mobileNavItems"
        :key="item.value"
        :value="item.value"
        :to="item.route"
      >
        <v-icon>{{ item.icon }}</v-icon>
        <span>{{ item.title }}</span>
      </v-btn>
    </v-bottom-navigation>
  </v-app>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

// 定义接口类型
interface NavigationLink {
  name: string
  route: string
}

interface MenuItem {
  title: string
  icon: string
  route?: string
  action?: () => void
}

interface UserMenuItem {
  title: string
  icon: string
  action: () => void
}

interface MobileNavItem {
  title: string
  icon: string
  value: string
  route: string
}

// 响应式数据
const searchQuery = ref('')
const bottomNav = ref('dashboard')
const router = useRouter()

// 主导航链接
const navigationLinks: NavigationLink[] = [
  { name: '仪表板', route: '/' },
  { name: '数据分析', route: '/analytics' },
  { name: '用户管理', route: '/users' },
  { name: '设置', route: '/settings' }
]

// 侧边栏主要功能项
const sidebarItems: MenuItem[] = [
  { title: '仪表板', icon: 'mdi-view-dashboard', route: '/' },
  { title: '数据分析', icon: 'mdi-chart-line', route: '/analytics' },
  { title: '用户管理', icon: 'mdi-account-group', route: '/users' },
  { title: '报告', icon: 'mdi-file-chart', route: '/reports' },
  { title: '通知', icon: 'mdi-bell', route: '/notifications' }
]

// 工具项
const toolItems: MenuItem[] = [
  { title: '刷新数据', icon: 'mdi-refresh', action: () => handleRefresh() },
  { title: '导出数据', icon: 'mdi-download', action: () => handleExport() },
  { title: '帮助', icon: 'mdi-help-circle', action: () => handleHelp() }
]

// 用户菜单项
const userMenuItems: UserMenuItem[] = [
  { title: '个人资料', icon: 'mdi-account', action: () => handleProfile() },
  { title: '账户设置', icon: 'mdi-cog', action: () => handleSettings() },
  { title: '退出登录', icon: 'mdi-logout', action: () => handleLogout() }
]

// 移动端底部导航项
const mobileNavItems: MobileNavItem[] = [
  { title: '首页', icon: 'mdi-home', value: 'dashboard', route: '/' },
  { title: '分析', icon: 'mdi-chart-line', value: 'analytics', route: '/analytics' },
  { title: '用户', icon: 'mdi-account-group', value: 'users', route: '/users' },
  { title: '设置', icon: 'mdi-cog', value: 'settings', route: '/settings' }
]

// 方法定义
const handleSearch = () => {
  if (searchQuery.value.trim()) {
    console.log('搜索:', searchQuery.value)
    // TODO: 实现搜索功能
  }
}

const handleRefresh = () => {
  console.log('刷新数据')
  // TODO: 实现数据刷新功能
}

const handleExport = () => {
  console.log('导出数据')
  // TODO: 实现数据导出功能
}

const handleHelp = () => {
  console.log('打开帮助')
  // TODO: 实现帮助功能
}

const handleProfile = () => {
  router.push('/profile')
}

const handleSettings = () => {
  router.push('/settings')
}

const handleLogout = () => {
  console.log('用户退出登录')
  // TODO: 实现退出登录功能
}
</script>
