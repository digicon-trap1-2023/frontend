<script setup lang="ts">
import { ElPopover, ElButton } from 'element-plus'
import { ZoomIn } from '@element-plus/icons-vue'

const documents: { id: string; title: string }[] = [
  {
    id: '1',
    title: 'example title1'
  },
  {
    id: '2',
    title: 'example title2'
  }
]
</script>

<template>
  <div :class="$style.popover">
    <el-popover :width="400" trigger="hover" placement="top-start">
      <template #reference>
        <el-button type="info" :icon="ZoomIn" circle :class="$style.infoButton" />
      </template>
      <ul>
        <li v-for="document in documents" :key="document.id">
          <router-link :to="`/documents/documentId=${document.id}`">
            {{ document.title }}
          </router-link>
        </li>
      </ul>
    </el-popover>
  </div>
</template>

<style module>
.popover {
  position: absolute;
}
.infoButton {
  cursor: zoom-in;
}
</style>
