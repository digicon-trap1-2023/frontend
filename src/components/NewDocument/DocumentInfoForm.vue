<script setup lang="ts">
import { computed } from 'vue'
// NOTE: ElSelectV2使うかも？
import { ElFormItem, ElInput, ElSelect, ElOption } from 'element-plus'
import type { Form } from '@/views/NewDocumentView.vue'

interface Props {
  modelValue: Form
  tags: { label: string; value: string }[]
}

const props = defineProps<Props>()

const emit = defineEmits<{
  (e: 'update:modelValue', form: Form): void
}>()

const titleVModel = computed({
  get: () => props.modelValue.title,
  set: (v) => {
    const value = {
      ...props.modelValue,
      title: v
    }
    emit('update:modelValue', value)
  }
})
const descriptionVModel = computed({
  get: () => props.modelValue.description,
  set: (v) => {
    const value = {
      ...props.modelValue,
      description: v
    }
    emit('update:modelValue', value)
  }
})
const tagsVModel = computed({
  get: () => props.modelValue.tags,
  set: (v) => {
    const value = {
      ...props.modelValue,
      tags: v
    }
    emit('update:modelValue', value)
  }
})
</script>

<template>
  <div>
    <el-form-item label="タイトル">
      <el-input v-model="titleVModel" size="large" placeholder="タイトルを入力" />
    </el-form-item>
    <el-form-item label="説明">
      <el-input
        v-model="descriptionVModel"
        size="large"
        type="textarea"
        :rows="4"
        placeholder="説明文を入力"
        :autosize="{ minRows: 4 }"
      />
    </el-form-item>
    <el-form-item label="タグ">
      <el-select
        multiple
        filterable
        allow-create
        default-first-option
        :reserve-keyword="false"
        placeholder="検索時に使用できるタグを選択"
        v-model="tagsVModel"
        :class="$style.tagSelect"
        size="large"
      >
        <el-option v-for="tag in tags" :key="tag.value" :label="tag.label" :value="tag.value" />
      </el-select>
    </el-form-item>
  </div>
</template>

<style module>
.tagSelect {
  width: 100%;
}
</style>
