<script setup lang="ts">
import DocumentCard from '@/components/Documents/DocumentCard.vue'
</script>

<template>
  <div :class="$style.about">
    <document-card
      img-src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png"
      username="noc7t"
      title="ハンバーガー"
    ></document-card>
    <document-card
      img-src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg"
      username="nokhnaton"
      title="よくわからん鳥"
    ></document-card>
  </div>
</template>

<style module>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    /* display: flex; */
    align-items: center;
  }
}
</style>
