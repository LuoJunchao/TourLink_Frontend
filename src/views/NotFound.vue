<template>
  <div class="not-found">
    <el-empty description="页面不存在">
      <template #extra>
        <el-button type="primary" @click="$router.push('/')">返回首页</el-button>
      </template>
    </el-empty>
  </div>
</template>

<style scoped>
.not-found {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 40px;
}
</style>