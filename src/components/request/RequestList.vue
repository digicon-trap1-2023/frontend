<script setup lang="ts">
import type { Request } from '@/clients/request/types'
import { ElCard, ElButton, ElAvatar, ElSpace, ElTag } from 'element-plus'
import { Delete } from '@element-plus/icons-vue'
import { deleteRequest } from '@/clients/request/apis'
import { useMeStore } from '@/stores/me'
import { storeToRefs } from 'pinia'
import { randomColor } from '@/lib/random'

interface Props {
  requests: Request[]
}

defineProps<Props>()

const emit = defineEmits<{
  (e: 'delete', requestId: string): void
}>()

const meStore = useMeStore()
const { me, role } = storeToRefs(meStore)

const handleDeleteRequest = async (requestId: string) => {
  await deleteRequest(requestId)
  emit('delete', requestId)
}
</script>

<template>
  <ul :class="$style.list">
    <li v-for="request in requests" :key="request.id" :class="$style.listItem">
      <el-avatar size="large" :style="{ backgroundColor: randomColor() }" :title="request.created_by">
        <span :class="$style.avatarName">{{ request.created_by.slice(0, 1) }}</span>
      </el-avatar>
      <div :class="$style.cardContainer">
        <div :class="$style.header">
          <span :class="$style.username">{{ request.created_by }}</span>
          <el-button
            v-if="role === 'writer' && request.created_by === me?.name"
            type="danger"
            :icon="Delete"
            @click="handleDeleteRequest(request.id)"
          />
          <router-link v-else-if="role === 'reader'" :to="`/documents/new?requestId=${request.id}`">
            <el-button type="primary">この要望に対して資料を追加する</el-button>
          </router-link>
        </div>
        <el-card>
          <template #header>
            <div>
              {{ request.title }}
            </div>
          </template>
          <p :class="$style.description">
            {{ request.description }}
          </p>
          <ElSpace :class="$style.tags">
            <ElTag v-for="tag in request.tags" :key="tag">{{ tag }}</ElTag>
          </ElSpace>
        </el-card>
      </div>
    </li>
  </ul>
</template>

<style module>
.list {
  list-style: none;
  padding-left: 0;
}
.listItem {
  display: flex;
  gap: 12px;
}
.listItem:not(:last-child) {
  margin-bottom: 2rem;
}
.header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 1rem;
}
.avatarName {
  font-size: 1.5rem;
  font-weight: bold;
}
.cardContainer {
  width: 100%;
}
.username {
  font-size: 1.25rem;
  font-weight: bold;
}
.description {
  white-space: pre-wrap;
  margin-block-start: 0;
  margin-block-end: 0;
}
.tags {
  margin-top: 1.5rem;
}
</style>
