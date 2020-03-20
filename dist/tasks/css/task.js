"use strict";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const sass = require('gulp-sass');

const sourcemaps = require('gulp-sourcemaps');

const gnotify = require('gulp-notify');

const log = require('fancy-log');

const merge = require('merge-stream');

const touch = require('gulp-touch-cmd');

const argv = require('../../lib/argv');

const isEnabled = require('../../lib/isEnabled.js')(argv.env);

const replaceEnv = require('../../lib/replaceEnv.js')(argv.env);

module.exports = (gulp, config, paths) => {
  gulp.task('css', () => {
    let stream;

    for (let dest in paths) {
      const source = paths[dest];
      dest = replaceEnv(dest);
      let buffer = gulp.src(source, {
        allowEmpty: true
      }); // -------- sourcemaps init ---------

      let sourceMapsEnabled = 'dev';

      if (config.sourcemaps !== undefined && config.sourcemaps.enabled !== undefined) {
        sourceMapsEnabled = config.sourcemaps.enabled;
      }

      if (isEnabled(sourceMapsEnabled)) {
        buffer = buffer.pipe(sourcemaps.init());
      } // -------- scss ---------


      let scssConfig = {
        outputStyle: 'compressed'
      };

      if (config.scss !== undefined && config.scss.config !== undefined) {
        scssConfig = _objectSpread({}, scssConfig, {}, config.scss.config);
      }

      buffer = buffer.pipe(sass(scssConfig).on('error', gnotify.onError({
        message: 'Error: <%= error.message %>',
        emitError: true
      }))); // -------- autoprefixer ---------

      let autoprefixerEnabled = true;
      let autoprefixerConfig = {
        browserlist: ['> 0.1%']
      };

      if (config.autoprefixer !== undefined) {
        if (config.autoprefixer.enabled !== undefined) {
          autoprefixerEnabled = true;
        }

        if (config.autoprefixer.config !== undefined) {
          autoprefixerConfig = _objectSpread({}, autoprefixerConfig, {}, config.autoprefixer.config);
        }
      }

      if (autoprefixerEnabled) {
        buffer = require('./autoprefixer.js')(buffer, autoprefixerConfig);
      } // -------- cleanCSS ---------


      let cleanCSSEnabled = true;
      let cleanCSSConfig = {
        compatibility: 'ie8'
      };

      if (config.cleanCss !== undefined) {
        if (config.cleanCss.enabled !== undefined) {
          cleanCSSEnabled = config.cleanCss.enabled;
        }

        if (config.cleanCss.config !== undefined) {
          cleanCSSConfig = _objectSpread({}, cleanCSSConfig, {}, config.cleanCss.config);
        }
      } // disable cleanCSS if we don't want compressed files


      if (scssConfig.outputStyle !== 'compressed') {
        cleanCSSEnabled = false;
        console.log(scssConfig);
        console.log('clean css is not run');
      }

      if (cleanCSSEnabled) {
        buffer = require('./cleanCss.js')(buffer, cleanCSSConfig);
      } // -------- sourcemaps write out ---------


      if (isEnabled(sourceMapsEnabled)) {
        buffer = buffer.pipe(sourcemaps.write('.'));
      }

      buffer = buffer.pipe(gulp.dest(dest)).pipe(touch()).on('error', log);

      if (stream === undefined) {
        stream = buffer;
      } else {
        stream = merge(stream, buffer);
      }
    }

    return stream;
  });
};