import { ref } from 'vue'
import { defineStore } from 'pinia'

export type Role = 'writer' | 'other'
export const useRoleStore = defineStore('role', () => {
  const role = ref<Role>('other')
  return { role }
})
