const fs = require("fs");
const del = require("del");
const junk = require("junk");
const watch = require("gulp-watch");
const runSequence = require("run-sequence");
const gutil = require("gulp-util");

imagemin = require("gulp-imagemin");

global = {};

isEnabled = require("./helpers/isEnabled.js");
replaceEnv = require("./helpers/replaceEnv.js");

argv = require("yargs")
	.alias("e", "env")
	.default("env", "local").argv;

global.env = argv.env;

console.log(`Environment: ${global.env}`);

const workflow = gulp => {
	if (!gulp) return false;

	global.moduleRootDir = __dirname;
	global.appRootDir = require("app-root-dir").get();

	const config = require("./core/config.js")();

	// Init all tasks
	const tasks = fs
		.readdirSync(`${global.moduleRootDir}/tasks/`)
		.filter(junk.not);

	tasks.forEach(task => {
		require(`./tasks/${task}/task.js`)(
			gulp,
			config[task],
			config.paths[task]
		);
	});

	gulp.task("clean", () => {
		del([global.env]);
	});

	for (const taskName in config.combinedTasks) {
		gulp.task(taskName, (cb) => {
			runSequence.apply(this, config.combinedTasks[taskName], cb);
		});
	}

	gulp.task("watch", () => {
		for (const pathGroup in config.watchTask) {
			const sources = config.paths[pathGroup];
			const tasks = config.watchTask[pathGroup];

			if (typeof sources !== "string") {
				for (const dest in sources) {
					const source = sources[dest];

					watch(source).on("change", event => {
						gutil.log(source + " changed");
						runSequence(tasks);
					});
				}
			} else {
				watch(source).on("change", event => {
					gutil.log(source + " changed");
					runSequence(tasks);
				});
			}
		}
	});
};

module.exports = workflow;
