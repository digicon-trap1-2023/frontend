<script setup lang="ts">
import { useFetchDocuments } from '@/clients/document/apis'
import type { DocumentQuerySeed } from '@/clients/document/types'
import { toRef } from 'vue'
import ReferecedList from '@/components/myPage/ReferecedList.vue'

const { data: documents } = useFetchDocuments(
  toRef({ onlyReferenced: true } satisfies DocumentQuerySeed)
)
</script>

<template>
  <p>ここでは作家に使われた資料の一覧を確認できます。</p>
  <refereced-list :documents="documents" v-if="documents !== undefined" />
</template>
