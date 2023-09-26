<script setup lang="ts">
import { ElDialog, ElAvatar, ElText, ElSpace, ElScrollbar, ElCard } from 'element-plus'
import { onMounted, ref, watch } from 'vue'

const props = defineProps<{
  src: string
  userId: string
  userName: string
  title: string
  description: string
}>()

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
      <img :src="props.src" :class="$style.img" ref="img" />
      <ElSpace
        :class="$style.description"
        direction="vertical"
        alignment="start"
        :style="{ width: imgWidth + 'px' }"
      >
        <ElSpace>
          <ElAvatar></ElAvatar>
          <div>
            <div>
              <ElText :class="$style.text">{{ userName }}</ElText>
            </div>
            <div>
              <ElText :class="$style.text" size="large" tag="b">{{ title }}</ElText>
            </div>
          </div>
        </ElSpace>
        <ElCard shadow="never" :class="$style.desctiptionCard">
          <div>
            <ElText>{{ description }}</ElText>
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
  container: inline-size;
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
.desctiptionCard {
  width: 100%;
}

.text {
  color: black;
}

.modal header button {
  z-index: 10000;
}
</style>
