import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useLoadingStore = defineStore('loading', () => {
  // 全局加载状态
  const globalLoading = ref(false)
  const globalLoadingText = ref('加载中...')
  
  // 页面加载状态映射
  const pageLoadingMap = ref<Record<string, boolean>>({})
  const pageLoadingTextMap = ref<Record<string, string>>({})
  
  // 组件加载状态映射
  const componentLoadingMap = ref<Record<string, boolean>>({})
  
  /**
   * 设置全局加载状态
   */
  const setGlobalLoading = (loading: boolean, text?: string) => {
    globalLoading.value = loading
    if (text) {
      globalLoadingText.value = text
    }
  }
  
  /**
   * 设置页面加载状态
   */
  const setPageLoading = (pageKey: string, loading: boolean, text?: string) => {
    pageLoadingMap.value[pageKey] = loading
    if (text) {
      pageLoadingTextMap.value[pageKey] = text
    } else {
      delete pageLoadingTextMap.value[pageKey]
    }
    
    if (!loading) {
      delete pageLoadingMap.value[pageKey]
    }
  }
  
  /**
   * 设置组件加载状态
   */
  const setComponentLoading = (componentKey: string, loading: boolean) => {
    componentLoadingMap.value[componentKey] = loading
    if (!loading) {
      delete componentLoadingMap.value[componentKey]
    }
  }
  
  /**
   * 获取页面加载状态
   */
  const getPageLoading = (pageKey: string) => {
    return pageLoadingMap.value[pageKey] || false
  }
  
  /**
   * 获取页面加载文本
   */
  const getPageLoadingText = (pageKey: string) => {
    return pageLoadingTextMap.value[pageKey] || '正在加载...'
  }
  
  /**
   * 获取组件加载状态
   */
  const getComponentLoading = (componentKey: string) => {
    return componentLoadingMap.value[componentKey] || false
  }
  
  /**
   * 清除所有加载状态
   */
  const clearAllLoading = () => {
    globalLoading.value = false
    pageLoadingMap.value = {}
    pageLoadingTextMap.value = {}
    componentLoadingMap.value = {}
  }
  
  /**
   * 异步操作包装器 - 全局加载
   */
  const withGlobalLoading = async <T>(
    asyncFn: () => Promise<T>, 
    text?: string
  ): Promise<T> => {
    setGlobalLoading(true, text)
    try {
      return await asyncFn()
    } finally {
      setGlobalLoading(false)
    }
  }
  
  /**
   * 异步操作包装器 - 页面加载
   */
  const withPageLoading = async <T>(
    pageKey: string,
    asyncFn: () => Promise<T>,
    text?: string
  ): Promise<T> => {
    setPageLoading(pageKey, true, text)
    try {
      return await asyncFn()
    } finally {
      setPageLoading(pageKey, false)
    }
  }
  
  return {
    // 状态
    globalLoading,
    globalLoadingText,
    pageLoadingMap,
    pageLoadingTextMap,
    componentLoadingMap,
    
    // 方法
    setGlobalLoading,
    setPageLoading,
    setComponentLoading,
    getPageLoading,
    getPageLoadingText,
    getComponentLoading,
    clearAllLoading,
    withGlobalLoading,
    withPageLoading
  }
})
