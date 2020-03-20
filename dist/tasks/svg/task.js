"use strict";

const merge = require('merge-stream');

const touch = require('gulp-touch-cmd');

const argv = require('../../lib/argv');

const svgmin = require('gulp-svgmin');

const isEnabled = require('../../lib/isEnabled.js')(argv.env);

const replaceEnv = require('../../lib/replaceEnv.js')(argv.env);

module.exports = (gulp, config, paths) => {
  gulp.task('svg', () => {
    let stream;

    for (let dest in paths) {
      const source = paths[dest];
      dest = replaceEnv(dest);
      let buffer = gulp.src(source, {
        allowEmpty: true
      }); // -------- svgMin ---------

      let svgMinEnabled = true;
      let svgMinConfig = {};

      if (config.svgmin !== undefined) {
        if (config.svgmin.enabled !== undefined) {
          svgMinEnabled = config.svgmin.enabled;
        }

        if (config.svgmin.config !== undefined) {
          svgMinConfig = config.svgmin.config;
        }
      }

      if (isEnabled(svgMinEnabled)) {
        buffer = buffer.pipe(svgmin(svgMinConfig));
      }

      buffer = buffer.pipe(gulp.dest(dest)).pipe(touch());

      if (stream === undefined) {
        stream = buffer;
      } else {
        stream = merge(stream, buffer);
      }
    }

    return stream;
  });
};