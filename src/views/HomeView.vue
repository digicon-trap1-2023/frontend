<script setup lang="ts">
import { ref } from 'vue'
import ModalComponent from '@/components/modal/ModalComponent.vue'
import { useFetchDocumentDetail } from '@/clients/document/apis'

const visible = ref(false)
const src = ref('https://placehold.jp/1000x1000.png')

const document = useFetchDocumentDetail('aa')
</script>

<template>
  <main>
    <button
      @click="
        () => {
          visible = true
          src = 'https://placehold.jp/100x1000.png'
        }
      "
    >
      button1
    </button>
    <button
      @click="
        () => {
          visible = true
          src = 'https://placehold.jp/1000x1000.png'
        }
      "
    >
      button2
    </button>
    <button
      @click="
        () => {
          visible = true
          src = 'https://placehold.jp/1000x100.png'
        }
      "
    >
      button3
    </button>
    <ModalComponent
      v-if="visible && document"
      v-model="visible"
      :document="{ ...document, file: src }"
    >
    </ModalComponent>
  </main>
</template>

<style module></style>
