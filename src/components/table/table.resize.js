import {$} from '@core/dom';

export function resizeTable(event, $root) {
  const markerResize = event.target.dataset.resize

  if (markerResize) {
    const $resizer = $(event.target)
    const $parent = $resizer.closest('[data-type="resizeble"]')
    const coords = $parent.getCoords()
    let value
    let cells
    $resizer.addClass('active')

    if (markerResize === 'col') {
      cells = $root.findAll(`[data-col="${$parent.data.col}"]`)

      document.onmousemove = e => {
        const delta = e.pageX - coords.right
        value = coords.width + delta
        $resizer.css({right: `${-delta}px`})
      }
    }
    if (markerResize === 'row') {
      document.onmousemove = e => {
        const delta = e.pageY - coords.bottom
        value = coords.height + delta
        $resizer.css({bottom: `${-delta}px`})
      }
    }

    document.onmouseup = () => {
      document.onmousemove = null
      document.onmouseup = null

      if (markerResize === 'col') {
        $parent.css({width: `${value}px`})
        cells.forEach(element => {
          $(element).css({width: `${value}px`})
        })
        $resizer.css({right: '0px'})
      }
      if (markerResize === 'row') {
        $parent.css({height: `${value}px`})
        $resizer.css({bottom: '0px'})
      }
      $resizer.removeClass('active')
      value = 0
    }
  }
}
