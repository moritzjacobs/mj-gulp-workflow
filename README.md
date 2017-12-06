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
- sourcemaps are enabled for dev env by default
- pxToRem is removed
- es6 via babel and browserify are enabled for a specific task and source folder per default (`babel-preset-env` + browserstring)
- added imagemin options

## Installation

1. Create a package.json in your project **>>** `npm init`
2. Install dependencies **>>** `npm i --save-dev gulp mj-gulp-workflow`
3. Create a new `gulpfile.js` and add the content you find below

```js
require('mj-gulp-workflow')(require('gulp'));
```

## First run

run `gulp` to create a `gulp-config.js`, configure to taste.

## Configuration

tasks in `combinedTasks` are run in sequence, so if you want parallel execution you would have to put them in another array inside `combinedTasks`, e.g.:

```js
combinedTasks: {
	default: [["dist", "watch"]], // runs parallel
	dist: ["es6", "js", "images", "svg", "css", "copy", "clean"], // runs sequential
},
```

## Usage

Run `gulp dist --env dist` for distribution, otherwise just `gulp`.

## Tests

Run tests witch `npm test`

Run test http server with `npm run testd` => <http://localhost:8080>, then look at the console.

---

# @todo:
- port to gulp 4?

---

# changelog

## 1.3.2
- updated dependencies

## 1.3.1
- fixed bug that made gulp process crash on first run

## 1.3.0
- move babel-transformation for es6 files to own source/task combo
- `cleanup` task is now `clean`

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
