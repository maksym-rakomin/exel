import {createToolbar} from '@/components/toolbar/toolbar.template';
import {$} from '@core/dom';
import {ExcelStateComponent} from '@core/ExcelStateComponent';
import {defaultStyles} from '@/constants';

export class Toolbar extends ExcelStateComponent {
  static className = 'excel__toolbar'

  constructor($root, options) {
    super($root, {
      name: 'Toolbar',
      listeners: ['click'],
      subscribe: ['currentStyles'],
      ...options,
    });
  }

  prepare() {
    this.initState(defaultStyles)
  }

  get template() {
    return createToolbar(this.state)
  }

  toHTML() {
    return this.template
  }

  storeChanged(changes) {
    this.setState(changes.currentStyles)
  }

  onClick(event) {
    const $target = $(event.target)
    const $parent = $target?.data?.status === 'parent' ?
        $target :
        $target.closest('[data-type="button"]')

    if ($parent.data.type === 'button') {
      $parent.addClass('active')
      const value = JSON.parse($parent.data.value)

      this.$emit('toolbar:applyStyle', value)
    }
  }
}
