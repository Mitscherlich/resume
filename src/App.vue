<template>
  <Frame>
    <template #top>
      <NavBar title="Mitscherlich" :typing="typing" />
    </template>

    <MessageList @typing="(val) => (typing = val)" ref="storyboard" />

    <template #bottom>
      <ActionBar>
        <ActionMenu
          v-for="{ id, text, menu } in menu"
          :key="id"
          v-bind="{ id, text, menu }"
          @action="sendMessage"
        />
      </ActionBar>
    </template>
  </Frame>

  <Mask
    :logo="logo"
    :content="README"
    :show="showMask"
    @toggle="(val) => (showMask = val)"
  />
</template>

<script setup>
import { ref, unref, watch, onMounted } from 'vue'
import storage from 'store'
import Frame from './components/Frame.vue'
import NavBar from './components/NavBar.vue'
import MessageList from './components/MessageList.vue'
import ActionBar from './components/ActionBar.vue'
import ActionMenu from './components/ActionMenu.vue'
import Mask from './components/Mask.vue'
import README from './README.md'
import logo from './images/logo.png'
import { interopDefault } from './_utils/interopDefault'
import { menu } from './config/menu.json'

const typing = ref(false)

const MASK_DISSMISS = storage.get('MASK_DISSMISS', false)

const showMask = ref(!MASK_DISSMISS)

const stories = Object.entries(
  import.meta.globEager('./stories/*.json')
).reduce((map, [path, module]) => {
  const id = path.replace(/(.*\/)*([^.]+).*/gi, '$2')
  const story = interopDefault(module)
  return (map[id] = story), map
}, {})

const cache = new Map()

const storyboard = ref(null)

const sendMessage = (id) => {
  if (unref(typing)) {
    return // do nothing, just ignore :)
  }

  if (!cache.has(id)) {
    cache.set(id, true)
  }

  unref(storyboard).sendMessage(stories[id])
}

onMounted(() => {
  sendMessage('Hello')
})

const unwatch = watch(typing, () => {
  if (unref(typing)) {
    return // just ignore :)
  }

  const fulfilled = Object.keys(stories)
    .filter((key) => key !== 'Blog')
    .reduce((result, key) => (result &= cache.has(key) && cache.get(key)), true)

  if (fulfilled) {
    unwatch()

    if (!cache.has('Blog') || !cache.get('Blog')) {
      sendMessage('Blog')
    }
  }
})
</script>

<style>
@tailwind base;
@tailwind components;
@tailwind utilities;

/* REM 适配 <html> */

/* 375px (iPhone 6) */
/* 此为基准值, 与视觉设计稿 `宽度/2` 保持一致 */
html {
  font-size: 20px;
}

/* 21.33333333 = 320*20/375 (iPhone 5) */
@media only screen and (min-width: 320px) {
  html {
    font-size: 19px !important;
  }
}

/* base root size (iPhone 6) */
@media only screen and (min-width: 375px) {
  html {
    font-size: 20px !important;
  }
}

/* 21.33333333 = 400*20/375 (Most Android) */
@media only screen and (min-width: 400px) {
  html {
    font-size: 21.33333333px !important;
  }
}

/* 22.08 = 414*20/375 (iPhone 6 Plus) */
@media only screen and (min-width: 414px) {
  html {
    font-size: 22.08px !important;
  }
}

/* 25.6 = 480*20/375 (iPad) */
@media only screen and (min-width: 480px) {
  html {
    font-size: 25.6px !important;
  }
}

/* REM 适配 <html data-rem="320"> */

/* 320px (iPhone 5) */
/* 此为基准值, 与视觉设计稿 `宽度/2` 保持一致 */
html[data-rem='320'] {
  font-size: 20px;
}

/* 23.4375 = 375*20/320 (Most Android) */
@media only screen and (min-width: 375px) {
  html[data-rem='320'] {
    font-size: 23.4375px !important;
  }
}

/* 25 = 400*20/320 (Most Android) */
@media only screen and (min-width: 400px) {
  html[data-rem='320'] {
    font-size: 25px !important;
  }
}

/* 25.875 = 414*20/320 (iPhone 6 Plus) */
@media only screen and (min-width: 414px) {
  html[data-rem='320'] {
    font-size: 25.875px !important;
  }
}

/* 30 = 30 (iPad) */
@media only screen and (min-width: 480px) {
  html[data-rem='320'] {
    font-size: 30px !important;
  }
}

.slide-down-enter-active {
  animation: slideFadeInUp 0.3s;
}

.slide-down-leave-active {
  animation: slideFadeInUp 0.3s reverse;
}

@keyframes slideFadeInUp {
  0% {
    opacity: 0;
    transform: translate3d(0, 0, 0);
  }
  50% {
    opacity: 0.1;
    transform: translate3d(0, calc(-100% - 25px), 0);
  }
  100% {
    opacity: 1;
    transform: translate3d(0, calc(-100% - 20px), 0);
  }
}
</style>
