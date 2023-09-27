<script setup lang="ts">
import type { Document } from '@/clients/document/types'
import { useMeStore } from '@/stores/me'
import { storeToRefs } from 'pinia'
import { ElButton, ElCard, ElAvatar, ElTable, ElTableColumn } from 'element-plus'
import DocumentModal from '@/components/modal/DocumentModal.vue'
import { ref, computed } from 'vue'
import { ZoomIn } from '@element-plus/icons-vue'

interface Props {
  documents: Document[]
}

const props = defineProps<Props>()

const meStore = useMeStore()
const { role } = storeToRefs(meStore)

const isModalOpen = ref(false)
const currentModalDocumentId = ref<string | null>(null)

const handleSelectCurrentDocument = (id: string) => {
  currentModalDocumentId.value = id
  isModalOpen.value = true
}

const tableData = computed(() =>
  props.documents.map((document) => ({
    document: document,
    writers: document.referenced_users
  }))
)
</script>

<template>
  <div>
    <el-table :data="tableData" style="width: 100%" v-if="role === 'reader'" stripe>
      <el-table-column prop="document" label="資料" :width="360">
        <template #default="{ row }">
          <div :class="$style.documentCell">
            {{ row.document.title }}
            <el-button
              @click="handleSelectCurrentDocument(row.document.id)"
              :icon="ZoomIn"
              circle
            />
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="writers" label="作家">
        <template #default="{ row }">
          <el-avatar v-for="writer in row.writers" :key="writer">
            <span :class="$style.avatarName">{{ writer.slice(0, 1) }}</span>
          </el-avatar>
        </template>
      </el-table-column>
    </el-table>
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
                <el-button type="primary" link>ビューワーへ</el-button>
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
.avatarName {
  font-size: 1.5rem;
  font-weight: bold;
}
.documentCell {
  display: flex;
  align-items: center;
  gap: 20px;
}
</style>
