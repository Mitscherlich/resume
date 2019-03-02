import * as m from 'mithril'
import { ClassComponent, VnodeDOM, Vnode } from 'mithril'
import { IMessages } from '../App'
import BScroll from 'better-scroll'

export interface IWaterfallAttr {
  messages: IMessages
}

export default class Waterfall implements ClassComponent<IWaterfallAttr> {
  private t: number = null
  private scroll: BScroll = null

  public oncreate({ dom }: VnodeDOM) {
    this.scroll = new BScroll(dom, {
      scrollbar: true,
      mouseWhell: true
    })
  }

  public onupdate() {
    if (this.t) {
      clearTimeout(this.t)
    }
    this.t = setTimeout(() => {
      this.scroll.scrollTo(0, this.scroll.maxScrollY, 300)
      this.t = null
    })
  }

  public view(vnode: Vnode<IWaterfallAttr>) {
    return (
      <article class="wrapper">
        <ul class="content">
          {vnode.attrs.messages.map(({ from, msg, to }) => (
            <li class="message">
              {from ? <div class="from" /> : null}
              <div class="body" data-to={!!to}>
                {m.trust(msg)}
              </div>
              {to ? <div class="to" /> : null}
            </li>
          ))}
        </ul>
      </article>
    )
  }
}
