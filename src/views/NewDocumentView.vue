<script setup lang="ts">
import { ref,computed } from 'vue'
import { ElForm, ElButton } from 'element-plus'
import {useRequestStore} from '@/stores/request'
import {storeToRefs} from 'pinia'

import FileUploader from '@/components/newDocument/FileUploader.vue'
import DocumentInfoForm from '@/components/newDocument/DocumentInfoForm.vue'
import { createTags, useFetchTags } from '@/clients/tag/apis'
import { createDocument } from '@/clients/document/apis'

import type { DocumentCreateSeed } from '@/clients/document/types'
import { useMeStore } from '@/stores/me'
import { useRoute, useRouter } from 'vue-router'
import { parseQueryParam } from '@/lib/parseParam'

const route = useRoute()
const router = useRouter()

const meStore = useMeStore()
const { role } = storeToRefs(meStore)
const requestStore = useRequestStore()
const { requests } = storeToRefs(requestStore)

const form = ref<DocumentCreateSeed>({
  title: '',
  description: '',
  tags: [],
  file: null,
  related_request: null
})

const tags = useFetchTags()

const handleSubmit = async () => {
  if (!form.value.file || !form.value.description || !form.value.title || !tags.value) return

  const newTags = form.value.tags.filter((tag) => !tags.value!.some((t) => t.id === tag))
  const existingTags = form.value.tags.filter((tag) => tags.value!.some((t) => t.id === tag))
  const createdTags = await createTags(newTags)
  existingTags.push(...createdTags.map((tag) => tag.id))

  const documentCreateSeed: DocumentCreateSeed = {
    title: form.value.title,
    description: form.value.description,
    tags: existingTags,
    file: form.value.file,
    related_request: parseQueryParam(route.query.requestId)
  }

  await createDocument(documentCreateSeed)
  router.push('/documents')
}

cosnt requestId= computed(() => parseQueryParam(route.query.requestId))
const request= computed(() => requests.value.find((r) => r.id === requestId.value))
</script>

<template>
  <div v-if="role === 'writer'">権限がありません。</div>
  <div v-else>
    <h1>新規資料投稿</h1>
    <p :class="$style.description">新規資料を投稿します。</p>
    <p v-if="request !== undefined">
      紐付ける要望タイトル: {{ request.Title }}
      <br />
      紐付ける要望詳細: {{ request.Description }}
    </p>

    <el-form :model="form" label-position="top" :class="$style.form" v-if="tags">
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
