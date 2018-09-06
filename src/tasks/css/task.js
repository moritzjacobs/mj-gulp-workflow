const sass = require('gulp-sass')
const sourcemaps = require('gulp-sourcemaps')
const gnotify = require('gulp-notify')
const log = require('fancy-log')
const merge = require('merge-stream')
const argv = require('../../lib/argv')
const isEnabled = require('../../lib/isEnabled.js')(argv.env)
const replaceEnv = require('../../lib/replaceEnv.js')(argv.env)

module.exports = (gulp, config, paths) => {
	gulp.task('css', () => {
		let stream

		for (let dest in paths) {
			const source = paths[dest]
			dest = replaceEnv(dest)

			let buffer = gulp.src(source, { allowEmpty: true })

			if (isEnabled(config.sourcemaps.enabled)) {
				buffer = buffer.pipe(sourcemaps.init())
			}

			buffer = buffer.pipe(
				sass(config.scss.config).on(
					'error',
					gnotify.onError({
						message: 'Error: <%= error.message %>',
						emitError: true
					})
				)
			)

			if (isEnabled(config.autoprefixer.enabled)) {
				buffer = require('./autoprefixer.js')(
					buffer,
					config.autoprefixer.config
				)
			}

			if (isEnabled(config.cleanCss.enabled)) {
				buffer = require('./cleanCss.js')(
					buffer,
					config.cleanCss.config
				)
			}

			if (isEnabled(config.sourcemaps.enabled)) {
				buffer = buffer.pipe(sourcemaps.write('.'))
			}

			buffer = buffer.pipe(gulp.dest(dest)).on('error', log)

			if (stream === undefined) {
				stream = buffer
			} else {
				stream = merge(stream, buffer)
			}
		}

		return stream
	})
}
