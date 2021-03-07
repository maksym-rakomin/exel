class Dom {
  constructor(selector) {
    this.$el = typeof selector === 'string' ?
      document.querySelector(selector) :
      selector
  }
  get data() {
    return this.$el.dataset
  }
  html(html) {
    if (typeof html === 'string') {
      this.$el.innerHTML = html
      return this
    }
    return this.$el.outerHTML.trim()
  }

  text(text) {
    if (typeof text === 'string') {
      this.$el.textContent = text
      return
    }
    if (this.$el.tagName.toLowerCase() === 'input') {
      return this.$el.value.trim()
    }
    return this.$el.textContent.trim()
  }

  clear() {
    this.html('')
    return this
  }
  on(eventType, callback) {
    this.$el.addEventListener(eventType, callback)
  }
  off(eventType, callback) {
    this.$el.removeEventListener(eventType, callback)
  }
  append(node) {
    if (node instanceof Dom) {
      node = node.$el
    }
    if (Element.prototype.append) {
      this.$el.append(node)
    } else {
      this.$el.appendChild(node)
    }
    return this
  }

  closest(selector) {
    return $(this.$el.closest(selector))
  }

  getCoords() {
    return this.$el.getBoundingClientRect()
  }

  find(selector) {
    return $(this.$el.querySelector(selector))
  }

  findAll(selector) {
    return this.$el.querySelectorAll(selector)
  }

  css(styles) {
    Object
        .keys(styles)
        .forEach(style => this.$el.style[style] = styles[style])
    return $(this.$el)
  }

  addClass(classes) {
    if (Array.isArray(classes)) {
      classes.forEach(cssClass => this.$el.classList.add(cssClass))
    } else if (typeof classes === 'string') {
      this.$el.classList.add(classes)
    }
    return $(this.$el)
  }

  removeClass(classes) {
    if (Array.isArray(classes)) {
      classes.forEach(cssClass => this.$el.classList.remove(cssClass))
    } else if (typeof classes === 'string') {
      this.$el.classList.remove(classes)
    }
    return $(this.$el)
  }
  id(parse) {
    if (parse) {
      const result = this.id().split(':')
      return {
        row: +result[0],
        col: +result[1],
      }
    }
    return this.data.id || this.dataset.id
  }

  focus() {
    this.$el.focus()
    return this
  }
}

export function $(selector) {
  return new Dom(selector)
}

$.create = (tagName, classes = '') => {
  const el = document.createElement(tagName)
  if (classes) {
    el.classList.add(classes)
  }
  return $(el)
}
