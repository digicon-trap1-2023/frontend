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
  <div>
    <h1>おかえり、初恋。</h1>
    <div :class="$style.images">
      <img src="@/assets/left.jpg" alt="left page" width="400px" :class="$style.image" />
      <img src="@/assets/right.jpg" alt="right page" witdh="400px" :class="$style.image" />
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
    </div>
  </div>
</template>

<style module>
.images {
  text-align: center;
  position: relative;
}
.image {
  width: 400px;
}
.popover {
  position: absolute;
  top: 12px;
  left: 600px;
}
.infoButton {
  cursor: zoom-in;
}
</style>
