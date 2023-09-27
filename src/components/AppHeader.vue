<script setup lang="ts">
import { ElSwitch, ElButton } from 'element-plus'
import { storeToRefs } from 'pinia'
import { useMeStore } from '@/stores/me'
import { computed, watch } from 'vue'
import { useFetchMe } from '@/clients/user/apis'
import { useRoute } from 'vue-router'

const route = useRoute()
const meData = useFetchMe()

const meStore = useMeStore()
const { me, role } = storeToRefs(meStore)

const roleCalc = computed({
  get: () => role.value === 'writer',
  set: (v: boolean) => {
    role.value = v ? 'writer' : 'reader'
  }
})

watch(meData, () => {
  me.value = meData.value
})
</script>

<template>
  <header :class="$style.header">
    <div :class="$style.leftContainer">
      <div :class="$style.title">Comic DoQ</div>
      <nav :class="$style.nav">
        <router-link to="/documents">
          <el-button type="primary" link :disabled="route.path === '/documents'">
            資料一覧
          </el-button>
        </router-link>
        <router-link to="/documents/new" v-if="role === 'reader'">
          <el-button type="primary" link :disabled="route.path === '/documents/new'">
            資料投稿
          </el-button>
        </router-link>
        <router-link to="/requests">
          <el-button type="primary" link :disabled="route.path === '/requests'">要望一覧</el-button>
        </router-link>
        <router-link to="me">
          <el-button type="primary" link :disabled="route.path === '/me'">マイページ</el-button>
        </router-link>
      </nav>
    </div>
    <div>
      <el-switch v-model="roleCalc" />
      {{ role }}
    </div>
  </header>
</template>

<style module>
.header {
  height: 64px;
  background-color: #fffef7;
  padding: 0 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.leftContainer {
  display: flex;
  align-items: center;
  gap: 32px;
}
.title {
  font-size: 24px;
  font-weight: bold;
}
.nav {
  display: flex;
  align-items: center;
  gap: 16px;
}
</style>
