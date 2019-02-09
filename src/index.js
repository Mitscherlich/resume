import m from 'mithril'
import 'normalize.css'

import './assets/style/index.styl'
import App from './App'

const root = document.querySelector('#app')

m.mount(root, App)
