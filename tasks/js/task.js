var babel = require("gulp-babel"),
	concat = require("gulp-concat"),
	changed = require("gulp-changed"),
	sourcemaps = require("gulp-sourcemaps"),
	gutil = require("gulp-util");

module.exports = function(gulp, config, paths) {
	gulp.task("js", function() {
		for (var dest in paths) {
			var source = paths[dest];
			dest = replaceEnv(dest);

			var file = dest.replace(/^.*[\\\/]/, "");
			var isFile = file.length > 0;

			if (isFile) {
				dest = dest.replace(file, "");
			}

			var buffer = gulp.src(source);

			if (isEnabled(config.sourcemaps.enabled)) {
				buffer = buffer.pipe(sourcemaps.init());
			}

			if (isEnabled(config.babeljs.enabled)) {
				buffer = buffer.pipe(
					babel(config.babeljs.config).on("error", e => {
						console.log(e.toString());
					})
				);
			}

			if (isFile) {
				buffer = buffer.pipe(concat(file));
			}

			if (isEnabled(config.sourcemaps.enabled)) {
				buffer = buffer.pipe(sourcemaps.write("."));
			}

			buffer.pipe(gulp.dest(dest)).on("error", gutil.log);
		}
	});
};
