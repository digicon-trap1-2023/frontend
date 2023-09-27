<script setup lang="ts">
import { useFetchDocuments, useFetchDocumentsByReader } from '@/clients/document/apis'
import DocumentCard from '@/components/Documents/DocumentCard.vue'
import TagSelector from '@/components/Documents/TagSelector.vue'
import { storeToRefs } from 'pinia'
import { ref, toRef, type Ref } from 'vue'
import { useMeStore } from '@/stores/me'
import type { DocumentQuerySeed } from '@/clients/document/types'
import DocumentModal from '@/components/modal/DocumentModal.vue'

const meStore = useMeStore()
const { role } = storeToRefs(meStore)

const useDocuments = (query: Ref<DocumentQuerySeed>) => {
  if (role.value === 'writer') {
    return useFetchDocuments(query)
  }
  return useFetchDocumentsByReader(query)
}

const tags = ref<string[]>()
const { data: documents, isValidating } = useDocuments(toRef({ tags }))

const isModalOpen = ref(false)
const currentModalDocumentId = ref<string | null>(null)

const handleSelectCurrentDocument = (id: string) => {
  currentModalDocumentId.value = id
  isModalOpen.value = true
}
</script>

<template>
  <tag-selector @change="(e) => (tags = e)" />
  <div v-if="documents && !isValidating">
    <div v-masonry="1" transition-duration="0.3s" item-selector=".item" column-width="250">
      <div
        v-masonry-tile
        class="item"
        v-for="item in documents"
        :key="item.id"
        :class="$style.card"
      >
        <button @click="handleSelectCurrentDocument(item.id)" :class="$style.button">
          <document-card
            :img-src="item.file"
            :username="item.userName"
            :title="item.title"
            :is-bookmarked="item.bookmarked"
            :id="item.id"
          />
        </button>
      </div>
    </div>
    <document-modal
      v-if="isModalOpen && currentModalDocumentId"
      v-model="isModalOpen"
      :document-id="currentModalDocumentId"
    />
  </div>
</template>

<style module>
.card {
  width: 250px;
  padding: 5px;
  box-sizing: border-box;
}

.button {
  border: none;
  background: none;
  padding: 0;
  cursor: pointer;
  width: 100%;
  height: 100%;
  text-align: left;
}
</style>
