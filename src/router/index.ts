/**
 * router/index.ts
 *
 * Automatic routes for `./src/pages/*.vue`
 */

// Composables
import { createRouter, createWebHistory } from "vue-router/auto";
import { setupLayouts } from "virtual:generated-layouts";
import { routes } from "vue-router/auto-routes";
import { useLoadingStore } from "@/stores/loading";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: setupLayouts(routes),
});

// 全局前置守卫
router.beforeEach(async (to, from, next) => {
  const loadingStore = useLoadingStore();

  // 如果是访问根路径，重定向到 /home/article
  if (to.path === "/") {
    next("/home/article");
    return;
  }

  // 只在路由真正发生变化时显示加载状态
  if (to.path !== from.path) {
    // 开始全局加载，根据目标路由显示不同的加载文本
    const loadingText = getLoadingTextByRoute(to.name as string);
    loadingStore.setGlobalLoading(true, loadingText);
  }

  next();
});

// 全局后置钩子
router.afterEach((to, from) => {
  const loadingStore = useLoadingStore();

  // 只在路由真正发生变化时关闭加载状态
  if (to.path !== from.path) {
    // 页面加载完成，延迟关闭加载状态以确保页面渲染完成
    setTimeout(() => {
      loadingStore.setGlobalLoading(false);
    }, 300); // 减少到300ms，提供更好的用户体验
  }
});

// 根据路由名称获取对应的加载文本
function getLoadingTextByRoute(routeName: string): string {
  const loadingTexts: Record<string, string> = {
    "/home/article": "正在加载首页...",
    "/analytics": "正在加载数据分析...",
    "/loading-demo": "正在加载演示页面...",
    "/typescript-demo": "正在加载示例页面...",
    "/profile": "正在加载个人资料...",
  };

  return loadingTexts[routeName] || "页面加载中...";
}

// 路由错误处理
router.onError((err, to) => {
  const loadingStore = useLoadingStore();

  // 发生错误时关闭加载状态
  loadingStore.setGlobalLoading(false);

  if (err?.message?.includes?.("Failed to fetch dynamically imported module")) {
    if (localStorage.getItem("vuetify:dynamic-reload")) {
      console.error("Dynamic import error, reloading page did not fix it", err);
    } else {
      console.log("Reloading page to fix dynamic import error");
      localStorage.setItem("vuetify:dynamic-reload", "true");
      location.assign(to.fullPath);
    }
  } else {
    console.error("Router error:", err);
  }
});

// Workaround for https://github.com/vitejs/vite/issues/11804
// 路由就绪后的处理
router.isReady().then(() => {
  localStorage.removeItem("vuetify:dynamic-reload");

  // 确保初始加载状态是关闭的
  const loadingStore = useLoadingStore();
  loadingStore.setGlobalLoading(false);
});

export default router;
