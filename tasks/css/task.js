var sass = require("gulp-sass"),
	mkdirp = require("mkdirp"),
	sourcemaps = require("gulp-sourcemaps"),
	changed = require("gulp-changed"),
	gutil = require("gulp-util");

module.exports = function(gulp, config, paths) {
	gulp.task("css", function() {
		for (var dest in paths) {
			var source = paths[dest];
			dest = replaceEnv(dest);

			var buffer = gulp.src(source);

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
