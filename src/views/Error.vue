<template>
  <div class="error-page">
    <el-result
      icon="error"
      :title="title || '系统错误'"
      :sub-title="subTitle || '很抱歉，系统遇到了一些问题'"
    >
      <template #extra>
        <el-button type="primary" @click="$router.push('/')">返回首页</el-button>
        <el-button @click="$router.go(-1)">返回上一页</el-button>
        <el-button type="info" @click="reload">刷新页面</el-button>
      </template>
    </el-result>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const title = ref('')
const subTitle = ref('')

onMounted(() => {
  // 从路由参数中获取错误信息
  if (route.params.errorMessage) {
    title.value = route.params.errorMessage
  }
  if (route.params.errorDetails) {
    subTitle.value = route.params.errorDetails
  }
})

const reload = () => {
  window.location.reload()
}
</script>

<style scoped>
.error-page {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 40px;
}
</style>