import { ref } from 'vue'
import { defineStore } from 'pinia'

export type Role = 'writer' | 'reader'
export const useRoleStore = defineStore('role', () => {
  const role = ref<Role>('reader')
  return { role }
})
