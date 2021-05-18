import {DomListener} from '@core/DomListener';

export class ExcelComponent extends DomListener {
  constructor($root, options = {}) {
    super($root, options.listeners);
    this.name = options.name || ''
    this.emitter = options.emitter
    this.subscribe = options.subscribe || []
    this.unsubscribers = []
    this.store = options.store
    // this.storeSubs = null
    this. prepare()
  }
  // настраиваем компонент до init
  prepare() {}

  // Возвращает шаблон компонента
  toHTML() {
    return ''
  }

  // Уведомляем слушателя про событие event
  $emit(event, ...args) {
    this.emitter.emit(event, ...args)
  }

  // Подписываемся на событие
  $on(event, fn) {
    const unsub = this.emitter.subscribe(event, fn)
    this.unsubscribers.push(unsub )
  }

  $dispatch(action) {
    this.store.dispatch(action)
  }

  // сюда приходят только те изменения на которые мы подписались
  storeChanged() {}

  isWatching(key) {
    return this.subscribe.includes(key)
  }

  // Инициализируем компонент, добавляем DOM слушатели
  init() {
    this.initDOMListeners()
  }

  // Удаляем компонент и слушатели событий
  destroy() {
    this.removeDOMListeners()
    this.unsubscribers.forEach(unsub => unsub())
  }
}
