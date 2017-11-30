A fork of [zephir/zephir-gulp-workflow](https://github.com/zephir/zephir-gulp-workflow) with added sourcemaps and other things.

# differences to zephir-gulp-workflow:

## changed functionality
- sourcemaps
- broswerify
- pngquant
- `gulp cleanup` for file removal (sourcemaps)
- gulp-notify

## conventions
- config files are located at the root of your `package.json` and are called `gulp-config.js` (not `compileConfig.js` as with `zephir-gulp-workflow`)
- sourcemaps are enabled by default
- browserify is enabled by default
- pxToRem is removed
- es6 via babel is enabled and uses `babel-preset-env` + browserstring
- added imagemin options

## Installation

1. Create a package.json in your project **>>** `npm init`
2. Install dependencies **>>** `npm i --save-dev gulp mj-gulp-workflow`
3. Create a new `gulpfile.js` and add the content you find below

```js
require('mj-gulp-workflow')(require('gulp'));
```

## Usage

Run `gulp dist --env dist` for distribution, otherwise just `gulp`.

## Tests

Run tests witch `npm test`

---

# @todo:
- port to gulp 4?

---

# changelog

## 1.2.5
- improved task defaults, `dev` and `dist` as `--env` options, defaults to `dev`.
- updated dependencies

## 1.2.4
- remove config version check
- fix cleanup task for paths outside gulp directory
- fix babel when gulp task is in subdirectory
- add browserify (optional)

## 1.2.3
- add tests for copy and cleanup tasks
- code refactoring
- renamed `compileConfig.js` and `defaultConfig.js`
- remove pxToRem task

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

## 1.1.1
- cleanup, refactoring and overall code quality

## 1.1.0

- Moved testing to jest
- Run tests with `npm test` (run `gulp dist` first!)
