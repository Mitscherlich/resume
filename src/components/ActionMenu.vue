<template>
  <div class="action-menu" @click="handleClick" ref="menuEl">
    <span v-if="hasSubMenu" class="chevron">{{ showPopup ? '▼' : '▲' }}</span>
    <span class="action-menu-text">{{ text }}</span>
  </div>

  <transition name="slide-down">
    <div v-if="hasSubMenu && showPopup" class="action-menu-popup">
      <ActionMenuItem
        v-for="{ id, text } in menu"
        :key="id"
        v-bind="{ id, text }"
        @click="emit('action', id)"
      />
    </div>
  </transition>
</template>

<script setup>
import { computed, ref } from 'vue'
import { onClickOutside } from '@vueuse/core'
import ActionMenuItem from './ActionMenuItem.vue'
import PropTypes from '../_utils/vue-types'

const props = defineProps({
  id: PropTypes.string.isRequired,
  text: PropTypes.string,
  menu: PropTypes.array
})

const emit = defineEmits(['action'])

const hasSubMenu = computed(
  () => Array.isArray(props.menu) && props.menu.length > 0
)

const showPopup = ref(false)

const handleClick = () => {
  if (hasSubMenu.value) {
    showPopup.value = !showPopup.value
  } else {
    emit('action', props.id)
  }
}

const menuEl = ref(null)

onClickOutside(menuEl, () => {
  showPopup.value = false
})
</script>

<style scoped>
.action-menu {
  @apply flex-1 relative;
  @apply text-sm sm:text-xs text-center select-none;
}

.chevron {
  @apply text-gray-600 text-sm sm:text-xs;
}

.action-menu-text {
  @apply text-gray-800;
}

.action-menu-popup {
  @apply absolute top-0 w-1/3 m-2 mb-4;
  @apply transform-gpu;
  @apply rounded overflow-hidden;
  @apply shadow-lg;
  background: #f7f7f7;

  --tw-translate-y: calc(-100% - 20px);
}

.action-menu-popup::after {
  @apply absolute;
  content: '';
}
</style>
