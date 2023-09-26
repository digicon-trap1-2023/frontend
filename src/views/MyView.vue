<script setup lang="ts">
import { useRoleStore } from '@/stores/role'
import { storeToRefs } from 'pinia'
import WriterTabPane from '@/components/myPage/WriterTabPane.vue'
import ReaderTabPane from '@/components/myPage/ReaderTabPane.vue'

const roleStore = useRoleStore()
const { role } = storeToRefs(roleStore)
</script>

<template>
  <div>
    <h1>マイページ</h1>
    <writer-tab-pane v-if="role === 'writer'" />
    <reader-tab-pane v-else />
  </div>
</template>

<style module></style>
