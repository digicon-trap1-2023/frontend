<script setup lang="ts">
import type { RequestWithDocuments } from '@/clients/request/types'
import { ElButton, ElCollapse, ElCollapseItem } from 'element-plus'
import { ref } from 'vue'
import { ZoomIn } from '@element-plus/icons-vue'
import DocumentModal from '@/components/modal/DocumentModal.vue'

interface Props {
  requests: RequestWithDocuments[]
}

defineProps<Props>()

const activeRequestNames = ref<string[]>([])
const handleChangeActiveRequest = (val: string[]) => {
  activeRequestNames.value = val
}

const isModalOpen = ref(false)
const currentModalDocumentId = ref<string | null>(null)

const handleSelectCurrentDocument = (id: string) => {
  currentModalDocumentId.value = id
  isModalOpen.value = true
}
</script>

<template>
  <div>
    <el-collapse v-model="activeRequestNames" @change="handleChangeActiveRequest">
      <el-collapse-item :name="request.id" v-for="request in requests" :key="request.id">
        <template #title>
          <p :class="$style.requestTitle">{{ request.title }}</p>
        </template>
        <ul>
          <li :class="$style.li" v-for="document in request.documents" :key="document.id">
            <p :class="$style.documentTitle">{{ document.title }}</p>
            <el-button
              circle
              :class="$style.button"
              @click="handleSelectCurrentDocument(document.id)"
              :icon="ZoomIn"
            />
          </li>
        </ul>
      </el-collapse-item>
    </el-collapse>
    <document-modal
      @closed="() => (currentModalDocumentId = null)"
      v-if="isModalOpen && currentModalDocumentId"
      v-model="isModalOpen"
      :document-id="currentModalDocumentId"
    />
  </div>
</template>

<style module>
.button {
  font-size: 16px;
}
.requestTitle {
  font-size: 16px;
}
.li {
  display: flex;
  align-items: center;
  gap: 20px;
}
.documentTitle {
  font-size: 16px;
}
</style>
