<script setup lang="ts">
import type { Document } from '@/clients/document/types'
import { useMeStore } from '@/stores/me'
import { storeToRefs } from 'pinia'

interface Props {
  documents: Document[]
}

defineProps<Props>()

const meStore = useMeStore()
const { role } = storeToRefs(meStore)
</script>

<template>
  <ul>
    <li v-for="document in documents" :key="document.id">
      <div>
        <router-link :to="`/documents?documentId=${document.id}`">{{ document.title }}</router-link>
        <ul v-if="role === 'reader'">
          <li v-for="writer in document.referenced_users" :key="writer">
            {{ writer }}
          </li>
        </ul>
        <ul v-else>
          <li>
            <router-link to="/book">ビューワーへ</router-link>
          </li>
        </ul>
      </div>
    </li>
  </ul>
</template>

<style module></style>
