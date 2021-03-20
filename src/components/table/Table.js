import {ExcelComponent} from '@core/ExcelComponent';
import {createTable} from '@/components/table/table.template';
import {resizeTable} from '@/components/table/table.resize';
import {TableSelection} from '@/components/table/TableSelection';
import {selectCell} from '@/components/table/table.select';
import {keyNavigation} from '@/components/table/table.keyNavigation';
import {nextSelector} from '@core/utils';
import {$} from '@core/dom';
import * as acitons from '@/redux/actions';

export class Table extends ExcelComponent {
  static className = 'excel__table'

  constructor($root, options) {
    super($root, {
      name: 'Table',
      listeners: ['mousedown', 'keydown', 'input'],
      ...options,
    });
  }

  prepare() {
    this.selection = new TableSelection()
  }

  init() {
    super.init()
    const $cell = this.$root.find('[data-id="0:0"]')
    this.selection.select($cell)
    this.$emit('table:input', $cell)

    this.$on('formula:input', text => {
      this.selection.current.text(text)
      this.updateTextInStore(text)
    })
    this.$on('formula:enter', key => {
      const id = this.selection.current.id(true)
      const $next = this.$root.find(nextSelector(key, id))
      this.selection.select($next)
    })
  }

  toHTML() {
    return createTable(20, this.store.getState())
  }

  async onMousedown(event) {
    try {
      const data = await resizeTable(event, this.$root)
      this.$dispatch(acitons.tableResize(data))
    } catch (e) {
      console.warn('resize error', e.message)
    }

    selectCell(event, this.$root, this.selection)
  }

  onKeydown(event) {
    keyNavigation(event, this)
  }

  onInput(event) {
    this.updateTextInStore($(event.target).text())
  }

  updateTextInStore(value) {
    this.$dispatch(acitons.changeText({
      id: this.selection.current.id(),
      value,
    }))
  }
}
