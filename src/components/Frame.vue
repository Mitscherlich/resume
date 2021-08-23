<template>
  <div class="frame-mask absolute" />

  <main class="frame absolute">
    <header class="top">
      <slot name="top" />
    </header>

    <section class="content">
      <slot />
    </section>

    <footer class="bottom">
      <slot name="bottom" />
    </footer>
  </main>
</template>

<style scoped>
.frame-mask {
  @apply pointer-events-none filter grayscale;
  @apply z-10;
  width: 364px;
  height: 724px;
  background: center / cover url('../images/frame.jpg') no-repeat;
  mask-image: url('../images/frame-mask.svg');
}

.frame {
  @apply sm:py-5;
  width: 314px;
  height: 680px;
  background: #eaeaea;
  padding: env(--safe-area-inset-top) 0 env(--safe-area-inset-bottom);
}

@media screen and (max-width: 640px) {
  .frame-mask {
    display: none;
  }

  .frame {
    @apply w-full h-full;
  }
}

.top,
.content,
.bottom {
  @apply absolute w-full;
}

.top {
  @apply top-0 sm:mt-5 h-11 sm:h-8 border-b;
}

.content {
  @apply absolute top-0 h-full py-11 sm:py-14 overflow-hidden;
}

.bottom {
  @apply bottom-0 sm:mb-5 h-11 sm:h-8 border-t;
}
</style>
