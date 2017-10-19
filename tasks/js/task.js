const babel = require("gulp-babel");
const concat = require("gulp-concat");
const changed = require("gulp-changed");
const sourcemaps = require("gulp-sourcemaps");
const gutil = require("gulp-util");
const gnotify = require("gulp-notify");
const merge = require("merge-stream");

module.exports = (gulp, config, paths) => {
	gulp.task("js", () => {
		let stream;

		for (let dest in paths) {
			const source = paths[dest];
			dest = replaceEnv(dest);

			const file = dest.replace(/^.*[\\\/]/, "");
			const isFile = file.length > 0;

			if (isFile) {
				dest = dest.replace(file, "");
			}

			let buffer = gulp.src(source);

			if (isEnabled(config.sourcemaps.enabled)) {
				buffer = buffer.pipe(sourcemaps.init());
			}

			if (isEnabled(config.babeljs.enabled)) {
				buffer = buffer.pipe(
					babel(config.babeljs.config).on(
						"error",
						gnotify.onError({
							message: "Error: <%= error.message %>",
							emitError: true
						})
					)
				);
			}

			if (isFile) {
				buffer = buffer.pipe(concat(file));
			}

			if (isEnabled(config.sourcemaps.enabled)) {
				buffer = buffer.pipe(sourcemaps.write("."));
			}

			buffer = buffer.pipe(gulp.dest(dest)).on(
				"error",
				gnotify.onError({
					message: "Error: <%= error.message %>",
					emitError: true
				})
			);

			if (stream === undefined) {
				stream = buffer;
			} else {
				stream = merge(stream, buffer);
			}
		}

		return stream;
	});
};
