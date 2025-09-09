# 项目设置文档 (Project Settings)

## 基本信息
- **项目名称**: KogniLens User Frontend
- **框架**: Vue 3 + TypeScript
- **UI库**: Vuetify 3
- **构建工具**: Vite
- **包管理器**: npm/yarn
- **代码风格**: ESLint

## 技术栈配置
- **Vue版本**: 3.x (Composition API)
- **TypeScript**: 启用
- **Vuetify版本**: 3.x
- **路由**: Vue Router 4
- **状态管理**: Pinia
- **CSS框架**: Tailwind CSS + Sass/SCSS
- **CSS预处理器**: Sass/SCSS

## 开发规范
### 组件开发
- 使用 Composition API (`<script setup>` 语法)
- 组件文件使用 PascalCase 命名
- 优先使用 Vuetify 组件而不是自定义样式
- 遵循 Vuetify 的设计系统和主题配置

### 代码结构
- `src/components/`: 可复用组件
- `src/layouts/`: 布局组件
- `src/pages/`: 页面组件
- `src/plugins/`: 插件配置 (包括 Vuetify)
- `src/router/`: 路由配置
- `src/stores/`: Pinia状态管理
- `src/styles/`: 全局样式和SCSS变量

### Vuetify 使用准则
- 优先使用 Vuetify 的内置组件 (v-btn, v-card, v-app-bar 等)
- 使用 Vuetify 的响应式栅格系统 (v-container, v-row, v-col)
- 遵循 Material Design 设计规范
- 使用 Vuetify 的主题系统进行颜色和样式管理
- 利用 Vuetify 的 spacing utilities (ma-, pa-, mt-, mb- 等)

### Tailwind CSS 使用准则
- 用于快速原型设计和自定义样式
- 与 Vuetify 组件配合使用，补充 Vuetify 未覆盖的样式需求
- 优先级：Vuetify组件 > Tailwind工具类 > 自定义CSS
- 使用 Tailwind 的响应式断点 (sm:, md:, lg:, xl:, 2xl:)
- 利用 Tailwind 的颜色系统和间距系统
- 避免与 Vuetify 的样式产生冲突，必要时使用 @apply 指令

### TypeScript 规范
- 为组件 props 定义明确的类型
- 使用接口定义数据模型
- 启用严格类型检查

## 重要提醒事项
1. **每次执行任务前必须先读取此设置文件**
2. 所有UI组件优先考虑使用Vuetify提供的组件
3. 使用 Tailwind CSS 进行快速样式调整和自定义设计
4. 样式优先级：Vuetify组件 > Tailwind工具类 > 自定义CSS
5. 保持代码的TypeScript类型安全
6. 遵循Vue 3 Composition API最佳实践
7. 确保响应式设计和移动端适配
4. 遵循Vue 3 Composition API最佳实践
5. 确保响应式设计和移动端适配

## 项目特定配置
- 主题色彩方案: (待定义)
- 国际化: (如需要)
- 权限管理: (如需要)
- API集成: (待配置)

---
**最后更新**: 2025年9月9日
**版本**: 1.0.0
