"use strict";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const babel = require('gulp-babel');

const concat = require('gulp-concat');

const sourcemaps = require('gulp-sourcemaps');

const gnotify = require('gulp-notify');

const browserify = require('gulp-bro');

const touch = require('gulp-touch-cmd');

const merge = require('merge-stream');

const argv = require('../../lib/argv');

const isEnabled = require('../../lib/isEnabled.js')(argv.env);

const replaceEnv = require('../../lib/replaceEnv.js')(argv.env);

module.exports = (name, gulp, config, paths) => {
  gulp.task(name, () => {
    let stream;

    for (let dest in paths) {
      const source = paths[dest];
      dest = replaceEnv(dest);
      const file = dest.replace(/^.*[\\/]/, '');
      const isFile = file.length > 0;

      if (isFile) {
        dest = dest.replace(file, '');
      }

      let buffer = gulp.src(source, {
        allowEmpty: true
      }); // -------- sourcemaps init ---------

      let sourceMapsEnabled = 'dev';

      if (config.sourcemaps !== undefined && config.sourcemaps.enabled !== undefined) {
        sourceMapsEnabled = config.sourcemaps.enabled;
      }

      if (isEnabled(sourceMapsEnabled)) {
        buffer = buffer.pipe(sourcemaps.init());
      } // -------- browserify ---------


      let browserifyEnabled = true;

      if (config.browserify !== undefined && config.browserify.enabled !== undefined) {
        browserifyEnabled = config.browserify.enabled;
      }

      if (isEnabled(browserifyEnabled)) {
        buffer = buffer.pipe(browserify().on('error', gnotify.onError({
          message: 'Error: <%= error.message %>',
          emitError: true
        })));
      }

      if (isFile) {
        buffer = buffer.pipe(concat(file));
      } // -------- babel ---------


      let babeljsEnabled = true;
      let babeljsConfig = {
        minified: true,
        comments: false,
        presets: [['@babel/preset-env', {
          targets: {
            browsers: ['> 0.1%']
          }
        }]]
      };

      if (config.babeljs !== undefined) {
        if (config.babeljs.enabled !== undefined) {
          babeljsEnabled = config.babeljs.enabled;
        }

        if (config.babeljs.config !== undefined) {
          babeljsConfig = _objectSpread({}, babeljsConfig, {}, config.babeljs.config);
        }
      }

      if (isEnabled(babeljsEnabled)) {
        console.log('babel');
        buffer = buffer.pipe(babel(babeljsConfig).on('error', gnotify.onError({
          message: 'Error: <%= error.message %>',
          emitError: true
        })));
      } // -------- sourcemaps write out ---------


      if (isEnabled(sourceMapsEnabled)) {
        buffer = buffer.pipe(sourcemaps.write('.'));
      }

      buffer = buffer.pipe(gulp.dest(dest)).pipe(touch()).on('error', gnotify.onError({
        message: 'Error: <%= error.message %>',
        emitError: true
      }));

      if (stream === undefined) {
        stream = buffer;
      } else {
        stream = merge(stream, buffer);
      }
    }

    return stream;
  });
};