<script setup lang="ts">
import { useFetchRequests } from '@/clients/request/apis'
import RequestForm from '@/components/request/RequestForm.vue'
import RequestList from '@/components/request/RequestList.vue'

const requests = useFetchRequests()
</script>

<template>
  <div>
    <h1>資料要望</h1>
    <p :class="$style.description">ここでは作家側から資料の要望を投稿することができます。</p>
    <request-form :class="$style.requestForm" />
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
