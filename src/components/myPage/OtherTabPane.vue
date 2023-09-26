<script setup lang="ts">
import { useFetchDocuments } from '@/clients/document/apis'
import type { DocumentQuerySeed } from '@/clients/document/types'
import { toRef } from 'vue'
import ReferecedList from '@/components/myPage/ReferecedList.vue'

const { data: documents } = useFetchDocuments(
  toRef({ type: 'referenced' } satisfies DocumentQuerySeed)
)
</script>

<template>
  <refereced-list :documents="documents" v-if="documents !== undefined" />
</template>
