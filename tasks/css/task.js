const sass = require("gulp-sass");
const mkdirp = require("mkdirp");
const sourcemaps = require("gulp-sourcemaps");
const changed = require("gulp-changed");
const gutil = require("gulp-util");

module.exports = (gulp, config, paths) => {
	gulp.task("css", () => {
		for (let dest in paths) {
			const source = paths[dest];
			dest = replaceEnv(dest);

			let buffer = gulp.src(source);

			if (isEnabled(config.sourcemaps.enabled)) {
				buffer = buffer.pipe(sourcemaps.init());
			}

			buffer = buffer.pipe(
				sass(config.scss.config).on("error", sass.logError)
			);

			if (isEnabled(config.autoprefixer.enabled)) {
				buffer = require("./autoprefixer.js")(
					buffer,
					config.autoprefixer.config
				);
			}

			if (isEnabled(config.pxToRem.enabled)) {
				buffer = require("./pxToRem.js")(buffer, config.pxToRem.config);
			}

			if (isEnabled(config.cleanCss.enabled)) {
				buffer = require("./cleanCss.js")(
					buffer,
					config.cleanCss.config
				);
			}

			if (isEnabled(config.sourcemaps.enabled)) {
				buffer = buffer.pipe(sourcemaps.write("."));
			}

			buffer.pipe(gulp.dest(dest)).on("error", gutil.log);
		}
	});
};
