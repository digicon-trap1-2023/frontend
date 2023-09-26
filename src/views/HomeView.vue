<script setup lang="ts">
import { ref } from 'vue'
import TheWelcome from '../components/TheWelcome.vue'
import ModalComponent from '@/components/modal/ModalComponent.vue'

const visible = ref(false)
</script>

<template>
  <main>
    <TheWelcome />
    <button @click="visible = true">button</button>
    <ModalComponent
      v-model="visible"
      :src="'https://placehold.jp/1000x1000.png'"
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
