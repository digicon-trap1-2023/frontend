<script setup lang="ts">
import { useFetchDocuments } from '@/clients/document/apis'
import DocumentCard from '@/components/Documents/DocumentCard.vue'
import TagSelector from '@/components/Documents/TagSelector.vue'
import { ref, toRef, watch } from 'vue'

const tags = ref<string[]>()
const { data: documents, isValidating } = useFetchDocuments(toRef({ tags }))

watch(
  () => documents.value,
  () => alert(documents)
)
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
