A fork of [zephir/zephir-gulp-workflow](https://github.com/zephir/zephir-gulp-workflow) with added sourcemaps and other things.

# differences to zephir-gulp-workflow:

## Installation

1. Create a package.json in your project **>>** `npm init`
2. Install dependencies **>>** `npm i --save-dev gulp mj-gulp-workflow babel-preset-env`
3. Create a new `gulpfile.js` and add the content you find below

```js
require('mj-gulp-workflow')(require('gulp'));
```

## Tasks
- sourcemaps support for css and js
- image task uses pngquant

## default config:

- sourcemaps are enbaled by default
- pxToRem is disabled by default
- es6 via babel is enabled and uses `babel-preset-env` + browserstring
- added imagemin options


## Tests

Run tests witch `npm test` (run `gulp dist` first)

# @todo:
- error handling in watch task (move dir)
- remove sourcemaps on dist
- port to gulp 4?
- improve desktop notifications and error-reporting
