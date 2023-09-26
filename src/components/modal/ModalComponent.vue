<script setup lang="ts">
import { ElDialog } from 'element-plus'
import { ref } from 'vue'

// const props = defineProps<{
//   // onClose: () => void
// }>()
</script>

<template>
  <ElDialog>
    <slot />
  </ElDialog>
</template>

<style module>
.modalOutside {
  position: fixed;
  background-color: black;
  opacity: 0.4;
}
</style>
