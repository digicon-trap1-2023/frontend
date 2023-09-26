import { ref, watch } from 'vue'
import { defineStore } from 'pinia'
import type { User } from '@/clients/user/types'

export const useMeStore = defineStore('me', () => {
  const me = ref<User>()

  const role = ref(me.value?.role ?? 'reader')

  watch(
    () => me.value !== undefined,
    () => {
      role.value = me.value?.role ?? 'reader'
    }
  )

  return { me, role }
})
