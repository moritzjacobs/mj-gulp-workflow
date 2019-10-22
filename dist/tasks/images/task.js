"use strict";

const imagemin = require('gulp-imagemin');

const pngquant = require('imagemin-pngquant');

const merge = require('merge-stream');

const touch = require('gulp-touch-cmd');

const gnotify = require('gulp-notify');

const argv = require('../../lib/argv');

const isEnabled = require('../../lib/isEnabled.js')(argv.env);

const replaceEnv = require('../../lib/replaceEnv.js')(argv.env);

module.exports = (gulp, config, paths) => {
  gulp.task('images', () => {
    let stream;

    for (let dest in paths) {
      const source = paths[dest];
      dest = replaceEnv(dest);
      let buffer = gulp.src(source, {
        allowEmpty: true
      });

      if (isEnabled(config.imagemin.enabled)) {
        buffer = buffer.pipe(imagemin(config.imagemin.config)); // pngquant with default options

        let pngquantOptions = {
          quality: [0.6, 0.8]
        };

        if (config.imagemin.pngquant !== undefined) {
          pngquantOptions = config.imagemin.pngquant;
        }

        buffer = buffer.pipe(imagemin([pngquant(pngquantOptions)], {
          plugins: [pngquant]
        }, {
          verbose: true
        }));
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