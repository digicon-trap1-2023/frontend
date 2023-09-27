<script setup lang="ts">
import { ElCard, ElButton, ElIcon, ElAvatar, ElText } from 'element-plus'
import { Star, StarFilled } from '@element-plus/icons-vue'
import { ref } from 'vue'
import { deleteBookmark, postBookmark } from '@/clients/document/apis'
import { randomColor } from '@/lib/random'

const props = defineProps<{
  imgSrc: string
  username: string
  title: string
  isBookmarked: boolean
  id: string
  width: number
  height: number
}>()

const isBookmarked = ref(props.isBookmarked)
const isHoverd = ref(false)

const mouseEnter = () => (isHoverd.value = true)
const mouseLeave = () => (isHoverd.value = false)

const toggleBookmark = async () => {
  if (isBookmarked.value) {
    await deleteBookmark(props.id)
  } else {
    await postBookmark(props.id)
  }
  isBookmarked.value = !isBookmarked.value
}

const avatarColor = randomColor()
</script>

<template>
  <el-card :body-class="$style.card" @mouseenter="mouseEnter" @mouseleave="mouseLeave">
    <img :src="props.imgSrc" :class="$style.image" :width="width" :height="height" />
    <div :class="$style.description" :is-hoverd="isHoverd">
      <ElAvatar :style="{ backgroundColor: avatarColor }">
        <span :class="$style.avatarName">
          {{ username.slice(0, 1) }}
        </span>
      </ElAvatar>
      <div>
        <div>
          <ElText :class="$style.text">{{ username }}</ElText>
        </div>
        <div>
          <ElText :class="$style.text" size="large" tag="b">{{ title }}</ElText>
        </div>
      </div>
    </div>
    <el-button
      circle
      :class="$style.starButton"
      @click.stop="toggleBookmark"
      :is-stard="isBookmarked"
      :is-hoverd="isHoverd"
    >
      <template #icon>
        <ElIcon :size="30">
          <star-filled v-if="isBookmarked" />
          <star v-else />
        </ElIcon>
      </template>
    </el-button>
  </el-card>
</template>

<style module>
.card {
  padding: 0px;
  position: relative;
  min-width: 200px;
}

.image {
  width: 100%;
  display: block;
  /* aspect-ratio: 1; */
}

.description {
  display: flex;
  gap: 0.5rem;
  align-items: center;
  position: absolute;
  bottom: 0px;
  width: 100%;
  padding: 1rem;
  background-color: white;
  opacity: 0;
  transition: 0.5s ease;
}
.description[is-hoverd='true'] {
  opacity: 0.7;
}

.text {
  color: black;
}

.starButton {
  position: absolute;
  bottom: 0px;
  right: 0px;
  height: 50px;
  width: 50px;
  opacity: 0;
}
.starButton[is-hoverd='true'] {
  transition: 0.5s ease;
  opacity: 1;
}
.starButton[is-stard='true'] {
  opacity: 1;
  color: var(--el-button-hover-text-color);
  border-color: var(--el-button-hover-border-color);
  background-color: var(--el-button-hover-bg-color);
  outline: 0;
}
.avatarName {
  font-size: 1.5rem;
  font-weight: bold;
}
</style>
