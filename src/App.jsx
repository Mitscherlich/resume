import m from 'mithril'
import yaml from 'js-yaml'

import Toolbar from './components/Toolbar'
import Waterfall from './components/Waterfall'
import ActionBar from './components/ActionBar'

import qa from './assets/config/qa.yml'

const { init, questions, answers, more } = yaml.safeLoad(qa)

const random = (min, max) => Math.random() * (max - min) + min

const state = {
  asked: new Set(),
  messages: [],
  typing: false,
  finished: false,
  questions,
  answers,
  _p(fact) {
    fact = fact / 3600
    if (fact < 1) {
      fact = 1
    }
    return new Promise(resolve => {
      setTimeout(resolve, random(fact - 0.2, fact + 0.2) * 1000)
    })
  },
  async _addMessage({ msg, from, to }) {
    if (from) {
      await state._p(msg.length)
    }
    state.messages.push({ from, msg, to })
    if (to) {
      await state._p(msg.length)
    }
    m.redraw()
  },
  async sendQuestion(req) {
    if (state.typing) {
      return
    }
    state.typing = true
    state.asked.add(req)
    const msg = state.questions[req]
    await state._addMessage({ from: null, msg, to: true })
    await state.sendAnswer(state.answers[req])
    const hasAsked = [...state.asked]
    state.finished = Object.keys(state.answers).every(key => hasAsked.includes(key))
    if (state.finished) {
      await state.sendAnswer(more)
    }
  },
  async sendAnswer(res) {
    state.typing = true
    m.redraw()
    for (const msg of res) {
      await state._addMessage({ from: true, msg, to: null })
    }
    state.typing = false
    m.redraw()
  }
}

export default {
  oncreate() {
    state.sendAnswer(init)
  },
  view() {
    return (
      <main class="screen">
        <Toolbar typing={state.typing} />
        <Waterfall messages={state.messages} />
        <ActionBar sendQuestion={state.sendQuestion} />
      </main>
    )
  }
}
