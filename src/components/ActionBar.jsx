import m from 'mithril'

export default {
  oninit(vnode) {
    vnode.state = {
      shouldShowPopup: false,
      togglePopup() {
        vnode.state.shouldShowPopup = !vnode.state.shouldShowPopup
        m.redraw()
      }
    }
  },
  view(vnode) {
    return (
      <footer class="actionbar">
        <ul class="actions">
          <li class="action" onclick={vnode.state.togglePopup}>
            <a href="#">{vnode.state.shouldShowPopup ? '▼' : '▲'} 关于我</a>
            <ul class={['popup', vnode.state.shouldShowPopup ? 'active' : ''].join(' ')}>
              <li
                class="item"
                action={'edu'}
                onclick={m.withAttr('action', vnode.attrs.addMessage)}
              >
                教育经历
              </li>
              <li
                class="item"
                action={'school'}
                onclick={m.withAttr('action', vnode.attrs.addMessage)}
              >
                校园经历
              </li>
              <li
                class="item"
                action={'awards'}
                onclick={m.withAttr('action', vnode.attrs.addMessage)}
              >
                获得成就
              </li>
            </ul>
          </li>
          <li
            class="action"
            action={'skills'}
            onclick={m.withAttr('action', vnode.attrs.addMessage)}
          >
            <a href="#">专业技能</a>
          </li>
          <li
            class="action"
            action={'habits'}
            onclick={m.withAttr('action', vnode.attrs.addMessage)}
          >
            <a href="#">兴趣爱好</a>
          </li>
        </ul>
      </footer>
    )
  }
}
