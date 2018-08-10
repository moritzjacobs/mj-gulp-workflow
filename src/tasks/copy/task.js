const merge = require('merge-stream')
const gnotify = require('gulp-notify')
const argv = require('../../lib/argv')
const replaceEnv = require('../../lib/replaceEnv.js')(argv.env)

module.exports = (gulp, config, paths) => {
	gulp.task('copy', () => {
		let stream
		for (let dest in paths) {
			const source = paths[dest]
			dest = replaceEnv(dest)

			let buffer = gulp.src(source)

			buffer = buffer.pipe(gulp.dest(dest)).on(
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
