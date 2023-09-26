<script setup lang="ts">
import { useRoleStore } from '@/stores/role'
import { storeToRefs } from 'pinia'
import WriterTabPane from '@/components/myPage/WriterTabPane.vue'
import OtherTabPane from '@/components/myPage/OtherTabPane.vue'

const roleStore = useRoleStore()
const { role } = storeToRefs(roleStore)
</script>

<template>
  <div>
    <h1>マイページ</h1>
    <writer-tab-pane v-if="role === 'writer'" />
    <other-tab-pane v-else />
  </div>
</template>

<style module></style>
