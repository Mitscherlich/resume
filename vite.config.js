import Vue from '@vitejs/plugin-vue'
import legacy from '@vitejs/plugin-legacy'
import Markdown from 'vite-plugin-md'

export default {
  plugins: [
    legacy({
      targets: ['defaults', 'not IE 11']
    }),
    Vue({ include: [/\.vue$/, /\.md$/] }),
    Markdown()
  ]
}
