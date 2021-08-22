<template>
  <div class="nav-bar">
    <span class="title">{{ displayTtile }}</span>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useHead } from '@vueuse/head'
import PropTypes from '../_utils/vue-types'

const props = defineProps({
  title: PropTypes.string.def('文件传输助手'),
  typing: PropTypes.bool
})

const displayTtile = computed(() =>
  props.typing ? '正在输入...' : props.title
)

useHead({
  title: displayTtile
})
</script>

<style scoped>
.nav-bar {
  @apply flex items-center justify-center h-full;
  @apply sm:text-sm text-gray-900 font-bold;
}
</style>
