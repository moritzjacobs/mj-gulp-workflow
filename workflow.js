const fs = require("fs");
const del = require("del");

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
    const tasks = fs.readdirSync(`${global.moduleRootDir}/tasks/`);

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
        gulp.task(taskName, config.combinedTasks[taskName]);
    }

    gulp.task("watch", () => {
        for (const pathGroup in config.watchTask) {
            const sources = config.paths[pathGroup];
            const tasks = config.watchTask[pathGroup];

            if (typeof sources !== "string") {
                for (const dest in sources) {
                    const source = sources[dest];
                    gulp.watch(source, tasks);
                }
            } else {
                gulp.watch(sources, tasks);
            }
        }
    });
};

module.exports = workflow;
