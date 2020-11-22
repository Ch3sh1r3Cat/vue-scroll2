# vue-scroll2

A lightweight smooth scroll plugin for Vue.js

## Installation

```javascript
npm install vue-scroll2 --save
```

## How to use

Default use in your main.js Vue project

```javascript
import { plugin as ScrollTo } from 'vue-scroll2'
...
createApp(App)
  .use(ScrollTo)
...
```

You can pass an optional object for default duration and easing function

```javascript
...
createApp(App)
  .use(ScrollTo, { easing: 'linear', duration: 600 })
...
```

Use the instance methods `this.$scrollTo` in your Vue script

```javascript
...
// e.g. Instance method @click="goTo('my-id')" in your html template
goTo(anchor) {
  // Scroll to the corresponding html element id with optional parameters, offset can be computed to match a fixed header element height for instance
  this.$scrollTo(anchor, { easing: 'linear', duration: 600, offset: 32 })
}
...
```

## Standalone

You can import `scrollTo` in your Vue script to use it as a standalone function.

```javascript
import { scrollTo } from 'vue-scroll2'
export default {
  name: 'MyComponent',

  methods: {
    goTo(anchor) {
      const easeInQuad = (t) => {
        return t * t
      }
      // You can pass a custom function with t parameters
      scrollTo(anchor, { easing: myCustomFn })
    }
  }
}
```
## List of available easing functions

By default, the plugin use a ease-in-out cubic function but you can pass one of the following parameters:
- 'linear'
- 'easeInQuad'
- 'easeOutQuad'
- 'easeInOutQuad'
- 'easeInCubic'
- 'easeOutCubic'
- 'easeInOutCubic'
- 'easeInQuart'
- 'easeOutQuart'
- 'easeInOutQuart'
- 'easeInQuint'
- 'easeOutQuint'
- 'easeInOutQuint'

## License

[ISC](https://opensource.org/licenses/ISC)
