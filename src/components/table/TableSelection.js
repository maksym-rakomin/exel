export class TableSelection {
  static className = 'selected'

  constructor(props) {
    this.group = []
    this.current = null
  }

  select($el) {
    this.clearSelect()
    $el. focus().addClass(TableSelection.className)
    this.group.push($el)
    this.current = $el
  }

  clearSelect() {
    this.group.forEach(elem => {
      elem
          .removeClass(TableSelection.className)
          .removeClass('preselected')
    })
    this.group = []
  }

  get selectedIds() {
    return this.group.map($el => $el.id())
  }

  selectGroup(group = []) {
    this.clearSelect()
    this.group = group
    this.group.forEach(elem => elem.addClass(TableSelection.className))
  }

  preSelectGroup(group = []) {
    this.clearSelect()
    this.group = group
    this.group.forEach(elem => elem.addClass('preselected'))
  }

  applyStyle(style) {
    this.group.forEach($el => $el.css(style))
  }
}
