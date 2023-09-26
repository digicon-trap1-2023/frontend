<script setup lang="ts">
import { RouterView } from 'vue-router'
import { ElSwitch } from 'element-plus'
import { storeToRefs } from 'pinia'
import { useRoleStore } from '@/stores/role'
import { computed } from 'vue'

const roleStore = useRoleStore()
const { role } = storeToRefs(roleStore)

const roleCalc = computed({
  get: () => role.value === 'writer',
  set: (v: boolean) => {
    role.value = v ? 'writer' : 'reader'
  }
})
</script>

<template>
  <div :class="$style.container">
    <header :class="$style.header">
      <el-switch v-model="roleCalc" />
      {{ role }}
    </header>
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
