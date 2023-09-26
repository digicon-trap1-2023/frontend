<script setup lang="ts">
import type { Document } from '@/clients/document/types'

interface Props {
  documents: Document[]
}

defineProps<Props>()
</script>

<template>
  <div>
    <div v-for="document in documents" :key="document.id">
      {{ document.title }}
    </div>
  </div>
</template>

<style module></style>
