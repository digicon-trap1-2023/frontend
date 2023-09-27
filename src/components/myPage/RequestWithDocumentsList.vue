<script setup lang="ts">
import type { RequestWithDocuments } from '@/clients/request/types'

interface Props {
  requests: RequestWithDocuments[]
}

defineProps<Props>()
</script>

<template>
  <ul>
    <li v-for="request in requests" :key="request.id">
      {{ request.title }}
      <ul>
        <li v-for="document in request.documents" :key="document.id">
          <router-link :to="`/documents?documentId=${document.id}`">
            {{ document.title }}
          </router-link>
        </li>
      </ul>
    </li>
  </ul>
</template>

<style module></style>
