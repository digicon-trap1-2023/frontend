<script setup lang="ts">
import ReferencePopover from '@/components/mangaWithReference/ReferencePopover.vue'
</script>

<template>
  <div>
    <h1>おかえり、初恋。</h1>
    <div :class="$style.images">
      <img src="@/assets/left.jpg" alt="left page" width="400px" :class="$style.image" />
      <img src="@/assets/right.jpg" alt="right page" witdh="400px" :class="$style.image" />
      <reference-popover :class="$style.popover1" />
      <reference-popover :class="$style.popover2" />
      <reference-popover :class="$style.popover3" />
    </div>
  </div>
</template>

<style module>
.images {
  text-align: center;
  position: relative;
}
.image {
  width: 400px;
}
.popover1 {
  top: 12px;
  left: 600px;
}
.popover2 {
  top: 140px;
  left: 980px;
}
.popover3 {
  top: 280px;
  left: 660px;
}
.infoButton {
  cursor: zoom-in;
}
</style>
