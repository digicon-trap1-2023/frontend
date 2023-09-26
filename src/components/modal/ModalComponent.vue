<script setup lang="ts">
import { ElDialog } from 'element-plus'

const props = defineProps<{
  src: string
  userId: string
  userName: string
}>()
</script>

<template>
  <ElDialog append-to-body lock-scroll :class="$style.modal" top="5vh">
    <img src="https://placehold.jp/1000x1000.png" :class="$style.img" />
  </ElDialog>
</template>

<style module>
.modal {
  max-width: 90vw;
  width: fit-content;
  height: 90vh;
  margin-bottom: 0;
  overscroll-behavior: contain;
}
.modal > header {
  padding: 0;
}
.modal > div {
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
</style>
