<template>
  <div class="message-title">{{ content }}</div>
</template>

<script setup>
import PropTypes from '../_utils/vue-types'

defineProps({
  content: PropTypes.string
})
</script>

<style scoped>
.message-title {
  @apply bg-gray-500 bg-opacity-30 rounded-full;
  @apply mx-auto mb-3 px-4 w-auto;
  @apply text-xs text-gray-200 text-center;
}
</style>
