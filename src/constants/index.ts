import type { ArticleCategory, Article, ApiResponse } from '@/types'

// 模拟的文章分类（5 种类型）
export const MOCK_CATEGORIES: ArticleCategory[] = [
	{ id: 1, name: '技术' },
	{ id: 2, name: '产品' },
	{ id: 3, name: '设计' },
	{ id: 4, name: '数据' },
	{ id: 5, name: '生活' },
]

// 每个分类下模拟 2 篇文章，kgStructure 字段保持空字符串
export const MOCK_ARTICLES_MAP: Record<number, Article[]> = {
	1: [
		{
			articleId: 101,
			title: '前端性能优化实战',
			content: '文章内容：前端性能优化介绍...',
			kgStructure: '',
			publishTime: '2025-09-01T10:00:00Z',
		},
		{
			articleId: 102,
			title: 'TypeScript 深入指南',
			content: '文章内容：TypeScript 实践与注意点...',
			kgStructure: '',
			publishTime: '2025-09-02T10:00:00Z',
		},
	],
	2: [
		{
			articleId: 201,
			title: '如何做用户调研',
			content: '文章内容：用户调研方法与案例...',
			kgStructure: '',
			publishTime: '2025-08-21T09:00:00Z',
		},
		{
			articleId: 202,
			title: '产品路线图实操',
			content: '文章内容：构建与维护产品路线图...',
			kgStructure: '',
			publishTime: '2025-08-25T09:00:00Z',
		},
	],
	3: [
		{
			articleId: 301,
			title: '设计体系落地经验',
			content: '文章内容：设计体系的建设与管理...',
			kgStructure: '',
			publishTime: '2025-07-11T08:00:00Z',
		},
		{
			articleId: 302,
			title: '交互设计中的可用性原则',
			content: '文章内容：可用性研究与提升...',
			kgStructure: '',
			publishTime: '2025-07-15T08:00:00Z',
		},
	],
	4: [
		{
			articleId: 401,
			title: '数据可视化最佳实践',
			content: '文章内容：如何用图表讲好数据故事...',
			kgStructure: '',
			publishTime: '2025-06-05T07:00:00Z',
		},
		{
			articleId: 402,
			title: 'ETL 与数据清洗基础',
			content: '文章内容：数据管道与质量保证...',
			kgStructure: '',
			publishTime: '2025-06-10T07:00:00Z',
		},
	],
	5: [
		{
			articleId: 501,
			title: '远程办公高效指南',
			content: '文章内容：提升远程协作效率的方法...',
			kgStructure: '',
			publishTime: '2025-05-01T06:00:00Z',
		},
		{
			articleId: 502,
			title: '时间管理的十个技巧',
			content: '文章内容：实用的时间管理技巧...',
			kgStructure: '',
			publishTime: '2025-05-03T06:00:00Z',
		},
	],
}

// 按项目统一响应结构包装返回（方便在本地模拟接口时使用）
export function mockGetCategoriesResponse(): ApiResponse<ArticleCategory[]> {
	return { code: 0, msg: 'ok', data: MOCK_CATEGORIES }
}

export function mockGetArticlesByCategoryResponse(categoryId?: number): ApiResponse<Article[]> {
	const list = categoryId ? MOCK_ARTICLES_MAP[categoryId] || [] : Object.values(MOCK_ARTICLES_MAP).flat()
	return { code: 0, msg: 'ok', data: list }
}

export default {
	MOCK_CATEGORIES,
	MOCK_ARTICLES_MAP,
	mockGetCategoriesResponse,
	mockGetArticlesByCategoryResponse,
}
