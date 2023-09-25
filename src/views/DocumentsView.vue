<script setup lang="ts">
import { useFetchDocuments } from '@/clients/document/apis'
import DocumentCard from '@/components/Documents/DocumentCard.vue'
import TagSelector from '@/components/Documents/TagSelector.vue'
import { ref } from 'vue'

const tags = ref<string[]>()
const documents = useFetchDocuments({ tags: tags.value })
</script>

<template>
  <tag-selector @change="(e) => (tags = e)" />
  <div v-if="documents">
    <div v-masonry="1" transition-duration="0.3s" item-selector=".item" column-width="250">
      <div
        v-masonry-tile
        class="item"
        v-for="(item, index) in documents"
        :key="index"
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
