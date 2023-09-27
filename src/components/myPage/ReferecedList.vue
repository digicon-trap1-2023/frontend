<script setup lang="ts">
import type { Document } from '@/clients/document/types'
import { useMeStore } from '@/stores/me'
import { storeToRefs } from 'pinia'
import { ElButton, ElCard } from 'element-plus'
import DocumentModal from '@/components/modal/DocumentModal.vue'
import { ref } from 'vue'

interface Props {
  documents: Document[]
}

defineProps<Props>()

const meStore = useMeStore()
const { role } = storeToRefs(meStore)

const isModalOpen = ref(false)
const currentModalDocumentId = ref<string | null>(null)

const handleSelectCurrentDocument = (id: string) => {
  currentModalDocumentId.value = id
  isModalOpen.value = true
}
</script>

<template>
  <div>
    <ul v-if="role === 'reader'">
      <li v-for="document in documents" :key="document.id">
        {{ document.title }}
        <el-button @click="handleSelectCurrentDocument(document.id)">
          {{ document.title }}
        </el-button>
        <ul>
          <li v-for="writer in document.referenced_users" :key="writer">
            {{ writer }}
          </li>
        </ul>
      </li>
    </ul>
    <div v-else>
      <div :class="$style.container">
        <el-card
          :body-style="{ padding: '0px' }"
          shadow="never"
          v-for="document in documents"
          :key="document.id"
          :class="$style.card"
        >
          <img :src="document.file" width="200" height="180" :class="$style.img" />
          <div>
            <p :class="$style.title">{{ document.title }}</p>
            <div :class="$style.controls">
              <el-button @click="handleSelectCurrentDocument(document.id)"> 詳細を見る </el-button>
              <router-link to="/book">
                <el-button type="primary" link> ビューワーへ </el-button>
              </router-link>
            </div>
          </div>
        </el-card>
      </div>
    </div>
    <document-modal
      @closed="() => (currentModalDocumentId = null)"
      v-if="isModalOpen && currentModalDocumentId"
      v-model="isModalOpen"
      :document-id="currentModalDocumentId"
    />
  </div>
</template>

<style module>
.container {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
}
.card {
  padding: 16px;
}
.title {
  font-weight: bold;
  margin-bottom: 8px;
}
.img {
  object-fit: contain;
}
.controls {
  display: flex;
  justify-content: space-between;
}
</style>
