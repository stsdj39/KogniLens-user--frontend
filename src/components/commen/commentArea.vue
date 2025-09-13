<template>
    <div class="comment-area">
      <!-- 评论输入区域 -->
      <v-card class="comment-input-card mb-6" elevation="2">
        <v-card-text class="pa-6">
          <v-textarea
            v-model="newComment"
            :placeholder="'写评论'"
            :counter="200"
            :rules="commentRules"
            variant="outlined"
            rows="4"
            auto-grow
            class="mb-4"
            @input="updateCharacterCount"
          ></v-textarea>
          
          <div class="d-flex justify-space-between align-center">
            <div class="text-caption text-grey">
              {{ characterCount }} / 200
            </div>
            <v-btn
              color="primary"
              variant="elevated"
              :disabled="!canSubmit"
              :loading="isSubmitting"
              @click="submitComment"
            >
              发表
            </v-btn>
          </div>
        </v-card-text>
      </v-card>
  
      <!-- 评论区标题 -->
      <div class="d-flex align-center mb-4">
        <v-icon color="primary" class="me-2">mdi-comment-text</v-icon>
        <h3 class="text-h6 font-weight-medium">评论区</h3>
        <v-spacer></v-spacer>
        <v-chip color="primary" variant="outlined" size="small">
          {{ comments.length }} 条评论
        </v-chip>
      </div>
  
      <!-- 评论列表 -->
      <div class="comments-list">
        <v-card
          v-for="comment in comments"
          :key="comment.id"
          class="comment-item mb-4"
          elevation="1"
          variant="outlined"
        >
          <v-card-text class="pa-4">
            <div class="d-flex align-start">
              <!-- 用户头像 -->
              <v-avatar
                :color="getAvatarColor(comment.userName)"
                size="40"
                class="me-3"
              >
                <span class="text-white font-weight-bold">
                  {{ getInitials(comment.userName) }}
                </span>
              </v-avatar>
  
              <!-- 评论内容 -->
              <div class="comment-content flex-grow-1">
                <div class="d-flex align-center mb-2">
                  <span class="font-weight-medium text-body-1 me-2">
                    {{ comment.userName }}
                  </span>
                  <v-chip
                    v-if="comment.isAuthor"
                    color="primary"
                    size="x-small"
                    variant="outlined"
                  >
                    作者
                  </v-chip>
                </div>
                
                <p class="text-body-2 mb-2 comment-text">
                  {{ comment.content }}
                </p>
                
                <div class="d-flex align-center text-caption text-grey">
                  <v-icon size="small" class="me-1">mdi-clock-outline</v-icon>
                  <span>评论时间: {{ formatDate(comment.commentTime) }}</span>
                </div>
              </div>
  
              <!-- 操作按钮 -->
              <v-menu>
                <template v-slot:activator="{ props }">
                  <v-btn
                    icon
                    variant="text"
                    size="small"
                    v-bind="props"
                    class="ml-2"
                  >
                    <v-icon>mdi-dots-vertical</v-icon>
                  </v-btn>
                </template>
                <v-list>
                  <v-list-item @click="likeComment(comment.id)">
                    <template v-slot:prepend>
                      <v-icon>mdi-thumb-up-outline</v-icon>
                    </template>
                    <v-list-item-title>点赞</v-list-item-title>
                  </v-list-item>
                  <v-list-item @click="replyToComment(comment.id)">
                    <template v-slot:prepend>
                      <v-icon>mdi-reply</v-icon>
                    </template>
                    <v-list-item-title>回复</v-list-item-title>
                  </v-list-item>
                  <v-list-item
                    v-if="comment.userName === currentUser"
                    @click="deleteComment(comment.id)"
                    class="text-error"
                  >
                    <template v-slot:prepend>
                      <v-icon color="error">mdi-delete-outline</v-icon>
                    </template>
                    <v-list-item-title>删除</v-list-item-title>
                  </v-list-item>
                </v-list>
              </v-menu>
            </div>
          </v-card-text>
        </v-card>
  
        <!-- 空状态 -->
        <v-card
          v-if="comments.length === 0"
          class="text-center pa-8"
          variant="outlined"
        >
          <v-icon size="64" color="grey-lighten-1" class="mb-4">
            mdi-comment-outline
          </v-icon>
          <h4 class="text-h6 text-grey mb-2">暂无评论</h4>
          <p class="text-body-2 text-grey">成为第一个评论的人吧！</p>
        </v-card>
      </div>
  
      <!-- 加载更多 -->
      <div v-if="hasMoreComments" class="text-center mt-6">
        <v-btn
          variant="outlined"
          :loading="isLoadingMore"
          @click="loadMoreComments"
        >
          加载更多评论
        </v-btn>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, computed, onMounted } from 'vue'
  import type { Comment } from '@/types'
  
  // 组件 Props
  interface CommentAreaProps {
    articleId?: string | number
    currentUser?: string
  }
  
  const props = withDefaults(defineProps<CommentAreaProps>(), {
    articleId: '',
    currentUser: '当前用户'
  })
  
  // 响应式数据
  const newComment = ref('')
  const isSubmitting = ref(false)
  const isLoadingMore = ref(false)
  const hasMoreComments = ref(true)
  
  // 模拟评论数据
  const comments = ref<Comment[]>([
    {
      id: 1,
      userName: 'ry',
      content: '评论',
      commentTime: '2025-06-26T10:00:00Z',
      isAuthor: false,
      likes: 0
    },
    {
      id: 2,
      userName: '张三',
      content: '这篇文章写得很好，学到了很多！',
      commentTime: '2025-06-25T15:30:00Z',
      isAuthor: false,
      likes: 5
    },
    {
      id: 3,
      userName: '李四',
      content: '感谢分享，期待更多这样的内容。',
      commentTime: '2025-06-25T09:15:00Z',
      isAuthor: true,
      likes: 12
    }
  ])
  
  // 计算属性
  const characterCount = computed(() => newComment.value.length)
  
  const canSubmit = computed(() => {
    return newComment.value.trim().length > 0 && 
           newComment.value.length <= 200 && 
           !isSubmitting.value
  })
  
  // 验证规则
  const commentRules = [
    (v: string) => !!v || '请输入评论内容',
    (v: string) => v.length <= 200 || '评论不能超过200个字符'
  ]
  
  // 方法
  const updateCharacterCount = () => {
    // 字符计数更新逻辑
  }
  
  const submitComment = async () => {
    if (!canSubmit.value) return
    
    isSubmitting.value = true
    
    try {
      // 模拟API调用
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      const newCommentData: Comment = {
        id: Date.now(),
        userName: props.currentUser,
        content: newComment.value.trim(),
        commentTime: new Date().toISOString(),
        isAuthor: false,
        likes: 0
      }
      
      comments.value.unshift(newCommentData)
      newComment.value = ''
      
      // 显示成功消息
      console.log('评论发表成功')
    } catch (error) {
      console.error('评论发表失败:', error)
    } finally {
      isSubmitting.value = false
    }
  }
  
  const likeComment = (commentId: number) => {
    const comment = comments.value.find(c => c.id === commentId)
    if (comment) {
      comment.likes++
    }
  }
  
  const replyToComment = (commentId: number) => {
    // 回复评论逻辑
    console.log('回复评论:', commentId)
  }
  
  const deleteComment = (commentId: number) => {
    const index = comments.value.findIndex(c => c.id === commentId)
    if (index > -1) {
      comments.value.splice(index, 1)
    }
  }
  
  const loadMoreComments = async () => {
    isLoadingMore.value = true
    
    try {
      // 模拟加载更多评论
      await new Promise(resolve => setTimeout(resolve, 1000))
      // 这里可以添加更多评论到列表
    } finally {
      isLoadingMore.value = false
    }
  }
  
  const getInitials = (name: string) => {
    return name.charAt(0).toUpperCase()
  }
  
  const getAvatarColor = (name: string) => {
    const colors = ['primary', 'secondary', 'success', 'info', 'warning', 'error']
    const index = name.charCodeAt(0) % colors.length
    return colors[index]
  }
  
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('zh-CN')
  }
  
  // 组件挂载
  onMounted(() => {
    // 初始化逻辑
  })
  </script>
  
  <style scoped lang="scss">
  .comment-area {
    .comment-input-card {
      border-radius: 12px;
      
      .v-textarea {
        .v-field__input {
          min-height: 100px;
        }
      }
    }
    
    .comment-item {
      border-radius: 8px;
      transition: all 0.2s ease;
      
      &:hover {
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
      }
      
      .comment-content {
        .comment-text {
          line-height: 1.6;
          word-break: break-word;
        }
      }
    }
    
    .comments-list {
      .v-card {
        &:last-child {
          margin-bottom: 0;
        }
      }
    }
  }
  
  // 响应式设计
  @media (max-width: 768px) {
    .comment-area {
      .comment-input-card {
        .v-card-text {
          padding: 16px;
        }
      }
      
      .comment-item {
        .v-card-text {
          padding: 12px;
        }
      }
    }
  }
  </style>