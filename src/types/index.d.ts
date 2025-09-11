// ============================================================================
// 项目全局类型定义文件
// ============================================================================

// 基础类型定义
export interface BaseEntity {
  id: string | number
  createdAt: string
  updatedAt: string
}

//图片类型定义
export interface Image {
  name: string
  src: string
}

// ============================================================================
// 加载状态类型
// ============================================================================
export interface LoadingConfig {
  text?: string
  color?: string
  size?: number | string
  width?: number | string
}

export interface GlobalLoadingConfig extends LoadingConfig {
  persistent?: boolean
}

export interface PageLoadingConfig extends LoadingConfig {
  height?: string | number
  minHeight?: string | number
}

export interface InlineLoadingConfig extends LoadingConfig {
  center?: boolean
}
// ============================================================================
// 用户相关类型
// ============================================================================
export interface User extends BaseEntity {
  username: string
  email: string
  avatar?: string
  role: UserRole
  status: UserStatus
  profile?: UserProfile
}

export interface UserProfile {
  firstName: string
  lastName: string
  phone?: string
  address?: string
  bio?: string
}

export type UserRole = 'admin' | 'user' | 'moderator'
export type UserStatus = 'active' | 'inactive' | 'suspended'

// ============================================================================
// 导航和路由类型
// ============================================================================
export interface NavigationLink {
  name: string
  route: string
  icon?: string
  children?: NavigationLink[]
}

export interface MenuItem {
  title: string
  icon: string
  route?: string
  action?: () => void
  children?: MenuItem[]
}

// ============================================================================
// 组件 Props 类型
// ============================================================================
export interface BaseComponentProps {
  loading?: boolean
  disabled?: boolean
  variant?: 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info'
}

export interface CardProps extends BaseComponentProps {
  title?: string
  subtitle?: string
  elevation?: number
  outlined?: boolean
}

export interface ButtonProps extends BaseComponentProps {
  text?: string
  size?: 'small' | 'default' | 'large'
  block?: boolean
  icon?: string
}

// ============================================================================
// API 相关类型
// ============================================================================
export interface ApiResponse<T = any> {
  code: number
  msg: string
  data: T
}

export interface ApiError {
  message: string
  code: number
  details?: any
}

export interface PaginationParams {
  page: number
  limit: number
  sortBy?: string
  sortOrder?: 'asc' | 'desc'
}

export interface PaginationResponse<T> {
  items: T[]
  total: number
  page: number
  limit: number
  totalPages: number
}

// ============================================================================
// 表单和验证类型
// ============================================================================
export interface FormField {
  name: string
  label: string
  type: 'text' | 'email' | 'password' | 'number' | 'select' | 'textarea'
  required?: boolean
  placeholder?: string
  options?: SelectOption[]
  validation?: ValidationRule[]
}

export interface SelectOption {
  label: string
  value: string | number
  disabled?: boolean
}

export interface ValidationRule {
  type: 'required' | 'email' | 'minLength' | 'maxLength' | 'pattern'
  value?: any
  message: string
}

export interface FormState {
  values: Record<string, any>
  errors: Record<string, string>
  touched: Record<string, boolean>
  isValid: boolean
  isSubmitting: boolean
}

// ============================================================================
// 数据分析和统计类型
// ============================================================================
export interface Statistic {
  title: string
  value: string | number
  icon: string
  color: string
  trend?: number
  unit?: string
}

export interface ChartData {
  labels: string[]
  datasets: ChartDataset[]
}

export interface ChartDataset {
  label: string
  data: number[]
  backgroundColor?: string | string[]
  borderColor?: string
  borderWidth?: number
}

// ============================================================================
// 通知和消息类型
// ============================================================================
export interface Notification {
  id: string
  title: string
  message: string
  type: 'success' | 'warning' | 'error' | 'info'
  timestamp: string
  read: boolean
  action?: {
    label: string
    handler: () => void
  }
}

// ============================================================================
// 布局和主题类型
// ============================================================================
export interface ThemeConfig {
  primary: string
  secondary: string
  accent: string
  error: string
  warning: string
  info: string
  success: string
}

export interface LayoutConfig {
  sidebarCollapsed: boolean
  theme: 'light' | 'dark'
  primaryColor: string
}

// ============================================================================
// 事件类型
// ============================================================================
export interface CustomEvent<T = any> {
  type: string
  payload: T
  timestamp: number
}

// ============================================================================
// 工具类型
// ============================================================================
export type Nullable<T> = T | null
export type Optional<T> = T | undefined
export type RecursivePartial<T> = {
  [P in keyof T]?: T[P] extends (infer U)[]
  ? RecursivePartial<U>[]
  : T[P] extends object
  ? RecursivePartial<T[P]>
  : T[P]
}

// ============================================================================
// 组件事件类型
// ============================================================================
export interface ComponentEmits {
  'update:modelValue': [value: any]
  'change': [value: any]
  'click': [event: MouseEvent]
  'submit': [data: any]
  'cancel': []
  'delete': [id: string | number]
  'edit': [item: any]
}

// ============================================================================
// 状态管理类型 (Pinia)
// ============================================================================
export interface AppState {
  user: User | null
  theme: ThemeConfig
  layout: LayoutConfig
  notifications: Notification[]
  loading: boolean
}

// ============================================================================
// 路由元信息类型
// ============================================================================
export interface RouteMeta {
  title?: string
  requiresAuth?: boolean
  roles?: UserRole[]
  layout?: string
  icon?: string
}

// ============================================================================
// 文章和内容管理类型
// ============================================================================

// 文章分类类型
export interface ArticleCategory {
  id: number
  name: string
}

// 文章类型
export interface Article {
  id: number
  title: string
  content: string
  kgStructure: string
  publishTime: string
}

// 文章查询参数
export interface ArticleQueryParams {
  categoryId?: number
}
