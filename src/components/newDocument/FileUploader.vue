<script setup lang="ts">
import { ref } from 'vue'
import { ElUpload, ElIcon, ElButton } from 'element-plus'
import type { UploadUserFile, UploadFile } from 'element-plus'

import { UploadFilled, Delete } from '@element-plus/icons-vue'
import type { DocumentCreateSeed } from '@/clients/document/types'

interface Props {
  file: DocumentCreateSeed['file']
}

const props = defineProps<Props>()

const emit = defineEmits<{
  (e: 'changeFile', file: DocumentCreateSeed['file']): void
}>()

const fileList = ref<UploadUserFile[]>(props.file !== null ? [props.file] : [])
const imageUrl = ref<string | undefined>()

const handleChangeFile = (uploadFile: UploadFile) => {
  if (!uploadFile.raw) return
  imageUrl.value = URL.createObjectURL(uploadFile.raw)
  emit('changeFile', uploadFile.raw)
}

const handleRemoveImage = () => {
  fileList.value = []
  imageUrl.value = undefined
  emit('changeFile', null)
}
</script>

<template>
  <div>
    <el-upload
      v-if="imageUrl === undefined"
      drag
      :show-file-list="false"
      :auto-upload="false"
      v-model:file-list="fileList"
      :on-change="handleChangeFile"
      :limit="1"
    >
      <el-icon class="el-icon--upload">
        <upload-filled />
      </el-icon>
      <div class="el-upload__text">ドラッグアンドドロップでアップロード</div>
    </el-upload>
    <div v-else :class="$style.imageContainer">
      <img :src="imageUrl" alt="" width="300" height="300" :class="$style.image" />
    </div>
    <div :class="$style.removeImageButtonContainer" v-if="imageUrl !== undefined">
      <el-button @click="handleRemoveImage" type="danger" :icon="Delete" />
    </div>
  </div>
</template>

<style module>
.imageContainer {
  text-align: center;
}
.image {
  object-fit: contain;
}
.removeImageButtonContainer {
  margin-top: 1rem;
  text-align: right;
}
</style>

<style>
.el-upload-dragger {
  height: 100%;
  width: 100%;
}
</style>
