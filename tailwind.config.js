/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      // 可以在这里扩展 Tailwind 的默认主题
      colors: {
        // 可以添加自定义颜色，与 Vuetify 主题保持一致
      },
      spacing: {
        // 可以添加自定义间距
      },
    },
  },
  plugins: [],
  // 确保与 Vuetify 样式不冲突
  corePlugins: {
    preflight: false, // 禁用 Tailwind 的默认样式重置，避免与 Vuetify 冲突
  },
}