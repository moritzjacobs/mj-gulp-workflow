const imagemin = require('gulp-imagemin')
const pngquant = require('imagemin-pngquant')
const merge = require('merge-stream')
const touch = require('gulp-touch-cmd')
const gnotify = require('gulp-notify')
const argv = require('../../lib/argv')
const isEnabled = require('../../lib/isEnabled.js')(argv.env)
const replaceEnv = require('../../lib/replaceEnv.js')(argv.env)

module.exports = (gulp, config, paths) => {
	gulp.task('images', () => {
		let stream

		for (let dest in paths) {
			const source = paths[dest]
			dest = replaceEnv(dest)

			let buffer = gulp.src(source, { allowEmpty: true })

			// -------- imagemin ---------
			let imageMinEnabled = true

			const imageMinConfig = {
				gifsicle: {},
				jpegtran: { progressive: true },
				optipng: { optimizationLevel: 5 },
				pngquant: { quality: [0.6, 0.8] }
			}

			if (config.imagemin !== undefined) {
				if (config.imagemin.enabled !== undefined) {
					imageMinEnabled = config.imagemin.enabled
				}
				// overwrite from config
				if (config.imagemin.config !== undefined) {
					for (const func in config.imagemin.config) {
						imageMinConfig[func] = config.imagemin.config[func]
					}
				}
			}

			if (isEnabled(imageMinEnabled)) {
				// pipe all defined functions
				if (imageMinConfig.gifsicle !== false) {
					buffer = buffer.pipe(imagemin([imagemin.gifsicle(imageMinConfig.gifsicle)]))
				}
				if (imageMinConfig.jpegtran !== false) {
					buffer = buffer.pipe(imagemin([imagemin.jpegtran(imageMinConfig.jpegtran)]))
				}
				if (imageMinConfig.optipng !== false) {
					buffer = buffer.pipe(imagemin([imagemin.optipng(imageMinConfig.optipng)]))
				}
				if (imageMinConfig.pngquant !== false) {
					buffer = buffer.pipe(imagemin([pngquant(imageMinConfig.pngquant)],
						{ plugins: [pngquant] },
						{ verbose: true }))
				}
				// and additional functions if needed
				if (config.imagemin !== undefined && config.imagemin.additional !== undefined && config.imagemin.additional !== false) {
					buffer = buffer.pipe(imagemin(config.imagemin.additional))
				}
			}

			buffer = buffer.pipe(gulp.dest(dest)).pipe(touch()).on(
				'error',
				gnotify.onError({
					message: 'Error: <%= error.message %>',
					emitError: true
				})
			)

			if (stream === undefined) {
				stream = buffer
			} else {
				stream = merge(stream, buffer)
			}
		}

		return stream
	})
}
