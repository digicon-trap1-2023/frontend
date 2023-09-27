<script setup lang="ts">
import { ElTabs, ElTabPane } from 'element-plus'
import RequestWithDocumentsList from '@/components/myPage/RequestWithDocumentsList.vue'
import ReferecedList from '@/components/myPage/ReferecedList.vue'
import { useFetchDocuments } from '@/clients/document/apis'
import type { DocumentQuerySeed } from '@/clients/document/types'
import { useFetchRequestsWithDocuments } from '@/clients/request/apis'
import { toRef, ref } from 'vue'

const activeTab = ref<'referenced' | 'request'>('request')

const { data: documents } = useFetchDocuments(
  toRef({ onlyReferenced: true } satisfies DocumentQuerySeed)
)
const requests = useFetchRequestsWithDocuments()
</script>

<template>
  <el-tabs v-model="activeTab">
    <el-tab-pane label="要望に対する資料" name="request">
      <request-with-documents-list :requests="requests" v-if="requests !== undefined" />
    </el-tab-pane>
    <el-tab-pane label="参考にした資料" name="referenced">
      <refereced-list :documents="documents" v-if="documents !== undefined" />
    </el-tab-pane>
  </el-tabs>
</template>
