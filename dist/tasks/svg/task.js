"use strict";

const merge = require('merge-stream');

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
      let buffer = gulp.src(source);

      if (isEnabled(config.svgmin.enabled)) {
        buffer = buffer.pipe(svgmin(config.svgmin.config));
      }

      buffer = buffer.pipe(gulp.dest(dest));

      if (stream === undefined) {
        stream = buffer;
      } else {
        stream = merge(stream, buffer);
      }
    }

    return stream;
  });
};