<script setup lang="ts">
import { ref } from 'vue'
import { ElForm, ElFormItem, ElInput, ElButton } from 'element-plus'
import type { RequestCreateSeed } from '@/clients/request/types'
import { createRequest } from '@/clients/request/apis'

const form = ref<RequestCreateSeed>({
  title: '',
  description: ''
})

const handleSubmit = async () => {
  if (!form.value.description || !form.value.title) return

  const requestCreateSeed: RequestCreateSeed = {
    title: form.value.title,
    description: form.value.description
  }
  await createRequest(requestCreateSeed)

  form.value.title = ''
  form.value.description = ''
}
</script>

<template>
  <el-form :model="form" label-width="120px" label-position="left">
    <el-form-item label="タイトル">
      <el-input v-model="form.title" size="large" placeholder="タイトルを入力" />
    </el-form-item>
    <el-form-item label="説明">
      <el-input
        v-model="form.description"
        size="large"
        type="textarea"
        :rows="4"
        placeholder="説明文を入力"
        :autosize="{ minRows: 4 }"
      />
    </el-form-item>
    <div :class="$style.buttonContainer">
      <el-button type="primary" @click="handleSubmit">送信する</el-button>
    </div>
  </el-form>
</template>

<style module>
.buttonContainer {
  text-align: right;
}
</style>
