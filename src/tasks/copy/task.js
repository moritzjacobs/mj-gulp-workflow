const merge = require('merge-stream')
const gnotify = require('gulp-notify')
const touch = require('gulp-touch-cmd')
const argv = require('../../lib/argv')
const replaceEnv = require('../../lib/replaceEnv.js')(argv.env)

module.exports = (gulp, config, paths) => {
	gulp.task('copy', done => {
		let stream
		for (let dest in paths) {
			const source = paths[dest]
			dest = replaceEnv(dest)

			let buffer = gulp.src(source, { allowEmpty: true })

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
		done()
		return stream
	})
}
