<script setup lang="ts">
import DocumentCard from '@/components/Documents/DocumentCard.vue'

const documents = [
  {
    imgSrc:
      'https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png',
    username: 'noc7t',
    title: 'ハンバーガー'
  },
  {
    imgSrc: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
    username: 'nokhnaton',
    title: 'よくわからん鳥'
  },
  {
    imgSrc: 'https://placehold.jp/150x150.png',
    username: 'noc7t',
    title: '四角'
  },
  {
    imgSrc: 'https://placehold.jp/150x300.png',
    username: 'nokhnaton',
    title: '四角'
  },
  {
    imgSrc: 'https://placehold.jp/300x150.png',
    username: 'noc7t',
    title: '四角'
  },
  {
    imgSrc: 'https://placehold.jp/450x300.png',
    username: 'nokhnaton',
    title: '四角'
  },
  {
    imgSrc: 'https://placehold.jp/250x250.png',
    username: 'noc7t',
    title: '四角'
  },
  {
    imgSrc: 'https://placehold.jp/1600x1200.png',
    username: 'nokhnaton',
    title: '四角'
  }
]
</script>

<template>
  <div v-masonry="1" transition-duration="0.3s" item-selector=".item" column-width="450">
    <div
      v-masonry-tile
      class="item"
      v-for="(item, index) in documents"
      :key="index"
      :class="$style.card"
    >
      <document-card
        :img-src="item.imgSrc"
        :username="item.username"
        :title="item.title"
      ></document-card>
    </div>
  </div>
</template>

<style module>
.card {
  width: 450px;
  padding: 10px;
}
</style>
