<script setup lang="ts">
import { ref } from 'vue'
import TheWelcome from '../components/TheWelcome.vue'
import ModalComponent from '@/components/modal/ModalComponent.vue'

const visible = ref(false)
const src = ref('https://placehold.jp/1000x1000.png')
</script>

<template>
  <main>
    <TheWelcome />
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
      v-if="visible"
      v-model="visible"
      :src="src"
      :user-id="'aaaa'"
      :user-name="'noc7t'"
      :title="'sumple title'"
      :description="
        Array(100)
          .fill(0)
          .map(() => 'description ')
          .join('')
      "
    >
    </ModalComponent>
  </main>
</template>

<style module></style>
