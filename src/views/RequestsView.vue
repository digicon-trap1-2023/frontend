<script setup lang="ts">
import { useFetchRequests } from '@/clients/request/apis'
import { computed, watch } from 'vue'
import RequestForm from '@/components/request/RequestForm.vue'
import RequestList from '@/components/request/RequestList.vue'
import { useMeStore } from '@/stores/me'
import { useRequestStore } from '@/stores/request'
import { storeToRefs } from 'pinia'
import type { Request } from '@/clients/request/types'

const meStore = useMeStore()
const { role } = storeToRefs(meStore)
const requestStore = useRequestStore()
const { requests: requestsInStore } = storeToRefs(requestStore)

const requests = useFetchRequests()

const description = computed(() =>
  role.value === 'writer'
    ? 'ここでは作家側から資料の要望を投稿することができます。'
    : 'ここでは作家の要望の確認と、それに沿った資料を投稿することができます。'
)

const handleCreateRequest = (request: Request) => {
  requests.value?.unshift(request)
  requestsInStore.value.unshift(request)
}
const handleDeleteRequest = (requestId: string) => {
  requests.value = requests.value?.filter((request) => request.id !== requestId)
  requestsInStore.value = requestsInStore.value.filter((request) => request.id !== requestId)
}

watch(
  () => requests.value !== undefined,
  () => {
    if (requests.value !== undefined) {
      requestsInStore.value = requests.value
    }
  }
)
</script>

<template>
  <div>
    <h1>資料要望</h1>
    <p :class="$style.description">{{ description }}</p>
    <request-form
      :class="$style.requestForm"
      v-if="role === 'writer'"
      @submit="handleCreateRequest($event)"
    />
    <request-list
      :class="$style.requestList"
      :requests="requests"
      v-if="requests !== undefined"
      @delete="handleDeleteRequest($event)"
    />
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
