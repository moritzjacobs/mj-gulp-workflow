const postcss = require('gulp-postcss')
const autoprefixer = require('autoprefixer')

// const isEnabled = require('./lib/isEnabled.js')(argv.env)
// const replaceEnv = require('./lib/replaceEnv.js')(argv.env)

module.exports = (buffer, config) =>
	buffer.pipe(
		postcss([autoprefixer(config)]).on('error', error => {
			console.error(error.toString())
		})
	)
