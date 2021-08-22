<template>
  <div v-if="show" class="mask" @click.self.stop="$emit('toggle', !show)">
    <div class="logo-wrapper">
      <img class="logo" :src="logo" alt="logo" />
    </div>

    <div class="content">
      <component :is="content" />
    </div>

    <div class="checkbox-wrapper">
      <input class="mr-2" id="input-dismiss" type="checkbox" v-model="state" />
      <label for="input-dismiss">不再展示</label>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import storage from 'store'
import PropTypes from '../_utils/vue-types'

const props = defineProps({
  logo: PropTypes.string,
  content: PropTypes.VNodeChild,
  show: PropTypes.bool.def(!storage.get('MASK_DISSMISS', false))
})

const state = ref(!props.show)

watch(state, () => {
  storage.set('MASK_DISSMISS', state.value)
})
</script>

<style scoped>
.mask {
  @apply w-full h-full absolute z-50;
  @apply flex flex-col items-center justify-center;
  @apply bg-white dark:bg-gray-400 bg-opacity-75;
  @apply backdrop-blur-sm;
  backdrop-filter: var(--tw-backdrop-blur);
}

.logo-wrapper {
  @apply w-40 h-40 mb-10;
  @apply bg-white rounded-lg shadow-lg;
}

.content {
  @apply text-lg text-gray-800 text-center;
  @apply mb-4 mx-5;
}

.checkbox-wrapper {
  @apply flex items-center;
}

label {
  @apply text-sm text-gray-600 select-none;
}
</style>

<style>
.mask .content a {
  @apply mx-2;
  @apply text-green-700;
  transition: color 0.3s ease-in-out;
}

.mask .content a:hover {
  @apply text-green-800;
}
</style>
