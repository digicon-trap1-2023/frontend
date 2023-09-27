<script setup lang="ts">
import { RouterView } from 'vue-router'
import AppHeader from '@/components/AppHeader.vue'
import { ElScrollbar } from 'element-plus'
</script>

<template>
  <div :class="$style.container">
    <ElScrollbar>
      <app-header />
      <main :class="$style.pageContainer">
        <RouterView />
      </main>
    </ElScrollbar>
  </div>
</template>

<style module>
.container {
  background-color: #fffbda;
  height: 100vh;
  color: #333333;
}
.pageContainer {
  border-radius: 60px 60px 0 0;
  background-color: #fffef7;
  margin: 40px 180px 0;
  padding: 32px 100px;
  height: 100%;
}
</style>
