<script setup lang="ts">
import type { Request } from '@/clients/request/types'
import { ElCard, ElButton, ElIcon, ElAvatar } from 'element-plus'
import { Delete } from '@element-plus/icons-vue'
import { deleteRequest } from '@/clients/request/apis'

interface Props {
  requests: Request[]
}

defineProps<Props>()

const handleDeleteRequest = async (requestId: string) => {
  await deleteRequest(requestId)
}
</script>

<template>
  <ul :class="$style.list">
    <li v-for="request in requests" :key="request.id" :class="$style.listItem">
      <el-avatar size="large">
        <span :class="$style.avatarName">{{ request.created_by.slice(0, 1) }}</span>
      </el-avatar>
      <div :class="$style.cardContainer">
        <div :class="$style.header">
          <span :class="$style.username">{{ request.created_by }}</span>
          <el-button class="button" type="danger" @click="handleDeleteRequest(request.id)">
            <el-icon class="el-icon--delete">
              <delete />
            </el-icon>
          </el-button>
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
}
</style>
