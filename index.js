/**
 * @license
 * Copyright (c) 2018 Charles-André LEDUC. All rights reserved.
 */

// Easing functions from: https://gist.github.com/gre/1650294
var easingFunctions = {
  get: function get(s) {
    switch (s) {
      case 'linear':
        return easingFunctions.linear;
      case 'easeInQuad':
        return easingFunctions.easeInQuad;
      case 'easeOutQuad':
        return easingFunctions.easeOutQuad;
      case 'easeInOutQuad':
        return easingFunctions.easeInOutQuad;
      case 'easeInCubic':
        return easingFunctions.easeInCubic;
      case 'easeOutCubic':
        return easingFunctions.easeOutCubic;
      case 'easeInOutCubic':
        return easingFunctions.easeInOutCubic;
      case 'easeInQuart':
        return easingFunctions.easeInQuart;
      case 'easeOutQuart':
        return easingFunctions.easeOutQuart;
      case 'easeInOutQuart':
        return easingFunctions.easeInOutQuart;
      case 'easeInQuint':
        return easingFunctions.easeInQuint;
      case 'easeOutQuint':
        return easingFunctions.easeOutQuint;
      case 'easeInOutQuint':
        return easingFunctions.easeInOutQuint;
      default:
        return easingFunctions.linear;
    }
  },
  // no easing, no acceleration
  linear: function linear(t) {
    return t;
  },
  // accelerating from zero velocity
  easeInQuad: function easeInQuad(t) {
    return t * t;
  },
  // decelerating to zero velocity
  easeOutQuad: function easeOutQuad(t) {
    return t * (2 - t);
  },
  // acceleration until halfway, then deceleration
  easeInOutQuad: function easeInOutQuad(t) {
    return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
  },
  // accelerating from zero velocity
  easeInCubic: function easeInCubic(t) {
    return t * t * t;
  },
  // decelerating to zero velocity
  easeOutCubic: function easeOutCubic(t) {
    return --t * t * t + 1;
  },
  // acceleration until halfway, then deceleration
  easeInOutCubic: function easeInOutCubic(t) {
    return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
  },
  // accelerating from zero velocity
  easeInQuart: function easeInQuart(t) {
    return t * t * t * t;
  },
  // decelerating to zero velocity
  easeOutQuart: function easeOutQuart(t) {
    return 1 - --t * t * t * t;
  },
  // acceleration until halfway, then deceleration
  easeInOutQuart: function easeInOutQuart(t) {
    return t < 0.5 ? 8 * t * t * t * t : 1 - 8 * --t * t * t * t;
  },
  // accelerating from zero velocity
  easeInQuint: function easeInQuint(t) {
    return t * t * t * t * t;
  },
  // decelerating to zero velocity
  easeOutQuint: function easeOutQuint(t) {
    return 1 + --t * t * t * t * t;
  },
  // acceleration until halfway, then deceleration
  easeInOutQuint: function easeInOutQuint(t) {
    return t < 0.5 ? 16 * t * t * t * t * t : 1 + 16 * --t * t * t * t * t;
  }
};

var ScrollTo = {
  install: function install(Vue, options) {
    var defaultEasingFn = easingFunctions.get('easeInOutQuad');
    var defaultDuration = 500;
    if (options) {
      if (typeof options.easing === 'string') {
        defaultEasingFn = easingFunctions.get(options.easing);
      }
      if (options.duration) {
        defaultDuration = Number.parseInt(options.duration);
      }
    }

    Vue.prototype.$scrollTo = function (query, params) {
      if (query == null) return;
      var element = document.getElementById(query);
      if (element == null) return;

      var offset = 0;
      var duration = defaultDuration;
      var easingFn = defaultEasingFn;
      if (params) {
        if (params.duration) duration = params.duration;
        if (params.easing) easingFn = easingFunctions.get(params.easing);
        if (params.offset) offset = params.offset;
      }

      var startingY = window.pageYOffset;
      var elementY = window.pageYOffset + (element.getBoundingClientRect().top - offset);

      var targetY = document.body.scrollHeight - elementY < window.innerHeight ? document.body.scrollHeight - window.innerHeight : elementY;
      var diff = targetY - startingY;
      var start;

      if (!diff) return;

      window.requestAnimationFrame(function step(timestamp) {
        if (!start) start = timestamp;
        var time = timestamp - start;
        var percent = Math.min(time / duration, 1);
        percent = easingFn(percent);

        window.scrollTo(0, startingY + diff * percent);

        if (time < duration) {
          window.requestAnimationFrame(step);
        }
      });
    };
  }
};

export default ScrollTo;
