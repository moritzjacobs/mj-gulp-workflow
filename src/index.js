const fs = require('fs')
const junk = require('junk')
const watch = require('gulp-watch')
const runSequence = require('run-sequence')
const gutil = require('gulp-util')
const argv = require('./lib/argv')
const AppRootDir = require('app-root-dir')
const configFactory = require('./lib/config.js')

// define propertiess
const properties = {}
// process cli args

properties.env = argv.env

console.log(`Environment: ${properties.env}`)

const workflow = gulp => {
	if (!gulp) return false

	// define more propertiess
	properties.moduleRootDir = __dirname
	properties.appRootDir = AppRootDir.get()
	properties.runFrom = properties.appRootDir

	const config = configFactory(properties)

	// Init all tasks
	const tasks = fs
		.readdirSync(`${properties.moduleRootDir}/tasks/`)
		.filter(junk.not)

	// autorequire
	tasks.forEach(task => {
		let taskFn = require(`./tasks/${task}/task.js`)
		taskFn(gulp, config[task], config.paths[task])
	})

	// create combined tasks as sequential runs of autoincluded tasks
	for (const taskName in config.combinedTasks) {
		gulp.task(taskName, cb => {
			runSequence.apply(this, config.combinedTasks[taskName], cb)
		})
	}

	// special watch task
	gulp.task('watch', () => {
		// watch for every path group
		for (const pathGroup in config.watchTask) {
			const sources = config.paths[pathGroup]
			const tasks = config.watchTask[pathGroup]

			if (typeof sources !== 'string') {
				for (const dest in sources) {
					const source = sources[dest]

					watch(source).on('change', event => {
						gutil.log(`${source} changed`)
						runSequence(tasks)
					})
				}
			}
		}
	})
}

module.exports = workflow
