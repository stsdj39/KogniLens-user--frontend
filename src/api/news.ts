import request from '@/utils/request'
import type { ApiResponse, ArticleCategory, Article, ArticleQueryParams } from '@/types'

/**
 * 获取文件分类接口
 * @returns Promise<ApiResponse<ArticleCategory[]>>
 */
export const getArticleCategories = (): Promise<ApiResponse<ArticleCategory[]>> => {
  return request.get('/categories')
}

/**
 * 获取分类文章接口
 * @param params 查询参数
 * @returns Promise<ApiResponse<Article[]>>
 */
export const getArticlesByCategory = (params?: ArticleQueryParams): Promise<ApiResponse<Article[]>> => {
  return request.get('/articles', { params })
}