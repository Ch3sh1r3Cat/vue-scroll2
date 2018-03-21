# vue-scroll2

A simple smooth scroll plugin for Vue.js

## Installation

```javascript
npm install vue-scroll2 --save
```

## How to use

Default use in your main.js Vue project

```javascript
import ScrollTo from 'vue-scroll2'

Vue.use(ScrollTo)
```

You can pass an optional object for default duration and easing function

```javascript
import ScrollTo from 'vue-scroll2'

Vue.use(ScrollTo, { easing: 'linear', duration: 600 })
```

Use the instance methods 'this.$scrollTo' in your Vue script

```javascript
...
// e.g. Instance method @click="goTo('my-id')" in your html template
goTo: function(anchor) {
  // Scroll to the corresponding html element id with defaults
  this.$scrollTo(anchor)
  // Or scroll with optional parameters, offset can be computed to match a fixed header element height for instance
  this.$scrollTo(anchor, { easing: 'linear', duration: 600, offset: 32 })
}
...
```

## License

[MIT](http://opensource.org/licenses/MIT)
