import {nextSelector} from '@core/utils';

export function keyNavigation(event, el) {
  const keys = [
    'Tab',
    'Enter',
    'ArrowLeft',
    'ArrowRight',
    'ArrowUp',
    'ArrowDown',
  ]
  const {key} = event
  if (keys.includes(key) && !event.shiftKey) {
    event.preventDefault()
    const id = el.selection.current.id(true)
    const $next = el.$root.find(nextSelector(key, id))
    el.selection.select($next)

    el.$emit('table:selection', $next)
  }
}
