<script setup lang="ts">
import { ElSelectV2 } from 'element-plus'
import { computed, ref } from 'vue'

const emits = defineEmits<{ (e: 'change', tags: string[]): void }>()

const initials = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j']
const value = ref<string[]>([])
const tags = Array.from({ length: 1000 }).map((_, idx) => ({
  id: `Option${idx + 1}`,
  name: `${initials[idx % 10]}${idx}`
}))

const options = computed(() => tags.map((v) => ({ value: v.id, label: v.name })))
</script>

<template>
  <ElSelectV2
    v-model="value"
    filterable
    :options="options"
    placeholder="Please select"
    multiple
    clearable
    @change="emits('change', value)"
    :class="$style.select"
    :height="340"
    size="large"
  />
</template>

<style module>
.select {
  width: 100%;
}
</style>
