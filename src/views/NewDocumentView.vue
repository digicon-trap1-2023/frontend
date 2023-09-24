<script setup lang="ts">
import { ref } from 'vue'
// NOTE: ElSelectV2使うかも？
import { ElForm, ElButton } from 'element-plus'

import FileUploader from '@/components/NewDocument/FileUploader.vue'
import DocumentInfoForm from '@/components/NewDocument/DocumentInfoForm.vue'

export interface Form {
  title: string
  description: string
  tags: string[]
  file: File | null
}

const form = ref<Form>({
  title: '',
  description: '',
  tags: [],
  file: null
})

const tags = [
  {
    label: '東工大',
    value: '1'
  },
  {
    label: '柱',
    value: '2'
  },
  {
    label: 'ジブリにありそう',
    value: '3'
  }
]

const handleSubmit = () => {
  if (!form.value.file || !form.value.description || !form.value.title) return

  //TODO: 新規作成のタグは新規作成する
  // const newTags = form.value.tags.filter((tag) => !tags.some((t) => t.value === tag))
  // const existingTags = form.value.tags.filter((tag) => tags.some((t) => t.value === tag))

  const formData = new FormData()
  formData.append('title', form.value.title)
  formData.append('description', form.value.description)
  formData.append('tags', form.value.tags.join(','))
  formData.append('file', form.value.file)

  for (const pair of formData.entries()) {
    console.log(`${pair[0]}: ${pair[1]}`)
  }
  //TODO: 送信処理
}
</script>

<template>
  <div>
    <h1>新規資料投稿</h1>
    <p :class="$style.description">新規資料を投稿します。</p>
    <el-form :model="form" label-position="top" :class="$style.form">
      <div :class="$style.formFields">
        <file-uploader
          :class="$style.formLeftContainer"
          :file="form.file"
          @change-file="form.file = $event"
        />
        <document-info-form :class="$style.formRightContainer" v-model="form" :tags="tags" />
      </div>
      <div :class="$style.formSubmitButonContainer">
        <el-button type="primary" @click="handleSubmit">投稿する</el-button>
      </div>
    </el-form>
  </div>
</template>

<style module>
.description {
  margin-bottom: 2rem;
}
.form {
  width: 100%;
}
.formFields {
  display: flex;
  gap: 2rem;
  height: 360px;
}
.formLeftContainer {
  display: flex;
  flex-direction: column;
  justify-content: center;
  flex-grow: 2;
}
.imageContainer {
  position: relative;
}
.formRightContainer {
  width: 540px;
}
.tagSelect {
  width: 100%;
}
.formSubmitButonContainer {
  text-align: right;
}
</style>

<style>
.el-upload-dragger {
  height: 100%;
  width: 100%;
}
</style>
