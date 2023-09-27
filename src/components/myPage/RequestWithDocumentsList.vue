<script setup lang="ts">
import type { RequestWithDocuments } from '@/clients/request/types'
import { ElButton, ElCollapse, ElCollapseItem } from 'element-plus'
import { ref } from 'vue'

interface Props {
  requests: RequestWithDocuments[]
}

defineProps<Props>()

const activeRequestNames = ref<string[]>([])
const handleChangeActiveRequest = (val: string[]) => {
  activeRequestNames.value = val
}
</script>

<template>
  <el-collapse v-model="activeRequestNames" @change="handleChangeActiveRequest">
    <el-collapse-item :name="request.id" v-for="request in requests" :key="request.id">
      <template #title>
        <p :class="$style.title">{{ request.title }}</p>
      </template>
      <ul>
        <li v-for="document in request.documents" :key="document.id">
          <router-link :to="`/documents?documentId=${document.id}`">
            <el-button type="primary" link :class="$style.button">
              {{ document.title }}
            </el-button>
          </router-link>
        </li>
      </ul>
    </el-collapse-item>
  </el-collapse>
</template>

<style module>
.button {
  font-size: 16px;
}
.title {
  font-size: 16px;
}
</style>
