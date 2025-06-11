<script setup>
import { ref, provide } from 'vue'

const error = ref(null)

// 提供错误处理函数给子组件
provide('errorHandler', (err) => {
  console.error('组件错误被捕获:', err)
  error.value = err
})

// 重置错误状态
const reset = () => {
  error.value = null
}
</script>

<template>
  <div>
    <!-- 显示错误信息 -->
    <div v-if="error" class="error-container">
      <h3>加载组件时出错</h3>
      <p>{{ error.message || '未知错误' }}</p>
      <el-button type="primary" @click="reset">重试</el-button>
    </div>
    
    <!-- 正常显示子组件 -->
    <slot v-else></slot>
  </div>
</template>