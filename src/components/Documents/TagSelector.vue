<script setup lang="ts">
import { useFetchTags } from '@/clients/tag/apis'
import { ElSelectV2 } from 'element-plus'
import { computed, ref } from 'vue'

const emits = defineEmits<{ (e: 'change', tags: string[]): void }>()

const value = ref<string[]>([])
const tags = useFetchTags()

const options = computed(() => tags.value?.map((v) => ({ value: v.id, label: v.name })))
</script>

<template>
  <ElSelectV2
    v-if="options"
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
