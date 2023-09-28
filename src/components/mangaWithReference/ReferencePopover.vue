<script setup lang="ts">
import { ElPopover, ElButton, ElCard, ElImage, ElText, ElScrollbar } from 'element-plus'
import { ZoomIn } from '@element-plus/icons-vue'

const documents: { id: string; title: string; file: string }[] = [
  {
    id: 'b1b1325d-647f-4e13-94fe-ab422885dbe0',
    title: 'メディアドゥのオフィス',
    file: 'https://digicon-trap1-public.s3.amazonaws.com/image/b9c73652-aa15-48ca-bcdc-ced00f58fcd5.jpeg'
  },
  {
    id: 'ef4da557-8e62-4187-bfcc-13d324bc6f6f',
    title: 'チーズケーキ',
    file: 'https://digicon-trap1-public.s3.amazonaws.com/image/c8947b07-0272-4db4-9c3a-8b181c1e4667.jpeg'
  },
  {
    id: 'f3216b5d-2b88-4657-888a-0c54bf4ce292',
    title: 'pikachu',
    file: 'https://digicon-trap1-public.s3.amazonaws.com/image/b029fcc8-741d-4277-858e-1738d01b5a21.png'
  }
]

const emits = defineEmits<{
  (e: 'click', id: string): void
}>()
</script>

<template>
  <div :class="$style.popover">
    <el-popover :width="642" trigger="hover" placement="top-start" :style="{}">
      <template #reference>
        <el-button type="info" :icon="ZoomIn" circle :class="$style.infoButton" />
      </template>

      <ElScrollbar :view-class="$style.cardContainer" :wrap-style="{ width: '100%' }">
        <ElCard
          v-for="document in documents"
          :key="document.id"
          :body-class="$style.card"
          @click="emits('click', document.id)"
          shadow="hover"
          :style="{ width: 'fit-content' }"
        >
          <ElImage :src="document.file" :alt="document.title" :class="$style.image" fit="contain" />
          <ElText :class="$style.text" truncated>{{ document.title }}</ElText>
        </ElCard>
      </ElScrollbar>
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
  height: 350px;
  width: 100%;
}

.card {
  padding: 0;
  display: flex;
  flex-direction: column;
  cursor: pointer;
  width: fit-content;
}

.image {
  height: 200px;
  width: 300px;
}
span.text {
  font-size: 1.5rem;
  padding-block: 6px;
}
</style>
