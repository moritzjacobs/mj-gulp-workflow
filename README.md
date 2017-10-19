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
- `gulp cleanup` for file removal (sourcemaps)

## default config:

- sourcemaps are enbaled by default
- pxToRem is disabled by default
- es6 via babel is enabled and uses `babel-preset-env` + browserstring
- added imagemin options


## Tests

Run tests witch `npm test` (run `gulp test` first)

---

# @todo:
- cleanup task `--force` option for `del`
- port to gulp 4?

---

# changelog

## 1.2.2
- merge changelog into README.md
- fix default config

## 1.2.1
- Fix run-sequence and cleanup task
- Filter junk files in task inclusion by glob and remove output dir before running gulp test

## 1.2.0
- added cleanup task for file removal (sourcemaps)
- added gulp-notify for errors
- replaced native gulp.watch with gulp-watch for better error handling
- added clean task to remove sourcemaps

## 1.1.1
- cleanup, refactoring and overall code quality

## 1.1.0

- Moved testing to jest
- Run tests with `npm test` (run `gulp dist` first!)
