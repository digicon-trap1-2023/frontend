<script setup lang="ts">
import { useMeStore } from '@/stores/me'
import { storeToRefs } from 'pinia'
import WriterMode from '@/components/myPage/WriterMode.vue'
import ReaderMode from '@/components/myPage/ReaderMode.vue'

const meStore = useMeStore()
const { role } = storeToRefs(meStore)
</script>

<template>
  <div>
    <h1>マイページ</h1>
    <writer-mode v-if="role === 'writer'" />
    <reader-mode v-else />
  </div>
</template>

<style module></style>
