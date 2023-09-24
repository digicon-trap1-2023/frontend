<script setup lang="ts">
import { ElCard, ElButton, ElIcon, ElAvatar, ElText } from 'element-plus'
import { Star, StarFilled } from '@element-plus/icons-vue'
import { ref } from 'vue'

const props = defineProps<{
  imgSrc: string
  username: string
  title: string
}>()

const isStard = ref(false)
const isHoverd = ref(false)

const mouseEnter = () => (isHoverd.value = true)
const mouseLeave = () => (isHoverd.value = false)
</script>

<template>
  <el-card :body-class="$style.card" @mouseenter="mouseEnter" @mouseleave="mouseLeave">
    <img :src="props.imgSrc" :class="$style.image" />
    <div :class="$style.description" :is-hoverd="isHoverd">
      <ElAvatar></ElAvatar>
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
      @click="() => (isStard = !isStard)"
      :is-stard="isStard"
    >
      <template #icon>
        <ElIcon :size="30">
          <star-filled v-if="isStard" />
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
  opacity: 0.7;
}
.starButton:hover {
  opacity: 1;
}
.starButton[is-stard='true'] {
  opacity: 1;
}
</style>
