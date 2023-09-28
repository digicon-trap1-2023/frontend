<script setup lang="ts">
import ReferencePopover from '@/components/mangaWithReference/ReferencePopover.vue'
import { ref } from 'vue'
import DocumentModal from '@/components/modal/DocumentModal.vue'

const isModalOpen = ref(false)
const currentModalDocumentId = ref<string>()

const handleSelectCurrentDocument = (id: string) => {
  currentModalDocumentId.value = id
  isModalOpen.value = true
}
</script>

<template>
  <div>
    <h1>おかえり、初恋。</h1>
    <div :class="$style.images">
      <div :class="$style.imageContainer">
        <img src="@/assets/left.jpg" alt="left page" width="400px" :class="$style.image" />
        <reference-popover :class="$style.popover1" @click="handleSelectCurrentDocument" />
        <reference-popover :class="$style.popover2" @click="handleSelectCurrentDocument" />
      </div>
      <div :class="$style.imageContainer">
        <img src="@/assets/right.jpg" alt="right page" witdh="400px" :class="$style.image" />
        <reference-popover :class="$style.popover3" @click="handleSelectCurrentDocument" />
      </div>
    </div>
    <document-modal
      @closed="() => (currentModalDocumentId = undefined)"
      v-if="isModalOpen && currentModalDocumentId"
      v-model="isModalOpen"
      :document-id="currentModalDocumentId"
    />
  </div>
</template>

<style module>
.images {
  display: flex;
  flex-wrap: wrap;
  margin: auto;
  justify-content: center;
}

.imageContainer {
  position: relative;
}
.image {
  width: 400px;
}
.popover1 {
  top: -2px;
  left: 230px;
}
.popover2 {
  top: 140px;
  left: 30px;
}
.popover3 {
  top: 320px;
  left: 40px;
}
.infoButton {
  cursor: zoom-in;
}
</style>
