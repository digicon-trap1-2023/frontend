<script setup lang="ts">
import type { Document } from '@/clients/document/types'

interface Props {
  documents: Document[]
}

defineProps<Props>()
</script>

<template>
  <ul>
    <li v-for="document in documents" :key="document.id">
      <div>
        <router-link :to="`/documents?documentId=${document.id}`">{{ document.title }}</router-link>
        <ul>
          <li v-for="writer in document.referenced_users" :key="writer">
            {{ writer }}
          </li>
        </ul>
      </div>
    </li>
  </ul>
</template>

<style module></style>
