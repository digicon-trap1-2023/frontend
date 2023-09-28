<script setup lang="ts">
import { useFetchDocuments } from '@/clients/document/apis'
import DocumentCard from '@/components/Documents/DocumentCard.vue'
import TagSelector from '@/components/Documents/TagSelector.vue'
import { ref, computed, toRef } from 'vue'
import DocumentModal from '@/components/modal/DocumentModal.vue'
import { parseQueryParam } from '@/lib/parseParam'
import { useRoute } from 'vue-router'
import { ElButton, ElIcon } from 'element-plus'
import { Star, StarFilled } from '@element-plus/icons-vue'

const route = useRoute()
const initialDocumentId = computed(() => parseQueryParam(route.query.documentId))

const tags = ref<string[]>()
const onlyBookmark = ref(false)
const { data: documents, mutate } = useFetchDocuments(
  toRef({
    tags,
    onlyBookmark
  })
)
const isModalOpen = ref(initialDocumentId.value ? true : false)
const currentModalDocumentId = ref<string | null>(initialDocumentId.value ?? null)

const handleSelectCurrentDocument = (id: string) => {
  currentModalDocumentId.value = id
  isModalOpen.value = true
}

const handleChangeBookmark = (documentId: string, val: boolean) => {
  documents.value = documents.value.map((document) => {
    if (document.id === documentId) {
      return {
        ...document,
        bookmarked: val
      }
    }
    return document
  })
}
const handleChangeReferenced = (documentId: string, val: boolean) => {
  documents.value = documents.value.map((document) => {
    if (document.id === documentId) {
      return {
        ...document,
        referenced: val
      }
    }
    return document
  })
}
</script>

<template>
  <div>
    <div :class="$style.tools">
      <tag-selector @change="(e) => (tags = e)" />
      <el-button
        circle
        :class="$style.starButton"
        @click.stop="onlyBookmark = !onlyBookmark"
        :is-stard="onlyBookmark"
      >
        <template #icon>
          <ElIcon :size="24">
            <star-filled v-if="onlyBookmark" />
            <star v-else />
          </ElIcon>
        </template>
      </el-button>
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
            :username="item.user_name"
            :title="item.title"
            :is-bookmarked="item.bookmarked"
            :id="item.id"
            :width="item.file_width"
            :height="item.file_height"
            @change-bookmark="handleChangeBookmark($event)"
          />
        </button>
      </div>
    </div>
    <document-modal
      @closed="() => (currentModalDocumentId = null)"
      v-if="isModalOpen && currentModalDocumentId"
      v-model="isModalOpen"
      :document-id="currentModalDocumentId"
      @mutate="mutate(undefined)"
      @change-bookmark="handleChangeBookmark($event)"
      @change-referenced="handleChangeReferenced($event)"
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
  gap: 12px;
}

.starButton {
  height: 40px;
  width: 40px;
}
.starButton[is-stard='true'] {
  opacity: 1;
  color: var(--el-button-hover-text-color);
  border-color: var(--el-button-hover-border-color);
  background-color: var(--el-button-hover-bg-color);
  outline: 0;
}
</style>
