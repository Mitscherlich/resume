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
  @apply bg-gray-100 dark:bg-gray-500 bg-opacity-60;
  @apply backdrop-filter backdrop-blur-sm;
}

.logo-wrapper {
  @apply w-40 h-40 mb-10 bg-white rounded-lg shadow-lg;
}

.content {
  @apply mb-4 mx-5 text-lg text-gray-800 text-center;
}

.checkbox-wrapper {
  @apply flex items-center;
}

input {
  @apply appearance-none h-6 w-6 border border-gray-300 rounded-md;
  @apply checked:bg-green-600 checked:border-transparent focus:outline-none;
}

input:checked {
  background-image: url("data:image/svg+xml,%3csvg viewBox='0 0 16 16' fill='white' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M5.707 7.293a1 1 0 0 0-1.414 1.414l2 2a1 1 0 0 0 1.414 0l4-4a1 1 0 0 0-1.414-1.414L7 8.586 5.707 7.293z'/%3e%3c/svg%3e");
  background-size: 100% 100%;
  background-position: 50%;
  background-repeat: no-repeat;
}

label {
  @apply text-sm text-gray-600 select-none;
}
</style>

<style>
.mask .content a {
  @apply text-green-700 transition-colors mx-2;
}

.mask .content a:hover {
  @apply text-green-800;
}
</style>
