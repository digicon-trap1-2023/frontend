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
import { Star, StarFilled, Check, CircleCheckFilled, ArrowDown } from '@element-plus/icons-vue'
import { postBookmark, postReferenced } from '@/clients/document/apis'
import { useRoleStore } from '@/stores/role'
import { storeToRefs } from 'pinia'

const props = defineProps<{
  document: DocumentDetail
}>()

const roleStore = useRoleStore()
const { role } = storeToRefs(roleStore)
const isBookmarked = ref(props.document.bookmarked)
const isReferenced = ref(props.document.referenced)

const img = ref<HTMLImageElement>()

const imgWidth = ref(0)

const scrollHeight = ref(0)

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
    <ElScrollbar
      height="100%"
      :wrap-class="$style.scrollbar"
      :view-class="$style.scrollbar"
      @scroll="
        (e: any) => {
          scrollHeight = e.scrollTop
        }
      "
    >
      <div :class="$style.imgContainer">
        <img :src="props.document.file" :class="$style.img" ref="img" />
        <div :is-Show="scrollHeight === 0" :class="$style.imgOverlay">
          <ElIcon size="100px"><ArrowDown /></ElIcon>
        </div>
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
          <div :class="$style.buttonContainer" v-if="role === 'writer'">
            <el-button
              :class="$style.button"
              @click="
                async () => {
                  await postBookmark(document.id)
                  isBookmarked = !isBookmarked
                }
              "
              :is-enabled="isBookmarked"
            >
              <template #icon>
                <ElIcon :size="30">
                  <star-filled v-if="isBookmarked" />
                  <star v-else />
                </ElIcon>
              </template>
              ブックマーク
            </el-button>
            <el-button
              :class="$style.button"
              @click="
                async () => {
                  await postReferenced(document.id)
                  isReferenced = !isReferenced
                }
              "
              :is-enabled="isReferenced"
            >
              <template #icon>
                <ElIcon :size="30">
                  <CircleCheckFilled v-if="isReferenced" />
                  <Check v-else />
                </ElIcon>
              </template>
              参考にした
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
  position: relative;
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
  width: 100%;
}
.button + .button {
  margin: 0;
}
.button[is-enabled='true'] {
  color: var(--el-button-hover-text-color);
  border-color: var(--el-button-hover-border-color);
  background-color: var(--el-button-hover-bg-color);
}
.buttonContainer {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.imgOverlay {
  position: absolute;
  bottom: 0;
  width: 100%;
  background: linear-gradient(rgba(255, 255, 255, 0) 0, rgba(0, 0, 0, 0.3) 200px);
  height: 200px;
  display: flex;
  align-items: end;
  justify-content: center;
  transition: 0.5s ease;
  opacity: 0;
}
.imgOverlay[is-show='true']:hover {
  opacity: 1;
}
</style>
