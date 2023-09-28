<script setup lang="ts">
import { ElPopover, ElButton, ElCard, ElImage, ElText } from 'element-plus'
import { ZoomIn } from '@element-plus/icons-vue'

const documents: { id: string; title: string; file: string }[] = [
  {
    id: '1',
    title: 'example title1',
    file: 'https://placehold.jp/100x200.png'
  },
  {
    id: '2',
    title: 'example title2',
    file: 'https://placehold.jp/200x100.png'
  }
]

const emits = defineEmits<{
  (e: 'click', id: string): void
}>()
</script>

<template>
  <div :class="$style.popover">
    <el-popover :width="642" trigger="hover" placement="top-start">
      <template #reference>
        <el-button type="info" :icon="ZoomIn" circle :class="$style.infoButton" />
      </template>

      <div :class="$style.cardContainer">
        <ElCard
          v-for="document in documents"
          :key="document.id"
          :body-class="$style.card"
          @click="emits('click', document.id)"
          shadow="hover"
        >
          <ElImage :src="document.file" :alt="document.title" :class="$style.image" fit="cover" />
          <ElText size="large">{{ document.title }}</ElText>
        </ElCard>
      </div>
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

.cardContainer {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
}

.card {
  padding: 0;
  display: flex;
  flex-direction: column;
  cursor: pointer;
}

.image {
  height: 200px;
  width: 300px;
}
</style>
