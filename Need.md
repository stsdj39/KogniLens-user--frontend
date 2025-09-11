9.10
1 使用 vuetify 环形进度标签完成整个项目的加载状态配置

<!-- <v-progress-circular
      color="primary"
      indeterminate
    ></v-progress-circular> -->

2 请在类型文件下方添加获取文章的字段
目前有 2 个接口一个是获取所有文字的分类
另一个是根据文章分类获取具体分类文章的内容


9.11
1更新了接口都统一响应字段和获取文件分类接口、获取分类文章接口的字段
请修改对应文件和在api文件中添加新增的2个接口
获取文件分类接口
{
    "code": 0,
    "msg": "string",
    "data": [
        {
            "id": 0,
            "name": "string"
        }
    ]
}
获取分类文章接口
入参
categoryId?: number;
出参
{
    "code": 0,
    "msg": "string",
    "data": [
        {
            "id": 0,
            "title": "string",
            "content": "string",
            "kgStructure": "string",
            "publishTime": "string"
        }
    ]
}

2配置环境跨域代理


3根据接口字段类型在constants文件夹的index.ts模拟一些数据，文章类型模拟5种类型，每个类型的文章模拟2篇 其中文章内容的kgStructure字段不用模拟空着即可