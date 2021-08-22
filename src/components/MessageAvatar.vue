<template>
  <div class="message-avatar">
    <img class="message-avatar-image" :src="src" />
  </div>
</template>

<script setup>
import PropTypes from '../_utils/vue-types'
import defaultAvatar from '../images/default.png'

defineProps({
  src: PropTypes.string.def(defaultAvatar)
})
</script>

<style scoped>
.message-avatar {
  @apply flex-shrink-0 w-10 h-10 shadow-lg rounded overflow-hidden;
}
</style>
