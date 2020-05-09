/**
 * A lightweight smooth scroll plugin for Vue.js
 *
 * @version 0.2.1
 * @author Charlie LEDUC <contact@graphique.io>
 * @license ISC
 * @requires 'vue'
 */

import easing from './easing'

export default {
  install(Vue, options) {
    var defaultEasingFn = easing.get('easeInOutQuad')
    var defaultDuration = 500
    if (options) {
      if (typeof options.easing === 'string') {
        defaultEasingFn = easing.get(options.easing)
      }
      if (options.duration) {
        defaultDuration = Number.parseInt(options.duration)
      }
    }

    Vue.prototype.$scrollTo = function(query, params) {
      if (query == null) return
      const element = document.getElementById(query)
      if (element == null) return

      var offset = 0
      var duration = defaultDuration
      var easingFn = defaultEasingFn
      if (params) {
        if (params.duration) duration = params.duration
        if (params.easing) easingFn = easing.get(params.easing)
        if (params.offset) offset = params.offset
      }

      var startingY = window.pageYOffset
      var elementY =
        window.pageYOffset + (element.getBoundingClientRect().top - offset)

      var targetY =
        document.body.scrollHeight - elementY < window.innerHeight ?
        document.body.scrollHeight - window.innerHeight :
        elementY
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
  }
}
