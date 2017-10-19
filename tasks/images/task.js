const imagemin = require("gulp-imagemin");
const pngquant = require("imagemin-pngquant");
const merge = require("merge-stream");

module.exports = (gulp, config, paths) => {
	gulp.task("images", () => {
		let stream;

		for (let dest in paths) {
			const source = paths[dest];
			dest = replaceEnv(dest);

			let buffer = gulp.src(source);

			if (isEnabled(config.imagemin.enabled)) {
				buffer = buffer.pipe(imagemin(config.imagemin.config));
				buffer = buffer.pipe(imagemin(pngquant()));
			}

			buffer = buffer.pipe(gulp.dest(dest));

			if (stream === undefined) {
				stream = buffer;
			} else {
				stream = merge(stream, buffer);
			}
		}

		return stream;
	});
};
