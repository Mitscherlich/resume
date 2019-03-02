import * as yaml from 'js-yaml'
import * as m from 'mithril'
import { ClassComponent } from 'mithril'

import Toolbar from './components/Toolbar'
import Waterfall from './components/Waterfall'
import ActionBar from './components/ActionBar'

import qa from './assets/config/qa.yml'

const { init, questions, answers, more } = yaml.safeLoad(qa)

const random = (min, max) => Math.random() * (max - min) + min

export interface IMessage {
  from: boolean | null
  msg: string
  to: boolean | null
}

export type IMessages = IMessage[]

export default class App implements ClassComponent {
  private static asked: Set<string> = new Set()
  private static finished: boolean = false
  private static messages: IMessages = []
  private static typing: boolean = false

  private static sleep(n: number) {
    n = n / 3600
    if (n < 1) {
      n = 1
    }
    return new Promise((resolve) => {
      setTimeout(resolve, random(n - 0.2, n + 0.2) * 1000)
    })
  }

  private static async sendMessage({ from, msg, to }: IMessage) {
    if (from) {
      await App.sleep(msg.length)
    }
    App.messages.push({ from, msg, to })
    if (to) {
      await App.sleep(msg.length)
    }
    m.redraw()
  }

  private static async sendQuestion(req) {
    if (App.typing) {
      return
    }
    App.typing = true
    App.asked.add(req)
    const msg = questions[req]
    await App.sendMessage({ from: null, msg, to: true })
    await App.sendAnswer(answers[req])
    const hasAsked = [...App.asked]
    App.finished = Object.keys(answers).every(key => hasAsked.includes(key))
    if (App.finished) {
      await App.sendAnswer(more)
    }
  }

  private static async sendAnswer(res) {
    App.typing = true
    m.redraw()
    for (const msg of res) {
      await App.sendMessage({ from: true, msg, to: null })
    }
    App.typing = false
    m.redraw()
  }

  public oncreate() {
    App.sendAnswer(init)
  }

  public view() {
    return (
      <main class="screen">
        <Toolbar typing={App.typing} />
        <Waterfall messages={App.messages} />
        <ActionBar sendQuestion={App.sendQuestion} />
      </main>
    )
  }
}


