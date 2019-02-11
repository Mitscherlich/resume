import m from 'mithril'

// const $ = selector => document.querySelector(selector)
const $$ = selector => Array.prototype.slice.call(document.querySelectorAll(selector))

function matches(el, selector) {
  return (
    el.matches ||
    el.matchesSelector ||
    el.msMatchesSelector ||
    el.mozMatchesSelector ||
    el.webkitMatchesSelector ||
    el.oMatchesSelector
  ).call(el, selector)
}

const state = {
  shouldShowPopup: false,
  togglePopup() {
    state.shouldShowPopup = !state.shouldShowPopup
    m.redraw()
  }
}

export default {
  oncreate() {
    document.onmouseup = document.ontouchend = function(e) {
      if (
        state.shouldShowPopup &&
        !matches(e.target, '.action:first-child') &&
        !matches(e.target, '.btn-popup') &&
        !matches(e.target, 'li.item') &&
        $$('.action:first-child, .btn-popup, li.item').indexOf(e.target) < 0
      ) {
        state.togglePopup()
      }
    }
  },
  view(vnode) {
    return (
      <footer class="actionbar">
        <ul class="actions">
          <li class="action" onclick={state.togglePopup}>
            <a class="btn-popup" href="#">
              {state.shouldShowPopup ? '▼' : '▲'} 关于我
            </a>
            <ul class={['popup', state.shouldShowPopup ? 'active' : ''].join(' ')}>
              <li
                class="item"
                action={'edu'}
                onclick={m.withAttr('action', vnode.attrs.sendQuestion)}
              >
                教育经历
              </li>
              <li
                class="item"
                action={'school'}
                onclick={m.withAttr('action', vnode.attrs.sendQuestion)}
              >
                校园经历
              </li>
              <li
                class="item"
                action={'awards'}
                onclick={m.withAttr('action', vnode.attrs.sendQuestion)}
              >
                获得成就
              </li>
            </ul>
          </li>
          <li
            class="action"
            action={'skills'}
            onclick={m.withAttr('action', vnode.attrs.sendQuestion)}
          >
            <a href="#">专业技能</a>
          </li>
          <li
            class="action"
            action={'habits'}
            onclick={m.withAttr('action', vnode.attrs.sendQuestion)}
          >
            <a href="#">兴趣爱好</a>
          </li>
        </ul>
      </footer>
    )
  }
}
