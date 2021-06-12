import {storage} from '@core/utils';

export function toHTML(key) {
  const state = storage(key)
  const id = key.split(':')[1]
  return `
      <li class="db__record">
        <a href="#excel/${id}">${state.title}</a>
        <strong>
          ${new Date(state.openedDate).toLocaleDateString()}
           - 
          ${new Date(state.openedDate).toLocaleTimeString()}
        </strong>
      </li>
     `
}

function getAllKeys() {
  const keys =[]
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i)

    if (!key.includes('excel')) {
      continue
    }
    keys.push(key)
  }
  return keys
}

export function createRecordsTable() {
  const keys = getAllKeys()

  if (keys.length === 0) {
    return `<p>Пока не создано таблиц</p>`
  }

  return `
      <div class="db__list-header">
        <span>Название</span>
        <span>Дата открытия</span>
      </div>

      <ul class="db__list">
        ${ keys.map(toHTML).join('') }
      </ul>
  `
}
