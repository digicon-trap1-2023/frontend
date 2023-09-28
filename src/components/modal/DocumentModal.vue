<script setup lang="ts">
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
import {
  deleteBookmark,
  deleteReferenced,
  postBookmark,
  postReferenced
} from '@/clients/document/apis'
import { useMeStore } from '@/stores/me'
import { storeToRefs } from 'pinia'
import { useFetchDocumentDetail } from '@/clients/document/apis'
import { randomColor } from '@/lib/random'

const props = defineProps<{
  documentId: string
}>()

const emits = defineEmits<{
  (e: 'mutate'): void
}>()

const document = useFetchDocumentDetail(props.documentId)

const meStore = useMeStore()
const { role } = storeToRefs(meStore)
const isBookmarked = ref(document.value?.bookmarked ?? false)
const isReferenced = ref(document.value?.referenced ?? false)

const img = ref<HTMLImageElement>()
const description = ref<HTMLDivElement>()
const scroll = ref<HTMLDivElement>()

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

const toggleBookmark = async () => {
  if (isBookmarked.value) {
    await deleteBookmark(props.documentId)
  } else {
    await postBookmark(props.documentId)
  }
  isBookmarked.value = !isBookmarked.value
  emits('mutate')
}

const toggleReferenced = async () => {
  if (isReferenced.value) {
    await deleteReferenced(props.documentId)
  } else {
    await postReferenced(props.documentId)
  }
  isReferenced.value = !isReferenced.value
  emits('mutate')
}
const scrollToDiscription = async () => {
  if (scrollHeight.value === 0 && scroll.value && img.value) {
    scroll.value.scrollTo({
      top: img.value.height,
      behavior: 'smooth'
    })
  }
}

const avatarColor = randomColor()
</script>

<template>
  <ElDialog
    append-to-body
    lock-scroll
    :class="$style.modal"
    top="5vh"
    v-if="document !== undefined"
  >
    <ElScrollbar
      height="100%"
      :wrap-class="$style.scrollbar"
      :view-class="$style.scrollbar"
      @scroll="(e: any) => (scrollHeight = e.scrollTop)"
      ref="scroll"
    >
      <div :class="$style.imgContainer">
        <img :src="document.file" :class="$style.img" ref="img" />
        <div :is-Show="scrollHeight === 0" :class="$style.imgOverlay" @click="scrollToDiscription">
          <ElIcon size="100px"><ArrowDown /></ElIcon>
        </div>
      </div>

      <ElSpace
        :class="$style.description"
        direction="vertical"
        alignment="start"
        :style="{ width: imgWidth + 'px' }"
        ref="description"
      >
        <div :class="$style.title">
          <div>
            <ElSpace>
              <ElAvatar :class="$style.avatar" :style="{ backgroundColor: avatarColor }">
                <span :class="$style.avatarName">
                  {{ document.user_name.slice(0, 1) }}
                </span>
              </ElAvatar>
              <div>
                <div>
                  <ElText :class="$style.text">{{ document.user_name }}</ElText>
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
              @click="toggleBookmark"
              :is-enabled="isBookmarked"
              size="large"
            >
              <template #icon>
                <ElIcon :size="28" :class="$style.icon">
                  <star-filled v-if="isBookmarked" />
                  <star v-else />
                </ElIcon>
              </template>
              ブックマーク
            </el-button>
            <el-button
              :class="$style.button"
              @click="toggleReferenced"
              :is-enabled="isReferenced"
              size="large"
            >
              <template #icon>
                <ElIcon :size="28" :class="$style.icon">
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
  padding: 24px;
  box-sizing: border-box;
  display: flex;
  gap: 8px;
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
  gap: 8px;
}

.avatar {
  width: 40px;
  height: 40px;
}

.button {
  width: 100%;
  justify-content: start;
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
  cursor: pointer;
  opacity: 1;
}
.icon {
  margin-right: 8px;
}
.avatarName {
  font-size: 1.5rem;
  font-weight: bold;
}
</style>
