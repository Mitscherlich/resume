import BScroll from 'better-scroll'

export default {
  oninit() {
    this.t = null
    this.scroll = null
  },
  oncreate({ dom }) {
    this.scroll = new BScroll(dom, {
      scrollbar: true,
      mouseWheel: true
    })
  },
  onupdate() {
    if (this.t) {
      clearTimeout(this.t)
    }
    this.t = setTimeout(() => {
      this.scroll.scrollTo(0, this.scroll.maxScrollY, 300)
    }, 50)
  },
  view(vnode) {
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
