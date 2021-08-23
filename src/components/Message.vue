<template>
  <section class="message" :class="{ [type]: type, typing }">
    <MessageAvatar :src="isReceive ? avatar : undefined" />
    <div class="message-content">
      <div class="message-spinner" v-if="typing" />

      <div v-else v-html="content" />
    </div>
  </section>
</template>

<script setup>
import { computed } from 'vue'
import PropTypes from '../_utils/vue-types'
import avatar from '../images/avatar.png'
import MessageAvatar from './MessageAvatar.vue'

const props = defineProps({
  type: PropTypes.string,
  typing: PropTypes.bool,
  content: PropTypes.string
})

const isReceive = computed(() => props.type === 'receive')
</script>

<style scoped>
.message {
  @apply flex mb-3;
}

.message.receive {
  @apply mr-auto;
}

.message.receive .message-content {
  @apply ml-2;
  background: #f7f7f7;
}

.message.send {
  @apply flex-row-reverse ml-auto;
}

.message.send .message-content {
  @apply mr-2;
  background: #96ea70;
}

.message-content {
  @apply flex items-center;
  @apply relative w-auto px-2 py-1;
  @apply text-sm sm:text-xs text-gray-800 shadow-lg rounded;
  background: #f7f7f7;
  min-width: 100px;
  min-height: 28px;
  line-height: 28px;
}

.message-spinner,
.message-spinner::before,
.message-spinner::after {
  @apply rounded-full;
  width: 1em;
  height: 1em;
  animation-fill-mode: both;
  animation: typing 1.8s infinite ease-in-out;
}

.message-spinner {
  @apply relative mx-auto my-1 transform-gpu;
  top: -2.5em;
  color: #ccc;
  text-indent: -9999em;
  animation-delay: -0.16s;
}

.message-spinner::before,
.message-spinner::after {
  @apply absolute;
  content: '';
}

.message-spinner::before {
  left: -1.5em;
  animation-delay: -0.32s;
}

.message-spinner::after {
  left: 1.5em;
}

@keyframes typing {
  /* prettier-ignore */
  0%, 80%, 100% {
    box-shadow: 0 2.5em 0 -1.3em;
  }
  40% {
    box-shadow: 0 2.5em 0 0;
  }
}
</style>

<style>
.message-content a {
  @apply text-green-600 transition-all;
}

.message-content a:hover {
  @apply text-green-800;
}
</style>
