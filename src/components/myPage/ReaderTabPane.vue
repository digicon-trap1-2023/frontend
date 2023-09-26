<script setup lang="ts">
import { useFetchDocumentsByReader } from '@/clients/document/apis'
import type { DocumentQuerySeed } from '@/clients/document/types'
import { toRef } from 'vue'
import ReferecedList from '@/components/myPage/ReferecedList.vue'

const { data: documents } = useFetchDocumentsByReader(
  toRef({ type: 'referenced' } satisfies DocumentQuerySeed)
)
</script>

<template>
  <refereced-list :documents="documents" v-if="documents !== undefined" />
</template>
