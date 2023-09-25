<script setup lang="ts">
import type { RequestWithDocuments } from '@/clients/request/types'

interface Props {
  requests: RequestWithDocuments[]
}

defineProps<Props>()
</script>

<template>
  <div>
    <div v-for="request in requests" :key="request.id">
      <div v-for="document in request.documents" :key="document.id">
        <router-link :to="`/documents?documentId=${document.id}`">
          {{ document.title }}
        </router-link>
      </div>
    </div>
  </div>
</template>

<style module></style>
