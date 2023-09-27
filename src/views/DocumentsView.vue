<script setup lang="ts">
import { useFetchDocuments } from '@/clients/document/apis'
import DocumentCard from '@/components/Documents/DocumentCard.vue'
import TagSelector from '@/components/Documents/TagSelector.vue'
import { ref, computed, toRef } from 'vue'
import DocumentModal from '@/components/modal/DocumentModal.vue'
import { parseQueryParam } from '@/lib/parseParam'
import { useRoute } from 'vue-router'

const route = useRoute()
const initialDocumentId = computed(() => parseQueryParam(route.query.documentId))

const tags = ref<string[]>()
const { data: documents } = useFetchDocuments(toRef({ tags }))

const isModalOpen = ref(initialDocumentId.value ? true : false)
const currentModalDocumentId = ref<string | null>(initialDocumentId.value ?? null)

const handleSelectCurrentDocument = (id: string) => {
  currentModalDocumentId.value = id
  isModalOpen.value = true
}
</script>

<template>
  <div>
    <div :class="$style.tools">
      <tag-selector @change="(e) => (tags = e)" />
    </div>

    <div
      v-if="documents"
      :class="$style.documentList"
      :key="JSON.stringify(documents)"
      v-masonry="1"
      transition-duration="0.3s"
      item-selector=".item"
      column-width="250"
      fit-width="true"
    >
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
      @closed="() => (currentModalDocumentId = null)"
      v-if="isModalOpen && currentModalDocumentId"
      v-model="isModalOpen"
      :document-id="currentModalDocumentId"
    />
  </div>
</template>

<style module>
.documentList {
  /* width: fit-content; */

  margin: auto;
  margin-top: 20px;
}
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

.tools {
  display: flex;
}
</style>
