<script setup lang="ts">
import { ref } from 'vue'
import { ElForm, ElFormItem, ElInput, ElButton, ElSelect, ElOption } from 'element-plus'
import type { RequestCreateSeed } from '@/clients/request/types'
import { createRequest } from '@/clients/request/apis'
import { useFetchTags } from '@/clients/tag/apis'
import { createTags } from '@/clients/tag/apis'

const tags = useFetchTags()

const form = ref<RequestCreateSeed>({
  title: '',
  description: '',
  tags: []
})

const handleSubmit = async () => {
  if (!form.value.description || !form.value.title || !tags.value) return
  const newTags = form.value.tags.filter((tag) => !tags.value!.some((t) => t.id === tag))
  const existingTags = form.value.tags.filter((tag) => tags.value!.some((t) => t.id === tag))
  const createdTags = await createTags(newTags)
  existingTags.push(...createdTags.map((tag) => tag.id))

  const requestCreateSeed: RequestCreateSeed = {
    title: form.value.title,
    description: form.value.description,
    tags: existingTags
  }
  await createRequest(requestCreateSeed)

  form.value.title = ''
  form.value.description = ''
  form.value.tags = []
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
    <el-form-item label="タグ" v-if="tags !== undefined">
      <el-select
        multiple
        filterable
        clearable
        allow-create
        default-first-option
        :reserve-keyword="false"
        placeholder="検索時に使用できるタグを選択"
        v-model="form.tags"
        size="large"
        :class="$style.tagSelect"
      >
        <el-option v-for="tag in tags" :key="tag.id" :label="tag.name" :value="tag.id" />
      </el-select>
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
.tagSelect {
  width: 100%;
}
</style>
