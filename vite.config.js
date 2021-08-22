import Vue from '@vitejs/plugin-vue'
import Markdown from 'vite-plugin-md'

export default {
  plugins: [Vue({ include: [/\.vue$/, /\.md$/] }), Markdown()]
}
