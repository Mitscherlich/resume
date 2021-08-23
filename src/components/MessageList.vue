<template>
  <div class="message-list-wrap" ref="scrollEl">
    <article class="message-list">
      <template
        v-for="({ type, title, typing, content = '' }, index) in messageList"
        :key="`message${title ? '-title' : ''}${type && `-${type}`}_${index}`"
      >
        <MessageTitle v-if="title" :content="content" />
        <Message v-else :type="type" :typing="typing" :content="content" />
      </template>
    </article>
  </div>
</template>

<script setup>
import dayjs from 'dayjs'
import Markdown from 'markdown-it'
import BScroll from '@better-scroll/core'
import { ref, unref, reactive, nextTick, onMounted } from 'vue'
import { debouncedWatch } from '@vueuse/core'
import { sleep } from '../_utils'
import { randomTyping } from '../_utils/randomTyping'
import MessageTitle from './MessageTitle.vue'
import Message from './Message.vue'

defineExpose({ sendMessage })

const emit = defineEmits(['typing'])

const md = new Markdown()

const messageList = reactive([])

const scrollEl = ref(null)
let scroll = null

onMounted(async () => {
  scroll = new BScroll(unref(scrollEl), {
    scrollbar: true,
    wheel: false
  })
})

debouncedWatch(messageList, () => {
  nextTick(() => {
    scroll.refresh()
    scroll.scrollTo(0, scroll.maxScrollY, 300)
  })
})

async function sendMessage({ question, answers = [] }) {
  const { timestamp = Date.now() } = messageList[messageList.length - 1] ?? {}

  await updateMessageList({
    title: Date.now() - timestamp >= 300_000 /* 5min */,
    question,
    answers
  })
}

async function updateMessageList({ title = false, question, answers = [] }) {
  emit('typing', true)

  if (title) {
    messageList.push({
      title: true,
      content: dayjs().format('HH:mm'),
      timestamp: Date.now()
    })
  }

  if (question) {
    messageList.push({
      type: 'send',
      typing: false,
      content: question,
      timestamp: Date.now()
    })
  }

  for (const answer of answers) {
    const message = reactive({
      type: 'receive',
      typing: true,
      content: '',
      timestamp: null
    })

    messageList.push(message)

    await sleep(randomTyping(answer))

    Object.assign(message, {
      typing: false,
      content: md.render(answer),
      timestamp: Date.now()
    })
  }

  emit('typing', false)
}
</script>

<style scoped>
.message-list-wrap {
  @apply w-full h-full overflow-hidden;
}

.message-list-wrap::-webkit-scrollbar {
  @apply w-0 bg-transparent;
}

.message-list {
  @apply flex flex-col px-2;
}
</style>
