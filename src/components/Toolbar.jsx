export default {
  view(vnode) {
    return (
      <header class="toolbar">
        <h3>{vnode.attrs.typing ? '对方正在输入...' : 'Mitscherlich'}</h3>
      </header>
    )
  }
}
