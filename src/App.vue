<script setup lang="ts">
import { RouterView } from 'vue-router'
</script>

<template>
  <div :class="$style.container">
    <header :class="$style.header">todo</header>
    <main :class="$style.pageContainer">
      <RouterView />
    </main>
  </div>
</template>

<style module>
.container {
  background-color: #fffbda;
  height: 100vh;
}
.header {
  height: 64px;
  background-color: #d9d9d9;
}
.pageContainer {
  border-radius: 60px 60px 0 0;
  background-color: #fffef7;
  margin: 40px 180px 0;
  padding: 32px 100px;
  height: 100%;
}
</style>
