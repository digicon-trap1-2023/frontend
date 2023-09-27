<script setup lang="ts">
import type { RequestWithDocuments } from '@/clients/request/types'
import { ElButton } from 'element-plus'

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
            <el-button type="primary" link :class="$style.button">
              {{ document.title }}
            </el-button>
          </router-link>
        </li>
      </ul>
    </li>
  </ul>
</template>

<style module>
.button{
  font-size: 16px;
}
</style>
