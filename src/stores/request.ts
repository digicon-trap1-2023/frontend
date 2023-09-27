import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { Request } from '@/clients/request/types'

export const useRequestStore = defineStore('request', () => {
  const requests = ref<Request[]>([])

  return { requests }
})
