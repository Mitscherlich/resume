import { ClassComponent, Vnode } from 'mithril'

export interface IToolbarAttr {
  typing: boolean
}

export default class Toolbar implements ClassComponent<IToolbarAttr> {
  public view(vnode: Vnode<IToolbarAttr>) {
    return (
      <header class="toolbar">
        <h3>{vnode.attrs.typing ? '对方正在输入...' : 'Mitscherlich'}</h3>
      </header>
    )
  }
}
