<script setup lang="ts">
import { useFetchRequestsWithDocuments } from '@/clients/request/apis'
import { ref, toRef } from 'vue'
import RequestList from '@/components/myPage/RequestList.vue'
import ReferecedList from '@/components/myPage/ReferecedList.vue'
import { useRoleStore } from '@/stores/role'
import { storeToRefs } from 'pinia'
import { useFetchDocuments } from '@/clients/document/apis'
import { ElTabs, ElTabPane } from 'element-plus'
import type { DocumentQuerySeed } from '@/clients/document/types'

const roleStore = useRoleStore()
const { role } = storeToRefs(roleStore)

const { data: documents } = useFetchDocuments(
  toRef({ type: 'referenced' } satisfies DocumentQuerySeed)
)
const requests = useFetchRequestsWithDocuments()

const activeTab = ref<'referenced' | 'bookmark'>('bookmark')
</script>

<template>
  <div>
    <h1>マイページ</h1>
    <el-tabs v-model="activeTab" v-if="role === 'writer'">
      <el-tab-pane label="使った資料" name="referenced">
        <refereced-list :documents="documents" v-if="documents !== undefined" />
      </el-tab-pane>
      <el-tab-pane label="ブックマーク" name="bookmark">
        <request-list :requests="requests" v-if="requests !== undefined" />
      </el-tab-pane>
    </el-tabs>
    <refereced-list :documents="documents" v-else-if="documents !== undefined" />
  </div>
</template>

<style module></style>
