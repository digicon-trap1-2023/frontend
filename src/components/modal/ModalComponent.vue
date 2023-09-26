<script setup lang="ts">
import type { DocumentDetail } from '@/clients/document/types'
import {
  ElDialog,
  ElAvatar,
  ElText,
  ElSpace,
  ElScrollbar,
  ElCard,
  ElTag,
  ElButton,
  ElIcon
} from 'element-plus'
import { ref, watch } from 'vue'
import { Star, StarFilled, Check, CircleCheckFilled } from '@element-plus/icons-vue'

const props = defineProps<{
  document: DocumentDetail
}>()

const isBookmarked = ref(props.document.bookmarked)
const isReferenced = ref(props.document.referenced)

const img = ref<HTMLImageElement>()

const imgWidth = ref(0)

const observer = new ResizeObserver((entries) => (imgWidth.value = entries[0].contentRect.width))
watch(
  () => img.value,
  (after, before) => {
    if (before) {
      observer.unobserve(before)
    }
    if (after) {
      observer.observe(after)
    }
  },
  { immediate: true }
)
</script>

<template>
  <ElDialog append-to-body lock-scroll :class="$style.modal" top="5vh">
    <ElScrollbar height="100%" :wrap-class="$style.scrollbar" :view-class="$style.scrollbar">
      <div :class="$style.imgContainer">
        <img :src="props.document.file" :class="$style.img" ref="img" />
      </div>

      <ElSpace
        :class="$style.description"
        direction="vertical"
        alignment="start"
        :style="{ width: imgWidth + 'px' }"
      >
        <div :class="$style.title">
          <div>
            <ElSpace>
              <ElAvatar :class="$style.avatar"></ElAvatar>
              <div>
                <div>
                  <ElText :class="$style.text">{{ document.userName }}</ElText>
                </div>
                <div>
                  <ElText :class="$style.text" size="large" tag="b">{{ document.title }}</ElText>
                </div>
              </div>
            </ElSpace>
          </div>
          <div :class="$style.buttonContainer">
            <el-button
              circle
              :class="$style.button"
              @click="() => (isBookmarked = !isBookmarked)"
              :is-enabled="isBookmarked"
            >
              <template #icon>
                <ElIcon :size="30">
                  <star-filled v-if="isBookmarked" />
                  <star v-else />
                </ElIcon>
              </template>
            </el-button>
            <el-button
              circle
              :class="$style.button"
              @click="() => (isReferenced = !isReferenced)"
              :is-enabled="isReferenced"
            >
              <template #icon>
                <ElIcon :size="30">
                  <CircleCheckFilled v-if="isReferenced" />
                  <Check v-else />
                </ElIcon>
              </template>
            </el-button>
          </div>
        </div>
        <ElCard shadow="never" :class="$style.desctiptionCard">
          <template #header>
            <ElSpace>
              <ElTag v-for="tag in document.tags" :key="tag.id">{{ tag.name }}</ElTag>
            </ElSpace>
          </template>
          <div>
            <ElText>{{ document.description }}</ElText>
          </div>
        </ElCard>
      </ElSpace>
    </ElScrollbar>
  </ElDialog>
</template>

<style module>
.modal {
  max-width: 90vw;
  width: fit-content;
  min-width: 800px;
  height: 90vh;
  margin-bottom: 0;
  overscroll-behavior: contain;
  overflow-y: auto;
}

.modal > header {
  padding: 0;
}
.modal > div,
.scrollbar {
  width: 100%;
  height: 100%;
  padding: 0;
}
.imgContainer {
  width: 100%;
  height: 100%;
  background-color: var(--el-color-primary-light-9, #c6e2ff);
}
.img {
  width: 100%;
  height: 100%;
  object-fit: contain;
  display: block;
}
.description {
  padding: 12px;
  box-sizing: border-box;
}

.description div:has(.desctiptionCard),
.description div:has(.title),
.desctiptionCard {
  width: 100%;
}

.text {
  color: black;
}

.modal header button {
  z-index: 10000;
}

.title {
  width: 100%;
  justify-content: space-between;
  align-items: center;
  display: flex;
}

.avatar {
  width: 40px;
  height: 40px;
}

.button {
  height: 50px;
  width: 50px;
  min-height: 50px;
  min-width: 50px;
  max-height: 50px;
  max-width: 50px;
}
.button[is-enabled='true'] {
  color: var(--el-button-hover-text-color);
  border-color: var(--el-button-hover-border-color);
  background-color: var(--el-button-hover-bg-color);
}
.buttonContainer {
  width: 120px;
  min-width: 120px;
  max-width: 120px;
}
</style>
