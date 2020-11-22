/**
 * A lightweight smooth scroll plugin for Vue.js
 *
 * @version 3.0.1
 * @author Charlie LEDUC <contact@graphique.io>
 * @license ISC
 * @requires 'vue'
 */

var _SCROLLTO_DURATION_ = 500
var _SCROLLTO_EASING_ = 'easeInOutCubic'

function _getEasing(fn) {
  switch (fn) {
    case 'linear': {
      // no easing, no acceleration
      return function linear(t) {
        return t
      }
    }
    case 'easeInQuad': {
      // accelerating from zero velocity
      return function easeInQuad(t) {
        return t * t
      }
    }
    case 'easeOutQuad': {
      // decelerating to zero velocity
      return function easeOutQuad(t) {
        return t * (2 - t)
      }
    }
    case 'easeInOutQuad': {
      // acceleration until halfway, then deceleration
      return function easeInOutQuad(t) {
        return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t
      }
    }
    case 'easeInCubic': {
      // accelerating from zero velocity
      return function easeInCubic(t) {
        return t * t * t
      }
    }
    case 'easeOutCubic': {
      // decelerating to zero velocity
      return function easeOutCubic(t) {
        return --t * t * t + 1
      }
    }
    case 'easeInOutCubic': {
      // acceleration until halfway, then deceleration
      return function easeInOutCubic(t) {
        return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1
      }
    }
    case 'easeInQuart': {
      // accelerating from zero velocity
      return function easeInQuart(t) {
        return t * t * t * t
      }
    }
    case 'easeOutQuart': {
      // decelerating to zero velocity
      return function easeOutQuart(t) {
        return 1 - --t * t * t * t
      }
    }
    case 'easeInOutQuart': {
      // acceleration until halfway, then deceleration
      return function easeInOutQuart(t) {
        return t < 0.5 ? 8 * t * t * t * t : 1 - 8 * --t * t * t * t
      }
    }
    case 'easeInQuint': {
      // accelerating from zero velocity
      return function easeInQuint(t) {
        return t * t * t * t * t
      }
    }
    case 'easeOutQuint': {
      // decelerating to zero velocity
      return function easeOutQuint(t) {
        return 1 + --t * t * t * t * t
      }
    }
    case 'easeInOutQuint': {
      // acceleration until halfway, then deceleration
      return function easeInOutQuint(t) {
        return t < 0.5 ? 16 * t * t * t * t * t : 1 + 16 * --t * t * t * t * t
      }
    }
    default: {
      // no easing, no acceleration
      return function linear(t) {
        return t
      }
    }
  }
}

function _scrollTo(id, params) {
  if (id == null) return
  const element = document.getElementById(id)
  if (element == null) return

  var offset = 0
  var duration = _SCROLLTO_DURATION_
  var easingFn = typeof _SCROLLTO_EASING_ === 'function' ? _SCROLLTO_EASING_ : _getEasing(_SCROLLTO_EASING_)
  if (params) {
    if (params.duration) duration = params.duration
    if (params.easing) {
      easingFn = params.easing && typeof params.easing === 'function' ? params.easing : _getEasing(params.easing)
    }
    if (params.offset) offset = params.offset
  }

  var startingY = window.pageYOffset
  var elementY = window.pageYOffset + (element.getBoundingClientRect().top - offset)

  var targetY = document.body.scrollHeight - elementY < window.innerHeight ? document.body.scrollHeight - window.innerHeight : elementY
  var diff = targetY - startingY
  var start

  if (!diff) return

  window.requestAnimationFrame(function step(timestamp) {
    if (!start) start = timestamp
    var time = timestamp - start
    var percent = Math.min(time / duration, 1)
    percent = easingFn(percent)

    window.scrollTo(0, startingY + diff * percent)

    if (time < duration) {
      window.requestAnimationFrame(step)
    }
  })
}

const _plugin = {
  install: (app, options) => {
    if (!options || typeof options !== 'object') options = {}
    _SCROLLTO_DURATION_ = Number.parseInt(options.duration || 500)
    _SCROLLTO_EASING_ = options.easing || 'easeInOutCubic'
    app.config.globalProperties.$scrollTo = _scrollTo
  }
}

export {
  _scrollTo as scrollTo,
  _plugin as plugin
}
