<template>
  <div class="action-menu-item" @click.stop="emit('click', id)">
    <span class="action-menu-item-text">{{ text }}</span>
  </div>
</template>

<script setup>
import PropTypes from '../_utils/vue-types'

defineProps({
  id: PropTypes.string.isRequired,
  text: PropTypes.string
})

const emit = defineEmits(['click'])
</script>

<style scoped>
.action-menu-item {
  @apply flex items-center justify-center h-10 sm:h-8;
}

.action-menu-item:not(:last-child) {
  @apply border-b;
}

.action-menu-item-text {
  @apply px-2 py-1;
  @apply text-sm sm:text-xs text-center;
}
</style>
