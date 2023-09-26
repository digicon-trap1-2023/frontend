<script setup lang="ts">
import { useFetchDocuments, useFetchDocumentsByReader } from '@/clients/document/apis'
import DocumentCard from '@/components/Documents/DocumentCard.vue'
import TagSelector from '@/components/Documents/TagSelector.vue'
import { storeToRefs } from 'pinia'
import { ref, toRef, type Ref } from 'vue'
import { useRoleStore } from '@/stores/role'
import type { DocumentQuerySeed } from '@/clients/document/types'

const roleStore = useRoleStore()
const { role } = storeToRefs(roleStore)

const useDocuments = (query: Ref<DocumentQuerySeed>) => {
  if (role.value === 'writer') {
    return useFetchDocuments(query)
  }
  return useFetchDocumentsByReader(query)
}

const tags = ref<string[]>()
const { data: documents, isValidating } = useDocuments(toRef({ tags }))
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
        <document-card
          :img-src="item.file"
          :username="item.userName"
          :title="item.title"
          :is-bookmarked="item.bookmarked"
          :id="item.id"
        ></document-card>
      </div>
    </div>
  </div>
</template>

<style module>
.card {
  width: 250px;
  padding: 5px;
  box-sizing: border-box;
}
</style>
