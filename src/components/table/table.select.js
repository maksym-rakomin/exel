import {$} from '@core/dom';
import {range} from '@core/utils';
import {defaultStyles} from '@/constants';
import {changeStyles} from '@/redux/actions';

export function selectCell(event, el) {
  if (event.target.dataset.type === 'cell') {
    let $cells = []
    const $eTarget = $(event.target)
    el.selection.select($eTarget)

    document.onmousemove = (e) => {
      const current = el.selection.current.id(true)
      const targetMove = $(e.path[0]).id(true)

      const cols = range(targetMove.col, current.col)
      const rows = range(targetMove.row, current.row)

      const ids = cols.reduce((acc, col) => {
        rows.forEach(row => acc.push(`${row}:${col}`))
        return acc
      }, [])

      $cells = ids.map(id => el.$root.find(`[data-id="${id}"]`))
      el.selection.preSelectGroup($cells)
    }
    document.onmouseup = () => {
      document.onmousemove = null
      document.onmouseup = null

      if ($cells.length > 1) {
        el.selection.selectGroup($cells)
      } else {
        el.selection.select($eTarget)
        el.$emit('table:selection', $eTarget)
        const styles = $eTarget.getStyles(Object.keys(defaultStyles))
        el.$dispatch(changeStyles(styles))
      }
    }
  }
}
