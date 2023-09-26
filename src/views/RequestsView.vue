<script setup lang="ts">
import { useFetchRequests } from '@/clients/request/apis'
import { computed } from 'vue'
import RequestForm from '@/components/request/RequestForm.vue'
import RequestList from '@/components/request/RequestList.vue'
import { useMeStore } from '@/stores/me'
import { storeToRefs } from 'pinia'

const meStore = useMeStore()
const { role } = storeToRefs(meStore)

const requests = useFetchRequests()

const description = computed(() =>
  role.value === 'writer'
    ? 'ここでは作家側から資料の要望を投稿することができます。'
    : 'ここでは作家の要望の確認と、それに沿った資料を投稿することができます。'
)
</script>

<template>
  <div>
    <h1>資料要望</h1>
    <p :class="$style.description">{{ description }}</p>
    <request-form :class="$style.requestForm" v-if="role === 'writer'" />
    <request-list :class="$style.requestList" :requests="requests" v-if="requests !== undefined" />
  </div>
</template>

<style module>
.description {
  margin-bottom: 2rem;
}
.requestForm {
  width: 80%;
}
.requestList {
  margin-top: 4rem;
  width: 80%;
}
</style>
